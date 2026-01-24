---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Come tradurre la tua app TanStack Start – guida i18n 2026
description: Scopri come aggiungere l'internazionalizzazione (i18n) alla tua applicazione TanStack Start utilizzando Intlayer. Segui questa guida completa per rendere la tua app multilingue con il routing consapevole della localizzazione.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - Routing Locale
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiungi comando init
  - version: 7.4.0
    date: 2025-12-11
    changes: Introduci validatePrefix e aggiungi il passaggio 14: Gestione delle pagine 404 con rotte localizzate.
  - version: 7.3.9
    date: 2025-12-05
    changes: Aggiungi passaggio 13: Recupera la lingua locale nelle tue server action (Opzionale)
  - version: 7.2.3
    date: 2025-11-18
    changes: Aggiungi passaggio 13: Adatta Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Risolto il prefisso predefinito aggiungendo la funzione getPrefix, l'uso di useLocalizedNavigate, LocaleSwitcher e LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Aggiorna doc
  - version: 5.8.1
    date: 2025-09-09
    changes: Aggiunto per TanStack Start
---

# Traduci il tuo sito web TanStack Start usando Intlayer | Internazionalizzazione (i18n)

## Sommario

<TOC/>

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione senza interruzioni nei progetti TanStack Start con routing consapevole della localizzazione, supporto TypeScript e pratiche di sviluppo moderne.

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati, rotte e contenuti**.
- **Garantire il supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e la commutazione dinamica della localizzazione.
- **Abilitare il routing consapevole della localizzazione** con il sistema di routing basato su file di TanStack Start.

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione TanStack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="La migliore soluzione i18n per TanStack Start? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come Internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-tanstack-start-template) su GitHub.

### Passaggio 1: Creare il Progetto

