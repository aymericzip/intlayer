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
    changes: 添加了 vue 格式化器
  - version: 5.8.0
    date: 2025-08-18
    changes: 添加了格式化器文档
  - version: 5.8.0
    date: 2025-08-20
    changes: 添加列表格式化器文档
  - version: 5.8.0
    date: 2025-08-20
    changes: 添加额外的 Intl 工具（DisplayNames、Collator、PluralRules）
  - version: 5.8.0
    date: 2025-08-20
    changes: 添加语言环境工具（getLocaleName、getLocaleLang、getLocaleFromPath 等）
  - version: 5.8.0
    date: 2025-08-20
    changes: 添加内容处理工具（getContent、getTranslation、getIntlayer 等）
---

# Intlayer 格式化工具

## 概述

Intlayer 提供了一组基于原生 `Intl` API 构建的轻量级辅助工具，以及一个缓存的 `Intl` 包装器，避免重复构建重量级的格式化器。这些工具完全支持本地化，可以直接从主 `intlayer` 包中使用。

### 导入

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

如果您使用 React，也可以使用 hooks；请参见 `react-intlayer/format`。

## 缓存的 Intl

导出的 `Intl` 是对全局 `Intl` 的一个轻量级缓存包装器。它会缓存 `NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat`、`ListFormat`、`DisplayNames`、`Collator` 和 `PluralRules` 的实例，从而避免重复构建相同的格式化器。

由于格式化器的构建相对昂贵，这种缓存机制在不改变行为的情况下提升了性能。该包装器暴露了与原生 `Intl` 相同的 API，因此用法完全一致。

- 缓存是按进程进行的，对调用者透明。

> 如果环境中不支持 `Intl.DisplayNames`，则只会打印一次仅限开发者的警告（建议使用 polyfill）。

示例：

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

// 用于排序的比较器
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0（相等）

// 复数规则
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## 额外的 Intl 工具

除了格式化辅助工具外，您还可以直接使用缓存的 Intl 包装器来使用其他 Intl 功能：

### `Intl.DisplayNames`

用于获取语言、地区、货币和书写系统的本地化名称：

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

用于基于区域设置的字符串比较和排序：

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

用于确定不同区域设置中的复数形式：

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## 区域设置工具

### `getLocaleName(displayLocale, targetLocale?)`

获取某个区域设置在另一种区域设置中的本地化名称：

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: 要获取名称的语言环境
- **targetLocale**: 用于显示名称的语言环境（默认为 displayLocale）

### `getLocaleLang(locale?)`

从语言环境字符串中提取语言代码：

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: 要提取语言代码的语言环境（默认为当前语言环境）

### `getLocaleFromPath(inputUrl)`

从 URL 或路径名中提取语言环境段：

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en"（默认语言环境）
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**：要处理的完整 URL 字符串或路径名
- **returns**：检测到的语言环境，如果未找到语言环境则返回默认语言环境

### `getPathWithoutLocale(inputUrl, locales?)`

从 URL 或路径名中移除语言环境段：

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**：要处理的完整 URL 字符串或路径名
- **locales**：可选的支持语言数组（默认为配置的语言）
- **returns**：去除语言段后的 URL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

为当前语言生成本地化 URL：

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**：要本地化的原始 URL
- **currentLocale**：当前语言
- **locales**：可选的支持语言数组（默认为配置的语言）
- **defaultLocale**：可选的默认语言环境（默认为配置的默认语言环境）
- **prefixDefault**：是否为默认语言环境添加前缀（默认为配置值）

### `getHTMLTextDir(locale?)`

返回指定语言环境的文本方向：

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**：要获取文本方向的语言环境（默认为当前语言环境）
- **returns**：返回 `"ltr"`、`"rtl"` 或 `"auto"`

## 内容处理工具

### `getContent(node, nodeProps, locale?)`

