---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentazione dell'hook useLocale | astro-intlayer
description: Scopri come utilizzare l'hook useLocale nelle applicazioni Astro per accedere e gestire il locale corrente.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc iniziale"
author: aymericzip
---

# Documentazione dell'hook useLocale

L'hook `useLocale` di `astro-intlayer` fornisce l'accesso al locale della richiesta corrente, al locale predefinito configurato e a tutti i locale disponibili nelle applicazioni Astro.

Si comporta in modo coerente nel frontmatter `.astro` renderizzato dal server e nei blocchi `<script>` lato client.

## Utilizzo

### Nel Frontmatter dei componenti (Renderizzato dal server)

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
      <span>Corrente: {locale}</span>
      <span>Predefinito: {defaultLocale}</span>
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

### In `<script>` client (Interattivo)

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

## Valori restituiti

L'hook restituisce un oggetto di tipo `UseLocaleResult`:

| Proprietà          | Tipo                                   | Descrizione                                                                         |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Il locale attivo.                                                                   |
| `defaultLocale`    | `DeclaredLocales`                      | Il locale di fallback predefinito configurato in `intlayer.config.ts`.              |
| `availableLocales` | `DeclaredLocales[]`                    | Array di tutti i locale supportati configurati per il progetto.                     |
| `setLocale`        | `(locale: LocalesValues) => void`      | Funzione per aggiornare il locale. (Interattiva in `<script>`, avvisa durante SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Si iscrive alle modifiche del locale sul lato client.                               |

## Comportamento Server vs Client

- **Durante SSR / Rendering del Server**: Una richiesta viene elaborata una volta con parametri fissi. Chiamare `setLocale()` durante un rendering del server non ha alcun effetto ed emette un avviso; il cambio di locale deve essere eseguito sul client o navigando verso l'URL del locale di destinazione.
- **Negli script client**: `setLocale` aggiorna lo store client e aggiorna i cookie persistiti o la memoria locale in base alla configurazione di Intlayer.

## Documentazione correlata

- [Integrazione `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useDictionary.md)
