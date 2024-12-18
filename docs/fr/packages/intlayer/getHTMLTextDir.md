# Documentation: `getHTMLTextDir` Fonction dans `intlayer`

## Description:

La fonction `getHTMLTextDir` détermine la direction du texte (`ltr`, `rtl` ou `auto`) en fonction de la locale fournie. Elle est conçue pour aider les développeurs à définir l'attribut `dir` dans HTML pour un rendu correct du texte.

## Paramètres:

- `locale?: Locales`

  - **Description**: La chaîne de locale (par exemple, `Locales.ENGLISH`, `Locales.ARABIC`) utilisée pour déterminer la direction du texte.
  - **Type**: `Locales` (optional)

## Retours:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: La direction du texte correspondant à la locale:
  - `'ltr'` pour les langues de gauche à droite.
  - `'rtl'` pour les langues de droite à gauche.
  - `'auto'` si la locale n'est pas reconnue.

## Exemple d'Utilisation:

### Déterminer la Direction du Texte:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Sortie: "ltr"
getHTMLTextDir(Locales.FRENCH); // Sortie: "ltr"
getHTMLTextDir(Locales.ARABIC); // Sortie: "rtl"
```

## Cas Particuliers:

- **Aucune Locale Fournie:**

  - La fonction retourne `'auto'` lorsque `locale` est `undefined`.

- **Locale Non Reconnu:**
  - Pour les locales non reconnues, la fonction passe par défaut à `'auto'`.

## Utilisation dans les Composants:

La fonction `getHTMLTextDir` peut être utilisée pour définir dynamiquement l'attribut `dir` dans un document HTML pour un rendu correct du texte en fonction de la locale.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Dans l'exemple ci-dessus, l'attribut `dir` est défini dynamiquement en fonction de la locale.
