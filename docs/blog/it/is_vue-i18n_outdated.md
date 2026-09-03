---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: vue-i18n è obsoleto nel 2026?
description: vue-i18n è stato lo standard per Vue e Nuxt per oltre un decennio. Tuttavia, nei nostri benchmark si è dimostrato il runtime i18n più pesante del web. Scopri i dettagli.
keywords:
  - vue-i18n
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Vue
  - Nuxt
  - Dimensione bundle
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# vue-i18n è obsoleto nel 2026?

Nell'ecosistema Vue, poche librerie hanno raggiunto la diffusione di `vue-i18n`. Curata da Kazupon fin dai tempi di Vue 2, costituisce la base di `@nuxtjs/i18n` e la prima scelta per i progetti multilingua in Vue.

Tuttavia, i test comparativi del 2026 hanno evidenziato un dato inatteso: **`vue-i18n` è risultato il runtime di localizzazione più pesante tra tutti i framework frontend analizzati.**

Partendo da una configurazione snella Vite + Vue di soli 31.5 KB, l'aggiunta di `vue-i18n` ha innalzato il JavaScript medio per pagina a **136.4 KB**, quadruplicando il peso iniziale.

Per quale ragione un framework celebre per l'essenzialità si ritrova con uno stack i18n così corposo? E la sua architettura interamente a runtime è ancora attuale?

<TOC/>

## Punti chiave

**Il runtime più voluminoso testato:**

Con **24.3 KB gzipped (83.2 KB minificati)** prima di inserire qualsiasi testo, `vue-i18n` risulta circa **9 volte più pesante** del runtime di `intlayer` (2.7 KB).

**Un aumento del 330% sul payload della pagina:**

`vue-i18n` ha portato una pagina base da 31.5 KB a 136.4 KB. Intlayer genera invece 59.3 KB, un **payload inferiore del 56%**.

**Un compilatore nascosto nel browser:**

Per impostazione predefinita, senza alias dedicati configurati nel bundler, `vue-i18n` invia un intero compilatore al browser per interpretare le stringhe al volo.

**Ritmo di manutenzione:**

Nell'ultimo anno `vue-i18n` ha totalizzato ~259 commit, orientati alla risoluzione di bug e all'allineamento con le release di Vue.

**Assenza di strumenti moderni di primo livello:**

Nessun supporto nativo a Language Server (LSP), server MCP per IA o flussi automatizzati di traduzione via CLI.

## Manutenzione vs. tooling contemporaneo

| Repository            | Stelle                                                                                                                                                 | Commit totali                                                                                                                                                       | Commit / anno                                                                                                                                                      | Ultimo commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Attività negli ultimi 12 mesi:

- `intlify/vue-i18n`: **259 commit** (manutenzione ordinaria per Vue 3 e Nuxt).
- `aymericzip/intlayer`: **4.343 commit** (ottimizzazioni di compilazione, integrazioni LSP e supporto ad agenti IA).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Una libreria matura assicura affidabilità. Tuttavia le architetture odierne impiegano trasformazioni AST al build, eliminazione di codice morto e automazione con IA. Un'impostazione incentrata unicamente sul runtime fa fatica ad adottare questi paradigmi.

## Misurazione delle performance con Vite + Vue

Test eseguito su un'applicazione di 10 pagine e 10 lingue realizzata con Vite e Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Test condotti in browser reali con compressione gzip. Dati completi nella [documentazione del benchmark Vue](https://intlayer.org/it/doc/benchmark/vue).

### Peso iniziale delle librerie

Impatto iniziale prima dell'inclusione di qualsiasi stringa:

| Libreria          | Gzipped    | Minificato |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

Il runtime di `vue-i18n` da solo pesa **24.3 KB gzipped**, quasi l'intero core di Vue. Intlayer aggiunge appena **2.7 KB**.

### Peso delle pagine e dispersione dei contenuti

