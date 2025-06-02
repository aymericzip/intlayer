# Introduzione all'Internazionalizzazione (i18n) con Intlayer, Vite e React

<iframe title="Vite + React: Build a Multilingual App from Scratch using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Vedi [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) su GitHub.

## Cos'è Intlayer?

**Intlayer** è una libreria open-source innovativa per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vite e React

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md), transpilation e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione in React.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti URL.

### Passo 2: Configurazione del progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

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

> Tramite questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella configurazione di Vite

Aggiungi il plugin intlayer alla tua configurazione.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Il plugin `intlayerPlugin()` di Vite viene utilizzato per integrare Intlayer con Vite. Garantisce la costruzione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili di ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiarare i tuoi contenuti

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      it: (
        <>
          Modifica <code>src/App.tsx</code> e salva per testare HMR
        </>
      ),
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

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
    reactLogo: t({
      it: "Logo React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Ricorda di importare React se utilizzi un nodo React nei tuoi contenuti
        it: (
          <>
            Modifica <code>src/App.tsx</code> e salva per testare HMR
          </>
        ),
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

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
    reactLogo: t({
      it: "Logo React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
---

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
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "it": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "it": "Vite + React"
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
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "it": "Modifica src/App.tsx e salva per testare HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "it": "Clicca sui loghi Vite e React per saperne di più"
      }
    }
  }
}
```

> Le dichiarazioni dei contenuti possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione dei contenuti (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).
> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).
> Se il tuo file di contenuti include codice TSX, considera di importare `import React from "react";` nel tuo file di contenuti.

### Step 5: Utilizza Intlayer nel tuo codice

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

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

> Se vuoi utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sul hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md).

### (Opzionale) Step 6: Cambia la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi utilizzare la funzione `setLocale` fornita dal hook `useLocale`. Questa funzione ti permette di impostare la lingua dell'applicazione e aggiornare il contenuto di conseguenza.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in Inglese
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
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in Inglese
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
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in Inglese
    </button>
  );
};
```

> Per saperne di più sul hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md).

### (Opzionale) Passo 7: Aggiungi il routing localizzato alla tua applicazione

Lo scopo di questo passo è creare percorsi unici per ogni lingua. Questo è utile per SEO e URL SEO-friendly.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Per impostazione predefinita, i percorsi non sono prefissati per la lingua predefinita. Se desideri prefissare la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per maggiori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge i percorsi della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio utilizzando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importazione delle dipendenze e funzioni necessarie
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi utili da 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipi React per componenti funzionali e props
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti Router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto di lingua appropriato.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Ottieni il percorso URL corrente

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la lingua predefinita dovrebbe sempre essere prefissata.
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
     * Assicurati che la lingua corrente sia valida e non quella predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nell'elenco delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso di lingua
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che configura percorsi specifici per lingua.
 * Utilizza React Router per gestire la navigazione e rendere i componenti localizzati.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modello di percorso per catturare la lingua (es., /it/, /fr/) e abbinare tutti i percorsi successivi
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Avvolge i figli con la gestione della lingua
          />
        ))}

      {
        // Se il prefisso della lingua predefinita è disabilitato, rendi i figli direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Avvolge i figli con la gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importazione delle dipendenze e funzioni necessarie
import { configuration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi utili da 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti Router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto di lingua appropriato.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Ottieni il percorso URL corrente

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la lingua predefinita dovrebbe sempre essere prefissata.
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
     * Assicurati che la lingua corrente sia valida e non quella predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nell'elenco delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso di lingua
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Utilizza React Router per gestire la navigazione e rendere i componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modello di percorso per catturare la lingua (es., /en/, /fr/) e corrispondere a tutti i percorsi successivi
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Avvolge i figli con la gestione della lingua
          />
        ))}

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i figli direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Avvolge i figli con la gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importazione delle dipendenze e funzioni necessarie
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funzioni e tipi utili da 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider per il contesto di internazionalizzazione
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componenti router per gestire la navigazione

// De-strutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto della lingua appropriata.
 * Gestisce il rilevamento e la validazione della lingua basata sull'URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Ottieni il percorso URL corrente

  // Determina la lingua corrente, utilizzando quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la lingua predefinita dovrebbe sempre essere prefissata.
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

    // Avvolge i figli con IntlayerProvider e imposta la lingua corrente
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
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi la lingua predefinita
        )
        .includes(currentLocale) // Controlla se la lingua corrente è nell'elenco delle lingue valide
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

