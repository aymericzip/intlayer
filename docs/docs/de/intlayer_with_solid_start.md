---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) SolidStart-App. Server-gerendertes Locale-Routing, hreflang, Sitemap und KI-gestützte Übersetzung."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initiale Historie"
author: aymericzip
---

# Übersetzen Sie Ihre SolidStart-Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Die beste i18n-Lösung für Vite und Solid? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhaltsverzeichnis

<TOC/>

Dieser Leitfaden behandelt eine **server-gerenderte** SolidStart-Anwendung: Die Locale-Erkennung erfolgt bei der Anfrage, Seiten werden auf dem Server in der richtigen Sprache gerendert und die von Suchmaschinen benötigten Signale `<html lang>`, `hreflang` und Sitemap werden serverseitig ausgegeben.

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie `@solid-primitives/i18n` oder `i18next` ist Intlayer eine Lösung, die mit integrierten Optimierungen geliefert wird, wie:

<AccordionGroup>

<Accordion header="Vollständige Solid-Abdeckung">

Intlayer ist optimiert, um perfekt mit Solid zu funktionieren, indem es **Scoping von Inhalten auf Komponentenebene**, **reaktive Übersetzungen** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) erforderlich sind.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur die notwendigen Inhalte. Intlayer hilft dabei, **Ihre Bundle- und Seitengrößen um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Das Scoping des Inhalts Ihrer Anwendung **erleichtert die Wartung** für großflächige Anwendungen. Sie können einen einzelnen Funktionsordner duplizieren oder löschen, ohne die mentale Belastung, Ihre gesamte Inhaltscodebasis zu überprüfen. Darüber hinaus ist Intlayer **vollständig typisiert**, um die Genauigkeit Ihrer Inhalte zu gewährleisten.

</Accordion>

<Accordion header="KI-Agent">

Das Co-Locating von Inhalten **reduziert den erforderlichen Kontext** für große Sprachmodelle (LLMs). Intlayer bietet außerdem eine Reihe von Tools wie ein **CLI** zum Testen auf fehlende Übersetzungen, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agenten-Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung zur Übersetzung in Ihrer CI/CD-Pipeline mit dem LLM Ihrer Wahl zu den Kosten Ihres KI-Anbieters. Intlayer bietet auch einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Web-Plattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), die bei der **Übersetzung im Hintergrund** hilft.

</Accordion>

<Accordion header="Leistung">

Das Verbinden riesiger JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zum Zeitpunkt des Builds.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwicklern">

Mehr als nur eine i18n-Lösung bietet Intlayer einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, um Sie bei der Verwaltung Ihrer mehrsprachigen Inhalte in **Echtzeit** zu unterstützen, sodass die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern nahtlos verläuft. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>
</AccordionGroup>

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer SolidStart-Anwendung

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die erforderlichen Pakete mit npm:

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
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungstools für Konfigurationsverwaltung, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **solid-intlayer**

  Das Paket, das Intlayer in eine Solid-Anwendung integriert. Es stellt Kontext-Provider und Hooks für die Solid-Internationalisierung bereit.

- **vite-intlayer**

  Enthält das Vite-Plugin zur Integration von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie den Locale-Routing-Handler, der die bevorzugte Locale des Benutzers erkennt, Cookies verwaltet und die URL-Weiterleitung handhabt.

> `vite-intlayer` ist hier ein serverseitiges Anliegen, nicht nur eines zur Build-Zeit: Es stellt den Request-Handler bereit, den der Nitro-Server von SolidStart ausführt. Es in `dependencies` zu belassen, ist der sichere Standard — Sie können es nur dann in `devDependencies` verschieben, wenn Sie das erstellte `.output`-Verzeichnis bereitstellen, in das Nitro den Handler einbettet.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Mit `prefix-no-default` wird die Standard-Locale über URLs ohne Präfix bereitgestellt:

