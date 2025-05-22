# 自动填充内容声明文件

**自动填充内容声明文件**是一种加速开发工作流程的方法。

自动填充机制通过内容声明文件之间的*主从*关系工作。当主（主控）文件更新时，Intlayer将自动将这些更改应用到派生（自动填充）声明文件。

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

这是一个使用`autoFill`指令的[按语言内容声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/per_locale_file.md)。

然后，当你运行以下命令时：

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer将自动在`src/components/example/example.content.json`生成派生声明文件，填充主文件中尚未声明的所有语言。

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

之后，两个声明文件将合并为一个字典，可通过标准`useIntlayer("example")`钩子（react）/组合式（vue）访问。

## 自动填充文件格式

自动填充声明文件的推荐格式是**JSON**，这有助于避免格式限制。但是，Intlayer也支持`.ts`、`.js`、`.mjs`、`.cjs`等格式。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // 你的内容
  },
};
```

这将在以下位置生成文件：

```
src/components/example/example.filled.content.ts
```

> `.js`、`.ts`等文件的生成过程如下：
>
> - 如果文件已存在，Intlayer将使用AST（抽象语法树）分析它，以定位每个字段并插入缺失的翻译。
> - 如果文件不存在，Intlayer将使用内容声明文件的默认模板生成它。

## 绝对路径

`autoFill`字段也支持绝对路径。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // 你的内容
  },
};
```

这将在以下位置生成文件：

```
/messages/example.content.json
```

## 按语言自动生成内容声明文件

`autoFill`字段还支持**按语言**生成内容声明文件。

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

这将生成两个单独的文件：

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## 按特定语言过滤自动填充

使用对象作为`autoFill`字段允许你应用过滤器并仅生成特定语言的文件。

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

你可以在`autoFill`路径中使用变量来动态解析生成文件的目标路径。

**可用变量：**

- `{{locale}}` – 语言代码（例如：`fr`、`es`）
- `{{key}}` – 字典键（例如：`example`）

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // 你的内容
  },
};
```

这将生成：

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
