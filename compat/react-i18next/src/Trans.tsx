'use client';

import type { TransProps } from 'react-i18next';
import { useTranslation } from './useTranslation';

const _TransImpl = ({
  i18nKey,
  ns,
  values,
  defaults,
  children,
}: TransProps<string>): React.ReactElement => {
  const { t } = useTranslation(ns as string);
  const tFn = t as (key: string) => string | undefined;
  const raw =
    (i18nKey ? tFn(i18nKey as string) : undefined) ?? defaults ?? children;

  if (values && typeof raw === 'string') {
    const interpolated = raw.replace(
      /\{\{(\w+)\}\}/g,
      (_: string, key: string) =>
        (values as Record<string, unknown>)[key] != null
          ? String((values as Record<string, unknown>)[key])
          : `{{${key}}}`
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
