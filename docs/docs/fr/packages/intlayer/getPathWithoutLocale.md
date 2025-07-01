---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getPathWithoutLocale | intlayer
description: Découvrez comment utiliser la fonction getPathWithoutLocale pour le package intlayer
keywords:
  - getPathWithoutLocale
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation : Fonction `getPathWithoutLocale` dans `intlayer`

## Description

Supprime le segment de locale de l’URL ou du chemin donné s’il est présent. Cette fonction fonctionne aussi bien avec des URL absolues qu’avec des chemins relatifs.

## Paramètres

- `inputUrl: string`

  - **Description** : La chaîne complète de l’URL ou du chemin à traiter.
  - **Type** : `string`

- `locales: Locales[]`
  - **Description** : Tableau optionnel des locales supportées. Par défaut, les locales configurées dans le projet.
  - **Type** : `Locales[]`

## Retour

- **Type** : `string`
- **Description** : La chaîne URL ou le chemin sans le segment de locale.

## Exemple d’utilisation

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Résultat : "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Résultat : "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Résultat : "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Résultat : "https://example.com/dashboard"
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
