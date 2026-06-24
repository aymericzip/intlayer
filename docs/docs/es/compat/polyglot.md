---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Polyglot.js a Intlayer"
description: "Aprende cómo migrar desde Polyglot.js a Intlayer usando el adaptador de compatibilidad."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de Polyglot.js a Intlayer

Si estás usando Polyglot.js de Airbnb, migrar a Intlayer es extremadamente fácil usando la capa de compatibilidad.

## Qué hacer

Simplemente ejecuta el comando de inicialización en tu proyecto:

```bash
npx intlayer init
```

Esto genera `intlayer.config.ts`. Luego puedes utilizar el alias del plugin del empaquetador para redireccionara transparentemente importaciones de Polyglot a `@intlayer/polyglot`.

## Qué hace bajo el capó

La sintaxis de Polyglot.js típicamente se basa en `polyglot.t('key', {name})` con interpolaciones `%{name}` y plurales `smart_count` separados por `"singular |||| plural"`.

Bajo el capó:

- **Interpolación:** La capa de compatibilidad maneja placeholders `%{var}` nativamente.
- **Plurales:** La cadena se divide en `||||` y se evalúa contra `Intl.PluralRules` nativo según el locale activo, reflejando el propio orden de bucket de Polyglot por locale.
- **Diccionarios:** Evitas la necesidad de proporcionar enormes configuraciones de JSON a `new Polyglot()` – Intlayer maneja los diccionarios dinámicamente y los poda automáticamente.
