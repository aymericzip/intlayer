---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Preact i18n - Come tradurre un'app Preact nel 2026
description: Scopri come rendere il tuo sito Vite e Preact multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiungi comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizio cronologia
---

# Traduci la tua Vite and Preact con Intlayer | Internazionalizzazione (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

> Questo pacchetto è in fase di sviluppo. Consulta la [issue](https://github.com/aymericzip/intlayer/issues/118) per maggiori informazioni. Mostra il tuo interesse per Intlayer per Preact mettendo un like alla issue

Consulta il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-vite-preact-template) su GitHub.

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, rotte e contenuti.
- **Garantire il supporto a TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficia di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione Vite e Preact

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **preact-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Preact. Fornisce provider di contesto e hook per l'internazionalizzazione in Preact.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per impostare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefisso per tutte le lingue tranne quella predefinita
    storage: ["cookie", "header"], // Default: memorizza la lingua nei cookie e rileva dall'header
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefisso per tutte le lingue tranne quella predefinita
    storage: ["cookie", "header"], // Default: memorizza la lingua nei cookie e rileva dall'header
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefisso per tutte le lingue tranne quella predefinita
    storage: ["cookie", "header"], // Default: memorizza la lingua nei cookie e rileva dall'header
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, modalità di routing, opzioni di memorizzazione, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la costruzione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiara i Tuoi Contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Necessario se si usa JSX direttamente in .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Necessario se si usa JSX direttamente in .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez per testare HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir più",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena sono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

> Se il tuo file di contenuto include codice TSX, potresti dover importare `import { h } from "preact";` o assicurarti che il pragma JSX sia correttamente impostato per Preact.

