---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar do ngx-translate para o Intlayer"
description: "Migre uma aplicação Angular do ngx-translate para o Intlayer passo a passo. Mantenha o pipe translate, a diretiva translate e o TranslateService funcionando com o compat adapter @intlayer/ngx-translate."
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

# Migrar do ngx-translate para o Intlayer

## Por que migrar do ngx-translate para o Intlayer?

<AccordionGroup>
<Accordion header="Sem loader HTTP">

O ngx-translate busca os arquivos de locale em runtime através do `TranslateHttpLoader`, o que atrasa a primeira renderização. O Intlayer compila os dicionários no build, então as traduções ficam disponíveis imediatamente.

</Accordion>
<Accordion header="Manutenibilidade">

As chaves são **tipadas** de acordo com os seus dicionários: chaves inválidas falham no build. O conteúdo pode ficar ao lado dos componentes que o usam.

</Accordion>
<Accordion header="Agente de IA">

O conteúdo co-localizado **reduz o contexto necessário** para os LLMs. O Intlayer inclui uma **CLI** para testar traduções em falta, um **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, um **[servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**.

</Accordion>
<Accordion header="Automação">

Traduza as mensagens em falta no seu pipeline de CI/CD com o LLM da sua escolha, ou em segundo plano com a [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

</Accordion>
<Accordion header="Escalar com não desenvolvedores">

O Intlayer oferece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** self-hosted e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para que tradutores e redatores editem o conteúdo em tempo real.

</Accordion>
</AccordionGroup>

> Para entender de onde vêm essas bibliotecas, leia [a história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md).

## Estratégias de migração

1. **Compat adapter (recomendado para aplicações existentes)**: instale `@intlayer/ngx-translate`. Ele expõe a mesma API de `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) e serve as mensagens a partir dos dicionários do Intlayer. Os seus templates permanecem inalterados.
2. **Migração completa**: substitua gradualmente as chamadas do ngx-translate por `useIntlayer` de `angular-intlayer` e arquivos `.content.ts` ao lado dos seus componentes.

## Índice

<TOC/>

## Migração rápida

<Steps>
<Step number={1} title="Instalar dependências">

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

> O flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

O comando detecta o seu ambiente e instala os packages necessários, por exemplo:

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

> Mantenha o `@ngx-translate/core` instalado: ele fornece os tipos TypeScript. O `@ngx-translate/http-loader` pode ser removido.

</Step>
<Step number={2} title="Configurar o Intlayer">

Aponte o plugin `syncJSON` para os seus arquivos de tradução existentes. Com um arquivo por namespace (`src/i18n/en/home.json`), cada arquivo torna-se um dicionário:

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

> `'home.title' | translate` é resolvido para o campo `title` do dicionário `home`. Se você usa um único arquivo por locale (`src/assets/i18n/en.json`) com chaves aninhadas, use `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: cada chave de primeiro nível torna-se um dicionário.

</Step>
<Step number={3} title="Adicionar o plugin esbuild">

A Angular CLI aceita plugins esbuild através de `@angular-builders/custom-esbuild`. Crie um arquivo de plugins:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Depois, referencie-o em `angular.json`:

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

O plugin executa o build do Intlayer e resolve `@ngx-translate/core` para `@intlayer/ngx-translate`, sem alterações nos seus arquivos fonte.

> Faz o build com Vite (Analog)? Use `ngxTranslateVitePlugin()` de `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Remover o loader HTTP">

Mantenha `provideTranslateService()`, mas remova a opção `loader`: as mensagens vêm dos dicionários do Intlayer.

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

> As traduções não passam mais por um loader, então `TranslateHttpLoader` e `@ngx-translate/http-loader` podem ser removidos.

</Step>
</Steps>

Os seus templates e services continuam funcionando sem alterações:

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

## Migração completa

<Steps>
<Step number={5} title="Renomeação explícita dos imports (opcional)" isOptional={true}>

O plugin esbuild já cuida dos aliases. Para tornar a dependência explícita:

| Antes                                                           | Depois                                                              |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Mover o conteúdo para arquivos .content.ts" isOptional={true}>

Novos componentes podem usar conteúdo nativo do Intlayer, ao lado das chamadas do ngx-translate existentes. Registre `provideIntlayer()` de `angular-intlayer` ao lado de `provideTranslateService()` em `app.config.ts` e depois:

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
<Step number={7} title="Ativar a tradução com IA" isOptional={true}>

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

As traduções preenchidas são escritas de volta nos seus arquivos JSON. Consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para configurar a IA.

</Step>
</Steps>

## O que você pode excluir após a migração

| Arquivo / padrão                                       | Por que não é mais necessário                             |
| ------------------------------------------------------ | --------------------------------------------------------- |
| `TranslateHttpLoader` / loaders personalizados         | Os dicionários são compilados e carregados pelo Intlayer. |
| `@ngx-translate/http-loader`                           | Nenhum download de arquivos de tradução em runtime.       |
| `provideHttpClient()` (se usado apenas para traduções) | Mesmo motivo.                                             |

## Configurar o TypeScript

Inclua os tipos gerados no seu `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configuração do Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter do ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)
- [Intlayer com Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md)
- [Editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
