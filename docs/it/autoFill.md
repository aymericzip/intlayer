# File di Dichiarazione dei Contenuti Autocompletati

I **file di dichiarazione dei contenuti autocompletati** sono un modo per accelerare il flusso di lavoro di sviluppo.

Il meccanismo di autocompletamento funziona attraverso una relazione _master-slave_ tra i file di dichiarazione dei contenuti. Quando il file principale (master) viene aggiornato, Intlayer applicherà automaticamente queste modifiche ai file di dichiarazione derivati (autocompletati).

```ts filePath="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

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

Ecco un [file di dichiarazione dei contenuti per lingua](https://github.com/aymericzip/intlayer/blob/main/docs/it/per_locale_file.md) che utilizza l'istruzione `autoFill`.

Quindi, quando esegui il seguente comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer genererà automaticamente il file di dichiarazione derivato in `src/components/example/example.content.json`, completando tutte le lingue non ancora dichiarate nel file principale.

```json5 filePath="src/components/example/example.content.json"
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

Successivamente, entrambi i file di dichiarazione verranno uniti in un unico dizionario, accessibile utilizzando l'hook standard `useIntlayer("example")` (react) / composable (vue).

## Formato dei File Autocompletati

Il formato consigliato per i file di dichiarazione autocompletati è **JSON**, che aiuta a evitare vincoli di formattazione. Tuttavia, Intlayer supporta anche i formati `.ts`, `.js`, `.mjs`, `.cjs` e altri.

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Il tuo contenuto
  },
};

export default exampleContent;
```

Questo genererà il file in:

```
src/components/example/example.filled.content.ts
```

> La generazione di file `.js`, `.ts` e simili funziona come segue:
>
> - Se il file esiste già, Intlayer lo analizzerà utilizzando l'AST (Abstract Syntax Tree) per individuare ogni campo e inserire le traduzioni mancanti.
> - Se il file non esiste, Intlayer lo genererà utilizzando il modello predefinito per i file di dichiarazione dei contenuti.

## Percorsi Assoluti

Il campo `autoFill` supporta anche i percorsi assoluti.

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Il tuo contenuto
  },
};

export default exampleContent;
```

Questo genererà il file in:

```
/messages/example.content.json
```

## Generazione Automatica di File di Dichiarazione dei Contenuti per Lingua

Il campo `autoFill` supporta anche la generazione di file di dichiarazione dei contenuti **per lingua**.

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

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

export default exampleContent;
```

Questo genererà due file separati:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Filtrare l'Autocompletamento per Lingua Specifica

L'utilizzo di un oggetto per il campo `autoFill` ti consente di applicare filtri e generare solo file di lingua specifici.

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Il tuo contenuto
  },
};

export default exampleContent;
```

Questo genererà solo il file di traduzione francese.

## Variabili di Percorso

Puoi utilizzare variabili all'interno del percorso `autoFill` per risolvere dinamicamente i percorsi di destinazione per i file generati.

**Variabili disponibili:**

- `{{locale}}` – Codice lingua (es. `fr`, `es`)
- `{{key}}` – Chiave del dizionario (es. `example`)

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Il tuo contenuto
  },
};

export default exampleContent;
```

Questo genererà:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
