---
docName: package__intlayer-cli
url: https://intlayer.org/doc/package/intlayer-cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer-cli/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - 国际化命令行工具
description: Intlayer 的命令行接口包，提供管理翻译、构建词典和自动化国际化工作流的工具。
keywords:
  - intlayer
  - CLI
  - 命令行
  - 国际化
  - i18n
  - 工具
  - NPM
  - 自动化
---

# intlayer-cli：用于使用 Intlayer CLI 的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`intlayer-cli`** 包是一个 NPM 包，它使用了 `@intlayer/cli` 包，并将其提供给 `intlayer` 命令行接口使用。

> 注意，如果已安装 [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer/index.md) 包，则不需要此包。与 `intlayer` 包相比，`intlayer-cli` 包是一个更轻量的包，仅包含 CLI 工具，不包含 `@intlayer/core` 依赖。

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 使用

这里是如何使用 `intlayer-cli` 包的示例：

```bash
npx intlayer dictionaries build
```

## CLI 命令

Intlayer 提供了一个 CLI 工具来：

- 审核您的内容声明并补全缺失的翻译
- 从您的内容声明构建词典
- 从您的 CMS 推送和拉取远程词典到您的本地项目

更多信息请参阅 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史记录
