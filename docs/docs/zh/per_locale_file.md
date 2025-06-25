# Intlayer 支持两种方式声明多语言内容：

- 单文件包含所有翻译
- 每种语言一个文件（每语言格式）

这种灵活性使得：

- 从其他 i18n 工具轻松迁移
- 支持自动化翻译工作流
- 将翻译清晰地组织到独立的、特定语言的文件中

## 单文件包含多种翻译

这种格式适合：

- 在代码中快速迭代。
- 与 CMS 无缝集成。

这是大多数使用场景的推荐方法。它集中管理翻译，使得迭代和与 CMS 集成变得容易。

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      zh: "我的组件标题",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      zh: "我的组件标题",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      zh: "我的组件标题",
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
        "zh": "我的组件标题",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 推荐：当使用 Intlayer 的可视化编辑器或直接在代码中管理翻译时，这种格式是最佳选择。

## 每语言格式

这种格式适用于以下情况：

- 您希望独立版本化或覆盖翻译。
- 您正在集成机器或人工翻译工作流。

您还可以通过指定 locale 字段将翻译拆分为单独的语言文件：

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
    multilingualContent: "Title of my component",
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
    multilingualContent: "Título de mi componente",
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
    "multilingualContent": "Title of my component",
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

> 重要：确保定义了 locale 字段。它告诉 Intlayer 文件代表的语言。

> 注意：在这两种情况下，内容声明文件必须遵循命名模式 `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` 才能被 Intlayer 识别。`.[locale]` 后缀是可选的，仅用作命名约定。

## 混合格式

您可以为同一内容键混合使用这两种方法。例如：

静态声明默认或基础内容（例如 `index.content.ts`）

在 `index.content.json`、`index.fr.content.ts` 等中添加或覆盖特定语言的内容。

这在以下情况下特别有用：

- 您希望在代码库中静态声明基础内容，并通过 CMS 自动填充翻译。

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 示例

以下是一个多语言内容声明文件：

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "zh": "我的组件标题",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer 会自动合并多语言和每语言文件。

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // 默认语言是 ENGLISH，因此它将返回 ENGLISH 内容

console.log(JSON.stringify(intlayer, null, 2));
// 结果：
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 结果：
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 结果：
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### 自动翻译生成

使用 [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md) 根据您首选的服务自动填充缺失的翻译。
