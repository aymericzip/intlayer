# Documentación: `getPathWithoutLocale` Funciones en `intlayer`

## Descripción:

Remueve el segmento de la localidad de la URL o ruta dada si está presente. Funciona tanto con URLs absolutas como con rutas relativas.

## Parámetros:

- `inputUrl: string`

  - **Descripción**: La cadena de URL completa o ruta a procesar.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descripción**: Array opcional de localidades soportadas. Por defecto, se utiliza las localidades configuradas en el proyecto.
  - **Tipo**: `Locales[]`

## Retorna:

- **Tipo**: `string`
- **Descripción**: La cadena de URL o ruta sin el segmento de localidad.

## Ejemplo de Uso:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/es/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Salida: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/es/dashboard")); // Salida: "https://example.com/dashboard"
```
