---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco o Intlayer? Confronta le librerie i18n per Angular: cambio lingua a runtime, tipizzazione, lazy loading, plurali e SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internazionalizzazione angular
  - ngx-translate vs transloco
  - Intlayer
  - confronto librerie i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular è l'unico grande framework che include un proprio i18n, e adotta l'approccio opposto a quello delle librerie costruite dalla community attorno ad esso. `@angular/localize` traduce in fase di build e produce un'app per ogni lingua. `ngx-translate` e Transloco traducono a runtime a partire da file JSON. Intlayer compila i contenuti in fase di build ma mantiene una sola app che cambia lingua a runtime.

Questo articolo confronta le quattro su ciò che decide la scelta nella pratica: come cambia la lingua, dove vivono i contenuti, cosa intercetta il compilatore e cosa viene caricato nel browser.

## Indice

<TOC/>

## In breve

- **`@angular/localize`** (Angular i18n): nessun costo a runtime e ICU nativo, ma una build e un deploy per locale, e cambiare lingua ricarica l'app.
- **`ngx-translate`**: l'opzione runtime più vecchia e semplice. Un file JSON per locale caricato via HTTP, chiavi non tipizzate, plurali tramite plugin.
- **Transloco**: l'opzione runtime pensata per le app più grandi. Gli scope caricano le traduzioni per funzionalità, e un ecosistema di plugin copre ICU, formattazione per locale ed estrazione delle chiavi.
- **Intlayer**: contenuto dichiarato accanto a ogni componente, tipizzato in fase di build, suddiviso per componente e per locale, con cambio lingua a runtime. Richiede un builder esbuild personalizzato.

> Per capire da dove viene ciascuna libreria, leggi la [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md).

- [storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)

## Build o runtime: la decisione che divide il campo

**`@angular/localize`** inserisce le traduzioni nei template compilati. `ng build --localize` produce `dist/app/en`, `dist/app/fr` e così via, ognuno con la sola propria lingua. Non viene scaricato nulla e nulla viene interpretato a runtime, il che la rende l'opzione più veloce una volta caricata. Il costo è operativo: N build da testare, N cartelle da distribuire, una regola sul server o sulla CDN per instradare `/fr/` verso quella giusta, e un caricamento completo della pagina quando l'utente cambia lingua. Anche `ng serve` esegue una sola locale alla volta.

**`ngx-translate` e Transloco** mantengono una sola build. Un servizio scarica `fr.json` quando cambia la locale e ogni pipe o direttiva si ridisegna. Il cambio è istantaneo, ma il primo rendering attende la richiesta HTTP, le chiavi sono semplici stringhe, e con l'SSR il loader deve funzionare anche sul server (URL assoluti o un loader su file system, più `TransferState` per evitare di scaricare due volte).

**Intlayer** mantiene anch'esso una sola build, ma il contenuto è compilato nel bundle invece di essere scaricato come JSON grezzo. `useIntlayer()` restituisce un Signal, quindi un cambio di locale aggiorna i componenti che lo leggono, senza ricaricare.

Con le librerie runtime è facile perdere un dettaglio di Angular: `DatePipe`, `CurrencyPipe` e `DecimalPipe` leggono `LOCALE_ID`, che è fissato al bootstrap. Cambiare lingua con `ngx-translate` non cambia quindi il modo in cui vengono formattati date e prezzi. Transloco lo risolve con `@jsverse/transloco-locale`, Intlayer con `useDate`, `useNumber` e `useCurrency`, che seguono la locale attiva. `@angular/localize` non ha il problema, perché ogni build ha il proprio `LOCALE_ID`. La [guida alla formattazione di date, orari e numeri](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/date_time_number_formatting_locales.md) tratta il lato `Intl`.

- [guida alla formattazione di date, orari e numeri](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/date_time_number_formatting_locales.md)

## Confronto delle funzionalità

