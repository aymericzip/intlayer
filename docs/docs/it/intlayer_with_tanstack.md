---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione TanStack Start multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - Routing Locale
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Confrontare la risoluzione statica, dinamica e dinamica in cache dei dizionari di metadati nelle funzioni head delle rotte"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Introduci validatePrefix e aggiungi il passaggio 14: Gestione delle pagine 404 con rotte localizzate."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Aggiungi passaggio 13: Recupera la lingua locale nelle tue server action (Opzionale)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Aggiungi passaggio 13: Adatta Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Risolto il prefisso predefinito aggiungendo la funzione getPrefix, l'uso di useLocalizedNavigate, LocaleSwitcher e LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Aggiorna doc"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Aggiunto per TanStack Start"
author: aymericzip
---

# Traduci il tuo sito web TanStack Start usando Intlayer | Internazionalizzazione (i18n)

## Sommario

<TOC/>

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione senza interruzioni nei progetti TanStack Start con routing consapevole della localizzazione, supporto TypeScript e pratiche di sviluppo moderne.

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `react-i18next` o `use-intl` o `paraglide`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Copertura completa TanStack Start">

Intlayer è completamente ottimizzato per TanStack Start, fornendo **routing multilingue**, **gestione dei cookie**, **generazione di mappe del sito**, **caricamento dinamico dei contenuti** e tutte le funzionalità necessarie per scalare i tuoi sforzi di internazionalizzazione (i18n).

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando il LLM di tua scelta al costo del tuo provider di intelligenza artificiale. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Prestazione">

La connessione di enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti in fase di compilazione.

</Accordion>

<Accordion header="Scalabilità con nessuno sviluppatore">

Più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** per aiutarti gestisci i tuoi contenuti multilingue in **tempo reale**, semplificando la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>
</AccordionGroup>

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione TanStack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="La migliore soluzione i18n per TanStack Start? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come Internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-tanstack-start-template) su GitHub.

<Steps>

<Step number={1} title="Creare il Progetto">

