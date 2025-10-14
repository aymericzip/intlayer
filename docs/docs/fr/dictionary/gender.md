---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Contenu basé sur le genre
description: Apprenez à utiliser le contenu basé sur le genre dans Intlayer pour afficher dynamiquement du contenu selon le genre. Suivez cette documentation pour implémenter efficacement du contenu spécifique au genre dans votre projet.
keywords:
  - Contenu basé sur le genre
  - Rendu dynamique
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Introduction du contenu basé sur le genre
---

# Contenu basé sur le genre / Genre dans Intlayer

## Comment fonctionne le genre

Dans Intlayer, le contenu basé sur le genre est réalisé grâce à la fonction `gender`, qui associe des valeurs de genre spécifiques ('male', 'female') à leur contenu correspondant. Cette approche vous permet de sélectionner dynamiquement du contenu en fonction d'un genre donné. Lorsqu'elle est intégrée avec React Intlayer ou Next Intlayer, le contenu approprié est automatiquement choisi en fonction du genre fourni à l'exécution.

## Configuration du contenu basé sur le genre

Pour configurer du contenu basé sur le genre dans votre projet Intlayer, créez un module de contenu qui inclut vos définitions spécifiques au genre. Voici des exemples dans différents formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mon contenu pour les utilisateurs masculins",
      female: "mon contenu pour les utilisatrices féminines",
      fallback: "mon contenu lorsque le genre n'est pas spécifié", // Optionnel
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mon contenu pour les utilisateurs masculins",
      female: "mon contenu pour les utilisatrices féminines",
      fallback: "mon contenu lorsque le genre n'est pas spécifié", // Optionnel
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mon contenu pour les utilisateurs masculins",
      female: "mon contenu pour les utilisatrices féminines",
      fallback: "mon contenu lorsque le genre n'est pas spécifié", // Optionnel
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "mon contenu pour les utilisateurs masculins",
        "female": "mon contenu pour les utilisatrices féminines",
        "fallback": "mon contenu lorsque le genre n'est pas spécifié", // Optionnel
      },
    },
  },
}
```

> Si aucun fallback n'est déclaré, la dernière clé déclarée sera prise comme fallback si le genre n'est pas spécifié ou ne correspond à aucun genre défini.

## Utilisation du contenu basé sur le genre avec React Intlayer

Pour utiliser du contenu basé sur le genre dans un composant React, importez et utilisez le hook `useIntlayer` depuis le package `react-intlayer`. Ce hook récupère le contenu pour la clé spécifiée et vous permet de passer un genre pour sélectionner la sortie appropriée.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisateurs masculins */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu pour les utilisatrices */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque le genre n'est pas spécifié */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources offrent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans divers environnements et frameworks.
