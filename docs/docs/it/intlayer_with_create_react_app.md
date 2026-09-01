---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: "Create React App i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Create React App multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Cronologia iniziale"
author: aymericzip
---

# Traduci la tua Create React App con Intlayer | Internazionalizzazione (i18n)

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione utilizzando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) su GitHub.

## Cos'è Intlayer?

Rispetto alle principali soluzioni come `react-i18next` o `i18next`, Intlayer è una soluzione che viene fornita con ottimizzazioni integrate come:

<AccordionGroup>
<Accordion header="Copertura completa di React">

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne.

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare massivi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer ti aiuta a **ridurre le dimensioni del bundle e delle pagine fino al 50%**.

</Accordion>

<Accordion header="Maintainability">

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **riduce il contesto necessario** ai Large Language Models (LLM). Intlayer viene anche fornito con una suite di strumenti, come una **CLI** per testare le traduzioni mancanti, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**, e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti AI.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando l'LLM di tua scelta al costo del tuo provider AI. Intlayer offre anche un **compiler** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Performance">

Collegare enormi file JSON ai componenti può causare problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti al momento della build.

</Accordion>

<Accordion header="Scaling con none-dev">

Più che una semplice soluzione i18n, Intlayer fornisce un **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted** e un **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire i tuoi contenuti multilingue in **tempo reale**, rendendo la collaborazione con traduttori, copywriter e altri membri del team perfetta. Il contenuto può essere archiviato localmente e/o da remoto.

</Accordion>
</AccordionGroup>

---

## Guida passo-passo per configurare Intlayer in un'applicazione React

<Steps>

<Step number={1} title="Installa le dipendenze">

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione delle configurazioni, traduzioni, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), transpilation e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **react-intlayer**

  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione in React.

- **react-scripts-intlayer**

- **react-scripts-intlayer**
  Include i comandi e i plugin `react-scripts-intlayer` per integrare Intlayer con l'applicazione basata su Create React App. Questi plugin sono basati su [craco](https://craco.js.org/) e includono configurazioni aggiuntive per il bundler [Webpack](https://webpack.js.org/).

</Step>

<Step number={2} title="Configurazione del progetto">

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Tramite questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer nella configurazione CRA">

