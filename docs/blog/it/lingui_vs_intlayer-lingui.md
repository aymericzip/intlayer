---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "Lingui vs @intlayer/lingui: Stesse Macro, Runtime Diverso"
description: Cosa cambia quando un'applicazione React mantiene le macro Lingui ma le serve tramite l'adattatore di compatibilità @intlayer/lingui. Dimensioni dei componenti, idratazione, leakage e JavaScript per pagina misurati sullo stesso codice TanStack Start, inclusi i punti in cui l'adattatore è in svantaggio.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adattatore di compatibilità
  - Migrazione
  - Internazionalizzazione
  - i18n
  - Benchmark
  - Dimensione bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Stesse Macro, Runtime Diverso

`@intlayer/lingui` è un adattatore di compatibilità per `@lingui/core` e `@lingui/react`. Le tue chiamate a `` t`...` ``, `<Trans>`, `useLingui()` e `i18n._()` rimangono esattamente identiche; le macro continuano a compilare; ciò che cambia è l'origine dei messaggi a runtime. Invece di un unico catalogo compilato per lingua, ogni punto di chiamata è collegato a un dizionario Intlayer compilato appositamente per esso.

Questo articolo misura questa sostituzione sulla stessa applicazione TanStack Start, compilata una volta con Lingui e una volta con l'adattatore. I numeri provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Per un confronto diretto tra le due librerie, leggi [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md). Questo articolo si concentra su cosa cambia l'adattatore e su dove non offre vantaggi.

<TOC/>

> **tl;dr**: Sulla stessa app TanStack Start, `@intlayer/lingui` ha ridotto la dimensione media dei componenti da **85,5 KB a 12,8 KB** gzip, l'idratazione da **28 ms a 19,7 ms** e il cambio di lingua da **5,9 ms a 2,9 ms**, senza toccare le macro. Nella configurazione semplice (tutti i cataloghi caricati subito) ha anche rimosso il **90% di page leakage** e 12 KB per pagina. Tuttavia, nella configurazione lazy-loaded distribuisce **137 KB per pagina contro i 115 KB** di Lingui puro: l'adattatore risolve ICU a runtime, mentre Lingui fornisce array di token precompilati. Il leakage della lingua sorgente (~9-10%) è identico su entrambi i lati, poiché proviene dal fallback `message` integrato nei componenti e non dal runtime. L'adattatore è un plugin Vite; è stato misurato su TanStack Start.

## Cos'è `@intlayer/lingui`

Lingui è un compilatore unito a un runtime. Le macro nel codice sorgente vengono estratte in un catalogo `.po` (o JSON) per lingua, compilate in un modulo JS per lingua e caricate in un'istanza globale `I18n` tramite `i18n.load()` + `i18n.activate()`. Ogni `useLingui()` si iscrive a quell'istanza; ogni chiamata a `_()` cerca il proprio identificatore nel catalogo attivo.

`@intlayer/lingui` mantiene le macro e l'API e sostituisce la ricerca nel catalogo:

1. **Alias di importazione.** Il plugin `lingui()` di `@intlayer/lingui/plugin` avvolge `vite-intlayer` e aggiunge voci in `resolve.alias` in modo che `@lingui/core` e `@lingui/react` puntino a `@intlayer/lingui`. I tuoi import non cambiano.
2. **Cataloghi come fonte di verità.** Il plugin `syncJSON` (o `syncPO` per i file `.po`) legge i tuoi cataloghi esistenti e li trasforma in dizionari Intlayer, riscrivendo le traduzioni quando la CLI o il CMS li aggiornano. Con `splitKeys: "key-prefix"`, un catalogo piatto di ID con punti (`footer.github`, `hero.title`) diventa un insieme di piccoli dizionari suddivisi per prefisso invece di un singolo file da 244 KB.
3. **Collegamento al punto di chiamata.** Il passaggio di ottimizzazione di Intlayer raccoglie gli ID passati a `_`, `t` e `<Trans>` in ogni file e fornisce al componente solo i dizionari corrispondenti. `<Trans id="hero.title">` si collega autonomamente; `useLingui()` si collega a ogni prefisso utilizzato nel file. Gli ID privi di punto (ID con hash, `mockBanner`) ripiegano sul dizionario `messages` unico di Lingui.

