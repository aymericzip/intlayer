import type { WrappedIntl } from '@intlayer/core/formatters';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useIntl as useIntlBase } from 'react-intlayer/server';
import { resolveAmbientLocale } from './ambientLocale';

/**
 * On the server side, hook providing a locale-bound `Intl` object.
 *
 * If the locale is not provided, it will use the locale from the server
 * context, falling back to the locale carried by the request.
 */
export const useIntl = (locale?: LocalesValues): WrappedIntl =>
  useIntlBase(resolveAmbientLocale(locale));
