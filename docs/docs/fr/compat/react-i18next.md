---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de react-i18next vers Intlayer"
description: "Apprenez à migrer votre application React de react-i18next vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de react-i18next vers Intlayer

Pour un tutoriel complet et détaillé étape par étape, consultez notre [Guide de Migration react-i18next](../migration_from_react-i18next_to_intlayer.md).

L'adaptateur de compatibilité d'Intlayer vous permet de migrer depuis `react-i18next` sans aucune modification de vos importations de code source.

## Ce qu'il faut faire

Pour initialiser le projet, exécutez :

```bash
npx intlayer init
```

Lors de l'initialisation, Intlayer installera `@intlayer/react-i18next` et créera `intlayer.config.ts`. Dans votre bundler (comme Vite), appliquez le plugin Intlayer :

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Fonctionnement interne

Le `reactI18nextVitePlugin` encapsule le plugin `vite-intlayer` principal et injecte des alias de résolution pour `react-i18next` et `i18next`, les redirigeant vers `@intlayer/react-i18next` et `@intlayer/i18next`.

Fonctionnement interne :

- **`useTranslation` & `withTranslation`:** Réécrit pour utiliser les hooks natifs d'Intlayer, vous donnant l'autocomplétion TypeScript automatique pour vos clés de dictionnaire. Il prend en charge les namespaces de manière transparente (ex. `t('namespace:key')`).
- **Plurals & Context:** Gère la pluralisation basée sur des suffixes d'i18next (`key_one`, `key_other`) en utilisant `Intl.PluralRules` natif et les suffixes de contexte (`key_male`).
- **`<Trans>` Component:** Ré-implémenté pour supporter la prop `components`, les formes objet et tableau, et les tags numérotés `<1>...</1>` mappant directement à vos nœuds React.
- **`i18n` instance:** Résout les clés directement depuis Intlayer sans récupérer de gros fichiers JSON, ce qui réduit considérablement la taille du bundle.
