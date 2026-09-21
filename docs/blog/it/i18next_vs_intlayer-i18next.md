---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs @intlayer/i18next: Stessa API, Diverso Bundle"
description: Cosa cambia quando un'applicazione React o Next.js mantiene le chiamate a i18next, react-i18next e next-i18next ma le gestisce tramite gli adattatori @intlayer/i18next. JavaScript per pagina, dimensione dei componenti, dispersione di stringhe e idratazione misurati sullo stesso codice, oltre a cosa gli adattatori conservano, ignorano e non possono sostituire.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adattatore di compatibilità
  - Migrazione
  - Internazionalizzazione
  - i18n
  - Benchmark
  - Dimensione del bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Stessa API, Diverso Bundle

`@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` sono adattatori di compatibilità. Espongono l'API di `i18next` che il tuo codice già impiega (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) e la alimentano tramite dizionari compilati da Intlayer. I componenti non cambiano. Il runtime sottostante sì.

Questo articolo misura tale sostituzione sulla medesima applicazione Next.js, compilata una volta con `next-i18next` e una volta con `@intlayer/next-i18next`. I dati provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Per confrontare `i18next` e Intlayer come librerie a sé stanti, leggi [i18next vs Intlayer](https://intlayer.org/it/blog/i18next-vs-intlayer). Questo approfondimento illustra cosa cambia l'adattatore quando mantieni il codice invariato.

<TOC/>

> **tl;dr**: Sulla stessa app Next.js, sostituire `next-i18next` con `@intlayer/next-i18next` ha ridotto il JavaScript per pagina da **218.5 KB a 150.7 KB** gzip (setup iniziale) e ha superato la configurazione `next-i18next` completamente ottimizzata (163.4 KB) di **12.7 KB**. Il componente medio è passato da **78.5 KB a 9.7 KB**, la dispersione di stringhe di altre pagine è scesa da **~90% a 0%**, l'idratazione da **15.6 ms a 11.3 ms**, e il runtime da **19.7 KB a 9.4 KB**. Nessun componente è stato modificato; è stato ritoccato un solo file di provider. I plugin `i18next` (backend, rilevatori di lingua) sono accettati ma non hanno effetto: non vi è più nulla da caricare o rilevare a runtime.

## Cos'è `@intlayer/i18next`

`i18next` è un runtime. `i18n.init({ resources })` o un plugin backend carica `locales/{lng}/{ns}.json` in un'istanza globale; `useTranslation("about")` vi iscrive il componente; `t("title")` risolve la chiave al momento del rendering. Namespace, caricamento lazy, elenchi di namespace per pagina e sicurezza dei tipi sono interamente a tuo carico da configurare e gestire.

Gli adattatori mantengono l'API e sostituiscono l'istanza globale:

1. **Alias di importazione.** `createNextI18nPlugin()` da `@intlayer/next-i18next/plugin` (o `withI18next`) incapsula `withIntlayer` e aggiunge alias Webpack / Turbopack affinché `next-i18next`, `react-i18next` e `i18next` puntino ai corrispondenti `@intlayer/*`. Su Vite, `reactI18nextVitePlugin()` da `@intlayer/react-i18next/plugin` fa lo stesso. Nessun import deve essere rinominato.
2. **JSON come unica fonte di verità.** Il plugin `syncJSON` legge i file `locales/{lng}/{ns}.json` esistenti con `format: "i18next"` (garantendo la corretta interpretazione di `{{name}}`, annidamento `$t()`, suffissi `_one` / `_other` e di contesto) e riscrive le traduzioni quando la CLI o il CMS le aggiornano.
3. **Collegamento al punto di chiamata.** Il passaggio di ottimizzazione di Intlayer riscrive `useTranslation("about")` in una chiamata che riceve direttamente il dizionario `about`, nella lingua attiva. Il componente smette di interrogare lo store globale.

```tsx fileName="components/About.tsx"
// Il tuo codice, senza modifiche
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Cosa emette il compilatore (semplificato)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Questa riscrittura è ciò che genera la contrazione nelle dimensioni dei componenti e l'azzeramento della dispersione di contenuti riportati di seguito.

## Cosa gli adattatori mantengono, ignorano e non sostituiscono

| API `i18next`                                                                   | Con `@intlayer/*`                                                                                                      |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Mantenuto. Vincolato al dizionario `ns` in fase di build; chiavi tipizzate sui tuoi contenuti                       |
| `t("key", { name })`, `{{interpolation}}`, annidamento `$t(key)`                | ✅ Mantenuto                                                                                                           |
| Plurali `key_one` / `key_other`, contesto `key_male`, `returnObjects`           | ✅ Mantenuto. Plurali valutati con `Intl.PluralRules`                                                                  |
| `<Trans>` con `components`, tag numerati `<1>...</1>`, `values`                 | ✅ Mantenuto                                                                                                           |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Mantenuto                                                                                                           |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Mantenuto. `changeLanguage` governa la lingua di Intlayer                                                           |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Mantenuto                                                                                                           |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` chiama l'`init` del plugin e termina; backend e rilevatori non devono caricare o determinare nulla          |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` viene **ignorato** con un avviso in console; rimuovi gli import JSON per ottenere i benefici sul bundle |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Renderizza un `IntlayerProvider`; la prop `i18n` viene ignorata. Su App Router, passa la lingua (vedi sotto)        |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Restituisce la struttura attesa e non carica nulla. Innocuo da tenere, sicuro da rimuovere                          |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Mantenuto                                                                                                           |
| `next-i18next.config.js`                                                        | ⚠️ Non letto. Le lingue provengono da `intlayer.config.ts`                                                             |
| `useTranslation()` senza namespace                                              | ✅ Opera sul dizionario globale `translation` dell'intero file (`splitKeys: false`)                                    |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **la medesima applicazione** con ciascuna configurazione: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lingue** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuti identici. Le pagine sono misurate in `en` e `fr`.

`next-i18next` è stato testato su quattro strategie di caricamento, dall'inclusione del JSON di ogni lingua in `resources` (`static`) fino a un namespace per route, caricato in modalità lazy tramite backend (`scoped-dynamic`). L'adattatore è stato integrato sui **medesimi componenti del setup iniziale**, modificando unicamente `next.config.ts`, `intlayer.config.ts` e il file di provider. Non presenta alcuna variante "scoped" manuale: il compilatore isola il contenuto per singolo componente.

Per ogni build, la suite registra:

- **Dimensione lib**: dimensione gzip di un componente vuoto che importa esclusivamente la libreria i18n.
- **JS pagina**: media di JavaScript gzip scaricato per pagina su tutte le pagine e lingue.
- **% dispersione lingua**: quota di stringhe tradotte nel JS scaricato che appartengono a una lingua che l'utente **non** sta consultando.
- **% dispersione pagina**: quota di stringhe tradotte nel JS scaricato che appartengono a una pagina in cui l'utente **non** si trova.
- **Media componente**: dimensione media gzip di ciascun componente compilato isolatamente.
- **Reattività E2E**: intervallo effettivo tra la selezione di una nuova lingua e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Idratazione**: durata della fase di idratazione di React.

> I valori sotto riportati risalgono all'esecuzione del **12-09-2026** con `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) e `@intlayer/next-i18next` 9.5.1. L'applicazione di test è volutamente contenuta (poche decine di stringhe per lingua), per cui le percentuali di dispersione descrivono un **andamento**: crescono con l'aumento dei contenuti mentre l'overhead del runtime resta fisso.

### Risultati su Next.js

| Configurazione               | Strategia      | Dimens lib (gz) | JS pag medio (gz) | Dispers lingua | Dispers pag | Comp medio (gz) | Reattività E2E | Idratazione |
| ---------------------------- | -------------- | --------------: | ----------------: | -------------: | ----------: | --------------: | -------------: | ----------: |
| **base** (senza i18n)        | -              |          0.0 KB |          141.0 KB |           0.0% |        0.0% |          0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |         19.7 KB |          218.5 KB |           0.0% |       89.8% |         78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |         19.7 KB |          169.5 KB |          50.0% |       89.8% |         26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |         19.7 KB |          220.1 KB |           0.0% |       89.8% |         78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |         19.7 KB |          163.4 KB |           0.0% |        0.0% |         27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |      **9.4 KB** |      **150.7 KB** |       **0.0%** |    **0.0%** |      **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |      **9.4 KB** |      **150.7 KB** |       **0.0%** |    **0.0%** |      **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (nativo)     | static         |          5.5 KB |          141.3 KB |           0.0% |        0.0% |          8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (nativo)     | dynamic        |          5.5 KB |          141.3 KB |           0.0% |        0.0% |          6.9 KB |        15.3 ms |     15.9 ms |

**Come interpretare i risultati**

- **68 KB in meno per pagina rispetto al setup iniziale.** `resources: { en, fr, ... }` trasferisce ogni lingua e ogni namespace su ciascuna pagina: **218.5 KB**. La build con adattatore per gli stessi componenti si attesta a **150.7 KB**. Supera inoltre la migliore configurazione di `next-i18next` (163.4 KB, un namespace per route caricato on-demand) di 12.7 KB, poiché il solo runtime di `i18next` pesa 19.7 KB contro 9.4 KB.
- **La dispersione scende allo 0% senza ritoccare alcun componente.** Ogni configurazione di `next-i18next`, a eccezione di quella interamente segmentata, scarica ~90% di stringhe estranee alla pagina. La riga `dynamic` è più penalizzante di quanto sembri: non abbatte la dispersione tra pagine e introduce un **50% di dispersione tra lingue**, poiché il backend per lingua richiama comunque l'intero namespace `translation`. L'adattatore raggiunge 0% / 0% direttamente sul codice originale.
- **Componenti: 8 volte più leggeri.** Un componente basato su `useTranslation()` compilato singolarmente pesa in media **78.5 KB** con `resources` inlined e **26-27 KB** con backend, poiché `t` resta ancorato allo store globale. Con l'adattatore si scende a **9.7 KB**.
- **Idratazione e cambio lingua più rapidi.** L'idratazione passa da 15.6 ms a **11.3 ms** (e da 27.7 ms nel setup `dynamic`, dove la richiesta di backend ricade sul percorso critico). Il cambio lingua passa da 15-16 ms a **11-12 ms**.
- **L'adattatore non coincide con il runtime nativo.** `next-intlayer` fa registrare **141.3 KB**, appena +0.3 KB rispetto all'app base. L'adattatore integra l'interfaccia API di `i18next` (interpolazione, risoluzione di plurali e contesti, parsing dei tag `<Trans>`) al di sopra del core di Intlayer: 9.4 KB e +9.4 KB per pagina rispetto al nativo. Rappresenta una corsia di transizione, non il punto d'arrivo.

> L'adattatore `react-i18next` su Vite / TanStack Start non è stato incluso in questa sessione di test. I valori di riferimento per `react-i18next` su TanStack Start sono consultabili in [i18next vs Intlayer](https://intlayer.org/it/blog/i18next-vs-intlayer): 127-184 KB per pagina e 123-185 ms per il cambio lingua in caso di backend asincrono.

## Perché le metriche variano

Nulla è cambiato all'interno di `components/`, pertanto i vantaggi scaturiscono da ciò a cui `useTranslation` si connette.

**Con `i18next`**, il collegamento avviene con l'istanza globale. Tutto ciò che vi è stato caricato (tutte le lingue in `static`, l'intero namespace della lingua attiva in `dynamic`) resta raggiungibile da ogni componente che richiama `useTranslation()`. Il bundler non può frammentare al di sotto di quanto contenuto nell'istanza, e il runtime non può prevedere quali chiavi verranno richieste in fase di esecuzione.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # stringhe di ogni pagina
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**Con `@intlayer/next-i18next`**, il collegamento si instaura direttamente con il dizionario. `syncJSON` trasforma ciascun file di namespace in un dizionario; il passaggio di ottimizzazione passa al componente il dizionario desiderato sotto forma di import tracciabile e suddivisibile dal bundler per pagina e per lingua.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # invariato, resta la sorgente primaria
│   └── fr/translation.json
├── .intlayer/                        # generato: un dizionario per namespace, per lingua
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← invariato
```

Il file `i18n/i18n.ts` e la sua importazione di `resources` diventano codice morto. È esattamente qui che si originano i 68 KB di risparmio.

## Migrazione in tre passaggi

<Steps>
<Step number={1} title="Installazione">

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

Il comando rileva `i18next` / `react-i18next` / `next-i18next`, installa `intlayer`, il pacchetto framework (`next-intlayer` o `react-intlayer`), il rispettivo adattatore `@intlayer/*` e `@intlayer/sync-json-plugin`, precompilando `intlayer.config.ts`. Mantieni installati i pacchetti originari: operano come peer dependencies e garantiscono le definizioni di tipo.

</Step>
<Step number={2} title="Indirizza Intlayer sui tuoi file di traduzione">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // dialetto i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Un file per namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Se disponi di un unico file `translation.json` per lingua (il namespace predefinito di i18next), imposta `splitKeys: false` affinché l'intero file rimanga un unico dizionario e le semplici chiamate a `useTranslation()` continuino a risolversi.

</Step>
<Step number={3} title="Aggiungi il plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

Sull'App Router, i componenti client desumono la propria lingua dal segmento `[locale]`. L'`I18nextProvider` dell'adattatore non accetta alcuna lingua come parametro, pertanto sostituiscilo una sola volta nel file di provider:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Tutti i componenti sottostanti continueranno a richiamare `useTranslation()` senza variazioni.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` incapsula `vite-intlayer` e crea gli alias per `react-i18next` e `i18next`. Per progetti non-React, `i18nextVitePlugin()` da `@intlayer/i18next/plugin` provvede ad associare il solo `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Cosa puoi eliminare successivamente

| File / pattern                                         | Motivo                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` e gli import JSON         | Ignorati dall'adattatore. Qui risiedevano i 68 KB                               |
| `i18next-http-backend`, `i18next-resources-to-backend` | Nulla da interrogare a runtime                                                  |
| `i18next-browser-languagedetector`                     | Il rilevamento è delegato al routing di Intlayer (prefisso URL, cookie, header) |
| `serverSideTranslations()` in `getStaticProps`         | Restituisce una struttura vuota; non crea danni, ma è superfluo                 |
| `next-i18next.config.js`                               | Non letto. Le lingue risiedono in `intlayer.config.ts`                          |
| Elenchi `ns: [...]` per pagina                         | Il compilatore sceglie i namespace componente per componente                    |

### Cosa ottieni oltre al risparmio in byte

- **Chiavi tipizzate.** `useTranslation("about")` è tipizzato sul dizionario compilato `about`; `t("does.not.exist")` genera un errore di compilazione TypeScript anziché restituire una stringa di chiave.
- **`npx intlayer test`** blocca la CI in presenza di chiavi mancanti in qualsiasi lingua. **`npx intlayer fill`** traduce i valori mancanti con la tua chiave provider (OpenAI, Anthropic, Mistral, Gemini...) e li trascrive in `locales/{lng}/{ns}.json`.
- **Editor Visuale e CMS** intervengono sullo stesso JSON, consentendo a redattori e traduttori di apportare modifiche via interfaccia mentre i file si aggiornano nel repository.
- **Transizione graduale verso `.content.ts`.** Qualsiasi componente può passare da `useTranslation("about")` a `useIntlayer("about")` affiancando un file di contenuto locale. I formati JSON e `.content.ts` convivono senza conflitti.

## Limiti da conoscere prima di iniziare

- **Backend e rilevatori sono disattivati.** `i18n.use(HttpBackend)` esegue l'`init` del plugin e nient'altro. Se la tua applicazione faceva affidamento sul recupero di testi da un CMS durante le richieste a runtime, tale flusso non è disponibile; impiega il CMS di Intlayer o i comandi `intlayer pull` / `push`.
- **`resources` viene ignorato, non fuso.** Diversamente da altri adattatori, `@intlayer/i18next` non usa le `resources` inline come fallback. Ciascuna chiave deve essere presente nei dizionari sincronizzati, come verificato da `intlayer test`.
- **L'App Router richiede la modifica del provider.** Un solo file, illustrato in precedenza. Il Pages Router con `appWithTranslation` non richiede interventi.
- **`next-i18next.config.js` non viene letto.** `localePath`, `fallbackLng`, `reloadOnPrerender` e impostazioni affini non hanno effetto; lingue e fallback sono determinati in `intlayer.config.ts`.
- **L'adattatore ha un costo.** 9.4 KB di runtime e +9.4 KB per pagina rispetto a `next-intlayer`. Una volta convertiti tutti i componenti a `useIntlayer`, rimuovilo.

## Quando scegliere quale soluzione?

- **Rimani su `i18next`** se la tua app richiede necessariamente backend a runtime (traduzioni erogate da un CMS on-demand), l'ecosistema di plugin o un contesto non-React non coperto dagli adattatori.
- **Passa a `@intlayer/*`** se utilizzi `react-i18next` / `next-i18next` e intendi recuperare 68 KB, ottenere componenti 8 volte più snelli, 0% di dispersione, chiavi tipizzate e controlli CI senza dover riscrivere il codice. È la porta d'ingresso ideale per un'infrastruttura `i18next` esistente.
- **Adotta il runtime nativo (`next-intlayer` / `react-intlayer`)** per progetti da zero o una volta completata la transizione. È l'alternativa più leggera (5.5 KB, +0.3 KB per pagina) e abilita Server Components sincroni e file `.content.ts` per ciascun componente.

## Confronti correlati

- [i18next vs Intlayer](https://intlayer.org/it/blog/i18next-vs-intlayer) (analisi delle librerie, medesima base di benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/it/blog/next-intl-vs-intlayer-next-intl) (stessa serie di adattatori)
- [Lingui vs @intlayer/lingui](https://intlayer.org/it/blog/lingui-vs-intlayer-lingui) (stessa serie di adattatori)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-vue-i18n) (stessa serie di adattatori)
- Guide alla migrazione: [i18next](https://intlayer.org/it/doc/migration/i18next), [react-i18next](https://intlayer.org/it/doc/migration/react-i18next), [next-i18next](https://intlayer.org/it/doc/migration/next-i18next)
- Documentazione degli adattatori: [i18next](https://intlayer.org/it/doc/compatibility/i18next), [react-i18next](https://intlayer.org/it/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/it/doc/compatibility/next-i18next)

## Conclusione

`i18next` costituisce il runtime più voluminoso in questa comparativa, e gli adattatori ne abbattono la maggior parte senza richiedere l'abbandono dell'API. Sulla stessa applicazione Next.js ciò significa **68 KB in meno per pagina** rispetto alla configurazione standard, **12.7 KB in meno** rispetto all'ottimizzazione manuale più spinta, **componenti 8 volte più piccoli**, **0% di dispersione** e **4 ms di vantaggio nell'idratazione**, al costo di un file di configurazione, una riga di plugin e una lieve correzione al provider. Backend e rilevatori diventano ininfluenti, `resources` viene ignorato anziché unito, e il runtime nativo `next-intlayer` mantiene un ulteriore distacco di 9 KB in leggerezza.

Tutti i dati grezzi, le applicazioni di test e gli script sono consultabili nel [repository di Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Fai riferimento alla documentazione [Perché Intlayer?](https://intlayer.org/it/doc/why) per approfondire.
