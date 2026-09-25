---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: Benchmark & Comparison 2026"
description: Dimensione del bundle, perdita di contenuti, reattività del cambio locale e esperienza dello sviluppatore misurate su Next.js e TanStack Start. Quale libreria i18n dovresti scegliere nel 2026?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark di Internazionalizzazione (i18n) per Next.js

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` è la libreria i18n più popolare per Next.js. Intlayer è un'alternativa basata su compiler e component-scoped. Entrambi localizzano un'applicazione App Router. La domanda è quanto costi ciascuno una volta che l'app è compilata.

Questo articolo non è un tutorial. È un confronto supportato da numeri da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite di benchmark open-source che compila la stessa applicazione con ciascuna libreria e misura ciò che il browser scarica effettivamente ed esegue.

<TOC/>

> **tl;dr**: Sulla stessa app Next.js, `next-intl` aggiunge **+12.6 KB gzip** di JavaScript su ogni pagina, rispetto ai **+0.3 KB** di Intlayer. Senza lavoro extra, `next-intl` spedisce **~90% delle stringhe di pagine straniere** con ogni pagina. Raggiungere lo 0% di leakage con `next-intl` richiede namespace scoping e per-page `pick(messages, [...])`. Intlayer raggiunge lo 0% di default, perché il suo compiler definisce l'ambito dei contenuti per componente. Se vuoi l'API di `next-intl` con l'output di Intlayer, l'adapter `@intlayer/next-intl` ha misurato **147.5 KB** per pagina rispetto ai **153.6 KB** con l'originale.

## In breve

- **next-intl** - Leggero, ben documentato, supporto per il formato di messaggi ICU, supporto di first-class per App Router con middleware, formattatori e helper di navigazione. I contenuti risiedono in cataloghi JSON centralizzati; le ottimizzazioni delle prestazioni (namespace, selezione dei messaggi per pagina, lazy loading) sono a tua responsabilità.
- **Intlayer** - Modello di contenuto incentrato sui componenti. I dizionari `.content.ts` si trovano accanto al componente che servono, un compiler in fase di build tree-shake e lazy-load per ogni componente e per ogni locale, i tipi TypeScript rigorosi sono generati dal tuo contenuto, e le traduzioni mancanti falliscono in fase di build. Include middleware, helper SEO, un Visual Editor / CMS e traduzione assistita dall'IA.

| Libreria              | Stelle GitHub                                                                                                                                                                  | Commit Totali                                                                                                                                                                      | Ultimo Commit                                                                                                                                       | Prima Versione | Versione NPM                                                                                                  | Download NPM                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Aprile 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020       | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> I badge si aggiornano automaticamente. Gli snapshot varieranno nel tempo.

## Confronto delle funzionalità fianco a fianco

| Funzionalità                                             | `next-intlayer` (Intlayer)                                                                | `next-intl`                                                                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Traduzioni vicino ai componenti**                      | ✅ Sì, `.content.ts` collocato con ogni componente                                        | ❌ No, centralizzato in `messages/{locale}.json`                                                                                   |
| **Integrazione TypeScript**                              | ✅ Tipi rigorosi generati automaticamente dal contenuto                                   | ✅ Buona, chiavi tipizzate tramite augmentation di `global.d.ts`                                                                   |
| **Rilevamento traduzioni mancanti**                      | ✅ Errore TypeScript + errore/avviso a livello di build                                   | ⚠️ Fallback a runtime + avviso console                                                                                             |
| **Rich content (JSX / Markdown / components)**           | ✅ Supporto diretto                                                                       | ⚠️ `t.rich()` / `t.markup()` con placeholder di tag                                                                                |
| **Supporto ICU**                                         | ⚠️ WIP                                                                                    | ✅ Sì                                                                                                                              |
| **Formattazione (date, numeri, valute)**                 | ✅ `useNumber`, `useDate`, ... (Intl sotto il cofano)                                     | ✅ `useFormatter()` (Intl sotto il cofano)                                                                                         |
| **Routing localizzato & middleware**                     | ✅ Proxy/middleware integrato, `getMultilingualUrls`                                      | ✅ Middleware integrato, `Link`, `redirect`, `usePathname`                                                                         |
| **Helper SEO (hreflang, sitemap, robots)**               | ✅ Helper integrati                                                                       | ⚠️ Manuale, basato sulla configurazione del routing                                                                                |
| **Componenti server sincroni**                           | ✅ `useIntlayer` da `next-intlayer/server` funziona in qualsiasi componente server figlio | ⚠️ `getTranslations` è asincrono; i figli sincroni necessitano che `t` sia passato come props                                      |
| **Rendering statico**                                    | ✅ Non blocca il rendering statico                                                        | ⚠️ Richiede `setRequestLocale()`; i cataloghi con namespace hanno comunque escluso le pagine dal rendering statico nei nostri test |
| **Tree-shaking (spedisci solo il contenuto utilizzato)** | ✅ Per componente, per locale, automatizzato dal compilatore                              | ⚠️ Manuale: namespace + `pick(messages, [...])` per pagina                                                                         |
| **Lazy loading**                                         | ✅ `importMode: 'dynamic'` (una riga di configurazione)                                   | ⚠️ Import dinamici manuali in `getRequestConfig`                                                                                   |
| **Purge unused content**                                 | ✅ Dead dictionaries are dropped at build time                                            | ❌ Not built-in                                                                                                                    |
| **Testing missing translations (CLI / CI)**              | ✅ `npx intlayer content test`                                                            | ⚠️ Not built-in; docs suggest `npx @lingual/i18n-check`                                                                            |
| **AI-powered translation**                               | ✅ Built-in, uses your own provider keys                                                  | ❌ No                                                                                                                              |
| **Visual Editor / CMS**                                  | ✅ Editor Visivo Gratuito + CMS opzionale                                                 | ❌ No (piattaforme di localizzazione esterne)                                                                                      |
| **MCP server & Agent Skills**                            | ✅ Sì                                                                                     | ❌ No                                                                                                                              |
| **Ecosystem / community**                                | ⚠️ Più piccolo ma in crescita veloce                                                      | ✅ Grande, il riferimento di Next.js                                                                                               |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) costruisce **la stessa applicazione** con ogni libreria: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locali** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuti identici. Le pagine vengono misurate in `en` e `fr`. Ogni libreria è implementata in fino a quattro **strategie di caricamento**, dal setup naive a quello ottimale:

| Strategy           | Description                                                                                     | Who does this                             |
| ------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **static**         | Ogni locale e ogni pagina raggruppate insieme                                                   | Prototipi rapidi, codice generato da AI   |
| **dynamic**        | Solo la locale attiva viene caricata, ma tutte le pagine contemporaneamente                     | La maggior parte dei progetti             |
| **scoped-static**  | Namespace per-route, nessun lazy loading                                                        | Raro                                      |
| **scoped-dynamic** | Namespace per-route + lazy loading. Solo la pagina corrente nella locale corrente viene inviata | App con un budget di performance rigoroso |

Intlayer non ha una variante "scoped": il compiler delimita il contenuto **per componente** automaticamente, quindi le sue righe `static` e `dynamic` sono già scoped.

Per ogni build, la suite registra:

- **Lib size**: dimensione gzip della libreria i18n in un componente vuoto che la importa solo. Il costo fisso del runtime.
- **Page JS**: JavaScript gzip scaricato per pagina, mediato su tutte le pagine e i locale.
- **Locale leak %**: quota di stringhe tradotte trovate nel JS scaricato che appartengono a un locale che l'utente **non** sta visualizzando (fingerprinted su `en` e `fr`, quindi il 50% significa "l'altro locale misurato è completamente presente"; con 10 locale raggruppati, lo spreco reale è maggiore).
- **Page leak %**: quota di stringhe tradotte trovate nel JS scaricato che appartengono a una pagina su cui l'utente **non** si trova.
- **Component avg**: dimensione media gzip di ogni componente compilato in isolamento. Mostra quanto runtime i18n un singolo componente introduce.
- **E2E reactivity**: tempo reale tra la selezione di una nuova locale e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Hydration**: durata della fase di hydration di React.

> I numeri sottostanti provengono dall'esecuzione datata **2026-09-12** con `next-intl` 4.14.2, `use-intl` 4.14.2 e `intlayer` 9.5.1. L'applicazione di test è deliberatamente piccola (poche dozzine di stringhe per locale), quindi le percentuali di dispersione descrivono un **pattern**: crescono con i tuoi contenuti mentre il costo runtime rimane fisso.

### Risultati su Next.js (App Router)

Seleziona le metriche e le librerie che ti interessano:

<I18nBenchmark framework="nextjs" vertical/>

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)             | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Come leggerlo**

- **Costo runtime.** L'applicazione di base pesa 141.0 KB per pagina. `next-intl` la porta a 153.6 KB (**+12.6 KB gzip su ogni pagina**), Intlayer a 141.3 KB (**+0.3 KB**). Questo divario non dipende da quante stringhe hai: è il runtime della libreria.
- **Leakage.** Nei due setup che la maggior parte dei team effettivamente distribuisce (`static` e `dynamic`), `next-intl` consegna **~90% delle stringhe di pagine straniere** con ogni pagina: l'intero `en.json` viene inserito nel provider client. Per arrivare a 0% è necessario utilizzare i setup `scoped-*`: dividere i cataloghi in namespace, quindi `pick()` quelli corretti in ogni pagina. Intlayer è al 0% in entrambe le righe senza nulla di tutto ciò.
- **Il JS per pagina non si è mosso per `next-intl` tra le strategie.** Il contenuto del test è piccolo, quindi la leakage ~90% è solo di pochi KB qui. Su un'app reale con centinaia di stringhe per pagina, quel rapporto diventa il costo dominante. Nel frattempo il runtime +12.6 KB viene pagato in ogni configurazione.
- **Dimensione del componente.** Un componente che chiama `useTranslations()` compila in media a 21.8 KB; lo stesso componente con `useIntlayer()` compila a 6.9 KB. Nella configurazione `scoped-static` i componenti `next-intl` aumentano a 80.1 KB perché ognuno inserisce il suo catalogo di namespace.
- **Reattività e idratazione** sono sullo stesso livello per entrambe le librerie su Next.js (15-18 ms). Nessuna è un collo di bottiglia qui.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa, ogni libreria e ogni strategia, nel [report di benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md).

### Risultati su TanStack Start (`use-intl`)

`use-intl` è il core indipendente dal framework di `next-intl`. Stessa API, stesso formato di messaggio. Confrontarlo con `intlayer` su TanStack Start rimuove le parti specifiche di Next.js dall'equazione.

| Libreria                      | Strategia      | Dimensione lib (gz) | Media JS pagina (gz) | Locale leak | Page leak | Media componente (gz) | Reattività E2E |
| ----------------------------- | -------------- | ------------------: | -------------------: | ----------: | --------: | --------------------: | -------------: |
| **base** (no i18n)            | -              |              0.0 KB |             111.0 KB |        0.0% |      0.0% |                0.7 KB |         8.1 ms |
| `use-intl`                    | static         |             14.1 KB |             179.8 KB |       50.0% |     89.8% |               76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |             14.1 KB |             119.4 KB |        0.0% |     89.8% |               75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |             14.1 KB |             128.7 KB |        0.0% |      0.0% |               87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |             14.1 KB |             128.7 KB |        0.0% |      0.0% |               87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |          **5.0 KB** |         **125.8 KB** |       50.0% |  **0.0%** |            **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |          **5.0 KB** |         **118.6 KB** |    **0.0%** |  **0.0%** |            **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |              7.3 KB |             129.7 KB |        0.0% |      0.0% |                9.3 KB |         8.7 ms |

**Come leggerlo**

- La configurazione naive di `use-intl` invia **68.8 KB di JS in più per pagina** rispetto all'app base, con metà delle stringhe appartenenti alla locale sbagliata e il 90% alla pagina sbagliata.
- `use-intl` in modalità `dynamic` arriva a 119.4 KB, vicino ai 118.6 KB di Intlayer, ma comunque mantiene **89.8% di page leakage**: tutte le stringhe delle pagine per la locale attiva vengono caricate su ogni pagina. Circoscriverle per route (`scoped-*`) rimuove la perdita ma costa altri ~9 KB di overhead del chunk.
- La riga `static` di Intlayer ha già **0% di page leakage**: il compiler raggruppa solo i dizionari utilizzati dai componenti sulla pagina. Abilitando `importMode: 'dynamic'` (una riga in `intlayer.config.ts`) rimuove anche la locale leakage.
- **La dimensione del componente è dove l'architettura si mostra**: 76-87 KB per componente con `use-intl` versus 6-8 KB con Intlayer. `useTranslations()` lega ogni componente all'albero dei messaggi globale; `useIntlayer()` lo lega al suo dizionario personale.
- **Cambio di locale** è 2-4 volte più veloce con Intlayer (3 ms vs 7-21 ms).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa nel [report di benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md).

## Perché il divario? Cataloghi centralizzati vs. dizionari compilati

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` segue il modello classico: un JSON per locale, caricato in `getRequestConfig`, inserito in un `NextIntlClientProvider`, letto attraverso `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Il runtime non può sapere quali chiavi una pagina utilizzerà, quindi il valore predefinito sicuro è inviare l'intero catalogo. Ottimizzare significa **tu** dividi il catalogo in namespace, **tu** decidi quali namespace ogni pagina ha bisogno, e **tu** mantieni quel mapping sincronizzato mentre i componenti si muovono. La riga `scoped-dynamic` del benchmark è la ricompensa per quel lavoro, e la maggior parte dei team non ci arriva mai.

Il costo di non arrivarci cresce su due assi contemporaneamente, pagine e impostazioni locali:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer capovolge la responsabilità. Il contenuto è dichiarato accanto al componente:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Al momento della compilazione il compiler (`@intlayer/swc` / `@intlayer/babel`) vede quale componente importa quale dizionario. Raggruppa solo i dizionari utilizzati, solo per la locale attiva, e scarta quelli che nessuno importa. Il pattern "scoped-dynamic" diventa l'output della build invece di essere una disciplina che il team deve mantenere.

> Per ottenere i numeri della riga `dynamic`, imposta `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Vedi la [documentazione di ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

## Esperienza dello sviluppatore

### Componente Client

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Ricorda di includere il namespace `counter` nei messaggi passati a `NextIntlClientProvider` su ogni pagina che renderizza questo componente.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ it: "Contatore", en: "Counter", fr: "Compteur" }),
    increment: t({ it: "Incrementa", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Niente da registrare sulla pagina: il componente porta con sé il suo contenuto.

</Tab>
</Tabs>
### Componente server sincrono

I componenti design-system (navbar, footer, cards) sono spesso componenti server renderizzati come figli di componenti client, quindi non possono essere `async`.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

La pagina deve `await getTranslations("counter")` e `await getFormatter()`, quindi passare i risultati come props. Il componente non è più autonomo.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";

</div>
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### Metadati

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Crea un percorso localizzato basato sulla locale
const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## Mantieni l'API di next-intl, ottieni l'output di Intlayer

Non devi riscrivere i componenti per ottenere i numeri di benchmark sopra. `@intlayer/next-intl` è un adattatore plug-and-play: mantiene `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, plurali ICU e gli helper di `next-intl/navigation`, e li serve dai dizionari Intlayer compilati dal compilatore Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Nel benchmark, la build di compatibilità della stessa app è passata da **153.6 KB a 147.5 KB** per pagina, da **21.8 KB a 8.1 KB** per componente, e da **~90% page leakage a 0%**, senza modificare il codice dell'applicazione. I tuoi file `messages/{locale}.json` esistenti possono rimanere la fonte di verità attraverso il [plugin JSON sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-intl.md).

Consulta la [guida di migrazione next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md) per le istruzioni passo dopo passo.

## Quando scegliere quale?

<AccordionGroup>
<Accordion header="Scegli next-intl">

Vuoi lo standard dell'ecosistema per Next.js, ti affidi a ICU MessageFormat, la tua app è di dimensioni medio-piccole o ti integri con una piattaforma di traduzione (Crowdin, Phrase, Lokalise...) che prevede JSON centralizzato. Considera il tempo per organizzare i cataloghi in namespace e selezionare i messaggi con `pick()` per pagina se le prestazioni contano.

</Accordion>
<Accordion header="Scegli Intlayer">

Vuoi **contenuto con ambito per componente**, **TypeScript rigoroso**, **errori di chiavi mancanti in fase di compilazione**, **tree-shaking e caricamento lazy senza sforzo**, componenti server sincroni e strumenti editoriali integrati ([Editor Visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), [traduzione AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md), [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)). Particolarmente rilevante per codebase modulari di grandi dimensioni e design system.

</Accordion>
<Accordion header="Scegli @intlayer/next-intl">

Utilizzi già `next-intl` e desideri i vantaggi in termini di dimensioni del bundle senza dover riscrivere tutto. L'[adattatore di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-intl.md) mantiene le importazioni e il file `messages/{locale}.json` come unica fonte di verità. Misurato fianco a fianco in [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer-next-intl.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="next-intl è più lento di Intlayer?">

Non al momento del rendering. La differenza risiede in ciò che viene inviato al browser: `next-intl` costa **+12.6 KB gzip** di runtime su ogni pagina e, nelle configurazioni più comuni, invia ~90% delle stringhe di pagine esterne con ogni pagina. Il cambio di lingua e l'idratazione sono paragonabili su Next.js (15-18 ms); su TanStack Start, `use-intl` impiega 7-21 ms contro i 3-4 ms di Intlayer.

</Question>

<Question title="Posso raggiungere lo 0% di dispersione con next-intl?">

Sì, con la configurazione `scoped-dynamic`: dividi `messages/{locale}.json` in un namespace per route, quindi usa `pick(messages, [...])` in ogni pagina e mantieni corretta questa mappatura man mano che i componenti cambiano. Le righe `scoped-*` del benchmark rappresentano proprio questo lavoro. Intlayer raggiunge lo 0% senza tutto questo perché il compilatore isola il contenuto per componente. Consulta [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

</Question>

<Question title="Devo riscrivere i miei componenti per migrare?">

No. `@intlayer/next-intl` mantiene `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, i plurali ICU e gli helper di navigazione, e li fornisce da dizionari compilati. Una sola riga di plugin in `next.config.ts`. Passo dopo passo nella [guida alla migrazione di next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md).

</Question>

<Question title="Intlayer supporta ICU MessageFormat?">

Il supporto nativo ICU è in fase di sviluppo sull'API principale. Gli adattatori di compatibilità (`@intlayer/next-intl`, `@intlayer/use-intl`) eseguono già ICU: plurali, `select`, `selectordinal`, `#` e `{ts, date, long}` passano attraverso il risolutore ICU di Intlayer. Leggi [formato di messaggio ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md) per i dettagli.

</Question>

<Question title="Posso conservare i miei file messages/{locale}.json?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-intl.md) li legge, divide le chiavi di livello superiore in dizionari e riscrive le traduzioni negli stessi file quando la CLI o il CMS li aggiorna. Il flusso di lavoro dei tuoi traduttori non cambia.

</Question>

</FAQ>

## Confronti correlati

Stesso benchmark, altre librerie:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md)

Approfondimenti su next-intl:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer-next-intl.md), l'adattatore misurato sulla stessa applicazione
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_next-intl_outdated.md)
- [Using Intlayer with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/intlayer_with_next-intl.md)
- [How to internationalize a Next.js app with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-intl.md)

