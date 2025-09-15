---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Iniziare con Intlayer in Tanstack Start
description: Scopri come aggiungere l'internazionalizzazione (i18n) alla tua applicazione Tanstack Start utilizzando Intlayer. Segui questa guida completa per rendere la tua app multilingue con il routing consapevole della localizzazione.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Routing Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# Iniziare con l'internazionalizzazione (i18n) usando Intlayer e Tanstack Start

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione senza soluzione di continuità nei progetti Tanstack Start con routing consapevole della localizzazione, supporto TypeScript e pratiche di sviluppo moderne.

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della localizzazione.
- **Abilitare il routing consapevole della localizzazione** con il sistema di routing basato su file di Tanstack Start.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Tanstack Start

### Passo 1: Creare il progetto

Inizia creando un nuovo progetto TanStack Start seguendo la guida [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) sul sito di TanStack Start.

### Passo 2: Installare i pacchetti Intlayer

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con le applicazioni React. Fornisce provider di contesto e hook per l'internazionalizzazione in React.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la localizzazione preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 3: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 4: Integra Intlayer nella tua configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddlewarePlugin, intlayerPlugin } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    intlayerPlugin(),
    intlayerMiddlewarePlugin(),
  ],
});
```

> Il plugin Vite `intlayerPlugin()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 5: Crea i Componenti di Layout

Configura il tuo layout principale e i layout specifici per locale:

#### Layout Principale

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 6: Dichiarare il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "Questo è un esempio di utilizzo di Intlayer con TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Benvenuto in Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena vengono incluse nella directory `contentDir` (per impostazione predefinita, `./app`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

### Passo 7: Crea Componenti e Hook Sensibili alla Localizzazione

Crea un componente `LocalizedLink` per una navigazione sensibile alla localizzazione:

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

Crea un hook `useLocalizedNavigate` per la navigazione programmata:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### Passo 8: Utilizzare Intlayer nelle tue Pagine

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

#### Pagina di Reindirizzamento Radice

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Pagina Home Localizzata

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">Indice</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

### Passo 9: Crea un componente Locale Switcher

Crea un componente per permettere agli utenti di cambiare lingua:

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* Esempio: Français (Francese) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md).

### Passo 10: Aggiungere la Gestione degli Attributi HTML (Opzionale)

Crea un hook per gestire gli attributi lang e dir dell'HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// src/hooks/useI18nHTMLAttributes.tsx
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

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importa il hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // aggiungi questa riga

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 11: Compila ed Esegui la Tua Applicazione

Compila i dizionari di contenuto ed esegui la tua applicazione:

```bash packageManager="npm"
# Compila i dizionari di Intlayer
npm run intlayer:build

# Avvia il server di sviluppo
npm run dev
```

```bash packageManager="pnpm"
# Compila i dizionari di Intlayer
pnpm intlayer:build

# Avvia il server di sviluppo
pnpm dev
```

```bash packageManager="yarn"
# Compila i dizionari di Intlayer
yarn intlayer:build

# Avvia il server di sviluppo
yarn dev
```

### Passo 12: Configura TypeScript (Opzionale)

Intlayer utilizza l'augmentazione dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

Assicurati che la tua configurazione di TypeScript includa i tipi generati automaticamente:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... le tue configurazioni TypeScript esistenti
  },
  include: [
    // ... i tuoi include esistenti
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

---

### Passo 13: Crea un Reindirizzamento (Opzionale)

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // Reindirizza alla lingua predefinita se non è presente alcuna lingua nell'URL quando prefixDefault è true
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // Reindirizza alla lingua selezionata se la lingua nell'URL non corrisponde a quella selezionata
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

## Distribuzione in Produzione

Quando distribuisci la tua applicazione:

1. **Compila la tua applicazione:**

   ```bash
   npm run build
   ```

2. **Compila i dizionari di Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **Sposta `vite-intlayer` nelle dipendenze** se usi il middleware in produzione:
   ```bash
   npm install vite-intlayer --save
   ```

La tua applicazione supporterà ora:

- **Struttura URL**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Rilevamento automatico della lingua** basato sulle preferenze del browser
- **Routing consapevole della lingua** con Tanstack Start
- **Supporto TypeScript** con tipi generati automaticamente
- **Rendering lato server** con gestione corretta della lingua

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione Intlayer per VS Code** ufficiale.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vai oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) oppure esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti alla Documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

Questa guida completa fornisce tutto il necessario per integrare Intlayer con Tanstack Start per un'applicazione completamente internazionalizzata con routing consapevole della localizzazione e supporto TypeScript.

## Cronologia della Documentazione

| Versione | Data       | Modifiche                   |
| -------- | ---------- | --------------------------- |
| 5.8.1    | 2025-09-09 | Aggiunto per Tanstack Start |
