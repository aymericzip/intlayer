# Intlayer Editor Documentation

L'Intlayer Editor è uno strumento che trasforma la tua applicazione in un editor visivo. Con l'Intlayer Editor, i tuoi team possono gestire il contenuto del tuo sito in tutte le lingue configurate.

![Interfaccia dell'Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/assets/intlayer_editor_ui.png)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

## Integrazione

Per maggiori dettagli su come installare il pacchetto, vedere la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).

## Come funziona l'Intlayer Editor

Ogni volta che apporti una modifica utilizzando l'Intlayer Editor, il server inserisce automaticamente le tue modifiche nei tuoi [file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md), ovunque questi file siano dichiarati nel tuo progetto.

In questo modo, non devi preoccuparti di dove è dichiarato il file o di trovare la tua chiave nella tua collezione di dizionari.

## Installazione

Una volta che Intlayer è configurato nel tuo progetto, basta installare `intlayer-editor` come dipendenza di sviluppo:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configurazione

### 1. Abilita l'Editor nel tuo file intlayer.config.ts

Nel tuo file di configurazione di Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript
const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Se false, l'editor è inattivo e non può essere accesso.
    // L'ID cliente e il segreto cliente sono necessari per abilitare l'editor.
    // Permettono di identificare l'utente che sta modificando il contenuto.
    // Possono essere ottenuti creando un nuovo cliente nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Se non hai un ID cliente e un segreto cliente, puoi ottenerli creando un nuovo cliente nel [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### 2. Inserisci il Provider dell'Intlayer Editor nella tua applicazione

Per abilitare l'editor, devi inserire il Provider dell'Intlayer Editor nella tua applicazione.

Esempio per applicazioni React JS o Vite + React:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>
        {/* La tua applicazione */}
      </IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Esempio per applicazioni Next.js:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* La tua applicazione */}
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Aggiungi i fogli di stile alla tua applicazione

Per visualizzare gli stili dell'editor, devi aggiungere i fogli di stile alla tua applicazione.

Se viene utilizzato tailwind, puoi aggiungere i fogli di stile al tuo file `tailwind.config.js`:

```js
// tailwind.config.js
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

In caso contrario, puoi importare i fogli di stile nella tua applicazione:

```tsx
// app.tsx
import "intlayer-editor/css";
```

Oppure

```css
/* app.css */
@import "intlayer-editor/css";
```

## Utilizzo dell'Editor

Quando l'editor è installato, abilitato e avviato, puoi visualizzare ciascun campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

![Passando il cursore sopra il contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/it/assets/intlayer_editor_hover_content.png)

Se il tuo contenuto è evidenziato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.
