import { type i18n as I18nType, i18next } from '@intlayer/i18next';

export const i18n = i18next as unknown as I18nType;

export {
  I18nContext,
  I18nextProvider,
  initReactI18next,
  Trans,
  Translation,
  useTranslation,
  withTranslation,
} from '@intlayer/react-i18next';

export { appWithTranslation } from './appWithTranslation';
export { serverSideTranslations } from './serverSideTranslations';
