---
createdAt: 2026-08-23
updatedAt: 2026-08-30
title: "Elysia i18n - 完整指南翻译你的应用"
description: "不再使用 i18next。2026 年构建多语言 (i18n) Elysia 应用的指南。使用 AI 代理翻译并优化 bundle 大小、SEO 和性能。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "使指南与 Elysia 模板保持一致（上下文类型、Bun 配置、脚本）"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Elysia 后端网站 | 国际化 (i18n)

`elysia-intlayer` 是一个强大的国际化 (i18n) 插件，为 Elysia 应用程序设计，旨在通过根据客户端偏好提供本地化响应，使您的后端服务全球可访问。

> 在 GitHub 上[查看包实现](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer)。

### 实际应用场景

- **用用户语言显示后端错误**：当发生错误时，用用户的母语显示消息可以提高理解度并减少沮丧感。这对于可能在前端组件（如 toast 或模态框）中显示的动态错误消息特别有用。
- **检索多语言内容**：对于从数据库中提取内容的应用程序，国际化可确保您能够以多种语言提供此内容。这对于需要以用户偏好的语言显示产品描述、文章和其他内容的电子商务网站或内容管理系统等平台至关重要。
- **发送多语言电子邮件**：无论是交易电子邮件、营销活动还是通知，用收件人的语言发送电子邮件可以显著增加参与度和有效性。
- **多语言推送通知**：对于移动应用程序，用用户偏好的语言发送推送通知可以增强交互和保留。这种个人化的接触可以使通知感觉更相关和可操作。
- **其他通信**：来自后端的任何形式的通信（如短信消息、系统警报或用户界面更新）都受益于使用用户的语言，确保清晰性并增强整体用户体验。

通过国际化后端，您的应用程序不仅尊重文化差异，而且更好地与全球市场需求相结合，这是在全球范围内扩展服务的关键步骤。

## 快速开始

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

