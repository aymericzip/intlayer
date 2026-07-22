---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 @nuxtjs/i18n 迁移到 Intlayer | 国际化 (i18n)"
description: "了解如何将您的 Nuxt 应用从 @nuxtjs/i18n 迁移到 Intlayer — 逐步进行，不破坏现有代码。使用 @intlayer/vue-i18n 兼容适配器实现零中断过渡。"
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# 从 @nuxtjs/i18n 迁移到 Intlayer

## 为什么从 @nuxtjs/i18n 迁移到 Intlayer？

<AccordionGroup>

<Accordion header="Bundle 大小">

不再需要将庞大的 JSON 文件加载到页面中，只加载必要的内容。Intlayer 帮助您**将 bundle 和页面大小减少高达 50%**。

</Accordion>

<Accordion header="可维护性">

对应用程序的内容进行作用域划分**便于大规模应用的维护**。您可以复制或删除单个功能文件夹，无需审查整个内容代码库的心理负担。此外，Intlayer **完全类型化**，确保内容的准确性。

Intlayer 也是 i18n 生态系统中**开发最活跃的**解决方案 — 问题修复快速、新框架适配器定期发布，核心 API 根据真实生产反馈不断优化。

</Accordion>

<Accordion header="AI Agent">

将内容并置**减少了大语言模型 (LLM) 所需的上下文**。Intlayer 还提供了一套工具，如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI agents 的开发体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

在 CI/CD 管道中使用自动化翻译，使用您选择的 LLM，按 AI 提供商的费用计费。Intlayer 还提供了**编译器**来自动提取内容，以及 [web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来帮助**后台翻译**。

</Accordion>

<Accordion header="性能">

将庞大的 JSON 文件连接到组件可能会导致性能和响应性问题。Intlayer 在构建时优化您的内容加载。

</Accordion>

<Accordion header="与非开发人员协作扩展">

Intlayer 不仅仅是一个 i18n 解决方案，它还提供**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和**[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，帮助您**实时**管理多语言内容，使与翻译人员、文案人员和其他团队成员的协作无缝衔接。内容可以存储在本地和/或远程。

</Accordion>

</AccordionGroup>

---

## 迁移策略

由于 `@nuxtjs/i18n` 在底层由 `vue-i18n` 驱动，迁移到 Intlayer 有两种互补的策略：

1. **兼容适配器（推荐用于现有应用）** — 安装 `@intlayer/vue-i18n` 和 `nuxt-intlayer`。这暴露了与 `vue-i18n` **完全相同的 API**，但在底层将所有翻译工作委托给 Intlayer。您保持现有的 `$t`、`useI18n()` 和 Nuxt 路由不变 — 唯一的变化是初始化。

2. **完整迁移** — 逐步用本地 Intlayer hooks（`useIntlayer`）替换 `@nuxtjs/i18n` API，并在组件旁边的 `.content.ts` 文件中共同放置内容。

本指南首先介绍**策略 1**（即插即用兼容适配器），然后讲解可选的完整迁移。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是使现有 Nuxt 应用在 Intlayer 上运行所需的最低要求，组件中无需任何代码更改。

<Steps>

<Step number={1} title="安装依赖">

安装 Intlayer 核心包和兼容性适配器：

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

> `--interactive` 标志是可选的。如果你是 AI 代理，使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> 你可以在迁移期间安全地保持 `@nuxtjs/i18n` 已安装状态，尽管稍后你将从 Nuxt 配置中删除它。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令创建一个启动 `intlayer.config.ts`。更新它以匹配你现有的语言环境，并将 `syncJSON` 插件指向你的消息文件：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此添加所有现有语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 匹配 vue-i18n 占位符语法：{name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** 将语言环境映射到其 JSON 文件路径。**`location`** 告诉 Intlayer 观察器监控哪个文件夹以查找更改。`format: 'icu'` 选项确保占位符被正确解析以供 `vue-i18n` 使用。

</Step>

<Step number={3} title="更新 Nuxt 配置">

在 `nuxt.config.ts` 中用 `nuxt-intlayer` 替换 `@nuxtjs/i18n` 模块。Intlayer 插件自动注入模块别名，这意味着你现有的 `import { useI18n } from 'vue-i18n'` 调用被透明地重定向到 `@intlayer/vue-i18n`。

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // 移除 '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **你不再需要定义 Nuxt i18n 配置对象。** Intlayer 在**构建时**编译所有字典，无缝处理语言环境检测、路由和字典加载。

</Step>

</Steps>

快速迁移就这样。你的 Nuxt 应用现在在 Intlayer 上运行，同时保持所有 `$t` 和 `useI18n()` 完好无损。

---

## 完整迁移

以下步骤是可选的，可以逐步完成。它们可以解锁 Intlayer 的完整功能集：可视编辑器、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式导入重命名（可选）" isOptional={true}>

Intlayer 插件已在 bundler 级别处理别名。如果你更希望在源文件中明确表示依赖关系，可以手动重命名导入：

| 之前                                 | 之后                                           |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

这些是**即插即用的替代品** — 不需要对调用签名、参数或返回类型进行任何更改。

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

设置好 Intlayer 后，使用其 CLI 自动填充缺失的翻译：

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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

兼容适配器就位后，可以移除以下样板代码：

| 文件 / 模式                        | 为什么不再需要                                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `nuxt.config.ts` 中的 `i18n` 配置  | Intlayer 在内部处理路由、字典加载和默认语言环境。                                              |
| `package.json` 中的 `@nuxtjs/i18n` | 完全被 `nuxt-intlayer` 取代。                                                                  |
| JSON 语言包（`locales/*.json`）    | JSON 包仅在仍使用 `syncJSON` 插件时才需要。迁移到 `.content.ts` 文件后，可以删除 JSON 文件夹。 |

当你准备继续深入时，Intlayer **会自动发现代码库中任何位置的所有 `.content.ts` 和 `.content.json` 文件**（默认情况下，在 `./src` 内的任何位置）。你可以将 `my-component.content.ts` 文件放在你的 `MyComponent.vue` 旁边，Intlayer 会在构建时自动获取它，无需任何额外配置 — 无需导入、无需注册、无需中央索引文件。这使得将翻译与页面和组件共置变得完全无摩擦。

---

## 配置 TypeScript

Intlayer 使用模块增强来为你的翻译键提供完整的 TypeScript 智能感知。确保你的 `tsconfig.json` 包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
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

## 进一步了解

- **Visual Editor** — 在浏览器中以可视方式管理翻译：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** — 外部化和远程管理内容：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** — 获取自动完成和实时翻译错误检测：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI Reference** — CLI 命令完整列表：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- **Intlayer with Nuxt** — Nuxt 完整设置指南：[intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md)
- **Intlayer with Vue** — Vue 完整设置指南：[intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)
