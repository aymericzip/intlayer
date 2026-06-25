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
author: aymericzip
---

# Documentación: Función `getMultilingualUrls` en `intlayer`

## Descripción

La función `getMultilingualUrls` genera un mapeo de URLs multilingües anteponiendo la URL dada con cada localización soportada. Puede manejar tanto URLs absolutas como relativas, aplicando el prefijo de localización apropiado basado en la configuración proporcionada o los valores predeterminados.

---

## Firma de función

```typescript
getMultilingualUrls(
  url: string,                   // Requerido
  options?: {                    // Opcional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Parámetros

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

### Parámetros Opcionales

- `options?: object`
  - **Description**: Objeto de configuración para el comportamiento de localización de URL.
  - **Type**: `object`
  - **Required**: No (Opcional)

  - `options.locales?: Locales[]`
    - **Description**: Array de locales soportados. Si no se proporciona, utiliza los locales configurados desde la configuración de tu proyecto.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: El locale por defecto para la aplicación. Si no se proporciona, utiliza el locale por defecto configurado desde la configuración de tu proyecto.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: El modo de enrutamiento de URL para el manejo de locales. Si no se proporciona, utiliza el modo configurado desde la configuración de tu proyecto.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Sin prefijo para el locale por defecto, con prefijo para los demás
      - `prefix-all`: Prefijo para todos los locales incluyendo el por defecto
      - `no-prefix`: Sin prefijo de locale en la URL
      - `search-params`: Usar parámetros de consulta para el locale (ej: `?locale=fr`)

### Retorna

- **Tipo**: `IConfigLocales<string>`
- **Descripción**: Un objeto que mapea cada localización a su URL multilingüe correspondiente.

---

## Ejemplo de Uso

### Uso Básico (Usa la Configuración del Proyecto)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Usa la configuración de tu proyecto para locales, defaultLocale y mode
getMultilingualUrls("/dashboard");
// Output (assuming project config has en, fr with mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

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

### Diferentes modos de enrutamiento

```typescript
// prefix-no-default: Sin prefijo para la configuración regional predeterminada
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Salida: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefijo para todas las configuraciones regionales
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Salida: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Sin prefijo de configuración regional en las URLs
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Salida: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Configuración regional como parámetro de consulta
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Salida: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
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
