---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getEnumeration | intlayer
description: Vea cómo usar la función getEnumeration para el paquete intlayer
keywords:
  - getEnumeration
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `getEnumeration` en `intlayer`

## Descripción

La función `getEnumeration` recupera contenido correspondiente a una cantidad específica basada en condiciones predefinidas en un objeto de enumeración. Las condiciones se definen como claves, y su prioridad está determinada por su orden en el objeto.

## Parámetros

- `enumerationContent: QuantityContent<Content>`

  - **Descripción**: Un objeto donde las claves representan condiciones (por ejemplo, `<=`, `<`, `>=`, `=`) y los valores representan el contenido correspondiente. El orden de las claves define su prioridad de coincidencia.
  - **Tipo**: `QuantityContent<Content>`
    - `Content` puede ser de cualquier tipo.

- `quantity: number`

  - **Descripción**: El valor numérico que se usa para hacer coincidir con las condiciones en `enumerationContent`.
  - **Tipo**: `number`

## Retorna

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente a la primera condición que coincida en `enumerationContent`. Si no se encuentra ninguna coincidencia, se maneja según la implementación (por ejemplo, error o contenido de respaldo).

## Ejemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Tienes menos de -2.3",
    "<1": "Tienes menos de uno",
    "2": "Tienes dos",
    ">=3": "Tienes tres o más",
  },
  2
);

console.log(content); // Salida: "Tienes dos"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Tienes menos de uno",
    "2": "Tienes dos",
    ">=3": "Tienes tres o más",
  },
  2
);

console.log(content); // Salida: "Tienes dos"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Tienes menos de uno",
    "2": "Tienes dos",
    ">=3": "Tienes tres o más",
  },
  2
);

console.log(content); // Salida: "Tienes dos"
```

### Prioridad de Condiciones

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Tienes menos de cuatro",
    "2": "Tienes dos",
  },
  2
);

console.log(content); // Salida: "Tienes menos de cuatro"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Tienes menos de cuatro",
    "2": "Tienes dos",
  },
  2
);

console.log(content); // Salida: "Tienes menos de cuatro"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Tienes menos de cuatro",
    "2": "Tienes dos",
  },
  2
);

console.log(content); // Salida: "Tienes menos de cuatro"
```

## Casos Especiales

- **Ninguna Condición Coincidente:**

  - Si ninguna condición coincide con la cantidad proporcionada, la función devolverá `undefined` o manejará explícitamente el escenario por defecto/de reserva.

- **Condiciones Ambiguas:**

  - Si las condiciones se superponen, la primera condición coincidente (según el orden del objeto) tiene prioridad.

- **Claves Inválidas:**

  - La función asume que todas las claves en `enumerationContent` son válidas y pueden ser analizadas como condiciones. Claves inválidas o mal formateadas pueden conducir a comportamientos inesperados.

- **Aplicación de TypeScript:**
  - La función garantiza que el tipo `Content` sea consistente en todas las claves, permitiendo seguridad de tipos en el contenido recuperado.

## Notas

- La utilidad `findMatchingCondition` se utiliza para determinar la condición apropiada basada en la cantidad dada.

## Historial de Documentación

- 5.5.10 - 2025-06-29: Inicio del historial
