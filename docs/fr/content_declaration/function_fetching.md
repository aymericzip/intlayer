# Fonction de Récupération

## Déclarations de Fonction

Intlayer vous permet de déclarer des fonctions de contenu dans vos modules de contenu, qui peuvent être soit synchrones, soit asynchrones. Lorsque l'application se construit, Intlayer exécute ces fonctions pour obtenir le résultat de la fonction. La valeur retournée doit être un objet JSON ou une valeur simple comme une chaîne ou un nombre.

Voici un exemple d'une fonction simple synchrones récupérant du contenu :

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Ceci est le contenu rendu par une fonction",
  },
} satisfies DeclarationContent;

export default functionContent;
```

Dans cet exemple, la clé `text` contient une fonction qui retourne une chaîne. Ce contenu peut être rendu dans vos composants React en utilisant les packages d'interprétation d'Intlayer comme `react-intlayer`.

## Récupération de Fonction Asynchrone

En plus des fonctions synchrones, Intlayer prend en charge les fonctions asynchrones, vous permettant de récupérer des données à partir de sources externes ou de simuler la récupération de données avec des données fictives.

Voici un exemple d'une fonction asynchrone qui simule une récupération depuis le serveur :

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Attendre 200 ms pour simuler une récupération depuis le serveur
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

Dans ce cas, la fonction `fakeFetch` imite un délai pour simuler le temps de réponse du serveur. Intlayer exécute la fonction asynchrone et utilise le résultat comme contenu pour la clé `text`.

## Utiliser le Contenu Basé sur des Fonctions dans des Composants React

Pour utiliser du contenu basé sur des fonctions dans un composant React, vous devez importer `useIntlayer` de `react-intlayer` et l'appeler avec l'ID de contenu pour récupérer le contenu. Voici un exemple :

```javascript
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
