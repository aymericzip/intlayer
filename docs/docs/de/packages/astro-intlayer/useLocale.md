---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale Hook Dokumentation | astro-intlayer
description: Erfahren Sie, wie Sie den useLocale Hook in Astro-Anwendungen verwenden, um auf das aktuelle Locale zuzugreifen und es zu verwalten.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Initiale Dokumentation"
author: aymericzip
---

# useLocale Hook Dokumentation

Der `useLocale`-Hook aus `astro-intlayer` bietet Zugriff auf das aktuelle Anfrage-Locale, das konfigurierte Standard-Locale und alle verfügbaren Locales in Astro-Anwendungen.

Er verhält sich im serverseitig gerenderten `.astro`-Frontmatter und in clientseitigen `<script>`-Blöcken konsistent.

## Verwendung

### Im Komponenten-Frontmatter (Serverseitig gerendert)

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
      <span>Aktuell: {locale}</span>
      <span>Standard: {defaultLocale}</span>
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

### Im Client-`<script>` (Interaktiv)

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

## Rückgabewerte

Der Hook gibt ein Objekt vom Typ `UseLocaleResult` zurück:

| Eigenschaft        | Typ                                    | Beschreibung                                                                            |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Das aktive Locale.                                                                      |
| `defaultLocale`    | `DeclaredLocales`                      | Das in `intlayer.config.ts` konfigurierte Standard-Fallback-Locale.                     |
| `availableLocales` | `DeclaredLocales[]`                    | Array aller für das Projekt konfigurierten unterstützten Locales.                       |
| `setLocale`        | `(locale: LocalesValues) => void`      | Funktion zur Aktualisierung des Locales. (Interaktiv im `<script>`, warnt während SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Abonniert clientseitige Locale-Änderungen.                                              |

## Server- vs. Client-Verhalten

- **Während SSR / Server-Rendering**: Eine Anfrage wird einmal mit festen Parametern gerendert. Das Aufrufen von `setLocale()` während eines Server-Renderings hat keine Auswirkung und gibt eine Warnung aus; der Wechsel des Locales sollte auf dem Client oder durch Navigation zur Ziel-Locale-URL erfolgen.
- **In Client-Skripten**: `setLocale` aktualisiert den Client-Store sowie persistierte Cookies oder den lokalen Speicher gemäß Ihrer Intlayer-Konfiguration.

## Zugehörige Dokumentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useDictionary.md)
