'use client';

import type { Trans as _Trans } from 'react-i18next';
import { useTranslation } from './useTranslation';

const _TransImpl = ({ i18nKey, ns, values, defaults, children }: any) => {
  const { t } = useTranslation(ns);
  const raw = (t as any)(i18nKey) ?? defaults ?? children;

  if (values && typeof raw === 'string') {
    const interpolated = raw.replace(
      /\{\{(\w+)\}\}/g,
      (_: string, key: string) =>
        values[key] != null ? String(values[key]) : `{{${key}}}`
    );
    return <>{interpolated}</>;
  }

  return <>{raw}</>;
};

/**
 * Drop-in for react-i18next's `<Trans>`.
 * Component-based interpolation (`components` prop) is not supported.
 */
export const Trans = _TransImpl as unknown as typeof _Trans;
