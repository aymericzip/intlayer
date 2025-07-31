---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Plugin Webpack per Intlayer i18n
description: Pacchetto NPM che fornisce configurazione e plugin Webpack per un'integrazione fluida dell'internazionalizzazione Intlayer con applicazioni basate su Webpack.
keywords:
  - intlayer
  - webpack
  - plugin
  - configurazione
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: Pacchetto NPM per utilizzare il Plugin Webpack di Intlayer nella tua applicazione

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/webpack`** viene utilizzato per fornire una configurazione Webpack che facilita l'uso di un'applicazione basata su Webpack con Intlayer. Il pacchetto fornisce anche un plugin da aggiungere a un'applicazione Webpack esistente.

## Utilizzo

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Opzioni
    }),
  ],
};
```

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Storia iniziale
