# Intlayer: Un modo più vicino per tradurre la tua applicazione

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per sviluppatori JavaScript. Permette la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più forte ed efficiente.

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
// Il contenuto di esempio del componente
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
// Il contenuto di esempio del componente
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

// Esempio di componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Esempio di componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Perché scegliere Intlayer?

- **Gestione dei contenuti alimentata da JavaScript**: Approfitta della flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente a prova di tipo**: Sfrutta TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e prive di errori.
- **File di contenuto integrati**: Mantieni le tue traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza.
- **Impostazione semplificata**: Inizia rapidamente con una configurazione minima, ottimizzata soprattutto per i progetti Next.js.
- **Supporto per i componenti del server**: Perfettamente adatto per i componenti del server di Next.js, garantendo un rendering senza problemi sul lato server.
- **Routing migliorato**: Supporto completo per il routing dell'app Next.js, adattandosi perfettamente a strutture di applicazioni complesse.
- **Interoperabilità**: Consente l'interoperabilità con i18next. (beta)