```tsx fileName="src/components/Hero.tsx"
// Il tuo codice, invariato
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Cosa emette il compilatore (semplificato)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Il componente non accede più all'istanza globale né al catalogo monolitico sottostante. Accede solo a `hero`. Questa è la ragione principale per cui la colonna delle dimensioni dei componenti si riduce di 7 volte nella tabella seguente.

## Cosa l'adattatore mantiene, ignora e non sostituisce

| API di Lingui                                            | Con `@intlayer/lingui`                                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Macro `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Mantenuto. Mantieni `@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin` nella build, prima di Intlayer  |
| `useLingui()` → `{ i18n, _, t }`                         | ✅ Mantenuto. Funziona anche fuori da un provider (lingua derivata da `react-intlayer`)                           |
| `i18n._(id, values)`, `i18n.t()`                         | ✅ Mantenuto. Risolve sia ID espliciti sia ID con hash                                                            |
| Plurali ICU, `select`, `selectordinal`, `#`              | ✅ Mantenuto, tramite il resolver ICU di Intlayer                                                                 |
| `i18n.date()`, `i18n.number()`, `formats`                | ✅ Mantenuto, supportato da `Intl` nativo                                                                         |
| `I18nProvider`                                           | ✅ Mantenuto. Avvolge un `IntlayerProvider`; ascolta `i18n.on("change")` così che `activate()` riesegua il render |
| `i18n.activate(locale)`                                  | ✅ Mantenuto                                                                                                      |
| `i18n.load(locale, messages)` / `loadAndActivate()`      | ⚠️ Accettato come **fallback a runtime**. I dizionari compilati hanno priorità; un avviso suggerisce la rimozione |
| `setupI18n({ messages, missing })`                       | ⚠️ `messages` uniti come fallback a runtime; `missing` viene ignorato                                             |
| `lingui extract` / `lingui compile`                      | ✅ Il tuo workflow rimane invariato. Punta `syncPO` / `syncJSON` sui cataloghi estratti                           |
| `defaultComponent` su `I18nProvider`                     | ⚠️ Memorizzato nel contesto, non applicato durante il rendering                                                   |
| Next.js                                                  | ❌ Il plugin avvolge `vite-intlayer`. Solo Vite, TanStack Start e React Router                                    |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **la stessa applicazione** per ciascuna configurazione: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lingue** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuto identico. Le pagine sono misurate in `en` e `fr`.

Lingui è stato testato con quattro strategie di caricamento, dall'importazione iniziale di tutti i cataloghi compilati (`static`) fino a un catalogo per route caricato in modalità lazy (`scoped-dynamic`). L'adattatore è stato compilato sugli **stessi componenti**, modificando esclusivamente `vite.config.ts` e `intlayer.config.ts`. La sua riga `static` include tutte le lingue; la sua riga `dynamic` (`importMode: 'dynamic'`) carica la lingua attiva su richiesta. Non esiste una variante "scoped": la fase di ottimizzazione gestisce automaticamente la suddivisione per punto di chiamata.

Per ogni build vengono registrate le seguenti metriche:

- **Lib size**: dimensione gzip di un componente vuoto che importa solo la libreria di i18n.
- **Page JS**: JavaScript gzip scaricato per pagina, mediato su tutte le pagine e lingue.
- **Locale leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a una lingua che l'utente **non** sta visualizzando.
- **Page leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a una pagina in cui l'utente **non** si trova.
- **Component avg**: dimensione media gzip di ciascun componente compilato isolatamente.
- **E2E reactivity**: tempo trascorso tra la selezione di una nuova lingua e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Hydration**: durata della fase di idratazione di React.

> I dati sottostanti provengono dal test eseguito il **2026-09-12** con `@lingui/react` 6.6.0 e `@intlayer/lingui` 9.5.1. L'applicazione di test è volutamente contenuta (poche decine di stringhe per lingua), per cui le percentuali di dispersione descrivono un **modello strutturale**: crescono con l'aumento dei contenuti mentre il costo a runtime rimane fisso.

### Risultati su TanStack Start

