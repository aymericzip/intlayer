---
docName: dictionary__nesting
url: /doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Imbrication du dictionnaire
description: Découvrez comment utiliser l’imbrication de contenu dans Intlayer pour réutiliser et structurer efficacement votre contenu multilingue. Suivez cette documentation pour implémenter l’imbrication facilement dans votre projet.
keywords:
  - Nesting
  - Réutilisation de contenu
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Imbrication / Référencement de Sous-Contenu

## Comment fonctionne l'imbrication

Dans Intlayer, l'imbrication est réalisée via la fonction `nest`, qui vous permet de référencer et de réutiliser du contenu provenant d'un autre dictionnaire. Au lieu de dupliquer le contenu, vous pouvez pointer vers un module de contenu existant en utilisant sa clé.

## Configuration de l'imbrication

Pour configurer l'imbrication dans votre projet Intlayer, vous devez d'abord définir le contenu de base que vous souhaitez réutiliser. Ensuite, dans un module de contenu séparé, vous utilisez la fonction `nest` pour importer ce contenu.

### Dictionnaire de base

Voici un exemple de dictionnaire de base à imbriquer dans un autre dictionnaire :

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Référencement avec Nest

Créez maintenant un autre module de contenu qui utilise la fonction `nest` pour référencer le contenu ci-dessus. Vous pouvez référencer l'intégralité du contenu ou une valeur imbriquée spécifique :

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Référence l'intégralité du dictionnaire :
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Référence une valeur imbriquée spécifique :
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

En tant que deuxième paramètre, vous pouvez spécifier un chemin vers une valeur imbriquée dans ce contenu. Lorsqu'aucun chemin n'est fourni, l'intégralité du contenu du dictionnaire référencé est retournée.

## Utilisation de l'imbrication avec React Intlayer

Pour utiliser du contenu imbriqué dans un composant React, utilisez le hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu correct en fonction de la clé spécifiée. Voici un exemple d'utilisation :

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenu Imbriqué Complet : {JSON.stringify(fullNestedContent)}
        {/* Sortie : {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valeur Imbriquée Partielle : {partialNestedContent}
        {/* Sortie : 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenu Imbriqué Complet : {JSON.stringify(fullNestedContent)}
        {/* Sortie : {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valeur Imbriquée Partielle : {partialNestedContent}
        {/* Sortie : 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenu Imbriqué Complet : {JSON.stringify(fullNestedContent)}
        {/* Sortie : {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valeur Imbriquée Partielle : {partialNestedContent}
        {/* Sortie : 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Ressources supplémentaires

Pour plus d'informations détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources fournissent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans différents environnements et avec divers frameworks.
