---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getPathWithoutLocale | intlayer
description: Découvrez commengetPathWithoutLocale utiliser la fonction getPathWithoutLocale pour le package intlayer
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

# Documentation: `getPathWithoutLocale` Fonctions dans `intlayer`

## Description

Supprime le segment de locale de l'URL ou du chemin donné s'il est présent. Fonctionne avec des URLs absolues et des chemins relatifs.

## Paramètres

- `inputUrl: string`

  - **Description**: La chaîne complète de l'URL ou du chemin à traiter.
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: Tableau optionnel des locales prises en charge. Par défaut, utilise les locales configurées dans le projet.
  - **Type**: `Locales[]`

## Retours

- **Type**: `string`
- **Description**: La chaîne de l'URL ou du chemin sans le segment de locale.

## Exemple d'utilisation

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Sortie: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Sortie: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Sortie: "https://example.com/dashboard"
```
