---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - 适用于多语言网站的所有 Intlayer CLI 命令
description: 了解如何使用 Intlayer CLI 管理您的多语言网站。按照此在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - CLI
  - 命令行界面
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "添加 standalone 命令内容"
  - version: 7.5.11
    date: 2026-01-06
    changes: "添加 CI 命令内容"
  - version: 7.5.11
    date: 2026-01-06
    changes: "添加 list projects 命令内容"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令内容"
  - version: 7.2.3
    date: 2025-11-22
    changes: "添加 extract 命令内容"
  - version: 7.1.0
    date: 2025-11-05
    changes: "为翻译命令添加 skipIfExists 选项"
  - version: 6.1.4
    date: 2025-01-27
    changes: "添加 CLI 参数和命令的别名"
  - version: 6.1.3
    date: 2025-10-05
    changes: "为命令添加 build 选项"
  - version: 6.1.2
    date: 2025-09-26
    changes: "添加 version 命令内容"
  - version: 6.1.0
    date: 2025-09-26
    changes: "通过 CLI 将 verbose 选项默认设置为 true"
  - version: 6.1.0
    date: 2025-09-23
    changes: "添加 watch 命令和 with 选项"
  - version: 6.0.1
    date: 2025-09-23
    changes: "添加 editor 命令内容"
  - version: 6.0.0
    date: 2025-09-17
    changes: "添加内容测试和列表命令"
  - version: 5.5.11
    date: 2025-07-11
    changes: "更新 CLI 命令参数文档"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
---

# Intlayer CLI - 适用于多语言网站的所有 Intlayer CLI 命令

---

## 目录

<TOC/>

---

## 安装包

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> 如果已经安装了 `intlayer` 包，CLI 将自动安装。您可以跳过此步骤。

## intlayer-cli 包

`intlayer-cli` 包旨在将您的 [Intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)转译为字典。

该包会转译所有 Intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

要解释 Intlayer 字典，您可以使用解释器，例如 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 或 [next-intlayer](https://www.npmjs.com/package/next-intlayer)。

## 配置文件支持

Intlayer 接受多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

要了解如何配置可用语言或其他参数，请参阅[此处的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 执行 Intlayer 命令

### 身份验证

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/login.md)** - 在 Intlayer CMS 中进行身份验证并获取访问凭据

### 核心命令

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/build.md)** - 从内容声明文件构建字典
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/watch.md)** - 监听更改并自动重新构建字典
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/standalone.md)** - 创建包含 Intlayer 和指定包的独立 JavaScript bundle
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/version.md)** - 检查已安装的 Intlayer CLI 版本
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/list_projects.md)** - 列出目录或 git 仓库中的所有 Intlayer 项目

### 字典管理

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/push.md)** - 将字典发送到 Intlayer 编辑器和 CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/pull.md)** - 从 Intlayer 编辑器和 CMS 获取字典
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)** - 使用 AI 填充、审核并翻译字典
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/test.md)** - 测试并识别缺失的翻译
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/list.md)** - 列出项目中的所有内容声明文件

### 组件管理

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)** - 从组件中提取字符串到组件附近的 .content 文件中

### 配置

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/init.md)** - 使用自动配置在您的项目中设置 Intlayer
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/configuration.md)** - 获取您的 Intlayer 配置并将其发送到 CMS

### 文档管理

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-translate.md)** - 使用 AI 自动翻译文档文件
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-review.md)** - 审核文档文件的质量和一致性

### 编辑器与实时同步 (Live Sync)

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/editor.md)** - 使用 Intlayer 编辑器命令
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md)** - 使用 Live Sync 在运行时应用来自 CMS 的内容更改

### CI/CD 与自动化

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/ci.md)** - 使用自动注入的凭据执行 CI/CD 流水的 Intlayer 命令

### 开发工具

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/sdk.md)** - 在您自己的代码中使用 Intlayer CLI SDK
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/debug.md)** - 调试并修复 Intlayer CLI 的问题

## 在 `package.json` 中使用 intlayer 命令

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **注意**：您也可以使用较短的别名：
>
> - `npx intlayer list` 代替 `npx intlayer content list`
> - `npx intlayer test` 代替 `npx intlayer content test`
> - `npx intlayer projects-list` 或 `npx intlayer pl` 代替 `npx intlayer projects list`
