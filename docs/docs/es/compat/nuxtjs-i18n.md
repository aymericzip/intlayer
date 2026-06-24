---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de NuxtJS I18n a Intlayer"
description: "Aprende cómo migrar tu aplicación Nuxt desde @nuxtjs/i18n a Intlayer usando el módulo adaptador de compatibilidad."
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

# Migrar de NuxtJS I18n a Intlayer

Migrar tu aplicación Nuxt desde `@nuxtjs/i18n` a Intlayer es un proceso sin problemas usando el módulo adaptador de Nuxt.

## Qué hacer

Para inicializar el proyecto, ejecuta:

```bash
npx intlayer init
```

Esto configurará `intlayer.config.ts`. Luego, agrega el módulo Nuxt de Intlayer (p. ej. `@intlayer/nuxt-i18n`) en el array de módulos de tu `nuxt.config.ts`. Esto aplica automáticamente la configuración de compatibilidad para tu aplicación.

## Qué hace bajo el capó

`@nuxtjs/i18n` envuelve `vue-i18n` mientras proporciona composables de enrutamiento específicos de Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Bajo el capó:

- **Traducciones:** Se basa nativamente en la capa de compatibilidad `@intlayer/vue-i18n` para todas las tareas de traducción de cadenas (soportando completamente formatos de `vue-i18n`, plurales de tubería y reactividad).
- **Enrutamiento:** Refleja los composables de enrutamiento utilizando los helpers de URL localizadas de Intlayer.
- **Configuración:** Lee los `availableLocales` y la configuración predeterminada directamente desde tu `intlayer.config.ts` para coordinar páginas de Nuxt automáticamente.
