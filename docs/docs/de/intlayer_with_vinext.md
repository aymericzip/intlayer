---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Vollständige Anleitung zur Übersetzung Ihrer Next.js-App auf Vite"
description: "Richten Sie Intlayer mit vinext ein, der Next.js-API auf Vite: Locale-Routing mit proxy.ts, Server und Client Components, lokalisierte Metadaten, Sitemap und Deployment auf Cloudflare Workers."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Erste Version des Verlaufs"
author: aymericzip
---

# Übersetzen Sie Ihre vinext-Website mit Intlayer

[vinext](https://github.com/cloudflare/vinext) implementiert die Next.js-API neu auf Basis von Vite. Ihr `app/`-Verzeichnis, die `next/*`-Imports und `proxy.ts` funktionieren weiter, aber der Build läuft über Vite statt über Turbopack oder webpack.

Intlayer fügt sich mit zwei Paketen in dieses Setup ein: `next-intlayer` für die Hooks, Provider und den Proxy, die Ihre Komponenten bereits unter Next.js verwenden, und `vite-intlayer` für den Build-Teil (Kompilierung der Dictionaries, Watch-Modus und Bundle-Optimierung).

> Sie nutzen Next.js mit der eigenen Toolchain? Folgen Sie stattdessen der [Next.js-16-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

- [Next.js-16-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer statt anderer Lösungen?

Im Vergleich zu Lösungen wie `next-intl` oder `i18next` bringt Intlayer integrierte Optimierungen mit:

<AccordionGroup>
<Accordion header="Für die Next.js-API gebaut, auf Vite">

Derselbe `next-intlayer`-Code läuft unter Next.js und unter vinext. Server Components lösen Inhalte auf dem Server auf, Client Components lesen sie über den Provider, und das Locale-Routing läuft über Ihre `proxy.ts`. Der Wechsel zwischen beiden Toolchains berührt Ihre Komponenten nicht.

</Accordion>
<Accordion header="Bundle-Größe">

Statt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den benötigten Inhalt. Das Vite-Plugin ersetzt jeden `useIntlayer`-Aufruf durch die Einträge, die die Komponente tatsächlich verwendet. Das **reduziert die Bundle- und Seitengröße um bis zu 50 %**.

</Accordion>
<Accordion header="Wartbarkeit">

Inhalte pro Komponente zu kapseln **vereinfacht die Wartung** großer Anwendungen. Sie können einen Feature-Ordner duplizieren oder löschen, ohne Ihre gesamte Content-Codebase zu prüfen, und Intlayer ist **vollständig typisiert**, damit Ihre Inhalte korrekt bleiben.

</Accordion>
<Accordion header="KI-Agent">

Inhalte direkt neben den Komponenten abzulegen **verringert den nötigen Kontext** für LLMs. Intlayer liefert eine **CLI** zum Aufspüren fehlender Übersetzungen, einen **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, einen **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)
- [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)
- [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)

</Accordion>
<Accordion header="Automatisierung">

Übersetzen Sie in Ihrer CI/CD-Pipeline mit dem LLM Ihrer Wahl, auf Kosten Ihres KI-Anbieters. Intlayer bietet außerdem einen **Compiler**, der die Extraktion von Inhalten automatisiert, und eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), die **im Hintergrund übersetzt**.

- [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

</Accordion>
<Accordion header="Skalierung mit Nicht-Entwicklern">

Intlayer bietet einen **selbst gehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, um mehrsprachige Inhalte in **Echtzeit** mit Übersetzern und Textern zu verwalten. Inhalte können lokal und/oder remote gespeichert werden.

- [Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- [Vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer vinext-Anwendung

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

Starten Sie mit einem funktionierenden vinext-Projekt. Um eines zu erstellen, führen Sie `npm create vinext-app@latest` aus. Um eine bestehende Next.js-App zu migrieren, führen Sie `npx vinext init` aus.

Installieren Sie dann Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Das Kernpaket, das die Werkzeuge zur Internationalisierung bereitstellt: Konfigurationsverwaltung, Übersetzung, [Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md).

- **next-intlayer**

  Stellt die Provider, Hooks und den Proxy für die Next.js-API bereit. vinext löst `next/navigation`, `next/headers` und `next/server` auf eigene Implementierungen auf, sodass `next-intlayer` unverändert funktioniert.

- **vite-intlayer**

  Das Vite-Plugin, das Ihre Content-Deklarationen baut, sie in der Entwicklung beobachtet und die Dictionaries im Produktions-Bundle optimiert. Es ersetzt das Next.js-Plugin `withIntlayer()`, das vinext nicht ausführt.

</Step>
<Step number={2} title="Projekt konfigurieren">

Entscheiden Sie, ob Ihre Anwendung lokalisierte URL-Pfade verwenden soll (z. B. `/en/about`, `/fr/about`) oder Inhalte ohne Locale-Segment im Pfad ausliefert (z. B. `/about`, mit Erkennung der Locale über Cookies, Header oder Query-Parameter).

<Tabs group="routing-mode">
<Tab label="Mit Locale-Pfad" value="with-locale-path">

### Architektur

Alle lokalisierten Seiten liegen unter einem dynamischen `[locale]`-Segment. Das wird für SEO und statisches Rendering empfohlen, da jede Sprache eine eigene URL hat:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfiguration

Erstellen Sie eine Datei `intlayer.config.ts`, um die unterstützten Sprachen zu deklarieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Ohne Locale-Pfad" value="without-locale-path">

### Architektur

Die Routen enthalten kein `[locale]`-Segment. Alle Seiten liegen direkt unter `src/app/`, und die Locale stammt aus Cookies, Headern oder Query-Parametern. Das passt zu Dashboards und Apps mit Authentifizierung:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfiguration

Setzen Sie `routing.mode` auf `"search-params"` (z. B. `/about?locale=fr`) oder `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Diese Datei legt auch die Proxy-Weiterleitung, die Cookie-Namen, den Speicherort und die Endung Ihrer Content-Deklarationen, Logs und mehr fest. Die vollständige Liste finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

- [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

</Step>
<Step number={3} title="Intlayer in Ihre Vite-Konfiguration integrieren">

Fügen Sie das Plugin `intlayer()` neben `vinext()` in `vite.config.ts` hinzu:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Das Plugin `intlayer()` baut Ihre Dictionaries, bevor der Build startet, beobachtet Content-Dateien in der Entwicklung und richtet die Aliase und Optimierungen ein, die `next-intlayer` in den RSC-, SSR- und Client-Umgebungen nutzt.

> `intlayer()` liefert außerdem eine Locale-Routing-Middleware für den Vite-Dev-Server mit. Unter vinext übernimmt `src/proxy.ts` diese Aufgabe bereits, in der Entwicklung und in Ihrer Produktions-Runtime. Die Option `ignore` schaltet die Vite-Variante daher ab, damit nicht jede Anfrage doppelt geroutet wird.

> Verwenden Sie `withIntlayer()` nicht in `next.config.ts`. vinext liest `next.config.ts` für Optionen wie `redirects`, `rewrites` und `headers`, führt aber keine webpack- oder Turbopack-Plugins aus.

Wenn Sie auf Cloudflare Workers deployen, behalten Sie das von `vinext init` erzeugte Plugin `cloudflare()`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Dynamische Locale-Routen definieren">

<Tabs group="routing-mode">
<Tab label="Mit Locale-Pfad" value="with-locale-path">

Entfernen Sie den gesamten Inhalt von `RootLayout` und ersetzen Sie ihn durch den folgenden Code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Wenn `RootLayout` leer bleibt, kann das Locale-Layout die Attribute [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) und [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) am `<html>`-Tag setzen.

Fügen Sie ein Layout in Ihrem `[locale]`-Verzeichnis hinzu:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Ein einziger `IntlayerProvider` deckt beide Hälften des Baums ab: Er stellt Server Components die Locale bereit und bindet den Client-Provider ein, damit Client Components dieselbe Locale erhalten.

> Das Segment `[locale]` enthält die Locale: `/en-US/about` wird zu `en-US` aufgelöst, `/fr/about` zu `fr`. Die frühere `src/app/page.tsx` wird nicht mehr verwendet und kann entfernt werden. Der Proxy (Schritt 7) liefert die Standard-Locale unter der Wurzel aus.

> `generateStaticParams` sorgt dafür, dass vinext jede Seite für jede Locale vorab rendert. vinext erzwingt außerdem `dynamicParams`, sodass eine unbekannte Locale ein 404 liefert, wenn Sie `export const dynamicParams = false` setzen.

</Tab>
<Tab label="Ohne Locale-Pfad" value="without-locale-path">

Es gibt kein `[locale]`-Verzeichnis. Konfigurieren Sie `src/app/layout.tsx` so, dass es die Locale aus der Anfrage liest und Ihre Anwendung mit `IntlayerProvider` umschließt:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Inhalte deklarieren">

Erstellen Sie Content-Deklarationen, um Ihre Übersetzungen zu speichern:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        de: "Beginnen Sie mit der Bearbeitung von",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "de": "Beginnen Sie mit der Bearbeitung von",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Content-Deklarationen können an beliebiger Stelle im Verzeichnis `contentDir` liegen (standardmäßig `./src`), solange sie zur Endung für Content-Deklarationen passen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Weitere Details finden Sie in der [Dokumentation zur Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

- [Dokumentation zur Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)

</Step>
<Step number={6} title="Inhalte in Ihrem Code verwenden">

Greifen Sie aus jeder Komponente auf Ihre Dictionaries zu:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` ist isomorph: Die Export-Bedingung `react-server`, die vinext in seiner RSC-Umgebung anwendet, gibt Server Components die Server-Implementierung, während Client Components die kontextbasierte erhalten. Derselbe Aufruf funktioniert auf beiden Seiten.

> Um Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href` oder `aria-label` zu verwenden, lesen Sie seinen Wert:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Mehr dazu in der [`useIntlayer`-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md).

- [`useIntlayer`-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md)

> Wenn Ihre App bereits existiert, transformieren der [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) und der [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) Tausende Komponenten in einer Sekunde.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)
- [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md)

</Step>
<Step number={7} title="Proxy für die Locale-Erkennung konfigurieren">

vinext führt `proxy.ts` (und `middleware.ts`) wie Next.js 16 aus, in der Entwicklung und in der Produktion, auch auf Cloudflare Workers. Exportieren Sie den Intlayer-Proxy:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` erkennt die bevorzugte Locale des Nutzers, leitet gemäß der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) auf die passende URL weiter und speichert die Locale in einem Cookie. Er übergibt die Locale außerdem an `getLocale()` und die Server-Hooks, behalten Sie ihn also auch bei der Architektur ohne Locale-Pfad bei.

- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

> Um mehrere Proxys zu verketten (zum Beispiel `intlayerProxy` mit Authentifizierung), verwenden Sie `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internationalisierung Ihrer Metadaten" isOptional={true}>

vinext unterstützt die Metadata-API. Verwenden Sie `generateMetadata` mit `getIntlayer`, um die Metadaten Ihrer Seiten zu übersetzen:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      de: "Meine vinext-App",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      de: "Eine Next.js-App, die auf Vite läuft",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> Die aus `intlayer` importierte Funktion `getIntlayer` liefert Rohwerte, die direkt für das Metadaten-Objekt geeignet sind. Die Variante aus `next-intlayer` verpackt sie für den visuellen Editor.

</Step>
<Step number={9} title="Internationalisierung Ihrer sitemap.xml und robots.txt" isOptional={true}>

`sitemap.ts` und `robots.ts` funktionieren wie unter Next.js. Verwenden Sie `getMultilingualUrls`, um jede lokalisierte URL aufzulisten:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Die Sprache Ihrer Inhalte ändern" isOptional={true}>

Verwenden Sie `next/link`, um zur lokalisierten Seite zu navigieren. vinext behält die clientseitige Navigation und das Prefetching bei, sodass der Wechsel ohne vollständiges Neuladen erfolgt:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Dokumentationsreferenzen:
>
> - [`useLocale`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName`-Funktion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`-Funktion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`-Funktion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Eine lokalisierte Link-Komponente erstellen" isOptional={true}>

Eine eigene `Link`-Komponente stellt internen URLs die aktuelle Locale voran, sodass ein französischer Nutzer, der auf `/about` klickt, auf `/fr/about` landet:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Die aktuelle Locale in Server Actions abrufen" isOptional={true}>

Rufen Sie `getLocale` aus `next-intlayer/server` innerhalb einer Server Action auf:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` liest die vom Proxy gesetzte Locale aus den Request-Headern, dann das Locale-Cookie, dann den `Accept-Language`-Header des Browsers und fällt auf die Standard-Locale zurück.

</Step>
<Step number={13} title="Auf Cloudflare Workers deployen" isOptional={true}>

Intlayer kompiliert die Dictionaries zur Build-Zeit ins Bundle, daher liest zur Laufzeit nichts das Dateisystem, und die App läuft unverändert in workerd. Bauen und deployen Sie mit der vinext-CLI:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Um anderswo zu deployen (Vercel, Netlify, AWS, Node.js), fügen Sie das Vite-Plugin [Nitro](https://v3.nitro.build/) neben `vinext()` hinzu oder setzen Sie `output: "standalone"` in `next.config.ts`. Das Intlayer-Setup ändert sich nicht.

</Step>
<Step number={14} title="Den Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

In einer bestehenden Codebase bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) und einen [Extraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md), um fest eincodierte Strings in Content-Deklarationen zu verschieben.

- [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)
- [Extraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md)

Aktivieren Sie den Compiler in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Führen Sie den Extraktor aus, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren:

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
 <Tab value='Vite compiler'>

Das Vite-Plugin `intlayer()` enthält den Compiler. Sobald `compiler.enabled` gesetzt ist, starten Sie Ihren Dev-Server oder Build wie gewohnt:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScript konfigurieren

Intlayer nutzt Module Augmentation, um Ihre Content-Schlüssel und -Werte zu typisieren.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Binden Sie die generierten Typen in Ihre TypeScript-Konfiguration ein:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git-Konfiguration

Ignorieren Sie die von Intlayer generierten Dateien:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS-Code-Erweiterung

Installieren Sie die offizielle **[Intlayer-VS-Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** für Autovervollständigung von Schlüsseln, Fehler bei fehlenden Übersetzungen, Inline-Vorschauen und Schnellaktionen. Siehe die [Dokumentation der Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md).

- [Dokumentation der Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)

### Weiterführendes

Fügen Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) hinzu oder lagern Sie Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) aus.

- [Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

## Häufig gestellte Fragen

<FAQ>

<Question title="Was ist vinext?">

vinext ist ein Open-Source-Vite-Plugin, gepflegt von Cloudflare, das die öffentliche Next.js-API neu implementiert: App Router und Pages Router, React Server Components, Server Actions, `proxy.ts`, Route Handler und die `next/*`-Module. Ihr Next.js-Code läuft auf Vite und lässt sich nativ auf Cloudflare Workers oder über Nitro auf anderen Plattformen deployen.

</Question>
<Question title="Was ändert sich gegenüber dem Next.js-Setup?">

Nur die Build-Integration. Unter Next.js umschließt `withIntlayer()` die `next.config.ts`. Unter vinext kommt stattdessen das Plugin `intlayer()` aus `vite-intlayer` in die `vite.config.ts`. Provider, Hooks, `proxy.ts`, Metadaten und Sitemap-Code bleiben identisch, sodass Sie für alles, was diese Seite nicht abdeckt, der [Next.js-16-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md) folgen können.

- [Next.js-16-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)

</Question>
<Question title="Brauche ich die i18n-Konfiguration von Next.js oder das SWC-Plugin?">

Nein. Das Feld `i18n` in `next.config.ts` deckt unter vinext nur die Locale-Präfixe des Pages Routers ab, und Intlayer übernimmt das Routing selbst über `proxy.ts`. Auch das Plugin `@intlayer/swc` ist nicht nötig: Das Vite-Plugin ersetzt die `useIntlayer`-Aufrufe bereits, sodass jede Seite nur die Dictionaries ausliefert, die sie verwendet. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md).

- [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)

</Question>
<Question title="Brauche ich `intlayer watch` in der Entwicklung?">

Nein. Das Vite-Plugin `intlayer()` startet den Content-Watcher mit `vite dev`, und eine Änderung am Inhalt aktualisiert per Hot Update nur die Komponenten, die das geänderte Dictionary lesen.

</Question>
<Question title="Kann ich von `next-intl` oder `i18next` migrieren, ohne meine Komponenten umzuschreiben?">

Ja. Folgen Sie der [Migrationsanleitung von next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md) oder der [Migrationsanleitung von i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md), oder behalten Sie Ihre aktuelle API mit den [Kompatibilitätsadaptern](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md), die die APIs von `next-intl`, `react-i18next` und `react-intl` auf Basis von Intlayer-Dictionaries bereitstellen.

- [Migrationsanleitung von next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md)
- [Migrationsanleitung von i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md)
- [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md)

</Question>
<Question title="Muss ich die Locale in die URL schreiben, etwa /fr/about?">

Nein. `routing.mode` akzeptiert:

- `"prefix-no-default"` (Standard): `/about` für die Standard-Locale, `/fr/about` für die anderen.
- `"prefix-all"`: Jede Locale erhält ein Präfix, `/en/about` und `/fr/about`.
- `"no-prefix"`: keine Locale im Pfad, sie wird aus Cookie oder Header ermittelt.
- `"search-params"`: `/about?locale=fr`.

Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) und die Architektur ohne Locale-Pfad in Schritt 2.

- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

</Question>
<Question title="Wie übersetze ich meine App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Die CLI erkennt fehlende Übersetzungen und ergänzt sie mit dem LLM Ihrer Wahl, über Ihren eigenen Anbieter und Ihren eigenen API-Schlüssel. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

- [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md)
- [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md)

</Question>
<Question title="Wie finde ich fehlende Übersetzungen vor dem Release?">

Führen Sie `npx intlayer test` in der CI aus. Der Build schlägt fehl, wenn einer deklarierten Locale Inhalte fehlen. Die [VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md) zeigt dieselben Fehler schon während des Tippens an, und das [ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md) markiert fest eincodierte Strings.

- [VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)
- [ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)

</Question>
<Question title="Ist Intlayer kostenlos und Open Source?">

Ja. Intlayer ist Open Source unter der Apache-2.0-Lizenz, und die Bibliothek, die CLI, der visuelle Editor und der Compiler sind kostenlos nutzbar, auch kommerziell. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst und lässt sich auch [selbst hosten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md).

- [Selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md)

</Question>

</FAQ>
