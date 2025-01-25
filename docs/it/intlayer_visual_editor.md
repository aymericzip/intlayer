# Documentazione dell'Editor Visivo Intlayer

L'Editor Visivo Intlayer è uno strumento che avvolgerà il tuo sito web per interagire con i tuoi file di dichiarazione dei contenuti utilizzando un editor visivo.

![Interfaccia dell'Editor Visivo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

## Editor visivo vs CMS

L'editor visivo Intlayer è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari locali. Una volta apportata una modifica, il contenuto verrà sostituito nel codice sorgente. Ciò significa che l'applicazione verrà ricostruita e la pagina verrà ricaricata per visualizzare il nuovo contenuto.

Al contrario, il [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md) è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari remoti. Una volta apportata una modifica, il contenuto **non** influenzerà il tuo codice sorgente. E il sito web mostrerà automaticamente il contenuto modificato.

## Integrare Intlayer nella tua applicazione

Per ulteriori dettagli su come integrare intlayer, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, fai riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, fai riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, fai riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).

## Come Funziona l'Editor Intlayer

L'editor visivo in un'applicazione include due cose:

- Un'applicazione frontend che visualizzerà il tuo sito web in un iframe. Se il tuo sito web utilizza Intlayer, l'editor visivo rileverà automaticamente il tuo contenuto e ti permetterà di interagire con esso. Una volta effettuata una modifica, sarai in grado di scaricare le tue modifiche.

- Una volta cliccato il pulsante di download, l'editor visivo invierà una richiesta al server per sostituire i tuoi file di dichiarazione dei contenuti con il nuovo contenuto (ovunque questi file siano dichiarati nel tuo progetto).

> Nota che per ora, l'Editor Intlayer scriverà i tuoi file di dichiarazione dei contenuti come file JSON.

## Installazione

Una volta configurato Intlayer nel tuo progetto, installa semplicemente `intlayer-editor` come dipendenza di sviluppo:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configurazione

### 1. Abilita l'Editor nel tuo file intlayer.config.ts

Nel tuo file di configurazione Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Richiesto
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Facoltativo
     * Predefinito a `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Facoltativo
     * Predefinito a "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Facoltativo
     * Predefinito a `true`. Se `false`, l'editor è inattivo e non può essere acceduto.
     * Può essere utilizzato per disabilitare l'editor per ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
   /**
     * Richiesto
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Facoltativo
     * Predefinito a `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Facoltativo
     * Predefinito a "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Facoltativo
     * Predefinito a `true`. Se `false`, l'editor è inattivo e non può essere acceduto.
     * Può essere utilizzato per disabilitare l'editor per ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
     * Richiesto
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Facoltativo
     * Predefinito a `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Facoltativo
     * Predefinito a "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Facoltativo
     * Predefinito a `true`. Se `false`, l'editor è inattivo e non può essere acceduto.
     * Può essere utilizzato per disabilitare l'editor per ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Per vedere tutti i parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Usare l'Editor

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

2. Poi, apri l'URL fornito. Per impostazione predefinita `http://localhost:8000`.

   Puoi visualizzare ogni campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

   ![Spostando il cursore sul contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se il tuo contenuto è delineato, puoi premere a lungo per visualizzare il cassetto di modifica.
