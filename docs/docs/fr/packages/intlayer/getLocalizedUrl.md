---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getLocalizedUrl | intlayer
description: Découvrez comment utiliser la fonction getLocalizedUrl pour le package intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
---

# Documentation : Fonction `getLocalizedUrl` dans `intlayer`

## Description

La fonction `getLocalizedUrl` génère une URL localisée en préfixant l'URL donnée avec la locale spécifiée. Elle gère à la fois les URL absolues et relatives, en s'assurant que le préfixe de locale correct est appliqué selon la configuration.

---

## Paramètres

- `url: string`

  - **Description** : La chaîne URL originale à préfixer avec une locale.
  - **Type** : `string`

- `currentLocale: Locales`

  - **Description** : La locale actuelle pour laquelle l'URL est localisée.
  - **Type** : `Locales`

- `locales: Locales[]`

  - **Description** : Tableau optionnel des locales supportées. Par défaut, les locales configurées dans le projet sont fournies.
  - **Type** : `Locales[]`
  - **Par défaut** : [`Configuration du projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description** : La locale par défaut de l'application. Par défaut, la locale par défaut configurée dans le projet est utilisée.
  - **Type** : `Locales`
  - **Par défaut** : [`Configuration du projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description** : Indique s'il faut préfixer l'URL pour la locale par défaut. Par défaut, la valeur configurée dans le projet est utilisée.
  - **Type** : `boolean`
  - **Par défaut** : [`Configuration du projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

### Retour

- **Type** : `string`
- **Description** : L'URL localisée pour la locale spécifiée.

---

## Exemple d'utilisation

### URLs relatives

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Résultat : "/fr/about" pour la locale française
// Résultat : "/about" pour la locale par défaut (anglais)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Résultat : "/fr/about" pour la locale française
// Résultat : "/about" pour la locale par défaut (anglais)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Résultat : "/fr/about" pour la locale française
// Résultat : "/about" pour la locale par défaut (anglais)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Résultat : "/fr/about" pour la locale française
// Résultat : "/about" pour la locale par défaut (anglais)
```

### URLs absolues

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  false // Préfixer la locale par défaut
); // Résultat : "https://example.com/fr/about" pour le français

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  false // Préfixer la locale par défaut
); // Résultat : "https://example.com/about" pour l'anglais

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  true // Préfixer la locale par défaut
); // Résultat : "https://example.com/en/about" pour l'anglais
```

### Locale non prise en charge

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH // Locale par défaut
); // Résultat : "/about" (aucun préfixe appliqué pour une locale non supportée)
```

---

## Cas particuliers

- **Pas de segment de locale :**

  - Si l'URL ne contient aucun segment de locale, la fonction préfixe en toute sécurité la locale appropriée.

- **Locale par défaut :**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Locales non supportées :**
  - Pour les locales non listées dans `locales`, la fonction n'applique aucun préfixe.

---

## Utilisation dans les applications

Dans une application multilingue, configurer les paramètres d'internationalisation avec `locales` et `defaultLocale` est essentiel pour garantir que la langue correcte soit affichée. Voici un exemple de la manière dont `getLocalizedUrl` peut être utilisé dans la configuration d'une application :

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuration des locales supportées et de la locale par défaut
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

La configuration ci-dessus garantit que l'application reconnaît `ENGLISH`, `FRENCH` et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue de repli.

En utilisant cette configuration, la fonction `getLocalizedUrl` peut générer dynamiquement des URLs localisées en fonction de la préférence linguistique de l'utilisateur :

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Résultat : "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Résultat : "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Résultat : "/about"
```

En intégrant `getLocalizedUrl`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant ainsi l'expérience utilisateur et le référencement SEO.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
