---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Vollständiger Leitfaden zur Übersetzung einer Vanilla JS-App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Vanilla JS-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Verlauf initialisiert"
---

# Übersetzen Sie Ihre Vanilla JS Website mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „i18next“ oder „i18n.js“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>

<Accordion header="Vollständige Vanilla JS-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Vanilla JavaScript optimiert, indem es **Framework-unabhängiges Content-Management**, **TypeScript-Unterstützung** und alle für die Skalierung der Internationalisierung (i18n) erforderlichen Funktionen bietet.

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

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vanilla JS Anwendung

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
# Generieren Sie ein Standalone-Bundle von intlayer und vanilla-intlayer
# Diese Datei wird in Ihre HTML-Datei importiert
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Intlayer mit Konfigurationsdatei initialisieren
npx intlayer init --no-gitignore

# Wörterbücher erstellen
npx intlayer build
```

```bash packageManager="pnpm"
# Generieren Sie ein Standalone-Bundle von intlayer und vanilla-intlayer
# Diese Datei wird in Ihre HTML-Datei importiert
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Intlayer mit Konfigurationsdatei initialisieren
pnpm intlayer init --no-gitignore

# Wörterbücher erstellen
pnpm intlayer build
```

```bash packageManager="yarn"
# Generieren Sie ein Standalone-Bundle von intlayer und vanilla-intlayer
# Diese Datei wird in Ihre HTML-Datei importiert
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Intlayer-Konfigurationsdatei initialisieren, TypeScript falls eingerichtet, Umgebungsvariablen
yarn intlayer init --no-gitignore

# Wörterbücher erstellen
yarn intlayer build
```

```bash packageManager="bun"
# Generieren Sie ein Standalone-Bundle von intlayer und vanilla-intlayer
# Diese Datei wird in Ihre HTML-Datei importiert
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Intlayer mit Konfigurationsdatei initialisieren
bun x intlayer init --no-gitignore

# Wörterbücher erstellen
bun x intlayer build
```

- **intlayer**
  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **vanilla-intlayer**
  Das Paket, das Intlayer in reine JavaScript- / TypeScript-Anwendungen integriert. Es bietet ein Pub/Sub-Singleton (`IntlayerClient`) und Callback-basierte Hilfsfunktionen (`useIntlayer`, `useLocale` usw.), damit jeder Teil Ihrer App auf Sprachänderungen reagieren kann, ohne von einem UI-Framework abhängig zu sein.

> Der Bundling-Export des CLI-Befehls `intlayer standalone` erzeugt ein optimiertes Build durch Tree-Shaking ungenutzter Pakete, Locales und nicht essenzieller Logik (wie Weiterleitungen oder Präfixe), die spezifisch für Ihre Konfiguration sind.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Das Bundle in Ihr HTML importieren">

Sobald Sie das `intlayer.js`-Bundle erstellt haben, können Sie es in Ihre HTML-Datei importieren:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />

    <!-- Bundle importieren -->
    <script src="./intlayer.js" defer></script>
    <!-- Hauptskript importieren -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Das Bundle stellt `Intlayer` und `VanillaIntlayer` als globale Objekte auf `window` zur Verfügung.

</Step>

<Step number={4} title="Intlayer in Ihrem Einstiegspunkt initialisieren">

Rufen Sie in Ihrer `src/main.js` die Funktion `installIntlayer()` auf, **bevor** irgendwelche Inhalte gerendert werden, damit das globale Sprach-Singleton bereit ist.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Muss aufgerufen werden, bevor i18n-Inhalte gerendert werden.
installIntlayer();
```

Wenn Sie auch den Markdown-Renderer verwenden möchten, rufen Sie `installIntlayerMarkdown()` auf:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Deklarieren Sie Ihre Inhalte">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können an beliebiger Stelle in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={6} title="Intlayer in Ihrem JavaScript verwenden">

Das Objekt `window.VanillaIntlayer` bietet API-Hilfsfunktionen: `useIntlayer(key, locale?)` gibt den übersetzten Inhalt für einen bestimmten Schlüssel zurück.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Den ursprünglichen Inhalt für die aktuelle Sprache abrufen.
// .onChange() anhängen, um benachrichtigt zu werden, wenn sich die Sprache ändert.
const content = useIntlayer("app").onChange((newContent) => {
  // Nur die betroffenen DOM-Knoten neu rendern oder patchen
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Erstmaliges Rendern
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Greifen Sie auf untergeordnete Werte als Strings zu, indem Sie sie in `String()` einschließen, wodurch die Methode `toString()` des Knotens aufgerufen und der übersetzte Text zurückgegeben wird.
>
> Wenn Sie den Wert für ein natives HTML-Attribut benötigen (z. B. `alt`, `aria-label`), verwenden Sie direkt `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Die Sprache Ihrer Inhalte ändern" isOptional={true}>

Um die Sprache Ihrer Inhalte zu ändern, verwenden Sie die Funktion `setLocale`, die von `useLocale` bereitgestellt wird.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Sprache");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Dropdown synchron halten, wenn sich die Sprache an anderer Stelle ändert
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="HTML Sprach- und Richtungsattribute umschalten" isOptional={true}>

Aktualisieren Sie die Attribute `lang` und `dir` des `<html>`-Tags entsprechend der aktuellen Sprache für Barrierefreiheit und SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Wörterbücher pro Sprache nachladen" isOptional={true}>

Wenn Sie Wörterbücher pro Sprache nachladen möchten, können Sie `useDictionaryDynamic` verwenden. Dies ist nützlich, wenn Sie nicht alle Übersetzungen in der ursprünglichen Datei `intlayer.js` bündeln möchten.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Hinweis: `useDictionaryDynamic` erfordert, dass die Wörterbücher als separate ESM-Dateien verfügbar sind. Dieser Ansatz wird normalerweise verwendet, wenn Sie einen Webserver haben, der die Wörterbücher bereitstellt.
> </Step>

</Steps>

### TypeScript konfigurieren

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Informationen

Um tiefer einzusteigen, können Sie den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
