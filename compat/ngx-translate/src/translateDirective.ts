import * as i0 from '@angular/core';
import {
  ElementRef,
  effect,
  Injector,
  inject,
  type Signal,
  signal,
  type WritableSignal,
} from '@angular/core';
import type {
  DirectiveDeclaration,
  FactoryDeclaration,
} from './partialDeclarations';
import { TranslateService } from './translateService';
import type { InterpolationParameters, Translation } from './types';
import { equals, isString } from './util';

/**
 * `<p [translate]="'home.title'" [translateParams]="{ name }"></p>` or
 * `<p translate>home.title</p>` — writes the translation as text content.
 */
export class TranslateDirective {
  private readonly translateService = inject(TranslateService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  private readonly keySignal: WritableSignal<string | undefined> =
    signal(undefined);
  private readonly paramsSignal: WritableSignal<
    InterpolationParameters | undefined
  > = signal(undefined);
  private translation: Signal<Translation> | null = null;

  set translate(key: string) {
    if (!key) return;
    this.keySignal.set(key);
    this.ensureRendering();
  }

  set translateParams(params: InterpolationParameters) {
    if (!equals(this.paramsSignal(), params)) this.paramsSignal.set(params);
  }

  /** Content-key form: the element's own text is the key. */
  ngAfterViewInit(): void {
    if (this.keySignal()) return;

    const contentKey = this.element.nativeElement.textContent?.trim();
    if (!contentKey) return;

    this.keySignal.set(contentKey);
    this.ensureRendering();
  }

  private ensureRendering(): void {
    if (this.translation) return;

    this.translation = this.translateService.translate(
      () => this.keySignal() ?? '',
      () => this.paramsSignal()
    );

    effect(
      () => {
        const value = this.translation?.();
        this.element.nativeElement.textContent = isString(value)
          ? value
          : value === undefined || value === null
            ? (this.keySignal() ?? '')
            : JSON.stringify(value);
      },
      { injector: this.injector }
    );
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateDirective, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateDirective,
      deps: [],
      target: i0.ɵɵFactoryTarget.Directive,
    } as FactoryDeclaration) as never;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TranslateDirective,
    '[translate],[ngx-translate]',
    never,
    {
      translate: { alias: 'translate'; required: false };
      translateParams: { alias: 'translateParams'; required: false };
    },
    {},
    never,
    never,
    true,
    never
  > = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '17.0.0',
    type: TranslateDirective,
    isStandalone: true,
    selector: '[translate],[ngx-translate]',
    inputs: {
      translate: 'translate',
      translateParams: 'translateParams',
    },
    ngImport: i0,
  } as DirectiveDeclaration) as never;
}
