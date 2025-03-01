# Intlayer: Un modo più vicino per tradurre la tua applicazione

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Permette la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più robusto ed efficiente.

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

// Esempio di contenuto del componente
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

// Esempio di contenuto del componente
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

// Esempio di contenuto del componente
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

// Esempio di componente
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

- **Gestione dei contenuti basata su JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente Type-Safe**: Utilizza TypeScript per garantire che tutte le definizioni dei tuoi contenuti siano precise e prive di errori.
- **File di contenuti integrati**: Mantieni le tue traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza.
- **Configurazione semplificata**: Avvia rapidamente con una configurazione minima, ottimizzata soprattutto per i progetti Next.js.
- **Supporto per componenti server**: Perfettamente adatto ai componenti server di Next.js, garantendo un rendering lato server fluido.
- **Routing migliorato**: Supporto completo per il routing delle app Next.js, adattandosi senza problemi a strutture applicative complesse.
- **Interoperabilità**: Consente l'interoperabilità con [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_next-intl.md), e [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_react-intl.md).