在 GitHub 上查看[应用模板](https://github.com/aymericzip/intlayer-elysia-template)。

### 安装

要开始使用 `elysia-intlayer`，请使用 npm 安装该包：

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

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia 面向 **Bun** 运行时。`elysia-intlayer` 之所以依赖 `AsyncLocalStorage`（而不是基于 Node 的 Intlayer 插件所使用的 `cls-hooked` 库），正是因为 Bun 没有实现 `async_hooks.createHook`。

### 设置

通过在项目根目录创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * 当找不到所请求的语言环境时，作为回退使用的默认语言环境。
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 声明您的内容

创建和管理您的内容声明以存储翻译：

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      zh: "在中文中返回的内容示例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "zh": "在中文中返回的内容示例",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`）。并与内容声明文件扩展名匹配（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详情，请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### Elysia 应用设置

设置您的 Elysia 应用以使用 `elysia-intlayer`：

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // 加载国际化插件
  .use(intlayer())
  // 路由
  .get("/", ({ intlayer }) => ({
    // 用于此请求的语言环境，通过 `Accept-Language` 协商或从存储中读取
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      zh: "你好",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> 该插件通过 **全局** `derive` 注册其上下文，Elysia 会将其类型标注为 `Partial<{ intlayer: IntlayerContext }>`。对于在 `.use(intlayer())` 之后注册的路由，该值在运行时始终存在，因此请使用非空断言（`intlayer!.locale`）或可选链，以满足 `strict` 模式下的 TypeScript。

路由上下文暴露以下内容：

| 属性              | 描述                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `locale`          | 本次请求要使用的 locale，`locale_storage` 优先于 `locale_detected`。 |
| `locale_storage`  | 客户端通过 cookie 或 header 显式请求的 locale。                      |
| `locale_detected` | 从请求头协商得到的 locale。                                          |
| `defaultLocale`   | 在 `intlayer.config.ts` 中配置为 fallback 的 locale。                |
| `t`               | 翻译函数。                                                           |
| `getIntlayer`     | 按 key 获取字典的函数。                                              |
| `getDictionary`   | 处理字典对象的函数。                                                 |

相同的辅助函数也以独立导出的形式提供。它们通过 `AsyncLocalStorage` 解析当前请求，因此你无需解构上下文即可调用：

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      zh: "在中文中返回的内容示例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> 请求上下文会在响应被映射后释放，因此独立的 helper 永远不会针对已经结束的请求进行解析。当在插件处理的请求之外调用时，它们会回退到配置的默认 locale。

### 运行你的应用

将 Intlayer 脚本添加到你的 `package.json`。`intlayer build` 会将内容声明编译到 `.intlayer` 目录并生成 TypeScript 类型：

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

然后启动服务器：

```bash
bun run dev
```

使用 `Accept-Language` 测试语言环境协商：

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> 在 `bun run src/index.ts` 之前并非严格需要执行 `intlayer build`：插件在 Elysia 应用启动时也会准备字典。提前运行可以让生成的类型与你的编辑器保持同步，并避免首次请求时的构建开销。

### 兼容性

`elysia-intlayer` 完全兼容：

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 用于 React 应用
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md) 用于 Next.js 应用
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md) 用于 Vite 应用

它也能与各种环境中的任何国际化解决方案无缝协作，包括浏览器和 API 请求。

默认情况下，插件按以下顺序解析语言环境：

1. `INTLAYER_LOCALE` cookie。
2. `x-intlayer-locale` 请求头。
3. `Accept-Language` 请求头协商。

你可以自定义用于语言环境检测的 cookie 和请求头：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置选项
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> 有关配置和高级主题的更多信息，请访问我们的[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`elysia-intlayer` 利用 TypeScript 的强大功能来增强国际化流程。TypeScript 的静态类型确保每个翻译键都被考虑到，降低了缺失翻译的风险，并提高了可维护性。

确保自动生成的类型（默认位于 ./types/intlayer.d.ts）包含在你的 tsconfig.json 文件中。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### VS Code 扩展

为了改进您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **自动完成**翻译键。
- **实时错误检测**缺失的翻译。
- **内联预览**翻译内容。
- **快速操作**轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参考 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到 Git 仓库。

为此，你可以在 `.gitignore` 文件中添加以下说明：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

## 常见问题

<FAQ>

<Question title="国际化 Elysia 后端有哪些不同的解决方案？">

Elysia 本身没有内置的 i18n 层，因此选择通常是：手动将诸如 `i18next` 之类的通用库接入钩子中，或者通过 `elysia-intlayer` 使用 `Intlayer`。`elysia-intlayer` 会自动为您注册插件，按请求解析语言环境，并与前端共享相同的类型化内容。

后端国际化的核心原因在于，用户阅读的大量文本并不经过前端：API 错误消息、事务性邮件、推送通知、短信以及导出的 PDF 文件。这些内容都需要根据接收者的语言进行解析，且应针对每个请求独立解析，而非按会话存储。

请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Question>

<Question title="i18n 会给我的 Elysia 服务端体积增加多少？">

极少。字典在构建前预先编译，仅包含您声明的语言环境，因此启动时无需加载整个大目录，处理请求路径时也无需读取文件系统。这在 Serverless 和 Edge 环境中尤为重要，因为体积直接决定冷启动耗时。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

</Question>

<Question title="我可以从 i18next 迁移而无需重写路由处理函数吗？">

可以，有两条迁移路径。您可以使用 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `i18next` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，路由处理函数代码无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

在同一项目的前端部分，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 则更进一步，可以在构建时直接从 JSX、TSX、Vue 或 Svelte 源码生成字典，使应用的前后端共享同一套内容层，完全无需手动维护键名。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 如何知道用哪种语言响应？">

默认情况下，`elysia-intlayer` 读取传入请求的 `Accept-Language` 请求头，并选择最匹配的已声明语言环境，若无匹配则回退到默认语言环境。您可以通过 `routing.storage` 自定义来源，例如自定义标头或由前端设置的 Cookie，从而使 API 按照用户实际选择的语言响应，而非浏览器默认宣称的语言。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="语言环境在每个请求之间是否隔离？">

是的。插件会将活动语言环境限定在当前请求范围内，因此两个使用不同语言的并发请求绝不会互相读取或干扰对方的语言环境。这使得在服务内部调用 `t()` 和 `getIntlayer()` 具备完全的线程与并发安全性，而无需在每个函数中显式传递语言环境参数。

</Question>

<Question title="如何使用接收者的语言发送事务性邮件？">

像声明其他内容一样在内容文件中声明邮件文本，然后使用 `getIntlayer` 针对接收者存储的语言环境进行解析，而不是使用请求的语言环境。这对于后台作业和队列处理至关重要，因为这类场景下语言属于用户数据库记录，并不存在传入请求标头可供读取。

</Question>

<Question title="如何本地化 API 错误消息？">

在构建错误对象的代码位置使用 `t()` 包裹消息文本。当前活动的请求语言环境会直接将其解析，使客户端能够直接显示该文本，从而无需在前端维护一套冗余平行的错误码目录。

</Question>

<Question title="它是否适用于 Bun 和 Edge 运行时？">

Elysia 原生首要面向 Bun，并且 Intlayer 是通过构建时编译好的字典直接解析内容，而不是在运行时从磁盘读取目录文件，这正是 Edge 环境中最常出现问题的地方。保持 `dictionary.importMode` 为默认的 `"static"` 即可将内容直接打包进服务端代码中。

</Question>

<Question title="该插件是否保留 Elysia 的端到端类型推导？">

是的。该插件像任何其他 Elysia 插件一样使用 `.use()` 进行注册，因此链式推导的类型完全得以保留流转，并且您的字典键由生成的 `types/intlayer.d.ts` 单独提供强类型保障。

</Question>

<Question title="如何使用 AI 自动翻译后端内容？">

运行 `npx intlayer fill`，它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译。添加 `--git-diff` 参数可以仅翻译当前分支修改过的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 在服务端是否支持复数、性别和插值？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件分支、用于插值变量的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于邮件正文的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="我在服务端能获得 TypeScript 自动补全吗？">

是的。Intlayer 会在 `./types/intlayer.d.ts` 中为您的字典生成类型定义，因此访问不存在的键会在编译期直接报错，而不会在运行时返回空字符串。在 CI 中运行 `npx intlayer test` 可在声明的语言环境缺失内容时使构建失败。

</Question>

<Question title="前端和后端可以共享相同的内容吗？">

可以，这正是推荐的架构模式。`elysia-intlayer` 可以与 `react-intlayer`、`next-intlayer` 和 `vite-intlayer` 共同基于完全相同的声明内容工作，因此在 API 响应和页面展示中使用的文案只需声明一次。请参阅 [Intlayer 工作原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/how_works_intlayer.md)。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
