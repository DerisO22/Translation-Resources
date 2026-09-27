import { diffObjects } from "../util/funcs.ts";
import { readEnLocales } from "./readWriteLocales.ts";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TRANSLATE_API_KEY;
const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translate = async() => {
    try {
        const enObjectsArray = await readEnLocales(); 

        if(!enObjectsArray) return;

        const diff = diffObjects(enObjectsArray[0], enObjectsArray[1]);

        /**
         *  Handle the actual translations :)
         */
        const requestData = {
            q: diff["HELLO"],
            target: "fr"
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

        const data = await response.json();

        const translatedText = data?.data?.translations[0].translatedText;
        console.log("Translated Text:", translatedText);
    } catch (err) {
        console.error(`Error translating: ${err}`);
    }
}

translate();