---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint-plugin | Lintregels voor Intlayer
description: Vang hardcoded strings en dynamische aanroepen op die de Intlayer-compiler niet kan optimaliseren, met eslint-plugin-intlayer. Werkt met ESLint en oxlint, in React, Vue, Svelte, Angular en Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalisatie
  - no-raw-text
  - Hardcoded strings
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
    changes: "Initiële geschiedenis"
author: aymericzip
---

# ESLint x OXLint-plugin

`eslint-plugin-intlayer` vangt de twee soorten i18n-fouten op die TypeScript niet kan zien:

1. **Hardcoded tekst** die nooit in een dictionary terecht is gekomen.
2. **Dynamische aanroepen** die de typecontrole doorstaan en draaien, maar die de Intlayer-compiler niet kan optimaliseren.

Onbekende dictionary-keys, onbekende veldpaden en ontbrekende locales zijn al compileerfouten, dus de plugin herhaalt ze niet.

## Installatie

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Vereist ESLint 9 of nieuwer (flat config).

## Gebruik

De plugin draait zowel in ESLint als in [oxlint](https://oxc.rs) — dezelfde regels, dezelfde opties.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Of schakel de regels één voor één in:

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

Twee kanttekeningen: de ondersteuning voor JS-plugins in oxlint is nog alpha, en oxlint ondersteunt geen custom parsers — `.vue`-, `.svelte`- en `.astro`-bestanden en Angular-templates worden daar dus niet gelint. Draai oxlint over je JS/TS/JSX-bestanden en houd ESLint voor de rest.

  </Tab>
</Tabs>

### Configuraties

| Configuratie    | `no-raw-text`                 | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ----------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                          | error                   | error                     | off                      |
| `strict`        | error (+ literals buiten JSX) | error                   | error                     | error                    |
| `contract-only` | off                           | error                   | error                     | off                      |

`recommended` houdt `no-raw-text` bewust op `warn`: richt je die regel op een bestaande codebase, dan komen alle onvertaalde strings in één keer naar boven, en dat hoort je build niet meteen op dag één te breken.

`enforce-adapter-import` staat standaard uit — schakel hem expliciet in als je hem wilt.

## Regels

### `no-raw-text`

Rapporteert tekst voor eindgebruikers die niet in een dictionary is gedeclareerd. De regel gebruikt dezelfde detectie als `intlayer extract`, dus merknamen, CSS-klassen en technische identifiers worden genegeerd.

```jsx
// ✗ Gerapporteerd
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Prima
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Contentdeclaratiebestanden (`*.content.ts`, …) worden overgeslagen.

Om een heel bestand in één keer op te lossen, draai je `npx intlayer extract` en laat je de compiler de strings voor je naar een dictionary verplaatsen.

**Opties**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributen waarvan de waarde tekst voor eindgebruikers is.
      // Standaard: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementen waarvan de inhoud nooit tekst voor eindgebruikers is.
      // Standaard: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Reguliere expressies voor tekst die nooit gerapporteerd mag worden.
      ignorePatterns: ["^Powered by"],

      // Rapporteer ook string-literals buiten markup. Standaard: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Vereist dat de dictionary-key een string-literal is.

De compiler kan een dictionary alleen vooraf laden als hij de key direct op de aanroepplek kan lezen. Bij een berekende key slaat hij de optimalisatie stilzwijgend over en bundelt hij in plaats daarvan elke dictionary.

```typescript
// ✗ Gerapporteerd
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Een variabele is nog steeds geen literal
const key = "home";
useIntlayer(key);

// ✓ Prima
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Dit geldt voor `useIntlayer`, `getIntlayer` en elke compat-adapter (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Vereist dat het veld dat je uit een dictionary leest statisch bekend is.

De compiler verwijdert velden waarvan hij het gebruik niet ziet. Een berekende toegang is voor hem onzichtbaar, dus het lezen kan tijdens runtime `undefined` opleveren.

```typescript
// ✗ Gerapporteerd
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Prima
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Geeft de voorkeur aan de `@intlayer/*`-compat-adapter boven het originele package. Het origineel verwijst alleen naar Intlayer als de bundler-alias is ingesteld; de adapter doet dat altijd. Automatisch te repareren met `--fix`.

```typescript
// ✗ Gerapporteerd
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Prima
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworks

Alle regels werken in alle Intlayer-integraties, ook binnen Vue-, Svelte- en Angular-templates. Je hoeft ESLint alleen te vertellen welke parser elk bestandstype leest.

| Framework                 | Bestanden         | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular-templates         | `.component.html` | `@angular-eslint/template-parser` |
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

Installeer alleen de parsers die je project nodig heeft.

> **Bekende beperking.** In Vue- en Angular-templates wordt een expressie als `{{ content[key] }}` niet gecontroleerd door `no-dynamic-field-access`. Dynamische reads die in het scriptblok staan, worden normaal opgemerkt.