| Configurazione | JS medio / pag (gz) | Dispersione lingue | Dispersione altre pag | Componente medio (gz) |
| -------------- | ------------------- | ------------------ | --------------------- | --------------------- |
| Base (no i18n) | 31.5 KB             | 0.0%               | 90.0%                 | 0.9 KB                |
| `vue-i18n`     | **136.4 KB**        | 50.2%              | 90.0%                 | 196.0 KB              |
| Intlayer       | **59.3 KB**         | 51.1%              | **0.0%**              | **6.5 KB**            |

### Riscontri principali

**Espansione proporzionale significativa:**

Dato che l'infrastruttura di Vue è estremamente leggera (~31 KB), l'impatto di `vue-i18n` quadruplica il carico della pagina.

**Dispersione verso altre route:**

Per impostazione predefinita, il **90% dei testi caricati** su una route appartiene ad altre sezioni. Intlayer azzera questa dispersione al **0.0%**.

**Peso dei componenti isolati:**

I componenti con ambiti di localizzazione hanno raggiunto una media di 196 KB sotto `vue-i18n` a causa della replicazione dei cataloghi, contro i **6.5 KB** ottenuti con Intlayer.

## Perché vue-i18n è pesante?

### Compilatore AST distribuito al browser

`vue-i18n` racchiude un compilatore interno di formati. Plurali e variabili vengono elaborati come alberi sintattici astratti (AST) direttamente a runtime.

Per evitarlo occorre configurare alias specifici nel bundler verso `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` e precompilare i file con `@intlify/unplugin-vue-i18n`. Molti progetti trascurano questo passaggio.

### Funzionalità monolitiche

`vue-i18n` comprende motori di formattazione per numeri e date, gestione di messaggi concatenati, bridge per l'Options API classica (`$t`, `v-t`) e proxy reattivi. Anche volendo gestire testi essenziali in `<script setup>`, si carica comunque l'intero pacchetto.

### Le chiavi dinamiche ostacolano il tree-shaking

