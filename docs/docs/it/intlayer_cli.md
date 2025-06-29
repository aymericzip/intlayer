---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Scopri come utilizzare l'Intlayer CLI per gestire il tuo sito web multilingue. Segui i passi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - CLI
  - Interfaccia a Riga di Comando
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## Install Package

Installa i pacchetti necessari utilizzando npm:

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

Il pacchetto `intlayer-cli` ha lo scopo di trasporre le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md) in dizionari.

Questo pacchetto trasporrà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Scopri come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Per interpretare i dizionari intlayer puoi utilizzare interpreti, come [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Supporto per file di configurazione

Intlayer accetta diversi formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le lingue disponibili o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Esegui comandi intlayer

### Costruisci dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer dictionaries build
```

o in modalità watch

```bash
npx intlayer dictionaries build --watch
```

Questo comando troverà i tuoi file di dichiarazione dei contenuti come predefinito `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

### Carica dizionari

```bash
npx intlayer dictionary push
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche caricare i dizionari nell'editor. Questo comando renderà i dizionari disponibili per [l'editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i tuoi contenuti senza modificare il codice della tua applicazione.

##### Argomenti:

- `-d`, `--dictionaries`: ID dei dizionari da caricare. Se non specificato, tutti i dizionari verranno caricati.
  > Esempio: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Ignora la domanda che chiede di eliminare le directory delle locali dopo l'invio dei dizionari e le elimina. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Ignora la domanda che chiede di eliminare le directory delle locali dopo l'invio dei dizionari e le mantiene. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -k`
- `--env`: Specifica l'ambiente (es. `development`, `production`).
- `--env-file`: Fornisci un file di ambiente personalizzato per caricare le variabili.
- `--base-dir`: Specifica la directory base del progetto.
- `--verbose`: Abilita la registrazione dettagliata per il debug.
- `--git-diff`: Esegui solo sui dizionari con modifiche non inviate.
- `--git-diff-base`: Specifica il riferimento base per git diff.
- `--git-diff-current`: Specifica il riferimento corrente per git diff.
- `--uncommitted`: Includi modifiche non committate.
- `--unpushed`: Includi modifiche non inviate.
- `--untracked`: Includi file non tracciati.

### Scarica dizionari remoti

```bash
npx intlayer dictionary pull
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche scaricare i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari per le esigenze della tua applicazione.

##### Argomenti:

- `-d, --dictionaries`: ID dei dizionari da scaricare. Se non specificato, tutti i dizionari verranno scaricati.
  > Esempio: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Percorso alla directory dove verranno salvati i nuovi dizionari. Se non specificato, i nuovi dizionari verranno salvati nella directory `./intlayer-dictionaries` del progetto. Se un campo `filePath` è specificato nel contenuto del tuo dizionario, i dizionari non considereranno questo argomento e verranno salvati nella directory specificata da `filePath`.
- `--env`: Specifica l'ambiente (es. `development`, `production`).
- `--env-file`: Fornisci un file di ambiente personalizzato per caricare le variabili.
- `--base-dir`: Specifica la directory base del progetto.
- `--verbose`: Abilita la registrazione dettagliata per il debug.

##### Esempio:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Analizza dizionari

```bash
npx intlayer audit
```

Questo comando analizza i tuoi file di dichiarazione dei contenuti per potenziali problemi come traduzioni mancanti, incoerenze strutturali o discrepanze di tipo. Se trova problemi, **intlayer audit** proporrà o applicherà aggiornamenti per mantenere i tuoi dizionari coerenti e completi.

##### Argomenti:

- **`-f, --files [files...]`**  
  Una lista di file di dichiarazione del contenuto specifici da verificare. Se non fornito, tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` scoperti verranno verificati.

- **`--exclude [excludedGlobs...]`**  
  Pattern glob da escludere dalla verifica (es. `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  La localizzazione sorgente da cui tradurre. Se non specificata, verrà utilizzata la localizzazione predefinita dalla tua configurazione.

- **`--output-locales [outputLocales...]`**  
  Localizzazioni target in cui tradurre. Se non specificate, verranno utilizzate tutte le localizzazioni dalla tua configurazione tranne la localizzazione sorgente.

- **`--mode [mode]`**  
  Modalità di traduzione: 'complete', 'review', o 'missing-only'. Predefinito è 'missing-only'.

- **`--git-diff`**  
  Esegui solo sui dizionari con modifiche non inviate nel repository git.

- **`--git-diff-base`**  
  Specifica il riferimento base per git diff.

- **`--git-diff-current`**  
  Specifica il riferimento corrente per git diff.

- **`--uncommitted`**  
  Includi modifiche non committate.

- **`--unpushed`**  
  Includi modifiche non inviate.

- **`--untracked`**  
  Includi file non tracciati.

- **`--keys [keys...]`**  
  Filtra i dizionari in base alle chiavi specificate.

- **`--excluded-keys [excludedKeys...]`**  
  Escludi i dizionari in base alle chiavi specificate.

- **`--path-filter [pathFilters...]`**  
  Filtra i dizionari in base al pattern glob per i percorsi dei file.

- **`--model [model]`**  
  Il modello di IA da utilizzare per la traduzione (es. `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  Il fornitore di IA da utilizzare per la traduzione.

- **`--temperature [temperature]`**  
  Impostazione della temperatura per il modello di IA.

- **`--api-key [apiKey]`**  
  Fornisci la tua chiave API per il servizio di IA.

- **`--custom-prompt [prompt]`**  
  Fornisci un prompt personalizzato per le tue istruzioni di traduzione.

- **`--application-context [applicationContext]`**  
  Fornisci un contesto aggiuntivo per la traduzione IA.

- **`--env`**  
  Specifica l'ambiente (es. `development`, `production`).

- **`--env-file [envFile]`**  
  Fornisci un file di ambiente personalizzato per caricare le variabili.

- **`--base-dir`**  
  Specifica la directory base del progetto.

- **`--verbose`**  
  Abilita la registrazione dettagliata per il debug.

##### Esempio:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Questo comando tradurrà il contenuto dall'inglese al francese e allo spagnolo per tutti i file di dichiarazione del contenuto nella directory `src/home/` utilizzando il modello GPT-3.5 Turbo.

### Gestisci configurazione

#### Ottieni configurazione

Il comando `get configuration` recupera la configurazione attuale per Intlayer, in particolare le impostazioni di localizzazione. Questo è utile per verificare la tua configurazione.

```bash
npx intlayer config get
```

##### Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisci un file di ambiente personalizzato per caricare le variabili.
- **`--base-dir`**: Specifica la directory base del progetto.
- **`--verbose`**: Abilita la registrazione dettagliata per il debug.

#### Carica configurazione

Il comando `push configuration` carica la tua configurazione nel CMS e nell'editor di Intlayer. Questo passaggio è necessario per abilitare l'uso di dizionari remoti nell'editor visivo di Intlayer.

```bash
npx intlayer config push
```

##### Argomenti:

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisci un file di ambiente personalizzato per caricare le variabili.
- **`--base-dir`**: Specifica la directory base del progetto.
- **`--verbose`**: Abilita la registrazione dettagliata per il debug.

Caricando la configurazione, il tuo progetto è completamente integrato con il CMS di Intlayer, consentendo una gestione fluida dei dizionari tra i team.

## Usa i comandi intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## Debug del comando intlayer

### 1. **Assicurati di utilizzare l'ultima versione**

Esegui:

```bash
npx intlayer --version                  # versione locale attuale di intlayer
npx intlayer@latest --version          # ultima versione di intlayer
```

### 2. **Verifica se il comando è registrato**

Puoi verificare con:

```bash
npx intlayer --help      # Mostra un elenco dei comandi disponibili e le informazioni sull'utilizzo
```

### 3. **Riavvia il terminale**

A volte è necessario riavviare il terminale per riconoscere i nuovi comandi.

### 4. **Cancella la cache di npx (se sei bloccato con una versione precedente)**

```bash
npx clear-npx-cache
```
