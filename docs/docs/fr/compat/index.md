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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18n-js" />
</TechGrid>
