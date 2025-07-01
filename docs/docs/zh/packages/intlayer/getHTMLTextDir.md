---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getHTMLTextDir 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getHTMLTextDir 函数
keywords:
  - getHTMLTextDir
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
  - getHTMLTextDir
---

# 文档：`intlayer` 中的 `getHTMLTextDir` 函数

## 描述

`getHTMLTextDir` 函数根据提供的语言环境确定文本方向（`ltr`、`rtl` 或 `auto`）。它旨在帮助开发者为 HTML 设置 `dir` 属性，以实现正确的文本渲染。

## 参数

- `locale?: Locales`

  - **描述**：用于确定文本方向的语言环境字符串（例如，`Locales.ENGLISH`、`Locales.ARABIC`）。
  - **类型**：`Locales`（可选）

## 返回值

- **类型**：`Dir`（`'ltr' | 'rtl' | 'auto'`）
- **描述**：对应语言环境的文本方向：
  - `'ltr'` 表示从左到右的语言。
  - `'rtl'` 表示从右到左的语言。
  - `'auto'` 表示语言环境未被识别。

## 示例用法

### 确定文本方向

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // 输出: "ltr"
getHTMLTextDir(Locales.FRENCH); // 输出: "ltr"
getHTMLTextDir(Locales.ARABIC); // 输出: "rtl"
```

## 边界情况

- **未提供语言环境：**

  - 当 `locale` 为 `undefined` 时，函数返回 `'auto'`。

- **未识别的语言环境：**
  - 对于未识别的语言环境，函数默认返回 `'auto'`。

## 组件中的使用：

`getHTMLTextDir` 函数可用于根据语言环境动态设置 HTML 文档中的 `dir` 属性，以实现正确的文本渲染。

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

// 根据 locale 动态设置 dir 属性的 HTML 布局组件
const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

在上面的示例中，`dir` 属性是根据 locale 动态设置的。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
