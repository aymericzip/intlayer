# Enumeración / Pluralización

## Cómo Funciona la Enumeración

En Intlayer, la enumeración se logra a través de la función `enu`, que mapea claves específicas a su contenido correspondiente. Estas claves pueden representar valores numéricos, rangos o identificadores personalizados. Cuando se usa con React Intlayer o Next Intlayer, el contenido apropiado se selecciona automáticamente en función de la localización de la aplicación y las reglas definidas.

## Configuración de la Enumeración

Para configurar la enumeración en tu proyecto Intlayer, necesitas crear un módulo de contenido que incluya definiciones de enumeración. Aquí tienes un ejemplo de una enumeración simple para el número de coches:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

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
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches"
    }
  }
}
```

En este ejemplo, `enu` mapea varias condiciones a contenido específico. Cuando se usa en un componente de React, Intlayer puede elegir automáticamente el contenido apropiado según la variable dada.

## Usando Enumeración con React Intlayer

Para usar la enumeración en un componente de React, puedes aprovechar el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en el ID especificado. Aquí tienes un ejemplo de cómo usarlo:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Salida: Sin coches */}
      <p>{content.numberOfCar(6)}</p> {/* Salida: Algunos coches */}
      <p>{content.numberOfCar(20)}</p> {/* Salida: Algunos coches */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Salida: Sin coches */}
      <p>{content.numberOfCar(6)}</p> {/* Salida: Algunos coches */}
      <p>{content.numberOfCar(20)}</p> {/* Salida: Algunos coches */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Salida: Sin coches */}
      <p>{content.numberOfCar(6)}</p> {/* Salida: Algunos coches */}
      <p>{content.numberOfCar(20)}</p> {/* Salida: Algunos coches */}
    </div>
  );
};

module.exports = CarComponent;
```

En este ejemplo, el componente ajusta dinámicamente su salida en función del número de coches. El contenido correcto se elige automáticamente, dependiendo del rango especificado.

## Notas Importantes

- El orden de declaración es crucial en las enumeraciones de Intlayer. La primera declaración válida es la que se elegirá.
- Si se aplican múltiples condiciones, asegúrate de que estén ordenadas correctamente para evitar comportamientos inesperados.

## Mejores Prácticas para la Enumeración

Para asegurar que tus enumeraciones funcionen como se espera, sigue estas mejores prácticas:

- **Nombres Consistentes**: Usa IDs claros y consistentes para los módulos de enumeración para evitar confusiones.
- **Documentación**: Documenta tus claves de enumeración y sus resultados esperados para asegurar la mantenibilidad futura.
- **Manejo de Errores**: Implementa el manejo de errores para gestionar casos donde no se encuentre una enumeración válida.
- **Optimización del Rendimiento**: Para aplicaciones grandes, reduce el número de extensiones de archivos observados para mejorar el rendimiento.

## Recursos Adicionales

Para información más detallada sobre configuración y uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen más información sobre la configuración y el uso de Intlayer en diferentes entornos y con varios frameworks.
