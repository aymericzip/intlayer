---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de React Intl vers Intlayer"
description: "Apprenez comment migrer votre application React de react-intl vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de React Intl à Intlayer

Si votre application React utilise `react-intl` (FormatJS), la transition vers Intlayer est très facile. Notre couche de compatibilité gère sans effort ICU MessageFormat et tous les composants `Formatted*` existants.

## À faire

Commencez par exécuter la commande d'initialisation dans votre projet :

```bash
npx intlayer init
```

Ensuite, configurez le plugin Intlayer Vite ou Next.js dans votre configuration. Ce plugin injecte des alias au moment de la construction pour rediriger les imports `react-intl` vers `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Ce qu'il fait sous le capot

Le plugin bundler alias `react-intl` à `@intlayer/react-intl`. Au lieu d'analyser manuellement de grands fichiers JSON et d'envelopper votre app dans un `IntlProvider`, le plugin Intlayer extrait statiquement les clés et utilise les dictionnaires Intlayer au runtime.

Sous le capot :

- **ICU MessageFormat:** Intlayer utilise le resolver `resolveMessage(..., 'icu')` qui supporte complètement les pluralisations ICU, la sélection, le formatage des dates/nombres, et les rich text tags nativement.
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` et `<FormattedMessage id="a.b">` sont identifiés par les plugins compilateurs Intlayer (`@intlayer/babel` / `@intlayer/swc`), convertissant les clés en pointillés plats de sorte que le premier segment se résout correctement à la clé du dictionnaire Intlayer.
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>`, etc., sont relayés aux `core/formatters` natifs en utilisant `Intl`.
