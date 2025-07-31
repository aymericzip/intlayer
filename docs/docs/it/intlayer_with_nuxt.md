---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Traduci il tuo sito Nuxt e Vue (i18n)
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
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-template
---

# Iniziare con l'internazionalizzazione (i18n) usando Intlayer e Nuxt

Consulta il [Template Applicazione](https://github.com/aymericzip/intlayer-nuxt-template) su GitHub.

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Garantire il supporto a TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

---

## Guida passo passo per configurare Intlayer in un'applicazione Nuxt

### Passo 1: Installare le dipendenze

Installa i pacchetti necessari usando npm:

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

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **vue-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Vue. Fornisce i composables per i componenti Vue.

- **nuxt-intlayer**
  Il modulo Nuxt che integra Intlayer con le applicazioni Nuxt. Fornisce una configurazione automatica, middleware per il rilevamento della lingua, gestione dei cookie e reindirizzamento degli URL.

### Passo 2: Configurazione del tuo progetto

Crea un file di configurazione per impostare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."], // Perché di default Intlayer monitorerà i file di dichiarazione dei contenuti dalla directory `./src`
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Configurazione per Intlayer
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configurazione per Intlayer
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
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

> Il modulo `nuxt-intlayer` gestisce automaticamente l'integrazione di Intlayer con Nuxt. Configura la costruzione delle dichiarazioni di contenuto, monitora i file in modalità sviluppo, fornisce un middleware per il rilevamento della locale e gestisce il routing localizzato.

### Passo 4: Dichiara il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      en: "Check out ",
      it: "Dai un'occhiata a ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      en: "Nuxt Intlayer documentation",
      it: "Documentazione di Nuxt Intlayer",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      it: "Per saperne di più su Nuxt in ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      it: "Documentazione Nuxt",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      it: "Clicca sul logo di Nuxt per saperne di più",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
      it: "Clicca sul logo di Nuxt per saperne di più",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      it: "il conteggio è ",
    }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      it: "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
    }),
    checkOut: t({
      en: "Check out ",
      it: "Dai un'occhiata a ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      en: "Nuxt Intlayer documentation",
      it: "Documentazione di Nuxt Intlayer",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      it: "Scopri di più su Nuxt in ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      it: "Documentazione Nuxt",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      it: "Clicca sul logo di Nuxt per saperne di più",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es ", it: "il conteggio è " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      it: "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe ", it: "Dai un'occhiata a " }),
    nuxtIntlayer: t({
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
      it: "Documentazione di Nuxt Intlayer",
    }),
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      it: "Per saperne di più su Nuxt in ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      it: "Documentazione Nuxt",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      it: "Clicca sul logo di Nuxt per saperne di più",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "it": "il conteggio è "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "it": "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
        "it": "Dai un'occhiata a "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "it": "Documentazione di Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "it": "Scopri di più su Nuxt in "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "it": "Documentazione di Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "it": "Clicca sul logo di Nuxt per saperne di più"
      }
    }
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> Le dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

### Passo 5: Utilizza Intlayer nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta la tua applicazione Nuxt utilizzando il composable `useIntlayer`:

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
  Usa la sintassi `<myContent />` o `<Component :is="myContent" />` per rendere il contenuto come un Nodo Intlayer. Questo si integra perfettamente con il [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) e il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

- **Sintassi basata su stringhe**:  
  Usa `{{ myContent }}` per rendere il contenuto come testo semplice, senza supporto del Visual Editor.

- **Sintassi HTML grezzo**:  
  Usa `<div v-html="myContent" />` per rendere il contenuto come HTML grezzo, senza supporto del Visual Editor.

- **Sintassi di destrutturazione**:  
  Il composable `useIntlayer` restituisce un Proxy con il contenuto. Questo proxy può essere destrutturato per accedere al contenuto mantenendo la reattività.
- Usa `const content = useIntlayer("myContent");` e `{{ content.myContent }}` / `<content.myContent />`.
- Oppure usa `const { myContent } = useIntlayer("myContent");` e `{{ myContent}}` / `<myContent/>` per destrutturare il contenuto.

### (Opzionale) Passo 6: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dal composable `useLocale`. Questa funzione ti permette di impostare la localizzazione dell'applicazione e aggiornare il contenuto di conseguenza.

Crea un componente per cambiare lingua:

```vue fileName="components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Ottieni le informazioni sulla localizzazione e la funzione setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Tieni traccia della localizzazione selezionata con un ref
const selectedLocale = ref(locale.value);

// Aggiorna la localizzazione quando la selezione cambia
const changeLocale = () => setLocale(selectedLocale.value);

// Mantieni selectedLocale sincronizzato con la localizzazione globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

Quindi, usa questo componente nelle tue pagine o nel layout:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // Crea il file di dichiarazione intlayer correlato
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### (Opzionale) Passo 7: Aggiungi il routing localizzato alla tua applicazione

Nuxt gestisce automaticamente il routing localizzato quando si utilizza il modulo `nuxt-intlayer`. Questo crea percorsi per ogni lingua automaticamente basandosi sulla struttura della directory delle pagine.

Esempio:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Per creare una pagina localizzata, basta creare i tuoi file Vue nella directory `pages/`:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

Il modulo `nuxt-intlayer` automaticamente:

- Rilevare la lingua preferita dall'utente
- Gestire il cambio di lingua tramite URL
- Impostare l'attributo `<html lang="">` appropriato
- Gestire i cookie della lingua
- Reindirizzare gli utenti all'URL localizzato corretto

### (Opzionale) Passo 8: Creare un componente Link localizzato

Per assicurarti che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente personalizzato `LocalizedLink`. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni.

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Verifica se il link è esterno
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// Crea un href localizzato per i link interni
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

Quindi usa questo componente in tutta la tua applicazione:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>
    <LocalizedLink to="/contact">
      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (Opzionale) Passo 9: Gestire i Metadati e la SEO

Nuxt offre eccellenti funzionalità SEO. Puoi usare Intlayer per gestire i metadati localizzati:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

Crea la dichiarazione di contenuto corrispondente:

```ts fileName="pages/about-meta.content.ts"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
      it: "Chi Siamo - La Mia Azienda",
    }),
    description: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      it: "Scopri di più sulla nostra azienda e sulla nostra missione",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      it: "Chi Siamo - La Mia Azienda",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      it: "Scopri di più sulla nostra azienda e sulla nostra missione",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      it: "Chi Siamo - La Mia Azienda",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      it: "Scopri di più sulla nostra azienda e sulla nostra missione",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "zh": "关于我们 - 我的公司",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "it": "Chi Siamo - La Mia Azienda"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### Configurare TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione di TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni esistenti di TypeScript
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

---

## Cronologia del documento

- 5.5.10 - 2025-06-29: Inizio cronologia
