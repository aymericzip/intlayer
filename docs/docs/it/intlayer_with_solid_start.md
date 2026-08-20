---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione SolidStart multilingue (i18n). Routing delle impostazioni locali renderizzato lato server, hreflang, sitemap e traduzione assistita da IA."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Storia iniziale"
author: aymericzip
---

# Traduci il tuo sito web SolidStart usando Intlayer | Internazionalizzazione (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="La migliore soluzione i18n per Vite e Solid? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Indice

<TOC/>

Questa guida copre un'applicazione SolidStart **renderizzata lato server**: il rilevamento della locale avviene sulla richiesta, le pagine vengono renderizzate sul server nella lingua corretta e i segnali `<html lang>`, `hreflang` e sitemap di cui i motori di ricerca hanno bisogno vengono emessi lato server.

## Perché Intlayer rispetto alle alternative?

Rispetto alle principali soluzioni come `@solid-primitives/i18n` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Copertura completa di Solid">

Intlayer è ottimizzato per funzionare perfettamente con Solid offrendo **scoping del contenuto a livello di componente**, **traduzioni reattive** e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del tuo bundle e delle tue pagine fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

Definire l'ambito del contenuto della tua applicazione **facilita la manutenzione** per le applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase del contenuto. Inoltre, Intlayer è **completamente tipizzato** per garantire la precisione del tuo contenuto.

</Accordion>

<Accordion header="Agente AI">

Collocare il contenuto **riduce il contesto necessario** per i modelli di linguaggio di grandi dimensioni (LLM). Intlayer è inoltre fornito con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza di sviluppo (DX) ancora più fluida per gli agenti AI.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando l'LLM di tua scelta al costo del tuo fornitore AI. Intlayer offre anche un **compilatore** per automatizzare l'estrazione del contenuto, oltre a una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Prestazioni">

Connettere enormi file JSON ai componenti può causare problemi di prestazioni e reattività. Intlayer ottimizza il caricamento del contenuto al momento della build.

</Accordion>

<Accordion header="Scalabilità con non sviluppatori">

Molto più di una semplice soluzione i18n, Intlayer fornisce un **[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted** e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire il tuo contenuto multilingue in **tempo reale**, rendendo la collaborazione con traduttori, copywriter e altri membri del team semplice e fluida. Il contenuto può essere archiviato localmente e/o da remoto.

</Accordion>
</AccordionGroup>

---

## Guida passo dopo passo per configurare Intlayer in un'applicazione SolidStart

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

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente AI.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), transpilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **solid-intlayer**

  Il pacchetto che integra Intlayer con l'applicazione Solid. Fornisce provider di contesto e hook per l'internazionalizzazione in Solid.

- **vite-intlayer**

  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al gestore di routing delle impostazioni locali che rileva la locale preferita dall'utente, gestisce i cookie e gestisce il reindirizzamento degli URL.

> `vite-intlayer` è una questione lato server in questo contesto, non solo di build time: fornisce il gestore di richieste eseguito dal server Nitro di SolidStart. Mantenerlo in `dependencies` è l'opzione predefinita sicura — puoi spostarlo in `devDependencies` solo se distribuisci la cartella `.output` creata, nella quale Nitro include direttamente il gestore.

</Step>

<Step number={2} title="Configurazione del tuo progetto">

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre impostazioni locali
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Con `prefix-no-default`, la locale predefinita viene servita da URL senza prefisso:

