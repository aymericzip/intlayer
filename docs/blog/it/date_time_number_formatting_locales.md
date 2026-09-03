---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formattare date e numeri per lingua con Intl"
description: Probabilmente non hai bisogno di una libreria di formattazione esterna. Come Intl gestisce date, numeri, valute e liste per locale, il costo di caching e il bug di timezone in produzione.
keywords:
  - formattare date per locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - formato valuta locale
  - formato tempo relativo
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formattare date e numeri per lingua con Intl

Tradurre stringhe è la metà visibile dell'internazionalizzazione. L'altra metà, quella che produce costantemente segnalazioni di bug, è la formattazione: un utente tedesco che visualizza `1,234.56` invece di `1.234,56`, un utente giapponese che vede `08/02/2026` interpretandolo come agosto, o una data che renderizza in modo disallineato tra server e client, mandando in crash l'idratazione in React.

Niente di tutto questo richiede librerie di terze parti. L'API `Intl` è già integrata nativamente in tutti gli ambienti moderni.

## Indice

<TOC/>

## Inizia rimuovendo le tue funzioni helper per le date

Quasi ogni codebase include una funzione `formatDate` scritta prima ancora che qualcuno pensasse alla localizzazione. Impone un ordine rigido, un separatore fisso e generalmente nomi dei mesi in inglese.

```ts
// Il codice da eliminare:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` la sostituisce completamente ed è corretta in ogni lingua:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Lo stesso principio si applica ai numeri. `toFixed(2)` produce `1234.56` ovunque, il che è errato nella maggior parte dei paesi europei.

## Cosa copre `Intl`

| API                       | Quando usarla                                            |
| :------------------------ | :------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Date e orari, con preset `dateStyle` / `timeStyle`       |
| `Intl.NumberFormat`       | Decimali, valute, percentuali, unità, notazione compatta |
| `Intl.RelativeTimeFormat` | "3 giorni fa", "tra 2 ore"                               |
| `Intl.ListFormat`         | "a, b e c" rispetto a "a, b, and c"                      |
| `Intl.PluralRules`        | Categorie di pluralizzazione per valori numerici         |
| `Intl.Collator`           | Ordinamento alfabetico corretto in base alla lingua      |

`Intl.Collator` è spesso trascurato. `array.sort()` sulle stringhe ordina in base ai code point Unicode, spostando le lettere accentate dopo la `z` e posizionando la `ö` svedese in modo errato. Se ordini elenchi visibili agli utenti, fallo con un collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("it").compare);
// ["apple", "édouard", "zebra"]
```

## Preferisci i preset alle opzioni costruite a mano

`dateStyle` e `timeStyle` consentono alla lingua di stabilire l'ordine e i separatori adeguati. Specificare manualmente `year`, `month` e `day` introduce un controllo che raramente conviene avere, poiché l'ordine corretto varia per area geografica e si finisce per sovrascrivere i dati CLDR con supposizioni arbitrarie.

```ts
// La lingua determina la struttura:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Struttura forzata a mano, errata altrove:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Utilizza singoli componenti espliciti solo quando il design richiede obbligatoriamente una larghezza fissa, ad esempio in una colonna stretta di una tabella.

## Creare formattatori è un'operazione onerosa

Questo è il dettaglio di performance fondamentale. Istanziare un `Intl.NumberFormat` comporta il caricamento dei dati di locale ed è molto più pesante della chiamata `.format()` successiva. Farlo all'interno di un ciclo di rendering su mille righe introduce un rallentamento evidente.

```ts
// Ricostruisce il formattatore a ogni iterazione:
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Costruito una sola volta e riutilizzato:
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` e `toLocaleString()` nascondono il medesimo problema: ogni invocazione crea una nuova istanza. Vanno bene per un singolo dato, ma non per una lista.

Mantieni in cache le istanze combinando lingua e opzioni:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Il bug di timezone che si manifesta solo in produzione

Questo errore ha fatto perdere interi pomeriggi a molti sviluppatori. Il server renderizza una data durante l'SSR, il browser la idrata nel client e React solleva un errore di hydration mismatch perché i due ambienti hanno generato testi differenti.

