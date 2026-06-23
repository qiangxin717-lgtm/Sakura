import { createContext, useContext } from 'react';
import { useLocalStorage } from './use-local-storage';
import { getTranslation } from '@/i18n';
import type { Language } from '@/types';

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLocalStorage<Language>('eq-lang', 'zh');
  const t = getTranslation(lang);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
