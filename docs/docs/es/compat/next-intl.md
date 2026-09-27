---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: adaptador de compatibilidad para next-intl"
description: "Conserva tu código de next-intl y sírvelo con Intlayer: instala @intlayer/next-intl, redirige los imports y descubre qué cambia el adaptador internamente."
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

# @intlayer/next-intl: adaptador de compatibilidad para next-intl

Para un tutorial completo y detallado paso a paso, por favor consulta nuestra [Guía Completa de Migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md).

- [Guía Completa de Migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md)

Migrar de `next-intl` a Intlayer te permite mantener tu enrutamiento y sintaxis de aplicación completamente sin perturbaciones.

## Qué hacer

Ejecuta el siguiente comando en tu repositorio:

```bash
npx intlayer init --interactive
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

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