Modifica i tuoi script per utilizzare react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Gli script `react-scripts-intlayer` sono basati su [CRACO](https://craco.js.org/). Puoi anche implementare la tua configurazione basata sul plugin craco di Intlayer. [Vedi esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

</Step>

<Step number={4} title="Dichiarare i tuoi contenuti">

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
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
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni dei tuoi contenuti possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione dei contenuti (di default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

> Se il tuo file di contenuti include codice TSX, considera di importare `import React from "react";` nel tuo file di contenuti.

</Step>

<Step number={5} title="Utilizza Intlayer nel tuo codice">

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> Nota: se vuoi usare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, ad esempio:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={6} title="Cambia la lingua dei tuoi contenuti" isOptional={true}>

Per cambiare la lingua dei tuoi contenuti, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare i contenuti di conseguenza.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Aggiungi routing localizzato alla tua applicazione" isOptional={true}>

Lo scopo di questo passaggio è creare percorsi univoci per ogni lingua. Questo è utile per la SEO e per URL SEO-friendly.
Esempio:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Di default, i percorsi non sono prefissati per la lingua predefinita. Se desideri prefissare la lingua predefinita, puoi impostare l'opzione `middleware.prefixDefault` su `true` nella tua configurazione. Consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori informazioni.

Per aggiungere il routing localizzato alla tua applicazione, puoi creare un componente `LocaleRouter` che avvolge i percorsi della tua applicazione e gestisce il routing basato sulla lingua. Ecco un esempio che utilizza [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
// Importing necessary dependencies and functions
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funzioni di utilità e tipi da 'intlayer'
// Funzioni di utilità e tipi da 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipi React per componenti funzionali e props
import { IntlayerProvider } from "react-intlayer"; // Provider per il contesto di internazionalizzazione
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componenti router per la gestione della navigazione

// Destrutturazione della configurazione da Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Un componente che gestisce la localizzazione e avvolge i figli con il contesto locale appropriato.
 * Gestisce il rilevamento e la validazione della localizzazione basata sull'URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Ottieni il percorso URL corrente

  // Determina la localizzazione corrente, usando quella di default se non fornita
  const currentLocale = locale ?? defaultLocale;

  // Rimuove il prefisso della localizzazione dal percorso per costruire un percorso base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Percorso URL corrente
  );

  /**
   * Se middleware.prefixDefault è true, la localizzazione di default deve essere sempre prefissata.
   */
  if (middleware.prefixDefault) {
    // Valida la localizzazione
    if (!locale || !locales.includes(locale)) {
      // Reindirizza alla localizzazione di default con il percorso aggiornato
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Sostituisce la voce corrente nella cronologia con quella nuova
        />
      );
    }

    // Avvolge i figli con IntlayerProvider e imposta la locale corrente
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault è false, la locale predefinita non è prefissata.
     * Assicurarsi che la locale corrente sia valida e non la locale predefinita.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Esclude la locale predefinita
        )
        .includes(currentLocale) // Verifica se la locale corrente è nella lista delle locale valide
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

/**
 * Un componente router che configura rotte specifiche per la locale.
 * Usa React Router per gestire la navigazione e rendere componenti localizzati.
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
            // Pattern di percorso per catturare la locale (es. /en/, /fr/) e corrispondere a tutti i percorsi successivi
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Avvolge i figli con la gestione della locale
          />
        ))}

      {
        // Se il prefisso per la locale predefinita è disabilitato, renderizza i figli direttamente al percorso root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Avvolge i figli con la gestione della locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Then, you can use the `LocaleRouter` component in your application:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Il tuo componente AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="Cambiare l'URL quando la lingua cambia" isOptional={true}>

Per modificare l'URL quando cambia la lingua, puoi usare la proprietà `onLocaleChange` fornita dall'hook `useLocale`. Parallelamente, puoi utilizzare gli hook `useLocation` e `useNavigate` di `react-router-dom` per aggiornare il percorso URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
      // Costruisci l'URL con la lingua aggiornata
      // Esempio: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aggiorna il percorso URL
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
              {/* Località - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa località - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella località corrente - es. Francés con la località corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
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
```

> Riferimenti alla documentazione:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Modificare gli attributi di lingua e direzione dell’HTML" isOptional={true}>

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per farli corrispondere alla locale corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si basano sull'attributo `lang` corretto per pronunciare e interpretare accuratamente i contenuti.
- **Rendering del testo**: L'attributo `dir` (direzione) garantisce che il testo venga visualizzato nell'ordine corretto (ad esempio, da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della pagina, aiutando a mostrare il contenuto localizzato corretto nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando la lingua cambia, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

#### Implementazione del Hook

Crea un hook personalizzato per gestire gli attributi HTML. L’hook ascolta i cambiamenti di locale e aggiorna gli attributi di conseguenza:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aggiorna gli attributi `lang` e `dir` dell’elemento HTML <html> in base al locale corrente.
 * - `lang`: informa browser e motori di ricerca sulla lingua della pagina.
 * - `dir`: garantisce l’ordine di lettura corretto (es. 'ltr' per inglese, 'rtl' per arabo).
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

#### Utilizzo del Hook nella tua Applicazione

Integra il hook nel tuo componente principale in modo che gli attributi HTML si aggiornino ogni volta che la locale cambia:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Applica l'hook per aggiornare gli attributi lang e dir del tag <html> in base alla locale.
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

Applicando queste modifiche, la tua applicazione:

- Garantirà che l'attributo **language** (`lang`) rifletta correttamente la locale corrente, cosa importante per la SEO e il comportamento del browser.
- Adatterà la **direzione del testo** (`dir`) in base alla locale, migliorando la leggibilità e l'usabilità per le lingue con ordini di lettura diversi.
- Fornirà un'esperienza più **accessibile**, poiché le tecnologie assistive dipendono da questi attributi per funzionare al meglio.
  </Step>

</Steps>

### Configurare TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'estensione ufficiale **Intlayer VS Code Extension**.

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Intlayer VS Code Extension** ufficiale.
[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Approfondimenti

Per approfondire, puoi implementare l’[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti usando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un progetto Create React App?">

- **`react-i18next` / `i18next`**: la più diffusa, con namespace JSON caricati a runtime.
- **`react-intl`** e **`Lingui`**: formato di messaggi ICU, basati su estrazione.
- **`Intlayer`**: contenuto dichiarato accanto a ogni componente e compilato in fase di build tramite `react-scripts-intlayer`, completamente tipizzato, con traduzione AI, un editor visivo e un CMS.

Create React App incapsula la propria configurazione webpack, quindi l'integrazione passa attraverso il sostituto diretto `react-scripts-intlayer` di `react-scripts` invece che un plugin che registri tu stesso. Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle React?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate, e i [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `react-i18next` o `react-intl` senza riscrivere i miei componenti?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md) o la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `react-i18next`, `react-intl` e `i18next`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice dei componenti no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi componenti, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta.

Per una pipeline completamente automatizzata, il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) fa lo stesso in fase di build: analizza il tuo codice sorgente JSX, TSX, Vue e Svelte ad ogni modifica, genera i dizionari e li mantiene sincronizzati attraverso l'hot module replacement, così non ci sono affatto chiavi da mantenere a mano.

Due limiti vale la pena conoscere prima di attivare il compilatore. Funziona per analisi statica, quindi le stringhe che esistono solo a runtime, come i codici di errore delle API o i campi del CMS, restano fuori portata. E deve distinguere il testo visibile all'utente dalla logica applicativa come `className="active"` o un codice di stato, il che richiede alcune annotazioni in una codebase estesa. Il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) evita entrambi mantenendoti nel ciclo.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Create React App non è più mantenuto. Dovrei passare prima a Vite?">

Se stai già pianificando il passaggio, fallo prima e segui invece la [guida Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md): il plugin Vite è il percorso meglio supportato e ti dà ricostruzioni più veloci. Se non sei pronto, questa guida continua a funzionare, e le dichiarazioni di contenuto non cambiano tra le due configurazioni, quindi migrare la build più tardi non significa riscrivere il tuo i18n.

</Question>

<Question title="Come configuro il routing localizzato in un progetto Create React App?">

I passi 7 e 8 coprono le rotte localizzate e la riscrittura dell'URL quando la locale cambia. Se non vuoi la locale nel percorso, imposta `routing.mode` su `"no-prefix"` o `"search-params"` e verrà risolta invece da un cookie o un parametro di query. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>

<Question title="Come gestisco i metadati SEO in un'app React renderizzata lato client?">

Imposta `lang` e `dir` sull'elemento `html` a partire dalla locale attiva, come mostra il passo 9, ed emetti gli alternate `hreflang` per ogni locale dichiarata con `getMultilingualUrls`, incluso `x-default`. Poiché Create React App invia un unico shell renderizzato lato client, preferisci una configurazione prerenderizzata o renderizzata lato server come [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md) o [React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_router_v7.md) per le pagine che devono essere sottoposte a crawling in modo affidabile.

</Question>

<Question title="Come supporto le lingue da destra a sinistra come l'arabo o l'ebraico?">

Lo copre il passo 9. `getHTMLTextDir` ritorna `ltr`, `rtl` o `auto` per una locale, così colleghi `lang` e `dir` sull'elemento radice a partire dalla locale attiva e lasci che le proprietà logiche del tuo CSS gestiscano il resto.

</Question>

<Question title="Come traduco l'app automaticamente con l'AI?">

Esegui `npx intlayer fill`. Riempie le traduzioni mancanti con l'LLM di tua scelta, usando il tuo provider e la tua API key, e `--git-diff` limita l'esecuzione ai contenuti modificati nel branch. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

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
