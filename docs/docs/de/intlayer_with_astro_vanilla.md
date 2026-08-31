---
createdAt: 2026-04-24
updatedAt: 2026-08-30
title: "Astro + Vanilla JS i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Astro + Vanilla JS-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Ursprüngliche Dokumentation für Astro + Vanilla JS"
author: aymericzip
---

# Übersetzen Sie Ihre Astro + Vanilla JS Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „astro-i18n“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>

<Accordion header="Vollständige Astro-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Astro optimiert, indem es **mehrsprachiges Routing**, **Sitemap** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) erforderlich sind.

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

## Schritt-für-Schritt-Anleitung zur Konfiguration von Intlayer in Astro + Vanilla JS

Sehen Sie sich das [Anwendungstemplate](https://github.com/aymericzip/intlayer-astro-template) auf GitHub an.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

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

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer
```

- **intlayer**
  Das Kernpaket, das i18n-Tools für Konfigurationsmanagement, Übersetzungen, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **astro-intlayer**
  Enthält das Astro-Integrations-Plugin, um Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) zu verbinden, sowie die Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

- **vanilla-intlayer**
  Ein Paket zur Integration von Intlayer in Vanilla-JavaScript / TypeScript-Anwendungen. Es bietet ein Pub/Sub-Singleton (`IntlayerClient`) und Call-basierte Helfer (`useIntlayer`, `useLocale` usw.), die es ermöglichen, dass jeder Teil Ihrer Astro `<script>`-Tags auf Sprachwechsel reagiert, ohne dass ein Framework erforderlich ist.

</Step>

<Step number={2} title="Konfigurieren Sie Ihr Projekt">

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

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Astro-Konfiguration">

Fügen Sie das `intlayer`-Plugin zu Ihrer Astro-Konfiguration hinzu. Für Vanilla JS ist keine zusätzliche UI-Framework-Integration erforderlich.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Das Integrations-Plugin `intlayer()` wird verwendet, um Intlayer in Astro zu integrieren. Es sorgt für die Generierung der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Astro-Anwendung und stellt Aliase zur Optimierung der Leistung bereit.

</Step>

<Step number={4} title="Deklarieren Sie Ihren Inhalt">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      de: "Hallo Welt",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      de: "Willkommen auf meiner mehrsprachigen Astro-Website.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      de: "Sprache wechseln:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` (standardmäßig `./src`) enthalten sind und der Erweiterung der Inhaltsdeklarationsdateien (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) entsprechen.

> Weitere Informationen finden Sie in der [Inhaltsdeklarations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={5} title="Inhalt in Astro verwenden">

Bei Vanilla JS erfolgt das gesamte serverseitige Rendering direkt in den `.astro`-Dateien mit `getIntlayer`. Anschließend initialisiert ein `<script>`-Block `vanilla-intlayer` auf dem Client, um das Umschalten der Sprache zu ermöglichen.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> Wenn Sie Ihren Inhalt in einem `String`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, können Sie den Wert der Funktion wie folgt verwenden:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Hinweis zum Routing-Setup:**
> Die von Ihnen verwendete Verzeichnisstruktur hängt von der Einstellung `middleware.routing` in `intlayer.config.ts` ab:
>
> - **`prefix-no-default` (Standard):** behält die Standardsprache im Stammverzeichnis (kein Präfix) und stellt anderen Sprachen Präfixe voran. Verwenden Sie `[...locale]`, um alle Fälle abzudecken.
> - **`prefix-all`:** Alle URLs erhalten ein Sprachpräfix. Sie können das standardmäßige `[locale]` verwenden, wenn Sie den Stamm nicht separat behandeln müssen.
> - **`search-param` oder `no-prefix`:** Es werden keine Sprachverzeichnisse benötigt. Die Sprache wird über Abfrageparameter oder Cookies verwaltet.

</Step>

<Step number={6} title="Sprachumschaltung hinzufügen">

In Astro mit Vanilla JS wird der Sprachumschalter auf dem Server als normale Links gerendert und auf dem Client über einen `<script>`-Block hydriert. Wenn ein Benutzer auf einen Sprachlink klickt, setzt `vanilla-intlayer` das Sprach-Cookie über `setLocale`, bevor zur lokalisierten URL navigiert wird.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- Serverseitiges Markup aus Schritt 5 oben einbeziehen -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Intlayer auf dem Client mit der Sprache aus der aktuellen URL initialisieren
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Klickevents an die Sprachumschaltlinks binden
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Hinweis zur Beständigkeit:**
> `installIntlayer` initialisiert das Intlayer-Singleton mit der vom Server definierten Sprache. `useLocale` mit `onLocaleChange` stellt sicher, dass das Sprach-Cookie vor der Navigation über die Middleware gesetzt wird, damit die bevorzugte Sprache des Benutzers bei zukünftigen Besuchen erhalten bleibt.

> **Hinweis zur Progressive Enhancement:**
> Die Links im Sprachumschalter funktionieren auch ohne JavaScript als standardmäßige `<a>`-Tags. Wenn JavaScript verfügbar ist, aktualisieren die Aufrufe von `setLocale` das Cookie vor der Navigation, sodass die Middleware die korrekte Weiterleitung durchführen kann.

</Step>

<Step number={7} title="Sitemap und Robots.txt">

Intlayer bietet Dienstprogramme zum dynamischen Erstellen Ihrer lokalisierten Sitemap und Robots.txt-Dateien.

#### Sitemap

Intlayer wird mit einem integrierten Sitemap-Generator geliefert, mit dem Sie ganz einfach eine Sitemap für Ihre Anwendung erstellen können. Er berücksichtigt lokalisierte Routen und fügt die erforderlichen Metadaten für Suchmaschinen hinzu.

> Die von Intlayer generierte Sitemap unterstützt den `xhtml:link`-Namespace (Hreflang XML-Erweiterungen). Im Gegensatz zu Standard-Sitemap-Generatoren, die nur rohe URLs auflisten, erstellt Intlayer automatisch die erforderlichen bidirektionalen Links zwischen allen Sprachversionen einer Seite (z. B. `/about`, `/about?lang=fr` und `/about?lang=es`). Dies stellt sicher, dass Suchmaschinen die richtige Sprachversion korrekt indexieren und der richtigen Zielgruppe bereitstellen.

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

</Step>

<Step number={15} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

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

---

</Step>

</Steps>

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

Wenn Sie mehr erfahren möchten, können Sie auch den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) verwenden, um Ihre Inhalte zu externalisieren.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Astro-Website ohne UI-Framework zu internationalisieren?">

Die eingebaute `i18n`-Option von Astro kümmert sich um Locale-Präfixe und Weiterleitungen, überlässt aber den Inhalt Ihnen. Von da an:

- **Handgeschriebene Wörterbücher**, reine JSON- oder TypeScript-Objekte pro Seite importiert: keine Abhängigkeit, aber keine Typisierung, keine Pluralregeln und kein Werkzeug, um fehlende Übersetzungen zu finden.
- **`Intlayer`**: Inhalte werden neben der Seite oder Komponente deklariert, die sie rendert, zur Build-Zeit kompiliert und typisiert, mit KI-Übersetzung, Prüfungen fehlender Übersetzungen in der CI, visuellem Editor und CMS.

Ohne UI-Framework wollen Sie die Laufzeitkosten einer i18n-Bibliothek vermeiden, und Intlayer löst Inhalte zur Build-Zeit auf, sodass eine statische Astro-Seite übersetztes HTML und überhaupt kein Wörterbuch ausliefert. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Astro-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Astro-Seiten werden zur Build-Zeit gerendert, sodass sie übersetztes HTML und überhaupt kein Wörterbuch ausliefern; nur die Islands erhalten eines. Der Build-Zeit-Compiler löst die Inhaltsaufrufe zu genau den Einträgen auf, die eine Komponente verwendet, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `i18next` oder einem handgeschriebenen Wörterbuch migrieren, ohne meine Komponenten neu zu schreiben?">

Weitgehend. Folgen Sie dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md), um die Inhalte zu übernehmen. Sie können auch schrittweise migrieren: Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre vorhandenen JSON-Kataloge als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, sodass beide Ebenen synchron bleiben, während Sie Komponenten nach und nach umziehen.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Komponenten, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Schritt 15 dieses Leitfadens führt Sie hindurch.

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

