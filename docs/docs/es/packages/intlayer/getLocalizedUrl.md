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

### Parámetros Requeridos

- `url: string`
  - **Descripción**: La cadena de URL original a la que se le añadirá un prefijo de locale.
  - **Tipo**: `string`
  - **Requerido**: Sí

- `currentLocale: Locales`
  - **Descripción**: El locale actual para el cual se está localizando la URL.
  - **Tipo**: `Locales`
  - **Requerido**: Sí

### Parámetros Opcionales

- `options?: object`
  - **Description**: Objeto de configuración para el comportamiento de localización de URL.
  - **Type**: `object`
  - **Required**: No (Opcional)

  - `options.locales?: Locales[]`
    - **Description**: Array de locales soportadas. Si no se proporciona, utiliza las locales configuradas en la configuración de tu proyecto.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: La locale predeterminada para la aplicación. Si no se proporciona, utiliza la locale predeterminada configurada en la configuración de tu proyecto.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: El modo de enrutamiento de URL para el manejo de locales. Si no se proporciona, utiliza el modo configurado en la configuración de tu proyecto.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Sin prefijo para la locale predeterminada, prefijo para todas las demás
      - `prefix-all`: Prefijo para todas las locales incluyendo la predeterminada
      - `no-prefix`: Sin prefijo de locale en la URL
      - `search-params`: Usar parámetros de consulta para la locale (p. ej., `?locale=fr`)

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

- **Modos de enrutamiento:**
  - `'prefix-no-default'`: La locale por defecto no tiene prefijo, otras sí (p. ej., `/about`, `/fr/about`)
  - `'prefix-all'`: Todas las locales tienen prefijos (p. ej., `/en/about`, `/fr/about`)
  - `'no-prefix'`: Sin prefijos de locale en las URLs (locale manejada en otro lugar)
  - `'search-params'`: Locale especificada mediante parámetro de consulta (p. ej., `/about?locale=fr`)

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
