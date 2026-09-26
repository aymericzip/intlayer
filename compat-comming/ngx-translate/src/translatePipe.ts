import {
  ChangeDetectorRef,
  Injectable,
  inject,
  type OnDestroy,
  Pipe,
  type PipeTransform,
} from '@angular/core';
import type { Subscription } from 'rxjs';
import { TranslateService } from './translateService';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
@Injectable()
export class TranslatePipe implements PipeTransform, OnDestroy {
  private translateService: TranslateService;
  private changeDetectorRef?: ChangeDetectorRef;
  private onLangChangeSub?: Subscription;

  private value: any = '';
  private lastKey?: string | null;
  private lastParams?: any;

  constructor() {
    try {
      this.translateService = inject(TranslateService);
    } catch {
      this.translateService = new TranslateService();
    }
    try {
      this.changeDetectorRef = inject(ChangeDetectorRef);
    } catch {}

    this.onLangChangeSub = this.translateService.onLangChange.subscribe(() => {
      if (this.lastKey) {
        this.updateValue(this.lastKey, this.lastParams);
      }
    });
  }

  private updateValue(key: string, params?: any): void {
    this.value = this.translateService.instant(key, params);
    this.changeDetectorRef?.markForCheck();
  }

  transform(query: string | undefined | null, ...args: any[]): any {
    if (!query) return query;

    const params = args[0];
    if (
      query !== this.lastKey ||
      JSON.stringify(params) !== JSON.stringify(this.lastParams)
    ) {
      this.lastKey = query;
      this.lastParams = params;
      this.updateValue(query, params);
    }

    return this.value;
  }

  ngOnDestroy(): void {
    this.onLangChangeSub?.unsubscribe();
  }
}
