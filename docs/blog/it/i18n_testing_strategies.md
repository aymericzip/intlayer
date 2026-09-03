---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Come testare le traduzioni senza scrivere test fragili"
description: Cosa vale la pena testare in un'applicazione i18n e cosa no. Test di rendering con provider, pseudolocalizzazione, copertura RTL e plurali, e la trappola degli snapshot.
keywords:
  - testare traduzioni
  - test i18n
  - testing library i18n
  - pseudolocalizzazione
  - test provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Come testare le traduzioni senza scrivere test fragili

La maggior parte delle suite di test i18n fallisce per due motivi. O eseguono asserzioni sul testo letterale, per cui ogni minima modifica di copy rompe cinquanta test e il team finisce per cancellarli. Oppure renderizzano tutto nella lingua predefinita, non dimostrando nulla sulle altre diciassette. Entrambe le strade portano allo stesso risultato, una suite di cui nessuno si fida.

## Indice

<TOC/>

## I pattern sono indipendenti dalla libreria

Ciascun pattern mostrato di seguito funziona con qualsiasi stack i18n. Sostituisci il provider con `I18nextProvider`, `NextIntlClientProvider` o `IntlProvider` e i test rimangono identici, poiché verificano l'output renderizzato anziché una specifica API di libreria.

Anche gli strumenti di copertura si adattano facilmente: con il [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) collegato ai tuoi cataloghi esistenti, o un [adattatore di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) che crea alias sui tuoi import attuali, l'asserzione di copertura viene eseguita sul JSON che già possiedi.

## Decidere cosa stai realmente testando

La qualità della traduzione non è un test. Nessuna asserzione può dirti se il tedesco suoni naturale, e pretendere il contrario produce una suite piena di stringhe hardcodate.

Ciò che vale la pena testare è meccanico:

| Vale la pena testare                        | Non vale la pena testare                |
| :------------------------------------------ | :-------------------------------------- |
| Ogni locale richiesta ha un valore          | Se il testo è ben scritto               |
| La locale corretta raggiunge il componente  | La copia esatta di ogni etichetta       |
| I plurali si risolvono per ogni categoria   | Se il traduttore ha fatto il suo lavoro |
| I locali RTL impostano direzione e specchio | Ogni stringa in ogni lingua             |
| Date e numeri formattati usano la locale    | La correttezza interna di `Intl`        |

La copertura appartiene a un unico test basato sui dati, non ai test dei singoli componenti. Questo argomento è approfondito in [individuare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md); questo articolo si concentra sul resto.

## Renderizzare sotto un provider e interrogare per ruolo

Il pattern fondamentale consiste nel montare il componente all'interno di un provider di locale e interrogare per ruolo o test id invece che per testo.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renderizza l'intestazione del riepilogo in francese", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Interrogare `getByRole("heading")` sopravvive a un cambio di testo. `getByText("Récapitulatif")` fallisce al primo ritocco. Usa il testo letterale solo quando la stringa stessa è l'oggetto del test, il che è raro.

Per attributi come `aria-label` ti serve la stringa grezza piuttosto che un nodo renderizzabile. In React, le voci di `useIntlayer` espongono un campo `.value` a tale scopo.

## Parametrizzare i test tra le diverse lingue

Un unico blocco di test eseguito su tutte le lingue apporta molto più valore di un test separato per lingua.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renderizza senza ricorrere alla chiave grezza", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Una chiave renderizzata significa che la risoluzione è fallita.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("imposta la corretta direzione del testo", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

La prima asserzione offre un vantaggio generico ed economico: se una ricerca fallisce e la libreria mostra la chiave, il DOM conterrà qualcosa come `cart.summary.title`. Questo intercetta un'intera classe di bug senza nominare una sola stringa.

## La pseudolocalizzazione rileva ciò che i cataloghi non vedono

Aggiungi una finta lingua che trasformi ogni stringa, ad esempio trasformando `Checkout` in `[!!! Çĥéçķöũţ !!!]`. Quindi renderizza la pagina in quella lingua.

