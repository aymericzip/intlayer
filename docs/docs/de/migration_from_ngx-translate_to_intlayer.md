---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Von ngx-translate zu Intlayer migrieren"
description: "Migriere eine Angular-App Schritt für Schritt von ngx-translate zu Intlayer. Die translate-Pipe, die translate-Direktive und TranslateService funktionieren mit dem Compat Adapter @intlayer/ngx-translate weiter."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Von ngx-translate zu Intlayer migrieren

## Warum von ngx-translate zu Intlayer migrieren?

<AccordionGroup>
<Accordion header="Kein HTTP-Loader">

ngx-translate lädt Locale-Dateien zur Laufzeit über `TranslateHttpLoader`, was das erste Rendern verzögert. Intlayer kompiliert die Dictionaries beim Build, sodass Übersetzungen sofort verfügbar sind.

</Accordion>
<Accordion header="Wartbarkeit">

Keys sind gegen deine Dictionaries **typisiert**: Ungültige Keys schlagen beim Build fehl. Content kann neben den Komponenten liegen, die ihn nutzen.

</Accordion>
<Accordion header="KI-Agent">

Co-lokalisierter Content **reduziert den nötigen Kontext** für LLMs. Intlayer liefert eine **CLI** zum Prüfen fehlender Übersetzungen, einen **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**, einen **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)** und **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**.

</Accordion>
<Accordion header="Automatisierung">

Übersetze fehlende Nachrichten in deiner CI/CD-Pipeline mit dem LLM deiner Wahl oder im Hintergrund mit der [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalieren mit Nicht-Entwicklern">

Intlayer bietet einen selbst gehosteten **[visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)**, damit Übersetzer und Texter Inhalte in Echtzeit bearbeiten können.

</Accordion>
</AccordionGroup>

> Um zu verstehen, woher diese Bibliotheken kommen, lies [die Geschichte von JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md).

## Migrationsstrategien

1. **Compat Adapter (empfohlen für bestehende Apps)**: Installiere `@intlayer/ngx-translate`. Er stellt dieselbe API wie `@ngx-translate/core` bereit (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) und liefert die Nachrichten aus Intlayer-Dictionaries. Deine Templates bleiben unverändert.
2. **Vollständige Migration**: Ersetze ngx-translate-Aufrufe schrittweise durch `useIntlayer` aus `angular-intlayer` und `.content.ts`-Dateien neben deinen Komponenten.

## Inhaltsverzeichnis

<TOC/>

## Schnelle Migration

<Steps>
<Step number={1} title="Abhängigkeiten installieren">

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

> Das Flag `--interactive` ist optional. Verwende `intlayer-cli init`, wenn du ein KI-Agent bist.

Der Befehl erkennt deine Umgebung und installiert die benötigten Packages, zum Beispiel:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> Lass `@ngx-translate/core` installiert: Es liefert die TypeScript-Typen. `@ngx-translate/http-loader` kann entfernt werden.

</Step>
<Step number={2} title="Intlayer konfigurieren">

Richte das `syncJSON`-Plugin auf deine bestehenden Übersetzungsdateien aus. Mit einer Datei pro Namespace (`src/i18n/en/home.json`) wird jede Datei zu einem Dictionary:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` wird zum Feld `title` des Dictionarys `home` aufgelöst. Wenn du eine einzige Datei pro Locale (`src/assets/i18n/en.json`) mit verschachtelten Keys nutzt, verwende stattdessen `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: Jeder Top-Level-Key wird zu einem Dictionary.

</Step>
<Step number={3} title="Das esbuild-Plugin hinzufügen">

Die Angular CLI akzeptiert esbuild-Plugins über `@angular-builders/custom-esbuild`. Erstelle eine Plugin-Datei:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Referenziere sie dann in `angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

Das Plugin führt den Intlayer-Build aus und löst `@ngx-translate/core` zu `@intlayer/ngx-translate` auf, ohne Änderungen an deinen Quelldateien.

> Du baust mit Vite (Analog)? Verwende stattdessen `ngxTranslateVitePlugin()` aus `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Den HTTP-Loader entfernen">

Behalte `provideTranslateService()`, entferne aber die Option `loader`: Die Nachrichten kommen aus Intlayer-Dictionaries.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> Übersetzungen laufen nicht mehr über einen Loader, daher können `TranslateHttpLoader` und `@ngx-translate/http-loader` entfernt werden.

</Step>
</Steps>

Deine Templates und Services funktionieren unverändert weiter:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## Vollständige Migration

<Steps>
<Step number={5} title="Explizites Umbenennen der Imports (optional)" isOptional={true}>

Das esbuild-Plugin übernimmt das Aliasing bereits. Um die Abhängigkeit explizit zu machen:

| Vorher                                                          | Nachher                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Content in .content.ts-Dateien verschieben" isOptional={true}>

Neue Komponenten können nativen Intlayer-Content nutzen, parallel zu bestehenden ngx-translate-Aufrufen. Registriere `provideIntlayer()` aus `angular-intlayer` neben `provideTranslateService()` in `app.config.ts`, dann:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="KI-gestützte Übersetzung aktivieren" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Ergänzte Übersetzungen werden in deine JSON-Dateien zurückgeschrieben. Siehe die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für die KI-Konfiguration.

</Step>
</Steps>

## Was du nach der Migration löschen kannst

| Datei / Muster                                              | Warum es nicht mehr benötigt wird                            |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| `TranslateHttpLoader` / eigene Loader                       | Die Dictionaries werden von Intlayer kompiliert und geladen. |
| `@ngx-translate/http-loader`                                | Kein Laden von Übersetzungsdateien zur Laufzeit mehr.        |
| `provideHttpClient()` (falls nur für Übersetzungen genutzt) | Gleicher Grund.                                              |

## TypeScript konfigurieren

Nimm die generierten Typen in deine `tsconfig.json` auf:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git-Konfiguration

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate Compat Adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/ngx-translate.md)
- [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md)
- [Intlayer mit Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
