---
docName: intlayer_with_vite_vue
url: https://intlayer.org/doc/environment/vite-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Übersetzen Sie Ihre Vite- und Vue-Website (i18n)
description: Entdecken Sie, wie Sie Ihre Vite- und Vue-Website mehrsprachig machen. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Vue
  - JavaScript
---

# Erste Schritte zur Internationalisierung (i18n) mit Intlayer, Vite und Vue

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-vue-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Vue-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es stellt Kontextanbieter und Composables für die Vue-Internationalisierung bereit.

- **vite-intlayer**
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachversionen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachversionen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

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

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      de: ", den offiziellen Vue + Vite Starter",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über die IDE-Unterstützung für Vue in der ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue Docs Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Logos von Vite und Vue, um mehr zu erfahren",
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
      de: "Der Zähler ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      de: "den offiziellen Vue + Vite Starter",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über die IDE-Unterstützung für Vue im ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue Docs Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Logos von Vite und Vue, um mehr zu erfahren",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      de: "Klicken Sie auf die Logos von Vite und Vue, um mehr zu erfahren",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Der Zähler ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      de: "den offiziellen Vue + Vite Starter",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über die IDE-Unterstützung für Vue in der ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue Docs Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Logos von Vite und Vue, um mehr zu erfahren",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "de": "Der Zähler ist "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "de": "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen"
      }
    },
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "de": "Schauen Sie sich an "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "de": "den offiziellen Vue + Vite Starter"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "de": "Erfahren Sie mehr über die IDE-Unterstützung für Vue im "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Vue Docs Skalierungsanleitung",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Klicken Sie auf die Vite- und Vue-Logos, um mehr zu erfahren",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen werden (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 5: Intlayer in Ihrem Code verwenden

Um die Internationalisierungsfunktionen von Intlayer in Ihrer gesamten Vue-Anwendung zu nutzen, müssen Sie zunächst die Intlayer-Singleton-Instanz in Ihrer Hauptdatei registrieren. Dieser Schritt ist entscheidend, da er den Internationalisierungskontext für alle Komponenten in Ihrer Anwendung bereitstellt und Übersetzungen überall in Ihrem Komponentenbaum zugänglich macht.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Den Provider auf der obersten Ebene einfügen
installIntlayer(app);

// Die App mounten
app.mount("#app");
```

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu, indem Sie eine Haupt-Vue-Komponente erstellen und die `useIntlayer` Composables verwenden:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Zugriff auf Inhalte in Intlayer

Intlayer bietet verschiedene APIs, um auf Ihre Inhalte zuzugreifen:

- **Komponentenbasierte Syntax** (empfohlen):
  Verwenden Sie die Syntax `<myContent />` oder `<Component :is="myContent" />`, um Inhalte als Intlayer-Knoten zu rendern. Dies integriert sich nahtlos mit dem [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

- **String-basierte Syntax**:
  Verwenden Sie `{{ myContent }}`, um den Inhalt als einfachen Text ohne Unterstützung des Visual Editors darzustellen.

- **Raw HTML Syntax**:
  Verwenden Sie `<div v-html="myContent" />`, um den Inhalt als rohes HTML ohne Unterstützung des Visual Editors darzustellen.

- **Destrukturierungssyntax**:
  Der `useIntlayer` Composable gibt ein Proxy-Objekt mit dem Inhalt zurück. Dieses Proxy kann destrukturiert werden, um auf den Inhalt zuzugreifen und dabei die Reaktivität beizubehalten.
  - Verwenden Sie `const content = useIntlayer("myContent");` und `{{ content.myContent }}` / `<content.myContent />`.
  - Oder verwenden Sie `const { myContent } = useIntlayer("myContent");` und `{{ myContent }}` / `<myContent />`, um den Inhalt zu destrukturieren.

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale` Composable bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

Erstellen Sie eine Komponente, um zwischen Sprachen zu wechseln:

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

// Hole Sprachinformationen und setLocale-Funktion
const { locale, availableLocales, setLocale } = useLocale();

// Verfolge die ausgewählte Sprache mit einem ref
const selectedLocale = ref(locale.value);

// Aktualisiere die Sprache, wenn die Auswahl sich ändert
const changeLocale = () => setLocale(selectedLocale.value);

// Synchronisieren Sie selectedLocale mit der globalen Locale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Verwenden Sie dann diese Komponente in Ihrer App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Erstellen Sie die zugehörige Intlayer-Deklarationsdatei
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

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Das Hinzufügen lokalisierter Routen in einer Vue-Anwendung beinhaltet typischerweise die Verwendung von Vue Router mit Sprachpräfixen. Dies erzeugt eindeutige Routen für jede Sprache, was für SEO und SEO-freundliche URLs nützlich ist.

Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Zuerst installieren Sie Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Dann erstellen Sie eine Router-Konfiguration, die die sprachspezifische Navigation behandelt:

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

// Holen Sie die Internationalisierungskonfiguration
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Deklarieren Sie die Routen mit sprachspezifischen Pfaden und Metadaten.
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

// Erstelle die Router-Instanz
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Füge eine Navigationswache für die Sprachbehandlung hinzu
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Verwende die in den Routen-Meta definierten Sprache wieder
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: keine Sprache in Meta, möglicherweise keine passende Route
    // Optional: Behandle 404 oder leite zur Standard-Sprache weiter
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Der Name wird verwendet, um die Route im Router zu identifizieren. Er sollte über alle Routen hinweg eindeutig sein, um Konflikte zu vermeiden und eine korrekte Navigation und Verlinkung sicherzustellen.

Registriere dann den Router in deiner main.js-Datei:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Füge den Router zur App hinzu
app.use(router);

// Binde die App an das DOM-Element
app.mount("#app");
```

Aktualisieren Sie dann Ihre `App.vue`-Datei, um die RouterView-Komponente zu rendern. Diese Komponente zeigt die für die aktuelle Route passende Komponente an.

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

Parallel dazu können Sie auch das `intLayerMiddlewarePlugin` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

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
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Schritt 8: URL ändern, wenn sich die Sprache ändert

Um die URL automatisch zu aktualisieren, wenn der Benutzer die Sprache ändert, können Sie die `LocaleSwitcher`-Komponente so anpassen, dass sie Vue Router verwendet:

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

// Vue Router abrufen
const router = useRouter();

// Lokalisierungsinformationen und setLocale-Funktion abrufen
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Aktuellen Pfad abrufen und eine lokalisierte URL erstellen
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Zur lokalisierten Route navigieren, ohne die Seite neu zu laden
    router.push(localizedPath);
  },
});

// Die ausgewählte Locale mit einem ref verfolgen
const selectedLocale = ref(locale.value);

// Aktualisieren Sie die Sprache, wenn die Auswahl geändert wird
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Halten Sie selectedLocale mit der globalen Sprache synchron
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Tipp: Für eine bessere SEO und Barrierefreiheit verwenden Sie Tags wie `<a href="/fr/home" hreflang="fr">`, um auf lokalisierte Seiten zu verlinken, wie in Schritt 10 gezeigt. Dies ermöglicht Suchmaschinen, sprachspezifische URLs korrekt zu entdecken und zu indexieren. Um das SPA-Verhalten beizubehalten, können Sie die Standardnavigation mit @click.prevent verhindern, die Sprache mit useLocale ändern und programmgesteuert mit Vue Router navigieren.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Wechsel zu Englisch"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Englisch</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Wechsel zu Spanisch"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Spanisch</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Optional) Schritt 9: Ändern der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es entscheidend, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Locale anzupassen. Dies stellt sicher:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte richtig auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) stellt sicher, dass der Text in der richtigen Reihenfolge dargestellt wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit unerlässlich ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und so die richtige lokalisierte Version in den Suchergebnissen anzuzeigen.

Indem Sie diese Attribute dynamisch aktualisieren, wenn sich die Locale ändert, gewährleisten Sie eine konsistente und barrierefreie Nutzererfahrung für alle unterstützten Sprachen.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable, das die `lang`- und `dir`-Attribute des HTML-<html>-Elements
 * basierend auf der aktuellen Locale aktualisiert.
 *
 * @example
 * // In deiner App.vue oder einer globalen Komponente
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Aktualisiere die HTML-Attribute, wann immer sich die Locale ändert
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Aktualisiere das Sprach-Attribut
      document.documentElement.lang = newLocale;

      // Setze die Schreibrichtung (ltr für die meisten Sprachen, rtl für Arabisch, Hebräisch, etc.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Verwenden Sie diesen Composable in Ihrer `App.vue` oder einer globalen Komponente:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Wenden Sie die HTML-Attribute basierend auf der aktuellen Locale an
useI18nHTMLAttributes();
</script>

<template>
  <!-- Ihr App-Template -->
</template>
```

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch das aktuelle Sprachpräfix hinzu. Zum Beispiel wird ein französischsprachiger Benutzer, der auf einen Link zur „Über uns“-Seite klickt, zu `/fr/about` weitergeleitet anstatt zu `/about`.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung wird sichergestellt, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code leichter wartbar und erweiterbar, während Ihre Anwendung wächst.

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

// Prüfen, ob der Link extern ist
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Erstelle eine lokalisierte href für interne Links
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Für die Verwendung mit Vue Router erstellen Sie eine router-spezifische Version:

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

// Erstellen Sie eine lokalisierte to-Eigenschaft für router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Wenn 'to' ein Objekt ist, lokalisiere die Pfadeigenschaft
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Verwenden Sie diese Komponenten in Ihrer Anwendung:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue Router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Andere -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Optional) Schritt 11: Markdown rendern

