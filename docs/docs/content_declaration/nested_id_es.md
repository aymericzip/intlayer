# Documentación del Paquete Intlayer

## Visión General

El paquete `intlayer` ofrece una solución integral para declarar tu contenido de manera estructurada utilizando JavaScript. Esta guía explicará el concepto de IDs anidados, un método para gestionar archivos de declaración grandes con un rendimiento mejorado, permitiéndote definir, gestionar y acceder a tu contenido de manera eficiente.

## Paquete Intlayer

El paquete `intlayer` está diseñado para ayudarte a estructurar y gestionar contenido en un entorno multilingüe. Se integra con herramientas como [intlayer-cli](https://github.com/aypineau/intlayer/blob/main/packages/intlayer-cli/readme_es.md) para crear diccionarios a partir de tus declaraciones, y con intérpretes como [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme_es.md) y [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme_es.md) para usar estos diccionarios en diferentes frameworks.

## Comenzando con IDs Anidados

Los IDs anidados en `intlayer` te permiten declarar estructuras de contenido complejas de manera eficiente. Al introducir IDs anidados, puedes organizar el contenido en una estructura jerárquica, lo que lleva a un mejor rendimiento y una gestión más sencilla en aplicaciones a gran escala.

### Declaración de IDs Anidados

Para declarar IDs anidados en tu archivo de contenido, debes crear una estructura con nodos internos que contengan contenido adicional e identificadores únicos. Esta configuración es ideal para escenarios donde el contenido es vasto o está altamente organizado. Aquí tienes un ejemplo típico de una estructura de ID anidado:

```typescript
import type { DeclarationContent } from "intlayer";

const nestedContent: DeclarationContent = {
  id: "parent_id",
  text: "Este es el nodo padre",

  nestedContent: {
    id: "child_id",
    text: "Este es el nodo hijo",
  },
};

export default nestedContent;
```

En este ejemplo, el `parent_id` contiene un nodo de contenido anidado con un `id` de `child_id`. Esta estructura permite a `intlayer` crear diccionarios separados para cada ID, proporcionando flexibilidad en la gestión del contenido.

### Usando IDs Anidados en React

Para utilizar IDs anidados en un componente de React, puedes emplear el hook `useIntlayer` para acceder al contenido desde un ID dado. Este enfoque te permite extraer piezas específicas de contenido haciendo referencia a sus IDs únicos. Aquí tienes un ejemplo de cómo recuperar contenido con IDs anidados:

```javascript
import { useIntlayer } from "react-intlayer";

// Mostrar el contenido en un componente de React
function MyComponent() {
  // Acceder al contenido padre
  const parentContent = useIntlayer("parent_id");

  // Acceder al contenido hijo
  const childContent = useIntlayer("child_id");

  return (
    <div>
      <p>{parentContent.text}</p> {/* Salida: Este es el nodo padre */}
      <p>{childContent.text}</p> {/* Salida: Este es el nodo hijo */}
    </div>
  );
}

export default MyComponent;
```

En este ejemplo, el hook `useIntlayer` recupera el contenido basado en los IDs especificados. Luego puedes mostrar el contenido según sea necesario, con la flexibilidad de acceder tanto al contenido padre como al contenido hijo de manera independiente.

### Beneficios Clave de los IDs Anidados

Los IDs anidados ofrecen varios beneficios:

- **Mejora del Rendimiento**: Al dividir el contenido grande en estructuras más pequeñas y organizadas, se reduce la carga en tu aplicación, lo que lleva a un mejor rendimiento.
- **Flexibilidad**: La estructura jerárquica te permite acceder a partes específicas del contenido, proporcionando una mayor flexibilidad en el diseño de la aplicación.
- **Escalabilidad**: A medida que las aplicaciones crecen, los IDs anidados facilitan la gestión de estructuras de contenido complejas sin perder organización ni rendimiento.

### Uso Avanzado de IDs Anidados

Para optimizar aún más el rendimiento de los IDs anidados, puedes declarar múltiples niveles de anidación o usar identificadores únicos adicionales dentro de la estructura. Aquí tienes un ejemplo con un anidamiento más profundo:

```typescript
import type { DeclarationContent } from "intlayer";

const deeplyNestedContent: DeclarationContent = {
  id: "level_1",
  text: "Contenido del Nivel 1",

  nestedContent: {
    id: "level_2",
    text: "Contenido del Nivel 2",

    nestedContent: {
      id: "level_3",
      text: "Contenido del Nivel 3",
    },
  },
};

export default deeplyNestedContent;
```

En este ejemplo, la estructura del contenido tiene tres niveles de anidación, cada uno con un identificador único. Este diseño te permite recuperar contenido en cualquier nivel de la jerarquía, proporcionando una flexibilidad significativa en la gestión del contenido.

### Conclusión

Los IDs anidados en `intlayer` ofrecen una herramienta poderosa para organizar y gestionar estructuras de contenido complejas de una manera que optimiza el rendimiento y la escalabilidad. Siguiendo los ejemplos y las pautas de esta documentación, puedes construir declaraciones de contenido eficientes que sean fáciles de mantener y expandir a medida que tu aplicación crezca.
