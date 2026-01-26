---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale Hook 文档 | solid-intlayer
description: 查看如何在 solid-intlayer 包中使用 useLocale Hook
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一所有导出项的文档
---

# useLocale Hook 文档

`useLocale` Hook 允许您在 Solid 应用中管理当前的语言环境。它提供对当前语言环境（作为 accessor）的访问、默认语言环境、可用语言列表，以及用于更新语言环境的函数。

## 用法

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## 描述

该 hook 返回一个包含以下属性的对象：

1. **locale**：一个 Solid accessor (`() => string`)，返回当前的 locale。
2. **defaultLocale**：在你的 `intlayer.config.ts` 中定义的默认 locale。
3. **availableLocales**：一个包含应用支持的所有 locale 的数组。
4. **setLocale**：用于更新应用 locale 的函数。如果启用，它还会处理持久化（cookies/本地存储）。

## 参数

- **props** (可选):
  - **onLocaleChange**: 一个在语言改变时调用的回调函数。
  - **isCookieEnabled**: 是否在 cookie 中持久化该 locale。
