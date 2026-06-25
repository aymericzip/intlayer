---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Lingui vers Intlayer"
description: "Apprenez à migrer votre application de Lingui vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de Lingui à Intlayer

Si votre projet s'appuie actuellement sur la compilation basée sur les macros de Lingui, la transition vers Intlayer vous permet de maintenir vos puissants flux de travail avec macros tout en les soutenant nativement avec la stratégie de compilation JSON d'Intlayer.

## À faire

Pour commencer, initialisez Intlayer dans votre projet :

```bash
npx intlayer init
```

Cela crée votre `intlayer.config.ts`. Assurez-vous de conserver `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` dans votre étape de build pour s'exécuter _avant_ le compilateur Intlayer. Ensuite, utilisez l'alias du plugin bundler pour router `@lingui/core` et `@lingui/react` vers `@intlayer/lingui`.

## Ce qu'il fait sous le capot

Lingui utilise des macros (comme `` t`Hello ${name}` `` et `<Trans>`) qui sont compilées en appels runtime comme `i18n._(id, values)`.

Sous le capot :

- **Macros :** Elles se compilent exactement comme avant, garantissant aucune perturbation dans votre syntaxe source.
- **Runtime translation :** L'alias `i18n._()` utilise les dictionnaires Intlayer. Les IDs explicitement nommés et les IDs hachés sont entièrement mappés en utilisant les plugins de synchronisation `.po` d'Intlayer pour agréger et élaguer les clés de manière sécurisée.
- **Capacités ICU :** Le support pour la pluralisation, la sélection et les variantes ICU reste robuste grâce au parser ICU unifié d'Intlayer, garantissant des résultats de rendu identiques.
