import * as i0 from '@angular/core';
import { inject, type PipeTransform, type Signal } from '@angular/core';
import type {
  FactoryDeclaration,
  PipeDeclaration,
} from './partialDeclarations';
import { TranslateService } from './translateService';
import type { InterpolationParameters, Translation } from './types';
import { equals, isDict, isString } from './util';

/**
 * `{{ 'home.title' | translate: { name } }}` — impure pipe reading a
 * translation signal, so the view refreshes on language change.
 */
export class TranslatePipe implements PipeTransform {
  private readonly translateService = inject(TranslateService);
  private cachedTranslation: Signal<Translation> | null = null;
  private lastKey: string | null = null;
  private lastParams: InterpolationParameters | undefined;

  transform(
    query: string | undefined | null,
    ...args: unknown[]
  ): Translation | undefined | null {
    if (!query?.length) return query;

    const interpolateParams = this.parseArgs(args);

    if (query !== this.lastKey || !equals(interpolateParams, this.lastParams)) {
      this.cachedTranslation = this.translateService.translate(
        query,
        interpolateParams
      );
      this.lastKey = query;
      this.lastParams = interpolateParams;
    }

    return this.cachedTranslation?.();
  }

  /** Accepts an object, or an object literal written as a template string. */
  private parseArgs(args: unknown[]): InterpolationParameters | undefined {
    const [firstArgument] = args;

    if (isString(firstArgument) && firstArgument.length) {
      const json = firstArgument
        .replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g, '"$2":')
        .replace(/:(\s)?(')(.*?)(')/g, ':"$3"');
      try {
        return JSON.parse(json) as InterpolationParameters;
      } catch {
        throw new SyntaxError(
          `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${firstArgument}`
        );
      }
    }

    return isDict(firstArgument) ? firstArgument : undefined;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslatePipe,
      deps: [],
      target: i0.ɵɵFactoryTarget.Pipe,
    } as FactoryDeclaration) as never;
  static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, 'translate', true> =
    i0.ɵɵngDeclarePipe({
      minVersion: '14.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslatePipe,
      isStandalone: true,
      name: 'translate',
      pure: false,
    } as PipeDeclaration) as never;
}
