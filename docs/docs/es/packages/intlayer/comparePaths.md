---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación de la función comparePaths | intlayer
description: Descubre cómo utilizar la función comparePaths para el paquete intlayer
keywords:
  - comparePaths
  - normalizePath
  - enlace activo
  - navegación
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Documentación inicial"
author: aymericzip
---

# Documentación: Función `comparePaths` en `intlayer`

## Descripción

La función `comparePaths` compara dos URL o rutas para comprobar su igualdad mientras ignora el segmento de idioma (locale), el protocolo/dominio, la cadena de consulta (query string), el hash y las barras diagonales finales. Es la forma recomendada para determinar si un enlace de navegación apunta a la página actual —por ejemplo, para resaltar el enlace activo— sin tener que implementar tu propia lógica de normalización (propensa a errores).

Internamente reutiliza [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) para eliminar el segmento de idioma, por lo que respeta tu modo de enrutamiento y los idiomas configurados.

El paquete también exporta la utilidad subyacente [`normalizePath`](#normalizepath), que devuelve la ruta canónica independiente del idioma utilizada para la comparación.

**Características principales:**

- Comparación independiente del idioma (`/es/about` coincide con `/about`)
- Funciona con URL absolutas y rutas relativas
- Ignora la cadena de consulta, el hash y las barras diagonales finales
- Tolera la ausencia de barra oblicua inicial y valores vacíos (normalizado a `/`)
- Ligero — construido sobre `getPathWithoutLocale`

---

## Firma de la función

```typescript
comparePaths(
  pathname: string,  // Requerido
  href: string,      // Requerido
  locales?: Locales[] // Opcional
): boolean

normalizePath(
  inputUrl: string,   // Requerido
  locales?: Locales[] // Opcional
): string
```

---

## Parámetros

- `pathname: string`
  - **Descripción**: La primera cadena de URL o ruta a comparar (generalmente la ruta actual).
  - **Tipo**: `string`
  - **Requerido**: Sí

- `href: string`
  - **Descripción**: La segunda cadena de URL o ruta a comparar (generalmente el `href` de un enlace de navegación).
  - **Tipo**: `string`
  - **Requerido**: Sí

- `locales: Locales[]`
  - **Descripción**: Array opcional de idiomas soportados. Por defecto, los idiomas configurados en el proyecto.
  - **Tipo**: `Locales[]`
  - **Requerido**: No (Opcional)

### Retornos

- **Tipo**: `boolean`
- **Descripción**: `true` cuando ambas entradas se resuelven a la misma ruta independiente del idioma, de lo contrario `false`.

---

## Ejemplo de uso

### Uso básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URL absolutas y relativas

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Resaltar el enlace de navegación activo

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` devuelve la ruta canónica e independiente del idioma utilizada por `comparePaths`. Elimina el segmento de idioma, el protocolo/dominio, la cadena de consulta y el hash, asegura una única barra oblicua inicial, elimina cualquier barra diagonal final (excepto en la raíz) y usa `/` como valor predeterminado para valores vacíos.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Funciones relacionadas

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md): Elimina el segmento de idioma de una URL o ruta.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPrefix.md): Determina el prefijo de URL para un idioma dado.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md): Genera una URL localizada para un idioma específico.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
