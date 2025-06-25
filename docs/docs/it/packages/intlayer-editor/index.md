# intlayer-editor: Pacchetto NPM per utilizzare l'editor visivo di Intlayer

**Intlayer** è una suite di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`intlayer-editor`** è un pacchetto NPM che integra l'editor visivo di Intlayer nel tuo progetto React.

## Come funziona l'Editor di Intlayer

L'editor di Intlayer consente di interagire con il dizionario remoto di Intlayer. Può essere installato lato client e trasformare la tua applicazione in un editor simile a un CMS per gestire i contenuti del tuo sito in tutte le lingue configurate.

![Interfaccia Editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

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

Nel file di configurazione di Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript
const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accessibile.
    // Client ID e client secret sono richiesti per abilitare l'editor.
    // Permettono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo client nella Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nella [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

Per maggiori dettagli su come installare il pacchetto, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md)

### Esempio di integrazione

Per integrare l'editor visivo di Intlayer nel tuo progetto React, segui questi passaggi:

- Importa il componente dell'editor di Intlayer nella tua applicazione React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Contenuto della tua App qui */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importa gli stili dell'editor di Intlayer nella tua applicazione Next.js:

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

## Utilizzo dell'Editor

Quando l'editor è installato, abilitato e avviato, puoi visualizzare ogni campo indicizzato da Intlayer passando il cursore sopra il contenuto.

![Passando il cursore sopra il contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se il tuo contenuto è evidenziato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.
