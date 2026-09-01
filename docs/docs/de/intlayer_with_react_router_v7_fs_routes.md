---
createdAt: 2025-12-07
updatedAt: 2026-08-30
title: "React Router v7 i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) React Router v7-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - React Router v7
  - fs-routes
  - Dateisystem-Routen
  - React
  - i18n
  - TypeScript
  - Lokalisierungs-Routing
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template
applicationShowcase: https://intlayer-react-router-v7-fs-routes.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 7.3.4
    date: 2025-12-08
    changes: "Anfängliche Historie"
author: aymericzip
---

# Übersetzen Sie Ihre React Router v7 (File-System Routes) mit Intlayer | Internationalisierung (i18n)

Diese Anleitung zeigt, wie Sie **Intlayer** für nahtlose Internationalisierung in React Router v7-Projekten mit **dateisystembasiertem Routing** (`@react-router/fs-routes`) mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungsmethoden integrieren.

Für clientseitiges Routing lesen Sie bitte die Anleitung [Intlayer mit React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_router_v7.md).

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „react-i18next“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>
<Accordion header="Vollständige Abdeckung des React Routers">

Intlayer ist für die perfekte Zusammenarbeit mit React Router optimiert, indem es **locale-aware Routing**, **Middleware zur Locale-Erkennung** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) erforderlich sind.

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

## Documentation References

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="So übersetzen Sie eine React Router v7 (File-System Routes) App mit Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

