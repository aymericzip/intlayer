---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentation de la fonction getLocaleLang | intlayer
description: Découvrez commengetLocaleLang utiliser la fonction getLocaleLang pour le package intlayer
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
---

# Documentation: `getLocaleLang` Fonction dans `intlayer`

## Description

La fonction `getLocaleLang` extrait le code de langue à partir d'une chaîne de locale. Elle prend en charge les locales avec ou sans codes de pays. Si aucune locale n'est fournie, elle retourne par défaut une chaîne vide.

## Paramètres

- `locale?: Locales`

  - **Description** : La chaîne de locale (par exemple, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) à partir de laquelle le code de langue est extrait.
  - **Type** : `Locales` (optionnel)

## Retourne

- **Type** : `string`
- **Description** : Le code de langue extrait de la locale. Si la locale n'est pas fournie, elle retourne une chaîne vide (`''`).

## Exemple d'utilisation

### Extraction des codes de langue :

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Résultat : "en"
getLocaleLang(Locales.ENGLISH); // Résultat : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Résultat : "fr"
getLocaleLang(Locales.FRENCH); // Résultat : "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Résultat : "en"
getLocaleLang(Locales.ENGLISH); // Résultat : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Résultat : "fr"
getLocaleLang(Locales.FRENCH); // Résultat : "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Résultat : "en"
getLocaleLang(Locales.ENGLISH); // Résultat : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Résultat : "fr"
getLocaleLang(Locales.FRENCH); // Résultat : "fr"
```

## Cas particuliers

- **Aucune locale fournie :**

  - La fonction retourne une chaîne vide lorsque `locale` est `undefined`.

- **Chaînes de locale malformées :**
  - Si la `locale` ne suit pas le format `language-country` (par exemple, `Locales.ENGLISH-US`), la fonction retourne en toute sécurité la partie avant `'-'` ou la chaîne entière si aucun `'-'` n'est présent.
