export const sortDeeplyNestedI18Object = <T>(obj: T) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return obj; 
    
    return Object.keys(obj) 
        .sort() 
        .reduce((acc, key) => { 
            acc[key as keyof T] = sortDeeplyNestedI18Object(obj[key as keyof T]); 
            return acc; 
        }, {} as T); 
}