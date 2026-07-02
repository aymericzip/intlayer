---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 i18next 迁移到 Intlayer | 国际化 (i18n)"
description: "了解如何逐步将你的 JavaScript/TypeScript 应用从 i18next 迁移到 Intlayer，无需破坏现有代码。使用 @intlayer/i18next 兼容适配器实现零中断转换。"
keywords:
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# 从 i18next 迁移到 Intlayer

## 为什么从 i18next 迁移到 Intlayer?

<AccordionGroup>

<Accordion header="Bundle 大小">

与其将庞大的 JSON 文件加载到页面中，不如仅加载必要的内容。Intlayer 帮助**将 bundle 和页面大小减少高达 50%**。

</Accordion>

<Accordion header="可维护性">

限定应用内容的范围**便于大规模应用的维护**。您可以复制或删除单个功能文件夹，而无需费力审查整个内容 codebase。此外，Intlayer **完全类型化**以确保内容的准确性。

Intlayer 也是 i18n 生态系统中**开发最活跃的**解决方案——问题得到快速修复，新的框架适配器定期发布，核心 API 根据真实生产反馈不断改进。

</Accordion>

<Accordion header="AI Agent">

内容共定位**减少了大型语言模型 (LLM) 所需的上下文**。Intlayer 还提供一套工具，如**CLI** 来测试缺失的翻译、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI agents 的开发者体验 (DX) 更加顺利。

</Accordion>

<Accordion header="自动化">

使用自动化在您的 CI/CD pipeline 中进行翻译，使用您选择的 LLM，费用由您的 AI 提供商承担。Intlayer 还提供**编译器**来自动化内容提取，以及一个 [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来帮助**在后台翻译**。

</Accordion>

<Accordion header="性能">

将庞大的 JSON 文件连接到组件可能导致性能和响应性问题。Intlayer 在构建时优化您的内容加载。

</Accordion>

<Accordion header="与非开发人员协作扩展">

不仅仅是一个 i18n 解决方案，Intlayer 提供**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和一个**[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)** 来帮助您**实时**管理多语言内容，使与翻译人员、文案编写者和其他团队成员的协作无缝衔接。内容可以本地和/或远程存储。

</Accordion>

</AccordionGroup>

---

## 迁移策略

从 `i18next` 迁移到 Intlayer 有两种互补策略：

1. **兼容性适配器（推荐用于现有应用）** — 安装 `@intlayer/i18next`。这个包暴露了与 `i18next` **完全相同的 API**，但在底层将所有翻译工作委托给 Intlayer。你可以保留现有的 `i18next.t()`、`i18next.changeLanguage()` 和 `createInstance()` 调用 — 唯一的改变是导入路径和初始化方式。

2. **完整迁移** — 逐步用原生 Intlayer 工具替换 `i18next` API，并在 `.content.ts` 文件中并置内容。

本指南首先涵盖**策略 1**（即插即用的兼容性适配器），然后演示可选的完整迁移。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是使现有 `i18next` 应用以零代码更改运行在 Intlayer 上所需的最少要求。

<Steps>

<Step number={1} title="安装依赖">

安装 Intlayer 核心包和兼容性适配器：

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> 你可以保持 `i18next` 的安装 — 兼容性适配器将其用作 `devDependency` / `peerDependency` 来获取 TypeScript 类型。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令创建一个起始的 `intlayer.config.ts`。更新它以匹配你现有的语言环境并将 `syncJSON` 插件指向你的消息文件：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此处添加所有现有语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 匹配 i18next 占位符语法：{{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** 将语言环境映射到其 JSON 文件路径。**`location`** 告诉 Intlayer 监听器应监控哪个文件夹以获取更改。`format: 'i18next'` 选项确保正确解析占位符，如 `{{name}}`。

</Step>

<Step number={3} title="更新 Bundler 别名（可选）">

如果你使用 bundler（Vite、Webpack、esbuild），可以注入模块别名，使得 `import ... from 'i18next'` 自动解析为 `@intlayer/i18next`。这消除了手动更改代码库中任何导入的需要。

**对于 Vite：**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` 包装 `vite-intlayer` 的 `intlayer()` 插件，并为你添加 `i18next` → `@intlayer/i18next` 别名。使用来自 `vite-intlayer` 的普通 `intlayer()` 插件会编译字典，但 **不会** 添加该别名 — 你需要手动将导入重命名为 `@intlayer/i18next`（见下一步）。

</Step>

</Steps>

这就是快速迁移的全部内容。你的应用现在运行在 Intlayer 上，同时保持每个 `i18next` 导入和 API 完整。

---

## 完整迁移

下面的步骤是可选的，可以逐步完成。它们解锁了完整的 Intlayer 功能集：可视化编辑器、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式导入重命名（可选）" isOptional={true}>

如果您想在源文件中明确声明依赖关系，或者您没有使用 bundler 插件来别名导入，您可以手动重命名导入：

| 之前                                       | 之后                                                 |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

这些是**直接替换** — 不需要对调用签名、参数或返回类型进行任何更改。

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

Intlayer 配置完成后，使用其 CLI 自动填充缺失的翻译：

```bash packageManager="npm"
# 测试缺失的翻译（添加到 CI）
npx intlayer test

# 使用 AI 填充缺失的翻译
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

将 AI 配置添加到 `intlayer.config.ts`：

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
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // 默认值
    // model: "gpt-4o-mini",   // 默认值
  },
};

export default config;
```

> 查看 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 了解所有可用选项。

</Step>

</Steps>

---

## 迁移后可以删除的内容

一旦 compat adapter 就位，以下 `i18next` 样板代码可以删除：

| 文件 / 模式                    | 为什么不再需要                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `i18next.init()` 调用          | Intlayer 自动初始化所有内容；没有运行时加载步骤。                                                    |
| `i18next.use(...)`             | Intlayer 不使用 i18next 插件、后端或语言检测器。                                                     |
| JSON 语言包 (`locales/*.json`) | JSON 包仅在您仍然使用 `syncJSON` 插件时才需要。迁移到 `.content.ts` 文件后，您可以删除 JSON 文件夹。 |

当您准备进一步操作时，Intlayer **自动发现您的 codebase 中任何地方的所有 `.content.ts` 和 `.content.json` 文件**（默认情况下，在 `./src` 内的任何地方）。您可以将 `my-component.content.ts` 文件放在逻辑代码的旁边，Intlayer 将在构建时自动发现它，无需任何额外配置——无需导入、无需注册、无需集中索引文件。这使得共置翻译完全无摩擦。

---

## 配置 TypeScript

Intlayer 使用模块增强来为您的翻译键提供完整的 TypeScript intellisense。确保您的 `tsconfig.json` 包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

---

## Git 配置

将 Intlayer 生成的目录添加到你的 `.gitignore`：

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## 深入了解

- **Visual Editor** — 在浏览器中直观管理翻译: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** — 外部化和远程管理内容: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** — 获得自动完成和实时翻译错误检测: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI Reference** — CLI 命令完整列表: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
