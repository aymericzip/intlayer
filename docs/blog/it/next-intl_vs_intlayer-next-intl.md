---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Stessa API, Bundle Diverso"
description: Cosa cambia quando le importazioni di next-intl di un'app Next.js vengono servite dall'adapter di compatibilità @intlayer/next-intl. Dimensione del bundle, perdite, dimensione dei componenti e idratazione misurate sullo stesso codice, più cosa mantiene, ignora e non può sostituire l'adapter.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Stessa API, Bundle Diverso

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` è un compat adapter: espone l'API di `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) e la serve da dizionari compilati da Intlayer. Il codice dell'applicazione non cambia. Il bundle sì.

Questo articolo confronta i due sulla stessa applicazione Next.js, costruita una volta con `next-intl` e una volta con l'adapter. I numeri provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open-source che registra ciò che il browser effettivamente scarica. Se vuoi il confronto `next-intl` vs Intlayer come librerie, leggi [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Questo riguarda ciò che l'adapter cambia quando mantieni i tuoi componenti come sono.

<TOC/>

> **tl;dr**: Sulla stessa app Next.js, sostituire `next-intl` con `@intlayer/next-intl` ha ridotto il JavaScript per pagina da **153.6 KB a 147.5 KB** gzip, il componente medio da **21.8 KB a 8.1 KB**, la perdita di stringhe da pagine estere da **~90% a 0%**, e l'idratazione da **14.7 ms a 12.8 ms**, senza modificare alcun componente. Su TanStack Start, l'equivalente `use-intl` (`@intlayer/use-intl`) ha ridotto i componenti da **76-87 KB a 9-11 KB** e il cambio di locale da **7-21 ms a 4-9 ms**. L'adapter costa **8.0 KB** di runtime rispetto ai **14.7 KB** di `next-intl` e ai **5.5 KB** di `next-intlayer` nativo. La navigazione e il middleware vengono reimplementati sulla configurazione di routing di Intlayer; i `pathnames` localizzati sono l'unica feature non trasferita.

## Cos'è `@intlayer/next-intl`

`next-intl` è un runtime: `getRequestConfig` carica un `messages/{locale}.json` per richiesta, `NextIntlClientProvider` lo invia al client, e `useTranslations("about")` legge le chiavi da quell'oggetto al momento del render. Ogni ottimizzazione (namespace, `pick(messages, [...])` per pagina, lazy loading) è a tuo carico.

`@intlayer/next-intl` mantiene la prima e l'ultima parte di quella catena e sostituisce quella centrale. I tuoi componenti continuano a chiamare `useTranslations("about"`; quello che ricevono proviene da un dizionario Intlayer compilato al momento della build, limitato a quel componente, solo nella locale attiva.

Tre meccanismi lo rendono possibile:

1. **Import aliasing.** `createNextIntlPlugin()` da `@intlayer/next-intl/plugin` avvolge `withIntlayer` e aggiunge alias Webpack / Turbopack in modo che `next-intl`, `next-intl/server`, `next-intl/navigation` e `next-intl/middleware` si risolvano a `@intlayer/next-intl`. Nessun import nella tua codebase viene rinominato.
2. **JSON come fonte di verità.** Il plugin `syncJSON` legge il tuo `messages/{locale}.json` esistente, divide le sue chiavi di primo livello in un dizionario per namespace, e scrive le traduzioni negli stessi file quando CLI o CMS li aggiorna. Il workflow dei tuoi traduttori rimane invariato.
3. **Call-site binding.** La pass di ottimizzazione di Intlayer (Babel o SWC) riscrive `useTranslations("about")` in una chiamata che riceve direttamente il dizionario `about`. Il componente non raggiunge più un albero di messaggi globale; raggiunge il suo stesso contenuto.

