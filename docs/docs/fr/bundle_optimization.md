---
createdAt: 2025-11-25
updatedAt: 2026-08-09
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
  - version: 9.2.1
    date: 2026-08-09
    changes: "`purge` et `minify` fonctionnent désormais sur Next.js via `@intlayer/swc` — aucun `babel.config.js` requis"
  - version: 8.12.0
    date: 2026-06-24
    changes: "Liste des plugins Babel dans l'ordre de pipeline requis (extract → purge → minify → optimize) dans les tableaux de référence"
  - version: 8.12.0
    date: 2026-06-07
    changes: "Ajout de `intlayerPurgeBabelPlugin` et `intlayerMinifyBabelPlugin` pour Babel/Webpack; clarification du pipeline de plugins"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Ajout des options `minify` et `purge` à la configuration de build"
author: aymericzip
---

# Optimisation de la taille et des performances du bundle i18n

L'un des défis les plus courants avec les solutions i18n traditionnelles basées sur des fichiers JSON est la gestion de la taille du contenu. Si les développeurs ne séparent pas manuellement le contenu en namespaces, les utilisateurs finissent souvent par télécharger les traductions de chaque page et potentiellement de chaque langue simplement pour afficher une seule page.

Par exemple, une application avec 10 pages traduites en 10 langues peut entraîner le téléchargement par un utilisateur du contenu de 100 pages, alors qu'il n'a besoin que d'**une seule** (la page actuelle dans la langue actuelle). Cela conduit à un gaspillage de bande passante et à des temps de chargement plus lents.

**Intlayer résout ce problème grâce à une optimisation au moment de la compilation.** Il analyse votre code pour détecter quels dictionnaires sont réellement utilisés par composant et réinjecte uniquement le contenu nécessaire dans votre bundle.

## Table des matières

<TOC />

## Comment ça fonctionne

Intlayer utilise une **approche par composant**. Contrairement aux fichiers JSON globaux, votre contenu est défini à côté ou à l'intérieur de vos composants. Lors du processus de build, Intlayer :

1. **Analyse** votre code pour trouver les appels à `useIntlayer`.
2. **Construit** le contenu du dictionnaire correspondant.
3. **Remplace** l'appel à `useIntlayer` par un code optimisé basé sur votre configuration.

Cela garantit que :

- Si un composant n'est pas importé, son contenu n'est pas inclus dans le bundle (Élimination de code mort).
- Si un composant est chargé de manière paresseuse, son contenu l'est aussi.

## Configuration par plateforme

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js nécessite le plugin `@intlayer/swc`, car Next.js utilise SWC pour les builds. Depuis la **v9.2.1**, ce seul paquet couvre tout le pipeline — optimisation (réécriture des imports), purge et minification.

> Ce plugin n'est pas installé par défaut car les plugins SWC sont encore expérimentaux pour Next.js. Cela pourrait changer à l'avenir.

> **Next.js 16.1.0 est la version minimale.** C'est la première version construite sur l'ABI de plugin Wasm de SWC compatible en avant ; les versions antérieures rejettent le plugin. `withIntlayer` lit votre version de Next.js et n'enregistre tout simplement pas le plugin en dessous de 16.1.0 — ces builds réussissent quand même, ils s'exécutent simplement sans l'optimisation du bundle.

<Tabs>
 <Tab value="npm">

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

 </Tab>
 <Tab value="Crates.io (rust)">

```toml fileName="Cargo.toml"
[dependencies]
intlayer-swc-plugin = "*"
```

[View on Crates.io](https://crates.io/crates/intlayer-swc-plugin)

 </Tab>
</Tabs>

Une fois installé, Intlayer détectera et utilisera automatiquement le plugin.

Les passes de **purge et de minification** (suppression et renommage de champs) ne nécessitent aucun paquet supplémentaire ni `babel.config.js`. Enveloppez votre configuration avec `withIntlayer` et activez les drapeaux dans `intlayer.config.ts` :

```typescript fileName="next.config.ts"
import { withIntlayer } from "next-intlayer/server";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* votre configuration */};

export default withIntlayer(nextConfig);
```

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // supprime les champs de contenu inutilisés des JSON groupés
    minify: true, // renomme les clés de champs avec de courts alias
  },
};

