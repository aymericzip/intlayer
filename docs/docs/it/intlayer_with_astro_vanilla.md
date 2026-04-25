---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - Come tradurre un'applicazione Astro + Vanilla JS nel 2026
description: Scopri come aggiungere l'internazionalizzazione (i18n) al tuo sito Astro + Vanilla JS con Intlayer. Segui questa guida per rendere il tuo sito multilingue.
keywords:
  - internazionalizzazione
  - documentazione
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentazione iniziale per Astro + Vanilla JS"
---

# Tradurre il tuo sito Astro + Vanilla JS con Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer puoi:

- **Gestire le traduzioni facilmente**: Utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare metadati, percorsi e contenuti dinamicamente**.
- **Garantire il supporto TypeScript**: Con tipi autogenerati per migliorare l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzioni avanzate**: Come il rilevamento dinamico della lingua e il cambio di lingua.

---

## Guida passo dopo passo per configurare Intlayer in Astro + Vanilla JS

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Controlla il [template dell'applicazione](https://github.com/aymericzip/intlayer-astro-template) su GitHub.

### Passaggio 1: Installare le dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  Il pacchetto core che fornisce strumenti i18n per la gestione della configurazione, le traduzioni, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **astro-intlayer**
  Include il plugin di integrazione Astro per collegare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti degli URL.

- **vanilla-intlayer**
  Un pacchetto per integrare Intlayer in applicazioni Vanilla JavaScript / TypeScript. Fornisce un singleton Pub/Sub (`IntlayerClient`) e helper basati su chiamate (`useIntlayer`, `useLocale`, ecc.), consentendo a qualsiasi parte dei tuoi tag `<script>` Astro di rispondere ai cambi di lingua senza la necessità di un framework UI.

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

Aggiungi il plugin `intlayer` alla tua configurazione Astro. Per Vanilla JS, non è richiesta alcuna integrazione aggiuntiva del framework UI.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Il plugin di integrazione `intlayer()` viene utilizzato per integrare Intlayer con Astro. Garantisce la generazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Astro e fornisce alias per ottimizzare le prestazioni.

### Passaggio 4: Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      it: "Ciao mondo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      it: "Benvenuti nel mio sito Astro multilingue.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      it: "Cambia lingua:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni di contenuto possono essere definite in qualsiasi punto della tua applicazione, purché siano incluse nel `contentDir` (per impostazione predefinita `./src`) e corrispondano all'estensione dei file di dichiarazione del contenuto (per impostazione predefinita `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per ulteriori informazioni, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passaggio 5: Utilizzare il contenuto in Astro

Con Vanilla JS, tutto il rendering lato server avviene direttamente nei file `.astro` utilizzando `getIntlayer`. Successivamente, un blocco `<script>` inizializza `vanilla-intlayer` sul client per abilitare il cambio di lingua.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **Nota sulla configurazione del routing:**
> La struttura delle directory che utilizzi dipende dall'impostazione `middleware.routing` in `intlayer.config.ts`:
>
> - **`prefix-no-default` (predefinito):** mantiene la lingua predefinita alla radice (senza prefisso) e aggiunge prefissi alle altre. Usa `[...locale]` per catturare tutti i casi.
> - **`prefix-all`:** tutti gli URL hanno il prefisso della lingua. Puoi usare lo standard `[locale]` se non hai bisogno di gestire la radice separatamente.
> - **`search-param` o `no-prefix`:** non sono necessarie directory per la lingua. La lingua viene gestita tramite parametri di query o cookie.

### Passaggio 6: Aggiungere il selettore di lingua

In Astro con Vanilla JS, il selettore di lingua viene renderizzato sul server come normali collegamenti e idratato sul client tramite un blocco `<script>`. Quando un utente clicca su un link della lingua, `vanilla-intlayer` imposta il cookie della lingua tramite `setLocale` prima di navigare verso l'URL localizzato.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- Includi il markup lato server dal passaggio 5 sopra -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Inizializza Intlayer sul client con la lingua presa dal percorso attuale
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Associa gli eventi click ai link del selettore di lingua
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Nota sulla persistenza:**
> `installIntlayer` inizializza il singleton Intlayer con la lingua definita dal server. `useLocale` con `onLocaleChange` garantisce che il cookie della lingua sia impostato prima della navigazione tramite il middleware, in modo che la preferenza della lingua dell'utente venga ricordata nelle visite future.

> **Nota sul miglioramento progressivo (Progressive Enhancement):**
> I link nel selettore di lingua funzioneranno come tag `<a>` standard anche senza JavaScript. Quando JavaScript è disponibile, le chiamate a `setLocale` aggiorneranno il cookie prima della navigazione, assicurando che il middleware esegua il reindirizzamento corretto.

### Passaggio 7: Sitemap e Robots.txt

Intlayer offre utilità per creare dinamicamente la tua sitemap localizzata e i file robots.txt.

#### Sitemap

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

Intlayer utilizza l'aumento dei moduli (module augmentation) per sfruttare TypeScript, rendendo la tua base di codice più robusta.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... la tua configurazione TypeScript esistente
  "include": [
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

### Approfondisci

Se vuoi saperne di più, puoi anche implementare il [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o utilizzare il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per esternalizzare i tuoi contenuti.
