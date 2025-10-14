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
    changes: Ajout de la configuration globale
  - version: 6.0.0
    date: 2025-09-17
    changes: Ajout de la variable `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

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

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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
