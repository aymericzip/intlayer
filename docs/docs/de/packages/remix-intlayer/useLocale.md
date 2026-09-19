---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale Hook Dokumentation | remix-intlayer
description: Erfahren Sie, wie Sie den useLocale-Hook in Remix 3-Anwendungen verwenden, um die aktuelle Request-Locale, die Standard-Locale und die verfügbaren Locales abzurufen.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
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

# useLocale Hook Dokumentation

Der `useLocale`-Hook von `remix-intlayer` bietet Zugriff auf die Locale der aktuell verarbeiteten HTTP-Anfrage zusammen mit der im Projekt konfigurierten Standard- und den verfügbaren Locales.

## Verwendung

In einer Remix-Komponente (zum Beispiel einem Sprachwechsler):

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

In einem Routen-Handler:

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

## Rückgabewerte

Der Hook gibt ein Objekt vom Typ `UseLocaleResult` zurück:

| Eigenschaft        | Typ                 | Beschreibung                                                            |
| ------------------ | ------------------- | ----------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Die für die aktuelle Anfrage aufgelöste Locale.                         |
| `defaultLocale`    | `DeclaredLocales`   | Die in `intlayer.config.ts` konfigurierte Standard-Fallback-Locale.     |
| `availableLocales` | `DeclaredLocales[]` | Array aller in `intlayer.config.ts` konfigurierten verfügbaren Locales. |

## Beschreibung

1. **Request-bezogene Auflösung**: In einer aktiven Anfrage, die von der `intlayer()`-Middleware verarbeitet wird, liest `useLocale` die aufgelöste Locale aus dem Request-Speicher.
2. **Sauberer Fallback**: Bei Aufruf außerhalb eines Anfragekontexts greift er standardmäßig auf die konfigurierte `defaultLocale` zurück.

## Zugehörige Dokumentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useDictionary.md)
