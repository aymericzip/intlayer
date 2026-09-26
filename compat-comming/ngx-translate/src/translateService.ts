import { EventEmitter, Injectable, type Signal, signal } from '@angular/core';
import { internationalization } from '@intlayer/config/built';
import { getIntlayer } from '@intlayer/core/interpreter';
import {
  createMessageResolver,
  icuToIntlayerFormatter,
  interpolateMessage,
  navigatePath,
} from '@intlayer/core/messageFormat';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { concat, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DefaultMissingTranslationHandler,
  type MissingTranslationHandler,
  type TranslateCompiler,
  TranslateDefaultParser,
  type TranslateLoader,
  TranslateNoOpCompiler,
  TranslateNoOpLoader,
  type TranslateParser,
  TranslateStore,
} from './handlers';
import type {
  DefaultLangChangeEvent,
  FallbackLangChangeEvent,
  InterpolatableTranslationObject,
  InterpolationParameters,
  LangChangeEvent,
  Language,
  StrictTranslation,
  Translation,
  TranslationChangeEvent,
  TranslationObject,
} from './types';
import { getValue, insertValue, mergeDeep } from './util';

const defaultLocale = (internationalization?.defaultLocale ?? 'en') as string;
const configLocales = (internationalization?.locales ?? [
  defaultLocale,
]) as string[];

const resolveIcu = createMessageResolver(icuToIntlayerFormatter);

export abstract class ITranslateService {
  abstract currentLang: Signal<Language | null>;
  abstract fallbackLang: Signal<Language | null>;
  abstract isLoading: Signal<boolean>;
  abstract onLangChange: EventEmitter<LangChangeEvent>;
  abstract onTranslationChange: EventEmitter<TranslationChangeEvent>;
  abstract onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;

