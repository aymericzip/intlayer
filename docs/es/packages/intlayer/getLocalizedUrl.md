# Documentación: `getLocalizedUrl` Función en `intlayer`

## Descripción:

La función `getLocalizedUrl` genera una URL localizada al prefijar la URL dada con la configuración de idioma especificado. Maneja tanto URLs absolutas como relativas, asegurando que el prefijo de idioma correcto se aplique según la configuración.

---

## Parámetros:

- `url: string`

  - **Descripción**: La cadena de URL original a la que se le debe agregar un prefijo de idioma.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descripción**: El idioma actual para el cual se está localizando la URL.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descripción**: Array opcional de idiomas soportados. Por defecto, se proporcionan los idiomas configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descripción**: El idioma predeterminado para la aplicación. Por defecto, se proporciona el idioma predeterminado configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descripción**: Si se debe prefijar la URL para el idioma predeterminado. Por defecto, se proporciona el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

### Retornos:

- **Tipo**: `string`
- **Descripción**: La URL localizada para el idioma especificado.

---

## Ejemplo de Uso:

### URLs Relativas:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Salida: "/fr/about" para el idioma francés
// Salida: "/about" para el predeterminado (inglés)
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

// Salida: "/fr/about" para el idioma francés
// Salida: "/about" para el predeterminado (inglés)
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

// Salida: "/fr/about" para el idioma francés
// Salida: "/about" para el predeterminado (inglés)
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

// Salida: "/fr/about" para el idioma francés
// Salida: "/about" para el predeterminado (inglés)
```

### URLs Absolutas:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Idioma Actual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Soportados
  Locales.ENGLISH, // Idioma Predeterminado
  false // Prefijar Idioma Predeterminado
); // Salida: "https://example.com/fr/about" para el francés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Idioma Actual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Soportados
  Locales.ENGLISH, // Idioma Predeterminado
  false // Prefijar Idioma Predeterminado
); // Salida: "https://example.com/about" para el inglés

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Idioma Actual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Soportados
  Locales.ENGLISH, // Idioma Predeterminado
  true // Prefijar Idioma Predeterminado
); // Salida: "https://example.com/en/about" para el inglés
```

### Idioma No Soportado:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Idioma Actual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Soportados
  Locales.ENGLISH // Idioma Predeterminado
); // Salida: "/about" (sin prefijo aplicado para idioma no soportado)
```

---

## Casos Especiales:

- **No Segmento de Idioma:**

  - Si la URL no contiene ningún segmento de idioma, la función agrega de manera segura el idioma apropiado.

- **Idioma Predeterminado:**

  - Cuando `prefixDefault` es `false`, la función no agrega un prefijo a la URL para el idioma predeterminado.

- **Idiomas No Soportados:**
  - Para los idiomas no listados en `locales`, la función no aplica ningún prefijo.

---

## Uso en Aplicaciones:

En una aplicación multilingüe, configurar los ajustes de internacionalización con `locales` y `defaultLocale` es crucial para garantizar que se muestre el idioma correcto. A continuación se muestra un ejemplo de cómo se puede utilizar `getLocalizedUrl` en la configuración de una aplicación:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración para idiomas soportados y idioma predeterminado
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

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y utilice `ENGLISH` como idioma de reserva.

Usando esta configuración, la función `getLocalizedUrl` puede generar dinámicamente URLs localizadas basadas en la preferencia de idioma del usuario:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Salida: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Salida: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Salida: "/about"
```

Al integrar `getLocalizedUrl`, los desarrolladores pueden mantener estructuras de URL consistentes a través de múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
