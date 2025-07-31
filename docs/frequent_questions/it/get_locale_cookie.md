---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Come recuperare la locale dai cookie / header?
description: Scopri come recuperare la locale dai cookie / header.
keywords:
  - cookie
  - header
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# Come recuperare la locale dai cookie / header

## Uso degli Hooks (Consigliato)

Per la maggior parte dei casi d'uso, è consigliato recuperare la locale corrente usando l'hook `useLocale` perché viene risolto automaticamente. Questo funziona in modo simile al composable `useLocale` in Vue.js.

```ts
import { useLocale } from "next-intlayer";
// oppure import { useLocale } from "react-intlayer";
// oppure import { useLocale } from "vue-intlayer";

ts;
// Uso lato client
const { locale } = useLocale();
```

Per i componenti server, puoi importarlo da:

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

Esiste anche un hook `useLocaleCookie` che risolve solo il valore del cookie.

## Configurazione manuale del cookie

Puoi dichiarare un nome personalizzato per il cookie come

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // il valore predefinito è 'intlayer-locale'
  },
};

export default config;
```

il recupero come

### Lato client

```ts
// Uso del nome cookie predefinito
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Uso di un nome cookie personalizzato
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Lato server (Next.js)

```ts
import { cookies } from "next/headers";

// Uso del nome cookie predefinito
const locale = cookies().get("intlayer-locale")?.value;

// Uso di un nome cookie personalizzato
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Se la locale non è ancora impostata

La locale viene impostata come cookie solo una volta che l'utente seleziona esplicitamente la locale. Per impostazione predefinita, per i nuovi visitatori, la locale viene interpretata dai campi degli header.

Puoi rilevare la locale preferita dall'utente dagli header della richiesta. Ecco un esempio di come gestirlo:

```ts
/**
 * Rileva la locale dagli header della richiesta
 *
 * L'header accept-language è il più importante per il rilevamento della locale.
 * Contiene una lista di codici lingua con valori di qualità (q-values) che indicano
 * le lingue preferite dall'utente in ordine di preferenza.
 *
 * Esempio: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US è la lingua primaria (q=1.0 è implicito)
 * - en è la seconda scelta (q=0.9)
 * - fr è la terza scelta (q=0.8)
 * - es è la quarta scelta (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Esempio di header di negoziazione che i browser tipicamente inviano
 * Questi header aiutano a determinare la lingua preferita dall'utente
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Esempio di utilizzo:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
