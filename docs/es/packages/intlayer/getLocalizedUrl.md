---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getLocalizedUrl | intlayer
description: Descubre cómo usar la función getLocalizedUrl para el paquete intlayer
keywords:
  - getLocalizedUrl
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `getLocalizedUrl` en `intlayer`

## Descripción

La función `getLocalizedUrl` genera una URL localizada al prefijar la URL dada con el locale especificado. Maneja tanto URLs absolutas como relativas, asegurando que se aplique el prefijo de locale correcto basado en la configuración.

---

## Parámetros

- `url: string`

  - **Descripción**: La cadena de URL original a la que se le añadirá un prefijo con un locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descripción**: El locale actual para el cual se está localizando la URL.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descripción**: Array opcional de locales soportados. Por defecto, se proporcionan los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descripción**: El locale predeterminado para la aplicación. Por defecto, se proporciona el locale predeterminado configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descripción**: Indica si se debe prefijar la URL para el locale predeterminado. Por defecto, se proporciona el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

### Retorna

- **Tipo**: `string`
- **Descripción**: La URL localizada para el locale especificado.

---

## Ejemplo de Uso

### URLs Relativas

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el locale francés
// Salida: "/about" para el locale predeterminado (inglés)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el locale francés
// Salida: "/about" para el locale predeterminado (inglés)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el locale francés
// Salida: "/about" para el locale predeterminado (inglés)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el locale francés
// Salida: "/about" para el locale predeterminado (inglés)
```

### URLs Absolutas

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale Predeterminado
  false // Prefijar Locale Predeterminado
); // Salida: "https://example.com/fr/about" para el francés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale Predeterminado
  false // Prefijar Locale Predeterminado
); // Salida: "https://example.com/about" para el inglés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale Predeterminado
  true // Prefijar Locale Predeterminado
); // Salida: "https://example.com/en/about" para el inglés
```

### Locale No Soportado

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH // Locale Predeterminado
); // Salida: "/about" (no se aplica prefijo para locales no soportados)
```

---

## Casos Especiales

- **Sin Segmento de Locale:**

  - Si la URL no contiene ningún segmento de locale, la función añade de manera segura el prefijo del locale apropiado.

- **Locale Predeterminado:**

  - Cuando `prefixDefault` es `false`, la función no añade prefijo a la URL para el locale predeterminado.

- **Locales No Soportados:**
  - Para locales no listados en `locales`, la función no aplica ningún prefijo.

---

## Uso en Aplicaciones

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es crítico para asegurar que se muestre el idioma correcto. A continuación, se muestra un ejemplo de cómo usar `getLocalizedUrl` en la configuración de una aplicación:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para locales soportados y locale predeterminado
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

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y use `ENGLISH` como idioma de respaldo.

Usando esta configuración, la función `getLocalizedUrl` puede generar dinámicamente URLs localizadas basadas en la preferencia de idioma del usuario:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Salida: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Salida: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Salida: "/about"
```

Al integrar `getLocalizedUrl`, los desarrolladores pueden mantener estructuras de URL consistentes en múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
