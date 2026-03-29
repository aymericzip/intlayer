---
createdAt: 2025-03-25
updatedAt: 2026-03-29
title: i18n Tanstack Start - Wie man eine Tanstack Start Anwendung mit Solid.js im Jahr 2026 übersetzt
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Tanstack Start Anwendung mit Intlayer und Solid.js hinzufügen. Folgen Sie diesem umfassenden Leitfaden, um Ihre App mit lokalisierungsbewusstem Routing mehrsprachig zu gestalten.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Lokalisierungs-Routing
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Hinzugefügt für Tanstack Start Solid.js"
---

# Übersetzen Sie Ihre Tanstack Start mit Solid.js Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

Dieser Leitfaden zeigt, wie man **Intlayer** für eine nahtlose Internationalisierung in Tanstack Start Projekten mit Solid.js, lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungspraktiken integriert.

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was die Autovervollständigung und Fehlererkennung verbessert.
- **Von erweiterten Funktionen profitieren**, wie dynamische Gebietsschemenerkennung und -umschaltung.
- **Lokalisierungsbewusstes Routing aktivieren** mit dem dateibasierten Routingsystem von Tanstack Start.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Tanstack Start Anwendung

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Tanstack Start? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) auf GitHub.

### Schritt 1: Projekt erstellen

Beginnen Sie mit der Erstellung eines neuen TanStack Start Projekts, indem Sie dem Leitfaden [Neues Projekt starten](https://tanstack.com/start/latest/docs/framework/solid/quick-start) auf der TanStack Start Website folgen.

### Schritt 2: Intlayer-Pakete installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **solid-intlayer**
  Das Paket, das Intlayer in Solid-Anwendungen integriert. Es bietet Kontextanbieter und Hooks für die Solid-Internationalisierung.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 3: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 4: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das Intlayer-Plugin zu Ihrer Konfiguration hinzu:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Das Vite-Plugin `intlayer()` wird verwendet, um Intlayer in Vite zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus bietet es Aliase zur Leistungsoptimierung.

### Schritt 5: Root-Layout erstellen

Konfigurieren Sie Ihr Root-Layout für die Internationalisierung, indem Sie `useMatches` verwenden, um das aktuelle Gebietsschema zu erkennen und die Attribute `lang` und `dir` für das `html`-Tag festzulegen.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Versuchen, das Gebietsschema in den Parametern eines passenden Elements zu finden
  // Dies setzt voraus, dass Sie das dynamische Segment "/{-$locale}" in Ihrem Routenbaum verwenden
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Schritt 6: Gebietsschema-Layout erstellen (Optional)

Erstellen Sie ein Layout, das das Gebietskennungs-Präfix verarbeitet und Validierungen durchführt. Dieses Layout stellt sicher, dass nur gültige Gebietsschemata verarbeitet werden.

> Dieser Schritt ist optional, wenn Sie das Gebietskennungs-Präfix nicht auf Routenebene validieren müssen.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Das Gebietskennungs-Präfix validieren
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Hier ist `{-$locale}` ein dynamischer Routenparameter, der durch das aktuelle Gebietsschema ersetzt wird. Diese Notation macht den Slot optional und ermöglicht die Nutzung von Routing-Modi wie `'prefix-no-default'` etc.

> Beachten Sie, dass dieser Slot Probleme verursachen kann, wenn Sie mehrere dynamische Segmente in der gleichen Route verwenden (z. B. `/{-$locale}/anderer-pfad/$weitererDynamischerPfad/...`).
> Für den Modus `'prefix-all'` möchten Sie den Slot möglicherweise stattdessen auf `$locale` umstellen.
> Für den Modus `'no-prefix'` oder `'search-params'` können Sie den Slot ganz entfernen.

### Schritt 7: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Ihre Inhaltsdeklarationen können an beliebiger Stelle in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./app`) enthalten sind. Und der Dateierweiterung für Inhaltsdeklarationen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) entsprechen.

> Weitere Informationen finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 8: Lokalisierungsbewusste Komponenten und Hooks verwenden

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Diese Komponente hat zwei Ziele:

- Entfernen des unnötigen `{-$locale}`-Präfixes aus der URL.
- Einfügen des Gebietsschema-Parameters in die URL, um sicherzustellen, dass der Benutzer direkt auf die lokalisierte Route weitergeleitet wird.

Anschließend können wir einen `useLocalizedNavigate`-Hook für die programmgesteuerte Navigation erstellen:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### Schritt 9: Intlayer in Ihren Seiten nutzen

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

#### Lokalisierte Startseite

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> In Solid gibt `useIntlayer` eine **Accessor-Funktion** zurück (z. B. `content()`). Sie müssen diese Funktion aufrufen, um auf den reaktiven Inhalt zuzugreifen.
>
> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useIntlayer.md).

