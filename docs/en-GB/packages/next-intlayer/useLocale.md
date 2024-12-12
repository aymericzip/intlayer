# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

This section offers detailed documentation on the `useLocale` hook tailored for Next.js applications within the `next-intlayer` library. It is designed to handle locale changes and routing efficiently.

## Importing `useLocale` in Next.js

To utilize the `useLocale` hook in your Next.js application, import it as shown below:

```javascript
import { useLocale } from "next-intlayer"; // Used for managing locales and routing in Next.js
```

## Usage

Here’s how to implement the `useLocale` hook within a Next.js component:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
- **`setLocale`**: A function to change the application's locale and update the URL accordingly. It takes care of prefix rules, whether to add the locale to the path or not based on configuration. Utilizes `useRouter` from `next/navigation` for navigation functions like `push` and `refresh`.
- **`pathWithoutLocale`**: A computed property that returns the path without the locale. It is useful for comparing URLs. For example, if the current locale is `fr`, and the url `fr/my_path`, the path without locale is `/my_path`. Utilizes `usePathname` from `next/navigation` to get the current path.

## Conclusion

The `useLocale` hook from `next-intlayer` is a crucial tool for managing locales in Next.js applications. It offers an integrated approach to adapt your application for multiple locales by handling locale storage, state management, and URL modifications seamlessly.
