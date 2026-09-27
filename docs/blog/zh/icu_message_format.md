---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "ICU 消息格式：语法、复数与 Select 详解"
description: ICU MessageFormat 的实用参考指南，涵盖参数插值、复数与 select 分支、各种语言的 CLDR 复数类别以及开发中的常见陷阱。
keywords:
  - icu 消息格式
  - icu messageformat
  - cldr 复数规则
  - 复数类别
  - selectordinal
  - i18n 复数化
  - 消息语法
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU 消息格式：核心语法与常见误区

ICU MessageFormat 是一种字符串语法规范，允许翻译文本自带条件分支逻辑：复数处理、性别形式、数字与日期格式化等。它的核心理念在于：语法归翻译人员掌控，而非编写 `if (count === 1)` 的开发人员。本文将介绍该语法的基本构成、导致简单实现失效的语言特性，以及 JavaScript 生态系统对该标准的支持情况。

## 目录

<TOC/>

## 现实中的典型问题

几乎所有开发者最初编写的代码都是这样的：

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

这在英语中运行良好，但在其他几乎所有语言中都会出问题：

- **俄语和波兰语**需要三到四种形式，而不是两种。
- **中文和日语**只需要一种形式，并且用 `+ " "` 拼接出的半角空格显得多余且不自然。
- **阿拉伯语**需要六种形式，且数字本身通常需要按照当地数字系统渲染。
- **法语**在某些标点符号前需要添加不换行空格（non-breaking space），而单纯的 `+ " "` 会直接破坏排版规则。

更深层的问题在于句子被割裂成了碎片。翻译人员只能看到毫无上下文的 `item` 和 `items`，完全无法根据目标语言调整整个句子的语序。ICU MessageFormat 通过将整个句子保留在单个可翻译字符串中，并为翻译人员提供分支运算符来解决这一难题。

## 简单参数插值

最小的插值单元是用单大括号包裹的占位符：

```text
Hello, {name}!
```

格式化时传入 `{ name: "Alice" }`，即可得到 `Hello, Alice!`。大括号是唯一的特殊字符；如果要输出字面量大括号，可以用单引号包裹：`'{'`。

这就是插值功能的全部基础。ICU 的其余特性均在此基础上构建。

## 复数分支 (plural)

`plural` 依据传入的数值选择合适的分支：

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

需要掌握的三个要点：

- **`#`** 会被替换为经过当前语言环境格式化的 `count` 值。例如在 `en-US` 下，`1234` 会显示为 `1,234`。
- **`other` 分支是强制必需的。** 任何 ICU 解析库在缺失 `other` 时都会抛出错误或验证失败。它是没有任何匹配类别时的保底兜底分支。
- **`=0`、`=1` 等匹配精确数值**，且优先级高于 CLDR 类别。它们适用于表达特定文案（例如“没有未读消息”），而非用来替代 `one`。

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset 偏移量

`offset:n` 在进行分类匹配和 `#` 替换前先将数字减去 `n`。这适用于“Alice 和其他 3 位好友赞了此内容”这类场景：

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

当 `count` 为 4 时，`#` 会渲染为 `3`。`offset` 语法非常实用，但在部分运行环境中的支持程度参差不齐，建议在实际项目中验证后再重度依赖。

## 复数类别取决于目标语言

