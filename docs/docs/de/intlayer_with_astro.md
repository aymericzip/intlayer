---
createdAt: 2024-03-07
updatedAt: 2026-09-21
title: "Astro i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Astro-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer / useLocale Hooks und die Astro.locals Middleware zu astro-intlayer hinzugefügt"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init-Befehl hinzufügen"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Aktualisierung der Astro-Integration, Konfiguration und Verwendung"
author: aymericzip
---

# Übersetzen Sie Ihre Astro-Website mit Intlayer | Internationalisierung (i18n)

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

## Schritt-für-Schritt-Anleitung zur Konfiguration von Intlayer in Astro

Sehen Sie sich das [Anwendungstemplate](https://github.com/aymericzip/intlayer-astro-template) auf GitHub an.

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt deine Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  Das Kernpaket, das i18n-Tools für Konfigurationsmanagement, Übersetzungen, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **astro-intlayer**
  Enthält das Astro-Integrations-Plugin zur Einbindung von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production), eine Middleware, die das Gebietsschema jeder Anfrage in `Astro.locals.intlayer` auflöst, sowie die Hooks `useIntlayer` / `useDictionary` / `useLocale`. Derselbe Importpfad löst im `.astro`-Frontmatter zur Server-Implementierung und in `<script>`-Blöcken zur Client-Implementierung (unterstützt durch `vanilla-intlayer`) auf.

</Step>
<Step number={2} title="Konfigurieren Sie Ihr Projekt">

### Architektur

In dieser Architektur erstellt die in `astro.config.ts` registrierte `intlayer()`-Integration Ihre Wörterbücher und fügt eine Middleware hinzu, die das Gebietsschema jeder Anfrage auflöst und unter `Astro.locals.intlayer` bereitstellt. Seiten befinden sich unter einem Rest-Segment `src/pages/[...locale]/`, sodass das Standard-Gebietsschema ohne Präfix bereitgestellt wird und jedes andere Gebietsschema eine eigene dedizierte URL erhält. `.astro`-Dateien lesen den Inhalt mit den `useIntlayer` / `useLocale`-Hooks von `astro-intlayer`, und Inhaltsdeklarationen werden neben Ihren Komponenten in `src/` abgelegt.

```bash
.
├── src
│   ├── app.content.tsx               # App content declaration
│   ├── components
│   │   └── LocaleSwitcher.astro      # Locale switcher component
│   └── pages
│       ├── [...locale]
│       │   └── index.astro           # Localized page (rest param also serves the default locale)
│       ├── robots.txt.ts             # robots.txt endpoint
│       └── sitemap.xml.ts            # Localized sitemap endpoint
├── astro.config.ts                   # Astro config with the intlayer() integration
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Konfiguration

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu definieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
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

Fügen Sie das `intlayer`-Plugin zu Ihrer Astro-Konfiguration hinzu.

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

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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

> Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` (standardmäßig `./src`) enthalten sind und der Erweiterung der Inhaltsdeklarationsdateien (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) entsprechen.

