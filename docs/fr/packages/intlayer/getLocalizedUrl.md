# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description:

La fonction `getLocalizedUrl` génère une URL localisée en préfixant l'URL donnée avec la locale spécifiée. Elle gère à la fois les URL absolues et relatives, en veillant à ce que le préfixe de locale correct soit appliqué en fonction de la configuration.

---

## Parameters:

- `url: string`

  - **Description**: La chaîne d'URL d'origine à préfixer avec une locale.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: La locale actuelle pour laquelle l'URL est localisée.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: Tableau optionnel de locales supportées. Par défaut, les locales configurées dans le projet sont fournies.
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: La locale par défaut pour l'application. Par défaut, la locale par défaut configurée dans le projet est fournie.
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Indique s'il faut préfixer l'URL pour la locale par défaut. Par défaut, la valeur configurée dans le projet est fournie.
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

### Returns:

- **Type**: `string`
- **Description**: L'URL localisée pour la locale spécifiée.

---

## Example Usage:

### Relative URLs:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Sortie: "/fr/about" pour la locale française
// Sortie: "/about" pour la locale par défaut (anglais)
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

// Sortie: "/fr/about" pour la locale française
// Sortie: "/about" pour la locale par défaut (anglais)
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

// Sortie: "/fr/about" pour la locale française
// Sortie: "/about" pour la locale par défaut (anglais)
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

// Sortie: "/fr/about" pour la locale française
// Sortie: "/about" pour la locale par défaut (anglais)
```

### Absolute URLs:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  false // Préfixe pour la locale par défaut
); // Sortie: "https://example.com/fr/about" pour la française

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  false // Préfixe pour la locale par défaut
); // Sortie: "https://example.com/about" pour l'anglais

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH, // Locale par défaut
  true // Préfixe pour la locale par défaut
); // Sortie: "https://example.com/en/about" pour l'anglais
```

### Unsupported Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales supportées
  Locales.ENGLISH // Locale par défaut
); // Sortie: "/about" (aucun préfixe appliqué pour la locale non supportée)
```

---

## Edge Cases:

- **Aucun segment de locale:**

  - Si l'URL ne contient aucun segment de locale, la fonction préfixe en toute sécurité la locale appropriée.

- **Locale par défaut:**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Locales non supportées:**
  - Pour les locales non listées dans `locales`, la fonction n'applique aucun préfixe.

---

## Usage in Applications:

Dans une application multilingue, configurer les paramètres de l'internationalisation avec `locales` et `defaultLocale` est essentiel pour s'assurer que la bonne langue est affichée. Ci-dessous un exemple de la façon dont `getLocalizedUrl` peut être utilisé dans une configuration d'application :

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

La configuration ci-dessus garantit que l'application reconnaît `ENGLISH`, `FRENCH`, et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue de secours.

En utilisant cette configuration, la fonction `getLocalizedUrl` peut générer dynamiquement des URL localisées en fonction de la préférence linguistique de l'utilisateur :

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Sortie: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Sortie: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Sortie: "/about"
```

En intégrant `getLocalizedUrl`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant à la fois l'expérience utilisateur et le SEO.
