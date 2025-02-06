# react-intlayer: Pacchetto NPM per internazionalizzare (i18n) un'applicazione React

**Intlayer** è una suite di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `react-intlayer`** consente di internazionalizzare la tua applicazione React. Fornisce fornitori di contesto e hook per l'internazionalizzazione di React.

## Perché internazionalizzare la tua applicazione React?

Internazionalizzare la tua applicazione React è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza dell'utente e amplia la portata della tua applicazione, rendendola più accessibile e rilevante per persone provenienti da diversi background linguistici.

## Perché integrare Intlayer?

- **Gestione dei contenuti supportata da JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente sicuro per i tipi**: Sfrutta TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e prive di errori.
- **File di contenuto integrati**: Mantieni le tue traduzioni vicine ai loro rispettivi componenti, migliorando la manutenibilità e la chiarezza.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Esempio di utilizzo

Con Intlayer, puoi dichiarare i tuoi contenuti in modo strutturato ovunque nel tuo codice.

Per impostazione predefinita, Intlayer cerca file con l'estensione `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Puoi modificare l'estensione predefinita impostando la proprietà `contentDir` nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Dichiarare il tuo contenuto

`react-intlayer` è progettato per funzionare con il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/index.md). `intlayer` è un pacchetto che consente di dichiarare i tuoi contenuti ovunque nel tuo codice. Converte le dichiarazioni di contenuti multilingue in dizionari strutturati che si integrano perfettamente nella tua applicazione.

Ecco un esempio di dichiarazione dei contenuti:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Meno di una macchina",
      "-1": "Meno di una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Meno di una macchina",
      "-1": "Meno di una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Meno di una macchina",
      "-1": "Meno di una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Meno di una macchina",
        "-1": "Meno di una macchina",
        "0": "Nessuna macchina",
        "1": "Una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine"
      }
    }
  }
}
```

### Utilizzare i contenuti nel tuo codice

Una volta dichiarati i tuoi contenuti, puoi utilizzarli nel tuo codice. Ecco un esempio di come utilizzare i contenuti in un componente React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crea dichiarazione di contenuto correlata

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crea dichiarazione di contenuto correlata

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crea dichiarazione di contenuto correlata

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Padroneggiare l'internazionalizzazione della tua applicazione React

Intlayer fornisce molte funzionalità per aiutarti a internazionalizzare la tua applicazione React.

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione React (i18n) con Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md) per Vite e Applicazione React, o la guida [Internazionalizzazione React (i18n) con Intlayer e React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md) per React Create App.**

## Funzioni fornite dal pacchetto `react-intlayer`

Il pacchetto `react-intlayer` fornisce anche alcune funzioni per aiutarti a internazionalizzare la tua applicazione.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayerAsync.md)
