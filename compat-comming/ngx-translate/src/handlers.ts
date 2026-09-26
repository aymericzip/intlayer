import { Injectable } from '@angular/core';
import { interpolateMessage } from '@intlayer/core/messageFormat';
import { type Observable, of } from 'rxjs';
import type {
  InterpolatableTranslation,
  InterpolatableTranslationObject,
  InterpolateFunction,
  MissingTranslationHandlerParams,
  StrictTranslation,
  TranslationObject,
} from './types';
import { getValue } from './util';

export abstract class MissingTranslationHandler {
  abstract handle(
    params: MissingTranslationHandlerParams
  ): StrictTranslation | Observable<StrictTranslation>;
}

@Injectable({ providedIn: 'root' })
export class DefaultMissingTranslationHandler
  implements MissingTranslationHandler
{
  handle(params: MissingTranslationHandlerParams): string {
    return params.key;
  }
}

export abstract class TranslateCompiler {
  abstract compile(value: string, lang: string): InterpolatableTranslation;
  abstract compileTranslations(
    translations: TranslationObject,
    lang: string
  ): InterpolatableTranslationObject;
}

@Injectable({ providedIn: 'root' })
export class TranslateNoOpCompiler extends TranslateCompiler {
  compile(value: string, _lang: string): string | InterpolateFunction {
    return value;
  }

  compileTranslations(
    translations: TranslationObject,
    _lang: string
  ): InterpolatableTranslationObject {
    return translations;
  }
}

export abstract class TranslateLoader {
  abstract getTranslation(lang: string): Observable<TranslationObject>;
}

@Injectable({ providedIn: 'root' })
export class TranslateNoOpLoader extends TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of({});
  }
}

export abstract class TranslateParser {
  abstract interpolate(
    expr: string | InterpolateFunction,
    params?: any
  ): string;
  abstract getValue(target: any, key: string): any;
}

@Injectable({ providedIn: 'root' })
export class TranslateDefaultParser extends TranslateParser {
  templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

  interpolate(expr: string | InterpolateFunction, params?: any): string {
    if (typeof expr === 'function') {
      return expr(params);
    }

    if (typeof expr !== 'string') {
      return '';
    }

    if (!params) {
      return expr;
    }

    return interpolateMessage(expr, params, 'en');
  }

  getValue(target: any, key: string): any {
    return getValue(target, key);
  }
}

export class TranslateStore {
  /**
   * The default lang to fall back to
   */
  defaultLang = 'en';

  /**
   * The current lang in use
   */
  currentLang = 'en';

  /**
   * The translations by lang
   */
  translations: Record<string, any> = {};

  /**
   * Compiled translations
   */
  compiledTranslations: Record<string, any> = {};
}
