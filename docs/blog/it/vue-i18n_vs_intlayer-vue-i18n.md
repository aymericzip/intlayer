---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: Stessa API, Bundle Diverso"
description: Cosa cambia quando un'app Vue 3 mantiene le sue chiamate vue-i18n ma le serve tramite l'adapter di compatibilità @intlayer/vue-i18n. JavaScript per pagina, dimensione runtime, dimensione dei componenti e leakage misurati sullo stesso codice Vite + Vue, più ciò che l'adapter mantiene, ignora e non può sostituire.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Stessa API, Bundle Diverso

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` è un adapter di compatibilità: espone l'API di `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) e la serve dai dizionari compilati da Intlayer. I tuoi file `.vue` non cambiano. Cambia solo ciò a cui `t("footer.github")` è associato.

Questo articolo misura tale sostituzione sulla stessa applicazione Vite + Vue 3, costruita una volta con `vue-i18n` e una volta con l'adapter. I numeri provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Per `vue-i18n` e Intlayer confrontati come librerie, leggi [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md) e il [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer_benchmark.md). Questo riguarda ciò che l'adapter cambia quando mantieni i tuoi componenti così come sono.

<TOC/>

> **tl;dr**: Sulla stessa app Vite + Vue 3, sostituire `vue-i18n` con `@intlayer/vue-i18n` ha ridotto il JavaScript per pagina da **134.9 KB a 47.0 KB** gzip (l'app senza i18n pesa 41.3 KB), il runtime da **24.3 KB a 7.9 KB**, il componente medio da **196 KB a 8.4 KB**, e la perdita di stringhe di pagine straniere da **90% a 0%**, senza modificare nessun file `.vue`. `createI18n({ messages })` continua a funzionare come fallback; rimuovi gli import JSON per ottenere i numeri di cui sopra. I blocchi SFC `<i18n>` e il runtime `setLocaleMessage()` sono le due funzionalità che non vengono trasferite.

## Cos'è `@intlayer/vue-i18n`

`vue-i18n` è un runtime. `createI18n({ messages: { en, fr, ... } })` costruisce un'istanza globale che contiene ogni messaggio di ogni locale; `useI18n()` collega ogni componente ad essa; `t("footer.github")` percorre l'albero al momento del rendering. Questo design è ciò che rende possibili i blocchi SFC `<i18n>` e `setLocaleMessage()`, ed è anche il motivo per cui il grafico delle dipendenze di ogni componente include l'intero albero.

`@intlayer/vue-i18n` mantiene l'API e sostituisce l'albero:

1. **Import aliasing.** `vueI18nVitePlugin()` da `@intlayer/vue-i18n/plugin` avvolge `vite-intlayer` e aggiunge un `resolve.alias` in modo che `vue-i18n` si risolva a `@intlayer/vue-i18n`. Nessun import viene rinominato.
2. **JSON come fonte della verità.** Il plugin `syncJSON` legge il tuo `locales/{locale}.json` esistente con `format: "vue-i18n"` (in modo che `{name}`, `{0}` l'interpolazione di lista e `"car | cars"` i plurali con pipe siano analizzati correttamente) e riscrive le traduzioni quando la CLI o il CMS le aggiorna.
3. **Binding nel sito di chiamata.** Il pass di ottimizzazione di Intlayer riscrive i siti di chiamata `useI18n()` in modo che il componente riceva i dizionari i cui nomi di chiavi, nella locale attiva, come importazioni che il bundler può tracciare e dividere.

```vue fileName="src/components/Footer.vue"
<!-- Il tuo codice, invariato -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Ciò che il compilatore emette (semplificato)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Il componente non raggiunge più l'albero dei messaggi globali. Raggiunge `footer`. Ecco perché la colonna component-size qui sotto scende da 196 KB a 8 KB.

## Cosa mantiene l'adapter, cosa ignora e cosa non sostituisce

| API `vue-i18n`                                                      | Con `@intlayer/vue-i18n`                                                                                                                                 |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Mantenuto. Le chiavi `t` sono tipizzate rispetto ai tuoi dizionari                                                                                    |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Mantenuto. `{name}`, `{0}` e i plurali separati da pipe si risolvono come prima                                                                       |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Mantenuto. I `datetimeFormats` / `numberFormats` da `createI18n()` sono rispettati, supportati da `Intl` nativo                                       |
| `i18n.global.locale.value = "fr"`                                   | ✅ Mantenuto. Un `WritableComputedRef` supportato da Intlayer's client; la reattività si comporta come prima                                             |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Mantenuto. Registrato su `app.config.globalProperties` da `app.use(i18n)`                                                                             |
| `v-t` directive                                                     | ✅ Mantenuto                                                                                                                                             |
| `legacy: true`                                                      | ✅ Accettato                                                                                                                                             |
| `createI18n({ messages })`                                          | ⚠️ I `messages` vengono utilizzati come **fallback runtime** con un avviso di sviluppo. Rimuovi gli import JSON per i guadagni nel bundle                |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Avviso e nessuna azione. Il caricamento dei messaggi runtime è sostituito da dizionari in fase di build                                               |
| SFC `<i18n>` custom blocks                                          | ❌ Non letti. Sposta quei messaggi nel JSON locale (o in un `.content.ts` accanto al componente)                                                         |
| `@nuxtjs/i18n`                                                      | ⚠️ Adapter separato, vedi la [documentazione di compatibilità Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/nuxtjs-i18n.md) |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) costruisce **la stessa applicazione Vite + Vue 3** con ogni setup: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuti identici. Le pagine vengono misurate in `en` e `fr`.

Entrambi sono stati costruiti nella configurazione **statica**, quella che la maggior parte dei progetti Vue utilizza: per `vue-i18n`, ogni JSON della locale importato e passato a `createI18n({ messages })`; per l'adapter, gli stessi componenti con `vite.config.ts` e `intlayer.config.ts` modificati e l'import di `messages` rimosso. Il nativo `vue-intlayer` è incluso come riferimento.

Per ogni build, la suite registra:

- **Lib size**: dimensione gzip (e minificata) di un componente vuoto che importa solo la libreria i18n.
- **Page JS**: gzip JavaScript scaricato per pagina, mediato su tutte le pagine e le lingue.
- **Locale leak %**: quota di stringhe tradotte nel JS scaricato che appartengono a una lingua che l'utente **non** sta visualizzando.
- **Page leak %**: quota di stringhe tradotte nel JS scaricato che appartengono a una pagina su cui l'utente **non** si trova.
- **Component avg**: dimensione gzip media di ogni componente compilato in isolamento.
- **E2E reactivity**: tempo reale tra la selezione di una nuova lingua e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Page load**: `PerformanceNavigationTiming.duration`.

> I numeri sottostanti provengono dall'esecuzione del **2026-09-12** con `vue-i18n` 11.4.0 e `@intlayer/vue-i18n` 9.5.1. L'applicazione di test è deliberatamente piccola (poche decine di stringhe per locale), quindi le percentuali di dispersione descrivono un **pattern**: crescono con i tuoi contenuti mentre il costo runtime rimane fisso.

### Risultati su Vite + Vue 3

Scegli le metriche e le librerie che ti interessano:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> La colonna page-leak dell'app di base è lasciata vuota: senza una libreria i18n, il fingerprinting raccoglie stringhe hardcoded nei chunk condivisi e il numero non è significativo.

**Come leggerlo**

- **88 KB in meno per pagina, stessi componenti.** `vue-i18n` porta l'app di 41.3 KB a **134.9 KB**. La build dell'adapter degli stessi componenti arriva a **47.0 KB**, 5.7 KB in più dell'app di base. La maggior parte della differenza sono i 74.9 KB di `src/locales` che `createI18n({ messages })` inserisce in ogni pagina e l'adapter non raggruppa mai come blocco.
- **Il runtime si riduce di 3x.** Un componente vuoto che importa solo `vue-i18n` costa **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, il message compiler e il runtime. L'adapter costa **7.9 KB / 23.2 KB**, la maggior parte è il core di Intlayer più la superficie API di `vue-i18n`.
- **Componenti: 23x più piccoli.** Un componente `useI18n()` compilato in isolamento pesa in media **196 KB**, perché `t` è legato all'istanza che contiene ogni messaggio di ogni locale. Con l'adapter, lo stesso componente pesa in media **8.4 KB**: raggiunge il suo dizionario.
- **Perdite di dati.** `vue-i18n` spedisce ogni locale e le stringhe di ogni pagina su ogni pagina: perdita di locale del 50% (sui due locale fingerprinted; con dieci locale bundled lo spreco reale è più alto), perdita di pagina del 90%. L'adapter riduce la perdita di pagina a **0%** perché ogni componente importa solo i suoi dizionari. La perdita di locale si attesta al 15% in questa esecuzione `static`; `importMode: 'dynamic'` è l'impostazione che la elimina, e quella configurazione non faceva parte di questa esecuzione Vue.
- **Reattività e caricamento della pagina.** Il cambio di locale è economico per entrambi (1,5-2,8 ms); il sistema di reattività di Vue lo rende così una volta che i messaggi sono in memoria. Il caricamento della pagina passa da 13,6 ms a **9,3 ms**, in linea con 88 KB di JavaScript in meno da analizzare.
- **Informazioni sulle righe native.** `vue-intlayer` in questa esecuzione ha raggruppato ogni locale in modalità `static` e ha raggiunto 57.1 KB con un runtime di 3.9 KB; i dizionari sincronizzati dell'adapter hanno portato meno stringhe di locale straniere, da qui la cifra più bassa per pagina. Il runtime nativo rimane il più leggero dei tre, e il suo modello `.content.ts` è dove i blocchi SFC `<i18n>` trovano il loro equivalente.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa, ogni libreria e ogni strategia, nel [report di benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md).

## Perché i numeri cambiano

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nulla in `src/components/` è cambiato, quindi i miglioramenti provengono da ciò a cui `useI18n` è vincolato.

**Con `vue-i18n`**, il binding è l'istanza globale. `createI18n({ messages: { en, fr, ... } })` è un unico import che contiene tutto; ogni componente che chiama `useI18n()` può accedere a tutto, quindi il bundler non può fare splitting al di sotto dell'istanza. Ottimizzare significa che _tu_ dividi `en.json` per route, chiami `setLocaleMessage()` in un router guard, e mantenere corretta la mappa route-to-file mentre i componenti si muovono. Lo spreco cresce su due assi contemporaneamente, pagine e lingue:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # stringhe di ogni pagina
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Con `@intlayer/vue-i18n`**, il binding è il dizionario. `syncJSON` trasforma ogni chiave di primo livello di `en.json` in un dizionario; il passo di ottimizzazione passa al componente quelli i cui nomi chiave, mentre importa quelli che il bundler traccia e divide per pagina.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import removed
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

L'import `messages` in `i18n.ts` è la sola riga da eliminare. Sono i 88 KB.

## Migrazione in tre step

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

Il comando rileva `vue-i18n`, installa `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` e `@intlayer/sync-json-plugin`, e pre-compila `intlayer.config.ts`. Mantieni `vue-i18n` installato: è una peer dependency e fornisce i tipi.

</Step>
<Step number={2} title="Indirizza Intlayer ai tuoi file locale">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" raggruppa ogni locale; "dynamic" carica quello attivo su richiesta
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialetto vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` rimane dove si trova. Ogni chiave di primo livello (`footer`, `hero`...) diventa un dizionario.

</Step>
<Step number={3} title="Aggiungi il plugin e rimuovi l'importazione dei messaggi">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Prima: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` avvolge `vite-intlayer` (content watching, dictionary compilation, the optimize pass) e aliasa `vue-i18n` all'adapter. Rimuovere l'importazione di `messages` è ciò che elimina gli 88 KB; lasciarla comporta che l'app continui a funzionare ma spedisce entrambi.

</Step>
</Steps>

### Cosa puoi eliminare in seguito

| File / pattern                                | Perché                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` e simili | Utilizzato solo come fallback dall'adapter. Qui era il 88 KB                  |
| `setLocaleMessage()` nei router guard         | No-op. Il caricamento per-route è ora compito del compiler                    |
| `@intlify/unplugin-vue-i18n`                  | Non necessario: precompila i messaggi e i blocchi SFC che l'adapter non legge |
| Blocchi SFC `<i18n>`                          | Non letti; spostali nel JSON locale o in un `.content.ts` per componente      |

### Cosa guadagni oltre ai byte

- **Chiavi tipizzate.** `t("footer.github")` è tipizzata rispetto al dizionario `footer` compilato; un percorso errato è un errore TypeScript anziché la chiave renderizzata come testo.
- **`npx intlayer test`** fa fallire la CI su una chiave mancante in qualsiasi locale. **`npx intlayer fill`** traduce quelle mancanti con la tua chiave provider (OpenAI, Anthropic, Mistral, Gemini...) e le riscrive in `locales/{locale}.json`.
- **Visual Editor e CMS** operano sullo stesso JSON, quindi i non sviluppatori modificano tramite un'interfaccia utente e i file si aggiornano.
- **Migrazione incrementale a `.content.ts`.** Qualsiasi componente può passare da `useI18n()` a `useIntlayer("footer")` con un file di contenuto co-locato. I dizionari JSON e `.content.ts` coesistono e si uniscono.

## Limiti da conoscere prima di iniziare

<AccordionGroup>
<Accordion header="I blocchi SFC <i18n> non vengono letti">

Se i tuoi messaggi si trovano all'interno dei componenti, devono essere spostati nei file di lingua o in un `.content.ts`, che è la stessa idea con tipi generati.

</Accordion>
<Accordion header="Il caricamento dei messaggi a runtime scompare">

`setLocaleMessage()` e `mergeLocaleMessage()` mostrano un avviso e ritornano. Le traduzioni recuperate da un CMS a runtime richiedono il [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) o i comandi `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages è un ripiego, non è gratuito">

Mantenere le importazioni JSON in `createI18n()` mantiene i 75 KB nel bundle. Rimuovili una volta superato `intlayer test`.

</Accordion>
<Accordion header="L'adattatore non è il runtime nativo">

7.9 KB contro 3.9 KB per `vue-intlayer`. Una volta che ogni componente è passato a `useIntlayer`, rimuovilo.

</Accordion>
</AccordionGroup>

## Quando usare quale?

<AccordionGroup>
<Accordion header="Rimanere su vue-i18n">

La tua applicazione dipende dai blocchi SFC `<i18n>`, da flussi `setLocaleMessage()` a runtime, o 90 KB per pagina non rappresentano un problema per il tuo pubblico.

</Accordion>
<Accordion header="Usare @intlayer/vue-i18n">

Usi `vue-i18n` e vuoi gli 88 KB risparmiati, componenti 23 volte più piccoli, 0% di dispersione di pagina, chiavi tipizzate e controlli CI senza toccare un file `.vue`. Questo è il punto di ingresso per una codebase `vue-i18n` esistente.

</Accordion>
<Accordion header="Passare a nativo (vue-intlayer)">

Per nuovi progetti, o una volta che l'adattatore ha completato il suo compito. Offre il runtime più leggero (3.9 KB) e il modello `.content.ts` per componente che sostituisce i blocchi `<i18n>` con contenuti tipizzati. Inizia con [Intlayer con Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md) o [con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Devo modificare i miei file .vue?">

No. La build di benchmark ha modificato solo `vite.config.ts`, `intlayer.config.ts` e una riga in `src/i18n.ts`, l'importazione di `messages`. Ogni chiamata a `useI18n()`, `$t`, `v-t` e all'Options API è rimasta identica.

</Question>

<Question title="Perché la dimensione dei componenti è 23 volte inferiore?">

Perché `useI18n()` smette di fare riferimento all'istanza globale. `createI18n({ messages })` contiene tutti i messaggi di tutte le lingue, quindi un componente compilato isolatamente trascina 196 KB. Con l'adattatore accede solo al proprio dizionario: 8.4 KB.

</Question>

<Question title="Cosa succede con la formattazione di d() e n()?">

Mantenuta. Le configurazioni `datetimeFormats` e `numberFormats` passate a `createI18n()` sono rispettate, supportate dalle API native `Intl`. Consulta [formattazione di date, ore e numeri](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/date_time_number_formatting_locales.md).

</Question>

<Question title="Funziona con Nuxt?">

`@intlayer/vue-i18n` è destinato a Vite + Vue. Per `@nuxtjs/i18n`, usa l'[adattatore di compatibilità Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/nuxtjs-i18n.md) e consulta [Intlayer con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md) per la configurazione nativa.

</Question>

<Question title="Posso migrare componente per componente?">

Sì. Qualsiasi componente può passare da `useI18n()` a `useIntlayer("footer")` con un file di contenuto collocato accanto. I dizionari JSON e `.content.ts` coesistono e si uniscono.

</Question>

</FAQ>

## Confronti correlati

Stessa serie di adattatori:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer-lingui.md)

Le librerie a confronto diretto:

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md), funzionalità e DX
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_vue_i18n_library.md)

Documentazione di riferimento:

- [Compat adapter: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/vue-i18n.md) and [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/nuxtjs-i18n.md)
- [Guida alla migrazione: da vue-i18n a Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_vue-i18n_to_intlayer.md)
- [Report di benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md)
- [Ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e [il compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) e [traduzione AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md)

## Conclusione

`@intlayer/vue-i18n` cambia a cosa è associato `useI18n()`: da un'istanza globale che contiene ogni messaggio di ogni locale a un dizionario compilato per quel componente. Sulla stessa app Vite + Vue 3 che è **88 KB più leggera per pagina**, un runtime **3 volte più piccolo**, **componenti 23 volte più piccoli** e **0% page leakage**, per un file di configurazione, una riga di plugin e un import eliminato. I blocchi SFC `<i18n>` e il caricamento dei messaggi a runtime sono le due cose che non supporta, e il runtime nativo `vue-intlayer` rimane metà della sua dimensione.

Tutti i dati grezzi, le app di test e gli script si trovano nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Eseguilo tu stesso.

Consulta la documentazione ['Why Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) per maggiori dettagli.
