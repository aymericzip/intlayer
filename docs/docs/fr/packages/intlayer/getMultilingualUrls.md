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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Documentation : Fonction `getMultilingualUrls` dans `intlayer`

## Description

La fonction `getMultilingualUrls` génère un mapping d'URLs multilingues en préfixant l'URL donnée avec chaque locale supportée. Elle peut gérer à la fois les URLs absolues et relatives, en appliquant le préfixe de locale approprié en fonction de la configuration fournie ou des valeurs par défaut.

**Caractéristiques principales :**

- Un seul paramètre est requis : `url`
- Objet `options` optionnel avec `locales`, `defaultLocale` et `mode`
- Utilise la configuration d'internationalisation de votre projet comme valeurs par défaut
- Supporte plusieurs modes de routage : `prefix-no-default`, `prefix-all`, `no-prefix` et `search-params`
- Retourne un objet de mapping avec toutes les locales comme clés et leurs URLs correspondantes comme valeurs

---

## Description

La fonction `getMultilingualUrls` génère une correspondance d'URLs multilingues en préfixant l'URL donnée avec chaque locale prise en charge. Elle peut gérer à la fois des URLs absolues et relatives, en appliquant le préfixe de locale approprié basé sur la configuration fournie ou les valeurs par défaut.

---

## Paramètres

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

### Paramètres Optionnels

- `options?: object`
  - **Description**: Objet de configuration pour le comportement de localisation des URL.
  - **Type**: `object`
  - **Required**: Non (Optionnel)

  - `options.locales?: Locales[]`
    - **Description**: Tableau des locales supportées. Si non fourni, utilise les locales configurées dans la configuration de votre projet.
    - **Type**: `Locales[]`
    - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: La locale par défaut pour l'application. Si non fournie, utilise la locale par défaut configurée dans la configuration de votre projet.
    - **Type**: `Locales`
    - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Le mode de routage des URL pour la gestion des locales. Si non fourni, utilise le mode configuré dans la configuration de votre projet.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Configuration du Projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Pas de préfixe pour la locale par défaut, préfixe pour toutes les autres
      - `prefix-all`: Préfixe pour toutes les locales y compris la locale par défaut
      - `no-prefix`: Pas de préfixe de locale dans l'URL
      - `search-params`: Utiliser les paramètres de requête pour la locale (par ex. `?locale=fr`)

### Retour

- **Type** : `IConfigLocales<string>`
- **Description** : Un objet associant chaque locale à son URL multilingue correspondante.

---

## Utilisation d'exemple

## Exemple d'utilisation

### URLs relatives

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Différents Modes de Routage

```typescript
// prefix-no-default: Pas de préfixe pour la locale par défaut
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Préfixe pour toutes les locales
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Pas de préfixe de locale dans les URLs
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale comme paramètre de requête
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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
