import * as i0 from '@angular/core';
import { type Observable, of } from 'rxjs';
import type {
  FactoryDeclaration,
  InjectableDeclaration,
} from './partialDeclarations';
import type {
  InterpolatableTranslation,
  InterpolatableTranslationObject,
  InterpolateFunction,
  InterpolationParameters,
  MissingTranslationHandlerParams,
  StrictTranslation,
  TranslationObject,
} from './types';
import { getValue, isDefinedAndNotNull, isFunction, isString } from './util';

/*
 * Angular metadata is written as partial declarations (`ɵɵngDeclare*`), the
 * format ngx-translate itself ships: the application build links them to the
 * user's Angular version, so no JIT compiler is needed at runtime.
 */

/** Handles a key missing from every translation source. */
export abstract class MissingTranslationHandler {
  abstract handle(
    params: MissingTranslationHandlerParams
  ): StrictTranslation | Observable<StrictTranslation> | undefined;
}

/** Returns the key itself, ngx-translate's default. */
export class DefaultMissingTranslationHandler
  implements MissingTranslationHandler
{
  handle(params: MissingTranslationHandlerParams): string {
    return params.key;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<
    DefaultMissingTranslationHandler,
    never
  > = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '17.0.0',
    ngImport: i0,
    type: DefaultMissingTranslationHandler,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<DefaultMissingTranslationHandler> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: DefaultMissingTranslationHandler,
    } as InjectableDeclaration) as never;
}

/** Compiles runtime translations registered through `setTranslation()`. */
export abstract class TranslateCompiler {
  abstract compile(value: string, lang: string): InterpolatableTranslation;
  abstract compileTranslations(
    translations: TranslationObject,
    lang: string
  ): InterpolatableTranslationObject;
}

export class TranslateNoOpCompiler extends TranslateCompiler {
  compile(value: string, _lang: string): string {
    return value;
  }

  compileTranslations(
    translations: TranslationObject,
    _lang: string
  ): InterpolatableTranslationObject {
    return translations as InterpolatableTranslationObject;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateNoOpCompiler, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateNoOpCompiler,
      deps: [],
      target: i0.ɵɵFactoryTarget.Injectable,
    } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<TranslateNoOpCompiler> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateNoOpCompiler,
    } as InjectableDeclaration) as never;
}

/**
 * Loads runtime translations for a language. Intlayer dictionaries need no
 * loader; one is only called for catalogs kept outside intlayer.
 */
export abstract class TranslateLoader {
  abstract getTranslation(lang: string): Observable<TranslationObject>;
}

export class TranslateNoOpLoader extends TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of({});
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateNoOpLoader, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateNoOpLoader,
      deps: [],
      target: i0.ɵɵFactoryTarget.Injectable,
    } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<TranslateNoOpLoader> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateNoOpLoader,
    } as InjectableDeclaration) as never;
}

/** Interpolates parameters into a translation. */
export abstract class TranslateParser {
  abstract interpolate(
    expression: InterpolatableTranslation,
    params?: InterpolationParameters
  ): string | undefined;
}

/** `{{ name }}` / `{{ user.name }}` interpolation, like ngx-translate. */
export class TranslateDefaultParser extends TranslateParser {
  templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;

  interpolate(
    expression: InterpolatableTranslation,
    params?: InterpolationParameters
  ): string | undefined {
    if (isString(expression)) {
      return this.interpolateString(expression, params);
    }
    if (isFunction(expression)) {
      return (expression as InterpolateFunction)(params);
    }
    return undefined;
  }

  protected interpolateString(
    expression: string,
    params?: InterpolationParameters
  ): string {
    if (!params) return expression;

    return expression.replace(
      this.templateMatcher,
      (substring, key: string) => {
        const replacement = this.formatValue(getValue(params, key));
        return replacement ?? substring;
      }
    );
  }

  protected formatValue(value: unknown): string | undefined {
    if (isString(value)) return value;
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }
    if (!isDefinedAndNotNull(value)) return undefined;

    const text = String(value);
    return text === '[object Object]' ? JSON.stringify(value) : text;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateDefaultParser, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateDefaultParser,
      deps: [],
      target: i0.ɵɵFactoryTarget.Injectable,
    } as FactoryDeclaration) as never;
  static ɵprov: i0.ɵɵInjectableDeclaration<TranslateDefaultParser> =
    i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateDefaultParser,
    } as InjectableDeclaration) as never;
}
