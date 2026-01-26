---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer 包 文档
description: Intlayer 的核心包，为国际化提供基础函数和类型，用于多语言内容管理。
keywords:
  - intlayer
  - core
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 为所有导出统一文档
---

# intlayer 包

`intlayer` 包是 Intlayer 生态系统的核心库。它为在 JavaScript 和 TypeScript 应用中管理多语言内容提供了必要的函数、类型和实用工具。

## 安装

```bash
npm install intlayer
```

## 导出

### 配置

导入：

```tsx
import "intlayer";
```

| 变量               | 类型                   | 说明                                                         | 相关文档                                                                                                                |
| ------------------ | ---------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Intlayer 的配置对象。                                        | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | 返回 Intlayer 配置对象。(**已弃用**：请改用 `configuration`) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | 所有受支持的 locales 列表。                                  | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | 所有必需的 locales 列表。                                    | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | 默认语言/区域设置。                                          | -                                                                                                                       |

### 类型

导入：

```tsx
import "intlayer";
```

| 类型                  | 描述                                   |
| --------------------- | -------------------------------------- |
| `Dictionary`          | 用于定义字典结构的字典类型。           |
| `DeclarationContent`  | （**已弃用**）请改用 `Dictionary<T>`。 |
| `IntlayerConfig`      | 定义 Intlayer 配置的类型。             |
| `ContentNode`         | 字典内容中的节点。                     |
| `Locale`              | 表示 locale 的类型。                   |
| `LocalesValues`       | locale 的可能取值。                    |
| `StrictModeLocaleMap` | 具有严格类型检查的 locale 映射。       |

### 内容函数

导入：

```tsx
import "intlayer";
```

| 函数                     | 类型       | 描述                                                               | 相关文档                                                                                           |
| ------------------------ | ---------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | 根据当前 locale（语言环境）选择内容。                              | [翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)    |
| `enu` / `getEnumeration` | `Function` | 根据数量选择内容。                                                 | [枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)    |
| `cond` / `getCondition`  | `Function` | 根据布尔条件选择内容。                                             | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/condition.md) |
| `gender`                 | `Function` | 根据性别选择内容。                                                 | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)       |
| `insert`                 | `Function` | 将值插入到内容字符串中。                                           | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md) |
| `nest` / `getNesting`    | `Function` | 嵌套另一个字典。                                                   | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nesting.md)     |
| `md`                     | `Function` | 处理 Markdown 内容。                                               | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)   |
| `html`                   | `Function` | 处理 HTML 内容。                                                   | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/html.md)           |
| `file`                   | `Function` | 处理文件内容。                                                     | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file.md)           |
| `getDictionary`          | `Function` | 处理类似字典的对象（key, content）。它处理 `t()` 翻译、枚举等。    | -                                                                                                  |
| `getIntlayer`            | `Function` | 基于 `getDictionary`，但会注入从生成的声明中得到的优化版本的字典。 | -                                                                                                  |

### 本地化实用工具

导入：

```tsx
import "intlayer";
```

| 函数                   | 类型       | 描述                             | 相关文档                                                                                                                        |
| ---------------------- | ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | 从字符串或路径检测 locale。      | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | 获取 locale 的语言部分。         | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | 获取 locale 的显示名称。         | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | 将规范路径解析为本地化路径。     | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | 将本地化路径解析为规范路径。     | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | 生成本地化的 URL。               | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | 为所有受支持的 locale 生成 URL。 | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | 从路径中移除 locale 前缀。       | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | 从路径获取 locale 前缀。         | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | 获取文本方向（LTR/RTL）。        | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | 验证区域设置前缀。               | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/validatePrefix.md)             |

### 浏览器工具

导入：

```tsx
import "intlayer";
```

| 函数                   | 类型       | 描述                       |
| ---------------------- | ---------- | -------------------------- |
| `getBrowserLocale`     | `Function` | 检测浏览器的首选区域设置。 |
| `getCookie`            | `Function` | 检索 cookie 值。           |
| `getLocaleFromStorage` | `Function` | 从存储中检索区域设置。     |
| `setLocaleInStorage`   | `Function` | 将区域设置保存到存储中。   |

### 格式化器

导入：

```tsx
import "intlayer";
```

| 函数           | 描述                   |
| -------------- | ---------------------- |
| `number`       | 格式化数字。           |
| `currency`     | 格式化货币值。         |
| `percentage`   | 格式化百分比。         |
| `compact`      | 以简短形式格式化数字。 |
| `date`         | 格式化日期。           |
| `relativeTime` | 格式化相对时间。       |
| `units`        | 格式化带单位的数值。   |
| `Intl`         | 标准 Intl 对象。       |
