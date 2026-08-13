---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Règles de lint pour Intlayer
description: Détectez les chaînes codées en dur et les appels dynamiques que le compilateur Intlayer ne peut pas optimiser, avec eslint-plugin-intlayer. Compatible ESLint et oxlint, sur React, Vue, Svelte, Angular et Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internationalisation
  - no-raw-text
  - Chaînes codées en dur
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
    changes: "Historique initial"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` détecte les deux types d'erreurs d'i18n que TypeScript ne peut pas voir :

1. **Le texte codé en dur** qui n'a jamais rejoint un dictionnaire.
2. **Les appels dynamiques** qui passent le typage et s'exécutent, mais que le compilateur Intlayer ne peut pas optimiser.

Les clés de dictionnaire inconnues, les chemins de champ inconnus et les locales manquantes sont déjà des erreurs de compilation, le plugin ne les répète donc pas.

## Installation

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Nécessite ESLint 9 ou une version ultérieure (flat config).

## Utilisation

Le plugin fonctionne à la fois avec ESLint et [oxlint](https://oxc.rs) — mêmes règles, mêmes options.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Ou activez les règles une par une :

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

Deux réserves : la prise en charge des plugins JS par oxlint est encore en alpha, et oxlint ne prend pas en charge les parsers personnalisés — les fichiers `.vue`, `.svelte`, `.astro` et les templates Angular n'y sont donc pas analysés. Lancez oxlint sur vos fichiers JS/TS/JSX et gardez ESLint pour le reste.

  </Tab>
</Tabs>

### Configurations

| Configuration   | `no-raw-text`                | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ---------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                         | error                   | error                     | off                      |
| `strict`        | error (+ littéraux hors JSX) | error                   | error                     | error                    |
| `contract-only` | off                          | error                   | error                     | off                      |

`recommended` maintient volontairement `no-raw-text` à `warn` : pointer cette règle vers une codebase existante fait remonter toutes les chaînes non traduites d'un coup, ce qui ne doit pas casser votre build dès le premier jour.

`enforce-adapter-import` est désactivée par défaut — activez-la explicitement si vous la souhaitez.

## Règles

### `no-raw-text`

Signale le texte destiné à l'utilisateur qui n'est pas déclaré dans un dictionnaire. La règle utilise la même détection que `intlayer extract`, si bien que les noms de marque, les classes CSS et les identifiants techniques sont ignorés.

```jsx
// ✗ Signalé
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Correct
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Les fichiers de déclaration de contenu (`*.content.ts`, …) sont ignorés.

Pour corriger tout un fichier d'un coup, lancez `npx intlayer extract` et laissez le compilateur déplacer les chaînes dans un dictionnaire pour vous.

**Options**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributs dont la valeur est du texte destiné à l'utilisateur.
      // Par défaut : title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Éléments dont le contenu n'est jamais du texte destiné à l'utilisateur.
      // Par défaut : code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Expressions régulières pour du texte à ne jamais signaler.
      ignorePatterns: ["^Powered by"],

      // Signaler aussi les littéraux de chaîne hors markup. Par défaut : false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Exige que la clé de dictionnaire soit un littéral de chaîne.

Le compilateur ne peut précharger un dictionnaire que s'il peut lire la clé directement au site d'appel. Avec une clé calculée, il ignore silencieusement l'optimisation et embarque tous les dictionnaires.

```typescript
// ✗ Signalé
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Une variable n'est toujours pas un littéral
const key = "home";
useIntlayer(key);

// ✓ Correct
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Cela s'applique à `useIntlayer`, `getIntlayer` et à chaque adaptateur compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Exige que le champ que vous lisez dans un dictionnaire soit connu statiquement.

Le compilateur supprime les champs dont il ne voit pas l'utilisation. Un accès calculé lui est invisible, la lecture peut donc renvoyer `undefined` à l'exécution.

```typescript
// ✗ Signalé
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Correct
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Privilégie l'adaptateur compat `@intlayer/*` par rapport au package d'origine. L'original ne se résout vers Intlayer que si l'alias du bundler est configuré ; l'adaptateur le fait toujours. Corrigeable automatiquement avec `--fix`.

```typescript
// ✗ Signalé
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Correct
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworks

Toutes les règles fonctionnent sur l'ensemble des intégrations Intlayer, y compris à l'intérieur des templates Vue, Svelte et Angular. Il vous suffit d'indiquer à ESLint quel parser lit chaque type de fichier.

| Framework                 | Fichiers          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Templates Angular         | `.component.html` | `@angular-eslint/template-parser` |
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

N'installez que les parsers dont votre projet a besoin.

> **Limitation connue.** Dans les templates Vue et Angular, une expression telle que `{{ content[key] }}` n'est pas vérifiée par `no-dynamic-field-access`. Les lectures dynamiques écrites dans le bloc script sont détectées normalement.
