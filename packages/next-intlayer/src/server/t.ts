import type {
  DeclaredLocales,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { t as tBase } from 'react-intlayer/server';
import { resolveAmbientLocale } from './ambientLocale';

/**
 * On the server side, returns the translation of a multilingual object.
 *
 * If the locale is not provided, it will use the locale from the server
 * context, falling back to the locale carried by the request.
 */
export const t = <Content = string, L extends LocalesValues = DeclaredLocales>(
  multilangContent: StrictModeLocaleMap<Content>,
  locale?: L
): ReturnType<typeof tBase<Content, L>> =>
  tBase<Content, L>(multilangContent, resolveAmbientLocale(locale) as L);
