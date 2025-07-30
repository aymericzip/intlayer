---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Enumeración
description: Descubre cómo declarar y usar enumeraciones en tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - Enumeración
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - enumaration
---

# Enumeración / Plurialización

## Cómo Funciona la Enumeración

En Intlayer, la enumeración se logra mediante la función `enu`, que asigna claves específicas a su contenido correspondiente. Estas claves pueden representar valores numéricos, rangos o identificadores personalizados. Cuando se usa con React Intlayer o Next Intlayer, el contenido apropiado se selecciona automáticamente según la configuración regional de la aplicación y las reglas definidas.

## Configuración de la Enumeración

Para configurar la enumeración en tu proyecto Intlayer, necesitas crear un módulo de contenido que incluya definiciones de enumeración. Aquí tienes un ejemplo de una enumeración simple para el número de coches:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
      "fallback": "Valor de reserva", // Opcional
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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
      "fallback": "Valor de reserva", // Opcional
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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
      "fallback": "Valor de reserva", // Opcional
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
        "<-1": "Menos de menos un coche",
        "-1": "Menos un coche",
        "0": "Sin coches",
        "1": "Un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches",
        "fallback": "Valor de reserva" // Opcional
      }
    }
  }
}
```

En este ejemplo, `enu` asigna varias condiciones a contenido específico. Cuando se usa en un componente React, Intlayer puede elegir automáticamente el contenido apropiado basado en la variable dada.

> El orden de declaración es importante en las enumeraciones de Intlayer. La primera declaración válida es la que se seleccionará. Si se aplican múltiples condiciones, asegúrese de que estén ordenadas correctamente para evitar comportamientos inesperados.

> Si no se declara un valor de reserva (fallback), la función devolverá `undefined` si ninguna clave coincide.

## Uso de Enumeraciones con React Intlayer

Para usar enumeraciones en un componente React, puede aprovechar el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en el ID especificado. Aquí hay un ejemplo de cómo usarlo:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Salida: Sin coches
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos coches
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos coches
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor de reserva
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
          numberOfCar(0) // Salida: Sin coches
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos coches
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos coches
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor de reserva
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
          numberOfCar(0) // Salida: Sin coches
        }
      </p>
      <p>
        {
          numberOfCar(6) // Salida: Algunos coches
        }
      </p>
      <p>
        {
          numberOfCar(20) // Salida: Muchos coches
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Salida: Valor de reserva
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

En este ejemplo, el componente ajusta dinámicamente su salida según el número de coches. El contenido correcto se elige automáticamente, dependiendo del rango especificado.

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulte los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos proporcionan información adicional sobre la configuración y el uso de Intlayer en diferentes entornos y con varios frameworks.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
