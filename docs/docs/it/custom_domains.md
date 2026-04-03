---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Domini personalizzati
description: Impara come configurare il routing delle locale basato su dominio in Intlayer per servire diverse locale da hostname dedicati.
keywords:
  - Domini personalizzati
  - Routing di dominio
  - Routing
  - Internazionalizzazione
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Aggiunta del routing delle locale basato su dominio tramite la configurazione routing.domains."
---

# Domini personalizzati

Intlayer supporta il routing delle locale basato su dominio, permettendoti di servire locale specifiche da hostname dedicati. Ad esempio, i visitatori cinesi possono essere indirizzati a `intlayer.zh` invece di `intlayer.org/zh`.

## Come funziona

La mappa `domains` in `routing` associa ogni locale a un hostname. Intlayer utilizza questa mappa in due posti:

1. **Generazione di URL** (`getLocalizedUrl`): quando la locale di destinazione si trova su un dominio _diverso_ dalla pagina corrente, viene restituito un URL assoluto (es. `https://intlayer.zh/about`). Quando entrambi i domini corrispondono, viene restituito un URL relativo (es. `/fr/about`).
2. **Proxy del server** (Next.js & Vite): le richieste in entrata vengono reindirizzate o riscritte in base al dominio su cui arrivano.

### Domini esclusivi vs condivisi

La distinzione chiave è l'**esclusività**:

- **Dominio esclusivo** — solo una locale è mappata su quell'hostname (es. `zh → intlayer.zh`). Il dominio stesso identifica la locale, quindi nessun prefisso di locale viene aggiunto al percorso. `https://intlayer.zh/about` serve contenuti in cinese.
- **Dominio condiviso** — più locale sono mappate sullo stesso hostname (es. sia `en` che `fr` sono mappate su `intlayer.org`). Si applica il normale routing basato sui prefissi. `intlayer.org/fr/about` serve contenuti in francese.

## Configurazione

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Dominio condiviso — en e fr usano il routing dei prefissi su intlayer.org
      en: "intlayer.org",
      // Dominio esclusivo — zh ha il suo hostname dedicato, nessun prefisso /zh/ necessario
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Le locale non elencate in `domains` continuano a utilizzare il routing standard basato sui prefissi senza alcun override del dominio.

## Generazione di URL

`getLocalizedUrl` produce automaticamente il tipo di URL corretto in base al contesto della chiamata.

### Locale sullo stesso dominio (URL relativo)

```ts
// Pagina corrente: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (locale predefinita, nessun prefisso)
```

### Locale su un dominio diverso (URL assoluto)

```ts
// Pagina corrente: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (dominio esclusivo, nessun prefisso /zh/)
```

### Servire dal proprio dominio della locale

```ts
// Pagina corrente: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (già sul dominio corretto — URL relativo)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (link tra domini verso intlayer.org)
```

### Rilevamento automatico del dominio corrente

`currentDomain` è facoltativo. Quando omesso, `getLocalizedUrl` lo risolve in questo ordine:

1. L'hostname di un URL di input assoluto (es. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` negli ambienti browser.
3. Se nessuno dei due è disponibile (SSR senza opzione esplicita), viene restituito un URL relativo per le locale dello stesso dominio e non viene prodotto alcun URL assoluto — questo è il fallback sicuro.

```ts
// Browser — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (rilevato automaticamente dalla finestra)

// Da un URL assoluto — dominio rilevato automaticamente
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` con domini

`getMultilingualUrls` chiama `getLocalizedUrl` per ogni locale, quindi produce un mix di URL relativi e assoluti a seconda del dominio del chiamante:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Questi URL assoluti sono pronti per essere utilizzati nei tag `<link rel="alternate" hreflang="...">` per la SEO.

## Comportamento del Proxy

### Next.js

Il middleware `intlayerProxy` gestisce automaticamente il routing di dominio. Aggiungilo al tuo `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirect** — la richiesta arriva sul dominio sbagliato per un determinato prefisso di locale:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Rewrite** — la richiesta arriva sul dominio esclusivo della locale senza un prefisso:

```
GET intlayer.zh/about
→ rewrite su /zh/about  (solo routing interno di Next.js, l'URL rimane pulito)
```

### Vite

Il plugin Vite `intlayerProxy` applica la stessa logica durante lo sviluppo:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Nota**: Nello sviluppo locale di solito ti trovi su `localhost`, quindi i reindirizzamenti tra domini punteranno ai domini live piuttosto che a un'altra porta locale. Utilizza una sostituzione nel file hosts (es. `127.0.0.1 intlayer.zh`) o un reverse proxy se hai bisogno di testare il routing multi-dominio localmente.

## Selettore della locale (Locale Switcher)

L'hook `useLocale` di `next-intlayer` gestisce automaticamente la navigazione consapevole del dominio. Quando un utente passa a una locale su un dominio diverso, l'hook esegue una navigazione di pagina completa (`window.location.href`) invece di un push del router lato client, perché il router di Next.js non può attraversare le origini.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Nessuna configurazione extra è richiesta — `useLocale` rileva internamente `window.location.hostname` e decide tra `router.replace` (stesso dominio) e `window.location.href` (dominio diverso).

## SEO: link alternativi `hreflang`

Il routing basato su dominio è comunemente usato insieme a `hreflang` per dire ai motori di ricerca quale URL indicizzare per ogni lingua. Usa `getMultilingualUrls` per generare il set completo di URL alternativi:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // es. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Questo produce:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Utility di base

| Utility                                           | Descrizione                                                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Restituisce un URL relativo o assoluto a seconda che la locale di destinazione sia sul dominio corrente o meno. |
| `getMultilingualUrls(url, { currentDomain })`     | Restituisce una mappa degli URL localizzati per locale, mescolando relativi e assoluti secondo necessità.       |
| `getPrefix(locale, { domains })`                  | Restituisce un prefisso vuoto per le locale con dominio esclusivo, altrimenti il prefisso normale.              |
