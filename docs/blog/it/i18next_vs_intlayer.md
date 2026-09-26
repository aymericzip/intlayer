---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs Intlayer: Benchmark e confronto 2026"
description: "react-i18next e next-i18next misurati rispetto a Intlayer su Next.js e TanStack Start. Dimensioni del bundle, dispersione dei contenuti, reattività al cambio lingua ed esperienza di sviluppo."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Benchmark
  - Dimensioni bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark di internazionalizzazione (i18n) per React e Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` è il framework di i18n più diffuso nell'ecosistema JavaScript. Attraverso `react-i18next` e `next-i18next`, alimenta un'ampia quota di applicazioni React e Next.js. Intlayer è un'alternativa basata su compilatore e con ambito per componente.

Questo articolo li mette a confronto attraverso misurazioni concrete anziché elenchi di funzionalità. I dati provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open source che compila la stessa applicazione con ciascuna libreria e registra ciò che il browser scarica effettivamente.

<TOC/>

> **tl;dr**: `i18next` è il runtime più pesante del benchmark: **+77 KB gzip per pagina** su Next.js nella configurazione standard (naive), **+22 KB** dopo l'ottimizzazione completa con namespace e lazy loading. Intlayer aggiunge appena **+0.3 KB**. Ogni configurazione di `i18next`, tranne quella completamente isolata (scoped), include **~90% di stringhe di pagine non visitate**; Intlayer ne include lo **0%** per impostazione predefinita. Il cambio di lingua con backend caricato in modalità lazy ha richiesto **123-185 ms** con `react-i18next` contro **3-4 ms** con Intlayer. L'adattatore `@intlayer/next-i18next` conserva l'API di `i18next` e si attesta a **150.7 KB** per pagina rispetto ai **218.5 KB** dell'originale.

## In sintesi

- **i18next / react-i18next / next-i18next** - Maturo, ricco di plugin e indipendente dal framework. Namespace, rilevatori di lingua, backend, ICU tramite plugin, `<Trans>` per contenuti avanzati. I contenuti sono centralizzati in `locales/{lng}/{ns}.json`. Potente, ma ogni ottimizzazione (divisione in namespace, caricamento per pagina, sicurezza dei tipi) richiede configurazioni manuali a carico dello sviluppatore.
- **Intlayer** - Modello incentrato sui componenti. I dizionari `.content.ts` risiedono accanto al componente a cui sono destinati, un compilatore in fase di build applica tree-shaking e lazy loading per componente e per lingua, tipi TypeScript rigorosi vengono generati automaticamente dai contenuti e le traduzioni mancanti bloccano la compilazione. Include middleware, helper SEO, un editor visuale / CMS e traduzione assistita da IA.

| Libreria                | Stelle GitHub                                                                                                                                                                      | Commit totali                                                                                                                                                                          | Ultimo commit                                                                                                                                           | Prima versione | Versione NPM                                                                                                          | Download NPM                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Aprile 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Gennaio 2012   | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Dicembre 2015  | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Novembre 2018  | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> I badge si aggiornano automaticamente. Le metriche variano nel tempo.

## Confronto delle caratteristiche

| Caratteristica                                 | Intlayer (`react-intlayer` / `next-intlayer`)                                    | i18next (`react-i18next` / `next-i18next`)                                         |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Traduzioni vicine ai componenti**            | ✅ Sì, `.content.ts` posizionato accanto a ogni componente                       | ❌ No, cartella centralizzata `locales/{lng}/{ns}.json`                            |
| **Integrazione con TypeScript**                | ✅ Tipi rigorosi generati in automatico dai contenuti                            | ⚠️ Base; richiede estensione manuale di `CustomTypeOptions` e tipizzazione         |
| **Rilevamento traduzioni mancanti**            | ✅ Errore TypeScript + errore/avviso in fase di compilazione                     | ⚠️ Fallback a runtime (`saveMissing`, restituzione della chiave)                   |
| **Contenuti avanzati (JSX / Markdown)**        | ✅ Supporto nativo                                                               | ⚠️ `<Trans>` con segnaposto indicizzati                                            |
| **Supporto ICU**                               | ⚠️ In lavorazione                                                                | ⚠️ Tramite plugin (`i18next-icu`)                                                  |
| **Pluralizzazione**                            | ✅ Modelli basati su enumerazioni                                                | ✅ Suffissi `_one` / `_other` (Intl.PluralRules)                                   |
| **Formattazione (date, numeri, valute)**       | ✅ `useNumber`, `useDate`, ... (Intl integrato)                                  | ⚠️ Formattatori di interpolazione o chiamate manuali a `Intl.*`                    |
| **Routing localizzato e middleware**           | ✅ Proxy/middleware integrato, `getMultilingualUrls`                             | ⚠️ Non nativo; richiede middleware personalizzato o di terze parti                 |
| **Helper SEO (hreflang, sitemap, robots)**     | ✅ Helper integrati                                                              | ❌ Manuale                                                                         |
| **Componenti server sincroni**                 | ✅ `useIntlayer` da `next-intlayer/server` utilizzabile in ogni server component | ⚠️ `getFixedT` a livello di pagina, poi `t` passato come prop                      |
| **Tree-shaking (carica solo contenuti usati)** | ✅ Per componente, per lingua, automatizzato dal compilatore                     | ⚠️ Manuale: namespace + lista `ns` per pagina + backend                            |
| **Lazy loading**                               | ✅ `importMode: 'dynamic'` (una riga di configurazione)                          | ✅ Tramite plugin backend (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Eliminazione contenuti inutilizzati**        | ✅ I dizionari orfani vengono scartati in fase di compilazione                   | ❌ Non integrato                                                                   |
| **Test traduzioni mancanti (CLI / CI)**        | ✅ `npx intlayer content test`                                                   | ⚠️ `i18next-parser` / strumenti di terze parti                                     |
| **Traduzione assistita da IA**                 | ✅ Integrata, utilizza le tue chiavi API                                         | ❌ No (Locize è un servizio a pagamento separato)                                  |
| **Editor Visuale / CMS**                       | ✅ Editor Visuale gratuito + CMS opzionale                                       | ❌ No (Locize / piattaforme esterne)                                               |
| **Server MCP e Agent Skills**                  | ✅ Sì                                                                            | ❌ No                                                                              |
| **Ecosistema e community**                     | ⚠️ Più recente ma in rapida espansione                                           | ✅ Il più esteso e consolidato                                                     |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) costruisce **la medesima applicazione** con ciascuna libreria: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lingue** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti e contenuti identici. Le pagine sono misurate in `en` e `fr`. Ogni libreria viene testata con un massimo di quattro **strategie di caricamento**:

| Strategia          | Descrizione                                                                               | Casi d'uso tipici                                  |
| ------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **static**         | Tutte le lingue e pagine raggruppate (`resources` incorporate in `init()`)                | Prototipi veloci, codice generato da IA            |
| **dynamic**        | Solo la lingua attiva viene caricata via backend, ma tutti i namespace contemporaneamente | La maggior parte dei progetti                      |
| **scoped-static**  | Un namespace per percorso, tutti inclusi in anticipo                                      | Raro                                               |
| **scoped-dynamic** | Un namespace per percorso + lazy loading tramite backend. Solo pagina e lingua correnti   | Applicazioni con vincoli di performance stringenti |

Intlayer non necessita di una variante "scoped": il compilatore suddivide i contenuti **per componente** in modo del tutto automatico, per cui le righe `static` e `dynamic` sono già ottimizzate.

Per ciascuna build, la suite registra:

- **Lib size**: dimensione gzip di un componente vuoto che importa esclusivamente la libreria i18n.
- **Page JS**: JavaScript gzip scaricato per pagina, mediato su tutte le pagine e lingue.
- **Locale leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a una lingua che l'utente **non** sta visualizzando.
- **Page leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a pagine in cui l'utente **non** si trova.
- **Component avg**: dimensione media gzip di ciascun componente compilato isolatamente.
- **E2E reactivity**: intervallo reale tra la selezione di una nuova lingua e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Hydration**: durata della fase di idratazione di React.

> I dati seguenti si riferiscono al test del **2026-09-12** con `next-i18next` 16.3.0, `react-i18next` 17.0.13 e `intlayer` 9.5.1. L'applicazione di test è volutamente contenuta (poche decine di stringhe per lingua), pertanto le percentuali di dispersione mostrano un **modello**: crescono insieme ai contenuti mentre il costo del runtime rimane costante.

### Risultati su Next.js (`next-i18next`)

Seleziona le metriche e le librerie che ti interessano:

<I18nBenchmark framework="nextjs" vertical/>

| Libreria                          | Strategia      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reattività E2E | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (senza i18n)             | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        11.9 ms |   10.6 ms |

**Come interpretare i dati**

- **Costo del runtime.** Il core di `i18next` abbinato a `react-i18next` è il runtime più consistente: **19.7 KB gzip** per un componente vuoto, rispetto ai 5.5 KB di `next-intlayer`.
- **La configurazione base è onerosa.** Incorporare `resources` in `init()` produce **218.5 KB per pagina**, +77.5 KB rispetto all'applicazione priva di i18n. Ogni pagina include tutti i namespace.
- **Ottimizzare richiede lavoro.** Passare a un backend (`dynamic`) risparmia 49 KB ma disperde ancora il **90% delle stringhe di altre pagine** e, in questo scenario, la metà delle stringhe appartiene alla lingua errata. Aggiungere la divisione per namespace su ogni route (`scoped-dynamic`) raggiunge lo 0% di dispersione a **163.4 KB**, rimanendo comunque **+22.4 KB per pagina** sopra Intlayer (141.3 KB), che non ha richiesto alcuna configurazione speciale.
- **Dimensioni dei componenti.** Un componente con `useTranslation()` compila tra i 26 e i 79 KB; lo stesso componente con `useIntlayer()` si attesta a 6.9 KB.
- **L'idratazione** sale a 27.7 ms nella configurazione `dynamic`: l'istanza i18next si inizializza e risolve il proprio backend sul client prima che React possa idratare la pagina.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa, ogni libreria e ogni strategia, nel [rapporto di benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md).

### Risultati su TanStack Start (`react-i18next`)

Stessa applicazione di prova su TanStack Start con `react-i18next` puro, isolando la comparazione dalle specificità di Next.js.

| Libreria           | Strategia      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | Reattività E2E | Hydration |
| ------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |   21.6 ms |
| `react-i18next`    | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |        12.9 ms |   85.1 ms |
| `react-i18next`    | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |       123.1 ms |   32.9 ms |
| `react-i18next`    | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |       185.1 ms |   25.2 ms |
| `react-i18next`    | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |        17.6 ms |   11.3 ms |
| **`intlayer`**     | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |   11.5 ms |
| **`intlayer`**     | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |   14.1 ms |

**Come interpretare i dati**

- L'app `react-i18next` di base trasmette **+69 KB per pagina** rispetto all'applicazione senza i18n, e l'idratazione impiega **85 ms** (4 volte il valore di base) perché l'albero completo delle risorse viene elaborato e registrato sul client prima del rendering iniziale.
- **Il cambio di lingua rende evidente la latenza del lazy loading.** Quando le risorse vengono caricate al bisogno, il cambio lingua comporta una chiamata di rete prima dell'aggiornamento di `html[lang]`: **123 ms** in `dynamic`, **185 ms** in `scoped-static`. Intlayer aggiorna il DOM in **3-4 ms** in entrambe le modalità: la modifica è istantanea e non dipende da richieste di rete.
- L'assetto interamente ottimizzato `scoped-dynamic` tocca lo 0% di dispersione a 127.2 KB, rimanendo comunque **+8.6 KB** sopra la riga `dynamic` di Intlayer, e ha richiesto una mappatura route-namespace, un backend di risorse e confini Suspense dedicati.
- La riga `static` di Intlayer ha già **0% di dispersione di pagina** poiché vengono inclusi solo i dizionari importati dai componenti effettivi della pagina. Abilitando `importMode: 'dynamic'` si azzera anche la dispersione linguistica.
- **Dimensioni componenti**: 24-27 KB con `react-i18next` contro 6-8 KB con Intlayer. `useTranslation()` vincola ogni componente all'istanza globale di i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa nel [rapporto di benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md).

## Origine del divario: Istanza globale vs dizionari compilati

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` è nato nel 2012 come runtime: un'istanza globale mantiene un archivio di risorse, i plugin la espandono e `t()` ricerca le chiavi a runtime. Tale architettura garantisce grande versatilità (qualsiasi framework, backend e formato), ma introduce inevitabilmente overhead:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # deve sapere che necessita di ["common", "about"]
```

L'istanza non può anticipare le chiavi richieste da un componente. Ottimizzare significa che **tu** devi suddividere i file in namespace, **tu** devi elencare i namespace richiesti da ogni pagina e **tu** devi mantenere allineata la lista quando i componenti vengono spostati.

La spesa cresce su due assi contemporaneamente, pagine e lingue:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Come riportato nelle [note del benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "mantenere la sicurezza dei tipi e sapere esattamente quale namespace includere su quale pagina è un incubo".

Intlayer elimina l'istanza globale. I contenuti sono dichiarati accanto al componente e il compilatore risolve il grafico delle dipendenze durante il build:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` analizza quale componente importa quale dizionario, impacchetta esclusivamente quelli utili per la lingua corrente e scarta il resto. Il pattern "scoped-dynamic" diventa il risultato naturale del build anziché un onere manuale.

