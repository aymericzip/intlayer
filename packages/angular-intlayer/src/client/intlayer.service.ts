import { Injectable } from '@angular/core';
import type { Locales } from '@intlayer/config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntlayerService {
  private localeSubject = new BehaviorSubject<Locales>('en' as Locales);
  public locale$ = this.localeSubject.asObservable();

  get currentLocale(): Locales {
    return this.localeSubject.value;
  }

  setLocale(locale: Locales): void {
    this.localeSubject.next(locale);
  }
}
