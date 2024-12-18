# Documentación: `getMultilingualUrls` Función en `intlayer`

## Descripción:

La función `getMultilingualUrls` genera un mapeo de URLs multilingües al agregar el prefijo de cada locale soportado a la URL dada. Puede manejar tanto URLs absolutas como relativas, aplicando el prefijo de locale apropiado según la configuración proporcionada o por defecto.

---

## Parámetros:

- `url: string`

  - **Descripción**: La cadena de URL original que se le añadirá el prefijo de locales.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descripción**: Array opcional de locales soportados. Por defecto se utilizan los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Por Defecto**: `localesDefault`

- `defaultLocale: Locales`

  - **Descripción**: El locale por defecto para la aplicación. Por defecto se utiliza el locale configurado como por defecto en el proyecto.
  - **Tipo**: `Locales`
  - **Por Defecto**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descripción**: Si se debe agregar el prefijo del locale por defecto. Por defecto se utiliza el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Por Defecto**: `prefixDefaultDefault`

### Retorna:

- **Tipo**: `IConfigLocales<string>`
- **Descripción**: Un objeto que mapea cada locale a su correspondiente URL multilingüe.

---

## Ejemplo de Uso:

### URLs Relativas:

```typescript
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

### URLs Absolutas:

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

## Casos Límite:

- **Sin Segmento de Locale:**

  - La función elimina cualquier segmento de locale existente de la URL antes de generar los mapeos multilingües.

- **Locale por Defecto:**

  - Cuando `prefixDefault` es `false`, la función no agrega el prefijo en la URL para el locale por defecto.

- **Locales No Soportados:**
  - Solo se consideran los locales proporcionados en el array `locales` para generar las URLs.

---

## Uso en Aplicaciones:

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es fundamental para garantizar que se muestre el idioma correcto. A continuación, se muestra un ejemplo de cómo se puede usar `getMultilingualUrls` en la configuración de una aplicación:

```tsx
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

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y use `ENGLISH` como el idioma por defecto.

Utilizando esta configuración, la función `getMultilingualUrls` puede generar dinámicamente mapeos de URLs multilingües basados en los locales soportados de la aplicación:

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

Al integrar `getMultilingualUrls`, los desarrolladores pueden mantener estructuras de URL consistentes en múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
