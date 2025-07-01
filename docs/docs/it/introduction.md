---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Introduzione
description: Scopri come funziona Intlayer. Vedi i passaggi utilizzati da Intlayer nella tua applicazione. Scopri cosa fanno i diversi pacchetti.
keywords:
  - Introduzione
  - Iniziare
  - Intlayer
  - Applicazione
  - Pacchetti
slugs:
  - doc
  - get-started
---

# Documentazione di Intlayer

Benvenuto nella documentazione ufficiale di Intlayer! Qui troverai tutto ciò di cui hai bisogno per integrare, configurare e padroneggiare Intlayer per tutte le tue esigenze di internazionalizzazione (i18n), che tu stia lavorando con Next.js, React, Vite, Express o un altro ambiente JavaScript.

## Introduzione

### Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Permette la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più solido ed efficiente.

Intlayer fornisce anche un editor visivo opzionale che ti consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti, o per i team che generano contenuti senza doversi preoccupare del codice.

### Esempio di utilizzo

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
// Contenuto del componente con traduzioni multilingue
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
// Contenuto del componente con traduzioni multilingue
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

## Funzionalità Principali

Intlayer offre una varietà di funzionalità progettate per soddisfare le esigenze dello sviluppo web moderno. Di seguito sono riportate le caratteristiche principali, con link alla documentazione dettagliata per ciascuna:

- **Supporto per l'Internazionalizzazione**: Migliora la portata globale della tua applicazione con il supporto integrato per l'internazionalizzazione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con i plugin per editor progettati per Intlayer. Consulta la [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).
- **Flessibilità di Configurazione**: Personalizza la tua configurazione con ampie opzioni dettagliate nella [Guida alla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
- **Strumenti CLI Avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia a riga di comando di Intlayer. Esplora le funzionalità nella [Documentazione degli Strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

## Concetti Fondamentali

### Dizionario

Organizza i tuoi contenuti multilingue vicino al codice per mantenere tutto coerente e facilmente gestibile.

- **[Inizia Qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)**  
  Impara le basi per dichiarare i tuoi contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)**  
  Comprendi come le traduzioni vengono generate, memorizzate e utilizzate nella tua applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)**  
  Gestisci facilmente insiemi di dati ripetuti o fissi in diverse lingue.

- **[Condizione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/conditional.md)**  
  Impara a usare la logica condizionale in Intlayer per creare contenuti dinamici.

- **[Inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)**  
  Scopri come inserire valori in una stringa usando segnaposto di inserimento.

- **[Recupero Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)**  
  Scopri come recuperare dinamicamente contenuti con logiche personalizzate per adattarsi al flusso di lavoro del tuo progetto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)**  
  Impara a usare Markdown in Intlayer per creare contenuti ricchi.

- **[Incorporamento File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file_embeddings.md)**  
  Scopri come incorporare file esterni in Intlayer per usarli nell’editor di contenuti.

- **[Annidamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nesting.md)**  
  Comprendi come annidare contenuti in Intlayer per creare strutture complesse.

### Ambienti e Integrazioni

Abbiamo progettato Intlayer con la flessibilità in mente, offrendo un'integrazione senza soluzione di continuità con i framework e gli strumenti di build più popolari:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con React Native e Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_lynx+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md)**

Ogni guida all'integrazione include le migliori pratiche per utilizzare le funzionalità di Intlayer, come il **rendering lato server**, il **routing dinamico** o il **rendering lato client**, così da poter mantenere un'applicazione veloce, ottimizzata per i motori di ricerca (SEO) e altamente scalabile.

## Contributi e Feedback

Valorizziamo il potere dell'open-source e dello sviluppo guidato dalla comunità. Se desideri proporre miglioramenti, aggiungere una nuova guida o correggere eventuali problemi nella nostra documentazione, sentiti libero di inviare una Pull Request o aprire un issue nel nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto a tradurre la tua applicazione in modo più rapido ed efficiente?** Immergiti nella nostra documentazione per iniziare a usare Intlayer oggi stesso. Vivi un approccio robusto e semplificato all'internazionalizzazione che mantiene i tuoi contenuti organizzati e il tuo team più produttivo.

---

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