```plaintext
/            /about          → Englisch (Standard-Locale)
/fr          /fr/about       → Französisch
/es          /es/about       → Spanisch
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Ort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Intlayer in Ihre Vite-Konfiguration integrieren">

Fügen Sie das Intlayer-Plugin zu Ihrer Konfiguration hinzu:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Das Vite-Plugin `intlayer()` baut Ihre Inhaltsdeklarationsdateien auf, beobachtet sie im Entwicklungsmodus und definiert die Intlayer-Umgebungsvariablen innerhalb der Anwendung. Es stellt auch Aliase bereit, die die Leistung optimieren.

### Locale-Routing kommt mit dem Plugin

SolidStart läuft auf [Nitro](https://nitro.build), und `intlayer()` registriert seinen Locale-Routing-Handler direkt in der Server-Pipeline von Nitro (über die Option `routing.enableProxy`, standardmäßig `true`). Nichts weiter zu verdrahten: Auf einem erstellten Server wird jede Anfrage überprüft, bevor sie den Router erreicht, und

- die Locale wird aus dem URL-Präfix, dann aus dem Cookie `INTLAYER_LOCALE` und dann aus dem Header `Accept-Language` gelesen;
- eine URL ohne Präfix wird auf ihr lokalisiertes Gegenstück weitergeleitet, wenn die aufgelöste Locale nicht die Standard-Locale ist (`/` → `/fr`);
- eine redundant mit Präfix versehene URL wird auf ihre kanonische Form zurückgeleitet (`/en/about` → `/about`);
- das Locale-Cookie wird bei der Antwort zurückgeschrieben.

</Step>

<Step number={4} title="Deklarieren Sie Ihren Inhalt">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart-spezifischer Fallstrick**: Jede `.ts` / `.tsx`-Datei unter `src/routes` wird zu einer Route, und eine `.content.ts`-Datei besitzt einen Standard-Export, sodass sie als Seite erkannt würde. Bewahren Sie die Inhaltsdeklarationen Ihrer **Seiten** außerhalb des Routenverzeichnisses auf (`src/contents/` funktioniert gut). Inhalte von **Komponenten** können am selben Ort verbleiben, da `src/components` nicht vom Dateisystem-Router gescannt wird.

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und mit der Dateierweiterung für Inhaltsdeklarationen übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={5} title="Lokales Routing hinzufügen">

Das Ziel dieses Schritts ist es, jeder Sprache eine eigene URL zu geben, was von Suchmaschinen indiziert wird.

Verschieben Sie Ihre Seiten unter ein **optionales dynamisches Segment**. Im Dateisystem-Router von SolidStart wird `[[locale]]` in das Pfadmuster `:locale?` kompiliert:

```plaintext
src/routes/
  [[locale]].tsx          ← Layout, das das Segment validiert
  [[locale]]/
    index.tsx             → /        und /fr        und /es
    about.tsx             → /about   und /fr/about  und /es/about
  [...404].tsx            → Catch-All für alles andere
```

Die einzige Aufgabe der Layout-Datei besteht darin, das Segment auf eine konfigurierte Locale zu beschränken:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` erweitert `:locale?` in zwei Muster — eines mit dem Segment und eines ohne — und versucht sie nach absteigender Spezifität. `matchFilters` macht den Unterschied zwischen einer funktionierenden und einer verwirrenden Einrichtung:

| URL         | Ohne `matchFilters`                                  | Mit `matchFilters`                                     |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `/fr/about` | Französische Über-uns-Seite                          | Französische Über-uns-Seite                            |
| `/about`    | Über-uns-Seite (statisches Segment gewinnt)          | Über-uns-Seite                                         |
| `/unknown`  | **Startseite**, stillschweigend mit `locale=unknown` | Keine Übereinstimmung → fällt auf die 404-Seite zurück |

> Bevorzugen Sie `[locale]` (erforderlich) gegenüber `[[locale]]`, wenn Sie den Routing-Modus `'prefix-all'` verwenden, und lassen Sie das Segment für `'no-prefix'` oder `'search-params'` ganz weg.

</Step>

<Step number={6} title="Stellen Sie die Locale Ihrer Anwendung zur Verfügung">

Die URL ist die einzige Quelle der Wahrheit für die Locale: Die Middleware hat die Anfrage bereits auf ihren lokalisierten Pfad weitergeleitet, sodass das Lesen des Pfads im Stamm-Layout das Server-Rendering und die Client-Hydratation in Übereinstimmung hält und jede clientseitige Navigation die Locale kostenlos aktualisiert.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Der Server rendert <html> in entry-server.tsx; clientseitige Navigationen
  // zwischen Locales müssen die Attribute selbst aktualisieren.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` reagiert auf sein `locale`-Prop, sodass die Übergabe des Accessor-Aufrufs `locale()` in JSX ausreicht — Solid kompiliert ihn in einen Getter und der gesamte Baum wird in der neuen Sprache neu gerendert, wenn sich die URL ändert.

