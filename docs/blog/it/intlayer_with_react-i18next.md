---
blogName: intlayer_with_react-i18next
url: https://intlayer.org/blog/intlayer-with-react-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_react-i18next.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer e react-i18next
description: Confronta Intlayer con react-i18next per un'app React
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internazionalizzazione
  - Blogumentazione
  - Next.js
  - JavaScript
  - React
---

# React Internazionalizzazione (i18n) con react-i18next e Intlayer

## Panoramica

- **Intlayer** ti aiuta a gestire le traduzioni tramite **file di dichiarazione del contenuto** a livello di componente.
- **react-i18next** è un'integrazione popolare di React per **i18next** che fornisce hook come `useTranslation` per recuperare stringhe localizzate nei tuoi componenti.

Quando combinati, Intlayer può **esportare** dizionari in **JSON compatibile con i18next** in modo che react-i18next possa **consumare** questi dizionari in fase di esecuzione.

## Perché Usare Intlayer con react-i18next?

I file di dichiarazione del contenuto di **Intlayer** offrono una migliore esperienza per gli sviluppatori perché sono:

1. **Flessibili nella Posizione dei File**  
   Metti ogni file di dichiarazione del contenuto accanto al componente che ne ha bisogno. Questa struttura ti consente di mantenere le traduzioni co-locate, impedendo traduzioni orfane quando i componenti si spostano o vengono eliminati.

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

2. **Traduzioni Centralizzate**  
   Un singolo file di dichiarazione del contenuto raccoglie tutte le traduzioni necessarie per un componente, rendendo più facile rilevare traduzioni mancanti.  
   Con TypeScript, ricevi anche errori di compilazione se le traduzioni sono mancanti.

## Installazione

In un progetto Create React App, installa queste dipendenze:

```bash
# Con npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Con yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Con pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### Cosa Sono Questi Pacchetti?

- **intlayer** – La CLI e la libreria principale per gestire le configurazioni i18n, le dichiarazioni di contenuto e costruire output di dizionari.
- **react-intlayer** – Integrazione specifica di React per Intlayer, che fornisce notevolmente qualche script per automatizzare la costruzione dei dizionari.
- **react-i18next** – Libreria di integrazione specifica di React per i18next, incluso l'hook `useTranslation`.
- **i18next** – Il framework sottostante per la gestione delle traduzioni.
- **i18next-resources-to-backend** – Un backend i18next che importa dinamicamente risorse JSON.

## Configurare Intlayer per Esportare Dizionari i18next

Crea (o aggiorna) il tuo `intlayer.config.ts` nella radice del tuo progetto:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Aggiungi quante più lingue desideri
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Dì a Intlayer di creare JSON compatibile con i18next
    dictionaryOutput: ["i18next"],

    // Scegli una directory di output per le risorse generate
    // Questa cartella verrà creata se non esiste ancora.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Nota**: Se non stai usando TypeScript, puoi creare questo file di configurazione come `.cjs`, `.mjs` o `.js` (vedi la [documentazione di Intlayer](https://intlayer.org/en/doc/concept/configuration) per dettagli).

## Costruire le Risorse i18next

Una volta che le tue dichiarazioni di contenuto sono pronte (sezione successiva), esegui il **comando di build di Intlayer**:

```bash
# Con npm
npx run intlayer build
```

```bash
# Con yarn
yarn intlayer build
```

```bash
# Con pnpm
pnpm intlayer build
```

> Questo genererà le tue risorse i18next all'interno della directory `./i18next/resources` per impostazione predefinita.

Un output tipico potrebbe apparire così:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Dove ogni chiave di dichiarazione di **Intlayer** viene utilizzata come un **namespace di i18next** (ad esempio, `my-content.json`).

## Importare Dizionari nella Tua Configurazione react-i18next

Per caricare dinamicamente queste risorse in fase di esecuzione, usa [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). Ad esempio, crea un file `i18n.ts` (o `.js`) nel tuo progetto:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // plugin react-i18next
  .use(initReactI18next)
  // carica dinamicamente le risorse
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Regola il percorso di importazione alla tua directory delle risorse
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Inizializza i18next
  .init({
    // Lingua di fallback
    fallbackLng: "en",

    // Puoi aggiungere altre opzioni di configurazione di i18next qui, vedere:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Poi, nel tuo file **root** o **index** (ad esempio, `src/index.tsx`), importa questa configurazione `i18n` **prima** di rendere l'`App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Inizializza i18n prima di qualsiasi altra cosa
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Creare e Gestire le Tue Dichiarazioni di Contenuto

Intlayer estrae le traduzioni dai “file di dichiarazione del contenuto” situati ovunque sotto `./src` (per impostazione predefinita).  
Ecco un esempio minimale in TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // La "chiave" sarà il tuo namespace i18next (ad esempio, "my-component")
  key: "my-component",
  content: {
    // Ogni chiamata "t" è un nodo di traduzione separato
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

Se preferisci JSON, `.cjs`, o `.mjs`, fai riferimento alla [documentazione di Intlayer](https://intlayer.org/en/doc/concept/content).

> Per impostazione predefinita, le dichiarazioni di contenuto valide corrispondono al modello di estensione del file:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Usare le Traduzioni nei Componenti React

Dopo aver **costruito** le tue risorse Intlayer e configurato react-i18next, puoi usare direttamente l'hook `useTranslation` di **react-i18next**.  
Ad esempio:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Il "namespace" di i18next è la `chiave` di Intlayer da "MyComponent.content.ts"
 * quindi passeremo "my-component" a useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Nota che la funzione `t` fa riferimento a **chiavi** nel tuo JSON generato. Per un'inserzione di contenuto di Intlayer chiamata `heading`, utilizzerai `t("heading")`.

## Opzionale: Integrare con gli Script di Create React App (CRACO)

**react-intlayer** fornisce un approccio basato su CRACO per build personalizzate e configurazione del server di sviluppo. Se desideri che il passaggio di build di Intlayer sia integrato senza problemi, puoi:

1. **Installare react-intlayer** (se non lo hai già fatto):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Regolare i tuoi script di `package.json`** per utilizzare gli script di `react-intlayer`:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > Gli script di `react-intlayer` sono basati su [CRACO](https://craco.js.org/). Puoi anche implementare il tuo setup basato sul plugin craco di intlayer. [Vedi esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Ora, eseguendo `npm run build`, `yarn build`, o `pnpm build` attiva sia le build di Intlayer che quelle di CRA.

## Configurazione di TypeScript

**Intlayer** fornisce **definizioni di tipo autogenerate** per il tuo contenuto. Per assicurarti che TypeScript le riconosca, aggiungi **`types`** (o `types` se hai configurato diversamente) all'array **include** del tuo `tsconfig.json`:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Questo consentirà a TypeScript di dedurre la struttura delle tue traduzioni per migliori autocompletamenti e detection degli errori.

## Configurazione Git

Si consiglia di **ignorare** file e cartelle autogenerati da Intlayer. Aggiungi questa riga al tuo `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
i18next
```

In genere non committi queste risorse o artefatti di build interni `.intlayer`, poiché possono essere rigenerati ad ogni build.
