---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation 函数 - Intlayer JavaScript 文档
description: Intlayer 中 getTranslation 函数的文档，介绍如何为特定语言环境获取本地化内容，若未找到则回退到默认语言环境。
keywords:
  - getTranslation
  - intlayer
  - 函数
  - 本地化
  - i18n
  - JavaScript
  - 翻译
  - 语言环境
---

# 文档：`intlayer` 中的 `getTranslation` 函数

## 描述

`getTranslation` 函数从一组可自定义的语言内容中检索对应特定语言环境的内容。如果未找到指定的语言环境，则默认返回项目中配置的默认语言环境的内容。

## 参数

- `languageContent: CustomizableLanguageContent<Content>`

  - **描述**：包含多个语言环境翻译内容的对象。每个键代表一个语言环境，其值为对应的内容。
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
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
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
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言环境内容）
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言环境内容）
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello"（默认语言内容）
```

### 使用自定义内容类型：

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
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
- **语言内容不完整:**
  - 如果某个语言环境定义不完整，函数不会合并内容。它严格检索指定语言环境的值，或者回退到默认语言环境。
- **TypeScript 强制执行:**
  - 如果 `languageContent` 中的语言环境与项目配置不匹配，TypeScript 将强制要求定义所有必需的语言环境，确保内容完整且类型安全。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
