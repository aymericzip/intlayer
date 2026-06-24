---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de next-intl a Intlayer"
description: "Aprende cómo migrar tu aplicación Next.js desde next-intl a Intlayer usando el adaptador de compatibilidad."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de next-intl a Intlayer

Para un tutorial completo y detallado paso a paso, por favor consulta nuestra [Guía Completa de Migración de next-intl](../migration_from_next-intl_to_intlayer.md).

Migrar de `next-intl` a Intlayer te permite mantener tu enrutamiento y sintaxis de aplicación completamente sin perturbaciones.

## Qué hacer

Ejecuta el siguiente comando en tu repositorio:

```bash
npx intlayer init
```

Esto creará un `intlayer.config.ts`. En tu `next.config.ts`, usa el wrapper del plugin para inyectar sin problemas los aliases de `next-intl` hacia `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Qué hace bajo el capó

El wrapper del plugin `@intlayer/next-intl` proporciona alias automáticos que redireccionan todas las importaciones de `next-intl` a `@intlayer/next-intl` durante la compilación.

Bajo el capó:

- **Routing:** El enrutamiento dinámico basado en locale basado en segmentos de `[locale]` continúa funcionando exactamente como lo hacía con `next-intl`, pero ahora las traducciones se sirven desde diccionarios de Intlayer.
- **`useTranslations`:** Se reimplementa para devolver una función tipada que se vincula automáticamente a tus diccionarios de Intlayer.
- **`getTranslations`:** En funciones del servidor, obtiene acceso tipado a contenido de Intlayer sin hacer solicitudes de red.
- **Middleware:** Intlayer proporciona un middleware de routing automático que reconoce locales y gestiona redirecciones.

Tu aplicación mantiene la misma estructura y sintaxis, pero ahora con el poder de Intlayer dirigiendo las traducciones.
