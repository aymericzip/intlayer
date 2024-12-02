# Documentation: `t` Function in `react-intlayer`

The `t` function in the `react-intlayer` package is a fundamental tool for inline internationalization within your React application. It allows you to define translations directly within your components, making it simple to display localized content based on the current locale.

---

## Overview

The `t` function is used to provide translations for different locales directly in your components. By passing an object containing translations for each supported locale, `t` returns the appropriate translation based on the current locale context in your React application.

---

## Key Features

- **Inline Translations**: Ideal for quick, inline text that doesn't require a separate content declaration.
- **Automatic Locale Selection**: Returns the translation corresponding to the current locale automatically.
- **TypeScript Support**: Provides type safety and autocompletion when used with TypeScript.
- **Easy Integration**: Works seamlessly within React components.

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: An object where keys are locale codes (e.g., `en`, `fr`, `es`) and values are the corresponding translated strings.

### Returns

- A string representing the translated content for the current locale.

---

## Usage Examples

### Basic Usage of `t` in a Component

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Inline Translations in Attributes

The `t` function is particularly useful for inline translations in JSX attributes. When localizing attributes like `alt`, `title`, `href`, or `aria-label`, you can use `t` directly within the attribute.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Advanced Topics

### TypeScript Integration

The `t` function is type-safe when used with TypeScript, ensuring that all required locales are provided.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale Detection and Context

In `react-intlayer`, the current locale is managed through the `IntlayerProvider`. Ensure this provider wraps your components and the `locale` prop is correctly passed.

#### Example:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Your components here */}
  </IntlayerProvider>
);
```

---

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: The current locale is not properly set, or the translation for the current locale is missing.
- **Solution**:
  - Verify that the `IntlayerProvider` is correctly set up with the appropriate `locale`.
  - Ensure that your translations object includes all the necessary locales.

### Missing Translations in TypeScript

- **Cause**: Translations object doesn't satisfy the required locales, leading to TypeScript errors.
- **Solution**: Use the `IConfigLocales` type to enforce completeness of your translations.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: Ideal for translating small pieces of text directly within your components.
2. **Prefer `useIntlayer` for Structured Content**: For more complex translations and content reuse, define content in declaration files and use `useIntlayer`.
3. **Consistent Locale Provision**: Ensure that your locale is consistently provided across your application through the `IntlayerProvider`.
4. **Leverage TypeScript**: Use TypeScript types to catch missing translations and ensure type safety.

---

## Conclusion

The `t` function in `react-intlayer` is a powerful and convenient tool for managing inline translations in your React applications. By integrating it effectively, you enhance the internationalization capabilities of your app, providing a better experience for users worldwide.

For more detailed usage and advanced features, refer to the [react-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor_en.md).

---

**Note**: Remember to set up your `IntlayerProvider` properly to ensure that the current locale is correctly passed down to your components. This is crucial for the `t` function to return the correct translations.
