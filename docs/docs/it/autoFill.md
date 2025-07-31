---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Compilazione Automatica
description: Scopri come utilizzare la funzionalità di compilazione automatica in Intlayer per popolare automaticamente i contenuti basati su schemi predefiniti. Segui questa documentazione per implementare efficacemente le funzionalità di compilazione automatica nel tuo progetto.
keywords:
  - Compilazione Automatica
  - Automazione Contenuti
  - Contenuto Dinamico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
---

# Traduzioni dei File di Dichiarazione Contenuti con Compilazione Automatica

**I file di dichiarazione contenuti con compilazione automatica** sono un modo per velocizzare il tuo flusso di lavoro di sviluppo.
Il meccanismo di compilazione automatica funziona attraverso una relazione _master-slave_ tra i file di dichiarazione dei contenuti. Quando il file principale (master) viene aggiornato, Intlayer applicherà automaticamente tali modifiche ai file di dichiarazione derivati (compilati automaticamente).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// Definizione del contenuto di esempio con compilazione automatica abilitata
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Ecco un [file di dichiarazione del contenuto per ogni locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) che utilizza l'istruzione `autoFill`.

Successivamente, quando esegui il seguente comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer genererà automaticamente il file di dichiarazione derivato in `src/components/example/example.content.json`, compilando tutte le localizzazioni non ancora dichiarate nel file principale.

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

Successivamente, entrambi i file di dichiarazione saranno uniti in un unico dizionario, accessibile utilizzando il consueto hook `useIntlayer("example")` (react) / composable (vue).

## Formato del file compilato automaticamente

Il formato consigliato per i file di dichiarazione autofillati è **JSON**, che aiuta a evitare vincoli di formattazione. Tuttavia, Intlayer supporta anche i formati `.ts`, `.js`, `.mjs`, `.cjs` e altri.

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

> La generazione di file `.js`, `.ts` e simili funziona come segue:
>
> - Se il file esiste già, Intlayer lo analizzerà usando l'AST (Abstract Syntax Tree) per individuare ogni campo e inserire eventuali traduzioni mancanti.
> - Se il file non esiste, Intlayer lo genererà utilizzando il modello di file di dichiarazione del contenuto predefinito.

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

## Generazione Automatica di File di Dichiarazione del Contenuto per Locale

Il campo `autoFill` supporta anche la generazione di file di dichiarazione del contenuto **per locale**.

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

## Filtrare l'AutoFill per Locale Specifico

Usare un oggetto per il campo `autoFill` permette di applicare filtri e generare solo i file per i locali specifici.

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

## Variabili nei Percorsi

Puoi usare variabili all'interno del percorso `autoFill` per risolvere dinamicamente i percorsi di destinazione per i file generati.

**Variabili disponibili:**

- `{{locale}}` – Codice della lingua (es. `fr`, `es`)
- `{{key}}` – Chiave del dizionario (es. `example`)

```ts fileName="src/components/example/example.content.ts"
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

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
