# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## What is Intlayer?

**Intlayer** è una libreria innovativa e open-source di internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamici della lingua.

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

### Step 1: Install Dependencies

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

### Step 2: Configuration of your project

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ITALIAN, // Modificato per includere l'italiano
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

Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Step 3: Integrate Intlayer in Your Vite Configuration

Aggiungi il plugin intlayer nella tua configurazione.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Step 4: Declare Your Content

Crea e gestisci i tuoi dizionari di contenuti:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      it: "Logo Vite", // Tradotto in italiano
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      it: "Logo React", // Tradotto in italiano
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      it: "il conteggio è ", // Tradotto in italiano
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Non dimenticare di importare React se utilizzi un nodo React nel tuo contenuto
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
      it: "Clicca sui loghi di Vite e React per saperne di più", // Tradotto in italiano
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> Note: Se il tuo file di contenuto include codice TSX, dovresti considerare di importare `import React from "react";` nel tuo file di contenuto.

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

### Step 5: Utilize Intlayer in Your Code

Accedi ai tuoi dizionari di contenuto in tutta la tua applicazione:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Note: Se vuoi utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dal hook `useLocale`. Questa funzione consente di impostare la lingua dell'applicazione e aggiornare di conseguenza il contenuto.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>
      {" "}
      {/* Modificato per includere l'italiano */}
      Cambia lingua in Italiano
    </button>
  );
};
```

### (Optional) Step 7: Add localized Routing to your application

Lo scopo di questo passaggio è creare percorsi unici per ogni lingua. Questo è utile per SEO e URL amichevoli per SEO.
Esempio:

```tsx
// /dashboard
// /it/dashboard
// /fr/dashboard
```

> Per impostazione predefinita, i percorsi non sono prefissati per la lingua predefinita. Se desideri prefissare la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che racchiude i percorsi della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio usando [React Router](https://reactrouter.com/home):

```tsx
// Importazione delle dipendenze e delle funzioni necessarie
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Funzioni e tipi utili da 'intlayer'
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
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto di lingua appropriato.
 * Gestisce la rilevazione e la validazione della lingua basata sull'URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Ottieni il percorso URL corrente
  const { locale } = useParams<{ locale: Locales }>(); // Estrai il parametro lingua dall'URL

  // Determina la lingua corrente, tornando alla predefinita se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuovi il prefisso della lingua dal percorso per costruire un percorso base
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
          replace // Sostituisci l'attuale voce della storia con la nuova
        />
      );
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
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
        .includes(currentLocale) // Controlla se la lingua corrente è nella lista delle lingue valide
    ) {
      // Reindirizza al percorso senza prefisso della lingua
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Avvolgi i figli con IntlayerProvider e imposta la lingua corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Un componente router che imposta percorsi specifici per la lingua.
 * Usa React Router per gestire la navigazione e rendere componenti localizzati.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Modello di percorso per catturare la lingua (es., /it/, /fr/) e corrispondere a tutti i percorsi successivi
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione della lingua
      />

      {
        // Se il prefisso della lingua predefinita è disabilitato, renderizza i figli direttamente nel percorso principale
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Avvolge i figli con la gestione della lingua
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

In parallelo, puoi anche usare il intLayerMiddlewarePlugin per aggiungere il routing sul server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente in base all'URL e imposterà il cookie della lingua appropriata. Se nessuna lingua è specificata, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, verrà reindirizzato alla lingua predefinita.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Step 8: Change the URL when the locale changes

Per cambiare l'URL quando cambia la lingua, puoi usare la prop `onLocaleChange` fornita dal hook `useLocale`. In parallelo, puoi usare i hook `useLocation` e `useNavigate` da `react-router-dom` per aggiornare il percorso URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Ottieni il percorso URL corrente. Esempio: /it/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Costruisci l'URL con la lingua aggiornata
    // Esempio: /fr/about con la lingua impostata su francese
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aggiorna il percorso URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>
      Cambia lingua in Italiano
    </button>
  );
};
```

### Configure TypeScript

Intlayer utilizza l'augmentation del modulo per ottenere i benefici di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5
// tsconfig.json

{
  // la tua configurazione personalizzata
  include: [
    "src",
    "types", // <- Includi i tipi auto generati
  ],
}
```

### Git Configuration

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```
