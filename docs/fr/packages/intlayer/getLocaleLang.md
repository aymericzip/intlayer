# Documentation: `getLocaleLang` Function in `intlayer`

## Description:

La fonction `getLocaleLang` extrait le code de langue à partir d'une chaîne de locale. Elle prend en charge les locales avec ou sans codes de pays. Si aucune locale n'est fournie, elle retourne par défaut une chaîne vide.

## Parameters:

- `locale?: Locales`

  - **Description**: La chaîne de locale (par exemple, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) à partir de laquelle le code de langue est extrait.
  - **Type**: `Locales` (optionnel)

## Returns:

- **Type**: `string`
- **Description**: Le code de langue extrait de la locale. Si la locale n'est pas fournie, elle retourne une chaîne vide (`''`).

## Example Usage:

### Extraction des Codes de Langue:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Sortie : "en"
getLocaleLang(Locales.ENGLISH); // Sortie : "en"
getLocaleLang(Locales.FRENCH_CANADA); // Sortie : "fr"
getLocaleLang(Locales.FRENCH); // Sortie : "fr"
```

## Edge Cases:

- **Aucune Locale Fournie:**

  - La fonction retourne une chaîne vide lorsque `locale` est `undefined`.

- **Chaînes de Locale Malformées:**
  - Si la `locale` ne suit pas le format `langue-pays` (par exemple, `Locales.ENGLISH-US`), la fonction retourne en toute sécurité la partie avant `'-'` ou la chaîne entière si aucun `'-'` n'est présent.
