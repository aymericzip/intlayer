---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: 如何使用 Intlayer 自动化您的 i18next JSON 翻译
description: 使用 Intlayer 和 i18next 自动化您的 JSON 翻译，提升 JavaScript 应用程序的国际化水平。
keywords:
  - Intlayer
  - i18next
  - 国际化
  - i18n
  - 本地化
  - 翻译
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - 迁移
  - 集成
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 添加 loadJSON 插件
  - version: 7.0.0
    date: 2025-10-29
    changes: 更改为 syncJSON 插件
author: aymericzip
---

# 如何使用 Intlayer 自动化您的 i18next JSON 翻译

<iframe title="如何使用 Intlayer 自动化您的 i18next JSON 翻译" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化库，旨在解决传统 i18n 解决方案的不足。它为 JavaScript 应用程序中的内容管理提供了一种现代化的方法。

请参阅我们博客文章中的具体对比：[next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md)。

## 为什么将 Intlayer 与 i18next 结合使用？

虽然 Intlayer 提供了一个出色的独立 i18n 解决方案（请参阅我们的[Next.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)），但您可能出于以下几个原因想将其与 i18next 结合使用：

1. **现有代码库**：您已经有一个成熟的 i18next 实现，并希望逐步迁移到 Intlayer 以获得更好的开发者体验。
2. **遗留需求**：您的项目需要兼容现有的 i18next 插件或工作流程。
3. **团队熟悉度**：您的团队熟悉 i18next，但希望获得更好的内容管理。
4. **使用 Intlayer 功能**：您希望使用 Intlayer 的内容声明、翻译键管理、翻译状态等功能。

**为此，Intlayer 可以作为 i18next 的适配器实现，帮助您在 CLI 或 CI/CD 流水线中自动化 JSON 翻译、测试翻译等。**

本指南将向您展示如何利用 Intlayer 优越的内容声明系统，同时保持与 i18next 的兼容性。

## 目录

<TOC/>

## 分步指南：使用 i18next 设置 Intlayer

<Steps>

<Step number={1} title="安装依赖项">

安装必要的包：

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

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

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

**包描述：**

- **intlayer**: 国际化管理、内容声明和构建的核心库
- **@intlayer/sync-json-plugin**: 将 Intlayer 内容声明导出为 i18next 兼容 JSON 格式的插件

</Step>

<Step number={2} title="实现 Intlayer 插件来包装 JSON">

创建一个 Intlayer 配置文件来定义你支持的语言：

**如果你还想为 i18next 导出 JSON 字典**，添加 `syncJSON` 插件：

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 插件将自动包装 JSON。它将读取和写入 JSON 文件，而不改变内容架构。

如果你想让 JSON 与 Intlayer 内容声明文件（`.content` 文件）共存，Intlayer 将按以下方式处理：

1. 加载 JSON 和内容声明文件，并将它们转换为 Intlayer 字典。
2. 如果 JSON 和内容声明文件之间存在冲突，Intlayer 将合并所有字典。这取决于插件的优先级和内容声明文件的优先级（都可以配置）。

如果使用 CLI 翻译 JSON 或使用 CMS 进行更改，Intlayer 将使用新的翻译更新 JSON 文件。

要了解有关 `syncJSON` 插件的更多详细信息，请参阅 [syncJSON 插件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)。

</Step>

<Step number={3} title="设置 AI 提供商">

Intlayer 为你的 i18next 工作流解锁了一套高级自动化和开发者友好的功能。

- **自动检测和填充缺失翻译**：Intlayer 扫描你的 JSON 字典，查找未翻译或缺失的键，仅翻译这些，因此你的 JSON 的 99% 保持不变。
- **大型 JSON 文件的分块翻译**：当你的翻译文件非常大时，Intlayer 自动将处理分成可管理的块，独立翻译它们以避免 API 限制和内存问题。
- **命名空间并行化**：如果你有数百个命名空间（或文件），Intlayer 并行化翻译任务，有效地加快你的 CI/CD 或批量翻译操作。
- **灵活的 AI 提供商支持**：选择你首选的 AI 提供商（例如 OpenAI、Claude、Gemini），只需配置凭据。使用你自己的 API 密钥，并根据需要切换提供商。
- **弹性 AI 响应处理**：Intlayer 可以处理你的 AI 提供商将文本作为字符串或对象返回的边界情况，甚至在格式不一致时自动重试。
- **CLI 和 CI/CD 就绪**：直接在你的测试或管道中运行 Intlayer 的检查和自动填充，使你的本地化过程健壮且自动化。
- **集成到你现有的设置之上**：你不需要改变你的 i18next 或 Next.js 基础。Intlayer 作为插件添加到你的当前设置中，为你提供所有这些好处，同时实现最小迁移。

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

然后你可以执行以下命令来填充你的翻译：

```bash
npx intlayer fill
```

这将使用你配置的 AI 提供商填充你的翻译。

> 在 [Intlayer AI 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#ai-configuration) 中查看所有可用的 AI 提供商。
> 在 [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 中查看所有可用的命令。

</Step>

</Steps>

## Git 配置

建议忽略自动生成的 Intlayer 文件：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

这些文件可以在构建过程中重新生成，无需提交到版本控制。

### VS Code 扩展

为了提升开发者体验，建议安装官方 **Intlayer VS Code 扩展**：

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
