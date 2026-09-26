import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LOCALE_LABELS: Record<string, string> = {
  en: '🇬🇧 English',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
};

@Component({
  selector: 'app-locale-switcher',
  template: `
    <div class="locale-switcher">
      <select
        [value]="translateService.getCurrentLang()"
        (change)="changeLanguage($event)"
      >
        @for (language of translateService.getLangs(); track language) {
          <option [value]="language">{{ getLocaleLabel(language) }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .locale-switcher {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
      }
      select {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 0.5rem 0.8rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  protected readonly translateService = inject(TranslateService);

  changeLanguage(event: Event): void {
    this.translateService.use((event.target as HTMLSelectElement).value);
  }

  getLocaleLabel(language: string): string {
    return LOCALE_LABELS[language] ?? language.toUpperCase();
  }
}
