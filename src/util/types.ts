export type TranslationObject = { [key: string]: string | TranslationObject };

export interface Translation {
    translatedText: string;
    detectedSourceLanguage?: string;
}

export interface TranslationResponse {
    data: {
        translations: Translation[]
    }
}