|                            | `@angular/localize`                                     | `ngx-translate`                                    | Transloco                                           | Intlayer                                                                  |
| :------------------------- | :------------------------------------------------------ | :------------------------------------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------ |
| **Traduzione applicata**   | In build, incorporata                                   | A runtime                                          | A runtime                                           | Compilata in build, risolta a runtime                                     |
| **Build per release**      | Una per locale                                          | Una                                                | Una                                                 | Una                                                                       |
| **Cambio lingua**          | Ricaricamento verso un'altra build                      | Istantaneo                                         | Istantaneo                                          | Istantaneo                                                                |
| **Dove vive il contenuto** | Testo sorgente nei template, traduzioni in XLIFF/JSON   | Un JSON per locale                                 | Un JSON per locale, più uno per scope               | `.content.ts` (o JSON) accanto a ogni componente, oppure centralizzato    |
| **Plurali / ICU**          | ✅ ICU nativo nei template                              | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)      | ✅ `plural()` con regole CLDR, ⚠️ stringhe ICU parziali                   |
| **Chiavi tipizzate**       | Non applicabile, il testo sorgente è il messaggio       | ❌ No                                              | ❌ No, Keys Manager trova le chiavi mancanti da CLI | ✅ Generate, una chiave errata fa fallire `ng build`                      |
| **Traduzioni mancanti**    | Avviso in build, o errore con `i18nMissingTranslation`  | Mostra la chiave grezza a runtime                  | Lingua di fallback a runtime, controllo da CLI      | Segnalate da TypeScript, `intlayer test` in CI                            |
| **Lazy loading**           | Non serve, ogni build contiene una locale               | Intero file della locale, suddivisione a mano      | ✅ Per scope (route o componente)                   | ✅ Per componente e per locale                                            |
| **Signals**                | Non applicabile, il testo è statico                     | Pipe e Observables                                 | `translateSignal()`                                 | `useIntlayer()` restituisce un Signal                                     |
| **Configurazione build**   | `ng add @angular/localize`, locale in `angular.json`    | Nessuna                                            | Nessuna                                             | `@angular-builders/custom-esbuild` e un plugin esbuild                    |
| **Flusso dei traduttori**  | ✅ XLIFF, il formato che gli strumenti TMS si aspettano | JSON                                               | JSON                                                | `.content.ts`/JSON, plugin di sync, editor visuale, riempimento IA da CLI |

Alcune righe richiedono contesto.

**ID dei messaggi in `@angular/localize`.** Senza un ID personalizzato (`i18n="@@cartTitle"`), l'ID di ogni messaggio è un hash del suo testo sorgente. Correggi un refuso nel testo inglese e tutte le traduzioni di quel messaggio restano orfane finché i traduttori non le rifanno. Imposta ID personalizzati fin dal primo giorno.

**Suddividere con `ngx-translate`.** Il loader predefinito scarica l'intero `fr.json`, quindi ogni pagina porta con sé le stringhe di tutte le altre. Si può suddividere per funzionalità con un loader personalizzato o più istanze di `TranslateService`, ma nulla lo impone. L'articolo [i18n per componente vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md) tratta il compromesso.

- [i18n per componente vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md)

**Gli scope in Transloco.** Uno scope è una cartella di file JSON (`i18n/cart/en.json`) caricata quando una route o un componente la fornisce. È ciò che nelle librerie runtime si avvicina di più al contenuto per componente, e funziona bene finché i componenti condivisi non attingono allo scope di un'altra funzionalità.

**Il builder di Intlayer.** Angular CLI non espone i plugin esbuild, quindi Intlayer richiede `@angular-builders/custom-esbuild` in `angular.json`. È una piccola modifica, ma è un builder di terze parti da tenere allineato agli aggiornamenti di Angular. La [guida di configurazione per Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md) mostra la configurazione completa.

- [guida di configurazione per Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)

## Attività dei commit

`@angular/localize` vive nel monorepo `angular/angular`, quindi il numero di commit non è confrontabile e viene escluso.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Download npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

