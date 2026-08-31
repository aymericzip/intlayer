---
createdAt: 2025-12-30
updatedAt: 2026-08-30
title: "Fastify i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Fastify 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Fastify
  - JavaScript
  - 后端
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.6.0
    date: 2025-12-31
    changes: "添加 init 命令"
  - version: 7.6.0
    date: 2025-12-31
    changes: "初始化历史记录"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Fastify 后端网站 | 国际化 (i18n)

`fastify-intlayer` 是一个强大的 Fastify 应用程序国际化 (i18n) 插件，旨在通过根据客户端的偏好提供本地化响应，使您的后端服务在全球范围内可访问。

> 在 GitHub 上查看软件包实现：https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### 实际应用场景

- **以用户语言显示后端错误**：发生错误时，以用户的母语显示消息可以提高理解度并减少挫败感。这对于可能显示在前端组件（如 toast 或 modal）中的动态错误消息特别有用。
- **检索多语言内容**：对于从数据库提取内容的应用程序，国际化确保您可以提供多种语言的内容。这对于电子商务网站或内容管理系统等平台至关重要，这些平台需要以用户首选的语言显示产品描述、文章和其他内容。
- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人的语言发送电子邮件都可以显著提高参与度和有效性。
- **多语言推送通知**：对于移动应用程序，以用户首选的语言发送推送通知可以增强交互和留存。这种个性化的触感可以让通知感觉更具相关性和可操作性。
- **其他通信**：来自后端的任何形式的通信（如短信、系统警报或用户界面更新）都受益于使用用户的语言，从而确保清晰度并增强整体用户体验。

通过对后端进行国际化，您的应用程序不仅尊重文化差异，而且能更好地符合全球市场需求，使其成为在全球范围内扩展服务的关键步骤。

## 入门指南

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

在 GitHub 上查看 [应用程序模板](https://github.com/aymericzip/intlayer-fastify-template)。

### 安装

要开始使用 `fastify-intlayer`，请使用 npm 安装软件包：

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
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### 设置

通过在项目根目录中创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 声明内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de 内容 devuelto en español (México)",
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de 内容 devuelto en español (México)"
      }
    }
  }
}
```

> 只要包含在 `contentDir` 目录（默认为 `./src`）中，您的内容声明就可以在应用程序的任何位置定义。并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详情，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### Fastify 应用程序设置

设置您的 Fastify 应用程序以使用 `fastify-intlayer`：

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 加载国际化插件
await fastify.register(intlayer);

// 路由
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de 内容 devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### 兼容性

`fastify-intlayer` 与以下项完全兼容：

- 针对 React 应用程序的 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md)
- 针对 Next.js 应用程序的 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md)
- 针对 Vite 应用程序的 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md)

它还可以跨各种环境（包括浏览器和 API 请求）与任何国际化解决方案无缝协作。您可以自定义中间件通过 header 或 cookie 检测语言区域：

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

默认情况下，`fastify-intlayer` 将解释 `Accept-Language` 标头以确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`fastify-intlayer` 利用 TypeScript 的强大功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被考虑到，从而降低丢失翻译的风险并提高可维护性。

确保在您的 `tsconfig.json` 文件中包含自动生成的类型（默认为 `./types/intlayer.d.ts`）。

```json5 fileName="tsconfig.json"
{
  // ... 您的现有 TypeScript 配置
  "include": [
    // ... 您的现有 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code Extension**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展包含：

- 翻译键的 **自动补全**。
- 针对缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详情，请参阅 [Intlayer VS Code Extension 文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下说明添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

## 常见问题

<FAQ>

<Question title="国际化 Fastify 后端有哪些不同的解决方案？">

通用方案是使用 `i18next` 配合 `fastify-i18next` 或手写钩子，它按命名空间加载 JSON 目录并将语言环境存储在请求对象上。另一种选择是通过 `fastify-intlayer` 使用 `Intlayer`，它自动为您注册插件，按请求解析语言环境，并与前端共享相同的类型化内容。

后端国际化的核心原因在于，用户阅读的大量文本并不经过前端：API 错误消息、事务性邮件、推送通知、短信以及导出的 PDF 文件。这些内容都需要根据接收者的语言进行解析，且应针对每个请求独立解析，而非按会话存储。

请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Question>

<Question title="i18n 会给我的 Fastify 服务端体积增加多少？">

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

默认情况下，`fastify-intlayer` 读取传入请求的 `Accept-Language` 请求头，并选择最匹配的已声明语言环境，若无匹配则回退到默认语言环境。您可以通过 `routing.storage` 自定义来源，例如自定义标头或由前端设置的 Cookie，从而使 API 按照用户实际选择的语言响应，而非浏览器默认宣称的语言。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

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

<Question title="它是否适用于 Fastify 插件生命周期和封装机制 (encapsulation)？">

是的。`fastify-intlayer` 注册为标准的 Fastify 插件，完全遵循常规的封装规则。您可以将其注册在根作用域，或者仅注册在需要的作用域内，确保位于读取内容的路由之前即可。

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

可以，这正是推荐的架构模式。`fastify-intlayer` 可以与 `react-intlayer`、`next-intlayer` 和 `vite-intlayer` 共同基于完全相同的声明内容工作，因此在 API 响应和页面展示中使用的文案只需声明一次。请参阅 [Intlayer 工作原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/how_works_intlayer.md)。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
