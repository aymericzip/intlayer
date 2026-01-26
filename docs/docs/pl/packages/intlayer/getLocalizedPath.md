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
    changes: Implement custom URL rewrites
---

# Dokumentacja funkcji `getLocalizedPath` w `intlayer`

## Opis

Funkcja `getLocalizedPath` przekształca kanoniczną ścieżkę (wewnętrzną ścieżkę aplikacji) w jej zlokalizowany odpowiednik na podstawie podanego locale i reguł przepisywania (rewrite rules). Jest szczególnie przydatna do generowania przyjaznych dla SEO adresów URL, które różnią się w zależności od języka.

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

- `locale: Locales`
  - **Opis**: Docelowy locale, dla którego ścieżka ma być zlokalizowana.
  - **Typ**: `Locales`
  - **Wymagane**: Tak

### Opcjonalne parametry

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Opis**: Obiekt definiujący niestandardowe reguły przepisywania. Jeśli nie zostanie podany, domyślnie używana jest właściwość `routing.rewrite` z konfiguracji projektu.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Domyślnie**: `configuration.routing.rewrite`

---

## Zwraca

- **Typ**: `string`
- **Opis**: Zlokalizowana ścieżka dla podanego locale.

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

---

## Powiązane funkcje

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getCanonicalPath.md): Rozwiązuje zlokalizowaną ścieżkę z powrotem na jej wewnętrzną ścieżkę kanoniczną.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md): Generuje w pełni zlokalizowany adres URL (włączając protokół, host i prefiks lokalizacji).
