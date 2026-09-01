---
createdAt: 2025-04-18
updatedAt: 2026-08-30
title: "Angular 22 i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Angular 22 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-22-template
applicationShowcase: https://intlayer-angular-22-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新Solid useIntlayer API的用法以直接访问属性"
  - version: 8.0.0
    date: 2026-01-26
    changes: "发布稳定版"
  - version: 8.0.0
    date: 2025-12-30
    changes: "增加init命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始版本"
author: aymericzip
---

# 使用Intlayer翻译您的Angular 21（Vite）网站 | 国际化 (i18n)

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“ngx-translate”或“angular-l10n”等主要解决方案相比，Intlayer 是一个具有集成优化的解决方案，例如：

<AccordionGroup>
<Accordion header="完整的角度覆盖">

Intlayer 经过优化，可与 Angular 完美配合，提供**组件级内容范围**、**延迟加载翻译**以及​​扩展国际化 (i18n) 所需的所有功能。

</Accordion>

<Accordion header="捆绑尺寸">

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

<Accordion header="可维护性">

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

</Accordion>

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

<Accordion header="表现">

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

</Accordion>

<Accordion header="使用 none-dev 进行扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在Angular应用程序中设置Intlayer的分步指南

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-22-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用Intlayer进行应用程序国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-angular-22-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在GitHub上查看 [应用程序模板](https://github.com/aymericzip/intlayer-angular-22-template)。

<Steps>

<Step number={1} title="安装依赖项">

使用npm安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 该命令将检测您的环境并安装所需的软件包。例如：

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
```

- **intlayer**

  核心包，提供了配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)等国际化工具。

- **angular-intlayer**
  将Intlayer与Angular应用程序集成的包。它为Angular的国际化提供了上下文提供者（Providers）和Hooks。

- **@angular-builders/custom-esbuild**
  需要它来自定义Angular CLI的esbuild配置。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件以配置您应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您支持的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化的URL、中间件重定向、Cookie名称、内容声明的位置和扩展名、禁用控制台中的Intlayer日志等。获取所有可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在Angular配置中集成Intlayer">

要将Intlayer与Angular CLI集成，您需要使用自定义构建器。本指南假设您使用的是 Vite/esbuild（Angular 21项目的默认设置）。

首先，修改您的 `angular.json`，使用自定义的esbuild构建器。更新 `build` 和 `serve` 配置：

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> 请确保将 `angular.json` 中的 `your-app-name` 替换为您项目的实际名称。

接下来，在项目的根目录中创建一个 `esbuild.plugins.ts` 文件：

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` 函数负责使用Intlayer配置esbuild。它注入插件来处理内容声明文件，并针对最佳性能进行了设置。

> **NX 用户**：NX 的 Angular 构建器通过 Node 的原生 ESM 解析加载插件文件，并且不会实时编译 TypeScript 插件文件。请改用 `.mjs` 文件，并相应地更新 `angular.json` 中的 `plugins` 引用：
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> 然后在 `angular.json` 中指向 `"./esbuild.plugins.mjs"`，而不是 `"./esbuild.plugins.ts"`。

</Step>

<Step number={4} title="声明您的内容">

创建并管理您的内容声明文件以存储翻译：

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
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

> 您的内容声明可以定义在应用程序的任何位置，只需将其包含在 `contentDir` 目录（默认为 `./src`）中，并且符合内容声明的文件后缀名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 详细信息请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={5} title="在代码中使用Intlayer">

要在整个Angular应用程序中利用Intlayer的国际化功能，您需要在应用程序配置中提供Intlayer。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // 在此添加Intlayer提供者
  ],
};
```

然后，您可以在任何组件中使用 `useIntlayer` 功能。

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

在您的模板中：

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer 内容将作为 `Signal` 返回，因此您可以通过调用信号来访问值：`content().title`。

</Step>

<Step number={6} title="更改内容的语言">

要更改内容的语言，您可以使用 `useLocale` 函数提供的 `setLocale` 函数。这允许您设置应用程序的区域设置，并相应更新内容。

创建一个用于切换语言的组件：

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
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

然后，在 `app.component.ts` 中使用此组件：

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

</Step>

</Steps>

### 配置TypeScript

Intlayer使用模块扩充（Module Augmentation）来获得TypeScript的好处，并使您的代码库更健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

请确保您的TypeScript配置包含了自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的TypeScript配置
  "include": [
    // ... 您现有的TypeScript配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git配置

建议忽略由Intlayer生成的文件。这可以避免将它们提交到您的Git仓库。

为此，您可以将以下说明添加到您的 `.gitignore` 文件中：

```bash
# 忽略由Intlayer生成的文件
.intlayer
```

### VS Code 扩展

为了提升您在Intlayer中的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从VS Code应用市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 已翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展示例文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

想要深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)外部化您的内容。

---

## 常见问题

<FAQ>

<Question title="国际化 Angular 应用有哪些不同的解决方案？">

- **`@angular/localize`**（内置 i18n）：消息被提取到 XLIFF 文件中，每个语言环境被编译进独立的构建产物中，这意味着每种语言对应一个部署产物，无法在运行时切换语言环境。
- **`ngx-translate`** 和 **`Transloco`**：通过服务加载的运行时 JSON 目录，支持语言环境切换，但没有构建时类型安全。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时进行编译，全链路类型安全，支持运行时语言环境切换、AI 翻译、可视化编辑器和 CMS。

脱离 `@angular/localize` 的常见原因正是其“每个语言环境一次构建”的模式。Intlayer 保持单一构建产物并在运行时无缝切换语言。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Question>

<Question title="i18n 会给我的 Angular bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 ngx-translate、Transloco 或 @angular/localize 迁移而无需重写模板吗？">

基本可以。请按照 [ngx-translate 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/ngx-translate.md) 或 [Transloco 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/transloco.md) 迁移内容。您也可以逐步迁移：[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将现有的 JSON 目录作为单一真实来源（source of truth），并生成 Intlayer 字典，使两个层在逐个组件迁移时保持同步。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 是否支持 Angular signals 和独立组件 (standalone components)？">

支持。内容通过 signals 公开，因此当语言环境更改时模板会自动重新渲染而无需刷新页面，并且 Provider 可以像其他独立 Provider 一样直接注册。

</Question>

<Question title="我是否需要为每种语言分别构建一个产物？">

不需要。那是 `@angular/localize` 的模式。在 Intlayer 中，单次构建即可服务所有声明的语言环境，活动语言在运行时直接从 URL、Cookie 或 `Accept-Language` 请求头解析，并且仅下载当前渲染语言环境的内容。

</Question>

<Question title="如何在运行时切换语言？">

第 6 步对此进行了介绍。`useLocale` 公开活动语言环境、声明的语言环境以及持久化选择的设置函数，而 `getLocalizedUrl` 会重写当前路径，使用户在切换后保留在相同路由上。

</Question>

<Question title="如何使用 AI 自动翻译 Angular 应用？">

运行 `npx intlayer fill`，它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译。`--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="如何在发布前捕获缺失的翻译？">

在 CI 中运行 `npx intlayer test`。当声明的语言环境存在缺失内容时构建将失败。[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md) 会在您输入时实时报告相同错误。请参阅 [测试您的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
