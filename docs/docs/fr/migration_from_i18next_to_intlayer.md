---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrer de i18next à Intlayer | Internationalisation (i18n)"
description: "Découvrez comment migrer votre application JavaScript/TypeScript de i18next à Intlayer — étape par étape, sans casser votre code existant. Utilisez l'adaptateur de compatibilité @intlayer/i18next pour une transition en douceur."
keywords:
  - i18next
  - intlayer
  - migration
  - internationalisation
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Migrer de i18next à Intlayer

## Pourquoi migrer de i18next à Intlayer ?

<AccordionGroup>

<Accordion header="Taille du bundle">

Au lieu de charger des fichiers JSON massifs dans vos pages, ne chargez que le contenu nécessaire. Intlayer aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>

<Accordion header="Maintenabilité">

Scoper le contenu de votre application **facilite la maintenance** pour les applications à grande échelle. Vous pouvez dupliquer ou supprimer un dossier de fonctionnalité entier sans avoir la charge mentale de revoir toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de votre contenu.

Intlayer est également la solution avec le **développement le plus actif** dans l'écosystème i18n — les problèmes sont résolus rapidement, de nouveaux adaptateurs de framework arrivent régulièrement, et l'API principale est continuellement affinée en fonction des retours de production réels.

</Accordion>

<Accordion header="Agent IA">

Colocaliser le contenu **réduit le contexte nécessaire** pour les Grands Modèles de Langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour tester les traductions manquantes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)**, et des **[compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, pour rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automatisation">

Utilisez l'automatisation pour traduire dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performance">

Connecter des fichiers JSON massifs aux composants peut entraîner des problèmes de performance et de réactivité. Intlayer optimise le chargement de votre contenu au moment de la construction.

</Accordion>

<Accordion header="Évolutivité avec des non-développeurs">

Plus qu'une simple solution i18n, Intlayer fournit un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour vous aider à gérer votre contenu multilingue en **temps réel**, rendant la collaboration avec les traducteurs, les rédacteurs et les autres membres de l'équipe transparente. Le contenu peut être stocké localement et/ou à distance.

</Accordion>

</AccordionGroup>

---

## Stratégies de migration

Il existe deux stratégies complémentaires pour migrer de `i18next` à Intlayer :

1. **Adaptateur de compatibilité (recommandé pour les applications existantes)** — Installez `@intlayer/i18next`. Ce package expose **exactement la même API** que `i18next` mais délègue tout le travail de traduction à Intlayer en coulisses. Vous conservez vos appels existants à `i18next.t()`, `i18next.changeLanguage()`, et `createInstance()` — le seul changement est le chemin d'importation et l'initialisation.

2. **Migration complète** — Remplacez progressivement les API `i18next` par des outils natifs Intlayer et colocalisez le contenu dans des fichiers `.content.ts`.

Ce guide couvre d'abord la **Stratégie 1** (adaptateur de compatibilité prêt à l'emploi), puis passe en revue la migration complète optionnelle.

---

## Table des Matières

<TOC/>

---

## Migration rapide

Les étapes suivantes sont le minimum requis pour faire fonctionner votre application `i18next` existante sur Intlayer avec zéro changement de code.

<Steps>

<Step number={1} title="Installer les Dépendances">

Installez les packages principaux d'Intlayer et l'adaptateur de compatibilité :

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Vous pouvez garder `i18next` installé — l'adaptateur de compatibilité l'utilise comme `devDependency` / `peerDependency` pour les types TypeScript.

</Step>

<Step number={2} title="Configurer Intlayer">

La commande `intlayer init` crée un fichier `intlayer.config.ts` de démarrage. Mettez-le à jour pour qu'il corresponde à vos paramètres régionaux existants et pointez le plugin `syncJSON` sur vos fichiers de messages :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez tous vos paramètres régionaux existants ici
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // correspond à la syntaxe d'espace réservé i18next : {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mappe un paramètre régional à son chemin de fichier JSON. **`location`** indique à l'observateur Intlayer quel dossier surveiller pour les modifications. L'option `format: 'i18next'` garantit que les espaces réservés comme `{{name}}` sont analysés correctement.

</Step>

<Step number={3} title="Mettre à jour les alias du bundle (Optionnel)">

