---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale Hook 文档 | react-intlayer
description: 查看如何使用 react-intlayer 包中的 useLocale hook
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

# React 集成：`useLocale` Hook 文档

本节详细介绍了来自 `react-intlayer` 库的 `useLocale` hook，专为在 React 应用中处理语言环境管理而设计。

## 在 React 中导入 `useLocale`

要将 `useLocale` hook 集成到您的 React 应用中，请从相应的包中导入它：

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // 在 React 组件中用于语言环境管理
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // 在 React 组件中用于语言环境管理
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // 在 React 组件中用于语言环境管理
```

## 概述

`useLocale` hook 提供了一种简便的方法来访问和操作 React 组件中的语言环境设置。它可以访问当前语言环境、默认语言环境、所有可用语言环境，以及用于更新语言环境设置的函数。

## 用法

以下是在 React 组件中使用 `useLocale` hook 的示例：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## 参数和返回值

当你调用 `useLocale` 钩子时，它会返回一个包含以下属性的对象：

- **`locale`**：当前在 React 上下文中设置的语言环境。
- **`defaultLocale`**：配置中定义的主要语言环境。
- **`availableLocales`**：配置中定义的所有可用语言环境列表。
- **`setLocale`**：一个用于更新应用程序上下文中当前语言环境的函数。

## 示例

以下示例展示了一个使用 `useLocale` 钩子的组件，用于渲染语言切换器，允许用户动态更改应用程序的语言环境：

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## 结论

来自 `react-intlayer` 的 `useLocale` 钩子是管理 React 应用中语言环境的关键工具，提供了适应各种国际受众所需的功能。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
