---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "Formato dei Messaggi ICU: Sintassi, Plurali e Select"
description: Un riferimento pratico su ICU MessageFormat, interpolazione di argomenti, ramificazioni plural e select, categorie di plurali CLDR per lingua ed errori comuni.
keywords:
  - formato messaggi icu
  - icu messageformat
  - regole plurali cldr
  - categorie plurali
  - selectordinal
  - pluralizzazione i18n
  - sintassi messaggi
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Formato dei Messaggi ICU: la sintassi e i punti critici

ICU MessageFormat è una sintassi di stringhe che consente a una traduzione di contenere la propria logica condizionale: plurali, forme di genere, formattazione di numeri e date. Esiste perché la grammatica appartiene al traduttore, non allo sviluppatore che scrive `if (count === 1)`. Questo articolo esamina la sintassi, le peculiarità linguistiche che mandano in crisi le implementazioni superficiali e il modo in cui l'ecosistema JS gestisce queste sfide.

## Indice

<TOC/>

## Il problema, concretamente

Ecco il codice che quasi tutti scrivono all'inizio:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Questo approccio funziona in inglese ma si rivela fallimentare in quasi tutte le altre lingue:

- **Il russo e il polacco** necessitano di tre o quattro forme, non due.
- **Il giapponese** ne richiede solo una, e lo spazio concatenato è errato.
- **L'arabo** ne richiede sei, e il numero stesso dovrebbe essere formattato secondo il sistema numerico locale.
- **Il francese** inserisce uno spazio unificatore prima di determinati segni di punteggiatura, che la concatenazione `+ " "` distrugge.

Il problema strutturale è che la frase è stata spezzata in frammenti isolati. Un traduttore vede `item` e `items` senza contesto e senza alcuna possibilità di riorganizzare l'ordine delle parole. ICU MessageFormat risolve il problema mantenendo l'intera frase in un'unica stringa traducibile e fornendo al traduttore gli operatori logici necessari.

## Argomenti semplici

L'unità fondamentale è un segnaposto racchiuso tra parentesi graffe singole:

```text
Hello, {name}!
```

Passando `{ name: "Alice" }` durante la formattazione si ottiene `Hello, Alice!`. Le parentesi graffe sono gli unici caratteri speciali. Per visualizzare una parentesi graffa letterale, è sufficiente racchiuderla tra apici singoli: `'{'`.

Questa è l'intera funzionalità di interpolazione. Tutto il resto in ICU è costruito su questa base.

## Plurale

`plural` seleziona un ramo in base a un valore numerico:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Tre elementi fondamentali da comprendere:

- **`#`** viene sostituito dal valore formattato di `count` secondo la lingua attiva. Quindi `1234` diventa `1,234` in `en-US` e `1.234` in `it-IT`.
- **`other` è obbligatorio.** Qualsiasi implementazione ICU restituirà un errore o fallirà la validazione se manca. È il valore di fallback quando nessuna categoria corrisponde.
- **`=0`, `=1`, … corrispondono a valori numerici esatti** e vengono valutati _prima_ delle categorie CLDR. Vanno usati per diciture speciali ("Nessun messaggio"), non in sostituzione di `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` sottrae `n` dal valore prima sia della selezione della categoria sia della sostituzione di `#`. Viene utilizzato per pattern come "Alice e altre 3 persone hanno apprezzato questo post":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Con `count: 4`, `#` restituirà `3`. L'opzione `offset` è molto utile ma non sempre supportata in modo uniforme da tutti i runtime. Verificate la compatibilità prima di utilizzarla.

## Le categorie dei plurali dipendono dalla lingua

Questo è l'aspetto su cui si generano più equivoci. Le etichette `zero`, `one`, `two`, `few`, `many`, `other` non sono contenitori universali validi per ogni lingua. Ogni locale utilizza un _sottoinsieme_, regolato dalle [regole dei plurali CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), e tali regole sono grammaticali, non puramente intuitive.

| Lingua     | Tag  | Categorie utilizzate             | Totale |
| ---------- | ---- | -------------------------------- | ------ |
| Giapponese | `ja` | other                            | 1      |
| Cinese     | `zh` | other                            | 1      |
| Inglese    | `en` | one, other                       | 2      |
| Tedesco    | `de` | one, other                       | 2      |
| Francese   | `fr` | one, many, other                 | 3      |
| Ceco       | `cs` | one, few, many, other            | 4      |
| Polacco    | `pl` | one, few, many, other            | 4      |
| Russo      | `ru` | one, few, many, other            | 4      |
| Arabo      | `ar` | zero, one, two, few, many, other | 6      |
| Gallese    | `cy` | zero, one, two, few, many, other | 6      |

