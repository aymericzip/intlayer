import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { useLocale } from 'angular-intlayer';

@Component({
  selector: 'app-locale-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <div class="select-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="globe-icon" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.424-1.248 1.16-1.64 2.103h3.28c-.392-.943-.97-1.68-1.64-2.103M12.923 7h1.99a7 7 0 0 0-.307-2H11.51c.325.596.577 1.282.721 2M14.913 9h-1.99c-.144.717-.396 1.404-.72 2h3.096c.217-.616.342-1.284.342-2m-13.826 0h1.99c.144.717.396 1.404.72 2H1.517c-.217-.616-.342-1.284-.342-2M1.517 7h3.096c-.144-.718-.396-1.404-.72-2H1.9a7 7 0 0 0-.307 2M8 10c.854 0 1.58-.87 1.82-2h-3.64c.24 1.13.966 2 1.82 2m-.001-4c-.854 0-1.58.87-1.82 2h3.64c-.24-1.13-.966-2-1.82-2M1.503 10.518l2.91-1.042C4.545 9.172 4.7 8.847 4.9 8.5L2.09 7.643a6.97 6.97 0 0 0-.587 2.875M6.8 11.5c.392.943.97 1.68 1.64 2.103c.67-.424 1.248-1.16 1.64-2.103zm2.61 2.378c.84-.45 1.558-1.096 2.096-1.878H9.378c-.287.712-.663 1.346-1.108 1.878m-4.256 0a6.97 6.97 0 0 1-1.108-1.878H1.916c.538.782 1.256 1.428 2.096 1.878M13.79 5.864c.325.596.577 1.282.721 2h1.002a6.97 6.97 0 0 0-1.723-2m-9.56-.364L1.916 3.622A6.97 6.97 0 0 0 .808 5.5h3.096c.287-.712.663-1.346 1.108-1.878m4.256 0c.445.532.82 1.166 1.108 1.878h3.096a6.97 6.97 0 0 0-1.108-1.878z"/>
        </svg>
        <select [value]="locale()" (change)="setLocale($any($event.target).value)">
          @for (loc of availableLocales; track loc) {
            <option [value]="loc">{{ getLocaleLabel(loc) }}</option>
          }
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="chevron-icon" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
      </div>
    </div>
  `,
  styles: [
    `
    .locale-switcher {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 100;
    }
    .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(229, 231, 235, 0.8);
      border-radius: 12px;
      padding: 0.5rem 0.8rem;
      gap: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .select-wrapper:hover {
      background: rgba(255, 255, 255, 0.98);
      border-color: #3b82f6;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.12);
    }
    .globe-icon {
      color: #4b5563;
      transition: color 0.2s ease;
    }
    .select-wrapper:hover .globe-icon {
      color: #3b82f6;
    }
    select {
      appearance: none;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
      cursor: pointer;
      padding-right: 1.5rem;
      font-family: inherit;
    }
    .chevron-icon {
      position: absolute;
      right: 0.8rem;
      color: #4b5563;
      pointer-events: none;
      transition: color 0.2s ease;
    }
    .select-wrapper:hover .chevron-icon {
      color: #3b82f6;
    }
  `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;

  getLocaleLabel(locale: string): string {
    switch (locale) {
      case 'en':
        return '🇬🇧 English';
      case 'fr':
        return '🇫🇷 Français';
      case 'es':
        return '🇪🇸 Español';
      default:
        return locale.toUpperCase();
    }
  }
}
