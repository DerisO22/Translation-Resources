import { readdir, readFile } from 'fs/promises';
import path from "path";

const EN_EDITABLE_I18 = "../../locales/en-editable/common.json";
const EN_FINAL_I18 = "../../locales/en/common.json";

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

/**
 *  This will write to the final en common.json file
 *  with the sorted translation object
 */
export const writeFinalEnLocales = async() => {
    try {

    } catch (err) {
        console.error(`Error writing to file: ${err}`);
    }
}

readEnLocales();