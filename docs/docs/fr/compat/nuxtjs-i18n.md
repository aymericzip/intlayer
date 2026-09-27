---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n : adaptateur de compatibilité pour @nuxtjs/i18n"
description: "Conservez votre code @nuxtjs/i18n et servez-le avec Intlayer : installez @intlayer/nuxt-i18n, redirigez les imports et découvrez ce que l'adaptateur change en coulisses."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/nuxt-i18n : adaptateur de compatibilité pour @nuxtjs/i18n

Migrer votre application Nuxt de `@nuxtjs/i18n` vers Intlayer est un processus transparent en utilisant le module adaptateur Nuxt.

## À faire

Pour initialiser le projet, exécutez :

```bash
npx intlayer init --interactive
```

Cela configurera `intlayer.config.ts`. Ensuite, ajoutez le module Intlayer Nuxt (par exemple `@intlayer/nuxt-i18n`) dans le tableau modules de votre `nuxt.config.ts`. Cela applique automatiquement la configuration de compatibilité pour votre application.

## Ce qu'il fait sous le capot

`@nuxtjs/i18n` wraps `vue-i18n` tout en fournissant des composables de routage spécifiques à Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Sous le capot :

- **Translations :** S'appuie nativement sur la couche de compatibilité `@intlayer/vue-i18n` pour toutes les tâches de traduction de chaînes (supportant pleinement les formats `vue-i18n`, les pluriels avec pipe, et la réactivité).
- **Routing :** Reproduit les composables de routage en utilisant les helpers d'URL localisées d'Intlayer.
- **Configuration :** Lit les paramètres `availableLocales` et par défaut directement de votre `intlayer.config.ts` pour coordonner automatiquement les pages Nuxt.

> Pour comprendre d'où viennent ces bibliothèques, lisez l'histoire de l'i18n en JavaScript.

- [L'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
