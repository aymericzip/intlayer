---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Start i18n - Wie Sie Ihre Tanstack Start App übersetzen – Leitfaden 2026
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Tanstack Start-Anwendung mit Intlayer hinzufügen. Folgen Sie dieser umfassenden Anleitung, um Ihre App mehrsprachig mit lokalisierungsbewusstem Routing zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Lokalisierungs-Routing
slugs:
  - doc
  - umgebung
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 7.4.0
    date: 2025-12-11
    changes: Einführung von validatePrefix und Hinzufügen von Schritt 14: Behandlung von 404-Seiten mit lokalisierten Routen.
  - version: 7.3.9
    date: 2025-12-05
    changes: Schritt 13 hinzugefügt: Abrufen der Locale in Ihren Serveraktionen (Optional)
  - version: 7.2.3
    date: 2025-11-18
    changes: Schritt 13 hinzugefügt: Nitro anpassen
  - version: 7.1.0
    date: 2025-11-17
    changes: Präfix-Standard durch Hinzufügen der getPrefix-Funktion, useLocalizedNavigate, LocaleSwitcher und LocalizedLink korrigiert.
  - version: 6.5.2
    date: 2025-10-03
    changes: Dokumentation aktualisiert
  - version: 5.8.1
    date: 2025-09-09
    changes: Für Tanstack Start hinzugefügt
---

# Übersetzen Sie Ihre Tanstack Start-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

Diese Anleitung zeigt, wie Sie **Intlayer** für eine nahtlose Internationalisierung in Tanstack Start-Projekten mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungspraktiken integrieren.

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Locale-Erkennung und -Umschaltung.
- **Lokalisierungsbewusstes Routing aktivieren** mit dem dateibasierten Routing-System von Tanstack Start.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Tanstack Start-Anwendung

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Tanstack Start? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-tanstack-start-template) auf GitHub.

### Schritt 1: Projekt erstellen

Beginnen Sie mit der Erstellung eines neuen TanStack Start-Projekts, indem Sie der Anleitung [Neues Projekt starten](https://tanstack.com/start/latest/docs/framework/react/quick-start) auf der TanStack Start-Website folgen.

### Schritt 2: Intlayer-Pakete installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer in die React-Anwendung integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in React.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 4: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das Intlayer-Plugin zu Ihrer Konfiguration hinzu:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus bietet es Aliase zur Leistungsoptimierung.

### Schritt 5: Root-Layout erstellen

Konfigurieren Sie Ihr Root-Layout zur Unterstützung der Internationalisierung, indem Sie `useMatches` verwenden, um die aktuelle Locale zu erkennen und die Attribute `lang` und `dir` für das `html`-Tag festzulegen.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Versuchen, die Locale in den Parametern eines aktiven Matches zu finden
  // Dies setzt voraus, dass Sie das dynamische Segment "/{-$locale}" in Ihrem Routenbaum verwenden
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Schritt 6: Locale-Layout erstellen

Erstellen Sie ein Layout, das das Locale-Präfix verarbeitet und eine Validierung durchführt.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Locale-Präfix validieren
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Hier ist `{-$locale}` ein dynamischer Routenparameter, der durch die aktuelle Locale ersetzt wird. Diese Notation macht den Platzhalter optional, sodass er mit Routing-Modi wie `'prefix-no-default'` usw. funktioniert.

> Beachten Sie, dass dieser Platzhalter Probleme verursachen kann, wenn Sie mehrere dynamische Segmente in derselben Route verwenden (z. B. `/{-$locale}/anderer-pfad/$einWeitererDynamischerPfad/...`).
> Für den Modus `'prefix-all'` sollten Sie stattdessen den Platzhalter `$locale` verwenden.
> Für den Modus `'no-prefix'` oder `'search-params'` können Sie den Platzhalter ganz entfernen.

### Schritt 7: Inhalte deklarieren

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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./app`) enthalten sind. Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 7: Lokalisierungsbewusste Komponenten und Hooks erstellen

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Hauptdienstprogramm
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Helfer
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Diese Komponente verfolgt zwei Ziele:

- Entfernen des unnötigen `{-$locale}`-Präfixes aus der URL.
- Einfügen des Locale-Parameters in die URL, um sicherzustellen, dass der Benutzer direkt auf die lokalisierte Route weitergeleitet wird.

Dann können wir einen `useLocalizedNavigate`-Hook für die programmatische Navigation erstellen:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### Schritt 8: Intlayer in Ihren Seiten nutzen

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

#### Lokalisierte Startseite

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### Schritt 9: Eine Locale-Switcher-Komponente erstellen

Erstellen Sie eine Komponente, mit der Benutzer die Sprache wechseln können:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Locale - z. B. FR */}
              {localeEl}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z. B. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Sprache in der aktuellen Locale - z. B. Francés, wenn die aktuelle Locale auf Locales.SPANISH eingestellt ist */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Um mehr über den `useLocale`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### Schritt 10: HTML-Attribute-Verwaltung

Wie in Schritt 5 gezeigt, können Sie die Attribute `lang` und `dir` des `html`-Tags mit `useMatches` in Ihrer Root-Komponente verwalten. Dies stellt sicher, dass die richtigen Attribute auf dem Server und dem Client gesetzt werden.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Versuchen, die Locale in den Parametern eines aktiven Matches zu finden
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Schritt 11: Middleware hinzufügen (Optional)

Sie können auch den `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, wird auf die Standard-Locale weitergeleitet.

> Beachten Sie, dass Sie zur Verwendung des `intlayerProxy` in der Produktion das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Der Proxy sollte vor dem Server platziert werden, wenn Sie Nitro verwenden
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Schritt 12: Metadaten internationalisieren (Optional)

Sie können auch den `getIntlayer`-Hook verwenden, um in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zuzugreifen:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

### Schritt 13: Locale in Ihren Serveraktionen abrufen (Optional)

Vielleicht möchten Sie von Ihren Serveraktionen oder API-Endpunkten aus auf die aktuelle Locale zugreifen.
Dies können Sie mit dem Helfer `getLocale` von `intlayer` tun.

Hier ist ein Beispiel mit den Serverfunktionen von TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Cookie aus der Anfrage abrufen (Standard: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Header aus der Anfrage abrufen (Standard: 'x-intlayer-locale')
    // Fallback mit Accept-Language-Aushandlung
    getHeader: (name) => getRequestHeader(name),
  });

  // Inhalte mit getIntlayer() abrufen
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Schritt 14: Nicht gefundene Seiten verwalten (Optional)

