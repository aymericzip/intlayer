---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getPathWithoutLocale | intlayer
description: Vea cómo usar la función getPathWithoutLocale para el paquete intlayer
keywords:
  - getPathWithoutLocale
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Funciones `getPathWithoutLocale` en `intlayer`

## Descripción

Elimina el segmento de localización del URL o ruta proporcionada si está presente. Funciona tanto con URLs absolutas como con rutas relativas.

## Parámetros

- `inputUrl: string`

  - **Descripción**: La cadena completa de URL o ruta a procesar.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descripción**: Array opcional de locales soportados. Por defecto, los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`

## Retorna

- **Tipo**: `string`
- **Descripción**: La cadena de URL o ruta sin el segmento de localización.

## Ejemplo de uso

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Salida: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Salida: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Salida: "https://example.com/dashboard"
```

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
