---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentation de la fonction `getLocalizedPath` | intlayer
description: Voir comment utiliser la fonction getLocalizedPath du package intlayer
keywords:
  - getLocalizedPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Documentation : fonction `getLocalizedPath` dans `intlayer`

## Description

La fonction `getLocalizedPath` résout un chemin canonique (chemin interne de l'application) en son équivalent localisé en fonction de la locale fournie et des règles de réécriture. Elle est particulièrement utile pour générer des URLs optimisées pour le SEO qui varient selon la langue.

C'est l'équivalent relatif de [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) — pour une entrée relative, les deux retournent la même valeur. Contrairement à `getLocalizedUrl`, il ne retourne jamais une URL absolue : la configuration `domains` est ignorée, donc une locale servie depuis son propre domaine produit quand même un chemin. Une entrée absolue est acceptée, mais son origine est supprimée — seuls son chemin, sa chaîne de requête et son hash sont conservés.

**Fonctionnalités clés :**

- Prend en charge les paramètres de route dynamiques en utilisant la syntaxe `[param]`.
- Résout les chemins selon les règles de réécriture personnalisées définies dans votre configuration.
- Gère automatiquement le fallback vers le chemin canonique si aucune règle de réécriture n'est trouvée pour la locale spécifiée.

---

## Signature de la fonction

```typescript
getLocalizedPath(
  canonicalPath: string,         // Requis
  locale: Locales,               // Requis
  rewriteRules?: RoutingConfig['rewrite'] // Optionnel
): string
```

---

## Paramètres

### Paramètres requis

- `canonicalPath: string`
  - **Description** : Le chemin interne de l'application (par ex. `/about`, `/product/[id]`).
  - **Type** : `string`
  - **Required** : Oui

### Paramètres optionnels

- `locale?: Locales`
  - **Description**: La locale cible pour laquelle le chemin doit être localisé.
  - **Type**: `Locales`
  - **Default**: La locale par défaut de la configuration de votre projet.

- `options?: object`
  - **Description**: Overrides de routage. Chaque entrée utilise par défaut la configuration de votre projet.
  - **Type**: `object`

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Description** : Un objet définissant des règles de réécriture personnalisées. Si non fourni, il prend par défaut la propriété `routing.rewrite` de la configuration de votre projet.
  - **Type** : `RoutingConfig['rewrite']`
  - **Default** : `configuration.routing.rewrite`

---

## Renvoie

- **Type** : `string`
- **Description** : Le chemin localisé pour la locale spécifiée.

Le type est affiné à partir des règles de réécriture déclarées dans votre configuration, donc l'éditeur affiche le chemin résolu plutôt qu'une simple `string` :

```typescript codeFormat="typescript"
// Configuration: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (aucune règle de réécriture ne correspond, seul le préfixe est appliqué)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Le même narrowing s'écoule dans [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md), qui applique les règles de réécriture avant de préfixer la locale.

Deux cas restent élargis à `string`, car ils ne peuvent pas être résolus au moment de la compilation :

- un chemin qui n'est pas une chaîne de caractères littérale (par exemple, construite à partir d'une variable) ;
- un chemin correspondant à une règle utilisant un paramètre multi-segment ou optionnel (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Exemple d'utilisation

### Utilisation basique (avec configuration)

Si vous avez configuré des réécritures personnalisées dans votre `intlayer.config.ts` :

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration : { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Sortie: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Sortie: "/about"
```

### Utilisation avec des routes dynamiques

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration : { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Sortie: "/produit/123"
```

### Règles de réécriture manuelles

Vous pouvez également passer des règles de réécriture manuelles à la fonction :

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Sortie : "/contactez-nous"
```

### Omission de la locale

Quand aucune locale n'est donnée, le chemin est localisé pour la locale par défaut configurée :

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## Fonctions associées

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getCanonicalPath.md) : Résout un chemin localisé en son chemin canonique interne.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) : Génère une URL entièrement localisée (y compris le protocole, l'hôte et le préfixe de locale).
