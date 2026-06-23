---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación de la función usePathname | vue-intlayer
description: Aprenda cómo usar la función usePathname del paquete vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalización
  - Documentación
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Agregar utilidad usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicializar historial"
author: aymericzip
---

# Integración con Vue: Documentación de `usePathname`

La función `usePathname` devuelve la ruta actual (pathname) del navegador con el segmento de la locale eliminado, como un `ComputedRef<string>` de Vue. Es útil para construir navegación con conocimiento de la locale — por ejemplo, para determinar qué elemento de navegación está activo — sin tener que eliminar el prefijo de la locale manualmente.

## Importar `usePathname` en Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Visión General

`usePathname` crea una referencia calculada (computed ref) de Vue que lee `window.location.pathname`, elimina el prefijo de la locale mediante `getPathWithoutLocale` y actualiza su valor cada vez que el navegador dispara un evento `popstate` (navegación atrás/adelante). El valor se puede usar directamente en los templates de Vue o funciones setup.

## Uso

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Valor de Retorno

| Tipo                  | Descripción                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Referencia calculada de Vue que contiene el pathname actual sin el prefijo de la locale. |

## Comportamiento

- **Eliminación de Locale**: Remueve el segmento inicial de locale (ej. `/es/dashboard` → `/dashboard`).
- **Reactivo**: Actualiza su valor en cada evento `popstate` (navegación atrás / adelante en el navegador).
- **Seguro en SSR**: Devuelve `""` cuando `window` no está disponible.
- **Limpieza (Cleanup)**: El event listener de `popstate` se añade de manera global al inicializar y por lo general no requiere limpieza manual por componente, gracias a cómo Vue maneja el ciclo de vida.

## Ejemplo

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Panel de control" },
  { href: "/settings", label: "Ajustes" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vue-intlayer/useLocale.md) — locale actual + selector de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md) — la utilidad subyacente que usa este composable
