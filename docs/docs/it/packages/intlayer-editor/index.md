---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Pacchetto Editor di Traduzione Visivo
description: Pacchetto editor visivo per Intlayer che fornisce un'interfaccia intuitiva per gestire traduzioni e modifica collaborativa dei contenuti con assistenza AI.
keywords:
  - intlayer
  - editor
  - visivo
  - traduzione
  - collaborativo
  - AI
  - NPM
  - interfaccia
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: Pacchetto NPM per usare l'editor visivo di Intlayer

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`intlayer-editor`** è un pacchetto NPM che integra l'editor visivo di Intlayer nel tuo progetto React.

## Come Funziona l'Editor Intlayer

L'editor intlayer permette di interagire con il dizionario remoto di Intlayer. Può essere installato sul lato client e trasformare la tua applicazione in un editor simile a un CMS per gestire i contenuti del tuo sito in tutte le lingue configurate.

![Interfaccia dell'Editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Configurazione

Nel tuo file di configurazione Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript
const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accessibile.
    // Client ID e client secret sono necessari per abilitare l'editor.
    // Permettono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nel [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

Per maggiori dettagli su come installare il pacchetto, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)

### Esempio di integrazione

Per integrare l'editor visuale Intlayer nel tuo progetto React, segui questi passaggi:

- Importa il componente editor di Intlayer nella tua applicazione React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* Il contenuto della tua App qui */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importa gli stili dell'editor Intlayer nella tua applicazione Next.js:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Uso dell'Editor

Quando l'editor è installato, abilitato e avviato, puoi visualizzare ogni campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

![Passare il cursore sul contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se il tuo contenuto è evidenziato, puoi premere a lungo per visualizzare il pannello di modifica.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizializzazione della cronologia
