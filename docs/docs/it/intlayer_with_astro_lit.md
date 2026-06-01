---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: Astro + Lit i18n - Guida completa per tradurre Astro + Lit
description: La migliore soluzione per dimensione del bundle, SEO, prestazioni & manutenibilità. Rendi il tuo Astro and Lit sito web multilingue nel 2026, traduzione LLM, Agent Skills & MCP.
keywords:
  - internazionalizzazione
  - documentazione
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentazione iniziale per Astro + Lit"
---

# Tradurre il tuo sito Astro + Lit con Intlayer | Internazionalizzazione (i18n)

<Tabs defaultTab="code">
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Indice

<TOC/>

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `astro-i18n` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

**Copertura Astro completa**

Intlayer è ottimizzato per funzionare perfettamente con Astro offrendo **routing multilingue**, **mappa del sito** e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

**Dimensione del bundle**

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

**Manutenibilità**

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

**Agente IA**

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[capacità dell'agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

**Automazione**

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando il LLM di tua scelta al costo del tuo provider di intelligenza artificiale. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) per aiutare a **tradurre in background**.

**Prestazione**

La connessione di enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti in fase di compilazione.

**Scalabilità con nessuno sviluppatore**

Più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** per aiutarti gestisci i tuoi contenuti multilingue in **tempo reale**, semplificando la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

---

## Guida passo dopo passo per configurare Intlayer in Astro + Lit

