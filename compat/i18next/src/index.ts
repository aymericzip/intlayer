export type { InitOptions, i18n, TFunction, TOptions } from 'i18next';
export { createInstance } from './createInstance';

import { createInstance } from './createInstance';

const i18next = createInstance();

export default i18next;

/**
 * No-op i18next plugin for `react-i18next` compatibility.
 * Pass to `i18next.use(initReactI18next)` to satisfy existing call sites.
 */
export { initReactI18next } from 'react-i18next';
export { i18next };
