---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Monitoraggio file per l'i18n di Intlayer
description: Pacchetto NPM che fornisce funzionalità di monitoraggio file per Intlayer, abilitando aggiornamenti automatici e hot reload per i contenuti di internazionalizzazione.
keywords:
  - intlayer
  - chokidar
  - monitoraggio file
  - hot reload
  - i18n
  - JavaScript
  - NPM
  - sviluppo
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: Pacchetto NPM per scansionare e costruire file di dichiarazione Intlayer in dizionari

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/chokidar`** viene utilizzato per scansionare e costruire i file di dichiarazione Intlayer in dizionari utilizzando [chokidar](https://github.com/paulmillr/chokidar) e secondo la [configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Costruisci i dizionari di Intlayer

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

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Storia iniziale
