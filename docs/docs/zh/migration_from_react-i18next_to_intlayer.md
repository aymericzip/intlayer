---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 react-i18next / i18next 迁移到 Intlayer | 国际化 (i18n)"
description: "了解如何逐步将您的 React 或 Next.js 应用从 react-i18next 或 i18next 迁移到 Intlayer，无需破坏现有代码。使用 @intlayer/react-i18next 和 @intlayer/i18next 兼容适配器实现零中断过渡。"
keywords:
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
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# 从 react-i18next / i18next 迁移到 Intlayer

## 为什么从 react-i18next / i18next 迁移到 Intlayer？

<AccordionGroup>

<Accordion header="Bundle 大小">

与其将大量 JSON 文件加载到你的页面中，不如只加载必要的内容。Intlayer 帮助你**将 bundle 和页面大小减少多达 50%**。

</Accordion>

<Accordion header="可维护性">

对应用内容进行作用域划分**便于大规模应用的维护**。你可以复制或删除单个功能文件夹，而无需费力审查整个内容 codebase。此外，Intlayer **完全类型化**，确保你的内容准确性。

Intlayer 也是 i18n 生态中**最活跃开发**的方案——问题修复速度快，新的 framework 适配器定期发布，core API 根据真实生产反馈不断改进。

</Accordion>

<Accordion header="AI Agent">

内容的共置**降低了大语言模型 (LLM) 所需的上下文**。Intlayer 还配备了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，让 AI agent 的开发者体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

在 CI/CD pipeline 中使用自动化翻译，使用你选择的 LLM，成本由你的 AI 提供商承担。Intlayer 还提供**编译器**来自动化内容提取，以及一个 [web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)来帮助**后台翻译**。

</Accordion>

<Accordion header="性能">

将大量 JSON 文件连接到组件可能导致性能和响应性问题。Intlayer 在构建时优化你的内容加载。

</Accordion>

<Accordion header="与非开发人员协作扩展">

Intlayer 不仅是一个 i18n 方案，它还提供**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，帮助你**实时**管理多语言内容，使与翻译人员、文案编写者和其他团队成员的协作无缝衔接。内容可以存储在本地和/或远程。

</Accordion>

</AccordionGroup>

---

## 迁移策略

从 `react-i18next` / `i18next` 迁移到 Intlayer 有两种互补的策略：

1. **兼容适配器（推荐用于现有应用）** — 安装 `@intlayer/react-i18next`（用于 React 组件）和/或 `@intlayer/i18next`（用于核心 `i18n` 实例）。这些包暴露的 **API 完全相同**，但将所有翻译工作委托给底层的 Intlayer。你可以保持现有的 `useTranslation`、`Trans`、`withTranslation`、`i18next.t()` 调用 — 唯一的改变是导入路径。

2. **完整迁移** — 逐步将 `react-i18next` API 替换为原生 Intlayer hooks（`useIntlayer`、`IntlayerProvider`），并在组件旁的 `.content.ts` 文件中共置内容。

本指南先介绍 **策略 1**（即插即用兼容适配器），然后讲解可选的完整迁移。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是在零代码更改的情况下让现有 `react-i18next` 应用在 Intlayer 上运行所需的最少步骤。

<Steps>

<Step number={1} title="安装依赖项">

安装 Intlayer 核心包和兼容性适配器：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> 你可以保留 `react-i18next` 和 `i18next` 已安装——兼容性适配器将它们用作 TypeScript 类型的 `devDependencies` / 可选的 `peerDependencies`。你无需更改任何 `package.json` 同级依赖。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令会创建一个启动 `intlayer.config.ts`。更新它以匹配你现有的语言环境并将 `syncJSON` 插件指向你的消息文件：

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
      // 匹配 react-i18next 占位符语法：{{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** 将语言环境映射到其 JSON 文件路径。**`location`** 告诉 Intlayer 监视程序要监视哪个文件夹以查找更改。`format: 'i18next'` 选项确保正确解析 `{{name}}` 等占位符。

</Step>

<Step number={3} title="将 Intlayer 插件添加到你的 Bundler">

