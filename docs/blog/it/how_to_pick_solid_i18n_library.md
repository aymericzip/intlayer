---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Come scegliere la giusta libreria i18n per Solid nel 2026"
description: Una guida decisionale per l'internazionalizzazione in SolidJS e SolidStart. Quali domande porsi prima di confrontare @solid-primitives/i18n, solid-i18next, Paraglide, Lingui e Intlayer, e cosa comporta ogni scelta in termini di reattività, bundle size e typing.
keywords:
  - solidjs i18n
  - solid start i18n
  - internazionalizzazione solid
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - confronto librerie i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Come scegliere la giusta libreria i18n per Solid

Il modello di reattività di Solid cambia ciò che una libreria i18n deve fare. I componenti vengono eseguiti una sola volta, quindi una traduzione memorizzata in una `const` al setup è una stringa statica (frozen string). Una libreria che restituisce stringhe anziché accessor produrrà una pagina che cambia lingua ovunque tranne che nei tre componenti in cui qualcuno ha commesso quell'errore. Scegliere una libreria per Solid riguarda in parte l'API, e in parte quale soluzione renda difficile commettere questo sbaglio.

Questa guida elenca le domande a cui rispondere prima di tutto, per poi mapparle su `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` e Intlayer, sia per Vite + Solid che per SolidStart.

