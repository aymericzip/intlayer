---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Perché ICU MessageFormat non è fatto per JavaScript
description: "ICU MessageFormat è stato creato per Java e C++. Nel browser, il supporto completo richiede circa 10 KB di codice del parser. Da dove proviene questo costo e quali sono le alternative."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - dimensione bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralizzazione i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Perché ICU MessageFormat non è fatto per JavaScript

ICU MessageFormat è un ottimo standard. È completo, i traduttori lo conoscono bene e la maggior parte dei sistemi di gestione delle traduzioni (TMS) è in grado di leggerlo. Il problema è l'ambiente di runtime per cui è stato originariamente progettato. ICU proviene da C++ e Java, dove un parser e un formattatore di messaggi completo comporta un costo irrisorio rispetto alle dimensioni dell'applicazione. Nel bundle del browser, questo prezzo viene pagato a ogni singolo caricamento di pagina.

Questo articolo approfondisce le origini di ICU, il motivo per cui la sua sintassi risulta pesante per i plurali e perché la piena compatibilità aggiunge peso superfluo a qualsiasi libreria i18n per JavaScript. Se ti interessa consultare direttamente la sintassi, leggi prima la [guida di riferimento a ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md).

- [Guida di riferimento a ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md)

<TOC/>

## Da IBM all'Unicode Consortium

ICU è l'acronimo di _International Components for Unicode_. La sintassi dei suoi messaggi ha debuttato con Java: Taligent, una joint venture tra Apple e IBM, sviluppò le classi di internazionalizzazione di JDK 1.1 (1997), tra cui `java.text.MessageFormat`. IBM ha continuato la loro evoluzione con ICU4J, effettuando il porting in C/C++ sotto il nome di ICU4C e rilasciando il codice sorgente nel 1999. Nel 2016, il progetto ICU è passato sotto la guida dell'Unicode Consortium, che mantiene anche CLDR, il database di dati di localizzazione su cui poggia.

### Gli utilizzi originari

L'obiettivo principale erano i software per server e workstation desktop: applicazioni aziendali Java, soluzioni IBM e, successivamente, sistemi operativi. I messaggi risiedevano in file `.properties` di Java caricati mediante `ResourceBundle`, o nel formato nativo di pacchetti di risorse di ICU per C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

La prima versione di JDK non prevedeva la parola chiave `plural`. Utilizzava `choice`, basata su intervalli numerici (`{0,choice,0#no files|1#one file|1<{0} files}`), adatta solo a lingue con logiche di pluralizzazione analoghe all'inglese. ICU ha introdotto `plural` basato sulle regole CLDR nel 2008 (ICU 4.0) e `select` nel 2010 (ICU 4.4).

### La differenza con `.po`

Spesso ICU viene confuso con gettext, ma si tratta di approcci differenti. I file `.po` derivano da GNU gettext (C, Linux, poi PHP e Python). Una voce `.po` contiene semplici coppie `msgid` / `msgstr`, e i plurali vengono determinati tramite un'espressione C nell'intestazione del file (`Plural-Forms: nplurals=2; plural=(n > 1);`). Non vi sono diramazioni interne al messaggio. Al contrario, ICU inserisce la logica di diramazione all'interno della stringa stessa, consentendo a un unico messaggio di combinare `plural`, `select` e formattazione dei numeri.

### Dove viene eseguito ICU oggi

ICU4C è integrato nativamente in Android, iOS, macOS, Windows, Node.js e nei motori JavaScript di Chrome e Firefox. Le API `Intl` del browser sono in gran parte costruite su di esso. Il browser dispone quindi già internamente delle regole di pluralizzazione e della formattazione di numeri e date di ICU. Ciò che non possiede è il parser del messaggio: `Intl.MessageFormat` è ancora una proposta TC39 in fase iniziale, basata sulla nuova sintassi MessageFormat 2 e non retrocompatibile con ICU MessageFormat 1.

Questa evoluzione storica spiega le scelte progettuali:

- **È pensato per runtime server e desktop.** Il parsing di una stringa a runtime ha un impatto trascurabile in quegli ambienti, e la libreria è installata a livello di sistema operativo, non scaricata da ogni visitatore web.
- **È un DSL dentro una stringa.** Diramazioni, numeri, date e annidamenti risiedono in un'unica sintassi che un traduttore può gestire senza modificare il codice.
- **Punta alla massima completezza.** Qualsiasi sfumatura grammaticale utile ai traduttori dispone di un apposito operatore.