使用兼容性插件包装你现有的 bundler 配置。它组成核心 Intlayer 插件，连接内容监视，以及——至关重要的是——**注入模块别名**，以便你现有的 `import … from 'react-i18next'`（和 `'i18next'`）调用在构建时透明地重定向到 `@intlayer/react-i18next` / `@intlayer/i18next`。不需要更改源文件。

**对于 Vite：**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` 包装 `vite-intlayer` 的 `intlayer()` 插件并添加 `react-i18next` / `i18next` 别名。使用来自 `vite-intlayer` 的普通 `intlayer()` 插件会编译字典，但**不会**添加这些别名——之后你需要手动将导入重命名为 `@intlayer/*`（参见步骤 4）。

**对于 Next.js：**

如果你使用 `next-i18next`（Pages Router 集成），请安装 `@intlayer/next-i18next` 和 `next-intlayer`：

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

然后将兼容性插件添加到你的 `next.config.ts`（它注入 `next-i18next` / `react-i18next` / `i18next` 别名）：

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* your options */
};

export default withIntlayer(nextConfig);
```

> **你不再需要 `i18next.init()` 或手动提供程序启动。** Intlayer 在**构建时**编译所有字典，因此不需要运行时加载步骤。别名提供程序会为你处理初始化。

</Step>

</Steps>

快速迁移就到此为止。你的应用现在在 Intlayer 上运行，同时保持每个 `react-i18next` 导入和 API 都完整。

> **类型化翻译键——自动进行。** Intlayer 编译你的字典后，`useTranslation` 和 `getFixedT` 会针对你的实际内容进行类型化。你的 IDE 中会自动完成键，无效路径会在构建时导致 TypeScript 错误——无需额外设置。
>
> ```tsx
> // 'about' 是一个注册的字典键 → t() 只接受有效的点路径
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ 自动完成
> t("does.not.exist"); // ✗ TypeScript 错误
>
> // 服务端（i18next 实例）
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ 类型化
> ```

---

## 完整迁移

以下步骤是可选的，可以逐步完成。它们解锁完整的 Intlayer 功能集：可视化编辑器、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式导入重命名（可选）" isOptional={true}>

Intlayer 插件已在打包程序级别处理别名。如果你更希望在源文件中明确依赖关系，可以手动重命名导入：

| Before                                             | After                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

对于 Next.js（`next-i18next`）：

| Before                                                                         | After                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

Intlayer 设置完成后，使用其 CLI 自动填充缺失的翻译：

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
    // provider: "openai",     // 默认
    // model: "gpt-4o-mini",   // 默认
  },
};

export default config;
```

> 更多可用选项，请参阅 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>

</Steps>

---

## 迁移后可以删除的内容

一旦 compat 适配器就位，以下 `react-i18next` / `i18next` 样板代码可以删除：

| 文件 / 模式                            | 为什么不再需要                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `i18next.init()` 调用                  | Intlayer 的 provider 会自动初始化一切；没有运行时加载步骤。                                            |
| `I18nextProvider` / `initReactI18next` | Intlayer 插件在幕后处理注入和引导。                                                                    |
| JSON 语言包（`locales/*.json`）        | JSON 包仅在您仍然使用 `syncJSON` 插件时才需要。一旦迁移到 `.content.ts` 文件，您可以删除 JSON 文件夹。 |

当您准备好进一步进行时，Intlayer **会自动发现代码库中任何位置的所有 `.content.ts` 和 `.content.json` 文件**（默认情况下，在 `./src` 内的任何位置）。您可以将 `my-component.content.ts` 文件放在 `MyComponent.tsx` 旁边，Intlayer 将在构建时选择它，无需任何额外配置 — 无需导入、无需注册、无需集中索引文件。这使得将翻译与页面和组件共址变得完全无摩擦。

---

## 配置 TypeScript

Intlayer 使用模块扩展来为您的翻译键提供完整的 TypeScript intellisense。确保您的 `tsconfig.json` 包含自动生成的类型：

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

将 Intlayer 生成的目录添加到您的 `.gitignore`：

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## 进一步了解

- **Visual Editor** — 在浏览器中直观地管理翻译：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** — 外部化和远程管理内容：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** — 获取自动完成和实时翻译错误检测：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI Reference** — 完整的 CLI 命令列表：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- **Intlayer with React** — React 的完整设置指南：[intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Next.js 的完整设置指南：[intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)
