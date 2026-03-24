---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - Wie man eine Vanilla JS App im Jahr 2026 übersetzt
description: Entdecken Sie, wie Sie Ihre Vite und Vanilla JS Website mehrsprachig machen. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Übersetzen Sie Ihre Vite und Vanilla JS Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, quelloffene Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung von Mehrsprachigkeit in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was die Autovervollständigung und Fehlererkennung verbessert.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Spracherkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite und Vanilla JS Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **vanilla-intlayer**
  Das Paket, das Intlayer in einfache JavaScript / TypeScript Anwendungen integriert. Es bietet ein Pub/Sub-Singleton (`IntlayerClient`) und Callback-basierte Helfer (`useIntlayer`, `useLocale` usw.), sodass jeder Teil Ihrer App auf Sprachänderungen reagieren kann, ohne von einem UI-Framework abhängig zu sein.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> Das Vite-Plugin `intlayer()` wird verwendet, um Intlayer in Vite zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Leistungsoptimierung.

### Schritt 4: Intlayer in Ihrem Einstiegspunkt initialisieren

Rufen Sie `installIntlayer()` auf, **bevor** Inhalte gerendert werden, damit das globale Sprach-Singleton bereit ist.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Muss vor dem Rendern von i18n-Inhalten aufgerufen werden.
installIntlayer();

// Importieren und führen Sie Ihre Anwendungsmodule aus.
import "./app.js";
```

Wenn Sie auch `md()` Inhaltsdeklarationen (Markdown) verwenden, installieren Sie auch den Markdown-Renderer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### Schritt 5: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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
      es: "Haga clic en el logotipo de Vite für weitere Informationen",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
      es: "Haga clic en le logo de Vite für weitere Informationen",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Haga clic en le logo de Vite für weitere Informationen",
    }),
  },
};

module.exports = appContent;
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
        "es": "Haga clic en le logo de Vite für weitere Informationen"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und der Dateierweiterung für Inhaltsdeklarationen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) entsprechen.
>
> Für weitere Details besuchen Sie die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 6: Intlayer in Ihrem JavaScript verwenden

`vanilla-intlayer` spiegelt die Oberflächen-API von `react-intlayer` wider: `useIntlayer(key, locale?)` gibt den übersetzten Inhalt direkt zurück. Verketten Sie `.onChange()` am Ergebnis, um Sprachänderungen zu abonnieren — das explizite Äquivalent zu einem React-Re-Render.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Erhalten Sie den anfänglichen Inhalt für die aktuelle Sprache.
// Verketten Sie .onChange(), um benachrichtigt zu werden, wenn sich die Sprache ändert.
const content = useIntlayer("app").onChange((newContent) => {
  // Nur die betroffenen DOM-Knoten neu rendern oder patchen
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Erstmaliges Rendern
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Greifen Sie auf Endwerte als Zeichenfolgen zu, indem Sie sie in `String()` einschließen, was die `toString()`-Methode des Knotens aufruft und den übersetzten Text zurückgibt.
>
> Wenn Sie den Wert für ein natives HTML-Attribut benötigen (z. B. `alt`, `aria-label`), verwenden Sie direkt `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (Optional) Schritt 7: Die Sprache Ihres Inhalts ändern

Um die Sprache Ihres Inhalts zu ändern, verwenden Sie die Funktion `setLocale`, die von `useLocale` bereitgestellt wird.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // Dropdown synchron halten, wenn sich die Sprache von anderer Stelle aus ändert
  return subscribe((newLocale) => render(newLocale));
}
```

### (Optional) Schritt 8: Markdown- und HTML-Inhalte rendern

Intlayer unterstützt `md()` und `html()` Inhaltsdeklarationen. In Vanilla JS wird die kompilierte Ausgabe als rohes HTML über `innerHTML` eingefügt.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Kompilieren und injizieren Sie das HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` ruft `toString()` auf dem `IntlayerNode` auf, was den rohen Markdown-String zurückgibt. Übergeben Sie diesen an `compileMarkdown`, um einen HTML-String zu erhalten, und setzen Sie ihn dann über `innerHTML`.

> [!WARNING]
> Verwenden Sie `innerHTML` nur mit vertrauenswürdigen Inhalten. Wenn der Markdown aus Benutzereingaben stammt, bereinigen Sie ihn zuerst (z. B. mit DOMPurify). Sie können einen bereinigenden Renderer dynamisch installieren:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (Optional) Schritt 9: Lokalisiertes Routing zu Ihrer Anwendung hinzufügen

Um eindeutige Routen für jede Sprache zu erstellen (nützlich für SEO), können Sie `intlayerProxy` in Ihrer Vite-Konfiguration zur serverseitigen Spracherkennung verwenden.

Fügen Sie zuerst `intlayerProxy` zu Ihrer Vite-Konfiguration hinzu:

> Beachten Sie, dass Sie für die Verwendung von `intlayerProxy` in der Produktion `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // sollte zuerst platziert werden
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // sollte zuerst platziert werden
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // sollte zuerst platziert werden
    intlayer(),
  ],
});
```

### (Optional) Schritt 10: Die URL ändern, wenn sich die Sprache ändert

Um die Browser-URL zu aktualisieren, wenn sich die Sprache ändert, rufen Sie `useRewriteURL()` nach der Installation von Intlayer auf:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Schreibt die URL sofort und bei jeder nachfolgenden Sprachänderung um.
// Gibt eine Unsubscribe-Funktion für die Bereinigung zurück.
const stopRewriteURL = useRewriteURL();
```

### (Optional) Schritt 11: Wechseln der HTML-Sprach- und Richtungsattribute

Aktualisieren Sie die Attribute `lang` und `dir` des `<html>`-Tags entsprechend der aktuellen Sprache für Barrierefreiheit und SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Optional) Schritt 12: Wörterbücher pro Sprache lazy-loaden

Für große Apps möchten Sie vielleicht das Wörterbuch jeder Sprache in einen eigenen Chunk aufteilen. Verwenden Sie `useDictionaryDynamic` zusammen mit dem dynamischen `import()` von Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Das Bundle jeder Sprache wird nur abgerufen, wenn diese Sprache aktiv wird, und das Ergebnis wird zwischengespeichert — nachfolgende Wechsel zur gleichen Sprache erfolgen sofort.

### (Optional) Schritt 13: Den Inhalt Ihrer Komponenten extrahieren

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, schlägt Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) vor, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um dies einzurichten, können Sie einen `compiler` Abschnitt in Ihrer `intlayer.config.ts` Datei hinzufügen:

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
     * Wörterbuchschlüssel-Präfix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extraktions-Befehl'>

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
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel-Compiler'>

Aktualisieren Sie Ihre `vite.config.ts`, um das Plugin `intlayerCompiler` aufzunehmen:

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
bun run build # Oder bun run dev
```

 </Tab>
</Tabs>

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

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository committet werden.

Um dies zu tun, können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei einfügen:

```bash
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Vom VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Weiter gehen

Um weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) extern verwalten.
