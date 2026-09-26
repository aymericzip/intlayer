import * as i0 from '@angular/core';
import {
  computed,
  InjectionToken,
  inject,
  type Signal,
  signal,
  untracked,
} from '@angular/core';
import { internationalization } from '@intlayer/config/built';
import { resolveMessageNodeToString } from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { createIntlayerClient } from 'angular-intlayer';
import {
  isObservable,
  map,
  merge,
  type Observable,
  of,
  Subject,
  startWith,
} from 'rxjs';
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateNoOpLoader,
  TranslateParser,
} from './handlers';
import type {
  FactoryDeclaration,
  InjectableDeclaration,
} from './partialDeclarations';
import { lookupRegistryTranslation } from './registryLookup';
import { TranslateStore } from './translateStore';
import type {
  FallbackLangChangeEvent,
  InterpolatableTranslation,
  InterpolatableTranslationObject,
  InterpolationParameters,
  LangChangeEvent,
  Language,
  RootTranslateServiceConfig,
  StrictTranslation,
  Translation,
  TranslationChangeEvent,
  TranslationObject,
} from './types';
import { insertValue, isDict, isString } from './util';

/** Resolved `provideTranslateService()` options. */
export const TRANSLATE_SERVICE_CONFIG =
  new InjectionToken<RootTranslateServiceConfig>('TRANSLATE_SERVICE_CONFIG');

/** A key, a key list, or a reactive source of either. */
type KeyInput = string | string[] | (() => string | string[]);

/** Resolves a plain value or a function / signal returning it. */
const readInput = <T>(input: T | (() => T)): T =>
  typeof input === 'function' ? (input as () => T)() : input;

/** Abstract API of {@link TranslateService}, kept for type compatibility. */
export abstract class ITranslateService {}

/**
 * ngx-translate's `TranslateService` over intlayer.
 *
 * - The active language is angular-intlayer's locale signal, so `use()`,
 *   `useLocale().setLocale()` and `useIntlayer()` share one locale.
 * - Keys resolve against runtime translations (`setTranslation()`, a
 *   configured loader) first, then the intlayer dictionaries — the first key
 *   segment names the dictionary (`'home.title'` → `home`).
 * - Everything is synchronous: dictionaries are bundled, so `get()` and
 *   `use()` emit immediately.
 */
export class TranslateService extends ITranslateService {
  private readonly intlayerClient = createIntlayerClient();
  private readonly config = inject(TRANSLATE_SERVICE_CONFIG, {
    optional: true,
  });

  readonly store = inject(TranslateStore);
  readonly currentLoader = inject(TranslateLoader);
  readonly compiler = inject(TranslateCompiler);
  readonly parser = inject(TranslateParser);
  readonly missingTranslationHandler = inject(MissingTranslationHandler);

  private readonly fallbackLangSignal = signal<Language | null>(null);
  private readonly isLoadingSignal = signal(false);
  private readonly langChangeSubject = new Subject<LangChangeEvent>();
  private readonly fallbackLangChangeSubject =
    new Subject<FallbackLangChangeEvent>();

  /** The active language, shared with angular-intlayer. */
  readonly currentLang: Signal<Language> = computed(
    () => this.intlayerClient.locale() as Language
  );
  readonly fallbackLang: Signal<Language | null> =
    this.fallbackLangSignal.asReadonly();
  readonly isLoading: Signal<boolean> = this.isLoadingSignal.asReadonly();

  readonly onLangChange: Observable<LangChangeEvent> =
    this.langChangeSubject.asObservable();
  readonly onFallbackLangChange: Observable<FallbackLangChangeEvent> =
    this.fallbackLangChangeSubject.asObservable();
  /** @deprecated Use `onFallbackLangChange`. */
  readonly onDefaultLangChange = this.onFallbackLangChange;
  readonly onTranslationChange: Observable<TranslationChangeEvent> =
    this.store.translationChange$;
  /** Emits whenever displayed translations may have changed. */
  readonly onTranslationRefresh: Observable<unknown> = merge(
    this.onLangChange,
    this.onTranslationChange,
    this.onFallbackLangChange
  );

