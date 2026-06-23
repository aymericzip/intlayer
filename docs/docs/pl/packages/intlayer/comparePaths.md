---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja funkcji comparePaths | intlayer
description: Dowiedz się, jak korzystać z funkcji comparePaths w pakiecie intlayer
keywords:
  - comparePaths
  - normalizePath
  - aktywny link
  - nawigacja
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Początkowa dokumentacja"
author: aymericzip
---

# Dokumentacja: Funkcja `comparePaths` w `intlayer`

## Opis

Funkcja `comparePaths` porównuje dwa adresy URL lub ścieżki pod kątem równości, ignorując segment regionalny (locale), protokół/host, ciąg zapytań (query string), hash oraz końcowe ukośniki (trailing slashes). Jest to zalecany sposób na sprawdzenie, czy link nawigacyjny wskazuje na bieżącą stronę — na przykład w celu podświetlenia aktywnego linku — bez konieczności tworzenia własnej (podatnej na błędy) logiki normalizacji.

Wewnętrznie używa [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) do usunięcia segmentu locale, dzięki czemu respektuje skonfigurowany tryb routingu oraz języki.

Pakiet eksportuje również pomocniczą funkcję [`normalizePath`](#normalizepath), która zwraca kanoniczną, niezależną od locale ścieżkę używaną do porównania.

**Kluczowe cechy:**

- Porównywanie niezależne od locale (`/pl/about` pasuje do `/about`)
- Działa zarówno z bezwzględnymi adresami URL, jak i względnymi ścieżkami
- Ignoruje ciągi zapytań, hashe i końcowe ukośniki
- Toleruje brakujące ukośniki początkowe i puste wartości (normalizuje do `/`)
- Lekka — zbudowana w oparciu o `getPathWithoutLocale`

---

## Sygnatura funkcji

```typescript
comparePaths(
  pathname: string,  // Wymagane
  href: string,      // Wymagane
  locales?: Locales[] // Opcjonalne
): boolean

normalizePath(
  inputUrl: string,   // Wymagane
  locales?: Locales[] // Opcjonalne
): string
```

---

## Parametry

- `pathname: string`
  - **Opis**: Pierwszy ciąg URL lub ścieżka do porównania (zazwyczaj bieżąca ścieżka).
  - **Typ**: `string`
  - **Wymagane**: Tak

- `href: string`
  - **Opis**: Drugi ciąg URL lub ścieżka do porównania (zazwyczaj `href` linku nawigacyjnego).
  - **Typ**: `string`
  - **Wymagane**: Tak

- `locales: Locales[]`
  - **Opis**: Opcjonalna tablica obsługiwanych języków (locales). Domyślnie są to języki skonfigurowane w projekcie.
  - **Typ**: `Locales[]`
  - **Wymagane**: Nie (Opcjonalne)

### Zwraca

- **Typ**: `boolean`
- **Opis**: `true`, gdy oba wejścia rozwiązują się do tej samej ścieżki niezależnej od locale, w przeciwnym razie `false`.

---

## Przykłady użycia

### Podstawowe użycie

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### Bezwzględne i względne adresy URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Podświetlanie aktywnego linku nawigacyjnego

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` zwraca kanoniczną, niezależną od locale ścieżkę używaną przez `comparePaths`. Usuwa ona segment locale, protokół/host, ciąg zapytań i hash, zapewnia obecność pojedynczego ukośnika początkowego, usuwa wszelkie ukośniki końcowe (z wyjątkiem ścieżki głównej) i domyślnie przyjmuje `/` dla pustych wartości.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Powiązane funkcje

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md): Usuwa segment locale z adresu URL lub ścieżki.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPrefix.md): Określa prefiks URL dla danego locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md): Generuje zlokalizowany adres URL dla określonego locale.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
