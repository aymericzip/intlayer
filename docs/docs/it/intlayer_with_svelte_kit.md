---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: Come tradurre la tua app SvelteKit – guida i18n 2026
description: Scopri come rendere il tuo sito SvelteKit multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo utilizzando il Server-Side Rendering (SSR).
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiungi comando init
  - version: 7.1.10
    date: 2025-11-20
    changes: Inizializzazione della cronologia
---

# Traduci il tuo sito SvelteKit usando Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Funziona perfettamente con le capacità di Server-Side Rendering (SSR) di **SvelteKit**.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati.
- **Sfruttare l'SSR di SvelteKit** per un'internazionalizzazione SEO-friendly.

---

## Guida passo-passo per configurare Intlayer in un'applicazione SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Per iniziare, crea un nuovo progetto SvelteKit. Ecco la struttura finale che realizzeremo:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Passo 1: Installare le Dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Il pacchetto core per l'internazionalizzazione (i18n).
- **svelte-intlayer**: Fornisce context provider e store per Svelte/SvelteKit.
- **vite-intlayer**: Il plugin Vite per integrare le dichiarazioni di contenuto nel processo di build.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione nella root del tuo progetto:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Passo 3: Integrare Intlayer nella Configurazione di Vite

Aggiorna il tuo `vite.config.ts` per includere il plugin Intlayer. Questo plugin gestisce la transpilation dei tuoi file di contenuto.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // l'ordine è importante, Intlayer deve essere posizionato prima di SvelteKit
});
```

### Passo 4: Dichiarare il Tuo Contenuto

Crea i tuoi file di dichiarazione del contenuto in qualsiasi punto della cartella `src` (ad esempio, `src/lib/content` o accanto ai tuoi componenti). Questi file definiscono il contenuto traducibile per la tua applicazione utilizzando la funzione `t()` per ogni locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Passo 5: Utilizzare Intlayer nei Tuoi Componenti

Ora puoi usare la funzione `useIntlayer` in qualsiasi componente Svelte. Essa restituisce uno store reattivo che si aggiorna automaticamente quando cambia la locale. La funzione rispetterà automaticamente la locale corrente (sia durante SSR che nella navigazione lato client).

> **Nota:** `useIntlayer` restituisce uno store Svelte, quindi devi usare il prefisso `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Come tradurre la tua app SvelteKit – guida i18n 2025
> description: Scopri come rendere il tuo sito SvelteKit multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo utilizzando il Server-Side Rendering (SSR).
> keywords:

- Internazionalizzazione
- Documentazione
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Inizializzazione della cronologia

---

# Traduci il tuo sito SvelteKit usando Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Funziona perfettamente con le capacità di Server-Side Rendering (SSR) di **SvelteKit**.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati.
- **Sfruttare l'SSR di SvelteKit** per un'internazionalizzazione SEO-friendly.

---

## Guida passo-passo per configurare Intlayer in un'applicazione SvelteKit

Per iniziare, crea un nuovo progetto SvelteKit. Ecco la struttura finale che realizzeremo:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Passo 1: Installare le Dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Il pacchetto core per l'internazionalizzazione (i18n).
- **svelte-intlayer**: Fornisce context provider e store per Svelte/SvelteKit.
- **vite-intlayer**: Il plugin Vite per integrare le dichiarazioni di contenuto nel processo di build.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione nella root del tuo progetto:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Passo 3: Integrare Intlayer nella Configurazione di Vite

Aggiorna il tuo `vite.config.ts` per includere il plugin Intlayer. Questo plugin gestisce la transpilation dei tuoi file di contenuto.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // l'ordine è importante, Intlayer deve essere posizionato prima di SvelteKit
});
```

### Passo 4: Dichiarare il Tuo Contenuto

Crea i tuoi file di dichiarazione del contenuto in qualsiasi punto della cartella `src` (ad esempio, `src/lib/content` o accanto ai tuoi componenti). Questi file definiscono il contenuto traducibile per la tua applicazione utilizzando la funzione `t()` per ogni locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Passo 5: Utilizzare Intlayer nei Tuoi Componenti

per accedere al suo valore reattivo (ad esempio, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" corrisponde alla chiave definita nel Passo 4
  const content = useIntlayer("hero-section");
</script>

<!-- Renderizza il contenuto come contenuto semplice  -->
<h1>{$content.title}</h1>
<!-- Per rendere il contenuto modificabile usando l'editor -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Per rendere il contenuto come stringa -->
<div aria-label={$content.title.value}></div>
```

### (Opzionale) Passo 6: Configurare il routing

I passaggi seguenti mostrano come configurare il routing basato sulla locale in SvelteKit. Questo permette agli URL di includere il prefisso della locale (es. `/en/about`, `/fr/about`) per migliorare la SEO e l'esperienza utente.

