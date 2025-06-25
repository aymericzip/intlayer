# @intlayer/chokidar: Pacchetto NPM per scansionare e costruire file di dichiarazione Intlayer in dizionari

**Intlayer** è una suite di pacchetti progettata specificamente per gli sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/chokidar`** viene utilizzato per scansionare e costruire file di dichiarazione Intlayer in dizionari utilizzando [chokidar](https://github.com/paulmillr/chokidar) e secondo la [configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Costruisce i dizionari Intlayer

watch({ persistent: true }); // Monitora le modifiche nei file di configurazione
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
