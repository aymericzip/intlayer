---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentación del Composable useRewriteURL
description: Composable específico de Vue para gestionar reescrituras de URL localizadas en Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

El composable `useRewriteURL` para Vue 3 está diseñado para gestionar reescrituras de URL localizadas en el cliente. Corrige automáticamente la URL del navegador a su versión localizada "pretty" en función del locale actual del usuario y la configuración en `intlayer.config.ts`.

Funciona usando `window.history.replaceState`, lo que evita desencadenar navegaciones indeseadas del Vue Router.

## Uso

Llama al composable dentro de tu función `setup()` o en `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Corrige automáticamente /fr/tests a /fr/essais en la barra de direcciones si existe una regla de reescritura
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Cómo funciona

1. **Monitoreo reactivo**: El composable configura un `watch` sobre el `locale` del usuario.
2. **Coincidencia de reescritura**: Siempre que cambia el `locale` (o al montarse), comprueba si el `window.location.pathname` actual coincide con una ruta canónica que tenga un alias localizado más amigable.
3. **Corrección de URL**: Si se encuentra un alias más amigable, el composable llama a `window.history.replaceState` para actualizar la barra de direcciones sin recargar la página ni perder el estado del router.

## ¿Por qué usarlo?

- **Optimización SEO**: Asegura que los motores de búsqueda indexen la versión localizada autorizada de tus URLs.
- **UX mejorada**: Corrige URLs ingresadas manualmente para reflejar tu convención de nombres preferida (p. ej., `/fr/a-propos` en lugar de `/fr/about`).
- **Bajo overhead**: Actualiza la URL silenciosamente sin volver a disparar los ciclos de vida de los componentes ni los navigation guards.

---
