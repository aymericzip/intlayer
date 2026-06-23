---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentatie voor de functie comparePaths | intlayer
description: Bekijk hoe u de functie comparePaths gebruikt voor het intlayer-pakket
keywords:
  - comparePaths
  - normalizePath
  - actieve link
  - navigatie
  - Intlayer
  - intlayer
  - Internationalisatie
  - Documentatie
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
    changes: "Initiële documentatie"
author: aymericzip
---

# Documentatie: Functie `comparePaths` in `intlayer`

## Beschrijving

De functie `comparePaths` vergelijkt twee URL's of paden op gelijkheid, waarbij het locale-segment, het protocol/host, de query-string, de hash en afsluitende schuine strepen (trailing slashes) worden genegeerd. Het is de aanbevolen manier om te bepalen of een navigatielink naar de huidige pagina verwijst — bijvoorbeeld om de actieve link te markeren — zonder dat u zelf (foutgevoelige) normalisatielogica hoeft te schrijven.

Intern hergebruikt het [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/intlayer/getPathWithoutLocale.md) om het locale-segment te verwijderen, zodat het uw geconfigureerde routeringsmodus en locales respecteert.

Het pakket exporteert ook de onderliggende hulpmethode [`normalizePath`](#normalizepath), die het canonieke, locale-onafhankelijke pad retourneert dat wordt gebruikt voor de vergelijking.

**Belangrijkste kenmerken:**

- Locale-onafhankelijke vergelijking (`/nl/about` komt overeen met `/about`)
- Werkt met zowel absolute URL's als relatieve paden
- Negeert query-strings, hashes en afsluitende schuine strepen
- Tolereert ontbrekende voorloopstrepen en lege waarden (genormaliseerd naar `/`)
- Lichtgewicht — gebouwd bovenop `getPathWithoutLocale`

---

## Functiesignatuur

```typescript
comparePaths(
  pathname: string,  // Vereist
  href: string,      // Vereist
  locales?: Locales[] // Optioneel
): boolean

normalizePath(
  inputUrl: string,   // Vereist
  locales?: Locales[] // Optioneel
): string
```

---

## Parameters

- `pathname: string`
  - **Beschrijving**: De eerste URL-tekenreeks of het pad om te vergelijken (meestal het huidige pad).
  - **Type**: `string`
  - **Vereist**: Ja

- `href: string`
  - **Beschrijving**: De tweede URL-tekenreeks of het pad om te vergelijken (meestal de `href` van een navigatielink).
  - **Type**: `string`
  - **Vereist**: Ja

- `locales: Locales[]`
  - **Beschrijving**: Optionele array van ondersteunde locales. Standaard ingesteld op de geconfigureerde locales in het project.
  - **Type**: `Locales[]`
  - **Vereist**: Nee (Optioneel)

### Retourneert

- **Type**: `boolean`
- **Beschrijving**: `true` wanneer beide invoeren leiden tot hetzelfde locale-onafhankelijke pad, anders `false`.

---

## Voorbeeldgebruik

### Basisgebruik

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

### Absolute en relatieve URL's

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### De actieve navigatielink markeren

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

`normalizePath` retourneert het canonieke, locale-onafhankelijke pad dat wordt gebruikt door `comparePaths`. Het verwijdert het locale-segment, het protocol/host, de query-string en de hash, zorgt voor een enkele voorloopstreep, verwijdert eventuele afsluitende schuine strepen (behalve voor de root) en valt terug op `/` voor lege waarden.

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

## Gerelateerde functies

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/intlayer/getPathWithoutLocale.md): Verwijdert het locale-segment van een URL of pad.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/intlayer/getPrefix.md): Bepaalt de URL-prefix voor een gegeven locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/intlayer/getLocalizedUrl.md): Genereert een gelokaliseerde URL voor een specifieke locale.

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
