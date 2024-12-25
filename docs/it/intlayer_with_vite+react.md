# Iniziare a Internazionalizzare (i18n) con Intlayer e Vite e React

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source di internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadati**, le route e i contenuti.
- **Garantire supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come la rilevazione e il cambio dinamico dei locali.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vite e React

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md), traspilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con le applicazioni React. Fornisce fornitori di contesto e hook per l'internazionalizzazione in React. Inoltre, include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), nonché middleware per rilevare il locale preferito dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ITALIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ITALIAN,
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
      Locales.ITALIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ITALIAN,
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
      Locales.ITALIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ITALIAN,
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intLayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

> Il plugin Vite `intLayerPlugin()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione di file di dichiarazione dei contenuti e ne monitora la modifica in modalità di sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Non dimenticare di importare React se usi un nodo React nel tuo contenuto
      it: (
        <>
          Modifica <code>src/App.tsx</code> e salva per testare HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      it: "Clicca sui loghi di Vite e React per saperne di più",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Non dimenticare di importare React se usi un nodo React nel tuo contenuto
        it: (
          <>
            Modifica <code>src/App.tsx</code> e salva per testare HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      it: "Clicca sui loghi di Vite e React per saperne di più",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Non dimenticare di importare React se usi un nodo React nel tuo contenuto
        it: (
          <>
            Modifica <code>src/App.tsx</code> e salva per testare HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      it: "Clicca sui loghi di Vite e React per saperne di più",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "it": "Logo Vite",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "it": "Logo React",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "it": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "it": "il conteggio è ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "it": "Modifica src/App.tsx e salva per testare HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "it": "Clicca sui loghi di Vite e React per saperne di più",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione fintanto che sono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondono all'estensione del file di dichiarazione dei contenuti (per impostazione predefinita, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Per ulteriori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).
> Se il tuo file di contenuto include codice TSX, dovresti considerare di importare `import React from "react";` nel tuo file di contenuto.

### Passo 5: Utilizza Intlayer nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta la tua applicazione:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
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

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

> Se desideri utilizzare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sull'hook `useIntlayer`, fare riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md).

### (Facoltativo) Passo 6: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti consente di impostare il locale dell'applicazione e aggiornare i contenuti di conseguenza.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>
      Cambia lingua in Italiano
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>
      Cambia lingua in Italiano
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>
      Cambia lingua in Italiano
    </button>
  );
};
```

> Per saperne di più sull'hook `useLocale`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md).

### (Facoltativo) Passo 7: Aggiungere Routing localizzato alla tua applicazione