使用所有可用插件（翻译、枚举、插入等）转换内容节点：

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**：要转换的内容节点
- **nodeProps**：转换上下文的属性
- **locale**：可选的语言环境（默认为配置的默认语言环境）

### `getTranslation(languageContent, locale?, fallback?)`

从语言内容对象中提取特定语言环境的内容：

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**：映射语言环境到内容的对象
- **locale**：目标语言环境（默认为配置的默认语言环境）
- **fallback**：是否回退到默认语言环境（默认为 true）

### `getIntlayer(dictionaryKey, locale?, plugins?)`

通过键检索并转换字典中的内容：

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**：要检索的字典键
- **locale**：可选的语言环境（默认为配置的默认语言环境）
- **plugins**：可选的自定义转换插件数组

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

异步从远程字典中检索内容：

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**：要检索的字典键
- **locale**：可选的语言环境（默认为配置的默认语言环境）
- **plugins**：可选的自定义转换插件数组

## 格式化工具

以下所有辅助函数均从 `intlayer` 导出。

### `number(value, options?)`

使用基于区域设置的分组和小数格式化数字值。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

示例：

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789"（在 en-US 中）
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

将数字格式化为百分比字符串。

行为：大于 1 的值被解释为完整的百分比并进行归一化（例如，`25` → `25%`，`0.25` → `25%`）。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

示例：

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

将数值格式化为本地化货币。默认使用 `USD`，保留两位小数。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常用字段：`currency`（例如 `"EUR"`），`currencyDisplay`（`"symbol" | "code" | "name"`）

示例：

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

使用 `Intl.DateTimeFormat` 格式化日期/时间值。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` 或者以下预设之一：
  - 预设值: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

示例：

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 例如，"08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

使用 `Intl.RelativeTimeFormat` 格式化两个时间点之间的相对时间。

- 传入 "now" 作为第一个参数，目标时间作为第二个参数，可以获得自然的表达方式。
- **from**: `Date | string | number`
- **to**: `Date | string | number`（默认为 `new Date()`）
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - 默认 `unit` 为 `"second"`。

示例：

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

使用 `Intl.NumberFormat` 的 `style: 'unit'` 将数值格式化为本地化的单位字符串。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常用字段：`unit`（例如 `"kilometer"`，`"byte"`），`unitDisplay`（`"short" | "narrow" | "long"`）
  - 默认值：`unit: 'day'`，`unitDisplay: 'short'`，`useGrouping: false`

示例：

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（依赖于区域设置）
```

### `compact(value, options?)`

使用紧凑表示法格式化数字（例如，`1.2K`，`1M`）。

- **value**：`number | string`
- **options**：`Intl.NumberFormatOptions & { locale?: LocalesValues }`（内部使用 `notation: 'compact'`）

示例：

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

使用 `Intl.ListFormat` 将值数组格式化为本地化的列表字符串。

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - 常用字段：`type`（`"conjunction" | "disjunction" | "unit"`），`style`（`"long" | "short" | "narrow"`）
  - 默认值：`type: 'conjunction'`，`style: 'long'`

示例：

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## 说明

- 所有辅助函数都接受 `string` 类型的输入；它们会在内部被强制转换为数字或日期。
- 如果未提供，区域设置默认使用您配置的 `internationalization.defaultLocale`。
- 这些工具是轻量封装；对于高级格式化，请直接传递标准的 `Intl` 选项。

## 入口点和重新导出（`@index.ts`）

格式化函数位于核心包中，并从更高级的包中重新导出，以保持跨运行时的导入简洁：

示例：

```ts
// 应用代码（推荐）
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

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

服务器组件（或 React 服务器运行时）：

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
} from "react-intlayer/server/format";
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
} from "next-intlayer/server/format";
```

> 这些钩子将会从 `IntlayerProvider` 或 `IntlayerServerProvider` 中获取语言环境

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

> 这些组合式函数将会使用注入的 `IntlayerProvider` 中的语言环境