Nessuna di queste caratteristiche è un difetto in sé. Semplicemente, presuppongono un ambiente di esecuzione diverso dal browser.

## I plurali sono prolissi

La struttura più diffusa in ICU è anche la più complessa da leggere. Un conteggio che include il caso zero si presenta così:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Questo richiede il nome dell'argomento, la parola chiave `plural`, un'etichetta per ciascun ramo, parentesi graffe nidificate e `#` come token speciale valido esclusivamente nei rami plurali. Se si aggiunge un genere grammaticale, l'annidamento aumenta:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Nove righe su quindici definiscono unicamente la struttura sintattica. Il polacco richiede quattro rami di plurale per ciascuna delle tre varianti di genere, rendendo la stringa tradotta un blocco intricato di graffe dove una sola parentesi di chiusura mancante compromette l'intero messaggio, spesso visibile solo a runtime.

In JavaScript, la stessa struttura può essere espressa come semplici dati: un oggetto con chiavi corrispondenti alle categorie di plurali, convalidato dal sistema di tipi e dall'editor, senza la necessità di un parser interposto tra file e valore finale.

## La completezza ha un prezzo

ICU copre un'ampia serie di requisiti:

- `plural` con corrispondenze esatte (`=0`) e modificatori (`offset:`)
- `selectordinal`, con tabella ordinale CLDR dedicata
- `select`, annidabile a qualsiasi livello di profondità
- Argomenti `number`, `date` e `time`, sia in formato classico (`number, currency`) sia con skeletons (`::currency/EUR compact-short`)
- Regole per virgolette e caratteri di escape (`'{'`, `''`)
- Tag di formattazione rich-text in varie implementazioni (`<b>…</b>`)

Una libreria che offre compatibilità 1:1 con ICU deve includere ogni singolo modulo, non potendo prevedere in fase di build quali funzionalità saranno effettivamente sfruttate dai tuoi messaggi. Nella pratica, ciò comporta:

1. **Un parser** per convertire la stringa in un AST, gestendo gli errori legati a parentesi malformate.
2. **Un parser di skeletons** dedicato alla sintassi `::` per numeri e date, che rappresenta un mini-linguaggio a sé stante.
3. **Un formattatore** che percorre l'AST e mappa ciascun nodo sulle API `Intl.PluralRules`, `Intl.NumberFormat` e `Intl.DateTimeFormat`.

La terza parte è molto snella, poiché il JavaScript moderno integra già la logica CLDR tramite `Intl`. Le prime due, al contrario, esistono soltanto per interpretare una sintassi testuale. In `intl-messageformat` di FormatJS, l'implementazione di riferimento adottata da `react-intl` e `next-intl`, questo si traduce in circa **10 KB di JavaScript compresso** inviati a ciascun utente, prima ancora di qualunque stringa della tua applicazione.

La maggior parte dei progetti impiega solo una minima percentuale delle funzionalità: interpolazione `{name}` e qualche blocco `plural`. Ciononostante, continua a scaricare il parser per skeletons, ordinali e offset, poiché un testo interpretato a runtime impedisce al bundler di eliminare il codice non utilizzato.

## Anche next-intl ha affrontato lo stesso problema

Non si tratta di una questione meramente teorica. `next-intl`, una delle librerie basate su ICU più diffuse, è giunta alla stessa conclusione. Nella versione 4.8 (gennaio 2026) ha introdotto un'opzione sperimentale denominata `precompile`. Questa opzione esegue il parsing dei messaggi ICU durante la fase di build producendo un AST compatto e sostituisce il parser a runtime con un piccolo valutatore. Il progetto stima un **risparmio di circa 9 KB di JavaScript compresso** attivando questo flag.

Questo compromesso evidenzia tuttavia i limiti intrinseci di tale approccio: `t.raw` smette di funzionare con la precompilazione, poiché la stringa ICU originaria non esiste più a runtime. Nel momento in cui il browser non analizza più la stringa, non stai più distribuendo vero codice ICU. Stai inviando una rappresentazione già compilata, dove la sintassi testuale rimane un semplice formato di scrittura iniziale.

