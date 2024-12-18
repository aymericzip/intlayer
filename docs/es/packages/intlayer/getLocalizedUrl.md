# Documentación: `getLocalizedUrl` Función en `intlayer`

## Descripción:

La función `getLocalizedUrl` genera una URL localizada al prefijar la URL dada con el locale especificado. Maneja tanto URLs absolutas como relativas, asegurando que el prefijo de locale correcto se aplique según la configuración.

---

## Parámetros:

- `url: string`

  - **Descripción**: La cadena de URL original que se debe prefijar con un locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descripción**: El locale actual para el cual se está localizando la URL.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descripción**: Array opcional de locales soportados. Por defecto, se proporcionan los locales configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descripción**: El locale predeterminado para la aplicación. Por defecto, se proporciona el locale predeterminado configurado en el proyecto.
  - **Tipo**: `Locales`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descripción**: Si se debe prefijar la URL para el locale predeterminado. Por defecto, se proporciona el valor configurado en el proyecto.
  - **Tipo**: `boolean`
  - **Predeterminado**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md#middleware)

### Retorna:

- **Tipo**: `string`
- **Descripción**: La URL localizada para el locale especificado.

---

## Ejemplo de Uso:

### URLs Relativas:

```typescript
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

### URLs Absolutas:

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

### Locale No Soportado:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Actual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Soportados
  Locales.ENGLISH // Locale Predeterminado
); // Salida: "/about" (sin prefijo aplicado para locale no soportado)
```

---

## Casos Límite:

- **Sin Segmento de Locale:**

  - Si la URL no contiene ningún segmento de locale, la función añade de forma segura el locale apropiado.

- **Locale Predeterminado:**

  - Cuando `prefixDefault` es `false`, la función no añade un prefijo a la URL para el locale predeterminado.

- **Locales No Soportados:**
  - Para locales no listados en `locales`, la función no aplica ningún prefijo.

---

## Uso en Aplicaciones:

En una aplicación multilingüe, configurar la internacionalización con `locales` y `defaultLocale` es crítico para asegurar que se muestra el idioma correcto. A continuación se muestra un ejemplo de cómo `getLocalizedUrl` se puede utilizar en la configuración de una aplicación:

```tsx
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

La configuración anterior asegura que la aplicación reconozca `ENGLISH`, `FRENCH` y `SPANISH` como idiomas soportados y use `ENGLISH` como el idioma de reserva.

Usando esta configuración, la función `getLocalizedUrl` puede generar URLs localizadas dinámicamente basadas en la preferencia de idioma del usuario:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Salida: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Salida: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Salida: "/about"
```

Al integrar `getLocalizedUrl`, los desarrolladores pueden mantener estructuras URL consistentes en múltiples idiomas, mejorando tanto la experiencia del usuario como el SEO.
