---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación del Hook usePathname | solid-intlayer
description: Vea cómo utilizar el hook usePathname en el paquete solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Añadir utilidad usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Integración con Solid: Documentación del Hook `usePathname`

El hook `usePathname` devuelve el pathname del navegador actual eliminando el segmento de locale, en forma de `Accessor<string>` en Solid. Es útil para la navegación basada en locale — por ejemplo, determinar qué elemento de navegación está activo — sin tener que eliminar manualmente el prefijo de locale.

## Importando `usePathname` en Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Descripción general

`usePathname` crea una señal reactiva inicializada desde `window.location.pathname`, elimina el prefijo de locale a través de `getPathWithoutLocale` y actualiza la señal cada vez que el navegador dispara un evento `popstate` (navegación atrás/adelante). El listener del evento se limpia automáticamente a través de `onCleanup`.

## Uso

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valor de retorno

| Tipo               | Descripción                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor de Solid (getter reactivo) que devuelve el pathname actual sin el prefijo del locale. |

## Comportamiento

- **Eliminación del locale**: Elimina el segmento inicial de locale (ej. `/es/dashboard` → `/dashboard`).
- **Reactivo**: Se actualiza automáticamente en los eventos `popstate` (navegación hacia atrás/adelante en el navegador).
- **Seguro para SSR**: Devuelve `""` cuando `window` no está disponible.
- **Limpieza (Cleanup)**: El listener `popstate` se elimina automáticamente mediante `onCleanup` de Solid.

## Ejemplo

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Ajustes" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md) — locale actual + cambiador de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente que utiliza este hook
