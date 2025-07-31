---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del pacchetto | vite-intlayer
description: Scopri come utilizzare il pacchetto vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: pacchetto NPM per internazionalizzare (i18n) un'applicazione Vite

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `vite-intlayer`** ti permette di internazionalizzare la tua applicazione Vite. Include il plugin Vite per impostare la configurazione tramite variabili d'ambiente nel [bundler Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Fornisce inoltre un middleware per rilevare la lingua preferita dall'utente e reindirizzare l'utente all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Perché internazionalizzare la tua applicazione Vite?

Internazionalizzare la tua applicazione Vite è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone provenienti da diversi contesti linguistici.

## Configurazione

Il pacchetto `vite-intlayer` funziona perfettamente con il [`pacchetto react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) e il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/index.md). Dai un'occhiata alla documentazione pertinente per maggiori informazioni.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Esempio di utilizzo

Ecco un esempio di come includere i plugin nella tua configurazione di vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Il plugin Vite `intlayerPlugin()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

> Il plugin `intLayerMiddlewarePlugin()` aggiunge il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la locale corrente in base all'URL e imposterà il cookie della locale appropriata. Se non viene specificata alcuna locale, il plugin determinerà la locale più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna locale, reindirizzerà alla locale predefinita.

## Padroneggiare l'internazionalizzazione della tua applicazione Vite

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione Vite.

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione React (i18n) con Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md) per applicazioni Vite e React.**

## Cronologia del documento

- 5.5.10 - 2025-06-29: Inizio cronologia