### Passo 5: Utilizza Intlayer nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Si presume che tu abbia un preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Si presume che il tuo file CSS si chiami app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* Contenuto Markdown */}
      <div>{content.myMarkdownContent}</div>

      {/* Contenuto HTML */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Se vuoi usare il tuo contenuto in un attributo di tipo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, ad esempio:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Nota: In Preact, `className` è solitamente scritto come `class`.

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md) (L'API è simile per `preact-intlayer`).

> Se la tua app esiste già, puoi utilizzare l' [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) in combinazione con il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per convertire migliaia di componenti in un secondo.

### (Opzionale) Passo 6: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti permette di impostare la localizzazione dell'applicazione e aggiornare di conseguenza il contenuto.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambia lingua in Inglese
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambia lingua in Inglese
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambia lingua in Inglese
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md) (L'API è simile per `preact-intlayer`).

### (Opzionale) Passaggio 7: Aggiungi il routing localizzato alla tua applicazione

Lo scopo di questo passaggio è creare percorsi unici per ogni lingua. Questo è utile per la SEO e per URL amichevoli per la SEO.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Per impostazione predefinita, le rotte non sono prefissate per la lingua predefinita. Se desideri aggiungere un prefisso anche per la lingua predefinita, puoi impostare l'opzione `routing.mode` su `"prefix-all"` nella tua configurazione. Consulta la [documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge le rotte della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio che utilizza [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Un componente router che configura rotte specifiche per la lingua.
 * Usa preact-iso per gestire la navigazione e il rendering di componenti localizzati.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * Un componente router che configura rotte specifiche per la lingua.
 * Usa preact-iso per gestire la navigazione e il rendering di componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * Un componente router che configura rotte specifiche per la lingua.
 * Usa preact-iso per gestire la navigazione e il rendering di componenti localizzati.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

Poi, puoi usare il componente `LocaleRouter` nella tua applicazione:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... Il tuo componente AppContent

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Il tuo componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Il tuo componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (Opzionale) Passaggio 8: Cambia l'URL quando cambia la lingua

Per cambiare l'URL quando la lingua cambia, puoi utilizzare la proprietà `onLocaleChange` fornita dall'hook `useLocale`. In parallelo, puoi usare il metodo `route` di `useLocation` di `preact-iso` per aggiornare il percorso dell'URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // Costruisci l'URL con la lingua aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // Aggiorna il percorso dell'URL
      route(pathWithLocale, true); // true per sostituire
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // La navigazione programmatica dopo il cambio di lingua sarà gestita da onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Francés con la lingua corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> Riferimenti alla documentazione:
>
> > - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md) (l'API è simile per `preact-intlayer`)> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)> - [Attributo `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [Attributo `lang`](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/lang)> - [Attributo `dir`](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/dir)> - [Attributo `aria-current`](https://developer.mozilla.org/it/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [API Popover](https://developer.mozilla.org/it/docs/Web/API/Popover_API)

### (Opzionale) Passaggio 9: Cambia gli attributi HTML di lingua e direzione

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per farli corrispondere alla lingua corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si basano sull'attributo `lang` corretto per pronunciare e interpretare accuratamente i contenuti.
- **Rendering del testo**: L'attributo `dir` (direzione) assicura che il testo venga visualizzato nell'ordine corretto (ad esempio, da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della tua pagina, aiutando a fornire il contenuto localizzato appropriato nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando la lingua cambia, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

#### Implementazione del Hook

Crea un hook personalizzato per gestire gli attributi HTML. L'hook ascolta i cambiamenti della lingua e aggiorna gli attributi di conseguenza:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
 * - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
 * - `dir`: Garantisce l'ordine di lettura corretto (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
 *
 * Questo aggiornamento dinamico è essenziale per una corretta resa del testo, accessibilità e SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aggiorna l'attributo della lingua alla lingua corrente.
    document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla lingua corrente.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Utilizzo del Hook nella tua Applicazione

Integra l'hook nel tuo componente principale in modo che gli attributi HTML vengano aggiornati ogni volta che la lingua cambia:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer già importato se AppContent ne ha bisogno
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definizione di AppContent dal Passaggio 5

const AppWithHooks: FunctionalComponent = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla lingua corrente.
  useI18nHTMLAttributes();

  // Supponendo che AppContent sia il componente principale per la visualizzazione dei contenuti dal Passaggio 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definizione di AppContent dal Passaggio 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Definizione di AppContent dal Passaggio 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

### (Opzionale) Passaggio 10: Creazione di un componente di collegamento localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni.

Questo comportamento è utile per diversi motivi:

- **SEO ed esperienza utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un collegamento localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della lingua corrente, evitando cambiamenti di lingua imprevisti.
- **Manutenibilità**: Centralizzare la logica di localizzazione in un unico componente semplifica la gestione degli URL.

Di seguito è riportata l'implementazione di un componente `Link` localizzato in Preact:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Funzione di utilità per verificare se un URL dato è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i collegamenti interni, utilizza `getLocalizedUrl` per anteporre all'URL la lingua (ad esempio, /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Se il collegamento è interno e viene fornito un href valido, ottieni l'URL localizzato.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * Funzione di utilità per verificare se un URL dato è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i collegamenti interni, utilizza `getLocalizedUrl` per anteporre all'URL la lingua (ad esempio, /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se il collegamento è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * Funzione di utilità per verificare se un URL dato è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i collegamenti interni, utilizza `getLocalizedUrl` per anteporre all'URL la lingua (ad esempio, /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se il collegamento è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### Come Funziona

- **Rilevamento dei collegamenti esterni**:  
  La funzione di supporto `checkIsExternalLink` determina se un URL è esterno. I collegamenti esterni rimangono invariati perché non necessitano di localizzazione.
- **Recupero della lingua corrente**:  
  L'hook `useLocale` fornisce la lingua corrente (ad esempio, `fr` per il francese).
- **Localizzazione dell'URL**:  
  Per i collegamenti interni (ovvero non esterni), viene utilizzato `getLocalizedUrl` per anteporre automaticamente l'URL con la lingua corrente. Ciò significa che se il tuo utente è in francese, passare `/about` come `href` lo trasformerà in `/fr/about`.
- **Restituzione del collegamento**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la lingua.

### (Opzionale) Passo 11: Rendering di Markdown e HTML

Intlayer supporta il rendering di contenuti Markdown e HTML in Preact.

Puoi personalizzare il rendering dei contenuti Markdown e HTML utilizzando il metodo `.use()`. Questo metodo ti consente di sovrascrivere il rendering predefinito di tag specifici.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* Rendering di base */}
    {myMarkdownContent}

    {/* Rendering personalizzato per Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* Rendering di base per HTML */}
    {myHtmlContent}

    {/* Rendering personalizzato per HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### Configura TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere la tua base di codice più robusta.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Consigliato per Preact 10+
    // ...
  },
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

> Assicurati che il tuo `tsconfig.json` sia impostato per Preact, in particolare `jsx` e `jsxImportSource` oppure `jsxFactory`/`jsxFragmentFactory` per versioni precedenti di Preact se non utilizzi i valori predefiniti di `preset-vite`.

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò ti consente di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime in linea** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Andare oltre

Per andare oltre, puoi implementare l’[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---