Intlayer unterstützt das Rendern von Markdown-Inhalten direkt in Ihrer Vue-Anwendung. Standardmäßig wird Markdown als einfacher Text behandelt. Um Markdown in reichhaltiges HTML umzuwandeln, können Sie [markdown-it](https://github.com/markdown-it/markdown-it), einen Markdown-Parser, integrieren.

Dies ist besonders nützlich, wenn Ihre Übersetzungen formatierte Inhalte wie Listen, Links oder Hervorhebungen enthalten.

Standardmäßig rendert Intlayer Markdown als String. Intlayer bietet jedoch auch eine Möglichkeit, Markdown mit der Funktion `installIntlayerMarkdown` in HTML zu rendern.

> Um zu sehen, wie man Markdown-Inhalte mit dem `intlayer`-Paket deklariert, siehe die [Markdown-Dokumentation](https://github.com/aymericzip/intlayer/tree/main/docs/de/dictionary/markdown.md).

```ts filename="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // HTML-Tags erlauben
  linkify: true, // URLs automatisch verlinken
  typographer: true, // intelligente Anführungszeichen, Gedankenstriche usw. aktivieren
});

// Intlayer mitteilen, md.render() zu verwenden, wann immer Markdown in HTML umgewandelt werden muss
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Sobald registriert, können Sie die komponentenbasierte Syntax verwenden, um den Markdown-Inhalt direkt anzuzeigen:

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
```

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese in Ihr Git-Repository übernommen werden.

Dazu können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei aufnehmen:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
