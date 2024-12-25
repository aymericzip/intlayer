# Documentación: `getPathWithoutLocale` Funciones en `intlayer`

## Descripción:

Elimina el segmento de localización de la URL o ruta dada si está presente. Funciona con URLs absolutas y rutas relativas.

## Parámetros:

- `inputUrl: string`

  - **Descripción**: La cadena de URL completa o ruta a procesar.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descripción**: Array opcional de locales soportados. Por defecto, utiliza los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`

## Retorna:

- **Tipo**: `string`
- **Descripción**: La cadena de URL o ruta sin el segmento de localización.

## Ejemplo de Uso:

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
