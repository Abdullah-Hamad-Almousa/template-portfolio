import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import type { LanguageContextType } from '../context/LanguageContext';

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}