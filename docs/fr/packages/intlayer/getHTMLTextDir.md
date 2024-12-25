# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description:

La fonction `getHTMLTextDir` détermine la direction du texte (`ltr`, `rtl` ou `auto`) en fonction du locale fourni. Elle est conçue pour aider les développeurs à définir l'attribut `dir` dans HTML pour un rendu correct du texte.

## Parameters:

- `locale?: Locales`

  - **Description**: La chaîne de locale (par exemple, `Locales.ENGLISH`, `Locales.ARABIC`) utilisée pour déterminer la direction du texte.
  - **Type**: `Locales` (optionnel)

## Returns:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: La direction du texte correspondant au locale :
  - `'ltr'` pour les langues de gauche à droite.
  - `'rtl'` pour les langues de droite à gauche.
  - `'auto'` si le locale n'est pas reconnu.

## Example Usage:

### Détermination de la direction du texte :

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

## Edge Cases:

- **Aucun locale fourni :**

  - La fonction renvoie `'auto'` lorsque `locale` est `undefined`.

- **Locale non reconnu :**
  - Pour les locales non reconnues, la fonction par défaut est `'auto'`.

## Usage dans les composants :

La fonction `getHTMLTextDir` peut être utilisée pour définir dynamiquement l'attribut `dir` dans un document HTML pour un rendu correct du texte en fonction du locale.

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

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Dans l'exemple ci-dessus, l'attribut `dir` est défini dynamiquement en fonction du locale.
