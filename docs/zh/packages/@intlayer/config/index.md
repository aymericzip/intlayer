# @intlayer/config: NPM 包以检索 Intlayer 配置

**Intlayer** 是一套专为 JavaScript 开发者设计的包。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/config`** 包是一个 NPM 包，允许您检索 Intlayer 的配置，并定义与当前环境相关的环境变量。

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## 使用

### 通过文件系统读取 Intlayer 的配置

示例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// 输出:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 此函数使用 `fs` 包，且仅在服务器端工作。

### 通过环境变量读取 Intlayer 的配置

示例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// 输出:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 如果环境变量未定义，此函数将不返回任何内容。

### 定义环境变量

1. 创建配置文件。

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

> 更多细节请参见 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

2. 定义环境变量。

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// 将所有配置值格式化为环境变量
const env = formatEnvVariable();

// 在 process.env 中设置每个格式化的环境变量
Object.assign(process.env, env);
```

3. 导入配置文件。

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
