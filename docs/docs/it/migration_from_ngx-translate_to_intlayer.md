---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrare da ngx-translate a Intlayer"
description: "Migra un'app Angular da ngx-translate a Intlayer passo dopo passo. Mantieni funzionanti la pipe translate, la direttiva translate e TranslateService con il compat adapter @intlayer/ngx-translate."
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

# Migrare da ngx-translate a Intlayer

## Perché migrare da ngx-translate a Intlayer?

<AccordionGroup>
<Accordion header="Nessun loader HTTP">

ngx-translate scarica i file di locale a runtime tramite `TranslateHttpLoader`, ritardando il primo render. Intlayer compila i dizionari al build, quindi le traduzioni sono disponibili subito.

</Accordion>
<Accordion header="Manutenibilità">

Le chiavi sono **tipizzate** in base ai tuoi dizionari: le chiavi non valide falliscono al build. Il contenuto può stare accanto ai componenti che lo usano.

</Accordion>
<Accordion header="Agente IA">

Il contenuto co-locato **riduce il contesto necessario** agli LLM. Intlayer include una **CLI** per verificare le traduzioni mancanti, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, un **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e delle **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**.

</Accordion>
<Accordion header="Automazione">

Traduci i messaggi mancanti nella tua pipeline CI/CD con l'LLM che preferisci, oppure in background con la [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

</Accordion>
<Accordion header="Scalare con i non sviluppatori">

Intlayer fornisce un **[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** perché traduttori e copywriter possano modificare i contenuti in tempo reale.

</Accordion>
</AccordionGroup>

> Per capire da dove vengono queste librerie, leggi [la storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md).

## Strategie di migrazione

1. **Compat adapter (consigliato per le app esistenti)**: installa `@intlayer/ngx-translate`. Espone la stessa API di `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) e serve i messaggi dai dizionari Intlayer. I tuoi template restano invariati.
2. **Migrazione completa**: sostituisci gradualmente le chiamate ngx-translate con `useIntlayer` di `angular-intlayer` e file `.content.ts` accanto ai tuoi componenti.

## Indice

<TOC/>

## Migrazione rapida

<Steps>
<Step number={1} title="Installare le dipendenze">

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

> Il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

Il comando rileva il tuo ambiente e installa i package necessari, ad esempio:

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

> Mantieni installato `@ngx-translate/core`: fornisce i tipi TypeScript. `@ngx-translate/http-loader` può essere rimosso.

</Step>
<Step number={2} title="Configurare Intlayer">

Punta il plugin `syncJSON` verso i tuoi file di traduzione esistenti. Con un file per namespace (`src/i18n/en/home.json`), ogni file diventa un dizionario:

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

> `'home.title' | translate` viene risolto nel campo `title` del dizionario `home`. Se usi un unico file per locale (`src/assets/i18n/en.json`) con chiavi annidate, usa invece `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: ogni chiave di primo livello diventa un dizionario.

</Step>
<Step number={3} title="Aggiungere il plugin esbuild">

L'Angular CLI accetta plugin esbuild tramite `@angular-builders/custom-esbuild`. Crea un file di plugin:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Poi fai riferimento a esso in `angular.json`:

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

Il plugin esegue il build di Intlayer e risolve `@ngx-translate/core` verso `@intlayer/ngx-translate`, senza modifiche ai file sorgente.

> Esegui il build con Vite (Analog)? Usa invece `ngxTranslateVitePlugin()` di `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Rimuovere il loader HTTP">

Mantieni `provideTranslateService()`, ma rimuovi l'opzione `loader`: i messaggi provengono dai dizionari Intlayer.

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

> Le traduzioni non passano più da un loader, quindi `TranslateHttpLoader` e `@ngx-translate/http-loader` possono essere rimossi.

</Step>
</Steps>

I tuoi template e servizi continuano a funzionare senza modifiche:

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

## Migrazione completa

<Steps>
<Step number={5} title="Rinomina esplicita degli import (opzionale)" isOptional={true}>

Il plugin esbuild gestisce già gli alias. Per rendere esplicita la dipendenza:

| Prima                                                           | Dopo                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Spostare il contenuto in file .content.ts" isOptional={true}>

I nuovi componenti possono usare il contenuto nativo di Intlayer, accanto alle chiamate ngx-translate esistenti. Registra `provideIntlayer()` di `angular-intlayer` accanto a `provideTranslateService()` in `app.config.ts`, poi:

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
<Step number={7} title="Attivare la traduzione con IA" isOptional={true}>

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

Le traduzioni completate vengono riscritte nei tuoi file JSON. Consulta la [documentazione della CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per la configurazione dell'IA.

</Step>
</Steps>

## Cosa puoi eliminare dopo la migrazione

| File / pattern                                          | Perché non serve più                               |
| ------------------------------------------------------- | -------------------------------------------------- |
| `TranslateHttpLoader` / loader personalizzati           | I dizionari sono compilati e caricati da Intlayer. |
| `@ngx-translate/http-loader`                            | Nessun download dei file di traduzione a runtime.  |
| `provideHttpClient()` (se usato solo per le traduzioni) | Stesso motivo.                                     |

## Configurare TypeScript

Includi i tipi generati nel tuo `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configurazione Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)
- [Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)
- [Editor visuale Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