Due conseguenze che spesso sorprendono:

- **`one` non significa necessariamente "1".** In russo, `one` copre 1, 21, 31, 101: ogni numero che termina per 1, esclusi quelli che terminano per 11. In francese, anche `0` rientra in `one`.
- **Aggiungere una categoria alla stringa sorgente inglese non produce alcun effetto.** Il messaggio in inglese necessita solo di `one` e `other`. La traduzione polacca richiede quattro rami, e tale struttura appartiene alla stringa polacca, non a quella inglese. Qualsiasi formato che obblighi tutte le lingue ad avere la stessa struttura di chiavi creerà conflitti.

È possibile verificare il comportamento effettivo del runtime senza installare nulla:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` include i dati CLDR in tutti i browser moderni e in Node. Una libreria che dichiara la compatibilità CLDR richiama quasi sempre questa API sottostante.

## select e selectordinal

`select` permette di creare rami basati su una stringa arbitraria: un genere, un ruolo, uno stato o un piano di abbonamento.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Le chiavi vengono confrontate letteralmente e `other` è obbligatorio anche in questo caso. `select` è lo strumento adatto ogni volta che la sintassi di una frase dipende da un'enumerazione, poiché le lingue divergono sulle categorie che influenzano la grammatica.

`selectordinal` condivide la stessa struttura di `plural`, ma fa riferimento alle regole dei plurali **ordinali**, definite in una tabella diversa da quella dei cardinali:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

L'inglese impiega quattro categorie ordinali (1st, 2nd, 3rd, 4th) nonostante utilizzi solo due categorie cardinali. Questa asimmetria spiega perché i due operatori siano tenuti separati.

## Argomenti di numeri, date e ore

ICU è in grado di formattare direttamente i valori che interpola:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Lo standard contemporaneo è rappresentato dagli **skeletons**, introdotti con ICU 60 e contrassegnati dal prefisso `::`. Gli skeletons sono molto più espressivi rispetto agli stili tradizionali:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Il supporto per gli skeletons varia tra i diversi strumenti. FormatJS li implementa integralmente, mentre altri runtime accettano solo i formati storici `number, currency` o `date, long`. Verificate la compatibilità nel vostro ambiente prima del rilascio in produzione.

## Nidificazione e leggibilità

ICU è componibile. Un ramo di plurale può contenere un select, che a sua volta può contenere un altro plurale:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Questo è l'esempio classico di ICU, ma anche l'argomentazione principale contro un annidamento eccessivo. Già a partire dal secondo livello, i traduttori rischiano di commettere errori con le parentesi graffe e gli editor TMS faticano a fornire assistenza. È consigliabile non superare due livelli di annidamento; qualora ne servisse un terzo, dividete la frase in due messaggi distinti.

## Supporto di ICU nelle librerie JavaScript

| Libreria              | Supporto ICU            | Cosa si scrive concretamente                                                   |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------ |
| react-intl (FormatJS) | Nativo, completo        | Stringhe ICU, inclusi skeletons e tag rich-text                                |
| next-intl             | Nativo                  | Stringhe ICU, tramite `intl-messageformat` di FormatJS                         |
| i18next               | Richiede plugin         | Suffissi di chiave `key_one` / `key_other` e `{{name}}`; ICU via `i18next-icu` |
| vue-i18n              | Parziale / proprietario | Interpolazione `{name}` e rami plurali separati da pipe                        |
| Angular (`$localize`) | Sottoinsieme            | ICU `plural` / `select` nei template, esportati in XLIFF                       |

Alcune precisazioni per una corretta interpretazione della tabella:

- **La sintassi di default di i18next non è ICU**, senza che questo sia uno svantaggio. I suffissi (`item_one`, `item_few`) corrispondono alle categorie di `Intl.PluralRules` e risultano spesso più facili da gestire in file JSON lineari. Tuttavia, `select` e i rami annidati non sono integrati nativamente, obbligando all'uso di `i18next-icu` o alla gestione della logica nel codice applicativo.
- **I plurali a barre di vue-i18n** utilizzano per impostazione predefinita una funzione per locale anziché le categorie CLDR. Il sistema funziona, ma la regola risiede nella configurazione dell'app anziché nei dati.
- **FormatJS è l'implementazione di riferimento** in JS. Quando in ambito JavaScript si parla di "ICU MessageFormat", ci si riferisce quasi sempre alla specifica adottata da FormatJS.

## L'approccio di Intlayer

Intlayer non si affida a un DSL basato su stringhe. Gli operatori di ramificazione sono funzioni all'interno di file di dichiarazione di contenuto tipizzati, permettendo a ciascun locale di dichiarare unicamente le categorie richieste dalla propria grammatica:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      it: plural({
        one: "{{count}} posizione aperta",
        other: "{{count}} posizioni aperte",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Locale polacco → "5 ofert"
```

