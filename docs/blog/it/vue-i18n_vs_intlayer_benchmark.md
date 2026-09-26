---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n e Intlayer misurati sulla stessa app Vite + Vue 3. Dimensione della libreria, JavaScript per pagina, leakage dei contenuti, dimensione dei componenti e reattività del cambio locale, con i numeri spiegati.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark di internazionalizzazione (i18n) per Vue

`vue-i18n` è la libreria i18n di riferimento per Vue. Intlayer è un'alternativa basata su compilatore, con contenuti a scope di componente, con un'integrazione Vue (`vue-intlayer`). Abbiamo già confrontato le loro [funzionalità e developer experience](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md). Questo articolo guarda a quanto costa ciascuna una volta che l'app è compilata.

I dati provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open-source che compila la stessa applicazione con ogni libreria e registra ciò che il browser scarica ed esegue davvero.

<TOC/>

> **tl;dr**: Sulla stessa app Vite + Vue 3, `vue-i18n` spedisce **134,9 KB** di JavaScript gzippato per pagina contro **41,3 KB** per l'app senza i18n. Intlayer spedisce **57,1 KB**. Il solo runtime di `vue-i18n` pesa **24,3 KB gzip** (6x i 3,9 KB di Intlayer), ogni pagina porta con sé il **90% delle stringhe di altre pagine**, e un componente compilato in isolamento trascina **196 KB** perché è legato all'albero globale dei messaggi. L'adapter `@intlayer/vue-i18n` mantiene l'API di `vue-i18n` e ha misurato **47,0 KB** per pagina.

## In breve

- **vue-i18n** - La libreria i18n de facto per Vue 2 / Vue 3 e il cuore di `@nuxtjs/i18n`. Messaggi in stile ICU, blocchi `<i18n>` negli SFC, direttiva `v-t`, formatter `d()` / `n()`, ampio ecosistema. I messaggi sono registrati su un'istanza globale in `createI18n()`; il lazy loading per locale è un pattern manuale con `setLocaleMessage()`, e la suddivisione per route va costruita da voi.
- **Intlayer** - Modello di contenuto centrato sui componenti. I dizionari `.content.ts` stanno accanto al componente che servono, un compilatore build-time (`vite-intlayer`) fa tree-shaking e lazy loading per componente e per locale, i tipi TypeScript stretti vengono generati dal vostro contenuto, e le traduzioni mancanti falliscono in fase di build. Include helper per router / SEO, un Visual Editor / CMS e traduzione assistita da IA.

| Libreria              | Stelle GitHub                                                                                                                                                                  | Commit totali                                                                                                                                                                      | Ultimo commit                                                                                                                                       | Prima versione | Versione NPM                                                                                                | Download NPM                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Aprile 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dic 2016       | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> I badge si aggiornano automaticamente. Le istantanee varieranno nel tempo.

## Confronto delle funzionalità fianco a fianco