> Per ottenere i parametri della riga `dynamic`, imposta `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Consulta la [guida all'ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

## Esperienza di sviluppo

### Configurazione

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

A questo si aggiunge un `I18nProvider` client che reinizializza l'istanza con le medesime opzioni, `generateStaticParams` e un elenco `namespaces` per ciascuna pagina.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Componente client

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
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
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> La pagina che renderizza questo componente deve caricare il namespace `about`, e `t("counter.label")` rimane una stringa semplice finché non si estende `CustomTypeOptions`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
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

`label` e `increment` sono tipizzati rigorosamente: ogni errore di battitura genera un errore TypeScript e una traduzione mancante blocca la compilazione.

</Tab>
</Tabs>

### Componente server sincrono

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

La pagina invoca `i18n.getFixedT(locale, "about")` e trasmette `t` e `locale` verso il basso tramite props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
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

## Conserva l'API di i18next, sfrutta le prestazioni di Intlayer

Non serve riscrivere i componenti per beneficiare dei numeri del benchmark. `@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` sono adattatori compatibili pronti all'uso: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, plurali `_one` / `_other`, suffissi di contesto e `returnObjects` continuano a funzionare, erogati tramite i dizionari compilati da Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Nel benchmark, la versione con adattatore della medesima app Next.js è passata da **218.5 KB a 150.7 KB** per pagina, da **78.5 KB a 9.7 KB** per componente, da **~90% di dispersione a 0%**, e l'idratazione da 15.6 ms a 11.3 ms, senza alterare il codice dell'applicazione. I file esistenti `locales/{lng}/{ns}.json` possono rimanere la sorgente primaria dei dati tramite il plugin di sincronizzazione JSON.

Consulta le guide di migrazione: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-i18next_to_intlayer.md).

## Quando scegliere quale soluzione?

<AccordionGroup>
<Accordion header="Scegliere i18next">

Se necessiti del suo ecosistema di plugin (rilevatori, backend, ICU, Locize), se gestisci la localizzazione anche fuori da React (servizi Node, vanilla JS, altri framework), se il tuo team ha già consolidata esperienza o se una piattaforma di traduzione richiede `locales/{lng}/{ns}.json`. Considera il tempo necessario per organizzare i namespace, configurare un backend e mantenere aggiornata la mappa delle route se le performance sono critiche.

</Accordion>
<Accordion header="Scegliere Intlayer">

Desideri **contenuti limitati ai componenti**, **TypeScript rigoroso**, **errori di chiavi mancanti in fase di compilazione**, **tree-shaking e lazy loading senza sforzo**, cambio istantaneo della lingua, componenti server sincroni e strumenti editoriali integrati ([Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), [traduzione AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md), [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)). Particolarmente rilevante per basi di codice modulari e sistemi di design.

</Accordion>
<Accordion header="Scegliere gli adattatori @intlayer/*-i18next">

Utilizzi già i18next e desideri i vantaggi del bundle e della reattività senza riscrivere i componenti. I tuoi file `locales/{lng}/{ns}.json` rimangono l'unica fonte di verità. Misurato fianco a fianco in [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Perché i18next è molto più pesante delle altre librerie?">

È stato progettato come runtime agnostico rispetto al framework: un'istanza globale, una pipeline di plugin, un archivio di risorse, un risolutore di chiavi. Questa flessibilità viene compilata in ogni bundle. Un componente vuoto che importa solo la libreria costa **19.7 KB gzip** con `next-i18next` contro **5.5 KB** con `next-intlayer`, e questo costo viene pagato su ogni pagina, qualunque sia il peso dei tuoi contenuti.

</Question>

<Question title="Il caricamento lazy con un backend risolve il problema?">

Risolve i byte, non la latenza. Il passaggio a `i18next-resources-to-backend` consente di risparmiare ~49 KB per pagina, ma aggiunge un round-trip di rete al cambio di lingua: **123 ms** nella configurazione `dynamic` e **185 ms** in `scoped-static`, contro **3-4 ms** con Intlayer. Anche l'idratazione sale a 27.7 ms perché l'istanza risolve il suo backend prima che React possa idratare.

</Question>

<Question title="Posso raggiungere lo 0% di leakage con i18next?">

Sì, con `scoped-dynamic`: un namespace per route, un backend di risorse e una mappa pagina-namespace gestita a mano. Arriva a 163.4 KB per pagina su Next.js, comunque **+22 KB** rispetto ai 141.3 KB di Intlayer, che non ha richiesto alcuna configurazione. Consulta l'[ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

</Question>

<Question title="Devo riscrivere i miei componenti per migrare?">

No. `@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` mantengono `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, plurali `_one` / `_other`, suffissi di contesto e `returnObjects`. Una sola riga di plugin in `next.config.ts` o `vite.config.ts`. Passo dopo passo nella [guida alla migrazione di next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Cosa succede ai miei plugin di i18next?">

I backend e i rilevatori di lingua sono accettati ma inerti: non c'è più nulla da caricare o rilevare a runtime. Il rilevamento della lingua diventa la configurazione di routing di Intlayer (prefisso URL, cookie, header). Se la tua app recupera traduzioni da un CMS al momento della richiesta, usa invece il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) o `intlayer pull` / `push`.

</Question>

</FAQ>

## Confronti correlati

Stesso benchmark, altre librerie:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md)

