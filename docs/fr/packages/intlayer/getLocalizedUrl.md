---
docName: package__intlayer__getLocalizedUrl
url: /doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentation de la fonction getLocalizedUrl | intlayer
description: Découvrez commengetLocalizedUrl utiliser la fonction getLocalizedUrl pour le package intlayer
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
---

# Documentation: `getLocalizedUrl` Fonction dans `intlayer`

## Description

La fonction `getLocalizedUrl` génère une URL localisée en préfixant l'URL donnée avec la locale spécifiée. Elle gère à la fois les URL absolues et relatives, en s'assurant que le préfixe de locale correct est appliqué en fonction de la configuration.

---

## Paramètres

- `url: string`

  - **Description**: L'URL d'origine à préfixer avec une locale.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: La locale actuelle pour laquelle l'URL est localisée.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: Tableau optionnel des locales prises en charge. Par défaut, les locales configurées dans le projet sont fournies.
  - **Type**: `Locales[]`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: La locale par défaut de l'application. Par défaut, la locale par défaut configurée dans le projet est fournie.
  - **Type**: `Locales`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Indique si l'URL doit être préfixée pour la locale par défaut. Par défaut, la valeur configurée dans le projet est fournie.
  - **Type**: `boolean`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

### Retourne

- **Type**: `string`
- **Description**: L'URL localisée pour la locale spécifiée.

---

## Exemple d'Utilisation

### URL Relatives

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

### URL Absolues

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales prises en charge
  Locales.ENGLISH, // Locale par défaut
  false // Préfixer la locale par défaut
); // Résultat : "https://example.com/fr/about" pour le français

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales prises en charge
  Locales.ENGLISH, // Locale par défaut
  false // Préfixer la locale par défaut
); // Résultat : "https://example.com/about" pour l'anglais

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales prises en charge
  Locales.ENGLISH, // Locale par défaut
  true // Préfixer la locale par défaut
); // Résultat : "https://example.com/en/about" pour l'anglais
```

### Locale Non Prise en Charge

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales prises en charge
  Locales.ENGLISH // Locale par défaut
); // Résultat : "/about" (aucun préfixe appliqué pour une locale non prise en charge)
```

---

## Cas Limites

- **Pas de Segment de Locale :**

  - Si l'URL ne contient aucun segment de locale, la fonction préfixe en toute sécurité la locale appropriée.

- **Locale Par Défaut :**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Locales Non Prises en Charge :**
  - Pour les locales non listées dans `locales`, la fonction n'applique aucun préfixe.

---

## Utilisation dans les Applications

Dans une application multilingue, configurer les paramètres d'internationalisation avec `locales` et `defaultLocale` est essentiel pour garantir que la langue correcte est affichée. Voici un exemple d'utilisation de `getLocalizedUrl` dans une configuration d'application :

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuration des locales prises en charge et de la locale par défaut
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

La configuration ci-dessus garantit que l'application reconnaît `ENGLISH`, `FRENCH` et `SPANISH` comme langues prises en charge et utilise `ENGLISH` comme langue de secours.

En utilisant cette configuration, la fonction `getLocalizedUrl` peut générer dynamiquement des URL localisées en fonction de la préférence linguistique de l'utilisateur :

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Résultat : "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Résultat : "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Résultat : "/about"
```

En intégrant `getLocalizedUrl`, les développeurs peuvent maintenir des structures d'URL cohérentes dans plusieurs langues, améliorant ainsi l'expérience utilisateur et le SEO.
