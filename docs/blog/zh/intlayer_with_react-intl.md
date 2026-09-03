---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: 如何使用 Intlayer 自动化您的 react-intl JSON 翻译
description: 使用 Intlayer 和 react-intl 自动化您的 JSON 翻译，提升 React 应用的国际化体验。
keywords:
  - react-intl
  - Intlayer
  - 国际化
  - 博客
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
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

# 如何使用 Intlayer 自动化您的 react-intl JSON 翻译

<iframe title="如何使用 Intlayer 自动化您的 react-intl JSON 翻译" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化库，旨在解决传统 i18n 解决方案的不足。它为 React 应用提供了一种现代化的内容管理方法。

请参阅我们博客文章中的具体对比：[react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/react-i18next_vs_react-intl_vs_intlayer.md)。

## 为什么要将 Intlayer 与 react-intl 结合使用？

虽然 Intlayer 提供了一个出色的独立 i18n 解决方案（请参阅我们的[React 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)），但您可能出于以下几个原因希望将其与 react-intl 结合使用：

1. **现有代码库**：您已经有一个成熟的 react-intl 实现，并希望逐步迁移到 Intlayer 以获得更好的开发者体验。
2. **遗留需求**：您的项目需要兼容现有的 react-intl 插件或工作流程。
3. **团队熟悉度**：您的团队熟悉 react-intl，但希望获得更好的内容管理。
4. **使用 Intlayer 功能**：您想使用 Intlayer 的内容声明、翻译自动化、翻译测试等功能。

**为此，Intlayer 可以作为 react-intl 的适配器实现，帮助您在 CLI 或 CI/CD 流水线中自动化 JSON 翻译、测试翻译等。**

本指南将向您展示如何利用 Intlayer 优越的内容声明系统，同时保持与 react-intl 的兼容性。

## 使用 react-intl 设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖">

安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI agent，请使用 `intlayer-cli init`。

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

**包描述：**

- **intlayer**：国际化管理、内容声明和构建的核心库
- **@intlayer/sync-json-plugin**：将 Intlayer 内容声明导出为 react-intl 兼容 JSON 格式的插件

</Step>

<Step number={2} title="实现 Intlayer 插件来包装 JSON">

创建一个 Intlayer 配置文件来定义您支持的区域设置：

**如果您还想为 react-intl 导出 JSON 字典**，请添加 `syncJSON` 插件：

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
      format: "icu",
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 插件将自动包装 JSON。它将读取和写入 JSON 文件而不更改内容架构。

如果您想让 JSON 与 intlayer 内容声明文件（`.content` 文件）共存，Intlayer 将按以下方式处理：

1. 加载 JSON 和内容声明文件，并将它们转换为 intlayer 字典。
2. 如果 JSON 和内容声明文件之间存在冲突，Intlayer 将处理所有字典的合并。这取决于插件的优先级和内容声明文件的优先级（所有都是可配置的）。

如果使用 CLI 或 CMS 进行更改以翻译 JSON，Intlayer 将使用新的翻译更新 JSON 文件。

有关 `syncJSON` 插件的更多详细信息，请参考 [syncJSON 插件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)。

</Step>

<Step number={3} title="设置 AI provider">

Intlayer 为您的 i18next 工作流解锁了一套高级自动化和开发者友好的功能。

- **自动检测和填充缺失的翻译**：Intlayer 扫描您的 JSON 字典，找到未翻译或缺失的键，只翻译那些，所以您的 JSON 的 99% 保持不变。
- **大型 JSON 文件的分块翻译**：当您的翻译文件非常大时，Intlayer 自动将处理分成可管理的块，独立翻译它们以避免 API 限制和内存问题。
- **命名空间并行化**：如果您有数百个命名空间（或文件），Intlayer 会并行化翻译任务，有效地加快您的 CI/CD 或批量翻译操作。
- **灵活的 AI provider 支持**：选择您首选的 AI provider（例如 OpenAI、Claude、Gemini），只需配置凭证。使用您自己的 API 密钥，并根据需要切换 provider。
- **弹性 AI 响应处理**：Intlayer 可以处理您的 AI provider 将文本作为字符串或对象返回的边界情况，甚至在格式不一致时自动重试。
- **CLI 和 CI/CD 就绪**：直接在您的测试或管道中运行 Intlayer 的检查和自动填充，使您的本地化流程健壮且自动化。
- **集成在您现有的设置之上**：您无需更改您的 i18next 或 Next.js 基础。Intlayer 作为插件工作在您当前的设置之上，为您提供所有这些优点且迁移最少。

下面是如何设置 AI provider 的示例：

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
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

然后您可以执行以下命令来填充您的翻译：

```bash
npx intlayer fill
```

这将使用您配置的 AI provider 填充您的翻译。

> 在 [Intlayer AI 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#ai-configuration) 中查看所有可用的 AI provider。
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

为了提升开发者体验，请安装官方的 **Intlayer VS Code 扩展**：

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
