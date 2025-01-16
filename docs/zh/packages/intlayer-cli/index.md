# intlayer-cli: NPM包用于使用Intlayer CLI

**Intlayer** 是专为JavaScript开发人员设计的一套软件包。它兼容像React、React和Express.js等框架。

**`intlayer-cli`** 包是一个NPM包，消费 `@intlayer/cli` 包并使其可用于 `intlayer` 命令行接口。

> 请注意，如果安装了 [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer/index.md) 包，则不需要此包。与 `intlayer` 包相比，`intlayer-cli` 包是一个更轻量的包，仅包含CLI工具，没有 `@intlayer/core` 依赖。

## 安装

使用您首选的软件包管理器安装所需的包：

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## 使用

以下是如何使用 `intlayer-cli` 包的示例：

```bash
npx intlayer build
```

## CLI命令

Intlayer提供了一个CLI工具来：

- 审计您的内容声明并补全缺失的翻译
- 从您的内容声明构建字典
- 从您的CMS推送和拉取远程字典到您的地方项目

有关更多信息，请参阅 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 。
