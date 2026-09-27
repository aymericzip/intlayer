---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next : adaptateur de compatibilité pour i18next"
description: "Conservez votre code i18next et servez-le avec Intlayer : installez @intlayer/i18next, redirigez les imports et découvrez ce que l'adaptateur change en coulisses."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/i18next : adaptateur de compatibilité pour i18next

Pour un tutoriel détaillé étape par étape, veuillez consulter notre guide complet de [migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md).

Intlayer réplique parfaitement les caractéristiques d'exécution fondamentales de `i18next`. En utilisant le package compat, vos applications Vanilla ou modules internes peuvent continuer à exploiter la syntaxe familière.

## Que faire

Pour commencer, initialisez Intlayer dans votre projet :

```bash
npx intlayer init --interactive
```

Si vous utilisez Vite, incluez le plugin Intlayer pour router les imports vers `@intlayer/i18next` :

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Ce qu'il fait sous le capot

Le `i18nextVitePlugin` redirige les imports `i18next` vers `@intlayer/i18next`, évitant ainsi le gonflement du bundle causé par l'inclusion de fichiers JSON.

Sous le capot :

- **Configuration d'instance :** `createInstance` analyse correctement et applique les fallbacks de namespace tout en tirant parti du pipeline de compilation d'Intlayer pour la récupération des dictionnaires.
- **Interpolation :** Support natif des remplacements `{{name}}` et imbrication `$t(key)` récursive.
- **Contexte & Pluriels :** Identifie et résout les formats de suffixe comme `key_male` et `key_one`/`key_other` en évaluant par rapport à `Intl.PluralRules` standard.
- **Retour d'objets :** Le mode `returnObjects: true` extrait de manière sécurisée les arbres des dictionnaires Intlayer.

> Pour comprendre d'où viennent ces bibliothèques, lisez l'histoire de l'i18n en JavaScript.

- [L'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
