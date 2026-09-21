---
createdAt: 2026-09-09
updatedAt: 2026-09-21
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "Utilizzo del middleware e degli hook di remix-intlayer"
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

Combinato con **Intlayer** e il pacchetto **`remix-intlayer`**, un middleware di locale più gli stessi hook `useIntlayer` / `useDictionary` / `useLocale` di `react-intlayer`, associati al contesto di richiesta di Remix, ottieni un sistema completo di internazionalizzazione che offre sicurezza in fase di compilazione, traduzioni automatizzate con IA, rendering lato server a zero overhead e routing fluido delle locali.

## Sommario

<TOC/>

## Perché scegliere Intlayer rispetto alle alternative?

Rispetto alle soluzioni tradizionali come `i18next` o caricatori di traduzioni personalizzati, Intlayer offre un'esperienza di sviluppo integrata e ottimizzata per l'architettura web moderna:

<AccordionGroup>
<Accordion header="Copertura completa di Remix 3 e degli standard web">

Intlayer è progettato per funzionare in modo nativo con gli standard web (`Request`, `Response`, `Headers` e `URL`). `remix-intlayer` si integra nel router Fetch di Remix 3 come un middleware leggero, estraendo la locale dai percorsi URL, dai cookie o dalle intestazioni `Accept-Language` ed esponendola al resto della richiesta, handler, viste e componenti `remix/ui`, senza doverla passare manualmente né vincolarti a un runtime specifico.

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

Installa `intlayer`, `remix-intlayer` e `remix` (versione 3) utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Motore principale di internazionalizzazione per la gestione della configurazione, la dichiarazione dei dizionari (`t()`, `Dictionary`), gli strumenti CLI e l'interprete a runtime.
- **`remix-intlayer`**: L'integrazione con Remix 3: il middleware router `intlayer()` che risolve la locale di ogni richiesta, e gli hook `useIntlayer`, `useDictionary` e `useLocale` che la leggono in qualunque punto successivo.
- **`remix`**: Il pacchetto unificato del framework Remix 3 che esporta `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` e `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurare Intlayer">

### Architettura

In questa architettura, il middleware `intlayer()` di `remix-intlayer` è registrato in `createRouter()` prima del middleware `render()`. Rimuove il prefisso della locale prima della corrispondenza del router, in modo che le route siano dichiarate una sola volta in `src/routes.ts` senza un segmento `:locale`, ed esegue il resto della richiesta all'interno di uno scope `AsyncLocalStorage`, consentendo a `useIntlayer` / `useLocale` di leggere la locale senza argomenti nei gestori di route e nelle viste `remix/ui`. Le dichiarazioni di contenuto sono posizionate accanto alle tue viste in `src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configurazione

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
<Step number={5} title="Aggiungere il middleware Intlayer">

Remix 3 fornisce una pipeline di middleware componibile tramite `createRouter({ middleware: [...] })`.

`remix-intlayer` fornisce il middleware `intlayer()`. Per ogni richiesta in entrata risolve la locale utilizzando:

1. L'URL, in ogni modalità di routing tranne `no-prefix`: il prefisso del percorso (es. `/it` o `/fr`) o il parametro di ricerca `?locale=`.
2. La locale memorizzata dal client: il cookie di archiviazione (`INTLAYER_LOCALE`) o l'intestazione personalizzata (`x-intlayer-locale`).
3. La negoziazione standard di `Accept-Language`, ricorrendo alla tua `defaultLocale` configurata.

Il risultato viene memorizzato nel contesto di richiesta di Remix come `context.intlayer` (o `context.get(Intlayer)`), con `locale`, `defaultLocale` e `availableLocales`. Il middleware esegue quindi il resto della richiesta all'interno di un ambito `AsyncLocalStorage` associato a tale contesto, consentendo agli hook del pacchetto di leggere la locale senza argomenti, sia nei gestori di route che nelle viste e nei componenti `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Ovunque a valle del middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` o `useIntlayer("faq", { item: 2 })` sovrascrivono la locale della richiesta per una singola chiamata, e `useDictionary(homeContent)` legge un dizionario importato anziché una chiave. Al di fuori di una richiesta, gli hook ricorrono alla locale predefinita.

> Il middleware prepara anche i dizionari Intlayer all'avvio del server, in modo che un `intlayer build` mancante non lasci il registro vuoto.

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

Inizia con un guscio condiviso `Document` che imposta gli attributi `<html lang="..." dir="...">` dalla locale risolta dal middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

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

Poi crea la pagina home. Legge il dizionario localizzato con `useIntlayer` e mostra un selettore di lingua:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
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

> JSX in Remix non è React: `class` si scrive così com'è (`className` è comunque accettato) e i nuovi rendering vengono attivati esplicitamente con `handle.update()`. I valori interpolati vengono sottoposti a escape automaticamente. Gli hook Intlayer sono semplici funzioni che leggono l'ambito della richiesta, quindi possono essere chiamati sia dalla funzione di setup che da quella di rendering.

</Step>
<Step number={8} title="Collegare il router e il server">

Aggiungi il middleware `render()` di `remix/middleware/render` accanto al middleware di Intlayer. Installa `context.render(node, init)` su ogni richiesta, trasmettendo l'albero JSX in una `Response` HTML (anteponendo `<!DOCTYPE html>` e impostando l'header `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` accetta un `ResponseInit` opzionale come secondo argomento, ad es. `context.render(<NotFoundPage />, { status: 404 })`. La locale risolta rimane accessibile dall'handler come `context.intlayer.locale`, ad esempio per costruire una risposta `Response.json`.

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
