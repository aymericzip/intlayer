# Fonction de Récupération

Intlayer vous permet de déclarer des fonctions de contenu dans vos modules de contenu, qui peuvent être soit synchrones soit asynchrones. Lorsque l'application se construit, Intlayer exécute ces fonctions pour obtenir le résultat de la fonction. La valeur de retour doit être un objet JSON ou une valeur simple comme une chaîne ou un nombre.

> Avertissement : la récupération de fonctions n'est actuellement pas disponible dans la déclaration de contenu JSON et dans les fichiers de déclaration de contenu distant.

## Déclarations de Fonction

Voici un exemple d'une simple fonction synchrone récupérant du contenu :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
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
  "key": "function_content",
  "content": {
    "text": "Ceci est le contenu rendu par une fonction"
  }
}
```

Dans cet exemple, la clé `text` contient une fonction qui renvoie une chaîne. Ce contenu peut être rendu dans vos composants React en utilisant les packages d'interprétation d'Intlayer comme `react-intlayer`.

## Récupération de Fonction Asynchrone

En plus des fonctions synchrones, Intlayer prend en charge les fonctions asynchrones, vous permettant de récupérer des données de sources externes ou de simuler la récupération de données avec des données fictives.

Voici un exemple d'une fonction asynchrone qui simule une récupération depuis le serveur :

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Attendre 200ms pour simuler une récupération depuis le serveur
  return await setTimeout(200).then(
    () => "Ceci est le contenu récupéré depuis le serveur"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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
Aucun moyen de récupérer du contenu depuis un fichier JSON, utilisez un fichier .ts ou .js à la place
```

Dans ce cas, la fonction `fakeFetch` mime un délai pour simuler le temps de réponse du serveur. Intlayer exécute la fonction asynchrone et utilise le résultat comme contenu pour la clé `text`.

## Utilisation du Contenu Basé sur des Fonctions dans les Composants React

Pour utiliser du contenu basé sur des fonctions dans un composant React, vous devez importer `useIntlayer` depuis `react-intlayer` et l'appeler avec l'ID du contenu pour récupérer le contenu. Voici un exemple :

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
