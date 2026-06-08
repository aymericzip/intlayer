---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getMultilingualUrls | intlayer
description: Vea cómo usar la función getMultilingualUrls para el paquete intlayer
keywords:
  - getMultilingualUrls
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
---

# Documentación: Función `getMultilingualUrls` en `intlayer`

## Descripción

La función `getMultilingualUrls` genera un mapeo de URLs multilingües anteponiendo la URL dada con cada localización soportada. Puede manejar tanto URLs absolutas como relativas, aplicando el prefijo de localización apropiado basado en la configuración proporcionada o los valores predeterminados.

---

## Parámetros

- `url: string`
  - **Descripción**: La cadena URL original a la que se le antepondrán los prefijos de localización.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descripción**: Arreglo opcional de locales soportados. Por defecto, usa los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Por defecto**: `localesDefault`

- `defaultLocale: Locales`
  - **Descripción**: El local predeterminado para la aplicación. Por defecto, usa el local predeterminado configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Por defecto**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descripción**: Indica si se debe anteponer el prefijo para el local predeterminado. Por defecto, usa el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Por defecto**: `prefixDefaultDefault`

### Retorna

- **Tipo**: `IConfigLocales<string>`
- **Descripción**: Un objeto que mapea cada localización a su URL multilingüe correspondiente.

---

## Ejemplo de Uso

### URLs Relativas

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Salida: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs Absolutas

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Salida: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Casos Especiales

- **Sin Segmento de Localización:**
  - La función elimina cualquier segmento de idioma existente en la URL antes de generar las asignaciones multilingües.

- **Idioma Predeterminado:**
  - Cuando `prefixDefault` es `false`, la función no antepone el prefijo a la URL para el idioma predeterminado.

- **Idiomas No Soportados:**
  - Solo se consideran los idiomas proporcionados en el arreglo `locales` para generar las URLs.

---

## Uso en Aplicaciones

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es fundamental para asegurar que se muestre el idioma correcto. A continuación, se muestra un ejemplo de cómo se puede usar `getMultilingualUrls` en la configuración de una aplicación:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para los idiomas soportados y el idioma predeterminado
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y utilice `ENGLISH` como idioma de reserva.

Usando esta configuración, la función `getMultilingualUrls` puede generar dinámicamente mapeos de URLs multilingües basados en los locales soportados por la aplicación:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Salida:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Salida:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Al integrar `getMultilingualUrls`, los desarrolladores pueden mantener estructuras de URL consistentes a través de múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
