# Documentation: `getMultilingualUrls` Fonction dans `intlayer`

## Description

La fonction `getMultilingualUrls` génère une carte d'URLs multilingues en préfixant l'URL donnée avec chaque locale supportée. Elle peut gérer à la fois les URLs absolues et relatives, appliquant le préfixe de locale approprié basé sur la configuration fournie ou les valeurs par défaut.

---

## Paramètres:

- `url: string`

  - **Description**: La chaîne d'URL originale à préfixer avec des locales.
  - **Type**: `string`

- `locales: Locales[]`

  - **Description**: Tableau optionnel de locales supportées. Par défaut aux locales configurées dans le projet.
  - **Type**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Description**: La locale par défaut pour l'application. Par défaut à la locale par défaut configurée dans le projet.
  - **Type**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description**: Si oui ou non préfixer la locale par défaut. Par défaut à la valeur configurée dans le projet.
  - **Type**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Renvoie:

- **Type**: `IConfigLocales<string>`
- **Description**: Un objet associant chaque locale à son URL multilingue correspondante.

---

## Usage d'Exemple:

### URLs Relatives:

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Sortie: {
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
// Sortie: {
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
// Sortie: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs Absolues:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Sortie: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Cas Particuliers:

- **Aucun Segment de Locale:**

  - La fonction supprime tout segment de locale existant de l'URL avant de générer les mappages multilingues.

- **Locale Par Défaut:**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Locales Non Supportées:**
  - Seules les locales fournies dans le tableau `locales` sont considérées pour générer les URLs.

---

## Utilisation dans les Applications:

Dans une application multilingue, configurer les paramètres d'internationalisation avec `locales` et `defaultLocale` est crucial pour s'assurer que la langue correcte est affichée. Voici un exemple de la manière dont `getMultilingualUrls` peut être utilisé dans une configuration d'application :

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuration pour les locales supportées et la locale par défaut
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

La configuration ci-dessus assure que l'application reconnaît `ENGLISH`, `FRENCH`, et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue de secours.

En utilisant cette configuration, la fonction `getMultilingualUrls` peut générer dynamiquement des mappages d'URLs multilingues basés sur les locales supportées de l'application :

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Sortie:
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
// Sortie:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

En intégrant `getMultilingualUrls`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant ainsi l'expérience utilisateur et le SEO.
