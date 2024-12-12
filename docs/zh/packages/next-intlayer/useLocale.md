# Next.js 集成: `useLocale` 钩子文档 for `next-intlayer`

本节提供了为 `next-intlayer` 库中 Next.js 应用量身定制的 `useLocale` 钩子的详细文档。旨在高效处理区域设置更改和路由。

## 在 Next.js 中导入 `useLocale`

要在您的 Next.js 应用中使用 `useLocale` 钩子，请按如下方式导入：

```javascript
import { useLocale } from "next-intlayer"; // 用于管理 Next.js 中的区域设置和路由
```

## 使用

以下是在 Next.js 组件中实现 `useLocale` 钩子的方法：

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>当前区域设置: {locale}</h1>
      <p>默认区域设置: {defaultLocale}</p>
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

export default LocaleSwitcher;
```

## 参数和返回值

当您调用 `useLocale` 钩子时，它返回一个包含以下属性的对象：

- **`locale`**: 当前在 React 上下文中设置的区域设置。
- **`defaultLocale`**: 配置中定义的主要区域设置。
- **`availableLocales`**: 配置中定义的所有可用区域设置的列表。
- **`setLocale`**: 一种更改应用程序区域设置并相应更新 URL 的函数。根据配置处理是否将区域设置添加到路径的前缀规则。利用 `next/navigation` 中的 `useRouter` 进行导航功能，如 `push` 和 `refresh`。
- **`pathWithoutLocale`**: 一个计算属性，返回不带区域设置的路径。对于比较 URL 很有用。例如，如果当前区域设置为 `fr`，并且 URL 为 `fr/my_path`，则不带区域设置的路径为 `/my_path`。利用 `next/navigation` 中的 `usePathname` 获取当前路径。

## 结论

来自 `next-intlayer` 的 `useLocale` 钩子是管理 Next.js 应用中区域设置的重要工具。它提供了一种集成的方法，以通过无缝处理区域设置存储、状态管理和 URL 修改来使您的应用适应多种区域设置。
