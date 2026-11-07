import { mkdir, readFile, writeFile } from 'fs/promises';
import path from "path";

const EN_EDITABLE_I18 = "../../locales/en-editable/common.json";
const EN_FINAL_I18 = "../../locales/en/common.json";

const LOCALES_DIR = path.join(import.meta.dirname, "../locales");

export const localePath = (language: string) => path.join(LOCALES_DIR, language, "common.json");

export const readLocale = async(language: string): Promise<Record<string, string>> => {
    try {
        return JSON.parse(await readFile(localePath(language), "utf8"));
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
        throw err;
    }
}

export const writeLocale = async(language: string, data: object) => {
    const filePath = localePath(language);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const readEnLocales = async() => {
    try {
        // Just going to read and store common.json in mem
        // then just compare cus we don't want waste Google Translate API credits :'(
        // const filesNames = await readdir("dirname");

        const filePathEditable = path.join(import.meta.dirname, 'data', EN_EDITABLE_I18);
        const filePathFinal = path.join(import.meta.dirname, 'data', EN_FINAL_I18);

        const editableJSON = JSON.parse(await readFile(filePathEditable, "utf8"));
        const finalJSON = JSON.parse(await readFile(filePathFinal, "utf8"));

        return [ editableJSON, finalJSON ];
    } catch (err) {
        console.error(`Error reading en locales: ${err}`);
    }
}