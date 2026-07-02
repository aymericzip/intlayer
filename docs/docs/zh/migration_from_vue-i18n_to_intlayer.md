---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "从 vue-i18n 迁移到 Intlayer | 国际化 (i18n)"
description: "了解如何逐步将您的 Vue 或 Nuxt 应用从 vue-i18n 迁移到 Intlayer，不会破坏现有代码。使用 @intlayer/vue-i18n 兼容适配器实现零中断过渡。"
keywords:
  - vue-i18n
  - intlayer
  - migration
  - 国际化
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "初始化历史"
author: aymericzip
---

# 从 vue-i18n 迁移到 Intlayer

## 为什么要从 vue-i18n 迁移到 Intlayer？

<AccordionGroup>

<Accordion header="Bundle 体积">

无需将庞大的 JSON 文件加载到页面中，只加载必要的内容。Intlayer 可帮助您**将 bundle 和页面尺寸减少多达 50%**。

</Accordion>

<Accordion header="可维护性">

为应用程序的内容划分范围**便于大规模应用的维护**。您可以删除单个功能文件夹，无需费力检查整个内容代码库。此外，Intlayer **完全类型化**以确保内容的准确性。

Intlayer 也是 i18n 生态中**开发最活跃的**解决方案 —— 问题修复迅速、新 framework 适配器定期发布，核心 API 基于真实生产反馈不断优化。

</Accordion>

<Accordion header="AI Agent">

共同定位内容**减少大型语言模型 (LLM) 所需的上下文**。Intlayer 还提供了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，让开发者体验 (DX) 对 AI agents 更加顺畅。

</Accordion>

<Accordion header="自动化">

