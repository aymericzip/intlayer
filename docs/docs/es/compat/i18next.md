---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next: adaptador de compatibilidad para i18next"
description: "Conserva tu código de i18next y sírvelo con Intlayer: instala @intlayer/i18next, redirige los imports y descubre qué cambia el adaptador internamente."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# @intlayer/i18next: adaptador de compatibilidad para i18next

Para un tutorial detallado paso a paso, por favor consulta nuestro [Guía Completa de Migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md).

- [Guía Completa de Migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md)

Intlayer replica perfectamente las características de runtime principales de `i18next`. Al utilizar el paquete de compatibilidad, tus aplicaciones Vanilla o módulos internos pueden continuar aprovechando la sintaxis familiar.

## Qué hacer

Para comenzar, inicializa Intlayer en tu proyecto:

```bash
npx intlayer init --interactive
```

Si estás usando Vite, incluye el plugin de Intlayer para enrutar importaciones a `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Qué hace bajo el capó

El `i18nextVitePlugin` asigna importaciones de `i18next` a `@intlayer/i18next`, evitando la inflación del bundle de las inclusiones de archivos JSON.

Bajo el capó:

- **Configuración de instancia:** `createInstance` analiza correctamente y aplica fallbacks de namespace mientras aprovecha el pipeline de compilación de Intlayer para la recuperación de diccionarios.
- **Interpolación:** Soporte nativo para reemplazos de `{{name}}` y anidamiento `$t(key)` recursivamente.
- **Contexto y plurales:** Identifica y resuelve formatos de sufijo como `key_male` y `key_one`/`key_other` evaluando contra `Intl.PluralRules` estándar.
- **Objetos de retorno:** El modo `returnObjects: true` extrae de forma segura árboles de diccionarios de Intlayer.

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
