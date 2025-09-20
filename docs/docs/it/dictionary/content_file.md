---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: File di Contenuto
description: Scopri come personalizzare le estensioni per i tuoi file di dichiarazione dei contenuti. Segui questa documentazione per implementare condizioni in modo efficiente nel tuo progetto.
keywords:
  - File di Contenuto
  - Documentazione
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# File di Contenuto

<iframe title="i18n, Markdown, JSON… una soluzione unica per gestire tutto | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Cos'è un File di Contenuto?

Un file di contenuto in Intlayer è un file che contiene definizioni di dizionari.
Questi file dichiarano il contenuto testuale, le traduzioni e le risorse della tua applicazione.
I file di contenuto vengono elaborati da Intlayer per generare dizionari.

I dizionari saranno il risultato finale che la tua applicazione importerà utilizzando l'hook `useIntlayer`.

### Concetti Chiave

#### Dizionario

Un dizionario è una raccolta strutturata di contenuti organizzati per chiavi. Ogni dizionario contiene:

- **Chiave**: Un identificatore univoco per il dizionario
- **Contenuto**: I valori effettivi del contenuto (testo, numeri, oggetti, ecc.)
- **Metadati**: Informazioni aggiuntive come titolo, descrizione, tag, ecc.

#### File di Contenuto

