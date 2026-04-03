---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Aangepaste domeinen
description: Leer hoe u domeingebaseerde locale routing configureert in Intlayer om verschillende locales te bedienen vanaf speciale hostnames.
keywords:
  - Aangepaste domeinen
  - Domeinrouting
  - Routing
  - Internationalisering
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Domeingebaseerde locale routing toegevoegd via de routing.domains-configuratie."
---

# Aangepaste domeinen

Intlayer ondersteunt domeingebaseerde locale routing, waardoor u specifieke locales kunt bedienen vanaf speciale hostnames. Chinese bezoekers kunnen bijvoorbeeld worden doorgeleid naar `intlayer.zh` in plaats van `intlayer.org/zh`.

## Hoe het werkt

De `domains`-map in `routing` koppelt elke locale aan een hostname. Intlayer gebruikt deze map op twee plaatsen:

1. **URL-generatie** (`getLocalizedUrl`): wanneer de doel-locale op een _ander_ domein staat dan de huidige pagina, wordt een absolute URL geretourneerd (bijv. `https://intlayer.zh/about`). Wanneer beide domeinen overeenkomen, wordt een relatieve URL geretourneerd (bijv. `/fr/about`).
2. **Serverproxy** (Next.js & Vite): inkomende verzoeken worden omgeleid of herschreven op basis van het domein waarop ze binnenkomen.

### Exclusieve vs. gedeelde domeinen

Het belangrijkste onderscheid is **exclusiviteit**:

- **Exclusief domein** — er is slechts één locale aan die hostname gekoppeld (bijv. `zh → intlayer.zh`). Het domein zelf identificeert de locale, dus er wordt geen locale-prefix aan het pad toegevoegd. `https://intlayer.zh/about` bedient Chinese inhoud.
- **Gedeeld domein** — er zijn meerdere locales aan dezelfde hostname gekoppeld (bijv. zowel `en` als `fr` zijn gekoppeld aan `intlayer.org`). Normale prefixgebaseerde routing is van toepassing. `intlayer.org/fr/about` bedient Franse inhoud.

## Configuratie

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
      // Gedeeld domein — en en fr gebruiken prefix-routing op intlayer.org
      en: "intlayer.org",
      // Exclusief domein — zh heeft een eigen hostname, geen /zh/-prefix nodig
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Locales die niet in `domains` staan, blijven de standaard prefix-routing gebruiken zonder domeinoverschrijving.

## URL-generatie

`getLocalizedUrl` genereert automatisch het juiste URL-type op basis van de aanroepende context.

### Dezelfde-domein locale (relatieve URL)

```ts
// Huidige pagina: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (standaard locale, geen prefix)
```

### Domeinoverschrijdende locale (absolute URL)

```ts
// Huidige pagina: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (exclusief domein, geen /zh/-prefix)
```

### Bedienen vanaf het eigen domein van de locale

```ts
// Huidige pagina: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (al op het juiste domein — relatieve URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (domeinoverschrijdende link terug naar intlayer.org)
```

### Automatische detectie van het huidige domein

`currentDomain` is optioneel. Indien weggelaten, lost `getLocalizedUrl` dit in deze volgorde op:

1. De hostname van een absolute input-URL (bijv. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` in browseromgevingen.
3. Als geen van beide beschikbaar is (SSR zonder expliciete optie), wordt een relatieve URL geretourneerd voor locales op hetzelfde domein en wordt er geen absolute URL gegenereerd — dit is de veilige fallback.

```ts
// Browser — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (automatisch gedetecteerd door window)

// Vanaf een absolute URL — domein automatisch gedetecteerd
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` met domeinen

`getMultilingualUrls` roept `getLocalizedUrl` aan voor elke locale, dus het genereert een mix van relatieve en absolute URL's afhankelijk van het domein van de aanroeper:

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

Deze absolute URL's zijn klaar voor gebruik in `<link rel="alternate" hreflang="...">` tags voor SEO.

## Proxy-gedrag

### Next.js

De `intlayerProxy`-middleware handelt domeinrouting automatisch af. Voeg deze toe aan uw `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirect** — verzoek komt binnen op het verkeerde domein voor een gegeven locale-prefix:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Rewrite** — verzoek komt binnen op het exclusieve domein van de locale zonder prefix:

```
GET intlayer.zh/about
→ herschrijven naar /zh/about  (alleen interne Next.js-routing, URL blijft schoon)
```

### Vite

De `intlayerProxy` Vite-plugin past dezelfde logica toe tijdens ontwikkeling:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Opmerking**: bij lokale ontwikkeling bevindt u zich meestal op `localhost`, dus domeinoverschrijdende omleidingen verwijzen naar de live domeinen in plaats van naar een andere lokale poort. Gebruik een hosts-bestandsoverschrijving (bijv. `127.0.0.1 intlayer.zh`) of een reverse proxy als u multidomeinrouting lokaal wilt testen.

## Locale-kiezer (Locale Switcher)

De `useLocale`-hook van `next-intlayer` handelt domeinbewuste navigatie automatisch af. Wanneer een gebruiker overschakelt naar een locale op een ander domein, voert de hook een volledige paginanavigatie uit (`window.location.href`) in plaats van een client-side routerpush, omdat de Next.js-router geen cross-origin navigatie kan uitvoeren.

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

Er is geen extra configuratie vereist — `useLocale` detecteert intern `window.location.hostname` en beslist tussen `router.replace` (hetzelfde domein) en `window.location.href` (ander domein).

## SEO: `hreflang` alternatieve links

Domeingebaseerde routing wordt vaak gebruikt in combinatie met `hreflang` om zoekmachines te laten weten welke URL ze moeten indexeren voor elke taal. Gebruik `getMultilingualUrls` om de volledige set alternatieve URL's te genereren:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // bijv. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Dit genereert:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Kern-utilities

| Utility                                           | Beschrijving                                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Retourneert relatieve of absolute URL, afhankelijk van of de doel-locale op het huidige domein staat.                 |
| `getMultilingualUrls(url, { currentDomain })`     | Retourneert een locale-keyed map van gelokaliseerde URL's, waarbij relatief en absoluut naar behoefte worden gemengd. |
| `getPrefix(locale, { domains })`                  | Retourneert een lege prefix voor exclusieve domeinlocales, anders de normale prefix.                                  |
