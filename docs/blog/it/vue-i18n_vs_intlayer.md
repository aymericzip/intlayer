---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n vs Intlayer
description: Confronta vue-i18n con Intlayer per l'internazionalizzazione (i18n) in app Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Internazionalizzazione Vue (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Questa guida confronta due popolari opzioni i18n per **Vue 3** (e **Nuxt**): **vue-i18n** e **Intlayer**.
Ci concentriamo sugli strumenti moderni di Vue (Vite, Composition API) e valutiamo:

1. **Architettura e organizzazione dei contenuti**
2. **TypeScript e sicurezza**
3. **Gestione delle traduzioni mancanti**
4. **Routing e strategia URL**
5. **Prestazioni e comportamento di caricamento**
6. **Esperienza sviluppatore (DX), strumenti e manutenzione**
7. **SEO e scalabilità per progetti di grandi dimensioni**

<TOC/>

> **tl;dr**: Entrambi possono localizzare app Vue. Se desideri **contenuti a livello di componente**, **tipi TypeScript rigorosi**, **controlli delle chiavi mancanti in fase di build**, **dizionari tree-shaken** e **helper integrati per router/SEO** oltre a **Editor Visivo e traduzioni AI**, **Intlayer** è la scelta più completa e moderna.

## Posizionamento ad alto livello

- **vue-i18n** - La libreria i18n de-facto per Vue. Formattazione flessibile dei messaggi (stile ICU), blocchi SFC `<i18n>` per messaggi locali e un grande ecosistema. La sicurezza e la manutenzione su larga scala dipendono principalmente da te.
- **Intlayer** - Modello di contenuto incentrato sui componenti per Vue/Vite/Nuxt con **tipizzazione TS rigorosa**, **controlli in fase di build**, **tree-shaking**, **helper per router e SEO**, **Editor Visivo/CMS** opzionale e **traduzioni assistite da AI**.

## Cosa costa al momento della compilazione

Prima delle tabelle delle funzionalità, la parte misurata. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila la stessa applicazione Vite + Vue 3 (10 pagine, 10 lingue) con ciascuna libreria e registra ciò che il browser scarica:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

Il runtime di `vue-i18n` da solo pesa **6 volte** quello di Intlayer, ogni pagina trasporta il **90% di stringhe di pagine esterne**, e un componente compilato isolatamente trascina **196 KB** perché `useI18n()` lo vincola all'albero globale dei messaggi. Il test completo, con tempi di reattività e caricamento della pagina, è disponibile nel [benchmark vue-i18n vs Intlayer](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-benchmark).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa nel [report di benchmark Vue](https://intlayer.org/it/doc/benchmark/vue).

## Confronto delle funzionalità affiancate (focalizzato su Vue)

| Funzionalità                                        | **Intlayer**                                                                      | **vue-i18n**                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Traduzioni vicino ai componenti**                 | ✅ Sì, contenuto collocato per componente (es. `MyComp.content.ts`)               | ✅ Sì, tramite blocchi SFC `<i18n>` (opzionale)                                                          |
| **Integrazione TypeScript**                         | ✅ Avanzata, tipi **rigorosi** generati automaticamente e completamento chiavi    | ✅ Buona tipizzazione; **sicurezza rigorosa delle chiavi richiede configurazioni/discipline aggiuntive** |
| **Rilevamento traduzioni mancanti**                 | ✅ Avvisi/errori in **fase di build** e visibilità in TS                          | ⚠️ Fallback/avvisi a runtime                                                                             |
| **Contenuti ricchi (componenti/Markdown)**          | ✅ Supporto diretto per nodi ricchi e file di contenuto Markdown                  | ⚠️ Limitato (componenti tramite `<i18n-t>`, Markdown tramite plugin esterni)                             |
| **Traduzione con AI**                               | ✅ Flussi di lavoro integrati usando le tue chiavi provider AI                    | ❌ Non integrato                                                                                         |
| **Editor Visivo / CMS**                             | ✅ Editor Visivo gratuito e CMS opzionale                                         | ❌ Non integrato (usa piattaforme esterne)                                                               |
| **Routing localizzato**                             | ✅ Helper per Vue Router/Nuxt per generare percorsi localizzati, URL e `hreflang` | ⚠️ Non core (usa Nuxt i18n o configurazioni personalizzate di Vue Router)                                |
| **Generazione dinamica delle rotte**                | ✅ Sì                                                                             | ❌ Non fornito (fornito da Nuxt i18n)                                                                    |
| **Pluralizzazione e formattazione**                 | ✅ Schemi di enumerazione; formatter basati su Intl                               | ✅ Messaggi in stile ICU; formatter Intl                                                                 |
| **Formati di contenuto**                            | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML in lavorazione)                     | ✅ `.json`, `.js` (più blocchi SFC `<i18n>`)                                                             |
| **Supporto ICU**                                    | ⚠️ In lavorazione                                                                 | ✅ Sì                                                                                                    |
| **Helper SEO (sitemap, robots, metadata)**          | ✅ Helper integrati (indipendenti dal framework)                                  | ❌ Non core (Nuxt i18n/comunità)                                                                         |
| **SSR/SSG**                                         | ✅ Funziona con Vue SSR e Nuxt; non blocca il rendering statico                   | ✅ Funziona con Vue SSR/Nuxt                                                                             |
| **Tree-shaking (spedire solo il contenuto usato)**  | ✅ Per componente al momento della build                                          | ⚠️ Parziale; richiede suddivisione manuale del codice/messaggi asincroni                                 |
| **Caricamento lazy**                                | ✅ Per locale / per dizionario                                                    | ✅ Supporta messaggi di locale asincroni                                                                 |
| **Rimozione del contenuto non utilizzato**          | ✅ Sì (a tempo di build)                                                          | ❌ Non integrato                                                                                         |
| **Manutenibilità di progetti di grandi dimensioni** | ✅ Favorisce una struttura modulare e amichevole per i design system              | ✅ Possibile, ma richiede una forte disciplina su file/namespace                                         |
| **Ecosistema / comunità**                           | ⚠️ Più piccolo ma in rapida crescita                                              | ✅ Grande e maturo nell'ecosistema Vue                                                                   |

