---
createdAt: 2025-09-09
updatedAt: 2026-08-30
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
  - version: 9.4.0
    date: 2026-08-25
    changes: "Statische, dynamische und gecachte dynamische Auflösung von Metadaten-Dictionaries in head-Funktionen von Routen vergleichen"
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
author: aymericzip
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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
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
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
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
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

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
  const params = localeRoute.useParams();
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
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
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

> Verwenden Sie standardmäßig **`useIntlayer`**: Es ist der empfohlene Weg, Inhalte innerhalb von Komponenten zu lesen, und der Compiler löst den Aufruf auf die gerenderte Locale auf. Greifen Sie nur außerhalb des React-Baums zu `getIntlayer` / `getIntlayerAsync`: im `head` von Routen, in Loadern und Server Functions.

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

#### Lokalisierte Homepage

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z. B. `alt`, `title`, `href`, `aria-label`, usw., können Sie den Wert der Funktion verwenden, wie:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Weitere Informationen zum Hook `useIntlayer` finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Locale Switcher Component erstellen">

Erstellen Sie eine Komponente, die es Benutzern ermöglicht, Sprachen zu wechseln:

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
              {/* Locale - z. B. DE */}
              {localeEl}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z. B. Deutsch */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Sprache in aktueller Locale - z. B. Francés mit aktueller Locale auf Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache in Englisch - z. B. German */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Weitere Informationen zum Hook `useLocale` finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="HTML-Attribute verwalten">

Wie in Schritt 5 beschrieben, können Sie die Attribute `lang` und `dir` des `html`-Tags mit `useParams` in Ihrer Root-Komponente verwalten. Dies stellt sicher, dass die korrekten Attribute auf dem Server und dem Client gesetzt werden.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
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

Sie können auch `intlayerProxy` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, wird es zur Standard-Locale weitergeleitet.

> Beachten Sie, dass Sie zum Verwenden von `intlayerProxy` in der Produktion das Package `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

> Seit Intlayer v9 ist `intlayerProxy()` direkt im `intlayer()`-Plugin gebündelt und standardmäßig über die Option `routing.enableProxy` aktiviert (standardmäßig `true`). Die separate Registrierung wie unten gezeigt ist jetzt optional: Sie wird aus Gründen der Rückwärtskompatibilität und für Setups beibehalten, die die Plugin-Reihenfolge steuern müssen. Setzen Sie `routing.enableProxy: false`, um sich abzumelden. Siehe [v9 Release Notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Metadaten internationalisieren">

<Tabs>

<Tab label="Statische Auflösung" value="static">

`getIntlayer` wird synchron gegen das **zusammengeführte** Wörterbuch aufgelöst, das jede deklarierte Locale enthält. `head` bleibt synchron und nichts wird abgewartet, aber das gesamte mehrsprachige Wörterbuch wird in den an den Browser gesendeten Route-Chunk gezogen.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Der Pfad für diese Route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical-Link: Verweist auf die aktuelle lokalisierte Seite
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Teilen Sie Google alle lokalisierten Versionen mit
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Für Benutzer in nicht übereinstimmenden Sprachen
        // Definieren Sie die Standard-Fallback-Locale (normalerweise Ihre Hauptsprache)
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

Am besten für kleine Metadaten-Wörterbücher, eine Handvoll Locales oder während des Prototyping.

</Tab>

<Tab label="Dynamische Auflösung" value="dynamic">

`getIntlayerAsync` (verfügbar ab **v9.4**) verhält sich wie `getIntlayer`, aber das Build-Plugin verweist auf den Locale-spezifischen Chunk in `.intlayer/dynamic_dictionaries/` statt auf das zusammengeführte Wörterbuch. Eine Seite wird daher nur mit der Locale versendet, die sie rendert. Da dieser Chunk bei Bedarf geladen wird, wird `head` zu `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Der Pfad für diese Route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical-Link: Verweist auf die aktuelle lokalisierte Seite
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Teilen Sie Google alle lokalisierten Versionen mit
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Für Benutzer in nicht übereinstimmenden Sprachen
        // Definieren Sie die Standard-Fallback-Locale (normalerweise Ihre Hauptsprache)
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

> Wenn ein `head` mehrere Wörterbücher liest, lösen Sie diese mit `Promise.all` auf: Das Abwarten jedes `getIntlayerAsync` auf seiner eigenen Zeile verkettet die Anforderungen, anstatt sie parallel zu verarbeiten.

Der Kompromiss: Der dynamische Import wird aufgelöst, während `head` auf dem kritischen Pfad des Document-Rendering läuft. Auf einer kalten Route verzögert dies den head um einige Millisekunden und kann **LCP** leicht verschlechtern.

</Tab>

<Tab label="Gecachte dynamische Auflösung" value="cached">

