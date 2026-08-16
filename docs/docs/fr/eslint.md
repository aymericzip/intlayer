---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Plugin ESLint | Règles de lint pour Intlayer
description: Détectez les chaînes codées en dur, les appels dynamiques que le compilateur Intlayer ne peut pas optimiser et le contenu de dictionnaire inutilisé, avec eslint-plugin-intlayer. Compatible ESLint et oxlint, sur React, Vue, Svelte, Angular et Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internationalisation
  - no-raw-text
  - Chaînes codées en dur
  - Traductions inutilisées
  - Contenu mort
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

`eslint-plugin-intlayer` détecte les types d'erreurs d'i18n que TypeScript ne peut pas voir :

1. **Le texte codé en dur** qui n'a jamais rejoint un dictionnaire.
2. **Les appels dynamiques** qui passent le typage et s'exécutent, mais que le compilateur Intlayer ne peut pas optimiser.
3. **Le contenu mort** — les dictionnaires et les champs qu'aucun élément du projet ne lit (sur activation explicite).

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

Nécessite ESLint 9 ou une version ultérieure (flat config). ESLint 10 est pris en charge.

## Utilisation

Le plugin fonctionne à la fois avec ESLint et [oxlint](https://oxc.rs) — mêmes règles, mêmes options.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Ou étalez une config et définissez vous-même les niveaux de sévérité :

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
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

`no-unused-content` est volontairement omise ci-dessus : elle nécessite le répertoire de travail et le chemin du fichier analysé issus du contexte de règle, ce que le bridge de plugin JS alpha ne garantit pas. Exécutez-la sous ESLint.

  </Tab>
</Tabs>

### Configurations

| Configuration   | `no-raw-text`                | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ---------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                         | error                   | error                     | off                      | off                 |
| `strict`        | error (+ littéraux hors JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                          | error                   | error                     | off                      | off                 |

`recommended` maintient volontairement `no-raw-text` à `warn` : pointer cette règle vers une codebase existante fait remonter toutes les chaînes non traduites d'un coup, ce qui ne doit pas casser votre build dès le premier jour.

`enforce-adapter-import` est désactivée par défaut — activez-la explicitement si vous la souhaitez.

`no-unused-content` est désactivée dans toutes les configurations, y compris `strict`. C'est la seule règle qui lit votre configuration Intlayer et parcourt vos fichiers sources sur le disque ; son activation doit donc être un choix délibéré plutôt qu'un comportement imposé par un preset.

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

```javascript fileName="eslint.config.mjs"
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

### `no-unused-content`

**Désactivée par défaut.** Signale le contenu qu'aucun élément de votre projet ne lit, ainsi que les clés de dictionnaire déclarées à plusieurs endroits.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Signalé si aucun appelant dans le projet ne demande "home"
  content: {
    title: t({ fr: "Titre", en: "Title" }),

    // ✗ Signalé si rien ne lit `hero`
    hero: {
      subtitle: t({ fr: "Sous-titre", en: "Subtitle" }),
    },
  },
};
```

Contrairement aux autres règles, celle-ci ne peut pas répondre uniquement à partir du fichier en cours d'analyse — un champ n'est inutilisé que par rapport à l'ensemble du projet. Dès la première déclaration de contenu d'une exécution de lint, elle charge votre configuration Intlayer, recherche les fichiers sources définis par cette configuration (`build.traversePattern`, `compiler.transformPattern`) et exécute le même analyseur d'utilisation qui alimente `@intlayer/lsp` et le barré « inutilisé » dans l'extension VS Code. Le résultat est mis en cache pendant `cacheTtl` millisecondes, de sorte que l'analyse est effectuée une fois par exécution plutôt qu'une fois par fichier.

**Options**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Signaler les clés de dictionnaire qu'aucun élément ne référence. Par défaut : true
      reportUnusedDictionaries: true,

      // Signaler les champs de contenu que rien ne lit. Par défaut : true
      reportUnusedFields: true,

      // Signaler les clés déclarées à plusieurs endroits. Par défaut : true
      reportDuplicateKeys: true,

      // Expressions régulières pour les chemins de champs à ne jamais signaler.
      ignoreFields: ["^meta"],

      // Racine du projet à partir de laquelle commence l'analyse. Par défaut : répertoire de travail d'ESLint
      baseDir: process.cwd(),

      // Durée de réutilisation d'une analyse de projet, en ms. Par défaut : 30000
      cacheTtl: 30000,
    },
  ],
}
```

Diminuez `cacheTtl` si vous lisez depuis un serveur d'éditeur persistant et souhaitez que vos modifications soient prises en compte plus rapidement ; définissez `baseDir` lorsqu'une seule exécution de lint couvre plusieurs projets Intlayer dans un monorepo.

> **La règle privilégie le silence.** Un faux positif supprimant une traduction, rien n'est signalé lorsque le dictionnaire est consommé d'une manière que l'analyse ne peut pas suivre : l'objet de contenu transmis dans son intégralité, une fonction de traduction liée à partir de celui-ci (`const t = useTranslations("home")`), une déclaration atteinte via un import direct (`useDictionary(myDictionary)`), un `nest()` depuis un autre dictionnaire, ou une liste de champs rendue non exhaustive par un spread. Les composants monofichiers (`.vue`, `.svelte`, `.astro`) sont considérés comme utilisant chaque champ des dictionnaires qu'ils mentionnent, car leurs blocs de script ne sont pas analysés ici.

`reportDuplicateKeys` lit les dictionnaires non fusionnés que le build écrit sous `.intlayer/`, elle reste donc silencieuse jusqu'à ce que le projet ait été compilé au moins une fois. Deux déclarations partageant une clé sont fusionnées, ce qui est un modèle légitime — le rapport existe car un champ défini des deux côtés ne conserve silencieusement que l'une des deux valeurs.

L'analyseur est chargé depuis `@intlayer/lsp`, qui est distribué en ESM. La règle nécessite donc une version de Node capable de faire un `require()` sur un module ES — Node 20.19+ ou 22.12+. Sur toute version antérieure, elle ne signale rien plutôt que de faire échouer l'exécution du lint.

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

```javascript fileName="eslint.config.mjs"
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
