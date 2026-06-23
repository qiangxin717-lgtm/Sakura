import { zh } from './zh';
import { en } from './en';
import type { Language } from '@/types';

export type { Language };

export const translations = { zh, en };

export function getTranslation(lang: Language) {
  return translations[lang];
}

export type { Translations } from './zh';
