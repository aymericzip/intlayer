---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite e React i18n - Trasforma un'app esistente in un'app multilingue (guida i18n 2026)
description: Scopri come rendere multilingue la tua applicazione Vite e React esistente utilizzando Intlayer Compiler. Segui la documentazione per l'internazionalizzazione (i18n) e la traduzione con l'IA.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Vite
  - React
  - Compilatore
  - IA
slugs:
  - doc
  - ambiente
  - vite-e-react
  - compilatore
  - IA
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Rilascio iniziale
---

# Come rendere multilingue (i18n) un'applicazione Vite e React esistente (guida i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="La migliore soluzione i18n per Vite e React? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-vite-react-template) su GitHub.

## Indice

<TOC/>

## Perché è difficile internazionalizzare un'applicazione esistente?

Se hai mai provato ad aggiungere più lingue a un'app creata per una sola, conosci il dolore. Non è solo "difficile", è noioso. Devi setacciare ogni singolo file, dare la caccia a ogni stringa di testo e spostarle in file dizionario separati.

Poi arriva la parte rischiosa: sostituire tutto quel testo con hook di codice senza rompere il layout o la logica. È il tipo di lavoro che blocca lo sviluppo di nuove funzionalità per settimane e sembra un refactoring senza fine.

## Cos'è l'Intlayer Compiler?

L'**Intlayer Compiler** è stato creato per saltare quel lavoro manuale faticoso. Invece di estrarre manualmente le stringhe, il compilatore lo fa per te. Scansiona il tuo codice, trova il testo e utilizza l'IA per generare i dizionari dietro le quinte.
Quindi, modifica il tuo codice durante la build per iniettare gli hook i18n necessari. In pratica, continui a scrivere la tua app come se fosse in una sola lingua, e il compilatore gestisce automaticamente la trasformazione multilingue.

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)

### Limitazioni

Poiché il compilatore esegue l'analisi e la trasformazione del codice (inserendo hook e generando dizionari) in fase di **compilazione**, può **rallentare il processo di build** della tua applicazione.

Per mitigare questo impatto durante lo sviluppo, puoi configurare il compilatore per l'esecuzione in modalità [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) o disabilitarlo quando non è necessario.

---

## Guida Passo dopo Passo per Configurare Intlayer in un'Applicazione Vite e React

### Passaggio 1: Installare le Dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce context provider e hook per l'internazionalizzazione in React.

- **vite-intlayer**
  Include il plugin Vite per l'integrazione di Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passaggio 2: Configurare il Progetto

Crea un file di configurazione per impostare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Indica se il compilatore deve essere abilitato.
     */
    enabled: true,

    /**
     * Directory di output per i dizionari ottimizzati.
     */
    outputDir: "compiler",

    /**
     * Prefisso della chiave del dizionario
     */
    dictionaryKeyPrefix: "", // Rimuovi il prefisso di base

    /**
     * Indica se i componenti devono essere salvati dopo essere stati trasformati.
     * In questo modo, il compilatore può essere eseguito una sola volta per trasformare l'app e può quindi essere rimosso.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Questa è un'app di mappe", // Nota: puoi personalizzare questa descrizione dell'app
  },
};

export default config;
```

> **Nota**: Assicurati di avere la tua `OPEN_AI_API_KEY` impostata nelle variabili d'ambiente.

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Passaggio 3: Integrare Intlayer nella Configurazione di Vite

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

> Il plugin Vite `intlayerCompiler()` viene utilizzato per estrarre il contenuto dai componenti e scrivere i file `.content`.

### Passaggio 4: Compilare il Codice

Scrivi semplicemente i tuoi componenti con stringhe codificate nella tua lingua predefinita. Il compilatore gestisce il resto.

Esempio di come potrebbe apparire la tua pagina:

<Tabs>
 <Tab value="Codice">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Logo Vite" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="Logo React" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          il conteggio è {count}
        </button>
        <p>
          Modifica <code>src/App.tsx</code> e salva per testare HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clicca sui loghi Vite e React per saperne di più
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Output">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      it: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "il conteggio è",
        editMessage: "Modifica",
        hmrMessage: "e salva per testare HMR",
        readTheDocs: "Clicca sui loghi Vite e React per saperne di più",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** viene utilizzato per fornire la lingua ai componenti annidati.

### (Opzionale) Passaggio 6: Cambiare la lingua del contenuto

Per cambiare la lingua del tuo contenuto, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare il contenuto di conseguenza.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in inglese
    </button>
  );
};
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### (Opzionale) Passaggio 7: Riempire le traduzioni mancanti

Intlayer fornisce uno strumento CLI per aiutarti a riempire le traduzioni mancanti. Puoi usare il comando `intlayer` per testare e riempire le traduzioni mancanti dal tuo codice.

```bash
npx intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash
npx intlayer fill         # Riempi le traduzioni mancanti
```

> Per maggiori dettagli, fare riferimento alla [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/ci.md)

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò consente di evitare di caricarli nel repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime in linea** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