export default config;
```

Pendant `next build`, `withIntlayer` analyse vos sources, réécrit les dictionnaires compilés et transmet les tables de renommage de champs résultantes à `@intlayer/swc`, qui met à jour les accès de propriétés correspondants dans votre code.

> Utilisez la version asynchrone `withIntlayer`, pas `withIntlayerSync`. La variante synchrone n'exécute pas le pipeline d'analyse : la purge et la minification n'ont donc aucun effet avec elle.

> La purge et la minification ne s'exécutent que lors de `next build` — le pipeline d'optimisation est désactivé pendant `next dev`.

> Elles sont également désactivées lorsque des appelants d'adaptateurs de compatibilité sont configurés (`swcExtraCallers`, définis par les paquets de compatibilité tels que `@intlayer/next-intl` ou `@intlayer/react-i18next`) : ces sites d'appel sont invisibles pour l'analyseur d'usage, et purger supprimerait donc des champs que le code lit encore. La réécriture des imports reste active.

**Les versions antérieures (avant 9.2.1)** nécessitaient `@intlayer/babel` et un `babel.config.js` déclarant `intlayerPurgeBabelPlugin` et `intlayerMinifyBabelPlugin`. Ce fichier n'est plus nécessaire et peut être supprimé.

 </Tab>
 <Tab value="vite">

### Vite

Vite utilise le plugin `@intlayer/babel`, qui est inclus en tant que dépendance de `vite-intlayer`. L'ensemble du pipeline d'optimisation — réécriture des imports, purge et minification — est activé par défaut et ne nécessite aucune inscription de plugin supplémentaire.

Activez la purge et la minification en définissant les drapeaux correspondants dans `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // supprime les champs inutilisés des JSON groupés
    minify: true, // renomme les clés de champs avec de courts alias
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (et Next.js avec Babel)

Installez `@intlayer/babel` :

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

Ajoutez les quatre plugins à `babel.config.js` dans le bon ordre :

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract : compile les fichiers .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge : supprime les champs inutilisés de .intlayer/**/*.json
    //    (lit le drapeau build.purge de intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify : renomme les clés de champs dans le JSON + code source
    //    (lit le drapeau build.minify de intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize : réécrit useIntlayer('key') → useDictionary(hash)
    //    Doit venir en dernier car il efface la clé du dictionnaire.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Référence des plugins

L'optimisation de build d'Intlayer est divisée en plusieurs plugins distincts, chacun ayant une responsabilité unique. Comprendre ce que fait chacun d'eux évite la confusion lors de leur configuration.

### Plugins Babel (`@intlayer/babel`)

Ceux-ci sont utilisés directement dans `babel.config.js` pour les configurations basées sur Webpack (Next.js avec Babel, CRA, Webpack personnalisé, etc.).

Le tableau ci-dessous les liste dans leur ordre de pipeline requis (le même ordre dans lequel ils doivent apparaître dans `babel.config.js`) :

| Plugin                        | Ce qu'il fait                                                                                                                                |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Analyse les fichiers `.content.ts` et écrit les dictionnaires compilés dans `.intlayer/`                                                     |
| `intlayerPurgeBabelPlugin`    | Analyse tous les fichiers sources, supprime les **champs de contenu inutilisés** des fichiers de dictionnaire compilés `.intlayer/**/*.json` |
| `intlayerMinifyBabelPlugin`   | **Renomme les clés des champs de contenu** par de courts alias alphabétiques (`title` → `a`) dans les fichiers JSON et le code source        |
| `intlayerOptimizeBabelPlugin` | Réécrit `useIntlayer('key')` → `useDictionary(hash)` et injecte l'`import` du dictionnaire correspondant                                     |

> **L'ordre des plugins a de l'importance.** Dans votre `babel.config.js`, les plugins de purge et de minification doivent apparaître **avant** le plugin d'optimisation. La passe d'optimisation remplace `useIntlayer('key')` par un appel opaque `useDictionary(hash)`, effaçant l'information de la clé du dictionnaire dont les passes de purge et de minification ont besoin pour identifier les champs utilisés.

