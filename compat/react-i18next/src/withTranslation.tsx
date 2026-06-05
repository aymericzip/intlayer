'use client';

import type { withTranslation as _withTranslation } from 'react-i18next';
import { useTranslation } from './useTranslation';

const _withTranslationImpl =
  (ns?: any, options?: any) => (WrappedComponent: any) => {
    const WithTranslation = (props: any) => {
      const { t, i18n } = useTranslation(ns, options);
      return <WrappedComponent {...props} t={t} i18n={i18n} tReady />;
    };
    WithTranslation.displayName = `withTranslation(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
    })`;
    return WithTranslation;
  };

/**
 * Drop-in for react-i18next's `withTranslation` HOC.
 */
export const withTranslation =
  _withTranslationImpl as unknown as typeof _withTranslation;