/**
 * Un componente router che configura percorsi specifici per la lingua.
 * Utilizza React Router per gestire la navigazione e rendere i componenti localizzati.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Modello di percorso per catturare la lingua (es., /en/, /fr/) e corrispondere a tutti i percorsi successivi
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Avvolge i figli con la gestione della lingua
          />
        ))}

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i figli direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Avvolge i figli con la gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Ora puoi utilizzare il componente `LocaleRouter` nella tua applicazione:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Il tuo componente AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Il tuo componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Il tuo componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

In parallelo, puoi anche utilizzare il plugin `intLayerMiddlewarePlugin` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente basandosi sull'URL e imposterà il cookie della lingua appropriato. Se non viene specificata alcuna lingua, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, reindirizzerà alla lingua predefinita.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opzionale) Passaggio 8: Cambia l'URL quando cambia la lingua

Per cambiare l'URL quando cambia la lingua, puoi utilizzare la prop `onLocaleChange` fornita dal hook `useLocale`. In parallelo, puoi utilizzare i hook `useLocation` e `useNavigate` da `react-router-dom` per aggiornare il percorso URL.

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
  const { pathname, search } = useLocation(); // Ottieni il percorso URL corrente. Esempio: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Costruire l'URL con la localizzazione aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aggiornare il percorso dell'URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ad esempio FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria localizzazione - ad esempio Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella localizzazione corrente - ad esempio Francés con localizzazione corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - ad esempio French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Ottenere il percorso URL corrente. Esempio: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Costruire l'URL con la localizzazione aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aggiornare il percorso dell'URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ad esempio FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria localizzazione - ad esempio Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella localizzazione corrente - ad esempio Francés con localizzazione corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - ad esempio French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Ottenere il percorso URL corrente. Esempio: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Costruire l'URL con la localizzazione aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aggiornare il percorso dell'URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ad esempio FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria localizzazione - ad esempio Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella localizzazione corrente - ad esempio Francés con localizzazione corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - ad esempio French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Riferimenti alla documentazione:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (Opzionale) Step 9: Cambiare gli attributi di lingua e direzione HTML

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per corrispondere alla localizzazione corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si basano sull'attributo `lang` corretto per pronunciare e interpretare accuratamente i contenuti.
- **Rendering del testo**: L'attributo `dir` (direzione) garantisce che il testo venga reso nell'ordine corretto (ad esempio, da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della tua pagina, aiutando a fornire il contenuto localizzato corretto nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando cambia la localizzazione, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

#### Implementazione dell'Hook

Crea un hook personalizzato per gestire gli attributi HTML. L'hook ascolta i cambiamenti di localizzazione e aggiorna gli attributi di conseguenza:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
 * - `dir`: Garantisce il corretto ordine di lettura (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
 *
 * Questo aggiornamento dinamico è essenziale per una corretta visualizzazione del testo, accessibilità e SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aggiorna l'attributo della lingua in base alla lingua corrente.
    document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla lingua corrente.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
 * - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
 * - `dir`: Garantisce il corretto ordine di lettura (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
 *
 * Questo aggiornamento dinamico è essenziale per una corretta visualizzazione del testo, accessibilità e SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aggiorna l'attributo della lingua in base alla lingua corrente.
    document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla lingua corrente.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html> in base alla lingua corrente.
 * - `lang`: Informa i browser e i motori di ricerca sulla lingua della pagina.
 * - `dir`: Garantisce il corretto ordine di lettura (ad esempio, 'ltr' per l'inglese, 'rtl' per l'arabo).
 *
 * Questo aggiornamento dinamico è essenziale per una corretta visualizzazione del testo, accessibilità e SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aggiorna l'attributo della lingua in base alla lingua corrente.
    document.documentElement.lang = locale;

    // Imposta la direzione del testo in base alla lingua corrente.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Utilizzo dell'Hook nella tua Applicazione

Integra l'hook nel tuo componente principale in modo che gli attributi HTML vengano aggiornati ogni volta che cambia la lingua:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla lingua.
  useI18nHTMLAttributes();

  // ... Resto del tuo componente
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla lingua.
  useI18nHTMLAttributes();

  // ... Resto del tuo componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla lingua.
  useI18nHTMLAttributes();

  // ... Resto del tuo componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Applicando queste modifiche, la tua applicazione:

- Garantirà che l'attributo **lingua** (`lang`) rifletta correttamente la lingua corrente, importante per SEO e comportamento del browser.
- Adatterà la **direzione del testo** (`dir`) in base alla lingua, migliorando la leggibilità e l'usabilità per lingue con ordini di lettura diversi.
- Fornirà un'esperienza più **accessibile**, poiché le tecnologie assistive dipendono da questi attributi per funzionare in modo ottimale.

### (Opzionale) Passo 10: Creazione di un Componente Link Localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso alle URL interne con la lingua corrente. Ad esempio, quando un utente francofono clicca su un link alla pagina "About", viene reindirizzato a `/it/about` invece di `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e Esperienza Utente**: Le URL localizzate aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga nella lingua corrente, evitando cambiamenti di lingua inaspettati.
- **Manutenibilità**: Centralizzando la logica di localizzazione in un unico componente, semplifichi la gestione delle URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che l'applicazione cresce.

Di seguito l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della lingua all'URL (ad esempio, /it/about).
 * Questo garantisce che la navigazione rimanga nel contesto della lingua corrente.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
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

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della lingua all'URL (ad esempio, /it/about).
 * Questo garantisce che la navigazione rimanga nel contesto della lingua corrente.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
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

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Funzione di utilità per verificare se un determinato URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso dell'URL con la lingua (es. /it/about).
 * Questo garantisce che la navigazione rimanga nel contesto della stessa lingua.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione helper `checkIsExternalLink` determina se un URL è esterno. I link esterni rimangono invariati poiché non necessitano di localizzazione.

- **Recupero della Lingua Corrente**:  
  L'hook `useLocale` fornisce la lingua corrente (es. `it` per Italiano).

- **Localizzazione dell'URL**:  
  Per i link interni (cioè non esterni), viene utilizzato `getLocalizedUrl` per aggiungere automaticamente il prefisso dell'URL con la lingua corrente. Questo significa che se l'utente è in Italiano, passando `/about` come `href`, verrà trasformato in `/it/about`.

- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la lingua.

Integrando questo componente `Link` nella tua applicazione, puoi mantenere un'esperienza utente coerente e consapevole della lingua, migliorando anche SEO e usabilità.

### Configurare TypeScript

Intlayer utilizza l'augmentazione dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione di Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md).
