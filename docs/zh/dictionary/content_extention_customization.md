# 内容扩展自定义

## 内容文件扩展名

Intlayer 允许您自定义内容声明文件的扩展名。这种自定义提供了管理大型项目的灵活性，并有助于避免与其他模块的冲突。

### 默认扩展名

默认情况下，Intlayer 监视具有以下扩展名的所有文件以进行内容声明：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

这些默认扩展名适用于大多数应用程序。然而，当您有特定需求时，可以定义自定义扩展名以简化构建过程并减少与其他组件的冲突风险。

### 自定义内容扩展名

要自定义 Intlayer 用于识别内容声明文件的扩展名，您可以在 Intlayer 配置文件中指定它们。这种方法对于限制监视过程范围以提高构建性能的大型项目非常有用。

以下是如何在配置中定义自定义内容扩展名的示例：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // 您的自定义扩展名
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // 您的自定义扩展名
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // 您的自定义扩展名
  },
};

module.exports = config;
```

在此示例中，配置指定了两个自定义扩展名：`.my_content.ts` 和 `.my_content.tsx`。Intlayer 将仅监视具有这些扩展名的文件以构建字典。

### 自定义扩展名的好处

- **构建性能**：减少监视文件的范围可以显著提高大型项目的构建性能。
- **避免冲突**：自定义扩展名有助于防止与项目中的其他 JavaScript 或 TypeScript 文件发生冲突。
- **组织性**：自定义扩展名允许您根据项目需求组织内容声明文件。

### 自定义扩展名的指南

在自定义内容文件扩展名时，请牢记以下指南：

- **唯一性**：选择在项目中唯一的扩展名以避免冲突。
- **一致的命名**：使用一致的命名约定以提高代码的可读性和可维护性。
- **避免常见扩展名**：避免使用诸如 `.ts` 或 `.js` 之类的常见扩展名，以防止与其他模块或库发生冲突。

## 结论

在 Intlayer 中自定义内容文件扩展名是优化性能和避免大型应用程序冲突的宝贵功能。通过遵循本文档中概述的指南，您可以有效地管理内容声明，并确保与项目其他部分的顺利集成。
