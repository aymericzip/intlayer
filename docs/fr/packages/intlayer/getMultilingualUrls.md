# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description:

La fonction `getMultilingualUrls` génère un mappage d'URL multilingues en préfixant l'URL donnée avec chaque locale supportée. Elle peut traiter à la fois des URL absolues et relatives, appliquant le préfixe de locale approprié basé sur la configuration fournie ou les valeurs par défaut.

---

## Parameters:

- `url: string`

  - **Description**: La chaîne d'URL originale à préfixer avec les locales.
  - **Type**: `string`

- `locales: Locales[]`

  - **Description**: Tableau optionnel de locales supportées. Par défaut, utilise les locales configurées dans le projet.
  - **Type**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Description**: La locale par défaut pour l'application. Par défaut, utilise la locale par défaut configurée dans le projet.
  - **Type**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description**: Indique s'il faut préfixer la locale par défaut. Par défaut, utilise la valeur configurée dans le projet.
  - **Type**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Returns:

- **Type**: `IConfigLocales<string>`
- **Description**: Un objet mappant chaque locale à son URL multilingue correspondante.

---

## Example Usage:

### Relative URLs:

```typescript
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Edge Cases:

- **No Locale Segment:**

  - La fonction supprime tout segment de locale existant de l'URL avant de générer les mappages multilingues.

- **Default Locale:**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Unsupported Locales:**
  - Seules les locales fournies dans le tableau `locales` sont considérées pour la génération des URL.

---

## Usage in Applications:

Dans une application multilingue, la configuration des paramètres d'internationalisation avec `locales` et `defaultLocale` est essentielle pour garantir que la langue correcte soit affichée. Voici un exemple de la façon dont `getMultilingualUrls` peut être utilisé dans une configuration d'application :

```tsx
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

La configuration ci-dessus garantit que l'application reconnaisse `ENGLISH`, `FRENCH`, et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue par défaut.

En utilisant cette configuration, la fonction `getMultilingualUrls` peut générer dynamiquement des mappages d'URL multilingues basés sur les locales supportées par l'application :

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
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
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

En intégrant `getMultilingualUrls`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant ainsi l'expérience utilisateur et le SEO.
