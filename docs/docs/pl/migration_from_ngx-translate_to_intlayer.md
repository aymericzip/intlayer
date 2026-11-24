---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migracja z ngx-translate do Intlayer"
description: "Przenieś aplikację Angular z ngx-translate do Intlayer krok po kroku. Pipe translate, dyrektywa translate i TranslateService działają dalej dzięki compat adapterowi @intlayer/ngx-translate."
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

# Migracja z ngx-translate do Intlayer

## Dlaczego warto przejść z ngx-translate na Intlayer?

<AccordionGroup>
<Accordion header="Bez loadera HTTP">

ngx-translate pobiera pliki locale w runtime przez `TranslateHttpLoader`, co opóźnia pierwszy render. Intlayer kompiluje słowniki podczas buildu, więc tłumaczenia są dostępne od razu.

</Accordion>
<Accordion header="Łatwość utrzymania">

Klucze są **typowane** względem Twoich słowników: nieprawidłowe klucze kończą się błędem podczas buildu. Treść może leżeć obok komponentów, które z niej korzystają.

</Accordion>
<Accordion header="Agent AI">

Treść obok komponentów **zmniejsza potrzebny kontekst** dla LLM. Intlayer udostępnia **CLI** do wykrywania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** oraz **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**.

</Accordion>
<Accordion header="Automatyzacja">

Tłumacz brakujące komunikaty w pipeline CI/CD za pomocą wybranego LLM albo w tle przez [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalowanie z osobami nietechnicznymi">

Intlayer udostępnia self-hosted **[edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)**, dzięki którym tłumacze i copywriterzy edytują treść w czasie rzeczywistym.

</Accordion>
</AccordionGroup>

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj [historię i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md).

## Strategie migracji

1. **Compat adapter (zalecany dla istniejących aplikacji)**: zainstaluj `@intlayer/ngx-translate`. Udostępnia to samo API co `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) i serwuje komunikaty ze słowników Intlayer. Twoje szablony pozostają bez zmian.
2. **Pełna migracja**: stopniowo zastępuj wywołania ngx-translate przez `useIntlayer` z `angular-intlayer` i pliki `.content.ts` obok komponentów.

## Spis treści

<TOC/>

## Szybka migracja

<Steps>
<Step number={1} title="Instalacja zależności">

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

> Flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

Polecenie wykrywa Twoje środowisko i instaluje potrzebne packages, na przykład:

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

> Pozostaw `@ngx-translate/core` zainstalowany: dostarcza typy TypeScript. `@ngx-translate/http-loader` można usunąć.

</Step>
<Step number={2} title="Konfiguracja Intlayer">

Wskaż pluginowi `syncJSON` istniejące pliki z tłumaczeniami. Przy jednym pliku na namespace (`src/i18n/en/home.json`) każdy plik staje się słownikiem:

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

> `'home.title' | translate` jest rozwiązywane do pola `title` słownika `home`. Jeśli używasz jednego pliku na locale (`src/assets/i18n/en.json`) z zagnieżdżonymi kluczami, użyj zamiast tego `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: każdy klucz najwyższego poziomu staje się słownikiem.

</Step>
<Step number={3} title="Dodanie pluginu esbuild">

Angular CLI przyjmuje pluginy esbuild przez `@angular-builders/custom-esbuild`. Utwórz plik z pluginami:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Następnie wskaż go w `angular.json`:

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

Plugin uruchamia build Intlayer i rozwiązuje `@ngx-translate/core` do `@intlayer/ngx-translate`, bez zmian w plikach źródłowych.

> Budujesz przez Vite (Analog)? Użyj zamiast tego `ngxTranslateVitePlugin()` z `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Usunięcie loadera HTTP">

Zachowaj `provideTranslateService()`, ale usuń opcję `loader`: komunikaty pochodzą ze słowników Intlayer.

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

> Tłumaczenia nie przechodzą już przez loader, więc `TranslateHttpLoader` i `@ngx-translate/http-loader` można usunąć.

</Step>
</Steps>

Twoje szablony i serwisy działają dalej bez zmian:

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

## Pełna migracja

<Steps>
<Step number={5} title="Jawna zmiana nazw importów (opcjonalnie)" isOptional={true}>

Plugin esbuild już obsługuje aliasy. Aby zależność była jawna:

| Przed                                                           | Po                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Przeniesienie treści do plików .content.ts" isOptional={true}>

Nowe komponenty mogą używać natywnej treści Intlayer obok istniejących wywołań ngx-translate. Zarejestruj `provideIntlayer()` z `angular-intlayer` obok `provideTranslateService()` w `app.config.ts`, a następnie:

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
<Step number={7} title="Włączenie tłumaczenia przez AI" isOptional={true}>

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

Uzupełnione tłumaczenia są zapisywane z powrotem w Twoich plikach JSON. Konfigurację AI opisuje [dokumentacja CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

</Step>
</Steps>

## Co możesz usunąć po migracji

| Plik / wzorzec                                           | Dlaczego nie jest już potrzebny             |
| -------------------------------------------------------- | ------------------------------------------- |
| `TranslateHttpLoader` / własne loadery                   | Słowniki kompiluje i ładuje Intlayer.       |
| `@ngx-translate/http-loader`                             | Brak pobierania plików tłumaczeń w runtime. |
| `provideHttpClient()` (jeśli używany tylko do tłumaczeń) | Z tego samego powodu.                       |

## Konfiguracja TypeScript

Dodaj wygenerowane typy do `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Konfiguracja Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter dla ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)
- [Intlayer z Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)
- [Edytor wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