```bash
.
└─── src
    ├── app.d.ts                  # Definisce il tipo di locale
    ├── hooks.server.ts           # Gestisce il routing della locale
    ├── lib
    │   └── getLocale.ts          # Controlla la locale dall'header, cookie
    ├── params
    │   └── locale.ts             # Definisce il parametro locale
    └── routes
        ├── [[locale=locale]]     # Raggruppa in un gruppo di route per impostare la locale
        │   ├── +layout.svelte    # Layout locale per la route
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Layout radice per i font e gli stili globali
```

### Passo 7: Gestire il Rilevamento della Locale lato Server (Hooks)

In SvelteKit, il server deve conoscere la locale dell'utente per renderizzare il contenuto corretto durante il SSR. Usiamo `hooks.server.ts` per rilevare la locale dall'URL o dai cookie.

Crea o modifica `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Controlla se il percorso corrente inizia già con una locale (es. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Se NON è presente una locale nell'URL (es. l'utente visita "/"), reindirizzalo
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Reindirizzamento temporaneo
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Quindi, crea un helper per ottenere la locale dell'utente dall'evento della richiesta:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Ottieni la locale dell'utente dall'evento di richiesta.
 * Questa funzione è utilizzata nel hook `handle` in `src/hooks.server.ts`.
 *
 * Prima tenta di ottenere la locale dallo storage di Intlayer (cookie o header personalizzati).
 * Se la locale non viene trovata, ricorre alla negoziazione "Accept-Language" del browser.
 *
 * @param event - L'evento di richiesta da SvelteKit
 * @returns La locale dell'utente
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Prova a ottenere la locale dallo storage di Intlayer (cookie o header)
  const storedLocale = getLocaleFromStorage({
    // Accesso ai cookie di SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Accesso alle intestazioni di SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Ripiego sulla negoziazione "Accept-Language" del browser
  const negotiatorHeaders: Record<string, string> = {};

  // Conversione dell'oggetto Headers di SvelteKit in un semplice Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Controlla la locale dall'intestazione `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Restituisce la locale di default se non viene trovata una corrispondenza
  return defaultLocale;
};
```

> `getLocaleFromStorage` controllerà la locale dall'header o dal cookie a seconda della tua configurazione. Vedi [Configurazione](https://intlayer.org/doc/configuration) per maggiori dettagli.

> La funzione `localeDetector` gestirà l'header `Accept-Language` e restituirà la corrispondenza migliore.

Se la locale non è configurata, vogliamo restituire un errore 404. Per semplificare, possiamo creare una funzione `match` per verificare se la locale è valida:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Nota:** Assicurati che il tuo file `src/app.d.ts` includa la definizione della locale:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Per il file `+layout.svelte`, possiamo rimuovere tutto, mantenendo solo contenuti statici, non correlati a i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Successivamente, crea una nuova pagina e layout sotto il gruppo `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Usa il tipo generico Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inizializza Intlayer con la locale dalla route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Usa il dizionario dei contenuti del layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Usa il dizionario dei contenuti della home
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Opzionale) Passo 8: Link Internazionalizzati

Per la SEO, si consiglia di anteporre alle tue rotte la locale (ad esempio, `/en/about`, `/fr/about`). Questo componente antepone automaticamente qualsiasi link con la locale corrente.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Helper per anteporre l'URL con la locale corrente
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Se usi `goto` di SvelteKit, puoi usare la stessa logica con `getLocalizedUrl` per navigare all'URL localizzato:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Naviga verso /en/about o /fr/about a seconda della locale
```

### (Opzionale) Passo 9: Selettore di Lingua

Per permettere agli utenti di cambiare lingua, aggiorna l'URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Imposterà la locale nello store e attiverà onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Opzionale) Passo 10: Aggiungere un proxy backend

Per aggiungere un proxy backend alla tua applicazione SvelteKit, puoi usare la funzione `intlayerProxy` fornita dal plugin `vite-intlayer`. Questo plugin rileverà automaticamente la migliore locale per l'utente basandosi sull'URL, i cookie e le preferenze della lingua del browser.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Opzionale) Passo 11: Configurare l'editor / CMS di intlayer

Per configurare l'editor di intlayer, devi seguire la [documentazione dell'editor di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Per configurare il CMS di intlayer, devi seguire la [documentazione del CMS di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

Per poter visualizzare il selettore dell'editor intlayer, dovrai utilizzare la sintassi del componente nel tuo contenuto intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderizza il contenuto come contenuto semplice -->
  <h1>{$content.title}</h1>

  <!-- Renderizza il contenuto come componente (richiesto dall'editor) -->
  <svelte:component this={$content.component} />
</div>
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer.

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

### Approfondimenti

Per poter visualizzare il selettore dell'editor intlayer, dovrai utilizzare la sintassi del componente nel tuo contenuto intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderizza il contenuto come contenuto semplice  -->
  <h1>{$content.title}</h1>

  <!-- Renderizza il contenuto come componente (richiesto dall'editor) -->
  <svelte:component this={$content.component} />
</div>
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer.

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

### Vai oltre

- **Visual Editor**: integra il [Visual Editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) per modificare le traduzioni direttamente dall'interfaccia utente.
- **CMS**: esternalizza la gestione dei tuoi contenuti utilizzando il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
