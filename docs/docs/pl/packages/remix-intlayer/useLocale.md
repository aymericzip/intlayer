---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja hooka useLocale | remix-intlayer
description: Zobacz, jak używać hooka useLocale w aplikacjach Remix 3, aby uzyskać bieżący język żądania, domyślny język i dostępne języki.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - internacjonalizacja
  - dokumentacja
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja hooka useLocale"
author: aymericzip
---

# Dokumentacja hooka useLocale

Hook `useLocale` z `remix-intlayer` zapewnia dostęp do języka aktualnie przetwarzanego żądania HTTP, a także do domyślnego języka i listy dostępnych języków skonfigurowanych w projekcie.

## Użycie

W komponencie Remix (na przykład przełączniku języków):

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

W procedurze obsługi trasy:

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

## Wartości zwracane

Hook zwraca obiekt typu `UseLocaleResult`:

| Właściwość         | Typ                 | Opis                                                                           |
| ------------------ | ------------------- | ------------------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Język ustalony dla bieżącego żądania.                                          |
| `defaultLocale`    | `DeclaredLocales`   | Domyślny język rezerwowy skonfigurowany w `intlayer.config.ts`.                |
| `availableLocales` | `DeclaredLocales[]` | Tablica wszystkich dostępnych języków skonfigurowanych w `intlayer.config.ts`. |

## Opis

1. **Ustalanie w zakresie żądania**: W aktywnym żądaniu obsługiwanym przez middleware `intlayer()`, `useLocale` odczytuje ustalony język z magazynu żądania.
2. **Bezpieczny powrót (Fallback)**: W przypadku wywołania poza kontekstem żądania (np. podczas skryptów inicjalizacyjnych lub zestawów testowych), domyślnie przyjmowany jest skonfigurowany `defaultLocale`.

## Powiązana dokumentacja

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useDictionary.md)
