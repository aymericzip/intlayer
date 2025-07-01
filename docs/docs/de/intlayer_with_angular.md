---
docName: intlayer_with_angular
url: https://intlayer.org/doc/environment/angular
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Übersetzen Sie Ihre Angular-Website (i18n)
description: Erfahren Sie, wie Sie Ihre mit Angular erstellte Website mehrsprachig gestalten können. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Angular
  - JavaScript
---

# Erste Schritte mit Internationalisierung (i18n) in Angular mit Intlayer

> Dieses Paket befindet sich in der Entwicklung. Weitere Informationen finden Sie im [Issue](https://github.com/aymericzip/intlayer/issues/116). Zeigen Sie Ihr Interesse an Intlayer für Angular, indem Sie das Issue liken

<!-- Siehe [Application Template](https://github.com/aymericzip/intlayer-angular-template) auf GitHub. -->

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Angular-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **angular-intlayer**

  Das Paket, das Intlayer in Angular-Anwendungen integriert. Es stellt Kontextanbieter und Hooks für die Angular-Internationalisierung bereit.

- **@intlayer/webpack**
  Das Paket, das Intlayer mit Webpack integriert. Es wird vom Angular CLI verwendet, um Content-Declaration-Dateien zu erstellen und diese im Entwicklungsmodus zu überwachen.

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
      // Ihre weiteren Sprachversionen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Das Paket, das Intlayer mit Webpack integriert. Es wird vom Angular CLI verwendet, um Content-Declaration-Dateien zu erstellen und diese im Entwicklungsmodus zu überwachen.

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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Angular-Konfiguration

Um Intlayer mit der Angular CLI zu integrieren, haben Sie je nach verwendetem Builder zwei Optionen: `esbuild` oder `webpack`.

#### Option 1: Verwendung von esbuild (empfohlen)

Ändern Sie zunächst Ihre `angular.json`, um den benutzerdefinierten esbuild-Builder zu verwenden. Aktualisieren Sie die `build`-Konfiguration:

````json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einstellen, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Angular-Konfiguration integrieren

Um Intlayer mit dem Angular CLI zu integrieren, haben Sie je nach verwendetem Builder zwei Optionen: `esbuild` oder `webpack`.

#### Option 1: Verwendung von esbuild (empfohlen)

Ändern Sie zunächst Ihre `angular.json`, um den benutzerdefinierten esbuild-Builder zu verwenden. Aktualisieren Sie die `build`-Konfiguration:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
````

> Stellen Sie sicher, dass Sie `your-app-name` durch den tatsächlichen Namen Ihres Projekts in der `angular.json` ersetzen.

Erstellen Sie anschließend eine Datei `esbuild/intlayer-plugin.ts` im Stammverzeichnis Ihres Projekts:

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayerPlugin: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Intlayer esbuild Plugin gestartet", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Watch-Modus aktiviert. Starte Watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Fehler im Intlayer esbuild Plugin: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayerPlugin;
```

> Das `intlayerPlugin` für esbuild stellt sicher, dass Intlayer vor dem Build vorbereitet wird und im Entwicklungsmodus auf Änderungen überwacht.

#### Option 2: Verwendung von Webpack

Zuerst ändern Sie Ihre `angular.json`, um den benutzerdefinierten Webpack-Builder zu verwenden. Aktualisieren Sie die `build`- und `serve`-Konfigurationen:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> Stellen Sie sicher, dass Sie `your-app-name` durch den tatsächlichen Namen Ihres Projekts in der `angular.json` ersetzen.

Erstellen Sie anschließend eine Datei `webpack.config.js` im Stammverzeichnis Ihres Projekts:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> Das `IntlayerWebpackPlugin` wird verwendet, um Intlayer in Webpack zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Deklarieren Sie Ihre Inhalte

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
      de: "Herzlichen Glückwunsch! Ihre App läuft. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      de: "Dokumentation erkunden",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      de: "Mit Tutorials lernen",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      de: "Angular Sprachdienst",
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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das `contentDir`-Verzeichnis (standardmäßig `./src`) aufgenommen werden. Und sie müssen der Dateierweiterung der Inhaltsdeklarationsdatei entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 5: Intlayer in Ihrem Code verwenden

Um die Internationalisierungsfunktionen von Intlayer in Ihrer gesamten Angular-Anwendung zu nutzen, müssen Sie die Funktion `useIntlayer` innerhalb einer Komponente verwenden. Diese Funktion, die von `angular-intlayer` bereitgestellt wird, ermöglicht den Zugriff auf Ihre Übersetzungen als reaktive Signale.

`IntlayerProvider` ist im Root der Anwendung registriert, daher müssen Sie ihn nicht zu den Providern Ihres Moduls hinzufügen.

Greifen Sie in Ihrer Komponentenklasse auf Ihre Inhaltswörterbücher zu:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Intlayer-Inhalte werden als `Signal` zurückgegeben, daher greifen Sie in Ihrer Vorlage auf die Werte zu, indem Sie das Signal aufrufen: `content().title`.

### (Optional) Schritt 6: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die Funktion `setLocale` verwenden, die von der Funktion `useLocale` bereitgestellt wird. Damit können Sie die Locale der Anwendung einstellen und die Inhalte entsprechend aktualisieren.

Erstellen Sie eine Komponente, um zwischen den Sprachen zu wechseln:

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // Mache getLocaleName für die Vorlage zugänglich
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
Verwenden Sie dann diese Komponente in Ihrer `app.component.ts`:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular logo"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Das Hinzufügen lokalisierter Routen in einer Angular-Anwendung beinhaltet die Verwendung des Angular Routers mit Sprachpräfixen. Dadurch entstehen eindeutige Routen für jede Sprache, was für SEO nützlich ist.

Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Stellen Sie zunächst sicher, dass `@angular/router` installiert ist.

Erstellen Sie dann eine Router-Konfiguration, die sprachbasierte Routen in `app.routes.ts` behandelt.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

Dann müssen Sie den Router in Ihrer `app.config.ts` bereitstellen.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Optional) Schritt 8: URL ändern, wenn sich die Sprache ändert

Um die URL automatisch zu aktualisieren, wenn der Benutzer die Sprache wechselt, können Sie die `LocaleSwitcher`-Komponente so anpassen, dass sie den Angular Router verwendet:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (Optional) Schritt 9: Wechseln der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es wichtig, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Locale anzupassen.

Sie können einen Service erstellen, der dies automatisch übernimmt.

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // Diese Methode kann in der Root-Komponente der App aufgerufen werden, um sicherzustellen, dass der Service initialisiert wird.
  init() {}
}
```

Dann injizieren und initialisieren Sie diesen Service in Ihrer Haupt-`AppComponent`:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... weitere Importe
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Direktive

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte Direktive erstellen. Diese Direktive fügt internen URLs automatisch das aktuelle Sprachpräfix hinzu.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

Um es zu verwenden, fügen Sie die Direktive `appLocalizedLink` zu Ihren Anker-Tags hinzu und stellen Sie sicher, dass Sie sie in Ihrer Komponente importieren.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Home</a> `,
})
export class AppComponent {}
```

### (Optional) Schritt 11: Markdown rendern

Intlayer unterstützt das Rendern von Markdown-Inhalten. Um Markdown in reichhaltiges HTML umzuwandeln, können Sie [markdown-it](https://github.com/markdown-it/markdown-it) integrieren.

Installieren Sie zunächst `markdown-it`:

```bash
npm install markdown-it
# und die Typen
npm install -D @types/markdown-it
```

Konfigurieren Sie anschließend den `INTLAYER_MARKDOWN_TOKEN` in Ihrer `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

Standardmäßig gibt Intlayer das gerenderte HTML als String zurück. Wenn Sie `[innerHTML]` zum Binden verwenden, beachten Sie die Sicherheitsimplikationen (XSS). Stellen Sie stets sicher, dass Ihre Inhalte aus einer vertrauenswürdigen Quelle stammen.

Für komplexere Szenarien können Sie eine Pipe erstellen, um das HTML sicher zu rendern.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass diese versehentlich in Ihr Git-Repository eingecheckt werden.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
