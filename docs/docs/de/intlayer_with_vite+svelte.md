---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Wie Sie Ihre Vite- und Svelte-App übersetzen – i18n-Anleitung 2025
description: Entdecken Sie, wie Sie Ihre Vite- und Svelte-Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
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
    changes: Dokumentation aktualisiert
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Übersetzen Sie Ihre Vite- und Svelte-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Svelte-Anwendung

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-svelte-template) auf GitHub.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
bash packageManager="npm"
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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **svelte-intlayer**  
  Das Paket, das Intlayer in Svelte-Anwendungen integriert. Es stellt Context-Provider und Hooks für die Internationalisierung in Svelte bereit.

- **vite-intlayer**  
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Nutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
// Inhalt der App deklarieren
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
// Inhalt der App deklarieren
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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./src`) aufgenommen werden. Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 5: Intlayer in Ihrem Code verwenden

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Inhalt als einfachen Inhalt rendern -->
<h1>{$content.title}</h1>
<!-- Um den Inhalt editierbar mit dem Editor zu rendern -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Um den Inhalt als String zu rendern -->
<div aria-label={$content.title.value}></div>
```

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Lokale Informationen und setLocale-Funktion abrufen
const { locale, availableLocales, setLocale } = useLocale();

// Lokale Änderung behandeln
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

### (Optional) Schritt 7: Markdown rendern

Intlayer unterstützt das direkte Rendern von Markdown-Inhalten in Ihrer Svelte-Anwendung. Standardmäßig wird Markdown als reiner Text behandelt. Um Markdown in reichhaltiges HTML umzuwandeln, können Sie `@humanspeak/svelte-markdown` oder einen anderen Markdown-Parser integrieren.

> Um zu sehen, wie man Markdown-Inhalte mit dem `intlayer`-Paket deklariert, siehe die [Markdown-Dokumentation](https://github.com/aymericzip/intlayer/tree/main/docs/docs/de/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // rendere den Markdown-Inhalt als String
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Sie können auch auf Ihre Markdown-Front-Matter-Daten über die Eigenschaft `content.markdownContent.metadata.xxx` zugreifen.

### (Optional) Schritt 8: Einrichten des intlayer Editors / CMS

Um den intlayer Editor einzurichten, müssen Sie der [intlayer Editor Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) folgen.

Um das intlayer CMS einzurichten, müssen Sie der [intlayer CMS Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) folgen.

Parallel dazu müssen Sie in Ihrer Svelte-Anwendung die folgende Zeile in einem Layout oder im Root Ihrer Anwendung hinzufügen:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Optional) Schritt 7: Lokalisierte Routing zu Ihrer Anwendung hinzufügen

Um lokalisierte Routen in Ihrer Svelte-Anwendung zu verwalten, können Sie `svelte-spa-router` zusammen mit Intlayers `localeFlatMap` verwenden, um Routen für jede Locale zu generieren.

Installieren Sie zuerst `svelte-spa-router`:

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

Erstellen Sie dann eine Datei `Router.svelte`, um Ihre Routen zu definieren:

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

Aktualisieren Sie Ihre `main.ts`, um die `Router`-Komponente anstelle von `App` zu mounten:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Aktualisieren Sie abschließend Ihre `App.svelte`, um die `locale`-Prop zu empfangen und sie mit `useIntlayer` zu verwenden:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... der Rest Ihrer App ... -->
</main>
```

#### Serverseitiges Routing konfigurieren (optional)

Parallel dazu können Sie auch den `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

> Hinweis: Um den `intlayerProxy` in der Produktion zu verwenden, müssen Sie das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
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
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Locale ändert

Um Benutzern das Wechseln der Sprache zu ermöglichen und die URL entsprechend zu aktualisieren, können Sie eine `LocaleSwitcher`-Komponente erstellen. Diese Komponente verwendet `getLocalizedUrl` von `intlayer` und `push` von `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Locale-Informationen abrufen
const { locale, availableLocales } = useLocale();

// Locale-Wechsel behandeln
const changeLocale = (event: Event) => {
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Optional) Schritt 8: URL ändern, wenn sich die Locale ändert

Um Benutzern das Wechseln der Sprache und die entsprechende Aktualisierung der URL zu ermöglichen, können Sie eine `LocaleSwitcher`-Komponente erstellen. Diese Komponente verwendet `getLocalizedUrl` von `intlayer` und `push` von `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Locale-Informationen abrufen
const { locale, availableLocales } = useLocale();

// Locale-Änderung behandeln
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl(currentUrl, newLocale);
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

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung lesen Sie die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
