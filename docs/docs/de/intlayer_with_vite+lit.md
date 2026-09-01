---
createdAt: 2026-03-23
updatedAt: 2026-08-30
title: "Vite + Lit i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Vite + Lit-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Lit
  - Webkomponenten
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Anfängliche Historie"
author: aymericzip
---

# Übersetzen Sie Ihre Vite- und Lit-Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „lit-localize“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>
<Accordion header="Volle Lit-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Lit optimiert, indem es **Content-Scoping auf Webkomponentenebene**, **TypeScript-Unterstützung** und alle für die Skalierung der Internationalisierung (i18n) erforderlichen Funktionen bietet.

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

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template) auf GitHub.

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Lit-Anwendung

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
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **lit-intlayer**
  Das Paket, das Intlayer in Lit-Anwendungen integriert. Es bietet auf `ReactiveController` basierende Hooks (`useIntlayer`, `useLocale` usw.), sodass LitElements automatisch neu gerendert werden, wenn sich die Sprache ändert.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Ort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Intlayer in Ihre Vite-Konfiguration integrieren">

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer in Vite zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus bietet es Aliase zur Leistungsoptimierung.

</Step>

<Step number={4} title="Intlayer in Ihrem Einstiegspunkt initialisieren">

Rufen Sie `installIntlayer()` auf, **bevor** benutzerdefinierte Elemente registriert werden, damit das globale Sprach-Singleton bereit ist, wenn sich das erste Element verbindet.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Muss aufgerufen werden, bevor ein LitElement mit dem DOM verbunden wird.
installIntlayer();

// Importieren und registrieren Sie Ihre benutzerdefinierten Elemente.
import "./my-element.js";
```

Wenn Sie auch `md()` Inhaltsdeklarationen (Markdown) verwenden, installieren Sie zusätzlich den Markdown-Renderer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="Ihre Inhalte deklarieren">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können an beliebiger Stelle in Ihrer Anwendung definiert werden, sofern sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={6} title="Intlayer in Ihrem LitElement verwenden">

Verwenden Sie `useIntlayer` innerhalb eines `LitElement`. Es gibt einen `ReactiveController`-Proxy zurück, der automatisch Neu-Renderings auslöst, sobald sich die aktive Sprache ändert – keine zusätzliche Einrichtung erforderlich.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer registriert sich als ReactiveController.
  // Das Element wird automatisch neu gerendert, wenn sich die Sprache ändert.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Wenn Sie den übersetzten String in einem nativen HTML-Attribut benötigen (z. B. `alt`, `aria-label`, `title`), rufen Sie `.value` auf dem Blattknoten auf:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="Die Sprache Ihres Inhalts ändern" isOptional={true}>

Um die Sprache Ihres Inhalts zu ändern, verwenden Sie die Methode `setLocale`, welche vom `useLocale`-Controller bereitgestellt wird.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="Markdown- und HTML-Inhalte rendern" isOptional={true}>

Intlayer unterstützt `md()` und `html()` Inhaltsdeklarationen. In Lit wird die kompilierte Ausgabe als rohes HTML über die `unsafeHTML`-Direktive eingefügt.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Rendern Sie das kompilierte HTML in Ihrem Element:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` ruft `toString()` auf dem `IntlayerNode` auf, was den rohen Markdown-String zurückgibt. Übergeben Sie diesen an `compileMarkdown`, um einen HTML-String zu erhalten, und rendern Sie ihn dann mit Lits `unsafeHTML`-Direktive.

</Step>

<Step number={9} title="Localized Routing zu Ihrer Anwendung hinzufügen" isOptional={true}>

Um eindeutige Routen für jede Sprache zu erstellen (nützlich für SEO), können Sie einen clientseitigen Router zusammen mit Intlayers `localeMap` / `localeFlatMap` Helfern und dem `intlayerProxy` Vite-Plugin für die serverseitige Spracherkennung verwenden.

Fügen Sie zuerst `intlayerProxy` zu Ihrer Vite-Konfiguration hinzu:

> Beachten Sie, dass Sie zur Verwendung von `intlayerProxy` in der Produktion `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

> Seit Intlayer v9 ist `intlayerProxy()` direkt im `intlayer()` Plugin gebündelt und standardmäßig über die Option `routing.enableProxy` (`true` standardmäßig) aktiviert. Die separate Registrierung wie unten gezeigt ist nun optional — sie wird aus Gründen der Rückwärtskompatibilität und für Setups, die die Plugin-Reihenfolge kontrollieren müssen, beibehalten. Setzen Sie `routing.enableProxy: false`, um sich abzumelden. Siehe die [v9 Release Notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="Die URL ändern, wenn sich die Sprache ändert" isOptional={true}>

Um die Browser-URL zu aktualisieren, wenn sich die Sprache ändert, verwenden Sie `useRewriteURL` zusammen mit dem Sprachumschalter:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Schreibt die aktuelle URL automatisch um, wenn sich die Sprache ändert.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="HTML-Sprach- und Richtungsattribute umschalten" isOptional={true}>

Aktualisieren Sie die Attribute `lang` und `dir` des `<html>`-Tags entsprechend der aktuellen Sprache für Barrierefreiheit und SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- Ihr Inhalt -->`;
  }
}
```

</Step>

<Step number={12} title="Den Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

Wenn Sie eine bestehende Codebasis haben, kann das Transformieren von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um dies einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

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
     * Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und kann dann entfernt werden.
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

</Step>

</Steps>

### (Optional) Sitemap und robots.txt (Build-Zeit)

Intlayer stellt Hilfsfunktionen bereit - `generateSitemap` und `getMultilingualUrls` -, mit denen Sie mehrsprachige `sitemap.xml`- und `robots.txt`-Inhalte für Crawler formatieren und automatisch nach `public/` schreiben können. Üblich ist ein kleines Node-Skript **vor** Vite (z. B. npm-`predev`-/`prebuild`-Hooks), damit die Dateien beim Build bzw. Dev-Server vorliegen.

#### Sitemap

Der Sitemap-Generator von Intlayer berücksichtigt Ihre Locales und die üblichen Metadaten für Crawler.

> Die erzeugte Sitemap unterstützt den `xhtml:link`-Namensraum (Hreflang). Statt nur flacher URLs verknüpft Intlayer alle Sprachversionen einer Seite bidirektional (z. B. `/about`, `/fr/about` oder `/about?lang=fr` je nach Routing), was Suchmaschinen hilft.

#### Robots.txt

Mit `getMultilingualUrls` gelten `Disallow`-Regeln für alle lokalisierten Varianten sensibler Pfade.

#### 1. `generate-seo.mjs` im Projektroot anlegen

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` muss installiert sein. Setzen Sie `SITE_URL` in der Produktion über die Umgebung (z. B. in der CI).

