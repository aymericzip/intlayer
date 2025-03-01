# Integración con React: Documentación del Hook `useDictionary`

Esta sección proporciona una guía detallada sobre cómo usar el hook `useDictionary` dentro de aplicaciones React, permitiendo un manejo eficiente de contenido localizado sin un editor visual.

## Importando `useDictionary` en React

El hook `useDictionary` puede integrarse en aplicaciones React importándolo según el contexto:

- **Componente del Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Usado en componentes React del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Usado en componentes React del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Usado en componentes React del lado del cliente
  ```

- **Componente del Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Usado en componentes React del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Usado en componentes React del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Usado en componentes React del lado del servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`dictionary`**: Un objeto de diccionario declarado que contiene contenido localizado para claves específicas.
2. **`locale`** (opcional): La localización deseada. Por defecto, utiliza la localización del contexto actual si no se especifica.

## Diccionario

Todos los objetos de diccionario deben declararse en archivos de contenido estructurado para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md). Aquí tienes un ejemplo de declaración de contenido:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
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

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
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

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
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

module.exports = exampleContent;
```

## Ejemplo de Uso en un Componente Cliente de React

A continuación, se muestra un ejemplo de cómo usar el hook `useDictionary` en un componente React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Ejemplo de Uso en un Componente Servidor de React

Si estás utilizando el hook `useDictionary` fuera del `IntlayerServerProvider`, la localización debe proporcionarse explícitamente como un parámetro al renderizar el componente:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notas sobre Atributos

A diferencia de las integraciones que utilizan editores visuales, atributos como `buttonTitle.value` no aplican aquí. En su lugar, accede directamente a las cadenas localizadas como se declaran en tu contenido.

```jsx
<button title={content.title}>{content.content}</button>
```

## Consejos Adicionales

- **Seguridad de Tipos**: Siempre utiliza `Dictionary` para definir tus diccionarios y garantizar la seguridad de tipos.
- **Actualizaciones de Localización**: Al actualizar contenido, asegúrate de que todas las localizaciones sean consistentes para evitar traducciones faltantes.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de funcionalidades de editores visuales.
