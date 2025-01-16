# @intlayer/chokidar: Pacchetto NPM per Scansionare e Costruire File di Dichiarazione Intlayer in Dizionari

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/chokidar`** viene utilizzato per scansionare e costruire file di dichiarazione Intlayer in dizionari utilizzando [chokidar](https://github.com/paulmillr/chokidar) e secondo la [configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Utilizzo

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Costruisci i dizionari Intlayer

// O

watch({ persistent: true }); // Modalità di controllo
```

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
