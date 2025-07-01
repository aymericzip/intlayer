---
docName: autoFill
url: https://intlayer.org/doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Remplissage Automatique
description: Apprenez à utiliser la fonctionnalité de remplissage automatique dans Intlayer pour peupler automatiquement le contenu basé sur des modèles prédéfinis. Suivez cette documentation pour implémenter efficacement les fonctionnalités de remplissage automatique dans votre projet.
keywords:
  - Remplissage Automatique
  - Automatisation de Contenu
  - Contenu Dynamique
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Traductions des Fichiers de Déclaration de Contenu avec Remplissage Automatique

**Les fichiers de déclaration de contenu avec remplissage automatique** sont un moyen d'accélérer votre flux de développement.
Le mécanisme de remplissage automatique fonctionne par une relation _maître-esclave_ entre les fichiers de déclaration de contenu. Lorsque le fichier principal (maître) est mis à jour, Intlayer applique automatiquement ces modifications aux fichiers de déclaration dérivés (remplis automatiquement).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Ceci est un exemple de contenu",
  },
} satisfies Dictionary;

export default exampleContent;
```

Voici un [fichier de déclaration de contenu par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) utilisant l'instruction `autoFill`.

Ensuite, lorsque vous exécutez la commande suivante :

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer générera automatiquement le fichier de déclaration dérivé à `src/components/example/example.content.json`, remplissant toutes les locales non encore déclarées dans le fichier principal.

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

## Format du fichier autofill

Le format recommandé pour les fichiers de déclaration autofillés est **JSON**, ce qui permet d'éviter les contraintes de formatage. Cependant, Intlayer supporte également les formats `.ts`, `.js`, `.mjs`, `.cjs` et autres.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Votre contenu
  },
};
```

Cela générera le fichier à l'emplacement :

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

Cela générera le fichier à l'emplacement suivant :

```
/messages/example.content.json
```

## Génération Automatique des Fichiers de Déclaration de Contenu Par Locale

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

Cela générera deux fichiers distincts :

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Filtrer l'auto-remplissage pour une locale spécifique

Utiliser un objet pour le champ `autoFill` vous permet d'appliquer des filtres et de générer uniquement les fichiers pour des locales spécifiques.

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

Cela générera uniquement le fichier de traduction français.

## Variables de chemin

Vous pouvez utiliser des variables dans le chemin `autoFill` pour résoudre dynamiquement les chemins cibles des fichiers générés.

**Variables disponibles :**

- `{{locale}}` – Code de la locale (ex. `fr`, `es`)
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

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
