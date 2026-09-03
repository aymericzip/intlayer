---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "使用 Intl 针对不同语言环境格式化日期和数字"
description: 你很可能不需要单独引入格式化库。深入解析 Intl 如何处理各语言环境下的日期、数字、货币和列表，实例缓存的开销，以及只在生产环境爆发的时区 Bug。
keywords:
  - 按语言环境格式化日期
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - 语言环境货币格式
  - 相对时间格式化
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# 使用 Intl 针对不同语言环境格式化日期和数字

翻译文本只是国际化（i18n）肉眼可见的一半。产生大量缺陷工单的另一半往往是格式化：德国用户看到的数字是 `1,234.56` 而不是标准的 `1.234,56`；日本用户把 `08/02/2026` 误以为是 8 月；或者同一个日期在服务端与客户端渲染结果不一致，导致 React 发生注水错误（Hydration mismatch）而白屏。

这些场景统统不需要引入第三方库。现代 JavaScript 运行时已经原生内置了 `Intl` API。

## 目录

<TOC/>

## 第一步：删掉你手写的手工日期辅助函数

几乎每个老项目的代码库里，都藏着在考虑国际化之前写的 `formatDate` 函数。它硬编码了字段顺序、分隔符，甚至把英文月份名写死在代码中。

```ts
// 应该彻底删掉的代码：
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` 可以完美取而代之，且在所有语言环境下都能正确解析：

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

数字处理也是同样道理。调用 `toFixed(2)` 在任何环境下都会生成 `1234.56`，这在欧洲大部分地区都是不符合书写习惯的。

## `Intl` 涵盖的功能全貌

| API                       | 适用场景                                                 |
| :------------------------ | :------------------------------------------------------- |
| `Intl.DateTimeFormat`     | 日期与时间，支持 `dateStyle` / `timeStyle` 预设风格      |
| `Intl.NumberFormat`       | 小数、货币、百分比、物理单位、紧凑记数法                 |
| `Intl.RelativeTimeFormat` | "3 天前"、"2 小时后" 等相对时间表达                      |
| `Intl.ListFormat`         | 语言学列表拼接（如中文的“A、B 和 C”，法文的“a, b et c”） |
| `Intl.PluralRules`        | 确定数字对应的复数分类规则                               |
| `Intl.Collator`           | 遵循特定语言规则的正确字符串排序                         |

`Intl.Collator` 是常常被开发者遗漏的工具。对字符串直接调用 `array.sort()` 依据的是 Unicode 码点顺序，这会导致带声调或重音的字符排到 `z` 之后，瑞典语的 `ö` 也会排在错误的位置。只要是给用户看的可视化列表，都应当使用 collator 排序。

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("zh").compare);
// ["apple", "édouard", "zebra"]
```

## 优先选用预设模式，而非手工拼接选项

`dateStyle` 与 `timeStyle` 允许各语言环境根据其文化规范自动决定展示顺序与分隔符。逐个指定 `year`、`month` 和 `day` 会赋予你多余的控制权，但这往往是有害的，因为不同地区的习惯顺序大相径庭，这样做无异于用开发者的个人猜测去覆盖 CLDR 的权威数据。

```ts
// 由语言环境决定排版布局：
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// 手工强制指定结构，在其他地区很可能出现格式错误：
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

仅在视觉设计上有极其严苛的固定宽度要求（例如紧凑的数据表格列）时，才考虑显式指定各个字段分量。

## 构造格式化实例的开销不可忽视

这是一个直接影响性能的关键细节。初始化一个 `Intl.NumberFormat` 需要加载庞大的语言环境数据，其耗时远远高于后续调用 `.format()` 的耗时。若在长列表渲染循环中针对每一行数据都新建一次格式化实例，会导致非常明显的性能卡顿。

```ts
// 每一行都重新创建实例（低效）：
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// 创建一次并重复复用（高效）：
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` 和 `toLocaleString()` 内部暗藏完全相同的性能陷阱：每次调用都在底层构造新的格式化实例。对于单个独立数值无伤大雅，但绝不适用于数组或列表遍历。

应基于语言环境和选项组合对其进行缓存：

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## 只在生产环境现身的时区 Bug

