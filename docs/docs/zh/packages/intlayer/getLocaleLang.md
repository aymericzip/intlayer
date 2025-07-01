---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getLocaleLang 函数
keywords:
  - getLocaleLang
  - 翻译
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# 文档：`intlayer` 中的 `getLocaleLang` 函数

## 描述

`getLocaleLang` 函数从区域设置字符串中提取语言代码。它支持带有或不带国家代码的区域设置。如果未提供区域设置，则默认返回空字符串。

## 参数

- `locale?: Locales`

  - **描述**：要从中提取语言代码的区域设置字符串（例如，`Locales.ENGLISH_UNITED_STATES`，`Locales.FRENCH_CANADA`）。
  - **类型**：`Locales`（可选）

## 返回值

- **类型**：`string`
- **描述**：从区域设置中提取的语言代码。如果未提供区域设置，则返回空字符串（`''`）。

## 示例用法

### 提取语言代码：

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
getLocaleLang(Locales.ENGLISH); // 输出: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
getLocaleLang(Locales.ENGLISH); // 输出: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
getLocaleLang(Locales.ENGLISH); // 输出: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

## 边界情况

- **未提供区域设置：**

- 当 `locale` 为 `undefined` 时，函数返回空字符串。

- **格式错误的区域设置字符串：**
  - 如果 `locale` 不符合 `language-country` 格式（例如，`Locales.ENGLISH-US`），函数会安全地返回 `'-'` 之前的部分，或者如果没有 `'-'`，则返回整个字符串。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