Poiché `"home.hero.title"` è risolta a runtime, gli strumenti di bundling non sanno quali stringhe vengano effettivamente impiegate. I testi inutilizzati rimangono quindi nel bundle.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Il [compilatore Intlayer](https://intlayer.org/it/doc/compiler) identifica le proprietà lette ed estromette i contenuti superflui prima di generare i chunk del client. Maggiori dettagli nell'[ottimizzazione del bundle](https://intlayer.org/it/doc/concept/bundle-optimization).

## Esperienza di sviluppo

### Cataloghi isolati vs. co-locazione

Con `vue-i18n`, i testi sono conservati in una cartella `locales/` separata. Intlayer favorisce la co-locazione dei file di contenuto direttamente accanto ai componenti:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/it.json"
{
  "hero": {
    "title": "Distribuisci in ogni lingua"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      it: "Distribuisci in ogni lingua",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Eliminando o modificando `Hero.vue`, i file di contenuto correlati vengono aggiornati o rimossi di conseguenza.

### Autocompletamento vs. completezza garantita

`DefineLocaleMessage` fornisce autocompletamento nell'editor sulla base dello schema principale. Tuttavia non assicura che ogni lingua sia completa. L'omissione di una chiave in `it.json` non arresta il build con TypeScript.

Intlayer convalida rigorosamente i dizionari. Abilitando [`strictMode`](https://intlayer.org/it/doc/concept/configuration), ogni traduzione mancante genera un errore bloccante in fase di compilazione.

### Strumenti per IDE e IA

| Funzionalità                  | `vue-i18n`              | Intlayer                                                                    |
| ----------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| **Estensione VS Code**        | Terze parti (i18n Ally) | ✅ [Estensione ufficiale](https://intlayer.org/it/doc/vs-code-extension)    |
| **Language Server (LSP)**     | ❌ Nessuno              | ✅ [LSP integrato](https://intlayer.org/it/doc/lsp)                         |
| **Server MCP per IA**         | ❌ Nessuno              | ✅ [Server MCP dedicato](https://intlayer.org/it/doc/mcp-server)            |
| **Competenze agente (Skill)** | ❌ Nessuna              | ✅ [Skill autonome](https://intlayer.org/it/doc/agent_skills)               |
| **CMS Visuale in contesto**   | ❌ Nessuno              | ✅ [CMS gratuito & Open Source](https://intlayer.org/it/doc/concept/editor) |

## Flussi di traduzione

`vue-i18n` non include comandi nativi per tradurre. Gli sviluppatori esportano solitamente i file verso piattaforme esterne come Crowdin o Phrase.

Intlayer offre questi strumenti direttamente:

**Completamento automatico tramite IA locale (`intlayer fill`):**

Traduce le chiavi assenti sfruttando le tue chiavi API di OpenAI, Anthropic, Mistral o Gemini.

**CMS visuale auto-ospitabile:**

Impiega il [CMS Intlayer](https://intlayer.org/it/doc/concept/cms) per consentire ai collaboratori non tecnici di intervenire sui testi con salvataggio diretto su Git.

**Licenza open source permissiva:**

L'intero set di strumenti è coperto da licenza Apache 2.0.

## Quando vue-i18n rappresenta ancora una scelta adeguata?

<AccordionGroup>
<Accordion header="Applicazioni Nuxt 2/3 già avviate">

Qualora il routing dipenda fortemente da `@nuxtjs/i18n`, ripensare l'infrastruttura può non risultare vantaggioso.

</Accordion>
<Accordion header="Impieghi complessi di ICU">

Se il sistema sfrutta regole articolate di plurali, orari o messaggi concatenati complessi.

</Accordion>
<Accordion header="Progetti personali leggeri">

Qualora l'impatto sul bundle non costituisca un fattore rilevante per le finalità del progetto.

</Accordion>
</AccordionGroup>

## Come migliorare la mia configurazione vue-i18n esistente?

Intlayer offre pacchetti di compatibilità drop-in che riproducono con precisione le firme di funzione di `vue-i18n` e `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Non è necessario riscrivere template o composable per usufruire di un'architettura leggera guidata dal compilatore.

L'installazione si completa con un solo comando:

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

Questa CLI interattiva:

1. Installa il pacchetto di compatibilità `@intlayer/vue-i18n` o `@intlayer/nuxt-i18n`.
2. Configura gli alias di Vite o Nuxt affinché le importazioni e i template esistenti facciano riferimento a Intlayer, consentendo di rimuovere `vue-i18n` da `package.json`.
3. Attiva istantaneamente le diagnostiche del Language Server (LSP), rimuove il parser AST da 24 KB dal bundle client e sblocca flussi locali di traduzione tramite IA senza complesse riorganizzazioni.

Per istruzioni dettagliate, consulta le nostre guide dedicate:

- **Compatibilità immediata:** Conserva i template esistenti impiegando il [layer di compatibilità `vue-i18n`](https://intlayer.org/it/doc/compatibility/vue-i18n) o [`@nuxtjs/i18n`](https://intlayer.org/it/doc/compatibility/nuxtjs-i18n).
- **Guide per la migrazione:** Converti i file JSON tradizionali in dizionari strutturati tramite le nostre guide: [da vue-i18n](https://intlayer.org/it/doc/migration/vue-i18n) o [da @nuxtjs/i18n](https://intlayer.org/it/doc/migration/nuxtjs-i18n).
- **Configurazione ibrida:** Mantieni `vue-i18n` a runtime mentre [utilizzi Intlayer con vue-i18n](https://intlayer.org/it/blog/intlayer-with-vue-i18n) per introdurre tipizzazione rigida e traduzione IA locale.

Analizza il carico di trasferimento del tuo sito con l'[analizzatore SEO i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Articoli consigliati

- [Benchmark Vue & Vite i18n: analisi approfondita delle prestazioni](https://intlayer.org/it/doc/benchmark/vue)
- [vue-i18n vs Intlayer: confronto punto per punto](https://intlayer.org/it/blog/vue-i18n-vs-intlayer)
- [next-intl è obsoleto nel 2026?](https://intlayer.org/it/blog/is-next-intl-outdated)
- [Internazionalizzazione a compilazione vs dichiarativa](https://intlayer.org/it/blog/compiler-vs-declarative-i18n)
