---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 next-i18next 迁移到 Intlayer | 国际化 (i18n)"
description: "学习如何将你的 Next.js 应用从 next-i18next 迁移到 Intlayer — 逐步进行，不破坏现有代码。使用 @intlayer/next-i18next 兼容适配器实现零中断过渡。"
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "初始化历史记录"
author: aymericzip
---

# 从 next-i18next 迁移到 Intlayer

## 为什么从 next-i18next 迁移到 Intlayer?

<AccordionGroup>

<Accordion header="Bundle 大小">

与其将大量 JSON 文件加载到页面中，不如只加载必要的内容。Intlayer 可帮助**将 bundle 和页面大小减少最多 50%**。

</Accordion>

<Accordion header="可维护性">

限定应用程序内容的范围**有利于大规模应用程序的维护**。你可以复制或删除单个功能文件夹，而无需费力审查整个内容 codebase。此外，Intlayer **完全类型化**，以确保内容的准确性。

Intlayer 也是 i18n 生态系统中**开发最活跃**的解决方案 — 问题修复迅速，新的框架适配器定期发布，核心 API 根据真实的生产反馈不断改进。

</Accordion>

<Accordion header="AI Agent">

内容共置**减少了大型语言模型 (LLM) 所需的上下文**。Intlayer 还附带一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI agents 的开发者体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

