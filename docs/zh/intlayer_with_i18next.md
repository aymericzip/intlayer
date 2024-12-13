# 国际化与 Intlayer 和 i18next

i18next 是一个开源国际化 (i18n) 框架，专为 JavaScript 应用程序设计。它被广泛用于管理翻译、本地化和软件项目中的语言切换。然而，它有一些限制，这可能会使可扩展性和开发变得复杂。

Intlayer 是另一个国际化框架，解决了这些限制，提供了一种更灵活的内容声明和管理方法。让我们探讨一些 i18next 和 Intlayer 之间的主要区别，以及如何配置两者以获得最佳国际化效果。

## Intlayer vs. i18next: 主要区别

### 1. 内容声明

使用 i18next，翻译字典必须在特定文件夹中声明，这可能会使应用程序的可扩展性变得复杂。相比之下，Intlayer 允许内容在与组件相同的目录中声明。这有几个优点：

- **简化内容编辑**：用户不必搜索正确的字典进行编辑，从而减少错误的机会。
- **自动适应**：如果组件更改位置或被移除，Intlayer 会自动检测并适应。

### 2. 配置复杂性

配置 i18next 可能很复杂，尤其是在与服务器端组件或配置像 Next.js 这样的框架的中间件时。Intlayer 简化了这个过程，提供了更直接的配置。

### 3. 翻译字典的一致性

确保不同语言间翻译字典的一致性在 i18next 中可能会很具挑战性。这种不一致性可能导致应用程序崩溃，如果处理不当。Intlayer 通过强制实现翻译内容的约束来解决这个问题，确保没有翻译被遗漏，翻译内容准确。

### 4. TypeScript 集成

Intlayer 提供了更好的 TypeScript 集成，允许在代码中自动建议内容，从而增强开发效率。

### 5. 跨应用共享内容

Intlayer 便于在多个应用程序和共享库之间共享内容声明文件。此功能使得在较大的代码库中维护一致的翻译变得更加容易。

## 如何使用 Intlayer 生成 i18next 字典

### 配置 Intlayer 导出 i18next 字典

> 重要说明
> 目前导出 i18next 字典的功能处于测试阶段，不能确保与其他框架的1:1兼容性。建议基于 Intlayer 的配置，以最大限度地减少问题。

要导出 i18next 字典，您需要适当地配置 Intlayer。以下是如何设置 Intlayer 以导出 Intlayer 和 i18next 字典的示例。

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // 指明 Intlayer 将同时导出 Intlayer 和 i18next 字典
    dictionaryOutput: ["intlayer", "i18next"],
    // 从项目根目录到将导出 i18n 字典的目录的相对路径
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

通过在配置中包含 'i18next'，Intlayer 除了生成 Intlayer 字典之外，还会生成专用的 i18next 字典。请注意，若从配置中移除 'intlayer' 可能会破坏与 React-Intlayer 或 Next-Intlayer 的兼容性。

### 将字典导入到您的 i18next 配置中

要将生成的字典导入您的 i18next 配置中，可以使用 'i18next-resources-to-backend'。以下是如何导入您的 i18next 字典的示例：

```typescript
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
