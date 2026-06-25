---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Transloco vers Intlayer"
description: "Apprenez comment migrer votre application Angular de Transloco vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de Transloco vers Intlayer

Si votre application Angular utilise actuellement `@jsverse/transloco`, vous pouvez migrer vers Intlayer en utilisant notre adaptateur de compatibilité. Cette transition vous permet de conserver votre syntaxe de modèle existante tout en utilisant la puissante structure de dictionnaire d'Intlayer.

## À faire

Exécutez simplement la commande d'initialisation dans votre projet :

```bash
npx intlayer init
```

Cela générera la configuration `intlayer.config.ts` nécessaire. Vous remplacerez ensuite vos imports Transloco par des modules `@intlayer/transloco` ou utiliserez les alias de build.

## Ce qu'il fait sous le capot

Transloco utilise des scopes et un `TranslocoService` (`translate`, `selectTranslate`), ainsi que des directives structurelles (`*transloco="let t"`) et des pipes (`| transloco`).

Sous le capot :

- **Scopes :** Mappent naturellement aux clés du dictionnaire Intlayer, fournissant une excellente stratégie de pruning pour l'optimisation du bundle.
- **Service & Directives :** L'adaptateur Angular d'Intlayer remplace de manière transparente les providers, permettant à vos pipes et directives de template existants de résoudre les chaînes de caractères par rapport aux dictionnaires Intlayer.
- **Build time parsing :** L'analyseur TypeScript reconnaît les appels `instant/get`, et le fallback pruning assure la correction même lorsque l'utilisation du template n'est pas statiquement traçable.
