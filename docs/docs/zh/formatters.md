---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: 格式化工具
description: 基于 Intl 的本地化格式化工具，支持数字、百分比、货币、日期、相对时间、单位和紧凑表示法。包含缓存的 Intl 辅助工具。
keywords:
  - 格式化工具
  - Intl
  - 数字
  - 货币
  - 百分比
  - 日期
  - 相对时间
  - 单位
  - 紧凑
  - 列表
  - 国际化
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "添加了 vue 格式化器"
  - version: 5.8.0
    date: 2025-08-18
    changes: "添加了格式化器文档"
  - version: 5.8.0
    date: 2025-08-20
    changes: "添加列表格式化器文档"
  - version: 5.8.0
    date: 2025-08-20
    changes: "添加额外的 Intl 工具（DisplayNames、Collator、PluralRules）"
  - version: 5.8.0
    date: 2025-08-20
    changes: "添加语言环境工具（getLocaleName、getLocaleLang、getLocaleFromPath 等）"
  - version: 5.8.0
    date: 2025-08-20
    changes: "添加内容处理工具（getContent、getTranslation、getIntlayer 等）"
author: aymericzip
---

# Intlayer 格式化工具

## 概述

Intlayer 提供了一组基于原生 `Intl` API 构建的轻量级辅助工具，以及一个缓存的 `Intl` 包装器，避免重复构建重量级的格式化器。这些工具完全支持本地化，可以直接从主 `intlayer` 包中使用。

## 缓存的 Intl

由于格式化器的构建相对昂贵，这种缓存机制在不改变行为的情况下提升了性能。该包装器暴露了与原生 `Intl` 相同的 API，因此用法完全一致。

> 如果环境中不支持 `Intl.DisplayNames`，则只会打印一次仅限开发者的警告（建议使用 polyfill）。

示例：

## 区域设置工具

### `getLocaleLang(locale?)`

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

### `getLocaleFromPath(inputUrl)`

从 URL 或路径名中提取语言环境段：

- **inputUrl**：要处理的完整 URL 字符串或路径名
- **returns**：检测到的语言环境，如果未找到语言环境则返回默认语言环境

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

### `getHTMLTextDir(locale?)`

返回指定语言环境的文本方向：

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## 内容处理工具

### `getContent(node, nodeProps, locale?)`

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

从语言内容对象中提取特定语言环境的内容：

- **languageContent**：映射语言环境到内容的对象
- **locale**：目标语言环境（默认为配置的默认语言环境）
- **fallback**：是否回退到默认语言环境（默认为 true）

### `getIntlayer(dictionaryKey, locale?, plugins?)`

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

异步从远程字典中检索内容：

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

## 格式化工具

以下所有辅助函数均从 `intlayer` 导出。

### `percentage(value, options?)`

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### 格式化器函数

#### `number(value, options?)`

使用locale感知的分组和小数格式化数值。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

将数字格式化为百分比字符串。大于 1 的值会被规范化（例如，`25` → `25%`，`0.25` → `25%`）。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

将值格式化为本地化货币。默认为 `USD`。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常见: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

格式化日期/时间值。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` 或预设: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // 例如 "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

格式化两个时刻之间的相对时间。

- **from**: `Date | string | number`
- **to**: `Date | string | number` (默认值为 `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

使用单位格式化数值。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常见: `unit` (例如, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

使用紧凑记号法格式化数字。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

将数组格式化为本地化列表字符串。

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - 常见: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## 缓存的 Intl

从 `intlayer` 导出的 `Intl` 是围绕全局 `Intl` 的缓存包装器。它会缓存格式化程序实例（`NumberFormat`、`DateTimeFormat` 等），以避免重复构造它们，从而提高性能。

```ts
import { Intl } from "intlayer";

// 数字格式化
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// 语言、地区等的显示名称
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// 用于排序的排序规则
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (相等)

// 复数规则
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### 额外的 Intl 功能

#### `Intl.DisplayNames`

用于获取本地化的语言、地区、货币和脚本名称：

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

用于区域感知的字符串比较和排序：

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

用于在不同的 locales 中确定复数形式：

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## 语言环境工具函数

### `date(date, optionsOrPreset?)`

使用 `Intl.DateTimeFormat` 格式化日期/时间值。

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 例如，"08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `units(value, options?)`

使用 `Intl.NumberFormat` 的 `style: 'unit'` 将数值格式化为本地化的单位字符串。

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（依赖于区域设置）
```

### `compact(value, options?)`

示例：

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

使用 `Intl.ListFormat` 将值数组格式化为本地化的列表字符串。

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### `getPathWithoutLocale(inputUrl, locales?)`

从 URL 中移除语言区域段：

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### `getHTMLTextDir(locale?)`

返回一个 locale 的文本方向：

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## 内容处理工具

### React

客户端组件：

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// 或在 Next.js 应用中
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### `getTranslation(languageContent, locale?, fallback?)`

为特定语言环境提取内容：

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { zh: "你好", en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

### Vue

客户端组件：

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

## 注意事项

- 所有辅助函数接受 `string` 输入；它们在内部被强制转换为数字或日期。
- 如果未提供 locale，则默认为你配置的 `internationalization.defaultLocale`。
- 这些实用程序是薄包装器；对于高级格式化，请传递标准 `Intl` 选项。