| Funzionalità                                       | `vue-intlayer` (Intlayer)                                    | `vue-i18n`                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Traduzioni vicino ai componenti**                | ✅ Sì, `.content.ts` co-locato con ogni componente           | ✅ Tramite blocchi SFC `<i18n>` (opzionale); i cataloghi globali sono la norma        |
| **Integrazione TypeScript**                        | ✅ Tipi stretti auto-generati dal contenuto                  | ✅ Buone tipizzazioni; la sicurezza stretta delle chiavi richiede schema e disciplina |
| **Rilevamento traduzioni mancanti**                | ✅ Errore TypeScript + errore/avviso in fase di build        | ⚠️ Fallback a runtime + avviso in console                                             |
| **Contenuti ricchi (componenti / Markdown)**       | ✅ Supporto diretto                                          | ⚠️ Interpolazione di componenti `<i18n-t>`; Markdown tramite plugin esterni           |
| **Supporto ICU**                                   | ⚠️ In corso                                                  | ✅ Sì                                                                                 |
| **Formattazione (date, numeri, valute)**           | ✅ Formatter basati su Intl                                  | ✅ `d()` / `n()` con `datetimeFormats` / `numberFormats`                              |
| **Routing localizzato**                            | ✅ Helper per Vue Router / Nuxt, `getMultilingualUrls`       | ⚠️ Non nel core (`@nuxtjs/i18n` o configurazione router custom)                       |
| **Helper SEO (hreflang, sitemap, robots)**         | ✅ Helper integrati                                          | ❌ Non nel core                                                                       |
| **Tree-shaking (spedire solo il contenuto usato)** | ✅ Per componente, per locale, automatizzato dal compilatore | ⚠️ Manuale: dividere i cataloghi, `setLocaleMessage()` per route                      |
| **Lazy loading**                                   | ✅ `importMode: 'dynamic'` (una riga di config)              | ✅ `import()` manuale + `setLocaleMessage()`                                          |
| **Purge dei contenuti inutilizzati**               | ✅ I dizionari morti vengono eliminati in fase di build      | ❌ Non integrato                                                                      |
| **Test delle traduzioni mancanti (CLI / CI)**      | ✅ `npx intlayer content test`                               | ⚠️ Di terze parti (`vue-i18n-extract`)                                                |
| **Traduzione con IA**                              | ✅ Integrata, usa le vostre chiavi del provider              | ❌ No                                                                                 |
| **Visual Editor / CMS**                            | ✅ Visual Editor gratuito + CMS opzionale                    | ❌ No (piattaforme di localizzazione esterne)                                         |
| **Server MCP e Agent Skills**                      | ✅ Sì                                                        | ❌ No                                                                                 |
| **Ecosistema / community**                         | ⚠️ Più piccolo ma in rapida crescita                         | ✅ Ampio e maturo nell'ecosistema Vue                                                 |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **la stessa applicazione Vite + Vue 3** con ogni libreria: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuti identici. Le pagine sono misurate in `en` e `fr`.

Entrambe le librerie sono state testate nella configurazione **static**, quella che la maggior parte dei progetti Vue spedisce: per `vue-i18n`, il JSON di ogni locale importato e passato a `createI18n({ messages })`; per Intlayer, l'`importMode: 'static'` predefinito. In quella modalità anche Intlayer include tutte le locale, ma il compilatore continua a limitare il contenuto **per componente**, quindi una pagina porta solo i dizionari dei componenti che renderizza.

Per ogni build, la suite registra:

- **Lib size**: dimensione gzip di un componente vuoto che importa solo la libreria i18n. Il costo fisso del runtime.
- **Page JS**: JavaScript gzip scaricato per pagina, in media su tutte le pagine e le locale.
- **Locale leak %**: quota di stringhe tradotte trovate nel JS scaricato che appartengono a una locale che l'utente **non** sta visualizzando (fingerprint su `en` e `fr`, quindi 50% significa "l'altra locale misurata è completamente presente"; con 10 locale incluse, lo spreco reale è maggiore).
- **Page leak %**: quota di stringhe tradotte trovate nel JS scaricato che appartengono a una pagina in cui l'utente **non** si trova.
- **Component avg**: dimensione gzip media di ogni componente compilato in isolamento. Mostra quanto runtime i18n e catalogo trascina un singolo componente.
- **E2E reactivity**: tempo reale tra la selezione di una nuova locale e l'aggiornamento di `html[lang]` nel DOM (Playwright, 5 iterazioni).
- **Page load**: `PerformanceNavigationTiming.duration`.

> I numeri qui sotto provengono dall'esecuzione datata **2026-09-12** con `vue-i18n` 11.4.0 e `intlayer` 9.5.0 / 9.5.1. L'applicazione di test è deliberatamente piccola (qualche decina di stringhe per locale), quindi le percentuali di leakage descrivono un **pattern**: crescono con i vostri contenuti mentre il costo del runtime resta fisso.

### Risultati su Vite + Vue 3

