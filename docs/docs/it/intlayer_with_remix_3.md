---
createdAt: 2026-09-09
updatedAt: 2026-09-11
title: "Remix 3 i18n - Guida completa per tradurre la tua applicazione"
description: "Dimentica i18next. La guida 2026 per creare un'applicazione Remix 3 multilingue (i18n). Traduci con agenti IA e ottimizza le dimensioni del bundle, la SEO e le prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Standard Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentazione iniziale per Remix 3"
author: aymericzip
---

# Traduci il tuo sito web Remix 3 usando Intlayer | Internazionalizzazione (i18n)

Questa guida illustra come integrare **Intlayer** per un'internazionalizzazione fluida nelle applicazioni **Remix 3** con routing basato sulla lingua, dichiarazioni di contenuti con sicurezza dei tipi, componenti JSX renderizzati lato server e supporto multi-runtime su Node.js, Bun, Deno e Cloudflare Workers.

## Cos'è Remix 3?

**Remix 3** rappresenta una fondamentale evoluzione architetturale verso un **framework web componibile e indipendente dal runtime, costruito interamente su standard web**. Anziché essere vincolato a bundler specifici o API proprietarie del server, Remix 3 è distribuito come pacchetti componibili a scopo singolo:

- **`remix/fetch-router`** (o `remix/router`): Routing leggero e conforme agli standard basato sulle Fetch API (`Request` e `Response`).
- **`remix/ui`**: Un modello di componenti JSX (`jsxImportSource: "remix/ui"`). Un componente è una funzione di setup che restituisce una funzione di render, simile a React ma con lo stato gestito in semplici closure JavaScript.
- **`remix/middleware/render`**: Installa `context.render(<Page />)` su ogni richiesta, trasmettendo l'albero JSX in una `Response` HTML.
- **`remix/node-fetch-server`**: Adattatori server per Node.js, con supporto nativo per Bun, Deno e runtime edge.
- **`remix/cookie`**: Parsing e serializzazione di cookie crittograficamente sicuri.

In combinazione con **Intlayer**, ottieni un sistema completo di internazionalizzazione che garantisce sicurezza in fase di compilazione, traduzioni automatizzate con IA, rendering lato server a zero overhead e routing fluido per locale.

## Sommario

<TOC/>

## Perché scegliere Intlayer rispetto alle alternative?

Rispetto alle soluzioni tradizionali come `i18next` o caricatori di traduzioni personalizzati, Intlayer offre un'esperienza di sviluppo integrata e ottimizzata per l'architettura web moderna:

<AccordionGroup>
<Accordion header="Copertura completa di Remix 3 e degli standard web">

Intlayer è progettato per funzionare nativamente con gli standard web (`Request`, `Response`, `Headers` e `URL`). Si integra perfettamente nel router Fetch di Remix 3 tramite un middleware leggero, estraendo i valori di lingua dai percorsi URL, dai cookie o dagli header `Accept-Language` senza vincolarti a un runtime specifico.

</Accordion>
<Accordion header="Dichiarazioni di contenuto con sicurezza dei tipi">

Dì addio alle chiavi JSON non tipizzate e agli errori di runtime dovuti a chiavi mancanti. Intlayer applica i controlli di TypeScript su tutte le lingue dichiarate, avvisandoti in fase di compilazione se una traduzione manca o non è valida.

</Accordion>
<Accordion header="Zero overhead di bundle sul server">

Remix 3 esegue il rendering dei componenti JSX sul server e trasmette l'HTML al client. Solo il testo risolto per la lingua richiesta viene inviato nel flusso di output. Non sono necessari bundle di idratazione client né pesanti cataloghi di traduzione, a meno che un componente non sia esplicitamente contrassegnato come `clientEntry`.

</Accordion>
<Accordion header="Pronto per agenti IA e automazione">

Intlayer posiziona le dichiarazioni di contenuto (`.content.ts`) accanto alla logica delle route, riducendo il contesto di token necessario per i Large Language Models (LLM). I comandi CLI integrati come `intlayer fill` e `intlayer test` ti consentono di automatizzare le traduzioni nelle pipeline di CI/CD al costo diretto del tuo fornitore di IA.

</Accordion>
<Accordion header="Editor visivo e integrazione con CMS">

