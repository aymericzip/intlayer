---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Documentazione del pacchetto | lynx-intlayer
description: Scopri come utilizzare il pacchetto lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer: Internazionalizza (i18n) un'applicazione Lynx

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `lynx-intlayer`** ti permette di internazionalizzare la tua applicazione Vite. Include il plugin Metro per impostare la configurazione tramite variabili d'ambiente nel [Lynx bundler](https://lynxjs.org/index.html).

## Perché internazionalizzare la tua applicazione Lynx?

Internazionalizzare la tua applicazione Lynx è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone provenienti da diversi contesti linguistici.

## Configurazione

Il pacchetto `lynx-intlayer` funziona perfettamente con il [`pacchetto react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) e il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/index.md). Dai un'occhiata alla documentazione pertinente per maggiori informazioni.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Esempio di utilizzo

Ecco un esempio di come includere i plugin nella tua configurazione vite.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... altri plugin
    pluginIntlayerLynx(),
  ],
});
```

## Padroneggiare l'internazionalizzazione della tua applicazione Vite

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione Vite.

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione React (i18n) con Intlayer e Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_lynx+react.md) per l'applicazione Lynx.**

## Leggi su Intlayer

- [Sito web di Intlayer](https://intlayer.org)
- [Documentazione di Intlayer](https://intlayer.org/doc)
- [GitHub di Intlayer](https://github.com/aymericzip/intlayer)

- [Fai le tue domande alla nostra documentazione intelligente](https://intlayer.org/doc/chat)

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
