---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de NGX-Translate a Intlayer"
description: "Aprende cómo migrar tu aplicación Angular desde ngx-translate a Intlayer usando el adaptador de compatibilidad."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de NGX-Translate a Intlayer

Migrar tu aplicación Angular desde `ngx-translate` a Intlayer es fácil con el adaptador de compatibilidad, permitiéndote evitar la necesidad de reescribir todas tus plantillas.

## Qué hacer

Comienza ejecutando:

```bash
npx intlayer init
```

Esto configura `intlayer.config.ts`. Reemplaza tus configuraciones `TranslateModule.forRoot()` e importa alias apropiadamente para apuntar a `@intlayer/ngx-translate`.

## Qué hace bajo el capó

`ngx-translate` utiliza `TranslateService` (`instant`, `get`, `stream`) junto con el pipe `{{ 'KEY' | translate:params }}` y la directiva `[translate]`.

Bajo el capó:

- **Servicios:** `TranslateService` envuelve `getIntlayer` y un observable de locale, proporcionando exactamente los mismos métodos.
- **Pipes y directivas:** Reimplementados para resolver directamente contra diccionarios de Intlayer.
- **Cargadores:** Las configuraciones de `TranslateHttpLoader` se convierten en stubs de advertencia porque Intlayer inherentemente resuelve y agrupa tus diccionarios en tiempo de compilación (o a través de importaciones dinámicas estándar), eliminando completamente la necesidad de cargadores HTTP.
