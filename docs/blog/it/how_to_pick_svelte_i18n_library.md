---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Come scegliere la giusta libreria i18n per Svelte nel 2026"
description: "Una guida decisionale per l'internazionalizzazione di Svelte e SvelteKit. Quali domande porsi prima di confrontare svelte-i18n, Paraglide, typesafe-i18n, wuchale e Intlayer, e quanto costa ogni scelta in termini di bundle size, tipizzazione e sicurezza SSR."
keywords:
  - svelte i18n
  - sveltekit i18n
  - internazionalizzazione svelte
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - confronto librerie i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Come scegliere la giusta libreria i18n per Svelte

Svelte non include nulla di nativo per l'i18n. Nessun `$t`, nessuna primitiva di locale, nessun formato di messaggio. Ogni opzione è una soluzione di terze parti, e l'ecosistema Svelte è il punto in cui l'i18n a compile-time si è spinto più avanti, quindi i candidati differiscono tra loro molto più che in React o Vue.

Questa guida elenca le domande a cui rispondere per prime, quindi mappa le risposte su `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` e Intlayer, sia per Vite + Svelte che per SvelteKit.

![Ecosistema delle librerie i18n per Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Indice

<TOC/>

## Sei domande a cui rispondere prima di confrontare le librerie

1. **SPA con Vite o SvelteKit?** In una SPA uno store a livello di modulo è corretto: una scheda, un utente, un locale. Su SvelteKit lo stesso singleton viene condiviso tra richieste concorrenti sul server, e la richiesta B rischia di essere renderizzata nella lingua della richiesta A. La libreria fornisce una struttura per-request (context, `locals`) oppure lascia la gestione interamente a voi.
2. **Chi scrive le traduzioni?** Sviluppatori, un TMS, un'agenzia che fornisce stringhe ICU o una pipeline AI. `svelte-i18n` supporta ICU nativamente. Paraglide e `typesafe-i18n` usano una propria sintassi. Adattatevi al fornitore.
3. **Quanti locale e quante pagine?** Due locale e cinque pagine possono includere tutto nel bundle. Dieci locale e quaranta route non possono, e la differenza tra cataloghi a runtime e messaggi compilati diventa il costo principale.
4. **Avete bisogno di types sulle chiavi?** `$_("cart.totl")` è un errore a runtime in `svelte-i18n`. Le librerie a compile-time lo trasformano in un errore di tipo per costruzione.
5. **Store di Svelte 4 o rune di Svelte 5?** Le rune cambiano la sintassi dello stato del locale, non il problema della condivisione dello stato. Ma `$state` in un file `.ts` compila in una semplice variabile, quindi il runtime della libreria deve essere compatibile con le rune se utilizzate Svelte 5.
6. **Potete accettare file generati nel repository?** Paraglide e `typesafe-i18n` generano entrambi codice JavaScript o TypeScript nel vostro albero dei sorgenti. Alcuni team lo accettano, altri si ritrovano con conflitti di merge su ogni branch parallelo.

Scrivete le risposte. Tutto ciò che segue fa riferimento ad esse.

## Il panorama in un'unica panoramica

L'i18n per Svelte è arrivata più tardi rispetto a React o Vue, passando direttamente alle ondate basate su compile-time.

![Storia delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Dizionari a runtime (dal 2019 al 2020): svelte-i18n, sveltekit-i18n">

Cataloghi JSON, ICU parsato nel browser tramite `intl-messageformat`, locale in store a livello di modulo (`$locale`, `$_`). Le soluzioni più adottate e ben documentate, con il wiring SSR a vostro carico.

</Accordion>
<Accordion header="Types generati (dal 2020 al 2022): typesafe-i18n">

Un generatore osserva i cataloghi ed emette accessor tipizzati (`$LL.cart.total()`). Modello solido, file generati nel repository, ma il repository ha visto poca attività di recente.

</Accordion>
<Accordion header="Compilatore e contenuti collocati (dal 2022 al 2026): Paraglide, wuchale, Intlayer">

Paraglide compila ogni messaggio in una funzione esportata, permettendo al bundler di applicare il tree-shaking a ciò che una route non chiama mai. `wuchale` estrae le stringhe dal markup durante la build. Intlayer dichiara i contenuti per componente e genera types e dizionari dedicati per componente.

</Accordion>
</AccordionGroup>

La [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md) approfondisce ogni ondata nei dettagli.

## La decisione che conta di più: dove risiedono i contenuti e quando vengono caricati

Due scelte architetturali spiegano la maggior parte delle differenze di bundle size tra le configurazioni:

- **Contenuto centralizzato o per componente (scoped).** Un unico file `locales/en.json` per l'intera app, oppure una dichiarazione per ciascun componente.
- **Import statico o dinamico.** Caricamento di tutto all'avvio, oppure recupero on-demand del locale attivo (e idealmente della route attiva).

Il grafico stima il payload per un'applicazione teorica da 1 a 10 pagine, tradotta in 1-10 locale, con circa 30 KB di testo per pagina.

![Perdita teorica di contenuti per architettura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`svelte-i18n` si posiziona in alto a sinistra per impostazione predefinita: `register("fr", () => import("./fr.json"))` offre il caricamento dinamico per locale, ma il catalogo del locale è un unico oggetto e caricarlo significa caricare il testo di tutte le pagine. Paraglide rappresenta il caso interessante: poiché ogni messaggio è un export a sé stante, il tree-shaking gestisce l'asse delle pagine senza costi aggiuntivi, e il [benchmark per Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/svelte.md) conferma che funziona come pubblicizzato su Vite + Svelte (non è stato così nei benchmark di React e Next.js). Intlayer raggiunge lo stesso risultato grazie alle dichiarazioni per componente.

Se la vostra risposta alla domanda 3 è stata "molte pagine", date a questa sezione un peso maggiore rispetto a qualsiasi preferenza di API. L'articolo su [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md) analizza l'aspetto di manutenzione dello stesso compromesso.

## I candidati

Le dimensioni delle librerie provengono dal [benchmark per Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/svelte.md): store più accessor in un componente vuoto, dopo bundling, tree-shaking e minificazione, su un'app di 10 pagine e 10 locale. Il contenuto è misurato separatamente.

| Libreria        | Dove risiedono i messaggi             | Stato del locale                            | Types sulle chiavi   | Formato messaggi | Suddivisione per route | Dimensione libreria |
| :-------------- | :------------------------------------ | :------------------------------------------ | :------------------- | :--------------- | :--------------------- | :------------------ |
| `svelte-i18n`   | Cataloghi JSON per locale             | Store Svelte a livello di modulo            | Unione manuale       | ICU              | No                     | ~16.6 kB            |
| `typesafe-i18n` | Moduli TS generati                    | Adattatore store                            | Generati             | Proprietario     | Parziale               | Ridotta             |
| Paraglide       | Progetto inlang, compilato a funzioni | Letto per chiamata da cookie, URL o storage | Generati             | Proprietario     | Sì, via tree-shaking   | Quasi zero          |
| `wuchale`       | Estratto dal markup durante la build  | Store                                       | N/A (nessuna chiave) | Proprietario     | Sì                     | Ridotta             |
| Intlayer        | `.content.ts` accanto al componente   | Context più store, compatibile con rune     | Generati di default  | Helper           | Sì, per componente     | Baseline            |

> I numeri rappresentano un'istantanea delle versioni usate nel benchmark. Eseguitelo sulla vostra applicazione prima di basare la scelta solo sulla dimensione.

La dimensione quasi nulla della libreria Paraglide è dovuta alla sua architettura: il runtime viene generato direttamente nel repository. Intlayer richiede `vite-intlayer`, quindi non può funzionare senza una fase di build.

## Mappate le vostre risposte sulla libreria ideale

<AccordionGroup>
<Accordion header="Vite SPA, team piccolo, pochi locale">

`svelte-i18n`. È l'opzione più documentata, `$_` risulta naturale nel markup e `register` combinato con `waitLocale()` copre il lazy loading per locale. Vincolate il first paint a `isLoading` per evitare di mostrare brevemente le chiavi grezze. Se l'app potrebbe evolvere verso un server in futuro, inserite il locale nel context di Svelte fin dal primo giorno anziché affidarvi allo store di modulo; non costa nulla ora ed evita bug esclusivi della produzione in seguito.

</Accordion>
<Accordion header="SvelteKit con routing del locale e SSR">

Il problema della condivisione dello stato decide questo scenario. `svelte-i18n` funziona su SvelteKit ma il wiring per singola richiesta (`hooks.server.ts`, `locals`, `load`, poi `setContext`) è a vostro carico ed è facile commettere sottili errori. Paraglide include un'integrazione per SvelteKit che gestisce il routing e legge il locale a ogni chiamata, aggirando il problema del singleton. Intlayer imposta il locale dai dati di `load` all'interno del context. L'articolo su [SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/sveltekit.md) illustra la scelta tra `[[lang]]` e `reroute`, che dovreste definire prima di scegliere la libreria.

</Accordion>
<Accordion header="Le traduzioni provengono da un TMS o da un'agenzia che consegna file ICU">

`svelte-i18n` è nativo ICU tramite `intl-messageformat`, quindi si integra direttamente con la maggior parte dei fornitori. Paraglide e `typesafe-i18n` usano sintassi proprietarie e richiedono una conversione. Il supporto ICU di Intlayer è parziale, quindi se ricevete stringhe ICU già oggi, consideratelo un fattore bloccante.

</Accordion>
<Accordion header="La dimensione del bundle è il vincolo principale">

Compile-time. Il tree-shaking di Paraglide funziona su Vite + Svelte e il costo della libreria è vicino allo zero. I dizionari per componente di Intlayer offrono lo stesso risultato senza generare file nel repository. `svelte-i18n` include il parser ICU e l'intero catalogo, attestandosi a circa 4.5× rispetto a `svelte-intlayer` nel benchmark prima ancora di conteggiare il contenuto.

</Accordion>
<Accordion header="La type safety non è negoziabile">

Qualsiasi soluzione tranne un setup base con `svelte-i18n`, in cui l'unica tipizzazione è un'unione scritta a mano che si disallinea immediatamente dal JSON. `typesafe-i18n`, Paraglide e Intlayer generano tutti i types a partire dai contenuti. Verificate l'attività del repository di `typesafe-i18n` prima di sceglierlo per una codebase di produzione. L'articolo sul [rilevamento delle traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md) confronta cosa ciascuna opzione rileva in fase di build.

</Accordion>
<Accordion header="Non volete file generati nel repository">

Questo esclude Paraglide e `typesafe-i18n`. `svelte-i18n` e Intlayer mantengono il loro output in `node_modules` o in una directory di build; con Intlayer i file `.content.ts` sono codice sorgente scritto a mano, mentre i dizionari compilati e i types risiedono in `.intlayer/` e vengono ignorati da git.

</Accordion>
<Accordion header="Le traduzioni saranno prodotte da un'AI">

In questo caso il JSON centralizzato perde la sua ragion d'essere. I contenuti collocati accanto al componente insieme a una CLI che completa i locale mancanti rappresentano il percorso più lineare. Il comando `fill` di Intlayer si collega direttamente alla vostra chiave API (OpenAI, Anthropic, Mistral, Gemini) e ritraduce solo ciò che è cambiato. L'ecosistema inlang di Paraglide offre soluzioni equivalenti in hosting con i propri piani tariffari.

</Accordion>
</AccordionGroup>

## Dove ogni libreria mostra i suoi limiti

- **`svelte-i18n`**: la più pesante del gruppo, nessun type sulle chiavi, nessuna suddivisione per route, store a livello di modulo che rischia di propagarsi tra richieste diverse su SvelteKit a meno di configurare manualmente il context.
- **`typesafe-i18n`**: richiede un processo watcher in esecuzione, file generati nel repository e un progetto con scarsa attività recente.
- **Paraglide**: file generati sottoposti a commit nel repository e rigenerati a ogni push, conflitti di merge su branch paralleli, e il locale viene letto da cookie o storage a ogni chiamata di messaggio anziché da uno store, comportando lavoro extra al cambio di locale.
- **`wuchale`**: idea di estrazione interessante ma ancora acerba. Nel benchmark React si sono verificati problemi di reattività che hanno richiesto re-render forzati del provider, e la documentazione è limitata.
- **Intlayer**: richiede obbligatoriamente un plugin di build, ecosistema più compatto, supporto ICU parziale e contenuti distribuiti nella codebase per progettazione, quindi l'esportazione di un unico JSON per un traduttore richiede un tooling dedicato.

## Come si presenta ogni opzione nel codice

Lo stesso componente, un riepilogo del carrello con un titolo e una forma plurale, implementato con ciascun candidato. La parte più interessante non è il markup, ma dove risiede il contenuto, come viene gestito il locale e quali informazioni possiede il type checker.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU tramite `intl-messageformat`, locale in uno store a livello di modulo. `$_` accetta qualsiasi stringa; l'unica tipizzazione è un'unione scritta manualmente.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Ogni messaggio è una funzione tipizzata generata, eliminata via tree-shaking se non utilizzata. La cartella `paraglide/` viene generata nel vostro repository, e il locale viene letto a ogni chiamata anziché da uno store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Accessor tipizzati generati da un processo watcher. Il modello è rigoroso; i file generati risiedono nel repository e il progetto non riceve aggiornamenti frequenti.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Tutti i locale in un unico file accanto al componente. `useIntlayer` restituisce uno store leggibile, quindi `$content` sfrutta l'auto-sottoscrizione standard di Svelte, e il locale viene gestito nel context (sicuro per SSR) anziché in un singleton di modulo.

  </Tab>
</Tabs>

Utilizzate già `svelte-i18n`? L'[adattatore di compatibilità `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/svelte-i18n.md) assegna un alias al package a livello di bundler, in modo che `$_`, `$date`, `$number` e le vostre chiavi piatte continuino a funzionare mentre Intlayer gestisce i contenuti.

## Prima di scegliere definitivamente

Una tabella di confronto mostra cosa fa una libreria oggi. Questi aspetti vi dicono come sarà utilizzarla quotidianamente nel lungo periodo.

**Verificate l'attività del repository.**

Numero di commit, tempi di risposta alle issue e data dell'ultima release minore. Un'ottima architettura senza manutentori attivi si trasforma rapidamente in una futura migrazione obbligata.

**Non scegliete in base al numero di download su npm.**

La libreria più scaricata è spesso quella rilasciata per prima, non necessariamente quella più adatta a una codebase Svelte del 2026. I download misurano la storia, non l'aderenza alle esigenze attuali.

![Classifica delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Chiedetevi chi finanzia il progetto e qual è il modello di business.**

`svelte-i18n` è sostenuta da Crowdin, analogamente a `next-intl` e `vue-i18n`. `i18next` è supportata da Locize. Tolgee, Paraglide (inlang) e Intlayer gestiscono ciascuna la propria piattaforma. Un fornitore i cui ricavi derivano dai servizi di traduzione in hosting ha pochi incentivi a rendere la traduzione gratuita all'interno della vostra toolchain. Intlayer è l'unica del gruppo a includere la traduzione AI via CLI con la vostra chiave API personale e un CMS self-hostabile.

**È pronta per gli agenti AI?**

Gli agenti incontrano ancora difficoltà con l'i18n: dimenticano lingue, inventano chiavi e mischiano sintassi di messaggi. La libreria include [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md) o un [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md) affinché l'agente possa elencare, compilare e testare i contenuti? E il caricamento dei contenuti è ottimizzato di default, o richiede di revisionare namespace e import lazy ogni trimestre?

**Type safety integrata fin da subito.**

Non "può essere tipizzata con configurazioni aggiuntive", ma "una chiave errata genera un errore in `tsc` su un'installazione pulita". Verificate cosa accade con una chiave inesistente o con un locale privo di una traduzione.

**Rilevamento dei contenuti inutilizzati.**

I cataloghi tendono solo a crescere nel tempo. La build di Intlayer elimina i campi inutilizzati e ne traccia i log (`build.purge`). Paraglide raggiunge questo risultato per via architetturale, poiché una funzione messaggio non invocata viene rimossa dal tree-shaking. Tutte le altre soluzioni lasciano la pulizia a carico vostro.

**Developer experience.**

Tempo necessario per configurare la prima stringa tradotta, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md) o un'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) che mostri la traduzione al passaggio del mouse e porti direttamente alla dichiarazione, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per riempimento, test e push, e uno strumento per consentire a figure non tecniche di modificare i contenuti ([editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)) senza aprire una pull request.

## Domande Frequenti

<FAQ>

<Question title="svelte-i18n è ancora la scelta predefinita ideale nel 2026?">

Per una SPA con Vite e un catalogo compatto, sì. Rimane l'opzione più documentata e la compatibilità ICU è fondamentale per molti team. Su SvelteKit o con più di qualche decina di pagine, i suoi svantaggi (mancanza di types, assenza di scoping, store condiviso) iniziano a farsi sentire.

</Question>

<Question title="Il tree-shaking di Paraglide è davvero efficace?">

Su Vite + Svelte sì, i risultati del benchmark lo confermano. Su React con TanStack Start o Next.js non ha prodotto lo stesso effetto nel medesimo benchmark. Verificate sempre sul vostro stack specifico prima di affidarvi ciecamente a questi dati.

</Question>

<Question title="Le rune influiscono sulla scelta della libreria?">

Cambiano la sintassi con cui gestite lo stato del locale, non il problema della condivisione su server. Ciò che conta è che il runtime della libreria supporti le rune su Svelte 5 e che utilizzi il context anziché uno store di modulo. Verificate entrambi i requisiti.

</Question>

<Question title="La scelta della libreria influisce sulla SEO?">

Indirettamente. I crawler valutano il routing, i tag `hreflang`, `<html lang>` e la presenza del testo nell'HTML renderizzato lato server. Consultate la [guida hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Approfondimenti

- [Benchmark i18n per Svelte: bundle size, leakage e tempi di cambio locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/svelte.md)
- [Svelte i18n: store, rune e la trappola a livello di modulo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/svelte.md) e [SvelteKit i18n: routing, SSR e stato condiviso](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/sveltekit.md)
- [Adattatore di compatibilità immediata per `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/svelte-i18n.md)
- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
- [i18n a compilatore vs dichiarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [Come funziona l'ottimizzazione del bundle in fase di build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [Configurare l'i18n in un'app Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md) e in un'[app SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_svelte_kit.md)
- La stessa guida per [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_vue_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_solid_i18n_library.md)
