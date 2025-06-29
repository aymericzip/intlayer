---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Fonction Fetching
description: Découvrez comment déclarer et utiliser la récupération de fonction dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Récupération de Fonction
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Fonction de Récupération

Intlayer vous permet de déclarer des fonctions de contenu dans vos modules de contenu, qui peuvent être synchrones ou asynchrones. Lorsque l'application se construit, Intlayer exécute ces fonctions pour obtenir le résultat de la fonction. La valeur de retour doit être un objet JSON ou une valeur simple comme une chaîne de caractères ou un nombre.

> Attention : la récupération de fonction n'est actuellement pas disponible dans les déclarations de contenu JSON et les fichiers de déclarations de contenu distants.

## Déclarations de Fonction

Voici un exemple d'une fonction synchrone simple récupérant du contenu :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
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

Dans cet exemple, la clé `text` contient une fonction qui retourne une chaîne de caractères. Ce contenu peut être rendu dans vos composants React en utilisant les packages interpréteurs d'Intlayer comme `react-intlayer`.

## Récupération Asynchrone de Fonction

En plus des fonctions synchrones, Intlayer prend en charge les fonctions asynchrones, vous permettant de récupérer des données à partir de sources externes ou de simuler la récupération de données avec des données fictives.

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
Impossible de récupérer du contenu depuis un fichier JSON, utilisez un fichier .ts ou .js à la place
```

Dans ce cas, la fonction `fakeFetch` imite un délai pour simuler le temps de réponse du serveur. Intlayer exécute la fonction asynchrone et utilise le résultat comme contenu pour la clé `text`.

## Utilisation de Contenu Basé sur des Fonctions dans des Composants React

Pour utiliser du contenu basé sur des fonctions dans un composant React, vous devez importer `useIntlayer` depuis `react-intlayer` et l'appeler avec l'ID de contenu pour récupérer le contenu. Voici un exemple :

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
