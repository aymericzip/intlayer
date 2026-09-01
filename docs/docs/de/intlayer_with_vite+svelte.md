---
createdAt: 2025-04-18
updatedAt: 2026-08-30
title: "Vite + Svelte i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Vite + Svelte-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
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
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 5.5.11
    date: 2025-11-19
    changes: "Dokumentation aktualisiert"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# Übersetzen Sie Ihre Vite- und Svelte-Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „svelte-i18n“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>
<Accordion header="Vollständige Svelte-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Svelte optimiert, indem es **Content-Scoping auf Komponentenebene**, **reaktive Übersetzungen** und alle für die Skalierung der Internationalisierung (i18n) erforderlichen Funktionen bietet.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Seitengröße um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

</Accordion>

<Accordion header="KI-Agent">

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

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

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Svelte-Anwendung

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-svelte-template) auf GitHub.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die notwendigen Pakete mit npm:

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

> das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt deine Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
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
bun x intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **svelte-intlayer**  
  Das Paket, das Intlayer in Svelte-Anwendungen integriert. Es stellt Context-Provider und Hooks für die Internationalisierung in Svelte bereit.

- **vite-intlayer**  
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Nutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

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

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Vite-Konfiguration">

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

</Step>

<Step number={4} title="Deklarieren Sie Ihren Inhalt">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./src`) aufgenommen werden. Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={5} title="Intlayer in Ihrem Code verwenden">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Inhalt als einfachen Inhalt rendern -->
<h1>{$content.title}</h1>
<!-- Um den Inhalt editierbar mit dem Editor zu rendern -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Um den Inhalt als String zu rendern -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

</Step>

<Step number={6} title="Ändern Sie die Sprache Ihres Inhalts" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={7} title="Markdown rendern" isOptional={true}>

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

</Step>

<Step number={8} title="Einrichten des intlayer Editors / CMS" isOptional={true}>

Um den intlayer Editor einzurichten, müssen Sie der [intlayer Editor Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) folgen.

Um das intlayer CMS einzurichten, müssen Sie der [intlayer CMS Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) folgen.

</Step>

<Step number={7} title="Lokalisierte Routing zu Ihrer Anwendung hinzufügen" isOptional={true}>

Um lokalisierte Routen in Ihrer Svelte-Anwendung zu verwalten, können Sie `svelte-spa-router` zusammen mit Intlayers `localeFlatMap` verwenden, um Routen für jede Locale zu generieren.

Installieren Sie zuerst `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
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
import { useIntlayer } from "svelte-intlayer";
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

