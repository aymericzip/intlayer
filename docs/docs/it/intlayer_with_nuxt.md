---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Come tradurre la tua app Nuxt e Vue – guida i18n 2026
description: Scopri come rendere il tuo sito Nuxt e Vue multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
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
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: Aggiornamento LocaleSwitcher, SEO, metadata
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione cronologia
---

# Traduci il tuo sito Nuxt e Vue usando Intlayer | Internazionalizzazione (i18n)

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadata**, rotte e contenuti.
- **Garantire il supporto a TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e lo switch dinamico della locale.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Nuxt

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Come tradurre la tua app Nuxt e Vue usando Intlayer? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Codice" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-nuxt-4-template) su GitHub.

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bunx intlayer init
```

- **intlayer**

  Il pacchetto core che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **vue-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Vue. Fornisce i composables per i componenti Vue.

- **nuxt-intlayer**
  Il modulo Nuxt che integra Intlayer con le applicazioni Nuxt. Fornisce una configurazione automatica, middleware per il rilevamento della locale, gestione dei cookie e reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Nuxt

Aggiungi il modulo intlayer alla tua configurazione Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... La tua configurazione Nuxt esistente
  modules: ["nuxt-intlayer"],
});
```

> Il modulo `nuxt-intlayer` gestisce automaticamente l'integrazione di Intlayer con Nuxt. Configura la costruzione delle dichiarazioni di contenuto, monitora i file in modalità sviluppo, fornisce middleware per il rilevamento della locale e gestisce il routing localizzato.

### Passo 4: Dichiara il tuo contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
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

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passo 5: Utilizza Intlayer nel Tuo Codice

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

### (Opzionale) Passo 6: Cambiare la lingua del tuo contenuto

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

### (Opzionale) Passo 6b: Crea un Layout con Navigazione

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

### (Opzionale) Passo 7: Aggiungi il Routing localizzato alla tua applicazione

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

### (Opzionale) Passo 8: Creare un componente Link localizzato

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

### (Opzionale) Passo 9: Gestire Metadata e SEO

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      it: "Chi Siamo - La Mia Azienda",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Scopri di più sulla nostra azienda e sulla nostra missione",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Chi Siamo",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Chi Siamo - La Mia Azienda",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      it: "Scopri di più sulla nostra azienda e sulla nostra missione",
    }),
    title: t({
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
      it: "Chi Siamo",
    }),
  },
};

module.exports = aboutPageContent;
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
