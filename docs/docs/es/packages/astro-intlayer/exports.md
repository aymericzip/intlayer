---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete astro-intlayer
description: Integración de Astro para Intlayer, proporcionando configuración para el enrutamiento basado en locales y la gestión de diccionarios.
keywords:
  - astro-intlayer
  - astro
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete astro-intlayer

El paquete `astro-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Astro. Configura el enrutamiento basado en locales y la gestión de diccionarios.

## Instalación

```bash
npm install astro-intlayer
```

## Exportaciones

### Integración

El paquete `astro-intlayer` proporciona una integración para Astro para configurar Intlayer en tu proyecto.

Importar:

```tsx
import "astro-intlayer";
```

o agregándolo a `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Función    | Descripción                                                 |
| ---------- | ----------------------------------------------------------- |
| `intlayer` | Integración de Astro que configura Intlayer en tu proyecto. |
