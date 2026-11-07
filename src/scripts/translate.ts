import { TargetTranslations } from "../util/const.ts";
import { diffObjects } from "../util/funcs.ts";
import type { TranslationResponse } from "../util/types.ts";
import { readLocale } from "./readWriteLocales.ts";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TRANSLATE_API_KEY;
const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

const MAX_STRINGS_PER_REQUEST = 128;
const MAX_CHARS_PER_REQUEST = 5000;

export type LanguageTranslations = {
    language: string;
    translations: Record<string, string>;
};

type Entry = [key: string, text: string];

/**
 *  Doing batches to not get 400s from Google Translate API
 */
const toBatches = (entries: Entry[]): Entry[][] => {
    const batches: Entry[][] = [];
    let current: Entry[] = [];
    let chars = 0;

    for (const entry of entries) {
        const length = entry[1].length;
        const isFull = current.length >= MAX_STRINGS_PER_REQUEST || chars + length > MAX_CHARS_PER_REQUEST;

        if (current.length && isFull) {
            batches.push(current);
            current = [];
            chars = 0;
        }

        current.push(entry);
        chars += length;
    }

    if (current.length) batches.push(current);
    return batches;
}

/**
 *  Translates one batch of strings into one language
 */
const translateBatch = async(texts: string[], target: string) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            q: texts,
            source: "en",
            target: target,
            format: "text"
        })
    });

    if(!response.ok) {
        throw new Error(`HTTP ${response.status} translating to "${target}": ${await response.text()}`);
    }

    const json = await response.json() as TranslationResponse;
    return json.data.translations.map(t => t.translatedText);
}

const PLACEHOLDER = /\{\{[^{}]+\}\}/g;

const fixPlaceholders = (key: string, original: string, translated: string, target: string) => {
    const expected = original.match(PLACEHOLDER) ?? [];
    if (!expected.length) return translated;

    let fixed = translated.replace(/\{\{\s*([^{}]*?)\s*\}\}/g, "{{$1}}");
    const found = fixed.match(PLACEHOLDER) ?? [];

    if (expected.length === 1 && found.length === 1 && found[0] !== expected[0]) {
        fixed = fixed.replace(found[0], expected[0]);
    }

    const sameSet = [...(fixed.match(PLACEHOLDER) ?? [])].sort().join() === [...expected].sort().join();
    if (!sameSet) {
        console.warn(`${target} ${key}: placeholders don't match, check by hand -> "${fixed}"`);
    }

    return fixed;
}

/**
 *  Translates every key in en-editable that a language's common.json is missing
 */
export const translate = async(): Promise<LanguageTranslations[]> => {
    const english = await readLocale("en-editable");

    if (!Object.keys(english).length) {
        throw new Error("src/locales/en-editable/common.json is missing or empty");
    }

    const results = await Promise.allSettled(TargetTranslations.map(async (target) => {
        const existing = await readLocale(target);
        const missing = Object.entries(diffObjects(english, existing))
            .filter((entry): entry is Entry => typeof entry[1] === "string");

        const translations: Record<string, string> = {};

        // Batches for one language at a time to prevent 400 errors
        for (const batch of toBatches(missing)) {
            const translated = await translateBatch(batch.map(([, text]) => text), target);

            batch.forEach(([key, text], index) => {
                const result = translated[index];
                if (result !== undefined) {
                    translations[key] = fixPlaceholders(key, text, result, target);
                }
            });
        }

        console.log(`${target}: translated ${Object.keys(translations).length} strings`);
        return { language: target, translations };
    }));

    const succeeded: LanguageTranslations[] = [];

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            succeeded.push(result.value);
        } else {
            console.error(`Error translating ${TargetTranslations[index]}: ${result.reason}`);
            process.exitCode = 1;
        }
    });

    return [...succeeded, { language: "en", translations: english }];
}