Chaque plugin Babel dispose d'un helper d'options correspondant qui lit votre `intlayer.config.ts` une fois lors du chargement de la configuration et renvoie les valeurs pré-résolues :

| Helper d'options             | Utilisé avec                  |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |

### Plugins Vite (`vite-intlayer`)

Les utilisateurs de Vite **ne configurent jamais ceux-ci directement**. Ils sont automatiquement mis en place lorsque vous appelez `withIntlayer()` dans `vite.config.ts`. Les drapeaux `build.purge` et `build.minify` dans `intlayer.config.ts` basculent le comportement correspondant sans aucune inscription supplémentaire de plugin.

| Plugin Vite interne     | Comportement équivalent                                                                              |
| :---------------------- | :--------------------------------------------------------------------------------------------------- |
| Analyseur d'usage       | Identique à la passe d'analyse de `intlayerPurgeBabelPlugin`                                         |
| Élagage de dictionnaire | Identique à la passe d'écriture JSON de `intlayerPurgeBabelPlugin`                                   |
| Minification de dict.   | Identique à la passe d'écriture JSON de `intlayerMinifyBabelPlugin`                                  |
| Transformation Babel    | Identique au renommage de code source de `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

### Plugin SWC (`@intlayer/swc`)

Les utilisateurs de Next.js **ne configurent jamais ceux-ci directement** non plus. Depuis la **v9.2.1**, `withIntlayer()` dans `next.config.ts` exécute l'ensemble du pipeline — purge, minification et réécriture des imports — à partir des seuls drapeaux `build.purge` et `build.minify`.

Le travail est réparti en deux, car un plugin SWC Wasm transforme un fichier à la fois, sans accès au système de fichiers :

| Passe                                         | Où elle s'exécute           | Ce qu'elle fait                                                                                        |
| :-------------------------------------------- | :-------------------------- | :----------------------------------------------------------------------------------------------------- |
| Analyse d'usage + purge/minification JSON     | Node, dans `withIntlayer()` | Lit chaque fichier source de composant, réécrit `.intlayer/**/*.json`, produit les tables de renommage |
| Réécriture du source (`content.title` → `.a`) | `@intlayer/swc` (Wasm)      | Applique les tables de renommage aux accès de propriétés correspondants dans votre code                |
| Réécriture des imports (`useIntlayer` → dict) | `@intlayer/swc` (Wasm)      | Identique à `intlayerOptimizeBabelPlugin`                                                              |

Déterminer _quels_ champs sont inutilisés et _quel_ alias attribuer à chacun nécessite un état inter-fichiers et des E/S fichier ; cette moitié s'exécute donc dans Node, et le plugin SWC ne reçoit que les tables résultantes.

## Configuration

Vous pouvez contrôler la façon dont Intlayer optimise votre bundle via la propriété `build` de votre `intlayer.config.ts`.

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
    // Remplace les appels useIntlayer() par des imports directs de dictionnaires au moment du build.
    // undefined = auto (activé en production), true = toujours, false = jamais.
    optimize: undefined,

    // Renomme les clés des champs de contenu dans les dictionnaires compilés en de courts
    // alias alphabétiques (par ex. title → a). Réduit la taille du JSON ; requiert optimize.
    minify: true,

    // Supprime les champs de contenu qui ne sont jamais accédés dans le code source.
    // Requiert optimize.
    purge: true,
  },
};

export default config;
```

> Conserver la valeur par défaut (`undefined`) pour `optimize` est recommandé dans la plupart des cas.

