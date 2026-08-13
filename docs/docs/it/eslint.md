---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Regole di lint per Intlayer
description: Individua le stringhe hardcoded e le chiamate dinamiche che il compilatore Intlayer non può ottimizzare, con eslint-plugin-intlayer. Funziona con ESLint e oxlint, su React, Vue, Svelte, Angular e Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internazionalizzazione
  - no-raw-text
  - Stringhe hardcoded
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
    changes: "Inizio cronologia"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` individua i due tipi di errore i18n che TypeScript non può vedere:

1. **Testo hardcoded** che non è mai arrivato in un dizionario.
2. **Chiamate dinamiche** che superano il type checking e vengono eseguite, ma che il compilatore Intlayer non può ottimizzare.

Le chiavi di dizionario sconosciute, i percorsi di campo sconosciuti e le locale mancanti sono già errori di compilazione, quindi il plugin non li ripete.

## Installazione

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Richiede ESLint 9 o successivo (flat config).

## Utilizzo

Il plugin funziona sia con ESLint sia con [oxlint](https://oxc.rs): stesse regole, stesse opzioni.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Oppure abilita le regole una alla volta:

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

Due avvertenze: il supporto ai plugin JS di oxlint è ancora in alpha, e oxlint non supporta i parser personalizzati — quindi i file `.vue`, `.svelte`, `.astro` e i template Angular non vengono analizzati lì. Esegui oxlint sui file JS/TS/JSX e mantieni ESLint per il resto.

  </Tab>
</Tabs>

### Configurazioni

| Configurazione  | `no-raw-text`                  | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ------------------------------ | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                           | error                   | error                     | off                      |
| `strict`        | error (+ literal fuori da JSX) | error                   | error                     | error                    |
| `contract-only` | off                            | error                   | error                     | off                      |

`recommended` mantiene `no-raw-text` su `warn` di proposito: puntarlo su una codebase esistente fa emergere tutte le stringhe non tradotte in una volta, il che non dovrebbe rompere la tua build il primo giorno.

`enforce-adapter-import` è disattivata per impostazione predefinita — abilitala esplicitamente se la desideri.

## Regole

### `no-raw-text`

Segnala il testo rivolto all'utente che non è dichiarato in un dizionario. Usa lo stesso rilevamento di `intlayer extract`, quindi nomi di brand, classi CSS e identificatori tecnici vengono ignorati.

```jsx
// ✗ Segnalato
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Corretto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

I file di dichiarazione del contenuto (`*.content.ts`, …) vengono saltati.

Per correggere un intero file in una volta, esegui `npx intlayer extract` e lascia che il compilatore sposti le stringhe in un dizionario al posto tuo.

**Opzioni**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributi il cui valore è testo rivolto all'utente.
      // Predefinito: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementi il cui contenuto non è mai testo rivolto all'utente.
      // Predefinito: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Espressioni regolari per il testo da non segnalare mai.
      ignorePatterns: ["^Powered by"],

      // Segnala anche i literal di stringa fuori dal markup. Predefinito: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Richiede che la chiave del dizionario sia un literal di stringa.

Il compilatore può precaricare un dizionario solo se riesce a leggere la chiave direttamente nel punto della chiamata. Con una chiave calcolata salta silenziosamente l'ottimizzazione e include invece tutti i dizionari nel bundle.

```typescript
// ✗ Segnalato
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Una variabile non è comunque un literal
const key = "home";
useIntlayer(key);

// ✓ Corretto
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Questo vale per `useIntlayer`, `getIntlayer` e ogni adattatore compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Richiede che il campo letto da un dizionario sia noto staticamente.

Il compilatore rimuove i campi di cui non vede l'uso. Un accesso calcolato gli è invisibile, quindi la lettura può restituire `undefined` a runtime.

```typescript
// ✗ Segnalato
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Corretto
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Preferisce l'adattatore compat `@intlayer/*` al package originale. L'originale si risolve su Intlayer solo quando l'alias del bundler è configurato; l'adattatore lo fa sempre. Correggibile automaticamente con `--fix`.

```typescript
// ✗ Segnalato
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Corretto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Framework

Tutte le regole funzionano su tutte le integrazioni Intlayer, anche all'interno dei template Vue, Svelte e Angular. Devi solo indicare a ESLint quale parser legge ciascun tipo di file.

| Framework                 | File              | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Template Angular          | `.component.html` | `@angular-eslint/template-parser` |
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

Installa solo i parser di cui il tuo progetto ha bisogno.

> **Limitazione nota.** Nei template Vue e Angular, un'espressione come `{{ content[key] }}` non viene controllata da `no-dynamic-field-access`. Le letture dinamiche scritte nel blocco script vengono rilevate normalmente.
