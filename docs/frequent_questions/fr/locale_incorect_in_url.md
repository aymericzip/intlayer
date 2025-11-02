---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Locale incorrect récupérée depuis l'URL
description: Apprenez comment corriger la locale incorrecte récupérée depuis l'URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Locale incorrect récupérée depuis l'URL

## Description du problème

Lorsque vous essayez d'accéder au paramètre locale depuis l'URL, vous pouvez rencontrer un problème où la valeur de la locale est incorrecte :

```js
const { locale } = await params;
console.log(locale); // retourne "about" au lieu de la locale attendue
```

## Solution

### 1. Vérifier la structure des fichiers

Assurez-vous que le chemin de votre routeur d'application Next.js suit cette structure :

```bash
src/app/[locale]/about/page.tsx
```

### 2. Vérifier la configuration du middleware

Le problème survient souvent lorsque le middleware est absent ou non déclenché. Le fichier middleware doit se trouver à l'emplacement suivant :

```bash
src/middleware.ts
```

Ce middleware est responsable de la réécriture des routes lorsque `prefixDefault` est défini sur `false`. Par exemple, il réécrit `/en/about` en `/about`.

### 3. Modèles d'URL selon la configuration

#### Configuration par défaut (`prefixDefault: false`, `noPrefix: false`)

- Anglais : `/about`
- Français : `/fr/about`
- Espagnol : `/es/about`

#### Avec `prefixDefault: true`

- Anglais : `/en/about`
- Français : `/fr/about`
- Espagnol : `/es/about`

#### Avec `noPrefix: true`

- Anglais : `/about`
- Français : `/about`
- Espagnol : `/about`

src/app/[locale]/about/page.tsx

```

Pour plus de détails sur ces options de configuration, consultez la [Documentation de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).
```
