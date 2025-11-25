---
createdAt: 2025-11-25
updatedAt: 2025-11-25
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
  - version: 6.0.0
    date: 2025-11-25
    changes: Historique initial
---

# Optimisation de la taille et des performances du bundle i18n

L'un des défis les plus courants avec les solutions i18n traditionnelles basées sur des fichiers JSON est la gestion de la taille du contenu. Si les développeurs ne séparent pas manuellement le contenu en namespaces, les utilisateurs finissent souvent par télécharger les traductions de chaque page et potentiellement de chaque langue simplement pour afficher une seule page.

Par exemple, une application avec 10 pages traduites en 10 langues peut entraîner le téléchargement par un utilisateur du contenu de 100 pages, alors qu'il n'a besoin que d'**une seule** (la page actuelle dans la langue actuelle). Cela conduit à un gaspillage de bande passante et à des temps de chargement plus lents.

> Pour le détecter, vous pouvez utiliser un analyseur de bundle comme `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), ou `webpack-bundle-analyzer` (React CRA / Angular / etc).

**Intlayer résout ce problème grâce à une optimisation au moment de la compilation.** Il analyse votre code pour détecter quels dictionnaires sont réellement utilisés par composant et réinjecte uniquement le contenu nécessaire dans votre bundle.

## Table des matières

<TOC />

## Comment ça fonctionne

Intlayer utilise une **approche par composant**. Contrairement aux fichiers JSON globaux, votre contenu est défini à côté ou à l'intérieur de vos composants. Lors du processus de build, Intlayer :

1.  **Analyse** votre code pour trouver les appels à `useIntlayer`.
2.  **Construit** le contenu du dictionnaire correspondant.
3.  **Remplace** l'appel à `useIntlayer` par un code optimisé basé sur votre configuration.

Cela garantit que :

- Si un composant n'est pas importé, son contenu n'est pas inclus dans le bundle (élimination de code mort).
- Si un composant est chargé de manière lazy, son contenu est également chargé de manière lazy.

## Configuration par plateforme

### Next.js

Next.js nécessite le plugin `@intlayer/swc` pour gérer la transformation, car Next.js utilise SWC pour les builds.

> Ce plugin est installé par défaut car les plugins SWC sont encore expérimentaux pour Next.js. Cela pourrait changer à l'avenir.

### Vite

Vite utilise le plugin `@intlayer/babel` qui est inclus en tant que dépendance de `vite-intlayer`. L'optimisation est activée par défaut.

### Webpack

Pour activer l'optimisation du bundle avec Intlayer sur Webpack, vous devez installer et configurer le plugin Babel (`@intlayer/babel`) ou SWC (`@intlayer/swc`) approprié.

### Expo / Lynx

L'optimisation du bundle n'est **pas encore disponible** pour cette plateforme. Le support sera ajouté dans une future version.

## Configuration

Vous pouvez contrôler la manière dont Intlayer optimise votre bundle via la propriété `build` dans votre fichier `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // ou 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Il est recommandé de conserver l'option par défaut pour `optimize` dans la grande majorité des cas.

> Voir la documentation de configuration pour plus de détails : [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

### Options de build

Les options suivantes sont disponibles sous l'objet de configuration `build` :

| Propriété             | Type                            | Par défaut                      | Description                                                                                                                                                                                                                        |
| :-------------------- | :------------------------------ | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | Contrôle si l'optimisation de la build est activée. Si `true`, Intlayer remplace les appels au dictionnaire par des injections optimisées. Si `false`, l'optimisation est désactivée. Idéalement configuré à `true` en production. |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | Détermine comment les dictionnaires sont chargés (voir détails ci-dessous).                                                                                                                                                        |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Modèles globaux définissant les fichiers que Intlayer doit analyser pour l'optimisation. Utilisez ceci pour exclure les fichiers non pertinents et accélérer les builds.                                                           |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | Contrôle le format de sortie des dictionnaires construits.                                                                                                                                                                         |

## Modes d'importation

Le paramètre `importMode` détermine comment le contenu du dictionnaire est injecté dans votre composant.

### 1. Mode statique (`default`)

En mode statique, Intlayer remplace `useIntlayer` par `useDictionary` et injecte le dictionnaire directement dans le bundle JavaScript.

- **Avantages :** Rendu instantané (synchrone), aucune requête réseau supplémentaire lors de l'hydratation.
- **Inconvénients :** Le bundle inclut les traductions pour **toutes** les langues disponibles pour ce composant spécifique.
- **Idéal pour :** Applications monopage (SPA).

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

En mode dynamique, Intlayer remplace `useIntlayer` par `useDictionaryAsync`. Cela utilise `import()` (mécanisme similaire à Suspense) pour charger paresseusement le JSON spécifique à la locale courante.

- **Avantages :** **Élimination des modules inutilisés au niveau de la locale.** Un utilisateur visualisant la version anglaise téléchargera _uniquement_ le dictionnaire anglais. Le dictionnaire français n'est jamais chargé.
- **Inconvénients :** Déclenche une requête réseau (récupération d'asset) par composant lors de l'hydratation.
- **Idéal pour :** Blocs de texte volumineux, articles, ou applications supportant de nombreuses langues où la taille du bundle est critique.

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

> Lors de l'utilisation de `importMode: 'dynamic'`, si vous avez 100 composants utilisant `useIntlayer` sur une seule page, le navigateur tentera 100 requêtes distinctes. Pour éviter cette "cascade" de requêtes, regroupez le contenu dans moins de fichiers `.content` (par exemple, un dictionnaire par section de page) plutôt qu'un par composant atomique.

> Actuellement, `importMode: 'dynamic'` n'est pas entièrement pris en charge pour Vue et Svelte. Il est recommandé d'utiliser `importMode: 'static'` pour ces frameworks en attendant des mises à jour ultérieures.

### 3. Mode Live

Se comporte de manière similaire au mode Dynamique mais tente d'abord de récupérer les dictionnaires via l'API Intlayer Live Sync. Si l'appel API échoue ou si le contenu n'est pas marqué pour des mises à jour en direct, il revient à l'import dynamique.

> Voir la documentation CMS pour plus de détails : [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)

## Résumé : Statique vs Dynamique

| Fonctionnalité          | Mode Statique                                             | Mode Dynamique                                  |
| :---------------------- | :-------------------------------------------------------- | :---------------------------------------------- |
| **Taille du bundle JS** | Plus grande (inclut toutes les langues pour le composant) | Plus petite (seulement le code, pas le contenu) |
| **Chargement initial**  | Instantané (Le contenu est dans le bundle)                | Légère attente (Récupère du JSON)               |
| **Requêtes réseau**     | 0 requêtes supplémentaires                                | 1 requête par dictionnaire                      |
| **Tree Shaking**        | Niveau composant                                          | Niveau composant + niveau langue                |
| **Cas d'utilisation**   | Composants UI, petites applications                       | Pages avec beaucoup de texte, plusieurs langues |
