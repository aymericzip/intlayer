---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - So übersetzen Sie eine Vanilla JS App im Jahr 2026
description: Entdecken Sie, wie Sie Ihre Vanilla JS Website mehrsprachig machen. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Verlauf initialisiert"
---

# Übersetzen Sie Ihre Vanilla JS Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren.**
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was die Autovervollständigung und Fehlererkennung verbessert.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Spracherkennung und -umschaltung.

Dieser Leitfaden zeigt, wie man Intlayer in einer Vanilla-JavaScript-Anwendung verwendet, **ohne einen Paketmanager oder Bundler** (wie Vite, Webpack usw.) zu nutzen.

Wenn Ihre Anwendung einen Bundler (wie Vite) verwendet, empfehlen wir stattdessen dem [Vite + Vanilla JS Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vanilla.md) zu folgen.

Mithilfe des Standalone-Bundles können Sie Intlayer direkt in Ihre HTML-Dateien über eine einzige JavaScript-Datei importieren, was es perfekt für Legacy-Projekte oder einfache statische Websites macht.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vanilla JS Anwendung

### Schritt 1: Abhängigkeiten installieren

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

### Schritt 2: Konfiguration Ihres Projekts

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

### Schritt 3: Das Bundle in Ihr HTML importieren

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

### Schritt 4: Intlayer in Ihrem Einstiegspunkt initialisieren

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

### Schritt 5: Deklarieren Sie Ihre Inhalte

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

### Schritt 6: Intlayer in Ihrem JavaScript verwenden

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

### (Optional) Schritt 7: Die Sprache Ihrer Inhalte ändern

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

### (Optional) Schritt 8: HTML Sprach- und Richtungsattribute umschalten

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

### (Optional) Schritt 9: Wörterbücher pro Sprache nachladen (Lazy-load)

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
