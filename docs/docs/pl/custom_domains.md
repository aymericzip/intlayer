---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Własne domeny
description: Dowiedz się, jak skonfigurować routing lokalizacji oparty na domenach w Intlayer, aby obsługiwać różne lokalizacje z dedykowanych nazw hostów.
keywords:
  - Własne domeny
  - Routing domenowy
  - Routing
  - Internacjonalizacja
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Dodano routing lokalizacji oparty na domenach poprzez konfigurację routing.domains."
---

# Własne domeny

Intlayer obsługuje routing lokalizacji oparty na domenach, co pozwala na obsługę określonych lokalizacji z dedykowanych nazw hostów. Na przykład chińscy goście mogą być kierowani na `intlayer.zh` zamiast `intlayer.org/zh`.

## Jak to działa

Mapa `domains` w `routing` kojarzy każdą lokalizację z nazwą hosta. Intlayer używa tej mapy w dwóch miejscach:

1. **Generowanie URL** (`getLocalizedUrl`): gdy docelowa lokalizacja znajduje się na _innej_ domenie niż bieżąca strona, zwracany jest bezwzględny adres URL (np. `https://intlayer.zh/about`). Gdy obie domeny się zgadzają, zwracany jest względny adres URL (np. `/fr/about`).
2. **Proxy serwera** (Next.js & Vite): przychodzące żądania są przekierowywane lub przepisywane w zależności od domeny, na którą trafiają.

### Domeny wyłączne vs współdzielone

Kluczowym rozróżnieniem jest **wyłączność**:

- **Domena wyłączna** — tylko jedna lokalizacja jest mapowana na tę nazwę hosta (np. `zh → intlayer.zh`). Sama domena identyfikuje lokalizację, więc do ścieżki nie jest dodawany prefiks lokalizacji. `https://intlayer.zh/about` obsługuje chińską treść.
- **Domena współdzielona** — wiele lokalizacji jest mapowanych na tę samą nazwę hosta (np. zarówno `en`, jak i `fr` są mapowane na `intlayer.org`). Stosowany jest normalny routing oparty na prefiksach. `intlayer.org/fr/about` obsługuje francuską treść.

## Konfiguracja

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
      // Domena współdzielona — en i fr używają routingu z prefiksem na intlayer.org
      en: "intlayer.org",
      // Domena wyłączna — zh ma własną nazwę hosta, prefiks /zh/ nie jest potrzebny
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Lokalizacje, które nie są wymienione w `domains`, nadal używają standardowego routingu z prefiksem bez żadnego nadpisywania domeny.

## Generowanie URL

`getLocalizedUrl` automatycznie tworzy odpowiedni typ adresu URL w zależności od kontekstu wywołania.

### Lokalizacja w tej samej domenie (względny URL)

```ts
// Bieżąca strona: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (domyślna lokalizacja, brak prefiksu)
```

### Lokalizacja w innej domenie (bezwzględny URL)

```ts
// Bieżąca strona: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (domena wyłączna, brak prefiksu /zh/)
```

### Obsługa z własnej domeny lokalizacji

```ts
// Bieżąca strona: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (już na właściwej domenie — względny URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (link międzydomenowy z powrotem do intlayer.org)
```

### Automatyczne wykrywanie bieżącej domeny

Parametr `currentDomain` jest opcjonalny. Gdy zostanie pominięty, `getLocalizedUrl` rozstrzyga go w następującej kolejności:

1. Nazwa hosta z bezwzględnego wejściowego adresu URL (np. `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` w środowiskach przeglądarkowych.
3. Jeśli żadna z powyższych opcji nie jest dostępna (SSR bez jawnej opcji), zwracany jest względny adres URL dla lokalizacji w tej samej domenie i nie jest generowany bezwzględny adres URL — jest to bezpieczny mechanizm rezerwowy.

```ts
// Przeglądarka — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (wykryto automatycznie z window)

// Z bezwzględnego adresu URL — domena wykryta automatycznie
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` z domenami

`getMultilingualUrls` wywołuje `getLocalizedUrl` dla każdej lokalizacji, więc tworzy mieszankę względnych i bezwzględnych adresów URL w zależności od domeny wywołującego:

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

Te bezwzględne adresy URL są gotowe do użycia w tagach `<link rel="alternate" hreflang="...">` dla SEO.

## Zachowanie Proxy

### Next.js

Middleware `intlayerProxy` automatycznie obsługuje routing domenowy. Dodaj go do swojego `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Przekierowanie (Redirect)** — żądanie trafia do niewłaściwej domeny dla danego prefiksu lokalizacji:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Przepisanie (Rewrite)** — żądanie trafia do wyłącznej domeny lokalizacji bez prefiksu:

```
GET intlayer.zh/about
→ przepisz na /zh/about  (tylko wewnętrzny routing Next.js, URL pozostaje czysty)
```

### Vite

Plugin Vite `intlayerProxy` stosuje tę samą logikę podczas programowania:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Uwaga**: w lokalnym programowaniu zazwyczaj znajdujesz się na `localhost`, więc przekierowania międzydomenowe będą wskazywać na domeny produkcyjne, a nie na inny lokalny port. Użyj nadpisania w pliku hosts (np. `127.0.0.1 intlayer.zh`) lub odwrotnego proxy, jeśli musisz przetestować routing wielodomenowy lokalnie.

## Przełącznik lokalizacji (Locale Switcher)

Hook `useLocale` z `next-intlayer` automatycznie obsługuje nawigację uwzględniającą domeny. Gdy użytkownik przełącza się na lokalizację w innej domenie, hook wykonuje nawigację po pełnej stronie (`window.location.href`) zamiast przejścia routera po stronie klienta, ponieważ router Next.js nie może przekraczać granic originu.

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

Nie jest wymagana żadna dodatkowa konfiguracja — `useLocale` wewnętrznie wykrywa `window.location.hostname` i decyduje między `router.replace` (ta sama domena) a `window.location.href` (inna domena).

## SEO: Linki alternatywne `hreflang`

Routing oparty na domenach jest powszechnie stosowany wraz z `hreflang`, aby poinformować wyszukiwarki, który adres URL ma zostać zaindeksowany dla każdego języka. Użyj `getMultilingualUrls`, aby wygenerować pełny zestaw alternatywnych adresów URL:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // np. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

To generuje:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Podstawowe narzędzia

| Narzędzie                                         | Opis                                                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Zwraca względny lub bezwzględny adres URL w zależności od tego, czy docelowa lokalizacja znajduje się w bieżącej domenie. |
| `getMultilingualUrls(url, { currentDomain })`     | Zwraca mapę zlokalizowanych adresów URL z kluczem lokalizacji, mieszając odpowiednio względne i bezwzględne.              |
| `getPrefix(locale, { domains })`                  | Zwraca pusty prefiks dla lokalizacji z domeną wyłączną, w przeciwnym razie normalny prefiks.                              |
