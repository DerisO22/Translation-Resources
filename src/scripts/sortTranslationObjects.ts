import path from "path";
import { sortDeeplyNestedI18Object } from "../util/funcs.ts";
import { translate } from "./translate.ts";
import fs from 'fs/promises';

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
            const sortedObject = sortDeeplyNestedI18Object(translationObject.translations);

            /**
             *  Gotta write to locales
             */
            const filePath = path.resolve(import.meta.dirname, `../../src/locales/${translationObject.language}/common.json`);

            await fs.writeFile(filePath, JSON.stringify(sortedObject, null, 2), "utf-8");
            
            return sortedObject;
        });

        console.log(sortedObjects);
    } catch(err) {

    }
    
}

sortObjectsAfterTranslations();