---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Rendu statique vs dynamique avec i18n dans Next.js
description: Apprenez à utiliser le rendu statique vs dynamique avec i18n dans Next.js.
keywords:
  - statique
  - dynamique
  - rendu
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - configuration
slugs:
  - frequent-questions
  - static-rendering
---

# Rendu statique vs dynamique avec i18n dans Next.js

## Le problème avec **next-intl**

- **Que se passe-t-il ?**
  Lorsque vous utilisez `useTranslations`, `getTranslations` ou tout autre helper next-intl _à l'intérieur d'un composant serveur_ dans une application routée i18n (`/en/…`, `/fr/…`), Next.js marque toute la route comme **dynamique**. ([Next Intl][1])

- **Pourquoi ?**
  next-intl recherche la locale actuelle à partir d'un en-tête disponible uniquement dans la requête (`x-next-intl-locale`) via `headers()`. Comme `headers()` est une **API dynamique**, tout composant qui l'utilise perd l'optimisation statique. ([Next Intl][1], [Next.js][2])

- **Solution officielle (boilerplate)**
  1. Exporter `generateStaticParams` avec toutes les locales supportées.
  2. Appeler `setRequestLocale(locale)` dans **chaque** layout/page _avant_ d'appeler `useTranslations`. ([Next Intl][1])
     Cela supprime la dépendance à l'en-tête, mais vous avez maintenant du code supplémentaire à maintenir et une API instable en production.

## Comment **intlayer** contourne le problème

**Choix de conception**

1. **Paramètre de route uniquement** – La locale provient du segment d'URL `[locale]` que Next.js transmet déjà à chaque page.
2. **Bundles à la compilation** – Les traductions sont importées comme des modules ES classiques, elles sont donc optimisées par élimination des codes morts (tree-shaken) et intégrées lors de la compilation.
3. **Pas d’API dynamiques** – `useT()` lit depuis le contexte React, pas depuis `headers()` ou `cookies()`.
4. **Aucune configuration supplémentaire** – Une fois que vos pages résident sous `app/[locale]/`, Next.js pré-rend automatiquement un fichier HTML par locale.
