---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrer de @nuxtjs/i18n à Intlayer | Internationalisation (i18n)"
description: "Découvrez comment migrer votre application Nuxt de @nuxtjs/i18n à Intlayer — étape par étape, sans casser votre code existant. Utilisez l'adaptateur de compatibilité @intlayer/vue-i18n pour une transition en douceur."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migration
  - internationalisation
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrer de @nuxtjs/i18n à Intlayer

## Pourquoi migrer de @nuxtjs/i18n à Intlayer ?

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

Étant donné que `@nuxtjs/i18n` est propulsé par `vue-i18n` en coulisses, il existe deux stratégies complémentaires pour migrer vers Intlayer :

1. **Adaptateur de compatibilité (recommandé pour les applications existantes)** — Installez `@intlayer/vue-i18n` et `nuxt-intlayer`. Cela expose **exactement la même API** que `vue-i18n` mais délègue tout le travail de traduction à Intlayer. Vous conservez vos appels existants à `$t`, `useI18n()`, et le routage Nuxt intacts — le seul changement est l'initialisation.

2. **Migration complète** — Remplacez progressivement les API `@nuxtjs/i18n` par des hooks natifs Intlayer (`useIntlayer`) et colocalisez le contenu dans des fichiers `.content.ts` avec vos composants.

Ce guide couvre d'abord la **Stratégie 1** (adaptateur de compatibilité prêt à l'emploi), puis passe en revue la migration complète optionnelle.

---

## Table des Matières

<TOC/>

---

## Migration rapide

Les étapes suivantes sont le minimum requis pour faire fonctionner votre application Nuxt existante sur Intlayer avec zéro changement de code dans vos composants.

<Steps>

<Step number={1} title="Installer les Dépendances">

Installez les packages principaux d'Intlayer et l'adaptateur de compatibilité :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Vous pouvez garder `@nuxtjs/i18n` installé en toute sécurité pendant la migration, bien que vous le supprimiez de votre configuration Nuxt sous peu.

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
      // correspond à la syntaxe d'espace réservé vue-i18n : {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** mappe un paramètre régional à son chemin de fichier JSON. **`location`** indique à l'observateur Intlayer quel dossier surveiller pour les modifications. L'option `format: 'icu'` garantit que les espaces réservés sont analysés correctement pour `vue-i18n`.

</Step>

<Step number={3} title="Mettre à jour la Configuration Nuxt">

Remplacez le module `@nuxtjs/i18n` par `nuxt-intlayer` dans votre `nuxt.config.ts`. Le plugin Intlayer injecte automatiquement des alias de module, ce qui signifie que vos appels existants `import { useI18n } from 'vue-i18n'` sont redirigés de manière transparente vers `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Supprimer '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Vous n'avez plus besoin de définir les objets de configuration Nuxt i18n.** Intlayer compile tous les dictionnaires **au moment de la construction**, gérant la détection des paramètres régionaux, le routage et le chargement des dictionnaires de manière transparente.

</Step>

</Steps>

C'est tout pour la migration rapide. Votre application Nuxt fonctionne désormais sur Intlayer tout en conservant chaque `$t` et `useI18n()` intacts.

---

## Migration complète

Les étapes ci-dessous sont facultatives et peuvent être effectuées de manière incrémentielle. Elles débloquent l'ensemble des fonctionnalités d'Intlayer : éditeur visuel, CMS, fichiers de contenu typés, traduction alimentée par l'IA, et plus encore.

<Steps>

<Step number={4} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Les plugins Intlayer gèrent déjà l'aliassage au niveau du bundler. Si vous préférez rendre la dépendance explicite dans vos fichiers sources, vous pouvez renommer les imports manuellement :

| Avant                                | Après                                          |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

Une fois l'adaptateur de compatibilité en place, le code standard suivant peut être supprimé :

| Fichier / modèle                            | Pourquoi ce n'est plus nécessaire                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| configurations `i18n` dans `nuxt.config.ts` | Intlayer gère le routage, le chargement des dictionnaires et les paramètres régionaux par défaut en interne.                                                                            |
| `@nuxtjs/i18n` dans `package.json`          | Remplacé entièrement par `nuxt-intlayer`.                                                                                                                                               |
| Bundles de langue JSON (`locales/*.json`)   | Les bundles JSON ne sont nécessaires que si vous utilisez encore le plugin `syncJSON`. Une fois que vous migrez vers des fichiers `.content.ts`, vous pouvez supprimer le dossier JSON. |

Lorsque vous êtes prêt à aller plus loin, Intlayer **découvre automatiquement tous les fichiers `.content.ts` et `.content.json` n'importe où dans votre base de code** (par défaut, n'importe où dans `./src`). Vous pouvez placer un fichier `my-component.content.ts` juste à côté de votre `MyComponent.vue` et Intlayer le détectera au moment de la construction sans configuration supplémentaire — pas d'imports, pas d'enregistrement, pas besoin de fichier d'index centralisé. Cela rend la colocalisation des traductions avec les pages et les composants complètement transparente.

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
- **Intlayer avec Nuxt** — Guide d'installation complet pour Nuxt : [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md)
- **Intlayer avec Vue** — Guide d'installation complet pour Vue : [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)