Inizia creando un nuovo progetto TanStack Start seguendo la guida [Avvia nuovo progetto](https://tanstack.com/start/latest/docs/framework/react/quick-start) sul sito web di TanStack Start.

</Step>

<Step number={2} title="Installare i Pacchetti Intlayer">

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **react-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione React. Fornisce provider di contesto e hook per l'internazionalizzazione di React.

- **vite-intlayer**
  Include il plugin Vite per l'integrazione di Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per il rilevamento della localizzazione preferita dell'utente, la gestione dei cookie e la gestione del reindirizzamento degli URL.

</Step>

<Step number={3} title="Configurazione del tuo progetto">

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

</Step>

<Step number={4} title="Integrare Intlayer nella tua Configurazione Vite">

Aggiungi il plugin intlayer nella tua configurazione:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

</Step>

<Step number={5} title="Creare il Layout Root">

Configura il tuo layout root per supportare l'internazionalizzazione utilizzando `useParams` per rilevare la localizzazione corrente e impostando gli attributi `lang` e `dir` sul tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="Creare il Layout di Localizzazione">

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

</Step>

<Step number={7} title="Dichiarare il Tuo Contenuto">

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

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./app`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per ulteriori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={8} title="Creare Componenti e Hook Consapevoli della Localizzazione">

Crea un componente `LocalizedLink` per la navigazione consapevole della localizzazione:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="Utilizzare Intlayer nelle tue Pagine">

> Usa **`useIntlayer`** come impostazione predefinita: è il modo consigliato per leggere i contenuti nei componenti e il compilatore lo risolve sulla locale effettivamente renderizzata. Ricorri a `getIntlayer` / `getIntlayerAsync` solo al di fuori dell'albero React: l'`head` delle rotte, i loader e le server function.

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

#### Pagina Home Localizzata

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> Se vuoi usare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., puoi usare il valore della funzione, come:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Creare un Componente di Selezione delle Lingue">

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
              {/* Locale - ad es. FR */}
              {localeEl}
            </span>
            <span>
              {/* Lingua nella sua stessa Locale - ad es. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Lingua nella Locale corrente - ad es. Francese con la locale corrente impostata su Locales.ITALIAN */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - ad es. French */}
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

</Step>

<Step number={10} title="Gestione degli Attributi HTML">

Come visto nel Passaggio 5, puoi gestire gli attributi `lang` e `dir` del tag `html` utilizzando `useParams` nel tuo componente root. Questo assicura che gli attributi corretti siano impostati sia lato server che lato client.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Aggiungi middleware">

Puoi anche usare `intlayerProxy` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileva automaticamente la locale corrente in base all'URL e imposta il cookie della locale appropriato. Se non viene specificata alcuna locale, il plugin determinerà la locale più appropriata in base alle preferenze della lingua del browser dell'utente. Se non viene rilevata alcuna locale, reindirizzerà alla locale predefinita.

> Nota che per usare `intlayerProxy` in produzione, devi spostare il package `vite-intlayer` da `devDependencies` a `dependencies`.

> A partire da Intlayer v9, `intlayerProxy()` è aggruppato direttamente nel plugin `intlayer()` e abilitato per impostazione predefinita tramite l'opzione `routing.enableProxy` (`true` per impostazione predefinita). Registrarlo separatamente come mostrato di seguito è ora opzionale: viene mantenuto per compatibilità con le versioni precedenti e per i setup che devono controllare l'ordine dei plugin. Imposta `routing.enableProxy: false` per disattivarlo. Vedi le [note di rilascio della v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Internazionalizza i tuoi Metadati">

<Tabs>

<Tab label="Risoluzione statica" value="static">

`getIntlayer` si risolve sincronamente rispetto al dizionario **unito**, quello che contiene ogni locale dichiarata. `head` rimane sincrono e nulla viene atteso, ma l'intero dizionario multilingue viene inserito nel chunk di route inviato al browser.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Il percorso per questa route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Link canonico: punta alla pagina localizzata corrente
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: comunica a Google tutte le versioni localizzate
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: per gli utenti con lingue non corrispondenti
        // Definisci la locale di fallback predefinita (di solito la tua lingua principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Migliore per piccoli dizionari di metadati, un pugno di locale o durante il prototipo.

</Tab>

<Tab label="Risoluzione dinamica" value="dynamic">

`getIntlayerAsync` (disponibile da **v9.4**) si comporta come `getIntlayer`, ma il plugin di build lo punta al chunk per locale in `.intlayer/dynamic_dictionaries/` invece che al dizionario unito. Una pagina quindi spedisce solo la locale che rende. Poiché quel chunk viene caricato su richiesta, `head` diventa `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Il percorso per questa route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Link canonico: punta alla pagina localizzata corrente
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: comunica a Google tutte le versioni localizzate
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: per gli utenti con lingue non corrispondenti
        // Definisci la locale di fallback predefinita (di solito la tua lingua principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Se un `head` legge più dizionari, risolvili con `Promise.all`: attendere ogni `getIntlayerAsync` su una riga propria concatena le richieste invece di eseguirle in parallelo.

Il compromesso: l'importazione dinamica viene risolta mentre `head` viene eseguito, sul percorso critico del rendering del documento. Su una route fredda questo ritarda l'head di pochi millisecondi e può degradare leggermente **LCP**.

</Tab>

<Tab label="Risoluzione dinamica memorizzata nella cache" value="cached">

Risolvi il dizionario nel `loader` della route e leggilo di nuovo da `loaderData` in `head`. I loader delle route corrispondenti vengono eseguiti in parallelo e `staleTime: Infinity` dice a TanStack Router che il risultato non scade mai, quindi il chunk per locale viene risolto una volta e servito dalla cache del router successivamente, lasciando `head` sincrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Risolto in parallelo con le altre route corrispondenti, al di fuori del percorso critico dell'head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Il dizionario non cambia mai per una determinata locale: risolvi il chunk una volta
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Il percorso per questa route

    return {
      links: [
        // Link canonico: punta alla pagina localizzata corrente
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: comunica a Google tutte le versioni localizzate
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: per gli utenti con lingue non corrispondenti
        // Definisci la locale di fallback predefinita (di solito la tua lingua principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` può essere chiamato prima che il loader si risolva, quindi `loaderData` è tipizzato come possibilmente `undefined`. Mantieni l'optional chaining o restituisci un titolo di fallback.

Mantieni il chunk per locale senza pagarne il costo sul percorso critico dell'head. Il prezzo è l'esperienza dello sviluppatore: il contenuto deve essere trasferito esplicitamente dal loader all'`head` attraverso `loaderData`.

</Tab>

</Tabs>

### Quale risoluzione dovrei scegliere?

|                      | Static resolution     | Dynamic resolution         | Cached dynamic resolution              |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

---

</Step>

<Step number={13} title="Recupera la locale nelle tue server actions">

Potresti voler accedere alla locale corrente all'interno delle tue server actions o endpoint API.
Puoi farlo usando l'helper `getLocale` da `intlayer`.

Ecco un esempio usando le server functions di TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Ottieni il cookie dalla richiesta (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Ottieni l'header dalla richiesta (default: 'x-intlayer-locale')
    // Fallback usando la negoziazione Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recupera alcuni contenuti usando getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Gestisci le pagine non trovate">

Quando un utente visita una pagina che non esiste, puoi visualizzare una pagina "not found" personalizzata e il prefisso della locale potrebbe influire sul modo in cui la pagina "not found" viene attivata.

#### Pagina Home Localizzata

> Se desideri utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., puoi utilizzare il valore della funzione, come:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md).

</Step>

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

</Step>

<Step number={11} title="Gestione degli Attributi HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Se un `head` legge più dizionari, risolvili con `Promise.all`: attendere ogni `getIntlayerAsync` su una riga separata concatena le richieste invece di eseguirle in parallelo.

Il compromesso: l'import dinamico viene risolto mentre `head` è in esecuzione, sul percorso critico del rendering del documento. Su una rotta fredda questo ritarda l'`head` di qualche millisecondo e può peggiorare leggermente l'**LCP**.

</Tab>

<Tab label="Risoluzione dinamica in cache" value="cached">

Risolvi il dizionario nel `loader` della rotta e rileggilo da `loaderData` dentro `head`. I loader delle rotte corrispondenti girano in parallelo e `staleTime: Infinity` comunica a TanStack Router che il risultato non scade mai: il chunk per locale viene quindi risolto una sola volta e poi servito dalla cache del router, lasciando `head` sincrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"

<Tabs>
 <Tab value='Extract command'>

  return { locale, content };
});
import { createFileRoute } from "@tanstack/react-router";

````

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { NotFoundComponent } from "./404";
```

</Step>

<Step number={15} title="Estrarre il contenuto dei tuoi componenti" isOptional={true}>

Se hai una base di codice esistente, trasformare migliaia di file può richiedere molto tempo.

Per facilitare questo processo, Intlayer propone un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) / [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per trasformare i tuoi componenti ed estrarre il contenuto.

Per configurarlo, puoi aggiungere una sezione `compiler` nel tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Definisce il percorso dei file di output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Prefisso chiave dizionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando di estrazione'>

Esegui l'estrattore per trasformare i tuoi componenti ed estrarre il contenuto

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

bun x intlayer extract
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Oppure npm run dev
```

```bash packageManager="pnpm"
pnpm run build # O pnpm run dev
```

```bash packageManager="yarn"
yarn build # O yarn dev
```

```bash packageManager="bun"

---

bun run build # Or bun run dev
import { localeFlatMap } from "intlayer";
// ... altre importazioni

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... altri plugin
    tanstackStart({
      // ... altre configurazioni
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Quindi, crea un percorso `src/routes/sitemap[.]xml.ts` che utilizzi la funzione `generateSitemap`:

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
{
  // ... le tue configurazioni esistenti
  include: [
    // ... i tuoi include esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di effettuare il commit nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
````

---

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione Intlayer per VS Code**.

[Installa da VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vai oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare il tuo contenuto utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti alla Documentazione

- [Documentazione di Intlayer](https://intlayer.org)
- [Documentazione di Tanstack Start](https://reactrouter.com/)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
