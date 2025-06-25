---
docName: intlayer_with_vite_vue
url: https://intlayer.org/doc/environment/vite-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md
createdAt: 2025-04-18
updatedAt: 2025-04-18
title: Traduci il tuo sito web Vite e Vue (i18n)
description: Scopri come rendere multilingue il tuo sito web con Vite e Vue. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Vite
  - Vue
  - JavaScript
---

# Iniziare con l'Internazionalizzazione (i18n) con Intlayer, Vite e Vue

> Questo pacchetto è in fase di sviluppo. Vedi il [problema](https://github.com/aymericzip/intlayer/issues/113) per maggiori informazioni. Mostra il tuo interesse per Intlayer per Vue mettendo un like al problema.

<!-- Vedi [Modello Applicativo](https://github.com/aymericzip/intlayer-vue-template) su GitHub. -->

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione Vite e Vue

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md), transpilation e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **vue-intlayer**
  Il pacchetto che integra Intlayer con l'applicazione Vue. Fornisce provider di contesto e composables per l'internazionalizzazione in Vue.

- **vite-intlayer**
  Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti URL.

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
      // Le tue altre lingue
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
      // Le tue altre lingue
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
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Tramite questo file di configurazione, puoi impostare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella Configurazione di Vite

Aggiungi il plugin intlayer alla tua configurazione.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> Il plugin `intlayerPlugin()` di Vite viene utilizzato per integrare Intlayer con Vite. Garantisce la costruzione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce variabili di ambiente Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

### Passo 4: Dichiarare i tuoi Contenuti

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      it: "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      it: "Controlla ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      it: ", il starter ufficiale Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      it: "Scopri di più sul supporto IDE per Vue nel ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      it: "Guida di Scaling up dei Documenti Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      it: "Clicca sui loghi di Vite e Vue per saperne di più",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      it: "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      it: "Controlla ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      it: "lo starter ufficiale Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      it: "Scopri di più sul supporto IDE per Vue nel ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      it: "Guida di Scaling up dei Documenti Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      it: "Clicca sui loghi di Vite e Vue per saperne di più",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/* @type {import('intlayer').Dictionary} */ const appContent = {
  key: "helloworld",
  content: {
    count: t({
      it: "il conteggio è ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      it: "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      it: "Scopri ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      it: "il starter ufficiale Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      it: "Scopri di più sul supporto IDE per Vue nel ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      it: "Guida all'espansione di Vue Docs",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      it: "Clicca sui loghi di Vite e Vue per saperne di più",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "it": "il conteggio è ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "it": "Modifica <code>components/HelloWorld.vue</code> e salva per testare HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "it": "Scopri ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "it": "il starter ufficiale Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "it": "Scopri di più sul supporto IDE per Vue nel ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "it": "Guida all'espansione di Vue Docs",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "it": "Clicca sui loghi di Vite e Vue per saperne di più",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Le dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

### Passaggio 5: Utilizzare Intlayer nel tuo codice

Per utilizzare le funzionalità di internazionalizzazione di Intlayer in tutta la tua applicazione Vue, devi prima registrare l'istanza singleton di Intlayer nel tuo file principale. Questo passaggio è cruciale poiché fornisce il contesto di internazionalizzazione a tutti i componenti della tua applicazione, rendendo le traduzioni accessibili ovunque nel tuo albero dei componenti.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Inietta il provider a livello superiore
installIntlayer(app);

// Monta l'app
app.mount("#app");
```

Accedi ai tuoi dizionari di contenuti in tutta la tua applicazione creando un componente Vue principale e utilizzando i composables `useIntlayer`:

```vue fileName="src/HelloWord.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

#### Accesso ai Contenuti in Intlayer Intlayer offre diverse API per accedere ai tuoi contenuti:

- **Sintassi basata su componenti** (consigliata): Usa la
  sintassi `<mioContenuto />`, o `<Component :is="mioContenuto" />` per renderizzare il contenuto come un Nodo Intlayer. Questo si integra
  perfettamente con l'[Editor Visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
  e il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

- **Sintassi basata su stringhe**: Usa `{{ mioContenuto }}` per renderizzare il
  contenuto come testo semplice, senza il supporto dell'Editor Visuale.
- **Sintassi HTML grezza**: Usa `<div v-html="mioContenuto" />` per renderizzare il contenuto come HTML grezzo, senza il supporto dell'Editor
  Visuale.
- **Sintassi di destrutturazione**: Il composable `useIntlayer`
  restituisce un Proxy con il contenuto. Questo proxy può essere destrutturato per
  accedere al contenuto mantenendo la reattività.
  - Usa `const content = useIntlayer("mioContenuto");` e `{{ content.mioContenuto }}` / `<content.mioContenuto />`.
  - Oppure usa `const { mioContenuto } = useIntlayer("mioContenuto");` e `{{ mioContenuto }}` / `<mioContenuto />` per destrutturare il contenuto.

### (Opzionale) Passaggio 6: Cambiare la lingua dei tuoi contenuti

Per cambiare la lingua dei tuoi contenuti, puoi
utilizzare la funzione `setLocale` fornita dal composable `useLocale`. Questa
funzione ti permette di impostare la locale dell'applicazione e aggiornare i
contenuti di conseguenza. Crea un componente per passare da una lingua
all'altra:

```vue fileName="src/components/LocaleSwitcher.vue"
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

// Ottieni informazioni sulla lingua e la funzione setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Tieni traccia della lingua selezionata con un ref
const selectedLocale = ref(locale.value);

// Aggiorna la lingua quando cambia la selezione
const changeLocale = () => setLocale(selectedLocale.value);

// Mantieni sincronizzata la selectedLocale con la lingua globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Quindi, utilizza questo componente nel tuo App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Crea il file di dichiarazione intlayer correlato
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

### (Opzionale) Passaggio 7: Aggiungere il routing localizzato alla tua applicazione

Aggiungere il routing localizzato in un'applicazione Vue di solito comporta l'uso di Vue Router con prefissi di lingua. Questo crea percorsi unici per ogni lingua, utile per la SEO e URL ottimizzati per i motori di ricerca.

Esempio:

```plaintext
- https://example.com/about
- https://example.com/it/about
- https://example.com/fr/about
```

Per prima cosa, installa Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Successivamente, crea una configurazione del router che gestisca il routing basato sulla lingua:

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// Ottieni la configurazione dell'internazionalizzazione
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Dichiarare le rotte con percorsi e metadati specifici per la lingua.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// Crea l'istanza del router
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Aggiungi un guardiano di navigazione per la gestione della lingua
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Riutilizza la lingua definita nei metadati della rotta
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: nessuna lingua nei metadati, probabilmente rotta non corrispondente
    // Opzionale: gestire 404 o reindirizzare alla lingua predefinita
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Il nome viene utilizzato per identificare la rotta nel router. Deve essere unico per tutte le rotte per evitare conflitti e garantire una navigazione e un collegamento corretti.

Successivamente, registra il router nel file main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Aggiungi il router all'app
app.use(router);

// Monta l'app
app.mount("#app");
```

Aggiorna quindi il file `App.vue` per rendere il componente RouterView. Questo componente visualizzerà il componente corrispondente alla rotta corrente.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Parallelamente, puoi anche utilizzare il plugin `intLayerMiddlewarePlugin` per aggiungere il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente in base all'URL e imposterà il cookie della lingua appropriato. Se non viene specificata alcuna lingua, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, reindirizzerà alla lingua predefinita.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opzionale) Passo 8: Cambia l'URL quando cambia la lingua

Per aggiornare automaticamente l'URL quando l'utente cambia lingua, puoi modificare il componente `LocaleSwitcher` per utilizzare Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
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
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Ottieni Vue Router
const router = useRouter();

// Ottieni informazioni sulla lingua e funzione setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Ottieni la rotta corrente e crea un URL localizzato
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Naviga alla rotta localizzata senza ricaricare la pagina
    router.push(localizedPath);
  },
});

// Traccia la lingua selezionata con un ref
const selectedLocale = ref(locale.value);

// Aggiorna la lingua quando cambia la selezione
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Mantieni selectedLocale sincronizzato con la lingua globale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Suggerimento: Per un SEO e un'accessibilità migliori, utilizza tag come `<a href="/fr/home" hreflang="fr">` per collegarti a pagine localizzate, come mostrato nel Passo 10. Questo consente ai motori di ricerca di scoprire e indicizzare correttamente gli URL specifici per lingua. Per preservare il comportamento SPA, puoi impedire la navigazione predefinita con @click.prevent, cambiare la lingua utilizzando useLocale e navigare programmaticamente con Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Passa all'inglese"
      target="_self"
      aria-current="page"
      href="/it/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>Inglese</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Passa allo spagnolo"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spagnolo</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opzionale) Passo 9: Cambia gli attributi di lingua e direzione nell'HTML

Quando la tua applicazione supporta più lingue, è fondamentale aggiornare gli attributi `lang` e `dir` del tag `<html>` per corrispondere alla lingua corrente. Questo garantisce:

- **Accessibilità**: I lettori di schermo e le tecnologie assistive si affidano all'attributo `lang` corretto per pronunciare e interpretare correttamente i contenuti.
- **Rendering del testo**: L'attributo `dir` (direzione) garantisce che il testo venga reso nell'ordine corretto (es. da sinistra a destra per l'inglese, da destra a sinistra per l'arabo o l'ebraico), essenziale per la leggibilità.
- **SEO**: I motori di ricerca utilizzano l'attributo `lang` per determinare la lingua della tua pagina, aiutando a servire il contenuto localizzato corretto nei risultati di ricerca.

Aggiornando dinamicamente questi attributi quando cambia la lingua, garantisci un'esperienza coerente e accessibile per gli utenti in tutte le lingue supportate.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable che aggiorna gli attributi `lang` e `dir` dell'elemento HTML <html>
 * in base alla lingua corrente.
 *
 * @example
 * // Nel tuo App.vue o in un componente globale
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Aggiorna gli attributi HTML ogni volta che cambia la lingua
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Aggiorna l'attributo della lingua
      document.documentElement.lang = newLocale;

      // Imposta la direzione del testo (ltr per la maggior parte delle lingue, rtl per Arabo, Ebraico, ecc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

Usa questo composable nel tuo `App.vue` o in un componente globale:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Applica gli attributi HTML in base alla lingua corrente
useI18nHTMLAttributes();
</script>

<template>
  <!-- Il template della tua app -->
</template>
```

### (Opzionale) Passo 10: Creare un Componente Link Localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente personalizzato `Link`. Questo componente aggiunge automaticamente un prefisso agli URL interni con la lingua corrente. Ad esempio, quando un utente francofono clicca su un link alla pagina "About", viene reindirizzato a `/fr/about` invece di `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e Esperienza Utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga nella lingua corrente, evitando cambiamenti di lingua inaspettati.
- **Manutenibilità**: Centralizzare la logica di localizzazione in un unico componente semplifica la gestione degli URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che l'applicazione cresce.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Controlla se il link è esterno
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Crea un href localizzato per i link interni
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Per l'uso con Vue Router, crea una versione specifica per il router:

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Crea una proprietà 'to' localizzata per router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Se 'to' è un oggetto, localizza la proprietà path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Usa questi componenti nella tua applicazione:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Altro -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### Configurare TypeScript

Intlayer utilizza l'estensione dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'estensione ufficiale **Intlayer VS Code Extension**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Approfondimenti

## Per approfondire, puoi implementare il [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