Lösen Sie das Wörterbuch im Route-`loader` auf und lesen Sie es in `head` aus `loaderData` zurück. Loader der übereinstimmenden Routes werden parallel ausgeführt, und `staleTime: Infinity` teilt TanStack Router mit, dass das Ergebnis nie veraltet, daher wird der Locale-spezifische Chunk einmal aufgelöst und anschließend aus dem Router-Cache bereitgestellt, wobei `head` synchron bleibt.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Wird parallel mit den anderen übereinstimmenden Routes aufgelöst, außerhalb des head-kritischen Pfads
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Das Wörterbuch ändert sich nie für eine bestimmte Locale: Den Chunk einmal auflösen
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Der Pfad für diese Route

    return {
      links: [
        // Canonical-Link: Verweist auf die aktuelle lokalisierte Seite
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Teilen Sie Google alle lokalisierten Versionen mit
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Für Benutzer in nicht übereinstimmenden Sprachen
        // Definieren Sie die Standard-Fallback-Locale (normalerweise Ihre Hauptsprache)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` kann aufgerufen werden, bevor sich der loader abgewickelt hat, sodass `loaderData` möglicherweise als `undefined` eingegeben wird. Behalten Sie das optionale Chaining bei oder geben Sie einen Fallback-Titel zurück.

Sie behalten den Locale-spezifischen Chunk, ohne seine Kosten auf dem head-kritischen Pfad zu zahlen. Der Preis ist die Entwickler-Experience: Der Inhalt muss explizit vom loader zum `head` durch `loaderData` geleitet werden.

</Tab>

</Tabs>

### Welche Auflösung sollte ich wählen?

|                     | Statische Auflösung      | Dynamische Auflösung              | Zwischengespeicherte dynamische Auflösung |
| ------------------- | ------------------------ | --------------------------------- | ----------------------------------------- |
| API                 | `getIntlayer`            | `getIntlayerAsync` (v9.4+)        | `getIntlayerAsync` in `loader` (v9.4+)    |
| `head` Signatur     | synchron                 | `async`                           | synchron, liest `loaderData`              |
| Locales versendet   | jedes deklarierte Locale | angeforderte Locale nur           | angeforderte Locale nur                   |
| Client-Navigationen | nichts zu lösen          | bei jedem Match erneut eingegeben | aus dem Router-Cache bereitgestellt       |
| Entwicklererlebnis  | am einfachsten           | ein `await`                       | Inhalte über `loaderData` verkettet       |

---

</Step>

<Step number={13} title="Rufen Sie das Locale in Ihren Server-Aktionen ab">

Möglicherweise möchten Sie auf das aktuelle Locale von Ihren Server-Aktionen oder API-Endpunkten aus zugreifen.
Sie können dies mit dem `getLocale`-Helfer von `intlayer` tun.

Hier ist ein Beispiel mit den Server-Funktionen von TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Rufen Sie das Cookie aus der Anfrage ab (Standard: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Rufen Sie den Header aus der Anfrage ab (Standard: 'x-intlayer-locale')
    // Fallback mit Accept-Language-Aushandlung
    getHeader: (name) => getRequestHeader(name),
  });

  // Rufen Sie Inhalte mit getIntlayerAsync() ab
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Verwalten Sie Seiten, die nicht gefunden wurden">

Wenn ein Benutzer eine nicht vorhandene Seite besucht, können Sie eine benutzerdefinierte Seite anzeigen, die nicht gefunden wurde, und das Locale-Präfix kann beeinflussen, wie die Seite ausgelöst wird, die nicht gefunden wurde.

#### Lokalisierte Startseite

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z. B. `alt`, `title`, `href`, `aria-label`, usw., können Sie den Wert der Funktion wie folgt verwenden:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

</Step>

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

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Liest ein `head` mehrere Dictionaries, lösen Sie sie mit `Promise.all` auf; jedes `getIntlayerAsync` einzeln zu awaiten verkettet die Anfragen, statt sie parallel auszuführen.

Der Kompromiss: Der dynamische Import wird während der Ausführung von `head` aufgelöst, also auf dem kritischen Pfad des Dokument-Renderings. Auf einer kalten Route verzögert das den `head` um einige Millisekunden und kann den **LCP** leicht verschlechtern.

</Tab>

<Tab label="Gecachte dynamische Auflösung" value="cached">

Lösen Sie das Dictionary stattdessen im `loader` der Route auf und lesen Sie es in `head` aus `loaderData` zurück. Die Loader der gematchten Routen laufen parallel, und `staleTime: Infinity` teilt TanStack Router mit, dass das Ergebnis nie veraltet, der Locale-Chunk wird also einmal aufgelöst und danach aus dem Router-Cache bedient, während `head` synchron bleibt.

```tsx fileName="src/routes/{-$locale}/index.tsx"
      return getCookie(name, cookieString);
    },
    // Header aus der Anfrage abrufen (Standard: 'x-intlayer-locale')
    // Fallback mit Accept-Language-Aushandlung
    getHeader: (name) => getRequestHeader(name),
  });

  // Inhalte mit getIntlayer() abrufen
  const content = getIntlayer("app", locale);

````

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

```

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"

```

</Step>

<Step number={15} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um es einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Definiert den Pfad der Ausgabedateien
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

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

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

</Tab>
</Tabs>

bun x intlayer extract
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

---

bun run build # Or bun run dev
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

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

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
{
  // ... Ihre bestehenden Konfigurationen
  include: [
    // ... Ihre bestehenden Includes
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einschließen
  ],
}

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es dir, sie nicht in dein Git-Repository zu committen.

Um dies zu tun, kannst du die folgenden Anweisungen zu deiner `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Von Intlayer generierte Dateien ignorieren
.intlayer
````

---

## VS Code Extension

Um dein Entwicklungserlebnis mit Intlayer zu verbessern, kannst du die offizielle **Intlayer VS Code Extension** installieren.

[Installieren vom VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Extension bietet:

- **Autocompletion** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschau** von übersetztem Inhalt.
- **Schnellaktionen** zum einfachen Erstellen und Aktualisieren von Übersetzungen.

Für weitere Details zur Verwendung der Extension, siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

## Weiter geht's

Um weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihren Inhalt mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.

---

## Dokumentationsreferenzen

- [Intlayer Documentation](https://intlayer.org)
- [Tanstack Start Documentation](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine TanStack-Start-App zu internationalisieren?">

TanStack Start liefert keine eigene i18n-Ebene mit, sodass die Wahl eine Bibliothek ist:

- **`i18next` / `react-i18next`** und **`react-intl`**: Framework-unabhängige Message-Kataloge, manuell in den Router eingebunden.
- **`Lingui`**: ICU-Nachrichten mit einem Compile-Schritt.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert und zur Build-Zeit kompiliert, mit typisierten Schlüsseln, Locale-bewusstem Routing, Sitemap-Generierung, KI-Übersetzung, visuellem Editor und CMS.

Der Unterschied, der bei TanStack Start zählt, ist Routing und Server-Rendering. Intlayer integriert sich mit dem dateibasierten Router, der `head`-Funktion und dem Pre-Render-Durchlauf, statt Sie einen Provider, einen Locale-Detektor und eine Sitemap von Hand zusammensetzen zu lassen. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [TanStack-Start-i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner TanStack-Start-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md).

</Question>

<Question title="Kann ich von `react-i18next` oder `react-intl` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [react-i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md) oder dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `react-i18next`, `react-intl` und `i18next` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

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

<Question title="Unterstützt Intlayer serverseitiges Rendering und Pre-Rendering in TanStack Start?">

Ja. Inhalte werden während SSR aufgelöst, und der Leitfaden behandelt die Pre-Render-Konfiguration, die ein statisches Dokument pro lokalisierter Route ausgibt. Schritt 16 zeigt, wie Sie `prerender` in `vite.config.ts` aktivieren und aus derselben Routentabelle eine lokalisierte Sitemap generieren.

</Question>

<Question title="Wie füge ich hreflang-Tags und eine lokalisierte Sitemap hinzu?">

Verwenden Sie die eingebaute Funktion `generateSitemap` in einer Route `src/routes/sitemap[.]xml.ts`. Anders als eine reine URL-Liste gibt sie den `xhtml:link`-Namespace aus, sodass jede Sprachversion einer Seite bidirektional auf die anderen verweist und Suchmaschinen die richtige für jedes Publikum indexieren. Lokalisierte `head`-Metadaten werden in Schritt 12 behandelt.

</Question>

<Question title="Muss ich die Locale in die URL aufnehmen?">

Nein. `routing.mode` steuert das URL-Schema: `"prefix-no-default"` (die Voreinstellung, `/about` und `/fr/about`), `"prefix-all"` (`/en/about`), `"no-prefix"` (aus Cookie, Header oder Domain aufgelöst) oder `"search-params"` (`/about?locale=fr`). Locales können mit `routing.domains` auch auf separate Domains abgebildet werden. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie baue ich einen Sprachumschalter, der die aktuelle Route beibehält?">

Verwenden Sie `useLocale` zusammen mit der in Schritt 9 beschriebenen lokalisierten Link-Komponente. `useLocale` stellt die aktive Locale, die verfügbaren Locales und einen Setter bereit, der die Wahl persistiert, während `getLocalizedUrl` den aktuellen Pfad in die Zielsprache umschreibt, sodass der Nutzer auf derselben Seite bleibt, statt auf der Startseite zu landen.

</Question>

<Question title="Wie handhabe ich 404-Seiten bei lokalisierten Routen?">

Schritt 14 behandelt das. `validatePrefix` sagt Ihnen, ob das Locale-Segment der URL eine deklarierte Locale ist, sodass `/xx/about` einen echten 404 zurückgibt, statt als Pfad behandelt zu werden. Ohne es löst ein unbekanntes Präfix still auf und Suchmaschinen indexieren eine doppelte Seite.

</Question>

<Question title="Wie übersetze ich eine TanStack-Start-App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Die CLI findet fehlende Übersetzungen und füllt sie mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels. Fügen Sie `--git-diff` hinzu, um nur die im aktuellen Branch geänderten Inhalte zu übersetzen, was CI-Läufe günstig hält. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und Rich Text?">

Ja. Inhaltsdeklarationen unterstützen [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md) und [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) für lange Texte, mit [Formattern](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden Website zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
