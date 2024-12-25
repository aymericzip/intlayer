# Next.js 集成：`useLocale` 钩子文档 for `next-intlayer`

本节提供了针对 `next-intlayer` 库中 Next.js 应用程序的 `useLocale` 钩子的详细文档。它旨在高效处理区域设置更改和路由。

## 在 Next.js 中导入 `useLocale`

要在你的 Next.js 应用程序中使用 `useLocale` 钩子，请按如下所示导入：

```javascript
import { useLocale } from "next-intlayer"; // 用于管理 Next.js 中的区域设置和路由
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

当你调用 `useLocale` 钩子时，它返回一个包含以下属性的对象：

- **`locale`**: 在 React 上下文中设置的当前语言环境。
- **`defaultLocale`**: 在配置中定义的主语言环境。
- **`availableLocales`**: 在配置中定义的所有可用语言环境的列表。
- **`setLocale`**: 一个函数，用于改变应用程序的语言环境并相应更新 URL。它负责前缀规则，根据配置决定是否将语言环境添加到路径中。利用 `next/navigation` 中的 `useRouter` 进行导航功能，如 `push` 和 `refresh`。
- **`pathWithoutLocale`**: 计算属性，返回不带语言环境的路径。它在比较 URLs 时非常有用。例如，如果当前语言环境是 `fr`，并且 URL 是 `fr/my_path`，则不带语言环境的路径是 `/my_path`。利用 `next/navigation` 中的 `usePathname` 获取当前路径。

## 结论

`next-intlayer` 的 `useLocale` 钩子是管理 Next.js 应用程序中区域设置的重要工具。它提供了一种集成的方法，通过处理区域设置存储、状态管理和 URL 修改，轻松适应你的应用程序以支持多种语言环境。
