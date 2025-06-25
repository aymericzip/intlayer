---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getMultilingualUrls | intlayer
description: Descubre cómo usar la función getMultilingualUrls para el paquete intlayer
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
---

# Documentación: Función `getMultilingualUrls` en `intlayer`

## Descripción

La función `getMultilingualUrls` genera un mapeo de URLs multilingües al prefijar la URL proporcionada con cada localización soportada. Puede manejar tanto URLs absolutas como relativas, aplicando el prefijo de localización apropiado basado en la configuración proporcionada o los valores predeterminados.

---

## Parámetros

- `url: string`

  - **Descripción**: La URL original en formato de cadena que será prefijada con localizaciones.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descripción**: Array opcional de localizaciones soportadas. Por defecto, utiliza las localizaciones configuradas en el proyecto.
  - **Tipo**: `Locales[]`
  - **Predeterminado**: `localesDefault`

- `defaultLocale: Locales`

  - **Descripción**: La localización predeterminada para la aplicación. Por defecto, utiliza la localización predeterminada configurada en el proyecto.
  - **Tipo**: `Locales`
  - **Predeterminado**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descripción**: Indica si se debe prefijar la localización predeterminada. Por defecto, utiliza el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Predeterminado**: `prefixDefaultDefault`

### Retorna

- **Tipo**: `IConfigLocales<string>`
- **Descripción**: Un objeto que mapea cada localización a su correspondiente URL multilingüe.

---

## Ejemplo de Uso

### URLs Relativas

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

  - La función elimina cualquier segmento de localización existente de la URL antes de generar los mapeos multilingües.

- **Localización Predeterminada:**

  - Cuando `prefixDefault` es `false`, la función no prefija la URL para la localización predeterminada.

- **Localizaciones No Soportadas:**
  - Solo se consideran las localizaciones proporcionadas en el array `locales` para generar las URLs.

---

## Uso en Aplicaciones

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es crítico para garantizar que se muestre el idioma correcto. A continuación, se muestra un ejemplo de cómo se puede usar `getMultilingualUrls` en la configuración de una aplicación:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para localizaciones soportadas y localización predeterminada
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y utilice `ENGLISH` como idioma de respaldo.

Usando esta configuración, la función `getMultilingualUrls` puede generar dinámicamente mapeos de URLs multilingües basados en las localizaciones soportadas por la aplicación:

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

Al integrar `getMultilingualUrls`, los desarrolladores pueden mantener estructuras de URLs consistentes en múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