> Consultez la référence de configuration pour toutes les options : [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

### Options de Build

| Propriété      | Type                  | Par défaut  | Description                                                                                                                                                                                                                   |
| :------------- | :-------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined` | Active la passe de réécriture des imports. `undefined` = actif uniquement dans les builds de production. `false` désactive également la purge et la minification.                                                             |
| **`minify`**   | `boolean`             | `false`     | Renomme les clés des champs de contenu dans les fichiers JSON compilés en de courts alias alphabétiques. Réécrit également les accès aux propriétés correspondants dans le code source. Sans effet si `optimize` est `false`. |
| **`purge`**    | `boolean`             | `false`     | Supprime les champs de contenu qui ne sont jamais accédés statiquement depuis les fichiers JSON compilés. Sans effet si `optimize` est `false`.                                                                               |

### Minification (renommage des clés de champs)

`build.minify` ne minifie **pas** votre bundle JavaScript — votre bundler s'en charge. À la place, cela réduit la taille des fichiers JSON de dictionnaires compilés en remplaçant chaque clé de champ de contenu définie par l'utilisateur par un court alias alphabétique :

```
// Avant la minification
{ "title": "Bonjour", "subtitle": "Monde" }

// Après la minification
{ "a": "Bonjour", "b": "Monde" }
```

Le même renommage est appliqué à tous les accès aux propriétés dans votre code source, donc `content.title` devient `content.a` dans la sortie compilée. Le comportement à l'exécution est identique.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> La minification est ignorée lorsque `optimize` est `false`. Lorsque `editor.enabled` est `true`, elle s'exécute toujours, mais sans l'étape de renommage des champs — l'éditeur visuel résout les modifications via `keyPath`, donc les noms de champs originaux doivent être conservés.

> Sur Next.js, la minification est également ignorée lorsque `@intlayer/swc` n'est pas installé ou ne peut pas être chargé (Next.js inférieur à 16.1.0). Le plugin est la moitié qui réécrit les accès dans le source : renommer les dictionnaires sans lui laisserait votre code lire des noms de champs qui n'existent plus.

> La minification est également ignorée pour les dictionnaires chargés via `importMode: 'fetch'` car leur JSON est servi depuis une API distante en utilisant les noms de champs originaux — renommer les clés côté client briserait le contrat serveur/client.

### Purge (suppression des champs inutilisés)

`build.purge` analyse quels champs de contenu sont réellement accédés dans votre code source et supprime tous les autres des fichiers JSON compilés.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Exemple :** un dictionnaire avec cinq champs où seuls deux sont utilisés :

```
// Avant la purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Après la purge (seuls title + subtitle accédés dans la source)
{ "title": "…", "subtitle": "…" }
```

> La purge est ignorée lorsque `optimize` est `false`. Elle reste active lorsque `editor.enabled` est `true` — un champ purgé n'est lu par aucun composant, donc l'éditeur ne le rend jamais. Sur Next.js, elle est en outre ignorée lorsque `@intlayer/swc` est indisponible, ainsi que lorsque des appelants d'adaptateurs de compatibilité sont configurés.

> La purge est également ignorée de manière conservative lorsqu'un fichier source ne peut pas être analysé, ou lorsque le résultat de `useIntlayer` est assigné à une variable et transmis de manières que l'analyseur statique ne peut pas suivre (par ex. propagation dans un objet, passé en tant que prop sans déstructuration). Dans ces cas, le dictionnaire complet est conservé.

### Mode d'Importation

Pour les grandes applications comprenant plusieurs pages et langues, votre JSON peut représenter une partie significative de la taille de votre bundle. Intlayer vous permet de contrôler comment les dictionnaires sont chargés à l'aide de l'option `importMode`.

### Définition globale

Le mode d'importation peut être défini globalement dans votre fichier `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // La valeur par défaut est 'static'
  },
};

export default config;
```

### Définition par dictionnaire

Vous pouvez remplacer le mode d'importation pour des dictionnaires individuels dans leurs fichiers `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Remplace le mode d'importation par défaut
  content: {
    // ...
  },
};

export default appContent;
```

| Propriété        | Type                               | Par défaut | Description                                                                                                                         |
| :--------------- | :--------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Obsolète** : Utilisez plutôt `dictionary.importMode`. Détermine la manière dont les dictionnaires sont chargés (voir ci-dessous). |

Le paramètre `importMode` dicte comment le contenu du dictionnaire est injecté dans votre composant. Vous pouvez le définir globalement dans `intlayer.config.ts` sous l'objet `dictionary`, ou le remplacer par dictionnaire dans son fichier `.content.ts`.

### 1. Mode Statique (`default`)

En mode statique, Intlayer remplace `useIntlayer` par `useDictionary` et injecte le dictionnaire directement dans le bundle JavaScript.

- **Avantages :** Rendu instantané (synchrone), zéro requête réseau supplémentaire durant l'hydratation.
- **Inconvénients :** Le bundle inclut les traductions pour **toutes** les langues disponibles pour ce composant spécifique.
- **Idéal pour :** Applications à Page Unique (SPA).

**Exemple de code transformé :**

```tsx
// Votre code
const content = useIntlayer("my-key");