</Step>

<Step number={7} title="Setzen Sie die HTML-Attribute lang und dir auf dem Server">

Das Element `<html>` wird von `entry-server.tsx` außerhalb des `Router` gerendert. Lesen Sie die Locale stattdessen aus der Anfrage-URL:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Crawler erhalten nun die richtige Sprache mit dem ersten Byte:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Verwenden Sie Intlayer in Ihren Seiten">

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> In Solid gibt `useIntlayer` reaktiven Inhalt zurück (z. B. `content`). Sie können direkt auf seine Eigenschaften zugreifen.

> Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, können Sie den Wert der Funktion verwenden, wie z. B.:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Weitere Informationen zum Hook `useIntlayer` finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useIntlayer.md).

Inhaltsknoten sind nicht auf einfache Übersetzungen beschränkt. Ein pluralisierter Zähler zum Beispiel:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` wählt die Kategorie über `Intl.PluralRules` für die aktive Locale aus, sodass Sprachen mit mehr als zwei Pluralformen ohne zusätzlichen Code funktionieren.

</Step>

<Step number={9} title="Erstellen Sie eine lokalisierte Link-Komponente">

Erstellen Sie eine benutzerdefinierte `Link`-Komponente, die internen URLs automatisch die aktuelle Sprache voranstellt:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Das einmalige Schreiben von `href="/about"` erzeugt nun `/about`, `/fr/about` oder `/es/about` in Abhängigkeit von der aktiven Locale — kein manuelles Hinzufügen von Präfixen auf Ihren Seiten mehr.

</Step>

<Step number={10} title="Erstellen Sie eine Locale-Switcher-Komponente">

Rendern Sie den Switcher als **echte Anker** anstelle eines `<select>`: Jede Sprache der aktuellen Seite wird zu einem crawlbaren Link, der in einem neuen Tab geöffnet werden kann, was ein reines JavaScript-Steuerelement nicht bieten kann.

`getPathWithoutLocale` entfernt das Locale-Segment aus dem aktuellen Pfad und `getLocalizedUrl` baut ihn für die Ziel-Locale neu auf, sodass die Links Ihrem Routing-Modus folgen, ohne dass etwas hartkodiert werden muss. Die Navigation ändert die gerenderte Locale — die Route `[[locale]]` leitet sie aus der URL ab —, während `setLocale` die Auswahl im Cookie `INTLAYER_LOCALE` speichert, sodass ein späeterer Besuch einer locale-freien URL auf dieselbe Sprache aufgelöst wird.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Kanonischer (locale-freier) Pfad der aktuell angezeigten Seite
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Nur exakte Übereinstimmung, damit der Link der Standard-Locale nicht auf jeder Seite
              // als aktiv markiert wird
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Stellt sicher, dass die "Zurück"-Schaltfläche des Browsers zur vorherigen Seite zurückkehrt
              replace
            >
              {/* Sprache in ihrer eigenen Locale - z.B. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> In Solid ist `locale` aus `useLocale` ein **Signal-Accessor**. Verwenden Sie `locale()` (mit Klammern), um seinen aktuellen Wert reaktiv zu lesen.
>
> `getLocaleName(localeItem)` rendert jede Sprache in ihrer eigenen Sprache — `English / Français / Español`. Übergeben Sie ein zweites Argument, um die Namen stattdessen in die aktuell angezeigte Sprache zu übersetzen: `getLocaleName(localeItem, locale())` ergibt `English / French / Spanish` auf Englisch, `anglais / français / espagnol` auf Französisch.
>
> `<A>` setzt bereits `aria-current="page"` auf den Link, der der aktuellen URL entspricht, daher muss dafür nichts hinzugefügt werden. `replace` wird vom gerenderten Attribut vom Router ausgelesen: Es tauscht den Verlaufseintrag aus, anstatt einen hinzuzufügen, sodass die Schaltfläche "Zurück" des Browsers zur vor dem Wechsel besuchten Seite zurückkehrt und nicht zur selben Seite in der vorherigen Sprache.
>
> `dir` und `hreflang` an jedem Link halten Namen von Rechts-nach-Links-Sprachen korrekt ausgerichtet und teilen den von Hilfstechnologien und Crawlern genutzten Systemen mit, auf welche Sprache jeder Link verweist.
>
> Weitere Informationen zum Hook `useLocale` finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Kanonische und hreflang-Links ausgeben" isOptional={true}>

`hreflang`-Anmerkungen teilen Suchmaschinen mit, dass `/about`, `/fr/about` und `/es/about` dieselbe Seite in verschiedenen Sprachen sind. `getMultilingualUrls` leitet sie aus dem kanonischen (locale-freien) Pfad gemäß Ihrem Routing-Modus ab, sodass nichts hartkodiert wird:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** Absolute URL der gerenderten Seite. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Rendern Sie es im Dokumentenkopf, wo die Anfrage-URL verfügbar ist:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … in <head>, neben den anderen Meta-Tags:
<AlternateLinks url={url} />;
```

