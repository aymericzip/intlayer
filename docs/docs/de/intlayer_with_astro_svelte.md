---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Svelte i18n - Wie man eine Astro + Svelte Anwendung im Jahr 2026 übersetzt
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Astro + Svelte Website mit Intlayer hinzufügen. Folgen Sie dieser Anleitung, um Ihre Website mehrsprachig zu gestalten.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Ursprüngliche Dokumentation für Astro + Svelte"
---

# Übersetzen Sie Ihre Astro + Svelte Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten**: Deklarative Wörterbücher auf Komponentenebene verwenden.
- **Metadaten, Routing und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen**: Mit automatisch generierten Typen für bessere Autovervollständigung und Fehlererkennung.
- **Von erweiterten Funktionen profitieren**: Wie dynamische Spracherkennung und Sprachwechsel.

---

## Schritt-für-Schritt-Anleitung zur Konfiguration von Intlayer in Astro + Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Sehen Sie sich das [Anwendungstemplate](https://github.com/aymericzip/intlayer-astro-template) auf GitHub an.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

bun x intlayer init
```

- **intlayer**
  Das Kernpaket, das i18n-Tools für Konfigurationsmanagement, Übersetzungen, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **astro-intlayer**
  Enthält das Astro-Integrations-Plugin, um Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) zu verbinden, sowie die Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

- **svelte**
  Das Kern-Svelte-Paket.

- **svelte-intlayer**
  Paket zur Integration von Intlayer in Svelte-Anwendungen. Es stellt `setupIntlayer` sowie die Stores `useIntlayer` und `useLocale` für die Internationalisierung in Svelte bereit.

- **@astrojs/svelte**
  Offizielle Astro-Integration, die die Verwendung von Svelte-Komponenten-Islands ermöglicht.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu definieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.GERMAN,
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, Speicherort und Erweiterungen der Inhaltsdeklarationen konfigurieren, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Astro-Konfiguration

Fügen Sie das `intlayer`-Plugin und die Svelte-Integration zu Ihrer Astro-Konfiguration hinzu.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> Das Integrations-Plugin `intlayer()` wird verwendet, um Intlayer in Astro zu integrieren. Es sorgt für die Generierung der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Astro-Anwendung und stellt Aliase zur Optimierung der Leistung bereit.

> Die `svelte()`-Integration ermöglicht es Ihnen, Svelte-Komponenten-Islands über `client:only="svelte"` zu verwenden.

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      de: "Hallo Welt",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` (standardmäßig `./src`) enthalten sind und der Erweiterung der Inhaltsdeklarationsdateien (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) entsprechen.

> Weitere Informationen finden Sie in der [Inhaltsdeklarations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 5: Inhalt in Astro verwenden

Sie können die Wörterbücher direkt in Ihren `.astro`-Dateien verwenden, indem Sie die von `intlayer` exportierten Kern-Helfer nutzen. Sie sollten außerdem SEO-Metadaten (wie hreflang und Canonical-Links) zu jeder Seite hinzufügen und ein Svelte-Island für interaktive clientseitige Inhalte einführen.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical Link: Informiert Suchmaschinen über die Hauptversion dieser Seite -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Informiert Google über alle lokalisierten Versionen -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback-Option, wenn die Sprache nicht mit der des Benutzers übereinstimmt -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Das Svelte-Island rendert alle interaktiven Inhalte, einschließlich des Sprachumschalters -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> **Hinweis zum Routing-Setup:**
> Die von Ihnen verwendete Verzeichnisstruktur hängt von der Einstellung `middleware.routing` in `intlayer.config.ts` ab:
>
> - **`prefix-no-default` (Standard):** behält die Standardsprache im Stammverzeichnis (kein Präfix) und stellt anderen Sprachen Präfixe voran. Verwenden Sie `[...locale]`, um alle Fälle abzudecken.
> - **`prefix-all`:** Alle URLs erhalten ein Sprachpräfix. Sie können das standardmäßige `[locale]` verwenden, wenn Sie den Stamm nicht separat behandeln müssen.
> - **`search-param` oder `no-prefix`:** Es werden keine Sprachverzeichnisse benötigt. Die Sprache wird über Abfrageparameter oder Cookies verwaltet.

### Schritt 6: Erstellen Sie eine Svelte-Island-Komponente

Erstellen Sie eine Island-Komponente, die Ihre Svelte-Anwendung umschließt. Sie müssen `setupIntlayer` mit der vom Server erkannten Sprache aufrufen, bevor Sie auf Stores zugreifen.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- Sprachumschalter wird direkt im Island gerendert -->
  <div class="locale-switcher">
    <span class="switcher-label">Sprache wechseln:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> Das Attribut `locale` wird von der Astro-Seite (Server-Erkennung) übergeben und zur Initialisierung von `setupIntlayer` verwendet, was die Ausgangssprache für alle Stores im Komponentenbaum bestimmt.

### Schritt 7: Fügen Sie einen Sprachumschalter hinzu

Die Funktionalität des Sprachumschalters ist direkt im Svelte-Island integriert (siehe Schritt 6 oben). Sie verwendet den `useLocale`-Store von `svelte-intlayer` und navigiert bei Auswahl einer neuen Sprache durch den Benutzer zur lokalisierten URL:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // Gleiche Locale/setupIntlayer Konfiguration wie in Schritt 6 gezeigt wiederverwenden...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Bei Sprachwechsel zur lokalisierten URL navigieren
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">Sprache wechseln:</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **Hinweis zur Beständigkeit:**
> Die Verwendung von `onLocaleChange` zur Weiterleitung über `window.location.href` stellt sicher, dass die URL der neuen Sprache besucht wird, sodass die Intlayer-Middleware das Sprach-Cookie setzen kann und die Präferenz des Benutzers bei zukünftigen Besuchen erhalten bleibt.

### Schritt 8: Sitemap und Robots.txt

Intlayer bietet Dienstprogramme zum dynamischen Erstellen Ihrer lokalisierten Sitemap und Robots.txt-Dateien.

#### Sitemap

Erstellen Sie `src/pages/sitemap.xml.ts`, um eine Sitemap zu generieren, die alle Ihre lokalisierten Routen enthält.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Erstellen Sie `src/pages/robots.txt.ts`, um das Crawling durch Suchmaschinen zu steuern.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript-Konfiguration

Intlayer verwendet die Modulerweiterung (Module Augmentation), um TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehende TypeScript-Konfiguration
  "include": [
    // ... Ihre bestehende TypeScript-Konfiguration
    ".intlayer/**/*.ts", // Automatisch generierte Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, von Intlayer generierte Dateien zu ignorieren. Dies verhindert, dass sie in Ihr Git-Repository eingecheckt werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```bash
# Von Intlayer generierte Dateien ignorieren
.intlayer
```

### VS Code Erweiterung

Um Ihr Entwicklungserlebnis mit Intlayer zu verbessern, können Sie die **offizielle Intlayer VS Code Erweiterung** installieren.

[Installation über den VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschau** von übersetzten Inhalten.
- **Schnelle Aktionen** zum einfachen Erstellen und Aktualisieren von Übersetzungen.

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Vertiefen Sie Ihr Wissen

Wenn Sie mehr erfahren möchten, können Sie auch den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) verwenden, um Ihre Inhalte zu externalisieren.
