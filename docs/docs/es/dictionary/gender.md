---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Contenido Basado en Género
description: Aprende cómo usar contenido basado en género en Intlayer para mostrar contenido dinámicamente según el género. Sigue esta documentación para implementar contenido específico por género de manera eficiente en tu proyecto.
keywords:
  - Contenido Basado en Género
  - Renderizado Dinámico
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Introducción de contenido basado en género
---

# Contenido Basado en Género / Género en Intlayer

## Cómo Funciona el Género

En Intlayer, el contenido basado en género se logra mediante la función `gender`, que asigna valores específicos de género ('male', 'female') a su contenido correspondiente. Este enfoque te permite seleccionar dinámicamente el contenido según un género dado. Cuando se integra con React Intlayer o Next Intlayer, el contenido apropiado se selecciona automáticamente según el género proporcionado en tiempo de ejecución.

## Configuración de Contenido Basado en Género

Para configurar contenido basado en género en tu proyecto Intlayer, crea un módulo de contenido que incluya tus definiciones específicas por género. A continuación, se muestran ejemplos en varios formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mi contenido para usuarios masculinos",
      female: "mi contenido para usuarias femeninas",
      fallback: "mi contenido cuando el género no está especificado", // Opcional
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mi contenido para usuarios masculinos",
      female: "mi contenido para usuarias femeninas",
      fallback: "mi contenido cuando el género no está especificado", // Opcional
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mi contenido para usuarios masculinos",
      female: "mi contenido para usuarias femeninas",
      fallback: "mi contenido cuando el género no está especificado", // Opcional
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "mi contenido para usuarios masculinos",
        "female": "mi contenido para usuarias femeninas",
        "fallback": "mi contenido cuando el género no está especificado", // Opcional
      },
    },
  },
}
```

> Si no se declara un valor de reserva (fallback), se tomará la última clave declarada como reserva si el género no está especificado o no coincide con ningún género definido.

## Uso de contenido basado en género con React Intlayer

Para utilizar contenido basado en género dentro de un componente React, importa y usa el hook `useIntlayer` del paquete `react-intlayer`. Este hook obtiene el contenido para la clave especificada y permite pasar un género para seleccionar la salida apropiada.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios masculinos */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido para usuarios femeninos */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando el género no está especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulte los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen una visión más profunda sobre la configuración y el uso de Intlayer en diversos entornos y frameworks.
