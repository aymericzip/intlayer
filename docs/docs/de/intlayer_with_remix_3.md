---
createdAt: 2026-09-09
updatedAt: 2026-09-11
title: "Remix 3 i18n - Vollständige Anleitung zur Übersetzung Ihrer App"
description: "Vergessen Sie i18next. Der Leitfaden 2026 zur Erstellung einer mehrsprachigen (i18n) Remix 3-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Leistung."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Webstandards
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Erste Dokumentation für Remix 3"
author: aymericzip
---

# Übersetzen Sie Ihre Remix 3-Website mit Intlayer | Internationalisierung (i18n)

Dieser Leitfaden zeigt, wie Sie **Intlayer** für eine nahtlose Internationalisierung in **Remix 3**-Anwendungen integrieren, einschließlich sprachsensitiver Routenführung, typsicherer Inhaltsdeklarationen, serverseitig gerenderter JSX-Komponenten und plattformübergreifender Unterstützung für Node.js, Bun, Deno und Cloudflare Workers.

## Was ist Remix 3?

**Remix 3** stellt einen grundlegenden architektonischen Wandel hin zu einem **zusammensetzbaren, runtime-agnostischen Web-Framework dar, das vollständig auf Webstandards aufbaut**. Anstatt an bestimmte Bundler oder proprietäre Server-APIs gebunden zu sein, wird Remix 3 in Form von eigenständigen, zusammensetzbaren Paketen bereitgestellt:

- **`remix/fetch-router`** (oder `remix/router`): Schlankes, standardkonformes Routing auf Basis der Fetch-API (`Request` und `Response`).
- **`remix/ui`**: Ein JSX-Komponentenmodell (`jsxImportSource: "remix/ui"`). Eine Komponente ist eine Setup-Funktion, die eine Render-Funktion zurückgibt, ähnlich wie React, aber der Zustand verbleibt in einfachen JavaScript-Closures.
- **`remix/middleware/render`**: Richtet `context.render(<Page />)` für jeden Request ein und streamt den JSX-Baum in eine HTML-`Response`.
- **`remix/node-fetch-server`**: Server-Adapter für Node.js mit nativer Unterstützung für Bun, Deno und Edge-Runtimes.
- **`remix/cookie`**: Kryptografisch sicheres Parsen und Serialisieren von Cookies.

In Kombination mit **Intlayer** erhalten Sie ein umfassendes Internationalisierungssystem mit Sicherheit zur Build-Zeit, automatisierten KI-Übersetzungen, Server-Rendering ohne Overhead und nahtlosem Locale-Routing.

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen wählen?

Im Vergleich zu herkömmlichen Lösungen wie `i18next` oder maßgeschneiderten Übersetzungs-Ladern bietet Intlayer eine integrierte Entwicklererfahrung, die für moderne Webarchitekturen optimiert ist:

<AccordionGroup>
<Accordion header="Vollständige Unterstützung für Remix 3 und Webstandards">

Intlayer wurde entwickelt, um nativ mit Webstandards (`Request`, `Response`, `Headers` und `URL`) zusammenzuarbeiten. Es lässt sich über eine schlanke Middleware mühelos in den Fetch-Router von Remix 3 integrieren und extrahiert Sprachen aus URL-Pfaden, Cookies oder `Accept-Language`-Headern, ohne Sie an eine bestimmte Runtime zu binden.

</Accordion>
<Accordion header="Typsichere Inhaltsdeklarationen">

Keine ungetypten JSON-Schlüssel und keine Abstürze zur Laufzeit durch fehlende Übersetzungen mehr. Intlayer erzwingt TypeScript-Prüfungen über alle deklarierten Sprachen hinweg und warnt Sie bereits beim Kompilieren, falls ein Text fehlt oder ungültig ist.

</Accordion>
<Accordion header="Kein Bundle-Overhead auf dem Server">

Remix 3 rendert JSX-Komponenten auf dem Server und streamt das HTML an den Client. Nur der aufgelöste Text für die angeforderte Sprache wird in den Ausgabestrom geschrieben. Es sind keine Client-Hydration-Bundles oder umfangreichen Übersetzungskataloge erforderlich, es sei denn, eine Komponente ist explizit als `clientEntry` deklariert.

