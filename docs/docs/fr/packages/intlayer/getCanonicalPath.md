---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentation de la fonction getCanonicalPath | intlayer
description: Voir comment utiliser la fonction getCanonicalPath pour le package intlayer
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Documentation : fonction `getCanonicalPath` dans `intlayer`

## Description

La fonction `getCanonicalPath` résout un chemin d'URL localisé (par ex. `/a-propos`) vers son chemin interne canonique dans l'application (par ex. `/about`). Ceci est essentiel pour que les routeurs correspondent à la route interne correcte indépendamment de la langue de l'URL.

**Fonctionnalités clés :**

- Prend en charge les paramètres de routes dynamiques en utilisant la syntaxe `[param]`.
- Fait correspondre les chemins localisés avec les règles de réécriture personnalisées définies dans votre configuration.
- Retourne le chemin original si aucune règle de réécriture correspondante n'est trouvée.

---

## Signature de la fonction

```typescript
getCanonicalPath(
  localizedPath: string,         // Requis
  locale: Locales,               // Requis
  rewriteRules?: RoutingConfig['rewrite'] // Optionnel
): string
```

---

## Paramètres

### Paramètres requis

- `localizedPath: string`
  - **Description**: Le chemin localisé tel qu'il apparaît dans le navigateur (p.ex., `/a-propos`).
  - **Type**: `string`
  - **Required**: Oui

- `locale: Locales`
  - **Description**: La locale utilisée pour le chemin à résoudre.
  - **Type**: `Locales`
  - **Required**: Oui

### Paramètres facultatifs

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Description**: Un objet définissant des règles de réécriture personnalisées. Si non fourni, il prend par défaut la propriété `routing.rewrite` de la configuration de votre projet.
  - **Type**: `RoutingConfig['rewrite']`
  - **Default**: `configuration.routing.rewrite`

---

## Renvoie

- **Type**: `string`
- **Description**: Le chemin canonique interne.

---

## Exemple d'utilisation

### Utilisation de base (avec configuration)

Si vous avez configuré des réécritures personnalisées dans votre `intlayer.config.ts` :

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuration : { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Sortie : "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Sortie : "/about"
```

### Utilisation avec des routes dynamiques

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuration : { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Sortie : "/product/123"
```

### Règles de réécriture manuelles

Vous pouvez aussi passer des règles de réécriture manuelles à la fonction :

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Sortie : "/contact"
```

---

## Fonctions associées

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedPath.md) : Résout un chemin canonique en son équivalent localisé.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) : Génère une URL entièrement localisée (incluant le protocole, l'hôte et le préfixe de locale).
