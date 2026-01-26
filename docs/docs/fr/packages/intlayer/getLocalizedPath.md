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
    changes: Implement custom URL rewrites
---

# Documentation : fonction `getLocalizedPath` dans `intlayer`

## Description

La fonction `getLocalizedPath` résout un chemin canonique (chemin interne de l'application) en son équivalent localisé en fonction de la locale fournie et des règles de réécriture. Elle est particulièrement utile pour générer des URLs optimisées pour le SEO qui varient selon la langue.

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

- `locale: Locales`
  - **Description** : La locale cible pour laquelle le chemin doit être localisé.
  - **Type** : `Locales`
  - **Required** : Oui

### Paramètres optionnels

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Description** : Un objet définissant des règles de réécriture personnalisées. Si non fourni, il prend par défaut la propriété `routing.rewrite` de la configuration de votre projet.
  - **Type** : `RoutingConfig['rewrite']`
  - **Default** : `configuration.routing.rewrite`

---

## Renvoie

- **Type** : `string`
- **Description** : Le chemin localisé pour la locale spécifiée.

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

---

## Fonctions associées

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getCanonicalPath.md) : Résout un chemin localisé en son chemin canonique interne.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) : Génère une URL entièrement localisée (y compris le protocole, l'hôte et le préfixe de locale).
