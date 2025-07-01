---
docName: package__next-intlayer
url: https://intlayer.org/doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del pacchetto | next-intlayer
description: Scopri come utilizzare il pacchetto next-intlayer
keywords:
  - Intlayer
  - next-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# next-intlayer: Pacchetto NPM per internazionalizzare (i18n) un'applicazione Next.js

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, Next.js e Express.js.

**Il pacchetto `next-intlayer`** ti permette di internazionalizzare la tua applicazione Next.js. Fornisce provider di contesto e hook per l'internazionalizzazione in Next.js. Inoltre, include il plugin per Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), così come middleware per rilevare la lingua preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

## Perché internazionalizzare la tua applicazione Next.js?

Internazionalizzare la tua applicazione Next.js è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diversi background linguistici.

## Perché integrare Intlayer?

- **Gestione dei contenuti basata su JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente con tipizzazione sicura**: Usa TypeScript per garantire che tutte le definizioni dei tuoi contenuti siano precise e prive di errori.
- **File di contenuto integrati**: Mantieni le tue traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza.

## Installazione

Installa il pacchetto necessario utilizzando il gestore di pacchetti che preferisci:

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

Con Intlayer, puoi dichiarare i tuoi contenuti in modo strutturato ovunque nel tuo codice.

Per impostazione predefinita, Intlayer esegue la scansione dei file con estensione `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Puoi modificare l'estensione predefinita impostando la proprietà `contentDir` nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

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

### Dichiara i tuoi contenuti

`next-intlayer` è progettato per funzionare con il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/index.md). `intlayer` è un pacchetto che ti permette di dichiarare i tuoi contenuti ovunque nel tuo codice. Converte le dichiarazioni di contenuti multilingue in dizionari strutturati che si integrano perfettamente nella tua applicazione.

Ecco un esempio di dichiarazione di contenuto:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Meno di meno una macchina", // meno di meno una macchina
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
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
        "<-1": "Meno di meno una macchina",
        "-1": "Meno una macchina",
        "0": "Nessuna macchina",
        "1": "Una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine"
      }
    }
  }
}
```

### Utilizzare il contenuto nel tuo codice

Una volta dichiarato il contenuto, puoi utilizzarlo nel tuo codice. Ecco un esempio di come usare il contenuto in un componente React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea la dichiarazione del contenuto correlato

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea la dichiarazione del contenuto correlato

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Padroneggiare l'internazionalizzazione della tua applicazione Next.js

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione Next.js. Ecco alcune delle caratteristiche principali:

- **Internazionalizzazione dei componenti server**: Intlayer ti permette di internazionalizzare i tuoi componenti server allo stesso modo dei componenti client. Questo significa che puoi usare le stesse dichiarazioni di contenuto sia per i componenti client che per quelli server.
- **Middleware per il Rilevamento della Lingua**: Intlayer fornisce un middleware per rilevare la lingua preferita dell'utente. Questo middleware viene utilizzato per rilevare la lingua preferita dell'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
- **Internazionalizzazione dei metadata**: Intlayer offre un modo per internazionalizzare i tuoi metadata, come il titolo della tua pagina, utilizzando la funzione `generateMetadata` fornita da Next.js. Puoi usare la funzione `getTranslation` per tradurre i tuoi metadata.
- **Internazionalizzazione di sitemap.xml e robots.txt**: Intlayer consente di internazionalizzare i file sitemap.xml e robots.txt. Puoi utilizzare la funzione `getMultilingualUrls` per generare URL multilingue per la tua sitemap.
- **Internazionalizzazione degli URL**: Intlayer consente di internazionalizzare i tuoi URL utilizzando la funzione `getMultilingualUrls`. Questa funzione genera URL multilingue per la tua sitemap.

**Per saperne di più su queste funzionalità, consulta la guida [Next.js Internationalization (i18n) con Intlayer e Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md).**

## Funzioni fornite dal pacchetto `next-intlayer`

Il pacchetto `next-intlayer` fornisce anche alcune funzioni per aiutarti a internazionalizzare la tua applicazione.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayerAsync.md)

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
