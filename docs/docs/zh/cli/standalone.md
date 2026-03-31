---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: 独立 Bundle (Standalone Bundle)
description: 了解如何为应用程序内容创建独立的 JavaScript bundle。
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "初始化 standalone 命令文档"
---

# 独立 Bundle (Standalone Bundle)

`standalone` 命令允许您创建一个包含 Intlayer 和任何其他指定包的独立 JavaScript bundle。这对于在没有包管理器或构建工具的环境（如简单的 HTML/JS 应用）中使用 Intlayer 特别有用。

该 bundle 使用 [esbuild](https://esbuild.github.io/) 将请求的包及其依赖项合并为一个文件，该文件可以轻松导入到任何 Web 项目中。

## 用法

```bash
npx intlayer standalone --packages [包名...] [选项]
```

## 选项

- `-o, --outfile [outfile]` - 可选。输出文件名。默认值：`intlayer-bundle.js`。
- `--packages [包名...]` - 必选。要包含在 bundle 中的包列表（例如：`intlayer`、`vanilla-intlayer`）。
- `--version [version]` - 可选。要打包的包版本。如果未指定，默认使用 Intlayer CLI 的版本。
- `--minify` - 可选。是否压缩输出。默认值：`true`。
- `--platform [platform]` - 可选。bundle 的目标平台（例如：`browser`、`node`）。默认值：`browser`。
- `--format [format]` - 可选。bundle 的输出格式（例如：`esm`、`cjs`、`iife`）。默认值：`esm`。

## 通用选项

- `--env-file [envFile]` - 环境文件。
- `-e, --env [env]` - 环境。
- `--base-dir [baseDir]` - 基础目录。
- `--no-cache` - 禁用缓存。
- `--verbose` - 详细输出。

## 示例：

### 为 Vanilla JS 创建 bundle：

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

这将创建一个包含 `intlayer` 和 `vanilla-intlayer` 包的 `intlayer.js` 文件，经过压缩并采用 ESM 格式，随时可以通过 `<script>` 标签在浏览器中使用。

### 打包特定版本：

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### 以不同格式打包：

```bash
npx intlayer standalone --packages intlayer --format iife
```

## 工作原理：

1. **创建临时环境** - 设置一个临时目录来管理依赖项。
2. **安装包** - 使用 `npm` 或 `bun`（如果可用）安装请求的包及其依赖项。
3. **生成入口点** - 创建一个临时入口点文件，导出所有请求的包，并在浏览器中运行时将其暴露为全局变量。
4. **使用 esbuild 打包** - 使用 esbuild 将所有内容合并为一个文件，并按要求应用压缩和格式化。
5. **生成文件** - 将生成的 bundle 写入指定的输出路径。

## 全局变量

当 bundle 在浏览器中加载时，它会将请求的包暴露为 `window` 对象上的全局变量。变量名称源自包名（例如：`intlayer` 变为 `Intlayer`，`vanilla-intlayer` 变为 `VanillaIntlayer`）。

```javascript
// 从 bundle 访问 Intlayer
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
