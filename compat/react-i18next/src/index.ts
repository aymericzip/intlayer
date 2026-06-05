// Re-export common types from react-i18next so consumers don't need both packages
export type {
  I18nextProviderProps,
  TransProps,
  UseTranslationOptions,
  UseTranslationResponse,
  WithTranslation,
  WithTranslationProps,
} from 'react-i18next';
export { I18nextProvider } from './I18nextProvider';
export { initReactI18next } from './initReactI18next';
export { Trans } from './Trans';
export { useTranslation } from './useTranslation';
export { withTranslation } from './withTranslation';
