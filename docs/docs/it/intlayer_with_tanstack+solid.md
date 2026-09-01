---
createdAt: 2025-03-25
updatedAt: 2026-08-30
title: "TanStack Start + Solid i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione TanStack Start + Solid multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Routing di localizzazione
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Confrontare la risoluzione statica, dinamica e dinamica in cache dei dizionari di metadati nelle funzioni head delle rotte"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Aggiunto per Tanstack Start Solid.js"
author: aymericzip
---

# Traduci il tuo sito web Tanstack Start con Solid.js usando Intlayer | Internazionalizzazione (i18n)

## Sommario

<TOC/>

Questa guida dimostra come integrare **Intlayer** per un'internazionalizzazione fluida nei progetti Tanstack Start con Solid.js, routing sensibile alla localizzazione, supporto TypeScript e moderne pratiche di sviluppo.

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `react-i18next` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>
<Accordion header="Copertura completa TanStack Start">

Intlayer è ottimizzato per funzionare perfettamente con TanStack Start e Solid offrendo **routing multilingue**, **mappa del sito** e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

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

## Guida passo-passo per configurare Intlayer in un'applicazione Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="La migliore soluzione i18n per Tanstack Start? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Modello di applicazione](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) su GitHub.

<Steps>

<Step number={1} title="Crea il progetto">

Inizia creando un nuovo progetto TanStack Start seguendo la guida [Avvia un nuovo progetto](https://tanstack.com/start/latest/docs/framework/solid/quick-start) sul sito web di TanStack Start.

</Step>

<Step number={2} title="Installa i pacchetti Intlayer">

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **solid-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Solid. Fornisce fornitori di contesto e hook per l'internazionalizzazione di Solid.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

</Step>

<Step number={3} title="Configurazione del progetto">

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

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento del middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={4} title="Integra Intlayer nella tua configurazione Vite">

Aggiungi il plugin intlayer nella tua configurazione:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

</Step>

<Step number={5} title="Crea il layout radice">

Configura il tuo layout radice per supportare l'internazionalizzazione utilizzando `useParams` per rilevare la lingua corrente e impostando gli attributi `lang` e `dir` sul tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Crea il layout della lingua">

Crea un layout che gestisca il prefisso della lingua ed effettui la validazione. Questo layout assicurerà che vengano elaborati solo prefissi di lingua validi.

> Questo passaggio è opzionale se non hai bisogno di validare il prefisso della lingua a livello di rotta.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Convalida il prefisso della lingua
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Qui, `{-$locale}` è un parametro di rotta dinamico che viene sostituito con la lingua corrente. Questa notazione rende lo slot opzionale, consentendogli di funzionare con modalità di routing come `'prefix-no-default'`, ecc.

> Tieni presente che questo slot può causare problemi se utilizzi più segmenti dinamici nella stessa rotta (ad esempio, `/{-$locale}/altro-percorso/$unAltroPercorsoDinamico/...`).
> Per la modalità `'prefix-all'`, potresti preferire cambiare lo slot in `$locale`.
> Per la modalità `'no-prefix'` o `'search-params'`, puoi rimuovere completamente lo slot.

</Step>

<Step number={7} title="Dichiarazione dei contenuti">

Crea e gestisci le tue dichiarazioni dei contenuti per memorizzare le traduzioni:

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
        fr: "Ceci est un esempio d'utilizzo d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Le tue dichiarazioni dei contenuti possono essere definite ovunque nella tua applicazione, a condizione che siano incluse nella directory `contentDir` (per impostazione predefinita, `./app`). E corrispondano all'estensione del file di dichiarazione dei contenuti (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={8} title="Utilizza componenti e hook sensibili alla lingua">

Crea un componente `LocalizedLink` per una navigazione sensibile alla lingua:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Questo componente ha due obiettivi:

- Rimuovere il prefisso inutile `{-$locale}` dall'URL.
- Iniettare il parametro della lingua nell'URL per garantire che l'utente venga reindirizzato direttamente alla rotta localizzata.

Quindi possiamo creare un hook `useLocalizedNavigate` per la navigazione programmatica:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Utilizza Intlayer nelle tue pagine">

> Usa **`useIntlayer`** come impostazione predefinita: è il modo consigliato per leggere i contenuti nei componenti e il compilatore lo risolve sulla locale effettivamente renderizzata. Ricorri a `getIntlayer` / `getIntlayerAsync` solo al di fuori dell'albero Solid: l'`head` delle rotte, i loader e le server function.

Accedi ai tuoi dizionari dei contenuti in tutta l'applicazione:

#### Home Page localizzata

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> In Solid, `useIntlayer` restituisce contenuti reattivi (ad esempio, `content`). Puoi accedere direttamente alle sue proprietà.
>
> Per saperne di più sull'hook `useIntlayer`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Crea un componente per cambiare lingua">

Crea un componente per consentire agli utenti di cambiare lingua:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> In Solid, `locale` da `useLocale` è un **accessore di segnale**. Usa `locale()` (con le parentesi) per leggere il suo valore corrente in modo reattivo.
>
> Per saperne di più sull'hook `useLocale`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Gestione degli attributi HTML">

Come visto nel Passaggio 5, puoi gestire gli attributi `lang` e `dir` del tag `html` utilizzando `useParams` nel tuo componente radice. Questo assicura che vengano impostati gli attributi corretti sia sul server che sul client.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>

<Step number={12} title="Aggiungi il middleware">

Puoi anche utilizzare `intlayerProxy` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente in base all'URL e imposterà il cookie della lingua appropriato. Se non viene specificata alcuna lingua, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, reindirizzerà alla lingua predefinita.

> Tieni presente che per utilizzare `intlayerProxy` in produzione, è necessario spostare il pacchetto `vite-intlayer` da `devDependencies` a `dependencies`.

> A partire da Intlayer v9, `intlayerProxy()` è incluso direttamente nel plugin `intlayer()` e abilitato per impostazione predefinita tramite l'opzione `routing.enableProxy` (`true` per impostazione predefinita). La registrazione separata come mostrato di seguito è ora facoltativa: è mantenuta per la compatibilità con le versioni precedenti e per i setup che hanno bisogno di controllare l'ordine dei plugin. Imposta `routing.enableProxy: false` per disattivare. Vedi le [note di rilascio v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
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
    solid(),
  ],
});
```

</Step>

<Step number={13} title="Internazionalizza i tuoi metadati">

<Tabs>

<Tab label="Risoluzione statica" value="static">

`getIntlayer` si risolve in modo sincrono sul dizionario **unificato**, quello che contiene tutte le locali dichiarate. `head` resta sincrono e non attende nulla, ma l'intero dizionario multilingue finisce nel chunk della rotta inviato al browser.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

Indicata per dizionari di metadati piccoli, poche locali o in fase di prototipazione.

</Tab>

<Tab label="Risoluzione dinamica" value="dynamic">

`getIntlayerAsync` (disponibile dalla **v9.4**) si comporta come `getIntlayer`, ma il plugin di build lo punta al chunk per locale in `.intlayer/dynamic_dictionaries/` anziché al dizionario unificato. Una pagina spedisce quindi solo la locale che renderizza. Poiché quel chunk viene caricato su richiesta, `head` diventa `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