L'obiettivo di questo passo è creare route uniche per ogni lingua. Questo è utile per la SEO e gli URL ottimizzati per la SEO.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/it/about
- https://example.com/fr/about
```

> Per impostazione predefinita, le route non sono prefissate per il locale predefinito. Se desideri aggiungere un prefisso al locale predefinito, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Vedi la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori informazioni.

Per aggiungere routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge le route della tua applicazione e gestisce il routing basato sul locale. Ecco un esempio utilizzando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando le dipendenze e le funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi utili da 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipi React per i componenti funzionali e le props
import { IntlayerProvider } from "react-intlayer"; // Fornitore per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti Router per gestire la navigazione

// Destructuring della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto locale appropriato.
 * Gestisce la rilevazione e la validazione del locale basata sull'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams<{ locale: Locales }>(); // Estrai il parametro locale dall'URL

  // Determina il locale attuale, tornando al predefinito se non fornito
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso locale dal percorso per costruire un percorso base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, il locale predefinito deve sempre essere prefissato.
   */
  if (middleware.prefixDefault) {
    // Valida il locale
    if (!locale || !locales.includes(locale)) {
      // Reindirizza al locale predefinito con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'attuale voce di cronologia con la nuova
        />
      );
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, il locale predefinito non è prefissato.
     * Assicurati che il locale attuale sia valido e non il locale predefinito.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi il locale predefinito
        )
        .includes(currentLocale) // Controlla se il locale attuale è nell'elenco dei locali validi
    ) {
      // Reindirizza al percorso senza prefisso locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta route specifiche per il locale.
 * Utilizza React Router per gestire la navigazione e rendere componenti localizzati.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare il locale (es. /it/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
      />

      {
        // Se il prefisso del locale predefinito è disabilitato, rendi i figli direttamente nel percorso root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando le dipendenze e le funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi utili da 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Fornitore per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti Router per gestire la navigazione

// Destructuring della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto locale appropriato.
 * Gestisce la rilevazione e la validazione del locale basata sull'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams(); // Estrai il parametro locale dall'URL

  // Determina il locale attuale, tornando al predefinito se non fornito
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso locale dal percorso per costruire un percorso base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, il locale predefinito deve sempre essere prefissato.
   */
  if (middleware.prefixDefault) {
    // Valida il locale
    if (!locale || !locales.includes(locale)) {
      // Reindirizza al locale predefinito con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'attuale voce di cronologia con la nuova
        />
      );
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, il locale predefinito non è prefissato.
     * Assicurati che il locale attuale sia valido e non il locale predefinito.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi il locale predefinito
        )
        .includes(currentLocale) // Controlla se il locale attuale è nell'elenco dei locali validi
    ) {
      // Reindirizza al percorso senza prefisso locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta route specifiche per il locale.
 * Utilizza React Router per gestire la navigazione e rendere componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare il locale (es. /it/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
      />

      {
        // Se il prefisso del locale predefinito è disabilitato, rendi i figli direttamente nel percorso root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando le dipendenze e le funzioni necessarie
const { Locales, getConfiguration, getPathWithoutLocale } = require("intlayer"); // Funzioni e tipi utili da 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Fornitore per il contesto di internazionalizzazione
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componenti Router per gestire la navigazione

// Destructuring della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto locale appropriato.
 * Gestisce la rilevazione e la validazione del locale basata sull'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams(); // Estrai il parametro locale dall'URL

  // Determina il locale attuale, tornando al predefinito se non fornito
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso locale dal percorso per costruire un percorso base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, il locale predefinito deve sempre essere prefissato.
   */
  if (middleware.prefixDefault) {
    // Valida il locale
    if (!locale || !locales.includes(locale)) {
      // Reindirizza al locale predefinito con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'attuale voce di cronologia con la nuova
        />
      );
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, il locale predefinito non è prefissato.
     * Assicurati che il locale attuale sia valido e non il locale predefinito.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi il locale predefinito
        )
        .includes(currentLocale) // Controlla se il locale attuale è nell'elenco dei locali validi
    ) {
      // Reindirizza al percorso senza prefisso locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i figli con l'IntlayerProvider e imposta il locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta route specifiche per il locale.
 * Utilizza React Router per gestire la navigazione e rendere componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare il locale (es. /it/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
      />

      {
        // Se il prefisso del locale predefinito è disabilitato, rendi i figli direttamente nel percorso root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

In parallelo, puoi utilizzare anche il `intLayerMiddlewarePlugin` per aggiungere routing server-side alla tua applicazione. Questo plugin rileverà automaticamente il locale attuale in base all'URL e imposterà il cookie del locale appropriato. Se non viene specificato alcun locale, il plugin determinerà il locale più appropriato in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevato alcun locale, reindirizzerà al locale predefinito.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intLayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Facoltativo) Passo 8: Cambiare l'URL quando cambia il locale

Per cambiare l'URL quando cambia il locale, puoi utilizzare la prop `onLocaleChange` fornita dall'hook `useLocale`. In parallelo, puoi utilizzare gli hook `useLocation` e `useNavigate` da `react-router-dom` per aggiornare il percorso URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const location = useLocation(); // Ottieni il percorso URL corrente. Esempio: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Costruisci l'URL con il locale aggiornato
    // Esempio: /es/about con il locale impostato su spagnolo
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aggiorna il percorso URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio locale - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale attuale - es. Italiano con locale attuale impostato su Locales.ITALIAN */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. Italiano */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. IT */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // Ottieni il percorso URL corrente. Esempio: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Costruisci l'URL con il locale aggiornato
    // Esempio: /es/about con il locale impostato su spagnolo
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aggiorna il percorso URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio locale - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale attuale - es. Italiano con locale attuale impostato su Locales.ITALIAN */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. Italiano */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. IT */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // Ottieni il percorso URL corrente. Esempio: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Costruisci l'URL con il locale aggiornato
    // Esempio: /es/about con il locale impostato su spagnolo
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aggiorna il percorso URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio locale - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale attuale - es. Italiano con locale attuale impostato su Locales.ITALIAN */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. Italiano */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. IT */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Riferimenti documentazione:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configura TypeScript

Intlayer utilizza l'augmentation del modulo per beneficiare di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // la tua configurazione personalizzata
  "include": [
    "src",
    "types", // <- Includi i tipi auto-generati
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```
