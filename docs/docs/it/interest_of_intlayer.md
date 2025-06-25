---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Interesse di Intlayer
description: Scopri i vantaggi e i benefici dell'utilizzo di Intlayer nei tuoi progetti. Comprendi perché Intlayer si distingue tra altri framework.
keywords:
  - Vantaggi
  - Benefici
  - Intlayer
  - Framework
  - Confronto
---

# Intlayer: Un modo personalizzato per tradurre il tuo sito web

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Permette di dichiarare i tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più robusto ed efficiente.

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Perché scegliere Intlayer?

- **Gestione dei contenuti basata su JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente type-safe**: Utilizza TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e prive di errori.
- **File di contenuto integrati**: Mantieni le tue traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza.
- **Configurazione semplificata**: Inizia rapidamente con una configurazione minima, particolarmente ottimizzata per i progetti Next.js.
- **Supporto per i componenti server**: Perfettamente adatto per i componenti server Next.js, garantendo un rendering lato server fluido.
- **Routing migliorato**: Supporto completo per il routing delle applicazioni Next.js, adattandosi perfettamente a strutture di applicazioni complesse.
- **Base di codice organizzata**: Mantieni la tua base di codice più organizzata: 1 componente = 1 dizionario nella stessa cartella.
- **Tipi TypeScript automatici**: I tipi TypeScript vengono implementati automaticamente, prevenendo la rottura del codice dovuta a chiavi rinominate o eliminate.
- **Traduzione automatica CI**: Compila automaticamente le tue traduzioni nel tuo CI utilizzando la tua chiave API OpenAI, eliminando la necessità di una piattaforma L10n.
- **Integrazione server MCP**: Fornisce un server MCP (Model Context Protocol) per l'automazione IDE, abilitando una gestione dei contenuti e flussi di lavoro i18n senza soluzione di continuità direttamente nel tuo ambiente di sviluppo. [Scopri di più](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).
- **Supporto Markdown**: Importa e interpreta file markdown per contenuti multilingue come le politiche sulla privacy.
- **Editor visivo e CMS gratuiti**: Un editor visivo e CMS gratuiti sono disponibili se hai bisogno di lavorare con redattori di contenuti per le tue traduzioni, eliminando nuovamente la necessità di una piattaforma di localizzazione e permettendo l'esternalizzazione dei contenuti dalla base di codice.
- **Recupero dei contenuti semplificato**: Non è necessario chiamare la tua funzione `t` per ogni elemento di contenuto; recupera tutti i tuoi contenuti direttamente utilizzando un singolo hook.
- **Implementazione coerente**: La stessa implementazione per i componenti client e server, non è necessario passare la tua funzione `t` attraverso ogni componente server.
- **Contenuti tree-shakable**: I contenuti sono tree-shakable, rendendo il bundle finale più leggero.
- **Rendering statico non bloccante**: Intlayer non blocca il rendering statico come fa `next-intl`.
- **Interoperabilità**: Permette l'interoperabilità con [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), e [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md).
