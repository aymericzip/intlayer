---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de i18n-js vers Intlayer"
description: "Apprenez comment migrer votre application de i18n-js vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de i18n-js vers Intlayer

La transition de la bibliothèque `i18n-js` vers Intlayer est une migration hautement optimisée conçue pour décharger les grandes configurations de traductions dans le système de résolution de fichiers structuré d'Intlayer.

## Ce qu'il faut faire

Exécutez la commande de configuration suivante dans votre référentiel :

```bash
npx intlayer init
```

Avec `intlayer.config.ts` préparé, vous pouvez ajouter l'alias d'Intlayer à la configuration de votre bundler afin que tous les imports de `i18n-js` ciblent le package de compatibilité `@intlayer/i18n-js`.

## Ce qu'il fait sous le capot

`i18n-js` accède aux namespaces par le biais d'expressions comme `i18n.t('scope.key', {name})` ainsi que des fallbacks de locale et des mappings pluriels spécifiques.

Sous le capot :

- **Interpolation :** L'adaptateur de compatibilité analyse facilement les mappings `%{name}` dans la valeur de dictionnaire runtime ciblée.
- **Pluralisation :** Remplace les sous-clés `one/other` et les mappe par rapport aux puissants mécanismes pluriels sous-jacents d'Intlayer (`Intl.PluralRules`), en abstrayant les mappings manuels.
- **Locales :** Au lieu de charger des payloads monolithiques de langage au bootstrap, les dictionnaires sont servis de manière optimale en fonction de la configuration de contexte actuelle via la configuration Intlayer native.
