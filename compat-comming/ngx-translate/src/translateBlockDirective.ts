import {
  Directive,
  inject,
  type OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TranslateService } from './translateService';
import type { InterpolationParameters, Translation } from './types';

export class TranslateBlockContext {
  $implicit: (key: string, params?: InterpolationParameters) => Translation;

  constructor(
    $implicit: (key: string, params?: InterpolationParameters) => Translation
  ) {
    this.$implicit = $implicit;
  }
}

@Directive({
  selector: '[translateBlock]',
  standalone: true,
})
export class TranslateBlockDirective implements OnInit {
  private templateRef?: TemplateRef<TranslateBlockContext>;
  private viewContainer?: ViewContainerRef;
  private translateService: TranslateService;

  constructor() {
    try {
      this.translateService = inject(TranslateService);
    } catch {
      this.translateService = new TranslateService();
    }
    try {
      this.templateRef = inject(TemplateRef);
      this.viewContainer = inject(ViewContainerRef);
    } catch {}
  }

  ngOnInit(): void {
    const context = new TranslateBlockContext((key, params) =>
      this.translateService.instant(key, params)
    );
    this.viewContainer?.createEmbeddedView(this.templateRef!, context);
  }

  static ngTemplateContextGuard(
    _dir: TranslateBlockDirective,
    _ctx: unknown
  ): _ctx is TranslateBlockContext {
    return true;
  }
}
