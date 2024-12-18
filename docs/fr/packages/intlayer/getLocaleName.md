# Documentation: `getLocaleName` Fonction dans `intlayer`

## Description:

La fonction `getLocaleName` retourne le nom localisé d'une locale donnée (`targetLocale`) dans la locale d'affichage (`displayLocale`). Si aucune `targetLocale` n'est fournie, elle retourne le nom de la `displayLocale` dans sa propre langue.

## Parameters:

- `displayLocale: Locales`

  - **Description**: La locale dans laquelle le nom de la locale cible sera affiché.
  - **Type**: Enum ou chaîne représentant des locales valides.

- `targetLocale?: Locales`
  - **Description**: La locale dont le nom doit être localisé.
  - **Type**: Optionnel. Enum ou chaîne représentant des locales valides.

## Returns:

- **Type**: `string`
- **Description**: Le nom localisé de la `targetLocale` dans la `displayLocale`, ou le nom de la `displayLocale` elle-même si `targetLocale` n'est pas fournie. Si aucune traduction n'est trouvée, elle retourne `"Unknown locale"`.

## Exemple d'utilisation:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Sortie: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Sortie: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Sortie: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Sortie: "English"

getLocaleName(Locales.FRENCH); // Sortie: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Sortie: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Sortie: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Sortie: "French"

getLocaleName(Locales.CHINESE); // Sortie: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Sortie: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Sortie: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Sortie: "Chinese"

getLocaleName("unknown-locale"); // Sortie: "Unknown locale"
```

## Cas limites:

- **Aucune `targetLocale` fournie:**
  - La fonction retourne par défaut le nom de la `displayLocale`.
- **Traductions manquantes:**
  - Si `localeNameTranslations` ne contient pas d'entrée pour la `targetLocale` ou la `displayLocale` spécifique, la fonction revient à `ownLocalesName` ou retourne `"Unknown locale"`.
