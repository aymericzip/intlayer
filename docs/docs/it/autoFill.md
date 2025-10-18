---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Compilazione Automatica
description: Scopri come utilizzare la funzionalità di compilazione automatica in Intlayer per popolare automaticamente i contenuti basati su modelli predefiniti. Segui questa documentazione per implementare efficacemente le funzionalità di compilazione automatica nel tuo progetto.
keywords:
  - Compilazione Automatica
  - Automazione dei Contenuti
  - Contenuto Dinamico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: Aggiunta configurazione globale
  - version: 6.0.0
    date: 2025-09-17
    changes: Aggiunta variabile `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione cronologia
---

# Traduzioni dei File di Dichiarazione del Contenuto con Compilazione Automatica

I **file di dichiarazione del contenuto con compilazione automatica** sono un modo per velocizzare il tuo flusso di lavoro di sviluppo.

Il meccanismo di compilazione automatica funziona attraverso una relazione _master-slave_ tra i file di dichiarazione dei contenuti. Quando il file principale (master) viene aggiornato, Intlayer applicherà automaticamente tali modifiche ai file di dichiarazione derivati (compilati automaticamente).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Questo è un esempio di contenuto", // esempio di contenuto
  },
} satisfies Dictionary;

export default exampleContent;
```

Ecco un [file di dichiarazione dei contenuti per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) che utilizza l'istruzione `autoFill`.

Quindi, quando esegui il seguente comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer genererà automaticamente il file di dichiarazione derivato in `src/components/example/example.content.json`, compilando tutte le localizzazioni non già dichiarate nel file principale.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Successivamente, entrambi i file di dichiarazione saranno uniti in un unico dizionario, accessibile tramite il consueto hook `useIntlayer("example")` (react) / composable (vue).

## Formato del File Compilato Automaticamente

Il formato consigliato per i file di dichiarazione compilati automaticamente è **JSON**, che aiuta a evitare vincoli di formattazione. Tuttavia, Intlayer supporta anche i formati `.ts`, `.js`, `.mjs`, `.cjs` e altri.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà il file in:

```
src/components/example/example.filled.content.ts
```

> La generazione dei file `.js`, `.ts` e simili funziona come segue:
>
> - Se il file esiste già, Intlayer lo analizzerà usando l'AST (Abstract Syntax Tree) per individuare ogni campo e inserire eventuali traduzioni mancanti.
> - Se il file non esiste, Intlayer lo genererà utilizzando il modello predefinito di file di dichiarazione del contenuto.

## Percorsi Assoluti

Il campo `autoFill` supporta anche percorsi assoluti.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà il file in:

```
/messages/example.content.json
```

## Generazione Automatica di File di Dichiarazione Contenuti Per Locale

Il campo `autoFill` supporta anche la generazione di file di dichiarazione contenuti **per locale**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà due file separati:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> In questo caso, se l'oggetto non contiene tutte le localizzazioni, Intlayer salta la generazione delle localizzazioni rimanenti.

## Filtrare l'Autocompletamento per Localizzazione Specifica

Usare un oggetto per il campo `autoFill` permette di applicare filtri e generare solo file di localizzazione specifici.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà solo il file di traduzione in francese.

## Variabili di Percorso

Puoi usare variabili all'interno del percorso `autoFill` per risolvere dinamicamente i percorsi di destinazione per i file generati.

**Variabili disponibili:**

- `{{locale}}` – Codice della localizzazione (es. `fr`, `es`)
- `{{fileName}}` – Nome del file (es. `index`)
- `{{key}}` – Chiave del dizionario (es. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Il tuo contenuto
  },
};
```

Questo genererà:

- `./index.content.json`
- `./index.content.json`
