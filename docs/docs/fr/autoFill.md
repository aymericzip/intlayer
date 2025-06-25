---
docName: autoFill
url: https://intlayer.org/doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Remplissage automatique
description: Découvrez comment utiliser la fonctionnalité de remplissage automatique dans Intlayer pour remplir automatiquement le contenu selon des modèles prédéfinis. Suivez cette documentation pour implémenter efficacement les fonctionnalités de remplissage automatique dans votre projet.
keywords:
  - Remplissage automatique
  - Automatisation du contenu
  - Contenu dynamique
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Fichiers de Déclaration de Contenu Auto-remplis

Les **fichiers de déclaration de contenu auto-remplis** sont un moyen d'accélérer votre flux de travail de développement.

Le mécanisme d'auto-remplissage fonctionne selon une relation _maître-esclave_ entre les fichiers de déclaration de contenu. Lorsque le fichier principal (maître) est mis à jour, Intlayer appliquera automatiquement ces modifications aux fichiers de déclaration dérivés (auto-remplis).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Voici un [fichier de déclaration de contenu par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) utilisant l'instruction `autoFill`.

Ensuite, lorsque vous exécutez la commande suivante :

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer générera automatiquement le fichier de déclaration dérivé à `src/components/example/example.content.json`, en remplissant toutes les locales non encore déclarées dans le fichier principal.

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

Par la suite, les deux fichiers de déclaration seront fusionnés en un seul dictionnaire, accessible via le hook standard `useIntlayer("example")` (react) / composable (vue).

## Format des Fichiers Auto-remplis

Le format recommandé pour les fichiers de déclaration auto-remplis est le **JSON**, ce qui aide à éviter les contraintes de formatage. Cependant, Intlayer prend également en charge les formats `.ts`, `.js`, `.mjs`, `.cjs` et autres.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Votre contenu
  },
};
```

Cela générera le fichier à :

```
src/components/example/example.filled.content.ts
```

> La génération des fichiers `.js`, `.ts` et similaires fonctionne comme suit :
>
> - Si le fichier existe déjà, Intlayer l'analysera en utilisant l'AST (Arbre de Syntaxe Abstraite) pour localiser chaque champ et insérer les traductions manquantes.
> - Si le fichier n'existe pas, Intlayer le générera en utilisant le modèle par défaut de fichier de déclaration de contenu.

## Chemins Absolus

Le champ `autoFill` prend également en charge les chemins absolus.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Votre contenu
  },
};
```

Cela générera le fichier à :

```
/messages/example.content.json
```

## Génération Automatique des Fichiers de Déclaration de Contenu par Locale

Le champ `autoFill` prend également en charge la génération de fichiers de déclaration de contenu **par locale**.

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

## Filtrer l'Auto-remplissage par Locale Spécifique

L'utilisation d'un objet pour le champ `autoFill` vous permet d'appliquer des filtres et de générer uniquement des fichiers de locale spécifiques.

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

## Variables de Chemin

Vous pouvez utiliser des variables dans le chemin `autoFill` pour résoudre dynamiquement les chemins cibles des fichiers générés.

**Variables disponibles :**

- `{{locale}}` – Code de locale (ex. `fr`, `es`)
- `{{key}}` – Clé du dictionnaire (ex. `example`)

```ts fileName="src/components/example/example.content.ts"
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