> Weitere Informationen finden Sie in der [Inhaltsdeklarations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>
<Step number={5} title="Inhalt in Astro verwenden">

Verwenden Sie Ihre Wörterbücher in `.astro`-Dateien mit den von `astro-intlayer` exportierten Hooks. Sie teilen die Signaturen von `react-intlayer`: `useIntlayer("key")` gibt den Inhalt eines Wörterbuchs zurück und `useLocale()` das aktuelle Gebietsschema, ohne dass Argumente übergeben werden müssen.

Das Gebietsschema stammt von der `astro-intlayer`-Middleware, die die Integration vor Ihrer eigenen `src/middleware.ts` registriert. Sie löst es für jede Anfrage auf, aus dem URL-Präfix, dann dem vom Client gespeicherten Gebietsschema (Cookie oder Header), dann `Accept-Language`, und speichert es in `Astro.locals.intlayer`. Vorgerenderte Seiten verwenden nur die URL, da sie einmal für jeden Besucher gerendert werden.

Sie sollten auch SEO-Metadaten wie hreflang und kanonische Links zu jeder Seite hinzufügen und einen Sprachumschalter einbinden, damit Benutzer die Sprache wechseln können.

```astro fileName="src/pages/index.astro"
---
import { useIntlayer, useLocale } from "astro-intlayer";
import {
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Vom Middleware aufgelöstes Gebietsschema (z. B. /de/about -> 'de')
const { locale } = useLocale();

// Inhalt des 'app'-Wörterbuchs für dieses Gebietsschema
const { title } = useIntlayer("app");
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
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

    <!-- x-default: Fallback for users in unmatched languages -->
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
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

> `Astro.locals.intlayer` stellt auch `locale`, `defaultLocale` und `availableLocales` für Ihre eigenen Middlewares und Endpunkte bereit. Übergeben Sie ein Gebietsschema oder einen Selektor als zweites Argument (`useIntlayer("app", "fr")`, `useIntlayer("faq", { item: 2 })`), um das Anfrage-Gebietsschema für einen Aufruf zu überschreiben.

</Step>
<Step number={6} title="Lokalisiertes Routing">

Erstellen Sie dynamische Pfadsegmente, um lokalisierte Seiten bereitzustellen (z. B. `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Die Astro-Integration fügt eine Vite-Middleware hinzu, die beim sprachsensitiven Routing und bei den Umgebungsdefinitionen während der Entwicklung hilft. Sie können auch sprachübergreifende Links mit Ihrer eigenen Logik oder `intlayer`-Tools wie `getLocalizedUrl` erstellen.

</Step>
<Step number={7} title="Sprachumschalter hinzufügen">

Um Benutzern den Wechsel zwischen Sprachen zu ermöglichen, können Sie eine `LocaleSwitcher`-Komponente erstellen. Diese Komponente sollte eine Liste aller unterstützten Sprachen anzeigen und auf dieselbe Seite in jeder Sprache verlinken.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav aria-label="Languages">
  <ul>
    {
      availableLocales.map((localeItem) => (
        <li key={localeItem} class="p-1">
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            data-locale={localeItem}
            aria-current={localeItem === locale ? "page" : undefined}
          >
            {getLocaleName(localeItem)}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<script>
  // Im Browser löst derselbe Import zur Client-Implementierung auf
  import { useLocale } from "astro-intlayer";
  import { getLocalizedUrl, type LocalesValues } from "intlayer";

  // Speichert die Auswahl im Locale-Cookie und navigiert dann zur lokalisierten URL
  const { setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      event.preventDefault();
      setLocale(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **Hinweis zur Persistenz:**
> `setLocale` aus dem clientseitigen `useLocale` speichert die Sprachpräferenz des Nutzers in einem Cookie. Dies ermöglicht es Intlayer, die Auswahl zu speichern und den Nutzer bei zukünftigen Besuchen automatisch zu seiner bevorzugten Sprache weiterzuleiten: On-Demand gerenderte Seiten (ein Adapter mit `output: 'server'` oder `prerender = false`) werden von der Intlayer-Middleware weitergeleitet, bevor HTML gesendet wird, während vorgerenderte Seiten, die als statische Dateien bereitgestellt werden, durch ein kleines Skript weitergeleitet werden, das die Integration in jede Seite einfügt. Setzen Sie `routing.enableProxy` auf `false`, um beides zu deaktivieren. In `astro dev` wird das Cookie als Weiterleitungsquelle ignoriert, es sei denn, `routing.enableProxy` ist auf `true` gesetzt, sodass ein veraltetes Cookie die Seiten, an denen Sie arbeiten, nicht kapern kann.
>
> **Server- / Client-Interkompatibilität:**
> `astro-intlayer` löst im Frontmatter (beim Lesen von `Astro.locals`) zu seinen Server-Hooks auf und in `<script>`-Blöcken sowie Inseln (Islands) zu den Client-Hooks von `vanilla-intlayer`, mit identischen Namen und Inhaltsstrukturen. `setLocale` und `onChange` wirken nur auf dem Client, rufen Sie dort einmal `installIntlayer()` auf, um den Client-Store zu initialisieren. `astro-intlayer/client` stellt den Client-Einstiegspunkt explizit bereit.

</Step>
<Step number={8} title="Sitemap und Robots.txt">

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

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, {
    siteUrl: "https://example.com",
  });

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
<Step number={9} title="Verwenden Sie weiterhin Ihre bevorzugten Frameworks">

Bauen Sie Ihre Anwendung mit dem Framework Ihrer Wahl weiter auf.

- Intlayer + React: [Intlayer mit React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_react.md)
- Intlayer + Vue: [Intlayer mit Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_vue.md)
- Intlayer + Svelte: [Intlayer mit Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_svelte.md)
- Intlayer + Solid: [Intlayer mit Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_solid.md)
- Intlayer + Preact: [Intlayer mit Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_preact.md)
- Intlayer + Lit: [Intlayer mit Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_lit.md)
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

Bauen Sie Ihre Anwendung, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren

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

### TypeScript-Konfiguration

Intlayer verwendet die Modulerweiterung (Module Augmentation), um TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

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

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur VS Code Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md).

### Vertiefen Sie Ihr Wissen

Wenn Sie mehr erfahren möchten, können Sie auch den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) verwenden, um Ihre Inhalte zu externalisieren.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Astro-Website zu internationalisieren?">

Astro liefert eine `i18n`-Option auf Routing-Ebene mit, die sich um Locale-Präfixe und Weiterleitungen kümmert, aber den Inhalt selbst nicht verwaltet, sodass Sie weiterhin eine Message-Ebene brauchen:

- **Astros eingebautes `i18n`** plus handgeschriebene JSON- oder TypeScript-Wörterbücher: keine Abhängigkeit, aber keine Typisierung, keine Pluralregeln und keine Werkzeuge.
- **`i18next`** oder **`vue-i18n` / `svelte-i18n`** innerhalb von Islands: eine vollständige Bibliothek pro Island-Framework, jede mit ihrem eigenen Katalog.
- **`Intlayer`**: eine Inhaltsebene, die von Astro-Seiten und jedem Island-Framework geteilt wird, zur Build-Zeit kompiliert, vollständig typisiert, mit KI-Übersetzung, visuellem Editor und CMS.

Der Astro-spezifische Gewinn ist, dass dasselbe Wörterbuch eine `.astro`-Seite und eine React-, Vue-, Svelte-, Solid-, Preact- oder Lit-Island bedient, statt einer i18n-Bibliothek pro Island-Runtime. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).

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
<Question title="Funktioniert Intlayer innerhalb von Astro-Islands?">

Ja. `astro-intlayer` deckt die `.astro`-Seite ab, und jedes Island-Framework hat seine eigene Anbindung, sodass eine Island die aktive Locale von der Seite erhält, statt sie erneut aufzulösen. Es gibt eigene Leitfäden für [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_vue.md) und [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_astro_svelte.md), unter anderem.

</Question>
<Question title="Wird der übersetzte Inhalt als statisches HTML ausgeliefert?">

Ja. Astro rendert Seiten standardmäßig zur Build-Zeit, und Intlayer löst Inhalte während dieses Renderings auf, sodass lokalisierte Seiten reines statisches HTML sind. Nur Islands, die die Locale zur Laufzeit wechseln müssen, erhalten ein Wörterbuch, und nur für die Locale, die sie rendern.

</Question>
<Question title="Wie richte ich lokalisiertes Routing und einen Sprachumschalter ein?">

Schritt 6 und Schritt 7 dieses Leitfadens behandeln das. `routing.mode` steuert, ob die Standard-Locale ein Präfix erhält (`"prefix-no-default"`), ob jede Locale eines erhält (`"prefix-all"`) oder ob die Locale außerhalb des Pfads liegt (`"no-prefix"` oder `"search-params"`). `getLocalizedUrl` schreibt den aktuellen Pfad in die Zielsprache um, sodass ein Umschalter den Leser auf derselben Seite hält.

</Question>
<Question title="Wie erzeuge ich eine lokalisierte Sitemap und hreflang-Tags?">

Schritt 8 behandelt `sitemap.xml` und `robots.txt`. `getMultilingualUrls` erstellt die Alternativen für jede deklarierte Locale, einschließlich `x-default`, was Suchmaschinen verwenden, um die richtige Sprachversion einer Seite auszuliefern.

</Question>
<Question title="Wie übersetze ich eine Astro-Website automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Es füllt fehlende Übersetzungen mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, und `--git-diff` beschränkt den Lauf auf die im Branch geänderten Inhalte. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>
<Question title="Unterstützt Intlayer Pluralformen, Genus und Markdown-Inhalte?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md) und [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md), was in Astro für lange Seiten praktisch ist. [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) übernehmen Zahlen, Daten und Währungen.

</Question>
<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden App zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>
<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
