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
    changes: Implementadas reescrituras de URL personalizadas
---

# Documentación: Función `getLocalizedPath` de `intlayer`

## Descripción

La función `getLocalizedPath` resuelve una ruta canónica (ruta interna de la aplicación) en su equivalente localizado según el locale proporcionado y las reglas de reescritura. Es especialmente útil para generar URLs optimizadas para SEO que varían según el idioma.

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

- `locale: Locales`
  - **Descripción**: La locale objetivo para la que se debe localizar la ruta.
  - **Tipo**: `Locales`
  - **Obligatorio**: Sí

### Parámetros opcionales

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descripción**: Un objeto que define reglas de reescritura personalizadas. Si no se proporciona, por defecto usa la propiedad `routing.rewrite` de la configuración de tu proyecto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Predeterminado**: `configuration.routing.rewrite`

---

## Devuelve

- **Tipo**: `string`
- **Descripción**: La ruta localizada para la locale especificada.

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

---

## Funciones relacionadas

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getCanonicalPath.md): Resuelve una ruta localizada de vuelta a su ruta canónica interna.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md): Genera una URL totalmente localizada (incluyendo protocolo, host y prefijo de idioma).
