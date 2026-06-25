---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Vue I18n vers Intlayer"
description: "Apprenez comment migrer votre application Vue de vue-i18n vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Initialisation de l'historique"
author: aymericzip
---

# Migrer de Vue I18n vers Intlayer

Si votre application Vue utilise actuellement `vue-i18n`, vous pouvez migrer vers Intlayer sans réécrire vos composants ou vos hooks de traduction. Intlayer fournit un adaptateur de compatibilité qui reproduit parfaitement l'API de `vue-i18n` tout en exploitant les puissantes fonctionnalités d'Intlayer sous le capot.

## Que faire

Pour commencer, exécutez simplement la commande d'initialisation dans votre projet :

```bash
npx intlayer init
```

Lors de l'initialisation, Intlayer configurera votre fichier de configuration (`intlayer.config.ts`) et préparera votre projet pour la migration. Vous devrez simplement ajouter le plugin Intlayer à votre configuration Vite pour créer automatiquement un alias pour les imports `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Ce qu'il fait sous le capot

Le `vueI18nVitePlugin` injecte un alias de module dans votre bundler. Tout import de `vue-i18n` dans votre codebase sera transparemment redirigé vers `@intlayer/vue-i18n`.

**Sous le capot, l'adaptateur gère la syntaxe complexe de `vue-i18n` nativement :**

- **Interpolation & Pluriels :** Résout les interpolations `{name}` et les listes `{0}`. Les pluriels avec pipe (`"car | cars"`) sont convertis en nœuds d'énumération/pluriel Intlayer basés sur la sémantique positionnelle.
- **Formats :** Les fonctions comme `d()` et `n()` wrappent `Intl` sous le capot, en respectant les `datetimeFormats` et `numberFormats` définis dans vos options.
- **État Global & Local :** `global.locale` est mappé à un `WritableComputedRef` supporté par le client Intlayer, donc la réactivité se comporte exactement comme prévu (par exemple `locale.value = 'fr'`).
- **Directives :** La directive `v-t` est enregistrée et fonctionne normalement.

Votre application continue de se renderer exactement comme avant, mais le contenu est alimenté par vos dictionnaires Intlayer, vous donnant la type safety, une meilleure optimisation du bundle, et une intégration CMS transparente.
