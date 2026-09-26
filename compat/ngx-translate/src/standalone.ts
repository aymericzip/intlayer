import { inject, type Signal } from '@angular/core';
import { TranslateService } from './translateService';
import type { InterpolationParameters, Language, Translation } from './types';

/**
 * Signal of a translation, updated on language change. Must run in an
 * injection context.
 *
 * @example
 * ```ts
 * readonly title = translate('home.title');
 * ```
 */
export const translate = (
  key: string | string[] | (() => string | string[]),
  params?:
    | InterpolationParameters
    | (() => InterpolationParameters | undefined),
  lang?: Language | (() => Language | undefined)
): Signal<Translation> => inject(TranslateService).translate(key, params, lang);

/**
 * Marks a key for extraction tools; returns it unchanged.
 *
 * @example
 * ```ts
 * const titleKey = _('home.title');
 * ```
 */
export const _ = <T extends string | string[]>(key: T): T => key;
