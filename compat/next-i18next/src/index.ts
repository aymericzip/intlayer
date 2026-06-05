// Re-export the React adapter so apps can import everything from one package
export {
  I18nextProvider,
  initReactI18next,
  Trans,
  useTranslation,
  withTranslation,
} from '@intlayer/react-i18next';
export { appWithTranslation } from './appWithTranslation';
export { serverSideTranslations } from './serverSideTranslations';