| Configurazione         | Strategia      | Lib size (gz) | Page JS media (gz) | Leak lingua | Leak pagina | Componente medio (gz) | Reattività E2E | Idratazione |
| ---------------------- | -------------- | ------------: | -----------------: | ----------: | ----------: | --------------------: | -------------: | ----------: |
| **base** (senza i18n)  | -              |        0,0 KB |           111,0 KB |        0,0% |        0,0% |                0,7 KB |         8,1 ms |     21,6 ms |
| Lingui                 | static         |       11,2 KB |           152,2 KB |       50,0% |       90,0% |               58,0 KB |         3,9 ms |     19,9 ms |
| Lingui                 | dynamic        |       11,2 KB |       **115,2 KB** |        9,3% |        0,0% |               85,5 KB |         5,9 ms |     28,0 ms |
| Lingui                 | scoped-static  |       11,2 KB |           120,8 KB |        4,0% |        0,0% |              147,9 KB |         7,1 ms |     33,9 ms |
| Lingui                 | scoped-dynamic |       11,2 KB |           120,2 KB |        8,6% |        0,0% |               83,7 KB |        42,1 ms |     32,9 ms |
| **`@intlayer/lingui`** | static         |   **10,3 KB** |           140,5 KB |       50,0% |    **0,0%** |           **14,9 KB** |     **3,3 ms** | **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10,3 KB** |           137,0 KB |        9,9% |    **0,0%** |           **12,8 KB** |     **2,9 ms** | **19,7 ms** |
| `intlayer` (nativo)    | static         |        5,0 KB |           125,8 KB |       50,0% |        0,0% |                8,1 KB |         3,2 ms |     11,5 ms |
| `intlayer` (nativo)    | dynamic        |        5,0 KB |           118,6 KB |        0,0% |        0,0% |                6,3 KB |         3,6 ms |     14,1 ms |

**Come interpretare i dati**

- **Componenti: 7 volte più piccoli.** Questo è l'effetto principale dell'adattatore. Un componente Lingui compilato isolatamente pesa in media **da 58 a 148 KB** a seconda della strategia, poiché `useLingui()` accede all'istanza globale e a ogni catalogo caricato in essa. Lo stesso componente con l'adattatore pesa in media **12,8-14,9 KB**: importa solo i propri dizionari e il resolver ICU, nient'altro.
- **Idratazione: 8-14 ms più veloce.** `i18n.load()` + `i18n.activate()` vengono eseguiti sul client prima che React possa idratare; più la configurazione di Lingui è lazy, più tempo richiede questa fase (28-34 ms). Con l'adattatore, i dizionari arrivano come import diretti già posizionati nel chunk della pagina: **11,3 ms** in modalità `static`, **19,7 ms** in modalità `dynamic`.
- **Cambio lingua: 2x più veloce, senza rallentamenti.** La configurazione ottimizzata `scoped-dynamic` di Lingui impiega **42 ms** per aggiornare `html[lang]`, poiché il catalogo della route deve essere scaricato, caricato e attivato prima che il cambiamento sia visibile. L'adattatore rimane stabile a **2,9-3,3 ms** in entrambe le modalità.
- **La configurazione semplice viene risanata automaticamente.** Lingui statico scarica ogni catalogo su ogni pagina: 152,2 KB e 90% di page leakage. L'adattatore statico: 140,5 KB, 0% di page leakage, con gli stessi identici componenti.
- **Byte per pagina: Lingui vince in `dynamic`, di 22 KB.** Questo è l'aspetto da valutare con chiarezza. Lingui compila i messaggi in array di token durante il build e include un runtime da 11 KB che si limita a scorrerli. L'adattatore distribuisce il resolver ICU di Intlayer (circa 15 KB in più di `@intlayer/core` rispetto alla build nativa), lo strato dell'adattatore (~10 KB) e `react-intlayer` (~6 KB). Su questa applicazione, ciò significa **137,0 KB contro 115,2 KB**. Se il budget primario è il peso grezzo per pagina e usi già Lingui con lazy loading, l'adattatore non offre un guadagno su questa metrica.
- **Il leakage della lingua è analogo su entrambi i fronti.** 9,3% per Lingui, 9,9% per l'adattatore in modalità `dynamic`. Deriva dai componenti: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` contiene la stringa inglese di fallback, così come l'output delle macro salvo eliminazione esplicita del campo message. Tale stringa inglese finisce nel chunk `fr` indipendentemente dal runtime. Intlayer nativo (`.content.ts`, senza sorgente inline) garantisce lo 0%.

