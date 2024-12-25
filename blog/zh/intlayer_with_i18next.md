# 国际化与 Intlayer 和 i18next

i18next 是一个开源国际化 (i18n) 框架，旨在用于 JavaScript 应用程序。它广泛用于管理翻译、定位和软件项目中的语言切换。然而，它有一些限制，可能会使可扩展性和开发变得复杂。

Intlayer 是另一个国际化框架，解决了这些限制，提供了一种更灵活的内容声明和管理方法。让我们探讨一下 i18next 和 Intlayer 之间的主要区别，以及如何为最佳国际化配置两者。

## Intlayer 与 i18next：主要区别

### 1. 内容声明

使用 i18next 时，翻译字典必须在特定文件夹中声明，这可能会使应用程序的可扩展性变得复杂。相比之下，Intlayer 允许内容在与组件相同的目录中声明。这有几个优点：

- **简化内容编辑**：用户不必为了编辑而查找正确的字典，从而减少错误的机会。
- **自动适应**：如果组件更改位置或被删除，Intlayer 会自动检测并适应。

### 2. 配置复杂性

配置 i18next 可能很复杂，尤其是在与服务器组件集成或为 Next.js 等框架配置中间件时。Intlayer 简化了这一过程，提供了更直接的配置。

### 3. 翻译字典的一致性

确保翻译字典在不同语言之间的一致性在使用 i18next 时可能会面临挑战。这种不一致性如果处理不当，可能导致应用程序崩溃。Intlayer 通过对翻译内容施加约束来解决这个问题，确保没有翻译遗漏，并且翻译内容准确。

### 4. TypeScript 集成

Intlayer 与 TypeScript 的集成更好，允许在代码中自动建议内容，从而提高开发效率。

### 5. 跨应用共享内容

Intlayer 促进了跨多个应用程序和共享库的内容声明文件共享。这个功能使得在更大的代码库中维护一致的翻译变得更容易。

## 如何使用 Intlayer 生成 i18next 字典

### 配置 Intlayer 以导出 i18next 字典

> 重要提示
> i18next 字典的导出当前处于测试阶段，并不确保与其他框架的 1:1 兼容性。建议遵循基于 Intlayer 的配置以最小化问题。

要导出 i18next 字典，您需要适当地配置 Intlayer。以下是如何设置 Intlayer 以导出 Intlayer 和 i18next 字典的示例。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // 指示 Intlayer 将导出 Intlayer 和 i18next 字典
    dictionaryOutput: ["intlayer", "i18next"],
    // 从项目根目录到导出 i18n 字典的目录的相对路径
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // 指示 Intlayer 将导出 Intlayer 和 i18next 字典
    dictionaryOutput: ["intlayer", "i18next"],
    // 从项目根目录到导出 i18n 字典的目录的相对路径
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // 指示 Intlayer 将导出 Intlayer 和 i18next 字典
    dictionaryOutput: ["intlayer", "i18next"],
    // 从项目根目录到导出 i18n 字典的目录的相对路径
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

module.exports = config;
```

通过在配置中包含 'i18next'，Intlayer 生成专用的 i18next 字典，除此之外，还有 Intlayer 字典。请注意，移除 'intlayer' 可能导致与 React-Intlayer 或 Next-Intlayer 的兼容性破坏。

### 将字典导入到您的 i18next 配置中

要将生成的字典导入到您的 i18next 配置中，可以使用 'i18next-resources-to-backend'。以下是如何导入您的 i18next 字典的示例：

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // 您的 i18next 配置
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // 您的 i18next 配置
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // 您的 i18next 配置
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
