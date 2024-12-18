# Documentation: `getLocalizedUrl` Fonction dans `intlayer`

## Description:

La fonction `getLocalizedUrl` génère une URL localisée en préfixant l'URL donnée avec la locale spécifiée. Elle gère à la fois les URL absolues et relatives, en s'assurant que le préfixe de locale correct est appliqué en fonction de la configuration.

---

## Paramètres:

- `url: string`

  - **Description**: La chaîne d'URL originale à préfixer avec une locale.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: La locale actuelle pour laquelle l'URL est localisée.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: Tableau optionnel de locales prises en charge. Par défaut, les locales configurées dans le projet sont fournies.
  - **Type**: `Locales[]`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: La locale par défaut pour l'application. Par défaut, la locale par défaut configurée dans le projet est fournie.
  - **Type**: `Locales`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Indique si l'URL doit être préfixée pour la locale par défaut. Par défaut, la valeur configurée dans le projet est fournie.
  - **Type**: `boolean`
  - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#middleware)

### Retourne:

- **Type**: `string`
- **Description**: L'URL localisée pour la locale spécifiée.

---

## Exemple d'Utilisation:

### URL Relatives:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Résultat: "/fr/about" pour la locale française
// Résultat: "/about" pour la locale par défaut (anglais)
```

### URL Absolues:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales Supportées
  Locales.ENGLISH, // Locale Par Défaut
  false // Préfixer Locale Par Défaut
); // Résultat: "https://example.com/fr/about" pour la française

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales Supportées
  Locales.ENGLISH, // Locale Par Défaut
  false // Préfixer Locale Par Défaut
); // Résultat: "https://example.com/about" pour l'anglais

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales Supportées
  Locales.ENGLISH, // Locale Par Défaut
  true // Préfixer Locale Par Défaut
); // Résultat: "https://example.com/en/about" pour l'anglais
```

### Locale Non Supportée:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Actuelle
  [Locales.ENGLISH, Locales.FRENCH], // Locales Supportées
  Locales.ENGLISH // Locale Par Défaut
); // Résultat: "/about" (pas de préfixe appliqué pour la locale non supportée)
```

---

## Cas Limites:

- **Aucun Segment de Locale:**

  - Si l'URL ne contient aucun segment de locale, la fonction préfixe en toute sécurité la locale appropriée.

- **Locale Par Défaut:**

  - Lorsque `prefixDefault` est `false`, la fonction ne préfixe pas l'URL pour la locale par défaut.

- **Locales Non Supportées:**
  - Pour les locales non listées dans `locales`, la fonction n'applique aucun préfixe.

---

## Utilisation dans les Applications:

Dans une application multilingue, configurer les paramètres d'internationalisation avec `locales` et `defaultLocale` est essentiel pour garantir que la langue correcte est affichée. Voici un exemple de la façon dont `getLocalizedUrl` peut être utilisé dans une configuration d'application:

```tsx
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

La configuration ci-dessus garantit que l'application reconnaît `ENGLISH`, `FRENCH` et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue de secours.

En utilisant cette configuration, la fonction `getLocalizedUrl` peut générer dynamiquement des URL localisées en fonction de la préférence linguistique de l'utilisateur:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Résultat: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Résultat: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Résultat: "/about"
```

En intégrant `getLocalizedUrl`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant à la fois l'expérience utilisateur et le SEO.
