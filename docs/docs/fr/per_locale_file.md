---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Déclaration de contenu `Par-Langue` dans Intlayer
description: Découvrez comment déclarer du contenu par langue dans Intlayer. Suivez la documentation pour comprendre les différents formats et cas d'utilisation.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Par-Langue
  - TypeScript
  - JavaScript
---

# Déclaration de contenu `Par-Langue` dans Intlayer

Intlayer prend en charge deux manières de déclarer du contenu multilingue :

- Un seul fichier avec toutes les traductions
- Un fichier par langue (format par-langue)

Cette flexibilité permet :

- Migration facile depuis d'autres outils i18n
- Support des flux de travail de traduction automatisés
- Organisation claire des traductions dans des fichiers distincts spécifiques à chaque langue

## Fichier unique avec plusieurs traductions

Ce format est idéal pour :

- Itération rapide dans le code.
- Intégration fluide avec le CMS.

C'est l'approche recommandée pour la plupart des cas d'utilisation. Elle centralise les traductions, ce qui facilite l'itération et l'intégration avec le CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Contenu pour "Bonjour le monde"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Contenu pour "Bonjour le monde"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recommandé : Ce format est idéal lorsque vous utilisez l'éditeur visuel d'Intlayer ou que vous gérez les traductions directement dans le code.

## Format par locale

Ce format est utile lorsque :

- Vous souhaitez versionner ou remplacer les traductions de manière indépendante.
- Vous intégrez des flux de travail de traduction automatique ou humaine.

Vous pouvez également répartir les traductions dans des fichiers individuels par locale en spécifiant le champ locale :

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Titre de mon composant" }, // Titre traduit en français dans le commentaire
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Important
  content: { multilingualContent: "Título de mi componente" }, // Texte original en espagnol conservé
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dictionnaire de contenu pour "hello-world" en anglais
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Titre de mon composant" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dictionnaire de contenu pour "hello-world" en espagnol
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Important
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Dictionnaire de contenu pour "hello-world" en anglais
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: {
    multilingualContent: "Titre de mon composant",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Dictionnaire de contenu pour "hello-world" en espagnol
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Important
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Important
  "content": {
    "multilingualContent": "Titre de mon composant",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Important
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Important : Assurez-vous que le champ locale est défini. Il indique à Intlayer la langue que représente le fichier.

> Remarque : Dans les deux cas, le fichier de déclaration de contenu doit suivre le modèle de nommage `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` pour être reconnu par Intlayer. Le suffixe `.[locale]` est optionnel et utilisé uniquement comme convention de nommage.

## Mélange des formats

Vous pouvez combiner les deux approches de déclaration pour la même clé de contenu. Par exemple :

- Déclarez votre contenu de base de manière statique dans un fichier comme index.content.ts.
- Ajoutez ou remplacez des traductions spécifiques dans des fichiers séparés tels que index.fr.content.ts ou index.content.json.

Cette configuration est particulièrement utile lorsque :

- Vous souhaitez définir la structure initiale du contenu dans le code.
- Vous prévoyez d'enrichir ou de compléter les traductions plus tard en utilisant le CMS ou des outils automatisés.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Exemple

Voici un fichier de déclaration de contenu multilingue :

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Titre de mon composant",
    projectName: "Mon projet",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer fusionne automatiquement les fichiers multilingues et par locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // La locale par défaut est ANGLAIS, donc cela retournera le contenu en ANGLAIS

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Mon projet"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Mon projet"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Mon projet"
// }
```

### Génération automatique de traduction

Utilisez le [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour remplir automatiquement les traductions manquantes en fonction de vos services préférés.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
