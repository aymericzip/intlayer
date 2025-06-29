---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getLocaleName | intlayer
description: Découvrez commengetLocaleName utiliser la fonction getLocaleName pour le package intlayer
keywords:
  - getLocaleName
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getLocaleName` Fonction dans `intlayer`

## Description

La fonction `getLocaleName` retourne le nom localisé d'une locale donnée (`targetLocale`) dans la locale d'affichage (`displayLocale`). Si aucune `targetLocale` n'est fournie, elle retourne le nom de la `displayLocale` dans sa propre langue.

## Paramètres

- `displayLocale: Locales`

  - **Description** : La locale dans laquelle le nom de la locale cible sera affiché.
  - **Type** : Enum ou chaîne représentant des locales valides.

- `targetLocale?: Locales`
  - **Description** : La locale dont le nom doit être localisé.
  - **Type** : Optionnel. Enum ou chaîne représentant des locales valides.

## Retours

- **Type** : `string`
- **Description** : Le nom localisé de la `targetLocale` dans la `displayLocale`, ou le propre nom de la `displayLocale` si `targetLocale` n'est pas fourni. Si aucune traduction n'est trouvée, elle retourne `"Unknown locale"`.

## Exemple d'utilisation

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Résultat : "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Résultat : "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Résultat : "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Résultat : "English"

getLocaleName(Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Résultat : "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Résultat : "French"

getLocaleName(Locales.CHINESE); // Résultat : "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Résultat : "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Résultat : "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Résultat : "Chinese"

getLocaleName("unknown-locale"); // Résultat : "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Résultat : "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Résultat : "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Résultat : "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Résultat : "English"

getLocaleName(Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Résultat : "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Résultat : "French"

getLocaleName(Locales.CHINESE); // Résultat : "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Résultat : "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Résultat : "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Résultat : "Chinese"

getLocaleName("unknown-locale"); // Résultat : "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Résultat : "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Résultat : "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Résultat : "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Résultat : "English"

getLocaleName(Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Résultat : "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Résultat : "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Résultat : "French"

getLocaleName(Locales.CHINESE); // Résultat : "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Résultat : "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Résultat : "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Résultat : "Chinese"

getLocaleName("unknown-locale"); // Résultat : "Unknown locale"
```

## Cas particuliers

- **Aucune `targetLocale` fournie :**
  - La fonction retourne par défaut le propre nom de la `displayLocale`.
- **Traductions manquantes :**
  - Si `localeNameTranslations` ne contient pas d'entrée pour la `targetLocale` ou la `displayLocale` spécifique, la fonction revient au `ownLocalesName` ou retourne `"Unknown locale"`.
