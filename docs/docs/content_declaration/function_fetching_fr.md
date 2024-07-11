# Fonction Fetching

## Déclarations de Fonction

Intlayer vous permet de déclarer des fonctions de contenu dans vos modules de contenu, qui peuvent être synchrones ou asynchrones. Lorsque l'application se construit, Intlayer exécute ces fonctions pour obtenir le résultat de la fonction. La valeur de retour doit être un objet JSON ou une valeur simple comme une chaîne de caractères ou un nombre.

Voici un exemple de fonction synchrone simple récupérant du contenu :

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent: DeclarationContent = {
  id: "function_content",
  text: () => "Voici le contenu rendu par une fonction",
};

export default functionContent;
```

Dans cet exemple, la clé `text` contient une fonction qui renvoie une chaîne de caractères. Ce contenu peut être rendu dans vos composants React en utilisant les packages d'interprète d'Intlayer comme `react-intlayer`.

## Récupération Asynchrone de Fonction

En plus des fonctions synchrones, Intlayer prend en charge les fonctions asynchrones, vous permettant de récupérer des données de sources externes ou de simuler la récupération de données avec des données factices.

Voici un exemple de fonction asynchrone qui simule une récupération de serveur :

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Attendre 200ms pour simuler une récupération depuis le serveur
  return await setTimeout(200).then(
    () => "Voici le contenu récupéré depuis le serveur"
  );
};

const asyncFunctionContent: DeclarationContent = {
  id: "async_function",
  text: fakeFetch,
};

export default asyncFunctionContent;
```

Dans ce cas, la fonction `fakeFetch` imite un délai pour simuler le temps de réponse du serveur. Intlayer exécute la fonction asynchrone et utilise le résultat comme contenu pour la clé `text`.

## Utilisation du Contenu Basé sur des Fonctions dans des Composants React

Pour utiliser du contenu basé sur des fonctions dans un composant React, vous devez importer `useIntlayer` de `react-intlayer` et l'appeler avec l'ID de contenu pour récupérer le contenu. Voici un exemple :

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Sortie: Voici le contenu rendu par une fonction */}
      <p>{asyncFunctionContent.text}</p>
      {/* Sortie: Voici le contenu récupéré depuis le serveur */}
    </div>
  );
};

export default MyComponent;
```
