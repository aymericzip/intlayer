---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 next-intl 迁移到 Intlayer | 国际化 (i18n)"
description: "学习如何逐步将你的 Next.js 应用从 next-intl 迁移到 Intlayer，无需破坏现有代码。使用 @intlayer/next-intl 兼容适配器实现零中断过渡。"
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# 从 next-intl 迁移到 Intlayer

## 为什么从 next-intl 迁移到 Intlayer？

<AccordionGroup>

<Accordion header="Bundle 大小">

与其将大量 JSON 文件加载到页面中，不如只加载必要的内容。Intlayer 帮助**将 bundle 和页面大小减少高达 50%**。

</Accordion>

<Accordion header="可维护性">

将应用程序的内容范围化**便于大规模应用程序的维护**。您可以复制或删除单个功能文件夹，而无需费力审查整个内容 codebase。此外，Intlayer **完全类型化**，以确保内容的准确性。

Intlayer 也是 i18n 生态中**开发最活跃的**解决方案 — 问题修复迅速，新的框架适配器定期发布，核心 API 根据真实生产反馈不断完善。

</Accordion>

<Accordion header="AI Agent">

将内容共置**降低大型语言模型（LLM）所需的上下文**。Intlayer 还附带一套工具，例如**用于测试缺失翻译的 CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI agents 的开发者体验（DX）更加顺畅。

</Accordion>

<Accordion header="自动化">

使用自动化在 CI/CD 管道中进行翻译，使用您选择的 LLM，费用由您的 AI 提供商承担。Intlayer 还提供**编译器**来自动提取内容，以及一个 [web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)来帮助**后台翻译**。

</Accordion>

<Accordion header="性能">

将大量 JSON 文件连接到组件可能会导致性能和响应性问题。Intlayer 在构建时优化内容加载。

</Accordion>

<Accordion header="与非开发人员的协作">

Intlayer 不仅仅是一个 i18n 解决方案，它提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)** 来帮助您**实时**管理多语言内容，使与翻译人员、文案和其他团队成员的协作无缝进行。内容可以本地和/或远程存储。

</Accordion>

</AccordionGroup>

---

## 迁移策略

现有应用的推荐方法是使用 **compat adapter**：安装 `@intlayer/next-intl`，它公开了与 `next-intl` **完全相同的 API**，但在幕后将所有翻译工作委托给 Intlayer。

您可以保留现有的 `useTranslations`、`getTranslations`、`NextIntlClientProvider` 等 — **唯一的变化是导入路径**。无需重构调用签名、属性形状或组件结构。

随着时间的推移，您可以选择将各个文件迁移到 Intlayer 更丰富的 `.content.ts` 格式，以解锁可视化编辑器、CMS 和按组件内容作用域的功能 — 但这一步完全是可选的，可以逐步进行。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是使现有 `next-intl` 应用在 Intlayer 上运行所需的最少要求，无需更改任何代码。

<Steps>

<Step number={1} title="安装依赖">

