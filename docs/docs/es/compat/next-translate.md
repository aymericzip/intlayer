---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Next Translate a Intlayer"
description: "Aprende cómo migrar tu aplicación Next.js desde next-translate a Intlayer usando el adaptador de compatibilidad."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de Next Translate a Intlayer

Migrar de `next-translate` a Intlayer es un reemplazo casi directo que retiene tu sintaxis y etiquetas existentes.

## Qué hacer

Inicializa Intlayer en tu proyecto:

```bash
npx intlayer init
```

El CLI generará tu configuración. Luego, puedes aplicar el plugin de Intlayer en tu `next.config.ts`, el cual inyecta aliases de subpaths en tiempo de compilación mapeando `next-translate/useTranslation` a `@intlayer/next-translate`.

## Qué hace bajo el capó

`next-translate` proporciona hooks como `useTranslation('ns')`, `t('ns:key.path')`, y el componente `<Trans>`.

Bajo el capó:

- **Interpolación y plurales:** Se basa estrechamente en el comportamiento del adaptador `react-i18next`. Se manejan dinámicamente son los placeholders `{{var}}` y la pluralización mapeada desde sufijos como `key_0`, `key_one` y `key_other`.
- **Componente `<Trans>`:** Directamente soportado para análisis de etiquetas tipo HTML junto con una prop `components` basada en arrays.
- **Namespaces:** Los aliases de subpaths aseguran que tus referencias de `useTranslation` apunten a los namespaces de diccionarios internos correctos sin modificación manual.
