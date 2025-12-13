---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: 内容文件
description: 学习如何自定义内容声明文件的扩展。按照本指南高效地在项目中实现条件。
keywords:
  - 内容文件
  - 文档
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: 添加 ICU 和 i18next 格式支持
  - version: 6.0.0
    date: 2025-09-20
    changes: 添加字段文档
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 内容文件

<iframe title="i18n，Markdown，JSON……一站式管理解决方案 | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## 什么是内容文件？

Intlayer 中的内容文件是包含字典定义的文件。
这些文件声明了您的应用程序的文本内容、翻译和资源。
内容文件由 Intlayer 处理以生成字典。

字典将是您的应用程序通过 `useIntlayer` 钩子导入的最终结果。

### 关键概念

#### 字典

字典是按键组织的结构化内容集合。每个字典包含：

- **键**：字典的唯一标识符
- **内容**：实际的内容值（文本、数字、对象等）
- **元数据**：附加信息，如标题、描述、标签等

#### 内容文件

内容文件示例：

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string; // 字符串内容
      numberContent: number; // 数字内容
      booleanContent: boolean; // 布尔内容
      javaScriptContent: string; // JavaScript 内容
    };
  };
  multilingualContent: string; // 多语言内容
  quantityContent: string; // 数量内容
  conditionalContent: string; // 条件内容
  markdownContent: never; // Markdown 内容
  externalContent: string; // 外部内容
  insertionContent: string; // 插入内容
  nestedContent: string; // 嵌套内容
  fileContent: string; // 文件内容
  jsxContent: ReactNode; // JSX 内容
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScript 内容
      },
    },
    multilingualContent: t({
      zh: "中文内容",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }), // 多语言内容
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
    }), // 数量内容
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }), // 条件内容
    insertionContent: insert("你好 {{name}}!"), // 插入内容
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ), // 嵌套内容
    fileContent: file("./path/to/file.txt"), // 文件内容
    externalContent: fetch("https://example.com").then((res) => res.json()), // 外部内容
    markdownContent: md("# Markdown 示例"), // Markdown 内容

    /*
     * 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
     */
    jsxContent: <h1>我的标题</h1>, // JSX 内容
  },
} satisfies Dictionary<Content>; // [可选] Dictionary 是泛型，允许您加强字典的格式化
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "很多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    insertionContent: insert("你好 {{name}}！"),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      zh: "中文内容",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    insertionContent: insert("你好 {{name}}！"),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "你好，世界",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "没有汽车",
        "1": "一辆汽车",
        "<-1": "少于负一辆汽车",
        "-1": "负一辆汽车",
        ">5": "一些汽车",
        ">19": "许多汽车",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "验证已启用",
        "false": "验证已禁用",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "你好 {{name}}！",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown 示例",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["我的标题"],
      },
    },
  },
}
```

#### 内容节点

内容节点是字典内容的构建块。它们可以是：

- **原始值**：字符串、数字、布尔值、null、undefined
- **类型化节点**：特殊内容类型，如翻译、条件、Markdown 等
- **函数**：可在运行时计算的动态内容 [参见函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)
- **嵌套内容**：对其他字典的引用

#### 内容类型

Intlayer 通过类型化节点支持多种内容类型：

- **翻译内容**：具有特定语言环境值的多语言文本 [参见 翻译内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation_content.md)
- **条件内容**：基于布尔表达式的条件内容 [参见 条件内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/condition_content.md)
- **枚举内容**：基于枚举值变化的内容 [参见 枚举内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration_content.md)
- **插入内容**：可以插入到其他内容中的内容 [参见 插入内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion_content.md)
- **Markdown 内容**：以 Markdown 格式的富文本内容 [参见 Markdown 内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown_content.md)
- **嵌套内容**：对其他字典的引用 [参见 嵌套内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nested_content.md)
- **性别内容**：基于性别变化的内容 [参见 性别内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender_content.md)
- **文件内容**：对外部文件的引用 [参见 文件内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file_content.md)

## 字典结构

Intlayer 中的字典由 `Dictionary` 类型定义，包含多个控制其行为的属性：

### 必需属性

#### `key`（字符串）

字典的标识符。如果多个字典具有相同的 key，Intlayer 会自动合并它们。

> 使用 kebab-case 命名规范（例如，`"about-page-meta"`）。

#### Content（字符串 | 数字 | 布尔值 | 对象 | 数组 | 函数）

`content` 属性包含实际的字典数据，支持：

- **原始值**：字符串、数字、布尔值、null、undefined
- **类型化节点**：使用 Intlayer 辅助函数的特殊内容类型
- **嵌套对象**：复杂的数据结构
- **数组**：内容集合
- **函数**：动态内容计算

### 可选属性

#### `title`（字符串）

字典的人类可读标题，有助于在编辑器和内容管理系统中识别字典。当管理大量字典或使用内容管理界面时，这一点尤其有用。

**示例：**

```typescript
{
  key: "about-page-meta",
  title: "关于页面元数据",
  content: { /* ... */ }
}
```

#### `description`（字符串）

详细描述字典的用途、使用指南及任何特殊注意事项。此描述也用作 AI 驱动的翻译生成的上下文，有助于保持翻译质量和一致性。

**示例：**

```typescript
{
  key: "about-page-meta",
  description: [
    "该字典管理关于页面的元数据",
    "考虑SEO的最佳实践：",
    "- 标题应在50到60个字符之间",
    "- 描述应在150到160个字符之间",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

用于对字典进行分类和组织的字符串数组。标签提供了额外的上下文信息，可用于在编辑器和内容管理系统中进行过滤、搜索或组织字典。

**示例：**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

指定用于字典内容的格式化器。这允许使用不同的消息格式化语法。

- `'intlayer'`: 默认的 Intlayer 格式化器。
- `'icu'`: 使用 ICU 消息格式化。
- `'i18next'`: 使用 i18next 消息格式化。

**示例：**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

指定用于字典内容的格式化器。这允许使用不同的消息格式化语法。

- `'intlayer'`: 默认的 Intlayer 格式化器。
- `'icu'`: 使用 ICU 消息格式化。
- `'i18next'`: 使用 i18next 消息格式化。

**示例：**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

将字典转换为按语言区域划分的字典，其中内容中声明的每个字段将自动转换为翻译节点。当设置此属性时：

- 该字典被视为单一语言环境字典
- 每个字段都会成为该特定语言环境的翻译节点
- 使用此属性时，内容中不应使用翻译节点（`t()`）
- 如果缺失，该字典将被视为多语言字典

> 更多信息请参见 [Intlayer 中的按语言环境内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md)。

**示例：**

```json
// 按语言环境字典
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "关于我们", // 这将成为 'en' 的翻译节点
    "description": "了解更多关于我们公司的信息"
  }
}
```

#### `autoFill` (AutoFill)

自动从外部来源自动填充字典内容的说明。此功能可以在 `intlayer.config.ts` 中全局配置，也可以针对每个字典单独配置。支持多种格式：

- **`true`**：为所有语言启用自动填充
- **`string`**：单个文件路径或带变量的模板路径
- **`object`**：按语言的文件路径配置

**示例：**

```json
// 为所有语言启用
{
  "autoFill": true
}
// 单个文件
{
  "autoFill": "./translations/aboutPage.content.json"
}
// 带变量的模板
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// 细粒度的按语言配置
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**可用变量：**

- `{{locale}}` – 语言代码（例如 `fr`，`es`）
- `{{fileName}}` – 文件名（例如 `example`）
- `{{key}}` – 词典键（例如 `example`）

> 更多信息请参见 [Intlayer 中的自动填充配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)。

##### `priority`（数字）

表示词典在冲突解决中的优先级。当多个词典包含相同键时，优先级数字最高的词典将覆盖其他词典。这对于管理内容层级和覆盖非常有用。

**示例：**

```typescript
// 基础词典
{
  key: "welcome-message",
  priority: 1,
  content: { message: "欢迎！" }
}

// 覆盖词典
{
  key: "welcome-message",
  priority: 10,
  content: { message: "欢迎使用我们的高级服务！" }
}
// 这将覆盖基础字典
```

### CMS 属性

##### `version`（字符串）

远程字典的版本标识符。帮助跟踪当前使用的字典版本，尤其在使用远程内容管理系统时非常有用。

##### `live`（布尔值）

对于远程字典，指示字典是否应在运行时实时获取。启用时：

- 需要在 `intlayer.config.ts` 中将 `importMode` 设置为 "live"
- 需要有一个实时服务器在运行
- 字典将在运行时通过实时同步 API 获取
- 如果启用实时但获取失败，则回退到动态值
- 如果未启用实时，字典将在构建时转换以获得最佳性能

### 系统属性（自动生成）

这些属性由 Intlayer 自动生成，不应手动修改：

##### `$schema`（字符串）

用于验证字典结构的 JSON 模式。由 Intlayer 自动添加，以确保字典的完整性。

##### `id`（字符串）

对于远程字典，这是远程服务器中字典的唯一标识符。用于获取和管理远程内容。

##### `localId`（LocalDictionaryId）

本地字典的唯一标识符。由 Intlayer 自动生成，用于帮助识别字典并确定其是本地还是远程，以及其位置。

##### `localIds`（LocalDictionaryId[]）

对于合并的字典，此数组包含所有被合并字典的 ID。对于追踪合并内容的来源非常有用。

##### `filePath` (string)

本地字典的文件路径，指示该字典是从哪个 `.content` 文件生成的。便于调试和源头追踪。

##### `versions` (string[])

对于远程字典，此数组包含字典的所有可用版本。帮助跟踪可用的版本。

##### `autoFilled` (true)

指示字典是否已从外部来源自动填充。在发生冲突时，基础字典将覆盖自动填充的字典。

##### `location` ('distant' | 'locale')

指示字典的位置：

- `'locale'`：本地字典（来自内容文件）
- `'distant'`：远程字典（来自外部来源）

## 内容节点类型

Intlayer 提供了几种扩展基本原始值的专用内容节点类型：

### 翻译内容 (`t`)

根据语言环境变化的多语言内容：

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### 条件内容 (`cond`)

基于布尔条件变化的内容：

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### 枚举内容 (`enu`)

基于枚举值变化的内容：

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "您的请求正在处理中",
  approved: "您的请求已被批准",
  rejected: "您的请求已被拒绝",
});
```

### 插入内容 (`insert`)

可以插入到其他内容中的内容：

```typescript
import { insert } from "intlayer";

insertionContent: insert("这段文本可以插入到任何地方");
```

### 嵌套内容 (`nest`)

引用其他字典：

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Markdown 内容 (`md`)

Markdown 格式的富文本内容：

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# 欢迎\n\n这是带有[链接](https://example.com)的**加粗**文本"
);
```

### 性别内容 (`gender`)

根据性别变化的内容：

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "他是一名开发者",
  female: "她是一名开发者",
  other: "他们是一名开发者",
});
```

### 文件内容 (`file`)

引用外部文件：

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## 创建内容文件

### 基本内容文件结构

内容文件导出一个满足 `Dictionary` 类型的默认对象：

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "欢迎页面内容",
  description: "主欢迎页面的内容，包括主视觉区域和功能",
  tags: ["页面", "欢迎", "主页"],
  content: {
    hero: {
      title: t({
        zh: "欢迎来到我们的平台",
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        zh: "轻松构建惊人的应用程序",
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          zh: "开始使用",
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          zh: "注册",
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          zh: "易于使用",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          zh: "适合所有技能水平的直观界面",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON 内容文件

您也可以创建 JSON 格式的内容文件：

```json
{
  "key": "welcome-page",
  "title": "欢迎页面内容",
  "description": "主欢迎页面的内容",
  "tags": ["页面", "欢迎"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "欢迎来到我们的平台",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "轻松构建惊人的应用程序",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### 每语言内容文件

对于每语言字典，指定 `locale` 属性：

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "欢迎来到我们的平台",
      subtitle: "轻松构建惊人的应用程序",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "欢迎使用我们的平台",
      subtitle: "轻松构建惊人的应用程序",
    },
  },
} satisfies Dictionary;
```

## 内容文件扩展名

Intlayer 允许您自定义内容声明文件的扩展名。此自定义功能为管理大型项目提供了灵活性，并有助于避免与其他模块的冲突。

### 默认扩展名

默认情况下，Intlayer 会监视所有具有以下扩展名的文件作为内容声明：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

这些默认的扩展名适用于大多数应用程序。然而，当您有特定需求时，可以定义自定义扩展名，以简化构建过程并减少与其他组件冲突的风险。

> 要自定义 Intlayer 用于识别内容声明文件的文件扩展名，您可以在 Intlayer 配置文件中指定它们。这种方法对于大型项目非常有用，因为限制监视过程的范围可以提升构建性能。

## 高级概念

### 字典合并

当多个字典具有相同的键时，Intlayer 会自动合并它们。合并行为取决于多个因素：

- **优先级**：具有更高 `priority` 值的字典会覆盖优先级较低的字典
- **自动填充与基础**：基础字典会覆盖自动填充的字典
- **位置**：本地字典会覆盖远程字典（当优先级相同时）

### 类型安全

Intlayer 为内容文件提供完整的 TypeScript 支持：

```typescript
// 定义你的内容类型
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// 在字典中使用它
export default {
  key: "welcome-page",
  content: {
    // TypeScript 将提供自动补全和类型检查
    hero: {
      title: "欢迎",
      subtitle: "构建惊人的应用",
      cta: "开始使用",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### 节点嵌套

你可以毫无问题地将函数嵌套到其他函数中。

示例：

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，嵌套条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，嵌套条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，结合条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // 英文问候语
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "zh": "未找到任何项目",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "zh": "找到一个项目",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "zh": "找到多个项目",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "无有效数据可用",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### 最佳实践

1. **命名规范**：
   - 对字典键使用kebab-case（例如 `"about-page-meta"`）
   - 将相关内容归类到相同的键前缀下

2. **内容组织**：
   - 将相关内容保存在同一个字典中
   - 使用嵌套对象来组织复杂的内容结构
   - 利用标签进行分类
   - 使用 `autoFill` 自动填充缺失的翻译

3. **性能**：
   - 调整内容配置以限制监视文件的范围
   - 仅在需要实时更新时使用实时字典（例如 A/B 测试等）
   - 确保启用构建转换插件（`@intlayer/swc` 或 `@intlayer/babel`）以在构建时优化字典
