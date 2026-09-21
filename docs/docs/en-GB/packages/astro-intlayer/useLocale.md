---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale Hook Documentation | astro-intlayer
description: See how to use the useLocale hook in Astro applications to access and manage the current locale.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useLocale Hook Documentation

The `useLocale` hook from `astro-intlayer` provides access to the current request locale, the configured default locale, and all available locales in Astro applications.

It behaves consistently across server-rendered `.astro` frontmatter and client-side `<script>` blocks.

## Usage

### In Component Frontmatter (Server-Rendered)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Current: {locale}</span>
      <span>Default: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### In Client `<script>` (Interactive)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Return Values

The hook returns an object of type `UseLocaleResult`:

| Property           | Type                                   | Description                                                                          |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`                      | The active locale.                                                                   |
| `defaultLocale`    | `DeclaredLocales`                      | The default fallback locale configured in `intlayer.config.ts`.                      |
| `availableLocales` | `DeclaredLocales[]`                    | Array of all supported locales configured for the project.                           |
| `setLocale`        | `(locale: LocalesValues) => void`      | Function to update the locale. (Interactive in client `<script>`, warns during SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Subscribes to client-side locale changes.                                            |

## Server vs Client Behaviour

- **During SSR / Server Rendering**: A request is rendered once with fixed parameters. Calling `setLocale()` during a server render has no effect and emits a warning; locale switching should be performed on the client or by navigating to the target locale URL.
- **In Client Scripts**: `setLocale` updates the client store and updates persisted cookies or local storage according to your Intlayer configuration.

## Related Documentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/astro-intlayer/useIntlayer.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/astro-intlayer/useDictionary.md)