| Libreria                      | Strategia | Lib size (gz) | Lib size (min) | Page JS media (gz) | Locale leak | Page leak | Component media (gz) | Reattività E2E | Page load |
| ----------------------------- | --------- | ------------: | -------------: | -----------------: | ----------: | --------: | -------------------: | -------------: | --------: |
| **base** (senza i18n)         | -         |        0,0 KB |         0,0 KB |            41,3 KB |        0,0% |         - |               1,1 KB |         1,8 ms |   10,8 ms |
| `vue-i18n`                    | static    |       24,3 KB |        83,2 KB |           134,9 KB |       50,0% |     90,0% |             196,0 KB |         2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static    |    **3,9 KB** |    **11,1 KB** |        **57,1 KB** |       56,8% |  **0,0%** |           **7,7 KB** |     **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static    |        7,9 KB |        23,2 KB |            47,0 KB |       15,0% |      0,0% |               8,4 KB |         1,5 ms |    9,3 ms |

> La colonna page-leak dell'app base è lasciata vuota: senza libreria i18n, il fingerprinting rileva stringhe hard-coded nei chunk condivisi e il numero non è significativo.

**Come leggerlo**

- **Costo del runtime.** `vue-i18n` è uno dei runtime più pesanti dell'intero benchmark: **24,3 KB gzip / 83,2 KB minificato** per un componente vuoto che lo importa soltanto. `vue-intlayer` costa 3,9 KB gzip. Quel divario si paga su ogni pagina, indipendentemente da quante stringhe avete.
- **JavaScript per pagina.** L'app senza i18n pesa 41,3 KB. `vue-i18n` la più che triplica a **134,9 KB**; Intlayer si ferma a **57,1 KB**, +15,8 KB, per lo più dovuti alle dieci locale incluse (vedi il punto successivo).
- **Leakage.** Con `createI18n({ messages: { en, fr, ... } })`, ogni pagina spedisce tutte le locale e le stringhe di tutte le pagine: **50% di locale leakage** (sulle due locale con fingerprint) e **90% di page leakage**. La modalità `static` di Intlayer include anche tutte le locale (da qui il dato di locale leak comparabile) ma ha **0% di page leakage**: una pagina tira solo i dizionari dei componenti che renderizza. Passare a `importMode: 'dynamic'` rimuove anche il locale leakage; quella configurazione non faceva parte di questa esecuzione Vue.
- **La dimensione dei componenti è dove l'architettura si vede.** Un componente che chiama `useI18n()` compila a **196 KB** in media, perché `t()` è legato all'istanza globale che contiene ogni messaggio di ogni locale. Lo stesso componente con `useIntlayer()` compila a **7,7 KB**: raggiunge solo il proprio dizionario.
- **La reattività** non è un problema per nessuno dei due (2-5 ms). Il sistema di reattività di Vue rende economico il cambio di locale una volta che i messaggi sono in memoria.
- **`@intlayer/vue-i18n`**, l'adapter drop-in, mantiene l'API di `vue-i18n` e ha misurato **47,0 KB per pagina** e **8,4 KB per componente**, con il codice applicativo intatto.

> Per riferimento, la stessa esecuzione ha misurato `fluent-vue` a 171,8 KB per pagina, 29,7 KB di runtime e 217 KB per componente.

## Perché il divario? Istanza globale vs dizionari compilati

`vue-i18n` è un runtime. `createI18n()` costruisce un'istanza globale che contiene un albero di messaggi per locale; `useI18n()` lega ogni componente a essa; `t("footer.github")` cerca la chiave al momento del render. È ciò che rende possibili i blocchi SFC `<i18n>`, `v-t` e il caricamento dei messaggi a runtime, ed è anche il motivo per cui il grafo delle dipendenze di ogni componente include l'intero albero:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # un file per locale, tutte le pagine dentro
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Ottimizzare significa che **voi** dividete `en.json` in file per route, **voi** chiamate `setLocaleMessage()` in un guard del router, e **voi** mantenete corretta la mappa route-file man mano che i componenti si spostano. Il runtime non può farlo per voi perché non ha idea di quali chiavi chiederà un componente.

Intlayer sposta quella conoscenza nella build. Il contenuto è dichiarato accanto al componente, e `vite-intlayer` risolve quale componente importa quale dizionario:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Il compilatore emette, per dizionario e per locale, esattamente il JSON di cui quel componente ha bisogno, ed elimina i dizionari che nessuno importa. Lo scope per route è una conseguenza dello scope per componente, non un compito.

