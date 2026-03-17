import type { Locale } from '@intlayer/types/allLocales';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export const useEditorLocale = (): Locale | undefined => {
  const manager = useEditorStateManager();
  const [locale, setLocale] = useState<Locale | undefined>(
    manager.currentLocale.value
  );

  useEffect(() => {
    const handler = (e: Event) => setLocale((e as CustomEvent<Locale>).detail);
    manager.currentLocale.addEventListener('change', handler);
    return () => manager.currentLocale.removeEventListener('change', handler);
  }, [manager]);

  return locale;
};

export const useSetEditorLocale = () => {
  const manager = useEditorStateManager();
  return (locale: Locale) => manager.currentLocale.set(locale);
};