<Question title="Brauche ich JavaScript auf der Seite, damit Übersetzungen funktionieren?">

Nein. Astro rendert Seiten zur Build-Zeit und Intlayer löst den Inhalt während dieses Renderings auf, sodass das generierte HTML den übersetzten Text bereits enthält. `vanilla-intlayer` wird nur für die Teile benötigt, die Sie im Browser interaktiv machen.

</Question>

<Question title="Kann ich später eine interaktive Island hinzufügen, ohne meine Inhalte zu ändern?">

Ja, und genau das ist der Sinn einer einzigen Inhaltsebene. Dieselben Deklarationen werden von `astro-intlayer` auf der Seite und von der Framework-Anbindung der jeweiligen Island gelesen, egal ob das [React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_react.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_vue.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_svelte.md), [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_solid.md), [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_preact.md) oder [Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_lit.md) ist.

</Question>

<Question title="Wie richte ich lokalisiertes Routing und einen Sprachumschalter ein?">

Schritt 6 behandelt den Umschalter. `routing.mode` bestimmt das URL-Schema: `"prefix-no-default"` (die Voreinstellung), `"prefix-all"`, `"no-prefix"` oder `"search-params"`, und `routing.domains` ordnet eine Locale ihrer eigenen Domain zu. `getLocalizedUrl` schreibt den aktuellen Pfad um, sodass der Sprachwechsel den Leser auf derselben Seite hält. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie erzeuge ich eine lokalisierte Sitemap und hreflang-Tags?">

Schritt 7 behandelt `sitemap.xml` und `robots.txt`. `getMultilingualUrls` erstellt die Alternativen für jede deklarierte Locale, einschließlich `x-default`, was Suchmaschinen verwenden, um die richtige Sprachversion einer Seite auszuliefern.

</Question>

<Question title="Wie übersetze ich die Website automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Es füllt fehlende Übersetzungen mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, und `--git-diff` beschränkt den Lauf auf die im Branch geänderten Inhalte. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und Rich Text?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) für lange Texte und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden App zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
