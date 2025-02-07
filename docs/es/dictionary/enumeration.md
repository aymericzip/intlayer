# Enumeración / Pluralización

## Cómo funciona la Enumeración

En Intlayer, la enumeración se logra a través de la función `enu`, que asigna claves específicas a su contenido correspondiente. Estas claves pueden representar valores numéricos, rangos o identificadores personalizados. Cuando se utiliza con React Intlayer o Next Intlayer, el contenido adecuado se selecciona automáticamente en base al locale de la aplicación y las reglas definidas.

## Configuración de Enumeración

Para configurar la enumeración en tu proyecto de Intlayer, necesitas crear un módulo de contenido que incluya definiciones de enumeración. Aquí hay un ejemplo de una enumeración sencilla para el número de coches:

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
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
        "<-1": "Menos de menos un coche",
        "-1": "Menos un coche",
        "0": "Sin coches",
        "1": "Un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches",
        "fallback": "Valor por defecto" // Opcional
      }
    }
  }
}
```

En este ejemplo, `enu` asigna varias condiciones a contenido específico. Cuando se utiliza en un componente de React, Intlayer puede seleccionar automáticamente el contenido adecuado basado en la variable dada.

> El orden de la declaración es importante en las enumeraciones de Intlayer. La primera declaración válida es la que se tomará. Si múltiples condiciones aplican, asegúrate de que estén ordenadas correctamente para evitar comportamientos inesperados.

> Si no se declara un valor por defecto, la función retornará `undefined` si ninguna clave coincide.

## Usando Enumeración con React Intlayer

Para usar enumeración en un componente de React, puedes aprovechar el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en el ID especificado. Aquí tienes un ejemplo de cómo usarlo:

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
          numberOfCar(0.01) // Salida: Valor por defecto
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

En este ejemplo, el componente ajusta dinámicamente su salida en función del número de coches. El contenido correcto se elige automáticamente dependiendo del rango especificado.

## Recursos adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)

Estos recursos proporcionan más detalles sobre la configuración y uso de Intlayer en diferentes entornos y con diversas frameworks.
