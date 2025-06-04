import { Injectable } from '@angular/core';
import type { Locales } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { Observable, map } from 'rxjs';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dictionaryCache = new Map<string, any>();

  constructor(private localeService: LocaleService) {}

  getDictionary<T extends Dictionary & { id: string }>(
    dictionary: T,
    locale?: Locales
  ): any {
    const targetLocale = locale || this.localeService.currentLocale;
    const cacheKey = `${dictionary.id}-${targetLocale}`;

    if (this.dictionaryCache.has(cacheKey)) {
      return this.dictionaryCache.get(cacheKey);
    }

    // Use a simpler approach to avoid type complexity
    const result = dictionary.content || dictionary;
    this.dictionaryCache.set(cacheKey, result);

    return result;
  }

  getDictionary$<T extends Dictionary & { id: string }>(
    dictionary: T
  ): Observable<any> {
    return this.localeService.locale$.pipe(
      map((locale) => this.getDictionary(dictionary, locale))
    );
  }

  getDictionaries$(
    dictionaries: (Dictionary & { id: string })[]
  ): Observable<any[]> {
    return this.localeService.locale$.pipe(
      map((locale) =>
        dictionaries.map((dict) => this.getDictionary(dict, locale))
      )
    );
  }

  clearCache(): void {
    this.dictionaryCache.clear();
  }

  clearCacheForDictionary(dictionaryId: string): void {
    const keysToDelete = Array.from(this.dictionaryCache.keys()).filter((key) =>
      key.startsWith(`${dictionaryId}-`)
    );

    keysToDelete.forEach((key) => this.dictionaryCache.delete(key));
  }
}
