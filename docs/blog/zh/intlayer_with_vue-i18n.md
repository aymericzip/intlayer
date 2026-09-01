---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer 与 vue-i18n
description: 将 Intlayer 与 vue-i18n 集成，实现全面的 Vue.js 国际化解决方案
keywords:
  - vue-i18n
  - Intlayer
  - 国际化
  - 博客
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 添加 loadJSON 插件
  - version: 7.0.0
    date: 2025-10-29
    changes: 更改为 syncJSON 插件并全面重写
author: aymericzip
---

# 使用 vue-i18n 和 Intlayer 的 Vue.js 国际化 (i18n)

<iframe title="如何使用 Intlayer 自动化您的 vue-i18n JSON 翻译" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化库，旨在解决传统 i18n 解决方案的不足。它为 Vue.js 和 Nuxt 应用提供了一种现代化的内容管理方法。

请参阅我们博客文章中的具体对比：[vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/vue-i18n_vs_intlayer.md)。

## 为什么要将 Intlayer 与 vue-i18n 结合使用？

虽然 Intlayer 提供了一个出色的独立 i18n 解决方案（请参阅我们的[Vue.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)），但你可能出于以下几个原因想将其与 vue-i18n 结合使用：

1. **现有代码库**：你已经有一个成熟的 vue-i18n 实现，并希望逐步迁移到 Intlayer 以获得更好的开发者体验。
2. **遗留需求**：你的项目需要兼容现有的 vue-i18n 插件或工作流程。
3. **团队熟悉度**：你的团队对 vue-i18n 很熟悉，但希望获得更好的内容管理。
4. **使用 Intlayer 功能**：你想使用 Intlayer 的内容声明、翻译自动化、翻译测试等功能。

**为此，Intlayer 可以作为 vue-i18n 的适配器来实现，帮助你在 CLI 或 CI/CD 流水线中自动化 JSON 翻译，测试翻译等。**

本指南将向您展示如何利用 Intlayer 优越的内容声明系统，同时保持与 vue-i18n 的兼容性。

---

## Vue-i18n 与 Intlayer 的分步设置指南

<Steps>

<Step number={1} title="安装依赖项">

使用您首选的包管理器安装必要的包：

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
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
```

**包说明：**

- **intlayer**：用于内容声明和管理的核心库
- **@intlayer/sync-json-plugin**：将 Intlayer 内容声明同步到 vue-i18n JSON 格式的插件

</Step>

<Step number={2} title="实现 Intlayer 插件来包装 JSON">

创建一个 Intlayer 配置文件来定义您支持的语言环境：

**如果您还想为 vue-i18n 导出 JSON 字典**，请添加 `syncJSON` 插件：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 插件将自动包装 JSON。它将读取和写入 JSON 文件，而不改变内容架构。

如果您想让 JSON 与 intlayer 内容声明文件（`.content` 文件）共存，Intlayer 将按照以下方式处理：

1. 加载 JSON 和内容声明文件，并将它们转换为 intlayer 字典。
2. 如果 JSON 和内容声明文件之间存在冲突，Intlayer 将合并所有字典。根据插件的优先级和内容声明文件的优先级（都是可配置的）。

如果使用 CLI 或 CMS 对 JSON 进行更改以翻译内容，Intlayer 将使用新的翻译更新 JSON 文件。

有关 `syncJSON` 插件的更多详细信息，请参阅 [syncJSON 插件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)。

</Step>

<Step number={3} title="设置 AI 提供商">

Intlayer 为您的 i18next 工作流解锁了一系列高级自动化和开发者友好的功能。

- **自动检测和填充缺失的翻译**：Intlayer 扫描您的 JSON 字典，找到未翻译或缺失的键，仅翻译这些部分，因此您的 JSON 的 99% 保持不变。
- **大型 JSON 文件的分块翻译**：当您的翻译文件非常大时，Intlayer 自动将处理分成可管理的块，独立翻译它们以避免 API 限制和内存问题。
- **命名空间并行化**：如果您有数百个命名空间（或文件），Intlayer 将并行化翻译任务，有效加快 CI/CD 或批量翻译操作的速度。
- **灵活的 AI 提供商支持**：选择您首选的 AI 提供商（例如 OpenAI、Claude、Gemini），只需配置凭据即可。使用您自己的 API 密钥，并根据需要切换提供商。
- **强大的 AI 响应处理**：Intlayer 可以处理您的 AI 提供商将文本作为字符串或对象返回的边界情况，甚至在格式不一致时自动重试。
- **CLI 和 CI/CD 就绪**：直接在您的测试或管道中运行 Intlayer 的检查和自动填充，使您的本地化过程强大且自动化。
- **集成到您现有的设置之上**：您不需要改变您的 i18next 或 Next.js 基础。Intlayer 作为您当前设置的附加插件，为您提供所有这些好处，同时最小化迁移。

以下是如何设置 AI 提供商的示例：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

然后您可以执行以下命令来填充您的翻译：

```bash
npx intlayer fill
```

这将使用您配置的 AI 提供商填充您的翻译。

> 在 [Intlayer AI 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#ai-configuration) 中查看所有可用的 AI 提供商。
> 在 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 中查看所有可用的命令。

</Step>

</Steps>

## Git 配置

将生成的文件排除在版本控制之外：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

这些文件会在构建过程中自动重新生成，无需提交到您的代码仓库。

### VS Code 扩展

为了提升开发者体验，请安装官方的 **Intlayer VS Code 扩展**：

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