Wenn ein Benutzer eine nicht existierende Seite besucht, können Sie eine benutzerdefinierte 404-Seite anzeigen. Das Locale-Präfix kann beeinflussen, wie die 404-Seite ausgelöst wird.

#### Verständnis der 404-Behandlung von TanStack Router mit Locale-Präfixen

In TanStack Router erfordert die Behandlung von 404-Seiten mit lokalisierten Routen einen mehrschichtigen Ansatz:

1. **Dedizierte 404-Route**: Eine spezifische Route zur Anzeige der 404-UI
2. **Validierung auf Routenebene**: Validiert Locale-Präfixe und leitet ungültige auf 404 weiter
3. **Catch-all-Route**: Erfasst alle nicht übereinstimmenden Pfade innerhalb des Locale-Segments

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Dies erstellt eine dedizierte /[locale]/404 Route
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
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad wird ausgeführt, bevor die Route gerendert wird (sowohl auf dem Server als auch auf dem Client)
  // Es ist der ideale Ort, um das Locale-Präfix zu validieren
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix prüft, ob die Locale gemäß Ihrer Intlayer-Konfiguration gültig ist
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Ungültiges Locale-Präfix - Weiterleitung zur 404-Seite mit einem gültigen Locale-Präfix
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent wird aufgerufen, wenn eine untergeordnete Route nicht existiert
  // z.B. löst /en/nicht-existierende-seite dies innerhalb des /en-Layouts aus
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Die $ (Splat/Catch-all) Route entspricht jedem Pfad, der nicht mit anderen Routen übereinstimmt
// z.B. /en/irgendein/tief/verschachtelter/ungültiger/pfad
// Dies stellt sicher, dass ALLE nicht übereinstimmenden Pfade innerhalb einer Locale die 404-Seite anzeigen
// Ohne dies könnten nicht übereinstimmende tiefe Pfade eine leere Seite oder einen Fehler anzeigen
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Schritt 15: TypeScript konfigurieren (Optional)

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einschließen
  ],
}
```

---

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese in Ihr Git-Repository übertragen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```

---

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Einzelheiten zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Informationen

Um noch weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte über das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) extern verwalten.

---

## Dokumentationsverweise

- [Intlayer-Dokumentation](https://intlayer.org)
- [Tanstack Start-Dokumentation](https://reactrouter.com/)
- [useIntlayer-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
