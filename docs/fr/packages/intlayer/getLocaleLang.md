# Documentation: `getLocaleLang` Function in `intlayer`

## Description:

La fonction `getLocaleLang` extrait le code de langue d'une chaîne de locale. Elle prend en charge les locales avec ou sans codes de pays. Si aucune locale n'est fournie, elle renvoie par défaut une chaîne vide.

## Parameters:

- `locale?: Locales`

  - **Description**: La chaîne de locale (par exemple, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) à partir de laquelle le code de langue est extrait.
  - **Type**: `Locales` (optionnel)

## Returns:

- **Type**: `string`
- **Description**: Le code de langue extrait de la locale. Si la locale n'est pas fournie, elle renvoie une chaîne vide (`''`).

## Example Usage:

### Extracting Language Codes:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

## Edge Cases:

- **No Locale Provided:**

  - La fonction renvoie une chaîne vide lorsque `locale` est `undefined`.

- **Malformed Locale Strings:**
  - Si la `locale` ne suit pas le format `language-country` (par exemple, `Locales.ENGLISH-US`), la fonction renvoie en toute sécurité la partie avant `'-'` ou la chaîne entière si aucun `'-'` n'est présent.
