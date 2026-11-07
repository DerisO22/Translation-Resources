import path from "path";
import { sortDeeplyNestedI18Object } from "../util/funcs.ts";
import { translate } from "./translate.ts";
import fs, { readFile } from 'fs/promises';

/**
 *  Notes :)
 *  After the translation API calls, they are collectively stored in this example structure
[
    {
        language: 'de',
        translations: { HELLO: 'Hallo', GOODBYE: 'Auf Wiedersehen' }
    },
    { language: 'es', translations: { HELLO: 'Hola', GOODBYE: 'Adiós' } },
    {
        language: 'fr',
        translations: { HELLO: 'Bonjour', GOODBYE: 'Au revoir' }
    }
]

 * This function will sort those objects in the array
 * and then call the write to locales function. It will also sort the appended en locale (recieved in param)
 */
export const sortObjectsAfterTranslations = async() => {
    try {
        const translatedObjectsArray = await translate();

        console.log(translatedObjectsArray);

        const sortedObjects = translatedObjectsArray?.map(async(translationObject) => {
            const existingLanguagePath = path.join(import.meta.dirname, `../../src/locales/${translationObject.language}/common.json`);
            const existingLanguageJSON = JSON.parse(await readFile(existingLanguagePath, "utf-8"));

            // Notes
            // There's always a chance that the en will get out of sync with the other langauges
            // Will create a separate function that restores that.

            const combinedUnsortedObject = { ...existingLanguageJSON, ...translationObject.translations }

            // Notes
            // This will need to combine the previous locales with the new translated diff keys.
            // Will return the proper sorted object not just containing the diff keys
            const sortedObject = sortDeeplyNestedI18Object(combinedUnsortedObject);

            /**
             *  Gotta write to locales
             */
            const filePath = path.resolve(import.meta.dirname, `../../src/locales/${translationObject.language}/common.json`);

            await fs.writeFile(filePath, JSON.stringify(sortedObject, null, 2), "utf-8");
            
            return sortedObject;
        });
    } catch(err) {

    }
    
}

sortObjectsAfterTranslations();