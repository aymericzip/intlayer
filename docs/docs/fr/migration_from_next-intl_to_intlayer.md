---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrer de next-intl à Intlayer | Internationalisation (i18n)"
description: "Découvrez comment migrer votre application Next.js de next-intl à Intlayer — étape par étape, sans casser votre code existant. Utilisez l'adaptateur de compatibilité @intlayer/next-intl pour une transition en douceur."
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalisation
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrer de next-intl à Intlayer

## Pourquoi migrer de next-intl à Intlayer ?

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

## Stratégie de migration

L'approche recommandée pour les applications existantes est l'**adaptateur de compatibilité** : installez `@intlayer/next-intl`, qui expose **exactement la même API** que `next-intl` mais délègue tout le travail de traduction à Intlayer en coulisses.

Vous conservez vos `useTranslations`, `getTranslations`, `NextIntlClientProvider` existants et autres amis — **le seul changement est le chemin d'importation**. Aucun refactoring des signatures d'appel, des formes de prop ou de la structure des composants n'est requis.

Au fil du temps, vous pouvez optionnellement migrer des fichiers individuels vers le format `.content.ts` plus riche d'Intlayer pour débloquer l'éditeur visuel, le CMS et la portée du contenu par composant — mais cette étape est entièrement facultative et peut être effectuée de manière incrémentielle.

---

## Table des Matières

<TOC/>

---

## Migration rapide

Les étapes suivantes sont le minimum requis pour faire fonctionner votre application `next-intl` existante sur Intlayer avec zéro changement de code.

<Steps>

<Step number={1} title="Installer les Dépendances">

Installez les packages principaux d'Intlayer et l'adaptateur de compatibilité `@intlayer/next-intl` :

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Gardez `next-intl` installé — il est toujours requis pour le **routage URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). L'adaptateur de compatibilité ne remplace **pas** la couche de routage.

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
      // 'icu' correspond à la syntaxe d'espace réservé ICU de next-intl : {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** mappe un paramètre régional à son chemin de fichier JSON. **`location`** indique à l'observateur Intlayer quel dossier surveiller pour les modifications. L'option `format: 'icu'` garantit que les espaces réservés ICU comme `{name}` et `{count, plural, one {# item} other {# items}}` sont analysés correctement.

> Pour une liste complète des options de configuration, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Ajouter le Plugin Intlayer à Next.js">

