---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de react-i18next a Intlayer"
description: "Aprende cómo migrar tu aplicación React desde react-i18next a Intlayer usando el adaptador de compatibilidad."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de react-i18next a Intlayer

Para un tutorial completo y detallado paso a paso, por favor consulta nuestra [Guía Completa de Migración de react-i18next](../migration_from_react-i18next_to_intlayer.md).

Usar el adaptador de compatibilidad de Intlayer te permite migrar desde `react-i18next` sin ningún cambio en las importaciones de tu código fuente.

## Qué hacer

Para inicializar el proyecto, ejecuta:

```bash
npx intlayer init
```

Durante la inicialización, Intlayer instalará `@intlayer/react-i18next` y creará `intlayer.config.ts`. En tu empaquetador (como Vite), aplica el plugin de Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Qué hace bajo el capó

El `reactI18nextVitePlugin` envuelve el plugin principal `vite-intlayer` e inyecta alias de resolución para `react-i18next` e `i18next`, redireccionándolos a `@intlayer/react-i18next` y `@intlayer/i18next`.

Bajo el capó:

- **`useTranslation` y `withTranslation`:** Reescritos para usar hooks nativos de Intlayer, dándote finalización automática de TypeScript para tus claves de diccionario. Soporta sin problemas namespaces (p. ej. `t('namespace:key')`).
- **Plurales y contexto:** Maneja la pluralización basada en sufijos de i18next (`key_one`, `key_other`) usando `Intl.PluralRules` nativo y sufijos de contexto (`key_male`).
- **Componente `<Trans>`:** Reimplementado para soportar la prop `components`, formularios de objeto y array, y etiquetas numeradas `<1>...</1>` directamente mapeadas a tus nodos React.
- **Instancia de `i18n`:** Resuelve claves directamente desde Intlayer sin buscar archivos JSON grandes, resultando en tamaños de bundle significativamente menores.
