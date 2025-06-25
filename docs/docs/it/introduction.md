---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Introduzione
description: Scopri come funziona Intlayer. Vedi i passaggi utilizzati da Intlayer nella tua applicazione. Vedi cosa fanno i diversi pacchetti.
keywords:
  - Introduzione
  - Iniziare
  - Intlayer
  - Applicazione
  - Pacchetti
---

# Intlayer Documentazione

Benvenuto nella documentazione ufficiale di Intlayer! Qui troverai tutto ciò di cui hai bisogno per integrare, configurare e padroneggiare Intlayer per tutte le tue esigenze di internazionalizzazione (i18n), che tu stia lavorando con Next.js, React, Vite, Express o un altro ambiente JavaScript.

## Introduzione

### Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Permette la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarli facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più solido ed efficiente.

Intlayer offre anche un editor visivo opzionale che ti consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti o per i team che generano contenuti senza preoccuparsi del codice.

### Esempio di utilizzo

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
import { t, type Dictionary } from "intlayer";

// Dichiarazione del contenuto del componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dichiarazione del contenuto del componente
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

/** @type {import('intlayer').Dictionary} */
// Dichiarazione del contenuto del componente
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

// Componente React che utilizza Intlayer
export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Componente React che utilizza Intlayer
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Componente React che utilizza Intlayer
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Caratteristiche Principali

Intlayer offre una varietà di funzionalità progettate per soddisfare le esigenze dello sviluppo web moderno. Di seguito le caratteristiche principali, con link alla documentazione dettagliata per ciascuna:

- **Supporto all'Internazionalizzazione**: Migliora la portata globale della tua applicazione con il supporto integrato per l'internazionalizzazione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con plugin per editor progettati per Intlayer. Consulta la [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).
- **Flessibilità di Configurazione**: Personalizza la tua configurazione con opzioni dettagliate nella [Guida alla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
- **Strumenti CLI Avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia a riga di comando di Intlayer. Esplora le funzionalità nella [Documentazione degli Strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

## Concetti Fondamentali

### Dizionario

Organizza i tuoi contenuti multilingue vicino al tuo codice per mantenere tutto coerente e facile da gestire.

- **[Inizia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)**  
  Scopri le basi per dichiarare i tuoi contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)**  
  Comprendi come le traduzioni vengono generate, archiviate e utilizzate nella tua applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)**  
  Gestisci facilmente set di dati ripetuti o fissi in varie lingue.

- **[Recupero Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)**  
  Scopri come recuperare dinamicamente i contenuti con logica personalizzata per adattarsi al flusso di lavoro del tuo progetto.

### Ambienti e Integrazioni

Abbiamo progettato Intlayer con flessibilità in mente, offrendo un'integrazione senza soluzione di continuità con i framework e gli strumenti di build più popolari:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md)**

Ogni guida all'integrazione include le migliori pratiche per utilizzare le funzionalità di Intlayer, come il **server-side rendering**, il **routing dinamico** o il **client-side rendering**, così puoi mantenere un'applicazione veloce, SEO-friendly e altamente scalabile.

## Contributi e Feedback

Valorizziamo il potere dell'open-source e dello sviluppo guidato dalla comunità. Se desideri proporre miglioramenti, aggiungere una nuova guida o correggere eventuali problemi nella nostra documentazione, sentiti libero di inviare una Pull Request o aprire un problema sul nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto a tradurre la tua applicazione in modo più veloce ed efficiente?** Esplora la nostra documentazione per iniziare a utilizzare Intlayer oggi stesso. Vivi un approccio robusto e semplificato all'internazionalizzazione che mantiene i tuoi contenuti organizzati e il tuo team più produttivo.

Buona traduzione!
