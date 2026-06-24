---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de next-i18next a Intlayer"
description: "Aprende cómo migrar tu aplicación Next.js desde next-i18next a Intlayer usando el adaptador de compatibilidad."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de next-i18next a Intlayer

Para un tutorial completo y detallado paso a paso, por favor consulta nuestra [Guía Completa de Migración de next-i18next](../migration_from_next-i18next_to_intlayer.md).

Intlayer maneja todas las implementaciones de Pages Router y App Router de Next.js de forma transparente. Usar el adaptador te permite migrar tu implementación de `next-i18next` sin reescritura de código.

## Qué hacer

Para comenzar, ejecuta:

```bash
npx intlayer init
```

Esto crea el archivo de configuración requerido de Intlayer. Para cambiar a Intlayer tras bastidores, actualiza tu `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Qué hace bajo el capó

El `createNextI18nPlugin` compone el comportamiento nativo de Next.js junto con el plugin principal `next-intlayer`, inyectando todos los alias requeridos de Webpack/Turbopack para `next-i18next`, `react-i18next` e `i18next`.

Bajo el capó:

- **`serverSideTranslations` y `appWithTranslation`:** Ahora funcionan como envoltorios para los cargadores internos de Intlayer, evitando la inyección estática de JSON grande.
- **Hooks del cliente:** Delegan inmediatamente a `@intlayer/react-i18next` reteniendo todas las características de formateo, plurales y namespace anidados.