> Se un `head` legge più dizionari, risolvili con `Promise.all`: attendere ogni `getIntlayerAsync` su una riga separata concatena le richieste invece di eseguirle in parallelo.

Il compromesso: l'import dinamico viene risolto mentre `head` è in esecuzione, sul percorso critico del rendering del documento. Su una rotta fredda questo ritarda l'`head` di qualche millisecondo e può peggiorare leggermente l'**LCP**.

</Tab>

<Tab label="Risoluzione dinamica in cache" value="cached">

Risolvi il dizionario nel `loader` della rotta e rileggilo da `loaderData` dentro `head`. I loader delle rotte corrispondenti girano in parallelo e `staleTime: Infinity` comunica a TanStack Router che il risultato non scade mai: il chunk per locale viene quindi risolto una sola volta e poi servito dalla cache del router, lasciando `head` sincrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

> `head` può essere invocato prima che il loader si risolva, perciò `loaderData` è tipizzato come potenzialmente `undefined`. Mantieni l'optional chaining oppure restituisci un titolo di fallback.

Mantieni il chunk per locale senza pagarne il costo sul percorso critico dell'`head`. Il prezzo è la developer experience: il contenuto va passato esplicitamente dal loader all'`head` tramite `loaderData`.

</Tab>

</Tabs>

### Quale risoluzione scegliere?

