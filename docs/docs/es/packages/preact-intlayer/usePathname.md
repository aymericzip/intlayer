---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación del Hook usePathname | preact-intlayer
description: Descubre cómo usar el hook usePathname con el paquete preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
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

# Integración Preact: Documentación del Hook `usePathname`

El hook `usePathname` devuelve la ruta actual del navegador habiendo eliminado el segmento de la locale. Es útil para construir navegación con consciencia de la locale — por ejemplo, para determinar qué elemento de navegación está activo — sin tener que eliminar manualmente el prefijo de la locale.

## Importar `usePathname` en Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Descripción General

`usePathname` lee `window.location.pathname`, elimina el prefijo de la locale a través de `getPathWithoutLocale` y vuelve a renderizar el componente cada vez que el navegador dispara un evento `popstate` (navegación atrás/adelante). Durante el renderizado del lado del servidor (SSR), devuelve una cadena vacía.

## Uso

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| Tipo     | Descripción                                                                                              |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `string` | La ruta actual sin el prefijo del idioma. Cadena vacía durante la renderización en el lado del servidor. |

## Comportamiento

- **Eliminación del idioma (Locale stripping)**: Quita el segmento del idioma al inicio de la URL (ej. `/es/dashboard` → `/dashboard`).
- **Reactivo**: Se actualiza automáticamente al detectar eventos `popstate` (navegación hacia atrás / adelante en el navegador).
- **Seguro para SSR**: Devuelve `""` cuando `window` no está disponible.
- **Limpieza (Cleanup)**: El detector de `popstate` se elimina automáticamente cuando el componente se desmonta.

## Ejemplo

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/settings", label: "Ajustes" },
];

const Sidebar: FunctionComponent = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/preact-intlayer/exports.md) — locale actual + selector de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente que emplea este hook
