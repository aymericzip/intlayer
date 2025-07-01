---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Intlayer 的配置管理
description: 用于检索 Intlayer 配置并定义跨不同环境的国际化设置环境变量的 NPM 包。
keywords:
  - intlayer
  - 配置
  - 环境
  - 设置
  - i18n
  - JavaScript
  - NPM
  - 变量
---

# @intlayer/config：用于检索 Intlayer 配置的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React Native 和 Express.js 等框架。

**`@intlayer/config`** 包是一个 NPM 包，允许您检索 Intlayer 的配置并定义与当前环境相关的环境变量。

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## 使用方法

### 使用文件系统读取 Intlayer 配置

示例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// 输出：
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 此函数使用 `fs` 包，仅在服务器端运行。

### 使用环境变量读取 Intlayer 配置

示例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// 输出：
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 如果环境变量未定义，此函数不会返回任何内容。

### 定义环境变量

1. 创建一个配置文件。

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> 详情请参阅 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

2. 定义环境变量。

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// 将所有配置值格式化为环境变量
const env = formatEnvVariable();

// 将每个格式化后的环境变量设置到 process.env 中
Object.assign(process.env, env);
```

3. 导入配置文件。

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
