---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Remplissage automatique
description: Apprenez à utiliser la fonctionnalité de remplissage automatique dans Intlayer pour remplir automatiquement le contenu en fonction de modèles prédéfinis. Suivez cette documentation pour implémenter efficacement les fonctionnalités de remplissage automatique dans votre projet.
keywords:
  - Remplissage automatique
  - Automatisation du contenu
  - Contenu dynamique
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Ajout de la configuration globale"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Ajout de la variable `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Remplir les fichiers de déclaration de contenu traduits

**L'autofill des fichiers de déclaration de contenu** dans votre CI est un moyen d'accélérer votre flux de développement.

## Comprendre le comportement

La commande `fill` inclut deux modes :

- **Complete** : Remplit automatiquement tout le contenu manquant pour chaque locale et modifie le fichier actuel, ou un autre fichier s'il est spécifié. C'est-à-dire que le mode complete ignorera la traduction du contenu existant, s'il est déjà traduit.
- **Review** : Remplit automatiquement **tout** le contenu pour chaque locale et génère pour un fichier spécifique, ou un autre fichier s'il est spécifié.

La commande will traitera tous vos fichiers de déclaration de contenu locale. C'est-à-dire qu'elle ne traitera pas votre contenu distant du CMS. Le CMS inclut sa propre gestion des traductions.
Si vous utilisez des plugins comme `@intlayer/sync-json-plugin`, Intlayer transformera les fichiers JSON en fichiers de déclaration de contenu locale. C'est-à-dire qu'ils seront traités par la commande `fill`.

Les fichiers nouvellement générés incluent une instruction `filled` comme métadonnées de dictionnaire. Cette instruction sera utilisée par Intlayer pour savoir si le fichier a été rempli automatiquement ou non, et ignorer ce fichier d'une traduction supplémentaire s'il est présent.

Intlayer considérera également l'instruction suivante pour le remplissage automatique :

- De votre `.content.{ts|js|json}` → instruction `fill`
- De votre fichier de configuration `.intlayer.config.ts` → instruction `dictionary.fill`
- Sera défini à `true` par défaut autrement

Pour les fichiers de déclaration de contenu par locale, l'instruction `true` sera remplacée par `./{{fileName}}.fill.content.json`. C'est parce qu'un fichier de déclaration de contenu par locale ne peut pas recevoir de contenu localisé supplémentaire. Donc il générera un nouveau fichier pour ne pas écraser le fichier existant.

## Comportement par défaut

Par défaut, `fill` est défini sur `true` globalement, ce qui signifie qu'Intlayer remplira automatiquement tous les fichiers de contenu et modifiera le fichier lui-même. Ce comportement peut être personnalisé de plusieurs façons :

### Options de Configuration Globale

1. **`fill: true` (par défaut)** - Remplir automatiquement toutes les locales et éditer le fichier courant
2. **`fill: false`** - Désactiver le remplissage automatique pour ce fichier de contenu
3. **`fill: "./relative/path/to/file"`** - Créer/mettre à jour le fichier spécifié sans éditer le fichier courant en pointant vers un chemin relatif résolu en fonction de l'emplacement du fichier courant
4. **`fill: "/absolute/path/to/file"`** - Créer/mettre à jour le fichier spécifié sans éditer le fichier courant en pointant vers un chemin relatif résolu en fonction de l'emplacement du répertoire de base (champ `baseDir` dans le fichier de configuration `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Créer/mettre à jour le fichier spécifié sans éditer le fichier courant en pointant vers un chemin absolu résolu en fonction de votre système d'exploitation
6. **`fill: { [key in Locales]?: string }`** - Créer/mettre à jour le fichier spécifié pour chaque locale

### Changements de comportement v7

Dans v7, le comportement de la commande `fill` a été mis à jour :

- **`fill: true`** - Réécrit le fichier courant avec le contenu rempli pour toutes les locales
- **`fill: "path/to/file"`** - Remplit le fichier spécifié sans modifier le fichier courant
- **`fill: false`** - Désactive complètement le remplissage automatique