Si vous utilisez un bundle (Vite, Webpack, esbuild), vous pouvez injecter un alias de module afin que `import ... from 'i18next'` se résolve automatiquement vers `@intlayer/i18next`. Cela élimine le besoin de modifier manuellement les imports dans votre base de code.

**Pour Vite :**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` enveloppe le plugin `intlayer()` de `vite-intlayer` et ajoute l'alias `i18next` → `@intlayer/i18next` pour vous. L'utilisation du simple plugin `intlayer()` de `vite-intlayer` compile les dictionnaires mais n'ajoute **pas** cet alias — vous devrez alors renommer les imports vers `@intlayer/i18next` manuellement (voir l'étape suivante).

</Step>

</Steps>

C'est tout pour la migration rapide. Votre application fonctionne désormais sur Intlayer tout en conservant chaque import et API `i18next` intacts.

---

## Migration complète

Les étapes ci-dessous sont facultatives et peuvent être effectuées de manière incrémentielle. Elles débloquent l'ensemble des fonctionnalités d'Intlayer : éditeur visuel, CMS, fichiers de contenu typés, traduction alimentée par l'IA, et plus encore.

<Steps>

<Step number={4} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Si vous préférez rendre la dépendance explicite dans vos fichiers sources, ou si vous n'utilisez pas de plugin de bundle pour aliasser les imports, vous pouvez renommer les imports manuellement :

| Avant                                      | Après                                                |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Ce sont des **remplacements directs** — aucun changement de signatures d'appel, d'arguments ou de types de retour n'est requis.

</Step>

<Step number={5} title="Activer l'automatisation de la traduction alimentée par l'IA" isOptional={true}>

Une fois Intlayer configuré, utilisez sa CLI pour remplir automatiquement les traductions manquantes :

```bash packageManager="npm"
# Tester les traductions manquantes (ajouter au CI)
npx intlayer test

# Remplir les traductions manquantes avec l'IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Ajoutez la configuration de l'IA à `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // défaut
    // model: "gpt-4o-mini",   // défaut
  },
};

export default config;
```

> Consultez la [documentation de la CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour toutes les options disponibles.

</Step>

</Steps>

---

## Ce que vous pouvez supprimer après la migration

Une fois l'adaptateur de compatibilité en place, le code standard `i18next` suivant peut être supprimé :

| Fichier / modèle                          | Pourquoi ce n'est plus nécessaire                                                                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appels `i18next.init()`                   | Intlayer initialise tout automatiquement ; il n'y a pas d'étape de chargement à l'exécution.                                                                                            |
| `i18next.use(...)`                        | Intlayer n'utilise pas de plugins, de backends ou de détecteurs de langue i18next.                                                                                                      |
| Bundles de langue JSON (`locales/*.json`) | Les bundles JSON ne sont nécessaires que si vous utilisez encore le plugin `syncJSON`. Une fois que vous migrez vers des fichiers `.content.ts`, vous pouvez supprimer le dossier JSON. |

Lorsque vous êtes prêt à aller plus loin, Intlayer **découvre automatiquement tous les fichiers `.content.ts` et `.content.json` n'importe où dans votre base de code** (par défaut, n'importe où dans `./src`). Vous pouvez placer un fichier `my-component.content.ts` juste à côté de votre logique et Intlayer le détectera au moment de la construction sans configuration supplémentaire — pas d'imports, pas d'enregistrement, pas besoin de fichier d'index centralisé. Cela rend la colocalisation des traductions complètement transparente.

---

## Configurer TypeScript

Intlayer utilise l'augmentation de module pour fournir une intellisense TypeScript complète pour vos clés de traduction. Assurez-vous que votre `tsconfig.json` inclut les types générés automatiquement :

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

---

## Configuration Git

Ajoutez le répertoire généré par Intlayer à votre `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Aller plus loin

- **Éditeur visuel** — Gérez les traductions visuellement dans votre navigateur : [Éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)
- **CMS** — Externalisez et gérez le contenu à distance : [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)
- **Extension VS Code** — Obtenez l'autocomplétion et la détection d'erreurs de traduction en temps réel : [Extension VS Code Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)
- **Référence CLI** — Liste complète des commandes CLI : [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
