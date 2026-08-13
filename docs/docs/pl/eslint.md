---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Wtyczka ESLint | Reguły lintowania dla Intlayer
description: Wykrywaj zakodowane na sztywno ciągi znaków i dynamiczne wywołania, których kompilator Intlayer nie potrafi zoptymalizować, dzięki eslint-plugin-intlayer. Działa z ESLint i oxlint w React, Vue, Svelte, Angular i Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lintowanie
  - i18n
  - Internacjonalizacja
  - no-raw-text
  - Zakodowane ciągi znaków
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Wtyczka ESLint x OXLint

`eslint-plugin-intlayer` wykrywa dwa rodzaje błędów i18n, których TypeScript nie widzi:

1. **Tekst zakodowany na sztywno**, który nigdy nie trafił do słownika.
2. **Dynamiczne wywołania**, które przechodzą sprawdzanie typów i działają, ale których kompilator Intlayer nie potrafi zoptymalizować.

Nieznane klucze słowników, nieznane ścieżki pól i brakujące lokalizacje są już błędami kompilacji, więc wtyczka ich nie powiela.

## Instalacja

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Wymaga ESLint 9 lub nowszego (flat config).

## Użycie

Wtyczka działa zarówno w ESLint, jak i w [oxlint](https://oxc.rs) — te same reguły, te same opcje.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Albo włączaj reguły pojedynczo:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Dwa zastrzeżenia: obsługa wtyczek JS w oxlint jest wciąż w fazie alpha, a oxlint nie obsługuje niestandardowych parserów — pliki `.vue`, `.svelte`, `.astro` oraz szablony Angulara nie są tam lintowane. Uruchamiaj oxlint na plikach JS/TS/JSX, a resztę zostaw ESLintowi.

  </Tab>
</Tabs>

### Konfiguracje

| Konfiguracja    | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                        | error                   | error                     | off                      |
| `strict`        | error (+ literały poza JSX) | error                   | error                     | error                    |
| `contract-only` | off                         | error                   | error                     | off                      |

`recommended` celowo pozostawia `no-raw-text` na poziomie `warn`: skierowanie tej reguły na istniejącą codebase ujawnia wszystkie nieprzetłumaczone ciągi naraz, a to nie powinno psuć builda już pierwszego dnia.

`enforce-adapter-import` jest domyślnie wyłączona — włącz ją jawnie, jeśli jej potrzebujesz.

## Reguły

### `no-raw-text`

Zgłasza tekst przeznaczony dla użytkownika, który nie został zadeklarowany w słowniku. Używa tego samego wykrywania co `intlayer extract`, więc nazwy marek, klasy CSS i identyfikatory techniczne są ignorowane.

```jsx
// ✗ Zgłaszane
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ W porządku
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Pliki deklaracji treści (`*.content.ts`, …) są pomijane.

Aby naprawić cały plik naraz, uruchom `npx intlayer extract` i pozwól kompilatorowi przenieść ciągi do słownika za Ciebie.

**Opcje**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atrybuty, których wartość to tekst dla użytkownika.
      // Domyślnie: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementy, których zawartość nigdy nie jest tekstem dla użytkownika.
      // Domyślnie: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Wyrażenia regularne dla tekstu, którego nigdy nie zgłaszać.
      ignorePatterns: ["^Powered by"],

      // Zgłaszaj też literały tekstowe poza znacznikami. Domyślnie: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Wymaga, aby klucz słownika był literałem tekstowym.

Kompilator może wstępnie załadować słownik tylko wtedy, gdy potrafi odczytać klucz bezpośrednio w miejscu wywołania. Przy kluczu obliczanym po cichu pomija optymalizację i zamiast tego dołącza do bundle'a wszystkie słowniki.

```typescript
// ✗ Zgłaszane
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Zmienna nadal nie jest literałem
const key = "home";
useIntlayer(key);

// ✓ W porządku
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Dotyczy to `useIntlayer`, `getIntlayer` oraz każdego adaptera compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Wymaga, aby pole odczytywane ze słownika było znane statycznie.

Kompilator usuwa pola, których użycia nie widzi. Dostęp obliczany jest dla niego niewidoczny, więc odczyt może zwrócić `undefined` w czasie wykonania.

```typescript
// ✗ Zgłaszane
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ W porządku
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Preferuje adapter compat `@intlayer/*` zamiast oryginalnego pakietu. Oryginał rozwiązuje się do Intlayer tylko wtedy, gdy skonfigurowano alias bundlera; adapter robi to zawsze. Naprawialne automatycznie przez `--fix`.

```typescript
// ✗ Zgłaszane
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ W porządku
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworki

Wszystkie reguły działają we wszystkich integracjach Intlayer, także wewnątrz szablonów Vue, Svelte i Angulara. Wystarczy wskazać ESLintowi, który parser czyta dany typ pliku.

| Framework                 | Pliki             | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Szablony Angulara         | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Instaluj tylko te parsery, których potrzebuje Twój projekt.

> **Znane ograniczenie.** W szablonach Vue i Angulara wyrażenie takie jak `{{ content[key] }}` nie jest sprawdzane przez `no-dynamic-field-access`. Dynamiczne odczyty zapisane w bloku script są wykrywane normalnie.
