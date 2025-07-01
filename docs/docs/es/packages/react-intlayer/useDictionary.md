---
docName: package__react-intlayer__useDictionary
url: https://intlayer.org/doc/package/react-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useDictionary.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Documentación de React Intlayer
description: Guía completa para usar el hook useDictionary en aplicaciones React con Intlayer para un manejo eficiente de contenido localizado sin editor visual.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localización
  - i18n
  - diccionario
  - traducción
---

# Integración en React: Documentación del Hook `useDictionary`

Esta sección proporciona una guía detallada sobre el uso del hook `useDictionary` en aplicaciones React, permitiendo un manejo eficiente del contenido localizado sin un editor visual.

## Importando `useDictionary` en React

El hook `useDictionary` puede integrarse en aplicaciones React importándolo según el contexto:

- **Componente Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Usado en componentes React del lado cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Usado en componentes React del lado cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Usado en componentes React del lado cliente
  ```

- **Componente Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Usado en componentes React del lado servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Usado en componentes React del lado servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Usado en componentes React del lado servidor
  ```

## Parámetros

El hook acepta dos parámetros:

1. **`dictionary`**: Un objeto diccionario declarado que contiene contenido localizado para claves específicas.
2. **`locale`** (opcional): La configuración regional deseada. Por defecto es la configuración regional del contexto actual si no se especifica.

## Diccionario

Todos los objetos diccionario deben ser declarados en archivos de contenido estructurado para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Puedes encontrar las [instrucciones de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md). Aquí tienes un ejemplo de declaración de contenido:

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

## Ejemplo de uso en React

A continuación se muestra un ejemplo de cómo usar el hook `useDictionary` en un componente React:

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

## Integración en el Servidor

Si utilizas el hook `useDictionary` fuera del `IntlayerProvider`, el locale debe proporcionarse explícitamente como parámetro al renderizar el componente:

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
import { useDictionary } from "react.intlayer/server";
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

A diferencia de las integraciones que usan editores visuales, atributos como `buttonTitle.value` no se aplican aquí. En su lugar, accede directamente a las cadenas localizadas tal como están declaradas en tu contenido.

```jsx
<button title={content.title}>{content.content}</button>
```

## Consejos Adicionales

- **Seguridad de Tipos**: Siempre usa `Dictionary` para definir tus diccionarios y asegurar la seguridad de tipos.
- **Actualizaciones de Localización**: Al actualizar contenido, asegúrate de que todas las locales sean consistentes para evitar traducciones faltantes.

Esta documentación se centra en la integración del hook `useDictionary`, proporcionando un enfoque simplificado para gestionar contenido localizado sin depender de funcionalidades de editores visuales.

## Historial de Documentación

- 5.5.10 - 2025-06-29: Inicio del historial
