import type { TranslationObject } from "./types.js";

/**
 * 
 * @param obj 
 * @returns 
 * 
 */
export const sortDeeplyNestedI18Object = <T>(obj: T) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return obj; 
    
    return Object.keys(obj) 
        .sort() 
        .reduce((acc, key) => { 
            acc[key as keyof T] = sortDeeplyNestedI18Object(obj[key as keyof T]); 
            return acc; 
        }, {} as T); 
}

/**
 * 
 * @param source - Editable translation object
 * @param target - Final translation object to compare
 * @returns an object containing the missing key value pairs
 * 
 * aka: The savior of saving Google Translate API credits :)
 */
export const diffObjects = (
    source: TranslationObject = {}, 
    target: TranslationObject = {}
): TranslationObject => {
    const diff = Object.keys(source).reduce((acc: any, key) => {
        const sourceValue = source[key];
        const targetValue = target[key];

        if(!(key in target) || targetValue === undefined) {
            acc[key] = sourceValue;
            console.log(acc)
            return acc;
        }

        return acc;
    }, {}); 

    console.log(diff);

    return diff;
}