---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimisation de la taille et des performances du bundle i18n
description: Réduisez la taille du bundle de votre application en optimisant le contenu d'internationalisation (i18n). Apprenez à exploiter le tree shaking et le lazy loading pour les dictionnaires avec Intlayer.
keywords:
  - Optimisation du bundle
  - Automatisation du contenu
  - Contenu dynamique
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Ajout des options `minify` et `purge` à la configuration de build"
---

# Optimisation de la taille et des performances du bundle i18n

L'un des défis les plus courants avec les solutions i18n traditionnelles basées sur des fichiers JSON est la gestion de la taille du contenu. Si les développeurs ne séparent pas manuellement le contenu en namespaces, les utilisateurs finissent souvent par télécharger les traductions de chaque page et potentiellement de chaque langue simplement pour afficher une seule page.

Par exemple, une application avec 10 pages traduites en 10 langues peut entraîner le téléchargement par un utilisateur du contenu de 100 pages, alors qu'il n'a besoin que d'**une seule** (la page actuelle dans la langue actuelle). Cela conduit à un gaspillage de bande passante et à des temps de chargement plus lents.

**Intlayer résout ce problème grâce à une optimisation au moment de la compilation.** Il analyse votre code pour détecter quels dictionnaires sont réellement utilisés par composant et réinjecte uniquement le contenu nécessaire dans votre bundle.

## Table des matières

<TOC />

## Analyser votre bundle

L'analyse de votre bundle est la première étape pour identifier les fichiers JSON "lourds" et les opportunités de fractionnement de code (code-splitting). Ces outils génèrent une carte arborescente (treemap) visuelle du code compilé de votre application, vous permettant de voir exactement quelles bibliothèques consomment le plus d'espace.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite utilise Rollup sous le capot. Le plugin `rollup-plugin-visualizer` génère un fichier HTML interactif montrant la taille de chaque module dans votre graphique.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Ouvre automatiquement le rapport dans votre navigateur
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Pour les projets utilisant l'App Router et Turbopack, Next.js fournit un analyseur expérimental intégré qui ne nécessite aucune dépendance supplémentaire.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Si vous utilisez le bundler Webpack par défaut dans Next.js, utilisez l'analyseur de bundle officiel. Déclenchez-le en définissant une variable d'environnement lors de votre build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Votre configuration Next.js
});
```

**Utilisation :**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack standard

Pour Create React App (ejected), Angular ou les configurations Webpack personnalisées, utilisez le standard de l'industrie `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Comment ça fonctionne

Intlayer utilise une **approche par composant**. Contrairement aux fichiers JSON globaux, votre contenu est défini à côté ou à l'intérieur de vos composants. Lors du processus de build, Intlayer :

1.  **Analyse** votre code pour trouver les appels à `useIntlayer`.
2.  **Construit** le contenu du dictionnaire correspondant.
3.  **Remplace** l'appel à `useIntlayer` par un code optimisé basé sur votre configuration.

Cela garantit que :

- Si un composant n'est pas importé, son contenu n'est pas inclus dans le bundle (élimination de code mort).
- Si un composant est chargé de manière paresseuse (lazy-loaded), son contenu l'est aussi.

## Configuration par plateforme

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js nécessite le plugin `@intlayer/swc` pour gérer la transformation, car Next.js utilise SWC pour les builds.

> Ce plugin n'est pas installé par défaut car les plugins SWC sont encore expérimentaux pour Next.js. Cela peut changer à l'avenir.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Une fois installé, Intlayer détectera et utilisera automatiquement le plugin.

 </Tab>
 <Tab value="vite">

### Vite

Vite utilise le plugin `@intlayer/babel` qui est inclus comme dépendance de `vite-intlayer`. L'optimisation est activée par défaut. Rien d'autre à faire.

 </Tab>
 <Tab value="webpack">

### Webpack

Pour activer l'optimisation du bundle avec Intlayer sur Webpack, vous devez installer et configurer le plugin Babel (`@intlayer/babel`) ou SWC (`@intlayer/swc`) approprié.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Configuration

