---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrate from ngx-translate to Intlayer"
description: "Migrate an Angular app from ngx-translate to Intlayer step by step. Keep the translate pipe, the translate directive and TranslateService working with the @intlayer/ngx-translate compat adapter."
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

# Migrating from ngx-translate to Intlayer

## Why migrate from ngx-translate to Intlayer?

<AccordionGroup>
<Accordion header="No HTTP loader">

ngx-translate fetches locale files at runtime through `TranslateHttpLoader`, which delays the first render. Intlayer compiles dictionaries at build time, so translations are available immediately.

</Accordion>
<Accordion header="Maintainability">

Keys are **typed** against your dictionaries: invalid keys fail at build time. Content can be co-located with the components that use it.

</Accordion>
<Accordion header="AI Agent">

Co-located content **reduces the context needed** by LLMs. Intlayer ships a **CLI** to test for missing translations, an **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**, an **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)** and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**.

</Accordion>
<Accordion header="Automation">

Translate missing messages in your CI/CD pipeline with the LLM of your choice, or in the background with the [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

</Accordion>
<Accordion header="Scaling with non-dev">

Intlayer provides a self-hosted **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)** so translators and copywriters can edit content in real time.

</Accordion>
</AccordionGroup>

> To understand where these libraries come from, read [the history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md).

## Migration strategies

1. **Compat adapter (recommended for existing apps)**: Install `@intlayer/ngx-translate`. It exposes the same API as `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) and serves messages from Intlayer dictionaries. Your templates stay unchanged.
2. **Full migration**: Gradually replace ngx-translate calls with `useIntlayer` from `angular-intlayer` and `.content.ts` files co-located with your components.

## Table of Contents

<TOC/>

## Quick migration

<Steps>
<Step number={1} title="Install Dependencies">

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

> The `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

The command detects your environment and installs the required packages, for example:

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

> Keep `@ngx-translate/core` installed: it provides the TypeScript types. `@ngx-translate/http-loader` can be removed.

</Step>
<Step number={2} title="Configure Intlayer">

Point the `syncJSON` plugin at your existing translation files. With one file per namespace (`src/i18n/en/home.json`), each file becomes a dictionary:

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

> `'home.title' | translate` resolves to the `title` field of the `home` dictionary. If you use a single file per locale (`src/assets/i18n/en.json`) with nested keys, use `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` instead: each top-level key becomes a dictionary.

</Step>
<Step number={3} title="Add the esbuild plugin">

The Angular CLI accepts esbuild plugins through `@angular-builders/custom-esbuild`. Create a plugins file:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Then reference it in `angular.json`:

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

The plugin runs the Intlayer build and resolves `@ngx-translate/core` to `@intlayer/ngx-translate`, so no source file changes are needed.

> Building with Vite (Analog)? Use `ngxTranslateVitePlugin()` from `@intlayer/ngx-translate/plugin` instead.

</Step>
<Step number={4} title="Remove the HTTP loader">

Keep `provideTranslateService()`, but drop the `loader` option: messages come from Intlayer dictionaries.

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

> Translations no longer go through a loader, so `TranslateHttpLoader` and `@ngx-translate/http-loader` can be removed.

</Step>
</Steps>

Your templates and services keep working unchanged:

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

## Complete migration

<Steps>
<Step number={5} title="Explicit import renaming (optional)" isOptional={true}>

The esbuild plugin already handles aliasing. To make the dependency explicit:

| Before                                                          | After                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Move content to .content.ts files" isOptional={true}>

New components can use native Intlayer content, side by side with existing ngx-translate calls. Register `provideIntlayer()` from `angular-intlayer` next to `provideTranslateService()` in `app.config.ts`, then:

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
<Step number={7} title="Enable AI-powered translation" isOptional={true}>

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

Filled translations are written back to your JSON files. See the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md) for AI configuration.

</Step>
</Steps>

## What you can delete after migration

| File / pattern                                        | Why it's no longer needed                         |
| ----------------------------------------------------- | ------------------------------------------------- |
| `TranslateHttpLoader` / custom loaders                | Dictionaries are compiled and loaded by Intlayer. |
| `@ngx-translate/http-loader`                          | No runtime fetch of translation files.            |
| `provideHttpClient()` (if only used for translations) | Same reason.                                      |

## Configure TypeScript

Include the generated types in your `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git Configuration

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/ngx-translate.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md)
- [Intlayer with Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_21.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)
