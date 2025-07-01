---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Inserción
description: Aprende cómo declarar y usar marcadores de posición de inserción en tu contenido. Esta documentación te guía a través de los pasos para insertar valores dinámicamente dentro de estructuras de contenido predefinidas.
keywords:
  - Inserción
  - Contenido Dinámico
  - Marcadores de Posición
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Contenido de Inserción / Inserción en Intlayer

## Cómo Funciona la Inserción

En Intlayer, el contenido de inserción se logra mediante la función `insertion`, que identifica campos de marcador de posición en una cadena (como `{{name}}` o `{{age}}`) que pueden ser reemplazados dinámicamente en tiempo de ejecución. Este enfoque te permite crear cadenas flexibles, similares a plantillas, donde partes específicas del contenido se determinan por los datos proporcionados desde tu aplicación.

Cuando se integra con React Intlayer o Next Intlayer, simplemente puedes proporcionar el objeto de datos que contiene los valores para cada marcador de posición, y Intlayer renderizará automáticamente el contenido con los marcadores reemplazados.

## Configuración del Contenido de Inserción

Para configurar contenido de inserción en tu proyecto Intlayer, crea un módulo de contenido que incluya tus definiciones de inserción. A continuación, se muestran ejemplos en varios formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Hola, mi nombre es {{name}} y tengo {{age}} años."),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Hola, mi nombre es {{name}} y tengo {{age}} años."),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Hola, mi nombre es {{name}} y tengo {{age}} años."),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Hola, mi nombre es {{name}} y tengo {{age}} años.",
    },
  },
}
```

## Uso de contenido de inserción con React Intlayer

Para utilizar contenido de inserción dentro de un componente React, importe y use el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido para la clave especificada y le permite pasar un objeto que asigna cada marcador de posición en su contenido al valor que desea mostrar.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: "Hola, mi nombre es John y tengo 30 años." */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puede reutilizar la misma inserción con valores diferentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: "Hola, mi nombre es John y tengo 30 años." */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puede reutilizar la misma inserción con diferentes valores */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: "Hola, mi nombre es John y tengo 30 años." */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puede reutilizar la misma inserción con diferentes valores */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulte los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen una visión más profunda sobre la configuración y el uso de Intlayer en diversos entornos y frameworks.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
