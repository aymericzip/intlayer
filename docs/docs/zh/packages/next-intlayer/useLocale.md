---
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: useLocale 钩子文档 | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: 将 `onLocaleChange` 默认值设置为 `replace`
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

## 参数

`useLocale` 钩子接受以下参数：

- **`onLocaleChange`**：一个字符串，决定当语言环境改变时如何更新 URL。可以是 `"replace"`、`"push"` 或 `"none"`。

  > 让我们举个例子：
  >
  > 1. 你当前在 `/fr/home`
  > 2. 你导航到 `/fr/about`
  > 3. 你将语言环境更改为 `/es/about`
  > 4. 你点击浏览器的“返回”按钮
  >
  > 行为将根据 `onLocaleChange` 的值而有所不同：
  >
  > - `"replace"` (默认)：用新的本地化 URL 替换当前 URL，并设置 cookie。
  >   -> “返回”按钮将跳转到 `/es/home`
  > - `"push"`：将新的本地化 URL 添加到浏览器历史记录中，并设置 cookie。
  >   -> “返回”按钮将跳转到 `/fr/about`
  > - `"none"`：仅在客户端上下文中更新语言环境，并设置 cookie，而不更改 URL。
  >   -> “返回”按钮将跳转到 `/fr/home`
  > - `(locale) => void`：设置 cookie 并触发语言环境更改时调用的自定义函数。
  >
  >   `undefined` 选项是默认行为，因为我们建议使用 `Link` 组件导航到新的语言环境。
  >   示例：
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     关于我们
  >   </Link>
  >   ```

## 返回值

- **`locale`**：当前在 React 上下文中设置的语言环境。
- **`defaultLocale`**：配置中定义的主要语言环境。
- **`availableLocales`**：配置中定义的所有可用语言环境列表。
- **`setLocale`**：一个用于更改应用程序语言环境并相应更新 URL 的函数。它会处理前缀规则，根据配置决定是否将语言环境添加到路径中。利用 `next/navigation` 中的 `useRouter` 来执行导航功能，如 `push` 和 `refresh`。
- **`pathWithoutLocale`**：一个计算属性，返回不包含语言环境的路径。它对于比较 URL 非常有用。例如，如果当前语言环境是 `fr`，且 URL 是 `fr/my_path`，则不含语言环境的路径为 `/my_path`。利用 `next/navigation` 中的 `usePathname` 获取当前路径。

## 结论

`next-intlayer` 的 `useLocale` 钩子是管理 Next.js 应用中多语言环境的关键工具。它通过无缝处理语言环境存储、状态管理和 URL 修改，提供了一种集成的方法来适配多语言应用。
