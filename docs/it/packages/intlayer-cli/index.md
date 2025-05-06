# intlayer-cli: Pacchetto NPM per utilizzare l'Intlayer CLI

**Intlayer** è una suite di pacchetti progettata specificamente per gli sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`intlayer-cli`** è un pacchetto NPM che utilizza il pacchetto `@intlayer/cli` e lo rende disponibile per le interfacce a riga di comando `intlayer`.

> Nota che questo pacchetto non è necessario se il pacchetto [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer/index.md) è installato. Rispetto al pacchetto `intlayer`, il pacchetto `intlayer-cli` è un pacchetto più leggero che contiene solo lo strumento CLI, senza dipendenze da `@intlayer/core`.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Utilizzo

Ecco un esempio di come utilizzare il pacchetto `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Comandi CLI

Intlayer fornisce uno strumento CLI per:

- verificare le dichiarazioni dei contenuti e completare le traduzioni mancanti
- costruire dizionari dalle dichiarazioni dei contenuti
- inviare e ricevere dizionari remoti dal tuo CMS al tuo progetto locale

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md) per maggiori informazioni.
