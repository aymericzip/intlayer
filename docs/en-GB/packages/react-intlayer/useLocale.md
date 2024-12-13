# React Integration: `useLocale` Hook Documentation

This section provides comprehensive details on the `useLocale` hook from the `react-intlayer` library, designed for handling locale management in React applications.

## Importing `useLocale` in React

To integrate the `useLocale` hook into your React application, import it from its respective package:

```javascript
import { useLocale } from "react-intlayer"; // Used in React components for locale management
```

## Overview

The `useLocale` hook offers an easy way to access and manipulate the locale settings within React components. It provides access to the current locale, the default locale, all available locales, and functions to update the locale settings.

## Usage

Here’s how you can use the `useLocale` hook within a React component:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parameters and Return Values

When you invoke the `useLocale` hook, it returns an object containing the following properties:

- **`locale`**: The current locale as set in the React context.
- **`defaultLocale`**: The primary locale defined in the configuration.
- **`availableLocales`**: A list of all locales available as defined in the configuration.
- **`setLocale`**: A function to update the current locale within the application's context.

## Example

This example shows a component that uses the `useLocale` hook to render a locale switcher, allowing users to dynamically change the locale of the application:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}

export default LocaleSelector;
```

## Conclusion

The `useLocale` hook from `react-intlayer` is an essential tool for managing locales in your React applications, providing the functionality needed to adapt your application to various international audiences effectively.