## Confronto approfondito

<AccordionGroup>
<Accordion header="1) Architettura e scalabilità">

- **vue-i18n**: Le configurazioni comuni utilizzano **cataloghi centralizzati** per locale (opzionalmente suddivisi in file/namespace). I blocchi SFC `<i18n>` permettono messaggi locali, ma i team spesso tornano ai cataloghi condivisi man mano che i progetti crescono. Consulta [i18n per componente vs centralizzata](https://intlayer.org/it/blog/per-component-vs-centralized-i18n).
- **Intlayer**: Promuove **dizionari per componente** memorizzati accanto al componente che servono. Questo riduce i conflitti tra team, mantiene il contenuto facilmente rintracciabile e limita naturalmente la deriva/chiavi non utilizzate.

**Perché è importante:** In grandi app Vue o design system, il **contenuto modulare** scala meglio rispetto ai cataloghi monolitici.

</Accordion>
<Accordion header="2) TypeScript e sicurezza">

- **vue-i18n**: Buon supporto TS; la **tipizzazione rigorosa delle chiavi** richiede tipicamente schemi/generici personalizzati e convenzioni attente.
- **Intlayer**: **Genera tipi rigorosi** dal tuo contenuto, offrendo **autocompletamento nell’IDE** e **errori a tempo di compilazione** per errori di battitura o chiavi mancanti.

**Perché è importante:** Il typing forte intercetta i problemi **prima** del runtime.

</Accordion>
<Accordion header="3) Gestione delle traduzioni mancanti">

- **vue-i18n**: Avvisi/fallback **a runtime** (es. fallback su locale o chiave). Consulta [rilevamento delle traduzioni mancanti](https://intlayer.org/it/blog/detecting-missing-translations).
- **Intlayer**: Rilevamento **a build-time** con avvisi/errori su tutte le localizzazioni e chiavi., più `npx intlayer test` in CI.

**Perché è importante:** L’applicazione a build-time mantiene l’interfaccia di produzione pulita e coerente.

</Accordion>
<Accordion header="4) Strategia di routing e URL (Vue Router/Nuxt)">

- **Entrambi** possono funzionare con rotte localizzate. Consulta la [guida hreflang](https://intlayer.org/it/blog/hreflang-guide-multilingual-seo).
- **Intlayer** fornisce helper per **generare percorsi localizzati**, **gestire i prefissi di localizzazione** ed emettere **`<link rel="alternate" hreflang>`** per la SEO. Con Nuxt, integra il routing del framework.

**Perché è importante:** Meno strati di collegamento personalizzati e **SEO più pulita** tra le localizzazioni.

</Accordion>
<Accordion header="5) Prestazioni e comportamento di caricamento">

- **vue-i18n**: Supporta messaggi di localizzazione asincroni; evitare un bundle eccessivo è responsabilità tua (dividi i cataloghi con attenzione). Il benchmark sopra lo dimostra con i numeri: 134.9 KB contro 57.1 KB per pagina.
- **Intlayer**: **Ottimizza l’albero** durante la build e **carica in modo lazy per dizionario/località**. Il contenuto non utilizzato non viene incluso.

**Perché è importante:** Bundle più piccoli e avvio più veloce per app Vue multi-localizzazione.

</Accordion>
<Accordion header="6) Esperienza sviluppatore e strumenti">

- **vue-i18n**: Documentazione e community mature; solitamente ti affiderai a **piattaforme di localizzazione esterne** per i flussi editoriali.
- **Intlayer**: Fornisce un **Editor Visivo gratuito**, un **CMS** opzionale (compatibile con Git o esternalizzato), un’**estensione VSCode**, utility **CLI/CI** e **traduzioni assistite da AI** utilizzando le tue chiavi provider., un **server MCP**

**Perché è importante:** Costi operativi ridotti e un ciclo sviluppo–contenuto più breve.

</Accordion>
<Accordion header="7) SEO, SSR e SSG">

- **Entrambi** funzionano con Vue SSR e Nuxt. Consulta [internazionalizzazione e SEO](https://intlayer.org/it/blog/SEO-and-i18n).
- **Intlayer**: Aggiunge **helper SEO** (sitemap/metadata/`hreflang`) indipendenti dal framework e ben integrati con le build Vue/Nuxt.

**Perché è importante:** SEO internazionale senza configurazioni personalizzate complesse.

</Accordion>
</AccordionGroup>

## Perché Intlayer? (Problema e approccio)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

La maggior parte degli stack i18n (incluso **vue-i18n**) parte da **cataloghi centralizzati**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="Un file per lingua" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="Una cartella per lingua" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

Quella cartella continua a crescere, un namespace per funzionalità, in ogni lingua:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

Questo spesso rallenta lo sviluppo man mano che le app crescono:

1. **Per un nuovo componente** crei/modifichi cataloghi remoti, colleghi namespace e traduci (spesso tramite copia/incolla manuale da strumenti AI).
2. **Quando modifichi componenti** cerchi chiavi condivise, traduci, mantieni i locali sincronizzati, rimuovi chiavi inutilizzate e allinei le strutture JSON.

**Intlayer** delimita il contenuto **per componente** e lo mantiene **vicino al codice**, come già facciamo con CSS, storie, test e documentazione:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Ogni file di lingua deve essere modificato a mano, e la chiave è una semplice stringa: un refuso viene mostrato come `componentExample.greting` in produzione.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Tutte le lingue risiedono in un unico file tipizzato accanto al componente.

</Tab>
</Tabs>

Questo approccio:

- **Accelera lo sviluppo** (dichiara una volta; completamento automatico IDE/AI).
- **Pulisce il codice** (1 componente = 1 dizionario).
- **Facilita duplicazione/migrazione** (copia un componente e il suo contenuto insieme).
- **Evita chiavi inutilizzate** (i componenti non usati non importano contenuti).
- **Ottimizza il caricamento** (i componenti caricati in modo lazy portano con sé il loro contenuto).

## Funzionalità aggiuntive di Intlayer (rilevanti per Vue)

- **Supporto cross-framework**: Funziona con Vue, Nuxt, Vite, React, Express e altri.
- **Gestione contenuti basata su JavaScript**: Dichiara nel codice con piena flessibilità.
- **File di dichiarazione per ogni locale**: Definisci tutte le localizzazioni e lascia che gli strumenti generino il resto.
- **Ambiente con tipizzazione sicura**: Configurazione TS robusta con completamento automatico.
- **Recupero contenuti semplificato**: Un singolo hook/composable per ottenere tutti i contenuti di un dizionario.
- **Codebase organizzata**: 1 componente = 1 dizionario nella stessa cartella.
- **Routing migliorato**: Helper per percorsi e metadata localizzati di **Vue Router/Nuxt**.
- **Supporto Markdown**: Importa Markdown remoto/locale per ogni locale; espone il frontmatter al codice.
- **Editor Visuale gratuito & CMS opzionale**: Creazione contenuti senza piattaforme di localizzazione a pagamento; sincronizzazione compatibile con Git.
- **Contenuti tree-shakable**: Include solo ciò che viene utilizzato; supporta il caricamento lazy.
- **Compatibile con rendering statico**: Non blocca la generazione statica (SSG).
- **Traduzioni potenziate dall’IA**: Traduci in 231 lingue utilizzando il tuo provider AI/chiave API.
- **Server MCP & estensione VSCode**: Automatizza i flussi di lavoro i18n e la creazione di contenuti direttamente nel tuo IDE.
- **Interoperabilità**: Collegamenti con **vue-i18n**, **react-i18next** e **react-intl** quando necessario.

## Quando scegliere quale?

<AccordionGroup>
<Accordion header="Scegliere vue-i18n">

Desideri l'**approccio standard di Vue**, ti trovi a tuo agio nel gestire cataloghi e namespace in autonomia e la tua app è di **dimensioni medio-piccole** (o ti affidi già a Nuxt i18n). I blocchi SFC `<i18n>` e `setLocaleMessage()` a runtime sono funzionalità che Intlayer deliberatamente non replica.

</Accordion>
<Accordion header="Scegliere Intlayer">

Dai valore ai **contenuti per componente**, al **TypeScript rigoroso**, alle **garanzie in fase di compilazione**, al **tree-shaking** e agli strumenti integrati per routing, SEO ed editor, soprattutto per **codebase modulari Vue/Nuxt di grandi dimensioni** e design system. Inizia con [Intlayer con Vue](https://intlayer.org/it/doc/environment/vite-and-vue) o [con Nuxt](https://intlayer.org/it/doc/environment/nuxt-and-vue).

</Accordion>
<Accordion header="Scegliere @intlayer/vue-i18n">

Usi `vue-i18n` oggi e vuoi i vantaggi sul bundle senza toccare i file `.vue`. L'[adattatore di compatibilità](https://intlayer.org/it/doc/compatibility/vue-i18n) mantiene `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` e `v-t`, servendoli da dizionari compilati. Misurato fianco a fianco in [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-vue-i18n).

</Accordion>
</AccordionGroup>

## Interoperabilità con vue-i18n

`intlayer` può anche aiutarti a gestire i tuoi namespace `vue-i18n`.

Utilizzando `intlayer`, puoi dichiarare i tuoi contenuti nel formato della tua libreria i18n preferita, e intlayer genererà i tuoi namespace nella posizione di tua scelta (esempio: `/messages/{{locale}}/{{namespace}}.json`). Consulta la [documentazione di compatibilità con vue-i18n](https://intlayer.org/it/doc/compatibility/vue-i18n) e l'[adattatore Nuxt i18n](https://intlayer.org/it/doc/compatibility/nuxtjs-i18n).

## FAQ

<FAQ>

<Question title="Intlayer è un sostituto di vue-i18n o un livello superiore?">

Entrambi, a seconda di come lo adotti. `vue-intlayer` è un runtime nativo con il proprio composable `useIntlayer()`. `@intlayer/vue-i18n` è un adattatore di compatibilità che mantiene l'API di `vue-i18n` sostituendo ciò a cui è vincolata, permettendoti di migrare senza modificare i componenti e procedere file per file successivamente.

</Question>

<Question title="Cosa succede ai miei blocchi SFC <i18n>?">

L'adattatore non li legge. Sposta quei messaggi nei tuoi file JSON di lingua, o in un file `.content.ts` accanto al componente, che rappresenta la stessa idea con tipi generati. Questa è l'unica funzionalità di `vue-i18n` non supportata.

</Question>

<Question title="Intlayer funziona con Nuxt?">

Sì. [Intlayer con Nuxt](https://intlayer.org/it/doc/environment/nuxt-and-vue) copre routing multilingue, middleware di rilevamento della lingua e generazione di sitemap. Se usi `@nuxtjs/i18n`, l'[adattatore di compatibilità Nuxt i18n](https://intlayer.org/it/doc/compatibility/nuxtjs-i18n) è il percorso di migrazione.

</Question>

<Question title="Posso mantenere i miei locales/{locale}.json come fonte di verità?">

Sì. Il [plugin di sincronizzazione JSON](https://intlayer.org/it/doc/compatibility/vue-i18n) li legge con il dialetto `vue-i18n` (`{name}`, `{0}`, plurali pipe `"car | cars"`) e scrive le traduzioni quando la CLI o il CMS li aggiorna.

</Question>

<Question title="ICU funziona con Intlayer su Vue?">

Il supporto nativo ICU è in fase di sviluppo. L'adattatore `@intlayer/vue-i18n` gestisce la sintassi propria di `vue-i18n`, inclusi i plurali pipe e l'interpolazione denominata e di elenchi. Per il modello di pluralizzazione di Intlayer, consulta il [contenuto di enumerazione](https://intlayer.org/it/doc/concept/content/enumeration).

</Question>

</FAQ>

## GitHub STARs

Le stelle di GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della rilevanza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano utile il progetto, ne seguono i progressi e sono propensi ad adottarlo. Per stimare il valore di un progetto, le stelle aiutano a confrontare l'attrazione tra le alternative e forniscono approfondimenti sulla crescita dell'ecosistema.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusione

Sia **vue-i18n** che **Intlayer** localizzano bene le app Vue. La differenza è **quanto devi costruire da solo** per ottenere una configurazione robusta e scalabile:

- Con **Intlayer**, **contenuti modulari**, **TypeScript rigoroso**, **sicurezza a tempo di compilazione**, **bundle ottimizzati con tree-shaking** e **strumenti per router/SEO/editor** sono disponibili **pronti all'uso**.
- Se il tuo team dà priorità a **manutenibilità e velocità** in un'app Vue/Nuxt multilingue e basata su componenti, Intlayer offre l'esperienza **più completa** oggi disponibile.

## Ulteriori letture

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/it/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/it/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/it/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/it/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/it/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/it/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/it/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/it/doc/why) for more details.
