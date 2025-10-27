---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: Come tradurre la tua React Router v7 – guida i18n 2025
description: Scopri come aggiungere l'internazionalizzazione (i18n) alla tua applicazione React Router v7 utilizzando Intlayer. Segui questa guida completa per rendere la tua app multilingue con il routing consapevole della localizzazione.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Routing Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
history:
  - version: 6.1.5
    date: 2025-10-03
    changes: Documentazione aggiornata
  - version: 5.8.2
    date: 2025-09-04
    changes: Aggiunto per React Router v7
---

# Traduci la tua React Router v7 con Intlayer | Internazionalizzazione (i18n)

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione senza soluzione di continuità nei progetti React Router v7 con routing consapevole della localizzazione, supporto TypeScript e pratiche di sviluppo moderne.

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della localizzazione.
- **Abilitare il routing consapevole della localizzazione** con il sistema di routing basato su configurazione di React Router v7.

---

## Guida passo-passo per configurare Intlayer in un'applicazione React Router v7

### Passo 1: Installare le dipendenze

Installa i pacchetti necessari usando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **Il pacchetto core** che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **react-intlayer**  
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione in React.

- **vite-intlayer**  
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la locale preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per impostare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Configurazione per l'internazionalizzazione
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configurazione per Intlayer
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Lingua predefinita
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Lingue supportate
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Configurare le rotte di React Router v7

Configura la tua configurazione di routing con rotte consapevoli della localizzazione:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // Pagina iniziale localizzata
    route("/:lang?/about", "routes/about/page.tsx"), // Pagina "about" localizzata
  ]),
] satisfies RouteConfig;
```

### Passo 5: Crea i Componenti di Layout

Configura il layout principale e i layout specifici per la localizzazione:

#### Layout Principale

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 6: Dichiarare il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena vengono incluse nella directory `contentDir` (per default, `./app`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

### Passo 7: Crea Componenti Consapevoli della Locale

Crea un componente `LocalizedLink` per una navigazione consapevole della locale:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Funzione per localizzare l'URL in base alla lingua
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// Componente per link localizzati
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Nel caso in cui desideri navigare verso le rotte localizzate, puoi utilizzare l'hook `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### Passo 8: Utilizza Intlayer nelle tue Pagine

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

#### Pagina Home Localizzata

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

### Passo 9: Crea un Componente per il Selettore di Lingua

Crea un componente per permettere agli utenti di cambiare lingua:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocaleCookie(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria Locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella Locale corrente - es. Francés con la locale corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md).

### Passo 10: Aggiungere la gestione degli attributi HTML (Opzionale)

Crea un hook per gestire gli attributi lang e dir dell'HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Quindi usalo nel tuo componente root:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // importa il hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // chiama il hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 11: Aggiungere il middleware (Opzionale)

Puoi anche utilizzare `intlayerMiddleware` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente basandosi sull'URL e imposterà il cookie della lingua appropriata. Se non viene specificata alcuna lingua, il plugin determinerà la lingua più adatta in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, verrà effettuato un reindirizzamento alla lingua predefinita.

> Nota che per utilizzare `intlayerMiddleware` in produzione, è necessario spostare il pacchetto `vite-intlayer` da `devDependencies` a `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

---

## Configurare TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

Assicurati che la tua configurazione di TypeScript includa i tipi generati automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... le tue configurazioni esistenti
  include: [
    // ... i tuoi include esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

---

## Configurazione Git

È consigliato ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni nel tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Andare Oltre

Per andare oltre, puoi implementare l’[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) oppure esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti alla Documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

Questa guida completa fornisce tutto il necessario per integrare Intlayer con React Router v7 per un'applicazione completamente internazionalizzata con routing consapevole della localizzazione e supporto TypeScript.