Lors de l'utilisation d'une option de chemin pour écrire dans un autre fichier, le mécanisme de remplissage fonctionne via une relation _maître-esclave_ entre les fichiers de déclaration de contenu. Le fichier principal (maître) sert de source de vérité, et lorsqu'il est mis à jour, Intlayer applique automatiquement ces modifications aux fichiers de déclaration dérivés (remplis) spécifiés par le chemin.

# Traductions des fichiers de déclaration de contenu avec remplissage automatique

**Les fichiers de déclaration de contenu avec remplissage automatique** sont un moyen d'accélérer votre flux de travail de développement.

Le mécanisme de remplissage automatique fonctionne via une relation _maître-esclave_ entre les fichiers de déclaration de contenu. Lorsque le fichier principal (maître) est mis à jour, Intlayer applique automatiquement ces modifications aux fichiers de déclaration dérivés (remplis automatiquement).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Ceci est un exemple de contenu", // Exemple de contenu
  },
} satisfies Dictionary;

export default exampleContent;
```

Voici un [fichier de déclaration de contenu par langue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) utilisant l'instruction `autoFill`.

Ensuite, lorsque vous exécutez la commande suivante :

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer générera automatiquement le fichier de déclaration dérivé à `src/components/example/example.content.json`, en remplissant toutes les locales non déjà déclarées dans le fichier principal.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Ensuite, les deux fichiers de déclaration seront fusionnés en un seul dictionnaire, accessible via le hook standard `useIntlayer("example")` (react) / composable (vue).

## Configuration globale

Vous pouvez configurer la configuration de remplissage automatique globale dans le fichier `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Générer automatiquement les traductions manquantes pour tous les dictionnaires
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // générer automatiquement les traductions manquantes pour tous les dictionnaires comme en utilisant "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Vous pouvez toujours affiner par dictionnaire en utilisant le champ `fill` dans les fichiers de contenu. Intlayer considérera d'abord la configuration par dictionnaire et reviendra ensuite à la configuration globale.

## Format du fichier rempli automatiquement

Le format recommandé pour les fichiers de déclaration remplis automatiquement est **JSON**, ce qui permet d'éviter les contraintes de formatage. Cependant, Intlayer prend également en charge les formats `.ts`, `.js`, `.mjs`, `.cjs` et d'autres.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Votre contenu
  },
};
```

Cela générera le fichier à l'emplacement suivant :

```
src/components/example/example.filled.content.ts
```

> La génération des fichiers `.js`, `.ts` et similaires fonctionne comme suit :
>
> - Si le fichier existe déjà, Intlayer l'analysera en utilisant l'AST (Abstract Syntax Tree) pour localiser chaque champ et insérer les traductions manquantes.
> - Si le fichier n'existe pas, Intlayer le générera en utilisant le modèle de fichier de déclaration de contenu par défaut.

## Chemins Absolus

Le champ `autoFill` supporte également les chemins absolus.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Votre contenu
  },
};
```

Cela générera le fichier à l'emplacement :

```
/messages/example.content.json
```

## Génération Automatique de Fichiers de Déclaration de Contenu Par Locale

Le champ `autoFill` supporte également la génération de fichiers de déclaration de contenu **par locale**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Votre contenu
  },
};
```

Cela générera deux fichiers séparés :

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> Dans ce cas, si l'objet ne contient pas toutes les locales, Intlayer ignore la génération des locales restantes.

## Filtrer le remplissage automatique pour une locale spécifique

Utiliser un objet pour le champ `autoFill` vous permet d'appliquer des filtres et de générer uniquement certains fichiers de locale.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Votre contenu
  },
};
```

Cela ne générera que le fichier de traduction français.

## Variables de chemin

Vous pouvez utiliser des variables dans le chemin `autoFill` pour résoudre dynamiquement les chemins cibles des fichiers générés.

**Variables disponibles :**

- `{{locale}}` – Code de la locale (ex. `fr`, `es`)
- `{{fileName}}` – Nom du fichier (ex. `index`)
- `{{key}}` – Clé du dictionnaire (ex. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Votre contenu
  },
};
```

Cela générera :

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Votre contenu
  },
};
```

Cela générera :

- `./index.content.json`
- `./index.content.json`
