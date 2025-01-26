# Intlayer Documentazione

Benvenuto nella Documentazione di Intlayer. Questa guida fornisce una panoramica di Intlayer, delle sue principali funzionalità e di come utilizzare efficacemente questi documenti per migliorare la tua esperienza di sviluppo.

## Introduzione

### Che cos'è Intlayer?

**Intlayer** è una libreria per la traduzione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più robusto ed efficiente.

Intlayer fornisce anche un editor visivo opzionale che consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti, o per i team che generano contenuti senza doversi preoccupare del codice.

## Esempio di utilizzo

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Funzionalità Principali

Intlayer offre una varietà di funzionalità progettate per soddisfare le esigenze dello sviluppo web moderno. Di seguito sono elencate le caratteristiche chiave, con collegamenti alla documentazione dettagliata per ciascuna:

- **Supporto per la Traduzione**: Migliora la portata globale della tua applicazione con il supporto integrato per la traduzione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con i plugin dell'editor progettati per Intlayer. Dai un'occhiata alla [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).
- **Flessibilità di Configurazione**: Personalizza il tuo setup con ampie opzioni di configurazione dettagliate nella [Guida alla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
- **Strumenti CLI Avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia da riga di comando di Intlayer. Esplora le capacità nella [Documentazione degli Strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).
- **Compatibilità con i18n**: Intlayer funziona perfettamente con altre librerie di traduzione. Dai un'occhiata alla [Guida i18n](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_i18next.md) per ulteriori informazioni.

### Piattaforme Supportate

Intlayer è progettato per funzionare perfettamente con Next.js e le applicazioni React. Supporta anche Vite e Create React App.

- **Integrazione con Next.js**: Utilizza la potenza di Next.js all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).
- **Integrazione con Vite e React**: Sfrutta Vite all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).
- **Integrazione con Create React App**: Utilizza la potenza di Create React App all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione con Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Come Utilizzare Questa Documentazione

Per ottenere il massimo da questa documentazione:

1. **Naviga nelle Sezioni Rilevanti**: Utilizza i link forniti sopra per andare direttamente nelle sezioni che affrontano le tue esigenze.
2. **Esempi Interattivi**: Dove disponibili, utilizza esempi interattivi per vedere come funzionano le funzionalità in tempo reale.
3. **Feedback e Contributi**: Il tuo feedback è prezioso. Se hai suggerimenti o correzioni, ti invitiamo a contribuire alla documentazione.
