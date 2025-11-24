---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: 了解如何使用 Intlayer CLI 来管理您的多语言网站。按照本在线文档中的步骤，几分钟内即可设置您的项目。
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
  - version: 7.2.3
    date: 2025-11-22
    changes: 添加 transform 命令
  - version: 7.1.0
    date: 2025-11-05
    changes: 为 translate 命令添加 skipIfExists 选项
  - version: 6.1.4
    date: 2025-01-27
    changes: 为 CLI 参数和命令添加别名
  - version: 6.1.3
    date: 2025-10-05
    changes: 为命令添加 build 选项
  - version: 6.1.2
    date: 2025-09-26
    changes: 添加 version 命令
  - version: 6.1.0
    date: 2025-09-26
    changes: 使用 CLI 将 verbose 选项默认设置为 true
  - version: 6.1.0
    date: 2025-09-23
    changes: 添加 watch 命令和 with 选项
  - version: 6.0.1
    date: 2025-09-23
    changes: 添加 editor 命令
  - version: 6.0.0
    date: 2025-09-17
    changes: 添加 content test 和 list 命令
  - version: 5.5.11
    date: 2025-07-11
    changes: 更新 CLI 命令参数文档
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Intlayer CLI

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

> 如果已经安装了 `intlayer` 包，CLI 会自动安装。你可以跳过这一步。

## intlayer-cli 包

`intlayer-cli` 包旨在将你的 [intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md) 转换成字典。

该包会转换所有 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明你的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

要解释 intlayer 字典，你可以使用解释器，例如 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 或 [next-intlayer](https://www.npmjs.com/package/next-intlayer)。

## 配置文件支持

Intlayer 支持多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

有关如何配置可用语言环境或其他参数，请参阅[此处的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 运行 intlayer 命令

### 核心命令

- **[构建字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/build.md)** - 从内容声明文件构建字典
- **[监视字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/watch.md)** - 监视更改并自动构建字典
- **[检查 CLI 版本](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/version.md)** - 检查已安装的 Intlayer CLI 版本

### 字典管理

- **[推送字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/push.md)** - 将字典推送到 Intlayer 编辑器和 CMS
- **[拉取词典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/pull.md)** - 从 Intlayer 编辑器和 CMS 拉取词典
- **[填充词典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)** - 使用 AI 填充、审核和翻译词典
- **[测试缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/test.md)** - 测试并识别缺失的翻译
- **[列出内容声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/list.md)** - 列出项目中所有内容声明文件

### 组件管理

- **[转换组件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/transform.md)** - 转换现有组件以使用 Intlayer

### 配置

- **[管理配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/configuration.md)** - 获取并推送您的 Intlayer 配置到 CMS

### 文档管理

- **[翻译文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-translate.md)** - 使用 AI 自动翻译文档文件
- **[审查文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-review.md)** - 审查文档文件的质量和一致性

### 编辑器与实时同步

- **[编辑器命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/editor.md)** - 使用 Intlayer 编辑器命令
- **[实时同步命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md)** - 使用实时同步在运行时反映 CMS 内容更改

### 开发工具

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/sdk.md)** - 在您自己的代码中使用 Intlayer CLI SDK
- **[调试 Intlayer 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/debug.md)** - 调试和排查 Intlayer CLI 问题

## 在您的 `package.json` 中使用 intlayer 命令

- **[编辑器命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/editor.md)** - 使用 Intlayer 编辑器命令
- **[实时同步命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md)** - 使用实时同步在运行时反映 CMS 内容更改

## 在您的 `package.json` 中使用 intlayer 命令

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **注意**：您也可以使用更简短的别名：
>
> - 使用 `npx intlayer list` 替代 `npx intlayer content list`
> - 使用 `npx intlayer test` 替代 `npx intlayer content test`
