# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description:

The `getHTMLTextDir` function determines the text direction (`ltr`, `rtl`, or `auto`) based on the provided locale. It is designed to help developers set the `dir` attribute in HTML for proper text rendering.

## Parameters:

- `locale?: Locales`

  - **Description**: The locale string (e.g., `Locales.ENGLISH`, `Locales.ARABIC`) used to determine the text direction.
  - **Type**: `Locales` (optional)

## Returns:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: The text direction corresponding to the locale:
  - `'ltr'` for left-to-right languages.
  - `'rtl'` for right-to-left languages.
  - `'auto'` if the locale is not recognised.

## Example Usage:

### Determining Text Direction:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Edge Cases:

- **No Locale Provided:**

  - The function returns `'auto'` when `locale` is `undefined`.

- **Unrecognised Locale:**
  - For unrecognised locales, the function defaults to `'auto'`.

## Usage in Components:

The `getHTMLTextDir` function can be used to dynamically set the `dir` attribute in an HTML document for proper text rendering based on the locale.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

In the example above, the `dir` attribute is dynamically set based on the locale.
