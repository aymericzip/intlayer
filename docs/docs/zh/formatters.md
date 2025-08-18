---
createdAt: 2024-08-13
updatedAt: 2025-08-18
title: 格式化工具
description: 基于 Intl 的本地化格式化工具，用于数字、百分比、货币、日期、相对时间、单位和紧凑表示。包含缓存的 Intl 辅助工具。
keywords:
  - 格式化工具
  - Intl
  - 数字
  - 货币
  - 百分比
  - 日期
  - 相对时间
  - 单位
  - 紧凑表示
  - 国际化
slugs:
  - doc
  - formatters
---

# Intlayer 格式化工具

## 概述

Intlayer 提供了一组基于原生 `Intl` API 构建的轻量级辅助工具，以及一个缓存的 `Intl` 包装器，以避免重复构造重量级的格式化器。这些工具完全支持本地化，可直接从主 `intlayer` 包中使用。

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
} from "intlayer";
```

如果您使用 React，也提供了 hooks；请参见 `react-intlayer/format`。

## 缓存的 Intl

导出的 `Intl` 是对全局 `Intl` 的一个轻量缓存包装器。它会缓存 `NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat` 的实例，避免重复构建相同的格式化器。

由于格式化器的构造相对昂贵，这种缓存机制在不改变行为的前提下提升了性能。该包装器暴露与原生 `Intl` 相同的 API，因此用法完全一致。

- 缓存是按进程进行的，对调用者透明。

> 如果环境中不支持 `Intl.DisplayNames`，则会打印一次仅限开发环境的警告（建议使用 polyfill）。

示例：

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## 格式化器

以下所有辅助函数均从 `intlayer` 导出。

### `number(value, options?)`

使用基于区域设置的分组和小数格式化数字值。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

示例：

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789"（在 en-US 中）
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

将数字格式化为百分比字符串。

行为：大于1的值被解释为完整的百分比并进行归一化（例如，`25` → `25%`，`0.25` → `25%`）。

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

将值格式化为本地化货币。默认使用带有两位小数的 `USD`。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常用字段：`currency`（例如 `"EUR"`），`currencyDisplay`（`"symbol" | "code" | "name"`）

示例：

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

使用 `Intl.DateTimeFormat` 格式化日期/时间值。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` 或预设之一：
  - 预设值: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

示例：

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 例如 "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

使用 `Intl.RelativeTimeFormat` 格式化两个时间点之间的相对时间。

- 传入 "now" 作为第一个参数，目标时间作为第二个参数，以获得自然的表达方式。
- **from**: `Date | string | number`
- **to**: `Date | string | number`（默认为 `new Date()`）
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - 默认的 `unit` 是 `"second"`。

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

使用 `Intl.NumberFormat` 并设置 `style: 'unit'` 将数值格式化为本地化的单位字符串。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 常用字段：`unit`（例如 `"kilometer"`、`"byte"`），`unitDisplay`（`"short" | "narrow" | "long"`）
  - 默认值：`unit: 'day'`，`unitDisplay: 'short'`，`useGrouping: false`

示例：

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（依赖于区域设置）
```

### `compact(value, options?)`

使用紧凑表示法格式化数字（例如 `1.2K`，`1M`）。

- **value**: `number | string`
  /// **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`（底层使用 `notation: 'compact'`）

示例：

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## 说明

- 所有辅助函数均接受 `string` 类型输入；内部会强制转换为数字或日期。
- 如果未提供 locale，则默认使用您配置的 `internationalization.defaultLocale`。
- 这些工具是轻量封装；如需高级格式化，请直接传递标准的 `Intl` 选项。

## 入口点及重新导出（`@index.ts`）

格式化函数位于核心包中，并从更高级别的包中重新导出，以保持跨运行时的导入简洁：

示例：

```ts
// 应用代码（推荐）
import { number, currency, date, Intl } from "intlayer";
```

### React

客户端组件：

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// 或者在 Next.js 应用中
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

服务端组件（或 React 服务器运行时）：

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// 或者在 Next.js 应用中
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> 这些钩子会考虑来自 `IntlayerProvider` 或 `IntlayerServerProvider` 的 locale

## 文档历史

| 版本  | 日期       | 变更内容           |
| ----- | ---------- | ------------------ |
| 5.8.0 | 2025-08-18 | 添加格式化工具文档 |