这个陷阱曾经耗费无数开发者一整个下午的时间。服务端通过 SSR 生成了日期字符串，浏览器端接管并进行注水（hydration），此时 React 抛出注水不匹配错误并崩溃，原因是两端生成的日期文字并不一致。

其根源在于：如果没有显式声明时区，`Intl.DateTimeFormat` 会默认抓取宿主操作系统的当前时区。生产环境的容器通常运行在 UTC 时区下，而开发者的本地开发机则处于本地时区（如 UTC+8）。这使得 Bug 在本地开发时毫无踪迹，却在上线后必定爆发。

```ts
// 服务端（UTC）与客户端浏览器（UTC+8）输出不同，注水崩溃：
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// 显式锁定时区，双端输出绝对一致：
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

三种可行的工程化方案：

- **服务端强锁固定时区**并显式透传。确定性高且稳定，但所有用户看到的都是 UTC 时间。
- **纯客户端渲染日期**，在服务端直出时展示统一的骨架占位符。能精准对应用户本地时间，但存在轻微视觉闪烁。
- **采集并记录用户所在时区**，在服务端与客户端同步注入。体验最佳，但需要额外的数据流维护成本。

无论选择哪种方式，只要日期同时由服务端与客户端渲染，就必须显式传入 `timeZone`。未明确指定时区的日期，本质上就是一个包含两个不同输出值的隐形炸弹。

## 货币需要的是货币代码，而不是语言环境

语言环境与货币是两个正交的概念。`fr-FR` 并不代表计价单位一定是欧元：法国用户完全可能正在查阅一份以美元结算的账单。

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

语言环境决定的是千分位分隔符、数字分节以及货币符号的摆放位置。货币本身应来源于业务数据。从语言环境直接臆断货币，属于会直接引发财务核算错误的严重缺陷。

此外，建议关注 `currencyDisplay` 属性。在存在多种使用美元符号（$）的币种共存的场景下，将其设为 `"code"` 可以彻底消除美元、加元与澳元之间的歧义。

## 相对时间比绝对时间更具可读性

对于近期发生的操作，“2 小时前”远比冗长的时间戳直观得多，而 `Intl.RelativeTimeFormat` 原生支持精准的本地化转换。

```ts
new Intl.RelativeTimeFormat("zh", { numeric: "auto" }).format(-1, "day");
// "昨天"
```

指定 `numeric: "auto"` 可以得到“昨天”而不是生硬的“1 天前”。

## Intlayer 提供的增强能力

Intlayer 将上述底层 API 封装成了内置缓存的轻量工具函数，省去了手动维护 Map 缓存的繁琐操作，并且会自动将当前激活的语言环境作为默认值注入，无需在每个调用点重复传递。

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1,234.5"
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 小时前"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 公里"
compact(1200); // "1.2千"
list(["苹果", "香蕉", "橙子"]); // "苹果、香蕉和橙子"
```

`date()` 函数同样支持常用预设（`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`），常规场景无需编写繁琐的配置对象。对于 React 和 Vue，Intlayer 还提供了对应的 hooks 与 composables，自动从上下文解析当前语言。

其底层完全基于标准的 `Intl` 实现，属于优雅的缓存与上下文解析封装。详细的方法签名可查阅 [格式化工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

## 常见错误

- **调用 `toLocaleDateString()` 时未传语言环境。** 默认采用宿主环境设定，在服务端易受容器环境漂移影响。
- **在遍历循环中反复构造实例。** 实例初始化的开销远高于格式化本身，务必复用。
- **同构渲染日期遗漏 `timeZone` 声明。** 导致本地无法复现的注水匹配失败。
- **通过语言环境推测货币。** `fr-FR` 不等同于必须展示为欧元。
- **对用户可见文字直接使用普通 `sort()`。** 请始终采用 `Intl.Collator`。
- **在源码中硬编码月份或星期。** CLDR 已完整内置各语言的权威名称。
- **相对时间保留 `numeric: "always"`。** 会导致本该说“昨天”的地方机械地输出“1 天前”。

## 深入阅读

- [格式化工具与语言环境实用函数：`number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)
- [配置参考指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [跨框架性能基准报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [react-intl 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)
- [ICU 消息格式：复数、分支选择与数字骨架](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)
- [国际化测试策略：覆盖格式化与复数分支](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_testing_strategies.md)
- [国际化真正涵盖的核心范畴](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/what_is_internationalization.md)