> Seit Intlayer v9 ist `intlayerProxy()` direkt im `intlayer()` Plugin gebündelt und standardmäßig über die Option `routing.enableProxy` aktiviert (`true` standardmäßig). Die separate Registrierung wie unten gezeigt ist nun optional — sie wird aus Gründen der Abwärtskompatibilität und für Setups beibehalten, die die Plugin-Reihenfolge kontrollieren müssen. Setzen Sie `routing.enableProxy: false`, um sich abzumelden. Siehe die [v9 Release Notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    svelte(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="Ändern der URL, wenn sich die Locale ändert" isOptional={true}>

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
  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="URL ändern, wenn sich die Locale ändert" isOptional={true}>

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

</Step>

<Step number={9} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Aktualisieren Sie Ihre `vite.config.ts`, um das `intlayerCompiler`-Plugin aufzunehmen:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```bash
#  Ignoriere die von Intlayer generierten Dateien
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

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Vite-und-Svelte-App zu internationalisieren?">

Vite hat keine Meinung zu i18n, sodass die Wahl aus dem Svelte-Ökosystem kommt:

- **`svelte-i18n`** und **`typesafe-i18n`**: store-basierte Message-Kataloge, global registriert.
- **`Paraglide`**: kompilierte Nachrichten, ausschließlich auf die Message-Ebene fokussiert.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert und vom Vite-Plugin zur Build-Zeit kompiliert, vollständig typisiert, mit KI-Übersetzung, visuellem Editor und CMS.

Der Vite-spezifische Gewinn ist, dass Übersetzungen zur Compile-Zeit aufgelöst und tree-shaken werden, statt zur Laufzeit als JSON abgerufen zu werden, sodass eine Seite nur die Einträge ausliefert, die sie rendert. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Svelte-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/svelte.md).

</Question>

<Question title="Kann ich von `svelte-i18n` oder `typesafe-i18n` migrieren, ohne meine Komponenten neu zu schreiben?">

Weitgehend. Folgen Sie dem [Svelte-I18n-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/svelte-i18n.md), um die Inhalte zu übernehmen. Sie können auch schrittweise migrieren: Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre vorhandenen JSON-Kataloge als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, sodass beide Ebenen synchron bleiben, während Sie Komponenten nach und nach umziehen.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Komponenten, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Schritt 10 dieses Leitfadens führt Sie hindurch.

Für eine vollständig automatisierte Pipeline macht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) dasselbe zur Build-Zeit: Er scannt Ihren JSX-, TSX-, Vue- und Svelte-Quellcode bei jeder Änderung, generiert die Wörterbücher und hält sie über Hot Module Replacement synchron, sodass es überhaupt keine von Hand zu pflegenden Schlüssel gibt.

Zwei Einschränkungen sollten Sie kennen, bevor Sie den Compiler aktivieren. Er arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, etwa API-Fehlercodes oder CMS-Felder, unerreichbar bleiben. Und er muss für den Nutzer sichtbaren Text von Anwendungslogik wie `className="active"` oder einem Statuscode unterscheiden, was in einer großen Codebasis einige Annotationen erfordert. Der [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) vermeidet beides, indem er Sie einbezieht.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Wie verwende ich übersetzten Inhalt in einer Svelte-Komponente?">

Rufen Sie `useIntlayer` in Ihrer Komponente auf und lesen Sie den zurückgegebenen Inhalt. Der Wert ist reaktiv, sodass ein Wechsel der Locale die Komponenten, die ihn verwenden, ohne Seitenneuladung neu rendert. Schritt 5 zeigt die Komponente, und Schritt 7 behandelt das Rendern von Markdown- und HTML-Inhalten.

</Question>

<Question title="Funktioniert Intlayer mit dem Vite-Dev-Server und Hot Reload?">

Ja. Das `intlayer()`-Vite-Plugin überwacht Ihre `.content.ts`-Dateien und baut die betroffenen Wörterbücher beim Speichern neu, sodass Änderungen ohne Neustart des Dev-Servers erscheinen, und die generierten Typen werden gleichzeitig neu erzeugt, sodass die Autovervollständigung synchron bleibt.

</Question>

<Question title="Wie richte ich lokalisiertes Routing ein?">

Die Schritte 7 und 8 behandeln die lokalisierten Routen und das Umschreiben der URL, wenn sich die Locale ändert, und Schritt 9 behandelt internationalisierte Links. `routing.mode` bestimmt das URL-Schema: `"prefix-no-default"` (die Voreinstellung, `/about` und `/fr/about`), `"prefix-all"`, `"no-prefix"` (aus einem Cookie, einem Header oder einer Domain aufgelöst) oder `"search-params"` (`/about?locale=fr`). Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie unterstütze ich Rechts-nach-links-Sprachen wie Arabisch oder Hebräisch?">

Schritt 9 behandelt das. `getHTMLTextDir` gibt `ltr`, `rtl` oder `auto` für eine Locale zurück, sodass Sie `lang` und `dir` am Wurzelelement aus der aktiven Locale binden und Ihre logischen CSS-Eigenschaften den Rest erledigen lassen.

</Question>

<Question title="Wie handhabe ich SEO-Metadaten in einer clientseitig gerenderten Vite-App?">

Setzen Sie `lang` und `dir` am `html`-Element aus der aktiven Locale und geben Sie `hreflang`-Alternativen für jede deklarierte Locale mit `getMultilingualUrls` aus, einschließlich `x-default`. Für Seiten, die zuverlässig gecrawlt werden müssen, bevorzugen Sie ein vorgerendertes oder serverseitig gerendertes Setup.

</Question>

<Question title="Wie übersetze ich die App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Es füllt fehlende Übersetzungen mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, und `--git-diff` beschränkt den Lauf auf die im Branch geänderten Inhalte. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und Rich Text?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden App zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
