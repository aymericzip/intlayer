---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrer de react-i18next / i18next à Intlayer | Internationalisation (i18n)"
description: "Découvrez comment migrer votre application React ou Next.js de react-i18next ou i18next à Intlayer — étape par étape, sans casser votre code existant. Utilisez les adaptateurs de compatibilité @intlayer/react-i18next et @intlayer/i18next pour une transition en douceur."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalisation
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrer de react-i18next / i18next à Intlayer

## Pourquoi migrer de react-i18next / i18next à Intlayer ?

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

Il existe deux stratégies complémentaires pour migrer de `react-i18next` / `i18next` à Intlayer :

1. **Adaptateur de compatibilité (recommandé pour les applications existantes)** — Installez `@intlayer/react-i18next` (pour les composants React) et/or `@intlayer/i18next` (pour l'instance de base `i18n`). Ces packages exposent **exactement la même API** que `react-i18next` / `i18next` mais délèguent tout le travail de traduction à Intlayer. Vous conservez vos appels existants à `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` — le seul changement est le chemin d'importation.

2. **Migration complète** — Remplacez progressivement les API `react-i18next` par des hooks natifs Intlayer (`useIntlayer`, `IntlayerProvider`) et colocalisez le contenu dans des fichiers `.content.ts` avec vos composants.

Ce guide couvre d'abord la **Stratégie 1** (adaptateur de compatibilité prêt à l'emploi), puis passe en revue la migration complète optionnelle.

---

## Table des Matières

<TOC/>

---

## Migration rapide

Les étapes suivantes sont le minimum requis pour faire fonctionner votre application `react-i18next` existante sur Intlayer avec zéro changement de code.

<Steps>

<Step number={1} title="Installer les Dépendances">

Installez les packages principaux d'Intlayer et les adaptateurs de compatibilité :

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
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Vous pouvez garder `react-i18next` et `i18next` installés — les adaptateurs de compatibilité les utilisent comme `devDependencies` / `peerDependencies` optionnels pour les types TypeScript. Vous n'avez pas besoin de changer de peers dans `package.json`.

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
      // correspond à la syntaxe d'espace réservé react-i18next : {{name}}
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

<Step number={3} title="Ajouter le Plugin Intlayer à votre Bundler">

Enveloppez votre configuration de bundler existante avec le plugin de compatibilité. Il compose le plugin Intlayer de base, configure la surveillance du contenu, et — point critique — **injecte des alias de module** afin que vos appels existants `import … from 'react-i18next'` (et `'i18next'`) soient redirigés de manière transparente vers `@intlayer/react-i18next` / `@intlayer/i18next` lors de la construction. Aucun changement de fichier source n'est nécessaire.

**Pour Vite :**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` enveloppe le plugin `intlayer()` de `vite-intlayer` et ajoute les alias `react-i18next` / `i18next`. L'utilisation du simple plugin `intlayer()` de `vite-intlayer` compile les dictionnaires mais n'ajoute **pas** ces alias — vous devrez alors renommer les imports vers `@intlayer/*` manuellement (voir l'étape 4).

**Pour Next.js :**

Si vous utilisez `next-i18next` (intégration Pages Router), installez `@intlayer/next-i18next` et `next-intlayer` :

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Puis ajoutez le plugin de compatibilité à votre `next.config.ts` (il injecte les alias `next-i18next` / `react-i18next` / `i18next`) :

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* vos options */};

export default withIntlayer(nextConfig);
```

> **Vous n'avez plus besoin de `i18next.init()` ou du bootstrap manuel du provider.** Intlayer compile tous les dictionnaires **au moment de la construction**, il n'y a donc pas d'étape de chargement à l'exécution. Le provider aliasé gère l'initialisation pour vous.

</Step>

</Steps>

C'est tout pour la migration rapide. Votre application fonctionne désormais sur Intlayer tout en conservant chaque import et API `react-i18next` intacts.

> **Clés de traduction typées — automatiques.** Une fois qu'Intlayer a compilé vos dictionnaires, `useTranslation` et `getFixedT` sont typés par rapport à votre contenu réel. Les clés sont autocomplétées dans votre IDE et les chemins invalides provoquent des erreurs TypeScript au moment de la construction — aucune configuration supplémentaire n'est requise.
>
> ```tsx
> // 'about' est une clé de dictionnaire enregistrée → t() n'accepte que des chemins valides
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocomplété
> t("does.not.exist"); // ✗ Erreur TypeScript
>
> // Côté serveur (instance i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typé
> ```

---

## Migration complète

Les étapes ci-dessous sont facultatives et peuvent être effectuées de manière incrémentielle. Elles débloquent l'ensemble des fonctionnalités d'Intlayer : éditeur visuel, CMS, fichiers de contenu typés, traduction alimentée par l'IA, et plus encore.

<Steps>

<Step number={4} title="Renommage explicite des imports (optionnel)" isOptional={true}>

Les plugins Intlayer gèrent déjà l'aliassage au niveau du bundler. Si vous préférez rendre la dépendance explicite dans vos fichiers sources, vous pouvez renommer les imports manuellement :

| Avant                                              | Après                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Pour Next.js (`next-i18next`) :

| Avant                                                                          | Après                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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

Une fois les adaptateurs de compatibilité en place, le code standard `react-i18next` / `i18next` suivant peut être supprimé :

| Fichier / modèle                          | Pourquoi ce n'est plus nécessaire                                                                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appels `i18next.init()`                   | Le provider d'Intlayer initialise tout automatiquement ; il n'y a pas d'étape de chargement à l'exécution.                                                                              |
| `I18nextProvider` / `initReactI18next`    | Le plugin Intlayer gère l'injection et le bootstrap en coulisses.                                                                                                                       |
| Bundles de langue JSON (`locales/*.json`) | Les bundles JSON ne sont nécessaires que si vous utilisez encore le plugin `syncJSON`. Une fois que vous migrez vers des fichiers `.content.ts`, vous pouvez supprimer le dossier JSON. |

Lorsque vous êtes prêt à aller plus loin, Intlayer **découvre automatiquement tous les fichiers `.content.ts` et `.content.json` n'importe où dans votre base de code** (par défaut, n'importe où dans `./src`). Vous pouvez placer un fichier `my-component.content.ts` juste à côté de votre `MyComponent.tsx` et Intlayer le détectera au moment de la construction sans configuration supplémentaire — pas d'imports, pas d'enregistrement, pas besoin de fichier d'index centralisé. Cela rend la colocalisation des traductions avec les pages et les composants complètement transparente.

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
- **Intlayer avec React** — Guide d'installation complet pour React : [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- **Intlayer avec Next.js** — Guide d'installation complet pour Next.js : [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)