Oltre ai flussi di lavoro incentrati sul codice, Intlayer fornisce un [Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted e un [CMS Remoto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), consentendo a redattori e traduttori di aggiornare i contenuti senza dover ridistribuire l'applicazione.

</Accordion>
</AccordionGroup>

## Guida passo dopo passo

<Tabs defaultTab="code">
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Template Remix 3 Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta il [Modello di Applicazione](https://github.com/aymericzip/intlayer-remix-3-template) su GitHub.

<Steps>
<Step number={1} title="Installare le dipendenze">

Installa `intlayer` e `remix` (versione 3) utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Motore principale di internazionalizzazione per la gestione della configurazione, la dichiarazione dei dizionari (`t()`, `Dictionary`), gli strumenti CLI e l'interprete a runtime.
- **`remix`**: Il pacchetto unificato del framework Remix 3 che esporta `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` e `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurare Intlayer">

Crea un file `intlayer.config.ts` nella radice del progetto per dichiarare le lingue supportate e le impostazioni di internazionalizzazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Per ulteriori opzioni di configurazione, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>
<Step number={3} title="Dichiarare i contenuti multilingue">

Dichiara i tuoi contenuti localizzati in un file `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      it: "Benvenuto su Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      it: "Un'applicazione componibile basata su standard web con i18n nativa.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      it: "Cambia lingua:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer supporta anche i formati JSON, YAML e CommonJS. Vedi la [Documentazione sulla Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>
<Step number={4} title="Compilare i dizionari Intlayer">

Compila le definizioni dei dizionari per generare i tipi TypeScript e i registri di runtime:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Ciò compila i tuoi contenuti nella directory degli artefatti `.intlayer`, offrendo completamento automatico completo in TypeScript e un rapido recupero dei dizionari.

</Step>
<Step number={5} title="Implementare il middleware Intlayer">

Remix 3 fornisce una pipeline di middleware componibile tramite `createRouter({ middleware: [...] })`.

Crea un middleware Intlayer che risolve la lingua di ciascuna richiesta in entrata seguendo:

1. Il prefisso del percorso URL tramite `getLocaleFromPath` di Intlayer (ad es. `/it` o `/fr`).
2. L'utility `getLocale` di Intlayer, che negozia automaticamente attraverso i cookie di memoria (`INTLAYER_LOCALE`), header personalizzati (`x-intlayer-locale`), header standard `Accept-Language` e la tua `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Chiave di contesto con sicurezza dei tipi per recuperare la lingua risolta dal RequestContext di Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer per Remix 3.
 *
 * Risolve la lingua della richiesta secondo la seguente priorità:
 * 1. Prefisso del percorso URL (es. `/it/...`) tramite `getLocaleFromPath`
 * 2. Negoziazione di header e cookie tramite `getLocale` (cookie, header personalizzato, Accept-Language, fallback defaultLocale)
 *
 * Associa la lingua risolta al RequestContext di Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Rilevamento percorso (/it/about -> "it", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Assegna la lingua risolta al contesto di richiesta di Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Assegna la lingua risolta al contesto di richiesta di Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Definire route con sicurezza dei tipi">

Definisci le route della tua applicazione utilizzando `route()` da `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Route della lingua predefinita
  home: "/",

  // Route localizzata con segmento dinamico :locale
  localizedHome: "/:locale",
});
```

L'utilizzo di `route()` fornisce una generazione di URL type-safe in tutta l'applicazione:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "it" }); // "/it"
```

</Step>
<Step number={7} title="Renderizzare pagine localizzate con JSX">

Remix 3 esegue il rendering dell'interfaccia utente con componenti JSX provenienti da `remix/ui`. Un componente è una **funzione di setup** che riceve un `Handle` e restituisce una **funzione di render**. Il setup viene eseguito una sola volta per istanza, il render viene eseguito a ogni aggiornamento e le props vengono lette tramite `handle.props`.

Inizia con una shell condivisa `Document` che imposta gli attributi `<html lang="..." dir="...">` a partire dalla lingua risolta:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, type Locale } from "intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  locale: Locale;
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { locale, title, children } = handle.props;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Crea quindi la pagina iniziale. Estrae il dizionario localizzato con `getIntlayer` e mostra un selettore di lingua:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { Handle } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

type HomePageProps = {
  locale: Locale;
};

export const HomePage = (handle: Handle<HomePageProps>) => () => {
  const { locale } = handle.props;
  const home = getIntlayer("home", locale);

  return (
    <Document locale={locale} title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          {locales.map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <a
                key={targetLocale}
                href={getLocalizedPath(routes.home.href(), targetLocale)}
                class={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleName(targetLocale, locale)}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Il JSX di Remix non è React: non ci sono hook, `class` viene scritto così com'è (è accettato anche `className`) e i re-render vengono attivati esplicitamente con `handle.update()`. I valori interpolati vengono sottoposti automaticamente a escaping.

</Step>
<Step number={8} title="Collegare il router e il server">

Aggiungi il middleware `render()` di `remix/middleware/render` accanto al middleware di Intlayer. Installa `context.render(node, init)` su ogni richiesta, trasmettendo l'albero JSX in una `Response` HTML (anteponendo `<!DOCTYPE html>` e impostando l'header `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Inizializzare il router con i middleware Intlayer + render
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Mappare i gestori di route
router.map(routes, {
  actions: {
    // Route per la lingua predefinita
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // Route localizzata
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render` accetta un `ResponseInit` opzionale come secondo argomento, ad es. `context.render(<NotFoundPage locale={locale} />, { status: 404 })`.

Infine, esponi il router tramite un gestore `fetch` standard. Lo stesso router funziona su Node.js, Bun, Deno e Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Verificare e completare automaticamente le traduzioni">

Intlayer include una CLI per rilevare le traduzioni mancanti e completarle automaticamente tramite intelligenza artificiale:

```bash packageManager="npm"
# Verifica le traduzioni mancanti
npx intlayer test

# Completa le traduzioni mancanti con l'IA
npx intlayer fill
```

```bash packageManager="pnpm"
# Verifica le traduzioni mancanti
pnpm dlx intlayer test

# Completa le traduzioni mancanti con l'IA
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Verifica le traduzioni mancanti
yarn dlx intlayer test

# Completa le traduzioni mancanti con l'IA
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Verifica le traduzioni mancanti
bun x intlayer test

# Completa le traduzioni mancanti con l'IA
bun x intlayer fill
```

</Step>
</Steps>

## Configurazione TypeScript

Punta JSX al runtime `remix/ui` e assicurati che il tuo `tsconfig.json` includa i tipi generati in `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` è ciò che permette a `<HomePage />` di risolversi con il `createElement` di Remix anziché con quello di React.

## Conclusione

Con Remix 3 e Intlayer, disponi di uno stack leggero, completamente tipizzato e multipiattaforma, fedele agli standard web aperti. La tua applicazione può scalare con facilità da semplici pagine marketing localizzate a servizi edge distribuiti globalmente.