La corrispondenza con i concetti ICU è immediata:

| Costrutto ICU                  | Intlayer                                             |
| ------------------------------ | ---------------------------------------------------- |
| `{name}`                       | `insert("Hello {{name}}")`, o rilevamento automatico |
| `{count, plural, …}`           | `plural({ one, few, many, other })`                  |
| `{value, select, …}`           | `select({ draft, published, fallback })`             |
| ramo di genere in `select`     | `gender({ male, female, fallback })`                 |
| ramo booleano in `select`      | `cond({ true, false })`                              |
| intervalli numerici (non-CLDR) | `enu({ "0": …, ">5": …, fallback: … })`              |
| `{n, number, ::currency/EUR}`  | `useCurrency()(1234.5, { currency: "EUR" })`         |

`plural` delega la selezione delle categorie a `Intl.PluralRules`, garantendo la piena applicazione della tabella CLDR sopra indicata. La formattazione resta separata: numeri, date, valute ed elenchi vengono gestiti tramite gli appositi [hook di formattazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) anziché essere integrati all'interno della stringa.

- [hook di formattazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md)

Limiti oggettivi:

- Intlayer richiede una fase di compilazione: il compilatore estrae le dichiarazioni in fase di build. Per un modello con caricamento runtime di JSON semplice, la logica è diversa.
- `plural` non supporta attualmente un `t()` annidato all'interno dei suoi rami: si inserisce `plural` all'interno di `t()`, non viceversa.
- L'ecosistema è più recente rispetto a quello di i18next, con meno integrazioni TMS pronte all'uso.

Per i progetti che contengono già stringhe ICU, [l'adattatore di compatibilità react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md) le analizza direttamente: `plural`, `select`, `selectordinal`, `#` e i parametri storici `number`, `date`, `time`. Gli skeletons e l'opzione `offset:` non sono gestiti da questo resolver e richiedono verifica in fase di migrazione. [L'adattatore i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md) gestisce invece la convenzione a suffissi (`key_one`, `key_male`) mediante `Intl.PluralRules`.

- [l'adattatore di compatibilità react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md)
- [L'adattatore i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md)

## Errori comuni

- **Codificare la logica plurale direttamente in JS.** `count === 1 ? a : b` produce risultati errati per 8 delle 10 lingue elencate nella tabella precedente. Una volta inserito l'operatore ternario nel codice, nessun traduttore può correggerlo.
- **Concatenare frammenti tradotti.** L'ordine sintattico, gli accordi e la spaziatura attorno alla punteggiatura variano da lingua a lingua. Mantenete sempre la frase nella sua interezza.
- **Omettere `other`.** È un requisito vincolante della specifica, non una convenzione facoltativa. La maggior parte dei parser rifiuterà la stringa, mentre altri non mostreranno nulla.
- **Dare per scontato che le categorie siano universali.** Una frase sorgente inglese con `one` e `other` non implica che il file polacco contenga solo due rami. Ogni lingua deve poter dichiarare la propria struttura. Consultate la [dichiarazione dei contenuti per lingua](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md).
- **Usare `=1` al posto di `one`.** `=1` intercetta esclusivamente il numero esatto 1. In russo, 21 richiede la categoria `one`, e la regola `=1` non scatterà mai.
- **Inserire `#` all'esterno di un ramo di plurale.** Assume un significato speciale solo all'interno di `plural` o `selectordinal`. In qualsiasi altro punto è un semplice carattere cancelletto.
- **Dimenticare che `#` è già formattato.** Se desiderate il numero grezzo senza formattazione numerica locale, interpolate l'argomento per nome.

## Risorse utili

- [Contenuti plurali in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/plurial.md)
- [Contenuti basati su select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/select.md)
- [Segnaposto di inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)
- [Benchmark delle librerie i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md)
- [Cos'è l'internazionalizzazione?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/what_is_internationalization.md)
