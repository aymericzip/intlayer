---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Documentación de la función getPrefix | intlayer
description: Vea cómo usar la función getPrefix para el paquete intlayer
keywords:
  - getPrefix
  - prefijo
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Documentación inicial
---

# Documentación: Función `getPrefix` en `intlayer`

## Descripción

La función `getPrefix` determina el prefijo de URL para un locale dado basado en la configuración del modo de enrutamiento. Compara el locale con el locale por defecto y devuelve un objeto que contiene tres formatos diferentes de prefijo para una construcción flexible de URLs.

**Características clave:**

- Toma un locale como primer parámetro (requerido)
- Objeto `options` opcional con `defaultLocale` y `mode`
- Devuelve un objeto con las propiedades `prefix` y `localePrefix`
- Soporta todos los modos de enrutamiento: `prefix-no-default`, `prefix-all`, `no-prefix` y `search-params`
- Utilidad ligera para determinar cuándo agregar prefijos de locale

---

## Firma de la función

```typescript
getPrefix(
  locale: Locales,               // Requerido
  options?: {                    // Opcional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // p. ej., 'fr/' o ''
  localePrefix?: Locale; // p. ej., 'fr' o undefined
}
```

---

## Parámetros

- `locale: Locales`
  - **Descripción**: El locale para el cual se generará el prefijo. Si el valor es falsy (undefined, null, cadena vacía), la función devuelve una cadena vacía.
  - **Tipo**: `Locales`
  - **Requerido**: Sí

- `options?: object`
  - **Descripción**: Objeto de configuración para la determinación del prefijo.
  - **Tipo**: `object`
  - **Requerido**: No (Opcional)

  - `options.defaultLocale?: Locales`
    - **Descripción**: El locale por defecto para la aplicación. Si no se proporciona, se usa el locale por defecto configurado en la configuración de tu proyecto.
    - **Tipo**: `Locales`
    - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Descripción**: El modo de enrutamiento de URL para el manejo del locale. Si no se proporciona, usa el modo configurado en la configuración de tu proyecto.
    - **Tipo**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Por defecto**: [`Configuración del Proyecto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#middleware)
    - **Modos**:
      - `prefix-no-default`: Devuelve cadenas vacías cuando el locale coincide con el locale por defecto
      - `prefix-all`: Devuelve prefijo para todos los locales incluyendo el por defecto
      - `no-prefix`: Devuelve cadenas vacías (sin prefijo en las URLs)
      - `search-params`: Devuelve cadenas vacías (locale en parámetros de consulta)

### Retorna

- **Tipo**: `GetPrefixResult`
- **Descripción**: Un objeto que contiene tres formatos diferentes de prefijo:
  - `prefix`: El prefijo de la ruta con barra diagonal al final (por ejemplo, `'fr/'`, `''`)
  - `localePrefix`: El identificador del locale sin barras diagonales (por ejemplo, `'fr'`, `undefined`)

---

## Ejemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Verificar prefijo para el locale inglés
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Devuelve: { prefix: 'en/', localePrefix: 'en' }

// Verificar prefijo para el locale francés
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Devuelve: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Devuelve: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Devuelve: { prefix: '', localePrefix: undefined }
```

### Modos Diferentes de Enrutamiento

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Siempre devuelve el prefijo
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Devuelve: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: No hay prefijo cuando el locale coincide con el predeterminado
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Devuelve: { prefix: '', localePrefix: undefined }

// prefix-no-default: Devuelve el prefijo cuando el locale difiere del predeterminado
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Devuelve: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Nunca devuelve prefijo
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Devuelve: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Devuelve: { prefix: '', localePrefix: undefined }
```

### Ejemplo Práctico

```typescript
import { getPrefix, Locales } from "intlayer";

// Construir URLs con el prefijo apropiado para un locale específico
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Usando prefix para la construcción de rutas
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Resultado: "/fr/about"

// Usando localePrefix para la identificación del locale
console.log(`Current locale: ${localePrefix}`);
// Salida: "Current locale: fr"
```

---

## Funciones Relacionadas

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md): Genera una URL localizada para un locale específico
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getMultilingualUrls.md): Genera URLs para todos los locales configurados

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // El prefijo de la ruta con barra final (ej., 'fr/' o '')
  localePrefix?: Locale; // El identificador de locale sin barras (por ejemplo, 'fr' o indefinido)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