## Perché i numeri si muovono e perché uno resta fisso

Due fattori determinano queste colonne: **a cosa è collegato un componente** e **in quale formato viaggiano i messaggi**.

**Collegamento.** Con Lingui, l'unità fondamentale è la lingua. Il file `messages.mjs` per `fr` forma un unico modulo; qualsiasi componente che importa l'istanza associata può accedere all'intero contenuto, impedendo al bundler di suddividere a un livello più granulare. Con l'adattatore, l'unità è il punto di chiamata: `hero` e `footer` sono import separati, suddivisi e caricati su richiesta per ciascun componente. Questo spiega i guadagni su peso dei componenti, idratazione e dispersione di pagina.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # output di lingui compile, uno per lingua
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # generato: un dizionario per prefisso id, per lingua
└── src
    ├── locales
    │   ├── en/messages.json             # invariato, rimane la fonte di verità
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← invariato
```

**Formato.** La fase di compilazione di Lingui converte `{count, plural, one {# item} other {# items}}` in un array di token; il runtime non effettua mai il parsing della sintassi ICU. L'adattatore mantiene il messaggio come testo e lo analizza tramite il resolver ICU di Intlayer. Si tratta di un costo fisso di circa 15 KB sostenuto una sola volta per pagina, motivo per cui la riga `dynamic` perde sui byte totali pur vincendo su ogni altro aspetto. Intlayer nativo evita questo costo perché i dizionari in `.content.ts` usano nodi `enu()` / `insert()` risolti preventivamente dal compilatore.

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

Il comando rileva Lingui, legge `lingui.config.ts` per scegliere `syncPO` (cataloghi `.po`) o `syncJSON` (cataloghi JSON), installa `intlayer`, `react-intlayer`, `@intlayer/lingui` e il plugin di sincronizzazione corrispondente, e sostituisce `@lingui/vite-plugin` con il plugin dell'adattatore in `vite.config.ts`. Mantieni installati `@lingui/core`, `@lingui/react` e il tuo plugin di macro: le macro continuano a compilare e l'adattatore sfrutta i tipi di Lingui.

</Step>
<Step number={2} title="Collegare Intlayer ai tuoi cataloghi">

Per cataloghi JSON (`format: "minimal"` in `lingui.config.ts`):

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Raggruppa gli ID puntati dal loro primo segmento: `footer.github` → dizionario `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Per i cataloghi `.po`, sostituisci `syncJSON` con `syncPO` da `@intlayer/sync-po-plugin` con il medesimo pattern `source` e l'estensione `.po`. Consulta la [documentazione del plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md).

`splitKeys: "key-prefix"` è ciò che rende possibile la drastica riduzione delle dimensioni dei componenti. Il file di catalogo mantiene la sua struttura lineare; la suddivisione esiste unicamente nei dizionari compilati, e la riscrittura ricompone automaticamente le chiavi.

</Step>
<Step number={3} title="Aggiungere il plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Mantieni il tuo plugin macro; deve essere eseguito prima del passaggio Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` integra `vite-intlayer` (monitoraggio dei file, compilazione dei dizionari, passaggio di ottimizzazione) e configura alias per reindirizzare `@lingui/core` e `@lingui/react` verso l'adattatore. Compila, e ottieni subito i miglioramenti misurati.

</Step>
</Steps>

### Cosa puoi rimuovere dopo

| File / pattern                                       | Motivo                                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | I dizionari vengono importati dai componenti che li usano. `i18n.load()` diventa un fallback |
| `i18n.load()` / `i18n.loadAndActivate()`             | Mantieni `i18n.activate(locale)`; rimuovi il caricamento manuale dei cataloghi               |
| `lingui compile` nello script di build               | Solo se usi JSON o `.po` come sorgente e non importi più moduli compilati                    |

### Cosa guadagni oltre ai byte

- **Rilevamento traduzioni mancanti.** `npx intlayer test` blocca la CI se una lingua manca di un identificatore; `lingui extract` si limita a riportare statistiche.
- **`npx intlayer fill`** traduce le voci mancanti con il provider a tua scelta (OpenAI, Anthropic, Mistral, Gemini...) e le riscrive direttamente nei tuoi cataloghi.
- **Visual Editor e CMS** interagiscono direttamente con questi stessi dizionari, consentendo modifiche ai file `.po` e JSON tramite interfaccia grafica a utenti non tecnici.
- **Passaggio incrementale a `.content.ts`.** Un componente può passare in qualunque momento da `useLingui()` a `useIntlayer("hero")` con un file di contenuto locale dedicato. Entrambi i tipi di dizionario coesistono armoniosamente.

## Limiti da conoscere prima di iniziare

- **Il costo per pagina in modalità `dynamic`.** Come descritto in precedenza: aspettati circa +20 KB per pagina rispetto a una configurazione Lingui lazy-loaded su una piccola applicazione. Questo divario non aumenta con i contenuti (è legato al resolver, non ai cataloghi), ma non si riduce.
- **Il leakage della lingua sorgente permane.** I descrittori di messaggi e le macro compilate incorporano il testo inglese originale come ripiego. Per eliminarlo, è necessario rimuovere il campo `message` o migrare a file `.content.ts`.
- **`i18n.load()` è un fallback, non la soluzione ideale.** Se continui a importare cataloghi compilati chiamando `load()`, caricherai sia il vecchio sia il nuovo bundle. Rimuovi tali importazioni.
- **Solo per Vite.** Non esiste un plugin Next.js per `@intlayer/lingui`. I progetti Next.js che usano Lingui dovrebbero valutare direttamente [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).
- **`defaultComponent` non viene applicato.** Se fai affidamento su di esso per avvolgere automaticamente ciascun `<Trans>`, aggiungi esplicitamente l'involucro nel componente.

## Quando usare cosa?

- **Resta su Lingui** se utilizzi già l'architettura `scoped-dynamic`, il tuo unico vincolo sono i byte per pagina e ritieni accettabili i 42 ms di transizione lingua e i 30 ms di idratazione per la tua applicazione.
- **Usa `@intlayer/lingui`** se sei su Lingui e desideri componenti più compatti, idratazione e cambio lingua più rapidi, 0% di dispersione pagina nella configurazione semplice, ID tipizzati, controlli in CI e completamento automatico tramite IA, senza modificare le macro. È la via d'accesso perfetta per una codebase esistente.
- **Passa a Intlayer nativo (`react-intlayer`)** non appena decidi di aggiornare i componenti. È l'unica soluzione in tabella a garantire **0% di leakage della lingua**, un runtime di 5 KB e soli +7,6 KB per pagina rispetto all'applicazione di base.

## Confronti correlati

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md) (le due librerie a confronto, stesso benchmark)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer-next-intl.md) (stessa serie di adattatori)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer-i18next.md) (stessa serie di adattatori)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer-vue-i18n.md) (stessa serie di adattatori)
- [Guida all'adattatore di compatibilità: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)
- [Compilatore vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)

## Conclusione

`@intlayer/lingui` modifica il meccanismo di associazione dei punti di chiamata in Lingui: invece di collegarsi all'istanza globale e al suo catalogo per lingua, ciascun componente fa riferimento a un dizionario compilato specificamente per esso. Sulla medesima applicazione TanStack Start questo significa **componenti 7 volte più compatti**, **idratazione più rapida di 8-14 ms**, **cambio lingua 2 volte più veloce** senza rallentamenti di 42 ms, senza dover modificare alcuna macro. Non altera i fallback integrati nei componenti (il leakage della lingua sorgente permane) e analizza ICU a runtime (la configurazione dinamica pesa circa 20 KB in più per pagina rispetto a Lingui standard). Valuta con attenzione quale parametro risponde meglio al tuo budget di prestazioni prima di scegliere.

Tutti i dati grezzi, le applicazioni di prova e gli script sono disponibili nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puoi testarli in autonomia.

Consulta la guida ['Perché Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) per maggiori dettagli.
