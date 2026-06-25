---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de NGX-Translate vers Intlayer"
description: "Apprenez à migrer votre application Angular de ngx-translate vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de NGX-Translate vers Intlayer

Migrer votre application Angular de `ngx-translate` vers Intlayer est facile avec l'adaptateur de compatibilité, vous permettant de contourner le besoin de réécrire tous vos templates.

## À faire

Commencez par exécuter :

```bash
npx intlayer init
```

Cela configure le fichier `intlayer.config.ts`. Remplacez vos configurations `TranslateModule.forRoot()` et les alias d'importation pour pointer vers `@intlayer/ngx-translate`.

## Ce qu'il fait sous le capot

`ngx-translate` utilise `TranslateService` (`instant`, `get`, `stream`) aux côtés du pipe `{{ 'KEY' | translate:params }}` et de la directive `[translate]`.

Sous le capot :

- **Services :** `TranslateService` enveloppe `getIntlayer` et un observable de locale, fournissant exactement les mêmes méthodes.
- **Pipes & Directives :** Réimplémentés pour résoudre directement contre les dictionnaires Intlayer.
- **Loaders :** Les configurations de `TranslateHttpLoader` sont converties en stubs d'avertissement car Intlayer résout et regroupe intrinsèquement vos dictionnaires au moment de la compilation (ou via des imports dynamiques standard), éliminant complètement le besoin de loaders HTTP.
