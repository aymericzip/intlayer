---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentación del Hook useRewriteURL
description: Hook específico de React para gestionar reescrituras de URL localizadas en Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

El hook `useRewriteURL` está diseñado para gestionar reescrituras de URL localizadas en el lado del cliente. Detecta automáticamente si la URL actual debe corregirse a una versión localizada "pretty" en función de la configuración regional del usuario y de las reglas de reescritura definidas en `intlayer.config.ts`.

A diferencia de la navegación estándar, este hook utiliza `window.history.replaceState` para actualizar la URL en la barra de direcciones sin desencadenar una recarga completa de la página ni un ciclo de navegación del router.

## Uso

Simplemente llama al hook en un componente del lado del cliente.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Corrige automáticamente /fr/tests a /fr/essais en la barra de direcciones si existe una regla de reescritura
  useRewriteURL();

  return <div>Mi componente</div>;
};
```

## Cómo funciona

1. **Detección**: El hook supervisa el `window.location.pathname` actual y el `locale` del usuario.
2. **Coincidencia**: Usa el motor interno de Intlayer para comprobar si el pathname actual coincide con una ruta canónica que tiene un alias localizado más "pretty" para el `locale` actual.
3. **Corrección de URL**: Si se encuentra un alias mejor (y es diferente de la ruta actual), el hook llama a `window.history.replaceState` para actualizar la URL del navegador mientras conserva el mismo contenido canónico y el estado.

## ¿Por qué usarlo?

- **SEO**: Asegura que los usuarios siempre lleguen a la URL amigable, única y autorizada para un idioma determinado.
- **Consistencia**: Evita inconsistencias donde un usuario podría escribir manualmente una ruta canónica (como `/fr/privacy-notice`) en lugar de la versión localizada (`/fr/politique-de-confidentialite`).
- **Rendimiento**: Actualiza la barra de direcciones sin provocar efectos secundarios indeseados del router ni re-montados de componentes.
