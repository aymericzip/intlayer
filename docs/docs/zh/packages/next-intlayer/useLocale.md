---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useLocale钩子的文档 | next-intlayer
description: 查看如何使用next-intlayer软件包的useLocale钩子
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
---

# Next.js 集成: `useLocale` 钩子文档 for `next-intlayer`

本节提供了针对 Next.js 应用程序的 `useLocale` 钩子的详细文档，适用于 `next-intlayer` 库。它旨在高效处理语言环境的更改和路由。

## 在 Next.js 中导入 `useLocale`

要在 Next.js 应用程序中使用 `useLocale` 钩子，请按以下方式导入：

```javascript
import { useLocale } from "next-intlayer"; // 用于在 Next.js 中管理语言环境和路由
```

## 用法

以下是如何在 Next.js 组件中实现 `useLocale` 钩子：

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

当调用 `useLocale` 钩子时，它会返回一个包含以下属性的对象：

- **`locale`**: 当前在 React 上下文中设置的语言环境。
- **`defaultLocale`**: 配置中定义的主要语言环境。
- **`availableLocales`**: 配置中定义的所有可用语言环境的列表。
- **`setLocale`**: 用于更改应用程序语言环境并相应更新 URL 的函数。它处理前缀规则，根据配置决定是否将语言环境添加到路径中。使用 `next/navigation` 中的 `useRouter` 提供的导航功能，例如 `push` 和 `refresh`。
- **`pathWithoutLocale`**: 一个计算属性，返回不带语言环境的路径。它对于比较 URL 很有用。例如，如果当前语言环境是 `fr`，且 URL 为 `fr/my_path`，则不带语言环境的路径为 `/my_path`。使用 `next/navigation` 中的 `usePathname` 获取当前路径。

## 结论

`next-intlayer` 的 `useLocale` 钩子是管理 Next.js 应用程序语言环境的重要工具。它提供了一种集成的方法，通过无缝处理语言环境存储、状态管理和 URL 修改，使您的应用程序适应多语言环境。
