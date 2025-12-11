---
createdAt: 2025-09-09
updatedAt: 2025-12-11
title: Wie Sie Ihre Tanstack Start übersetzen – i18n-Leitfaden 2025
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Tanstack Start-Anwendung mit Intlayer hinzufügen. Folgen Sie dieser umfassenden Anleitung, um Ihre App mehrsprachig mit lokalisierungsbewusstem Routing zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Locale Routing
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.4.0
    date: 2025-12-11
    changes: Füge validatePrefix hinzu und ergänze Schritt 14: 404-Seiten mit lokalisierten Routen behandeln.
  - version: 7.3.9
    date: 2025-12-05
    changes: Füge Schritt 13 hinzu: Zugriff auf die aktuelle Locale in Serveraktionen (Optional)
  - version: 5.8.1
    date: 2025-09-09
    changes: Hinzugefügt für Tanstack Start
---

# Übersetzen Sie Ihre Tanstack Start mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

Diese Anleitung zeigt, wie Sie **Intlayer** für nahtlose Internationalisierung in Tanstack Start-Projekten mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungsmethoden integrieren.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.
- **Lokalisierungsbewusstes Routing aktivieren** mit dem dateibasierten Routing-System von Tanstack Start.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Tanstack Start-Anwendung

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Tanstack Start? Entdecken Sie Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-tanstack-start-template) auf GitHub.

### Schritt 1: Projekt erstellen

Beginnen Sie mit der Erstellung eines neuen TanStack Start-Projekts, indem Sie der Anleitung [Neues Projekt starten](https://tanstack.com/start/latest/docs/framework/react/quick-start) auf der TanStack Start-Website folgen.

### Schritt 2: Intlayer-Pakete installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer in React-Anwendungen integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in React bereit.

- **vite-intlayer**

  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 4: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein:

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
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau der Content-Deklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 5: Erstellen Sie Layout-Komponenten

Richten Sie Ihr Root-Layout und sprachspezifische Layouts ein:

#### Root-Layout

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Schritt 6: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        de: "Über",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        de: "Startseite",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        de: "Dies ist ein Beispiel für die Verwendung von Intlayer mit TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      de: "Willkommen bei Intlayer + TanStack Router",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das `contentDir`-Verzeichnis (standardmäßig `./app`) aufgenommen werden. Und sie müssen der Dateierweiterung der Inhaltsdeklaration entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 7: Erstellen Sie lokalisierungsbewusste Komponenten und Hooks

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Hauptfunktion
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Hilfsfunktionen
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
- Einfügen des Locale-Parameters in die URL, um sicherzustellen, dass der Benutzer direkt zur lokalisierten Route weitergeleitet wird.

Anschließend können wir einen `useLocalizedNavigate`-Hook für die programmatische Navigation erstellen:

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

### Schritt 8: Intlayer in Ihren Seiten verwenden

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

> Um mehr über den `useIntlayer` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### Schritt 9: Erstellen Sie eine Sprachumschalter-Komponente

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, die Sprache zu wechseln:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

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
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeEl}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### Schritt 10: HTML-Attribute-Verwaltung hinzufügen (Optional)

Erstelle einen Hook, um die HTML-Attribute lang und dir zu verwalten:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Dann verwende ihn in deiner Root-Komponente:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importiere den Hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // diese Zeile hinzufügen

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Schritt 11: Middleware hinzufügen (Optional)

