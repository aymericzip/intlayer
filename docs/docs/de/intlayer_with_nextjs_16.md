---
createdAt: 2025-10-25
updatedAt: 2026-08-30
title: "Next.js 16 i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Next.js 16-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzufügen"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Erwähnung von `x-default` im `alternates`-Objekt hinzugefügt"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Initiale Historie"
author: aymericzip
---

# Übersetzen Sie Ihre Next.js 16 Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Die beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Application Template](https://github.com/aymericzip/intlayer-next-16-template) auf GitHub.

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „next-intl“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>
<Accordion header="Vollständige Next.js-Abdeckung">

Intlayer ist für die Zusammenarbeit mit **Serverkomponenten** für effizientes Rendern optimiert und vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Es blockiert kein statisches Rendering und bietet Middleware sowie alle für die Skalierung der Internationalisierung erforderlichen Funktionen (i18n).

> Intlayer ist mit Next.js 12, 13, 14, 15 und 16 kompatibel. Wenn Sie den Next.js Pages Router verwenden, können Sie auf diese [Anleitung] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md) verweisen.
> Das Locale-Routing ist nützlich für SEO, Bundle-Größe und Leistung. Wenn Sie es nicht benötigen, können Sie auf diesen [Leitfaden] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) verweisen.
> Informationen zu Next.js 12, 13, 14 und 15 mit dem App Router finden Sie in dieser [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

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

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die notwendigen Pakete mit npm:

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

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in Next.js bereit. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie einen Proxy zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

</Step>

<Step number={2} title="Konfigurieren Sie Ihr Projekt">

Here is the final structure that we will make:

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
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter lesen Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Next.js-Konfiguration">

Konfigurieren Sie Ihre Next.js-Umgebung, um Intlayer zu verwenden:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Konfigurationsoptionen hier */};

export default withIntlayer(nextConfig);
```

> Das Next.js-Plugin `withIntlayer()` wird verwendet, um Intlayer in Next.js zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) Umgebungen. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren und gewährleistet die Kompatibilität mit Server-Komponenten.

> Die `withIntlayer()`-Funktion ist eine Promise-Funktion. Sie ermöglicht es, die Intlayer-Dictionaries vorzubereiten, bevor der Build beginnt. Wenn du sie mit anderen Plugins verwenden möchtest, kannst du sie awaiten. Beispiel:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Wenn du sie synchron verwenden möchtest, kannst du die `withIntlayerSync()`-Funktion verwenden. Beispiel:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Die Funktion `withIntlayer()` ist eine Promise-Funktion. Sie ermöglicht es, die Intlayer-Wörterbücher vorzubereiten, bevor der Build startet. Wenn Sie sie mit anderen Plugins verwenden möchten, können Sie sie mit `await` aufrufen. Beispiel:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Wenn Sie es synchron verwenden möchten, können Sie die Funktion `withIntlayerSync()` verwenden. Beispiel:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer erkennt automatisch, ob Ihr Projekt **webpack** oder **Turbopack** verwendet, basierend auf den Befehlszeilen-Flags `--webpack`, `--turbo` oder `--turbopack`, sowie Ihrer aktuellen **Next.js-Version**.
>
> Seit `next>=16`, wenn Sie **Rspack** verwenden, müssen Sie Intlayer explizit zwingen, die Webpack-Konfiguration zu verwenden, indem Sie Turbopack deaktivieren:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definieren Sie dynamische Locale-Routen">

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es durch den folgenden Code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Sie können die Kinder weiterhin mit anderen Providern umschließen, wie z.B. `next-themes`, `react-query`, `framer-motion` usw.
  <>{children}</>
);

export default RootLayout;
```

> Die `RootLayout`-Komponente leer zu halten, ermöglicht es, die Attribute [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) und [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) im `<html>`-Tag zu setzen.

Um dynamisches Routing zu implementieren, geben Sie den Pfad für die Locale an, indem Sie ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzufügen:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Ein einziger `IntlayerProvider` deckt beide Hälften des Baums ab: Er initialisiert den anfrage-bezogenen Server-Kontext, der von den Server-Hooks gelesen wird, und mountet den Client-Provider, sodass Client-Komponenten dieselbe Locale erhalten.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> Das Pfadsegment `[locale]` wird verwendet, um die Spracheinstellung (Locale) zu definieren. Beispiel: `/en-US/about` bezieht sich auf `en-US` und `/fr/about` auf `fr`.

