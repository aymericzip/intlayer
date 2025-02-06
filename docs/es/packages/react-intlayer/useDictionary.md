# Integración de React: Documentación del Hook `useDictionary`

Esta sección proporciona una guía detallada sobre el uso del hook `useDictionary` dentro de aplicaciones de React, habilitando el manejo eficiente de contenido localizado sin un editor visual.

## Importando `useDictionary` en React

El hook `useDictionary` se puede integrar en aplicaciones de React importándolo según el contexto:

- **Componente del Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Usado en componentes de React del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Usado en componentes de React del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Usado en componentes de React del lado del cliente
  ```

- **Componente del Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Usado en componentes de React del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Usado en componentes de React del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Usado en componentes de React del lado del servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`dictionary`**: Un objeto de diccionario declarado que contiene contenido localizado para claves específicas.
2. **`locale`** (opcional): El locale deseado. Por defecto, utiliza el locale del contexto actual si no se especifica.

## Declaración de Contenido

Todos los objetos de diccionario deben declararse en archivos de contenido estructurado para garantizar la seguridad de tipos y evitar errores en tiempo de ejecución. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md). Aquí hay un ejemplo de declaración de contenido:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
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

## Ejemplo de Uso en React

A continuación se muestra un ejemplo de cómo usar el hook `useDictionary` en un componente de React:

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

## Integración del Servidor

Si estás usando el hook `useDictionary` fuera del `IntlayerProvider`, el locale debe proporcionarse explícitamente como un parámetro al renderizar el componente:

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

## Notas sobre los Atributos

A diferencia de las integraciones que utilizan editores visuales, los atributos como `buttonTitle.value` no se aplican aquí. En su lugar, accede directamente a las cadenas localizadas como se declara en tu contenido.

```jsx
<button title={content.title}>{content.content}</button>
```

## Consejos Adicionales

- **Seguridad de Tipo**: Siempre utiliza `Dictionary` para definir tus diccionarios para garantizar la seguridad de tipos.
- **Actualizaciones de Localización**: Al actualizar contenido, asegúrate de que todos los locales sean consistentes para evitar traducciones faltantes.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de las funcionalidades de editores visuales.
