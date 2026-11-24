---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "从 ngx-translate 迁移到 Intlayer"
description: "分步将 Angular 应用从 ngx-translate 迁移到 Intlayer。借助 compat adapter @intlayer/ngx-translate，translate 管道、translate 指令和 TranslateService 照常工作。"
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

# 从 ngx-translate 迁移到 Intlayer

## 为什么从 ngx-translate 迁移到 Intlayer？

<AccordionGroup>
<Accordion header="无需 HTTP 加载器">

ngx-translate 在运行时通过 `TranslateHttpLoader` 获取 locale 文件，这会延迟首次渲染。Intlayer 在构建时编译字典，因此翻译可立即使用。

</Accordion>
<Accordion header="可维护性">

键根据你的字典进行 **类型检查**：无效的键会在构建时失败。内容可以放在使用它的组件旁边。

</Accordion>
<Accordion header="AI 智能体">

与组件放在一起的内容 **减少了 LLM 所需的上下文**。Intlayer 提供用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**。

</Accordion>
<Accordion header="自动化">

在 CI/CD 流水线中使用你选择的 LLM 翻译缺失的消息，或通过 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 在后台完成翻译。

</Accordion>
<Accordion header="与非开发人员协作扩展">

Intlayer 提供可自托管的 **[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 和 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，让译者和文案人员实时编辑内容。

</Accordion>
</AccordionGroup>

> 想了解这些库的由来，请阅读 [JavaScript i18n 的历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)。

## 迁移策略

1. **Compat adapter（推荐用于现有应用）**：安装 `@intlayer/ngx-translate`。它暴露与 `@ngx-translate/core` 相同的 API（`provideTranslateService`、`TranslateService`、`TranslatePipe`、`TranslateDirective`、`TranslateModule`），并从 Intlayer 字典中提供消息。你的模板保持不变。
2. **完整迁移**：逐步用 `angular-intlayer` 中的 `useIntlayer` 和放在组件旁边的 `.content.ts` 文件替换 ngx-translate 调用。

## 目录

<TOC/>

## 快速迁移

<Steps>
<Step number={1} title="安装依赖">

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

> `--interactive` 标志是可选的。如果你是 AI 智能体，请使用 `intlayer-cli init`。

该命令会检测你的环境并安装所需的 package，例如：

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

> 保留 `@ngx-translate/core`：它提供 TypeScript 类型。`@ngx-translate/http-loader` 可以移除。

</Step>
<Step number={2} title="配置 Intlayer">

将 `syncJSON` 插件指向你现有的翻译文件。每个 namespace 一个文件（`src/i18n/en/home.json`）时，每个文件都会成为一个字典：

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

> `'home.title' | translate` 解析为 `home` 字典的 `title` 字段。如果你每个 locale 使用一个文件（`src/assets/i18n/en.json`）并带有嵌套键，请改用 `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``：每个顶层键都会成为一个字典。

</Step>
<Step number={3} title="添加 esbuild 插件">

Angular CLI 通过 `@angular-builders/custom-esbuild` 支持 esbuild 插件。创建一个插件文件：

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

然后在 `angular.json` 中引用它：

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

该插件会运行 Intlayer 构建，并将 `@ngx-translate/core` 解析为 `@intlayer/ngx-translate`，无需修改源文件。

> 使用 Vite（Analog）构建？请改用 `@intlayer/ngx-translate/plugin` 中的 `ngxTranslateVitePlugin()`。

</Step>
<Step number={4} title="移除 HTTP 加载器">

保留 `provideTranslateService()`，但去掉 `loader` 选项：消息来自 Intlayer 字典。

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

> 翻译不再经过加载器，因此可以移除 `TranslateHttpLoader` 和 `@ngx-translate/http-loader`。

</Step>
</Steps>

你的模板和服务无需修改即可继续工作：

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

## 完整迁移

<Steps>
<Step number={5} title="显式重命名 import（可选）" isOptional={true}>

esbuild 插件已经处理了别名。如需让依赖关系更明确：

| 之前                                                            | 之后                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="将内容迁移到 .content.ts 文件" isOptional={true}>

新组件可以在现有 ngx-translate 调用旁使用原生 Intlayer 内容。在 `app.config.ts` 中将 `angular-intlayer` 的 `provideIntlayer()` 注册在 `provideTranslateService()` 旁边，然后：

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
<Step number={7} title="启用 AI 翻译" isOptional={true}>

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

补全的翻译会写回你的 JSON 文件。AI 配置请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>
</Steps>

## 迁移后可以删除的内容

| 文件 / 模式                             | 不再需要的原因               |
| --------------------------------------- | ---------------------------- |
| `TranslateHttpLoader` / 自定义加载器    | 字典由 Intlayer 编译和加载。 |
| `@ngx-translate/http-loader`            | 运行时不再获取翻译文件。     |
| `provideHttpClient()`（如果仅用于翻译） | 同样的原因。                 |

## 配置 TypeScript

在 `tsconfig.json` 中包含生成的类型：

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git 配置

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/ngx-translate.md)
- [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)
- [在 Angular 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