```tsx fileName="app/[locale]/about/page.tsx"
// Il tuo codice, invariato
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Ciò che il compilatore emette (semplificato)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Questo riscrittura è il motivo per cui le colonne dimensioni dei componenti e page-leakage qui sotto si spostano: una pagina estrae solo i dizionari dei componenti che renderizza, e solo nella locale servita.

## Ciò che l'adapter mantiene, ignora e non sostituisce

| `next-intl` API                                                      | Con `@intlayer/next-intl`                                                                                                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Mantenuto. Vincolato al dizionario `ns` al build time. Le chiavi sono tipizzate rispetto ai tuoi contenuti.                                       |
| `getTranslations({ locale, namespace })`                             | ✅ Mantenuto                                                                                                                                         |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Mantenuto. I plurali ICU, `select`, `selectordinal`, `#`, `{ts, date, long}` vengono elaborati tramite il resolver ICU di Intlayer                |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Mantenuto                                                                                                                                         |
| `useFormatter()`                                                     | ✅ Mantenuto. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` si collegano alle API native `Intl`                                      |
| `NextIntlClientProvider`                                             | ✅ Mantenuto. Le props `messages`, `timeZone` e `now` sono **accettate ma ignorate** (un avviso di sviluppo te lo comunica)                          |
| `getMessages()`                                                      | ✅ Mantenuto per compatibilità; non più necessario                                                                                                   |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ Non necessario. I dizionari sono compilati al momento della build; non c'è caricamento di messaggi per-request                                    |
| `defineRouting()`                                                    | ✅ Mantenuto. I campi omessi (`locales`, `defaultLocale`, `localePrefix`) sono letti da `intlayer.config.ts`                                         |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Mantenuto. Re-implementato sulla configurazione di routing di Intlayer; l'argomento `routing` è accettato ma ignorato                             |
| `pathnames` (nomi di rotte localizzate)                              | ❌ Accettato per la tipizzazione, **non interpolato**. Mantieni i percorsi semplici o sposta quel mapping al `rewrite` di Intlayer                   |
| `createMiddleware()`                                                 | ✅ Mantenuto. Restituisce il proxy di Intlayer; imposta il cookie `NEXT_LOCALE` in modo che `useLocale()` e il tuo switcher continuino a funzionare  |
| Cookie `NEXT_LOCALE`                                                 | ✅ Letto per impostazione predefinita (a meno che tu non configuri `routing.storage` da solo)                                                        |
| Bare `useTranslations()` con nessuno namespace                       | ⚠️ Funziona, ma il sito di chiamata non è vincolato: si risolve attraverso il registro runtime. Passa un namespace per ottenere i guadagni di bundle |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) costruisce **la stessa applicazione** con ogni setup: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuto identico. Le pagine sono misurate in `en` e `fr`.

`next-intl` è stato costruito con quattro strategie di caricamento, dalla configurazione ingenua (`messages/{locale}.json` caricato interamente) a quella ottimale (uno namespace per route + `pick()` per pagina). L'adapter è stato costruito sugli **stessi componenti della configurazione ingenua**, con solo `next.config.ts` e `intlayer.config.ts` modificati. Non ha una variante "scoped": il compiler scopa il contenuto per componente, quindi le righe `static` e `dynamic` sono già scoped.

Per ogni build, la suite registra:

- **Lib size**: dimensione gzip di un componente vuoto che importa solo la libreria i18n. Il costo fisso del runtime.
- **Page JS**: JavaScript gzip scaricato per pagina, mediato su tutte le pagine e le locale.
- **Locale leak %**: percentuale di stringhe tradotte trovate nel JS scaricato che appartengono a una locale che l'utente **non** sta visualizzando.
- **Page leak %**: percentuale di stringhe tradotte trovate nel JS scaricato che appartengono a una pagina su cui l'utente **non** si trova.
- **Component avg**: dimensione gzip media di ogni componente compilato isolatamente. Mostra quanto runtime i18n e catalogo un singolo componente comporta.
- **E2E reactivity**: tempo trascorso tra la selezione di una nuova locale e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Hydration**: durata della fase di hydration di React.

> I numeri sottostanti provengono dall'esecuzione datata **2026-09-12** con `next-intl` / `use-intl` 4.14.2 e `@intlayer/*` 9.5.1. L'applicazione di test è deliberatamente piccola (poche decine di stringhe per locale), quindi le percentuali di leakage descrivono un **pattern**: crescono con i tuoi contenuti mentre il costo del runtime rimane fisso.

### Risultati su Next.js

Seleziona le metriche e le librerie che ti interessano:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Come leggerlo**

- **Stessi componenti, 6 KB in meno per pagina.** La build dell'adapter dell'app naive atterra a **147.5 KB**, al di sotto di ogni configurazione di `next-intl` inclusa quella completamente ottimizzata (153.6 KB). Il runtime stesso è la differenza: 8.0 KB versus 14.7 KB, pagati su ogni pagina.
- **La perdita di dati va a 0% senza toccare un componente.** La configurazione naive di `next-intl` spedisce ~90% delle stringhe di pagine straniere su ogni pagina. Raggiungere 0% con `next-intl` significa le configurazioni `scoped-*`: uno namespace per route e `pick(messages, [...])` in ogni pagina. L'adapter raggiunge 0% dal codice naive perché il pass di ottimizzazione lega ogni `useTranslations("ns")` al proprio dizionario.
- **I componenti si riducono 2.7x.** Un componente compilato in isolamento media **21.8 KB** con `next-intl` (raggiunge il provider e l'albero dei messaggi) e **8.1 KB** con l'adapter. Nella configurazione `scoped-static` di `next-intl` quel numero sale _fino a_ 80 KB, perché il file namespace di ogni route diventa raggiungibile dalla pagina che lo seleziona.
- **L'idratazione è 2 ms più veloce** (12.8 vs 14.7 ms): non c'è nessun oggetto messaggio da deserializzare dal payload RSC prima che React possa idrare.
- **L'adapter non è il runtime nativo.** `next-intlayer` si posiziona a **141.3 KB**, +0.3 KB sopra l'app base, con un runtime di 5.5 KB. L'adapter trasporta la superficie API di `next-intl` (`useFormatter`, `t.rich`, il risolutore ICU) in cima al core di Intlayer, da cui 8.0 KB e +6 KB per pagina. È il ponte, non la destinazione.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa, ogni libreria e ogni strategia, nel [report di benchmark Next.js](https://intlayer.org/it/doc/benchmark/nextjs).

### Risultati su TanStack Start (`use-intl`)

`use-intl` è il core framework-agnostico di `next-intl`. Il suo adapter, `@intlayer/use-intl`, segue lo stesso design con un plugin Vite (`@intlayer/use-intl/plugin`).

| Setup                    | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)       | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |    **7.3 KB** |         135.8 KB |       49.7% |  **0.0%** |        **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |    **7.3 KB** |     **129.7 KB** |    **0.0%** |  **0.0%** |         **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |        5.0 KB |         125.8 KB |       50.0% |      0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |        5.0 KB |         118.6 KB |        0.0% |      0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**Come leggerlo**

- **I byte per pagina sono equivalenti rispetto a `use-intl` ottimizzato.** `@intlayer/use-intl` in modalità `dynamic` (129.7 KB) è entro 1 KB da `use-intl`'s `scoped-dynamic` (128.7 KB), e 10 KB _più grande_ di `use-intl`'s plain `dynamic` (119.4 KB). Quella riga `dynamic` plain ha ancora una perdita del 90% di stringhe da pagine estere; il conteggio dei byte è basso perché il contenuto dell'app di test è piccolo. Lo 0% dell'adapter è quello che rimane piatto man mano che il contenuto cresce.
- **I componenti sono 7-9 volte più piccoli.** I componenti `use-intl` hanno una media di **76-87 KB** in ogni strategia, perché `useTranslations` è associato all'intero oggetto messaggio del provider. L'adapter ha una media di **9-11 KB**.
- **Lo switching delle locale è più veloce.** Gli setup `use-intl` ottimizzati impiegano **13-21 ms** per aggiornare `html[lang]`; l'adapter impiega **4-9 ms**. Meno componenti vengono renderizzati di nuovo, e niente viene ripreso da un albero di messaggi.
- **`static` mantiene ogni locale.** La riga `static` dell'adapter mostra una perdita di locale del 49,7%, la stessa di Intlayer nativo in modalità `static`: tutte le locale vengono raggruppate, solo i dizionari della pagina. Una riga di configurazione (`importMode: 'dynamic'`) la rimuove.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa nel [report di benchmark TanStack Start](https://intlayer.org/it/doc/benchmark/tanstack).

## Perché i numeri cambiano

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Poiché niente nel componente è cambiato, i guadagni provengono interamente da ciò a cui `useTranslations` è associato.

**Con `next-intl`**, il binding è il provider. `NextIntlClientProvider` riceve l'intero oggetto `messages` per la locale; ogni `useTranslations("about")` legge da esso. Il bundler vede un componente che importa un hook che legge un context, e non può sapere che solo il ramo `about` è utilizzato. Le route di seguito condividono tutti lo stesso oggetto message, quindi la colonna page-leak legge ~90% fino a quando non dividi il file tu stesso, e lo spreco cresce su due assi contemporaneamente, pagine e impostazioni locali:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # ogni namespace, ogni pagina
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Con `@intlayer/next-intl`**, il binding è il dizionario. `syncJSON` trasforma `messages/en.json` in un dizionario per ogni chiave di primo livello; il compilatore risolve quale componente chiama `useTranslations("about")` e gli passa `about` direttamente, nella locale attiva, come un import che il bundler può tracciare e splittare.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() ora restituisce il proxy di Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (nessun prop messages)
        └── about/page.tsx            # useTranslations("about")  ← invariato
```

`src/i18n.ts` e il prop `messages` scompaiono. Tutto il resto è identico.

## Migrazione in tre passaggi

<Steps>
<Step number={1} title="Installa">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Il comando rileva `next-intl` e installa `intlayer`, `next-intlayer`, `@intlayer/next-intl` e `@intlayer/sync-json-plugin`. Mantieni `next-intl` installato: è una peer dependency dell'adapter e fornisce i types.

</Step>
<Step number={2} title="Punta Intlayer ai tuoi messaggi">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" raggruppa ogni locale; "dynamic" carica quella attiva su richiesta
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // Placeholder ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` rimane dov'è. Ogni chiave di primo livello diventa un dictionary; `useTranslations("about")` viene mappato al dictionary `about`.

</Step>
<Step number={3} title="Avvolgi next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` compone `withIntlayer` (content watching, compilazione del dizionario, il passaggio di ottimizzazione) e gli alias `next-intl` → `@intlayer/next-intl` per Webpack e Turbopack. Compila, e i numeri nelle tabelle sopra sono tuoi.

</Step>
</Steps>

### Cosa puoi eliminare successivamente

| File / pattern                               | Perché                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig` in `src/i18n.ts`          | Nessun caricamento di messaggi per-request. Mantieni il file solo se esporta anche gli helper `createNavigation` |
| `messages={...}` su `NextIntlClientProvider` | L'adapter legge l'output compilato; il prop viene ignorato e registra un avviso in sviluppo                      |
| `await getMessages()` nei layout             | Stesso motivo                                                                                                    |
| Per-page `pick(messages, [...])`             | Il compiler fa il picking, per componente                                                                        |

### Cosa guadagni oltre ai byte

- **Typed keys.** `useTranslations("about")` è tipizzato rispetto al dizionario compilato `about`. `t("does.not.exist")` è un errore TypeScript, non un fallback runtime.
- **`npx intlayer test`** interrompe la CI quando a una locale manca una chiave. **`npx intlayer fill`** traduce le chiavi mancanti con il provider di tua scelta (OpenAI, Anthropic, Mistral, Gemini...) utilizzando la tua chiave personale e scrive il risultato in `messages/{locale}.json`.
- **Visual Editor e CMS** funzionano sugli stessi dizionari, quindi gli sviluppatori non svuoti possono modificare `messages/fr.json` attraverso un'interfaccia utente e il file si aggiorna.
- **Migrazione incrementale a `.content.ts`.** Qualsiasi componente può passare da `useTranslations("about")` a `useIntlayer("about")` con un file di contenuto colocato, uno alla volta. I dizionari JSON e `.content.ts` coesistono e si uniscono.

## Limiti da conoscere prima di iniziare

<AccordionGroup>
<Accordion header="La configurazione di routing si sposta in intlayer.config.ts">

`createNavigation(routing)` e `createMiddleware(routing)` mantengono la loro firma ma ignorano l'argomento: lingue, lingua predefinita e strategia di prefisso provengono dalla configurazione `routing` di Intlayer. Se usi i `pathnames` localizzati di `next-intl` (`/about` in `/a-propos`), l'adattatore non li interpola; `routing.rewrite` di Intlayer copre quel caso ma è una modifica separata.

</Accordion>
<Accordion header="useTranslations() senza namespace non è associato">

Il passaggio di ottimizzazione ha bisogno di un namespace statico per sapere quale dizionario importare. Una chiamata senza namespace funziona comunque, tramite un registro di runtime che fa riferimento a ciascun dizionario, il che corrisponde esattamente alla dispersione che stavi cercando di rimuovere. Passa il namespace.

</Accordion>
<Accordion header="L'adattatore non è gratuito">

8.0 KB di runtime contro 5.5 KB per `next-intlayer` e +6-7 KB per pagina rispetto alla build nativa. Paga per la superficie API di `next-intl`. Se arrivi al punto in cui ogni componente è passato a `useIntlayer`, rimuovi l'adattatore.

</Accordion>
<Accordion header="messages, timeZone e now sul provider vengono ignorati">

I formattatori sono supportati dall'API nativa `Intl` e solo la lingua influenza il loro output. Se ti affidi a un fuso orario forzato o a un `now` fisso per date stabili all'idratazione, gestiscilo nel punto di chiamata. Vedi [formattazione di date, orari e numeri](https://intlayer.org/it/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## Quando usare quale?

<AccordionGroup>
<Accordion header="Rimani su next-intl">

La tua app è piccola, il bundle non è un problema e il tuo team gestisce comodamente namespace e `pick()` per pagina.

</Accordion>
<Accordion header="Usa @intlayer/next-intl">

Usi già `next-intl` oggi e desideri i vantaggi di bundle, dispersione e idratazione, chiavi tipizzate e strumenti CLI / CMS senza dover riscrivere il codice. Questo è il punto di partenza consigliato per qualsiasi codebase `next-intl` esistente.

</Accordion>
<Accordion header="Passa al nativo (next-intlayer)">

Per nuovi progetti, o una volta che l'adattatore ha fatto il suo lavoro. È il più leggero dei tre (5.5 KB, +0.3 KB per pagina) e sblocca componenti server sincroni, file `.content.ts` per componente e l'intero set di funzionalità. Inizia con [Intlayer con Next.js](https://intlayer.org/it/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Il codice della mia applicazione rimane davvero intatto?">

Su Next.js, sì per i componenti: la build di benchmark ha modificato solo `next.config.ts` e `intlayer.config.ts`. `getRequestConfig` in `src/i18n.ts`, la prop `messages` sul provider e le chiamate `pick()` per pagina diventano codice morto che puoi eliminare in seguito.

</Question>

<Question title="Cosa succede ai messaggi ICU?">

Continuano a funzionare. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` e `{ts, date, long}` vengono risolti dal risolutore ICU di Intlayer. Vedi [formato di messaggio ICU](https://intlayer.org/it/blog/icu-message-format).

</Question>

<Question title="Perché l'adattatore è più pesante di next-intlayer nativo?">

Porta con sé la superficie API di `next-intl` sopra il core di Intlayer: `useFormatter`, `t.rich`, il risolutore ICU, gli helper di navigazione. Si tratta di 8.0 KB contro 5.5 KB, e +6 KB per pagina. È il ponte, non la destinazione finale.

</Question>

<Question title="Posso migrare componente per componente?">

Sì. Qualsiasi componente può passare da `useTranslations("about")` a `useIntlayer("about")` con un file `.content.ts` co-locato. I dizionari JSON e `.content.ts` coesistono e si uniscono.

</Question>

<Question title="I percorsi localizzati (pathnames) funzionano?">

Non tramite i `pathnames` di `next-intl`: l'adattatore li accetta per la tipizzazione ma non li interpola. Usa invece `routing.rewrite` di Intlayer, che emette i letterali localizzati nel registro dei tipi.

</Question>

</FAQ>

## Confronti correlati

Stessa serie di adattatori:

- [i18next vs @intlayer/i18next](https://intlayer.org/it/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/it/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-vue-i18n)

Le librerie a confronto diretto:

- [next-intl vs Intlayer](https://intlayer.org/it/blog/next-intl-vs-intlayer), stesso benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/it/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/it/blog/is-next-intl-outdated)

Documenti di riferimento:

- [Compat adapter: next-intl](https://intlayer.org/it/doc/compatibility/next-intl)
- [Guida alla migrazione: da next-intl a Intlayer](https://intlayer.org/it/doc/migration/next-intl)
- [Report di benchmark Next.js](https://intlayer.org/it/doc/benchmark/nextjs) e [report di benchmark TanStack Start](https://intlayer.org/it/doc/benchmark/tanstack)
- [Ottimizzazione del bundle](https://intlayer.org/it/doc/concept/bundle-optimization) e [il compilatore Intlayer](https://intlayer.org/it/doc/compiler)
- [Editor Visuale](https://intlayer.org/it/doc/concept/editor), [CMS](https://intlayer.org/it/doc/concept/cms) e [traduzione AI](https://intlayer.org/it/doc/concept/auto-fill)

## Conclusione

`@intlayer/next-intl` fa una cosa sola: cambia a cosa è associato `useTranslations`, da un provider che contiene ogni messaggio a un dizionario compilato per quel componente. Sulla stessa app Next.js che vale **6 KB per pagina**, **componenti 2,7x più piccoli**, **0% leakage** e **2 ms di hydration**, prima che chiunque apra un file di componente. Navigation e middleware mantengono la loro API in cima alla configurazione di routing di Intlayer, e il runtime nativo `next-intlayer` rimane ancora più leggero.

Tutti i dati grezzi, le app di test e gli script sono nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Eseguilo tu stesso.

Fai riferimento al [doc 'Why Intlayer?'](https://intlayer.org/doc/why) per ulteriori dettagli.