![Ecosistema delle librerie i18n per Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Indice

<TOC/>

## Sei domande a cui rispondere prima di confrontare le librerie

1. **Vite SPA o SolidStart?** In una SPA il locale può risiedere semplicemente in un signal. In SolidStart il locale deve essere risolto sul server a partire dall'URL, e tutto ciò che un crawler deve vedere senza JavaScript (`<html lang>`, `hreflang`) va inserito in `entry-server.tsx`.
2. **Quanto deve essere reattivo il cambio di lingua?** Per alcune applicazioni un ricaricamento completo della pagina al cambio di lingua è accettabile. In caso contrario, i valori della libreria devono essere signal o accessor, e la loro lettura deve essere tracciata, non copiata.
3. **Chi scrive le traduzioni?** Sviluppatori, un TMS, un'agenzia che fornisce stringhe ICU o una pipeline AI. `solid-i18next` adotta il formato di i18next. `@solid-primitives/i18n` accetta qualsiasi struttura sia il vostro dizionario. Adattatevi allo strumento o fornitore utilizzato.
4. **Quante lingue e quante pagine?** Due lingue e cinque pagine possono includere tutto nel bundle. Dieci lingue e quaranta route no, e il caricamento lazy dei cataloghi unito allo scoping diventa il costo principale.
5. **Avete bisogno di tipi (types) sulle chiavi?** `@solid-primitives/i18n` li deduce dal dizionario di origine. `solid-i18next` richiede una dichiarazione manuale. Le librerie a tempo di compilazione (compile-time) li generano automaticamente.
6. **Di quante funzionalità avete bisogno?** Gestione dei cookie, routing con prefisso di lingua, redirect, formattatori. L'opzione più leggera non ha nulla di tutto questo, il che va benissimo finché non ne avrete bisogno.

Mettete per iscritto le risposte. Tutto ciò che segue fa riferimento ad esse.

## Il panorama in un'unica panoramica

Solid è l'ecosistema più giovane in questo ambito e offre il minor numero di opzioni, distribuite su tre ondate.

![Storia delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dizionari a runtime: solid-i18next">

i18next adattato per Solid. Namespace, backend, rilevatori e un decennio di plugin. La soluzione più pesante del gruppo, con gli stessi costi di `t("a.b")` presenti in React.

</Accordion>
<Accordion header="Primitive minimali (2022): @solid-primitives/i18n">

Un dizionario flat gestito direttamente dallo sviluppatore, un `translator()` che restituisce accessor e tipi dedotti dall'oggetto sorgente. Molto compatto, senza scoping, senza routing e senza formattatori. La scelta predefinita della community.

</Accordion>
<Accordion header="Compilatori e contenuto collocato (dal 2024 al 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide genera una funzione per ogni messaggio. Intlayer dichiara il contenuto per componente nei file `.content.ts` e restituisce nodi basati su signal. Il binding per Solid di Lingui è arrivato nel 2026 e introduce l'estrazione basata su macro.

</Accordion>
</AccordionGroup>

La [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md) approfondisce ciascuna ondata nel dettaglio.

## La decisione più importante: dove risiede il contenuto e quando viene caricato

Due scelte architetturali spiegano la maggior parte della differenza di bundle tra le varie configurazioni:

- **Contenuto centralizzato o scoped (per componente).** Un unico dizionario per l'applicazione, oppure una dichiarazione per ciascun componente.
- **Import statico o dinamico.** Tutto caricato all'avvio, oppure la lingua attiva (e idealmente la route attiva) caricata su richiesta.

Il grafico stima il payload per un'applicazione teorica da 1 a 10 pagine, tradotta in un intervallo da 1 a 10 lingue, con circa 30 KB di testo per pagina.

![Perdita teorica di contenuto in base all'architettura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` non gestisce nessuno dei due aspetti: si usa `createResource` per caricare un dizionario per lingua (ottenendo il caricamento dinamico), lasciando il resto a carico dello sviluppatore. `solid-i18next` dispone di namespace e backend asincroni, ma nulla impone la mappatura, per cui un componente condiviso che importa `common` finisce per renderlo una dipendenza di ogni route. Paraglide gestisce la separazione per pagina tramite tree-shaking, sebbene questo non sia entrato in funzione nell'implementazione del [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/solid.md). Intlayer la ottiene tramite dichiarazioni per singolo componente.

Se la risposta alla domanda 4 è stata "molte pagine", date a questa sezione un peso maggiore rispetto a qualsiasi preferenza di API. L'articolo su [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md) analizza l'aspetto di manutenzione di questo stesso compromesso.

## I candidati

Le dimensioni delle librerie provengono dal [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/solid.md): provider più accessor in un componente vuoto, dopo bundling, tree-shaking e minificazione, su un'app di 10 pagine e 10 lingue. Il contenuto è misurato separatamente.

| Libreria                 | Modello di contenuto                  | Reattività al cambio di lingua             | Type safety                             | Scoping e lazy loading       | Dimensione libreria                              |
| :----------------------- | :------------------------------------ | :----------------------------------------- | :-------------------------------------- | :--------------------------- | :----------------------------------------------- |
| `@solid-primitives/i18n` | Dizionario flat gestito autonomamente | Signal, accessor restituiti da translator  | 3/5 — Dedotti dal dizionario sorgente   | Nessuno integrato            | ~0,6 kB                                          |
| `solid-i18next`          | Cataloghi e namespace i18next         | Store, re-render tramite provider          | 2/5 — Dichiarazione manuale             | Namespace, backend lazy      | ~14,9 kB                                         |
| Paraglide                | Progetto inlang, funzioni generate    | Lettura per chiamata da cookie o storage   | 3.5/5 — Generati                        | Tree-shaking (non nel bench) | Quasi zero (per il codice generato nel progetto) |
| `@lingui/solid`          | Testo sorgente nel codice, compilato  | Basato su signal                           | 2/5 — Dal compilatore                   | Per catalogo                 | ~11,8 kB                                         |
| Intlayer                 | Un file `.content.ts` per componente  | Nodi basati su signal, nessun re-run comp. | 5/5 — Generati, attivi per impostazione | Sì, per componente           | ~4,3 kB                                          |

> I numeri rappresentano uno snapshot alle versioni del benchmark. La dimensione di `@lingui/solid` proviene dal benchmark TanStack Start. Eseguite il test sulla vostra applicazione prima di decidere unicamente in base alle dimensioni.
> Type safety: 5/5 significa che chiavi, parametri e ogni locale vengono verificati senza configurazione manuale, inclusi formattatori di URL e helper.

La dimensione quasi nulla della libreria Paraglide è dovuta alla sua architettura: il runtime viene generato direttamente nella codebase. Intlayer richiede `vite-intlayer`, pertanto non può essere eseguito senza una fase di build.

## Abbinare le risposte a una libreria

<AccordionGroup>
<Accordion header="Vite SPA, catalogo ridotto, massima semplicità">

`@solid-primitives/i18n`. Un dizionario flat, un `translator()` che restituisce accessor, tipi dedotti senza configurazione aggiuntiva. È la soluzione ideale per una piccola app, e la lettura del codice sorgente richiede solo dieci minuti. Ciò che dovrete scrivere autonomamente: persistenza del locale, routing, formattatori e suddivisione per route. Se questi requisiti aumentano, è il momento di passare a un'altra soluzione.

</Accordion>
<Accordion header="Migrazione da React con una codebase i18next">

`solid-i18next` consente di riutilizzare cataloghi, namespace, backend e rilevatori esattamente come sono. È l'opzione più pesante e comporta gli stessi costi di `react-i18next`: dichiarazione manuale dei tipi, ottimizzazioni possibili ma laboriose, e una funzione `t()` che restituisce una stringa, rendendo facile incappare nel bug della traduzione statica (frozen translation). Avvolgete le letture in JSX o in un memo e non memorizzatele mai durante il setup.

</Accordion>
<Accordion header="SolidStart con route con prefisso di lingua e SSR">

Il locale deve provenire dall'URL sul server in modo che entrambe le parti siano sincronizzate. Rilevarlo solo sul client è troppo tardi. `@solid-primitives/i18n` e `solid-i18next` lasciano a voi la gestione della route `[[locale]]`, di `matchFilters`, del redirect e dei tag in `entry-server.tsx`. Paraglide dispone di un plugin Vite che gestisce il routing. Intlayer include middleware e helper per le route. Qualunque sia la scelta, inserite `<html lang>` e `hreflang` in `entry-server.tsx`; in SolidStart v2 `@solidjs/meta` si applica sul client dopo l'idratazione (hydration). L'articolo sull'[i18n in Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/solid.md) descrive in dettaglio questa configurazione.

</Accordion>
<Accordion header="Il cambio di lingua deve essere istantaneo e granulare">

Scegliete una libreria i cui valori siano signal o accessor e le cui letture siano tracciate. Gli accessor di `@solid-primitives/i18n` e i nodi di Intlayer aggiornano entrambi unicamente i nodi DOM che li leggono, senza rieseguire il componente. `solid-i18next` riesegue il rendering attraverso il provider. Paraglide legge il locale da cookie o storage a ogni chiamata del messaggio anziché da un signal, il che funziona ma esegue più operazioni per nodo del necessario.

</Accordion>
<Accordion header="Applicazione di grandi dimensioni, molte route, vincoli di bundle">

Contenuto scoped compilato a build time. Intlayer distribuisce solo ciò che una route renderizza. Paraglide dovrebbe ottenere lo stesso risultato tramite tree-shaking; verificate questo comportamento nella vostra configurazione, poiché non si è verificato nel benchmark. Con `solid-i18next`, pianificate la strategia di namespace e lazy loading fin dal primo giorno e verificatela in code review.

</Accordion>
<Accordion header="La type safety non è negoziabile">

`@solid-primitives/i18n` offre tipi dedotti senza alcuno sforzo, più di quanto offrano molte librerie React. Per tipi generati che supportano lazy loading e suddivisione per route, Paraglide, `@lingui/solid` e Intlayer li producono tutti direttamente dal contenuto. L'articolo sul [rilevamento delle traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md) confronta ciò che ciascuna libreria intercetta a build time.

</Accordion>
<Accordion header="Le traduzioni saranno generate tramite AI">

In questo caso, un dizionario centralizzato non ha più motivo di esistere. Il contenuto collocato accanto ai componenti, combinato con una CLI che compila le lingue mancanti, rappresenta la soluzione più diretta. Il comando `fill` di Intlayer si collega direttamente alla vostra chiave API (OpenAI, Anthropic, Mistral, Gemini) e ritraduce solo ciò che è stato modificato.

</Accordion>
</AccordionGroup>

## Dove ogni libreria mostra dei limiti

- **`@solid-primitives/i18n`**: nessun lazy loading o scoping oltre a quello sviluppato manualmente, nessun routing, nessuna gestione dei cookie, nessun formattatore. Eccellente per progetti ridotti, mostra presto limitazioni per applicazioni enterprise.
- **`solid-i18next`**: la più pesante del gruppo, tipi manuali, formato dei plurali proprietario, e `t()` restituisce una stringa, con il rischio che le traduzioni rimangano statiche se memorizzate al setup.
- **Paraglide**: file generati salvati nel repository e rigenerati prima di ogni push, tree-shaking non attivo nel benchmark Solid, e locale letto dallo storage a ogni chiamata anziché tramite signal.
- **`@lingui/solid`**: introdotto nel 2026, quindi con pochi riscontri in ambienti di produzione. Eredita la fase di build `extract` / `compile` di Lingui e le sue diverse sintassi parzialmente sovrapposte.
- **Intlayer**: plugin di build obbligatorio, ecosistema più compatto, supporto ICU parziale e contenuto distribuito nella codebase per design, richiedendo strumenti dedicati per esportare un singolo file JSON destinato a un traduttore esterno.

## Come si presenta ciascuna opzione nel codice

Lo stesso componente, un riepilogo del carrello con un titolo e un plurale, scritto con ciascun candidato. Prestate attenzione a dove viene letta la traduzione: all'interno del JSX viene tracciata reattivamente, nel corpo del setup rimane una stringa statica.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="Inglese">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Francese">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="Spagnolo">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Le chiavi sono tipizzate a partire dall'oggetto inglese senza codegen. Non ci sono regole di pluralizzazione, lazy loading o routing integrati; ciascuno di questi elementi deve essere implementato manualmente.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Inglese">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Francese">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Spagnolo">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Cataloghi, namespace e plugin i18next utilizzati direttamente. La funzione `t` restituisce una stringa, quindi un'assegnazione come `const title = t("cart:title")` al setup la rende statica; mantenete la chiamata direttamente all'interno del JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Inglese">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Francese">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Spagnolo">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Ogni messaggio è una funzione generata e tipizzata. Il locale viene letto da cookie o storage a ogni chiamata anziché da un signal, per cui la reattività al cambio di lingua deve essere gestita manualmente.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      it: "Il tuo carrello",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        it: "{{count}} articolo",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        it: "{{count}} articoli",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Tutte le lingue in un unico file accanto al componente. `useIntlayer` restituisce nodi supportati da signal, quindi un cambio di lingua aggiorna solo i nodi DOM che li leggono. `{content.title}` all'interno del JSX è tracciato; `content.title.value` nel corpo del setup non lo è.

  </Tab>
</Tabs>

Su una codebase i18next esistente, l'[adattatore di compatibilità i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md) crea un alias del package a livello di bundler, consentendo a cataloghi e `t()` di continuare a funzionare mentre Intlayer gestisce i contenuti, e la [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) copre il resto.

## Prima di effettuare una scelta definitiva

Una tabella comparativa illustra le funzionalità attuali di una libreria. I punti seguenti mostrano invece come sarà la gestione nel tempo.

**Verificate l'attività del repository.**

Commit, tempi di risposta alle issue e se l'ultima minor release risale a quest'anno. Un'architettura valida senza manutentori attivi si trasforma presto in una migrazione forzata.

**Non basatevi unicamente sui download npm.**

La libreria più scaricata è spesso semplicemente quella rilasciata per prima, non necessariamente quella più adatta a una codebase Solid del 2026. I download misurano la storia, non l'aderenza ai requisiti attuali.

![Tier list delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Verificate chi finanzia i manutentori e qual è il loro modello di business.**

`i18next` (alla base di `solid-i18next`) è supportato da Locize. `next-intl`, `vue-i18n`, `svelte-i18n` e Lingui sono supportati da Crowdin. Tolgee, Paraglide (inlang) e Intlayer gestiscono ciascuno la propria piattaforma. Un fornitore il cui modello di business si basa sull'hosting delle traduzioni ha poco interesse a rendere la traduzione gratuita all'interno della vostra toolchain. Intlayer è l'unica soluzione del gruppo a offrire la traduzione tramite AI direttamente via CLI con la vostra chiave API, oltre a un CMS con possibilità di self-hosting.

**La soluzione è pronta per gli agenti AI?**

Gli agenti AI riscontrano spesso difficoltà con l'i18n: dimenticano lingue, inventano chiavi e confondono le sintassi dei messaggi. La libreria fornisce [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md) o un [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md) per consentire all'agente di elencare, compilare e testare i contenuti? Inoltre, il caricamento dei contenuti è ottimizzato per impostazione predefinita, o è necessario revisionare namespace e import dinamici a ogni rilascio?

**Type safety integrata fin dall'inizio.**

Non "configurabile con setup aggiuntivo", ma "una chiave errata blocca `tsc` su una nuova installazione". Verificate cosa accade con una chiave inesistente e con una lingua in cui manca una traduzione.

**Rilevamento dei contenuti inutilizzati.**

I cataloghi tendono solo a crescere. La build di Intlayer rimuove i campi inutilizzati e li segnala (`build.purge`). Paraglide ottiene questo risultato tramite architettura, poiché una funzione di messaggio non richiamata viene eliminata tramite tree-shaking. Tutte le altre soluzioni lasciano questa pulizia a carico dello sviluppatore.

**Developer experience.**

Tempo di configurazione fino alla prima stringa tradotta, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md) o un'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) che mostra la traduzione al passaggio del mouse e rimanda alla dichiarazione, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per completare, testare e sincronizzare, un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) o estrattore che estrae le stringhe hard-coded dai componenti per non gestire ogni stringa chiave per chiave, e uno strumento per consentire a figure non tecniche di modificare i contenuti ([editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)) senza richiedere una pull request.

## Domande Frequenti

<FAQ>

<Question title="@solid-primitives/i18n è sufficiente per un'app in produzione?">

Per un'applicazione di piccole dimensioni sì, ed è l'opzione più leggera disponibile. Mostra i suoi limiti quando si rendono necessari cataloghi lazy per route, routing multilingua su SolidStart, persistenza su cookie o formattatori, poiché tutte queste funzionalità devono essere create da zero.

</Question>

<Question title="Perché la traduzione non si aggiorna al cambio di lingua?">

Perché i componenti Solid vengono eseguiti una sola volta. Una traduzione salvata in una `const` durante il setup è una semplice stringa, non una sottoscrizione reattiva. Leggetela all'interno di JSX, di un effect o di un memo, oppure scegliete una libreria i cui valori siano accessor, in modo da rendere più difficile commettere questo errore.

</Question>

<Question title="È necessaria una libreria basata su compilatore?">

Solo se la dimensione del bundle, i tipi generati automaticamente o i controlli a build time sulle chiavi mancanti costituiscono requisiti effettivi. L'articolo su [i18n basata su compilatore vs dichiarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md) approfondisce i vantaggi dei compilatori e i casi in cui possono presentare criticità.

</Question>

<Question title="La scelta della libreria influisce sulla SEO?">

Indirettamente. I motori di ricerca e i crawler valutano il routing, i tag `hreflang`, `<html lang>` e la presenza del testo nell'HTML renderizzato dal server, il che in SolidStart implica una corretta configurazione in `entry-server.tsx`. Consultate la [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Per approfondire

- [Benchmark i18n Solid: bundle size, leakage e tempi di cambio lingua](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/solid.md)
- [Solid i18n: perché le traduzioni rimangono statiche al cambio di lingua](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/solid.md)
- [Adattatore di compatibilità i18next drop-in](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md) e la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md)
- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
- [i18n basata su compilatore vs dichiarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
- [i18n per componente vs centralizzata](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [Come funziona l'ottimizzazione del bundle a build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [Configurare l'i18n in un'app Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+solid.md) e in un'[app SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_solid_start.md)
- Stessa guida per [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_vue_i18n_library.md) e [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_svelte_i18n_library.md)
