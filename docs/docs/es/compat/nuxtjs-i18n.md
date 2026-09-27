---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: adaptador de compatibilidad para @nuxtjs/i18n"
description: "Conserva tu código de @nuxtjs/i18n y sírvelo con Intlayer: instala @intlayer/nuxt-i18n, redirige los imports y descubre qué cambia el adaptador internamente."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# @intlayer/nuxt-i18n: adaptador de compatibilidad para @nuxtjs/i18n

Migrar tu aplicación Nuxt desde `@nuxtjs/i18n` a Intlayer es un proceso sin problemas usando el módulo adaptador de Nuxt.

## Qué hacer

Para inicializar el proyecto, ejecuta:

```bash
npx intlayer init --interactive
```

Esto configurará `intlayer.config.ts`. Luego, agrega el módulo Nuxt de Intlayer (p. ej. `@intlayer/nuxt-i18n`) en el array de módulos de tu `nuxt.config.ts`. Esto aplica automáticamente la configuración de compatibilidad para tu aplicación.

## Qué hace bajo el capó

`@nuxtjs/i18n` envuelve `vue-i18n` mientras proporciona composables de enrutamiento específicos de Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Bajo el capó:

- **Traducciones:** Se basa nativamente en la capa de compatibilidad `@intlayer/vue-i18n` para todas las tareas de traducción de cadenas (soportando completamente formatos de `vue-i18n`, plurales de tubería y reactividad).
- **Enrutamiento:** Refleja los composables de enrutamiento utilizando los helpers de URL localizadas de Intlayer.
- **Configuración:** Lee los `availableLocales` y la configuración predeterminada directamente desde tu `intlayer.config.ts` para coordinar páginas de Nuxt automáticamente.

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)
