import { diffObjects } from "../util/funcs.js";
import { readEnLocales } from "./readWriteLocales.js";

export const translate = async() => {
    try {
        const enObjectsArray = await readEnLocales(); 

        if(!enObjectsArray) {
           console.error("Issue");
           return;
        } 
        
        diffObjects(enObjectsArray[0], enObjectsArray[1]);
    } catch (err) {

    }
}

translate();