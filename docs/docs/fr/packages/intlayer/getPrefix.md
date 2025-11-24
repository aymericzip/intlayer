---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Documentation de la fonction getPrefix | intlayer
description: Découvrez comment utiliser la fonction getPrefix pour le package intlayer
keywords:
  - getPrefix
  - préfixe
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Documentation initiale
---

# Documentation : Fonction `getPrefix` dans `intlayer`

## Description

La fonction `getPrefix` détermine le préfixe d’URL pour une locale donnée en fonction de la configuration du mode de routage. Elle compare la locale avec la locale par défaut et retourne un objet contenant trois formats de préfixe différents pour une construction flexible des URL.

**Fonctionnalités clés :**

- Prend une locale en premier paramètre (obligatoire)
- Objet `options` optionnel avec `defaultLocale` et `mode`
- Retourne un objet avec les propriétés `prefix` et `localePrefix`
- Supporte tous les modes de routage : `prefix-no-default`, `prefix-all`, `no-prefix` et `search-params`
- Utilitaire léger pour déterminer quand ajouter les préfixes de locale

---

## Signature de la fonction

```typescript
getPrefix(
  locale: Locales,               // Obligatoire
  options?: {                    // Optionnel
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // ex. : 'fr/' ou ''
  localePrefix?: Locale; // ex. : 'fr' ou undefined
}
```

---

## Paramètres

- `locale: Locales`
  - **Description** : La locale pour laquelle générer le préfixe. Si la valeur est falsy (undefined, null, chaîne vide), la fonction retourne une chaîne vide.
  - **Type** : `Locales`
  - **Obligatoire** : Oui

- `options?: object`
  - **Description** : Objet de configuration pour la détermination du préfixe.
  - **Type** : `object`
  - **Obligatoire** : Non (Optionnel)

  - `options.defaultLocale?: Locales`
    - **Description** : La locale par défaut de l'application. Si non fournie, utilise la locale par défaut configurée dans la configuration de votre projet.
    - **Type** : `Locales`
    - **Défaut** : [`Configuration du projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description** : Le mode de routage URL pour la gestion des locales. Si non fourni, utilise le mode configuré dans la configuration de votre projet.
    - **Type** : `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Défaut** : [`Configuration du projet`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#middleware)
    - **Modes** :
      - `prefix-no-default` : Retourne des chaînes vides lorsque la locale correspond à la locale par défaut
      - `prefix-all` : Retourne un préfixe pour toutes les locales, y compris la locale par défaut
      - `no-prefix` : Retourne des chaînes vides (pas de préfixe dans les URLs)
      - `search-params` : Retourne des chaînes vides (locale dans les paramètres de requête)

### Retourne

- **Type** : `GetPrefixResult`
- **Description** : Un objet contenant trois formats de préfixes différents :
  - `prefix` : Le préfixe de chemin avec une barre oblique finale (par exemple, `'fr/'`, `''`)
  - `localePrefix` : L'identifiant de la locale sans barres obliques (par exemple, `'fr'`, `undefined`)

---

## Exemple d'utilisation

### Utilisation basique

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Vérifier le préfixe pour la locale anglaise
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Retourne : { prefix: 'en/', localePrefix: 'en' }

// Vérifier le préfixe pour la locale française
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Retourne : { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Retourne : { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Retourne : { prefix: '', localePrefix: undefined }
```

### Différents modes de routage

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all : Retourne toujours un préfixe
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Retourne : { prefix: '/en', localePrefix: 'en' }

// prefix-no-default : Pas de préfixe lorsque la locale correspond à la locale par défaut
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Retourne : { prefix: '', localePrefix: undefined }

// prefix-no-default : Retourne un préfixe lorsque la locale diffère de la locale par défaut
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Retourne : { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params : Ne retourne jamais de préfixe
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Retourne : { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Retourne : { prefix: '', localePrefix: undefined }
```

### Exemple pratique

```typescript
import { getPrefix, Locales } from "intlayer";

// Construire des URLs avec le préfixe approprié pour une locale spécifique
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// // Utilisation du préfixe pour la construction du chemin
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Résultat : "/fr/about"

// Utilisation de localePrefix pour l'identification de la locale
console.log(`Locale actuelle : ${localePrefix}`);
// Sortie : "Locale actuelle : fr"
```

---

## Fonctions associées

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) : Génère une URL localisée pour une locale spécifique
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getMultilingualUrls.md) : Génère des URLs pour toutes les locales configurées

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Le préfixe de chemin avec une barre oblique finale (ex. : 'fr/' ou '')
  localePrefix?: Locale; // L'identifiant de la locale sans slash (par exemple, 'fr' ou undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
