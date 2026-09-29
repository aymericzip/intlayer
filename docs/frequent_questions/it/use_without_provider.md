---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "Posso usare Intlayer senza un provider globale?"
description: "Leggere il contenuto Intlayer senza montare un provider, come viene risolta la locale sul server e nel browser, e la differenza di performance rispetto a un provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performance
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Posso usare Intlayer senza un provider globale?

Sì. `getIntlayer` e `getDictionary` sono semplici funzioni che non richiedono alcun provider, e anche `useIntlayer` funziona fuori da un provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Nessuna locale passata
```

## Quale locale viene usata?

Una locale passata esplicitamente ha sempre la precedenza. Altrimenti, la locale viene risolta in questo ordine:

1. **La locale della richiesta corrente**, sul server, quando un'integrazione Intlayer la gestisce: i middleware di `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` e `astro-intlayer`, o `IntlayerProvider` nei React Server Components.
2. **La locale salvata nel browser** (cookie, `localStorage`, `sessionStorage`), quella che il tuo selettore di lingua rende persistente.
3. **La `defaultLocale`** della tua configurazione.

Ogni richiesta viene risolta dai propri cookie e header, e conservata in un contesto dedicato alla richiesta. Utenti simultanei con locale diverse non condividono mai la locale.

La stessa risoluzione si applica a `getDictionary`, alle chiamate riscritte dall'[ottimizzazione del build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md), e a `useIntlayer` e `useDictionaryDynamic` renderizzati fuori da un provider.

- [ottimizzazione del build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)

### Server Components di Next.js

Su Next.js, la locale della richiesta è leggibile solo in modo asincrono, tramite `headers()` e `cookies()`. Usa [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md), che la attende come fa `getLocale()` di `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale della richiesta

  return { title };
};
```

Leggere gli header porta la route al rendering dinamico. Quando `IntlayerProvider` fornisce già la locale, gli header non vengono letti e la route resta statica.

## Performance: con o senza provider

Il contenuto è lo stesso. La differenza riguarda la reattività e il costo di rendering.

|                      | Con un provider                                                  | Senza provider                                                                                                                           |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Cambio di locale     | I componenti vengono ri-renderizzati sul posto, senza ricaricare | Nulla viene ri-renderizzato; la nuova locale compare alla chiamata successiva (navigazione, ricaricamento)                               |
| Costo di una lettura | Lettura del contesto e sottoscrizione alla locale                | Una chiamata di funzione memoizzata, stesso oggetto per la stessa `key + locale`                                                         |
| Costo di un cambio   | Nuovo rendering di ogni consumer                                 | Nessuno                                                                                                                                  |
| Rendering sul server | Server e browser renderizzano la stessa locale                   | Fuori da un'integrazione di richiesta, il server renderizza la `defaultLocale` e il browser quella salvata: possibile hydration mismatch |
| Bundle               | Il codice del provider                                           | Circa 100 byte (gzip) per leggere la locale salvata, in cache fino al cambio successivo                                                  |

Tieni il provider per le app interattive che cambiano locale sul posto o renderizzano sul server. Fanne a meno per backend, script, pagine statiche la cui locale viene dall'URL (passala esplicitamente) o codice che legge il contenuto una sola volta.

Vedi [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md) per maggiori dettagli.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md)
