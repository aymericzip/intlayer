---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useLocale Hook Documentation | remix-intlayer
description: See how to use the useLocale hook in Remix 3 applications to get the current request locale, default locale, and available locales.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useLocale Hook Documentation

The `useLocale` hook from `remix-intlayer` provides access to the locale of the HTTP request currently being processed, along with the project's configured default and available locales.

## Usage

In a Remix component (for example a language switcher):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

In a route handler:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Return Values

The hook returns an object of type `UseLocaleResult`:

| Property           | Type                | Description                                                        |
| ------------------ | ------------------- | ------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | The locale resolved for the current request.                       |
| `defaultLocale`    | `DeclaredLocales`   | The default fallback locale configured in `intlayer.config.ts`.    |
| `availableLocales` | `DeclaredLocales[]` | Array of all available locales configured in `intlayer.config.ts`. |

## Description

1. **Request-Scoped Resolution**: In an active request handled by the `intlayer()` middleware, `useLocale` reads the resolved locale from the request storage.
2. **Graceful Fallback**: If called outside of a request context, it defaults to the configured `defaultLocale`.

## Related Documentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useDictionary.md)
