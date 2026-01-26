---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentación del hook useRewriteURL
description: Hook específico de Svelte para gestionar reescrituras de URL localizadas en Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

El hook `useRewriteURL` para Svelte está diseñado para gestionar reescrituras de URL localizadas en el lado del cliente. Corrige automáticamente la URL del navegador a su versión localizada "pretty" basándose en la locale actual y la configuración en `intlayer.config.ts`.

Actualiza la URL de forma silenciosa usando `window.history.replaceState`, evitando navegaciones completas de SvelteKit.

## Uso

Invoca el hook desde un componente Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Corrige automáticamente /fr/tests a /fr/essais en la barra de direcciones si existe una regla de reescritura
  useRewriteURL();
</script>

<slot />
```

## Cómo funciona

1. **Actualizaciones reactivas**: El hook se suscribe al store `locale` de Intlayer.
2. **Detección**: Siempre que cambia la locale (o al montar), calcula si el `window.location.pathname` actual tiene un alias localizado más 'bonito' definido en tus reglas de reescritura.
3. **Corrección de URL**: Si se encuentra una ruta más 'bonita', el hook llama a `window.history.replaceState` para actualizar la barra de direcciones sin recargar la página por completo ni disparar la lógica de navegación de SvelteKit.

## ¿Por qué usarlo?

- **Buenas prácticas de SEO**: Asegura que los motores de búsqueda indexen únicamente la versión localizada y más 'bonita' de tus URLs.
- **Mejor UX**: Corrige las URLs introducidas manualmente para reflejar la estructura de nombres que prefieras.
- **Actualizaciones silenciosas**: Modifica la barra de direcciones sin afectar el árbol de componentes ni el historial de navegación.
