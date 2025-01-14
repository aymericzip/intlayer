# Inizio a Internazionalizzare (i18n) con Intlayer e React Create App

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Assicurarti il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio della lingua dinamici.

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione React

### Passo 1: Installa le Dipendenze

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

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md), transpilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **react-intlayer**

  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hooks per l'internazionalizzazione in React. Inoltre, include il plugin per integrare Intlayer con l'applicazione basata su Create React App.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuti, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integrare Intlayer nella tua Configurazione CRA

Modifica i tuoi script per usare react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> Gli script `react-intlayer` si basano su [craco](https://craco.js.org/). Puoi anche implementare la tua configurazione basata sul plugin craco di intlayer. [Vedi esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Dichiara i Tuoi Contenuti

Crea e gestisci le tue dichiarazioni di contenuti per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Modifica <code>src/App.tsx</code> e salva per ricaricare
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Impara React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Inizia modificando",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Impara React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Inizia modificando",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Impara React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Le tue dichiarazioni di contenuti possono essere definite ovunque nella tua applicazione non appena vengono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondere all'estensione del file di dichiarazione dei contenuti (per impostazione predefinita, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Per ulteriori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).
> Se il tuo file di contenuti include codice TSX, dovresti considerare di importare `import React from "react";` nel tuo file di contenuti.

### Passo 5: Utilizza Intlayer nel Tuo Codice

Accedi ai tuoi dizionari di contenuti in tutta la tua applicazione:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Nota: Se desideri utilizzare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sull'hook `useIntlayer`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md).

### (Opzionale) Passo 6: Cambia la lingua dei tuoi contenuti

Per cambiare la lingua dei tuoi contenuti, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare di conseguenza il contenuto.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambia lingua in English
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
      Cambia lingua in English
    </button>
  );
};
```

> Per saperne di più sull'hook `useLocale`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md).

### (Opzionale) Passo 7: Aggiungi il Routing Localizzato alla tua applicazione

Lo scopo di questo passaggio è quello di creare percorsi unici per ogni lingua. Questo è utile per SEO e URL friendly.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Per impostazione predefinita, i percorsi non sono prefissati per la lingua predefinita. Se desideri prefissare la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Vedi la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge i percorsi della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio utilizzando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importazione delle dipendenze e delle funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi di utilità da 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipi React per componenti e props funzionali
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i bambini con il contesto locale appropriato.
 * Gestisce il rilevamento e la validazione basata sulla lingua nell'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams<{ locale: Locales }>(); // Estrai il parametro lingua dall'URL

  // Determina la lingua corrente, tornando a quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso di base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, la lingua predefinita dovrebbe sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la lingua
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla lingua predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'entry della cronologia corrente con la nuova
        />
      );
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la lingua predefinita non è prefissata.
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
      // Reindirizza al percorso senza prefisso lingua
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta percorsi specifici per la lingua.
 * Utilizza React Router per gestire la navigazione e renderizzare componenti localizzati.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare la lingua (ad es., /en/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
      />

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i bambini direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importazione delle dipendenze e delle funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi di utilità da 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i bambini con il contesto locale appropriato.
 * Gestisce il rilevamento e la validazione basata sulla lingua nell'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams(); // Estrai il parametro lingua dall'URL

  // Determina la lingua corrente, tornando a quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso di base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, la lingua predefinita dovrebbe sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la lingua
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla lingua predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'entry della cronologia corrente con la nuova
        />
      );
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la lingua predefinita non è prefissata.
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
      // Reindirizza al percorso senza prefisso lingua
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta percorsi specifici per la lingua.
 * Utilizza React Router per gestire la navigazione e renderizzare componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare la lingua (ad es., /en/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
      />

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i bambini direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importazione delle dipendenze e delle funzioni necessarie
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Funzioni e tipi di utilità da 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider per il contesto di internazionalizzazione
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componenti router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i bambini con il contesto locale appropriato.
 * Gestisce il rilevamento e la validazione basata sulla lingua nell'URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams(); // Estrai il parametro lingua dall'URL

  // Determina la lingua corrente, tornando a quella predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso di base
  const pathWithoutLocale = getPathWithoutLocale(
    path // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è vero, la lingua predefinita dovrebbe sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la lingua
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla lingua predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'entry della cronologia corrente con la nuova
        />
      );
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la lingua predefinita non è prefissata.
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
      // Reindirizza al percorso senza prefisso lingua
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta percorsi specifici per la lingua.
 * Utilizza React Router per gestire la navigazione e renderizzare componenti localizzati.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare la lingua (ad es., /en/, /fr/) e abbinare tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
      />

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i bambini direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Opzionale) Passo 8: Cambia l'URL quando cambia la lingua

Per cambiare l'URL quando cambia la lingua, puoi utilizzare la prop `onLocaleChange` fornita dall'hook `useLocale`. In parallelo, puoi usare gli hook `useLocation` e `useNavigate` da `react-router-dom` per aggiornare il percorso URL.

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
    // Costruisci l'URL con la lingua aggiornata
    // Esempio: /es/about con la lingua impostata su Spagnolo
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
              {/* Lingua nella propria lingua - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Francés con lingua corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Francese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. FR */}
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
    // Costruisci l'URL con la lingua aggiornata
    // Esempio: /es/about con la lingua impostata su Spagnolo
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
              {/* Lingua nella propria lingua - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Francés con lingua corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Francese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. FR */}
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
    // Costruisci l'URL con la lingua aggiornata
    // Esempio: /es/about con la lingua impostata su Spagnolo
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
              {/* Lingua nella propria lingua - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Francés con lingua corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Francese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
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

### Configura TypeScript

Intlayer utilizza l'augmentazione dei moduli per ottenere i benefici di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    "types", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione di Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni nel tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```
