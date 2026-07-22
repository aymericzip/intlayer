---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Nuxt multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Aggiornamento LocaleSwitcher, SEO, metadata"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione cronologia"
author: aymericzip
---

# Traduci il tuo sito Nuxt e Vue usando Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `@nuxtjs/i18n` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Copertura completa Nuxt">

Intlayer è ottimizzato per funzionare perfettamente con Nuxt offrendo **routing multilingue**, **middleware per il rilevamento locale**, **mappa del sito** e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[capacità dell'agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

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

## Guida passo-passo per configurare Intlayer in un'applicazione Nuxt

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Come tradurre la tua app Nuxt e Vue usando Intlayer? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-nuxt-4-template) su GitHub.

<Steps>

<Step number={1} title="Installa le dipendenze">

Installa i pacchetti necessari usando npm:

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
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Il pacchetto core che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **vue-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Vue. Fornisce i composables per i componenti Vue.

- **nuxt-intlayer**
  Il modulo Nuxt che integra Intlayer con le applicazioni Nuxt. Fornisce una configurazione automatica, middleware per il rilevamento della locale, gestione dei cookie e reindirizzamento degli URL.

</Step>

<Step number={2} title="Configurazione del tuo progetto">

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={3} title="Integra Intlayer nella tua configurazione Nuxt">

