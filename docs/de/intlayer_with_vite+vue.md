# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer, Vite und Vue

> Dieses Paket befindet sich in der Entwicklung. Siehe das [Issue](https://github.com/aymericzip/intlayer/issues/113) für weitere Informationen. Zeigen Sie Ihr Interesse an Intlayer für Vue, indem Sie das Issue liken.

<!-- Siehe [Application Template](https://github.com/aymericzip/intlayer-vue-template) auf GitHub. -->

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es bietet Kontextanbieter und Composables für die Internationalisierung in Vue.

- **vite-intlayer**
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und URL-Weiterleitung.

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
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Vite-Konfiguration integrieren

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

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Leistungsoptimierung.

### Schritt 4: Ihre Inhalte deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Anzahl ist ",
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
      de: ", den offiziellen Vue + Vite Starter",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über IDE-Unterstützung für Vue im ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue-Dokumentation Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Vite- und Vue-Logos, um mehr zu erfahren",
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
      de: "Anzahl ist ",
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
      de: "Erfahren Sie mehr über IDE-Unterstützung für Vue im ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue-Dokumentation Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Vite- und Vue-Logos, um mehr zu erfahren",
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

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Anzahl ist ",
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
      de: "Erfahren Sie mehr über die IDE-Unterstützung für Vue im ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      de: "Vue-Dokumentation Skalierungsleitfaden",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf die Vite- und Vue-Logos, um mehr zu erfahren",
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
        "de": "Anzahl ist ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "de": "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "de": "Schauen Sie sich ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "de": "den offiziellen Vue + Vite Starter",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "de": "Erfahren Sie mehr über die IDE-Unterstützung für Vue im ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Vue-Dokumentation Skalierungsleitfaden",
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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src`). Und sie müssen mit der Dateierweiterung der Inhaltsdeklaration übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

Um die Internationalisierungsfunktionen von Intlayer in Ihrer Vue-Anwendung zu nutzen, müssen Sie zunächst die Intlayer-Singleton-Instanz in Ihrer Hauptdatei registrieren. Dieser Schritt ist entscheidend, da er den Internationalisierungskontext für alle Komponenten in Ihrer Anwendung bereitstellt und Übersetzungen überall in Ihrer Komponentenstruktur zugänglich macht.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Injektion des Providers auf oberster Ebene
installIntlayer(app);

// App mounten
app.mount("#app");
```

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu, indem Sie eine Haupt-Vue-Komponente erstellen und die `useIntlayer`-Composables verwenden:

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

#### Zugriff auf Inhalte in Intlayer Intlayer bietet verschiedene APIs für

den Zugriff auf Ihre Inhalte: - **Komponentenbasierte Syntax** (empfohlen):
Verwenden Sie die Syntax `<meinInhalt />` oder `<Component :is="meinInhalt" />`, um Inhalte als Intlayer-Knoten zu rendern. Dies lässt sich nahtlos in den
[Visuellen
Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md)
und das
[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md)
integrieren. - **Zeichenkettenbasierte Syntax**: Verwenden Sie `{{
  meinInhalt
}}`, um den Inhalt als reinen Text ohne Unterstützung des Visuellen Editors zu
rendern. - **Rohe HTML-Syntax**: Verwenden Sie `

<div v-html="meinInhalt" />
`, um den Inhalt als rohes HTML ohne Unterstützung des Visuellen Editors zu
rendern. - **Destrukturierungssyntax**: Das `useIntlayer`-Composable gibt einen
Proxy mit dem Inhalt zurück. Dieser Proxy kann destrukturiert werden, um auf den
Inhalt zuzugreifen und dabei die Reaktivität beizubehalten. - Verwenden Sie
`const content = useIntlayer("meinInhalt");` und `{{ content.meinInhalt }}` / `
<content.meinInhalt />
`. - Oder verwenden Sie `const { meinInhalt } = useIntlayer("meinInhalt");` und
`{{ meinInhalt }}` / `
<meinInhalt />
`, um den Inhalt zu destrukturieren. ### (Optional) Schritt 6: Ändern Sie die
Sprache Ihres Inhalts Um die Sprache Ihres Inhalts zu ändern, können Sie die
`setLocale`-Funktion verwenden, die vom `useLocale`-Composable bereitgestellt
wird. Mit dieser Funktion können Sie die Locale der Anwendung festlegen und den
Inhalt entsprechend aktualisieren. Erstellen Sie eine Komponente, um zwischen
Sprachen zu wechseln:

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

// Abrufen von Lokalisierungsinformationen und setLocale-Funktion
const { locale, availableLocales, setLocale } = useLocale();

// Verfolgen der ausgewählten Sprache mit einem Ref
const selectedLocale = ref(locale.value);

// Aktualisieren der Sprache, wenn sich die Auswahl ändert
const changeLocale = () => setLocale(selectedLocale.value);

// Halten Sie selectedLocale synchron mit der globalen Sprache
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Verwenden Sie diese Komponente dann in Ihrer App.vue:

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

### (Optional) Schritt 7: Fügen Sie Ihrer Anwendung lokalisierte Routen hinzu

Das Hinzufügen lokalisierter Routen in einer Vue-Anwendung erfolgt typischerweise mit Vue Router und Sprachpräfixen. Dies erstellt eindeutige Routen für jede Sprache, was für SEO und SEO-freundliche URLs nützlich ist.

Beispiel:

```plaintext
- https://example.com/about
- https://example.com/de/about
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

Erstellen Sie dann eine Router-Konfiguration, die lokalisierungsbasierte Routen behandelt:

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

// Abrufen der Internationalisierungskonfiguration
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Deklarieren Sie die Routen mit lokalisierungsspezifischen Pfaden und Metadaten.
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

// Erstellen Sie die Router-Instanz
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Fügen Sie eine Navigationswächter für die Lokalisierungsbehandlung hinzu
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Wiederverwenden der im Meta der Route definierten Lokalisierung
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: keine Lokalisierung im Meta, möglicherweise nicht übereinstimmende Route
    // Optional: 404 behandeln oder zur Standardlokalisierung umleiten
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Der Name wird verwendet, um die Route im Router zu identifizieren. Er sollte eindeutig über alle Routen hinweg sein, um Konflikte zu vermeiden und eine ordnungsgemäße Navigation und Verlinkung zu gewährleisten.

Registrieren Sie dann den Router in Ihrer main.js-Datei:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Fügen Sie den Router zur App hinzu
app.use(router);

// Mounten Sie die App
app.mount("#app");
```

Aktualisieren Sie dann Ihre `App.vue`-Datei, um die RouterView-Komponente zu rendern. Diese Komponente zeigt die übereinstimmende Komponente für die aktuelle Route an.

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

Parallel dazu können Sie auch das `intLayerMiddlewarePlugin` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Lokalisierung basierend auf der URL und setzt das entsprechende Lokalisierungs-Cookie. Wenn keine Lokalisierung angegeben ist, bestimmt das Plugin die am besten geeignete Lokalisierung basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Lokalisierung erkannt wird, wird zur Standardlokalisierung umgeleitet.

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

### (Optional) Schritt 8: Ändern Sie die URL, wenn sich die Lokalisierung ändert

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
    // Aktuelle Route abrufen und eine lokalisierte URL erstellen
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Zur lokalisierten Route navigieren, ohne die Seite neu zu laden
    router.push(localizedPath);
  },
});

