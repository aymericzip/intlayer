---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale Hook 文档 | next-intlayer
description: 查看如何使用 next-intlayer 包中的 useLocale 钩子
keywords:
  - useLocale
  - 字典
  - 键
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# Next.js 集成：`useLocale` 钩子文档（适用于 `next-intlayer`）

本节提供了针对 Next.js 应用中 `next-intlayer` 库的 `useLocale` 钩子的详细文档。该钩子旨在高效处理语言环境切换和路由。

## 在 Next.js 中导入 `useLocale`

要在 Next.js 应用中使用 `useLocale` 钩子，请按如下方式导入：

```javascript
import { useLocale } from "next-intlayer"; // 用于管理 Next.js 中的语言环境和路由
```

## 用法

以下是在 Next.js 组件中实现 `useLocale` 钩子的方法：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>当前语言环境: {locale}</h1>
      <p>默认语言环境: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>当前语言环境: {locale}</h1>
      <p>默认语言环境: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>当前语言环境: {locale}</h1>
      <p>默认语言环境: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## 参数和返回值

当你调用 `useLocale` 钩子时，它会返回一个包含以下属性的对象：

- **`locale`**：当前在 React 上下文中设置的语言环境。
- **`defaultLocale`**：配置中定义的主要语言环境。
- **`availableLocales`**：配置中定义的所有可用语言环境列表。
- **`setLocale`**：一个用于更改应用程序语言环境并相应更新 URL 的函数。它会处理前缀规则，根据配置决定是否将语言环境添加到路径中。利用 `next/navigation` 中的 `useRouter` 来执行导航功能，如 `push` 和 `refresh`。
- **`pathWithoutLocale`**：一个计算属性，返回不包含语言环境的路径。它对于比较 URL 非常有用。例如，如果当前语言环境是 `fr`，且 URL 是 `fr/my_path`，则不含语言环境的路径为 `/my_path`。利用 `next/navigation` 中的 `usePathname` 获取当前路径。

## 结论

`next-intlayer` 的 `useLocale` 钩子是管理 Next.js 应用中多语言环境的关键工具。它通过无缝处理语言环境存储、状态管理和 URL 修改，提供了一种集成的方法来适配多语言应用。