A questo punto la domanda sorge spontanea: se il browser non legge mai quella stringa, perché sviluppatori e traduttori dovrebbero continuare a scriverla?

## Come appare un approccio nativo per JavaScript

JavaScript gestisce già le parti complesse. `Intl.PluralRules` riconosce che il polacco prevede quattro categorie cardinali e l'inglese quattro ordinali. `Intl.NumberFormat` e `Intl.DateTimeFormat` si occupano di valute, unità di misura, formati compatti e calendari. Resta solo da selezionare il ramo appropriato e inserire i valori, un'operazione che richiede pochissime righe quando la struttura è modellata come dato anziché come stringa.

Questo è il modello su cui si fonda Intlayer. Le diramazioni sono definite tramite funzioni all'interno di dichiarazioni di contenuto tipizzate, dove ciascuna lingua dichiara solo le categorie grammaticali effettivamente necessarie:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      it: plural({
        one: "{{count}} messaggio non letto",
        other: "{{count}} messaggi non letti",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Locale polacca → "5 nieprzeczytanych wiadomości"
```

Cosa cambia rispetto ad ICU:

- **Nessun parser nel bundle.** La struttura è già un oggetto nativo nel momento in cui giunge al browser. La funzione `plural` seleziona la chiave mediante `Intl.PluralRules`, fornito direttamente dal browser.
- **Rilevamento degli errori a livello di build.** Un ramo omesso o una chiave errata genera un errore di compilazione TypeScript, scongiurando guasti in produzione.
- **La formattazione resta separata dal messaggio.** Numeri, date e valute passano attraverso [hook di formattazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) che interagiscono direttamente con `Intl`, senza dover interpretare skeletons testuali.
- **Le funzionalità non impiegate non pesano sul bundle.** Se nessun messaggio adopera `gender`, il bundler lo elimina tramite tree-shaking.

- [Hook di formattazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md)

Vi sono naturalmente anche delle contropartite: occorre una fase di build, i contenuti risiedono nel codice anziché in file di testo puro, e alcuni software TMS focalizzati su ICU non possono consumare direttamente dichiarazioni TypeScript.

## Quando ICU resta la scelta opportuna

ICU continua a essere l'opzione più adatta nei seguenti scenari:

- **La tua pipeline di traduzione è interamente strutturata su di esso.** Molti strumenti TMS importano ed esportano file ICU, e i traduttori padroneggiano questa sintassi.
- **I messaggi sono condivisi tra molteplici piattaforme.** Un catalogo condiviso che alimenta contemporaneamente un'app iOS, un'app Android e un'applicazione web rappresenta un motivo valido per mantenere un formato universale.
- **Possiedi già un ampio archivio di contenuti in ICU.** Riscrivere migliaia di messaggi raramente ripaga l'investimento preso da solo.

In quest'ultimo scenario, non sei costretto a scegliere tra una riscrittura integrale e il mantenimento di un parser oneroso. L'[adattatore di compatibilità react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md) di Intlayer interpreta le stringhe ICU preesistenti (`plural`, `select`, `selectordinal`, `#`, formati classici `number` / `date` / `time`), consentendoti una migrazione graduale che limita l'impatto di ICU unicamente ai testi che ne hanno ancora bisogno.

- [Adattatore di compatibilità react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md)

## Conclusioni

ICU MessageFormat ha saputo rispondere a un'esigenza fondamentale: la grammatica appartiene a chi traduce e non a verifiche condizionali come `if (count === 1)` nel codice sorgente. Ha fornito una soluzione eccellente per ambienti in cui il parsing a runtime non comporta costi. Nel browser web, tuttavia, una compatibilità assoluta implica il download di un parser per opzioni che la maggior parte dei progetti non utilizzerà mai, spingendo le stesse librerie ICU a precompilare i messaggi per evitarlo.

JavaScript offre già i meccanismi CLDR con `Intl`. L'unica cosa richiesta a un formato moderno di i18n è una struttura logica di selezione, e tale logica può essere espressa direttamente sotto forma di dati tipizzati.

## Approfondimenti

- [ICU Message Format: sintassi, plurali e select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/icu_message_format.md)
- [Contenuti plurali in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/plurial.md)
- [Contenuti basati su select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/select.md)
- [Benchmark delle librerie i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [next-intl è superato?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_next-intl_outdated.md)
