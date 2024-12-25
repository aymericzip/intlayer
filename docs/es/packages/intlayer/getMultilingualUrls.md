# Documentación: `getMultilingualUrls` Función en `intlayer`

## Descripción:

La función `getMultilingualUrls` genera un mapeo de URL multilingües al prefijar la URL dada con cada idioma admitido. Puede manejar tanto URLs absolutas como relativas, aplicando el prefijo de idioma apropiado según la configuración proporcionada o los valores predeterminados.

---

## Parámetros:

- `url: string`

  - **Descripción**: La cadena de URL original que se debe prefijar con locales.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descripción**: Array opcional de idiomas admitidos. Se utiliza como predeterminado los idiomas configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Predeterminado**: `localesDefault`

- `defaultLocale: Locales`

  - **Descripción**: El idioma predeterminado para la aplicación. Se utiliza el idioma predeterminado configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Predeterminado**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descripción**: Si se debe prefijar el idioma predeterminado. Se utiliza el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Predeterminado**: `prefixDefaultDefault`

### Retorna:

- **Tipo**: `IConfigLocales<string>`
- **Descripción**: Un objeto que mapea cada idioma a su correspondiente URL multilingüe.

---

## Ejemplo de Uso:

### URLs Relativas:

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

- **No Segmento de Idioma:**

  - La función elimina cualquier segmento de idioma existente de la URL antes de generar los mapeos multilingües.

- **Idioma Predeterminado:**

  - Cuando `prefixDefault` es `false`, la función no prefija la URL para el idioma predeterminado.

- **Idiomas No Admitidos:**
  - Solo se consideran los idiomas proporcionados en el array `locales` para generar las URLs.

---

## Uso en Aplicaciones:

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es crítico para asegurar que el idioma correcto se muestre. A continuación se muestra un ejemplo de cómo `getMultilingualUrls` puede ser utilizado en una configuración de aplicación:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para idiomas admitidos y idioma predeterminado
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

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas admitidos y use `ENGLISH` como el idioma de reserva.

Utilizando esta configuración, la función `getMultilingualUrls` puede generar dinámicamente mapeos de URL multilingües en función de los idiomas admitidos de la aplicación:

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