|                      | Risoluzione statica        | Risoluzione dinamica       | Risoluzione dinamica in cache           |
| -------------------- | -------------------------- | -------------------------- | --------------------------------------- |
| API                  | `getIntlayer`              | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` nel `loader` (v9.4+) |
| Firma di `head`      | sincrona                   | `async`                    | sincrona, legge `loaderData`            |
| Locali spedite       | tutte le locali dichiarate | solo la locale richiesta   | solo la locale richiesta                |
| Navigazioni client   | niente da risolvere        | rieseguito a ogni match    | servito dalla cache del router          |
| Developer experience | la più semplice            | un solo `await`            | contenuto passato tramite `loaderData`  |

</Step>

<Step number={14} title="Recupera la lingua nelle tue azioni server">

Potresti voler accedere alla lingua corrente dall'interno delle tue azioni server o dei tuoi endpoint API.
Puoi farlo usando l'aiutante `getLocale` di `intlayer`.

Ecco un esempio usando le funzioni server di TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Ottenere il cookie dalla richiesta (predefinito: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Ottenere l'intestazione dalla richiesta (predefinito: 'x-intlayer-locale')
    // Fallback usando la negoziazione Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recuperare del contenuto usando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={15} title="Gestione delle pagine non trovate">

Quando un utente visita una pagina inesistente, puoi mostrare una pagina di errore 404 personalizzata e il prefisso della lingua può influenzare il modo in cui tale pagina viene attivata.

#### Capire la gestione 404 di TanStack Router con i prefissi della lingua

In TanStack Router, la gestione delle pagine 404 con rotte localizzate richiede un approccio a più livelli:

1. **Rotta 404 dedicata**: Una rotta specifica per visualizzare l'interfaccia utente 404
2. **Validazione a livello di rotta**: Convalida i prefissi della lingua e reindirizza quelli non validi alla pagina 404
3. **Rotta catch-all**: Cattura qualsiasi percorso non corrispondente all'interno del segmento della lingua

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Questo crea una rotta dedicata /[locale]/404
// È usata sia come rotta diretta che importata come componente in altri file
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Esportata separatamente in modo da poter essere riutilizzata in notFoundComponent e nelle rotte catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad viene eseguito prima del rendering della rotta (sia sul server che sul client)
  // È il posto ideale per convalidare il prefisso della lingua
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix controlla se la lingua è valida secondo la tua configurazione intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefisso della lingua non valido - reindirizza alla pagina 404 con un prefisso della lingua valido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent viene chiamato quando una rotta figlia non esiste
  // ad esempio, /en/pagina-inesistente attiva questo all'interno del layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// La rotta $ (splat/catch-all) corrisponde a qualsiasi percorso che non corrisponde ad altre rotte
// ad esempio, /en/qualche/percorso/profondo/non-valido
// Questo assicura che TUTTI i percorsi non corrispondenti all'interno di una lingua mostrino la pagina 404
// Senza questo, i percorsi profondi non corrispondenti potrebbero mostrare una pagina bianca o un errore
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Estrarre il contenuto dei componenti" isOptional={true}>

Se hai una base di codice esistente, trasformare migliaia di file può richiedere molto tempo.

Per facilitare questo processo, Intlayer propone un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) / [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per trasformare i tuoi componenti ed estrarre il contenuto.

Per configurarlo, puoi aggiungere una sezione `compiler` nel tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto della configurazione
  compiler: {
    /**
     * Indica se il compilatore deve essere abilitato.
     */
    enabled: true,

    /**
     * Definisce il percorso dei file di output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se i componenti devono essere salvati dopo essere stati trasformati.
     *
     * - Se `true`, il compilatore riscriverà il file del componente sul disco. Quindi la trasformazione sarà permanente e il compilatore salterà la trasformazione per il processo successivo. In questo modo, il compilatore può trasformare l'app e poi essere rimosso.
     *
     * - Se `false`, il compilatore inietterà la chiamata alla funzione `useIntlayer()` solo nel codice dell'output di build, mantenendo intatta la base di codice. La trasformazione avverrà solo in memoria.
     */
    saveComponents: false,

    /**
     * Prefisso della chiave del dizionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando extract'>

Esegui l'estrattore per trasformare i tuoi componenti ed estrarre il contenuto

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilatore Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Aggiorna il tuo `vite.config.ts` per includere il plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Oppure npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Oppure pnpm run dev
```

```bash packageManager="yarn"
yarn build # Oppure yarn dev
```

