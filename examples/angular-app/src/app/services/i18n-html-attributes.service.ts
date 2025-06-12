import { Injectable, effect } from '@angular/core';
import { useLocale } from 'angular-intlayer';
import { getHTMLTextDir } from 'intlayer';

@Injectable({
  providedIn: 'root',
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // This method can be called in the app's root component to ensure the service is initialized.
  init() {}
}
