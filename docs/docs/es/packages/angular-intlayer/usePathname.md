---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación del Hook usePathname | angular-intlayer
description: Descubre cómo utilizar el hook usePathname en el paquete angular-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Integración Angular: Documentación del Hook `usePathname`

El hook `usePathname` devuelve la ruta de navegación actual del navegador con el segmento de idioma eliminado, como un `Signal<string>` de Angular. Es útil para construir navegación basada en idiomas — por ejemplo, para determinar qué elemento de navegación está activo — sin tener que eliminar manualmente el prefijo de idioma.

## Importar `usePathname` en Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Resumen

`usePathname` lee `window.location.pathname`, elimina el prefijo de idioma usando `getPathWithoutLocale` y actualiza el signal cada vez que el navegador dispara un evento `popstate` (navegación atrás/adelante). Utiliza el `DestroyRef` de Angular para limpiar automáticamente el escuchador de eventos cuando el componente es destruido.

## Uso

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Valor de retorno

| Tipo             | Descripción                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `Signal<string>` | Signal de Angular que contiene la ruta actual sin el prefijo del idioma. |

## Comportamiento

- **Eliminación del idioma**: Elimina el segmento inicial del idioma (ej. `/es/dashboard` → `/dashboard`).
- **Reactivo**: Se actualiza automáticamente en los eventos `popstate` (navegación atrás / adelante del navegador).
- **Compatible con SSR**: Devuelve `""` cuando `window` no está disponible.
- **Limpieza**: El escuchador `popstate` se elimina a través de `DestroyRef.onDestroy` cuando el componente anfitrión es destruido.

## Ejemplo

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  readonly pathname = usePathname();
}
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/angular-intlayer/exports.md) — idioma actual + selector de idiomas
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente utilizada por este hook