- [Intlayer Documentation](https://intlayer.org)
- [React Router v7 Documentation](https://reactrouter.com/)
- [React Router fs-routes Documentation](https://reactrouter.com/how-to/file-route-conventions)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

  </Tab>
  <Tab label="Demo" value="demo">

This comprehensive guide provides everything you need to integrate Intlayer with React Router v7 using file-system based routing for a fully internationalized application with locale-aware routing and TypeScript support.

  </Tab>
</Tabs>

Siehe [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) auf GitHub.

<Steps>

<Step number={10} title="Middleware hinzufügen">

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Package Manager:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun add @react-router/fs-routes --dev
bun x intlayer init
```

- **intlayer**

Das Core-Paket, das Internationalisierungstools für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer mit React-Anwendungen integriert. Es bietet Context-Provider und Hooks für React-Internationalisierung.

- **vite-intlayer**
  Includes the Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production), sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Bearbeitung der URL-Umleitung.

- **@react-router/fs-routes**
  Das Package, das dateiensystembasiertes Routing für React Router v7 ermöglicht.

</Step>

<Step number={2} title="Konfiguration deines Projekts">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

Sie können auch das `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite-Konfiguration">

> Beachten Sie, dass Sie, um das `intlayerProxy` in der Produktion zu verwenden, das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    reactRouter(),

    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

</Step>

<Step number={4} title="Konfigurieren der dateisystembasierten Routen von React Router v7">

Richten Sie Ihre Routing-Konfiguration ein, um dateisystembasierte Routen mit `flatRoutes` zu verwenden:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Inhaltsdeklarationsdateien ignorieren, damit sie nicht als Routen behandelt werden
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> Die Funktion `flatRoutes` von `@react-router/fs-routes` aktiviert dateisystembasiertes Routing, bei dem die Dateistruktur im Verzeichnis `routes/` die Routen Ihrer Anwendung bestimmt. Die Option `ignoredRouteFiles` stellt sicher, dass Intlayer-Inhaltsdeklarationsdateien (`.content.ts`, etc.) nicht als Routendateien behandelt werden.

</Step>

<Step number={5} title="Routendateien mit Dateisystem-Konventionen erstellen">

Beim dateisystembasierten Routing verwenden Sie eine flache Namenskonvention, bei der Punkte (`.`) Pfadsegmente darstellen und Klammern `()` optionale Segmente bezeichnen.

Erstellen Sie die folgenden Dateien in Ihrem Verzeichnis `app/routes/`:

#### Dateistruktur

```bash
app/
├── root.tsx                         # Layout-Wrapper für Locale-Routen
└──routes/
    ├── ($locale)._index.tsx         # Startseite (/, /es, etc.)
    ├── ($locale)._index.content.ts  # Startseiten-Inhalt
    ├── ($locale).about.tsx          # Über-Seite (/about, /es/about, etc.)
    └── ($locale).about.content.ts   # Über-Seiten-Inhalt
```

Die Namenskonventionen:

- `($locale)` - Optionales dynamisches Segment für den Locale-Parameter
- `_layout` - Layout-Route, die untergeordnete Routen umschließt
- `_index` - Index-Route (wird am übergeordneten Pfad gerendert)
- `.` (Punkt) - Trennt Pfadsegmente (z. B. `($locale).about` → `/:locale?/about`)

#### Layout-Komponente

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### Index-Seite

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

#### Über-Seite

```tsx fileName="app/routes/($locale).about.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale).about";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("about", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="Deklarieren Sie Ihre Inhalte">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern. Platzieren Sie Inhaltsdateien neben Ihren Routendateien:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen werden (standardmäßig `./app`). Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

</Step>

<Step number={7} title="Erstellen Sie locale-bewusste Komponenten">

Erstellen Sie eine `LocalizedLink`-Komponente für locale-bewusste Navigation:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Prüft, ob der Link extern ist
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// Lokalisierter Link-Komponenten für die Navigation
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Falls Sie zu den lokalisierten Routen navigieren möchten, können Sie den `useLocalizedNavigate` Hook verwenden:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Erstellen Sie eine Sprachumschalter-Komponente">

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, die Sprache zu wechseln:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            reloadDocument // Seite neu laden, um die neue Locale anzuwenden
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache im eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="HTML-Attribute-Verwaltung hinzufügen">

Erstellen Sie einen Hook, um die HTML-Attribute lang und dir zu verwalten:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

Dieser Hook wird bereits in der Layout-Komponente (`root.tsx`) verwendet, die in Schritt 5 gezeigt wird.

</Step>

<Step number={10} title="Middleware hinzufügen">

Sie können auch `intlayerProxy` verwenden, um Server-seitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch das aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn kein Locale angegeben ist, bestimmt das Plugin das am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn kein Locale erkannt wird, wird es zum Standard-Locale weitergeleitet.

> Beachten Sie, dass Sie das `vite-intlayer`-Paket von `devDependencies` zu `dependencies` verschieben müssen, um den `intlayerProxy` in der Produktion zu verwenden.

> Seit Intlayer v9 ist `intlayerProxy()` direkt in das `intlayer()` Plugin integriert und wird standardmäßig über die `routing.enableProxy` Option (`true` als Standard) aktiviert. Eine separate Registrierung wie unten gezeigt ist nun optional — sie wird für Rückwärtskompatibilität und Setups beibehalten, die die Plugin-Reihenfolge kontrollieren müssen. Setzen Sie `routing.enableProxy: false`, um sich abzumelden. Siehe die [v9-Versionshinweise](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    reactRouter(),

    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={11} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

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

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Inhalt aus Komponenten in Wörterbücher extrahieren
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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

## TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code stabiler zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

---

## Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese versehentlich in Ihr Git-Repository committet werden.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

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

Für weitere Details zur Nutzung der Erweiterung lesen Sie die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsverweise

- [Intlayer Dokumentation](https://intlayer.org)
- [React Router v7 Dokumentation](https://reactrouter.com/)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

Dieser umfassende Leitfaden bietet alles, was Sie benötigen, um Intlayer mit React Router v7 für eine vollständig internationalisierte Anwendung mit lokalisierungsbewusstem Routing und TypeScript-Unterstützung zu integrieren.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine React-Router-v7-App zu internationalisieren?">

- **`react-i18next` / `i18next`**: JSON-Namespaces, die zur Laufzeit geladen werden, mit einem separaten Locale-Detektor, der von Hand in den Router eingebunden wird.
- **`react-intl`** und **`Lingui`**: ICU-Nachrichten mit einem Extraktionsschritt.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert und zur Build-Zeit kompiliert, durchgängig typisiert, mit Locale-bewussten Routing-Helfern, KI-Übersetzung, visuellem Editor und CMS.

Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner React-Router-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `react-i18next` oder `react-intl` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [react-i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md) oder dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `react-i18next`, `react-intl` und `i18next` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Komponenten, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Schritt 11 dieses Leitfadens führt Sie hindurch.

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

<Question title="Was ist der Unterschied zwischen dieser Anleitung und der konfigurationsbasierten React-Router-Anleitung?">

Nur wie die Routen deklariert werden. Dieser Leitfaden verwendet die Dateisystem-Routenkonventionen, bei denen das Locale-Segment aus den Dateinamen kommt, während der [konfigurationsbasierte Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_router_v7.md) denselben Baum in `routes.ts` deklariert. Die Inhaltsdeklarationen, die Hooks und die Konfiguration sind in beiden identisch, sodass Sie die Konventionen wechseln können, ohne Ihr i18n anzufassen.

</Question>

<Question title="Wie füge ich ein Locale-Segment mit Dateisystem-Routen hinzu?">

Die Schritte 4 und 5 behandeln das: Die Locale wird zu einem dynamischen Segment in den Routendateinamen, sodass jede Seite darunter die aktive Locale erhält. `validatePrefix` sagt Ihnen, ob dieses Segment eine deklarierte Locale ist, sodass `/xx/about` einen echten 404 zurückgibt, statt eine doppelte Seite zu rendern, und `getLocalizedUrl` schreibt jeden Pfad in die Zielsprache um.

</Question>

<Question title="Muss ich die Locale in die URL aufnehmen?">

Nein. `routing.mode` akzeptiert `"prefix-no-default"` (die Voreinstellung), `"prefix-all"`, `"no-prefix"` und `"search-params"`, und `routing.domains` ordnet jede Locale ihrer eigenen Domain zu. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie füge ich hreflang-Tags für SEO hinzu?">

Erstellen Sie die Alternativen-Zuordnung mit `getMultilingualUrls` und geben Sie sie aus dem `meta`- oder `links`-Export Ihrer Route aus, einschließlich eines `x-default`-Eintrags. Derselbe Helfer speist eine lokalisierte `sitemap.xml`.

</Question>

<Question title="Wie baue ich einen Sprachumschalter, der auf der aktuellen Seite bleibt?">

Schritt 8 zeigt die Komponente. `useLocale` stellt die aktive Locale, die deklarierten Locales und einen Setter bereit, der die Wahl persistiert, während `getLocalizedUrl` den aktuellen Pfad in die Zielsprache umschreibt, sodass der Leser auf derselben Route bleibt, statt zur Startseite geschickt zu werden.

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
