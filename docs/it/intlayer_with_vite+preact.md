# Iniziare con l'internazionalizzazione (i18n) con Intlayer, Vite e Preact

> Questo pacchetto è in fase di sviluppo. Consulta il [problema](https://github.com/aymericzip/intlayer/issues/118) per maggiori informazioni. Mostra il tuo interesse per Intlayer per Preact mettendo un like al problema.

Consulta il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-vite-preact-template) su GitHub.

## Cos'è Intlayer?

**Intlayer** è una libreria open-source innovativa per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento dinamico della lingua e il cambio di lingua.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vite e Preact

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md), transpilation e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **preact-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Preact. Fornisce provider di contesto e hook per l'internazionalizzazione in Preact.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Altre lingue
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
      // Altre lingue
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
      // Altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Tramite questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella configurazione di Vite

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> Il plugin `intlayerPlugin()` di Vite viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce variabili di ambiente Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiarare i tuoi contenuti

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      it: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      it: "Modifica src/app.tsx e salva per testare HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      it: "Clicca sui loghi di Vite e Preact per saperne di più",
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
// import { h } from 'preact'; // Necessario se usi JSX direttamente in .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      it: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      it: "Modifica src/app.jsx e salva per testare HMR",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      it: "Clicca sui loghi di Vite e Preact per saperne di più",
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
// const { h } = require('preact'); // Necessario se usi JSX direttamente in .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      it: "Logo Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      it: "il conteggio è ",
    }),

    edit: t({
      it: "Modifica src/app.tsx e salva per testare HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
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

> Le dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulle dichiarazioni di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

> Se il tuo file di contenuto include codice TSX, potresti dover importare `import { h } from "preact";` o assicurarti che la tua pragma JSX sia correttamente impostata per Preact.

### Step 5: Utilizza Intlayer nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Supponendo che tu abbia un preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Supponendo che il tuo file CSS si chiami app.css
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

> Se vuoi utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:

> ```jsx
>
> ```

> <img src={content.image.src.value} alt={content.image.value} />

> ```
>
> ```

> Nota: In Preact, `className` è tipicamente scritto come `class`.

> Per saperne di più sul hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md) (L'API è simile per `preact-intlayer`).

### (Opzionale) Step 6: Cambia la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi utilizzare la funzione `setLocale` fornita dal hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare il contenuto di conseguenza.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Cambia lingua in Inglese

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

> Per saperne di più sul hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md) (L'API è simile per `preact-intlayer`).

### (Opzionale) Passo 7: Aggiungi routing localizzato alla tua applicazione

Lo scopo di questo passo è creare percorsi unici per ogni lingua. Questo è utile per SEO e URL ottimizzati per i motori di ricerca.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Per impostazione predefinita, i percorsi non sono prefissati per la lingua predefinita. Se desideri prefissare la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per maggiori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge i percorsi della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio utilizzando [preact-iso](https://github.com/preactjs/preact-iso):

Prima, installa `preact-iso`:

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

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
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
          replace // Sostituisce la voce corrente nella cronologia con quella nuova
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
     * Assicurati che la lingua corrente sia valida e non quella predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Esclude la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nella lista delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso della lingua
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolge i figli con IntlayerProvider e imposta la lingua corrente
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
 * Un componente router che configura percorsi specifici per lingua.
 * Utilizza preact-iso per gestire la navigazione e rendere i componenti localizzati.
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

// De-strutturazione della configurazione da Intlayer
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
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto della lingua appropriata.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
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
          replace // Sostituisce la voce corrente nella cronologia con quella nuova
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
     * Assicurati che la lingua corrente sia valida e non quella predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Esclude la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nella lista delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso della lingua
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolge i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

* Quando middleware.prefixDefault è false, la lingua predefinita non è prefissata.
     * Assicurati che la lingua corrente sia valida e non sia la lingua predefinita.
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
 * Un componente router che configura percorsi specifici per lingua.
 * Utilizza preact-iso per gestire la navigazione e rendere i componenti localizzati.
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
const { h } = require("preact"); // Necessario per JSX

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
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto della lingua appropriata.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
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
          replace // Sostituisci la voce corrente nella cronologia con quella nuova
        />
      );
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è false, la lingua predefinita non è prefissata.
     * Assicurati che la lingua corrente sia valida e non sia la lingua predefinita.
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
 * Un componente router che configura percorsi specifici per lingua.
 * Utilizza preact-iso per gestire la navigazione e rendere i componenti localizzati.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Poi, puoi utilizzare il componente `LocaleRouter` nella tua applicazione:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Il tuo componente AppContent (definito nel Passaggio 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Il tuo componente AppContent (definito nel Passaggio 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Il tuo componente AppContent (definito nel Passaggio 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

In parallelo, puoi anche utilizzare il `intLayerMiddlewarePlugin` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente basata sull'URL e imposterà il cookie della lingua appropriata. Se non è specificata alcuna lingua, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, reindirizzerà alla lingua predefinita.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opzionale) Passaggio 8: Cambia l'URL quando cambia la lingua

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
      // Costruisce l'URL con la lingua locale aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

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
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // La navigazione programmata dopo aver impostato la lingua locale sarà gestita da onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Lingua locale - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria lingua locale - es. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua locale corrente - es. Francés con lingua corrente impostata su Locales.SPANISH */}
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

> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md) (API simile per `preact-intlayer`)

> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)

> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=it)

> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

---

### (Opzionale) Passo 9: Cambiare gli attributi di lingua e direzione HTML

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per corrispondere alla lingua locale corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si basano sull'attributo `lang` corretto per pronunciare e interpretare il contenuto in modo accurato.
- **Rendering del testo**: L'attributo `dir` (direzione) garantisce che il testo venga reso nell'ordine corretto (es. da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della tua pagina, aiutando a fornire il contenuto localizzato corretto nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando cambia la lingua locale, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

#### Implementazione del Hook

Crea un hook personalizzato per gestire gli attributi HTML. Il hook ascolta i cambiamenti di lingua locale e aggiorna gli attributi di conseguenza:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
- - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
- - `dir`: Garantisce il corretto ordine di lettura (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
-
- Questo aggiornamento dinamico è essenziale per una corretta visualizzazione del testo, accessibilità e SEO.
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// Aggiorna l'attributo della lingua in base alla lingua corrente.
document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla lingua corrente.
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

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
````

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

#### Utilizzo dell'Hook nella tua Applicazione

Integra l'hook nel tuo componente principale in modo che gli attributi HTML vengano aggiornati ogni volta che cambia la lingua:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer già importato se AppContent ne ha bisogno
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definizione di AppContent dal Passo 5

const AppWithHooks: FunctionalComponent = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla lingua.
  useI18nHTMLAttributes();

  // Supponendo che AppContent sia il tuo componente principale per visualizzare i contenuti dal Passo 5
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

- Garantirà che l'attributo **lingua** (`lang`) rifletta correttamente la lingua corrente, importante per SEO e comportamento del browser.
- Adatterà la **direzione del testo** (`dir`) in base alla lingua, migliorando la leggibilità e l'usabilità per lingue con ordini di lettura diversi.
- Fornirà un'esperienza più **accessibile**, poiché le tecnologie assistive dipendono da questi attributi per funzionare in modo ottimale.

### (Opzionale) Passo 10: Creazione di un Componente Link Localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente un prefisso agli URL interni con la lingua corrente.

Questo comportamento è utile per diversi motivi:

- **SEO ed Esperienza Utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga nel contesto della lingua corrente, evitando cambiamenti di lingua inaspettati.
- **Manutenibilità**: Centralizzando la logica di localizzazione in un unico componente, semplifichi la gestione degli URL.

Per Preact con `preact-iso`, i tag `<a>` standard sono generalmente utilizzati per la navigazione, e `preact-iso` gestisce il routing. Se hai bisogno di una navigazione programmata al clic (ad esempio, per eseguire azioni prima di navigare), puoi utilizzare la funzione `route` da `useLocation`. Ecco come creare un componente anchor personalizzato che localizza gli URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Supponendo che useLocation e route possano essere da preact-iso tramite preact-intlayer se riesportati, o importati direttamente
// Se non riesportati, importa direttamente: import { useLocation, route } from "preact-iso";
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
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere un prefisso all'URL con la lingua (ad esempio, /it/about).
 * Questo garantisce che la navigazione rimanga nel contesto della lingua corrente.
 * Utilizza un tag <a> standard ma può attivare la navigazione lato client utilizzando `route` di preact-iso.
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
        href && // Assicurati che href sia definito
        event.button === 0 && // Clic sinistro
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Controllo dei modificatori standard
        !props.target // Non sta puntando a una nuova scheda/finestra
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
const { useLocation, route } = require("preact-iso"); // Importa da preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Per JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
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

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione helper `checkIsExternalLink` determina se un URL è esterno. I link esterni rimangono invariati.
- **Recupero della Lingua Corrente**:  
  L'hook `useLocale` fornisce la lingua corrente.
- **Localizzazione dell'URL**:  
  Per i link interni, `getLocalizedUrl` aggiunge il prefisso della lingua corrente all'URL.
- **Navigazione Lato Client**:
  La funzione `handleClick` verifica se si tratta di un link interno e se la navigazione standard deve essere evitata. In tal caso, utilizza la funzione `route` di `preact-iso` (ottenuta tramite `useLocation` o importata direttamente) per eseguire la navigazione lato client. Questo fornisce un comportamento simile a una SPA senza ricaricare completamente la pagina.
- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato e il gestore di clic personalizzato.

### Configurare TypeScript

Intlayer utilizza l'estensione dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi generati automaticamente.

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

> Assicurati che il tuo `tsconfig.json` sia configurato per Preact, in particolare `jsx` e `jsxImportSource` o `jsxFactory`/`jsxFragmentFactory` per le versioni precedenti di Preact se non utilizzi i valori predefiniti di `preset-vite`.

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'estensione ufficiale **Intlayer VS Code Extension**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) o esternalizzare il tuo contenuto utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md).
