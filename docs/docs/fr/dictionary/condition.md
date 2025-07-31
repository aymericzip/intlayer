---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Contenu conditionnel
description: Découvrez comment utiliser le contenu conditionnel dans Intlayer pour afficher dynamiquement du contenu en fonction de conditions spécifiques. Suivez cette documentation pour implémenter efficacement les conditions dans votre projet.
keywords:
  - Contenu conditionnel
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
  - condition
---

# Contenu Conditionnel / Condition dans Intlayer

## Comment Fonctionne la Condition

Dans Intlayer, le contenu conditionnel est réalisé via la fonction `cond`, qui associe des conditions spécifiques (généralement des valeurs booléennes) à leur contenu correspondant. Cette approche vous permet de sélectionner dynamiquement le contenu en fonction d'une condition donnée. Lorsqu'il est intégré à React Intlayer ou Next Intlayer, le contenu approprié est automatiquement choisi en fonction de la condition fournie au moment de l'exécution.

## Configuration du Contenu Conditionnel

Pour configurer le contenu conditionnel dans votre projet Intlayer, créez un module de contenu qui inclut vos définitions conditionnelles. Voici des exemples dans différents formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mon contenu lorsque c'est vrai",
      false: "mon contenu lorsque c'est faux",
      fallback: "mon contenu lorsque la condition échoue", // Optionnel
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mon contenu lorsque c'est vrai",
      false: "mon contenu lorsque c'est faux",
      fallback: "mon contenu lorsque la condition échoue", // Optionnel
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mon contenu lorsque c'est vrai",
      false: "mon contenu lorsque c'est faux",
      fallback: "mon contenu lorsque la condition échoue", // Optionnel
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "mon contenu lorsque c'est vrai",
        "false": "mon contenu lorsque c'est faux",
        "fallback": "mon contenu lorsque la condition échoue", // Optionnel
      },
    },
  },
}
```

> Si aucun fallback n'est déclaré, la dernière clé déclarée sera prise comme fallback si la condition n'est pas validée.

## Utilisation du Contenu Conditionnel avec React Intlayer

Pour utiliser le contenu conditionnel dans un composant React, importez et utilisez le hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu pour la clé spécifiée et vous permet de passer une condition pour sélectionner la sortie appropriée.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est vrai */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est faux */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est vrai */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est faux */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est vrai */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque c'est faux */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Sortie : mon contenu lorsque la condition échoue */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Ressources Supplémentaires

Pour plus d'informations détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources offrent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans divers environnements et frameworks.
