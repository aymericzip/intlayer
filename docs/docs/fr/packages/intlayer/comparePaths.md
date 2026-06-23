---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentation de la fonction comparePaths | intlayer
description: Découvrez comment utiliser la fonction comparePaths pour le package intlayer
keywords:
  - comparePaths
  - normalizePath
  - lien actif
  - navigation
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Documentation initiale"
author: aymericzip
---

# Documentation : Fonction `comparePaths` dans `intlayer`

## Description

La fonction `comparePaths` compare deux URL ou chemins pour vérifier leur égalité tout en ignorant le segment de la locale, le protocole/domaine, la chaîne de requête (query string), le hash et les barres obliques de fin (trailing slashes). C'est la méthode recommandée pour déterminer si un lien de navigation pointe vers la page courante — par exemple pour mettre en évidence le lien actif — sans avoir à recréer votre propre logique de normalisation (sujette aux erreurs).

En interne, elle réutilise [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) pour supprimer le segment de la locale, de sorte qu'elle respecte votre mode de routage et vos locales configurés.

Le package exporte également la fonction utilitaire sous-jacente [`normalizePath`](#normalizepath), qui retourne le chemin canonique, indépendant de la locale, utilisé pour la comparaison.

**Fonctionnalités clés :**

- Comparaison indépendante de la locale (`/fr/about` correspond à `/about`)
- Fonctionne avec des URL absolues et des chemins relatifs
- Ignore la chaîne de requête, le hash et les barres obliques de fin
- Tolère l'absence de barre oblique initiale et les valeurs vides (normalisé en `/`)
- Léger — construit par-dessus `getPathWithoutLocale`

---

## Signature de la fonction

```typescript
comparePaths(
  pathname: string,  // Requis
  href: string,      // Requis
  locales?: Locales[] // Optionnel
): boolean

normalizePath(
  inputUrl: string,   // Requis
  locales?: Locales[] // Optionnel
): string
```

---

## Paramètres

- `pathname: string`
  - **Description** : La première chaîne d'URL ou de chemin à comparer (généralement le chemin actuel).
  - **Type** : `string`
  - **Requis** : Oui

- `href: string`
  - **Description** : La deuxième chaîne d'URL ou de chemin à comparer (généralement le `href` d'un lien de navigation).
  - **Type** : `string`
  - **Requis** : Oui

- `locales: Locales[]`
  - **Description** : Tableau optionnel des locales prises en charge. Par défaut, les locales configurées dans le projet.
  - **Type** : `Locales[]`
  - **Requis** : Non (Optionnel)

### Retours

- **Type** : `boolean`
- **Description** : `true` lorsque les deux entrées se résolvent vers le même chemin indépendant de la locale, sinon `false`.

---

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URL absolues et relatives

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Mettre en évidence le lien de navigation actif

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` retourne le chemin canonique et indépendant de la locale utilisé par `comparePaths`. Il supprime le segment de la locale, le protocole/domaine, la chaîne de requête et le hash, assure la présence d'une seule barre oblique initiale, supprime toute barre oblique de fin (sauf pour la racine) et utilise `/` comme valeur de repli pour les valeurs vides.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Fonctions associées

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md) : Supprime le segment de la locale d'une URL ou d'un chemin.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPrefix.md) : Détermine le préfixe d'URL pour une locale donnée.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md) : Génère une URL localisée pour une locale spécifique.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
