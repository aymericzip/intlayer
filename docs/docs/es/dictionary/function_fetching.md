---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Obtención de Funciones
description: Descubre cómo declarar y usar la obtención de funciones en tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - Obtención de Funciones
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Obtención de Funciones

Intlayer te permite declarar funciones de contenido en tus módulos de contenido, las cuales pueden ser síncronas o asíncronas. Cuando la aplicación se construye, Intlayer ejecuta estas funciones para obtener el resultado de la función. El valor de retorno debe ser un objeto JSON o un valor simple como una cadena o un número.

> Advertencia: la obtención de funciones actualmente no está disponible en la declaración de contenido JSON ni en archivos de declaraciones de contenido remoto.

## Declaraciones de Funciones

Aquí tienes un ejemplo de una función síncrona simple que obtiene contenido:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este es el contenido renderizado por una función",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este es el contenido renderizado por una función",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Este es el contenido renderizado por una función"
  }
}
```

En este ejemplo, la clave `text` contiene una función que devuelve una cadena. Este contenido puede ser renderizado en tus componentes React utilizando los paquetes intérpretes de Intlayer como `react-intlayer`.

## Obtención de Funciones Asíncronas

Además de las funciones síncronas, Intlayer soporta funciones asíncronas, lo que te permite obtener datos de fuentes externas o simular la recuperación de datos con datos simulados (mock).

A continuación, se muestra un ejemplo de una función asíncrona que simula una obtención desde un servidor:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Espera 200ms para simular una obtención desde el servidor
  return await setTimeout(200).then(
    () => "Este es el contenido obtenido desde el servidor"
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
  // Espera 200ms para simular una obtención desde el servidor
  await setTimeout(200);
  return "Este es el contenido obtenido desde el servidor";
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
  // Espera 200ms para simular una obtención desde el servidor
  await setTimeout(200);
  return "Este es el contenido obtenido desde el servidor";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
No es posible obtener contenido desde un archivo JSON, usa un archivo .ts o .js en su lugar
```

En este caso, la función `fakeFetch` simula un retraso para imitar el tiempo de respuesta del servidor. Intlayer ejecuta la función asíncrona y utiliza el resultado como contenido para la clave `text`.

## Uso de contenido basado en funciones en componentes React

Para usar contenido basado en funciones en un componente React, necesitas importar `useIntlayer` desde `react-intlayer` y llamarlo con el ID del contenido para obtenerlo. Aquí tienes un ejemplo:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Salida: Este es el contenido renderizado por una función */}
      <p>{asyncFunctionContent.text}</p>
      {/* Salida: Este es el contenido obtenido del servidor */}
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
      {/* Salida: Este es el contenido renderizado por una función */}
      <p>{asyncFunctionContent.text}</p>
      {/* Salida: Este es el contenido obtenido del servidor */}
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
      {/* Salida: Este es el contenido renderizado por una función */}
      <p>{asyncFunctionContent.text}</p>
      {/* Salida: Este es el contenido obtenido del servidor */}
    </div>
  );
};

module.exports = MyComponent;
```

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
