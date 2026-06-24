---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Transloco a Intlayer"
description: "Aprende cómo migrar tu aplicación Angular desde Transloco a Intlayer usando el adaptador de compatibilidad."
keywords:
  - transloco
  - angular
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de Transloco a Intlayer

Si tu aplicación Angular actualmente usa `@jsverse/transloco`, puedes migrar a Intlayer usando nuestro adaptador de compatibilidad. Esta transición te permite mantener tu sintaxis de plantilla existente mientras utilizas la poderosa estructura de diccionarios de Intlayer.

## Qué hacer

Simplemente ejecuta el comando de inicialización en tu proyecto:

```bash
npx intlayer init
```

Esto generará la configuración necesaria de `intlayer.config.ts`. Entonces reemplazarás tus importaciones de Transloco con módulos de `@intlayer/transloco` o confiarás en los aliases de compilación.

## Qué hace bajo el capó

Transloco utiliza scopes y un `TranslocoService` (`translate`, `selectTranslate`), junto con directivas estructurales (`*transloco="let t"`) y pipes (`| transloco`).

Bajo el capó:

- **Scopes:** Se asignan naturalmente a claves de diccionarios de Intlayer, proporcionando una gran historia de poda para optimización de bundle.
- **Servicio y directivas:** El adaptador de Angular de Intlayer reemplaza sin problemas los proveedores, permitiendo que tus pipes y directivas de plantilla existentes resuelvan cadenas contra diccionarios de Intlayer.
- **Análisis en tiempo de compilación:** El analizador de TypeScript reconoce llamadas `instant/get`, y la poda de fallback asegura correctitud incluso cuando el uso de plantilla no es estáticamente rastreable.
