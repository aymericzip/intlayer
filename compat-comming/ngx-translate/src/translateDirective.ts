import {
  type AfterViewChecked,
  Directive,
  ElementRef,
  Input,
  inject,
  type OnDestroy,
} from '@angular/core';
import type { Subscription } from 'rxjs';
import { TranslateService } from './translateService';
import type { InterpolationParameters } from './types';

@Directive({
  selector: '[translate],[ngx-translate]',
  standalone: true,
})
export class TranslateDirective implements AfterViewChecked, OnDestroy {
  private translateService: TranslateService;
  private element?: ElementRef;
  private onLangChangeSub?: Subscription;

  private key?: string;
  private currentParams?: InterpolationParameters;
  private lastContent?: string;

  @Input() set translate(key: string) {
    if (key) {
      this.key = key;
      this.checkNodes();
    }
  }

  @Input() set translateParams(params: InterpolationParameters) {
    this.currentParams = params;
    this.checkNodes();
  }

  constructor() {
    try {
      this.translateService = inject(TranslateService);
    } catch {
      this.translateService = new TranslateService();
    }
    try {
      this.element = inject(ElementRef);
    } catch {}

    this.onLangChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.checkNodes();
    });
  }

  ngAfterViewChecked(): void {
    this.checkNodes();
  }

  private checkNodes(): void {
    let key = this.key;
    if (!key && this.element?.nativeElement) {
      const content = this.element.nativeElement.textContent?.trim();
      if (content) {
        key = content;
      }
    }

    if (!key) return;

    const res = this.translateService.instant(key, this.currentParams);
    if (res !== this.lastContent && this.element?.nativeElement) {
      this.lastContent = res;
      this.element.nativeElement.innerHTML = res;
    }
  }

  ngOnDestroy(): void {
    this.onLangChangeSub?.unsubscribe();
  }
}
