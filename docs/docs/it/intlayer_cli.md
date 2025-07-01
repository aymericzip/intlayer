---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Scopri come utilizzare la CLI di Intlayer per gestire il tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - CLI
  - Interfaccia a riga di comando
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# CLI di Intlayer

## Installare il pacchetto

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Se il pacchetto `intlayer` è già installato, la CLI viene installata automaticamente. Puoi saltare questo passaggio.

## Pacchetto intlayer-cli

Il pacchetto `intlayer-cli` ha lo scopo di trascrivere le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md) in dizionari.

Questo pacchetto trascriverà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Per interpretare i dizionari intlayer puoi usare interpreter, come [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Supporto per file di configurazione

Intlayer accetta diversi formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le localizzazioni disponibili, o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## CLI SDK

Il CLI SDK è una libreria che ti permette di usare il CLI di Intlayer nel tuo codice.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

Esempio di utilizzo:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Esegui i comandi di intlayer

### Costruisci i dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

oppure in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di contenuto di dichiarazione di default in `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

##### Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Push dei dizionari

```bash
npx intlayer dictionary push
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche inviare i dizionari all'editor. Questo comando permetterà di rendere i dizionari disponibili a [l'editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i tuoi contenuti senza modificare il codice della tua applicazione.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argomenti:

- `-d`, `--dictionaries`: ID dei dizionari da inviare. Se non specificato, tutti i dizionari saranno inviati.
  > Esempio: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le rimuove. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le mantiene. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -k`
- `--env`: Specifica l'ambiente (es. `development`, `production`).
- `--env-file`: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- `--base-dir`: Specifica la directory base per il progetto.
- `--verbose`: Abilita il logging dettagliato per il debug.
- `--git-diff`: Esegui solo sui dizionari che includono modifiche dalla base (default `origin/main`) al branch corrente (default: `HEAD`).
- `--git-diff-base`: Specifica il riferimento base per il git diff (default `origin/main`).
- `--git-diff-current`: Specifica il riferimento corrente per il git diff (default `HEAD`).
- `--uncommitted`: Includi le modifiche non committate.
- `--unpushed`: Includi le modifiche non pushate.
- `--untracked`: Includi i file non tracciati.

### Scaricare dizionari remoti

```bash
npx intlayer pull
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche scaricare i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari in base alle esigenze della tua applicazione.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argomenti:

- `-d, --dictionaries`: ID dei dizionari da scaricare. Se non specificato, verranno scaricati tutti i dizionari.
  > Esempio: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Percorso della directory in cui verranno salvati i nuovi dizionari. Se non specificato, i nuovi dizionari verranno salvati nella directory `./intlayer-dictionaries` del progetto. Se nel contenuto del dizionario è specificato un campo `filePath`, i dizionari non considereranno questo argomento e verranno salvati nella directory `filePath` specificata.
- `--env`: Specifica l'ambiente (ad esempio, `development`, `production`).
- `--env-file`: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- `--base-dir`: Specifica la directory base per il progetto.
- `--verbose`: Abilita il logging dettagliato per il debug.

##### Esempio:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Riempire / controllare / tradurre dizionari

```bash
npx intlayer fill
```

Questo comando analizza i tuoi file di dichiarazione dei contenuti per potenziali problemi come traduzioni mancanti, incoerenze strutturali o discrepanze di tipo. Se rileva problemi, **intlayer fill** proporrà o applicherà aggiornamenti per mantenere i tuoi dizionari coerenti e completi.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argomenti:

- `-f, --file [files...]`
  Una lista di file specifici di dichiarazione dei contenuti da controllare. Se non fornita, verranno controllati tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` trovati.

- `--exclude [excludedGlobs...]`
  Pattern glob da escludere dal controllo (es. `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  La locale di origine da cui tradurre. Se non specificata, verrà utilizzata la locale predefinita dalla tua configurazione.

- `--output-locales [outputLocales...]`
  Locali di destinazione in cui tradurre. Se non specificate, verranno utilizzate tutte le locali dalla tua configurazione eccetto la locale di origine.

- `--mode [mode]`
  Modalità di traduzione: 'complete', 'review' o 'missing-only'. Il valore predefinito è 'missing-only'.

- `--git-diff`
  Filtra i dizionari che includono modifiche dalla base (predefinita `origin/main`) al ramo corrente (predefinito: `HEAD`).

- `--git-diff-base`
  Specifica il riferimento base per il git diff (predefinito `origin/main`).

- `--git-diff-current`
  Specifica il riferimento corrente per il git diff (predefinito `HEAD`).

- `--uncommitted`
  Filtra i dizionari che includono modifiche non committate.

- `--unpushed`
- Filtra i dizionari che includono modifiche non inviate.

- `--untracked`
  Filtra i dizionari che includono file non tracciati.

- `--keys [keys...]`
  Filtra i dizionari in base alle chiavi specificate.

- `--excluded-keys [excludedKeys...]`
  Esclude i dizionari in base alle chiavi specificate.

- `--path-filter [pathFilters...]`
  Filtra i dizionari in base a un pattern glob per i percorsi dei file.

- `--model [model]`
  Il modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).

