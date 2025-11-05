---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Jak pobrać locale z ciasteczek / nagłówków?
description: Dowiedz się, jak pobrać locale z ciasteczek / nagłówków.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Jak pobrać locale z ciasteczek / nagłówków

## Używanie Hooków (zalecane)

W większości przypadków zaleca się pobieranie aktualnego locale za pomocą hooka `useLocale`, ponieważ jest on automatycznie rozwiązywany. Działa to podobnie jak kompozycja `useLocale` w Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Użycie po stronie klienta
const { locale } = useLocale();
```

Dla komponentów serwerowych można zaimportować go z:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Istnieje również hook `useLocaleCookie`, który rozwiązuje tylko wartość ciasteczka.

## Ręczna konfiguracja ciasteczek

Możesz zadeklarować niestandardową nazwę ciasteczka jako

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // domyślnie 'intlayer-locale'
  },
};

export default config;
```

następnie pobierz ją jako

### Po stronie klienta

```ts
// Używając domyślnej nazwy ciasteczka
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Używając niestandardowej nazwy ciasteczka
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Po stronie serwera (Next.js)

```ts
import { cookies } from "next/headers";

// Używając domyślnej nazwy ciasteczka
const locale = cookies().get("intlayer-locale")?.value;

// Używając niestandardowej nazwy ciasteczka
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Jeśli locale nie jest jeszcze ustawione

Locale jest ustawiana jako ciasteczko tylko wtedy, gdy użytkownik wyraźnie wybierze locale. Domyślnie, dla nowych odwiedzających, locale jest interpretowana na podstawie pól nagłówków.

Możesz wykryć preferowane locale użytkownika na podstawie nagłówków żądania. Oto przykład, jak to obsłużyć:

```ts
/**
 * Wykrywa locale na podstawie nagłówków żądania
 *
 * Nagłówek accept-language jest najważniejszy przy wykrywaniu locale.
 * Zawiera listę kodów języków wraz z wartościami jakości (q-values), które wskazują
 * preferencje językowe użytkownika w kolejności preferencji.
 *
 * Przykład: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US jest językiem podstawowym (q=1.0 jest domyślne)
 * - en jest drugim wyborem (q=0.9)
 * - fr jest trzecim wyborem (q=0.8)
 * - es jest czwartym wyborem (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Przykład nagłówków negocjatora, które przeglądarki zazwyczaj wysyłają
 * Te nagłówki pomagają określić preferowany język użytkownika
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Przykład użycia:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
