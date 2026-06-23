---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentace funkce comparePaths | intlayer
description: Zjistěte, jak používat funkci comparePaths z balíčku intlayer
keywords:
  - comparePaths
  - normalizePath
  - aktivní odkaz
  - navigace
  - Intlayer
  - intlayer
  - Internacionalizace
  - Dokumentace
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
    changes: "Úvodní dokumentace"
author: aymericzip
---

# Dokumentace: Funkce `comparePaths` v `intlayer`

## Popis

Funkce `comparePaths` porovnává dvě URL adresy nebo cesty na shodu, přičemž ignoruje segment s jazykem (locale), protokol/hostitele, dotazovací řetězec (query string), hash a koncová lomítka (trailing slashes). Jde o doporučený způsob, jak zjistit, zda navigační odkaz ukazuje na aktuální stránku — například za účelem zvýraznění aktivního odkazu — aniž byste museli psát vlastní (často chybovou) normalizační logiku.

Interně znovu využívá [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getPathWithoutLocale.md) k odstranění segmentu s jazykem, takže respektuje váš nastavený režim směrování a nakonfigurované jazyky.

Balíček také exportuje základní pomocnou funkci [`normalizePath`](#normalizepath), která vrací kanonickou cestu nezávislou na jazyce, využívanou k samotnému porovnání.

**Klíčové vlastnosti:**

- Porovnání nezávislé na jazyce (`/cs/about` odpovídá `/about`)
- Funguje s absolutními URL i s relativními cestami
- Ignoruje dotazovací řetězce, hash a koncová lomítka
- Toleruje chybějící úvodní lomítka a prázdné hodnoty (normalizuje je na `/`)
- Odlehčená (lightweight) — postavena nad funkcí `getPathWithoutLocale`

---

## Signatura funkce

```typescript
comparePaths(
  pathname: string,  // Povinné
  href: string,      // Povinné
  locales?: Locales[] // Volitelné
): boolean

normalizePath(
  inputUrl: string,   // Povinné
  locales?: Locales[] // Volitelné
): string
```

---

## Parametry

- `pathname: string`
  - **Popis**: První URL řetězec nebo cesta k porovnání (typicky aktuální cesta).
  - **Typ**: `string`
  - **Povinné**: Ano

- `href: string`
  - **Popis**: Druhý URL řetězec nebo cesta k porovnání (typicky `href` navigačního odkazu).
  - **Typ**: `string`
  - **Povinné**: Ano

- `locales: Locales[]`
  - **Popis**: Volitelné pole podporovaných jazyků. Výchozí jsou jazyky nakonfigurované v projektu.
  - **Typ**: `Locales[]`
  - **Povinné**: Ne (Volitelné)

### Vrací

- **Typ**: `boolean`
- **Popis**: `true`, když se oba vstupy přeloží na stejnou cestu nezávislou na jazyce, jinak `false`.

---

## Příklady použití

### Základní použití

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

### Absolutní a relativní URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Zvýraznění aktivního navigačního odkazu

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

Funkce `normalizePath` vrací kanonickou cestu nezávislou na jazyce, kterou využívá `comparePaths`. Odstraní segment jazyka, protokol/hostitele, dotazovací řetězec i hash, zajistí jedno úvodní lomítko, odstraní veškerá koncová lomítka (s výjimkou kořenové složky) a u prázdnných hodnot se vrátí na `/`.

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

## Související funkce

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getPathWithoutLocale.md): Odstraní segment jazyka z URL nebo cesty.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getPrefix.md): Získá URL prefix pro daný jazyk (locale).
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getLocalizedUrl.md): Vygeneruje lokalizovanou URL pro konkrétní jazyk.

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
