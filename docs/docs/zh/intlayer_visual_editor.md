---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Intlayer 可视编辑器 | 使用可视编辑器编辑您的内容
description: 发现如何使用 Intlayer 编辑器来管理您的多语言网站。按照本在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - 编辑器
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# Intlayer 可视化编辑器文档

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer 可视化编辑器是一种工具，可以将您的网站包装起来，通过可视化编辑器与您的内容声明文件进行交互。

![Intlayer 可视化编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

`intlayer-editor` 包基于 Intlayer，可用于 JavaScript 应用程序，例如 React (Create React App)、Vite + React 和 Next.js。

## 可视化编辑器 vs CMS

Intlayer 可视化编辑器是一种工具，允许您在本地字典的可视化编辑器中管理内容。一旦进行了更改，内容将在代码库中被替换。这意味着应用程序将被重新构建，页面将重新加载以显示新内容。

相比之下，[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 是一种工具，允许您在远程字典的可视化编辑器中管理内容。一旦进行了更改，内容将**不会**影响您的代码库。网站将自动显示更改后的内容。

## 将 Intlayer 集成到您的应用程序中

有关如何集成 Intlayer 的更多详细信息，请参阅以下相关部分：

### 与 Next.js 集成

有关与 Next.js 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)。

## Intlayer 编辑器如何工作

应用程序中的可视化编辑器包括以下两部分：

- 一个前端应用程序，它将在 iframe 中显示您的网站。如果您的网站使用了 Intlayer，可视化编辑器将自动检测您的内容，并允许您与之交互。一旦进行了修改，您将能够下载更改。

- 当您点击下载按钮时，可视化编辑器将向服务器发送请求，用新内容替换您的内容声明文件（无论这些文件在您的项目中声明在哪里）。

> 请注意，目前 Intlayer 编辑器将您的内容声明文件写为 JSON 文件。

## 安装

在您的项目中配置好 Intlayer 后，只需将 `intlayer-editor` 安装为开发依赖项：

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

使用 `--with` 标志，您可以与另一个命令并行启动编辑器：

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## 配置

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     * 示例：'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，编辑器将处于非活动状态且无法访问。
     * 可用于出于安全原因在特定环境（如生产环境）中禁用编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 可选
     * 默认值为 `8000`。
     * 编辑器服务器的端口。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 可选
     * 默认值为 "http://localhost:8000"
     * 编辑器服务器的 URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> 要查看所有可用参数，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用编辑器

1. 安装编辑器后，您可以使用以下命令启动编辑器：

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **请注意，您应该并行运行您的应用程序。** 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。

> **注意该命令由 `intlayer` 包重新导出。你可以改用 `npx intlayer editor start`。**

2. 然后，打开提供的 URL。默认值为 `http://localhost:8000`。

   您可以通过将光标悬停在内容上查看每个由 Intlayer 索引的字段。

   ![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. 如果您的内容被标出，您可以长按它以显示编辑抽屉。

## 环境配置

编辑器可以配置为使用特定的环境文件。当您希望在开发和生产环境中使用相同的配置文件时，这非常有用。

要使用特定的环境文件，您可以在启动编辑器时使用 `--env-file` 或 `-f` 标志：

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> 请注意，环境文件应位于项目的根目录中。

或者，您可以使用 `--env` 或 `-e` 标志来指定环境：

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## 调试

如果您在使用可视化编辑器时遇到任何问题，请检查以下内容：

- 可视化编辑器和应用程序是否正在运行。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 配置是否正确设置在您的 Intlayer 配置文件中。
  - 必需字段：
    - 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。

- 可视化编辑器使用 iframe 来显示您的网站。请确保您网站的内容安全策略（CSP）允许将 CMS URL 作为 `frame-ancestors`（默认值为 'http://localhost:8000'）。如有错误，请检查编辑器控制台。

## 常见问题

<FAQ>

<Question title="可视化编辑器与 CMS 有什么区别？">

可视化编辑器编辑的是本地字典，并将修改直接写回您的代码库中，因此会走常规的代码审查和部署流水线。而 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 编辑的是远程字典，可在运行中的线上站点直接生效而无需重新部署。编辑器适合开发者掌控的内容；CMS 适合市场团队掌控的内容。

</Question>

<Question title="i18n 会给我的 bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，而构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃。[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 i18next、next-intl 或 react-i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 或 [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n` 和 `Lingui` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码无需修改。

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

<Question title="可视化编辑器运行在哪里？">

运行在您自己的基础设施上。它在 iframe 中加载您的应用程序并与本地编辑器服务器通信，因此您的内容永远不会离开您的本地环境。这使得无法将文案发送到第三方托管服务的敏感项目也能放心使用。

</Question>

<Question title="内容编辑人员需要懂编程吗？">

不需要。他们只需打开站点，点击任意文本块即可在页面上就地修改。编辑器会自动解析是哪个字典条目支撑了该文本，并将更改准确写回正确的内容文件中，因此翻译人员无需知道文件路径或键名。

</Question>

<Question title="通过可视化编辑器修改会更改我的源代码文件吗？">

是的，这正是其设计目的。更改会直接写入您代码库中的内容声明文件，因此它会作为正常的代码 diff 展示供您审查和提交，并且应用会重新构建以呈现最新修改。

</Question>

<Question title="编辑器显示空白页或拒绝加载我的网站，我应该检查什么？">

编辑器通过 iframe 展示您的应用程序，因此您的内容安全策略 (CSP) 必须将编辑器的来源允许为 `frame-ancestors`（默认为 `http://localhost:8000`）。同时请确认编辑器配置中的 `applicationURL` 与您应用的实际服务地址完全一致。编辑器控制台会详细报告这两类错误。

</Question>

<Question title="我可以在生产环境中使用可视化编辑器吗？">

它是专为开发和预发布 (staging) 环境设计的，在这类环境中编辑后触发重新构建是可以接受的。若要在无需重新部署的情况下直接修改线上运行中的内容，请使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 及其远程字典功能。

</Question>

<Question title="可视化编辑器是免费的吗？">

是的。可视化编辑器是开源项目的一部分，基于 Apache 2.0 许可证授权，包含商业用途。仅托管版 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 属于付费服务，并且 CMS 也完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
