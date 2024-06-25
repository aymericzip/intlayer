# Documentación de Enumeración en Intlayer

## Descripción General

La enumeración en Intlayer permite a los desarrolladores definir contenido estructurado con múltiples variaciones basadas en condiciones o umbrales específicos. Esto es útil para escenarios como pluralización, rangos numéricos o enumeración de contenido general. Usando enumeraciones, puedes crear contenido que sea dinámico y adaptable a condiciones variables, como cambiar el idioma o diferentes cantidades de elementos.

## Cómo Funciona la Enumeración

En Intlayer, la enumeración se logra a través de la función `enu`, que asigna claves específicas a su contenido correspondiente. Estas claves pueden representar valores numéricos, rangos o identificadores personalizados. Cuando se usa con React Intlayer o Next Intlayer, el contenido apropiado se selecciona automáticamente según la configuración regional de la aplicación y las reglas definidas.

## Configuración de la Enumeración

Para configurar la enumeración en tu proyecto Intlayer, necesitas crear un módulo de contenido que incluya definiciones de enumeración. Aquí tienes un ejemplo de una enumeración simple para el número de coches:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration: DeclarationContent = {
  id: "car_count",
  numberOfCar: enu({
    "<-1": "Menos de menos un coche",
    "-1": "Menos un coche",
    "0": "No hay coches",
    "1": "Un coche",
    ">5": "Algunos coches",
    ">19": "Muchos coches",
  }),
};

export default carEnumeration;
```

En este ejemplo, `enu` asigna varias condiciones a contenido específico. Cuando se usa en un componente de React, Intlayer puede elegir automáticamente el contenido apropiado según la variable dada.

## Uso de la Enumeración con React Intlayer

Para usar la enumeración en un componente de React, puedes aprovechar el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en el ID especificado. Aquí tienes un ejemplo de cómo usarlo:

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Salida: No hay coches */}
      <p>{content.numberOfCar(6)}</p> {/* Salida: Algunos coches */}
      <p>{content.numberOfCar(20)}</p> {/* Salida: Muchos coches */}
    </div>
  );
};

export default CarComponent;
```

En este ejemplo, el componente ajusta dinámicamente su salida según el número de coches. El contenido correcto se elige automáticamente, dependiendo del rango especificado.

## Notas Importantes

- El orden de declaración es crucial en las enumeraciones de Intlayer. La primera declaración válida es la que se seleccionará.
- Si se aplican múltiples condiciones, asegúrate de que estén ordenadas correctamente para evitar comportamientos inesperados.

## Mejores Prácticas para la Enumeración

Para asegurar que tus enumeraciones funcionen como se espera, sigue estas mejores prácticas:

- **Nombres Consistentes**: Usa IDs claros y consistentes para los módulos de enumeración para evitar confusiones.
- **Documentación**: Documenta tus claves de enumeración y sus salidas esperadas para asegurar la mantenibilidad futura.
- **Manejo de Errores**: Implementa manejo de errores para gestionar casos donde no se encuentre una enumeración válida.
- **Optimiza el Rendimiento**: Para aplicaciones grandes, reduce la cantidad de extensiones de archivos monitoreados para mejorar el rendimiento.

## Recursos Adicionales

Para obtener información más detallada sobre configuración y uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_cli_es.md)
- [Documentación de React Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_es.md)
- [Documentación de Next Intlayer](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_es.md)

Estos recursos proporcionan más información sobre la configuración y uso de Intlayer en diferentes entornos y con varios frameworks.
