---
blogName: intlayer_with_react-intl
url: https://intlayer.org/blog/intlayer-with-react-intl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-intl.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer e react-intl
description: Integra Intlayer con react-intl per un'app React
keywords:
  - react-intl
  - Intlayer
  - Internazionalizzazione
  - Blogumentazione
  - Next.js
  - JavaScript
  - React
---

# React Internationalization (i18n) con **react-intl** e Intlayer

Questa guida mostra come integrare **Intlayer** con **react-intl** per gestire le traduzioni in un'applicazione React. Dichiari i tuoi contenuti traducibili con Intlayer e poi consuma quei messaggi con **react-intl**, una popolare libreria dell'ecosistema [FormatJS](https://formatjs.io/docs/react-intl).

## Panoramica

- **Intlayer** ti consente di memorizzare le traduzioni nei file di dichiarazione dei contenuti a **livello di componente** (JSON, JS, TS, ecc.) all'interno del tuo progetto.
- **react-intl** fornisce componenti React e hook (come `<FormattedMessage>` e `useIntl()`) per visualizzare stringhe localizzate.

Configurando Intlayer per **esportare** le traduzioni in un formato **compatibile con react-intl**, puoi automaticamente **generare** e **aggiornare** i file di messaggi di cui `<IntlProvider>` (da react-intl) ha bisogno.

---

## Perché usare Intlayer con react-intl?

1. **Dichiarazioni di contenuto per componente**  
   I file di dichiarazione dei contenuti di Intlayer possono vivere accanto ai tuoi componenti React, evitando traduzioni “orfane” se i componenti vengono spostati o rimossi. Ad esempio:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Dichiarazione contenuti Intlayer
               └── index.tsx          # Componente React
   ```

2. **Traduzioni centralizzate**  
   Ogni file di dichiarazione dei contenuti raccoglie tutte le traduzioni necessarie a un componente. Questo è particolarmente utile nei progetti TypeScript: le traduzioni mancanti possono essere catturate al **momento della compilazione**.

3. **Build e rigenerazione automatiche**  
   Ogni volta che aggiungi o aggiorni le traduzioni, Intlayer rigenera file JSON di messaggio. Puoi quindi passarli a `<IntlProvider>` di react-intl.

---

## Installazione

In un tipico progetto React, installa i seguenti:

```bash
# con npm
npm install intlayer react-intl

# con yarn
yarn add intlayer react-intl

# con pnpm
pnpm add intlayer react-intl
```

### Perché questi pacchetti?

- **intlayer**: CLI core e libreria che scansiona le dichiarazioni di contenuto, le unisce e genera output di dizionario.
- **react-intl**: La libreria principale di FormatJS che fornisce `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` e altre primitives di internazionalizzazione.

> Se non hai già installato React, avrai bisogno anche di esso (`react` e `react-dom`).

## Configurare Intlayer per esportare i messaggi react-intl

Nella radice del tuo progetto, crea **`intlayer.config.ts`** (o `.js`, `.mjs`, `.cjs`) in questo modo:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Aggiungi quanti più locali desideri
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Indica a Intlayer di generare file di messaggi per react-intl
    dictionaryOutput: ["react-intl"],

    // La directory in cui Intlayer scriverà i tuoi file JSON di messaggi
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Nota**: Per altri tipi di file (`.mjs`, `.cjs`, `.js`), consulta la [documentazione di Intlayer](https://intlayer.org/it/doc/concept/configuration) per i dettagli sull'uso.

---

## Creazione delle dichiarazioni di contenuto di Intlayer

Intlayer scansiona il tuo codice sorgente (per impostazione predefinita, sotto `./src`) per file che corrispondono a `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Ecco un esempio in **TypeScript**:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "chiave" diventa la chiave di messaggio di primo livello nel tuo file JSON react-intl
  key: "my-component",

  content: {
    // Ogni chiamata a t() dichiara un campo traducibile
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Se preferisci JSON o diversi tipi di JS (`.cjs`, `.mjs`), la struttura è essenzialmente la stessa, vedi [documentazione di Intlayer sulla dichiarazione dei contenuti](https://intlayer.org/it/doc/concept/content).

---

## Costruzione dei messaggi react-intl

Per generare i file JSON di messaggi effettivi per **react-intl**, esegui:

```bash
# con npm
npx intlayer dictionaries build

# con yarn
yarn intlayer build

# con pnpm
pnpm intlayer build
```

Questo scansiona tutti i file `*.content.*`, li compila e scrive i risultati nella directory specificata nel tuo **`intlayer.config.ts`** , in questo esempio, `./react-intl/messages`.  
Un output tipico potrebbe apparire così:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Ogni file è un oggetto JSON i cui **chiavi di primo livello** corrispondono a ciascuna **`content.key`** dalle tue dichiarazioni. Le **sotto-chiavi** (come `helloWorld`) riflettono le traduzioni dichiarate all'interno di quell'elemento di contenuto.

Ad esempio, il **en.json** potrebbe apparire così:

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Inizializzare react-intl nella tua app React

### 1. Carica i messaggi generati

Dove configuri il componente radice della tua app (ad esempio, `src/main.tsx` o `src/index.tsx`), dovrai:

1. **Importare** i file di messaggi generati (staticamente o dinamicamente).
2. **Fornirli** a `<IntlProvider>` da `react-intl`.

Un approccio semplice è importare staticamente:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Importa i file JSON dall'output della build.
// In alternativa, puoi importare dinamicamente in base alla lingua scelta dall'utente.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Se hai un meccanismo per rilevare la lingua dell'utente, impostalo qui.
// Per semplicità, scegliamo l'inglese.
const locale = "en";

// Raccogli i messaggi in un oggetto (o scegli in modo dinamico)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Suggerimento**: Per progetti reali, potresti:
>
> - Caricare dinamicamente i messaggi JSON a runtime.
> - Utilizzare rilevamenti di locale basati su ambiente, browser o account utente.

### 2. Usa `<FormattedMessage>` o `useIntl()`

Una volta che i tuoi messaggi sono stati caricati in `<IntlProvider>`, qualsiasi componente figlio può utilizzare react-intl per accedere a stringhe localizzate. Ci sono due approcci principali:

- **Componente `<FormattedMessage>`**
- **Hook `useIntl()`**

---

## Utilizzo delle traduzioni nei componenti React

### Approccio A: `<FormattedMessage>`

Per un utilizzo rapido in linea:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” fa riferimento alla chiave da en.json, fr.json, ecc. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> La prop **`id`** in `<FormattedMessage>` deve corrispondere alla **chiave di primo livello** (`my-component`) più eventuali sotto-chiavi (`helloWorld`).

### Approccio B: `useIntl()`

Per un utilizzo più dinamico:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Entrambi gli approcci sono validi: scegli quello che meglio si adatta alla tua app.

---

## Aggiornamento o aggiunta di nuove traduzioni

1. **Aggiungi o modifica** contenuti in qualsiasi file `*.content.*`.
2. Riesegui `intlayer build` per rigenerare i file JSON sotto `./react-intl/messages`.
3. React (e react-intl) rileveranno gli aggiornamenti la prossima volta che ricompili o ricarichi la tua applicazione.

---

## Integrazione TypeScript (Opzionale)

Se stai usando TypeScript, Intlayer può **generare definizioni di tipo** per le tue traduzioni.

- Assicurati che `tsconfig.json` includa la tua cartella `types` (o qualsiasi altra cartella di output generata da Intlayer) nell'array `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

I tipi generati possono aiutare a rilevare traduzioni mancanti o chiavi non valide nei tuoi componenti React al momento della compilazione.

---

## Configurazione Git

È comune **escludere** gli artefatti di build interni di Intlayer dal controllo versione. Nel tuo `.gitignore`, aggiungi:

```plaintext
# Ignora gli artefatti di build di intlayer
.intlayer
react-intl
```

A seconda del tuo flusso di lavoro, potresti anche voler ignorare o impegnare i dizionari finali in `./react-intl/messages`. Se la tua pipeline CI/CD li rigenera, puoi ignorarli in sicurezza; altrimenti, impegnali se hai bisogno di loro per le distribuzioni in produzione.
