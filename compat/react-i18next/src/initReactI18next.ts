import type { initReactI18next as _initReactI18next } from 'react-i18next';
import { setDefaults, setI18n } from './helpers';

/**
 * Drop-in for react-i18next's `initReactI18next` plugin.
 *
 * Implemented locally rather than re-exported from `react-i18next`: when the
 * compat alias plugin is enabled, `react-i18next` resolves back to this package,
 * so a re-export would be self-referential (resolving to `undefined`). The
 * plugin records the i18n instance via the compat `setI18n`/`setDefaults`
 * helpers; actual translation is served by Intlayer.
 */
export const initReactI18next: typeof _initReactI18next = {
  type: '3rdParty' as const,
  init: (instance) => {
    setI18n(instance as never);
    setDefaults({});
  },
};
