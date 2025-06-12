import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { useLocale } from 'angular-intlayer';
import { getLocaleName, getLocalizedUrl, LocalesValues } from 'intlayer';

@Component({
  selector: 'app-locale-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // Expose getLocaleName to the template
  getLocaleName = getLocaleName;

  changeLocale(newLocale: LocalesValues) {
    this.localeInfo.setLocale(newLocale);
  }
}