  constructor() {
    super();

    const fallbackLang =
      this.config?.fallbackLang ?? this.config?.defaultLanguage;
    if (fallbackLang) this.setFallbackLang(fallbackLang);
    if (this.config?.lang) this.use(this.config.lang);
  }

  getCurrentLang(): Language {
    return untracked(this.currentLang);
  }

  getFallbackLang(): Language | null {
    return untracked(this.fallbackLang);
  }

  /** Sets the language whose translations fill the gaps of the active one. */
  setFallbackLang(lang: Language): Observable<InterpolatableTranslationObject> {
    this.fallbackLangSignal.set(lang);
    this.fallbackLangChangeSubject.next({
      lang,
      translations: this.store.getTranslations(lang),
    });
    return this.loadTranslations(lang);
  }

  /** @deprecated Use `setFallbackLang`. */
  setDefaultLang(lang: Language): Observable<InterpolatableTranslationObject> {
    return this.setFallbackLang(lang);
  }

  /** @deprecated Use `getFallbackLang`. */
  getDefaultLang(): Language | null {
    return this.getFallbackLang();
  }

  /** Activates a language, through angular-intlayer's locale. */
  use(lang: Language): Observable<InterpolatableTranslationObject> {
    const translations$ = this.loadTranslations(lang);

    if (lang !== this.getCurrentLang()) {
      this.intlayerClient.setLocale(lang as LocalesValues);
      this.langChangeSubject.next({
        lang,
        translations: this.store.getTranslations(lang),
      });
    }

    return translations$;
  }

  /**
   * Runs a configured loader once per language. Intlayer dictionaries need
   * none, so the default no-op loader short-circuits.
   */
  private loadTranslations(
    lang: Language
  ): Observable<InterpolatableTranslationObject> {
    if (
      this.currentLoader instanceof TranslateNoOpLoader ||
      lang in this.store.translations()
    ) {
      return of(this.store.getTranslations(lang));
    }

    this.isLoadingSignal.set(true);

    return this.currentLoader.getTranslation(lang).pipe(
      map((translations) => {
        this.setTranslation(lang, translations, true);
        this.isLoadingSignal.set(false);
        return this.store.getTranslations(lang);
      })
    );
  }

  reloadLang(lang: Language): Observable<InterpolatableTranslationObject> {
    this.resetLang(lang);
    return this.loadTranslations(lang);
  }

  resetLang(lang: Language): void {
    this.store.deleteTranslations(lang);
  }

  /** Languages declared in intlayer plus any registered at runtime. */
  getLangs(): readonly Language[] {
    return [
      ...new Set([
        ...((internationalization?.locales ?? []) as Language[]),
        ...Object.keys(this.store.translations()),
      ]),
    ];
  }

  /** Kept for API parity: the intlayer configuration owns the locale list. */
  addLangs(_languages: Language[]): void {}

  getTranslations(lang: Language): InterpolatableTranslationObject {
    return this.store.getTranslations(lang);
  }

  getTranslation(lang: Language): Observable<InterpolatableTranslationObject> {
    return this.loadTranslations(lang);
  }

  /** Registers runtime translations, compiled by the configured compiler. */
  setTranslation(
    lang: Language,
    translations: TranslationObject,
    shouldMerge = false
  ): void {
    this.store.setTranslations(
      lang,
      this.compiler.compileTranslations(translations, lang),
      shouldMerge
    );
  }

  /** Registers translations that are already compiled. */
  setCompiledTranslation(
    lang: Language,
    translations: InterpolatableTranslationObject,
    shouldMerge = false
  ): void {
    this.store.setTranslations(lang, translations, shouldMerge);
  }

  /** Sets one runtime translation. */
  set(
    key: string,
    translation: string | TranslationObject,
    lang: Language = this.getCurrentLang()
  ): void {
    this.store.setTranslations(
      lang,
      insertValue(
        this.store.getTranslations(lang),
        key,
        isString(translation)
          ? this.compiler.compile(translation, lang)
          : this.compiler.compileTranslations(translation, lang)
      ),
      false
    );
  }

