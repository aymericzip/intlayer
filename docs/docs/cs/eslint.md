---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint plugin | Lint pravidla pro Intlayer
description: Odhalte natvrdo zapsané řetězce a dynamická volání, která kompilátor Intlayer nedokáže optimalizovat, pomocí eslint-plugin-intlayer. Funguje s ESLint i oxlint napříč React, Vue, Svelte, Angular a Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lintování
  - i18n
  - Internacionalizace
  - no-raw-text
  - Natvrdo zapsané řetězce
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
    changes: "Počáteční historie"
author: aymericzip
---

# ESLint x OXLint plugin

`eslint-plugin-intlayer` odhaluje dva druhy i18n chyb, které TypeScript vidět nedokáže:

1. **Natvrdo zapsaný text**, který se nikdy nedostal do slovníku.
2. **Dynamická volání**, která projdou typovou kontrolou a běží, ale která kompilátor Intlayer nedokáže optimalizovat.

Neznámé klíče slovníku, neznámé cesty k polím a chybějící locale jsou už chybami při kompilaci, takže je plugin neopakuje.

## Instalace

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Vyžaduje ESLint 9 nebo novější (flat config).

## Použití

Plugin běží jak v ESLint, tak v [oxlint](https://oxc.rs) — stejná pravidla, stejné volby.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Nebo zapínejte pravidla jedno po druhém:

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

Dvě výhrady: podpora JS pluginů v oxlint je stále ve fázi alpha a oxlint nepodporuje vlastní parsery — soubory `.vue`, `.svelte`, `.astro` a Angular šablony se tam tedy nelintují. Spouštějte oxlint nad soubory JS/TS/JSX a zbytek nechte na ESLint.

  </Tab>
</Tabs>

### Konfigurace

| Konfigurace     | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                        | error                   | error                     | off                      |
| `strict`        | error (+ literály mimo JSX) | error                   | error                     | error                    |
| `contract-only` | off                         | error                   | error                     | off                      |

`recommended` nechává `no-raw-text` na `warn` záměrně: namířit toto pravidlo na existující codebase odhalí všechny nepřeložené řetězce najednou, což by nemělo rozbít váš build hned první den.

`enforce-adapter-import` je ve výchozím stavu vypnuté — pokud ho chcete, zapněte ho explicitně.

## Pravidla

### `no-raw-text`

Hlásí text určený uživateli, který není deklarován ve slovníku. Používá stejnou detekci jako `intlayer extract`, takže názvy značek, CSS třídy a technické identifikátory se ignorují.

```jsx
// ✗ Nahlášeno
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ V pořádku
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Soubory deklarace obsahu (`*.content.ts`, …) se přeskakují.

Chcete-li opravit celý soubor najednou, spusťte `npx intlayer extract` a nechte kompilátor přesunout řetězce do slovníku za vás.

**Volby**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atributy, jejichž hodnota je text určený uživateli.
      // Výchozí: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementy, jejichž obsah nikdy není text určený uživateli.
      // Výchozí: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Regulární výrazy pro text, který se nikdy nemá hlásit.
      ignorePatterns: ["^Powered by"],

      // Hlásit i řetězcové literály mimo značky. Výchozí: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Vyžaduje, aby klíč slovníku byl řetězcový literál.

Kompilátor může slovník předem načíst pouze tehdy, když dokáže klíč přečíst přímo v místě volání. U vypočítaného klíče optimalizaci tiše přeskočí a místo toho do bundle zahrne všechny slovníky.

```typescript
// ✗ Nahlášeno
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Proměnná stále není literál
const key = "home";
useIntlayer(key);

// ✓ V pořádku
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Platí to pro `useIntlayer`, `getIntlayer` a každý compat adaptér (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Vyžaduje, aby pole, které ze slovníku čtete, bylo staticky známé.

Kompilátor odstraňuje pole, u nichž nevidí použití. Vypočítaný přístup je pro něj neviditelný, takže čtení může za běhu vrátit `undefined`.

```typescript
// ✗ Nahlášeno
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ V pořádku
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Upřednostňuje compat adaptér `@intlayer/*` před původním balíčkem. Původní se na Intlayer vyřeší jen tehdy, když je nastaven alias bundleru; adaptér vždy. Automaticky opravitelné pomocí `--fix`.

```typescript
// ✗ Nahlášeno
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ V pořádku
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworky

Všechna pravidla fungují napříč všemi integracemi Intlayer, včetně vnitřku šablon Vue, Svelte a Angular. Stačí ESLintu říct, který parser čte který typ souboru.

| Framework                 | Soubory           | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular šablony           | `.component.html` | `@angular-eslint/template-parser` |
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

Instalujte jen ty parsery, které váš projekt potřebuje.

> **Známé omezení.** V šablonách Vue a Angular není výraz jako `{{ content[key] }}` kontrolován pravidlem `no-dynamic-field-access`. Dynamická čtení zapsaná ve script bloku se detekují normálně.
