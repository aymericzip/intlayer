---
docName: package__intlayer
url: https://intlayer.org/doc/packages/intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del pacchetto | intlayer
description: Scopri come utilizzare il pacchetto intlayer
keywords:
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# intlayer: Pacchetto NPM per Gestire il Dizionario Multilingue (i18n)

**Intlayer** è una suite di pacchetti progettata specificamente per gli sviluppatori JavaScript. È compatibile con framework come React, Next.js ed Express.js.

**Il pacchetto `intlayer`** ti consente di dichiarare i tuoi contenuti ovunque nel tuo codice. Converte le dichiarazioni di contenuti multilingue in dizionari strutturati che si integrano perfettamente nella tua applicazione. Con TypeScript, **Intlayer** migliora il tuo sviluppo fornendo strumenti più forti ed efficienti.

## Perché integrare Intlayer?

- **Gestione dei Contenuti Basata su JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente Type-Safe**: Utilizza TypeScript per garantire che tutte le definizioni dei tuoi contenuti siano precise e prive di errori.
- **File di Contenuti Integrati**: Mantieni le tue traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configurare Intlayer

Intlayer fornisce un file di configurazione per impostare il tuo progetto. Posiziona questo file nella radice del tuo progetto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Esempio di utilizzo

Con Intlayer, puoi dichiarare i tuoi contenuti in modo strutturato ovunque nella tua base di codice.

Per impostazione predefinita, Intlayer esegue la scansione dei file con estensione `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Puoi modificare l'estensione predefinita impostando la proprietà `contentDir` nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Dichiarare i tuoi contenuti

Ecco un esempio di dichiarazione di contenuti:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Dichiarazione dei contenuti del componente client
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dichiarazione dei contenuti del componente client
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Dichiarazione dei contenuti del componente client
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### Costruire i tuoi dizionari

Puoi costruire i tuoi dizionari utilizzando il [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Questo comando esegue la scansione di tutti i file `*.content.*`, li compila e scrive i risultati nella directory specificata nel tuo **`intlayer.config.ts`** (per impostazione predefinita, `./.intlayer`).

Un output tipico potrebbe essere:

```bash
.
└── .intlayer
    ├── dictionary  # Contiene il dizionario dei tuoi contenuti
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contiene il punto di ingresso del dizionario da utilizzare nella tua applicazione
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contiene le definizioni di tipo auto-generate del tuo dizionario
        ├── intlayer.d.ts  # Contiene le definizioni di tipo auto-generate di Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Costruire risorse i18next

Intlayer può essere configurato per costruire dizionari per [i18next](https://www.i18next.com/). Per farlo, devi aggiungere la seguente configurazione al tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["i18next"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["i18next"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["i18next"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

Output:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Ad esempio, il file **en/client-component.json** potrebbe apparire così:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### Costruire dizionari next-intl

Intlayer può essere configurato per costruire dizionari per [i18next](https://www.i18next.com/) o [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Per farlo, devi aggiungere la seguente configurazione al tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["next-intl"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["next-intl"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["next-intl"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

Output:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Ad esempio, il file **en/client-component.json** potrebbe apparire così:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## Strumenti CLI

Intlayer fornisce uno strumento CLI per:

- controllare le dichiarazioni dei contenuti e completare le traduzioni mancanti
- costruire dizionari dalle dichiarazioni dei contenuti
- caricare e scaricare dizionari remoti dal tuo CMS al tuo progetto locale

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md) per maggiori informazioni.

## Utilizzare Intlayer nella tua applicazione

Una volta dichiarati i tuoi contenuti, puoi consumare i dizionari Intlayer nella tua applicazione.

Intlayer è disponibile come pacchetto per la tua applicazione.

### Applicazione React

Per utilizzare Intlayer nella tua applicazione React, puoi usare [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md).

### Applicazione Next.js

Per utilizzare Intlayer nella tua applicazione Next.js, puoi usare [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md).

### Applicazione Express

Per utilizzare Intlayer nella tua applicazione Express, puoi usare [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/express-intlayer/index.md).

## Funzioni fornite dal pacchetto `intlayer`

Il pacchetto `intlayer` fornisce anche alcune funzioni per aiutarti a internazionalizzare la tua applicazione.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md)
