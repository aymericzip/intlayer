---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentación de la función getCanonicalPath | intlayer
description: Vea cómo usar la función getCanonicalPath del paquete intlayer
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentación: función `getCanonicalPath` en `intlayer`

## Descripción

La función `getCanonicalPath` resuelve una ruta URL localizada (p. ej., `/a-propos`) hacia su ruta canónica interna de la aplicación (p. ej., `/about`). Esto es esencial para que los routers emparejen la ruta interna correcta independientemente del idioma de la URL.

**Características clave:**

- Admite parámetros de rutas dinámicas usando la sintaxis `[param]`.
- Hace coincidir rutas localizadas con las reglas de reescritura personalizadas definidas en tu configuración.
- Devuelve la ruta original si no se encuentra ninguna regla de reescritura que coincida.

---

## Firma de la función

```typescript
getCanonicalPath(
  localizedPath: string,         // Requerido
  locale: Locales,               // Requerido
  rewriteRules?: RoutingConfig['rewrite'] // Opcional
): string
```

---

## Parámetros

### Parámetros requeridos

- `localizedPath: string`
  - **Descripción**: La ruta localizada tal como se ve en el navegador (p. ej., `/a-propos`).
  - **Tipo**: `string`
  - **Obligatorio**: Sí

- `locale: Locales`
  - **Descripción**: La locale utilizada para la ruta que se está resolviendo.
  - **Tipo**: `Locales`
  - **Obligatorio**: Sí

### Parámetros Opcionales

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descripción**: Un objeto que define reglas de reescritura personalizadas. Si no se proporciona, por defecto utiliza la propiedad `routing.rewrite` de la configuración de tu proyecto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Predeterminado**: `configuration.routing.rewrite`

---

## Devuelve

- **Tipo**: `string`
- **Descripción**: La ruta canónica interna.

---

## Ejemplo de uso

### Uso básico (con configuración)

Si has configurado reescrituras personalizadas en tu `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuración: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Salida: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Salida: "/about"
```

### Uso con rutas dinámicas

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuración: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Salida: "/product/123"
```

### Reglas de reescritura manuales

Puedes también pasar reglas de reescritura manuales a la función:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Salida: "/contact"
```

---

## Funciones relacionadas

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedPath.md): Resuelve una ruta canónica en su equivalente localizado.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md): Genera una URL completamente localizada (incluye protocolo, host y prefijo de locale).
