---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Traduci il tuo sito Vite e Preact (i18n)
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
---

# Iniziare con l'internazionalizzazione (i18n) usando Intlayer, Vite e Preact

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
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

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
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

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
          Modifica <code>src/app.tsx</code> e salva per testare HMR
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
      it: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
      it: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      it: "il conteggio è ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      it: "Modifica src/app.jsx e salva per testare HMR",
    }),
      es: "Modifica src/app.jsx e salva per testare HMR",
    }),

    readTheDocs: t({
      en: "Clicca sui loghi di Vite e Preact per saperne di più",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haz clic en los logotipos de Vite y Preact para obtener más información",
      it: "Clicca sui loghi di Vite e Preact per saperne di più",
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
      it: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
      it: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      it: "il conteggio è ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      it: "Modifica src/app.tsx e salva per testare HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      it: "Clicca sui loghi di Vite e Preact per saperne di più",
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
        "es": "Logo Vite",
        "it": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "it": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "it": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "it": "il conteggio è "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "it": "Modifica src/app.tsx e salva per testare HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "it": "Clicca sui loghi di Vite e Preact per saperne di più"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena sono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

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

### (Opzionale) Passo 7: Aggiungi il routing localizzato alla tua applicazione

Lo scopo di questo passaggio è creare percorsi unici per ogni lingua. Questo è utile per la SEO e per URL amichevoli per la SEO.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Per impostazione predefinita, le rotte non sono prefissate per la lingua predefinita. Se desideri aggiungere un prefisso anche per la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Consulta la [documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge le rotte della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio che utilizza [preact-iso](https://github.com/preactjs/preact-iso):

Per prima cosa, installa `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto della lingua appropriata.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la lingua corrente, tornando alla lingua predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuove il prefisso della lingua dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la lingua predefinita deve sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la lingua
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla lingua predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Sostituisce la voce corrente nella cronologia con la nuova
        />
      );
    }

    // Avvolge i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è false, la lingua predefinita non è prefissata.
     * Assicurarsi che la locale corrente sia valida e non la locale predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Escludi la locale predefinita
        )
        .includes(currentLocale) // Verifica se la locale corrente è nella lista delle locale valide
    ) {
      // Reindirizza al percorso senza prefisso della locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolgi i children con IntlayerProvider e imposta la locale corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente router che configura le rotte specifiche per la localizzazione.
 * Usa preact-iso per gestire la navigazione e rendere i componenti localizzati.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Importazione delle dipendenze e funzioni necessarie
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Necessario per JSX

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto della locale appropriata.
 * Gestisce il rilevamento e la validazione della locale basata sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la locale corrente, ricadendo sulla locale predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuove il prefisso della locale dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la locale predefinita deve sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la localizzazione
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla localizzazione predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Sostituisce la voce corrente nella cronologia con la nuova
        />
      );
    }

    // Avvolge i figli con IntlayerProvider e imposta la localizzazione corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la localizzazione predefinita non è prefissata.
     * Assicurarsi che la localizzazione corrente sia valida e non la localizzazione predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Escludi la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nella lista delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso della lingua
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente router che configura rotte specifiche per la localizzazione.
 * Usa preact-iso per gestire la navigazione e il rendering di componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importazione delle dipendenze e funzioni necessarie
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Richiesto per JSX

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto di locale appropriato.
 * Gestisce il rilevamento e la validazione del locale basati sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la locale corrente, utilizzando quella di default se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuove il prefisso della locale dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la locale di default deve sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la locale
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla locale di default con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Sostituisce la voce corrente della cronologia con quella nuova
        />
      );
    }

    // Avvolge i figli con IntlayerProvider e imposta la locale corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la locale predefinita non è prefissata.
     * Assicurarsi che la locale corrente sia valida e non la locale predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Escludi la locale predefinita
        )
        .includes(currentLocale) // Controlla se la locale corrente è nella lista delle locale valide
    ) {
      // Reindirizza al percorso senza prefisso della locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolge i figli con IntlayerProvider e imposta la locale corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Un componente router che configura rotte specifiche per la localizzazione.
 * Usa preact-iso per gestire la navigazione e rendere componenti localizzati.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Poi, puoi usare il componente `LocaleRouter` nella tua applicazione:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Il tuo componente AppContent (definito nel Passo 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Il tuo componente AppContent (definito nel Passo 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Il tuo componente AppContent (definito nel Passo 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

In parallelo, puoi anche utilizzare il `intlayerMiddleware` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la locale corrente basandosi sull'URL e imposterà il cookie della locale appropriata. Se non viene specificata alcuna locale, il plugin determinerà la locale più adatta in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna locale, verrà effettuato un reindirizzamento alla locale predefinita.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

### (Opzionale) Passo 8: Cambiare l'URL quando la lingua cambia

Per cambiare l'URL quando la lingua cambia, puoi utilizzare la proprietà `onLocaleChange` fornita dal hook `useLocale`. Parallelamente, puoi usare `useLocation` e `route` da `preact-iso` per aggiornare il percorso dell'URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso fornisce l'URL completo
      // Costruisci l'URL con la locale aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Aggiorna il percorso URL
      route(pathWithLocale, true); // true per sostituire
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // La navigazione programmatica dopo l'impostazione della lingua sarà gestita da onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Lingua - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa lingua - es. Français */}
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
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Per JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Per JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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

module.exports = LocaleSwitcher;
```

> Riferimenti alla documentazione:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md) (L'API è simile per `preact-intlayer`)
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)
> - Attributo [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - Attributo [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - Attributo [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - Attributo [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [API Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) > > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md) (L'API è simile per `preact-intlayer`)> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=it)> - [`lang` attribute](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/lang)> - [`dir` attribute](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` attribute](https://developer.mozilla.org/it/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/it/docs/Web/API/Popover_API)

Di seguito è riportato il **Passo 9** aggiornato con spiegazioni aggiuntive ed esempi di codice perfezionati:

---

### (Opzionale) Passo 9: Cambiare gli attributi di lingua e direzione dell'HTML

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per farli corrispondere alla locale corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si basano sull'attributo `lang` corretto per pronunciare e interpretare accuratamente i contenuti.
- **Rendering del testo**: L'attributo `dir` (direzione) assicura che il testo venga visualizzato nell'ordine corretto (ad esempio, da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della tua pagina, aiutando a fornire il contenuto localizzato corretto nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando la locale cambia, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

#### Implementazione del Hook

Crea un hook personalizzato per gestire gli attributi HTML. Il hook ascolta i cambiamenti della locale e aggiorna gli attributi di conseguenza:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla locale corrente.
 * - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
 * - `dir`: Garantisce l'ordine di lettura corretto (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
 *
 * Questo aggiornamento dinamico è essenziale per una corretta resa del testo, accessibilità e SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aggiorna l'attributo della lingua alla locale corrente.
    document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla locale corrente.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla locale corrente.
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
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla locale corrente.
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

Integra il hook nel tuo componente principale in modo che gli attributi HTML vengano aggiornati ogni volta che la locale cambia:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer già importato se AppContent ne ha bisogno
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definizione di AppContent dal Passo 5

const AppWithHooks: FunctionalComponent = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla locale.
  useI18nHTMLAttributes();

  // Si assume che AppContent sia il componente principale per la visualizzazione del contenuto dal Passo 5
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
// Definizione di AppContent dal Passo 5

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
// Definizione di AppContent dal Passo 5

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

Applicando queste modifiche, la tua applicazione:

- Garantirà che l'attributo **lingua** (`lang`) rifletta correttamente la locale corrente, cosa importante per la SEO e il comportamento del browser.
- Adatterà la **direzione del testo** (`dir`) in base alla locale, migliorando la leggibilità e l'usabilità per le lingue con ordini di lettura differenti.
- Fornire un'esperienza più **accessibile**, poiché le tecnologie assistive dipendono da questi attributi per funzionare in modo ottimale.

### (Opzionale) Passo 10: Creare un componente Link localizzato

Per garantire che la navigazione della tua applicazione rispetti la locale corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni.

Questo comportamento è utile per diversi motivi:

- **SEO e esperienza utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e offrono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della locale corrente, evitando cambiamenti di lingua imprevisti.
- **Manutenibilità**: Centralizzare la logica di localizzazione in un unico componente semplifica la gestione degli URL.

Per Preact con `preact-iso`, i tag `<a>` standard sono tipicamente usati per la navigazione, e `preact-iso` gestisce il routing. Se hai bisogno di una navigazione programmata al click (ad esempio, per eseguire azioni prima della navigazione), puoi usare la funzione `route` da `useLocation`. Ecco come puoi creare un componente anchor personalizzato che localizza gli URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Si assume che useLocation e route possano provenire da preact-iso tramite preact-intlayer se riesportati, oppure importarli direttamente
// Se non re-esportato, importare direttamente: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Per HTMLAttributes
import { forwardRef } from "preact/compat"; // Per inoltrare i ref

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Opzionale: per sostituire lo stato della cronologia
}

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla locale corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per anteporre la localizzazione all'URL (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto di localizzazione.
 * Utilizza un tag <a> standard ma può attivare la navigazione lato client usando `route` di preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // da preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Assicurarsi che href sia definito
        event.button === 0 && // Click sinistro
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Controllo standard dei modificatori
        !props.target // Non aprire in una nuova scheda/finestra
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Naviga solo se l'URL è diverso
          route(hrefI18n, replace); // Usa route di preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Importa da preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Per JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Import da preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Per JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

// Controlla se il link è esterno
const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // Ottiene la locale corrente
    const location = useLocation(); // Ottiene la posizione attuale
    const isExternalLink = checkIsExternalLink(href); // Verifica se il link è esterno

    // Ottiene l'URL localizzato se il link non è esterno
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione di supporto `checkIsExternalLink` determina se un URL è esterno. I link esterni vengono lasciati invariati.
- **Recupero della Locale Corrente**:  
  L'hook `useLocale` fornisce la locale corrente.
- **Localizzazione dell'URL**:  
  Per i link interni, `getLocalizedUrl` aggiunge il prefisso della locale corrente all'URL.
- **Navigazione lato Client**:
  La funzione `handleClick` verifica se si tratta di un link interno e se la navigazione standard deve essere prevenuta. In tal caso, utilizza la funzione `route` di `preact-iso` (ottenuta tramite `useLocation` o importata direttamente) per eseguire la navigazione lato client. Questo fornisce un comportamento simile a una SPA senza ricaricare completamente la pagina.
- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato e il gestore di click personalizzato.

### Configurare TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

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
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

> Assicurati che il tuo `tsconfig.json` sia configurato per Preact, in particolare `jsx` e `jsxImportSource` oppure `jsxFactory`/`jsxFragmentFactory` per versioni più vecchie di Preact se non usi i valori predefiniti di `preset-vite`.

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Andare oltre

Per andare oltre, puoi implementare l’[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) oppure esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Cronologia del documento

- 5.5.10 - 2025-06-29: Inizio cronologia
