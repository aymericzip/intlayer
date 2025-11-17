---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Come tradurre la tua Tanstack Start – guida i18n 2025
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
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
history:
  - version: 6.5.2
    date: 2025-10-03
    changes: Aggiornamento documentazione
  - version: 5.8.1
    date: 2025-09-09
    changes: Aggiunto per Tanstack Start
---

# Traduci la tua Tanstack Start con Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione senza soluzione di continuità nei progetti Tanstack Start con routing consapevole della localizzazione, supporto TypeScript e pratiche di sviluppo moderne.

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e il rilevamento degli errori.
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
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione in React.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la localizzazione preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 3: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 4: Integra Intlayer nella tua configurazione Vite

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

### Passo 5: Crea i Componenti di Layout

Configura il layout principale e i layout specifici per locale:

#### Layout Principale

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Passo 6: Dichiara il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        it: "Informazioni",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        it: "Home",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        it: "Questo è un esempio di utilizzo di Intlayer con TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      it: "Benvenuto in Intlayer + TanStack Router",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena sono incluse nella directory `contentDir` (di default, `./app`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

### Passo 7: Crea Componenti e Hook Consapevoli della Localizzazione

Crea un componente `LocalizedLink` per la navigazione consapevole della localizzazione:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Utilità principale
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Helper
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Questo componente ha due obiettivi:

- Rimuovere il prefisso `{-$locale}` non necessario dall'URL.
- Iniettare il parametro locale nell'URL per garantire che l'utente venga reindirizzato direttamente alla rotta localizzata.

Successivamente possiamo creare un hook `useLocalizedNavigate` per la navigazione programmatica:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### Passo 8: Utilizza Intlayer nelle tue Pagine

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

#### Pagina Home Localizzata

```tsx fileName="src/routes/{-$locale}/index.tsx"
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
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
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

### Passo 9: Crea un Componente per il Cambio di Lingua

Crea un componente per permettere agli utenti di cambiare lingua:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocaleInStorage(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
          >
            <span>
              {/* Lingua - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa lingua - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Francés con la lingua corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Per saperne di più sul hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md).

### Passo 10: Aggiungere la gestione degli attributi HTML (Opzionale)

Crea un hook per gestire gli attributi lang e dir dell'HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
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

Poi usalo nel tuo componente root:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importa il hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // aggiungi questa riga

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Passo 11: Aggiungere middleware (Opzionale)

Puoi anche utilizzare `intlayerMiddleware` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la locale corrente basandosi sull'URL e imposterà il cookie della locale appropriata. Se non viene specificata alcuna locale, il plugin determinerà la locale più adatta in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna locale, verrà effettuato un reindirizzamento alla locale predefinita.

> Nota che per utilizzare `intlayerMiddleware` in produzione, è necessario spostare il pacchetto `vite-intlayer` da `devDependencies` a `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    intlayerMiddleware(),
  ],
});
```

---

### Passo 12: Configurare TypeScript (Opzionale)

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

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

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

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vai oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti alla documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [Dichiarazione del Contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

Questa guida completa fornisce tutto il necessario per integrare Intlayer con Tanstack Start per un'applicazione completamente internazionalizzata con routing consapevole della localizzazione e supporto TypeScript.
