import { Injectable } from '@angular/core';
import type { Locales } from '@intlayer/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { getBrowserLocale } from './getBrowserLocale';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private localeSubject = new BehaviorSubject<Locales>(
    getBrowserLocale() || ('en' as Locales)
  );

  public locale$: Observable<Locales> = this.localeSubject.asObservable();

  constructor() {
    // Initialize with browser locale if available
    const browserLocale = getBrowserLocale();
    if (browserLocale) {
      this.setLocale(browserLocale);
    }
  }

  get currentLocale(): Locales {
    return this.localeSubject.value;
  }

  setLocale(locale: Locales): void {
    this.localeSubject.next(locale);

    // Optionally store in localStorage for persistence
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('intlayer-locale', locale);
    }
  }

  getStoredLocale(): Locales | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('intlayer-locale') as Locales;
    }
    return null;
  }

  clearStoredLocale(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('intlayer-locale');
    }
  }
}