Esempio di file di contenuto:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      it: "Contenuto in inglese",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso del contenuto da annidare
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Esempio di Markdown"),

    /*
     * Disponibile solo usando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Il mio titolo</h1>,
  },
} satisfies Dictionary<Content>; // [opzionale] Dictionary è generico e ti permette di rafforzare il formato del tuo dizionario
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      it: "Contenuto in inglese",
      "en-GB": "Contenuto in inglese (UK)",
      fr: "Contenuto in francese",
      es: "Contenuto in spagnolo",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno uno auto",
      "-1": "Meno uno auto",
      "0": "Nessuna auto",
      "1": "Una auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso al contenuto da annidare
    ),
    markdownContent: md("# Esempio Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponibile solo usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      it: "Contenuto in inglese",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso del contenuto da annidare
    ),
    markdownContent: md("# Esempio Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponibile solo usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Ciao Mondo", // Contenuto stringa
        "numberContent": 123, // Contenuto numero
        "booleanContent": true, // Contenuto booleano
      },
      "imbricatedArray": [1, 2, 3], // Array annidato
    },
    "multilingualContent": {
      "nodeType": "translation", // Tipo nodo: traduzione
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumerazione",
      "enumeration": {
        "0": "Nessuna auto",
        "1": "Un'auto",
        "<-1": "Meno di meno una auto",
        "-1": "Meno una auto",
        ">5": "Alcune auto",
        ">19": "Molte auto",
      },
    },
    "conditionalContent": {
      "nodeType": "condizione",
      "condition": {
        "true": "La validazione è abilitata",
        "false": "La validazione è disabilitata",
      },
    },
    "insertionContent": {
      "nodeType": "inserimento",
      "insertion": "Ciao {{name}}!",
    },
    "nestedContent": {
      "nodeType": "annidato",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Esempio Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Il mio titolo"],
      },
    },
  },
}
```

#### Nodi di Contenuto

I nodi di contenuto sono i mattoni fondamentali del contenuto del dizionario. Possono essere:

- **Valori primitivi**: stringhe, numeri, booleani, null, undefined
- **Nodi tipizzati**: Tipi di contenuto speciali come traduzioni, condizioni, markdown, ecc.
- **Funzioni**: Contenuto dinamico che può essere valutato a runtime [vedi Recupero Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)
- **Contenuto annidato**: Riferimenti ad altri dizionari

#### Tipi di Contenuto

Intlayer supporta vari tipi di contenuto tramite nodi tipizzati:

- **Contenuto di Traduzione**: Testo multilingue con valori specifici per locale [vedi Contenuto di Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation_content.md)
- **Contenuto Condizionale**: Contenuto condizionale basato su espressioni booleane [vedi Contenuto Condizionale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/condition_content.md)
- **Contenuto di Enumerazione**: Contenuto che varia in base a valori enumerati [vedi Contenuto di Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration_content.md)
- **Contenuto di Inserimento**: Contenuto che può essere inserito in altri contenuti [vedi Contenuto di Inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion_content.md)
- **Contenuto Markdown**: Contenuto di testo arricchito in formato Markdown [vedi Contenuto Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown_content.md)
- **Contenuto Annidato**: Riferimenti ad altri dizionari [vedi Contenuto Annidato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nested_content.md)
- **Contenuto di Genere**: Contenuto che varia in base al genere [vedi Contenuto di Genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender_content.md)
- **Contenuto File**: Riferimenti a file esterni [vedi Contenuto File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file_content.md)

## Struttura del Dizionario

Un dizionario in Intlayer è definito dal tipo `Dictionary` e contiene diverse proprietà che ne controllano il comportamento:

### Proprietà Obbligatorie

#### `key` (stringa)

L'identificatore per il dizionario. Se più dizionari hanno la stessa chiave, Intlayer li unirà automaticamente.

> Usa la convenzione di denominazione kebab-case (ad esempio, `"about-page-meta"`).

#### Content (stringa | numero | booleano | oggetto | array | funzione)

La proprietà `content` contiene i dati effettivi del dizionario e supporta:

- **Valori primitivi**: stringhe, numeri, booleani, null, undefined
- **Nodi tipizzati**: Tipi di contenuto speciali usando le funzioni helper di Intlayer
- **Oggetti annidati**: Strutture dati complesse
- **Array**: Collezioni di contenuti
- **Funzioni**: Valutazione dinamica del contenuto

### Proprietà Opzionali

#### `title` (stringa)

Titolo leggibile dall'utente per il dizionario che aiuta a identificarlo negli editor e nei sistemi CMS. Questo è particolarmente utile quando si gestiscono grandi quantità di dizionari o quando si lavora con interfacce di gestione dei contenuti.

**Esempio:**

```typescript
{
  key: "about-page-meta",
  title: "Metadati della pagina About",
  content: { /* ... */ }
}
```

#### `description` (stringa)

Descrizione dettagliata che spiega lo scopo del dizionario, le linee guida per l'uso e qualsiasi considerazione speciale. Questa descrizione viene anche utilizzata come contesto per la generazione di traduzioni assistita da AI, risultando preziosa per mantenere la qualità e la coerenza delle traduzioni.

**Esempio:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Questo dizionario gestisce i metadati della pagina About",
    "Considera le buone pratiche per la SEO:",
    "- Il titolo dovrebbe essere tra 50 e 60 caratteri",
    "- La descrizione dovrebbe essere tra 150 e 160 caratteri",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array di stringhe per categorizzare e organizzare i dizionari. I tag forniscono un contesto aggiuntivo e possono essere utilizzati per filtrare, cercare o organizzare i dizionari negli editor e nei sistemi CMS.

**Esempio:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

Trasforma il dizionario in un dizionario per locale in cui ogni campo dichiarato nel contenuto sarà automaticamente trasformato in un nodo di traduzione. Quando questa proprietà è impostata:

- Il dizionario è trattato come un dizionario a singola lingua
- Ogni campo diventa un nodo di traduzione per quella specifica lingua
- NON dovresti usare nodi di traduzione (`t()`) nel contenuto quando usi questa proprietà
- Se mancante, il dizionario sarà trattato come un dizionario multilingue

> Vedi [Dichiarazione di contenuti per lingua in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) per maggiori informazioni.

**Esempio:**

```json
// Dizionario per lingua
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Questo diventa un nodo di traduzione per 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Istruzioni per il riempimento automatico del contenuto del dizionario da fonti esterne. Questo può essere configurato globalmente in `intlayer.config.ts` o per singolo dizionario. Supporta più formati:

- **`true`**: Abilita il riempimento automatico per tutte le localizzazioni
- **`string`**: Percorso a un singolo file o modello con variabili
- **`object`**: Percorsi file per locale

**Esempi:**

```json
// Abilita per tutte le localizzazioni
{
  "autoFill": true
}
// File singolo
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Modello con variabili
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Configurazione dettagliata per locale
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Variabili disponibili:**

- `{{locale}}` – Codice della localizzazione (es. `fr`, `es`)
- `{{fileName}}` – Nome del file (es. `example`)
- `{{key}}` – Chiave del dizionario (es. `example`)

> Vedi [Configurazione Auto-Fill in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md) per maggiori informazioni.

##### `priority` (numero)

Indica la priorità del dizionario per la risoluzione dei conflitti. Quando più dizionari hanno la stessa chiave, il dizionario con il numero di priorità più alto sovrascriverà gli altri. Questo è utile per gestire gerarchie di contenuti e sovrascritture.

**Esempio:**

```typescript
// Dizionario base
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Benvenuto!" }
}

