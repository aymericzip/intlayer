---
docName: package__intlayer__getTranslation
url: /doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t函数文档 | intlayer
description: 查看如何使用 intlayer 软件包的 getTranslation 函数
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
---

# 文档: `getTranslationContent` 函数在 `intlayer` 中

## 描述

`getTranslationContent` 函数从一组可自定义的语言内容中检索与特定语言环境对应的内容。如果未找到指定的语言环境，它将默认返回项目中配置的默认语言环境的内容。

## 参数

- `languageContent: CustomizableLanguageContent<Content>`

  - **描述**: 包含各种语言环境翻译的对象。每个键表示一个语言环境，其值为相应的内容。
  - **类型**: `CustomizableLanguageContent<Content>`
    - `Content` 可以是任何类型，默认为 `string`。

- `locale: Locales`

  - **描述**: 要检索内容的语言环境。
  - **类型**: `Locales`

## 返回值

- **类型**: `Content`
- **描述**: 与指定语言环境对应的内容。如果未找到语言环境，则返回默认语言环境的内容。

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

### 缺少语言环境:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello" (默认语言环境内容)
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

console.log(content); // 输出: "Hello" (默认语言环境内容)
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

console.log(content); // 输出: "Hello" (默认语言环境内容)
```

### 使用自定义内容类型:

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

## 边界情况

- **未找到语言环境:**
  - 当 `locale` 在 `languageContent` 中未找到时，函数返回默认语言环境的内容。
- **不完整的语言内容:**
  - 如果某个语言环境部分定义，函数不会合并内容。它严格检索指定语言环境的值或回退到默认值。
- **TypeScript 强制:**
  - 如果 `languageContent` 中的语言环境与项目配置不匹配，TypeScript 将强制要求定义所有必需的语言环境，确保内容完整且类型安全。
