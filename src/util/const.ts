/**
 *  Any Constants that might be reused
 */
export const LANGUAGES = {
    en: "", // English

    // all other languages
    ar: "", // Arabic (RTL)
    bn: "", // Bengali
    de: "", // German
    es: "", // Spanish
    fa: "", // Persian / Farsi (RTL)
    fr: "", // French
    hi: "", // Hindi
    id: "", // Indonesian
    it: "", // Italian
    ja: "", // Japanese
    ko: "", // Korean
    pl: "", // Polish
    pt: "", // Portuguese
    ru: "", // Russian
    sw: "", // Swahili
    tr: "", // Turkish
    ur: "", // Urdu (RTL)
    vi: "", // Vietnamese
    zh: "", // Chinese (Simplified)
}

export const ISO_KEYS = [
    "en",
    "ar", "bn", "de", "es", "fa", "fr", "hi", "id", "it", "ja",
    "ko", "pl", "pt", "ru", "sw", "tr", "ur", "vi", "zh"
];

export const TargetTranslations = ISO_KEYS.slice(1);
export const RTL_LANGUAGES = [ "ar", "fa", "ur" ];