// Dizionario di override
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Benvenuto nel nostro servizio premium!" }
}
// Questo sovrascriverà il dizionario base
```

### Proprietà CMS

##### `version` (stringa)

Identificatore di versione per dizionari remoti. Aiuta a tracciare quale versione del dizionario è attualmente in uso, particolarmente utile quando si lavora con sistemi di gestione contenuti remoti.

##### `live` (booleano)

Per dizionari remoti, indica se il dizionario deve essere recuperato in tempo reale durante l'esecuzione. Quando abilitato:

- Richiede che `importMode` sia impostato su "live" in `intlayer.config.ts`
- Richiede che un server live sia in esecuzione
- Il dizionario sarà recuperato a runtime usando l'API di sincronizzazione live
- Se è live ma il recupero fallisce, si ricorre al valore dinamico
- Se non è live, il dizionario viene trasformato in fase di build per prestazioni ottimali

### Proprietà di Sistema (Generato automaticamente)

Queste proprietà sono generate automaticamente da Intlayer e non devono essere modificate manualmente:

##### `$schema` (stringa)

Schema JSON utilizzato per la validazione della struttura del dizionario. Aggiunto automaticamente da Intlayer per garantire l'integrità del dizionario.

##### `id` (stringa)

Per i dizionari remoti, questo è l'identificatore univoco del dizionario nel server remoto. Utilizzato per il recupero e la gestione dei contenuti remoti.

##### `localId` (LocalDictionaryId)

Identificatore univoco per i dizionari locali. Generato automaticamente da Intlayer per aiutare a identificare il dizionario e determinare se è locale o remoto, insieme alla sua posizione.

##### `localIds` (LocalDictionaryId[])

Per i dizionari uniti, questo array contiene gli ID di tutti i dizionari che sono stati uniti insieme. Utile per tracciare la fonte del contenuto unito.

##### `filePath` (string)

Il percorso del file del dizionario locale, che indica da quale file `.content` è stato generato il dizionario. Aiuta nel debug e nel tracciamento della fonte.

##### `availableVersions` (string[])

Per i dizionari remoti, questo array contiene tutte le versioni disponibili del dizionario. Aiuta a tracciare quali versioni sono disponibili per l'uso.

##### `autoFilled` (true)

Indica se il dizionario è stato compilato automaticamente da fonti esterne. In caso di conflitti, i dizionari base sovrascriveranno quelli compilati automaticamente.

##### `location` ('distant' | 'locale')

Indica la posizione del dizionario:

- `'locale'`: Dizionario locale (da file di contenuto)
- `'distant'`: Dizionario remoto (da fonte esterna)

## Tipi di Nodi di Contenuto

Intlayer fornisce diversi tipi specializzati di nodi di contenuto che estendono i valori primitivi di base:

### Contenuto di Traduzione (`t`)

Contenuto multilingue che varia in base alla localizzazione:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Contenuto Condizionale (`cond`)

Contenuto che cambia in base a condizioni booleane:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Contenuto Enumerato (`enu`)

Contenuto che varia in base a valori enumerati:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "La tua richiesta è in sospeso",
  approved: "La tua richiesta è stata approvata",
  rejected: "La tua richiesta è stata rifiutata",
});
```

### Contenuto di Inserimento (`insert`)

Contenuto che può essere inserito in altri contenuti:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Questo testo può essere inserito ovunque");
```

### Contenuto Nidificato (`nest`)

Riferimenti ad altri dizionari:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Contenuto Markdown (`md`)

Contenuto di testo ricco in formato Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Benvenuto\n\nQuesto è un testo in **grassetto** con [link](https://example.com)"
);
```

### Contenuto per Genere (`gender`)

