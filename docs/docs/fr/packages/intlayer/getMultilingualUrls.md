---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getMultilingualUrls | intlayer
description: Découvrez comment utiliser la fonction getMultilingualUrls pour le package intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
---

# Documentation : Fonction `getMultilingualUrls` dans `intlayer`

## Description

La fonction `getMultilingualUrls` génère une correspondance d'URLs multilingues en préfixant l'URL donnée avec chaque locale prise en charge. Elle peut gérer à la fois des URLs absolues et relatives, en appliquant le préfixe de locale approprié basé sur la configuration fournie ou les valeurs par défaut.

---

## Paramètres

- `url: string`

  - **Description** : La chaîne URL originale à préfixer avec les locales.
  - **Type** : `string`

- `locales: Locales[]`

  - **Description** : Tableau optionnel des locales supportées. Par défaut, les locales configurées dans le projet.
  - **Type** : `Locales[]`
  - **Défaut** : `localesDefault`

- `defaultLocale: Locales`

  - **Description** : La locale par défaut pour l'application. Par défaut, la locale par défaut configurée dans le projet.
  - **Type** : `Locales`
  - **Défaut** : `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description** : Indique s'il faut préfixer la locale par défaut. Par défaut, la valeur configurée dans le projet.
  - **Type** : `boolean`
  - **Défaut** : `prefixDefaultDefault`

### Retour

- **Type** : `IConfigLocales<string>`
- **Description** : Un objet associant chaque locale à son URL multilingue correspondante.

---

## Exemple d'utilisation

### URLs relatives

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Résultat : {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Résultat : {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Résultat : {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs absolues

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Résultat : {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Cas particuliers

- **Pas de segment de locale :**

  - La fonction supprime tout segment de langue existant dans l'URL avant de générer les correspondances multilingues.

- **Langue par défaut :**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la langue par défaut.

- **Langues non prises en charge :**
  - Seules les langues fournies dans le tableau `locales` sont prises en compte pour générer les URLs.

---

## Utilisation dans les applications

Dans une application multilingue, configurer les paramètres d'internationalisation avec `locales` et `defaultLocale` est essentiel pour garantir l'affichage de la langue correcte. Voici un exemple de la façon dont `getMultilingualUrls` peut être utilisé dans la configuration d'une application :

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuration des langues supportées et de la langue par défaut
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

En utilisant cette configuration, la fonction `getMultilingualUrls` peut générer dynamiquement des correspondances d'URL multilingues basées sur les locales prises en charge par l'application :

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Résultat :
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Résultat :
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

En intégrant `getMultilingualUrls`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant ainsi l'expérience utilisateur et le référencement SEO.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
