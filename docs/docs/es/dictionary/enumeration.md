---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Enumeración
description: Descubra cómo declarar y usar enumeraciones en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.
keywords:
  - Enumeración
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Enumeración / Pluralización

## Cómo funciona la enumeración

En Intlayer, la enumeración se logra a través de la función `enu`, que asigna claves específicas a su contenido correspondiente. Estas claves pueden representar valores numéricos, rangos o identificadores personalizados. Cuando se utiliza con React Intlayer o Next Intlayer, el contenido apropiado se selecciona automáticamente según la configuración regional de la aplicación y las reglas definidas.

## Configuración de la enumeración

Para configurar la enumeración en tu proyecto de Intlayer, necesitas crear un módulo de contenido que incluya definiciones de enumeración. Aquí tienes un ejemplo de una enumeración simple para el número de autos:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos un auto",
      "-1": "Menos un auto",
      "0": "Sin autos",
      "1": "Un auto",
      ">5": "Algunos autos",
      ">19": "Muchos autos",
      "fallback": "Valor por defecto", // Opcional
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos un auto",
      "-1": "Menos un auto",
      "0": "Sin autos",
      "1": "Un auto",
      ">5": "Algunos autos",
      ">19": "Muchos autos",
      "fallback": "Valor por defecto", // Opcional
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos un auto",
      "-1": "Menos un auto",
      "0": "Sin autos",
      "1": "Un auto",
      ">5": "Algunos autos",
      ">19": "Muchos autos",
      "fallback": "Valor por defecto", // Opcional
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos de menos un auto",
        "-1": "Menos un auto",
        "0": "Sin autos",
        "1": "Un auto",
        ">5": "Algunos autos",
        ">19": "Muchos autos",
        "fallback": "Valor por defecto" // Opcional
      }
    }
  }
}
```

En este ejemplo, `enu` asigna varias condiciones a contenido específico. Cuando se utiliza en un componente de React, Intlayer puede elegir automáticamente el contenido apropiado basado en la variable dada.

> El orden de declaración es importante en las enumeraciones de Intlayer. La primera declaración válida es la que se seleccionará. Si se aplican múltiples condiciones, asegúrate de que estén ordenadas correctamente para evitar comportamientos inesperados.

> Si no se declara un valor por defecto, la función devolverá `undefined` si no coincide ninguna clave.

## Uso de enumeración con React Intlayer

Para usar la enumeración en un componente de React, puedes aprovechar el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en el ID especificado. Aquí tienes un ejemplo de cómo usarlo:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Salida: Sin autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor por defecto
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Salida: Sin autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor por defecto
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Salida: Sin autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor por defecto
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

En este ejemplo, el componente ajusta dinámicamente su salida según el número de autos. El contenido correcto se elige automáticamente, dependiendo del rango especificado.

## Recursos adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)

Estos recursos proporcionan más información sobre la configuración y el uso de Intlayer en diferentes entornos y con varios frameworks.