Approfondire su i18next:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer-i18next.md), gli adattatori misurati sulla stessa applicazione
- [i18next è superato?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_i18next_outdated.md)
- [Utilizzare Intlayer con i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/intlayer_with_i18next.md) e [con react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/intlayer_with_react-i18next.md)
- [Come internazionalizzare un'app Next.js con next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-i18next.md)

Documenti di riferimento:

- [Rapporto di benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md) e [rapporto di benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)
- Adattatori di compatibilità: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-i18next.md)
- Guide alla migrazione: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-i18next_to_intlayer.md)
- [Ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e [il compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [i18n guidata da compilatore vs dichiarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)

## Stelle su GitHub

Le stelle su GitHub rispecchiano la popolarità, la fiducia della community e la rilevanza a lungo termine di un progetto. Pur non misurando direttamente la qualità tecnica, mostrano quanti sviluppatori apprezzano il progetto, ne seguono gli aggiornamenti e intendono adottarlo.

[![Grafico dello storico delle stelle](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Conclusione

`i18next` ha meritato il proprio ruolo di riferimento: funziona ovunque, dispone di plugin per ogni esigenza ed è supportato da oltre un decennio. Il benchmark dimostra tuttavia il costo di un'architettura focalizzata sul runtime. Il setup comunemente adottato aggiunge **+70-77 KB gzip per pagina**, disperde **~90% dei contenuti di altre pagine** e richiede **più di 100 ms** per un cambio lingua con lazy loading. Raggiungere lo 0% di dispersione è possibile, ma impone un backend, un namespace per route e un mapping manuale continuo, rimanendo comunque **+9-22 KB** sopra Intlayer.

Intlayer delega questo lavoro al compilatore. Dizionari per componente, lazy loading per lingua ed eliminazione dei contenuti orfani sono artefatti del build anziché convenzioni da gestire manualmente. Sulla stessa applicazione: **+0.3 KB per pagina**, **0% di dispersione**, componenti **da 3 a 10 volte più leggeri** e cambio lingua in **3-4 ms**.

Tutti i dati grezzi, le applicazioni di prova e gli script sono consultabili nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puoi verificarli direttamente.

Per ulteriori dettagli consulta il documento ['Perché Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).
