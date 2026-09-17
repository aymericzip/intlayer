---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Come scegliere la giusta libreria i18n per Vue nel 2026"
description: Una guida decisionale per l'internazionalizzazione in Vue e Nuxt. Quali domande porsi prima di confrontare vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide e Intlayer, e cosa comporta ogni scelta in termini di bundle size, typing e payload SSR.
keywords:
  - vue i18n
  - vue internationalization
  - internazionalizzazione vue
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - confronto librerie i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Come scegliere la giusta libreria i18n per Vue

"Vue i18n" è sia un termine generico sia il nome della libreria che quasi tutti installano. Questo è conveniente e fuorviante allo stesso tempo: `vue-i18n` è un'ottima scelta predefinita, ma non è l'unica opzione, e le domande che dovrebbero guidare la scelta (SSR o no, quante pagine, chi scrive le traduzioni) vengono poste raramente prima di eseguire `npm install`.

Questa guida le pone per prima, per poi mappare le risposte sulle librerie più adatte, sia per Vite + Vue puro sia per Nuxt.

![Ecosistema delle librerie i18n per Vue](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Indice

<TOC/>

## Sei domande a cui rispondere prima di confrontare le librerie

1. **Vite SPA o Nuxt?** In una SPA il costo del catalogo è un problema di bundle JS. In Nuxt è anche un problema di payload HTML, poiché i messaggi vengono serializzati nello stato SSR e idratati. La maggior parte delle segnalazioni del tipo "vue-i18n è lento" proviene da applicazioni Nuxt per questa ragione.
2. **Chi scrive le traduzioni?** Sviluppatori, un TMS, un'agenzia che fornisce stringhe ICU o una pipeline AI. `vue-i18n` utilizza una propria sintassi per i plurali separata da pipe, non ICU. Questo è importante se le stringhe provengono dall'esterno.
3. **Quante lingue (locales) e quante pagine?** Due lingue e cinque pagine possono includere tutto nel bundle. Dieci lingue e quaranta route no, e la strategia di caricamento diventa il costo principale.
4. **Avete bisogno di types sulle chiavi?** `t("cart.totl")` compila senza errori in `vue-i18n` a meno che non si passi un generico per lo schema dei messaggi, e tale schema entra in conflitto con i cataloghi caricati in modo lazy.
5. **Cosa contiene il contenuto?** Solo etichette UI, o markdown, link all'interno delle frasi e blocchi specifici per lingua. I contenuti complessi (rich content) sono il punto in cui `t()` che restituisce una stringa diventa scomodo.
6. **La CSP è un vincolo?** La build predefinita di `vue-i18n` compila i messaggi nel browser con `new Function`. Le build runtime-only richiedono `@intlify/unplugin-vue-i18n` per precompilare a build time.

Scrivete le risposte. Tutto ciò che segue fa riferimento ad esse.

## Il panorama in un'unica panoramica

L'ecosistema Vue conta meno librerie i18n rispetto a React, e provengono da ondate architetturali differenti.

![Storia delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dizionari a runtime (dal 2015 al 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` è apparso nel 2015 ed è stato lo standard da allora. `@nuxt/i18n` lo integra con routing localizzato, tag SEO e caricamento lazy per lingua. I messaggi vengono compilati in funzioni di rendering, a build time se si aggiunge l'unplugin, nel browser altrimenti.

</Accordion>
<Accordion header="Formati alternativi (2020): fluent-vue">

I file `.ftl` di Mozilla Fluent hanno introdotto una sintassi dei messaggi più intuitiva con varianti sensibili alla grammatica. Nessun type per le chiavi, e il plugin Vite carica ogni lingua in ogni pagina.

</Accordion>
<Accordion header="Compilatore e contenuti collocati (dal 2024 al 2026): Paraglide, Intlayer">

Paraglide genera una funzione per messaggio e lascia che il bundler rimuova il resto tramite tree-shaking. Intlayer dichiara i contenuti per componente nei file `.content.ts`, genera i types e include nel bundle solo ciò che una route renderizza.

</Accordion>
</AccordionGroup>

La [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md) tratta ogni ondata nel dettaglio.

## La decisione più importante: dove risiedono i contenuti e quando vengono caricati

Due scelte strutturali spiegano la maggior parte delle differenze di bundle tra i vari setup:

- **Contenuto centralizzato o scoped.** Un unico `locales/en.json` per l'applicazione, oppure una dichiarazione per componente.
- **Import statico o dinamico.** Tutto all'avvio, oppure la lingua attiva (e idealmente la route attiva) caricata on-demand.

Il grafico stima il payload per un'applicazione teorica da 1 a 10 pagine, tradotta in 1-10 lingue, con circa 30 KB di testo per pagina.

![Perdita teorica di contenuto per architettura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` supporta l'asse dinamico: `setLocaleMessage` dopo un `import()` permette di evitare di distribuire nove lingue che nessuno legge. Ciò che non offre è l'asse delle pagine. Un catalogo per lingua è un unico oggetto, e caricarlo comporta il caricamento dei testi di ogni pagina. In una SPA nessuno se ne accorge. In Nuxt, con `@nuxtjs/i18n` e più di dieci pagine, ogni route trasporta le stringhe di ogni altra route, due volte: nel chunk JS e nel payload SSR.

Il [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md) misura questo aspetto come "leakage da altre route" e "leakage da altre lingue". Se la vostra risposta alla domanda 3 era "molte pagine", questa sezione supera qualsiasi preferenza di API. L'articolo [i18n per componente vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md) analizza il lato manutenzione dello stesso compromesso.

## I candidati

Le dimensioni delle librerie provengono dal [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md): plugin più composable in un componente vuoto, dopo bundling, tree-shaking e minificazione, su un'app di 10 pagine e 10 lingue. Il contenuto è misurato separatamente.

| Libreria       | Modello di contenuto                                               | Types sulle chiavi             | Formato dei messaggi            | Suddivisione per route | Dimensione libreria |
| :------------- | :----------------------------------------------------------------- | :----------------------------- | :------------------------------ | :--------------------- | :------------------ |
| `vue-i18n`     | Cataloghi centralizzati per lingua, blocchi SFC `<i18n>` opzionali | Opt-in tramite generico schema | Proprietario (plurali con pipe) | No                     | ~24.3 kB            |
| `@nuxtjs/i18n` | Come `vue-i18n`, più routing e tag SEO                             | Identico                       | Identico                        | No, solo per lingua    | In aggiunta         |
| `fluent-vue`   | File `.ftl` (Mozilla Fluent)                                       | Nessuno                        | Fluent                          | No                     | ~29.7 kB            |
| Paraglide      | Progetto inlang, funzioni generate                                 | Generati                       | Proprietario                    | Tramite tree-shaking   | Quasi zero          |
| Intlayer       | Un file `.content.ts` per componente                               | Generati, attivi di default    | Helper (`plural`)               | Sì, per componente     | Baseline            |

> I numeri sono un'istantanea alle versioni del benchmark. Eseguitelo sulla vostra applicazione prima di decidere unicamente in base alle dimensioni.

La dimensione quasi nulla della libreria Paraglide è dovuta alla sua architettura: il runtime viene generato direttamente nel repository, il che comporta un passaggio di rigenerazione prima di ogni push e conflitti di merge sui file generati. Intlayer necessita di `vite-intlayer` (o del modulo Nuxt), quindi non può funzionare senza una fase di build.

## Mappare le risposte a una libreria

<AccordionGroup>
<Accordion header="Vite SPA, team piccolo, poche lingue">

`vue-i18n` in modalità Composition (`legacy: false`), con `@intlify/unplugin-vue-i18n` in modo da distribuire la build runtime-only. Caricamento lazy delle lingue con `import()`. Questo copre la maggior parte delle piccole applicazioni e le soluzioni della community si trovano ovunque. I blocchi SFC `<i18n>` collocano i messaggi insieme al componente, il che aiuta, ma gli strumenti di estrazione e integrazione TMS per questi blocchi sono più limitati rispetto ai cataloghi JSON, quindi è bene decidere presto quale approccio adottare nel team.

</Accordion>
<Accordion header="Nuxt con routing localizzato, sitemap e hreflang">

`@nuxtjs/i18n` fornisce la strategia di routing, i tag `hreflang` e il rilevamento della lingua senza scrivere codice, e questo da solo ne giustifica l'uso per siti di contenuti con una manciata di pagine. Il suo limite è il catalogo per lingua: oltre la decina di pagine, il payload SSR include i testi di ogni route. Se questo è il vostro caso, potete configurare manualmente `vue-i18n` con messaggi suddivisi per route, oppure passare a contenuti scoped. L'articolo su [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/nuxt.md) esamina prima di tutto la scelta della strategia di routing.

</Accordion>
<Accordion header="Le traduzioni provengono da un TMS o da un'agenzia che fornisce file ICU">

La sintassi per i plurali di `vue-i18n` (`"no item | one item | {count} items"`) non è ICU e non è portabile. I traduttori devono esserne informati e un'esportazione da TMS non la produrrà. È consigliabile concordare il formato prima della creazione del primo catalogo, oppure scegliere una libreria il cui formato corrisponda a quello del vostro fornitore. Il supporto ICU di Intlayer è parziale, quindi se ricevete stringhe ICU oggi, considerate anche questo come un fattore bloccante.

</Accordion>
<Accordion header="Applicazione di grandi dimensioni, molte route, vincoli di bundle o payload SSR">

È preferibile scegliere contenuti scoped compilati a build time. Paraglide ottiene questo risultato tramite il tree-shaking, che funziona come previsto su Vite. Intlayer lo ottiene tramite dichiarazioni per componente e include nel bundle solo ciò che la route renderizza. Con `vue-i18n`, è possibile suddividere manualmente i messaggi per route, ma nulla lo impone e un componente condiviso che importa un namespace globale può silenziosamente annullare tale separazione.

</Accordion>
<Accordion header="La type safety non è negoziabile">

`vue-i18n` può essere tipizzato passando un generico di schema a `createI18n`. Funziona, ma si rompe nel momento in cui i cataloghi vengono caricati in modo lazy, poiché lo schema descrive messaggi che potrebbero non essere ancora presenti. Se non volete gestire questa manutenzione, scegliete una libreria i cui types sono generati a partire dai contenuti: Paraglide o Intlayer. L'articolo sull'[individuazione delle traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md) confronta ciò che ciascuna libreria intercetta a build time.

</Accordion>
<Accordion header="I contenuti vanno oltre le semplici etichette UI">

Pagine in markdown, frasi con un `<RouterLink>` nel mezzo, componenti specifici per lingua. `vue-i18n` offre `<i18n-t>` per l'interpolazione di componenti, che funziona ma risulta prolisso. I nodi di contenuto di Intlayer accettano direttamente markdown, HTML e oggetti nidificati, risultando più adatti quando l'applicazione ha una forte componente di contenuti.

</Accordion>
<Accordion header="Le traduzioni saranno generate tramite AI">

In questo caso, il JSON centralizzato non ha più alcun consumatore che ne giustifichi l'esistenza. Contenuti collocati uniti a una CLI che completa le lingue mancanti rappresentano la strada più diretta. Il comando `fill` di Intlayer viene eseguito utilizzando la vostra chiave API (OpenAI, Anthropic, Mistral, Gemini) e ritraduce solo ciò che è cambiato.

</Accordion>
</AccordionGroup>

## Dove ogni libreria mostra i suoi limiti

- **`vue-i18n`**: la più pesante del gruppo, formato proprietario per i plurali, types opzionali e fragili con il lazy loading, nessuna suddivisione per route, le chiavi obsolete si accumulano silenziosamente. Lasciare `legacy: true` in un'app Vue 3 mantiene il layer di compatibilità con Vue 2 e perde la tipizzazione di `useI18n()`.
- **`@nuxtjs/i18n`**: eredita tutti i punti sopra, e il payload SSR trasporta le stringhe di ogni pagina non appena si supera una dozzina di route.
- **`fluent-vue`**: ottima sintassi dei messaggi, nessun type per le chiavi, e il plugin Vite carica tutti i contenuti in tutte le lingue in ogni pagina. La più pesante nel benchmark.
- **Paraglide**: file generati salvati nel repository, rigenerazione prima di ogni push, e la lingua viene letta da cookie o storage a ogni chiamata del messaggio invece che da uno store reattivo, con un costo computazionale al cambio lingua.
- **Intlayer**: plugin di build obbligatorio, ecosistema più piccolo, supporto ICU parziale e contenuti distribuiti nel codebase per progettazione, quindi esportare un unico JSON per un traduttore richiede strumenti appositi.

## Come si presenta ogni opzione nel codice

Lo stesso componente, un riepilogo del carrello con un titolo e un plurale, scritto con ciascun candidato. La parte interessante non è il template, ma dove risiede il contenuto e cosa `vue-tsc` sa a riguardo.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

I plurali separati da pipe sono il formato proprietario di vue-i18n, non ICU. `t` accetta qualsiasi stringa a meno che non si passi un generico per lo schema dei messaggi a `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

La sintassi di Fluent gestisce bene plurali e varianti grammaticali. Gli ID dei messaggi sono stringhe non tipizzate e il plugin Vite include tutte le lingue in ogni pagina.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Ogni messaggio è una funzione tipizzata generata, quindi una chiave mancante risulta in un errore di importazione. La cartella `paraglide/` viene generata nel repository e rigenerata a ogni modifica.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      it: "Il tuo carrello",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      it: plural({ one: "{{count}} articolo", other: "{{count}} articoli" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Tutte le lingue in un unico file accanto al componente. I types vengono generati durante la build, quindi `title` dispone di autocompletamento e un refuso blocca `vue-tsc`. `<title />` renderizza un nodo che l'editor visuale può selezionare; `{{ items(props.count) }}` restituisce la stringa semplice.

  </Tab>
</Tabs>

Utilizzate già `vue-i18n`? L'[adapter di compatibilità `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/vue-i18n.md) crea un alias per il pacchetto a livello di bundler, consentendo a `useI18n()`, `$t`, plurali con pipe e `v-t` di continuare a funzionare mentre Intlayer gestisce i contenuti. La [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_vue-i18n_to_intlayer.md) illustra come abbandonare l'adapter successivamente, ed è disponibile anche una [guida specifica per Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_nuxtjs_i18n_to_intlayer.md).

## Prima di effettuare la scelta definitiva

Una tabella delle funzionalità indica cosa fa una libreria oggi. Questi punti descrivono come sarà l'utilizzo quotidiano.

**Verificate l'attività del repository.**

Commit, tempi di risposta alle issue e se l'ultima minor release risale a quest'anno. Un'ottima architettura senza manutentori equivale a una migrazione futura annunciata.

**Non basate la scelta sui download npm.**

La libreria più installata è quella rilasciata per prima, non necessariamente quella più adatta a un codebase Vue nel 2026. I download misurano la storia, non l'idoneità.

![Classifica tier list delle librerie i18n per JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Chiedetevi chi finanzia il manutentore e cosa vende.**

`vue-i18n` è supportato da Crowdin, come `next-intl` e `svelte-i18n`. `i18next` è supportato da Locize. Tolgee, Paraglide (inlang) e Intlayer gestiscono ciascuno la propria piattaforma. Un fornitore le cui entrate dipendono dalla traduzione ospitata (hosted translation) ha pochi incentivi a rendere la traduzione gratuita all'interno della vostra toolchain. Intlayer è l'unica del gruppo a offrire la traduzione tramite AI direttamente da CLI con la vostra chiave API e un CMS con supporto self-hosting.

**È pronta per gli agenti AI?**

Gli agenti incontrano ancora difficoltà con l'i18n: dimenticano lingue, inventano chiavi e confondono le sintassi dei messaggi. La libreria include [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md) o un [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md) affinché l'agente possa elencare, compilare e testare i contenuti? E il caricamento dei contenuti è ottimizzato di default, o qualcuno deve revisionare namespace e import lazy ogni trimestre?

**Type safety out of the box.**

Non "può essere tipizzata con configurazioni extra", ma "una chiave errata blocca `tsc` su un'installazione pulita". Verificate cosa accade con una chiave non esistente e con una lingua a cui manca una traduzione.

**Rilevamento dei contenuti inutilizzati.**

I cataloghi tendono solo a crescere. La build di Intlayer elimina i campi inutilizzati e li segnala nei log (`build.purge`). Paraglide ottiene questo risultato a livello architetturale, poiché una funzione di messaggio non richiamata viene rimossa tramite tree-shaking. Tutte le altre soluzioni lasciano la pulizia a vostro carico.

**Developer experience.**

Tempo di configurazione fino alla prima stringa tradotta, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md) o un'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) che mostri la traduzione al passaggio del mouse (hover) e rimandi alla dichiarazione, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per compilazione (fill), test e push, e una soluzione che permetta a chi non è sviluppatore di modificare i contenuti ([editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)) senza aprire una pull request.

## Domande frequenti

<FAQ>

<Question title="vue-i18n è ancora la scelta predefinita giusta nel 2026?">

Per la maggior parte delle applicazioni Vue, sì. L'ecosistema è il più vasto, la documentazione è completa e i costi sono prevedibili: un runtime pesante, un formato personalizzato per i plurali e una suddivisione per route che dovete implementare e mantenere voi stessi.

</Question>

<Question title="Dovrei usare @nuxtjs/i18n o configurare vue-i18n manualmente in Nuxt?">

Utilizzate il modulo a meno che il vostro routing non sia insolito o la vostra applicazione non abbia poche pagine. La configurazione manuale richiede di ricreare le route localizzate, i middleware, `hreflang` e la sitemap da zero, aspetti che risultano più complessi di quanto sembrino.

</Question>

<Question title="Ho bisogno di una libreria basata su compilatore?">

Solo se la dimensione del bundle, il payload SSR, i types generati o i controlli delle chiavi mancanti a build time sono requisiti effettivi. L'articolo [compilatore vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md) spiega cosa offrono i compilatori e dove possono presentare limiti.

</Question>

<Question title="La scelta della libreria influisce sulla SEO?">

Indirettamente. I crawler tengono conto del routing, di `hreflang`, di `<html lang>` e del fatto che il testo sia presente nell'HTML renderizzato dal server. Consultate la [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Per approfondire

- [Benchmark Vue i18n: bundle size, leakage e tempi di cambio lingua](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md)
- [Vue i18n: come funziona vue-i18n e dove mostra i suoi limiti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/vue.md) e l'[articolo su Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, funzionalità per funzionalità](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md) e il [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n è superato?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_vue-i18n_outdated.md)
- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
- [Compilatore vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
- [i18n per componente vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [Configurare l'i18n in un'app Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md) e in un'[app Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md)
- La stessa guida per [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_svelte_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_solid_i18n_library.md)
