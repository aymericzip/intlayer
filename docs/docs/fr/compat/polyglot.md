---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Polyglot.js vers Intlayer"
description: "Apprenez à migrer de Polyglot.js vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de Polyglot.js vers Intlayer

Si vous utilisez Polyglot.js d'Airbnb, la migration vers Intlayer est extrêmement simple en utilisant la couche de compatibilité.

## Que faire

Exécutez simplement la commande d'initialisation dans votre projet :

```bash
npx intlayer init
```

Cela génère `intlayer.config.ts`. Vous pouvez ensuite utiliser l'alias du plugin bundler pour rediriger de manière transparente les importations Polyglot vers `@intlayer/polyglot`.

## Ce qu'il fait sous le capot

La syntaxe de Polyglot.js s'appuie généralement sur `polyglot.t('key', {name})` avec des interpolations `%{name}` et des pluriels `smart_count` séparés par `"singular |||| plural"`.

Sous le capot :

- **Interpolation :** La couche de compatibilité gère les espaces réservés `%{var}` de manière native.
- **Pluriels :** La chaîne est divisée à `||||` et évaluée par rapport aux `Intl.PluralRules` natifs selon la locale active, en miroir de l'ordre des buckets propre de Polyglot par locale.
- **Dictionnaires :** Vous évitez d'avoir à fournir d'énormes configurations JSON à `new Polyglot()` – Intlayer gère les dictionnaires dynamiquement et les élague automatiquement.
