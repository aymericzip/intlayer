# Documentation: `getLocaleName` Function in `intlayer`

## Description:

The `getLocaleName` function returns the localized name of a given locale (`targetLocale`) in the display locale (`displayLocale`). If no `targetLocale` is provided, it returns the name of the `displayLocale` in its own language.

## Parameters:

- `displayLocale: Locales`

  - **Description**: The locale in which the name of the target locale will be displayed.
  - **Type**: Enum or string representing valid locales.

- `targetLocale?: Locales`
  - **Description**: The locale whose name is to be localized.
  - **Type**: Optional. Enum or string representing valid locales.

## Returns:

- **Type**: `string`
- **Description**: The localized name of the `targetLocale` in the `displayLocale`, or the `displayLocale`'s own name if `targetLocale` is not provided. If no translation is found, it returns `"Unknown locale"`.

## Example Usage:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Edge Cases:

- **No `targetLocale` provided:**
  - The function defaults to returning the `displayLocale`'s own name.
- **Missing translations:**
  - If `localeNameTranslations` does not contain an entry for the `targetLocale` or the specific `displayLocale`, the function falls back to the `ownLocalesName` or returns `"Unknown locale"`.