</Accordion>
<Accordion header="Bereit für KI-Agenten und Automatisierung">

Intlayer platziert Inhaltsdeklarationen (`.content.ts`) direkt neben Ihrer Routenlogik und reduziert so den für Large Language Models (LLMs) erforderlichen Token-Kontext. Integrierte CLI-Befehle wie `intlayer fill` und `intlayer test` ermöglichen die Automatisierung von Übersetzungen in CI/CD-Pipelines zu den reinen Kosten Ihres KI-Anbieters.

</Accordion>
<Accordion header="Visueller Editor und CMS-Integration">

Über Code-basierte Workflows hinaus bietet Intlayer einen selbst gehosteten [Visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und ein [Remote CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), mit denen Redakteure und Übersetzer Inhalte ohne erneutes Deployment anpassen können.

</Accordion>
</AccordionGroup>

## Schritt-für-Schritt-Anleitung

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Sehen Sie sich die [Anwendungsvorlage](https://github.com/aymericzip/intlayer-remix-3-template) auf GitHub an.

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie `intlayer` und `remix` (Version 3) mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Internationalisierungs-Kernengine für Konfigurationsverwaltung, Wörterbuch-Deklaration (`t()`, `Dictionary`), CLI-Tools und Laufzeit-Interpreter.
- **`remix`**: Das einheitliche Remix 3 Framework-Paket mit Exporten für `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` und `remix/node-fetch-server`.

</Step>
<Step number={2} title="Intlayer konfigurieren">

Erstellen Sie eine Datei `intlayer.config.ts` im Stammverzeichnis Ihres Projekts, um Ihre unterstützten Sprachen und Internationalisierungseinstellungen zu definieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Weitere Konfigurationsoptionen finden Sie in der [Dokumentation zur Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>
<Step number={3} title="Mehrsprachige Inhalte deklarieren">

Deklarieren Sie Ihre lokalisierten Inhalte in einer `.content.ts`-Datei:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      de: "Willkommen bei Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      de: "Eine zusammensetzbare Anwendung auf Basis offener Webstandards mit nativer i18n.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      de: "Sprache wechseln:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer unterstützt auch JSON-, YAML- und CommonJS-Formate. Siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>
<Step number={4} title="Intlayer-Wörterbücher erstellen">

Kompilieren Sie die Inhaltsdeklarationen, um TypeScript-Typen und Laufzeit-Registries zu generieren:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Dies kompiliert Ihre Inhalte in das Artefakt-Verzeichnis `.intlayer` und ermöglicht vollständige TypeScript-Autovervollständigung sowie schnelle Wörterbuch-Abfragen.

</Step>
<Step number={5} title="Intlayer-Middleware implementieren">

Remix 3 bietet eine zusammensetzbare Middleware-Pipeline über `createRouter({ middleware: [...] })`.

Erstellen Sie eine Intlayer-Middleware, die die Sprache jeder eingehenden Anfrage auflöst nach:

1. Dem URL-Pfadpräfix über Intlayers `getLocaleFromPath` (z. B. `/de` oder `/fr`).
2. Dem Intlayer-Hilfsprogramm `getLocale`, das Cookies (`INTLAYER_LOCALE`), benutzerdefinierte Header (`x-intlayer-locale`), standardmäßige `Accept-Language`-Header und Ihre `defaultLocale` abgleicht.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Typsicherer Kontextschlüssel zum Abrufen der aufgelösten Sprache aus dem Remix 3 RequestContext.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Intlayer-Middleware für Remix 3.
 *
 * Löst die Sprache der Anfrage nach folgender Priorität auf:
 * 1. URL-Pfadpräfix (z. B. `/de/...`) über `getLocaleFromPath`
 * 2. Header- und Speicherverhandlung über `getLocale` (Cookie, benutzerdefinierter Header, Accept-Language, Fallback defaultLocale)
 *
 * Hängt die aufgelöste Sprache an den Remix 3 RequestContext an.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Pfaderkennung (/de/about -> "de", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Aufgelöste Sprache an Remix 3 RequestContext anhängen
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Aufgelöste Sprache an Remix 3 RequestContext anhängen
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Typsichere Routen definieren">

Definieren Sie Ihre Anwendungsrouten mit `route()` aus `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Standard-Locale-Route
  home: "/",

  // Lokalisierte Route mit dynamischem :locale-Segment
  localizedHome: "/:locale",
});
```

Die Verwendung von `route()` bietet eine typsichere URL-Generierung in Ihrer gesamten Anwendung:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "de" }); // "/de"
```

</Step>
<Step number={7} title="Lokalisierte Seiten mit JSX rendern">

Remix 3 rendert die Benutzeroberfläche mit JSX-Komponenten aus `remix/ui`. Eine Komponente ist eine **Setup-Funktion**, die ein `Handle` empfängt und eine **Render-Funktion** zurückgibt. Das Setup wird einmal pro Instanz ausgeführt, das Rendering bei jeder Aktualisierung, und Props werden über `handle.props` gelesen.

Beginnen Sie mit einer gemeinsamen `Document`-Shell, die die Attribute `<html lang="..." dir="...">` anhand der aufgelösten Sprache festlegt:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, type Locale } from "intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  locale: Locale;
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { locale, title, children } = handle.props;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Erstellen Sie anschließend die Startseite. Sie liest das lokalisierte Wörterbuch mit `getIntlayer` aus und zeigt einen Sprachumschalter an:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { Handle } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

type HomePageProps = {
  locale: Locale;
};

export const HomePage = (handle: Handle<HomePageProps>) => () => {
  const { locale } = handle.props;
  const home = getIntlayer("home", locale);

  return (
    <Document locale={locale} title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          {locales.map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <a
                key={targetLocale}
                href={getLocalizedPath(routes.home.href(), targetLocale)}
                class={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleName(targetLocale, locale)}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix-JSX ist nicht React: Es gibt keine Hooks, `class` wird direkt geschrieben (`className` wird ebenfalls akzeptiert) und erneute Render-Vorgänge werden explizit mit `handle.update()` ausgelöst. Interpolierte Werte werden automatisch maskiert.

</Step>
<Step number={8} title="Router und Server verbinden">

Fügen Sie die `render()`-Middleware aus `remix/middleware/render` neben der Intlayer-Middleware hinzu. Sie richtet `context.render(node, init)` für jeden Request ein und streamt den JSX-Baum in eine HTML-`Response` (stellt `<!DOCTYPE html>` voran und setzt den `Content-Type`-Header):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Router mit Intlayer + render Middleware initialisieren
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Routen-Handler zuordnen
router.map(routes, {
  actions: {
    // Route für Standard-Sprache
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // Lokalisierte Route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render` akzeptiert ein optionales `ResponseInit` als zweites Argument, z. B. `context.render(<NotFoundPage locale={locale} />, { status: 404 })`.

Stellen Sie den Router abschließend über einen standardmäßigen `fetch`-Handler bereit. Derselbe Router läuft auf Node.js, Bun, Deno und Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Übersetzungen prüfen und automatisch ausfüllen">

Intlayer bietet eine CLI, um fehlende Übersetzungen zu prüfen und automatisch per KI zu ergänzen:

```bash packageManager="npm"
# Fehlende Übersetzungen prüfen
npx intlayer test

# Fehlende Übersetzungen mit KI ergänzen
npx intlayer fill
```

```bash packageManager="pnpm"
# Fehlende Übersetzungen prüfen
pnpm dlx intlayer test

# Fehlende Übersetzungen mit KI ergänzen
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Fehlende Übersetzungen prüfen
yarn dlx intlayer test

# Fehlende Übersetzungen mit KI ergänzen
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Fehlende Übersetzungen prüfen
bun x intlayer test

# Fehlende Übersetzungen mit KI ergänzen
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript-Konfiguration

Legen Sie JSX auf die `remix/ui`-Runtime fest und stellen Sie sicher, dass Ihre `tsconfig.json` die generierten `.intlayer`-Typen enthält:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` sorgt dafür, dass `<HomePage />` mit `createElement` von Remix anstelle von React aufgelöst wird.

## Fazit

Mit Remix 3 und Intlayer verfügen Sie über einen schlanken, vollständig typisierten und plattformunabhängigen Stack, der auf offenen Webstandards basiert. Ihre Anwendung lässt sich mühelos von einfachen lokalisierten Marketingseiten bis hin zu global verteilten, am Edge gerenderten Diensten skalieren.