// Illustration du code optimisé après transformation (Statique)
// C'est uniquement à des fins d'illustration, le vrai code sera différent pour des raisons d'optimisation
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "Mon titre",
      fr: "Mon titre",
    },
  },
});
```

### 2. Mode Dynamique

En mode dynamique, Intlayer remplace `useIntlayer` par `useDictionaryAsync`. Cela utilise `import()` (mécanisme semblable à Suspense) pour charger paresseusement de façon spécifique le JSON pour la langue actuelle.

- **Avantages :** **Tree shaking au niveau de la langue.** Un utilisateur visionnant la version anglaise téléchargera _uniquement_ le dictionnaire anglais. Le dictionnaire français ne sera jamais chargé.
- **Inconvénients :** Déclenche une requête réseau (récupération d'asset) par composant lors de l'hydratation.
- **Idéal pour :** Grands blocs de texte, articles ou applications supportant de nombreuses langues où la taille du bundle est critique.

**Exemple de code transformé :**

```tsx
// Votre code
const content = useIntlayer("my-key");

// Illustration du code optimisé après transformation (Dynamique)
// C'est uniquement à des fins d'illustration, le vrai code sera différent pour des raisons d'optimisation
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

> Lors de l'utilisation de `importMode: 'dynamic'`, si vous avez 100 composants utilisant `useIntlayer` sur une même page, le navigateur tentera 100 récupérations séparées. Pour éviter cette "cascade" de requêtes, regroupez le contenu dans moins de fichiers `.content` (par ex. un dictionnaire par section de page) plutôt qu'un seul par composant atome. Vous pouvez également utiliser plusieurs fichiers `.content` utilisant la même clé. Intlayer les fusionnera en un seul dictionnaire.

### 3. Mode Fetch

Se comporte de manière similaire au mode Dynamique mais tente d'abord de récupérer les dictionnaires depuis l'API Intlayer Live Sync. Si l'appel API échoue ou si le contenu n'est pas marqué pour des mises à jour en direct, il se rabat sur l'importation dynamique.

**Exemple de code transformé :**

```tsx
// Votre code
const content = useIntlayer("my-key");

// Illustration du code optimisé (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  fr: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/fr").then((res) =>
      res.json()
    ),
});
```

> Voir la documentation du CMS pour plus de détails : [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)

> En mode fetch, la purge et la minification ne sont pas appliquées car le JSON est servi par une API distante utilisant les noms originaux de champs.

## Résumé : Statique vs Dynamique

| Caractéristique                | Mode Statique                                   | Mode Dynamique                                   |
| :----------------------------- | :---------------------------------------------- | :----------------------------------------------- |
| **Taille du bundle JS**        | Plus grande (inclut toutes les langues du comp) | Plus petite (uniquement du code, aucun contenu)  |
| **Chargement initial**         | Instantané (Le contenu est dans le bundle)      | Léger délai (Récupère le JSON)                   |
| **Requêtes réseau**            | 0 requête supplémentaire                        | 1 requête par clé de dictionnaire                |
| **Tree Shaking**               | Niveau composant                                | Niveau composant + Niveau langue                 |
| **Meilleur cas d'utilisation** | Composants UI, petites applications             | Pages avec beaucoup de texte, nombreuses langues |

## Analyser votre bundle

L'analyse de votre bundle est le moyen le plus direct d'identifier les fichiers JSON "lourds" et les opportunités de fractionnement de code (code-splitting). Ces outils génèrent une carte arborescente (treemap) visuelle du code compilé de votre application, vous permettant de voir exactement quelles bibliothèques consomment le plus d'espace.

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

```typescript fileName="webpack.config.ts"
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
