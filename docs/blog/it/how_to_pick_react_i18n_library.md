---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Come scegliere la giusta libreria i18n per React nel 2026"
description: Una guida decisionale per l'internazionalizzazione in React. Quali domande porsi prima di confrontare react-i18next, react-intl, Lingui, use-intl, Paraglide e Intlayer, e cosa comporta ogni scelta in termini di bundle size, typing e manutenzione.
keywords:
  - react i18n
  - react internationalization
  - internazionalizzazione react
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - confronto librerie i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Come scegliere la giusta libreria i18n per React

React non include alcuna primitiva nativa per l'i18n. La libreria scelta al primo giorno determina come vengono archiviate le traduzioni, come arrivano nel bundle e quanto lavoro di manutenzione rimarrà a vostro carico per i prossimi anni. La maggior parte dei team sceglie in base alla popolarità, per poi scoprire i compromessi raggiunte le 2.000 chiavi.

Questa guida adotta l'approccio opposto: rispondete prima ad alcune domande sul vostro progetto, poi mappate le risposte sulle librerie più adatte. Si concentra su React puro (Vite, React Router, TanStack Start). Next.js ha vincoli specifici, trattati nel [confronto Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

![Ecosistema delle librerie i18n per React](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Indice

<TOC/>

## Sei domande a cui rispondere prima di confrontare le librerie

Una tabella di funzionalità è inutile se non sapete quali aspetti contano per voi. Esaminate prima questi punti.

1. **Come viene renderizzata l'applicazione?** Solo SPA, SSR con hydration o React Server Components. Gli hook basati su Context funzionano ovunque in una SPA. Con i RSC, un hook forza `"use client"` su ogni componente che renderizza testo, quindi avrete bisogno anche di un'API lato server.
2. **Chi scrive le traduzioni?** Sviluppatori, un team interno che usa un TMS, un'agenzia che fornisce file ICU o una pipeline AI. Questo determina il formato del catalogo più di qualsiasi dettaglio di API.
3. **Quante lingue (locales) e quante pagine?** Due lingue e cinque pagine possono permettersi di includere tutto nel bundle. Dieci lingue e cinquanta route no, e la strategia di caricamento diventa il costo principale.
4. **Avete bisogno di types sulle chiavi?** Un errore di battitura in `t("checkout.totl")` compila senza problemi in qualsiasi libreria basata su chiavi a meno che non configuriate manualmente i types. Valutate se questo è accettabile.
5. **Cosa contiene la stringa?** Testo semplice, plurali o frasi con un `<Link>` nel mezzo. I contenuti complessi (rich content) sono il punto in cui la maggior parte delle API diventa macchinosa.
6. **Quanto durerà il progetto?** Un prototipo di tre mesi e un prodotto di cinque anni non richiedono la stessa quantità di build tooling.

Scrivete le risposte. Tutto ciò che segue fa riferimento ad esse.

## Il panorama in un'unica panoramica

Quindici anni di i18n in JavaScript si riassumono in quattro ondate architetturali, e le librerie React che metterete a confronto provengono da ondate diverse.

![Storia delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dizionari a runtime (dal 2011 al 2017): i18next, react-intl">

Cataloghi JSON caricati in memoria, `t("a.b")` cercato a runtime, sintassi ICU o personalizzata parsata nel browser. Ecosistemi più ampi, runtime più pesanti, types opzionali (opt-in).

</Accordion>
<Accordion header="Macro a compile-time (dal 2018 al 2021): Lingui, typesafe-i18n">

Messaggi estratti durante la build, compilati in cataloghi compatti, argomenti tipizzati. Uno step di build aggiuntivo (`extract`, `compile`) in cambio di bundle più leggeri.

</Accordion>
<Accordion header="Server-first (dal 2022 al 2024): use-intl / next-intl">

Progettati attorno a SSR e Server Components. Rendering sul server, hydration limitata a ciò di cui il client ha bisogno. Sempre basati su chiavi e centralizzati.

</Accordion>
<Accordion header="Compiler e contenuti colocati (dal 2024 al 2026): Paraglide, Intlayer, wuchale">

I contenuti vengono compilati in funzioni tree-shakable o dizionari per componente. I types vengono generati automaticamente, le traduzioni mancanti bloccano la build e la traduzione AI si esegue da CLI.

</Accordion>
</AccordionGroup>

La [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md) descrive in dettaglio come ogni ondata ha risolto i problemi della precedente.

## La decisione più importante: dove risiedono i contenuti e quando vengono caricati

Ogni libreria i18n per React ha la stessa struttura: uno store, un provider, un hook. Tutto ciò che il provider riceve finisce nel bundle client o nel payload di hydration. Le due scelte strutturali sono quindi:

- **Contenuto centralizzato o scoped.** Un unico `en.json` per tutta l'applicazione, oppure una dichiarazione per componente (o per namespace).
- **Import statico o dinamico.** Tutto incluso nel bundle all'avvio, oppure locale e route attivi caricati on demand.

Il grafico seguente stima il payload per un'applicazione teorica da 1 a 10 pagine, tradotta in 1 - 10 lingue, con circa 30 KB di testo per pagina.

![Perdita teorica di contenuto per architettura](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Il contenuto centralizzato con import statici cresce su entrambi gli assi: 10 pagine per 10 lingue equivalgono a 300 KB di testo su ogni pagina. Gli import dinamici eliminano l'asse delle lingue. Lo scoping elimina l'asse delle pagine. Solo la combinazione di entrambi mantiene il payload costante.

Questa non è una proprietà della libreria in sé, ma una questione di disciplina. `react-i18next` può essere strutturato con namespace e backend lazy. `use-intl` può essere suddiviso per route. Ma nulla lo impone in modo vincolante, e un componente `<Button>` condiviso che richiede `t("common:cta")` rende silenziosamente `common` una dipendenza di ogni route. Il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md) misura questo fenomeno come "leakage da altre route" e "leakage da altre lingue", ed è qui che si crea la maggior parte del divario tra le librerie.

Se la vostra risposta alla domanda 3 era "molte lingue, molte pagine", date a questa sezione più peso rispetto a qualsiasi preferenza di API. L'articolo [i18n per-component vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md) approfondisce l'aspetto della manutenzione legato a questa scelta.

## I candidati

Le dimensioni delle librerie provengono dal [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md): provider più hook in un componente vuoto, dopo bundling, tree-shaking e minificazione, su 10 pagine e 10 lingue. I contenuti sono misurati separatamente.

| Libreria                | Ondata       | Modello dei contenuti                 | Type safety                        | Formato dei messaggi          | Dimensione libreria                              |
| :---------------------- | :----------- | :------------------------------------ | :--------------------------------- | :---------------------------- | :----------------------------------------------- |
| `react-i18next`         | Runtime      | JSON centralizzato, namespace         | 2/5 — Opt-in (`CustomTypeOptions`) | i18next (plurali a suff.)     | ~18.4 kB                                         |
| `react-intl` (FormatJS) | Runtime      | JSON centralizzato, ICU               | 2/5 — Opt-in (estrazione + union)  | ICU                           | ~15.3 kB                                         |
| `use-intl`              | Server-first | JSON centralizzato, ICU               | 2/5 — Opt-in (declaration merging) | ICU                           | ~14.1 kB                                         |
| `@tolgee/react`         | Runtime      | Centralizzato, in-context editing     | 1/5 — No                           | ICU                           | ~11.1 kB                                         |
| Lingui                  | Macro        | Testo sorgente nel codice, cat. comp. | 2/5 — Ottimo, dal compiler         | ICU tramite macro             | ~11.8 kB                                         |
| Paraglide               | Compiler     | Progetto inlang, funzioni generate    | 3.5/5 — Generati                   | Proprietario                  | Quasi zero (per il codice generato nel progetto) |
| Intlayer                | Compiler     | `.content.ts` per componente          | 5/5 — Generati, attivi di default  | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                          |

> I dati rappresentano uno snapshot delle versioni utilizzate nel benchmark e variano con le nuove release. Eseguite il benchmark sulla vostra applicazione prima di basare la decisione solo sulle dimensioni.
> Type safety: 5/5 significa che chiavi, parametri e ogni locale vengono verificati senza configurazione manuale, inclusi formattatori di URL e helper.

Due aspetti che la tabella non mostra. `Paraglide` non include quasi alcuna libreria a runtime perché genera codice direttamente nella vostra repository, il che implica uno step di rigenerazione prima di ogni commit e possibili conflitti di merge sui file generati. `Intlayer` richiede un plugin per il bundler (`vite-intlayer` o equivalente), quindi non può funzionare in configurazioni prive di build step.

## Abbinare le risposte a una libreria

<AccordionGroup>
<Accordion header="Prototipo, team ridotto, poche lingue">

Scegliete la soluzione più semplice e non sovradimensionate gli investimenti. `react-i18next` con un singolo file JSON per lingua è perfetto, e un decennio di risposte su Stack Overflow vi farà risparmiare tempo. Evitate i namespace finché non diventano strettamente necessari. Se il prototipo si trasforma in un prodotto, pianificate una migrazione verso contenuti scoped; l'[adattatore di compatibilità per react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-i18next.md) rende la transizione incrementale.

</Accordion>
<Accordion header="Le traduzioni arrivano da un'agenzia o da un TMS che supporta ICU">

Il formato del catalogo è già stabilito. `react-intl` è nativo ICU e il tooling di estrazione di FormatJS è progettato proprio per questa pipeline. Anche `use-intl` supporta ICU. `react-i18next` richiede il plugin ICU, altrimenti impone le sue chiavi specifiche per i plurali. Il supporto ICU in Intlayer è ancora parziale, quindi se ricevete stringhe ICU oggi, consideratelo un fattore bloccante fino al rilascio completo.

</Accordion>
<Accordion header="Applicazione di grandi dimensioni, molte route, il budget del bundle è prioritario">

Privilegiate contenuti scoped e caricamento dinamico di default, non per convenzione. `Lingui` e `Paraglide` ottengono questo risultato tramite la compilazione. Intlayer lo realizza attraverso dichiarazioni per componente, e il compiler distribuisce solo ciò che una determinata route renderizza. Con `react-i18next` o `use-intl`, definite la strategia di namespace e lazy loading dal primo giorno e verificatela nelle code review, poiché il tooling non lo farà in automatico.

</Accordion>
<Accordion header="La type safety non è negoziabile">

Ogni libreria basata su chiavi può essere tipizzata, ma quasi nessuna lo è di default. Se non volete mantenere complesse declaration merging che devono reggere namespace caricati in lazy loading, scegliete una libreria in cui i types vengono generati direttamente dai contenuti: `Lingui`, `Paraglide` o Intlayer. L'articolo sul [rilevamento delle traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md) confronta cosa viene intercettato da ciascuna al momento della build.

</Accordion>
<Accordion header="Molti contenuti complessi: markdown, link interni a frasi, componenti specifici per lingua">

I nodi complessi sono il punto in cui l'uso di `t()` che restituisce una stringa non basta più. `react-i18next` e `Lingui` offrono `<Trans>`, `react-intl` ha i tag per rich text, tutti approcci più macchinosi rispetto alla gestione di stringhe semplici. I nodi di contenuto di Intlayer accettano direttamente JSX, markdown e oggetti nidificati, risultando più adatti se i contenuti vanno oltre le semplici etichette di interfaccia.

</Accordion>
<Accordion header="Le traduzioni saranno generate da AI e revisionate dagli sviluppatori">

In questo caso, un JSON centralizzato non è più un requisito, non essendoci un TMS verso cui esportare. Contenuti colocati abbinati a una CLI che completa le lingue mancanti rappresentano la via più rapida. Il comando `fill` di Intlayer si interfaccia direttamente con la vostra chiave API (OpenAI, Anthropic, Mistral, Gemini) e traduce solo ciò che è stato modificato. Paraglide e Tolgee offrono equivalenti hosted con piani a pagamento.

</Accordion>
<Accordion header="Possibile passaggio a Next.js App Router in futuro">

Il context di React non attraversa il confine tra server e client. Le librerie basate esclusivamente su hook lato client (`react-i18next`, `react-intl`) richiederanno un'API lato server parallela nel momento in cui adotterete RSC. `use-intl` (come `next-intl`) e Intlayer (come `next-intlayer`) supportano già questa separazione. Leggete l'[articolo sull'i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/nextjs.md) prima di standardizzare un pattern.

</Accordion>
</AccordionGroup>

## Dove ogni libreria mostra i suoi limiti

Limiti reali, poiché ogni opzione comporta dei compromessi.

- **`react-i18next`**: la più pesante del gruppo, formato proprietario per i plurali, configurazione dei types a carico dello sviluppatore, accumulo silenzioso di chiavi inutilizzate.
- **`react-intl`**: DX verbosa (`useIntl()` seguito da `formatMessage({ id })`), istanza globale legata a molti nodi.
- **`use-intl`**: semplice all'inizio, complessa da ottimizzare. La combinazione di namespace, caricamento dinamico e types rallenta notevolmente lo sviluppo.
- **`Lingui`**: step di build aggiuntivo con `extract` / `compile`, molteplici sintassi sovrapposte (`t()`, tagged template, `i18n.t()`, `<Trans>`) che disorientano sviluppatori e assistenti AI.
- **`Paraglide`**: file generati direttamente nel repository, tree-shaking non pienamente efficace nel benchmark React, e lettura della lingua dallo storage su ogni nodo invece che da uno store centralizzato.
- **`Tolgee`**: assenza di types sulle chiavi, onboarding più ripido, in-context editing come punto di forza principale.
- **`Intlayer`**: plugin di build obbligatorio, ecosistema più piccolo, supporto ICU parziale, contenuti distribuiti per progetto che richiedono tooling specifico per esportare un singolo JSON a un traduttore esterno.
- **`gt-react`, `lingo.dev`**: non consigliate nel benchmark: errori di quota in fase di build, vendor lock-in e problemi di reattività che richiedevano di forzare i re-render del provider.

## Come si presenta ciascuna opzione nel codice

Lo stesso componente, un riepilogo del carrello con titolo e plurale, implementato con ciascun candidato. La parte rilevante non è il componente in sé, ma la collocazione dei contenuti e ciò che il type checker è in grado di verificare.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

I plurali sono chiavi con suffissi risolte tramite `Intl.PluralRules`. Il tipo di `t` è `(key: string) => string` a meno che non si dichiari `CustomTypeOptions`, quindi `t("titel")` compila senza errori.

  </Tab>
  <Tab label="react-intl" value="react-intl">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU end-to-end, ovvero il formato esportato dalla maggior parte delle piattaforme TMS. I types su `id` derivano dallo step di estrazione di `formatjs` combinato con una union generata, non out-of-the-box.

  </Tab>
  <Tab label="use-intl" value="use-intl">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Stessa impostazione di `next-intl` senza i binding specifici per Next.js. Le chiavi sono tipizzate non appena si estende `AppConfig` con il tipo dei messaggi; la suddivisione dei namespace è a carico dello sviluppatore.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

La lingua sorgente risiede nel componente; le altre lingue si trovano nei file `.po` con ID con hash dopo `lingui extract`. Dimenticare di eseguire `extract` o `compile` fa ricadere silenziosamente l'applicazione sulla lingua di fallback (inglese).

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Ogni messaggio è una funzione tipizzata generata, quindi una chiave mancante si traduce in un errore di importazione. La cartella `paraglide/` viene generata nel repository e rigenerata a ogni modifica.

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
      es: plural({ one: "{{count}} articolo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Tutte le lingue in un unico file accanto al componente. I types vengono generati in fase di build, garantendo l'autocompletamento di `title` e bloccando `tsc` in caso di errori di battitura senza necessità di declaration merging. Eliminando la cartella si eliminano anche le stringhe associate.

  </Tab>
</Tabs>

Utilizzate già `react-i18next`, `react-intl` o `Lingui`? Gli adattatori di compatibilità ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)) creano un alias per le importazioni a livello di bundler, consentendo all'API esistente di continuare a funzionare mentre migrate componente per componente. La [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md) illustra tutti i passaggi.

## Prima di scegliere definitivamente

Una tabella riassuntiva illustra cosa offre una libreria oggi. I seguenti punti indicano come sarà gestirla nella quotidianità del progetto.

**Verificate l'attività del repository.**

Numero di commit, tempi di risposta alle issue e data dell'ultima minor release. Un'architettura solida senza un manutentore attivo si trasforma rapidamente in una migrazione forzata.

**Non basatevi unicamente sui download di npm.**

La libreria più scaricata è spesso quella rilasciata per prima, non necessariamente quella più adatta a una codebase React del 2026. I download misurano la storia, non la pertinenza tecnica attuale.

![Tier list delle librerie i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Verificate chi finanzia i manutentori e qual è il loro modello di business.**

`i18next` è supportato da Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` e Lingui sono supportati da Crowdin. Tolgee, Paraglide (inlang) e Intlayer gestiscono ciascuno la propria piattaforma. Un vendor i cui ricavi derivano dai servizi di traduzione hosted ha poco interesse a rendere la traduzione gratuita all'interno della vostra toolchain. Intlayer è l'unica del gruppo a offrire la traduzione con AI tramite CLI utilizzando la vostra chiave API personale, insieme a un CMS self-hostabile.

**È pronta per gli agenti AI?**

Gli agenti AI riscontrano ancora difficoltà con l'i18n: dimenticano lingue, inventano chiavi e mescolano sintassi di messaggi. La libreria fornisce [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md) o un [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md) affinché l'agente possa elencare, completare e testare i contenuti? Inoltre, il caricamento dei contenuti è ottimizzato per impostazione predefinita, o è necessario verificare namespace e lazy import a ogni release?

**Type safety integrata di default.**

Non "può essere tipizzata con configurazioni aggiuntive", ma "una chiave errata blocca `tsc` su un'installazione pulita". Verificate cosa accade con una chiave inesistente e con una lingua in cui manca una traduzione.

**Rilevamento dei contenuti inutilizzati.**

I cataloghi tendono solo a crescere nel tempo. La build di Intlayer elimina i campi inutilizzati e li segnala nei log (`build.purge`). Paraglide ottiene questo risultato a livello architetturale, poiché una funzione messaggio non invocata viene rimossa tramite tree-shaking. Tutte le altre soluzioni lasciano la pulizia a carico dello sviluppatore.

**Developer experience.**

Tempo necessario per configurare la prima stringa tradotta, presenza di un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md) o di un'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) che mostra la traduzione all'hover e porta direttamente alla dichiarazione, una [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per completamento, test e push, un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) o estrattore che estrae le stringhe hard-coded dai componenti per non gestire ogni stringa chiave per chiave, e uno strumento per consentire a figure non tecniche di modificare i contenuti ([editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)) senza aprire una pull request.

## Domande frequenti

<FAQ>

<Question title="react-i18next è ancora una scelta valida nel 2026?">

Sì, per la maggior parte dei team. Vanta il più vasto ecosistema e la maggior quantità di soluzioni documentate online. I suoi costi sono concreti ma prevedibili: il runtime più pesante, un formato per i plurali personalizzato, oltre a type safety e scoping che richiedono configurazione e manutenzione manuali.

</Question>

<Question title="Ho davvero bisogno di una libreria basata su compiler?">

Solo se le dimensioni del bundle, i types generati o il controllo delle chiavi mancanti in fase di build rientrano tra i vostri requisiti essenziali. Per una piccola applicazione con due sole lingue, una libreria a runtime risulta più semplice. L'articolo [compiler vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md) approfondisce i vantaggi dei compiler e i potenziali svantaggi.

</Question>

<Question title="Posso cambiare libreria in seguito senza riscrivere ogni componente?">

Parzialmente. Le librerie basate su chiavi condividono una struttura sufficientemente simile da consentire a un adattatore di compatibilità di mappare un'API sull'altra, che è il principio di funzionamento degli adattatori Intlayer. I formati dei messaggi (ICU vs i18next vs helper) non si convertono automaticamente, quindi plurali e interpolazioni saranno la parte da adattare manualmente.

</Question>

<Question title="La scelta della libreria influisce sulla SEO?">

Indirettamente. Ciò che i web crawler scansionano dipende dal routing, dai tag `hreflang`, dall'attributo `<html lang>` e dalla presenza del testo nell'HTML renderizzato lato server. Alcune librerie includono helper dedicati, la maggior parte lascia la gestione all'utente. Consultate la [guida hreflang per la SEO multilingue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Per approfondire

- [Benchmark delle librerie i18n: bundle size, leakage e tempi di cambio lingua](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md) e il [report TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)
- [React i18n: come funziona il modello del provider e quali sono i costi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, funzionalità per funzionalità](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md)
- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
- [Compiler vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
- [i18n per-component vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)
- [Come funziona l'ottimizzazione del bundle in fase di build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [Configurare l'i18n in un'app Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- La stessa guida per [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_svelte_i18n_library.md) e [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_solid_i18n_library.md)