Aggiungi il modulo intlayer alla tua configurazione Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... La tua configurazione Nuxt esistente
  modules: ["nuxt-intlayer"],
});
```

> Il modulo `nuxt-intlayer` gestisce automaticamente l'integrazione di Intlayer con Nuxt. Configura la costruzione delle dichiarazioni di contenuto, monitora i file in modalità sviluppo, fornisce middleware per il rilevamento della locale e gestisce il routing localizzato.

</Step>

<Step number={4} title="Dichiara il tuo contenuto">

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      it: "Scopri la homepage multilingue della tua app Nuxt alimentata da Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={5} title="Utilizza Intlayer nel Tuo Codice">

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione Nuxt utilizzando il composable `useIntlayer`:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Accesso ai Contenuti in Intlayer

Intlayer offre diverse API per accedere ai tuoi contenuti:

- **Sintassi basata su componenti** (consigliata):
  Usa la sintassi `<myContent />`, o `<Component :is="myContent" />` per rendere il contenuto come un Nodo Intlayer. Questo si integra perfettamente con il [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) e il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

- **Sintassi basata su stringhe**:
  Usa `{{ myContent }}` per rendere il contenuto come testo semplice, senza supporto per il Visual Editor.

- **Sintassi HTML grezzo**:
  Usa `<div v-html="myContent" />` per rendere il contenuto come HTML grezzo, senza supporto per il Visual Editor.

- **Sintassi di destrutturazione**:
  Il composable `useIntlayer` restituisce un Proxy con il contenuto. Questo proxy può essere destrutturato per accedere al contenuto mantenendo la reattività.
  - Usa `const content = useIntlayer("myContent");` e `{{ content.myContent }}` / `<content.myContent />`.
  - Oppure usa `const { myContent } = useIntlayer("myContent");` e `{{ myContent}}` / `<myContent/>` per destrutturare il contenuto.

</Step>

<Step number={6} title="Cambiare la lingua del tuo contenuto" isOptional={true}>

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dal composable `useLocale`. Questa funzione ti permette di impostare la locale dell'applicazione e aggiornare di conseguenza il contenuto.

Crea un componente per cambiare lingua usando `NuxtLink`. **Usare link invece di pulsanti per il cambio di locale è una best practice per la SEO e la scoperta delle pagine**, poiché permette ai motori di ricerca di scansionare e indicizzare tutte le versioni localizzate delle tue pagine:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt importa automaticamente useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> L'uso di `NuxtLink` con attributi `href` corretti (tramite `getLocalizedUrl`) garantisce che i motori di ricerca possano scoprire tutte le varianti linguistiche delle tue pagine. Questo è preferibile rispetto al cambio di lingua basato solo su JavaScript, che i crawler dei motori di ricerca potrebbero non seguire.

Quindi, configura il tuo `app.vue` per utilizzare i layout:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Aggiungi il Routing localizzato alla tua applicazione" isOptional={true}>

Nuxt gestisce automaticamente il routing localizzato quando si utilizza il modulo `nuxt-intlayer`. Questo crea rotte per ogni lingua automaticamente in base alla struttura della directory delle tue pagine.

Esempio:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Per creare pagine localizzate, crea semplicemente i tuoi file Vue nella directory `pages/`. Ecco due esempi di pagine:

**Pagina Home (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Pagina About (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Usa .raw per accedere alla stringa primitiva
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Usa .raw per accedere alla stringa primitiva
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Nota: `useHead` è importato automaticamente in Nuxt. Puoi accedere ai valori del contenuto usando `.value` (reattivo) o `.raw` (stringa primitiva) a seconda delle tue esigenze.

Il modulo `nuxt-intlayer` farà automaticamente:

- Rilevare la locale preferita dall'utente
- Gestire il cambio di locale tramite URL
- Impostare l'attributo `<html lang="">` appropriato
- Gestire i cookie della locale
- Reindirizzare gli utenti all'URL localizzato corretto

</Step>

<Step number={8} title="Creare un componente Link localizzato" isOptional={true}>

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Links` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni, cosa essenziale per la **SEO e la scoperta delle pagine**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
// Importa il composable per la gestione della lingua corrente
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Calcola il percorso finale
const finalPath = computed(() => {
  // 1. Verifica se il link è esterno
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Se esterno, restituisci così com'è (NuxtLink gestisce la generazione del tag <a>)
  if (isExternal) return props.href;

  // 3. Se è interno, localizza l'URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Quindi usa questo componente in tutta la tua applicazione:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

> Utilizzando `NuxtLink` con percorsi localizzati, si garantisce che:
>
> - I motori di ricerca possano eseguire la scansione e indicizzare tutte le versioni linguistiche delle tue pagine
> - Gli utenti possano condividere direttamente URL localizzati
> - La cronologia del browser funzioni correttamente con URL prefissati dalla locale

</Step>

<Step number={9} title="Gestire Metadata e SEO" isOptional={true}>

Nuxt offre eccellenti funzionalità SEO tramite il composable `useHead` (auto-importato). Puoi utilizzare Intlayer per gestire i metadata localizzati usando l'accessore `.raw` o `.value` per ottenere il valore stringa primitivo:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead è auto-importato in Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Usa .raw per accedere al valore stringa primitivo
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Usa .raw per accedere alla stringa primitiva
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> In alternativa, puoi usare la funzione `import { getIntlayer } from "intlayer"` per ottenere il contenuto senza la reattività di Vue.

> **Accesso ai valori del contenuto:**
>
> - Usa `.raw` per ottenere il valore stringa primitivo (non reattivo)
> - Usa `.value` per ottenere il valore reattivo
> - Usa la sintassi componente `<content.key />` per il supporto all'Editor Visuale

Crea la dichiarazione di contenuto corrispondente:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      it: "Scopri di più sulla nostra azienda e sulla nostra missione",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      it: "Chi Siamo",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "it": "Chi Siamo - La Mia Azienda"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión",
        "it": "Scopri di più sulla nostra azienda e sulla nostra missione"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "it": "Chi Siamo"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Crea un Layout con Navigazione" isOptional={true}>

I layout di Nuxt ti permettono di definire una struttura comune per le tue pagine. Crea un layout di default che includa il selettore di lingua e la navigazione:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

Il componente `Links` (mostrato di seguito) garantisce che i link di navigazione interna siano automaticamente localizzati.

</Step>

</Steps>

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Intlayer VS Code Extension** ufficiale.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione della Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Vai oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
