# intlayer-cli: 用于 Intlayer CLI 的 NPM 包

**Intlayer** 是专为 JavaScript 开发人员设计的一套工具包。它兼容如 React、React 和 Express.js 等框架。

**`intlayer-cli`** 包是一个 NPM 包，它使用 `@intlayer/cli` 包并将其提供给 `intlayer` 命令行接口。

> 请注意，如果已安装 [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer/index.md) 包，则不需要此包。与 `intlayer` 包相比，`intlayer-cli` 包是一个更轻量的包，仅包含 CLI 工具，而没有 `@intlayer/core` 依赖项。

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 使用方法

以下是如何使用 `intlayer-cli` 包的示例：

```bash
npx intlayer dictionaries build
```

## CLI 命令

Intlayer 提供了一个 CLI 工具来：

- 审核您的内容声明并完成缺失的翻译
- 从您的内容声明中构建字典
- 从您的 CMS 推送和拉取远程字典到您的本地项目

请查阅 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 了解更多信息。
