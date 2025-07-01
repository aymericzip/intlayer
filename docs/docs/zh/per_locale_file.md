---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Intlayer 中的“每语言”内容声明
description: 了解如何在 Intlayer 中按语言声明内容。遵循文档以理解不同格式和使用场景。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - 每语言
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
---

# Intlayer 中的“每语言”内容声明

Intlayer 支持两种声明多语言内容的方式：

- 单文件包含所有翻译
- 每个语言一个文件（每语言格式）

这种灵活性使得：

- 轻松迁移自其他国际化工具
- 支持自动化翻译工作流程
- 将翻译清晰地组织到独立的、特定语言的文件中

## 单文件多语言翻译

这种格式适用于：

- 代码中的快速迭代。
- 与内容管理系统（CMS）的无缝集成。

这是大多数使用场景推荐的方法。它将翻译集中管理，便于迭代和与 CMS 集成。

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 定义包含多语言内容的字典对象
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 定义包含多语言内容的字典对象
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 推荐：当使用 Intlayer 的可视化编辑器或直接在代码中管理翻译时，此格式最佳。

## 按语言区域格式

此格式适用于：

- 您希望独立版本控制或覆盖翻译。
- 您正在集成机器或人工翻译工作流。

您还可以通过指定 locale 字段，将翻译拆分到单独的语言区域文件中：

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "我的组件标题" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 定义一个字典类型的内容对象
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "我的组件标题" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 定义一个字典类型的内容对象
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: {
    multilingualContent: "我的组件标题",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: {
    multilingualContent: "我的组件标题",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // 重要
  "content": {
    "multilingualContent": "我的组件标题",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // 重要
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> 重要提示：确保定义了 locale 字段。它告诉 Intlayer 该文件代表哪种语言。

> 注意：在这两种情况下，内容声明文件必须遵循命名模式 `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`，以便被 Intlayer 识别。`.[locale]` 后缀是可选的，仅作为命名约定使用。

## 混合格式

您可以将两种声明方法结合使用于同一个内容键。例如：

- 在像 index.content.ts 这样的文件中静态声明您的基础内容。
- 在单独的文件中添加或覆盖特定的翻译，例如 index.fr.content.ts 或 index.content.json。

这种设置特别适用于：

- 您想在代码中定义初始内容结构。
- 您计划稍后使用 CMS 或自动化工具丰富或完善翻译。

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 示例

这是一个多语言内容声明文件：

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "我的组件标题",
    projectName: "我的项目",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer 会自动合并多语言和每个语言环境的文件。

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // 默认语言是英语，因此它将返回英语内容

console.log(JSON.stringify(intlayer, null, 2));
// 结果:
// {
//  "multilingualContent": "我的组件标题",
//  "projectName": "我的项目"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 结果:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "我的项目"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 结果:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "我的项目"
// }
```

### 自动翻译生成

使用 [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md) 根据您偏好的服务自动填充缺失的翻译。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
