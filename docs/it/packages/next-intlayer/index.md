# next-intlayer: Pacchetto NPM per internazionalizzare (i18n) un'applicazione Next.js

**Intlayer** è una suite di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, Next.js e Express.js.

**Il pacchetto `next-intlayer`** consente di internazionalizzare la tua applicazione Next.js. Fornisce fornitori di contesto e hook per l'internazionalizzazione di Next.js. Inoltre, include il plugin di Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), così come middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento dell'URL.

## Perché Internazionalizzare la Tua Applicazione Next.js?

Internazionalizzare la tua applicazione Next.js è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diverse origini linguistiche.

## Perché integrare Intlayer?

- **Gestione dei Contenuti Potenziata da JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente Sicuro per i Tipi**: Sfrutta TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e prive di errori.
- **File di Contenuto Integrati**: Mantieni le tue traduzioni vicine ai loro rispettivi componenti, migliorando la manutenibilità e la chiarezza.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Esempio di utilizzo

Con Intlayer, puoi dichiarare il tuo contenuto in un modo strutturato in qualsiasi parte della tua base di codice.

Per impostazione predefinita, Intlayer cerca file con l'estensione `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Puoi modificare l'estensione predefinita impostando la proprietà `contentDir` nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
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
    └── components
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
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Dichiara il tuo contenuto

`next-intlayer` è progettato per lavorare con il pacchetto [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/index.md). `intlayer` è un pacchetto che ti consente di dichiarare il tuo contenuto ovunque nel tuo codice. Converte le dichiarazioni di contenuto multilingue in dizionari strutturati che si integrano perfettamente nella tua applicazione.

Ecco un esempio di dichiarazione di contenuto:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
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

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
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

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
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

### Utilizzare il Contenuto nel Tuo Codice

Una volta dichiarato il tuo contenuto, puoi utilizzarlo nel tuo codice. Ecco un esempio di come utilizzare il contenuto in un componente React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea una dichiarazione di contenuto correlato

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea una dichiarazione di contenuto correlato

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea una dichiarazione di contenuto correlato

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Padroneggiare l'internazionalizzazione della tua applicazione Next.js

Intlayer fornisce molte funzionalità per aiutarti a internazionalizzare la tua applicazione Next.js. Ecco alcune delle funzioni chiave:

- **Internazionalizzazione dei componenti del server**: Intlayer ti consente di internazionalizzare i tuoi componenti del server nello stesso modo in cui fai con i tuoi componenti client. Ciò significa che puoi utilizzare le stesse dichiarazioni di contenuto sia per i componenti client che per quelli del server.
- **Middleware per il Rilevamento della Lingua**: Intlayer fornisce middleware per rilevare la lingua preferita dell'utente. Questo middleware viene utilizzato per rilevare la lingua preferita dell'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
- **Internazionalizzazione dei metadati**: Intlayer fornisce un modo per internazionalizzare i tuoi metadati, come il titolo della tua pagina, utilizzando la funzione `generateMetadata` fornita da Next.js. Puoi utilizzare la funzione `getTranslationContent` per tradurre i tuoi metadati.
- **Internazionalizzazione di sitemap.xml e robots.txt**: Intlayer ti consente di internazionalizzare i tuoi file sitemap.xml e robots.txt. Puoi utilizzare la funzione `getMultilingualUrls` per generare URL multilingue per la tua mappa del sito.
- **Internazionalizzazione degli URL**: Intlayer ti consente di internazionalizzare i tuoi URL utilizzando la funzione `getMultilingualUrls`. Questa funzione genera URL multilingue per la tua mappa del sito.

**Per saperne di più su queste funzionalità, fai riferimento alla guida [Internazionalizzazione di Next.js (i18n) con Intlayer e Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).**

## Funzioni fornite dal pacchetto `next-intlayer`

Il pacchetto `next-intlayer` fornisce anche alcune funzioni per aiutarti a internazionalizzare la tua applicazione.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayerAsync.md)
