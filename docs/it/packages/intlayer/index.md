# intlayer: Pacchetto NPM per Gestire la Dichiarazione del Contenuto Multilingue (i18n)

**Intlayer** è una suite di pacchetti progettati specificamente per gli sviluppatori JavaScript. È compatibile con framework come React, Next.js e Express.js.

**Il pacchetto `intlayer`** ti consente di dichiarare il tuo contenuto ovunque nel tuo codice. Converte le dichiarazioni di contenuto multilingue in dizionari strutturati che si integrano perfettamente nella tua applicazione. Con TypeScript, **Intlayer** migliora il tuo sviluppo fornendo strumenti più solidi e più efficienti.

## Perché integrare Intlayer?

- **Gestione dei contenuti alimentata da JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire il tuo contenuto in modo efficiente.
- **Ambiente sicuro per i tipi**: Sfrutta TypeScript per assicurarti che tutte le tue definizioni di contenuto siano precise e senza errori.
- **File di contenuto integrati**: Tieni le tue traduzioni vicine ai loro rispettivi componenti, migliorando la manutenibilità e la chiarezza.

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

### Configura Intlayer

Intlayer fornisce un file di configurazione per impostare il tuo progetto. Metti questo file nella radice del tuo progetto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esempio di utilizzo

Con Intlayer, puoi dichiarare il tuo contenuto in modo strutturato ovunque nel tuo codice.

Per impostazione predefinita, Intlayer cerca file con l'estensione `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Puoi modificare l'estensione predefinita impostando la proprietà `contentDir` nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

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

### Dichiara il tuo contenuto

Ecco un esempio di dichiarazione del contenuto:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      it: "Ciao Mondo",
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
} satisfies DeclarationContent;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      it: "Ciao Mondo",
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

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      it: "Ciao Mondo",
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

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "it": "Ciao Mondo",
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

### Costruisci i tuoi dizionari

Puoi costruire i tuoi dizionari utilizzando l'[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Questo comando cerca tutti i file `*.content.*`, li compila e scrive i risultati nella directory specificata nel tuo **`intlayer.config.ts`** (per impostazione predefinita, `./.intlayer`).

Un'uscita tipica potrebbe apparire così:

```bash
.
├── .intlayer
│   ├── dictionary  # Contiene il dizionario del tuo contenuto
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # Contiene il punto di ingresso del tuo dizionario da utilizzare nella tua applicazione
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # Contiene le definizioni di tipo generate automaticamente del tuo dizionario
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Contiene le definizioni di tipo generate automaticamente di Intlayer
```

### Costruisci risorse i18next

Intlayer può essere configurato per costruire dizionari per [i18next](https://www.i18next.com/). Per fare ciò, devi aggiungere la seguente configurazione al tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Dice a Intlayer di generare file di messaggi per i18next
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
    // Dice a Intlayer di generare file di messaggi per i18next
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
    // Dice a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["i18next"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

Output:

```bash
.
└── i18next
    └── resources
        ├── it
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Ad esempio, il **it/client-component.json** potrebbe apparire così:

```json filePath="intlayer/dictionary/it/client-component.json"
{
  "myTranslatedContent": "Ciao Mondo",
  "zero_numberOfCar": "Nessuna macchina",
  "one_numberOfCar": "Una macchina",
  "two_numberOfCar": "Due macchine",
  "other_numberOfCar": "Alcune macchine"
}
```

### Costruisci dizionari i18next o next-intl

Intlayer può essere configurato per costruire dizionari per [i18next](https://www.i18next.com/) o [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Per fare ciò, devi aggiungere la seguente configurazione al tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Dice a Intlayer di generare file di messaggi per i18next
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
    // Dice a Intlayer di generare file di messaggi per i18next
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
    // Dice a Intlayer di generare file di messaggi per i18next
    dictionaryOutput: ["next-intl"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

Output:

```bash
.
└── intl
    └── messages
        ├── it
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Ad esempio, il **it/client-component.json** potrebbe apparire così:

```json filePath="intlayer/dictionary/it/client-component.json"
{
  "myTranslatedContent": "Ciao Mondo",
  "zero_numberOfCar": "Nessuna macchina",
  "one_numberOfCar": "Una macchina",
  "two_numberOfCar": "Due macchine",
  "other_numberOfCar": "Alcune macchine"
}
```

## Strumenti CLI

Intlayer fornisce uno strumento CLI per:

- controllare le tue dichiarazioni di contenuto e completare le traduzioni mancanti
- costruire dizionari dalle tue dichiarazioni di contenuto
- spingere e tirare dizionari distanti dal tuo CMS al tuo progetto locale

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md) per ulteriori informazioni.

## Usa Intlayer nella tua applicazione

Una volta dichiarato il tuo contenuto, puoi consumare i tuoi dizionari Intlayer nella tua applicazione.

Intlayer è disponibile come pacchetto per la tua applicazione.

### Applicazione React

Per utilizzare Intlayer nella tua applicazione React, puoi utilizzare [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/index.md).

### Applicazione Next.js

Per utilizzare Intlayer nella tua applicazione Next.js, puoi utilizzare [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/index.md).

### Applicazione Express

Per utilizzare Intlayer nella tua applicazione Express, puoi utilizzare [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/express-intlayer/index.md).

## Funzioni fornite dal pacchetto `intlayer`

Il pacchetto `intlayer` fornisce anche alcune funzioni per aiutarti a internazionalizzare la tua applicazione.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getConfiguration.md)
- [`getTranslationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getTranslationContent.md)
- [`getEnumerationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getEnumerationContent.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getPathWithoutLocale.md)