Controlla il [template dell'applicazione](https://github.com/aymericzip/intlayer-astro-template) su GitHub.

### Passaggio 1: Installare le dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  Il pacchetto core che fornisce strumenti i18n per la gestione della configurazione, le traduzioni, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **astro-intlayer**
  Include il plugin di integrazione Astro per collegare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti degli URL.

- **lit**
  Il pacchetto core di Lit per la creazione di Web Components veloci e leggeri.

- **lit-intlayer**
  Pacchetto per integrare Intlayer in applicazioni Lit. Fornisce hook basati su `ReactiveController` (`useIntlayer`, `useLocale`, ecc.) che istruiscono automaticamente il LitElement a rieseguire il rendering quando la lingua cambia.

- **@astrojs/lit**
  Integrazione ufficiale di Astro che consente l'uso di Lit custom elements all'interno delle pagine Astro.

### Passaggio 2: Configura il tuo progetto

Crea un file di configurazione per definire le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti del middleware, nomi dei cookie, posizione ed estensioni delle dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passaggio 3: Integra Intlayer nella tua configurazione Astro

Aggiungi il plugin `intlayer` e l'integrazione Lit alla tua configurazione Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Il plugin di integrazione `intlayer()` viene utilizzato per integrare Intlayer con Astro. Garantisce la generazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Astro e fornisce alias per ottimizzare le prestazioni.

> L'integrazione `lit()` consente di utilizzare Lit custom elements all'interno delle pagine Astro.

### Passaggio 4: Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      it: "Ciao mondo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      it: "Benvenuti nel mio sito Astro + Lit multilingue.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Le dichiarazioni di contenuto possono be definite in qualsiasi punto della tua applicazione, purché siano incluse nel `contentDir` (per impostazione predefinita `./src`) e corrispondano all'estensione dei file di dichiarazione del contenuto (per impostazione predefinita `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per ulteriori informazioni, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passaggio 5: Utilizzare il contenuto in Astro

Puoi consumare i dizionari direttamente nei tuoi file `.astro` utilizzando gli helper core esportati da `intlayer`. Dovresti anche aggiungere metadati SEO (come hreflang e link canonici) a ogni pagina. I Lit custom element vengono importati tramite uno `<script>` client e inseriti nel body.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Link Canonico -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Link Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Lit Custom Element - riceve la lingua rilevata dal server come proprietà -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> Se desideri utilizzare il tuo contenuto in un attributo `stringa`, come `alt`, `title`, `href`, `aria-label`, ecc., puoi utilizzare il valore della funzione, come:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Nota sulla configurazione del routing:**
> La struttura delle directory che utilizzi dipende dall'impostazione `middleware.routing` in `intlayer.config.ts`:
>
> - **`prefix-no-default` (predefinito):** mantiene la lingua predefinita alla radice (senza prefisso) e aggiunge prefissi alle altre. Usa `[...locale]` per catturare tutti i casi.
> - **`prefix-all`:** tutti gli URL hanno il prefisso della lingua. Puoi usare lo standard `[locale]` se non hai bisogno di gestire la radice separatamente.
> - **`search-param` o `no-prefix`:** non sono necessarie directory per la lingua. La lingua viene gestita tramite parametri di query o cookie.

### Passaggio 6: Crea un componente Lit Custom Element

Crea un Lit custom element. Richiama `installIntlayer` nel `connectedCallback` utilizzando l'attributo `locale` basato sul server per inizializzare il singleton di traduzione lato client.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Inizializza con la lingua rilevata dal server
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Il selettore di lingua è reso all'interno del LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Cambia lingua:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> L'attributo `locale` viene passato dalla pagina Astro (rilevamento lato server) e utilizzato per inizializzare `installIntlayer` nel `connectedCallback`, che imposta la lingua iniziale per tutti gli hook `ReactiveController` all'interno dell'elemento.

> `useIntlayer` viene registrato come `ReactiveController`. Richiede automaticamente il re-rendering dell'elemento quando la lingua cambia, quindi non è necessaria alcuna logica di sottoscrizione aggiuntiva.

### Passaggio 7: Aggiungi un selettore di lingua

La funzionalità di cambio lingua è integrata direttamente all'interno del metodo `render()` del Lit custom element (vedi passaggio 6 sopra). Utilizza `useLocale` di `lit-intlayer` e naviga verso l'URL localizzato quando un utente seleziona una nuova lingua:

```typescript fileName="src/components/lit/LitDemo.ts"
// All'interno della classe LitElement, dopo la configurazione di useLocale nel passaggio 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Naviga verso l'URL localizzato al cambio di lingua
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Cambia lingua:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Nota sulla reattività di Lit:**
> `useLocale` restituisce un `ReactiveController`. Quando viene chiamato `setLocale`, il controller richiede automaticamente un re-rendering, aggiornando lo stato del pulsante attivo senza manipolazione manuale del DOM.

> **Nota sulla persistenza:**
> L'uso di `onLocaleChange` per reindirizzare tramite `window.location.href` assicura che il nuovo URL linguistico venga visitato, consentendo al middleware Intlayer di impostare il cookie della lingua e di ricordare la preferenza dell'utente nelle visite future.

### Passaggio 8: Sitemap e Robots.txt

Intlayer offre utilità per creare dinamicamente la tua sitemap localizzata e i file robots.txt.

#### Sitemap

Intlayer include un generatore di sitemap integrato per aiutarti a creare facilmente una sitemap per la tua applicazione. Gestisce i percorsi localizzati e aggiunge i metadati necessari per i motori di ricerca.

> La sitemap generata da Intlayer supporta lo spazio dei nomi `xhtml:link` (Hreflang XML Extensions). A differenza dei generatori di sitemap predefiniti che elencano solo URL grezzi, Intlayer crea automaticamente i collegamenti bidirezionali richiesti tra tutte le versioni linguistiche di una pagina (ad esempio, `/about`, `/about?lang=fr` e `/about?lang=es`). Ciò garantisce che i motori di ricerca indicizzino e servano correttamente la versione linguistica corretta al pubblico giusto.

Crea `src/pages/sitemap.xml.ts` per generare una sitemap che includa tutti i tuoi percorsi localizzati.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Crea `src/pages/robots.txt.ts` per controllare la scansione dei motori di ricerca.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Configurazione TypeScript

Intlayer utilizza l'aumento dei moduli (module augmentation) per sfruttare TypeScript, rendendo la tua base di codice più robusta. Se utilizzi la sintassi dei decoratori, assicura di abilitare `experimentalDecorators` nelle opzioni del compilatore.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Richiesto per il supporto dei decoratori in Lit
  },
  include: [
    // ... la tua configurazione TypeScript esistente
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò evita di salvarli nel tuo repository Git.

Per farlo, aggiungi le seguenti istruzioni al tuo file `.gitignore`:

```bash
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprima inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori informazioni sull'utilizzo dell'estensione, consulta la [documentazione dell'estensione VS Code](https://intlayer.org/doc/vs-code-extension).

---

### (Opzionale) Passaggio 15: Estrarre il contenuto dei tuoi componenti

Se hai una base di codice esistente, trasformare migliaia di file può richiedere molto tempo.

Per facilitare questo processo, Intlayer propone un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) / [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per trasformare i tuoi componenti ed estrarre il contenuto.

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
     * Indica se i componenti devono essere salvati dopo essere stati trasformati. In questo modo, il compilatore può essere eseguito solo una volta per trasformare l'app e poi rimosso.
     */
    saveComponents: false,

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

Aggiorna il tuo `vite.config.ts` per includere il plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Aggiunge il plugin del compilatore
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

### Approfondisci

Se vuoi saperne di più, puoi anche implementare il [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o utilizzare il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per esternalizzare i tuoi contenuti.
