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
    changes: "Aggiunta configurazione globale"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Aggiunta variabile `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione cronologia"
author: aymericzip
---

# Riempi le traduzioni dei file di dichiarazione del contenuto

**L'autofill dei file di dichiarazione del contenuto** nella tua CI è un modo per accelerare il tuo workflow di sviluppo.

## Comprensione del comportamento

Il comando `fill` include due modalità:

- **Complete**: Riempie automaticamente tutti i contenuti mancanti per ogni locale e modifica il file corrente, o un altro file se specificato. In altre parole, la modalità complete salterà la traduzione dei contenuti già esistenti, se già tradotti.
- **Review**: Riempie automaticamente **tutti** i contenuti per ogni locale e genera per un file specifico, o un altro file se specificato.

Il comando will elaborerà tutti i file di dichiarazione del contenuto locale. In altre parole, non elaborerà i tuoi contenuti remoti dal CMS. Il CMS include la propria gestione delle traduzioni.
Se utilizzi plugin come `@intlayer/sync-json-plugin`, Intlayer trasformerà i file JSON in file di dichiarazione del contenuto locale. In altre parole, verranno elaborati dal comando `fill`.

I nuovi file generati includono un'istruzione `filled` come metadati del dizionario. Questa istruzione verrà utilizzata da Intlayer per sapere se il file è stato riempito automaticamente o meno, e saltare questo file dalla traduzione nuovamente se presente.

Intlayer considererà anche le seguenti istruzioni per il riempimento automatico:

- Dal tuo `.content.{ts|js|json}` → istruzione `fill`
- Dal tuo file di configurazione `.intlayer.config.ts` → istruzione `dictionary.fill`
- Verrà impostato su `true` per impostazione predefinita altrimenti

Per i file di dichiarazione del contenuto per locale, l'istruzione `true` verrà sostituita da `./{{fileName}}.fill.content.json`. Questo è perché un file di dichiarazione del contenuto per locale non può ricevere contenuti localizzati aggiuntivi. Quindi genererà un nuovo file per non sovrascrivere il file esistente.

## Comportamento Predefinito

Per impostazione predefinita, `fill` è impostato su `true` a livello globale, il che significa che Intlayer compilerà automaticamente tutti i file di contenuto e modificherà il file stesso. Questo comportamento può essere personalizzato in diversi modi:

### Opzioni di Configurazione Globale

1. **`fill: true` (default)** - Riempie automaticamente tutte le locale e modifica il file corrente
2. **`fill: false`** - Disabilita il riempimento automatico per questo file di contenuto
3. **`fill: "./relative/path/to/file"`** - Crea/aggiorna il file specificato senza modificare quello corrente puntando a un percorso relativo risolto in base alla posizione del file corrente
4. **`fill: "/absolute/path/to/file"`** - Crea/aggiorna il file specificato senza modificare quello corrente puntando a un percorso relativo risolto in base alla posizione della directory base (campo `baseDir` nel file di configurazione `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Crea/aggiorna il file specificato senza modificare quello corrente puntando a un percorso assoluto risolto in base al tuo sistema operativo
6. **`fill: { [key in Locales]?: string }`** - Crea/aggiorna il file specificato per ogni locale

### Modifiche di comportamento in v7

In v7, il comportamento del comando `fill` è stato aggiornato:

- **`fill: true`** - Riscrive il file corrente con il contenuto compilato per tutte le lingue
- **`fill: "path/to/file"`** - Compila il file specificato senza modificare il file corrente
- **`fill: false`** - Disabilita completamente l'auto-compilazione

Quando si utilizza un'opzione di percorso per scrivere in un altro file, il meccanismo di compilazione funziona attraverso una relazione _master-slave_ tra i file di dichiarazione del contenuto. Il file principale (master) funge da fonte di verità, e quando viene aggiornato, Intlayer applicherà automaticamente tali modifiche ai file di dichiarazione derivati (compilati) specificati dal percorso.

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

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
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

## Configurazione Globale

Puoi configurare la configurazione di riempimento automatico globale nel file `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Genera automaticamente le traduzioni mancanti per tutti i dizionari
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // genera automaticamente le traduzioni mancanti per tutti i dizionari come se usassi "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Puoi comunque mettere a punto per singolo dizionario utilizzando il campo `fill` nei file di contenuto. Intlayer considererà prima la configurazione per singolo dizionario e poi ricorrerà alla configurazione globale.

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
