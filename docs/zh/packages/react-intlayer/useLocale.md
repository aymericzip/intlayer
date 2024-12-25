# React 集成: `useLocale` 钩子文档

本节提供了 `react-intlayer` 库的 `useLocale` 钩子的综合细节，旨在处理 React 应用中的区域设置管理。

## 在 React 中导入 `useLocale`

要将 `useLocale` 钩子集成到您的 React 应用中，请从其相应的包中导入：

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // 用于在 React 组件中管理区域设置
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // 用于在 React 组件中管理区域设置
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // 用于在 React 组件中管理区域设置
```

## 概述

`useLocale` 钩子提供了一种简单的方法来访问和操作 React 组件中的区域设置。它提供对当前区域设置、默认区域设置、所有可用区域设置的访问以及更新区域设置的函数。

## 使用方法

以下是如何在 React 组件中使用 `useLocale` 钩子：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>当前区域: {locale}</h1>
      <p>默认区域: {defaultLocale}</p>
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
      <h1>当前区域: {locale}</h1>
      <p>默认区域: {defaultLocale}</p>
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
      <h1>当前区域: {locale}</h1>
      <p>默认区域: {defaultLocale}</p>
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

- **`locale`**: 当前在 React 上下文中设置的区域。
- **`defaultLocale`**: 在配置中定义的主要区域。
- **`availableLocales`**: 在配置中定义的所有可用区域的列表。
- **`setLocale`**: 在应用程序的上下文中更新当前区域的函数。

## 示例

此示例显示了一个组件，使用 `useLocale` 钩子来呈现区域选择器，允许用户动态更改应用程序的区域：

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

`react-intlayer` 的 `useLocale` 钩子是管理您在 React 应用中的区域设置的重要工具，提供了有效适应各种国际受众所需的功能。