`GET /fr/about` liefert dann:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Hinweis zu `@solidjs/meta`**: Zum Zeitpunkt des Verfassers werden `<Title>` und `<Meta>` von `@solidjs/meta` auf dem Client nach der Hydratation angewendet, aber **nicht** in den server-gerenderten `<head>` in SolidStart v2 ausgegeben. Bis dies upstream behoben ist, rendern Sie die Tags, die Crawler ohne JavaScript sehen müssen — `canonical`, `hreflang` und bei Bedarf `title` / `description` — direkt in `entry-server.tsx`, wie oben gezeigt.

</Step>

<Step number={12} title="Nicht gefundene Seiten verwalten" isOptional={true}>

Eine Splat-Route im Stammverzeichnis von `src/routes` erfasst jeden Pfad, den das Locale-Segment nicht abgeglichen hat — einschließlich ungültiger Locale-Präfixe, die von `matchFilters` abgelehnt wurden. Da die Locale über das Stamm-Layout weiterhin aus der URL stammt, wird die 404-Seite in der Sprache des Besuchers angezeigt:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Anfrage           | Ergebnis                                    |
| ----------------- | ------------------------------------------- |
| `/xx`             | `404` — `xx` ist keine konfigurierte Locale |
| `/nonexistent`    | `404` in der Standard-Locale                |
| `/fr/nonexistent` | `404` auf Französisch (`Page introuvable`)  |

</Step>

<Step number={13} title="Generieren Sie eine mehrsprachige Sitemap" isOptional={true}>

Der Sitemap-Generator von Intlayer erweitert jeden Pfad in einen Eintrag pro Locale und verdrahtet die `xhtml:link`-Alternativen untereinander, sodass die Route nur die kanonischen, locale-freien Pfade auflisten muss.

> Im Gegensatz zu einfachen Generatoren, die nur flache URLs ausgeben, verdrahtet Intlayer bidirektionale Links zwischen allen lokalisierten Varianten jeder Seite, was Suchmaschinen hilft, lokalisierte URLs zuzuordnen und die richtige an das richtige Publikum zu liefern.

SolidStart wandelt eine Datei, die eine HTTP-Methode exportiert, in eine API-Route um und entfernt die `.ts`-Erweiterung vom Pfad — sodass `src/routes/sitemap.xml.ts` unter `/sitemap.xml` bereitgestellt wird:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
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
};
```

```xml fileName="Ausgabe von GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API-Routen unterstützen keine optionalen Parameter. Belassen Sie diese Datei daher im Stammverzeichnis von `src/routes`, außerhalb des Segments `[[locale]]`. Die Sitemap enthält bereits jede Locale.

Sie können eine `robots.txt` auf dieselbe Weise mit `getMultilingualUrls` erstellen, sodass `Disallow`-Einträge jede lokalisierte Schreibweise eines sensiblen Pfads abdecken:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Rufen Sie die Locale in Ihren Serverfunktionen ab" isOptional={true}>

Möglicherweise möchten Sie in einer Serverfunktion oder einer API-Route auf die aktuelle Locale zugreifen.

