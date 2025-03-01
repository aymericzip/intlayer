# Intlayer CLI

## Install Package

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Se il pacchetto `intlayer` è già installato, la CLI viene installata automaticamente. Puoi saltare questo passaggio.

## Pacchetto intlayer-cli

Il pacchetto `intlayer-cli` ha lo scopo di trasporre le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md) in dizionari.

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

Per vedere come configurare le lingue disponibili o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esegui comandi intlayer

### Costruisci dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

o in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di dichiarazione dei contenuti come predefinito `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

### Carica dizionari

```bash
npx intlayer dictionary push
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) è installato, puoi anche caricare i dizionari nell'editor. Questo comando renderà i dizionari disponibili per [l'editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i tuoi contenuti senza modificare il codice della tua applicazione.

##### Argomenti:

- `-d`, `--dictionaries`: ID dei dizionari da caricare. Se non specificato, tutti i dizionari verranno caricati.
  > Esempio: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle lingue una volta che i dizionari sono stati caricati e rimuovili. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle lingue una volta che i dizionari sono stati caricati e conservali. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer dictionary push -k`

### Scarica dizionari remoti

```bash
npx intlayer dictionary pull
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) è installato, puoi anche scaricare i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari per le esigenze della tua applicazione.

##### Argomenti:

- `-d, --dictionaries`: ID dei dizionari da scaricare. Se non specificato, tutti i dizionari verranno scaricati.
  > Esempio: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Percorso della directory in cui verranno salvati i nuovi dizionari. Se non specificato, i nuovi dizionari verranno salvati nella directory `./intlayer-dictionaries` del progetto. Se un campo `filePath` è specificato nel contenuto del dizionario, i dizionari non considereranno questo argomento e verranno salvati nella directory specificata in `filePath`.

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
  Un elenco di file di dichiarazione dei contenuti specifici da analizzare. Se non fornito, verranno analizzati tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` scoperti.

- **`--exclude [excludedGlobs...]`**  
  Modelli glob per escludere dall'analisi (ad esempio `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Il modello ChatGPT da utilizzare per l'analisi (ad esempio, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Fornisci un prompt personalizzato per le istruzioni di analisi.

- **`-l, --async-limit [asyncLimit]`**  
  Numero massimo di file da elaborare contemporaneamente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Fornisci la tua chiave API OpenAI per bypassare l'autenticazione OAuth2.

##### Esempio:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Questo comando ignorerà tutti i file sotto `tests/**` e utilizzerà il modello `gpt-3.5-turbo` per analizzare i file di dichiarazione dei contenuti scoperti. Se vengono trovati problemi, come traduzioni mancanti, verranno corretti in loco, preservando la struttura originale del file.

### Gestisci configurazione

#### Ottieni configurazione

Il comando `get configuration` recupera la configurazione corrente per Intlayer, in particolare le impostazioni delle lingue. Questo è utile per verificare la tua configurazione.

```bash
npx intlayer config get
```

##### Argomenti:

- **`--env`**: Specifica l'ambiente (ad esempio, `development`, `production`).
- **`--env-file`**: Fornisci un file di ambiente personalizzato da cui caricare le variabili.
- **`--verbose`**: Abilita il logging dettagliato per il debug.

#### Carica configurazione

Il comando `push configuration` carica la tua configurazione nel CMS e nell'editor di Intlayer. Questo passaggio è necessario per abilitare l'uso di dizionari remoti nell'Intlayer Visual Editor.

```bash
npx intlayer config push
```

##### Argomenti:

- **`--env`**: Specifica l'ambiente (ad esempio, `development`, `production`).
- **`--env-file`**: Fornisci un file di ambiente personalizzato da cui caricare le variabili.
- **`--verbose`**: Abilita il logging dettagliato per il debug.

Caricando la configurazione, il tuo progetto è completamente integrato con il CMS di Intlayer, consentendo una gestione fluida dei dizionari tra i team.

## Usa i comandi intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
