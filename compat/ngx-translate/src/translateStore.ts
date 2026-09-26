import * as i0 from '@angular/core';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import type {
  FactoryDeclaration,
  InjectableDeclaration,
} from './partialDeclarations';
import type {
  InterpolatableTranslationObject,
  Language,
  TranslationChangeEvent,
} from './types';
import { getValue, mergeDeep } from './util';

/**
 * Runtime translations registered through `setTranslation()` / a loader.
 * Intlayer dictionaries are resolved separately and never copied here.
 */
export class TranslateStore {
  private readonly translationsSignal = signal<
    Record<Language, InterpolatableTranslationObject>
  >({});
  readonly translations = this.translationsSignal.asReadonly();

  private readonly translationChangeSubject =
    new Subject<TranslationChangeEvent>();
  readonly translationChange$ = this.translationChangeSubject.asObservable();

  getTranslations(language: Language): InterpolatableTranslationObject {
    return this.translations()[language] ?? {};
  }

  setTranslations(
    language: Language,
    translations: InterpolatableTranslationObject,
    shouldMerge: boolean
  ): void {
    this.translationsSignal.update((current) => ({
      ...current,
      [language]:
        shouldMerge && current[language]
          ? mergeDeep(current[language], translations)
          : translations,
    }));
    this.translationChangeSubject.next({
      lang: language,
      translations: this.getTranslations(language),
    });
  }

  deleteTranslations(language: Language): void {
    this.translationsSignal.update(({ [language]: _removed, ...rest }) => rest);
  }

  getTranslationValue(language: Language, key: string): unknown {
    return getValue(this.translations()[language], key);
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateStore, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateStore,
      deps: [],
      target: i0.ɵɵFactoryTarget.Injectable,
    } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<TranslateStore> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateStore,
    } as InjectableDeclaration) as never;
}
