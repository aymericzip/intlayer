---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer e next-intl
description: Integra Intlayer con next-intl per l'internazionalizzazione (i18n) di un'app React
keywords:
  - next-intl
  - Intlayer
  - Internazionalizzazione
  - Blogumentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js Internationalization (i18n) con next-intl e Intlayer

Sia next-intl che Intlayer sono framework di internazionalizzazione (i18n) open-source progettati per le applicazioni Next.js. Sono ampiamente utilizzati per gestire traduzioni, localizzazione e cambiamento della lingua nei progetti software.

Condividono tre notioni principali:

1. **Dichiarazione del Contenuto**: Il metodo per definire il contenuto traducibile della tua applicazione.

   - Chiamato `content declaration file` in Intlayer, che può essere un file JSON, JS o TS che esporta i dati strutturati. Consulta la [documentazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/concept/content) per ulteriori informazioni.
   - Chiamato `messages` o `locale messages` in next-intl, solitamente in file JSON. Consulta la [documentazione di next-intl](https://github.com/amannn/next-intl) per ulteriori informazioni.

2. **Utilità**: Strumenti per costruire e interpretare le dichiarazioni di contenuto nell'applicazione, come `useIntlayer()` o `useLocale()` per Intlayer, e `useTranslations()` per next-intl.

3. **Plugin e Middleware**: Funzionalità per gestire la redirezione degli URL, l'ottimizzazione dei bundle e altro, ad esempio, `intlayerMiddleware` per Intlayer o [`createMiddleware`](https://github.com/amannn/next-intl) per next-intl.

## Intlayer vs. next-intl: Differenze Chiave

Per un'analisi più approfondita su come Intlayer si confronta con altre librerie i18n per Next.js (come next-intl), dai un'occhiata al [post del blog next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18next_vs_next-intl_vs_intlayer.md).

## Come Generare Messaggi next-intl con Intlayer

### Perché Usare Intlayer con next-intl?

I file di dichiarazione del contenuto di Intlayer offrono generalmente un'esperienza di sviluppo migliore. Sono più flessibili e manutenibili grazie a due principali vantaggi:

1. **Posizionamento Flessibile**: Puoi posizionare un file di dichiarazione del contenuto di Intlayer ovunque nell'albero dei file della tua applicazione. Questo rende facile rinominare o eliminare componenti senza lasciare file di messaggi non utilizzati o in sospeso.

   Strutture di file di esempio:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # File di dichiarazione del contenuto
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # File di dichiarazione del contenuto
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # File di dichiarazione del contenuto
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # File di dichiarazione del contenuto
               └── index.jsx
   ```

2. **Traduzioni Centralizzate**: Intlayer memorizza tutte le traduzioni in una singola dichiarazione di contenuto, garantendo che non manchi alcuna traduzione. Nei progetti TypeScript, le traduzioni mancanti vengono segnalate automaticamente come errori di tipo, fornendo un feedback immediato agli sviluppatori.

### Installazione

Per utilizzare Intlayer e next-intl insieme, installa entrambe le librerie:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Configurazione di Intlayer per Esportare Messaggi next-intl

> **Nota:** L'esportazione di messaggi da Intlayer per next-intl può introdurre leggere differenze nella struttura. Se possibile, mantieni un flusso solo di Intlayer o solo di next-intl per semplificare l'integrazione. Se hai bisogno di generare messaggi next-intl da Intlayer, segui i passaggi qui sotto.

Crea o aggiorna un file `intlayer.config.ts` (o `.mjs` / `.cjs`) nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Usa l'output next-intl
    nextIntlMessagesDir: "./intl/messages", // Dove salvare i messaggi next-intl
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
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Dichiarazione del Contenuto

Di seguito sono riportati esempi di file di dichiarazione del contenuto in più formati. Intlayer compilerà questi in file di messaggi che next-intl può consumare.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### Costruire i Messaggi next-intl

Per costruire i file di messaggi per next-intl, esegui:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Questo genererà risorse nella directory `./intl/messages` (come configurato in `intlayer.config.*`). L'output previsto:

```bash
.
└── intl
    └── messages
       └── it
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Ogni file include messaggi compilati da tutte le dichiarazioni di contenuto di Intlayer. Le chiavi di alto livello corrispondono tipicamente ai tuoi campi `content.key`.

### Utilizzare next-intl nella Tua App Next.js

> Per maggiori dettagli, consultare la [documentazione ufficiale sull'uso di next-intl](https://github.com/amannn/next-intl#readme).

1. **Crea un Middleware (opzionale):**  
   Se desideri gestire la rilevazione automatica della lingua o la ridirezione, utilizza [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) di next-intl.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Crea un `layout.tsx` o `_app.tsx` per Caricare i Messaggi:**  
   Se stai utilizzando l'App Router (Next.js 13+), crea un layout:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Se stai utilizzando il Pages Router (Next.js 12 o precedente), carica i messaggi in `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Recupera i Messaggi lato Server (esempio di Pages Router):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Utilizzo del Contenuto nei Componenti Next.js

Una volta che i messaggi sono stati caricati in next-intl, puoi usarli nei tuoi componenti tramite l'hook `useTranslations()`:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' corrisponde alla chiave di contenuto in Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**Ecco fatto!** Ogni volta che aggiorni o aggiungi nuovi file di dichiarazione del contenuto Intlayer, riesegui il comando `intlayer build` per rigenerare i tuoi messaggi JSON next-intl. next-intl raccoglierà automaticamente il contenuto aggiornato.
