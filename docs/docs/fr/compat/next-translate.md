---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrer de Next Translate vers Intlayer"
description: "Apprenez comment migrer votre application Next.js de next-translate vers Intlayer en utilisant l'adaptateur de compatibilité."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrer de Next Translate vers Intlayer

La migration de `next-translate` vers Intlayer est un remplacement quasi direct qui conserve votre syntaxe et vos balises existantes.

## Ce qu'il faut faire

Initialisez Intlayer dans votre projet :

```bash
npx intlayer init
```

Le CLI va générer votre configuration. Vous pouvez ensuite appliquer le plugin Intlayer dans votre `next.config.ts`, qui injecte des alias de sous-chemin au moment de la compilation en mappant `next-translate/useTranslation` vers `@intlayer/next-translate`.

## Ce qu'il fait sous le capot

`next-translate` fournit des hooks comme `useTranslation('ns')`, `t('ns:key.path')`, et le composant `<Trans>`.

Sous le capot :

- **Interpolation & Plurals :** Il s'appuie étroitement sur le comportement de l'adaptateur `react-i18next`. Les placeholders `{{var}}` et la pluralisation mappée à partir de suffixes comme `key_0`, `key_one` et `key_other` sont traités dynamiquement.
- **Composant `<Trans>` :** Directement supporté pour l'analyse des tags de type HTML aux côtés d'une prop `components` basée sur un tableau.
- **Namespaces :** L'aliasing de sous-chemin s'assure que votre `useTranslation` référence les namespaces de dictionnaire internes corrects sans modification manuelle.
