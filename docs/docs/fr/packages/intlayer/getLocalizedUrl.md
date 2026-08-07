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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Documentation : Fonction `getLocalizedUrl` dans `intlayer`

## Description

La fonction `getLocalizedUrl` génère une URL localisée en préfixant l'URL donnée avec la locale spécifiée. Elle gère à la fois les URLs absolues et relatives, en s'assurant que le bon préfixe de locale est appliqué en fonction de la configuration.

**Caractéristiques principales :**

- Seulement 2 paramètres sont requis : `url` et `currentLocale`
- Objet `options` optionnel avec `locales`, `defaultLocale`, et `mode`
- Utilise la configuration d'internationalisation de votre projet comme valeurs par défaut
- Peut être utilisé avec des paramètres minimaux pour les cas simples ou entièrement personnalisé pour les scénarios complexes
- Supporte plusieurs modes de routage : `prefix-no-default`, `prefix-all`, `no-prefix`, et `search-params`

---

## Signature de fonction

```typescript
getLocalizedUrl(
  url: string,                   // Requis
  currentLocale: Locales,        // Requis
  options?: {                    // Optionnel
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Paramètres

### Paramètres obligatoires

- `url: string`
  - **Description**: La chaîne d'URL originale à préfixer avec une locale.
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: La locale actuelle pour laquelle l'URL est localisée.
  - **Type**: `Locales`
  - **Required**: Yes

### Paramètres Optionnels

- `options?: object`
  - **Description**: Objet de configuration pour le comportement de localisation des URL.
  - **Type**: `object`
  - **Required**: Non (Optionnel)

  - `options.locales?: Locales[]`
    - **Description**: Tableau des locales supportées. Si non fourni, utilise les locales configurées dans la configuration de votre projet.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: La locale par défaut pour l'application. Si non fournie, utilise la locale par défaut configurée dans la configuration de votre projet.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Le mode de routage des URL pour la gestion des locales. Si non fourni, utilise le mode configuré dans la configuration de votre projet.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Aucun préfixe pour la locale par défaut, préfixe pour toutes les autres
      - `prefix-all`: Préfixe pour toutes les locales, y compris la locale par défaut
      - `no-prefix`: Aucun préfixe de locale dans l'URL
      - `search-params`: Utiliser les paramètres de requête pour la locale (par ex., `?locale=fr`)

### Retour

- **Type** : `string`
- **Description** : L'URL localisée pour la locale spécifiée.

---

## Exemple d'utilisation

### Utilisation basique (Paramètres obligatoires uniquement)

Lorsque vous avez configuré votre projet avec les paramètres d'internationalisation, vous pouvez utiliser la fonction avec juste les paramètres obligatoires :

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Utilise la configuration de votre projet pour les locales, defaultLocale et mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (en supposant que le français est supporté et que le mode est 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" ou "/en/about" (en fonction de votre paramètre de mode)
```

### Utilisation avancée (avec paramètres optionnels)

Vous pouvez remplacer la configuration par défaut en fournissant le paramètre optionnel `options` :

### URLs relatives

```typescript codeFormat={["typescript", "esm"]}
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

### Remplacement Partiel de la Configuration

Vous pouvez également fournir uniquement certains paramètres optionnels. La fonction utilisera la configuration de votre projet pour tous les paramètres que vous ne spécifiez pas :

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Remplacer uniquement les locales, utiliser la config du projet pour defaultLocale et mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Remplacer uniquement le mode, utiliser la config du projet pour locales et defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Forcer le préfixe pour toutes les locales y compris la locale par défaut
});

// Remplacer plusieurs options
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Utiliser les paramètres de requête : /about?locale=fr
});
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

La configuration ci-dessus garantit que l'application reconnaît `ENGLISH`, `FRENCH` et `SPANISH` comme langues supportées et utilise `ENGLISH` comme langue de repli.

En utilisant cette configuration, la fonction `getLocalizedUrl` peut générer dynamiquement des URLs localisées en fonction de la préférence linguistique de l'utilisateur :

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Résultat : "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Résultat : "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Résultat : "/about"
```

En intégrant `getLocalizedUrl`, les développeurs peuvent maintenir des structures d'URL cohérentes à travers plusieurs langues, améliorant ainsi l'expérience utilisateur et le référencement SEO.
