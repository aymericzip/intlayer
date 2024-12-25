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

> Se il pacchetto `intlayer` è già installato, il cli è installato automaticamente. Puoi saltare questo passaggio.

## intlayer-cli package

Il pacchetto `intlayer-cli` ha l'intento di transpile le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md) in dizionari.

Questo pacchetto transpilerà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Per interpretare i dizionari intlayer, puoi utilizzare interpreti, come [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Supporto File di Configurazione

Intlayer accetta più formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le localizzazioni disponibili, o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esegui i comandi di intlayer

### Costruisci dizionari

Per costruire i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

o in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di contenuto per le dichiarazioni come default in `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

### Spingi i dizionari

```bash
npx intlayer push
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md) è installato, puoi anche spingere i dizionari all'editor. Questo comando permetterà di rendere i dizionari disponibili per [l'editor](https://intlayer.org/dashboard). In questo modo, puoi condividere i tuoi dizionari con il tuo team e modificare i tuoi contenuti senza modificare il codice della tua applicazione.

##### Argomenti:

- `-d`, `--dictionaries`: ids dei dizionari da estrarre. Se non specificato, tutti i dizionari verranno inviati.
  > Esempio: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e rimuovili. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle localizzazioni una volta che i dizionari sono stati inviati, e conservale. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer push -k`

### Estrai dizionari remoti

```bash
npx intlayer pull
```

Se [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md) è installato, puoi anche estrarre i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari per le necessità della tua applicazione.

##### Argomenti:

- `-d, --dictionaries`: Ids dei dizionari da estrarre. Se non specificato, tutti i dizionari verranno estratti.
  > Esempio: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Percorso della directory in cui i nuovi dizionari saranno salvati. Se non specificato, i nuovi dizionari saranno salvati nella directory `./intlayer-dictionaries` del progetto. Se un campo `filePath` è specificato nel contenuto del tuo dizionario, i dizionari non considereranno questo argomento e saranno salvati nella directory `filePath` specificata.

##### Esempio:

```bash
npx intlayer pull --newDictionariesPath ./my-dictionaries-dir/
```

### Audit dizionari

```bash
npx intlayer audit
```

Questo comando analizza i tuoi file di dichiarazione di contenuto per potenziali problemi come traduzioni mancanti, incoerenze strutturali o incompatibilità di tipo. Se trova dei problemi, **intlayer audit** proporrà o applicherà aggiornamenti per mantenere i tuoi dizionari coerenti e completi.

##### Argomenti:

- **`-f, --files [files...]`**  
  Un elenco di specifici file di dichiarazione di contenuto da audire. Se non fornito, tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` scoperti saranno auditati.

- **`--exclude [excludedGlobs...]`**  
  Pattern glob per escludere dall'audit (ad esempio `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Il modello ChatGPT da usare per l'audit (ad esempio, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Fornisci un prompt personalizzato per le istruzioni del tuo audit.

- **`-l, --async-limit [asyncLimit]`**  
  Numero massimo di file da elaborare contemporaneamente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Fornisci la tua chiave API OpenAI per bypassare l'autenticazione OAuth2.

##### Esempio:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Questo comando ignorerà qualsiasi file sotto `tests/**` e utilizzerà il modello `gpt-3.5-turbo` per auditare i file di dichiarazione di contenuto scoperti. Se vengono trovati problemi—come traduzioni mancanti—verranno corretti in loco, preservando la struttura originale del file.

## Usa i comandi di intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:audit": "npx intlayer audit"
}
```
