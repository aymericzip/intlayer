# Intlayer Content Management System (CMS) Documentation

Il CMS Intlayer è un'applicazione che ti consente di esternalizzare il contenuto di un progetto Intlayer.

Per questo, Intlayer introduce il concetto di 'dizionari distanti'.

## Comprendere i dizionari distanti

Intlayer fa una differenza tra dizionari 'locali' e 'distanti'.

- Un dizionario 'locale' è un dizionario che è dichiarato nel tuo progetto Intlayer. Come il file di dichiarazione di un pulsante o la tua barra di navigazione. Esternalizzare il tuo contenuto non ha senso in questo caso perché questo contenuto non dovrebbe cambiare spesso.

- Un dizionario 'distante' è un dizionario che è gestito attraverso il CMS Intlayer. Potrebbe essere utile per consentire al tuo team di gestire il tuo contenuto direttamente sul tuo sito web e mira anche a utilizzare funzionalità di test A/B e ottimizzazione automatica SEO.

## Editor visivo vs CMS

L'editor [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) è uno strumento che ti consente di gestire il tuo contenuto in un editor visivo per dizionari locali. Una volta apportata una modifica, il contenuto verrà sostituito nel codice. Ciò significa che l'applicazione verrà ricostruita e la pagina verrà ricaricata per visualizzare il nuovo contenuto.

Al contrario, il CMS Intlayer è uno strumento che ti consente di gestire il tuo contenuto in un editor visivo per dizionari distanti. Una volta apportata una modifica, il contenuto **non** influisce sul tuo codice. E il sito web mostrerà automaticamente il contenuto modificato.

## Integrazione

Per ulteriori dettagli su come installare il pacchetto, vedere la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, fare riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, fare riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, fare riferimento alla [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).

## Configurazione

### 1. Abilita l'editor nel tuo file intlayer.config.ts

Nel tuo file di configurazione Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * L'ID cliente e il client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo cliente nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Facoltativo
     * Predefinito come `true`. Se `false`, l'editor è inattivo e non può essere accesso.
     * Può essere utilizzato per disabilitare l'editor per specifici ambienti per motivi di sicurezza, come la produzione.
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
     * L'ID cliente e il client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo cliente nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * Facoltativo
     * Predefinito come `true`. Se `false`, l'editor è inattivo e non può essere accesso.
     * Può essere utilizzato per disabilitare l'editor per specifici ambienti per motivi di sicurezza, come la produzione.
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
     * L'ID cliente e il client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo cliente nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Facoltativo
     * Predefinito come `true`. Se `false`, l'editor è inattivo e non può essere accesso.
     * Può essere utilizzato per disabilitare l'editor per specifici ambienti per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo cliente nel [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, fare riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Utilizzo del CMS

Quando l'editor è installato, puoi visualizzare ciascun campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

![Passando sopra il contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se il tuo contenuto è delineato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.
