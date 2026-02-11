---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - So übersetzen Sie Ihre Angular-App – Leitfaden 2026
description: Erfahren Sie, wie Sie Ihre Angular-Website mehrsprachig gestalten. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 5.5.10
    date: 2025-06-29
    changes: Verlauf initialisieren
---

# Übersetzen Sie Ihre Angular-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was die Autovervollständigung und Fehlererkennung verbessert.
- **Von erweiterten Funktionen profitieren**, wie der dynamischen Erkennung und dem Umschalten der Sprache.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Angular-Anwendung

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-angular-template) auf GitHub.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) bereitstellt.

- **angular-intlayer**
  Das Paket, das Intlayer in Angular-Anwendungen integriert. Es bietet Kontext-Provider und Hooks für die Angular-Internationalisierung.

- **@angular-builders/custom-webpack**
  Erforderlich, um die Webpack-Konfiguration der Angular CLI anzupassen.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Ort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Schritt 3: Intlayer in Ihre Angular-Konfiguration integrieren

Um Intlayer in die Angular CLI zu integrieren, müssen Sie einen benutzerdefinierten Builder verwenden. Diese Anleitung geht davon aus, dass Sie Webpack verwenden (Standard für viele Angular-Projekte).

Ändern Sie zunächst Ihre `angular.json`, um den benutzerdefinierten Webpack-Builder zu verwenden. Aktualisieren Sie die `build`- und `serve`-Konfigurationen:

```json5 fileName="angular.json"
{
  "projects": {
    "ihr-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", // replace "@angular-devkit/build-angular:application",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts",
              "mergeStrategies": { "module.rules": "prepend" },
            },
            "main": "src/main.ts", // replace "browser": "src/main.ts",
            // ...
          },
        },
      },
    },
  },
}
```

> Stellen Sie sicher, dass Sie `ihr-app-name` durch den tatsächlichen Namen Ihres Projekts in der `angular.json` ersetzen.

Erstellen Sie als Nächstes eine `webpack.config.ts`-Datei im Stammverzeichnis Ihres Projekts:

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> Die Funktion `mergeConfig` konfiguriert Webpack mit Intlayer. Sie injiziert das `IntlayerWebpackPlugin` (zur Verarbeitung von Inhaltsdeklarationsdateien) und richtet Aliase für optimale Leistung ein.

### Schritt 4: Inhalte deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations ! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Schritt 5: Intlayer in Ihrem Code nutzen

Um die Internationalisierungsfunktionen von Intlayer in Ihrer gesamten Angular-Anwendung zu nutzen, müssen Sie Intlayer in Ihrer Anwendungskonfiguration bereitstellen.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Fügen Sie den Intlayer-Provider hier hinzu
  ],
};
```

Anschließend können Sie die Funktion `useIntlayer` in jeder Komponente verwenden.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

Und in Ihrem Template:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer-Inhalte werden als `Signal` zurückgegeben, sodass Sie auf die Werte zugreifen, indem Sie das Signal aufrufen: `content().title`.

### (Optional) Schritt 6: Die Sprache Ihrer Inhalte ändern

Um die Sprache Ihrer Inhalte zu ändern, können Sie die Funktion `setLocale` verwenden, die von der Funktion `useLocale` bereitgestellt wird. Damit können Sie die Sprache der Anwendung festlegen und den Inhalt entsprechend aktualisieren.

Erstellen Sie eine Komponente zum Umschalten zwischen Sprachen:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Verwenden Sie diese Komponente dann in Ihrer `app.component.ts`:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### TypeScript konfigurieren

Intlayer verwendet Modul-Augmentierung, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis stabiler zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository committet werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Informationen

Um weiter zu gehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) extern verwalten.

---
