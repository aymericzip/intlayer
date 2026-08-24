---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Dokumentacja funkcji getLocalizedPath | intlayer
description: Zobacz, jak używać funkcji getLocalizedPath w pakiecie intlayer
keywords:
  - getLocalizedPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Dokumentacja funkcji `getLocalizedPath` w `intlayer`

## Opis

Funkcja `getLocalizedPath` przekształca kanoniczną ścieżkę (wewnętrzną ścieżkę aplikacji) w jej zlokalizowany odpowiednik na podstawie podanego locale i reguł przepisywania (rewrite rules). Jest szczególnie przydatna do generowania przyjaznych dla SEO adresów URL, które różnią się w zależności od języka.

To względny odpowiednik [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md) — dla względnych danych wejściowych oba zwracają tę samą wartość. W przeciwieństwie do `getLocalizedUrl`, nigdy nie zwraca absolutnego URL: konfiguracja `domains` jest ignorowana, więc locale obsługiwane z własnej domeny nadal zwraca ścieżkę. Absolutne dane wejściowe są akceptowane, ale ich pochodzenie jest odrzucane — przechowywane są tylko ścieżka, ciąg zapytania i hash.

**Główne cechy:**

- Obsługuje dynamiczne parametry tras przy użyciu składni `[param]`.
- Rozwiązuje ścieżki zgodnie z niestandardowymi regułami przepisywania zdefiniowanymi w Twojej konfiguracji.
- Automatycznie obsługuje powrót do ścieżki kanonicznej, jeśli dla określonego locale nie zostanie znaleziona reguła przepisywania.

---

## Sygnatura funkcji

```typescript
getLocalizedPath(
  canonicalPath: string,         // Wymagany
  locale: Locales,               // Wymagany
  rewriteRules?: RoutingConfig['rewrite'] // Opcjonalny
): string
```

---

## Parametry

### Parametry wymagane

- `canonicalPath: string`
  - **Opis**: Wewnętrzna ścieżka aplikacji (np. `/about`, `/product/[id]`).
  - **Typ**: `string`
  - **Wymagane**: Tak

### Opcjonalne parametry

- `locale?: Locales`
  - **Description**: Docelowy język, dla którego ścieżka powinna być zlokalizowana.
  - **Type**: `Locales`
  - **Default**: Domyślny język konfiguracji Twojego projektu.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Opis**: Obiekt definiujący niestandardowe reguły przepisywania. Jeśli nie zostanie podany, domyślnie używana jest właściwość `routing.rewrite` z konfiguracji projektu.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Domyślnie**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — obsługiwane locales. **Domyślnie**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — locale domyślny. **Domyślnie**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — jak locale pojawia się w ścieżce. **Domyślnie**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — niestandardowe reguły rewrite. **Domyślnie**: `configuration.routing.rewrite`

---

## Zwraca

- **Typ**: `string`
- **Opis**: Zlokalizowana ścieżka dla podanego locale.

Typ jest zawężany na podstawie reguł przepisywania zadeklarowanych w konfiguracji, więc edytor pokazuje rozpoznaną ścieżkę zamiast zwykłego `string`:

```typescript codeFormat="typescript"
// Konfiguracja: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (brak pasującego wariantu przepisywania, stosowana jest tylko prefiksacja)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

To samo zawężenie trafia do [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md), która stosuje reguły przepisywania przed dodaniem prefiksu locale'a.

Dwa przypadki pozostają poszerzone do `string`, ponieważ nie mogą być rozwiązane w czasie kompilacji:

- ścieżka, która nie jest literałem łańcucha (np. zbudowana ze zmiennej);
- ścieżka dopasowana przez regułę używającą parametru wielosegmentowego lub opcjonalnego (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Przykład użycia

### Podstawowe użycie (z konfiguracją)

Jeśli w swoim `intlayer.config.ts` skonfigurowałeś niestandardowe rewrites:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Konfiguracja: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Użycie z trasami dynamicznymi

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Konfiguracja: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Ręczne reguły przepisywania

Możesz również przekazać ręczne reguły przepisywania do funkcji:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

### Pomijanie ustawień regionalnych

Gdy nie podano ustawień regionalnych, ścieżka jest lokalizowana dla skonfigurowanego domyślnego ustawienia regionalnego:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Konfiguracja: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Wynik: "/about"
```

---

## Powiązane funkcje

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getCanonicalPath.md): Rozwiązuje zlokalizowaną ścieżkę z powrotem na jej wewnętrzną ścieżkę kanoniczną.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md): Generuje w pełni zlokalizowany adres URL (włączając protokół, host i prefiks lokalizacji).
