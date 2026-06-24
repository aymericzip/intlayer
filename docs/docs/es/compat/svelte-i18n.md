---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Svelte I18n a Intlayer"
description: "Aprende cómo migrar tu aplicación Svelte desde svelte-i18n a Intlayer usando el adaptador de compatibilidad."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de Svelte I18n a Intlayer

Mover tu aplicación Svelte desde `svelte-i18n` a Intlayer toma solo un momento usando el adaptador de compatibilidad.

## Qué hacer

Simplemente ejecuta el comando de inicialización en tu proyecto:

```bash
npx intlayer init
```

Esto genera `intlayer.config.ts`. Asegúrate de que tus plugins de SvelteKit / Vite estén envueltos con el plugin de alias de Intlayer para mapear sin problemas `svelte-i18n` a `@intlayer/svelte-i18n`.

## Qué hace bajo el capó

Svelte-i18n se basa en stores muy utilizados (`$_`, `$t`, `$format`, etc.) e ICU MessageFormat.

Bajo el capó:

- **Stores:** Intlayer proxies los stores de `svelte-i18n`. `$_` se convierte en un store derivado del locale actual que devuelve un resolvedor de Intlayer.
- **Claves:** Tus claves planas (p. ej. `$_('home.title')`) se evalúan de modo que el primer segmento de ruta representa el diccionario de Intlayer.
- **Sintaxis ICU:** Completamente manejada por el resolvedor ICU compartido (análisis equivalente de `intl-messageformat`).
- **Formateadores:** Las llamadas `$date`, `$time`, `$number` se redireccionan de forma segura a los formateadores de núcleo nativos de Intlayer.
- **Análisis Babel/SWC:** El analizador de Intlayer lee los llamadores de stores de Svelte (`$_`) dentro de tus archivos fuente `.svelte` antes de la compilación para construir automáticamente los fragmentos de diccionario relevantes.