- `--provider [provider]`
  Il provider AI da utilizzare per la traduzione.

- `--temperature [temperature]`
  Impostazione della temperatura per il modello AI.

- `--api-key [apiKey]`
  Fornisci la tua chiave API per il servizio AI.

- `--custom-prompt [prompt]`
  Fornisci un prompt personalizzato per le istruzioni di traduzione.
- `--application-context [applicationContext]`
  Fornisce un contesto aggiuntivo per la traduzione AI.

- `--env`
  Specifica l'ambiente (es. `development`, `production`).

- `--env-file [envFile]`
  Fornisce un file ambiente personalizzato da cui caricare le variabili.

- `--base-dir`
  Specifica la directory base per il progetto.

- `--verbose`
  Abilita il logging dettagliato per il debug.

##### Esempio:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Questo comando tradurrà il contenuto dall'inglese al francese e spagnolo per tutti i file di dichiarazione contenuti nella directory `src/home/` utilizzando il modello GPT-3.5 Turbo.

### Gestione della Configurazione

#### Ottenere la Configurazione

Il comando `configuration get` recupera la configurazione corrente per Intlayer, in particolare le impostazioni della localizzazione. Questo è utile per verificare la tua configurazione.

```bash
npx intlayer configuration get
```

##### Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--verbose`**: Abilita il logging dettagliato per il debug.

#### Push Configuration

Il comando `configuration push` carica la tua configurazione nel CMS e nell'editor di Intlayer. Questo passaggio è necessario per abilitare l'uso di dizionari remoti nell'Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

##### Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--verbose`**: Abilita il logging dettagliato per il debug.

Effettuando il push della configurazione, il tuo progetto sarà completamente integrato con Intlayer CMS, permettendo una gestione fluida del dizionario tra i team.

### Gestione della Documentazione

I comandi `doc` offrono strumenti per gestire e tradurre i file di documentazione in più localizzazioni.

#### Traduci Documentazione

Il comando `doc translate` traduce automaticamente i file di documentazione da una locale base a locali di destinazione utilizzando servizi di traduzione AI.

```bash
npx intlayer doc translate
```

##### Argomenti:

- **`--doc-pattern [docPattern...]`**: Pattern glob per selezionare i file di documentazione da tradurre.
  > Esempio: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pattern glob da escludere dalla traduzione.
  > Esempio: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Numero di file da processare simultaneamente per la traduzione.
  > Esempio: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: Locali di destinazione per tradurre la documentazione.
  > Esempio: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: Locale di origine da cui tradurre.
  > Esempio: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: Modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Provider AI da utilizzare per la traduzione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornire la propria chiave API per il servizio AI.
- **`--custom-prompt [prompt]`**: Fornire un prompt personalizzato per le istruzioni di traduzione.
- **`--application-context [applicationContext]`**: Fornire un contesto aggiuntivo per la traduzione AI.
- **`--env`**: Specificare l'ambiente (ad esempio, `development`, `production`).
- **`--env-file [envFile]`**: Fornire un file di ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specificare la directory base per il progetto.
- **`--verbose`**: Abilitare il logging dettagliato per il debug.
- **`--custom-instructions [customInstructions]`**: Istruzioni personalizzate aggiunte al prompt. Utile per applicare regole specifiche riguardanti il formato, la traduzione degli URL, ecc.

##### Esempio:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Nota che il percorso del file di output sarà determinato sostituendo i seguenti pattern
>
> - `/{{baseLocale}}/` con `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` con `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` con `_{{locale}}.`
> - `{{baseLocale}}_` con `{{locale}}_`
> - `.{{baseLocaleName}}.` con `.{{localeName}}.`
>
> Se il modello non viene trovato, il file di output aggiungerà `.{{locale}}` all'estensione del file. `./my/file.md` sarà tradotto in `./my/file.it.md` per la localizzazione italiana.

#### Revisione della Documentazione

Il comando `doc review` analizza i file di documentazione per qualità, coerenza e completezza tra le diverse localizzazioni.

```bash
npx intlayer doc review
```

##### Argomenti:

Il comando `doc review` accetta gli stessi argomenti di `doc translate`, permettendoti di revisionare file di documentazione specifici e applicare controlli di qualità.

##### Esempio:

```bash
npx intlayer doc review
 --doc-pattern "docs/en/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Usa i comandi di intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## Debug del comando intlayer

### 1. **Assicurati di usare l'ultima versione**

Esegui:

```bash
npx intlayer --version                  # versione intlayer locale corrente
npx intlayer@latest --version           # versione intlayer più recente disponibile
```

### 2. **Verifica se il comando è registrato**

Puoi verificare con:

```bash
npx intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
npx intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

### 3. **Riavvia il terminale**

A volte è necessario riavviare il terminale per riconoscere i nuovi comandi.

### 4. **Pulisci la cache di npx (se sei bloccato su una versione precedente)**

```bash
npx clear-npx-cache
```

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
