---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Lingui a Intlayer"
description: "Aprende cómo migrar tu aplicación desde Lingui a Intlayer usando el adaptador de compatibilidad."
keywords:
  - lingui
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de Lingui a Intlayer

Si tu proyecto actualmente se basa en la compilación basada en macros de Lingui, hacer la transición a Intlayer te permite mantener tus potentes flujos de trabajo de macros mientras los respalda nativamente con la estrategia de compilación JSON de Intlayer.

## Qué hacer

Para comenzar, inicializa Intlayer en tu proyecto:

```bash
npx intlayer init
```

Esto crea tu `intlayer.config.ts`. Asegúrate de retener `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` en tu paso de compilación para ejecutarse _antes_ del compilador de Intlayer. Luego, utiliza el alias del plugin del empaquetador para enrutar `@lingui/core` y `@lingui/react` a `@intlayer/lingui`.

## Qué hace bajo el capó

Lingui utiliza macros (como `` t`Hello ${name}` `` y `<Trans>`) que se compilan en llamadas de runtime como `i18n._(id, values)`.

Bajo el capó:

- **Macros:** Se compilan exactamente como lo hacían antes, asegurando sin perturbación en tu sintaxis fuente.
- **Traducción de runtime:** El `i18n._()` asignado utiliza diccionarios de Intlayer. Tanto los IDs nombrados explícitamente como los IDs con hash se asignan completamente utilizando los plugins de sincronización `.po` de Intlayer para agregar y podar claves de forma segura.
- **Capacidades ICU:** El soporte para pluralización, selección y variantes ICU sigue siendo robusto debido al analizador ICU unificado de Intlayer, asegurando salidas de renderizado idénticas.