安装 Intlayer 核心包和 `@intlayer/next-intl` 兼容性适配器：

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> 保持 `next-intl` 已安装 — 它仍然是 **URL 路由**（`createNavigation`、`createMiddleware`、`Link`、`redirect`、`usePathname`、`useRouter`）所必需的。兼容性适配器**不**替换路由层。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令创建一个启动器 `intlayer.config.ts`。更新它以匹配你现有的语言，并将 `syncJSON` 插件指向你的消息文件：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此处添加所有现有的语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 'icu' 与 next-intl 的 ICU 占位符语法匹配：{name}、{count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** 将语言映射到其 JSON 文件路径。**`location`** 告诉 Intlayer 监视器要监视哪个文件夹以获取更改。`format: 'icu'` 选项确保正确解析 ICU 占位符，如 `{name}` 和 `{count, plural, one {# item} other {# items}}`。

> 有关配置选项的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="将 Intlayer 插件添加到 Next.js">

使用来自 `@intlayer/next-intl/plugin` 的 `createNextIntlPlugin` 包装你现有的 Next.js 配置。此包装器组合了 `withIntlayer` **并**为你注册了 `next-intl` → `@intlayer/next-intl` 别名：

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* 你现有的配置选项 */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` 包装了 `withIntlayer`，自动检测 **Webpack** 或 **Turbopack**，连接内容监视、字典编译，以及——至关重要的——**注入模块别名**，使你现有的 `import … from 'next-intl'` 调用在构建时透明地重定向到 `@intlayer/next-intl`。路由条目 `next-intl/routing` 保持指向真实包。不需要源文件更改。
>
> 更喜欢来自 `next-intlayer/server` 的普通 `withIntlayer`？它会编译你的字典，但它**不**添加 `next-intl` 别名——你随后需要手动将导入重命名为 `@intlayer/next-intl`（见步骤 4）。

> **你不再需要 `getRequestConfig` 或 `loadMessages`。** 使用 `next-intl` 时，你必须编写一个 `src/i18n.ts` 文件，通过 `getRequestConfig` 在每个请求上加载 JSON 消息包。Intlayer 在**构建时**编译所有字典，因此没有运行时加载步骤。你可以完全删除该文件（或如果你仍然使用 `createNavigation`，只保留路由部分）。

</Step>

</Steps>

快速迁移就到这里。你的应用现在在 Intlayer 上运行，同时保持每个 `next-intl` 导入和 API 完整。

> **类型化翻译键——自动。** 一旦 Intlayer 编译你的字典，`useTranslations` 和 `getTranslations` 就会根据你的实际内容进行类型化。键在你的 IDE 中自动完成，无效路径会在构建时导致 TypeScript 错误——不需要额外设置。
>
> ```tsx
> // 客户端组件——'about' 是一个已注册的字典键
> const t = useTranslations("about");
> t("counter.label"); // ✓ 自动完成
> t("does.not.exist"); // ✗ TypeScript 错误
>
> // 服务器组件
> const t = await getTranslations("about");
> t("counter.label"); // ✓ 类型化
> ```

---

## 完整迁移

下面的步骤是可选的，可以逐步执行。它们解锁了 Intlayer 的完整功能集：可视化编辑器、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式导入重命名（可选）" isOptional={true}>

`createNextIntlPlugin()` 包装器已在打包工具级别处理了 `next-intl` → `@intlayer/next-intl` 别名。如果你希望在源文件中明确依赖关系（并改用纯 `withIntlayer` 插件），可以手动重命名导入：

| 之前                                                 | 之后                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> 始终从真实的 `next-intl` 保持路由导入 — compat 适配器**不**替换 URL 路由层：
>
> ```ts
> // ✅ 始终从真实的 'next-intl' 保持这些
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> 或者，你可以使用 `@intlayer/next-intl/routing` 中的 `defineRouting`，它会自动从你的 `intlayer.config.ts` 合并语言环境配置。

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

Intlayer 接入后，你可以使用其 CLI 使用你选择的 LLM 自动填充缺失的翻译：

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

将 `OPENAI_API_KEY`（或你首选提供商的密钥）添加到 `.env` 文件，然后扩展你的 `intlayer.config.ts`：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

// 配置对象
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

> 有关所有可用选项，请参阅 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>

</Steps>

---

## 迁移后可以删除的内容

一旦 `@intlayer/next-intl` 就位，以下 `next-intl` 样板代码可以删除：

| 文件 / 模式                                       | 为什么不再需要                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → `getRequestConfig` export         | Intlayer 在构建时编译词典；没有按请求加载消息。仅当文件也导出 `createNavigation` 路由辅助程序时才保留该文件。 |
| `loadMessages()` / `getMessages()` call in layout | `@intlayer/next-intl` 中的 `NextIntlClientProvider` 从编译输出读取；不需要 `messages` prop。                  |
| `locales/{locale}/*.json` imports in layout       | JSON bundles 仅在仍使用 `syncJSON` 插件时需要。迁移到 `.content.ts` 文件后，可以删除 JSON 文件夹。            |

当你准备好进一步操作时，Intlayer **自动发现代码库中任何位置的所有 `.content.ts` 和 `.content.json` 文件**（默认情况下，在 `./src` 内的任何位置）。你可以将 `about.content.ts` 文件放在 `about/page.tsx` 文件旁边，Intlayer 将在构建时将其选中，无需额外配置 — 无需导入、无需注册、无需集中索引文件。这使得将翻译与页面和组件并置完全无摩擦。

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

- **Visual Editor** — 在浏览器中直观管理翻译: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** — 外部化和远程管理内容: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** — 获得自动完成和实时翻译错误检测: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI Reference** — CLI 命令的完整列表: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- **Intlayer with Next.js** — Next.js 的完整设置指南: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)
