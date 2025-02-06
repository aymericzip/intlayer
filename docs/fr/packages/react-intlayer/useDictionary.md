# Intégration React : Documentation du Hook `useDictionary`

Cette section fournit des conseils détaillés sur l'utilisation du hook `useDictionary` dans les applications React, permettant une gestion efficace du contenu localisé sans éditeur visuel.

## Importation de `useDictionary` dans React

Le hook `useDictionary` peut être intégré dans les applications React en l'importing selon le contexte :

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

1. **`dictionary`** : Un objet dictionnaire déclaré contenant du contenu localisé pour des clés spécifiques.
2. **`locale`** (optionnel) : La locale souhaitée. Par défaut, cela est défini sur la locale du contexte actuel si non spécifié.

## Déclaration de Contenu

Tous les objets dictionnaires doivent être déclarés dans des fichiers de contenu structurés pour assurer la sécurité des types et éviter les erreurs d'exécution. Vous pouvez trouver les instructions d'installation [ici](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md). Voici un exemple de déclaration de contenu :

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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

## Exemple d'Utilisation dans React

Voici un exemple de la manière d'utiliser le hook `useDictionary` dans un composant React :

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
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

Si vous utilisez le hook `useDictionary` en dehors du `IntlayerProvider`, la locale doit être fournie explicitement en tant que paramètre lors du rendu du composant :

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
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

Contrairement aux intégrations utilisant des éditeurs visuels, des attributs comme `buttonTitle.value` ne s'appliquent pas ici. Au lieu de cela, accédez directement aux chaînes localisées comme déclaré dans votre contenu.

```jsx
<button title={content.title}>{content.content}</button>
```

## Conseils Supplémentaires

- **Sécurité des Types** : Utilisez toujours `DeclarationContent` pour définir vos dictionnaires afin d'assurer la sécurité des types.
- **Mises à jour de Localisation** : Lors de la mise à jour du contenu, assurez-vous que toutes les locales sont cohérentes pour éviter des traductions manquantes.

Cette documentation se concentre sur l'intégration du hook `useDictionary`, offrant une approche rationalisée pour gérer le contenu localisé sans dépendre des fonctionnalités d'éditeur visuel.
