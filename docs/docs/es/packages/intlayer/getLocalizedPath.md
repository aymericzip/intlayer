---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentación de la función getLocalizedPath | intlayer
description: Vea cómo usar la función getLocalizedPath del paquete intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implementadas reescrituras de URL personalizadas"
author: aymericzip
---

# Documentación: Función `getLocalizedPath` de `intlayer`

## Descripción

La función `getLocalizedPath` resuelve una ruta canónica (ruta interna de la aplicación) en su equivalente localizado según el locale proporcionado y las reglas de reescritura. Es especialmente útil para generar URLs optimizadas para SEO que varían según el idioma.

Es el equivalente relativo de [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md) — para una entrada relativa ambos devuelven el mismo valor. A diferencia de `getLocalizedUrl`, nunca devuelve una URL absoluta: la configuración de `domains` se ignora, por lo que una locale servida desde su propio dominio sigue produciendo una ruta. Se acepta una entrada absoluta, pero su origen se descarta — solo se conservan su ruta, query string y hash.

**Características clave:**

- Soporta parámetros de ruta dinámicos usando la sintaxis `[param]`.
- Resuelve rutas de acuerdo con reglas de reescritura personalizadas definidas en tu configuración.
- Maneja automáticamente la caída (fallback) a la ruta canónica si no se encuentra una regla de reescritura para el locale especificado.

---

## Firma de la función

```typescript
getLocalizedPath(
  canonicalPath: string,         // Requerido
  locale: Locales,               // Requerido
  rewriteRules?: RoutingConfig['rewrite'] // Opcional
): string
```

---

## Parámetros

### Parámetros obligatorios

- `canonicalPath: string`
  - **Descripción**: La ruta interna de la aplicación (p. ej., `/about`, `/product/[id]`).
  - **Tipo**: `string`
  - **Obligatorio**: Sí

### Parámetros opcionales

- `locale?: Locales`
  - **Description**: La locale objetivo para la cual la ruta debe localizarse.
  - **Type**: `Locales`
  - **Default**: La locale predeterminada de la configuración de tu proyecto.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descripción**: Un objeto que define reglas de reescritura personalizadas. Si no se proporciona, por defecto usa la propiedad `routing.rewrite` de la configuración de tu proyecto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Predeterminado**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — locales soportados. **Default**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — la locale por defecto. **Default**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — cómo aparece la locale en la ruta. **Default**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — reglas de reescritura personalizadas. **Default**: `configuration.routing.rewrite`

---

## Devuelve

- **Tipo**: `string`
- **Descripción**: La ruta localizada para la locale especificada.

El tipo se reduce a partir de las reglas de reescritura declaradas en tu configuración, por lo que el editor muestra la ruta resuelta en lugar de un simple `string`:

```typescript codeFormat="typescript"
// Configuración: modo 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (ninguna regla de reescritura coincide, solo se aplica el prefijo)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

El mismo estrechamiento fluye hacia [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md), que aplica las reglas de reescritura antes de añadir el prefijo de la configuración regional.

Dos casos se mantienen ampliados a `string`, porque no pueden resolverse en tiempo de compilación:

- una ruta que no es un literal de string (por ejemplo, una construida a partir de una variable);
- una ruta coincidente con una regla que utiliza un parámetro de múltiples segmentos u opcional (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Ejemplo de uso

### Uso básico (con configuración)

Si has configurado reescrituras personalizadas en tu `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuración: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Salida: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Salida: "/about"
```

### Uso con rutas dinámicas

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuración: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Salida: "/produit/123"
```

### Reglas de reescritura manuales

Puedes también pasar reglas de reescritura manuales a la función:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Salida: "/contactez-nous"
```

### Omitiendo la Configuración Regional

Cuando no se proporciona una configuración regional, la ruta se localiza para la configuración regional predeterminada configurada:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuración: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Salida: "/about"
```

---

## Funciones relacionadas

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getCanonicalPath.md): Resuelve una ruta localizada de vuelta a su ruta canónica interna.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md): Genera una URL totalmente localizada (incluyendo protocolo, host y prefijo de idioma).