La causa: `Intl.DateTimeFormat` ricorre al fuso orario del sistema operativo quando non ne viene indicato uno esplicitamente. Il server di produzione è impostato su UTC, mentre il computer locale su un altro fuso. Il problema risulta invisibile in sviluppo ed emerge solo in produzione.

```ts
// Server in UTC e browser in UTC+9 non coincidono. Hydration mismatch.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Entrambi coincidono senza ambiguità:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Tre soluzioni percorribili:

- **Fissare il fuso orario** sul server e passarlo esplicitamente. Deterministico, ma tutti vedono l'orario UTC.
- **Renderizzare solo sul client**, usando un placeholder stabile durante l'SSR. Preciso per l'utente, comporta un lieve salto visivo.
- **Memorizzare il fuso orario dell'utente** e passarlo a entrambi gli ambienti. Il risultato migliore con un po' di lavoro in più.

In qualunque caso, definisci sempre `timeZone` esplicitamente su ogni data renderizzata sia sul server che sul client. Una data senza fuso orario dichiarato è una data con due valori distinti.

## Una valuta ha bisogno di una valuta, non di una lingua

Lingua e valuta sono concetti indipendenti. `fr-FR` non implica automaticamente l'euro: un utente francese può tranquillamente visualizzare una fattura in dollari statunitensi.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

La lingua gestisce i separatori, il raggruppamento delle cifre e la posizione del simbolo. La valuta proviene dai dati applicativi. Dedurre l'una dall'altra genera discrepanze contabili.

Presta attenzione anche a `currencyDisplay`. In contesti in cui convivono più valute col simbolo del dollaro, `"code"` rimuove ogni ambiguità tra dollari statunitensi, canadesi e australiani.

## Il tempo relativo è più naturale del tempo assoluto

Per gli eventi recenti, "2 ore fa" risulta molto più immediato di un timestamp rigido, e `Intl.RelativeTimeFormat` se ne occupa nativamente.

```ts
new Intl.RelativeTimeFormat("it", { numeric: "auto" }).format(-1, "day");
// "ieri"
```

`numeric: "auto"` permette di ottenere "ieri" invece di "1 giorno fa". Senza questo parametro si ottiene la fredda forma numerica in tutte le lingue.

## Cosa offre Intlayer in aggiunta

Intlayer incapsula queste API in funzioni helper con cache automatica, sollevandoti dalla gestione della Map mostrata sopra, e applica la lingua attiva come default senza doverla specificare a ogni chiamata.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 ore fa"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 chilometri"
compact(1200); // "1,2 mila"
list(["mela", "banana", "arancia"]); // "mela, banana e arancia"
```

La funzione `date()` supporta anche preset (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), semplificando i casi più comuni. Gli equivalenti per React e Vue sono disponibili come hook e composable, risolvendo la lingua attiva direttamente dal contesto.

Si tratta essenzialmente di uno strato di caching e gestione del locale predefinito costruito sopra l'API di piattaforma standard. Il comportamento di formattazione resta interamente quello di `Intl`. Consulta la lista completa nella [documentazione dei formattatori](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md).

## Errori comuni

- **`toLocaleDateString()` senza specificare il locale.** Utilizza il locale del sistema host, che su un server dipende dall'immagine del container.
- **Formattare all'interno di un ciclo senza cache.** La creazione dell'istanza assorbe la maggior parte del tempo CPU.
- **Omettere `timeZone` sulle date isomorfe.** Causa errori di idratazione impossibili da riprodurre in locale.
- **Dedurre la valuta dalla lingua.** `fr-FR` non garantisce euro.
- **Eseguire `sort()` semplice su testo visualizzato.** Usa sempre `Intl.Collator`.
- **Inserire a mano i nomi di mesi o giorni.** Sono già inclusi nel CLDR per ogni lingua.
- **Lasciare `numeric: "always"` per il tempo relativo.** Produce "1 giorno fa" anziché "ieri".

## Per approfondire

- [Formattatori e utilità di locale: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md)
- [Riferimento configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Report di benchmark tra framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Adattatore di compatibilità react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md)
- [Formato messaggi ICU: plurali, select e scheletri numerici](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md)
- [Come testare le traduzioni, inclusi formattatori e plurali](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_testing_strategies.md)
- [Cosa comprende realmente l'internazionalizzazione](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/what_is_internationalization.md)
