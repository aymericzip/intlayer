---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentazione del pacchetto | lynx-intlayer
description: Scopri come utilizzare il pacchetto lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `lynx-intlayer`** ti consente di internazionalizzare la tua applicazione Vite. Include il plugin Metro per configurare le variabili d'ambiente nel [bundler Lynx](https://lynxjs.org/index.html).

## Perché Internazionalizzare la Tua Applicazione Lynx?

Internazionalizzare la tua applicazione Lynx è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diversi background linguistici.

## Configurazione

Il pacchetto `lynx-intlayer` funziona perfettamente con il [`pacchetto react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/index.md) e il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/index.md). Consulta la documentazione pertinente per maggiori informazioni.

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

Ecco un esempio di come includere i plugin nella configurazione di Vite.

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

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione (i18n) di React con Intlayer e Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_lynx+react.md) per le applicazioni Lynx.**

## Leggi di più su Intlayer

- [Sito Web di Intlayer](https://intlayer.org)
- [Documentazione di Intlayer](https://intlayer.org/doc)
- [GitHub di Intlayer](https://github.com/aymericzip/intlayer)

- [Fai le tue domande alla nostra documentazione intelligente](https://intlayer.org/docchat)