这是最容易被误解的部分。`zero`、`one`、`two`、`few`、`many`、`other` 这些分类名称并非适用于所有语言的固定规则。每种语言只会使用由 [CLDR 复数规则](https://cldr.unicode.org/index/cldr-spec/plural-rules) 定义的**子集**，并且这些规则是语法层面的，与直觉并不完全一致。

| 语言     | 语言标签 | 使用的类别                       | 类别数 |
| -------- | -------- | -------------------------------- | ------ |
| 中文     | `zh`     | other                            | 1      |
| 日语     | `ja`     | other                            | 1      |
| 英语     | `en`     | one, other                       | 2      |
| 德语     | `de`     | one, other                       | 2      |
| 法语     | `fr`     | one, many, other                 | 3      |
| 捷克语   | `cs`     | one, few, many, other            | 4      |
| 波兰语   | `pl`     | one, few, many, other            | 4      |
| 俄语     | `ru`     | one, few, many, other            | 4      |
| 阿拉伯语 | `ar`     | zero, one, two, few, many, other | 6      |
| 威尔士语 | `cy`     | zero, one, two, few, many, other | 6      |

两个经常令人意外的现象：

- **`one` 并不单纯代表数字 1。** 在俄语中，除了以 11 结尾的数字外，1、21、31、101 等以 1 结尾的数字都归入 `one`。在法语中，`0` 也会被归入 `one`。
- **在英语原文字符串中添加分支没有任何作用。** 英语消息只需要 `one` 和 `other`；而波兰语翻译则需要四个分支，这种分支结构理应存在于波兰语字符串中。任何强制所有语言共享相同键结构的框架都会在此受限。

无需额外安装任何库，即可在运行时直接测试语言行为：

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

现代浏览器和 Node.js 环境的 `Intl.PluralRules` 都内置了 CLDR 数据。绝大多数声称支持 CLDR 的开源库底层都在调用该原生 API。

## select 与 selectordinal

`select` 能够根据任意字符串进行条件分支，例如性别、用户角色、业务状态或会员等级。

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

键值进行严格匹配，这里的 `other` 同样是必选的。当句式结构取决于枚举值时，`select` 是最合适的工具，因为各语言在语法上受哪些枚举影响各不相同。

`selectordinal` 的形式与 `plural` 相同，但它遵循的是**序数词（如第 1、第 2）**规则，采用与基数词不同的规则表：

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

英语对基数词只使用两种分类，但对序数词使用了四种分类（1st、2nd、3rd、4th）。这种不对称性正是两个运算符必须独立设计的原因。

## 数字、日期与时间格式化

ICU 可以直接对被插值的内容进行格式转换：

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

目前更现代的方式是使用 ICU 60 引入的**骨架（skeleton）**语法，带有 `::` 前缀。骨架比传统的通用样式名更加灵活且表现力更强：

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

生态中对骨架语法的支持程度并不均衡。FormatJS 提供了完整支持，而部分运行时可能仅接受传统的 `number, currency` 或 `date, long`。在正式上线前，请确认你的运行时对此语法的支持情况。

## 嵌套与可读性平衡

ICU 具有极高的组合性。复数分支内可以包含 select，select 内部还可以再嵌套另一个复数：

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

这是 ICU 的经典示范，同时也是反对过度深度嵌套的有力反例。一旦超过两层嵌套，翻译人员很容易配错括号，TMS 编辑工具的辅助功能也会大打折扣。建议最多嵌套两层；若需要第三层，应拆分成两个独立的消息。

## JavaScript 库对 ICU 的支持现状

| 开源库                | ICU 支持程度        | 实际编写方式                                                        |
| --------------------- | ------------------- | ------------------------------------------------------------------- |
| react-intl (FormatJS) | 原生完全支持        | 完整 ICU 字符串，包含骨架和富文本标签                               |
| next-intl             | 原生支持            | 基于 FormatJS 的 `intl-messageformat` 解析 ICU 字符串               |
| i18next               | 需插件支持          | `key_one` / `key_other` 后缀与 `{{name}}`，ICU 需借助 `i18next-icu` |
| vue-i18n              | 部分支持 / 独有语法 | `{name}` 插值与管道符 分隔的复数分支                                |
| Angular (`$localize`) | 子集支持            | 模板内的 ICU `plural` / `select`，提取至 XLIFF                      |

关于本表的补充说明：

- **i18next 的默认语法并非 ICU**，但这并不一定是劣势。其后缀式键（`item_one`、`item_few`）映射到 `Intl.PluralRules`，在扁平的 JSON 文件中更容易被翻译人员编辑。但它原生不包含 `select` 与复杂嵌套，因此需要借助 `i18next-icu` 或在业务代码中书写逻辑。
- **vue-i18n 的管道符复数**默认基于各语言自定义规则函数，而非严格对应 CLDR。虽然能满足日常需求，但复数规则被放在了应用配置中，而非数据本身。
- **FormatJS 是 JS 领域的标杆实现**。在前端开发语境下提及“ICU MessageFormat”时，通常指 FormatJS 所支持的规范标准。

## Intlayer 的处理方案

Intlayer 不使用基于字符串的 DSL。分支运算符直接作为内容声明文件中的 TypeScript/JavaScript 函数提供，使得整个结构具备类型保障，并且各个语言只需声明其语法真正需要的类别：

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      zh: plural({
        other: "{{count}} 个职位空缺",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // 中文语言环境 → "5 个职位空缺"
```

与 ICU 核心概念的对应关系直观清晰：

| ICU 结构                      | Intlayer 实现方式                            |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` 或自动识别        |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| `select` 中的性别分支         | `gender({ male, female, fallback })`         |
| `select` 中的布尔分支         | `cond({ true, false })`                      |
| 自定义数值区间（非 CLDR）     | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural` 底层同样将分类选择委托给原生的 `Intl.PluralRules`，因此前文的 CLDR 规则表完全适用。格式化逻辑与文案保持解耦：数字、日期、货币与列表通过[格式化 Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)处理，而不需要硬编码在消息内容中。

- [格式化 Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)

客观考量：

- Intlayer 依赖构建流程：编译器会在构建期间提取内容声明。如果你需要纯粹在运行时动态加载普通 JSON，这是不同的架构范式。
- 当前版本中 `plural` 分支内尚不支持直接嵌套 `t()`：应当在外层用 `t()` 包裹 `plural`。
- 相较于成熟的 i18next，Intlayer 的生态更加年轻，开箱即用的第三方 TMS 集成仍在持续扩充中。

对于迁移既有 ICU 字符串的项目，[react-intl 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)可以直接解析原有内容：`plural`、`select`、`selectordinal`、`#` 以及传统的 `number`、`date`、`time` 参数。骨架与 `offset:` 目前暂未覆盖，迁移时需重点检查这些特殊格式。[i18next 适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md)则会通过 `Intl.PluralRules` 解析后缀键（`key_one`、`key_male`）。

- [react-intl 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)
- [i18next 适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md)

## 常见失误

- **在 JS 逻辑中硬编码复数判断。** `count === 1 ? a : b` 这类写法在前文列举的 10 种语言中有 8 种都会得出错误结果。一旦把三元表达式写死在代码里，翻译人员就无法修正。
- **拼接翻译片段。** 词序、修饰成分以及标点前后的空格完全因语言而异。务必将整个句子作为一个不可分割的单元。
- **遗漏 `other` 分支。** 这是规范的硬性要求，绝非可选项。绝大多数解析器会抛出错误，少数能运行的也会直接输出空白。
- **盲目假定所有语言的分支数量一致。** 英文源文件只有 `one` 和 `other`，绝不意味着波兰语也只有两个分支。每个语言环境应独立声明自己的分支结构。详情请参阅[按语言环境独立声明内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md)。
- **误用 `=1` 替代 `one`。** `=1` 仅在数字严格等于 1 时生效。在俄语中，21 也必须使用 `one` 类别，写成 `=1` 永远无法匹配该情况。
- **在 plural 之外使用 `#`。** `#` 仅在 `plural` 或 `selectordinal` 内部具有特殊占位符含义。在其他地方它只会被作为普通井号字符显示。
- **忘记 `#` 已经自带格式化。** 如果需要未经格式化处理的原始数字，请直接按变量名插值。

## 延伸阅读

- [Intlayer 中的复数内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)
- [基于 select 的条件内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/select.md)
- [插值占位符](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)
- [主流 i18n 库基准性能评测](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/react-i18next_vs_react-intl_vs_intlayer.md)
- [什么是国际化（i18n）？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/what_is_internationalization.md)
