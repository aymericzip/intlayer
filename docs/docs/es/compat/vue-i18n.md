---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/vue-i18n: adaptador de compatibilidad para vue-i18n"
description: "Conserva tu código de vue-i18n y sírvelo con Intlayer: instala @intlayer/vue-i18n, redirige los imports y descubre qué cambia el adaptador internamente."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# @intlayer/vue-i18n: adaptador de compatibilidad para vue-i18n

Si tu aplicación Vue actualmente usa `vue-i18n`, puedes migrar a Intlayer sin reescribir tus componentes ni tus hooks de traducción. Intlayer proporciona un adaptador de compatibilidad que refleja perfectamente la API de `vue-i18n` mientras aprovecha las poderosas características de Intlayer bajo el capó.

## Qué hacer

Para comenzar, simplemente ejecuta el comando de inicialización en tu proyecto:

```bash
npx intlayer init --interactive
```

Durante la inicialización, Intlayer configurará tu archivo de configuración (`intlayer.config.ts`) y preparará tu proyecto para la migración. Solo necesitarás agregar el plugin de Intlayer a tu configuración de Vite para asignar automáticamente las importaciones de `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Qué hace bajo el capó

El `vueI18nVitePlugin` inyecta un alias de módulo en tu empaquetador. Cualquier importación de `vue-i18n` en tu base de código será transparentemente redireccionada a `@intlayer/vue-i18n`.

**Bajo el capó, el adaptador maneja la sintaxis compleja de `vue-i18n` nativamente:**

- **Interpolación y plurales:** Resuelve interpolaciones `{name}` y lista `{0}`. Los plurales de tubería (`"car | cars"`) se convierten en nodos de enumeración/plural de Intlayer basados en semántica posicional.
- **Formatos:** Funciones como `d()` y `n()` envuelven `Intl` bajo el capó, honrando los `datetimeFormats` y `numberFormats` definidos en tus opciones.
- **Estado global y local:** `global.locale` se asigna a una `WritableComputedRef` respaldada por el cliente de Intlayer, por lo que la reactividad se comporta exactamente como se esperaba (p. ej. `locale.value = 'fr'`).
- **Directivas:** La directiva `v-t` se registra y funciona normalmente.

Tu aplicación continúa renderizando exactamente como antes, pero el contenido está impulsado por tus diccionarios de Intlayer, dándote seguridad de tipos, mejor optimización de bundle e integración perfecta de CMS.

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
