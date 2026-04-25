---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vue i18n - Come tradurre un'applicazione Astro + Vue nel 2026
description: Scopri come aggiungere l'internazionalizzazione (i18n) al tuo sito Astro + Vue con Intlayer. Segui questa guida per rendere il tuo sito multilingue.
keywords:
  - internazionalizzazione
  - documentazione
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentazione iniziale per Astro + Vue"
---

# Tradurre il tuo sito Astro + Vue con Intlayer | Internazionalizzazione (i18n)

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer puoi:

- **Gestire le traduzioni facilmente**: Utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare metadati, percorsi e contenuti dinamicamente**.
- **Garantire il supporto TypeScript**: Con tipi autogenerati per migliorare l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzioni avanzate**: Come il rilevamento dinamico della lingua e il cambio di lingua.

---

## Guida passo dopo passo per configurare Intlayer in Astro + Vue

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
npm install intlayer astro-intlayer vue vue-intlayer @astrojs/vue

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

bun x intlayer init
```

- **intlayer**
  Il pacchetto core che fornisce strumenti i18n per la gestione della configurazione, le traduzioni, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **astro-intlayer**
  Include il plugin di integrazione Astro per collegare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti degli URL.

- **vue**
  Il pacchetto core di Vue.

- **vue-intlayer**
  Pacchetto per integrare Intlayer in applicazioni Vue. Fornisce `installIntlayer` oltre ai composable `useIntlayer` e `useLocale` per l'internazionalizzazione in Vue.

- **@astrojs/vue**
  Integrazione ufficiale di Astro che consente l'uso di islands di componenti Vue.

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

Aggiungi il plugin `intlayer` e l'integrazione Vue alla tua configurazione Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), vue()],
});
```

> Il plugin di integrazione `intlayer()` viene utilizzato per integrare Intlayer con Astro. Garantisce la generazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Astro e fornisce alias per ottimizzare le prestazioni.

> L'integrazione `vue()` consente di utilizzare islands di componenti Vue tramite `client:only="vue"`.

### Passaggio 4: Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      it: "Ciao mondo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni di contenuto possono be definite in qualsiasi punto della tua applicazione, purché siano incluse nel `contentDir` (per impostazione predefinita `./src`) e corrispondano all'estensione dei file di dichiarazione del contenuto (per impostazione predefinita `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per ulteriori informazioni, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passaggio 5: Utilizzare il contenuto in Astro

Puoi consumare i dizionari direttamente nei tuoi file `.astro` utilizzando gli helper core esportati da `intlayer`. Dovresti anche aggiungere metadati SEO (come hreflang e link canonici) a ogni pagina e introdurre una Vue island per i contenuti interattivi lato client.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import VueIsland from "../../components/vue/VueIsland.vue";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Link Canonico: informa i motori di ricerca sulla versione principale di questa pagina -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: informa Google su tutte le versioni localizzate -->
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

    <!-- x-default: opzione di fallback quando la lingua non corrisponde a quella dell'utente -->
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
    <!-- La Vue island renderizza tutti i contenuti interattivi, incluso il selettore di lingua -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **Nota sulla configurazione del routing:**
> La struttura delle directory che utilizzi dipende dall'impostazione `middleware.routing` in `intlayer.config.ts`:
>
> - **`prefix-no-default` (predefinito):** mantiene la lingua predefinita alla radice (senza prefisso) e aggiunge prefissi alle altre. Usa `[...locale]` per catturare tutti i casi.
> - **`prefix-all`:** tutti gli URL hanno il prefisso della lingua. Puoi usare lo standard `[locale]` se non hai bisogno di gestire la radice separatamente.
> - **`search-param` o `no-prefix`:** non sono necessarie directory per la lingua. La lingua viene gestita tramite parametri di query o cookie.

### Passaggio 6: Crea un componente Vue Island

Crea un componente island che racchiuda la tua applicazione Vue e riceva la lingua rilevata dal server. Devi registrare il plugin Intlayer nella tua istanza Vue chiamando `installIntlayer` prima di utilizzare qualsiasi composable.

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;
if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const { title } = useIntlayer("app");
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- Il selettore di lingua è reso direttamente all'interno del template dell'island -->
    <div class="locale-switcher">
      <span class="switcher-label">Cambia lingua:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          :disabled="localeItem === currentLocale"
          @click="setLocale(localeItem)"
        >
          <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
          <span class="ls-current-name">{{
            getLocaleName(localeItem, currentLocale)
          }}</span>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
```

> La prop `locale` viene passata dalla pagina Astro (rilevamento lato server) e utilizzata per inizializzare `installIntlayer`, impostando la lingua iniziale per tutti i composable all'interno dell'albero.

### Passaggio 7: Aggiungi un selettore di lingua

La funzionalità di cambio lingua è integrata direttamente nel template della Vue island (vedi passaggio 6 sopra). Utilizza il composable `useLocale` di `vue-intlayer` e naviga verso l'URL localizzato quando un utente seleziona una nuova lingua:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// Riutilizza la stessa logica di prop/setup app dal passaggio 6...

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    // Naviga verso l'URL localizzato al cambio di lingua
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});
</script>

<template>
  <div class="locale-switcher">
    <span class="switcher-label">Cambia lingua:</span>
    <div class="locale-buttons">
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem"
        :class="['locale-btn', { active: localeItem === currentLocale }]"
        :disabled="localeItem === currentLocale"
        @click="setLocale(localeItem)"
      >
        <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
        <span class="ls-current-name">{{
          getLocaleName(localeItem, currentLocale)
        }}</span>
        <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
```

> **Nota sulla persistenza:**
> L'uso di `onLocaleChange` per reindirizzare tramite `window.location.href` assicura che il nuovo URL linguistico venga visitato, consentendo al middleware Intlayer di impostare il cookie della lingua e di ricordare la preferenza dell'utente nelle visite future.

### Passaggio 8: Sitemap e Robots.txt

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
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