```plaintext
/            /about          → Inglese  (locale predefinita)
/fr          /fr/about       → Francese
/es          /es/about       → Spagnolo
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi di cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer nella tua configurazione Vite">

Aggiungi il plugin Intlayer alla tua configurazione:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Il plugin Vite `intlayer()` crea i tuoi file di dichiarazione del contenuto, li osserva in modalità di sviluppo e definisce le variabili di ambiente Intlayer all'interno dell'applicazione. Fornisce inoltre alias che ottimizzano le prestazioni.

### Il routing delle impostazioni locali viene fornito con il plugin

SolidStart viene eseguito su [Nitro](https://nitro.build), e `intlayer()` registra il suo gestore di routing delle impostazioni locali direttamente nella pipeline del server Nitro (tramite l'opzione `routing.enableProxy`, `true` di default). Nient'altro da collegare: su un server compilato, ogni richiesta viene ispezionata prima che raggiunga il router, e

- la locale viene letta dal prefisso URL, quindi dal cookie `INTLAYER_LOCALE`, quindi dall'intestazione `Accept-Language`;
- un URL senza prefisso viene reindirizzato alla sua controparte localizzata quando la locale risolta non è quella predefinita (`/` → `/fr`);
- un URL con prefisso ridondante viene reindirizzato alla sua forma canonica (`/en/about` → `/about`);
- il cookie della locale viene riscritto nella risposta.

</Step>

<Step number={4} title="Dichiara il tuo contenuto">

Crea e gestisci le tue dichiarazioni di contenuto per archiviare le traduzioni:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Particolarità di SolidStart**: ogni file `.ts` / `.tsx` sotto `src/routes` diventa una rotta, e un file `.content.ts` ha un'esportazione predefinita, quindi verrebbe interpretato come una pagina. Mantieni le dichiarazioni di contenuto delle tue **pagine** all'esterno della cartella delle rotte (`src/contents/` funziona benissimo). Il contenuto dei **componenti** può rimanere co-localizzato, poiché `src/components` non viene scansionato dal router del file system.

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione a condizione che siano incluse nella cartella `contentDir` (di default, `./src`), e corrispondano all'estensione del file di dichiarazione di contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Per maggiori dettagli, fai riferimento alla [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={5} title="Aggiungi il routing localizzato">

L'obiettivo di questo passaggio è fornire a ciascuna lingua il proprio URL, che è quello che i motori di ricerca indicizzano.

Sposta le tue pagine sotto un **segmento dinamico opzionale**. Nel router basato su file system di SolidStart, `[[locale]]` viene compilato nel pattern di percorso `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← layout che convalida il segmento
  [[locale]]/
    index.tsx             → /        e /fr        e /es
    about.tsx             → /about   e /fr/about  e /es/about
  [...404].tsx            → catch-all per qualsiasi altra cosa
```

L'unico compito del file di layout è limitare il segmento a una locale configurata:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` espande `:locale?` in due pattern — uno con il segmento e uno senza — e li prova per specificità decrescente. `matchFilters` è ciò che fa la differenza tra una configurazione funzionante e una confusa:

| URL         | Senza `matchFilters`                                 | Con `matchFilters`                             |
| ----------- | ---------------------------------------------------- | ---------------------------------------------- |
| `/fr/about` | Pagina informazioni in francese                      | Pagina informazioni in francese                |
| `/about`    | Pagina informazioni (vince il segmento statico)      | Pagina informazioni                            |
| `/unknown`  | **Home page**, silenziosamente, con `locale=unknown` | Nessuna corrispondenza → passa al 404 generale |

> Preferisci `[locale]` (obbligatorio) a `[[locale]]` se usi la modalità di routing `'prefix-all'`, ed elimina completamente il segmento per `'no-prefix'` o `'search-params'`.

</Step>

<Step number={6} title="Fornire le impostazioni locali alla tua applicazione">

L'URL è l'unica fonte di verità per la locale: il middleware ha già reindirizzato la richiesta al suo percorso localizzato, quindi leggere il percorso nel layout principale mantiene in accordo il rendering lato server e l'idratazione lato client, e fa in modo che ogni navigazione lato client aggiorni la locale gratuitamente.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Il server renderizza <html> in entry-server.tsx; le navigazioni lato client
  // tra le impostazioni locali devono aggiornare gli attributi da sole.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` reagisce alla sua prop `locale`, quindi passare la chiamata all'accessor `locale()` all'interno di JSX è sufficiente — Solid lo compila in un getter e l'intero albero viene nuovamente renderizzato nella nuova lingua quando l'URL cambia.

</Step>

<Step number={7} title="Imposta gli attributi HTML lang e dir sul server">

L'elemento `<html>` viene renderizzato da `entry-server.tsx`, all'esterno del `Router`. Leggi la locale dall'URL della richiesta:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

I crawler ora ricevono la lingua corretta fin dal primo byte:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Utilizza Intlayer nelle tue pagine">

Accedi ai tuoi dizionari di contenuto in tutta la tua applicazione:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> In Solid, `useIntlayer` restituisce contenuto reattivo (ad es. `content`). Puoi accedere direttamente alle sue proprietà.

> Se desideri utilizzare il tuo contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., puoi utilizzare il valore della funzione, come:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Per saperne di più sull'hook `useIntlayer`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useIntlayer.md).