  abstract use(lang: Language): Observable<any>;
  abstract reloadLang(lang: Language): Observable<any>;
  abstract resetLang(lang: Language): void;
  abstract getBrowserLang(): Language | undefined;
  abstract getBrowserCultureLang(): Language | undefined;
  abstract set(
    key: string,
    translation: string | TranslationObject,
    lang?: Language
  ): void;
  abstract get(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation>;
  abstract stream(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation>;
  abstract instant(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Translation;
  abstract setTranslation(
    lang: Language,
    translations: TranslationObject,
    shouldMerge?: boolean
  ): void;
  abstract getTranslation(lang: Language): Observable<TranslationObject>;
  abstract setCompiledTranslation(
    lang: Language,
    translations: InterpolatableTranslationObject,
    shouldMerge?: boolean
  ): void;
  abstract getParsedResult(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): StrictTranslation | Observable<StrictTranslation>;
  abstract getCurrentLang(): Language | null;
  abstract getFallbackLang(): Language | null;
  abstract getDefaultLang(): Language;
  abstract setDefaultLang(lang: Language): void;
  abstract getLangs(): Language[];
  abstract addLangs(langs: Language[]): void;
  abstract getTranslations(language: Language): InterpolatableTranslationObject;
  abstract getParent(): ITranslateService | null;
  abstract getRoot(): ITranslateService;
}

@Injectable({ providedIn: 'root' })
export class TranslateService extends ITranslateService {
  private _currentLang = signal<Language | null>(defaultLocale);
  readonly currentLang: Signal<Language | null> =
    this._currentLang.asReadonly();

  private _fallbackLang = signal<Language | null>(defaultLocale);
  readonly fallbackLang: Signal<Language | null> =
    this._fallbackLang.asReadonly();

  private _isLoading = signal<boolean>(false);
  readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();

  onLangChange = new EventEmitter<LangChangeEvent>();
  onTranslationChange = new EventEmitter<TranslationChangeEvent>();
  onDefaultLangChange = new EventEmitter<DefaultLangChangeEvent>();
  onFallbackLangChange = new EventEmitter<FallbackLangChangeEvent>();

  defaultLang: Language = defaultLocale;
  currentLoader: TranslateLoader = new TranslateNoOpLoader();
  compiler: TranslateCompiler = new TranslateNoOpCompiler();
  parser: TranslateParser = new TranslateDefaultParser();
  missingTranslationHandler: MissingTranslationHandler =
    new DefaultMissingTranslationHandler();
  store: TranslateStore = new TranslateStore();

  private langs: Language[] = [...configLocales];

  constructor() {
    super();
    this.store.defaultLang = this.defaultLang;
    this.store.currentLang = this.defaultLang;
  }

  getCurrentLang(): Language | null {
    return this._currentLang();
  }

  getFallbackLang(): Language | null {
    return this._fallbackLang();
  }

  getDefaultLang(): Language {
    return this.defaultLang;
  }

  setDefaultLang(lang: Language): void {
    if (lang === this.defaultLang) return;
    this.defaultLang = lang;
    this.store.defaultLang = lang;
    this._fallbackLang.set(lang);
    this.onDefaultLangChange.emit({ lang, defaultLang: lang });
  }

  use(lang: Language): Observable<any> {
    this._currentLang.set(lang);
    this.store.currentLang = lang;

    const translations = this.getTranslations(lang);
    this.onLangChange.emit({ lang, translations });

    return of(translations);
  }

  reloadLang(lang: Language): Observable<any> {
    return this.use(lang);
  }

  resetLang(lang: Language): void {
    delete this.store.translations[lang];
    delete this.store.compiledTranslations[lang];
  }

  getLangs(): Language[] {
    return this.langs;
  }

  addLangs(langs: Language[]): void {
    for (const lang of langs) {
      if (!this.langs.includes(lang)) {
        this.langs.push(lang);
      }
    }
  }

  getBrowserLang(): Language | undefined {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return undefined;
    }
    const nav: any = navigator;
    const browserLang = nav.languages?.[0] || nav.language;
    return browserLang ? browserLang.split(/[-_]/)[0] : undefined;
  }

  getBrowserCultureLang(): Language | undefined {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return undefined;
    }
    const nav: any = navigator;
    return nav.languages?.[0] || nav.language || undefined;
  }

  set(
    key: string,
    translation: string | TranslationObject,
    lang: Language = this.getCurrentLang() ?? this.defaultLang
  ): void {
    this.store.translations[lang] = insertValue(
      this.store.translations[lang] ?? {},
      key,
      translation
    );
  }

  setTranslation(
    lang: Language,
    translations: TranslationObject,
    shouldMerge = false
  ): void {
    if (shouldMerge && this.store.translations[lang]) {
      this.store.translations[lang] = mergeDeep(
        this.store.translations[lang],
        translations
      );
    } else {
      this.store.translations[lang] = translations;
    }
    this.onTranslationChange.emit({
      lang,
      translations: this.store.translations[lang],
    });
  }

  getTranslation(lang: Language): Observable<TranslationObject> {
    return of(this.getTranslations(lang));
  }

  setCompiledTranslation(
    lang: Language,
    translations: InterpolatableTranslationObject,
    shouldMerge = false
  ): void {
    if (shouldMerge && this.store.compiledTranslations[lang]) {
      this.store.compiledTranslations[lang] = mergeDeep(
        this.store.compiledTranslations[lang],
        translations
      );
    } else {
      this.store.compiledTranslations[lang] = translations;
    }
  }

  getTranslations(language: Language): InterpolatableTranslationObject {
    return this.store.translations[language] ?? {};
  }

  getParent(): ITranslateService | null {
    return null;
  }

  getRoot(): ITranslateService {
    return this;
  }

  private lookupRaw(lang: string, key: string): unknown {
    // 1. Check local store
    if (this.store.translations[lang]) {
      const val = getValue(this.store.translations[lang], key);
      if (val !== undefined) return val;
    }

    // 2. Check intlayer dictionaries
    let dictionaries: Record<string, unknown> = {};
    try {
      dictionaries = getDictionaries() ?? {};
    } catch {}

    if (key.includes('.')) {
      const dotIndex = key.indexOf('.');
      const dictKey = key.slice(0, dotIndex);
      const path = key.slice(dotIndex + 1);

      if (dictionaries[dictKey]) {
        try {
          const dict = getIntlayer(
            dictKey as DictionaryKeys,
            lang as LocalesValues
          );
          const val = navigatePath(dict, path);
          if (val !== undefined && val !== null) {
            return (val as any)?.$raw?.value ?? (val as any)?.value ?? val;
          }
        } catch {}
      }
    }

    // Default 'translation' dict
    if (dictionaries['translation']) {
      try {
        const dict = getIntlayer(
          'translation' as DictionaryKeys,
          lang as LocalesValues
        );
        const val = navigatePath(dict, key);
        if (val !== undefined && val !== null) {
          return (val as any)?.$raw?.value ?? (val as any)?.value ?? val;
        }
      } catch {}
    }

    // Whole key as dictionary
    if (dictionaries[key]) {
      try {
        const dict = getIntlayer(key as DictionaryKeys, lang as LocalesValues);
        if (dict !== undefined && dict !== null) {
          return (dict as any)?.$raw?.value ?? (dict as any)?.value ?? dict;
        }
      } catch {}
    }

    return undefined;
  }

  instant(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): any {
    const targetLang = lang ?? this.getCurrentLang() ?? this.defaultLang;

    if (Array.isArray(key)) {
      const result: Record<string, any> = {};
      for (const k of key) {
        result[k] = this.instant(k, interpolateParams, targetLang);
      }
      return result;
    }

    if (typeof key !== 'string') {
      return '';
    }

    // Lookup raw translation
    let raw = this.lookupRaw(targetLang, key);

    // If not found in targetLang, try fallbackLang
    if (
      raw === undefined &&
      this.defaultLang &&
      targetLang !== this.defaultLang
    ) {
      raw = this.lookupRaw(this.defaultLang, key);
    }

    if (raw !== undefined) {
      if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
        return raw;
      }
      if (typeof raw === 'string') {
        return interpolateMessage(
          raw,
          interpolateParams as any,
          targetLang as LocalesValues
        );
      }
      return resolveIcu(raw, interpolateParams, targetLang as LocalesValues);
    }

    // Missing key handler
    if (this.missingTranslationHandler) {
      const handled = this.missingTranslationHandler.handle({
        key,
        translateService: this,
        interpolateParams,
      });
      if (handled !== undefined && !(handled instanceof Observable)) {
        return handled;
      }
    }

    return key;
  }

  get(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation> {
    return of(this.instant(key, interpolateParams, lang));
  }

  stream(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation> {
    return concat(
      of(this.instant(key, interpolateParams, lang)),
      this.onLangChange.pipe(
        map(() => this.instant(key, interpolateParams, lang))
      )
    );
  }

  getParsedResult(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): StrictTranslation | Observable<StrictTranslation> {
    return this.instant(key, interpolateParams, lang);
  }
}