Sie können auch das `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

> Beachten Sie, dass Sie, um das `intlayerProxy` in der Produktion zu verwenden, das `vite-intlayer`-Paket von `devDependencies` zu `dependencies` wechseln müssen.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Der Proxy sollte vor dem Server platziert werden, wenn Sie Nitro verwenden
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### Schritt 12: Metadaten internationalisieren (optional)

Sie können auch den `getIntlayer` Hook verwenden, um in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zuzugreifen:

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

### Schritt 13: Abrufen der Locale in Ihren Serveraktionen (Optional)

Möglicherweise möchten Sie von Ihren Serveraktionen oder API-Endpunkten aus auf die aktuelle Locale zugreifen.
Sie können dies mit dem Helfer `getLocale` aus `intlayer` tun.

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
    // Holen Sie sich das Cookie aus der Anfrage (Standard: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Holen Sie sich den Header aus der Anfrage (Standard: 'x-intlayer-locale')
    getHeader: (name) => getRequestHeader(name),
    // Fallback mit Accept-Language-Aushandlung
    getAllHeaders: async () => {
      const headers = getRequestHeaders();
      const result: Record<string, string> = {};

      // Konvertieren Sie die TypedHeaders in ein einfaches Record<string, string>
      for (const [key, value] of headers.entries()) {
        result[key] = value;
      }

      return result;
    },
  });

  // Rufen Sie Inhalte mit getIntlayer() ab
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Schritt 14: Nicht gefundene Seiten verwalten (optional)

Wenn ein Benutzer eine nicht existierende Seite besucht, können Sie eine benutzerdefinierte Seite "Nicht gefunden" anzeigen, und das Locale-Präfix kann beeinflussen, wie die Seite "Nicht gefunden" ausgelöst wird.

#### Verstehen der 404-Behandlung von TanStack Router mit Locale-Präfixen

In TanStack Router erfordert die Behandlung von 404-Seiten mit lokalisierten Routen einen mehrschichtigen Ansatz:

1. **Dedizierte 404-Route**: Eine spezifische Route zur Anzeige der 404-Benutzeroberfläche
2. **Validierung auf Routenebene**: Validiert Locale-Präfixe und leitet ungültige zu 404 weiter
3. **Catch-all-Route**: Erfasst alle nicht übereinstimmenden Pfade innerhalb des Locale-Segments

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Dies erstellt eine dedizierte /[locale]/404 Route
// Sie wird sowohl als direkte Route verwendet als auch als Komponente in anderen Dateien importiert
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Separately exportiert, damit es in notFoundComponent und catch-all Routen wiederverwendet werden kann
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/__root.tsx"
import { createRootRoute } from "@tanstack/react-router";

// Die Root-Route dient als Layout auf oberster Ebene
// Sie behandelt 404s nicht direkt - das wird an untergeordnete Routen delegiert
// Dies hält die Root einfach und ermöglicht es locale-bewussten Routen, ihre eigene 404-Logik zu verwalten
export const Route = createRootRoute({
  component: Outlet,
});
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad läuft, bevor die Route gerendert wird (sowohl auf Server als auch Client)
  // Es ist der ideale Ort, um das Locale-Präfix zu validieren
  beforeLoad: ({ params }) => {
    // Locale aus Routenparametern abrufen (nicht aus Server-Headern, da beforeLoad sowohl auf Client als auch Server läuft)
    const localeParam = params.locale;

    // validatePrefix prüft, ob die Locale gemäß Ihrer intlayer-Konfiguration gültig ist
    // Gibt zurück: { isValid: boolean, localePrefix: string }
    // - isValid: true, wenn das Präfix mit einer konfigurierten Locale übereinstimmt (oder leer ist, wenn das Präfix optional ist)
    // - localePrefix: das validierte Präfix oder das Standard-Locale-Präfix für Umleitungen
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // Locale ist gültig, Route normal rendern lassen
      return;
    }

    // Ungültiges Locale-Präfix (z. B. /xyz/about, wobei "xyz" keine gültige Locale ist)
    // Zur 404-Seite mit einem gültigen Locale-Präfix umleiten
    // Dies stellt sicher, dass die 404-Seite weiterhin korrekt lokalisiert ist
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent wird aufgerufen, wenn eine untergeordnete Route nicht existiert
  // z. B. löst /en/nicht-vorhandene-seite dies innerhalb des /en-Layouts aus
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // Den gesamten Locale-Segment mit IntlayerProvider umschließen
    // Fällt auf defaultLocale zurück, wenn der locale-Parameter undefined ist (optionaler Präfix-Modus)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout umschließt die 404-Komponente mit IntlayerProvider
// Dies stellt sicher, dass Übersetzungen auf der 404-Seite weiterhin funktionieren
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* LocaleSwitcher einbinden, damit Benutzer die Sprache auch auf 404 ändern können */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Die $ (splat/catch-all) Route passt auf jeden Pfad, der nicht mit anderen Routen übereinstimmt
// z. B. /en/irgendein/tief/verschachtelter/ungültiger/pfad
// Dies stellt sicher, dass ALLE nicht übereinstimmenden Pfade innerhalb einer Locale die 404-Seite anzeigen
// Ohne dies könnten nicht übereinstimmende tiefe Pfade eine leere Seite oder einen Fehler anzeigen
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Schritt 15: TypeScript konfigurieren (optional)

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

---

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Um dies zu tun, können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

## VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsverweise

- [Intlayer Dokumentation](https://intlayer.org)
- [Tanstack Start Dokumentation](https://reactrouter.com/)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

Dieser umfassende Leitfaden bietet alles, was Sie benötigen, um Intlayer mit Tanstack Start für eine vollständig internationalisierte Anwendung mit lokalisierungsbewusstem Routing und TypeScript-Unterstützung zu integrieren.
