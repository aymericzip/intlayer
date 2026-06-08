---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "TanStack Start i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) TanStack Start-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Lokalisierungs-Routing
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Einführung von validatePrefix und Hinzufügen von Schritt 14: Behandlung von 404-Seiten mit lokalisierten Routen."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Schritt 13 hinzugefügt: Abrufen der Locale in Ihren Serveraktionen (Optional)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Schritt 13 hinzugefügt: Nitro anpassen"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Präfix-Standard durch Hinzufügen der getPrefix-Funktion, useLocalizedNavigate, LocaleSwitcher und LocalizedLink korrigiert."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Dokumentation aktualisiert"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Für Tanstack Start hinzugefügt"
---

# Übersetzen Sie Ihre Tanstack Start-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

Diese Anleitung zeigt, wie Sie **Intlayer** für eine nahtlose Internationalisierung in Tanstack Start-Projekten mit lokalisierungsbewusstem Routing, TypeScript-Unterstützung und modernen Entwicklungspraktiken integrieren.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „react-i18next“ oder „use-intl“ oder „paraglide“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>

<Accordion header="Vollständige TanStack Start-Abdeckung">

Intlayer ist vollständig für TanStack Start optimiert und bietet **mehrsprachiges Routing**, **Cookie-Verwaltung**, **Sitemap-Generierung**, **dynamisches Laden von Inhalten** und alle Funktionen, die Sie zur Skalierung Ihrer Internationalisierungsbemühungen (i18n) benötigen.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Seitengröße um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

</Accordion>

<Accordion header="KI-Agent">

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent Fähigkeiten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

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

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Tanstack Start-Anwendung

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Tanstack Start? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-tanstack-start-template) auf GitHub.

<Steps>

<Step number={1} title="Projekt erstellen">

Beginnen Sie mit der Erstellung eines neuen TanStack Start-Projekts, indem Sie der Anleitung [Neues Projekt starten](https://tanstack.com/start/latest/docs/framework/react/quick-start) auf der TanStack Start-Website folgen.

</Step>

<Step number={2} title="Intlayer-Pakete installieren">

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
bun x intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer in die React-Anwendung integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in React.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

</Step>

<Step number={3} title="Konfiguration Ihres Projekts">

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

</Step>

<Step number={4} title="Intlayer in Ihre Vite-Konfiguration integrieren">

Fügen Sie das Intlayer-Plugin zu Ihrer Konfiguration hinzu:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
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

</Step>

<Step number={5} title="Root-Layout erstellen">

Konfigurieren Sie Ihr Root-Layout zur Unterstützung der Internationalisierung, indem Sie `useParams` verwenden, um die aktuelle Locale zu erkennen und die Attribute `lang` und `dir` für das `html`-Tag festzulegen.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = LocaleRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z.B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, zum Beispiel:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

</Step>

<Step number={6} title="Locale-Layout erstellen">

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

</Step>

<Step number={7} title="Inhalte deklarieren">

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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./app`) enthalten sind. Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={7} title="Lokalisierungsbewusste Komponenten und Hooks erstellen">

Erstellen Sie eine `LocalizedLink`-Komponente für lokalisierungsbewusste Navigation:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  | `/${typeof LOCALE_ROUTE}/`
  | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={8} title="Intlayer in Ihren Seiten nutzen">

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

</Step>

<Step number={9} title="Eine Locale-Switcher-Komponente erstellen">

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

</Step>

<Step number={10} title="HTML-Attribute-Verwaltung">

Wie in Schritt 5 gezeigt, können Sie die Attribute `lang` und `dir` des `html`-Tags mit `useParams` in Ihrer Root-Komponente verwalten. Dies stellt sicher, dass die richtigen Attribute auf dem Server und dem Client gesetzt werden.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const params = LocaleRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Middleware hinzufügen">

Sie können auch den `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, wird auf die Standard-Locale weitergeleitet.

> Beachten Sie, dass Sie zur Verwendung des `intlayerProxy` in der Produktion das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Metadaten internationalisieren">

Sie können auch den `getIntlayer`-Hook verwenden, um in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zuzugreifen:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

</Step>

<Step number={13} title="Locale in Ihren Serveraktionen abrufen">

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

</Step>

<Step number={14} title="Nicht gefundene Seiten verwalten">

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

Aktualisieren Sie Ihre `vite.config.ts`, um das `intlayerCompiler`-Plugin aufzunehmen:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Fügt das Compiler-Plugin hinzu
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

<Step number={16} title="Sitemap generieren">

Intlayer wird mit einem integrierten Sitemap-Generator geliefert, mit dem Sie ganz einfach eine Sitemap für Ihre Anwendung erstellen können. Er berücksichtigt lokalisierte Routen und fügt die erforderlichen Metadaten für Suchmaschinen hinzu.

> Die von Intlayer generierte Sitemap unterstützt den `xhtml:link`-Namespace (Hreflang XML-Erweiterungen). Im Gegensatz zu Standard-Sitemap-Generatoren, die nur rohe URLs auflisten, erstellt Intlayer automatisch die erforderlichen bidirektionalen Links zwischen allen Sprachversionen einer Seite (z. B. `/about`, `/about?lang=fr` und `/about?lang=es`). Dies stellt sicher, dass Suchmaschinen die richtige Sprachversion korrekt indexieren und der richtigen Zielgruppe bereitstellen.

Um ihn zu verwenden, müssen Sie zuerst Ihre `vite.config.ts` konfigurieren, um das Vorrendern für Ihre lokalisierten Routen zu aktivieren und die standardmäßige TanStack Start Sitemap-Generierung zu deaktivieren.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
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
import { createFileRoute } from "@tanstack/react-router";
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

</Step>

<Step number={17} title="TypeScript konfigurieren">

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

</Step>

</Steps>

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