I nodi di contenuto non si limitano a semplici traduzioni. Un contatore con pluralizzazione, ad esempio:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` seleziona la categoria tramite `Intl.PluralRules` per la locale attiva, in modo che le lingue con più di due forme plurali funzionino senza alcun codice aggiuntivo.

</Step>

<Step number={9} title="Crea un componente Link localizzato">

Crea un componente `Link` personalizzato che aggiunge automaticamente il prefisso della lingua corrente agli URL interni:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Scrivere `href="/about"` una volta produce ora `/about`, `/fr/about` o `/es/about` a seconda della locale attiva — nessun prefisso manuale in nessuna parte delle tue pagine.

</Step>

<Step number={10} title="Crea un componente per il cambio di lingua">

Renderizza il selettore come **ancore reali** piuttosto che come uno `<select>`: ogni lingua della pagina corrente diventa un link indicizzabile che può essere aperto in una nuova scheda, cosa che un controllo basato unicamente su JavaScript non può offrire.

`getPathWithoutLocale` rimuove il segmento della locale dal percorso corrente, e `getLocalizedUrl` lo ricostruisce per la locale di destinazione, in modo che i link seguano la tua modalità di routing senza dover codificare nulla in modo rigido. La navigazione è ciò che modifica la locale renderizzata — la rotta `[[locale]]` la ricava dall'URL — mentre `setLocale` memorizza la scelta nel cookie `INTLAYER_LOCALE` in modo che una successiva visita a un URL privo di locale si risolva nella stessa lingua.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Percorso canonico (senza locale) della pagina attualmente visualizzata
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Solo corrispondenza esatta, in modo che il link della locale predefinita non sia contrassegnato
              // come attivo su ogni pagina
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Assicura che il pulsante "indietro" del browser torni alla pagina precedente
              replace
            >
              {/* Lingua nella propria locale - es. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> In Solid, `locale` da `useLocale` è un **accessor di segnale**. Usa `locale()` (con parentesi) per leggere il suo valore corrente in modo reattivo.
>
> `getLocaleName(localeItem)` renderizza ciascuna lingua nella propria lingua — `English / Français / Español`. Passa un secondo argomento per tradurre i nomi nella lingua attualmente visualizzata: `getLocaleName(localeItem, locale())` restituisce `English / French / Spanish` in inglese, `anglais / français / espagnol` in francese.
>
> `<A>` imposta già `aria-current="page"` sul link che corrisponde all'URL corrente, quindi non c'è nulla da aggiungere per quello. `replace` viene letto dall'attributo renderizzato dal router: sostituisce la voce di cronologia invece di aggiungerne una nuova, in modo che il pulsante "indietro" del browser torni alla pagina visitata prima del cambio anziché alla stessa pagina nella lingua precedente.
>
> `dir` e `hreflang` su ciascun link mantengono i nomi delle lingue da destra a sinistra orientati correttamente e indicano alle tecnologie assistive e ai crawler a quale lingua punta ciascun link.
>
> Per saperne di più sull'hook `useLocale`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Emetti link canonici e hreflang" isOptional={true}>

Le annotazioni `hreflang` dicono ai motori di ricerca che `/about`, `/fr/about` e `/es/about` sono la stessa pagina in lingue diverse. `getMultilingualUrls` le ricava dal percorso canonico (senza locale), seguendo la tua modalità di routing, in modo che nulla sia codificato in modo rigido:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL assoluto della pagina in fase di rendering. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Renderizzalo nell'intestazione del documento, dove l'URL della richiesta è disponibile:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … all'interno di <head>, accanto agli altri tag meta:
<AlternateLinks url={url} />;
```

`GET /fr/about` restituisce quindi:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Nota su `@solidjs/meta`**: al momento della scrittura, `<Title>` e `<Meta>` di `@solidjs/meta` vengono applicati sul client dopo l'idratazione ma **non** vengono emessi nel `<head>` renderizzato lato server in SolidStart v2. Fino a quando ciò non verrà risolto a monte, renderizza i tag che i crawler devono vedere senza JavaScript — `canonical`, `hreflang` e, se necessario, `title` / `description` — direttamente in `entry-server.tsx`, come mostrato sopra.

</Step>

<Step number={12} title="Gestisci le pagine non trovate" isOptional={true}>

Una rotta wildcard (splat) alla radice di `src/routes` cattura qualsiasi percorso che il segmento locale non ha trovato — compresi i prefissi di locale non validi rifiutati da `matchFilters`. Poiché la locale proviene comunque dall'URL attraverso il layout di radice, la pagina 404 viene visualizzata nella lingua del visitatore:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Richiesta         | Risultato                                 |
| ----------------- | ----------------------------------------- |
| `/xx`             | `404` — `xx` non è una locale configurata |
| `/nonexistent`    | `404` nella locale predefinita            |
| `/fr/nonexistent` | `404` in francese (`Page introuvable`)    |

</Step>

<Step number={13} title="Genera una sitemap multilingue" isOptional={true}>

Il generatore di sitemap di Intlayer espande ogni percorso in una voce per locale e collega le alternative `xhtml:link` tra loro, in modo che la rotta debba solo elencare i percorsi canonici e privi di locale.

> A differenza dei generatori di base che emettono solo URL semplici, Intlayer collega link bidirezionali tra ogni variante localizzata di ciascuna pagina, aiutando i motori di ricerca a mettere in relazione gli URL localizzati e a servire quello corretto al pubblico giusto.

