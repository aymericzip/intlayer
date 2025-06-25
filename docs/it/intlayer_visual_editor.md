---
docName: intlayer_visual_editor
url: /doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Editor Visual Intlayer | Modifica il tuo contenuto utilizzando un editor visuale
description: Scopri come utilizzare l’Editor Intlayer per gestire il tuo sito web multilingue. Segui i passi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Editor
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Documentazione dell'Editor Visivo di Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

L'Editor Visivo di Intlayer è uno strumento che avvolgerà il tuo sito web per interagire con i tuoi file di dichiarazione dei contenuti utilizzando un editor visivo.

![Interfaccia dell'Editor Visivo di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

## Editor visivo vs CMS

L'Editor Visivo di Intlayer è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari locali. Una volta apportata una modifica, il contenuto verrà sostituito nella base di codice. Ciò significa che l'applicazione verrà ricostruita e la pagina verrà ricaricata per visualizzare il nuovo contenuto.

Al contrario, il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md) è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari remoti. Una volta apportata una modifica, il contenuto **non** influenzerà la tua base di codice. E il sito web mostrerà automaticamente il contenuto modificato.

## Integrare Intlayer nella tua applicazione

Per maggiori dettagli su come integrare Intlayer, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).

## Come funziona l'Editor di Intlayer

L'editor visivo in un'applicazione include due elementi:

- Un'applicazione frontend che visualizzerà il tuo sito web in un iframe. Se il tuo sito web utilizza Intlayer, l'editor visivo rileverà automaticamente i tuoi contenuti e ti consentirà di interagire con essi. Una volta effettuata una modifica, potrai scaricare le tue modifiche.

- Una volta cliccato il pulsante di download, l'editor visivo invierà una richiesta al server per sostituire i tuoi file di dichiarazione dei contenuti con il nuovo contenuto (dovunque questi file siano dichiarati nel tuo progetto).

> Nota che, per ora, l'Editor di Intlayer scriverà i tuoi file di dichiarazione dei contenuti come file JSON.

## Installazione

Una volta che Intlayer è configurato nel tuo progetto, installa semplicemente `intlayer-editor` come dipendenza di sviluppo:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## Configurazione

Nel file di configurazione di Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     * Esempio: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opzionale
     * Di default è `true`. Se `false`, l'editor è inattivo e non può essere accessibile.
     * Può essere utilizzato per disabilitare l'editor in ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opzionale
     * Di default è `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opzionale
     * Di default è "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     * Esempio: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opzionale
     * Di default è `true`. Se `false`, l'editor è inattivo e non può essere accessibile.
     * Può essere utilizzato per disabilitare l'editor in ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opzionale
     * Di default è `8000`.
     * La porta utilizzata dal server dell'editor visivo.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opzionale
     * Di default è "http://localhost:8000"
     * L'URL del server dell'editor da raggiungere dall'applicazione. Utilizzato per limitare le origini che possono interagire con l'applicazione per motivi di sicurezza. Se impostato su `'*'`, l'editor è accessibile da qualsiasi origine. Dovrebbe essere impostato se la porta viene modificata o se l'editor è ospitato su un dominio diverso.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opzionale
     * Di default è `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opzionale
     * Di default è "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Opzionale
     * Di default è `true`. Se `false`, l'editor è inattivo e non può essere accessibile.
     * Può essere utilizzato per disabilitare l'editor in ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Utilizzo dell'Editor

1. Quando l'editor è installato, puoi avviare l'editor utilizzando il seguente comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Nota che dovresti eseguire la tua applicazione in parallelo.** L'URL dell'applicazione dovrebbe corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).

2. Poi, apri l'URL fornito. Di default `http://localhost:8000`.

   Puoi visualizzare ogni campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

   ![Passando il cursore sopra il contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se il tuo contenuto è delineato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.

## Debug

Se riscontri problemi con l'editor visivo, controlla quanto segue:

- L'editor visivo e l'applicazione sono in esecuzione.

- La configurazione [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) è correttamente impostata nel file di configurazione di Intlayer.

  - Campi obbligatori:
    - L'URL dell'applicazione dovrebbe corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).

- L'editor visivo utilizza un iframe per visualizzare il tuo sito web. Assicurati che la Content Security Policy (CSP) del tuo sito web consenta l'URL del CMS come `frame-ancestors` ('http://localhost:8000' di default). Controlla la console dell'editor per eventuali errori.
