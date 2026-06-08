---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentación del Hook useRewriteURL
description: Hook específico para Next.js para gestionar reescrituras de URL localizadas en Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

El hook `useRewriteURL` para Next.js es un hook del lado del cliente que gestiona automáticamente las reescrituras de URL localizadas. Asegura que la URL del navegador siempre refleje la ruta localizada "amigable" definida en tu `intlayer.config.ts`, incluso si el usuario introduce manualmente una ruta canónica con un prefijo de locale.

Este hook funciona de forma silenciosa usando `window.history.replaceState`, evitando navegaciones redundantes del enrutador de Next.js o recargas de página.

## Uso

Simplemente llama al hook en un Componente cliente que forme parte de tu layout.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Corrige automáticamente /fr/privacy-notice a /fr/politique-de-confidentialite en la barra de direcciones
  useRewriteURL();

  return null;
};
```

## Cómo funciona

1. **Monitorización de la ruta**: El hook escucha los cambios en el `locale` del usuario.
2. **Detección de reescrituras**: Comprueba el `window.location.pathname` actual frente a las reglas de reescritura en tu configuración.
3. **Corrección de la URL**: Si se encuentra un alias localizado más "bonito" para la ruta actual, el hook dispara un `window.history.replaceState` para actualizar la barra de direcciones manteniendo al usuario en la misma página interna.

## ¿Por qué usarlo en Next.js?

Mientras el `intlayerMiddleware` gestiona las reescrituras del lado del servidor y los redireccionamientos iniciales, el hook `useRewriteURL` garantiza que la URL del navegador permanezca coherente con tu estructura SEO preferida incluso después de las transiciones del lado del cliente.

- **URLs limpias**: Hace cumplir el uso de segmentos localizados como `/fr/essais` en lugar de `/fr/tests`.
- **Rendimiento**: Actualiza la barra de direcciones sin desencadenar un ciclo completo del enrutador ni volver a solicitar datos.
- **Alineación con SEO**: Evita problemas de contenido duplicado asegurando que solo una versión de la URL sea visible para el usuario y los bots de los motores de búsqueda.
