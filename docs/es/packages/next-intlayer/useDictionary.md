# Integración de React: Documentación del Hook `useDictionary`

Esta sección proporciona orientación detallada sobre el uso del hook `useDictionary` dentro de aplicaciones de React, lo que permite manejar eficientemente contenido localizado sin un editor visual.

## Importación de `useDictionary` en React

El hook `useDictionary` se puede integrar en aplicaciones de React importándolo según el contexto:

- **Componente del Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Utilizado en componentes de React del lado del cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Utilizado en componentes de React del lado del cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Utilizado en componentes de React del lado del cliente
  ```

- **Componente del Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Utilizado en componentes de React del lado del servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Utilizado en componentes de React del lado del servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Utilizado en componentes de React del lado del servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`dictionary`**: Un objeto diccionario declarado que contiene contenido localizado para claves específicas.
2. **`locale`** (opcional): El locale deseado. Por defecto, se utiliza el locale del contexto actual si no se especifica.

## Declaración de Contenido

Todos los objetos diccionario deben ser declarados en archivos de contenido estructurado para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Puedes encontrar las instrucciones de configuración [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md). Aquí tienes un ejemplo de declaración de contenido:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

## Ejemplo de Uso en Componente Cliente de React

A continuación se presenta un ejemplo de cómo usar el hook `useDictionary` en un componente de React:

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

## Ejemplo de Uso en Componente Servidor de React

Si estás utilizando el hook `useDictionary` fuera del `IntlayerServerProvider`, el locale debe ser proporcionado explícitamente como un parámetro al renderizar el componente:

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

A diferencia de las integraciones que utilizan editores visuales, atributos como `buttonTitle.value` no se aplican aquí. En su lugar, accede directamente a las cadenas localizadas como se declararon en tu contenido.

```jsx
<button title={content.title}>{content.content}</button>
```

## Consejos Adicionales

- **Seguridad de Tipos**: Siempre usa `DeclarationContent` para definir tus diccionarios y asegurar la seguridad de tipos.
- **Actualizaciones de Localización**: Al actualizar contenido, asegúrate de que todos los locales sean consistentes para evitar falta de traducciones.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de funcionalidades de editores visuales.
