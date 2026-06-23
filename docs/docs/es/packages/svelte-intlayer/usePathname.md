---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación de la función usePathname | svelte-intlayer
description: Ve cómo usar la función usePathname del paquete svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Añadir utilidad usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicializar historial"
author: aymericzip
---

# Integración con Svelte: Documentación de `usePathname`

La función `usePathname` devuelve el pathname actual del navegador sin el segmento de la locale, como un store `Readable<string>` de Svelte. Es útil para construir navegación con reconocimiento de la locale — por ejemplo, para determinar qué elemento de navegación está activo — sin tener que eliminar manualmente el prefijo de la locale.

## Importar `usePathname` en Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Descripción general

`usePathname` crea un store legible de Svelte que lee `window.location.pathname`, elimina el prefijo de la locale a través de `getPathWithoutLocale`, y emite un nuevo valor cada vez que el navegador dispara un evento `popstate` (navegación atrás/adelante). Suscríbete con la sintaxis de store `$` en los componentes.

## Uso

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Valor de retorno

| Tipo               | Descripción                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `Readable<string>` | Store legible de Svelte que contiene el pathname actual sin el prefijo de la locale. |

## Comportamiento

- **Eliminación de la locale**: Elimina el segmento inicial de la locale (ej. `/es/dashboard` → `/dashboard`).
- **Reactividad**: Emite un nuevo valor en cada evento `popstate` (navegación atrás / adelante del navegador).
- **Seguro para SSR**: Devuelve `""` cuando `window` no está disponible.
- **Limpieza**: El escuchador `popstate` se elimina automáticamente cuando se da de baja el último suscriptor.

## Ejemplo

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Panel de control" },
    { href: "/settings", label: "Configuración" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/svelte-intlayer/useLocale.md) — locale actual + selector de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente utilizada por este hook
