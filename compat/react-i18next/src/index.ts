import type {
  composeInitialProps as _composeInitialProps,
  getDefaults as _getDefaults,
  getI18n as _getI18n,
  getInitialProps as _getInitialProps,
  I18nContext as _I18nContext,
  IcuTrans as _IcuTrans,
  IcuTransWithoutContext as _IcuTransWithoutContext,
  nodesToString as _nodesToString,
  setDefaults as _setDefaults,
  setI18n as _setI18n,
  Translation as _Translation,
  TransWithoutContext as _TransWithoutContext,
  useSSR as _useSSR,
  withSSR as _withSSR,
} from 'react-i18next';

import {
  composeInitialProps as composeInitialPropsImpl,
  getDefaults as getDefaultsImpl,
  getI18n as getI18nImpl,
  getInitialProps as getInitialPropsImpl,
  I18nContext as I18nContextImpl,
  nodesToString as nodesToStringImpl,
  setDefaults as setDefaultsImpl,
  setI18n as setI18nImpl,
  Translation as TranslationImpl,
  useSSR as useSSRImpl,
  withSSR as withSSRImpl,
} from './helpers';

import { Trans } from './Trans';

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
export { useTranslation } from './useTranslation';
export { withTranslation } from './withTranslation';
export { Trans };

// Wrap and export all implementation functions
export const nodesToString = nodesToStringImpl as typeof _nodesToString;
export const setDefaults = setDefaultsImpl as typeof _setDefaults;
export const getDefaults = getDefaultsImpl as typeof _getDefaults;
export const setI18n = setI18nImpl as typeof _setI18n;
export const getI18n = getI18nImpl as typeof _getI18n;
export const composeInitialProps =
  composeInitialPropsImpl as typeof _composeInitialProps;
export const getInitialProps = getInitialPropsImpl as typeof _getInitialProps;
export const useSSR = useSSRImpl as typeof _useSSR;
export const withSSR = withSSRImpl as typeof _withSSR;
export const Translation = TranslationImpl as typeof _Translation;
export const I18nContext = I18nContextImpl as typeof _I18nContext;

export const TransWithoutContext = Trans as typeof _TransWithoutContext;
export const IcuTrans = Trans as typeof _IcuTrans;
export const IcuTransWithoutContext = Trans as typeof _IcuTransWithoutContext;
