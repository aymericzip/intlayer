import { computed, inject, type Signal } from '@angular/core';
import { TranslateService } from './translateService';
import type {
  InterpolationParameters,
  Language,
  Translation,
  TranslationObject,
} from './types';

export const translate = (
  key: string | string[] | (() => string | string[]),
  params?:
    | InterpolationParameters
    | (() => InterpolationParameters | undefined),
  lang?: Language | (() => Language | undefined)
): Signal<Translation | TranslationObject> => {
  let translateService: TranslateService;
  try {
    translateService = inject(TranslateService);
  } catch {
    translateService = new TranslateService();
  }

  return computed(() => {
    // Reading currentLang signal ensures reactivity when language changes
    const _reactiveLang = translateService.currentLang();

    const resolvedKey = typeof key === 'function' ? key() : key;
    const resolvedParams = typeof params === 'function' ? params() : params;
    const resolvedLang = typeof lang === 'function' ? lang() : lang;

    return translateService.instant(resolvedKey, resolvedParams, resolvedLang);
  });
};

export const _ = translate;
