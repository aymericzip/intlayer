---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Récupération par Fonction
description: Découvrez comment déclarer et utiliser la récupération par fonction dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Récupération par Fonction
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Récupération par Fonction

Intlayer vous permet de déclarer des fonctions de contenu dans vos modules de contenu, qui peuvent être soit synchrones, soit asynchrones. Lors de la construction de l'application, Intlayer exécute ces fonctions pour obtenir le résultat de la fonction. La valeur retournée doit être un objet JSON ou une valeur simple comme une chaîne de caractères ou un nombre.

> Attention : la récupération par fonction n'est actuellement pas disponible dans la déclaration de contenu JSON ni dans les fichiers de déclaration de contenu distant.

## Déclarations de Fonction

Voici un exemple d'une fonction simple et synchrone récupérant du contenu :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Ceci est le contenu rendu par une fonction"
  }
}
```

Dans cet exemple, la clé `text` contient une fonction qui retourne une chaîne de caractères. Ce contenu peut être rendu dans vos composants React en utilisant les packages interprètes d'Intlayer comme `react-intlayer`.

## Récupération de Fonction Asynchrone

En plus des fonctions synchrones, Intlayer prend en charge les fonctions asynchrones, ce qui vous permet de récupérer des données depuis des sources externes ou de simuler la récupération de données avec des données factices.

Voici un exemple d'une fonction asynchrone qui simule une récupération depuis un serveur :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Attendre 200ms pour simuler une récupération depuis le serveur
  return await setTimeout(200).then(
    () => "Ceci est le contenu récupéré depuis le serveur"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Attendre 200ms pour simuler une récupération depuis le serveur
  await setTimeout(200);
  return "Ceci est le contenu récupéré depuis le serveur";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Attendre 200ms pour simuler une récupération depuis le serveur
  await setTimeout(200);
  return "Ceci est le contenu récupéré depuis le serveur";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Impossible de récupérer du contenu depuis un fichier JSON, utilisez plutôt un fichier .ts ou .js
```

Dans ce cas, la fonction `fakeFetch` imite un délai pour simuler le temps de réponse du serveur. Intlayer exécute la fonction asynchrone et utilise le résultat comme contenu pour la clé `text`.

## Utilisation de contenu basé sur une fonction dans les composants React

Pour utiliser un contenu basé sur une fonction dans un composant React, vous devez importer `useIntlayer` depuis `react-intlayer` et l'appeler avec l'ID du contenu pour récupérer ce contenu. Voici un exemple :

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Sortie : Ceci est le contenu rendu par une fonction */}
      <p>{asyncFunctionContent.text}</p>
      {/* Sortie : Ceci est le contenu récupéré depuis le serveur */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Sortie : Ceci est le contenu rendu par une fonction */}
      <p>{asyncFunctionContent.text}</p>
      {/* Sortie : Ceci est le contenu récupéré depuis le serveur */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Sortie : Ceci est le contenu rendu par une fonction */}
      <p>{asyncFunctionContent.text}</p>
      {/* Sortie : Ceci est le contenu récupéré depuis le serveur */}
    </div>
  );
};

module.exports = MyComponent;
```