> Per eliminare anche le locale inutilizzate, impostate `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Vedi la [doc sull'ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

## Developer experience

### Setup

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Componente

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` è una stringa finché non tipizzate voi stessi lo schema dei messaggi; un errore di battitura renderizza la chiave.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` e `increment` sono tipizzati; un errore di battitura è un errore TypeScript, un valore francese mancante è un errore di build.

### Lazy loading per locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Poi chiamate `loadLocaleMessages()` da un guard del router, e dividete voi stessi `locales/{locale}.json` per route se volete uno scope per pagina.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Mantenete l'API di vue-i18n, ottenete l'output di Intlayer

`@intlayer/vue-i18n` è un adapter drop-in: `useI18n()`, `t()`, `d()`, `n()`, l'interpolazione `{name}` e `{0}`, i plurali con pipe (`"car | cars"`), `v-t` e `i18n.global.locale` continuano a funzionare, serviti da dizionari Intlayer compilati da `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Nel benchmark, la build compat della stessa app è passata da **134,9 KB a 47,0 KB** per pagina e da **196 KB a 8,4 KB** per componente, con i componenti intatti. I vostri `locales/{locale}.json` esistenti possono restare la fonte di verità tramite il plugin di sincronizzazione JSON.

Vedi la [guida di migrazione da vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_vue-i18n_to_intlayer.md) e la [doc di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/vue-i18n.md). Gli utenti Nuxt hanno lo stesso percorso tramite la [compatibilità `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/nuxtjs-i18n.md).

## Quando scegliere quale?

- **Scegliete vue-i18n** se volete l'approccio Vue standard, vi affidate ai messaggi ICU o ai blocchi SFC `<i18n>`, usate già `@nuxtjs/i18n`, o una piattaforma di traduzione si aspetta JSON centralizzato. Mettete in conto il tempo per dividere i cataloghi e fare lazy loading per route se la dimensione del bundle conta.
- **Scegliete Intlayer** se volete **contenuti a scope di componente**, **TypeScript stretto**, **errori di chiavi mancanti in fase di build**, **tree-shaking e lazy loading senza sforzo**, e strumenti editoriali integrati (Visual Editor, CMS, traduzione IA, server MCP). Particolarmente rilevante per codebase Vue / Nuxt grandi e modulari e per i design system.
- **Scegliete `@intlayer/vue-i18n`** se siete già su `vue-i18n` e volete i guadagni sul bundle senza una riscrittura.

## Confronti correlati

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-intl_vs_intlayer.md) (stesso benchmark)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_intlayer.md) (stesso benchmark)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md) (stesso benchmark)
- [vue-i18n vs Intlayer (funzionalità e DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md)
- [vue-i18n è obsoleto?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_vue-i18n_outdated.md)

## Stelle GitHub

Le stelle GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della community e della rilevanza a lungo termine. Pur non essendo una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano utile il progetto, ne seguono i progressi e sono propensi ad adottarlo.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusione

`vue-i18n` è maturo, flessibile e profondamente integrato con Vue. Il benchmark mostra cosa costa il suo design runtime-first su una build Vite: un **runtime di 24 KB gzip**, **134,9 KB per pagina** per un'app che pesa 41 KB senza i18n, **90% di contenuti di altre pagine** su ogni pagina, e componenti che raggiungono ciascuno **196 KB** perché dipendono dall'albero globale dei messaggi.

Intlayer sposta il lavoro nel compilatore. I dizionari per componente e la purge dei contenuti morti sono output della build, non convenzioni. Sulla stessa app: **3,9 KB di runtime**, **57,1 KB per pagina**, **0% di page leakage**, componenti **25x più piccoli**. E se una riscrittura non è un'opzione, `@intlayer/vue-i18n` fa gran parte della strada con i componenti intatti.

Tutti i dati grezzi, le app di test e gli script sono nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Eseguitelo voi stessi.

Consultate la [doc "Perché Intlayer?"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) per maggiori dettagli.
