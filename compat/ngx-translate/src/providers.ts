import type { Provider, Type } from '@angular/core';
import {
  DefaultMissingTranslationHandler,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateDefaultParser,
  TranslateLoader,
  TranslateNoOpCompiler,
  TranslateNoOpLoader,
  TranslateParser,
} from './handlers';
import { TRANSLATE_SERVICE_CONFIG, TranslateService } from './translateService';
import { TranslateStore } from './translateStore';
import type {
  ChildTranslateServiceConfig,
  RootTranslateServiceConfig,
  TranslateProvider,
} from './types';

/** A class to instantiate, or a factory returning the instance. */
type ClassOrFactory<T> = Type<T> | (() => T);

/** Whether a function is a class constructor rather than a factory. */
const isClass = (value: unknown): value is Type<unknown> =>
  typeof value === 'function' &&
  /^class\s/.test(Function.prototype.toString.call(value));

const toProvider = <T>(
  token: abstract new (...args: never[]) => T,
  value: ClassOrFactory<T>
): Provider =>
  isClass(value)
    ? { provide: token, useClass: value }
    : { provide: token, useFactory: value as () => T };

export const provideTranslateLoader = (
  loader: ClassOrFactory<TranslateLoader>
): Provider => toProvider(TranslateLoader, loader);

export const provideTranslateCompiler = (
  compiler: ClassOrFactory<TranslateCompiler>
): Provider => toProvider(TranslateCompiler, compiler);

export const provideTranslateParser = (
  parser: ClassOrFactory<TranslateParser>
): Provider => toProvider(TranslateParser, parser);

export const provideMissingTranslationHandler = (
  handler: ClassOrFactory<MissingTranslationHandler>
): Provider => toProvider(MissingTranslationHandler, handler);

/**
 * A plugin slot: the default class, a bare class / factory (wrapped), or a
 * ready provider.
 */
const resolvePluginProvider = <T>(
  token: abstract new (...args: never[]) => T,
  value: TranslateProvider | ClassOrFactory<T> | undefined,
  defaultClass: Type<T>
): Provider => {
  if (value === undefined) return toProvider(token, defaultClass);
  if (typeof value === 'function') {
    return toProvider(token, value as ClassOrFactory<T>);
  }
  return value;
};

const createProviders = (
  config: RootTranslateServiceConfig & ChildTranslateServiceConfig
): Provider[] => [
  resolvePluginProvider(TranslateLoader, config.loader, TranslateNoOpLoader),
  resolvePluginProvider(
    TranslateCompiler,
    config.compiler,
    TranslateNoOpCompiler
  ),
  resolvePluginProvider(TranslateParser, config.parser, TranslateDefaultParser),
  resolvePluginProvider(
    MissingTranslationHandler,
    config.missingTranslationHandler,
    DefaultMissingTranslationHandler
  ),
  TranslateStore,
  { provide: TRANSLATE_SERVICE_CONFIG, useValue: config },
  TranslateService,
];

/**
 * Root providers: `bootstrapApplication(App, { providers: [
 * provideIntlayer(), provideTranslateService({ fallbackLang: 'en' })] })`.
 */
export const provideTranslateService = (
  config: RootTranslateServiceConfig = {}
): Provider[] => createProviders(config);

/**
 * Providers for a lazy route or component subtree. Every service shares
 * intlayer's locale, so a child service only scopes runtime translations.
 */
export const provideChildTranslateService = (
  config: ChildTranslateServiceConfig = {}
): Provider[] => createProviders(config);
