---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getLocalizedUrl | intlayer
description: Vea cómo usar la función getLocalizedUrl para el paquete intlayer
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
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Documentación: Función `getLocalizedUrl` en `intlayer`

## Descripción

La función `getLocalizedUrl` genera una URL localizada añadiendo un prefijo de locale a la URL proporcionada. Maneja tanto URLs absolutas como relativas, asegurando que el prefijo de locale correcto se aplique basándose en la configuración.

**Características clave:**

- Solo se requieren 2 parámetros: `url` y `currentLocale`
- Objeto `options` opcional con `locales`, `defaultLocale` y `mode`
- Utiliza la configuración de internacionalización de tu proyecto como valores por defecto
- Puede utilizarse con parámetros mínimos para casos simples o completamente personalizado para escenarios complejos
- Soporta múltiples modos de enrutamiento: `prefix-no-default`, `prefix-all`, `no-prefix` y `search-params`

---

## Firma de Función

```typescript
getLocalizedUrl(
  url: string,                   // Requerido
  currentLocale: Locales,        // Requerido
  options?: {                    // Opcional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Parámetros

## Descripción

La función `getLocalizedUrl` genera una URL localizada anteponiendo la URL dada con el locale especificado. Maneja tanto URLs absolutas como relativas, asegurando que se aplique el prefijo de locale correcto según la configuración.

---

## Parámetros

- `url: string`
  - **Descripción**: La cadena de URL original a la que se le antepondrá un locale.
  - **Tipo**: `string`

- `currentLocale: Locales`
  - **Descripción**: El locale actual para el cual se está localizando la URL.
  - **Tipo**: `Locales`

- `locales: Locales[]`
  - **Descripción**: Array opcional de locales soportados. Por defecto, se proporcionan los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

- `defaultLocale: Locales`
  - **Descripción**: El locale por defecto para la aplicación. Por defecto, se proporciona el locale por defecto configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descripción**: Indica si se debe anteponer el prefijo para el locale por defecto. Por defecto, se proporciona el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

### Retorna

- **Tipo**: `string`
- **Descripción**: La URL localizada para el locale especificado.

---

## Ejemplo de Uso

### Uso Básico (Solo Parámetros Requeridos)

Cuando hayas configurado tu proyecto con configuraciones de internacionalización, puedes usar la función con solo los parámetros requeridos:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Usa la configuración de tu proyecto para locales, defaultLocale, y mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (asumiendo que francés es soportado y mode es 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" o "/en/about" (dependiendo de tu configuración de mode)
```

### Uso Avanzado (Con Parámetros Opcionales)

Puedes anular la configuración predeterminada proporcionando el parámetro `options` opcional:

### URLs Relativas

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el locale francés
// Salida: "/about" para el locale por defecto (inglés)
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
// Salida: "/about" para el locale por defecto (inglés)
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
// Salida: "/about" para el locale por defecto (inglés)
```

### Anulación Parcial de Configuración

También puede proporcionar solo algunos de los parámetros opcionales. La función utilizará la configuración de su proyecto para los parámetros que no especifique:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Solo anular los locales, usar la configuración del proyecto para defaultLocale y mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Solo anular mode, usar la configuración del proyecto para locales y defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Forzar prefijo para todos los locales incluyendo el predeterminado
});

// Anular múltiples opciones
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Usar parámetros de consulta: /about?locale=fr
});
```

### URLs Absolutas

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale por Defecto
  false // Prefijar el Locale por Defecto
); // Salida: "https://example.com/fr/about" para el francés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale por Defecto
  false // Prefijar el Locale por Defecto
); // Salida: "https://example.com/about" para el inglés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH, // Locale por Defecto
  true // Prefijar el Locale por Defecto
); // Salida: "https://example.com/en/about" para el inglés
```

### Locale No Soportado

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH // Locale por Defecto
); // Salida: "/about" (no se aplica prefijo para locales no soportados)
```

---

## Casos Especiales

- **Sin Segmento de Locale:**
  - Si la URL no contiene ningún segmento de locale, la función añade de forma segura el locale apropiado como prefijo.

- **Locale por Defecto:**
  - Cuando `prefixDefault` es `false`, la función no añade prefijo a la URL para el locale por defecto.

- **Locales No Soportados:**
  - Para locales que no están listados en `locales`, la función no aplica ningún prefijo.

---

## Uso en Aplicaciones

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es fundamental para asegurar que se muestre el idioma correcto. A continuación, se muestra un ejemplo de cómo `getLocalizedUrl` puede usarse en la configuración de una aplicación:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para locales soportados y locale por defecto
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y utilice `ENGLISH` como idioma predeterminado.

Usando esta configuración, la función `getLocalizedUrl` puede generar dinámicamente URLs localizadas basadas en la preferencia de idioma del usuario:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Salida: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Salida: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Salida: "/about"
```

Al integrar `getLocalizedUrl`, los desarrolladores pueden mantener estructuras de URL consistentes en múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