Vous pouvez contrôler la manière dont Intlayer optimise votre bundle via la propriété `build` dans votre fichier `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minifier les dictionnaires pour réduire la taille du bundle.
     */
     minify: true;

    /**
     * Purger les clés inutilisées dans les dictionnaires
     */
     purge: true;

    /**
     * Indique si le build doit vérifier les types TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Conserver l'option par défaut pour `optimize` est recommandé dans la grande majorité des cas.

> Voir la documentation de configuration pour plus de détails : [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

### Options de build

Les options suivantes sont disponibles sous l'objet de configuration `build` :

| Propriété      | Type      | Par défaut  | Description                                                                                                                                                                                                       |
| :------------- | :-------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Contrôle si l'optimisation du build est activée. Si `true`, Intlayer remplace les appels aux dictionnaires par des injections optimisées. Si `false`, l'optimisation est désactivée. Idéalement à `true` en prod. |
| **`minify`**   | `boolean` | `false`     | Indique s'il faut minifier les dictionnaires pour réduire la taille du bundle.                                                                                                                                    |
| **`purge`**    | `boolean` | `false`     | Indique s'il faut purger les clés inutilisées dans les dictionnaires.                                                                                                                                             |

### Minification

La minification des dictionnaires supprime les espaces inutiles, les commentaires et réduit la taille du contenu JSON. C'est particulièrement utile pour les dictionnaires volumineux.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Note : La minification est ignorée si `optimize` est désactivé ou si l'Éditeur Visuel est activé (car l'éditeur a besoin du contenu complet pour permettre l'édition).

### Purge

La purge garantit que seules les clés réellement utilisées dans votre code sont incluses dans le bundle final de dictionnaires. Cela peut réduire considérablement la taille de votre bundle si vous avez de grands dictionnaires avec de nombreuses clés qui ne sont pas utilisées dans chaque partie de votre application.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Note : La purge est ignorée si `optimize` est désactivé.

### Mode d'importation

Pour les grandes applications comprenant plusieurs pages et locales, vos fichiers JSON peuvent représenter une partie importante de la taille de votre bundle. Intlayer vous permet de contrôler la manière dont les dictionnaires sont chargés.

Le mode d'importation peut être défini par défaut globalement dans votre fichier `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Ainsi que pour chaque dictionnaire dans vos fichiers `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Surcharge le mode d'importation par défaut
  content: {
    // ...
  },
};

export default appContent;
```

| Propriété        | Type                               | Par défaut | Description                                                                                                                  |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Obsolète** : Utilisez `dictionary.importMode` à la place. Détermine comment les dictionnaires sont chargés (voir détails). |

Le paramètre `importMode` dicte comment le contenu du dictionnaire est injecté dans votre composant.
Vous pouvez le définir globalement dans le fichier `intlayer.config.ts` sous l'objet `dictionary`, ou vous pouvez le surcharger pour un dictionnaire spécifique dans son fichier `.content.ts`.

### 1. Mode Statique (`default`)

En mode statique, Intlayer remplace `useIntlayer` par `useDictionary` et injecte le dictionnaire directement dans le bundle JavaScript.

- **Avantages :** Rendu instantané (synchrone), zéro requête réseau supplémentaire lors de l'hydratation.
- **Inconvénients :** Le bundle inclut les traductions pour **toutes** les langues disponibles pour ce composant spécifique.
- **Idéal pour :** Single Page Applications (SPA).

**Exemple de code transformé :**

```tsx
// Votre code
const content = useIntlayer("my-key");

// Code optimisé (Statique)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Mode Dynamique

En mode dynamique, Intlayer remplace `useIntlayer` par `useDictionaryAsync`. Cela utilise `import()` (mécanisme de type Suspense) pour charger paresseusement spécifiquement le JSON pour la locale actuelle.

- **Avantages :** **Tree shaking au niveau de la locale.** Un utilisateur consultant la version anglaise ne téléchargera _que_ le dictionnaire anglais. Le dictionnaire français n'est jamais chargé.
- **Inconvénients :** Déclenche une requête réseau (récupération d'asset) par composant lors de l'hydratation.
- **Idéal pour :** Gros blocs de texte, articles ou applications supportant de nombreuses langues où la taille du bundle est critique.

**Exemple de code transformé :**

```tsx
// Votre code
const content = useIntlayer("my-key");

// Code optimisé (Dynamique)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Lors de l'utilisation de `importMode: 'dynamic'`, si vous avez 100 composants utilisant `useIntlayer` sur une seule page, le navigateur tentera 100 récupérations séparées. Pour éviter cette "cascade" de requêtes, regroupez le contenu dans moins de fichiers `.content` (par exemple, un dictionnaire par section de page) plutôt qu'un par composant atomique.

### 3. Mode Fetch

Se comporte de manière similaire au mode Dynamique mais tente d'abord de récupérer les dictionnaires à partir de l'API Intlayer Live Sync. Si l'appel API échoue ou si le contenu n'est pas marqué pour les mises à jour en direct, il se replie sur l'importation dynamique.

> Voir la documentation CMS pour plus de détails : [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)

> En mode fetch, la purge et la minification ne peuvent pas être utilisées.

## Résumé : Statique vs Dynamique

| Fonctionnalité                 | Mode Statique                                         | Mode Dynamique                                   |
| :----------------------------- | :---------------------------------------------------- | :----------------------------------------------- |
| **Taille du bundle JS**        | Plus grande (inclut toutes les langues pour le comp.) | Plus petite (seulement le code, pas de contenu)  |
| **Chargement initial**         | Instantané (le contenu est dans le bundle)            | Léger délai (récupère le JSON)                   |
| **Requêtes réseau**            | 0 requête supplémentaire                              | 1 requête par dictionnaire                       |
| **Tree Shaking**               | Au niveau du composant                                | Au niveau du composant + Au niveau de la locale  |
| **Meilleur cas d'utilisation** | Composants UI, petites applications                   | Pages avec beaucoup de texte, nombreuses langues |
