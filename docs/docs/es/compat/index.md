---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Adaptadores de Compatibilidad de Intlayer"
description: "Migra tu solución i18n existente a Intlayer sin fricciones usando adaptadores de compatibilidad."
keywords:
  - compat
  - migración
  - internacionalización
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Adaptadores de Compatibilidad de Intlayer

Migrar una aplicación grande a una nueva biblioteca de internacionalización puede ser desalentador. Para facilitar esta transición, Intlayer proporciona **adaptadores de compatibilidad** para las bibliotecas i18n más populares del ecosistema.

Estos paquetes adaptadores exponen la **misma API pública exacta** que tus bibliotecas i18n existentes, pero delegan todo el trabajo de traducción a Intlayer en tiempo de ejecución.

## Cómo funciona

Cuando usas un adaptador de compatibilidad, no necesitas reescribir las importaciones de tu aplicación ni cambiar cómo usas tus hooks de traducción y componentes. En su lugar, los plugins del empaquetador de Intlayer identifican automáticamente tus importaciones existentes con los paquetes de compatibilidad de Intlayer.

Por ejemplo, un desarrollador reemplaza `import { useTranslation } from 'react-i18next'` con `import { useTranslation } from '@intlayer/react-i18next'` (hecho automáticamente mediante el plugin del empaquetador), y la aplicación continúa funcionando con traducciones servidas ahora desde diccionarios de Intlayer. ¡Las claves también se escriben contra tus diccionarios de Intlayer!

## Adaptadores de Compatibilidad Disponibles

Elige tu biblioteca existente a continuación para ver cómo migrar sin problemas:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
