---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Dokumentacja funkcji getCanonicalPath | intlayer
description: Zobacz, jak używać funkcji getCanonicalPath w pakiecie intlayer
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Wdrożono niestandardowe reguły przepisywania URL
---

# Dokumentacja: funkcja `getCanonicalPath` w `intlayer`

## Opis

Funkcja `getCanonicalPath` zamienia zlokalizowaną ścieżkę URL (np. `/a-propos`) na jej wewnętrzną kanoniczną ścieżkę aplikacji (np. `/about`). Jest to niezbędne, aby routery mogły dopasować poprawną wewnętrzną trasę niezależnie od języka w URL.

**Kluczowe cechy:**

- Obsługuje dynamiczne parametry trasy przy użyciu składni `[param]`.
- Porównuje zlokalizowane ścieżki z niestandardowymi regułami przepisywania (rewrite) zdefiniowanymi w Twojej konfiguracji.
- Zwraca oryginalną ścieżkę, jeśli nie znaleziono pasującej reguły przepisywania.

---

## Sygnatura funkcji

```typescript
getCanonicalPath(
  localizedPath: string,         // Wymagane
  locale: Locales,               // Wymagane
  rewriteRules?: RoutingConfig['rewrite'] // Opcjonalne
): string
```

---

## Parametry

### Wymagane parametry

- `localizedPath: string`
  - **Opis**: Zlokalizowana ścieżka widoczna w przeglądarce (np. `/a-propos`).
  - **Typ**: `string`
  - **Wymagane**: Tak

- `locale: Locales`
  - **Opis**: Locale używany dla rozwiązywanej ścieżki.
  - **Typ**: `Locales`
  - **Wymagane**: Tak

### Parametry opcjonalne

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Opis**: Obiekt definiujący niestandardowe reguły przepisywania. Jeśli nie zostanie podany, domyślnie używana jest właściwość `routing.rewrite` z konfiguracji Twojego projektu.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Domyślnie**: `configuration.routing.rewrite`

---

## Zwraca

- **Typ**: `string`
- **Opis**: Wewnętrzna kanoniczna ścieżka.

---

## Przykład użycia

### Podstawowe użycie (z konfiguracją)

Jeśli skonfigurowałeś niestandardowe reguły rewrite w swoim `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfiguracja: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Wynik: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Wynik: "/about"
```

### Użycie tras dynamicznych

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfiguracja: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Wynik: "/product/123"
```

### Ręczne reguły przepisywania

Możesz również przekazać ręczne reguły przepisywania do funkcji:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Wyjście: "/contact"
```

---

## Powiązane funkcje

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedPath.md): Mapuje kanoniczną ścieżkę na jej zlokalizowany odpowiednik.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md): Generuje w pełni zlokalizowany URL (łącznie z protokołem, hostem i prefiksem lokalizacji).
