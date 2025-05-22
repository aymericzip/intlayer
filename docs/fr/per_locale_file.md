# Intlayer prend en charge deux manières de déclarer du contenu multilingue :

- Fichier unique avec toutes les traductions
- Un fichier par langue (format par-locale)

Cette flexibilité permet :

- Une migration facile depuis d'autres outils i18n
- La prise en charge des flux de travail de traduction automatisés
- Une organisation claire des traductions dans des fichiers distincts, spécifiques à chaque langue

## Fichier Unique avec Plusieurs Traductions

Ce format est idéal pour :

- Une itération rapide dans le code.
- Une intégration transparente avec le CMS.

C'est l'approche recommandée pour la plupart des cas d'utilisation. Elle centralise les traductions, facilitant ainsi l'itération et l'intégration avec le CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      fr: "Titre de mon composant",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      fr: "Titre de mon composant",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      fr: "Titre de mon composant",
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
        "fr": "Titre de mon composant",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recommandé : Ce format est idéal lorsque vous utilisez l'éditeur visuel d'Intlayer ou que vous gérez les traductions directement dans le code.

## Format Par-Locale

Ce format est utile lorsque :

- Vous souhaitez versionner ou remplacer des traductions de manière indépendante.
- Vous intégrez des flux de travail de traduction automatique ou humaine.

Vous pouvez également diviser les traductions en fichiers individuels par langue en spécifiant le champ `locale` :

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Important
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
    "multilingualContent": "Title of my component",
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

> Important : Assurez-vous que le champ `locale` est défini. Il indique à Intlayer quelle langue représente le fichier.

> Note : Dans les deux cas, le fichier de déclaration de contenu doit suivre le modèle de nommage `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` pour être reconnu par Intlayer. Le suffixe `.[locale]` est optionnel et utilisé uniquement comme convention de nommage.

## Mélange des Formats

Vous pouvez mélanger les deux approches pour la même clé de contenu. Par exemple :

Déclarez le contenu par défaut ou de base de manière statique (par exemple, `index.content.ts`)

Ajoutez ou remplacez le contenu spécifique à une langue dans `index.content.json`, `index.fr.content.ts`, etc.

Ceci est particulièrement utile lorsque :

- Vous souhaitez déclarer votre contenu de base statiquement dans votre codebase et le compléter automatiquement avec des traductions dans le CMS.

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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

Intlayer fusionne automatiquement les fichiers multilingues et par-locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // La langue par défaut est ENGLISH, donc elle retournera le contenu en ANGLAIS

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Résultat :
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Génération Automatique de Traductions

Utilisez le [CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md) pour remplir automatiquement les traductions manquantes en fonction de vos services préférés.
