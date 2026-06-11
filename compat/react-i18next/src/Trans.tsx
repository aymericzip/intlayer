'use client';

import type { Namespace } from 'i18next';
import type { Trans as _Trans, TransProps } from 'react-i18next';
import { useTranslation } from './useTranslation';

/**
 * Drop-in for react-i18next's `<Trans>`.
 * Component-based interpolation (`components` prop) is not supported.
 */
export const Trans: typeof _Trans = function Trans<
  Key extends string = string,
  Ns extends Namespace = Namespace,
>({
  i18nKey,
  ns,
  values,
  defaults,
  children,
}: TransProps<Key, Ns>): React.ReactElement {
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
} as typeof _Trans;
