# Intégration React : Documentation du Hook `useDictionary`

Cette section fournit des instructions détaillées sur l'utilisation du hook `useDictionary` dans les applications React, permettant une gestion efficace du contenu localisé sans éditeur visuel.

## Importation de `useDictionary` dans React

Le hook `useDictionary` peut être intégré dans les applications React en l'important selon le contexte :

- **Composant Client :**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Utilisé dans les composants React côté client
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Utilisé dans les composants React côté client
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Utilisé dans les composants React côté client
  ```

- **Composant Serveur :**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Utilisé dans les composants React côté serveur
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Utilisé dans les composants React côté serveur
  ```

## Paramètres

Le hook accepte deux paramètres :

1. **`dictionary`** : Un objet dictionnaire déclaré contenant le contenu localisé pour des clés spécifiques.
2. **`locale`** (optionnel) : La locale souhaitée. Par défaut, utilise la locale du contexte actuel si non spécifiée.

## Dictionnaire

Tous les objets dictionnaires doivent être déclarés dans des fichiers de contenu structurés pour garantir la sécurité des types et éviter les erreurs d'exécution. Vous pouvez trouver les instructions de configuration [ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md). Voici un exemple de déclaration de contenu :

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
// Déclaration d'un dictionnaire pour un composant client
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
// Déclaration d'un dictionnaire pour un composant client
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
// Déclaration d'un dictionnaire pour un composant client
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Exemple d'utilisation dans React

Voici un exemple d'utilisation du hook `useDictionary` dans un composant React :

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
// Exemple d'un composant client utilisant le hook useDictionary
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
// Exemple d'un composant client utilisant le hook useDictionary
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
// Exemple d'un composant client utilisant le hook useDictionary
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Intégration Serveur

Si vous utilisez le hook `useDictionary` en dehors du `IntlayerProvider`, la locale doit être explicitement fournie comme paramètre lors du rendu du composant :

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
// Exemple d'un composant serveur utilisant le hook useDictionary
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
// Exemple d'un composant serveur utilisant le hook useDictionary
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
// Exemple d'un composant serveur utilisant le hook useDictionary
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notes sur les Attributs

Contrairement aux intégrations utilisant des éditeurs visuels, les attributs comme `buttonTitle.value` ne s'appliquent pas ici. Accédez directement aux chaînes localisées telles que déclarées dans votre contenu.

```jsx
<button title={content.title}>{content.content}</button>
```

## Conseils Supplémentaires

- **Sécurité des Types** : Utilisez toujours `Dictionary` pour définir vos dictionnaires afin de garantir la sécurité des types.
- **Mises à Jour de Localisation** : Lors de la mise à jour du contenu, assurez-vous que toutes les locales sont cohérentes pour éviter les traductions manquantes.

Cette documentation se concentre sur l'intégration du hook `useDictionary`, offrant une approche simplifiée pour gérer le contenu localisé sans dépendre des fonctionnalités d'éditeurs visuels.
