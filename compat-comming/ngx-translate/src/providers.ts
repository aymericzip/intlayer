import {
  type ClassProvider,
  type FactoryProvider,
  InjectionToken,
  type Provider,
  type Type,
} from '@angular/core';
import {
  DefaultMissingTranslationHandler,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateDefaultParser,
  TranslateLoader,
  TranslateNoOpCompiler,
  TranslateNoOpLoader,
  TranslateParser,
  TranslateStore,
} from './handlers';
import { TranslateService } from './translateService';
import type {
  ChildTranslateServiceConfig,
  RootTranslateServiceConfig,
} from './types';

export const TRANSLATE_SERVICE_CONFIG =
  new InjectionToken<RootTranslateServiceConfig>('TRANSLATE_SERVICE_CONFIG');

export function provideTranslateLoader(
  loaderOrFactory: Type<TranslateLoader> | (() => TranslateLoader)
): ClassProvider | FactoryProvider {
  if (typeof loaderOrFactory === 'function' && loaderOrFactory.prototype) {
    return {
      provide: TranslateLoader,
      useClass: loaderOrFactory as Type<TranslateLoader>,
    };
  }
  return {
    provide: TranslateLoader,
    useFactory: loaderOrFactory as () => TranslateLoader,
  };
}

export function provideTranslateCompiler(
  compilerOrFactory: Type<TranslateCompiler> | (() => TranslateCompiler)
): ClassProvider | FactoryProvider {
  if (typeof compilerOrFactory === 'function' && compilerOrFactory.prototype) {
    return {
      provide: TranslateCompiler,
      useClass: compilerOrFactory as Type<TranslateCompiler>,
    };
  }
  return {
    provide: TranslateCompiler,
    useFactory: compilerOrFactory as () => TranslateCompiler,
  };
}

export function provideTranslateParser(
  parserOrFactory: Type<TranslateParser> | (() => TranslateParser)
): ClassProvider | FactoryProvider {
  if (typeof parserOrFactory === 'function' && parserOrFactory.prototype) {
    return {
      provide: TranslateParser,
      useClass: parserOrFactory as Type<TranslateParser>,
    };
  }
  return {
    provide: TranslateParser,
    useFactory: parserOrFactory as () => TranslateParser,
  };
}

export function provideMissingTranslationHandler(
  handlerOrFactory:
    | Type<MissingTranslationHandler>
    | (() => MissingTranslationHandler)
): ClassProvider | FactoryProvider {
  if (typeof handlerOrFactory === 'function' && handlerOrFactory.prototype) {
    return {
      provide: MissingTranslationHandler,
      useClass: handlerOrFactory as Type<MissingTranslationHandler>,
    };
  }
  return {
    provide: MissingTranslationHandler,
    useFactory: handlerOrFactory as () => MissingTranslationHandler,
  };
}

export const provideTranslateService = (
  config: RootTranslateServiceConfig = {}
): Provider[] => {
  const providers: Provider[] = [
    TranslateService,
    TranslateStore,
    {
      provide: TRANSLATE_SERVICE_CONFIG,
      useValue: config,
    },
    {
      provide: TranslateLoader,
      useClass: TranslateNoOpLoader,
    },
    {
      provide: TranslateCompiler,
      useClass: TranslateNoOpCompiler,
    },
    {
      provide: TranslateParser,
      useClass: TranslateDefaultParser,
    },
    {
      provide: MissingTranslationHandler,
      useClass: DefaultMissingTranslationHandler,
    },
  ];

  if (config.loader) {
    providers.push(provideTranslateLoader(config.loader as any));
  }
  if (config.compiler) {
    providers.push(provideTranslateCompiler(config.compiler as any));
  }
  if (config.parser) {
    providers.push(provideTranslateParser(config.parser as any));
  }
  if (config.missingTranslationHandler) {
    providers.push(
      provideMissingTranslationHandler(config.missingTranslationHandler as any)
    );
  }

  return providers;
};

export const provideChildTranslateService = (
  config: ChildTranslateServiceConfig = {}
): Provider[] => {
  return provideTranslateService(config);
};
