---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getLocaleLang | intlayer
description: Découvrez comment utiliser la fonction getLocaleLang pour le package intlayer
keywords:
  - getLocaleLang
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Documentation : Fonction `getLocaleLang` dans `intlayer`

## Description

La fonction `getLocaleLang` extrait le code de langue à partir d'une chaîne de locale. Elle prend en charge les locales avec ou sans codes pays. Si aucune locale n'est fournie, elle retourne par défaut une chaîne vide.

## Paramètres

- `locale?: Locales`

  - **Description** : La chaîne de locale (par exemple, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) à partir de laquelle le code de langue est extrait.
  - **Type** : `Locales` (optionnel)

## Retour

- **Type** : `string`
- **Description** : Le code de langue extrait de la locale. Si la locale n'est pas fournie, elle retourne une chaîne vide (`''`).

## Exemple d'utilisation

### Extraction des codes de langue :

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

## Cas particuliers

- **Aucune locale fournie :**

  - La fonction retourne une chaîne vide lorsque `locale` est `undefined`.

- **Chaînes de locale mal formées :**
  - Si la `locale` ne suit pas le format `langue-pays` (par exemple, `Locales.ENGLISH-US`), la fonction retourne en toute sécurité la partie avant `'-'` ou la chaîne entière s'il n'y a pas de `'-'`.
