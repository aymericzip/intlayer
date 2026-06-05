export type { I18n, InitOptions, TOptions } from './createInstance';
export { createInstance } from './createInstance';

import { createInstance } from './createInstance';

const i18next = createInstance();

export default i18next;
export { i18next };

/**
 * No-op plugin passed to i18next `use()` chain in existing react-i18next apps.
 * Intlayer does not need the react-i18next plugin, so this is a compatibility shim.
 */
export const initReactI18next = {
  type: '3rdParty' as const,
  init: (_i18n: any) => {},
};