Contenuto che varia in base al genere:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Lui è uno sviluppatore",
  female: "Lei è una sviluppatrice",
  other: "Loro sono sviluppatori",
});
```

### Contenuto da File (`file`)

Riferimenti a file esterni:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Creazione di File di Contenuto

### Struttura Base di un File di Contenuto

Un file di contenuto esporta un oggetto di default che soddisfa il tipo `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Contenuto della Pagina di Benvenuto",
  description:
    "Contenuto per la pagina principale di benvenuto, inclusa la sezione hero e le funzionalità",
  tags: ["pagina", "benvenuto", "homepage"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          it: "Facile da Usare",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          it: "Interfaccia intuitiva per tutti i livelli di abilità",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### File di Contenuto JSON

Puoi anche creare file di contenuto in formato JSON:

```json
{
  "key": "welcome-page",
  "title": "Contenuto della Pagina di Benvenuto",
  "description": "Contenuto per la pagina principale di benvenuto",
  "tags": ["pagina", "benvenuto"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Benvenuto sulla nostra piattaforma",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Crea applicazioni straordinarie con facilità",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### File di Contenuto per Locale

Per dizionari per locale, specifica la proprietà `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Benvenuto sulla nostra piattaforma",
      subtitle: "Crea applicazioni straordinarie con facilità",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Estensioni dei File di Contenuto

Intlayer consente di personalizzare le estensioni per i file di dichiarazione del contenuto. Questa personalizzazione offre flessibilità nella gestione di progetti su larga scala e aiuta a evitare conflitti con altri moduli.

### Estensioni Predefinite

Per impostazione predefinita, Intlayer monitora tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Queste estensioni predefinite sono adatte alla maggior parte delle applicazioni. Tuttavia, quando si hanno esigenze specifiche, è possibile definire estensioni personalizzate per semplificare il processo di build e ridurre il rischio di conflitti con altri componenti.

> Per personalizzare le estensioni dei file che Intlayer utilizza per identificare i file di dichiarazione dei contenuti, è possibile specificarle nel file di configurazione di Intlayer. Questo approccio è utile per progetti su larga scala in cui limitare l'ambito del processo di watch migliora le prestazioni della build.

## Concetti Avanzati

### Fusione dei Dizionari

Quando più dizionari hanno la stessa chiave, Intlayer li unisce automaticamente. Il comportamento della fusione dipende da diversi fattori:

- **Priorità**: I dizionari con valori di `priority` più alti sovrascrivono quelli con valori più bassi
- **Auto-fill vs Base**: I dizionari base sovrascrivono i dizionari auto-compilati
- **Posizione**: I dizionari locali sovrascrivono i dizionari remoti (quando le priorità sono uguali)

### Sicurezza dei Tipi

Intlayer fornisce pieno supporto TypeScript per i file di contenuto:

```typescript
// Definisci il tipo del tuo contenuto
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Usalo nel tuo dizionario
export default {
  key: "welcome-page",
  content: {
    // TypeScript fornirà completamento automatico e controllo dei tipi
    hero: {
      title: "Benvenuto",
      subtitle: "Crea app straordinarie",
      cta: "Inizia ora",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Imbricazione di Nodi

Puoi senza problemi imbricare funzioni dentro altre funzioni.

Esempio :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10)` restituisce 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che combina condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10)` restituisce 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Ciao', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che combina condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Ciao", // Saluto in italiano
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "it": "Nessun elemento trovato",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "it": "Un elemento trovato",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "it": "Più elementi trovati",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "Nessun dato valido disponibile",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Best Practices

1. **Convenzioni di denominazione**:
   - Usa il kebab-case per le chiavi del dizionario (`"about-page-meta"`)
   - Raggruppa i contenuti correlati sotto lo stesso prefisso di chiave

2. **Organizzazione dei contenuti**:
   - Mantieni insieme i contenuti correlati nello stesso dizionario
   - Usa oggetti annidati per organizzare strutture di contenuto complesse
   - Sfrutta i tag per la categorizzazione
   - Usa `autoFill` per compilare automaticamente le traduzioni mancanti

3. **Prestazioni**:
   - Regola la configurazione dei contenuti per limitare l'ambito dei file monitorati
   - Usa dizionari live solo quando sono necessari aggiornamenti in tempo reale (ad esempio A/B testing, ecc.)
   - Assicurati che il plugin di trasformazione alla build (`@intlayer/swc` o `@intlayer/babel`) sia abilitato per ottimizzare il dizionario durante la build

## Cronologia della Documentazione

| Versione | Data       | Modifiche                         |
| -------- | ---------- | --------------------------------- |
| 6.0.0    | 2025-09-20 | Aggiunta documentazione dei campi |
| 5.5.10   | 2025-06-29 | Inizio cronologia                 |
