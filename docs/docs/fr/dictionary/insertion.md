---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Insertion
description: Apprenez à déclarer et utiliser des espaces réservés d'insertion dans votre contenu. Cette documentation vous guide à travers les étapes pour insérer dynamiquement des valeurs dans des structures de contenu prédéfinies.
keywords:
  - Insertion
  - Contenu Dynamique
  - Espaces Réservés
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Contenu d'Insertion / Insertion dans Intlayer

## Comment fonctionne l'insertion

Dans Intlayer, le contenu d'insertion est réalisé grâce à la fonction `insertion`, qui identifie les champs d'espaces réservés dans une chaîne (comme `{{name}}` ou `{{age}}`) pouvant être remplacés dynamiquement à l'exécution. Cette approche vous permet de créer des chaînes flexibles, semblables à des modèles, où des parties spécifiques du contenu sont déterminées par des données fournies par votre application.

Lorsqu'elle est intégrée avec React Intlayer ou Next Intlayer, il vous suffit de fournir l'objet de données contenant les valeurs pour chaque espace réservé, et Intlayer rendra automatiquement le contenu avec les espaces réservés remplacés.

## Configuration du Contenu d'Insertion

Pour configurer le contenu d'insertion dans votre projet Intlayer, créez un module de contenu qui inclut vos définitions d'insertion. Voici des exemples dans différents formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Bonjour, je m'appelle {{name}} et j'ai {{age}} ans !"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Bonjour, je m'appelle {{name}} et j'ai {{age}} ans !"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Bonjour, je m'appelle {{name}} et j'ai {{age}} ans !"),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Bonjour, je m'appelle {{name}} et j'ai {{age}} ans !",
    },
  },
}
```

## Utilisation du contenu d'insertion avec React Intlayer

Pour utiliser un contenu d'insertion dans un composant React, importez et utilisez le hook `useIntlayer` depuis le paquet `react-intlayer`. Ce hook récupère le contenu pour la clé spécifiée et vous permet de passer un objet qui associe chaque espace réservé dans votre contenu à la valeur que vous souhaitez afficher.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Résultat : "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Vous pouvez réutiliser la même insertion avec des valeurs différentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Résultat : "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Vous pouvez réutiliser la même insertion avec des valeurs différentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Résultat : "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Vous pouvez réutiliser la même insertion avec des valeurs différentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources offrent des informations complémentaires sur la configuration et l'utilisation d'Intlayer dans divers environnements et frameworks.
