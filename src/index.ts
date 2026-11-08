// All locale imports
import enTranslation from './locales/en/common.json' with { type: 'json' };
import arTranslation from './locales/ar/common.json' with { type: 'json' };
import bnTranslation from './locales/bn/common.json' with { type: 'json' };
import deTranslation from './locales/de/common.json' with { type: 'json' };
import esTranslation from './locales/es/common.json' with { type: 'json' };
import faTranslation from './locales/fa/common.json' with { type: 'json' };
import frTranslation from './locales/fr/common.json' with { type: 'json' };
import hiTranslation from './locales/hi/common.json' with { type: 'json' };
import idTranslation from './locales/id/common.json' with { type: 'json' };
import itTranslation from './locales/it/common.json' with { type: 'json' };
import jaTranslation from './locales/ja/common.json' with { type: 'json' };
import koTranslation from './locales/ko/common.json' with { type: 'json' };
import plTranslation from './locales/pl/common.json' with { type: 'json' };
import ptTranslation from './locales/pt/common.json' with { type: 'json' };
import ruTranslation from './locales/ru/common.json' with { type: 'json' };
import swTranslation from './locales/sw/common.json' with { type: 'json' };
import trTranslation from './locales/tr/common.json' with { type: 'json' };
import urTranslation from './locales/ur/common.json' with { type: 'json' };
import viTranslation from './locales/vi/common.json' with { type: 'json' };
import zhTranslation from './locales/zh/common.json' with { type: 'json' };

export const resources = {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
    bn: { translation: bnTranslation },
    de: { translation: deTranslation },
    es: { translation: esTranslation },
    fa: { translation: faTranslation },
    fr: { translation: frTranslation },
    hi: { translation: hiTranslation },
    id: { translation: idTranslation },
    it: { translation: itTranslation },
    ja: { translation: jaTranslation },
    ko: { translation: koTranslation },
    pl: { translation: plTranslation },
    pt: { translation: ptTranslation },
    ru: { translation: ruTranslation },
    sw: { translation: swTranslation },
    tr: { translation: trTranslation },
    ur: { translation: urTranslation },
    vi: { translation: viTranslation },
    zh: { translation: zhTranslation }
} as const;

export { 
    enTranslation,
    arTranslation,
    bnTranslation,
    deTranslation,
    esTranslation,
    faTranslation,
    frTranslation,
    hiTranslation,
    idTranslation,
    itTranslation,
    jaTranslation,
    koTranslation,
    plTranslation,
    ptTranslation,
    ruTranslation,
    swTranslation,
    trTranslation,
    urTranslation,
    viTranslation,
    zhTranslation 
}