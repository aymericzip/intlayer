---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - Wie man eine Astro + Lit Anwendung im Jahr 2026 übersetzt
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Astro + Lit Website mit Intlayer hinzufügen. Folgen Sie dieser Anleitung, um Ihre Website mehrsprachig zu gestalten.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Ursprüngliche Dokumentation für Astro + Lit"
---

# Übersetzen Sie Ihre Astro + Lit Website mit Intlayer | Internationalisierung (i18n)

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

## Schritt-für-Schritt-Anleitung zur Konfiguration von Intlayer in Astro + Lit

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
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  Das Kernpaket, das i18n-Tools für Konfigurationsmanagement, Übersetzungen, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **astro-intlayer**
  Enthält das Astro-Integrations-Plugin, um Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) zu verbinden, sowie die Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

- **lit**
  Das Kern-Lit-Paket zum Erstellen schneller und leichter Web Components.

- **lit-intlayer**
  Paket zur Integration von Intlayer in Lit-Anwendungen. Es bietet Hooks auf Basis eines `ReactiveController` (`useIntlayer`, `useLocale` usw.), die automatisch das Re-Rendering von LitElement auslösen, wenn sich die Sprache ändert.

- **@astrojs/lit**
  Offizielle Astro-Integration, die die Verwendung von Lit-Custom-Elements innerhalb von Astro-Seiten ermöglicht.

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

Fügen Sie das `intlayer`-Plugin und die Lit-Integration zu Ihrer Astro-Konfiguration hinzu.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Das Integrations-Plugin `intlayer()` wird verwendet, um Intlayer in Astro zu integrieren. Es sorgt für die Generierung der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Astro-Anwendung und stellt Aliase zur Optimierung der Leistung bereit.

> Die `lit()`-Integration ermöglicht es Ihnen, Lit-Custom-Elements innerhalb von Astro-Seiten zu verwenden.

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      de: "Hallo Welt",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      de: "Willkommen auf meiner mehrsprachigen Astro + Lit Website.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` (standardmäßig `./src`) enthalten sind und der Erweiterung der Inhaltsdeklarationsdateien (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) entsprechen.

> Weitere Informationen finden Sie in der [Inhaltsdeklarations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 5: Inhalt in Astro verwenden

Sie können die Wörterbücher direkt in Ihren `.astro`-Dateien verwenden, indem Sie die von `intlayer` exportierten Kern-Helfer nutzen. Sie sollten außerdem SEO-Metadaten (wie hreflang und Canonical-Links) zu jeder Seite hinzufügen. Lit-Custom-Elements werden über ein Client-`<script>` importiert und im Body platziert.

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

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Canonical Link -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang Links -->
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
    <!-- Lit Custom Element — erhält die vom Server erkannte Sprache als Property -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **Hinweis zum Routing-Setup:**
> Die von Ihnen verwendete Verzeichnisstruktur hängt von der Einstellung `middleware.routing` in `intlayer.config.ts` ab:
>
> - **`prefix-no-default` (Standard):** behält die Standardsprache im Stammverzeichnis (kein Präfix) und stellt anderen Sprachen Präfixe voran. Verwenden Sie `[...locale]`, um alle Fälle abzudecken.
> - **`prefix-all`:** Alle URLs erhalten ein Sprachpräfix. Sie können das standardmäßige `[locale]` verwenden, wenn Sie den Stamm nicht separat behandeln müssen.
> - **`search-param` oder `no-prefix`:** Es werden keine Sprachverzeichnisse benötigt. Die Sprache wird über Abfrageparameter oder Cookies verwaltet.

### Schritt 6: Erstellen Sie ein Lit-Custom-Element

Erstellen Sie ein Lit-Custom-Element. Rufen Sie `installIntlayer` im `connectedCallback` unter Verwendung des serverbasierten `locale`-Attributs auf, um das clientseitige Übersetzungssingleton zu initialisieren.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Mit der vom Server erkannten Sprache initialisieren
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Sprachumschalter wird innerhalb von LitElement gerendert -->
        <div class="locale-switcher">
          <span class="switcher-label">Sprache wechseln:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> Das Attribut `locale` wird von der Astro-Seite (Server-Erkennung) übergeben und zur Initialisierung von `installIntlayer` im `connectedCallback` verwendet, was die Ausgangssprache für alle `ReactiveController`-Hooks innerhalb des Elements bestimmt.

> `useIntlayer` wird als `ReactiveController` registriert. Es fordert automatisch ein Re-Rendering des Elements an, wenn sich die Sprache ändert, sodass keine zusätzliche Subscription-Logik erforderlich ist.

### Schritt 7: Fügen Sie einen Sprachumschalter hinzu

Die Funktionalität zum Sprachwechsel ist direkt in der `render()`-Methode des Lit-Custom-Elements integriert (siehe Schritt 6 oben). Sie verwendet `useLocale` von `lit-intlayer` und navigiert bei Auswahl einer neuen Sprache durch den Benutzer zur lokalisierten URL:

```typescript fileName="src/components/lit/LitDemo.ts"
// Innerhalb der LitElement-Klasse, nach der Konfiguration von useLocale in Schritt 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Bei Sprachwechsel zur lokalisierten URL navigieren
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Sprache wechseln:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Hinweis zur Lit-Reaktivität:**
> `useLocale` gibt einen `ReactiveController` zurück. Wenn `setLocale` aufgerufen wird, fordert der Controller automatisch ein Re-Rendering an, wodurch der Status des aktiven Buttons ohne manuelle DOM-Manipulation aktualisiert wird.

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

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript-Konfiguration

Intlayer verwendet die Modulerweiterung (Module Augmentation), um TypeScript zu nutzen und Ihre Codebasis robuster zu machen. Wenn Sie die Decorator-Syntax verwenden, stellen Sie sicher, dass Sie `experimentalDecorators` in Ihren Compiler-Optionen aktivieren.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Erforderlich für die Decorator-Unterstützung in Lit
  },
  include: [
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
