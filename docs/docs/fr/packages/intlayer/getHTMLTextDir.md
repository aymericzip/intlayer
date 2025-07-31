---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction getHTMLTextDir | intlayer
description: Découvrez comment utiliser la fonction getHTMLTextDir pour le package intlayer
keywords:
  - getHTMLTextDir
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
  - getHTMLTextDir
---

# Documentation : Fonction `getHTMLTextDir` dans `intlayer`

## Description

La fonction `getHTMLTextDir` détermine la direction du texte (`ltr`, `rtl` ou `auto`) en fonction de la locale fournie. Elle est conçue pour aider les développeurs à définir l'attribut `dir` dans le HTML pour un rendu correct du texte.

## Paramètres

- `locale?: Locales`

  - **Description** : La chaîne de locale (par exemple, `Locales.ENGLISH`, `Locales.ARABIC`) utilisée pour déterminer la direction du texte.
  - **Type** : `Locales` (optionnel)

## Retour

- **Type** : `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description** : La direction du texte correspondant à la locale :
  - `'ltr'` pour les langues de gauche à droite.
  - `'rtl'` pour les langues de droite à gauche.
  - `'auto'` si la locale n'est pas reconnue.

## Exemple d'utilisation

### Déterminer la direction du texte

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Sortie : "ltr"
getHTMLTextDir(Locales.FRENCH); // Sortie : "ltr"
getHTMLTextDir(Locales.ARABIC); // Sortie : "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Sortie : "ltr"
getHTMLTextDir(Locales.FRENCH); // Sortie : "ltr"
getHTMLTextDir(Locales.ARABIC); // Sortie : "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Sortie : "ltr"
getHTMLTextDir(Locales.FRENCH); // Sortie : "ltr"
getHTMLTextDir(Locales.ARABIC); // Sortie : "rtl"
```

## Cas particuliers

- **Pas de locale fournie :**

  - La fonction retourne `'auto'` lorsque `locale` est `undefined`.

- **Locale non reconnue :**
  - Pour les locales non reconnues, la fonction retourne par défaut `'auto'`.

## Utilisation dans les composants :

La fonction `getHTMLTextDir` peut être utilisée pour définir dynamiquement l'attribut `dir` dans un document HTML afin d'assurer un rendu correct du texte en fonction de la locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

// Composant HTMLLayout qui définit dynamiquement l'attribut dir selon la locale
const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Dans l'exemple ci-dessus, l'attribut `dir` est défini dynamiquement en fonction de la locale.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
