---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de React Intl a Intlayer"
description: "Aprende cómo migrar tu aplicación React desde react-intl a Intlayer usando el adaptador de compatibilidad."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de React Intl a Intlayer

Si tu aplicación React usa `react-intl` (FormatJS), hacer la transición a Intlayer es muy fácil. Nuestra capa de compatibilidad maneja sin problemas ICU MessageFormat y todos los componentes `Formatted*` existentes.

## Qué hacer

Comienza ejecutando el comando de inicialización en tu proyecto:

```bash
npx intlayer init
```

Luego, configura el plugin de Vite o Next.js de Intlayer en tu configuración. Este plugin inyecta aliases en tiempo de compilación para redireccionara importaciones de `react-intl` a `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Qué hace bajo el capó

El plugin del empaquetador asigna `react-intl` a `@intlayer/react-intl`. En lugar de analizar manualmente grandes archivos JSON y envolver tu aplicación en un `IntlProvider`, el plugin de Intlayer extrae estáticamente claves y usa diccionarios de Intlayer en tiempo de ejecución.

Bajo el capó:

- **ICU MessageFormat:** Intlayer utiliza el resolvedor `resolveMessage(..., 'icu')` que soporta completamente pluralización ICU, selección, formateo de fechas/números y etiquetas de texto rico nativamente.
- **Llamadores de método y JSX:** `intl.formatMessage({ id: 'a.b' })` y `<FormattedMessage id="a.b">` son identificados por los plugins del compilador de Intlayer (`@intlayer/babel` / `@intlayer/swc`), convirtiendo claves con puntos planos para que el primer segmento se resuelva correctamente a la clave del diccionario de Intlayer.
- **Formateadores:** `<FormattedNumber>`, `<FormattedDate>`, etc., se puenten a los `core/formatters` nativos usando `Intl`.
