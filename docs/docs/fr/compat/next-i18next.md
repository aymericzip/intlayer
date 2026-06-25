---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de next-i18next vers Intlayer"
description: "Apprenez à migrer votre application Next.js de next-i18next vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de next-i18next vers Intlayer

Pour un tutoriel complet et détaillé étape par étape, veuillez consulter notre [Guide de migration next-i18next](../migration_from_next-i18next_to_intlayer.md).

Intlayer gère toutes les implémentations Next.js Pages Router et App Router de manière transparente. L'utilisation de l'adaptateur vous permet de migrer votre implémentation `next-i18next` sans réécriture de code.

## À faire

Pour commencer, exécutez :

```bash
npx intlayer init
```

Cela crée le fichier de configuration Intlayer requis. Pour intégrer Intlayer en arrière-plan, mettez à jour votre `next.config.ts` :

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Ce qu'il fait sous le capot

Le `createNextI18nPlugin` compose le comportement natif de Next.js aux côtés du plugin core `next-intlayer`, en injectant tous les aliases Webpack/Turbopack requis pour `next-i18next`, `react-i18next`, et `i18next`.

Sous le capot :

- **`serverSideTranslations` & `appWithTranslation` :** Ils fonctionnent désormais comme des wrappers pour les loaders internes d'Intlayer, contournant l'injection statique JSON volumineux.
- **Client hooks :** Délègue immédiatement à `@intlayer/react-i18next` en conservant toutes les fonctionnalités de formatage, pluriels et espaces de noms imbriqués.
