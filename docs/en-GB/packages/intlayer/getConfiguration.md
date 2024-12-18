# Documentation: `getConfiguration` Function in `intlayer`

## Description:

The `getConfiguration` function retrieves the entire configuration for the `intlayer` application by extracting environment variables. This function provides the flexibility to use the same configuration on both the client and server sides, ensuring consistency across the application.

---

## Parameters:

The function does not take any parameters. Instead, it uses environment variables for configuration.

### Returns:

- **Type**: `IntlayerConfig`
- **Description**: An object containing the complete configuration for `intlayer`. The configuration includes the following sections:

  - `internationalization`: Settings related to locales and strict mode.
  - `middleware`: Settings related to URL and cookie management.
  - `content`: Settings related to content files, directories, and patterns.
  - `editor`: Editor-specific configurations.

See [Intlayer configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md) for more details.

---

## Example Usage:

### Retrieving the Full Configuration:

```typescript
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extracting `availableLocales` and `defaultLocale`:

The `internationalization` section of the configuration provides locale-related settings such as `locales` (available locales) and `defaultLocale` (fallback language).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output example: ["en", "fr", "es"]
console.log(defaultLocale); // Output example: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Notes:

- Ensure that all required environment variables are correctly set before calling this function. Missing variables will cause errors during initialization.
- This function can be used on both client and server sides, making it a versatile tool for managing configurations in a unified manner.

## Usage in Applications:

The `getConfiguration` function is a cornerstone utility for initializing and managing the configuration of an `intlayer` application. By providing access to settings like locales, middleware, and content directories, it ensures consistency and scalability across multilingual and content-driven applications.
