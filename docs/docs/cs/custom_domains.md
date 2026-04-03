---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Vlastní domény
description: Naučte se konfigurovat směrování lokalit na základě domén v Intlayer, abyste mohli obsluhovat různé lokality z vyhrazených hostitelských jmen.
keywords:
  - Vlastní domény
  - Směrování domén
  - Směrování
  - Internacionalizace
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Přidáno směrování lokalit na základě domén prostřednictvím konfigurace routing.domains."
---

# Vlastní domény

Intlayer podporuje směrování lokalit na základě domén, což vám umožňuje obsluhovat konkrétní lokality z vyhrazených hostitelských jmen. Například čínští návštěvníci mohou být přesměrováni na `intlayer.zh` místo `intlayer.org/zh`.

## Jak to funguje

Mapa `domains` v `routing` přidružuje každou lokalitu k hostitelskému jménu. Intlayer tuto mapu používá na dvou místech:

1. **Generování URL** (`getLocalizedUrl`): když cílová lokalita žije na _jiné_ doméně než aktuální stránka, vrátí se absolutní URL (např. `https://intlayer.zh/about`). Pokud se obě domény shodují, vrátí se relativní URL (např. `/fr/about`).
2. **Server proxy** (Next.js & Vite): příchozí požadavky jsou přesměrovány nebo přepsány na základě domény, na kterou dorazí.

### Exkluzivní vs. sdílené domény

Klíčovým rozdílem je **exkluzivita**:

- **Exkluzivní doména** — k tomuto hostitelskému jménu se mapuje pouze jedna lokalita (např. `zh → intlayer.zh`). Doména sama o sobě identifikuje lokalitu, takže k cestě není přidán žádný prefix lokality. `https://intlayer.zh/about` obsluhuje čínský obsah.
- **Sdílená doména** — ke stejnému hostitelskému jménu se mapuje více lokalit (např. `en` i `fr` se mapují na `intlayer.org`). Použije se běžné směrování založené na prefixech. `intlayer.org/fr/about` obsluhuje francouzský obsah.

## Konfigurace

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
      // Sdílená doména — en a fr používají směrování prefixů na intlayer.org
      en: "intlayer.org",
      // Exkluzivní doména — zh má vlastní hostitelské jméno, prefix /zh/ není potřeba
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Lokality, které nejsou uvedeny v `domains`, nadále používají standardní směrování prefixů bez jakéhokoli přepsání domény.

## Generování URL

`getLocalizedUrl` automaticky vytváří správný typ URL na základě kontextu volání.

### Lokalita na stejné doméně (relativní URL)

```ts
// Aktuální stránka: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (výchozí lokalita, bez prefixu)
```

### Lokalita na jiné doméně (absolutní URL)

```ts
// Aktuální stránka: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (exkluzivní doména, bez prefixu /zh/)
```

### Obsluha z vlastní domény lokality

```ts
// Aktuální stránka: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (již na správné doméně — relativní URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (mezidoménový odkaz zpět na intlayer.org)
```

### Automatická detekce aktuální domény

`currentDomain` je volitelný parametr. Pokud jej vynecháte, `getLocalizedUrl` jej vyřeší v tomto pořadí:

1. Hostitelské jméno absolutní vstupní URL (např. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` v prostředí prohlížeče.
3. Pokud není k dispozici ani jedno (SSR bez explicitní volby), vrátí se relativní URL pro lokality na stejné doméně a nevytvoří se absolutní URL — toto je bezpečný záložní mechanismus.

```ts
// Prohlížeč — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (automaticky detekováno z window)

// Z absolutní URL — doména detekována automaticky
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` s doménami

`getMultilingualUrls` volá `getLocalizedUrl` pro každou lokalitu, takže vytváří směs relativních a absolutních URL v závislosti na doméně volajícího:

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

Tyto absolutní URL jsou připraveny k použití v tazích `<link rel="alternate" hreflang="...">` pro SEO.

## Chování proxy

### Next.js

Middleware `intlayerProxy` automaticky zpracovává směrování domén. Přidejte jej do svého `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Přesměrování (Redirect)** — požadavek dorazí na nesprávnou doménu pro daný prefix lokality:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Přepis (Rewrite)** — požadavek dorazí na exkluzivní doménu lokality bez prefixu:

```
GET intlayer.zh/about
→ přepsat na /zh/about  (pouze interní směrování Next.js, URL zůstává čistá)
```

### Vite

Plugin `intlayerProxy` pro Vite aplikuje stejnou logiku během vývoje:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Poznámka**: při lokálním vývoji se obvykle nacházíte na `localhost`, takže mezidoménová přesměrování budou odkazovat na živé domény místo na jiný lokální port. Pokud potřebujete otestovat vícedoménové směrování lokálně, použijte přepsání souboru hosts (např. `127.0.0.1 intlayer.zh`) nebo reverzní proxy.

## Přepínač lokalit (Locale Switcher)

Hook `useLocale` z `next-intlayer` automaticky zpracovává navigaci zohledňující domény. Když uživatel přepne na lokalitu na jiné doméně, hook provede navigaci na celou stránku (`window.location.href`) namísto pushování routeru na straně klienta, protože router Next.js nemůže překračovat originy.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((l) => (
        <li key={l}>
          <button
            onClick={() => setLocale(l)}
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Není vyžadována žádná další konfigurace — `useLocale` interně detekuje `window.location.hostname` a rozhoduje mezi `router.replace` (stejná doména) a `window.location.href` (mezidoménová).

## SEO: alternativní odkazy `hreflang`

Směrování založené na doménách se běžně používá společně s `hreflang`, aby vyhledávačům sdělilo, kterou URL mají indexovat pro každý jazyk. Použijte `getMultilingualUrls` k vygenerování celé sady alternativních URL:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // např. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Toto vytvoří:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Základní nástroje

| Nástroj                                           | Popis                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Vrátí relativní nebo absolutní URL v závislosti na tom, zda cílová lokalita je na aktuální doméně.      |
| `getMultilingualUrls(url, { currentDomain })`     | Vrátí mapu lokalizovaných URL klíčovanou lokalitami, přičemž podle potřeby míchá relativní a absolutní. |
| `getPrefix(locale, { domains })`                  | Vrátí prázdný prefix pro lokality s exkluzivní doménou, jinak normální prefix.                          |
