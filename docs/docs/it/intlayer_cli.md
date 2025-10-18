---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Scopri come utilizzare la CLI di Intlayer per gestire il tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - CLI
  - Interfaccia a Riga di Comando
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: Aggiornamento della documentazione dei parametri dei comandi CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione della cronologia
---

# CLI di Intlayer

## Installare il Pacchetto

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

Per interpretare i dizionari intlayer puoi utilizzare interpreter, come [react-intlayer](https://www.npmjs.com/package/react-intlayer) o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Supporto ai File di Configurazione

Intlayer accetta diversi formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le lingue disponibili o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Eseguire i comandi di intlayer

### Costruire i dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

oppure in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di dichiarazione del contenuto di default in `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

##### Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Push dei dizionari

```bash
npx intlayer dictionary push
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche inviare i dizionari all'editor. Questo comando permette di rendere i dizionari disponibili a [l'editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i tuoi contenuti senza modificare il codice della tua applicazione.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argomenti:

**Opzioni dizionario:**

- **`-d`, `--dictionaries`**: ID dei dizionari da inviare. Se non specificato, verranno inviati tutti i dizionari.

  > Esempio: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (ad esempio, `development`, `production`). Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.
- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili. Utile nel caso in cui si utilizzino variabili d'ambiente nel file di configurazione di intlayer.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

  > Esempio: `npx intlayer dictionary push --env production`

**Opzioni di output:**

- **`-r`, `--delete-locale-dictionary`**: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le rimuove. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.

  > Esempio: `npx intlayer dictionary push -r`

  > Esempio: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e le mantiene. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.

  > Esempio: `npx intlayer dictionary push -k`

  > Esempio: `npx intlayer dictionary push --keep-locale-dictionary`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug.

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui dizionari che includono modifiche dalla base (default `origin/main`) al ramo corrente (default: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (default `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (default: `HEAD`).
- **`--uncommitted`**: Includi le modifiche non committate.
- **`--unpushed`**: Includi le modifiche non pushate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Scaricare dizionari remoti

```bash
npx intlayer pull
```

Se l'[editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche scaricare i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari in base alle esigenze della tua applicazione.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argomenti:

**Opzioni dizionario:**

- **`-d, --dictionaries`**: Id dei dizionari da scaricare. Se non specificato, verranno scaricati tutti i dizionari.

  > Esempio: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (ad esempio, `development`, `production`).
- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

  > Esempio: `npx intlayer dictionary push --env production`

**Opzioni di output:**

- **`--new-dictionaries-path`**: Percorso della directory in cui verranno salvati i nuovi dizionari. Se non specificato, i nuovi dizionari verranno salvati nella directory `./intlayer-dictionaries` del progetto. Se nel contenuto del dizionario è specificato un campo `filePath`, i dizionari ignoreranno questo argomento e verranno salvati nella directory `filePath` specificata.

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug.

##### Esempio:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Compila / verifica / traduci dizionari

```bash
npx intlayer fill
```

Questo comando analizza i tuoi file di dichiarazione dei contenuti per individuare potenziali problemi come traduzioni mancanti, incoerenze strutturali o discrepanze di tipo. Se rileva problemi, **intlayer fill** proporrà o applicherà aggiornamenti per mantenere i tuoi dizionari coerenti e completi.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argomenti:

**Opzioni per la lista dei file:**

- **`-f, --file [files...]`**: Una lista di file specifici di dichiarazione dei contenuti da controllare. Se non fornito, verranno controllati tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` scoperti in base alla configurazione del tuo file.

  > Esempio: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtra i dizionari in base alle chiavi. Se non specificato, verranno controllati tutti i dizionari.

  > Esempio: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Esclude i dizionari in base alle chiavi. Se non specificato, verranno controllati tutti i dizionari.

  > Esempio: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Filtra i dizionari in base a un pattern glob per i percorsi dei file.

  > Esempio: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opzioni di output delle voci:**

- **`--source-locale [sourceLocale]`**: La locale sorgente da cui tradurre. Se non specificata, verrà utilizzata la locale predefinita dalla tua configurazione.

- **`--output-locales [outputLocales...]`**: Locali di destinazione per la traduzione. Se non specificato, verranno usate tutte le locali della tua configurazione eccetto la locale sorgente.

- **`--mode [mode]`**: Modalità di traduzione: 'complete', 'review' o 'missing-only'. Il valore predefinito è 'missing-only'.

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui dizionari che includono modifiche dalla base (predefinita `origin/main`) al ramo corrente (predefinito: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il diff git (predefinito `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il diff git (predefinito `HEAD`).
- **`--uncommitted`**: Includi le modifiche non commesse.
- **`--unpushed`**: Includi le modifiche non inviate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opzioni AI:**

- **`--model [model]`**: Il modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Il provider AI da utilizzare per la traduzione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornisci la tua chiave API per il servizio AI.
- **`--custom-prompt [prompt]`**: Fornisci un prompt personalizzato per le istruzioni di traduzione.
- **`--application-context [applicationContext]`**: Fornisci un contesto aggiuntivo per la traduzione AI.

  > Esempio: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "La mia applicazione è un negozio di gatti"`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.

  > Esempio: `npx intlayer fill --env-file .env.production.local`

  > Esempio: `npx intlayer fill --env production`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto.

  > Esempio: `npx intlayer fill --base-dir ./src`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug.

##### Esempio:

Questo comando tradurrà il contenuto dall'inglese al francese e allo spagnolo per tutti i file di dichiarazione del contenuto nella directory `src/home/` utilizzando il modello GPT-3.5 Turbo.

### Gestire la Configurazione

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
- **`--env-file`**: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--verbose`**: Abilita il logging dettagliato per il debug.

#### Push Configuration

Il comando `configuration push` carica la tua configurazione nel CMS e nell'editor di Intlayer. Questo passaggio è necessario per abilitare l'uso di dizionari remoti nell'Editor Visivo di Intlayer.

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

Spingendo la configurazione, il tuo progetto è completamente integrato con l'Intlayer CMS, consentendo una gestione fluida dei dizionari tra i team.

### Gestione della Documentazione

I comandi `doc` forniscono strumenti per gestire e tradurre i file di documentazione in più localizzazioni.

#### Traduci Documentazione

Il comando `doc translate` traduce automaticamente i file di documentazione da una localizzazione base a localizzazioni target utilizzando servizi di traduzione AI.

```bash
npx intlayer doc translate
```

##### Argomenti:

**Opzioni per la lista dei file:**

- **`--doc-pattern [docPattern...]`**: Pattern glob per selezionare i file di documentazione da tradurre.

  > Esempio: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pattern glob da escludere dalla traduzione.

  > Esempio: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Salta il file se è stato modificato prima del tempo indicato.

  - Può essere un tempo assoluto come "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Salta il file se è stato modificato entro il tempo indicato.

  - Può essere un orario assoluto come "2025-12-05" (stringa o Date)
  - Può essere un orario relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla l'orario di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Opzioni di output dell'entry:**

- **`--locales [locales...]`**: Locali di destinazione per tradurre la documentazione.

  > Esempio: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale sorgente da cui tradurre.

  > Esempio: `npx intlayer doc translate --base-locale en`

**Opzioni di elaborazione dei file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Numero di file da elaborare simultaneamente per la traduzione.

  > Esempio: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opzioni AI:**

- **`--model [model]`**: Il modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Il provider AI da utilizzare per la traduzione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornisci la tua chiave API per il servizio AI.
- **`--application-context [applicationContext]`**: Fornisci un contesto aggiuntivo per la traduzione AI.
- **`--custom-prompt [prompt]`**: Personalizza il prompt base utilizzato per la traduzione. (Nota: per la maggior parte dei casi d'uso, è consigliato utilizzare l'opzione `--custom-instructions` in quanto offre un controllo migliore sul comportamento della traduzione.)

  > Esempio: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "La mia applicazione è un negozio di gatti"`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.

  > Esempio: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug.

  > Esempio: `npx intlayer doc translate --verbose`

**Opzioni per istruzioni personalizzate:**

- **`--custom-instructions [customInstructions]`**: Istruzioni personalizzate aggiunte al prompt. Utile per applicare regole specifiche riguardanti la formattazione, la traduzione degli URL, ecc.

  - Può essere un tempo assoluto come "2025-12-05" (stringa o Data)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --custom-instructions "Evita di tradurre gli URL e mantieni il formato markdown"`

  > Esempio: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui dizionari che includono modifiche dalla base (default `origin/main`) al ramo corrente (default: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (default `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (default: `HEAD`).
- **`--uncommitted`**: Includi le modifiche non committate.
- **`--unpushed`**: Includi le modifiche non pushate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Nota che il percorso del file di output sarà determinato sostituendo i seguenti pattern
>
> - `/{{baseLocale}}/` con `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` con `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` con `_{{locale}}.`
> - `{{baseLocale}}_` con `{{locale}}_`
> - `.{{baseLocaleName}}.` con `.{{localeName}}.`
>
> Se il modello non viene trovato, il file di output aggiungerà `.{{locale}}` all'estensione del file. `./my/file.md` sarà tradotto in `./my/file.fr.md` per la lingua francese.

#### Revisione della Documentazione

Il comando `doc review` analizza i file di documentazione per qualità, coerenza e completezza tra le diverse localizzazioni.

```bash
npx intlayer doc review
```

Può essere utilizzato per revisionare file già tradotti e per verificare se la traduzione è corretta.

Per la maggior parte dei casi,

- preferisci usare il comando `doc translate` quando la versione tradotta di questo file non è disponibile.
- preferisci usare il comando `doc review` quando la versione tradotta di questo file esiste già.

> Nota che il processo di revisione consuma più token di input rispetto al processo di traduzione per revisionare completamente lo stesso file. Tuttavia, il processo di revisione ottimizzerà i chunk da revisionare e salterà le parti che non sono state modificate.

##### Argomenti:

Il comando `doc review` accetta gli stessi argomenti di `doc translate`, permettendoti di revisionare file di documentazione specifici e applicare controlli di qualità.

Se hai attivato una delle opzioni git, il comando esaminerà solo la parte dei file che viene modificata. Lo script elaborerà il file suddividendolo in chunk e revisionerà ogni chunk. Se non ci sono modifiche nel chunk, lo script lo salterà per velocizzare il processo di revisione e limitare il costo dell'API del fornitore AI.

## Usa i comandi intlayer nel tuo `package.json`

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

## CLI SDK

Il CLI SDK è una libreria che ti permette di utilizzare il CLI di Intlayer nel tuo codice.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

## Debug del comando intlayer

### 1. **Assicurati di utilizzare l'ultima versione**

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
