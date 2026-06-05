'use client';

import type { useTranslations as _useTranslations } from 'next-intl';
import { useI18n } from 'next-intlayer';

const _useTranslationsImpl = (namespace?: any) => useI18n(namespace);

/**
 * Drop-in for next-intl's `useTranslations`.
 * Backed by `useI18n` from `next-intlayer`.
 */
export const useTranslations =
  _useTranslationsImpl as unknown as typeof _useTranslations;
