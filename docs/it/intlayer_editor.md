# Intlayer Editor Documentazione

L'Intlayer Editor è uno strumento che trasforma la tua applicazione in un editor visivo. Con l'Intlayer Editor, i tuoi team possono gestire il contenuto del tuo sito in tutte le lingue configurate.

![Interfaccia Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

## Integrazione

Per ulteriori dettagli su come installare il pacchetto, vedere la sezione rilevante qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, fare riferimento alla [guida all'impostazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, fare riferimento alla [guida all'impostazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, fare riferimento alla [guida all'impostazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).

## Come funziona l'Intlayer Editor

Ogni volta che apporti una modifica utilizzando l'Intlayer Editor, il server inserisce automaticamente le tue modifiche nei tuoi [file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md), ovunque questi file siano dichiarati nel tuo progetto.

In questo modo, non devi preoccuparti di dove il file è dichiarato o di trovare la tua chiave nella tua collezione di dizionari.

## Installazione

Una volta che Intlayer è configurato nel tuo progetto, installa semplicemente `intlayer-editor` come dipendenza di sviluppo:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Configurazione

### 1. Abilita l'Editor nel tuo file intlayer.config.ts

Nel tuo file di configurazione Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accessibile.
    // Client ID e client secret sono richiesti per abilitare l'editor.
    // Consentono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
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
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accessibile.
    // Client ID e client secret sono richiesti per abilitare l'editor.
    // Consentono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accessibile.
    // Client ID e client secret sono richiesti per abilitare l'editor.
    // Consentono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nel [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, fare riferimento alla [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### 2. Inserisci il Provider dell'Intlayer Editor nella tua applicazione

Per abilitare l'editor, devi inserire il Provider dell'Intlayer Editor nella tua applicazione.

Esempio per applicazioni React JS o Vite + React:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* La tua applicazione */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* La tua applicazione */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* La tua applicazione */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Esempio per applicazioni Next.js:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* La tua applicazione */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* La tua applicazione */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* La tua applicazione */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Aggiungi i fogli di stile alla tua applicazione

Per visualizzare gli stili dell'editor, è necessario aggiungere i fogli di stile alla tua applicazione.

Se utilizzi tailwind, puoi aggiungere i fogli di stile al tuo file `tailwind.config.js`:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... resto del tuo contenuto
  ],
  // ...
};
```

Altrimenti, puoi importare i fogli di stile nella tua applicazione:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

Oppure

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Utilizzare l'Editor

Quando l'editor è installato, abilitato e avviato, puoi visualizzare ciascun campo indicizzato da Intlayer passando con il cursore sul tuo contenuto.

![Spostamento del cursore sul contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Se il tuo contenuto è delineato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.
