---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de next-intl vers Intlayer"
description: "Apprenez comment migrer votre application Next.js de next-intl vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de next-intl vers Intlayer

Pour un tutoriel complet et détaillé étape par étape, consultez notre [Guide de migration next-intl](../migration_from_next-intl_to_intlayer.md).

Migrer de `next-intl` vers Intlayer vous permet de maintenir votre routage d'application et votre syntaxe complètement inchangés.

## Ce qu'il faut faire

Exécutez la commande suivante dans votre repository :

```bash
npx intlayer init
```

Cela créera un fichier `intlayer.config.ts`. Dans votre `next.config.ts`, utilisez le wrapper du plugin pour injecter de manière transparente les aliases `next-intl` vers `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Ce qu'il fait sous le capot

Le wrapper bundler remplace les traductions, mais **laisse les fonctionnalités de `next-intl/navigation` intactes** (par exemple `Link`, `redirect`, `usePathname`).

Sous le capot :

- **ICU runtime :** Les pluriels (`=0`, `one`, `other`), select/selectordinal, les arguments `#`, et les args formatés (`{ts, date, long}`) fonctionnent correctement en utilisant le resolver partagé `resolveMessage(..., 'icu')`.
- **`useTranslations()` & `getTranslations()` :** Les appels de scope nu extraient le premier segment de clé comme l'identifiant de dictionnaire correct. Les namespaces imbriqués se divisent gracieusement en chemins de dictionnaire et préfixes.
- **Rich formatting :** Both `t.rich()` et `t.markup()` sont entièrement implémentés nativement, convertissant les nœuds de type HTML en chunks React rendus.
- **`useFormatter` :** `relativeTime`, `list`, `dateTimeRange`, et les formats nommés de la configuration se connectent aux formatters natifs `Intl` du cœur.