Inizia creando un nuovo progetto TanStack Start seguendo la guida [Avvia nuovo progetto](https://tanstack.com/start/latest/docs/framework/react/quick-start) sul sito web di TanStack Start.

### Passaggio 2: Installare i Pacchetti Intlayer

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione di React.

- **vite-intlayer**
  Include il plugin Vite per l'integrazione di Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per il rilevamento della localizzazione preferita dell'utente, la gestione dei cookie e la gestione del reindirizzamento degli URL.

### Passaggio 3: Configurazione del tuo progetto

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

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passaggio 4: Integrare Intlayer nella tua Configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passaggio 5: Creare il Layout Root

Configura il tuo layout root per supportare l'internazionalizzazione utilizzando `useMatches` per rilevare la localizzazione corrente e impostando gli attributi `lang` e `dir` sul tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Prova a trovare la localizzazione nei parametri di qualsiasi corrispondenza attiva
  // Questo presuppone l'uso del segmento dinamico "/{-$locale}" nell'albero delle rotte
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Passaggio 6: Creare il Layout di Localizzazione

Crea un layout che gestisca il prefisso di localizzazione ed esegua la validazione.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Convalida il prefisso di localizzazione
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Qui, `{-$locale}` è un parametro dinamico della rotta che viene sostituito con la localizzazione corrente. Questa notazione rende lo slot opzionale, permettendogli di funzionare con modalità di routing come `'prefix-no-default'` ecc.

> Tieni presente che questo slot potrebbe causare problemi se utilizzi più segmenti dinamici nella stessa rotta (es. `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Per la modalità `'prefix-all'`, potresti preferire passare allo slot `$locale`.
> Per la modalità `'no-prefix'` o `'search-params'`, puoi rimuovere completamente lo slot.

### Passaggio 7: Dichiarare il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/contents/page.content.ts"
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
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./app`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per ulteriori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passaggio 8: Creare Componenti e Hook Consapevoli della Localizzazione

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

Quindi possiamo creare un hook `useLocalizedNavigate` per la navigazione programmatica:

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

### Passaggio 9: Utilizzare Intlayer nelle tue Pagine

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

### Passaggio 10: Creare un Componente Locale Switcher

Crea un componente per consentire agli utenti di cambiare lingua:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Localizzazione - es. FR */}
              {localeEl}
            </span>
            <span>
              {/* Lingua nella sua localizzazione - es. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Lingua nella localizzazione corrente - es. Francés con localizzazione corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Per saperne di più sull'hook `useLocale`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md).

### Passaggio 11: Gestione degli Attributi HTML

Come visto nel Passaggio 5, puoi gestire gli attributi `lang` e `dir` del tag `html` utilizzando `useMatches` nel tuo componente root. Questo assicura che gli attributi corretti siano impostati sia sul server che sul client.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Prova a trovare la localizzazione nei parametri di qualsiasi corrispondenza attiva
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Passaggio 12: Aggiungere middleware (Opzionale)

Puoi anche utilizzare `intlayerProxy` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la localizzazione corrente in base all'URL e imposterà il cookie della localizzazione appropriato. Se non viene specificata alcuna localizzazione, il plugin determinerà la localizzazione più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna localizzazione, reindirizzerà alla localizzazione predefinita.

> Nota che per utilizzare `intlayerProxy` in produzione, è necessario spostare il pacchetto `vite-intlayer` da `devDependencies` a `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Il proxy deve essere posizionato prima del server se usi Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Passaggio 13: Internazionalizzare i tuoi Metadati (Opzionale)

Puoi anche utilizzare l'hook `getIntlayer` per accedere ai tuoi dizionari di contenuti in tutta l'applicazione:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Passaggio 14: Recuperare la localizzazione nelle tue server action (Opzionale)

Potresti voler accedere alla localizzazione corrente dall'interno delle tue server action o degli endpoint API.
Puoi farlo utilizzando l'helper `getLocale` di `intlayer`.

Ecco un esempio che utilizza le server function di TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Ottieni il cookie dalla richiesta (predefinito: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Ottieni l'header dalla richiesta (predefinito: 'x-intlayer-locale')
    // Fallback utilizzando la negoziazione Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recupera alcuni contenuti utilizzando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Passaggio 15: Gestire le pagine non trovate (Opzionale)

Quando un utente visita una pagina non esistente, puoi visualizzare una pagina 404 personalizzata e il prefisso di localizzazione può influire sul modo in cui viene attivata la pagina non trovata.

#### Comprendere la Gestione 404 di TanStack Router con i Prefissi di Localizzazione

In TanStack Router, la gestione delle pagine 404 con rotte localizzate richiede un approccio a più livelli:

1. **Rotta 404 dedicata**: Una rotta specifica per visualizzare l'interfaccia utente 404
2. **Validazione a livello di rotta**: Convalida i prefissi di localizzazione e reindirizza quelli non validi al 404
3. **Rotta catch-all**: Cattura qualsiasi percorso non corrispondente all'interno del segmento di localizzazione

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Questo crea una rotta dedicata /[locale]/404
// Viene utilizzata sia come rotta diretta che importata come componente in altri file
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Esportata separatamente in modo che possa essere riutilizzata in notFoundComponent e nelle rotte catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad viene eseguito prima del rendering della rotta (sia sul server che sul client)
  // È il luogo ideale per convalidare il prefisso di localizzazione
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix controlla se la localizzazione è valida in base alla tua configurazione intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefisso di localizzazione non valido - reindirizza alla pagina 404 con un prefisso valido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent viene chiamato quando una rotta figlia non esiste
  // es. /en/non-existent-page attiva questo all'interno del layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// La rotta $ (splat/catch-all) corrisponde a qualsiasi percorso che non corrisponde ad altre rotte
// es. /en/some/deeply/nested/invalid/path
// Questo assicura che TUTTI i percorsi non corrispondenti all'interno di una localizzazione mostrino la pagina 404
// Senza questo, i percorsi profondi non corrispondenti potrebbero mostrare una pagina vuota o un errore
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Passaggio 16: Configurare TypeScript (Opzionale)

Intlayer utilizza l'augmentation dei moduli per ottenere i vantaggi di TypeScript e rendere il tuo codice più robusto.

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente:

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

Si consiglia di ignorare i file generati da Intlayer. Ciò consente di evitare di commetterli nel repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per ulteriori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vai Oltre

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti della Documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione TanStack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