In ein Präfix-basierten Setup wie diesem ist **die URL maßgeblich**: `getLocaleFromPath` liest das Präfix aus der Anfrage-URL. `getLocale` ist der Fallback für Anfragen, die kein Locale-Präfix tragen — es prüft das Cookie `INTLAYER_LOCALE`, dann den Header `x-intlayer-locale` und handelt dann `Accept-Language` aus.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Holen Sie sich das Cookie aus der Anfrage (Standard: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Holen Sie sich den Header aus der Anfrage (Standard: 'x-intlayer-locale'),
      // mit Rückfall auf die Accept-Language-Aushandlung
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Rufen Sie Inhalte außerhalb einer Komponente mit getIntlayer() ab
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Verlassen Sie sich hier nicht allein auf `getLocale`: Das Locale-Cookie wird erst geschrieben, wenn ein Besucher aktiv die Sprache wechselt, sodass ein erster Besuch von `/fr/...` auf die Standard-Locale aufgelöst würde.

</Step>

<Step number={15} title="Extrahieren Sie den Inhalt Ihrer Komponenten" isOptional={true}>

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, schlägt Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) vor, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um ihn einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer Datei `intlayer.config.ts` hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest Ihrer Konfiguration
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert werden soll.
     */
    enabled: true,

    /**
     * Definiert den Ausgabepfad der Dateien
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation wird somit dauerhaft sein und der Compiler überspringt die Transformation beim nächsten Prozess. Auf diese Weise kann der Compiler die App transformieren und anschließend entfernt werden.
     *
     * - Wenn `false`, fügt der Compiler den Funktionsaufruf `useIntlayer()` nur in den Code des Build-Outputs ein und lässt die ursprüngliche Codebasis intakt. Die Transformation erfolgt nur im Speicher.
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
 <Tab value="Extraktionsbefehl">

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

> Verschieben Sie die generierten Inhaltsdateien Ihrer Seiten anschließend aus `src/routes`, aus dem in Schritt 5 erklärten Grund.

 </Tab>
 <Tab value="Babel-Compiler">

> Seit v9 ist der `intlayerCompiler` im Plugin `intlayer` enthalten. Sie müssen ihn also nicht manuell hinzufügen.

Aktualisieren Sie Ihre `vite.config.ts`, um das Plugin `intlayerCompiler` einzuschließen:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
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
bun run build # Oder bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="TypeScript konfigurieren">

Intlayer verwendet Modul-Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... Ihre bestehenden Konfigurationen
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Automatisch generierte Typen einschließen
  ],
}
```

Wörterbuchschlüssel und Inhaltspfade werden nun zur Kompilierzeit überprüft:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Überprüfen Ihrer Einrichtung

Bauen Sie den Server und starten Sie ihn, und überprüfen Sie dann, ob sich diese Anfragen wie erwartet verhalten:

```bash
npm run build
node .output/server/index.mjs
```

| Anfrage                                 | Erwartete Antwort                           |
| --------------------------------------- | ------------------------------------------- |
| `GET /`                                 | `200` — Englisch                            |
| `GET /` mit `Accept-Language: fr`       | `302` → `/fr`                               |
| `GET /` mit Cookie `INTLAYER_LOCALE=es` | `302` → `/es`                               |
| `GET /fr`                               | `200` — Französisch, `<html lang="fr">`     |
| `GET /fr/about`                         | `200` — Französische Über-uns-Seite         |
| `GET /en/about`                         | `302` → `/about` (kanonische Weiterleitung) |
| `GET /xx`                               | `404`                                       |
| `GET /fr/nonexistent`                   | `404` auf Französisch                       |
| `GET /sitemap.xml`                      | `200` — Mehrsprachige XML-Sitemap           |

Die Zeilen, die eine Seite rendern, verhalten sich unter `vite dev` identisch. Die drei Weiterleitungszeilen gelten nur für einen erstellten Server, es sei denn, Sie registrieren den Handler selbst als Middleware — siehe Schritt 3.

> Führen Sie den Dev-Server auf Node (`vite dev`) anstelle von Bun (`bun --bun vite dev`) aus: SolidStarts SSR schlägt derzeit unter der Bun-Laufzeitumgebung mit `Expected a Response object, but received 'NodeResponse'` fehl. Dies steht in keinem Zusammenhang mit Intlayer (es lässt sich auf der einfachen Vorlage reproduzieren) und betrifft nur den Dev-Server, nicht `vite build`.

---

## Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese in Ihr Git-Repository zu committen.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

---

## VS Code-Erweiterung

Um Ihre Entwicklererfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

---

## Weitergehen

Um noch weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte über das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsreferenzen

- [Intlayer-Dokumentation](https://intlayer.org)
- [SolidStart-Dokumentation](https://start.solidjs.com)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md)
- [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
