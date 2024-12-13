# Iniziare a Internazionalizzare (i18n) con Intlayer e React Create App

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadati**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come la rilevazione e il cambio dinamico della locale.

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione React

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript
// intlayer.config.ts

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

Per vedere tutti i parametri disponibili, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua Configurazione CRA

Cambia i tuoi script per usare react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

Nota: gli script di react-intlayer si basano su craco. Puoi anche implementare la tua configurazione basata sul plugin craco di intlayer. [Vedi l'esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Dichiarare il tuo Contenuto

Crea e gestisci i tuoi dizionari di contenuto:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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

[Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

### Passo 5: Utilizza Intlayer nel tuo Codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* Per usare correttamente l'hook useIntlayer, dovresti accedere ai tuoi dati in un componente figlio */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> Nota: Se desideri utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Opzionale) Passo 6: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione consente di impostare la locale dell'applicazione e aggiornare i contenuti di conseguenza.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiare lingua in Inglese
    </button>
  );
};
```

### (Opzionale) Passo 7: Aggiungere Routing Localizzato alla tua applicazione

Lo scopo di questo passaggio è creare rotte uniche per ogni lingua. Questo è utile per SEO e URL friendly.

Esempio:

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> Per impostazione predefinita, le rotte non sono prefissate per la locale predefinita. Se desideri prefissare la locale predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Vedi la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori informazioni.

Per aggiungere routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge le rotte della tua applicazione e gestisce il routing basato sulla locale. Ecco un esempio usando [React Router](https://reactrouter.com/home):

```tsx
// Importare dipendenze e funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi di utilità da 'intlayer'
import { FC, PropsWithChildren } from "react"; // Tipi React per componenti funzionali e props
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti Router per gestire la navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto locale appropriato.
 * Gestisce la rilevazione e la validazione della locale basata su URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL attuale
  const { locale } = useParams<{ locale: Locales }>(); // Estrai il parametro locale dall'URL

  // Determina la locale attuale, tornando alla predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso locale dal percorso per costruire un percorso di base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Percorso URL attuale
  );

  /**
   * Se middleware.prefixDefault è vero, la locale predefinita deve sempre essere prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la locale
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla locale predefinita con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Sostituisci l'attuale voce della cronologia con la nuova
        />
      );
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è falso, la locale predefinita non è prefissata.
     * Assicurati che la locale attuale sia valida e non sia la locale predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Escludi la locale predefinita
        )
        .includes(currentLocale) // Controlla se la locale attuale è nell'elenco delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso locale
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i bambini con l'IntlayerProvider e imposta la locale attuale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che crea rotte specifiche per la locale.
 * Utilizza React Router per gestire la navigazione e rendere i componenti localizzati.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare la locale (es. /en/, /fr/) e corrispondere a tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con la gestione della locale
      />

      {
        // Se il prefisso della locale predefinita è disabilitato, rendi i bambini direttamente al percorso radice
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i bambini con la gestione della locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Opzionale) Passo 8: Cambiare l'URL quando cambia la locale

Per cambiare l'URL quando cambia la locale, puoi utilizzare la prop `onLocaleChange` fornita dall'hook `useLocale`. In parallelo, puoi utilizzare gli hooks `useLocation` e `useNavigate` da `react-router-dom` per aggiornare il percorso URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Ottieni il percorso URL attuale. Esempio: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Costruisci l'URL con la locale aggiornata
    // Esempio: /es/about con la locale impostata su Spagnolo
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aggiorna il percorso URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Cambiare lingua in Inglese
    </button>
  );
};
```

### Configurare TypeScript

Intlayer utilizza l'augmentation del modulo per ottenere i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

```json5
// tsconfig.json

{
  // la tua configurazione personalizzata
  include: [
    "src",
    "types", // <- Include i tipi generati automaticamente
  ],
}
```

### Configurazione di Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di commetterli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```gitignore
# Ignora i file generati da Intlayer
.intlayer
```
