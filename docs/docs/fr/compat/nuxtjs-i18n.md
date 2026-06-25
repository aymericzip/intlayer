---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de NuxtJS I18n vers Intlayer"
description: "Apprenez comment migrer votre application Nuxt.js de @nuxtjs/i18n vers Intlayer en utilisant l'adaptateur de compatibilité."
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

# Migrer de NuxtJS I18n vers Intlayer

Migrer votre application Nuxt de `@nuxtjs/i18n` vers Intlayer est un processus transparent en utilisant le module adaptateur Nuxt.

## À faire

Pour initialiser le projet, exécutez :

```bash
npx intlayer init
```

Cela configurera `intlayer.config.ts`. Ensuite, ajoutez le module Intlayer Nuxt (par exemple `@intlayer/nuxt-i18n`) dans le tableau modules de votre `nuxt.config.ts`. Cela applique automatiquement la configuration de compatibilité pour votre application.

## Ce qu'il fait sous le capot

`@nuxtjs/i18n` wraps `vue-i18n` tout en fournissant des composables de routage spécifiques à Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Sous le capot :

- **Translations :** S'appuie nativement sur la couche de compatibilité `@intlayer/vue-i18n` pour toutes les tâches de traduction de chaînes (supportant pleinement les formats `vue-i18n`, les pluriels avec pipe, et la réactivité).
- **Routing :** Reproduit les composables de routage en utilisant les helpers d'URL localisées d'Intlayer.
- **Configuration :** Lit les paramètres `availableLocales` et par défaut directement de votre `intlayer.config.ts` pour coordonner automatiquement les pages Nuxt.
