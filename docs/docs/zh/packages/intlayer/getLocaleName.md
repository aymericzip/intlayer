---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleName 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getLocaleName 函数
keywords:
  - getLocaleName
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
  - getLocaleName
---

# 文档：`intlayer` 中的 `getLocaleName` 函数

## 描述

`getLocaleName` 函数返回给定语言环境（`targetLocale`）在显示语言环境（`displayLocale`）中的本地化名称。如果未提供 `targetLocale`，则返回 `displayLocale` 自身语言的名称。

## 参数

- `displayLocale: Locales`

  - **描述**：用于显示目标语言环境名称的语言环境。
  - **类型**：表示有效语言环境的枚举或字符串。

- `targetLocale?: Locales`
  - **描述**：需要本地化名称的语言环境。
  - **类型**：可选。表示有效语言环境的枚举或字符串。

## 返回值

- **类型**：`string`
- **描述**：`targetLocale` 在 `displayLocale` 中的本地化名称，如果未提供 `targetLocale`，则返回 `displayLocale` 自身的名称。如果未找到翻译，则返回 `"Unknown locale"`。

## 示例用法

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 输出: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 输出: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 输出: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 输出: "English"

getLocaleName(Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 输出: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 输出: "French"

getLocaleName(Locales.CHINESE); // 输出: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 输出: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 输出: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 输出: "Chinese"

getLocaleName("unknown-locale"); // 输出: "未知语言"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 输出: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 输出: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 输出: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 输出: "English"

getLocaleName(Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 输出: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 输出: "French"

getLocaleName(Locales.CHINESE); // 输出: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 输出: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 输出: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 输出: "Chinese"

getLocaleName("unknown-locale"); // 输出: "未知语言"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // 输出: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 输出: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 输出: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 输出: "English"

getLocaleName(Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 输出: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 输出: "French"

getLocaleName(Locales.CHINESE); // 输出: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 输出: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 输出: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 输出: "Chinese"

getLocaleName("unknown-locale"); // 输出: "Unknown locale"
```

## 边界情况

- **未提供 `targetLocale`：**
  - 该函数默认返回 `displayLocale` 自身的名称。
- **缺少翻译：**
  - 如果 `localeNameTranslations` 中不包含 `targetLocale` 或特定 `displayLocale` 的条目，函数将回退到 `ownLocalesName`，或者返回 `"Unknown locale"`。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
