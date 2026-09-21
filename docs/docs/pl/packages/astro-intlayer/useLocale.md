---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentacja hooka useLocale | astro-intlayer
description: Zobacz, jak używać hooka useLocale w aplikacjach Astro, aby uzyskać dostęp do bieżącej lokalizacji i zarządzać nią.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja hooka useLocale

Hook `useLocale` z pakietu `astro-intlayer` zapewnia dostęp do aktualnej lokalizacji zapytania, skonfigurowanej domyślnej lokalizacji oraz wszystkich dostępnych lokalizacji w aplikacjach Astro.

Działa spójnie zarówno w sekcji frontmatter komponentów `.astro` renderowanych na serwerze, jak i w blokach skryptów klienta `<script>`.

## Użycie

### W sekcji frontmatter komponentu (renderowanie na serwerze)

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
      <span>Bieżący: {locale}</span>
      <span>Domyślny: {defaultLocale}</span>
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

### W skrypcie klienta `<script>` (interaktywność)

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

## Zwracane wartości

Hook zwraca obiekt typu `UseLocaleResult`:

| Właściwość         | Typ                                    | Opis                                                                                                         |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`                      | Aktywna lokalizacja.                                                                                         |
| `defaultLocale`    | `DeclaredLocales`                      | Domyślna lokalizacja rezerwowa skonfigurowana w `intlayer.config.ts`.                                        |
| `availableLocales` | `DeclaredLocales[]`                    | Tablica wszystkich obsługiwanych lokalizacji skonfigurowanych w projekcie.                                   |
| `setLocale`        | `(locale: LocalesValues) => void`      | Funkcja do aktualizacji lokalizacji. (Interaktywna w `<script>` klienta, wyświetla ostrzeżenie podczas SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Subskrybuje zmiany lokalizacji po stronie klienta.                                                           |

## Zachowanie na serwerze a na kliencie

- **Podczas SSR / renderowania na serwerze**: Zapytanie jest renderowane jednokrotnie ze stałymi parametrami. Wywołanie `setLocale()` podczas renderowania na serwerze nie przynosi efektu i generuje ostrzeżenie; przełączanie lokalizacji powinno odbywać się po stronie klienta lub poprzez przejście pod adres URL z odpowiednią lokalizacją.
- **W skryptach klienta**: `setLocale` aktualizuje magazyn klienta oraz zapisane ciasteczka lub pamięć lokalną zgodnie z konfiguracją Intlayer.

## Powiązana dokumentacja

- [Integracja `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useDictionary.md)