SolidStart trasforma un file che esporta un metodo HTTP in una rotta API e rimuove l'estensione `.ts` dal percorso — in questo modo `src/routes/sitemap.xml.ts` viene servito su `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
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
};
```

```xml fileName="output di GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Le rotte API non supportano parametri opzionali, quindi mantieni questo file alla radice di `src/routes`, all'esterno del segmento `[[locale]]`. La sitemap contiene già ogni locale.

Puoi creare un file `robots.txt` allo stesso modo con `getMultilingualUrls`, in modo che le voci `Disallow` coprano ogni ortografia localizzata di un percorso sensibile:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Recupera le impostazioni locali nelle tue funzioni server" isOptional={true}>

Potresti voler accedere alla locale corrente dall'interno di una funzione server o di una rotta API.

In una configurazione basata su prefisso come questa, **l'URL fa fede**: `getLocaleFromPath` legge il prefisso dall'URL della richiesta. `getLocale` è il ripiego per le richieste che non trasportano alcun prefisso di locale — ispeziona il cookie `INTLAYER_LOCALE`, quindi l'intestazione `x-intlayer-locale`, quindi negozia `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Ottieni il cookie dalla richiesta (predefinito: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Ottieni l'intestazione dalla richiesta (predefinito: 'x-intlayer-locale'),
      // ripiegando sulla negoziazione Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Recupera del contenuto all'esterno di un componente utilizzando getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Non affidarti unicamente a `getLocale` qui: il cookie della locale viene scritto solo quando un visitatore cambia attivamente lingua, quindi una prima visita a `/fr/...` si risolverebbe nella locale predefinita.

</Step>

<Step number={15} title="Estrai il contenuto dei tuoi componenti" isOptional={true}>

Se hai una codebase esistente, trasformare migliaia di file può richiedere molto tempo.

Per facilitare questo processo, Intlayer propone un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) / [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per trasformare i tuoi componenti ed estrarne il contenuto.

Per configurarlo, puoi aggiungere una sezione `compiler` nel tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto della tua configurazione
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
     * - Se `false`, il compilatore inietterà la chiamata alla funzione `useIntlayer()` nel codice solo nell'output di build e manterrà intatta la codebase di base. La trasformazione verrà eseguita solo in memoria.
     */
    saveComponents: false,

    /**
     * Prefisso chiave del dizionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value="Comando di estrazione">

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

> Sposta successivamente i file di contenuto generati delle tue pagine fuori da `src/routes`, per il motivo spiegato al passaggio 5.

 </Tab>
 <Tab value="Compilatore Babel">

> Dalla v9, `intlayerCompiler` è incluso nel plugin `intlayer`. Quindi non è necessario aggiungerlo manualmente.

Aggiorna il tuo `vite.config.ts` per includere il plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Aggiunge il plugin del compilatore
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

<Step number={16} title="Configura TypeScript">

Intlayer utilizza l'aumento dei moduli per sfruttare i vantaggi di TypeScript e rendere la tua codebase più solida.

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... le tue configurazioni esistenti
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

Le chiavi del dizionario e i percorsi del contenuto vengono ora controllati in fase di compilazione:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Verifica della configurazione

Compila e avvia il server, quindi verifica che queste richieste si comportino come previsto:

```bash
npm run build
node .output/server/index.mjs
```

| Richiesta                               | Risposta prevista                            |
| --------------------------------------- | -------------------------------------------- |
| `GET /`                                 | `200` — Inglese                              |
| `GET /` con `Accept-Language: fr`       | `302` → `/fr`                                |
| `GET /` con cookie `INTLAYER_LOCALE=es` | `302` → `/es`                                |
| `GET /fr`                               | `200` — Francese, `<html lang="fr">`         |
| `GET /fr/about`                         | `200` — Pagina informazioni in francese      |
| `GET /en/about`                         | `302` → `/about` (reindirizzamento canonico) |
| `GET /xx`                               | `404`                                        |
| `GET /fr/nonexistent`                   | `404` in francese                            |
| `GET /sitemap.xml`                      | `200` — Sitemap XML multilingue              |

Le righe che renderizzano una pagina si comportano in modo identico sotto `vite dev`. Le tre righe di reindirizzamento si applicano solo a un server compilato a meno che tu non registri il gestore come middleware personalmente — vedi passaggio 3.

> Esegui il server dev su Node (`vite dev`) invece che su Bun (`bun --bun vite dev`): l'SSR di SolidStart al momento fallisce nel runtime Bun con `Expected a Response object, but received 'NodeResponse'`. Questo non ha alcuna relazione con Intlayer — si riproduce sul template di base — e riguarda solo il server dev, non `vite build`.

---

## Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò consente di evitare di committarli nel repository Git.

A tale scopo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

## Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

---

## Per andare oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare il tuo contenuto utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Riferimenti alla documentazione

- [Documentazione Intlayer](https://intlayer.org)
- [Documentazione SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md)
- [Dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
