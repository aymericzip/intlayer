---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación del Hook usePathname | next-intlayer
description: Descubre cómo usar el hook usePathname con el paquete next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Añadida utilidad usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicialización del historial"
author: aymericzip
---

# Integración Next.js: Documentación del Hook `usePathname`

El hook `usePathname` devuelve la ruta actual de Next.js habiendo eliminado el segmento de la locale. Es útil para construir navegación con consciencia de locale — por ejemplo, determinar qué elemento del menú está activo — sin tener que eliminar manualmente el prefijo de la locale.

## Importar `usePathname` en Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Descripción General

`usePathname` envuelve el hook `usePathname()` nativo de `next/navigation`, añade los parámetros de búsqueda (search params), y elimina el prefijo de la locale usando `getPathWithoutLocale`. Se actualiza en cada navegación del lado del cliente. Este hook solo está disponible en Client Components (requiere `"use client"`).

## Uso

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valor de Retorno

| Tipo     | Descripción                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| `string` | La ruta actual sin el prefijo del idioma y los parámetros de búsqueda sin el parámetro de idioma. |

## Comportamiento

- **Eliminación de la locale**: Quita el segmento inicial de locale (ej. `/es/dashboard` → `/dashboard`).
- **Eliminación del parámetro de búsqueda**: También elimina el parámetro de consulta `?locale=...` cuando se usa el modo de enrutamiento mediante search-params.
- **Reactivo**: Se actualiza en cada navegación en el lado del cliente a través de Next.js App Router.
- **Seguro en SSR**: Devuelve la ruta del lado del servidor durante el primer renderizado, y luego sincroniza los parámetros de búsqueda en el lado del cliente.

## Comparación con `useLocale`

`useLocale` de `next-intlayer` ya expone `pathWithoutLocale` en su valor de retorno. Usa `usePathname` cuando solo necesites la ruta y no la funcionalidad de cambio de locale.

```tsx codeFormat={["typescript", "esm"]}
// Cuando necesitas tanto el estado de la locale como la ruta:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Cuando solo necesitas la ruta:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Ejemplo

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/settings", label: "Ajustes" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md) — locale actual + selector de locale (también expone `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente que emplea este hook