在你的 CI/CD pipeline 中使用自动化翻译，使用你选择的 LLM，成本由你的 AI 提供商承担。Intlayer 还提供**编译器**来自动化内容提取，以及一个 [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 帮助**后台翻译**。

</Accordion>

<Accordion header="性能">

将大量 JSON 文件连接到组件可能会导致性能和响应性问题。Intlayer 在构建时优化了你的内容加载。

</Accordion>

<Accordion header="与非开发人员协作扩展">

Intlayer 不仅仅是一个 i18n 解决方案，它还提供**自托管[可视编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和**[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)** 来帮助你**实时**管理多语言内容，使与翻译人员、文案和其他团队成员的协作无缝进行。内容可以存储在本地和/或远程。

</Accordion>

</AccordionGroup>

---

## 迁移策略

由于 `next-i18next` 在底层封装了 `react-i18next` 和 `i18next`，迁移到 Intlayer 有两种互补的策略：

1. **兼容适配器（推荐用于现有应用）** — 安装 `@intlayer/next-i18next`、`@intlayer/react-i18next` 和 `@intlayer/i18next`。这些包公开的 **API 完全相同**，但在底层将所有翻译工作委托给 Intlayer。您可以保持现有的 `useTranslation`、`appWithTranslation`、`serverSideTranslations` 调用和 Next.js Pages 路由不变 — 唯一的变化是初始化。

2. **完全迁移** — 逐步使用原生 Intlayer 钩子（`useIntlayer`）替换 `next-i18next` API，并在组件旁边的 `.content.ts` 文件中并置内容。

本指南首先介绍**策略 1**（即插即用的兼容适配器），然后演示可选的完全迁移。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是让现有 Next.js Pages Router 应用在 Intlayer 上运行所需的最少要求,无需对页面和组件进行任何代码更改。

<Steps>

<Step number={1} title="安装依赖">

安装 Intlayer 核心包和兼容适配器:

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

> `--interactive` 标志是可选的。如果您是 AI 代理,请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> 在迁移期间,您可以安全地保留 `next-i18next`、`react-i18next` 和 `i18next` 的安装,尽管在别名后您将删除它们。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令创建一个启动器 `intlayer.config.ts`。更新它以匹配您现有的语言环境,并将 `syncJSON` 插件指向您的 `next-i18next` 消息文件(通常在 `public/locales` 内):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在这里添加所有现有的语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 匹配 i18next 占位符语法: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** 将语言环境和命名空间(`key`)映射到其 JSON 文件路径。**`location`** 告诉 Intlayer 监听器监视哪个文件夹以获取更改。`format: 'i18next'` 选项确保正确解析 `next-i18next` 的占位符。

</Step>

<Step number={3} title="更新 Next.js 配置">

使用来自 `@intlayer/next-i18next/plugin` 的 `createNextI18nPlugin` 包装现有的 `next.config.ts`(或 `.js`)。此包装器组合 `withIntlayer` **并且** 注入 `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*` 别名,因此您现有的 `import { useTranslation } from 'next-i18next'` 调用在构建时透明地重定向。不需要更改源文件。

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// 您可以删除从 next-i18next.config.js 导入的 i18n 配置
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer 在底层管理 Next.js i18n 路由,
  // 所以您不再需要在这里传递 i18n 对象。
};

export default withIntlayer(nextConfig);
```

> **您不再需要 `next-i18next.config.js`。** Intlayer 在**构建时**编译所有字典,无缝处理语言环境检测、路由和字典加载。
>
> 倾向于使用来自 `next-intlayer/server` 的简单 `withIntlayer`? 它编译您的字典但**不**添加 `next-i18next` / `react-i18next` / `i18next` 别名 — 您随后需要手动将导入重命名为 `@intlayer/*`(请参阅第 4 步)。

</Step>

</Steps>

快速迁移就到这里。您的 Next.js 应用现在在 Intlayer 上运行,同时保持每个 `useTranslation`、`serverSideTranslations` 和 `appWithTranslation` 调用完整。

> **有类型的翻译键 — 自动。** 一旦 Intlayer 编译您的字典,`useTranslation` 和 `getFixedT` 就会针对您的实际内容进行类型化。键在您的 IDE 中自动完成,无效路径会在构建时导致 TypeScript 错误 — 无需额外设置。
>
> ```tsx
> // Pages Router — 'about' 是一个已注册的字典键
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ 自动完成
> t("does.not.exist"); // ✗ TypeScript 错误
>
> // getStaticProps / getServerSideProps (i18next 实例)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ 有类型
> ```

---

## 完整迁移

下面的步骤是可选的，可以逐步完成。它们解锁完整的 Intlayer 功能集：可视化编辑器、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式导入重命名（可选）" isOptional={true}>

Intlayer 插件已经在 bundler 级别处理别名。如果您更希望在源文件中明确依赖关系，可以手动重命名导入：

| Before                                                                         | After                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

这些是**即插即用替代品**——无需更改调用签名、参数或返回类型。

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

一旦 Intlayer 连接好，使用其 CLI 自动填充缺失的翻译：

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

> 详见 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)了解所有可用选项。

</Step>

</Steps>

---

## 迁移后可以删除的内容

一旦 compat adapter 就位，以下 `next-i18next` 样板代码可以删除：

| 文件 / 模式                                     | 不再需要的原因                                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                        | Intlayer 根据 `intlayer.config.ts` 在内部处理路由、字典加载和默认语言环境。                                |
| `next-i18next` from `package.json`              | 完全被 `@intlayer/next-i18next` 和别名替代。                                                               |
| JSON language bundles (`public/locales/*.json`) | JSON bundles 仅在你仍然使用 `syncJSON` 插件时才需要。迁移到 `.content.ts` 文件后，你可以删除 JSON 文件夹。 |

当你准备进一步操作时，Intlayer **会自动发现整个 codebase 中的所有 `.content.ts` 和 `.content.json` 文件**（默认情况下，在 `./src` 内的任何位置）。你可以将 `my-component.content.ts` 文件放在 `MyComponent.tsx` 旁边，Intlayer 将在构建时自动识别它，无需任何额外配置 — 无需导入、无需注册、无需集中的索引文件。这使得将翻译与页面和组件并置完全无障碍。

---

## 配置 TypeScript

Intlayer 使用模块扩充来为你的翻译键提供完整的 TypeScript intellisense。确保你的 `tsconfig.json` 包含自动生成的类型：

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

将 Intlayer 生成的目录添加到您的 `.gitignore`：

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## 进一步学习

- **Visual Editor** — 在浏览器中可视化管理翻译：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** — 外部化和远程管理内容：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** — 获取自动完成和实时翻译错误检测：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI Reference** — CLI 命令完整列表：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- **Intlayer with Next.js (Pages Router)** — Next.js 完整设置指南：[intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)
