---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione dell'hook useLocale | remix-intlayer
description: Scopri come utilizzare l'hook useLocale nelle applicazioni Remix 3 per ottenere la locale della richiesta corrente, la locale predefinita e le locale disponibili.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
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

# Documentazione dell'hook useLocale

L'hook `useLocale` di `remix-intlayer` fornisce l'accesso alla locale della richiesta HTTP attualmente in fase di elaborazione, insieme alla locale predefinita e alle locale disponibili configurate nel progetto.

## Utilizzo

In un componente Remix (ad esempio un selettore di lingua):

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

In un gestore di route:

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

## Valori restituiti

L'hook restituisce un oggetto di tipo `UseLocaleResult`:

| Proprietà          | Tipo                | Descrizione                                                               |
| ------------------ | ------------------- | ------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale risolta per la richiesta corrente.                              |
| `defaultLocale`    | `DeclaredLocales`   | La locale di fallback predefinita configurata in `intlayer.config.ts`.    |
| `availableLocales` | `DeclaredLocales[]` | Array di tutte le locale disponibili configurate in `intlayer.config.ts`. |

## Descrizione

1. **Risoluzione con ambito di richiesta**: In una richiesta attiva gestita dal middleware `intlayer()`, `useLocale` legge la locale risolta dall'archiviazione della richiesta.
2. **Fallback pulito**: Se chiamato al di fuori di un contesto di richiesta, ricade per impostazione predefinita sulla `defaultLocale` configurata.

## Documentazione correlata

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useDictionary.md)