### Schritt 10: Eine Sprachumschalter-Komponente erstellen

Erstellen Sie eine Komponente, mit der Benutzer die Sprache ändern können:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> In Solid ist `locale` aus `useLocale` ein **Signal-Accessor**. Verwenden Sie `locale()` (mit Klammern), um den aktuellen Wert reaktiv zu lesen.
>
> Um mehr über den `useLocale`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md).

### Schritt 11: Verwaltung von HTML-Attributen

Wie in Schritt 5 zu sehen ist, können Sie die Attribute `lang` und `dir` des `html`-Tags mit `useMatches` in Ihrer Root-Komponente verwalten. Dies stellt sicher, dass die korrekten Attribute auf dem Server und dem Client festgelegt werden.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Versuchen, das Gebietsschema in den Parametern einer passenden Route zu finden
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Schritt 12: Middleware hinzufügen (Optional)

Sie können auch den `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch das aktuelle Gebietsschema basierend auf der URL und setzt das entsprechende Sprach-Cookie. Wenn kein Gebietsschema angegeben ist, bestimmt das Plugin das am besten geeignete Gebietsschema basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn kein Gebietsschema erkannt wird, leitet es auf das Standardgebietsschema weiter.

> Beachten Sie, dass Sie für die Verwendung des `intlayerProxy` in der Produktion das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Der Proxy sollte vor dem Server platziert werden, wenn Sie Nitro verwenden
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Schritt 13: Internationalisieren Sie Ihre Metadaten (Optional)

Sie können auch die Funktion `getIntlayer` verwenden, um innerhalb des `head`-Loaders auf Ihre Inhaltswörterbücher für lokalisierungsbewusste Metadaten zuzugreifen:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Schritt 13: Gebietsschema in Ihren Server-Aktionen abrufen (Optional)

Möglicherweise möchten Sie auf das aktuelle Gebietsschema innerhalb Ihrer Server-Aktionen oder API-Endpunkte zugreifen.
Dies können Sie mit dem Helfer `getLocale` von `intlayer` tun.

Hier ist ein Beispiel mit den Server-Funktionen von TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Das Cookie aus der Anfrage abrufen (Standard: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Den Header aus der Anfrage abrufen (Standard: 'x-intlayer-locale')
    // Fallback-Verwendung der Accept-Language-Aushandlung
    getHeader: (name) => getRequestHeader(name),
  });

  // Einige Inhalte mit getIntlayer() abrufen
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Schritt 14: Nicht gefundene Seiten verwalten (Optional)

Wenn ein Benutzer eine nicht existierende Seite besucht, können Sie eine benutzerdefinierte 404-Seite anzeigen, und das Sprachpräfix kann beeinflussen, wie die 404-Seite ausgelöst wird.

#### Verständnis der 404-Verarbeitung von TanStack Router mit Gebietskennungs-Präfixen

In TanStack Router erfordert die Handhabung von 404-Seiten mit lokalisierten Routen einen mehrschichtigen Ansatz:

1. **Dedizierte 404-Route**: Eine spezifische Route zur Anzeige der 404-UI.
2. **Validierung auf Routenebene**: Validiert Gebietskennungs-Präfixe und leitet ungültige an 404 weiter.
3. **Catch-all-Route**: Erfasst alle nicht passenden Pfade innerhalb des Gebietskennungssegments.

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Dies erstellt eine dedizierte /[locale]/404-Route
// Sie wird sowohl als direkte Route verwendet als auch als Komponente in anderen Dateien importiert
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Separat exportiert, damit sie in notFoundComponent und Catch-all-Routen wiederverwendet werden kann
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad wird ausgeführt, bevor die Route gerendert wird (sowohl auf dem Server als auch auf dem Client)
  // Es ist der ideale Ort, um das Gebietskennungs-Präfix zu validieren
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix prüft, ob das Gebietsschema gemäß Ihrer Intlayer-Konfiguration gültig ist
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Ungültiges Sprachpräfix - Weiterleitung zur 404-Seite mit einem gültigen Sprachpräfix
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent wird aufgerufen, wenn eine untergeordnete Route nicht existiert
  // z. B. /en/nicht-existente-seite löst dies innerhalb des /en-Layouts aus
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Die $-Route (Splat/Catch-all) passt auf jeden Pfad, der nicht auf andere Routen passt
// z. B. /en/ein/tief/verschachtelter/ungueltiger/pfad
// Dies stellt sicher, dass ALLE nicht passenden Pfade innerhalb eines Gebietsschemas die 404-Seite zeigen
// Ohne dies könnten nicht passende tiefe Pfade eine leere Seite oder einen Fehler anzeigen
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (Optional) Schritt 15: Den Inhalt Ihrer Komponenten extrahieren

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um es einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation wird also permanent sein, und der Compiler überspringt die Transformation für den nächsten Prozess. Auf diese Weise kann der Compiler die Anwendung transformieren und anschließend entfernt werden.
     *
     * - Wenn `false`, injiziert der Compiler den Funktionsaufruf `useIntlayer()` nur in den Code der Build-Ausgabe und lässt die Basis-Codebasis intakt. Die Transformation erfolgt nur im Speicher.
     */
    saveComponents: false,

    /**
     * Wörterbuch-Schlüsselpräfix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation wird also permanent sein, und der Compiler überspringt die Transformation für den nächsten Prozess. Auf diese Weise kann der Compiler die Anwendung transformieren und anschließend entfernt werden.
     *
     * - Wenn `false`, injiziert der Compiler den Funktionsaufruf `useIntlayer()` nur in den Code der Build-Ausgabe und lässt die Basis-Codebasis intakt. Die Transformation erfolgt nur im Speicher.
     */
    saveComponents: false,

    /**
     * Wörterbuch-Schlüsselpräfix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation wird also permanent sein, und der Compiler überspringt die Transformation für den nächsten Prozess. Auf diese Weise kann der Compiler die Anwendung transformieren und anschließend entfernt werden.
     *
     * - Wenn `false`, injiziert der Compiler den Funktionsaufruf `useIntlayer()` nur in den Code der Build-Ausgabe und lässt die Basis-Codebasis intakt. Die Transformation erfolgt nur im Speicher.
     */
    saveComponents: false,

    /**
     * Wörterbuch-Schlüsselpräfix
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='Extract command'>

Führen Sie den Extractor aus, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

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
 <Tab value='Babel compiler'>

Aktualisieren Sie Ihre `vite.config.ts`, um das `intlayerCompiler`-Plugin einzubinden:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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
bun run build # Oder bun run dev
```

 </Tab>
