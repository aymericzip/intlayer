---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-06-29
title: Contenido condicional
description: Descubre cómo usar contenido condicional en Intlayer para mostrar contenido dinámico basado en condiciones específicas. Sigue esta documentación para implementar condiciones de manera eficiente en tu proyecto.
keywords:
  - Contenido condicional
  - Renderizado dinámico
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Contenido Condicional / Condición en Intlayer

## Cómo Funciona la Condición

En Intlayer, el contenido condicional se logra a través de la función `cond`, que asigna condiciones específicas (típicamente valores booleanos) a su contenido correspondiente. Este enfoque permite seleccionar dinámicamente el contenido basado en una condición dada. Cuando se integra con React Intlayer o Next Intlayer, el contenido apropiado se elige automáticamente según la condición proporcionada en tiempo de ejecución.

## Configuración de Contenido Condicional

Para configurar contenido condicional en tu proyecto Intlayer, crea un módulo de contenido que incluya tus definiciones condicionales. A continuación, se muestran ejemplos en varios formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mi contenido cuando es verdadero",
      false: "mi contenido cuando es falso",
      fallback: "mi contenido cuando la condición falla", // Opcional
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mi contenido cuando es verdadero",
      false: "mi contenido cuando es falso",
      fallback: "mi contenido cuando la condición falla", // Opcional
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mi contenido cuando es verdadero",
      false: "mi contenido cuando es falso",
      fallback: "mi contenido cuando la condición falla", // Opcional
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "mi contenido cuando es verdadero",
        "false": "mi contenido cuando es falso",
        "fallback": "mi contenido cuando la condición falla", // Opcional
      },
    },
  },
}
```

> Si no se declara un fallback, la última clave declarada se tomará como fallback si la condición no se valida.

## Uso de Contenido Condicional con React Intlayer

Para utilizar contenido condicional dentro de un componente React, importa y usa el hook `useIntlayer` del paquete `react-intlayer`. Este hook obtiene el contenido para la clave especificada y te permite pasar una condición para seleccionar la salida apropiada.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido cuando es verdadero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando es falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido cuando es verdadero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando es falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Salida: mi contenido cuando es verdadero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando es falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Salida: mi contenido cuando la condición falla */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen más información sobre la configuración y el uso de Intlayer en diversos entornos y frameworks.