Documenti di riferimento:

- [Report di benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md) e [report di benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)
- [Adattatore di compatibilità: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-intl.md) e [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md)
- [Ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e [il compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [i18n guidata da compilatore vs dichiarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)

## Star su GitHub

Le star su GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della rilevanza a lungo termine. Anche se non sono una misura diretta della qualità tecnica, riflettono quanti developer trovano il progetto utile, seguono il suo progresso e sono propensi ad adottarlo.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Conclusione

`next-intl` è una libreria solida e ben mantenuta, e il benchmark conferma che è tutt'altro che la peggiore opzione su Next.js. Tuttavia, il suo modello di catalogo centralizzato mette ogni ottimizzazione nelle mani dello sviluppatore: la configurazione ingenua fa filtrare ~90% dei contenuti delle pagine straniere, e il runtime da solo costa +12,6 KB gzip su ogni pagina.

Intlayer sposta quel lavoro nel compiler. Dizionari per-componente, lazy loading per-locale e purging del contenuto non utilizzato sono output di build, non convenzioni. Il risultato sulla stessa app: **+0.3 KB per pagina**, **0% leakage**, componenti **3x più piccoli**, e uno switch locale **2x-4x più veloce** su TanStack Start.

Tutti i dati grezzi, le app di test e gli script si trovano nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Eseguilo tu stesso.

Fai riferimento al documento ['Why Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) per maggiori dettagli.
