---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Come tradurre la tua app Vite e Svelte – guida i18n 2025
description: Scopri come rendere il tuo sito web Vite e Svelte multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: Aggiornamento doc
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione cronologia
---

# Traduci il tuo sito web Vite e Svelte usando Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della locale.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vite e Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-vite-svelte-template) su GitHub.

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  Il pacchetto core che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la transpilation e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **svelte-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Svelte. Fornisce context provider e hook per l'internazionalizzazione in Svelte.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la locale preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per impostare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre localizzazioni
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Vite

Aggiungi il plugin intlayer nella tua configurazione.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Il plugin Vite `intlayer()` viene utilizzato per integrare Intlayer con Vite. Garantisce la generazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiara il tuo contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Contenuto dell'applicazione con traduzioni
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Contenuto dell'applicazione con traduzioni
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione non appena sono incluse nella directory `contentDir` (di default, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passo 5: Utilizza Intlayer nel tuo codice

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Renderizza il contenuto come contenuto semplice  -->
<h1>{$content.title}</h1>
<!-- Per rendere il contenuto modificabile usando l'editor -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Per rendere il contenuto come stringa -->
<div aria-label={$content.title.value}></div>
```

### (Opzionale) Passo 6: Cambia la lingua del tuo contenuto

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Ottieni informazioni sulla locale e la funzione setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Gestisci il cambio di locale
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Opzionale) Passo 7: Renderizza Markdown

Intlayer supporta il rendering di contenuti Markdown direttamente nella tua applicazione Svelte. Per default, il Markdown è trattato come testo semplice. Per convertire il Markdown in HTML ricco, puoi integrare `@humanspeak/svelte-markdown` o un altro parser Markdown.

> Per vedere come dichiarare contenuti markdown usando il pacchetto `intlayer`, consulta la [documentazione markdown](https://github.com/aymericzip/intlayer/tree/main/docs/docs/it/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // rendi il contenuto markdown come stringa
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Puoi anche accedere ai dati del front-matter del tuo markdown usando la proprietà `content.markdownContent.metadata.xxx`.

### (Opzionale) Passo 8: Configura l'editor / CMS di intlayer

Per configurare l'editor di intlayer, devi seguire la [documentazione dell'editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Per configurare il CMS di intlayer, devi seguire la [documentazione del CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

In parallelo, nella tua applicazione Svelte, devi aggiungere la seguente riga in un layout, o alla radice della tua applicazione:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Opzionale) Passo 7: Aggiungi il routing localizzato alla tua applicazione

Per gestire il routing localizzato nella tua applicazione Svelte, puoi usare `svelte-spa-router` insieme a `localeFlatMap` di Intlayer per generare le rotte per ogni locale.

Per prima cosa, installa `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Quindi, crea un file `Router.svelte` per definire le tue rotte:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Aggiorna il tuo `main.ts` per montare il componente `Router` invece di `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Infine, aggiorna il tuo `App.svelte` per ricevere la prop `locale` e utilizzarla con `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

// Usa useIntlayer per ottenere i contenuti localizzati per l'app
$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... resto della tua app ... -->
</main>
```

#### Configura il Routing lato Server (Opzionale)

In parallelo, puoi anche utilizzare `intlayerProxy` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la locale corrente basandosi sull'URL e imposterà il cookie della locale appropriata. Se non viene specificata alcuna locale, il plugin determinerà la locale più appropriata basandosi sulle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna locale, effettuerà un reindirizzamento alla locale predefinita.

> Nota che per utilizzare `intlayerProxy` in produzione, è necessario spostare il pacchetto `vite-intlayer` da `devDependencies` a `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Opzionale) Passo 8: Cambiare l'URL quando la lingua cambia

Per permettere agli utenti di cambiare lingua e aggiornare di conseguenza l'URL, puoi creare un componente `LocaleSwitcher`. Questo componente utilizzerà `getLocalizedUrl` da `intlayer` e `push` da `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Ottieni le informazioni sulla lingua
const { locale, availableLocales } = useLocale();

// Gestisci il cambio di lingua
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo permette di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni nel tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Intlayer VS Code Extension** ufficiale.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione della Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Vai oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