Enveloppez votre configuration Next.js existante avec `createNextIntlPlugin` depuis `@intlayer/next-intl/plugin`. Cette enveloppe compose `withIntlayer` **et** enregistre les alias `next-intl` → `@intlayer/next-intl` pour vous :

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* vos options de configuration existantes */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` enveloppe `withIntlayer`, détecte automatiquement **Webpack** ou **Turbopack**, configure la surveillance du contenu, la compilation des dictionnaires et — point critique — **injecte des alias de module** afin que vos appels existants `import … from 'next-intl'` soient redirigés de manière transparente vers `@intlayer/next-intl` lors de la construction. L'entrée de routage `next-intl/routing` reste pointée vers le package réel. Aucun changement de fichier source n'est nécessaire.
>
> Préférez-vous le `withIntlayer` simple de `next-intlayer/server` ? Il compilera vos dictionnaires, mais n'ajoutera **pas** les alias `next-intl` — vous devrez alors renommer les imports vers `@intlayer/next-intl` manuellement (voir l'étape 4).

> **Vous n'avez plus besoin de `getRequestConfig` ou de `loadMessages`.** Avec `next-intl`, vous deviez écrire un fichier `src/i18n.ts` qui chargeait des bundles de messages JSON à chaque requête via `getRequestConfig`. Intlayer compile tous les dictionnaires **au moment de la construction**, il n'y a donc pas d'étape de chargement à l'exécution. Vous pouvez supprimer ce fichier entièrement (ou ne conserver que les parties de routage si vous utilisez toujours `createNavigation`).

</Step>

</Steps>

C'est tout pour la migration rapide. Votre application fonctionne désormais sur Intlayer tout en conservant chaque import et API `next-intl` intacts.

> **Clés de traduction typées — automatiques.** Une fois qu'Intlayer a compilé vos dictionnaires, `useTranslations` et `getTranslations` sont typés par rapport à votre contenu réel. Les clés sont autocomplétées dans votre IDE et les chemins invalides provoquent des erreurs TypeScript au moment de la construction — aucune configuration supplémentaire n'est requise.
>
> ```tsx
> // Composant client — 'about' est une clé de dictionnaire enregistrée
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocomplété
> t("does.not.exist"); // ✗ Erreur TypeScript
>
> // Composant serveur
> const t = await getTranslations("about");
> t("counter.label"); // ✓ typé
> ```

---

## Migration complète

Les étapes ci-dessous sont facultatives et peuvent être effectuées de manière incrémentielle. Elles débloquent l'ensemble des fonctionnalités d'Intlayer : éditeur visuel, CMS, fichiers de contenu typés, traduction alimentée par l'IA, et plus encore.

<Steps>

<Step number={4} title="Renommage explicite des imports (optionnel)" isOptional={true}>

L'enveloppe `createNextIntlPlugin()` gère déjà l'aliassage `next-intl` → `@intlayer/next-intl` au niveau du bundler. Si vous préférez rendre la dépendance explicite dans vos fichiers sources (et utiliser le plugin `withIntlayer` simple à la place), vous pouvez renommer les imports manuellement :

| Avant                                                | Après                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Conservez toujours les imports de routage du vrai `next-intl` — l'adaptateur de compatibilité ne remplace **pas** la couche de routage URL :
>
> ```ts
> // ✅ Conservez toujours ceux-ci depuis le vrai 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternativement, vous pouvez utiliser `defineRouting` depuis `@intlayer/next-intl/routing` qui fusionne automatiquement la configuration des paramètres régionaux de votre `intlayer.config.ts`.

</Step>

<Step number={5} title="Activer l'automatisation de la traduction alimentée par l'IA" isOptional={true}>

Une fois Intlayer configuré, vous pouvez utiliser sa CLI pour remplir automatiquement les traductions manquantes en utilisant le LLM de votre choix :

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

Ajoutez une clé `OPENAI_API_KEY` (ou la clé de votre fournisseur préféré) à votre fichier `.env`, puis étendez votre `intlayer.config.ts` :

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Une fois `@intlayer/next-intl` en place, le code standard `next-intl` suivant peut être supprimé :

| Fichier / modèle                                                 | Pourquoi ce n'est plus nécessaire                                                                                                                                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L'exportation `getRequestConfig` dans `src/i18n.ts`              | Intlayer compile les dictionnaires au moment de la construction ; il n'y a pas de chargement de message par requête. Conservez le fichier uniquement s'il exporte également les aides de routage `createNavigation`. |
| Appel de `loadMessages()` / `getMessages()` dans la mise en page | Le `NextIntlClientProvider` de `@intlayer/next-intl` lit à partir de la sortie compilée ; aucune propriété `messages` n'est requise.                                                                                 |
| Imports de `locales/{locale}/*.json` dans la mise en page        | Les bundles JSON ne sont nécessaires que si vous utilisez encore le plugin `syncJSON`. Une fois que vous migrez vers des fichiers `.content.ts`, vous pouvez supprimer le dossier JSON.                              |

Lorsque vous êtes prêt à aller plus loin, Intlayer **découvre automatiquement tous les fichiers `.content.ts` et `.content.json` n'importe où dans votre base de code** (par défaut, n'importe où dans `./src`). Vous pouvez placer un fichier `about.content.ts` juste à côté de votre `about/page.tsx` et Intlayer le détectera au moment de la construction sans configuration supplémentaire — pas d'imports, pas d'enregistrement, pas besoin de fichier d'index centralisé. Cela rend la colocalisation des traductions avec les pages et les composants complètement transparente.

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
- **Intlayer avec Next.js** — Guide d'installation complet pour Next.js : [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)
