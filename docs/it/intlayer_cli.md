# Intlayer CLI

## Install Package

Installa i pacchetti necessari utilizzando npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Nota: se il pacchetto `intlayer` è già installato, il cli è installato automaticamente. Puoi saltare questo passaggio.

## intlayer-cli package

Il pacchetto `intlayer-cli` ha l'intento di trasporre le tue dichiarazioni di [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md) in dizionari.

Questo pacchetto trasporrà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme.md).

Per interpretare i dizionari intlayer puoi usare interpreti, come [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme.md) o [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme.md)

## Supporto del file di configurazione

Intlayer accetta più formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le lingue disponibili, o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esegui comandi intlayer

### Crea dizionari

Per creare i tuoi dizionari, puoi eseguire i comandi:

```bash
npx intlayer build
```

o in modalità watch

```bash
npx intlayer build --watch
```

Questo comando troverà i tuoi file di contenuto di dichiarazione come predefinito in `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E costruirà i dizionari nella directory `.intlayer`.

### Push dizionari

```bash
npx intlayer push
```

Se l' [editor di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md) è installato, puoi anche inviare i dizionari all'editor. Questo comando renderà i dizionari disponibili per l'editor a [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). In questo modo, puoi condividere i tuoi dizionari con il tuo team ed editare il tuo contenuto senza modificare il codice della tua applicazione.

##### Argomenti:

- `-d`, `--dictionaries`: ids dei dizionari da estrarre. Se non specificato, tutti i dizionari saranno inviati.
  > Esempio: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle lingue una volta che i dizionari sono stati inviati e rimuovili. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Salta la domanda che chiede di eliminare le directory delle lingue una volta che i dizionari sono stati inviati e conservali. Per impostazione predefinita, se il dizionario è definito localmente, sovrascriverà il contenuto dei dizionari remoti.
  > Esempio: `npx intlayer push -k`

### Pull dizionari remoti

```bash
npx intlayer pull
```

Se l' [editor di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/intlayer_editor.md) è installato, puoi anche estrarre i dizionari dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari per le esigenze della tua applicazione.

##### Argomenti:

- `-d, --dictionaries`: Ids dei dizionari da estrarre. Se non specificato, tutti i dizionari saranno estratti.
  > Esempio: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Percorso della directory in cui i nuovi dizionari saranno salvati. Se non specificato, i nuovi dizionari saranno salvati nella directory `./intlayer-dictionaries` del progetto. Se è specificato un campo `filePath` nel contenuto del tuo dizionario, i dizionari non considereranno questo argomento e saranno salvati nella directory `filePath` specificata.
  > Esempio: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Usa i comandi intlayer nel tuo `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