// Verfolgen Sie die ausgewählte Lokalisierung mit einem Ref
const selectedLocale = ref(locale.value);

// Aktualisieren Sie die Lokalisierung, wenn sich die Auswahl ändert
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Halten Sie die selectedLocale mit der globalen Lokalisierung synchron
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Tipp: Für bessere SEO und Barrierefreiheit verwenden Sie Tags wie `<a href="/de/home" hreflang="de">`, um auf lokalisierte Seiten zu verlinken, wie in Schritt 10 gezeigt. Dadurch können Suchmaschinen sprachspezifische URLs ordnungsgemäß entdecken und indexieren. Um das Verhalten einer SPA beizubehalten, können Sie die Standardnavigation mit @click.prevent verhindern, die Lokalisierung mit useLocale ändern und programmgesteuert mit Vue Router navigieren.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Wechseln zu Englisch"
      target="_self"
      aria-current="page"
      href="/de/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>Englisch</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Wechseln zu Spanisch"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanisch</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Optional) Schritt 9: Ändern Sie die HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es wichtig, die Attribute `lang` und `dir` des `<html>`-Tags an die aktuelle Lokalisierung anzupassen. Dadurch wird sichergestellt:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das richtige `lang`-Attribut, um Inhalte korrekt auszusprechen und zu interpretieren.
- **Textrendering**: Das `dir`-Attribut (Richtung) stellt sicher, dass Text in der richtigen Reihenfolge gerendert wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit entscheidend ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und die richtigen lokalisierten Inhalte in den Suchergebnissen bereitzustellen.

Durch die dynamische Aktualisierung dieser Attribute bei einem Lokalisierungswechsel gewährleisten Sie eine konsistente und zugängliche Benutzererfahrung für alle unterstützten Sprachen.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable, das die `lang`- und `dir`-Attribute des HTML <html>-Elements
 * basierend auf der aktuellen Sprache aktualisiert.
 *
 * @example
 * // In Ihrer App.vue oder einer globalen Komponente
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Aktualisieren der HTML-Attribute, wenn sich die Sprache ändert
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Aktualisieren des Sprachattributs
      document.documentElement.lang = newLocale;

      // Festlegen der Textrichtung (ltr für die meisten Sprachen, rtl für Arabisch, Hebräisch usw.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

Verwenden Sie dieses Composable in Ihrer `App.vue` oder einer globalen Komponente:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Anwenden der HTML-Attribute basierend auf der aktuellen Sprache
useI18nHTMLAttributes();
</script>

<template>
  <!-- Ihr App-Template -->
</template>
```

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch interne URLs mit der aktuellen Sprache vor, sodass beispielsweise ein französischsprachiger Benutzer, der auf einen Link zur "Über"-Seite klickt, zu `/fr/about` statt zu `/about` weitergeleitet wird.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten Benutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in Ihrer gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code einfacher zu warten und zu erweitern, wenn Ihre Anwendung wächst.

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

// Erstellen eines lokalisierten href für interne Links
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

// Erstellen eines lokalisierten to-Props für router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Wenn 'to' ein Objekt ist, lokalisieren Sie die path-Eigenschaft
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

### TypeScript konfigurieren

Intlayer verwendet Modul-Erweiterungen, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einbinden der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese in Ihr Git-Repository einzuchecken.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext
# Ignorieren der von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installieren Sie sie aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

## Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) auslagern.