I download misurano la storia più delle scelte attuali: `ngx-translate` è ancora installato in ogni app nata prima di Transloco, e gli assistenti IA continuano a suggerirlo perché domina il codice su cui sono stati addestrati. Transloco è passato da `@ngneat/transloco` a `@jsverse/transloco` nel 2024, e il vecchio scope viene ancora scaricato.

## Lo stesso componente con ogni libreria

Un riepilogo del carrello con un titolo e un plurale. Il template cambia appena, ciò che cambia è dove vivono le stringhe e cosa sa il compilatore su di esse.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Il testo inglese resta nel template. I traduttori lavorano sull'XLIFF estratto, e ogni locale diventa una build a sé. Le stringhe in TypeScript usano il tag `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Il plurale ICU funziona solo con `ngx-translate-messageformat-compiler`, il parser predefinito sostituisce solo `{{count}}`. `"cart.titel"` compila e mostra la chiave grezza a runtime.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Lo scope `cart` viene scaricato al primo rendering del componente. I plurali ICU richiedono `@jsverse/transloco-messageformat`. Le chiavi non sono tipizzate, `transloco-keys-manager` segnala quelle mancanti e inutilizzate.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ it: "Il tuo carrello", en: "Your cart", fr: "Votre panier" }),
    items: t({
      it: plural({ one: "{{count}} articolo", other: "{{count}} articoli" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Tutte le locale stanno in un file accanto al componente. I tipi sono generati in build, quindi `content().titel` fa fallire `ng build`, e una locale mancante in `t()` viene segnalata nell'editor.

  </Tab>
</Tabs>

## Quale si adatta alla tua app

<AccordionGroup>
<Accordion header="Sito pubblico, poche interazioni, SEO prima di tutto">

`@angular/localize`. Ogni locale è una build separata con il proprio URL, le pagine prerenderizzate arrivano già tradotte e non c'è alcun runtime i18n da caricare. Il costo di una build per locale è basso quando l'app è soprattutto contenuto e i cambi di lingua sono rari. Abbinala a tag `hreflang` corretti, vedi la [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md).

- [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard o SaaS in cui gli utenti cambiano lingua dentro l'app">

Un'opzione runtime. Ricaricare su un'altra build fa perdere lo stato in memoria, e un menu lingua che ricarica l'app sembra rotto. `ngx-translate` basta per una piccola app con due o tre locale. Transloco è la scelta runtime più sicura oltre una dozzina di funzionalità, grazie agli scope.

</Accordion>
<Accordion header="Le traduzioni arrivano da un TMS o da un'agenzia">

`@angular/localize` esporta XLIFF, che ogni TMS legge, e il testo sorgente nel template dà ai traduttori un contesto reale. Anche il JSON di `ngx-translate` e Transloco è ampiamente supportato. Verifica che il tuo fornitore gestisca i plurali ICU prima di scegliere una libreria runtime, dato che entrambe richiedono un plugin per questo.

</Accordion>
<Accordion header="App grande, molte route lazy, budget di bundle">

Scope di Transloco o Intlayer. Entrambi evitano di inviare le stringhe di ogni funzionalità a ogni route. La differenza sta nell'applicazione della regola: uno scope di Transloco è una convenzione, un dizionario di Intlayer viene incluso nel bundle solo dove `useIntlayer()` lo importa. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).

- [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)
- [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="La type safety è un requisito">

Solo Intlayer tipizza le chiavi di default. Con `ngx-translate` e Transloco, un refuso in una chiave compila e in produzione compare come chiave grezza. Transloco Keys Manager può intercettarlo in CI, il che è meglio di niente ma non equivale a un errore di compilazione. L'articolo [rilevare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md) confronta gli approcci.

- [rilevare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md)

</Accordion>
<Accordion header="Le traduzioni saranno prodotte dall'IA">

Contenuto colocato più una CLI che riempie le locale mancanti è la via più breve. Il [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) di Intlayer funziona con la tua chiave API e ritraduce solo ciò che è cambiato. Con cataloghi XLIFF o JSON dovrai scrivere tu lo stesso ciclo.

- [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md)

</Accordion>
</AccordionGroup>

## Dove ciascuna è carente

- **`@angular/localize`**: una build e un deploy per locale, ricaricamento al cambio lingua, ID con hash che lasciano orfane le traduzioni quando cambia il testo sorgente, e nessun modo di caricare traduzioni da un CMS dopo la build senza trucchi al bootstrap.
- **`ngx-translate`**: chiavi non tipizzate, plurali e ICU tramite plugin, il file completo della locale su ogni pagina, una pipe impura rivalutata a ogni change detection, e nessuna gestione di `LOCALE_ID` per date e numeri.
- **Transloco**: chiavi non tipizzate, ICU tramite plugin e scope che sono una convenzione e non una garanzia. Diversi plugin da assemblare per ciò che `@angular/localize` offre in modo nativo.
- **Intlayer**: un builder di terze parti in `angular.json`, una community Angular più piccola delle altre tre, supporto ICU parziale e contenuto sparso nel codebase per scelta progettuale, quindi esportare un singolo file per un traduttore richiede il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) o la CLI.

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)

## Migrare da ngx-translate

L'[adattatore di compatibilità `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/ngx-translate.md) mantiene funzionanti `TranslateService`, la pipe `translate` e la direttiva `[translate]` mentre Intlayer serve il contenuto, così i template si possono migrare uno alla volta. La [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_ngx-translate_to_intlayer.md) la spiega passo per passo. Per Transloco o `@angular/localize`, il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) può mantenere i cataloghi JSON esistenti come fonte di verità durante il passaggio.

- [adattatore di compatibilità `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/ngx-translate.md)
- [guida alla migrazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_ngx-translate_to_intlayer.md)
- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)

## Domande frequenti

<FAQ>

<Question title="ngx-translate è ancora mantenuto?">

Sì. Dopo anni di scarsa attività, il progetto ha avuto un nuovo maintainer nel 2024 e da allora ha rilasciato API standalone come `provideTranslateService`. Il design non è cambiato: JSON a runtime, chiavi stringa, plurali tramite plugin.

</Question>

<Question title="ngx-translate o Transloco per una nuova app Angular?">

Transloco, a meno che l'app sia piccola. Copre ciò che fa `ngx-translate` e aggiunge scope, helper per i signal, indicazioni per l'SSR e strumenti per le chiavi. Le due API sono abbastanza vicine da rendere il passaggio successivo per lo più meccanico, ma non c'è motivo di partire dalla più semplice se l'app crescerà.

</Question>

<Question title="@angular/localize può cambiare lingua senza ricaricare?">

Non per come è progettato. Le traduzioni sono inserite in fase di build, quindi un'altra lingua significa un'altra build. Si può chiamare `loadTranslations()` prima del bootstrap per caricare le traduzioni a runtime, ma cambiare lingua richiede comunque di riavviare l'app.

</Question>

<Question title="Quale opzione è la migliore per la SEO di Angular?">

La libreria conta meno del routing: un URL per locale, tag `hreflang`, `<html lang>` e HTML tradotto renderizzato sul server. `@angular/localize` ottiene quasi tutto questo gratis perché ogni locale è una build separata. Le librerie runtime richiedono SSR e route localizzate per eguagliarla. Vedi [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md).

- [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md)

</Question>

<Question title="Intlayer funziona con Analog?">

Sì, tramite Vite. Vedi la [guida ad Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_analog.md).

- [guida ad Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_analog.md)

</Question>

</FAQ>

## Per approfondire

- [Configurare Intlayer in Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)
- [Configurare Intlayer in Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_19.md)
- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Compilatore vs i18n dichiarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md)
- [Formato dei messaggi ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md)
- [Adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md)

Lo stesso confronto per

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/how_to_pick_solid_i18n_library.md)
