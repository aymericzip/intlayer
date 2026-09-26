import * as i0 from '@angular/core';
import { inject, TemplateRef, ViewContainerRef } from '@angular/core';
import type {
  DirectiveDeclaration,
  FactoryDeclaration,
} from './partialDeclarations';
import { TranslateService } from './translateService';
import type { InterpolationParameters, Translation } from './types';

/** Template context of `*translateBlock="let t"`. */
export class TranslateBlockContext {
  constructor(
    public $implicit: (
      key: string,
      params?: InterpolationParameters
    ) => Translation
  ) {}
}

/**
 * `<div *translateBlock="let t">{{ t('home.title') }}</div>` — exposes
 * `instant` to a template block.
 */
export class TranslateBlockDirective {
  private readonly templateRef =
    inject<TemplateRef<TranslateBlockContext>>(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(
      this.templateRef,
      new TranslateBlockContext((key, params) =>
        this.translateService.instant(key, params)
      )
    );
  }

  static ngTemplateContextGuard(
    _directive: TranslateBlockDirective,
    _context: unknown
  ): _context is TranslateBlockContext {
    return true;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<TranslateBlockDirective, never> =
    i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '17.0.0',
      ngImport: i0,
      type: TranslateBlockDirective,
      deps: [],
      target: i0.ɵɵFactoryTarget.Directive,
    } as FactoryDeclaration) as never;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    TranslateBlockDirective,
    '[translateBlock]',
    never,
    {},
    {},
    never,
    never,
    true,
    never
  > = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '17.0.0',
    type: TranslateBlockDirective,
    isStandalone: true,
    selector: '[translateBlock]',
    ngImport: i0,
  } as DirectiveDeclaration) as never;
}
