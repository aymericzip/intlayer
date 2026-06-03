---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Vue i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Vite + Vue-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
---

# Übersetzen Sie Ihre Vite and Vue mit Intlayer | Internationalisierung (i18n)

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-vue-template) auf GitHub.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „vue-i18n“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt, wie zum Beispiel:

<AccordionGroup>

<Accordion header="Vollständige Vue-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Vue optimiert, indem es **Content-Scoping auf Komponentenebene**, **reaktive Übersetzungen** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) erforderlich sind.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Seitengröße um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

</Accordion>

<Accordion header="KI-Agent">

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent Fähigkeiten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung, um Ihre CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters zu übersetzen. Intlayer bietet außerdem einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) zur Unterstützung der **Übersetzung im Hintergrund**.

</Accordion>

<Accordion header="Leistung">

Das Verbinden großer JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zur Erstellungszeit.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwickler">

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, um Ihnen zu helfen Verwalten Sie Ihre mehrsprachigen Inhalte in **Echtzeit** und gestalten Sie die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern reibungslos. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>
</AccordionGroup>

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Vue-Anwendung

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-vue-template) auf GitHub.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es stellt Kontextanbieter und Composables für die Vue-Internationalisierung bereit.

- **vite-intlayer**
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Vite-Konfiguration">

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

</Step>

<Step number={4} title="Deklarieren Sie Ihren Inhalt">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen werden (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={5} title="Intlayer in Ihrem Code verwenden">

Um die Internationalisierungsfunktionen von Intlayer in Ihrer gesamten Vue-Anwendung zu nutzen, müssen Sie zunächst die Intlayer-Singleton-Instanz in Ihrer Hauptdatei registrieren. Dieser Schritt ist entscheidend, da er den Internationalisierungskontext für alle Komponenten in Ihrer Anwendung bereitstellt und Übersetzungen überall in Ihrem Komponentenbaum zugänglich macht.

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Den Provider auf der obersten Ebene einfügen
app.use(intlayer);

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

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

</Step>

<Step number={6} title="Ändern Sie die Sprache Ihres Inhalts" isOptional={true}>

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

</Step>

<Step number={7} title="Lokalisierte Routen zu Ihrer Anwendung hinzufügen" isOptional={true}>

Das Hinzufügen lokalisierter Routen in einer Vue-Anwendung beinhaltet typischerweise die Verwendung von Vue Router mit Sprachpräfixen. Dies erzeugt eindeutige Routen für jede Sprache, was für SEO und SEO-freundliche URLs nützlich ist.

Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Zuerst installieren Sie Vue Router:

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

Dann erstellen Sie eine Router-Konfiguration, die die sprachspezifische Navigation behandelt:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from "vue-intlayer";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * Deklarieren Sie die Routen mit sprachspezifischen Pfaden und Metadaten.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
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

  const metaLocale = to.meta.locale as Locale;

  // Verwende die in den Routen-Meta definierten Sprache wieder
  client.setLocale(metaLocale);
  next();
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

Parallel dazu können Sie auch das `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    vue(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="URL ändern, wenn sich die Sprache ändert" isOptional={true}>

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
<ol>
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

</Step>

<Step number={9} title="Ändern der HTML-Sprach- und Richtungsattribute" isOptional={true}>

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

</Step>

<Step number={10} title="Erstellen einer lokalisierten Link-Komponente" isOptional={true}>

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

</Step>

<Step number={11} title="Markdown rendern" isOptional={true}>

Intlayer unterstützt das Rendern von Markdown-Inhalten direkt in Ihrer Vue-Anwendung. Standardmäßig wird Markdown als einfacher Text behandelt. Um Markdown in reichhaltiges HTML umzuwandeln, können Sie [markdown-it](https://github.com/markdown-it/markdown-it), einen Markdown-Parser, integrieren.

Dies ist besonders nützlich, wenn Ihre Übersetzungen formatierte Inhalte wie Listen, Links oder Hervorhebungen enthalten.

Standardmäßig rendert Intlayer Markdown als String. Intlayer bietet jedoch auch eine Möglichkeit, Markdown mit der Funktion `installIntlayerMarkdown` in HTML zu rendern.

> Um zu sehen, wie man Markdown-Inhalte mit dem `intlayer`-Paket deklariert, siehe die [Markdown-Dokumentation](https://github.com/aymericzip/intlayer/tree/main/docs/de/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

app.use(intlayer);

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

</Step>

<Step number={12} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um es einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest Ihrer Konfiguration
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert sein soll.
     */
    enabled: true,

    /**
     * Definiert den Pfad der Ausgabedateien
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen. Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und dann entfernt werden.
     */
    saveComponents: false,

    /**
     * Präfix für Wörterbuchschlüssel
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extraktionsbefehl'>

Führen Sie den Extractor aus, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel-Compiler'>

Aktualisieren Sie Ihre `vite.config.ts`, um das `intlayerCompiler`-Plugin aufzunehmen:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Fügt das Compiler-Plugin hinzu
  ],
});
```

```bash packageManager="npm"
npm run build # Oder npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Oder pnpm run dev
```

```bash packageManager="yarn"
yarn build # Oder yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

```bash
#  Ignoriere die von Intlayer generierten Dateien
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

### (Optional) Sitemap und robots.txt (Build-Zeit)

Intlayer stellt Hilfsfunktionen bereit - `generateSitemap` und `getMultilingualUrls` -, mit denen Sie mehrsprachige `sitemap.xml`- und `robots.txt`-Inhalte für Crawler formatieren und automatisch nach `public/` schreiben können. Üblich ist ein kleines Node-Skript **vor** Vite (z. B. npm-`predev`-/`prebuild`-Hooks), damit die Dateien beim Build bzw. Dev-Server vorliegen.

#### Sitemap

Der Sitemap-Generator von Intlayer berücksichtigt Ihre Locales und die üblichen Metadaten für Crawler.

> Die erzeugte Sitemap unterstützt den `xhtml:link`-Namensraum (Hreflang). Statt nur flacher URLs verknüpft Intlayer alle Sprachversionen einer Seite bidirektional (z. B. `/about`, `/fr/about` oder `/about?lang=fr` je nach Routing), was Suchmaschinen hilft.

#### Robots.txt

Mit `getMultilingualUrls` gelten `Disallow`-Regeln für alle lokalisierten Varianten sensibler Pfade.

#### 1. `generate-seo.mjs` im Projektroot anlegen

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` muss installiert sein. Setzen Sie `SITE_URL` in der Produktion über die Umgebung (z. B. in der CI).

> Nutzen Sie möglichst `generate-seo.mjs` für Node-ESM. Bei `generate-seo.js` `"type": "module"` in der `package.json` setzen oder Node mit ESM starten.

#### 2. Skript vor Vite ausführen

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Bei pnpm oder yarn die Befehle anpassen. Aufruf aus der CI ist ebenfalls möglich.

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---
