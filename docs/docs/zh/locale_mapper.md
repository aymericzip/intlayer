---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: 本地化映射器
description: 了解本地化映射器的工作原理。查看本地化映射器在您的应用程序中使用的步骤。了解不同包的功能。
keywords:
  - 本地化映射器
  - 入门
  - Intlayer
  - 应用程序
  - 包
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: 添加了区域映射器文档
---

# 本地化映射器

本地化映射器是一个强大的工具，帮助您在 Intlayer 应用程序中处理国际化数据。它提供了三个主要功能，用于转换和组织特定于语言环境的数据：`localeMap`、`localeFlatMap` 和 `localeRecord`。

## 本地化映射器的工作原理

本地化映射器基于一个 `LocaleData` 对象，该对象包含有关语言环境的所有必要信息：

```typescript
type LocaleData = {
  locale: LocalesValues; // 当前语言环境代码（例如，'en'，'fr'）
  defaultLocale: LocalesValues; // 默认语言环境代码
  isDefault: boolean; // 是否为默认语言环境
  locales: LocalesValues[]; // 所有可用语言环境的数组
  urlPrefix: string; // 该语言环境的 URL 前缀（例如，'/fr' 或 ''）
};
```

映射函数会自动为配置中的每个语言环境生成这些数据，考虑到：

- 您配置的语言环境列表
- 默认语言环境设置
- 是否应在 URL 中为默认语言环境添加前缀

## 核心函数

### `localeMap`

使用映射函数将每个语言环境转换为单个对象。

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**示例：创建路由对象**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// 结果：
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

类似于 `localeMap`，但映射函数返回一个对象数组，这些数组会被展平成一个单一数组。

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**示例：为每个语言创建多个路由**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// 结果：
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

创建一个记录对象，其中每个 locale 是一个键，映射到由映射函数转换的值。

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**示例：加载翻译文件**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// 结果:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## 设置 Locale Mapper

Locale Mapper 会自动使用你的 Intlayer 配置，但你可以通过传递参数来覆盖默认设置：

### 使用默认配置

```typescript
import { localeMap } from "intlayer";

// 使用 intlayer.config.ts 中的配置
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### 覆盖配置

```typescript
import { localeMap } from "intlayer";

// 覆盖 locales 和默认 locale
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // 自定义语言环境
  "en", // 自定义默认语言环境
  true // 在 URL 中为默认语言环境添加前缀
);
```

## 高级用法示例

### 创建导航菜单

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(), // 标签显示为大写的语言代码
  href: data.urlPrefix || "/", // 链接地址，默认根路径
  isActive: data.isDefault, // 是否为默认语言
  flag: `/flags/${data.locale}.svg`, // 语言对应的国旗图标路径
}));
```

### 生成网站地图数据

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(), // 最后修改时间
    changefreq: "daily", // 更新频率为每日
    priority: data.isDefault ? 1.0 : 0.8, // 优先级，默认语言为1.0，其他为0.8
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### 动态加载翻译

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // 右到左语言方向判断
  },
}));
```

## 配置集成

Locale Mapper 无缝集成到您的 Intlayer 配置中：

- **Locales（语言环境）**：自动使用 `configuration.internationalization.locales`
- **默认语言环境**：使用 `configuration.internationalization.defaultLocale`
- **URL 前缀**：遵循 `configuration.middleware.prefixDefault`

这确保了您的应用程序的一致性，并减少了配置重复。
