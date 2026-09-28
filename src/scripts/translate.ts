import { TargetTranslations } from "../util/const.ts";
import { diffObjects } from "../util/funcs.ts";
import type { TranslationResponse } from "../util/types.ts";
import { readEnLocales } from "./readWriteLocales.ts";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TRANSLATE_API_KEY;
const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translate = async() => {
    try {
        const enObjectsArray = await readEnLocales(); 

        if(!enObjectsArray) return;

        const diffObject = diffObjects(enObjectsArray[0], enObjectsArray[1]);
        const keys = Object.keys(diffObject);
        const translationStrings = Object.values(diffObject);

        /**
         *  Handle the actual translations for all supported langauges :)
         */
        const translationsPromises = TargetTranslations.map(async (target) => {
            const requestData = {
                q: translationStrings,
                target: target
            }

            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
    
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json() as TranslationResponse;
            const translatedTexts = json.data.translations.map(t => t.translatedText);

            // Need to reconstuct cus the translated strings are just on their
            // own when we reveive the response
            const reconstructedObject: Record<string, string> = {};
            keys.forEach((key, index) => {
                reconstructedObject[key] = translatedTexts[index] ?? "";
            });

            return {
                language: target,
                translations: reconstructedObject
            };
        });

        const results = await Promise.all(translationsPromises);
        return results;
    } catch (err) {
        console.error(`Error translating: ${err}`);
    }
}

translate();