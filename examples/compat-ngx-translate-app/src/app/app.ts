import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
  translate,
} from '@ngx-translate/core';
import { LocaleSwitcherComponent } from './locale-switcher.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LocaleSwitcherComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly translateService = inject(TranslateService);

  readonly count = signal(0);

  /** Signal API (ngx-translate 17+). */
  readonly subtitle = translate('home.subtitle');

  increment(): void {
    this.count.update((count) => count + 1);
  }

  /** Imperative API, re-evaluated on every change detection. */
  get instantMessage(): string {
    return this.translateService.instant('home.instant', {
      lang: this.translateService.getCurrentLang(),
    });
  }
}
