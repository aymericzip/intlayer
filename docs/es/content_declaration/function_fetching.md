# Función Fetching

## Declaraciones de Funciones

Intlayer permite declarar funciones de contenido en sus módulos de contenido, las cuales pueden ser síncronas o asíncronas. Cuando la aplicación se construye, Intlayer ejecuta estas funciones para obtener el resultado de la función. El valor de retorno debe ser un objeto JSON o un valor simple como una cadena o un número.

Aquí hay un ejemplo de una función síncrona simple que obtiene contenido:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: { text: () => "Este es el contenido renderizado por una función" },
} satisfies DeclarationContent;

export default functionContent;
```

En este ejemplo, la clave `text` contiene una función que retorna una cadena. Este contenido puede ser renderizado en sus componentes de React utilizando los paquetes intérpretes de Intlayer como `react-intlayer`.

## Obtención de Datos de Funciones Asíncronas

Además de las funciones síncronas, Intlayer soporta funciones asíncronas, permitiendo obtener datos de fuentes externas o simular la obtención de datos con datos ficticios.

A continuación, se muestra un ejemplo de una función asíncrona que simula una obtención de datos del servidor:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Espera 200ms para simular una obtención de datos del servidor
  return await setTimeout(200).then(
    () => "Este es el contenido obtenido del servidor"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

En este caso, la función `fakeFetch` imita un retraso para simular el tiempo de respuesta del servidor. Intlayer ejecuta la función asíncrona y usa el resultado como el contenido para la clave `text`.

## Uso de Contenido Basado en Funciones en Componentes de React

Para usar contenido basado en funciones en un componente de React, necesita importar `useIntlayer` desde `react-intlayer` y llamarlo con el ID del contenido para recuperar el contenido. Aquí hay un ejemplo:

```javascript
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
