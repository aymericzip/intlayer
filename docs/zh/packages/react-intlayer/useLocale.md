# React 集成：`useLocale` 钩子文档

本节提供了关于 `react-intlayer` 库中的 `useLocale` 钩子的全面详细信息，该库专为在 React 应用程序中处理语言环境管理而设计。

## 在 React 中导入 `useLocale`

要将 `useLocale` 钩子集成到您的 React 应用程序中，请从其相应的包中导入：

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

`useLocale` 钩子提供了一种简单的方法来访问和操作 React 组件中的语言环境设置。它提供对当前语言环境、默认语言环境、所有可用语言环境以及更新语言环境设置的功能的访问。

## 用法

以下是如何在 React 组件中使用 `useLocale` 钩子：

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

当您调用 `useLocale` 钩子时，它返回一个包含以下属性的对象：

- **`locale`**: 在 React 上下文中设置的当前语言环境。
- **`defaultLocale`**: 配置中定义的主要语言环境。
- **`availableLocales`**: 配置中定义的所有可用语言环境的列表。
- **`setLocale`**: 用于更新应用程序上下文中当前语言环境的函数。

## 示例

此示例展示了一个使用 `useLocale` 钩子的组件，用于渲染一个语言环境切换器，允许用户动态更改应用程序的语言环境：

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

`react-intlayer` 的 `useLocale` 钩子是管理 React 应用程序中语言环境的基本工具，提供了有效适应各种国际受众所需的功能。