  /**
   * Interpolates a raw translation, recursing into subtrees. Strings go
   * through the configured parser (`{{ name }}`); functions are either
   * compiled runtime translations (parser) or intlayer nodes (resolver).
   */
  private interpolate(
    translation: InterpolatableTranslation,
    params: InterpolationParameters,
    lang: Language,
    isDictionaryContent: boolean
  ): Translation {
    if (Array.isArray(translation)) {
      return translation.map((item) =>
        this.interpolate(item, params, lang, isDictionaryContent)
      );
    }
    if (isDict(translation)) {
      return Object.fromEntries(
        Object.entries(translation).map(([key, value]) => [
          key,
          this.interpolate(value, params, lang, isDictionaryContent),
        ])
      );
    }
    if (isDictionaryContent && typeof translation === 'function') {
      return resolveMessageNodeToString(
        translation,
        params,
        lang as LocalesValues
      );
    }
    return this.parser.interpolate(translation, params) ?? '';
  }

  /** Interpolated translation of `key` in `lang`, or `undefined`. */
  private resolveKey(
    key: string,
    params: InterpolationParameters,
    lang: Language
  ): Translation | undefined {
    const runtimeTranslation = this.store.getTranslationValue(lang, key);
    if (runtimeTranslation !== undefined && runtimeTranslation !== null) {
      return this.interpolate(
        runtimeTranslation as InterpolatableTranslation,
        params,
        lang,
        false
      );
    }

    const dictionaryContent = lookupRegistryTranslation(key, lang);
    if (dictionaryContent !== undefined && dictionaryContent !== null) {
      return this.interpolate(
        dictionaryContent as InterpolatableTranslation,
        params,
        lang,
        true
      );
    }

    return undefined;
  }

  /** Translation of a key, or of each key of a list. */
  getParsedResult(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): StrictTranslation | Observable<StrictTranslation> {
    if (Array.isArray(key)) {
      return Object.fromEntries(
        key.map((singleKey) => [
          singleKey,
          this.instant(singleKey, interpolateParams, lang),
        ])
      );
    }

    const targetLang = lang ?? this.currentLang();
    const fallbackLang = this.fallbackLang();

    for (const candidateLang of [targetLang, fallbackLang]) {
      if (!candidateLang) continue;

      const translation = this.resolveKey(
        key,
        interpolateParams ?? {},
        candidateLang
      );
      if (translation !== undefined) return translation as StrictTranslation;
    }

    return (
      this.missingTranslationHandler.handle({
        key,
        translateService: this,
        interpolateParams,
      }) ?? key
    );
  }

  /** Synchronous translation. Reads signals, so it is reactive in templates. */
  instant(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Translation {
    if (!key?.length) return '';

    // Track runtime translation changes for signal consumers.
    this.store.translations();

    const result = this.getParsedResult(key, interpolateParams, lang);
    return isObservable(result) ? key : result;
  }

  /** Emits the translation once. */
  get(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation> {
    return of(this.instant(key, interpolateParams, lang));
  }

  /** Emits the translation now and after every language change. */
  stream(
    key: string | string[],
    interpolateParams?: InterpolationParameters,
    lang?: Language
  ): Observable<Translation> {
    return this.onTranslationRefresh.pipe(
      startWith(null),
      map(() => this.instant(key, interpolateParams, lang))
    );
  }

  /** Signal of the translation, updated on language or translation change. */
  translate(
    key: KeyInput,
    params?:
      | InterpolationParameters
      | (() => InterpolationParameters | undefined),
    lang?: Language | (() => Language | undefined)
  ): Signal<Translation> {
    return computed(() =>
      this.instant(readInput(key), readInput(params), readInput(lang))
    );
  }

  getBrowserLang(): Language | undefined {
    return TranslateService.getBrowserLang();
  }

  getBrowserCultureLang(): Language | undefined {
    return TranslateService.getBrowserCultureLang();
  }

  /** The browser's language without region, e.g. `"de"`. */
  static getBrowserLang(): Language | undefined {
    return TranslateService.getBrowserCultureLang()?.split(/[-_]/)[0];
  }

  /** The browser's language with region, e.g. `"de-DE"`. */
  static getBrowserCultureLang(): Language | undefined {
    if (typeof navigator === 'undefined') return undefined;
    return navigator.languages?.[0] ?? navigator.language;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateService, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateService,
      deps: [],
      target: i0.ɵɵFactoryTarget.Injectable,
    } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<TranslateService> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateService,
    } as InjectableDeclaration) as never;
}