> Nutzen Sie möglichst `generate-seo.mjs` für Node-ESM. Bei `generate-seo.js` `"type": "module"` in der `package.json` setzen oder Node mit ESM starten.

#### 2. Skript vor Vite ausführen

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Bei pnpm oder yarn die Befehle anpassen. Aufruf aus der CI ist ebenfalls möglich.

### TypeScript konfigurieren

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` und `useDefineForClassFields: false` werden von Lit für die Unterstützung von Dekoratoren benötigt.

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, sie in Ihr Git-Repository zu übertragen.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```bash
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation über den VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um tiefer einzusteigen, können Sie den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mithilfe des [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) extern verwalten.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Vite-und-Lit-App zu internationalisieren?">

Vite hat keine Meinung zu i18n, sodass die Wahl aus dem Lit-Ökosystem kommt:

- **`@lit/localize`**: die offizielle Option, basierend auf XLIFF-Extraktion und einem kompilierten Bundle pro Locale, sodass ein Sprachwechsel zur Laufzeit den Runtime-Modus benötigt.
- **Ein handgeschriebenes Wörterbuch**, in jedes Element importiert: keine Abhängigkeit, keine Typisierung, keine Werkzeuge.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert und vom Vite-Plugin zur Build-Zeit kompiliert, vollständig typisiert, mit KI-Übersetzung, visuellem Editor und CMS.

Der Vite-spezifische Gewinn ist, dass Übersetzungen zur Compile-Zeit aufgelöst und tree-shaken werden, statt zur Laufzeit als JSON abgerufen zu werden, sodass eine Seite nur die Einträge ausliefert, die sie rendert. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Lit-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `@lit/localize` migrieren, ohne meine Elemente neu zu schreiben?">

Weitgehend. Folgen Sie der [Übersicht der Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md), um die Inhalte zu übernehmen. Sie können auch schrittweise migrieren: Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre vorhandenen JSON-Kataloge als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, sodass beide Ebenen synchron bleiben, während Sie Elemente nach und nach umziehen.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Komponenten, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Schritt 12 dieses Leitfadens führt Sie hindurch.

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

<Question title="Wie verwende ich übersetzten Inhalt in einer Lit-Komponente?">

Lesen Sie den Inhalt innerhalb der `render`-Methode Ihres `LitElement` über die Intlayer-Anbindung, wie Schritt 6 zeigt. Ein Wechsel der Locale löst eine Aktualisierung der Elemente aus, die sie lesen, sodass der Sprachwechsel weder das Neuladen der Seite noch das Ausliefern eines zweiten Bundles erfordert.

</Question>

<Question title="Funktioniert Intlayer mit dem Vite-Dev-Server und Hot Reload?">

Ja. Das `intlayer()`-Vite-Plugin überwacht Ihre `.content.ts`-Dateien und baut die betroffenen Wörterbücher beim Speichern neu, sodass Änderungen ohne Neustart des Dev-Servers erscheinen, und die generierten Typen werden gleichzeitig neu erzeugt, sodass die Autovervollständigung synchron bleibt.

</Question>

<Question title="Wie richte ich lokalisiertes Routing ein?">

Die Schritte 9 und 10 behandeln die lokalisierten Routen und das Umschreiben der URL, wenn sich die Locale ändert. `routing.mode` bestimmt das URL-Schema: `"prefix-no-default"` (die Voreinstellung, `/about` und `/fr/about`), `"prefix-all"`, `"no-prefix"` (aus einem Cookie, einem Header oder einer Domain aufgelöst) oder `"search-params"` (`/about?locale=fr`). Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie unterstütze ich Rechts-nach-links-Sprachen wie Arabisch oder Hebräisch?">

Schritt 11 behandelt das. `getHTMLTextDir` gibt `ltr`, `rtl` oder `auto` für eine Locale zurück, sodass Sie `lang` und `dir` am Wurzelelement aus der aktiven Locale binden und Ihre logischen CSS-Eigenschaften den Rest erledigen lassen.

</Question>

<Question title="Wie handhabe ich SEO-Metadaten in einer clientseitig gerenderten Vite-App?">

Setzen Sie `lang` und `dir` am `html`-Element aus der aktiven Locale und geben Sie `hreflang`-Alternativen für jede deklarierte Locale mit `getMultilingualUrls` aus, einschließlich `x-default`. Für Seiten, die zuverlässig gecrawlt werden müssen, bevorzugen Sie ein vorgerendertes oder serverseitig gerendertes Setup.

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
