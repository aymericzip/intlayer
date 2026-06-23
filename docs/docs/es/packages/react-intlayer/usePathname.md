---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentación del Hook usePathname | react-intlayer
description: Aprende a usar el hook usePathname del paquete react-intlayer para obtener la ruta (pathname) actual de la URL sin el segmento del idioma.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internacionalización
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Añadir la utilidad usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicializar historial"
author: aymericzip
---

# Integración con React: Documentación del Hook `usePathname`

El hook `usePathname` de `react-intlayer` devuelve la ruta (pathname) actual del navegador eliminando el segmento del idioma (locale). Se basa en la propiedad nativa `window.location.pathname` y reacciona a los eventos de navegación del navegador a través de `popstate`.

## Importar `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Resumen

A diferencia de los hooks de enrutamiento específicos de un framework (como los de `next-intlayer` o `react-router`), este hook es una solución ligera e independiente de cualquier framework para aplicaciones React puras. Extrae la URL actual y elimina cualquier prefijo de idioma coincidente (por ejemplo, `/es/about` se convierte en `/about`).

## Uso

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Inicio
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Acerca de
      </a>
    </nav>
  );
};

export default Navigation;
```

## Valor de Retorno

| Tipo     | Descripción                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| `string` | La ruta (pathname) actual del navegador con el prefijo de idioma eliminado (ej: `/es/dashboard` → `/dashboard`). |

## Comportamiento

- **Eliminación del Locale**: Utiliza la utilidad `getPathWithoutLocale` internamente para detectar y eliminar automáticamente el idioma de la ruta basándose en la configuración de Intlayer de la aplicación.
- **Reactividad**: Escucha el evento `popstate`. Cuando el usuario navega usando los botones de atrás/adelante del navegador o cuando se llama a `pushState`/`replaceState`, el hook actualiza la ruta devuelta.
- **Fallback SSR**: En el servidor (donde `window` no está definido), devuelve `/` por defecto ya que no tiene acceso a la URL de la solicitud de forma predeterminada en un contexto de React puro.

## Documentación Relacionada

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md)