```bash packageManager="bun"
bun run build # Oppure bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Generare una Sitemap">

Intlayer include un generatore di sitemap integrato per aiutarti a creare facilmente una sitemap per la tua applicazione. Gestisce le rotte localizzate e aggiunge i metadati necessari per i motori di ricerca.

> La sitemap generata da Intlayer supporta lo spazio dei nomi `xhtml:link` (Hreflang XML Extensions). A differenza dei generatori di sitemap predefiniti che elencano solo URL grezzi, Intlayer crea automaticamente i collegamenti bidirezionali richiesti tra tutte le versioni linguistiche di una pagina (ad esempio, `/about`, `/about?lang=fr` e `/about?lang=es`). Ciò garantisce che i motori di ricerca indicizzino e servano correttamente la versione linguistica corretta al pubblico giusto.

Per utilizzarlo, devi prima configurare il tuo file `vite.config.ts` per abilitare il pre-rendering per i tuoi percorsi localizzati e disabilitare la generazione predefinita della sitemap di TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
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

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

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
```

</Step>

<Step number={17} title="Configura TypeScript">

Intlayer utilizza l'aumento dei moduli per sfruttare i vantaggi di TypeScript e rendere la tua base di codice più robusta.

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati:

```json5 fileName="tsconfig.json"
{
  // ... le tue configurazioni esistenti
  include: [
    // ... i tuoi include esistenti
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

</Step>

</Steps>

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò consente di evitare di inserirli nel repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime in linea** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, fai riferimento alla [documentazione dell'estensione Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti della documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione Tanstack Start](https://tanstack.com/start/latest)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md)
- [Dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un'app TanStack Start e Solid?">

TanStack Start non include alcun livello i18n, e le opzioni dell'ecosistema Solid sono scarne:

- **`@solid-primitives/i18n`**: un dizionario piatto che assembli e colleghi al router tu stesso.
- **`i18next`** con un wrapper Solid: cataloghi maturi, ma nessuna integrazione con il router TanStack, la funzione `head` o il passaggio di pre-render.
- **`Intlayer`**: contenuto dichiarato accanto a ogni componente e compilato in fase di build, con routing consapevole delle locale, generazione della sitemap, traduzione AI, un editor visivo e un CMS.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) e il [benchmark i18n di TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle TanStack Start?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il markup renderizzato lato server risolve i suoi contenuti sul server, e il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate, e i [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md).

</Question>

<Question title="Posso migrare da `@solid-primitives/i18n` o `i18next` senza riscrivere i miei componenti?">

In gran parte. Segui la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) per spostare il contenuto. Puoi anche migrare gradualmente: il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi cataloghi JSON esistenti come fonte di verità e genera dizionari Intlayer da essi, così entrambi i livelli restano sincronizzati mentre sposti i componenti uno alla volta.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi componenti, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Il passo 15 di questa guida lo illustra.

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

<Question title="Intlayer supporta il rendering lato server e il pre-rendering qui?">

Sì. Il contenuto si risolve durante l'SSR, e il passo 16 copre la configurazione di pre-render che emette un documento statico per ogni rotta localizzata, più la sitemap localizzata generata dalla stessa tabella delle rotte.

</Question>

<Question title="Cambiare la locale ri-renderizza tutta la mia app?">

No. Il contenuto è supportato dai signal di Solid, quindi cambiare lingua aggiorna solo i nodi del DOM che leggono i valori modificati.

</Question>

<Question title="Come aggiungo i tag hreflang e una sitemap localizzata?">

Usa la funzione integrata `generateSitemap` in una rotta `src/routes/sitemap[.]xml.ts`. Emette il namespace `xhtml:link`, così ogni versione linguistica di una pagina si collega bidirezionalmente alle altre. I metadati `head` localizzati sono trattati nel passo 12.

</Question>

<Question title="Come gestisco le pagine 404 sulle rotte localizzate?">

Lo copre il passo 14. `validatePrefix` ti dice se il segmento di locale dell'URL è una locale dichiarata, così `/xx/about` ritorna un vero 404 invece di essere indicizzato come una pagina duplicata.

</Question>

<Question title="Devo mettere la locale nell'URL?">

No. `routing.mode` accetta `"prefix-no-default"` (il predefinito), `"prefix-all"`, `"no-prefix"` e `"search-params"`, e `routing.domains` associa ogni locale al proprio dominio. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>

<Question title="Come costruisco un selettore di locale che mantiene la rotta corrente?">

Lo mostra il passo 9. `useLocale` espone la locale attiva, le locale disponibili e un setter che persiste la scelta, mentre `getLocalizedUrl` riscrive il percorso corrente nella lingua di destinazione così l'utente resta sulla stessa pagina.

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
