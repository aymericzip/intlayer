---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getTranslation 函数
keywords:
  - getTranslation
  - 翻译
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 文档：`intlayer` 中的 `getTranslationContent` 函数

## 描述

`getTranslationContent` 函数从一组可自定义的语言内容中检索对应特定语言环境的内容。如果未找到指定的语言环境，则默认返回项目中配置的默认语言环境的内容。

## 参数

- `languageContent: CustomizableLanguageContent<Content>`

  - **描述**：包含多个语言环境翻译的对象。每个键代表一个语言环境，其值是对应的内容。
  - **类型**：`CustomizableLanguageContent<Content>`
    - `Content` 可以是任何类型，默认是 `string`。

- `locale: Locales`

  - **描述**：要检索内容的语言环境。
  - **类型**：`Locales`

## 返回值

- **类型**：`Content`
- **描述**：对应指定语言环境的内容。如果未找到该语言环境，则返回默认语言环境的内容。

## 示例用法

### 基本用法

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

### 缺失的语言环境：

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言环境内容）
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言环境内容）
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言环境内容）
```

### 使用自定义内容类型：

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

## 边缘情况

- **未找到语言环境:**
  - 当 `locale` 在 `languageContent` 中未找到时，函数返回默认语言环境的内容。
- **语言内容不完整:**
  - 如果某个语言环境定义不完整，函数不会合并内容。它严格检索指定语言环境的值，或者回退到默认语言环境。
- **TypeScript 强制执行：**
  - 如果 `languageContent` 中的语言环境与项目配置不匹配，TypeScript 会强制要求定义所有必需的语言环境，确保内容完整且类型安全。
