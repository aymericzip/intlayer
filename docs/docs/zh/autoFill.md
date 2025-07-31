---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 自动填充
description: 学习如何在 Intlayer 中使用自动填充功能，根据预定义的模式自动填充内容。按照本指南高效地在项目中实现自动填充功能。
keywords:
  - 自动填充
  - 内容自动化
  - 动态内容
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
---

# 自动填充内容声明文件翻译

**自动填充内容声明文件** 是加快开发工作流程的一种方式。  
自动填充机制通过内容声明文件之间的“主从”关系来实现。当主（master）文件被更新时，Intlayer 会自动将这些更改应用到派生（自动填充）的声明文件中。

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// 定义示例内容字典
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content", // 这是内容示例
  },
} satisfies Dictionary;

export default exampleContent;
```

这是一个使用 `autoFill` 指令的[按语言环境划分的内容声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md)。

然后，当你运行以下命令时：

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer 将自动生成派生的声明文件，路径为 `src/components/example/example.content.json`，填充所有主文件中尚未声明的语言环境。

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

之后，两个声明文件将合并为一个字典，可以通过标准的 `useIntlayer("example")` 钩子（React）/ 组合函数（Vue）访问。

## 自动填充文件格式

自动填充声明文件推荐的格式是 **JSON**，这有助于避免格式限制。然而，Intlayer 也支持 `.ts`、`.js`、`.mjs`、`.cjs` 以及其他格式。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // 你的内容
  },
};
```

这将生成文件于：

```
src/components/example/example.filled.content.ts
```

> `.js`、`.ts` 及类似文件的生成方式如下：
>
> - 如果文件已存在，Intlayer 将使用 AST（抽象语法树）解析它，以定位每个字段并插入任何缺失的翻译。
> - 如果文件不存在，Intlayer 将使用默认内容声明文件模板生成该文件。

## 绝对路径

`autoFill` 字段也支持绝对路径。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // 你的内容
  },
};
```

这将生成文件于：

```
/messages/example.content.json
```

## 自动生成每个语言环境的内容声明文件

`autoFill` 字段还支持生成**每个语言环境**的内容声明文件。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // 你的内容
  },
};
```

这将生成两个独立的文件：

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## 过滤特定语言自动填充

使用对象作为 `autoFill` 字段允许你应用过滤器，只生成特定语言的文件。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // 你的内容
  },
};
```

这将只生成法语翻译文件。

## 路径变量

你可以在 `autoFill` 路径中使用变量，动态解析生成文件的目标路径。

**可用变量：**

- `{{locale}}` – 语言代码（例如 `fr`，`es`）
- `{{key}}` – 字典键（例如 `example`）

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // 您的内容
  },
};
```

这将生成：

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史记录
