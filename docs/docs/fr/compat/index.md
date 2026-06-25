---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Adaptateurs de Compatibilité Intlayer"
description: "Migrez votre solution i18n existante vers Intlayer sans friction en utilisant des adaptateurs de compatibilité."
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Adaptateurs Intlayer Compat

Migrer une grande application vers une nouvelle bibliothèque d'internationalisation peut être intimidant. Pour faciliter cette transition, Intlayer fournit des **adaptateurs de compatibilité** pour les bibliothèques i18n les plus populaires de l'écosystème.

Ces packages d'adaptateurs exposent la **même API publique exacte** que vos bibliothèques i18n existantes, mais délèguent tout le travail de traduction à Intlayer lors de l'exécution.

## Fonctionnement

Lorsque vous utilisez un adaptateur de compatibilité, vous n'avez pas besoin de réécrire les imports de votre application ou de modifier la façon dont vous utilisez vos hooks et composants de traduction. À la place, les plugins bundler d'Intlayer aliasent automatiquement vos imports existants vers les packages de compatibilité Intlayer.

Par exemple, un développeur remplace `import { useTranslation } from 'react-i18next'` par `import { useTranslation } from '@intlayer/react-i18next'` (fait automatiquement via le plugin bundler), et l'application continue de fonctionner avec les traductions servies par les dictionnaires Intlayer. Les clés sont également typées par rapport à vos dictionnaires Intlayer !

## Adaptateurs de compatibilité disponibles

Choisissez votre librairie existante ci-dessous pour voir comment migrer sans friction :

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