> In diesem Stadium werden Sie auf den Fehler stoßen: `Error: Missing <html> and <body> tags in the root layout.`. Dies ist zu erwarten, da die Datei `/app/page.tsx` nicht mehr verwendet wird und entfernt werden kann. Stattdessen aktiviert das Pfadsegment `[locale]` die Seite `/app/[locale]/page.tsx`. Folglich sind die Seiten über Pfade wie `/en`, `/fr`, `/es` in Ihrem Browser zugänglich. Um die Standardsprache als Root-Seite festzulegen, siehe die `proxy`-Konfiguration in Schritt 7.

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungs-Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Rest des Codes*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Zeile zum Einfügen

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Rest des Codes*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` stellt sicher, dass Ihre Anwendung die notwendigen Seiten für alle Sprachen vorab erstellt, wodurch die Laufzeitberechnung reduziert und die Benutzererfahrung verbessert wird. Weitere Details finden Sie in der [Next.js-Dokumentation zu generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).
>
> Intlayer arbeitet mit `export const dynamic = 'force-static';`, um sicherzustellen, dass die Seiten für alle Sprachen vorab erstellt werden.

</Step>

<Step number={5} title="Deklarieren Sie Ihre Inhalte">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "de": "Beginnen Sie mit der Bearbeitung",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./src`) aufgenommen werden. Und sie müssen die Dateiendung für Inhaltsdeklarationen erfüllen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={6} title="Inhalte in Ihrem Code verwenden">

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** wird einmal im Locale-Layout bereitgestellt. Es stellt das Locale sowohl für Server- als auch für Client-Komponenten bereit, sodass Seiten sich nicht mehr selbst umhüllen.
- Die Server-Hooks lösen das Locale in dieser Reihenfolge auf: das beim Aufruf übergebene Locale, dann der vom Provider gesäte Server-Kontext, dann das mit der Anfrage übertragene Locale (der vom Intlayer-Proxy gesetzte `x-intlayer-locale`-Header, dann das Locale-Cookie). Dieser letzte Schritt ist es, der den Inhalt bei einer clientseitigen Navigation korrekt hält, die nur das Seitensegment neu rendert, wobei das Layout – und damit der Provider – nicht neu ausgeführt wird.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* Hauptinhalt von getStarted */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* Seitenlink von getStarted */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** wird verwendet, um die Locale an Client-seitige Komponenten bereitzustellen. Es kann in jeder übergeordneten Komponente platziert werden, einschließlich des Layouts. Es wird jedoch empfohlen, es im Layout zu platzieren, da Next.js Layout-Code über Seiten hinweg teilt, was effizienter ist. Durch die Verwendung von `IntlayerClientProvider` im Layout vermeidet man die erneute Initialisierung für jede Seite, verbessert die Leistung und sorgt für einen konsistenten Lokalisierungskontext in der gesamten Anwendung.
- **`IntlayerServerProvider`** wird verwendet, um die Locale an die Server-Kinder bereitzustellen. Es kann nicht im Layout gesetzt werden.

  > Layout und Seite können keinen gemeinsamen Server-Kontext teilen, da das Server-Kontext-System auf einem pro-Anfrage-Datenspeicher basiert (über den [React Cache](https://react.dev/reference/react/cache)-Mechanismus), wodurch jeder "Kontext" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufheben und verhindern, dass die Server-Kontextwerte korrekt an Ihre Server-Komponenten weitergegeben werden.

  > Layout und Seite können keinen gemeinsamen Server-Kontext teilen, da das Server-Kontext-System auf einem pro-Anfrage-Datenspeicher basiert (über den [React-Cache](https://react.dev/reference/react/cache)-Mechanismus), wodurch jeder "Kontext" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufheben und die korrekte Weitergabe der Server-Kontextwerte an Ihre Server-Komponenten verhindern.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Erstelle zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Erstellen Sie eine zugehörige Content-Deklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` ist der isomorphe Importpfad: Die `react-server` Export-Bedingung gibt Server-Komponenten die ambient-locale Implementierung, während Client-Komponenten die context-backed Implementierung erhalten. Derselbe Aufruf funktioniert auf beiden Seiten.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Erstellen der zugehörigen Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z.B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, zum Beispiel:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Um mehr über den `useIntlayer` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md).

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

</Step>

<Step number={7} title="Proxy für die Lokalerkennung konfigurieren" isOptional={true}>

Richten Sie einen Proxy ein, um die bevorzugte Sprache des Benutzers zu erkennen:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Der `intlayerProxy` wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben. Zusätzlich ermöglicht er das Speichern der bevorzugten Sprache des Benutzers in einem Cookie.

> Seit Intlayer v9 respektiert diese Middleware die `routing.enableProxy` Option (`true` standardmäßig). Setzen Sie `routing.enableProxy: false` in Ihrer Konfiguration, um sie in einen Pass-Through umzuwandeln, ohne diese Datei zu entfernen. Siehe die [v9 Release Notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

> Falls Sie mehrere Proxies hintereinander schalten müssen (zum Beispiel `intlayerProxy` mit Authentifizierung oder benutzerdefinierten Proxies), stellt Intlayer jetzt einen Helfer namens `multipleProxies` zur Verfügung.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internationalisierung Ihrer Metadaten" isOptional={true}>

Falls Sie Ihre Metadaten internationalisieren möchten, wie zum Beispiel den Titel Ihrer Seite, können Sie die von Next.js bereitgestellte Funktion `generateMetadata` verwenden. Innerhalb dieser Funktion können Sie den Inhalt aus der Funktion `getIntlayer` abrufen, um Ihre Metadaten zu übersetzen.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "de": "Preact-Logo",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "de": "Erstellt mit create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * Generiert ein Objekt, das alle URLs für jede Locale enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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

// ... Rest des Codes
````

> Beachten Sie, dass die aus `next-intlayer` importierte Funktion `getIntlayer` Ihren Inhalt in einem `IntlayerNode` kapselt, was die Integration mit dem visuellen Editor ermöglicht. Im Gegensatz dazu gibt die aus `intlayer` importierte Funktion `getIntlayer` Ihren Inhalt direkt ohne zusätzliche Eigenschaften zurück.

> Erfahren Sie mehr über die Optimierung von Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internationalisierung Ihrer sitemap.xml und robots.txt" isOptional={true}>

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

// Funktion zur Erstellung der Robots.txt-Regeln
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Gilt für alle User-Agents
    allow: ["/"], // Erlaubte Pfade
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Verbotene Pfade (mehrsprachig)
  },
  host: "https://example.com", // Hostname der Website
  sitemap: `https://example.com/sitemap.xml`, // Pfad zur Sitemap
});

export default robots;
```

> Erfahren Sie mehr über die Sitemap-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die robots.txt-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Ändern Sie die Sprache Ihres Inhalts" isOptional={true}>

Um die Sprache Ihres Inhalts in Next.js zu ändern, wird empfohlen, die `Link`-Komponente zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite weiterzuleiten. Die `Link`-Komponente ermöglicht das Vorladen der Seite, was hilft, ein vollständiges Neuladen der Seite zu vermeiden.

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
            replace // Wird sicherstellen, dass die "Zurück"-Schaltfläche des Browsers zur vorherigen Seite zurückführt
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Eine alternative Möglichkeit ist die Verwendung der `setLocale`-Funktion, die vom `useLocale`-Hook bereitgestellt wird. Diese Funktion erlaubt kein Prefetching der Seite. Weitere Details finden Sie in der [`useLocale`-Hook-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

> Sie können auch eine Funktion in der Option `onLocaleChange` festlegen, um eine benutzerdefinierte Funktion auszulösen, wenn sich die Locale ändert.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Rest des Codes

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Wechsel zu Französisch
  </button>
);
```

> Dokumentationsverweise:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Erstellen einer lokalisierten Link-Komponente" isOptional={true}>

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch das aktuelle Sprachpräfix hinzu. Zum Beispiel wird ein französischsprachiger Benutzer, der auf einen Link zur "Über uns"-Seite klickt, zu `/fr/about` anstelle von `/about` weitergeleitet.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung wird sichergestellt, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code leichter wartbar und erweiterbar, wenn Ihre Anwendung wächst.

Unten sehen Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Sprachpräfix zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und eine gültige href vorhanden ist, wird die lokalisierte URL verwendet.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Funktionsweise

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie nicht lokalisiert werden müssen.

- **Abrufen der aktuellen Locale**:  
  Der Hook `useLocale` liefert die aktuelle Locale (z. B. `fr` für Französisch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht extern) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Locale zu versehen. Das bedeutet, wenn Ihr Benutzer Französisch eingestellt hat, wird beim Übergeben von `/about` als `href` daraus `/fr/about`.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück, wodurch sichergestellt wird, dass die Navigation konsistent mit der Locale erfolgt.

Durch die Integration dieser `Link`-Komponente in Ihre gesamte Anwendung gewährleisten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von verbesserter SEO und Benutzerfreundlichkeit.

</Step>

<Step number={12} title="Die aktuelle Locale in Server Actions abrufen" isOptional={true}>

Wenn Sie die aktive Locale innerhalb einer Server Action benötigen (z. B. um E-Mails zu lokalisieren oder locale-spezifische Logik auszuführen), rufen Sie `getLocale` aus `next-intlayer/server` auf:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Etwas mit der Locale machen
};
```

> Die Funktion `getLocale` folgt einer kaskadierenden Strategie, um die Locale des Benutzers zu bestimmen:
>
> 1. Zuerst überprüft es die Anforderungsheader auf einen Locale-Wert, der möglicherweise vom Proxy gesetzt wurde
> 2. Wenn kein Locale in den Headern gefunden wird, sucht es nach einem in Cookies gespeicherten Locale
> 3. Wenn kein Cookie gefunden wird, versucht es, die bevorzugte Sprache des Benutzers aus den Browsereinstellungen zu erkennen
> 4. Als letzte Möglichkeit greift es auf das in der Anwendung konfigurierte Standard-Locale zurück
>
> Dies stellt sicher, dass basierend auf dem verfügbaren Kontext das passendste Locale ausgewählt wird.

</Step>

<Step number={13} title="Optimieren Sie Ihre Bundle-Größe" isOptional={true}>

Beim Verwenden von `next-intlayer` werden Wörterbücher standardmäßig in das Bundle für jede Seite aufgenommen. Um die Bundle-Größe zu optimieren, bietet Intlayer ein optionales SWC-Plugin an, das `useIntlayer`-Aufrufe mithilfe von Makros intelligent ersetzt. Dies stellt sicher, dass Wörterbücher nur in Bundles für Seiten enthalten sind, die sie tatsächlich verwenden.

Um diese Optimierung zu aktivieren, installieren Sie das Paket `@intlayer/swc`. Nach der Installation erkennt `next-intlayer` das Plugin automatisch und verwendet es:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Hinweis: Diese Optimierung ist nur für Next.js 13 und höher verfügbar.

> Hinweis: Dieses Paket wird standardmäßig nicht installiert, da SWC-Plugins in Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

> Hinweis: Dieses Paket ist nicht standardmäßig installiert, da SWC-Plugins in Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.
>
> Hinweis: Wenn Sie die Option `importMode: 'dynamic'` oder `importMode: 'fetch'` (in der Dictionary-Konfiguration) setzen, basiert dies auf Suspense. Daher müssen Sie Ihre `useIntlayer`-Aufrufe in eine `Suspense`-Begrenzung umschließen. Das bedeutet, dass Sie `useIntlayer` nicht direkt auf der obersten Ebene Ihrer Page-/Layout-Komponente verwenden können.

</Step>

<Step number={14} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

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

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

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

### Überwachen von Wörterbuchänderungen mit Turbopack

Wenn Sie Turbopack als Entwicklungsserver mit dem Befehl `next dev` verwenden, werden Wörterbuchänderungen standardmäßig nicht automatisch erkannt.

Diese Einschränkung besteht, weil Turbopack keine Webpack-Plugins parallel ausführen kann, um Änderungen in Ihren Inhaltsdateien zu überwachen. Um dies zu umgehen, müssen Sie den Befehl `intlayer watch` verwenden, um sowohl den Entwicklungsserver als auch den Intlayer-Build-Watcher gleichzeitig auszuführen.

```json5 fileName="package.json"
{
  // ... Ihre bestehenden package.json-Konfigurationen
  "scripts": {
    // ... Ihre bestehenden Skript-Konfigurationen
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Wenn Sie next-intlayer@<=6.x.x verwenden, müssen Sie das Flag `--turbopack` beibehalten, damit die Next.js 16-Anwendung korrekt mit Turbopack funktioniert. Wir empfehlen die Verwendung von next-intlayer@>=7.x.x, um diese Einschränkung zu vermeiden.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Enthält die automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese Dateien in Ihr Git-Repository übernommen werden.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** der übersetzten Inhalte.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Next.js-App zu internationalisieren?">

Next.js hat keine eingebaute Message-Ebene, seit das `i18n`-Feld von `next.config.js` nicht mehr für den App Router gilt, sodass die Lokalisierungsebene immer eine Bibliothekswahl ist:

- **`next-intl`**, **`i18next` / `next-i18next`** und **`react-intl`**: die historischen Optionen, basierend auf JSON- oder ICU-Message-Katalogen, die pro Namespace geladen werden.
- **`Lingui`**: extraktionsgetrieben, mit zur Build-Zeit kompilierten ICU-Nachrichten.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert, zur Build-Zeit in Wörterbücher pro Komponente kompiliert, vollständig typisiert, mit KI-Übersetzung, visuellem Editor und CMS inklusive.

Der praktische Unterschied ist, was den Browser erreicht. Namespace-basierte Bibliotheken liefern ganze JSON-Kataloge an eine Seite, während Intlayer nur den Inhalt ausliefert, den die gerenderten Komponenten verwenden, was Bundle- und Seitengröße um bis zu 50 % senkt. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Next.js-i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Next.js-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Server Components lösen ihren Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

</Question>

<Question title="Kann ich von `next-intl`, `next-i18next` oder `i18next` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [next-intl-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md) oder dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `next-intl`, `react-i18next` und `react-intl` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Komponenten, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Schritt 14 dieses Leitfadens führt Sie hindurch.

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

<Question title="Funktioniert Intlayer mit dem Next.js App Router und React Server Components?">

Ja. `next-intlayer` ist für den App Router gebaut: Inhalte werden auf dem Server innerhalb von Server Components aufgelöst, sodass für serverseitig gerenderten Text kein Wörterbuch an den Client gesendet wird. Client Components verwenden denselben `useIntlayer`-Hook über den Provider. Intlayer blockiert statisches Rendering nicht und ist mit Turbopack kompatibel.

</Question>

<Question title="Welche Next.js-Versionen unterstützt Intlayer?">

Intlayer unterstützt Next.js 12, 13, 14, 15 und 16. Dieser Leitfaden behandelt Next.js 16. Für ältere Setups folgen Sie dem [Next.js-15-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md), dem [Next.js-14-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md) oder dem [Pages-Router-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="Muss ich die Locale in die URL aufnehmen, wie /fr/about?">

Nein. Das URL-Schema ist eine Konfigurationsoption, keine Einschränkung. `routing.mode` akzeptiert:

- `"prefix-no-default"` (Voreinstellung): `/about` für die Standard-Locale, `/fr/about` für die anderen.
- `"prefix-all"`: jede Locale erhält ein Präfix, `/en/about` und `/fr/about`.
- `"no-prefix"`: keine Locale im Pfad, aus Cookie, Header oder Domain aufgelöst.
- `"search-params"`: `/about?locale=fr`.

Sie können jede Locale mit `routing.domains` auch ihrer eigenen Domain zuordnen. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) und den [Leitfaden ohne Locale-Pfad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="Wie füge ich hreflang-Tags und lokalisierte Metadaten für SEO hinzu?">

Verwenden Sie die Next.js-Funktion `generateMetadata` zusammen mit `getMultilingualUrls` von Intlayer. Sie erstellt die `alternates.languages`-Zuordnung für jede deklarierte Locale, einschließlich des `x-default`-Eintrags, sodass Suchmaschinen die richtige Sprachversion ausliefern. Derselbe Helfer lokalisiert `sitemap.ts` und `robots.ts`. Schritt 8 und Schritt 9 dieses Leitfadens zeigen den vollständigen Code.

</Question>

<Question title="Wie übersetze ich eine Next.js-App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Die CLI erkennt fehlende Übersetzungen über Ihre Inhaltsdateien hinweg und füllt sie mit dem LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, sodass Sie den Anbieter direkt bezahlen und nichts über einen Dritten läuft. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus, Bedingungen und Rich Text?">

Ja. Inhaltsdeklarationen unterstützen [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md) für interpolierte Werte und [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) für Rich Text wie Rechtsseiten oder Blog-Texte. Zahlen, Daten und Währungen werden von den [Formattern](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) übernommen.

</Question>

<Question title="Wie können Übersetzer und Nicht-Entwickler die Inhalte bearbeiten?">

Zwei Optionen, beide optional. Der [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) läuft auf Ihrer eigenen Infrastruktur und lässt jeden auf den Text Ihrer Website klicken, um ihn direkt zu bearbeiten. Das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) lagert die Inhalte aus, sodass sie ohne Deployment aktualisiert werden können, wobei der [Live-Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md) Änderungen zur Laufzeit widerspiegelt.

</Question>

<Question title="Wie finde ich fehlende Übersetzungen vor der Auslieferung?">

Führen Sie `npx intlayer test` in der CI aus. Es lässt den Build fehlschlagen, wenn einer deklarierten Locale Inhalt fehlt, sodass ein unübersetzter String nie in die Produktion gelangt. Die [VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md) zeigt dieselben Fehler beim Tippen an, und das [ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md) und seine Regel `no-raw-text` fangen fest kodierte Strings ab. Siehe [Testen Ihrer Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md).

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja. Intlayer ist Open Source unter der Apache-2.0-Lizenz, und die gesamte Bibliothek, die CLI, der visuelle Editor und der Compiler sind kostenlos nutzbar, auch kommerziell. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst und kann auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden.

</Question>

</FAQ>