Tutto ciò che rimane in inglese puro è scritto direttamente nel codice. Nessun controllo basato sui cataloghi può individuarlo, poiché per gli strumenti quella stringa semplicemente non esiste. Le parentesi svolgono un secondo compito: allungano il testo di circa il 30 percento, facendo emergere problemi di layout prima ancora di testare in tedesco.

È consigliabile eseguire questo passaggio come verifica visiva o end-to-end piuttosto che come unit test, poiché il difetto si nota visivamente.

## I plurali richiedono un test per categoria, non per lingua

I bug sui plurali rimangono nascosti perché l'inglese ha solo due forme e la maggior parte degli sviluppatori si limita a quelle. Il polacco ne ha quattro, l'arabo sei.

```ts fileName="plural.test.ts"
// L'arabo copre zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("conteggio %i", (count) => {
  it("produce una stringa non vuota in arabo", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Scegli valori numerici che coprano ciascuna categoria CLDR per la lingua più complessa anziché testare 1 e 2 ovunque. `Intl.PluralRules` ti indica in quale categoria rientra un numero, consentendoti di ricavare il campione di test senza tirare a indovinare. Maggiori dettagli nell'[articolo sul formato di messaggi ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md).

## La trappola degli snapshot

Gli snapshot e l'i18n sono una combinazione pericolosa. Uno snapshot di un componente localizzato memorizza ogni stringa al suo interno: se un traduttore corregge un refuso in portoghese, una suite verde diventa rossa, su un file che nessun revisore è in grado di comprendere a fondo. Dopo la terza volta, qualcuno lancia `-u` senza leggere il diff, e gli snapshot perdono ogni significato.

Se vuoi usare gli snapshot, eseguili solo su una singola lingua e considerali come un controllo strutturale anziché sui contenuti. Tutto ciò che è specifico di una lingua appartiene ad asserzioni esplicite.

## Testare la negoziazione, non solo il rendering

Il bug i18n più comune in produzione non è una stringa mancante. È la selezione della lingua sbagliata: un URL indica `/fr/`, il client legge `navigator.language`, e i due valori sono in disaccordo.

Testa l'ordine di risoluzione direttamente, come funzione pura, separata da qualsiasi componente:

```ts fileName="locale-resolution.test.ts"
it("preferisce l'URL rispetto alla preferenza memorizzata", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("ricorre all'header quando l'URL non ha prefisso", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Questo è il singolo test di i18n di maggior valore mancante nella maggior parte delle codebase, e non necessita del DOM.

## Cosa eseguire e dove

- **Unit**: negoziazione della lingua, formattatori, categorie di plurali. Rapido, senza DOM.
- **Componente**: un rendering con provider per lingua, verificando ruoli e assenza di chiavi grezze.
- **Copertura**: un test basato sui dati che certifichi l'assenza di lingue richieste mancanti.
- **Visivo o end-to-end**: passaggio di pseudolocalizzazione e una pagina RTL, poiché tali errori sono visivi.

Mantieni i primi tre nella pipeline a ogni commit. L'ultimo è economico da eseguire la notte e dispendioso su ogni push.

## Errori comuni

- **Verificare il testo esatto ovunque.** Porta all'abbandono e cancellazione della suite entro pochi mesi.
- **Snapshot di componenti localizzati.** I traduttori bloccano la build e i revisori approvano senza verificare.
- **Testare solo la lingua predefinita.** L'unica lingua che non può mai mancare.
- **Testare solo 1 e 2 per i plurali.** Salta tutte le categorie che l'inglese non possiede.
- **Mockare la libreria i18n.** In tal caso stai solo testando che il tuo mock restituisca stringhe.
- **Non testare mai la negoziazione.** Il guasto reale più comune e il più semplice da validare.

## Per approfondire

- [Testare i contenuti: audit CLI, API programmatica e asserzioni UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md)
- [Plugin ESLint: rilevare stringhe hardcodate e contenuti inutilizzati](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)
- [Formattatori e utilità di lingua, compreso `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md)
- [Report di benchmark tra diversi framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Adattatore di compatibilità react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-i18next.md)
- [Come individuare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md)
- [Formato dei messaggi ICU: plurali, select e scheletri](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md)
