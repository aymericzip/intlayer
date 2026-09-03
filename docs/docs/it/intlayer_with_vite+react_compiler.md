---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Vite + React i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Vite + React multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
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
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Rilascio iniziale"
author: aymericzip
---

# Come rendere multilingue (i18n) un'applicazione Vite e React esistente (guida i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="La migliore soluzione i18n per Vite e React? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
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

<Steps>

<Step number={1} title="Installare le Dipendenze">

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce context provider e hook per l'internazionalizzazione in React.

- **vite-intlayer**
  Include il plugin Vite per l'integrazione di Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

</Step>

<Step number={2} title="Configurare il Progetto">

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
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Inserisci solo il contenuto nel file generato, senza chiave.
     */
    noMetadata: false,

    /**
     * Prefisso chiave dizionario
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Indica se i componenti devono essere salvati dopo essere stati trasformati.
     * In questo modo, il compilatore può essere eseguito una sola volta per trasformare l'app e poi rimosso.
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

</Step>

<Step number={3} title="Integrare Intlayer nella Configurazione di Vite">

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

> Il plugin Vite `intlayerCompiler()` viene utilizzato per estrarre il contenuto dai componenti e scrivere i file `.content`.

> A partire da Intlayer v9, il compiler è integrato direttamente nel plugin `intlayer()` e si attiva automaticamente quando `compiler.enabled` è impostato con un percorso `compiler.output`. Registrare `intlayerCompiler()` separatamente come mostrato di seguito è ora facoltativo — si deduplica automaticamente se aggiunto. Vedi le [note sulla versione v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/releases/v9.md).

</Step>

<Step number={4} title="Compilare il Codice">

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

</Step>

<Step number={6} title="Cambiare la lingua del contenuto" isOptional={true}>

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

</Step>

<Step number={7} title="Riempire le traduzioni mancanti" isOptional={true}>

Intlayer fornisce uno strumento CLI per aiutarti a riempire le traduzioni mancanti. Puoi usare il comando `intlayer` per testare e riempire le traduzioni mancanti dal tuo codice.

```bash packageManager="npm"
npx intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash packageManager="yarn"
yarn intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash packageManager="pnpm"
pnpm intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash packageManager="bun"
bun x intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash packageManager="npm"
npx intlayer fill         # Riempi le traduzioni mancanti
```

```bash packageManager="yarn"
yarn intlayer fill         # Riempi le traduzioni mancanti
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Riempi le traduzioni mancanti
```

```bash packageManager="bun"
bun x intlayer fill         # Riempi le traduzioni mancanti
```

> Per maggiori dettagli, fare riferimento alla [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/ci.md)

</Step>

</Steps>

### (Opzionale) Sitemap e robots.txt (generazione in build)

Intlayer espone utilità - `generateSitemap` e `getMultilingualUrls` - per formattare `sitemap.xml` multilingue e `robots.txt` pronti per i crawler e scriverli automaticamente in `public/`. Di solito si esegue un piccolo script Node **prima** di Vite (ad esempio hook npm `predev` / `prebuild`) così che i file siano presenti in build o in sviluppo.

#### Sitemap

Il generatore di sitemap di Intlayer rispetta le tue lingue e aggiunge i metadati attesi dai crawler.

> La sitemap supporta lo spazio dei nomi `xhtml:link` (hreflang). Invece di elencare solo URL “piatti”, Intlayer collega in modo bidirezionale tutte le versioni linguistiche di ogni pagina (ad es. `/about`, `/fr/about` o `/about?lang=fr` a seconda del routing).

#### Robots.txt

Usa `getMultilingualUrls` così le regole `Disallow` coprono tutte le varianti localizzate dei percorsi sensibili.

#### 1. Aggiungi `generate-seo.mjs` nella root del progetto

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Serve il pacchetto `intlayer` installato. Imposta `SITE_URL` in ambiente per la produzione (es. in CI).

> Preferisci `generate-seo.mjs` per l’ESM di Node. Con `generate-seo.js` imposta `"type": "module"` in `package.json` oppure abilita l’ESM in Node.

#### 2. Esegui lo script prima di Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Adatta i comandi se usi pnpm o yarn. Puoi anche richiamare lo script dalla CI o da un altro passo del pipeline.

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

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un'app Vite e React?">

- **`react-i18next` / `i18next`**: namespace JSON caricati a runtime, con chiavi scritte a mano in ogni punto di chiamata.
- **`react-intl`** e **`Lingui`**: messaggi ICU con un passaggio di estrazione che esegui tu stesso.
- **`Intlayer`**: contenuto compilato dai tuoi componenti in fase di build, completamente tipizzato, con traduzione AI, un editor visivo e un CMS.

Questa guida usa la configurazione con il compilatore, dove continui a scrivere stringhe semplici nei tuoi componenti e i dizionari sono generati per te. Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle Vite?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate, e i [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `react-i18next` o `react-intl` senza riscrivere i miei componenti?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md) o la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `react-i18next`, `react-intl` e `i18next`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice dei componenti no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No, ed è ciò che questa guida configura. Scrivi i tuoi componenti con stringhe semplici nella tua locale predefinita, e il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) analizza il sorgente ad ogni build, estrae il testo visibile all'utente e genera i dizionari, così non ci sono chiavi da creare o mantenere a mano.

Due limiti vale la pena conoscere. Il compilatore funziona per analisi statica, quindi le stringhe che esistono solo a runtime, come i codici di errore delle API o i campi del CMS, restano fuori portata e hanno comunque bisogno di un dizionario dichiarato. E deve distinguere il testo visibile all'utente dalla logica applicativa come `className="active"` o un codice di stato, il che richiede alcune annotazioni in una codebase estesa.

Se preferisci mantenere il controllo, `npx intlayer extract` esegue la stessa estrazione una volta, sui file che scegli, e scrive un file `.content` accanto a ciascun componente perché tu lo riveda. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Dovrei usare il compilatore o dichiarare il mio contenuto io stesso?">

Usa il compilatore quando vuoi aggiungere l'i18n a una codebase esistente con il minimo di cambiamenti: mantieni i tuoi componenti come sono e i dizionari seguono. Dichiara il contenuto tu stesso, come mostra la [guida Vite e React standard](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md), quando vuoi un controllo esplicito su chiavi, struttura e riuso tra componenti. I due possono coesistere: il contenuto compilato e il contenuto dichiarato vivono nello stesso livello di dizionari.

</Question>

<Question title="Cosa succede alle stringhe che il compilatore non riesce a vedere?">

Restano non tradotte, perché il compilatore funziona per analisi statica. Qualsiasi cosa assemblata a runtime, come un messaggio di errore di un'API, un campo del CMS o una stringa costruita per concatenazione, deve essere dichiarata in un file di contenuto nel modo normale. Esegui `npx intlayer test` per trovare ciò che manca.

</Question>

<Question title="Come decide il compilatore cos'è testo visibile all'utente?">

Con euristiche sul tuo JSX, motivo per cui può sbagliare in entrambe le direzioni: un valore `className` o un codice di stato possono sembrare testo, e un pattern insolito può essere mancato. In una codebase estesa correggi i casi limite con annotazioni. Se quel compromesso non ti va bene, `npx intlayer extract` esegue la stessa estrazione una volta e lascia il risultato come diff da rivedere. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

</Question>

<Question title="Come riempio le traduzioni mancanti?">

Lo copre il passo 7. `npx intlayer fill` invia il contenuto estratto all'LLM di tua scelta, usando il tuo provider e la tua API key, e `--git-diff` limita l'esecuzione a ciò che è cambiato nel branch. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

</Question>

<Question title="Come cambio la lingua a runtime?">

Lo copre il passo 6. `useLocale` espone la locale attiva, le locale dichiarate e un setter che persiste la scelta, e i componenti che leggono contenuto compilato vengono ri-renderizzati nella nuova lingua senza un ricaricamento della pagina.

</Question>

<Question title="Intlayer supporta plurali, genere e rich text?">

Sì: [forme plurali](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/plurial.md), [contenuto basato sul genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md), condizioni, [inserimenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md) e [formattatori](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) per numeri, date e valute.

</Question>

<Question title="Come possono i traduttori modificare il contenuto senza toccare il codice?">

Attraverso l'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), che gira sulla tua infrastruttura e permette a chiunque di modificare il testo sul posto nell'app in esecuzione, o il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), che esternalizza il contenuto così può cambiare senza un deployment.

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il CMS ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
