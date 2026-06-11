'use client';

import type * as React from 'react';
import type {
  withTranslation as _withTranslation,
  UseTranslationOptions,
} from 'react-i18next';
import { useTranslation } from './useTranslation';

/**
 * Drop-in for react-i18next's `withTranslation` HOC.
 */
export const withTranslation: typeof _withTranslation = ((
  ns?: string | string[],
  options?: UseTranslationOptions<string>
) =>
  <P extends { t: unknown; i18n: unknown; tReady: boolean }>(
    WrappedComponent: React.ComponentType<P>
  ) => {
    const WithTranslation = (props: Omit<P, 't' | 'i18n' | 'tReady'>) => {
      const { t, i18n } = useTranslation(ns, options);
      return (
        <WrappedComponent
          {...(props as unknown as P)}
          t={t}
          i18n={i18n}
          tReady
        />
      );
    };
    WithTranslation.displayName = `withTranslation(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
    })`;
    return WithTranslation as unknown as React.ComponentType<
      Omit<P, 't' | 'i18n' | 'tReady'>
    >;
  }) as typeof _withTranslation;