使用自动化在 CI/CD pipeline 中使用您选择的 LLM 进行翻译，成本由您的 AI provider 承担。Intlayer 还提供了一个 **compiler** 来自动化内容提取，以及一个 [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来帮助**后台翻译**。

</Accordion>

<Accordion header="性能">

将庞大的 JSON 文件连接到组件可能导致性能和响应式问题。Intlayer 在构建时优化您的内容加载。

</Accordion>

<Accordion header="非开发人员的扩展">

不仅仅是一个 i18n 解决方案，Intlayer 提供了一个**自托管的 [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 和一个**[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)** 来帮助您**实时**管理多语言内容，使与翻译、文案和其他团队成员的协作无缝。内容可以本地存储和/或远程存储。

</Accordion>

</AccordionGroup>

---

## 迁移策略

从 `vue-i18n` 迁移到 Intlayer 有两种互补的策略：

1. **兼容适配器（推荐用于现有应用）** —— 安装 `@intlayer/vue-i18n`（用于 Vue 组件）。此 package 暴露与 `vue-i18n` **完全相同的 API**，但在幕后将所有翻译工作委托给 Intlayer。您保留现有的 `$t`、`useI18n()` 和 `<i18n-t>` 调用 —— 唯一的变化是 import 路径和初始化。

2. **完整迁移** —— 逐步将 `vue-i18n` API 替换为原生 Intlayer hooks（`useIntlayer`）并在组件旁边的 `.content.ts` 文件中共同定位内容。

本指南首先介绍**策略 1**（即插即用兼容适配器），然后演练可选的完整迁移。

---

## 目录

<TOC/>

---

## 快速迁移

以下步骤是让现有 `vue-i18n` 应用在 Intlayer 上运行所需的最少步骤，组件代码零更改。

<Steps>

<Step number={1} title="安装依赖">

安装 Intlayer 核心 package 和兼容适配器：

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

> `--interactive` flag 是可选的。如果您是 AI agent，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的 package。例如：

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> 您可以保留 `vue-i18n` installed —— 兼容适配器使用它作为 `devDependency` / `peerDependency` 的 TypeScript 类型。

</Step>

<Step number={2} title="配置 Intlayer">

`intlayer init` 命令创建一个启动 `intlayer.config.ts`。更新它以匹配您现有的 locale，并将 `syncJSON` plugin 指向您的消息文件：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在这里添加所有现有 locale
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 匹配 vue-i18n 占位符语法：{name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** 将 locale 映射到其 JSON 文件路径。**`location`** 告诉 Intlayer watcher 监视哪个文件夹以获取更改。`format: 'icu'` 选项确保正确解析 `vue-i18n` 的占位符。

</Step>

<Step number={3} title="将 Intlayer Plugin 添加到您的 Bundler">

用兼容 plugin 包装您现有的 bundler 配置。它组合了核心 Intlayer plugin、连接内容 watching，以及 —— 至关重要的是 —— **注入一个 module alias**，使您现有的 `import … from 'vue-i18n'` 调用在构建时透明地重定向到 `@intlayer/vue-i18n`。无需更改源文件。

**对于 Vite：**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` 包装了 `vite-intlayer` 的 `intlayer()` plugin 并添加了 `vue-i18n` alias。使用来自 `vite-intlayer` 的普通 `intlayer()` plugin 会编译 dictionary，但**不**添加 alias —— 然后您需要手动将 import 重命名为 `@intlayer/vue-i18n`（见步骤 4）。

**对于 Nuxt：**

如果您使用 `@nuxtjs/i18n`（Nuxt 集成），安装 `nuxt-intlayer` 并将其添加到您的 `nuxt.config.ts`：

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // 您可以安全地从 modules 中移除 @nuxtjs/i18n
});
```

> **您不再需要 `createI18n()` 或手动 provider 引导**。Intlayer 在**构建时**编译所有 dictionary，因此没有运行时加载步骤。别名 provider 为您处理初始化。

</Step>

</Steps>

快速迁移就这样。您的应用现在在 Intlayer 上运行，同时保持每个 `vue-i18n` import 和 API 完整。

> **类型化 translation key —— 自动**。Intlayer 编译 dictionary 后，当您传递 `namespace` 选项时，`useI18n` 会针对您的实际内容进行类型化。Key 会在您的 IDE 中自动完成，无效路径会在构建时导致 TypeScript 错误 —— 无需额外设置。
>
> ```ts
> // 'about' 是一个已注册的 dictionary key
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ 自动完成
> t("does.not.exist"); // ✗ TypeScript 错误
> ```

---

## 完整迁移

下面的步骤是可选的，可以逐步完成。它们解锁完整的 Intlayer 功能集：visual editor、CMS、类型化内容文件、AI 驱动的翻译等。

<Steps>

<Step number={4} title="显式 import 重命名（可选）" isOptional={true}>

Intlayer plugin 已在 bundler 级别处理别名。如果您更喜欢在源文件中显式化依赖，可以手动重命名 import：

| 之前                                    | 之后                                              |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

这些是**即插即用的替代品** —— 不需要改变调用签名、参数或返回类型。

</Step>

<Step number={5} title="启用 AI 驱动的翻译自动化" isOptional={true}>

Intlayer 连接后，使用其 CLI 自动填充缺失翻译：

```bash packageManager="npm"
# 测试缺失翻译（添加到 CI）
npx intlayer test

# 用 AI 填充缺失翻译
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

> 有关所有可用选项，请参阅 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>

</Steps>

---

## 迁移后可以删除的内容

兼容适配器就位后，可以删除以下 `vue-i18n` 样板代码：

| 文件 / 模式                          | 不再需要的原因                                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `createI18n()` 调用                  | Intlayer 的 provider 自动初始化所有内容；没有运行时加载步骤。                                            |
| Vue plugin 注册（`app.use(i18n)`）   | Intlayer plugin 在幕后处理注入和引导。                                                                   |
| JSON 语言 bundle（`locales/*.json`） | JSON bundle 只有在仍使用 `syncJSON` plugin 时才需要。迁移到 `.content.ts` 文件后，可以删除 JSON 文件夹。 |

当您准备进一步进行时，Intlayer **自动发现代码库中任何地方的所有 `.content.ts` 和 `.content.json` 文件**（默认在 `./src` 内的任何地方）。您可以将 `my-component.content.ts` 文件放在 `MyComponent.vue` 旁边，Intlayer 会在构建时选中它，无需额外配置 —— 无需 import、无需注册、无需集中索引文件。这使得与页面和组件共同定位翻译完全无摩擦。

---

## 配置 TypeScript

Intlayer 使用 module augmentation 为您的 translation key 提供完整的 TypeScript intellisense。确保您的 `tsconfig.json` 包括自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包括自动生成的类型
  ],
}
```

---

## Git 配置

将 Intlayer 的生成目录添加到您的 `.gitignore`：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## 更进一步

- **Visual Editor** —— 在浏览器中可视化管理翻译：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- **CMS** —— 远程外部化和管理内容：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- **VS Code Extension** —— 获取自动完成和实时翻译错误检测：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- **CLI 参考** —— 完整的 CLI 命令列表：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- **Intlayer with Vue** —— Vue 完整设置指南：[intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** —— Nuxt 完整设置指南：[intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md)
