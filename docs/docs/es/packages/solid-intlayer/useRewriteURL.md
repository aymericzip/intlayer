---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentación del hook useRewriteURL
description: Hook específico de Solid para gestionar reescrituras de URL localizadas en Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

El hook `useRewriteURL` para SolidJS está diseñado para gestionar reescrituras de URL localizadas en el lado del cliente. Corrige automáticamente la URL del navegador a su versión localizada "bonita" basada en la locale actual y la configuración en `intlayer.config.ts`.

Al usar `window.history.replaceState`, evita navegaciones redundantes del Solid Router.

## Uso

Llama al hook desde un componente que forme parte de tu aplicación.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Corrige automáticamente /fr/tests a /fr/essais en la barra de direcciones si existe una regla de reescritura
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Cómo funciona

1. **Detección**: El hook usa `createEffect` para vigilar cambios en la señal reactiva `locale()`.
2. **Coincidencia**: Identifica si el `window.location.pathname` actual corresponde a una ruta canónica que tenga un alias localizado más amigable para el idioma actual.
3. **Corrección de URL**: Si se encuentra un alias más amigable, el hook llama a `window.history.replaceState` para actualizar la barra de direcciones sin afectar el estado de navegación interno ni provocar re-renderizados de componentes.

## ¿Por qué usarlo?

/// **URLs canónicas**: Impone una única URL para cada versión localizada de tu contenido, lo cual es crucial para el SEO.

- **Conveniencia para desarrolladores**: Te permite mantener las definiciones internas de rutas canónicas a la vez que expones rutas localizadas y amigables para el usuario al mundo exterior.
- **Consistencia**: Corrige las URLs cuando los usuarios escriben manualmente una ruta que no sigue tus reglas de localización preferidas.

---
