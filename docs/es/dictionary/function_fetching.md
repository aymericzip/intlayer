# Función de Obtención

Intlayer te permite declarar funciones de contenido en tus módulos de contenido, las cuales pueden ser sincrónicas o asincrónicas. Cuando la aplicación se construye, Intlayer ejecuta estas funciones para obtener el resultado de la función. El valor de retorno debe ser un objeto JSON o un valor simple como una cadena o un número.

> Advertencia: la obtención de funciones actualmente no está disponible en la declaración de contenido JSON y en los archivos de declaraciones de contenido remoto.

## Declaraciones de Funciones

Aquí hay un ejemplo de una función sincrónica simple que obtiene contenido:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este es el contenido renderizado por una función",
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

En este ejemplo, la clave `text` contiene una función que devuelve una cadena. Este contenido puede ser renderizado en tus componentes React utilizando los paquetes de intérprete de Intlayer como `react-intlayer`.

## Obtención de Funciones Asincrónicas

Además de las funciones sincrónicas, Intlayer soporta funciones asincrónicas, permitiéndote obtener datos de fuentes externas o simular la recuperación de datos con datos simulados.

A continuación, un ejemplo de una función asincrónica que simula una obtención del servidor:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Espera 200ms para simular una obtención del servidor
  return await setTimeout(200).then(
    () => "Este es el contenido obtenido del servidor"
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
  // Espera 200ms para simular una obtención del servidor
  await setTimeout(200);
  return "Este es el contenido obtenido del servidor";
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
  // Espera 200ms para simular una obtención del servidor
  await setTimeout(200);
  return "Este es el contenido obtenido del servidor";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
No hay forma de obtener contenido desde un archivo JSON, utiliza un archivo .ts o .js en su lugar
```

En este caso, la función `fakeFetch` imita un retraso para simular el tiempo de respuesta del servidor. Intlayer ejecuta la función asincrónica y utiliza el resultado como el contenido para la clave `text`.

## Uso de Contenido Basado en Funciones en Componentes React

Para usar contenido basado en funciones en un componente React, necesitas importar `useIntlayer` desde `react-intlayer` y llamarlo con el ID del contenido para recuperar el contenido. Aquí hay un ejemplo:

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
