---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getPathWithoutLocale | intlayer
description: Descubre cómo usar la función getPathWithoutLocale para el paquete intlayer
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

Elimina el segmento de la configuración regional del URL o ruta proporcionada si está presente. Funciona con URLs absolutas y rutas relativas.

## Parámetros

- `inputUrl: string`

  - **Descripción**: La cadena completa del URL o ruta a procesar.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descripción**: Matriz opcional de configuraciones regionales compatibles. Por defecto, utiliza las configuraciones regionales configuradas en el proyecto.
  - **Tipo**: `Locales[]`

## Retorna

- **Tipo**: `string`
- **Descripción**: La cadena del URL o ruta sin el segmento de configuración regional.

## Ejemplo de Uso

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