</Tabs>

---

### Schritt 16: Sitemap generieren (Optional)

Intlayer wird mit einem integrierten Sitemap-Generator geliefert, mit dem Sie ganz einfach eine Sitemap für Ihre Anwendung erstellen können. Er berücksichtigt lokalisierte Routen und fügt die erforderlichen Metadaten für Suchmaschinen hinzu.

> Die von Intlayer generierte Sitemap unterstützt den `xhtml:link`-Namespace (Hreflang XML-Erweiterungen). Im Gegensatz zu Standard-Sitemap-Generatoren, die nur rohe URLs auflisten, erstellt Intlayer automatisch die erforderlichen bidirektionalen Links zwischen allen Sprachversionen einer Seite (z. B. `/about`, `/about?lang=fr` und `/about?lang=es`). Dies stellt sicher, dass Suchmaschinen die richtige Sprachversion korrekt indexieren und der richtigen Zielgruppe bereitstellen.

Um ihn zu verwenden, müssen Sie zuerst Ihre `vite.config.ts` konfigurieren, um das Vorrendern für Ihre lokalisierten Routen zu aktivieren und die standardmäßige TanStack Start Sitemap-Generierung zu deaktivieren.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... andere Imports

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... andere Plugins
    tanstackStart({
      // ... andere Konfigurationen
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Erstellen Sie dann eine Route `src/routes/sitemap[.]xml.ts`, die die Funktion `generateSitemap` verwendet:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

---

### Schritt 17: TypeScript konfigurieren (Optional)

Intlayer verwendet Modul-Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einbinden
  ],
}
```

---

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, sie in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Von Intlayer generierte Dateien ignorieren
.intlayer
```

---

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Vom VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

## Weiter gehen

Um weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) extern verwalten.

---

## Dokumentationsreferenzen

- [Intlayer-Dokumentation](https://intlayer.org)
- [Tanstack Start-Dokumentation](https://tanstack.com/start/latest)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
