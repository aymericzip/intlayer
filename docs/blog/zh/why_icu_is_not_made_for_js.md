---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: 为什么 ICU MessageFormat 不适合 JavaScript
description: "ICU MessageFormat 最初专为 Java 和 C++ 设计。在浏览器端，完整兼容需要引入约 10 KB 的解析器代码。探讨这一成本的由来以及更优的替代方案。"
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu 打包体积
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n 复数处理
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# 为什么 ICU MessageFormat 不适合 JavaScript

ICU MessageFormat 是一个成熟优秀的标准。它功能完备，翻译人员非常熟悉，大部分翻译管理系统（TMS）也能够原生支持。然而，它的核心症结在于最初所面向的运行环境。ICU 诞生于 C++ 和 Java 时代，在那些环境下，一个完整的消息解析器与格式化引擎相比整个应用程序的体积微不足道。但在浏览器打包（bundle）中，每个用户在每次加载页面时都必须全额承担这一体积开销。

本文将深入探讨 ICU 的历史渊源、为什么其复数语法在前端显得臃肿，以及为何追求 100% 兼容会拖累所有 JavaScript i18n 库的性能。如果你需要直接查阅其语法规范，请先阅读 [ICU Message Format 参考指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)。

- [ICU Message Format 参考指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)

<TOC/>

## 从 IBM 到 Unicode 联盟

ICU 代表 _International Components for Unicode_。其消息格式语法始于 Java：苹果与 IBM 的合资公司 Taligent 编写了 JDK 1.1（1997 年）的国际化核心类，其中就包含 `java.text.MessageFormat`。随后 IBM 继续将其演进为 ICU4J，并移植为 C/C++ 版本的 ICU4C，于 1999 年将其开源。2016 年，ICU 项目正式移交至 Unicode 联盟管辖，该联盟同时维护着 ICU 所依赖的 CLDR 区域语言数据源。

### 它最初的应用场景

其最初的目标是服务器与桌面端软件：Java 企业级应用、IBM 软件产品以及后来的操作系统。消息通常存储在通过 `ResourceBundle` 加载的 Java `.properties` 文件中，或是存储在 ICU 为 C/C++ 设计的专用资源包格式中：

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

最初的 JDK 版本并不支持 `plural`。当时采用的是基于数值范围的 `choice`（`{0,choice,0#no files|1#one file|1<{0} files}`），这仅能满足类似英语这种复数形态简单的语言。ICU 在 2008 年（ICU 4.0）引入了基于 CLDR 规则的 `plural`，并于 2010 年（ICU 4.4）新增了 `select` 语法。

### 与 `.po` 的本质区别

人们常将 ICU 与 gettext 混淆，但两者代表着完全不同的设计理念。`.po` 文件源自 GNU gettext（C、Linux，后来扩展至 PHP 和 Python）。一个 `.po` 条目由简单的 `msgid` / `msgstr` 键值对构成，复数分支的选择由文件头部声明的 C 语言表达式决定（`Plural-Forms: nplurals=2; plural=(n > 1);`）。消息字符串内部不存在分支跳转。相反，ICU 将逻辑分支直接写在字符串自身之中，使单条消息能够同时混合 `plural`、`select` 和数字格式化。

### ICU 如今运行在何处

ICU4C 原生集成在 Android、iOS、macOS、Windows、Node.js 以及 Chrome 与 Firefox 的 JavaScript 引擎底层。浏览器的标准 `Intl` API 绝大部分正是基于它构建的。这意味着浏览器本身就已经内置了 ICU 的复数规则以及数字和日期格式化功能。然而，浏览器唯独没有内置消息解析器：`Intl.MessageFormat` 目前仍处于 TC39 提案的早期阶段，且基于全新的 MessageFormat 2 规范设计，与 ICU MessageFormat 1 并不兼容。

这段技术演进史揭示了其设计的根本动因：

- **面向服务端与桌面端运行时。** 在这些环境下，运行时解析字符串开销极低，且库只在操作系统级别安装一次，无需每个访客重复下载。
- **字符串内部的领域特定语言（DSL）。** 分支、数字格式、日期和嵌套全部融合在一套语法中，翻译人员无需接触代码即可维护。
- **追求无死角的完备性。** 为翻译人员可能遇到的所有语法变体都提供了对应的操作符。

这些决策本身没有错误，只是它们假定的运行环境与当今的浏览器截然不同。

## 复数语法异常繁琐

ICU 中最常用的语法结构，恰恰也是语法噪音最大的部分。一个包含 0 状态的数量表达写法如下：

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

它包含参数名、关键字 `plural`、每个分支的分支标识、层层嵌套的花括号，以及仅在复数分支内部生效的特殊占位符 `#`。若再加上主语的语法性别，消息嵌套层次就会成倍增加：

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

全篇 15 行代码中，有 9 行纯粹是为了维持语法框架。在波兰语中，上述三种性别各自需要 4 个复数分支，这使得翻译后的字符串变成了密密麻麻的花括号块，只要漏掉一个 `}` 就会导致整个消息解析崩溃，而且往往要到运行时才能发现。

而在 JavaScript 中，相同的结构完全可以直接用纯数据结构描述：一个以复数分类为键的对象，由 TypeScript 类型系统与编辑器直接进行静态检查，文件与最终值之间不再需要任何解析器介入。

## 完备性带来的体积代价

ICU 的功能覆盖面极为庞大：

- 支持精确匹配（`=0`）与偏移量（`offset:`）的 `plural`
- 拥有独立 CLDR 序数对照表的 `selectordinal`
- 支持任意深度嵌套的 `select`
- 支持传统名称（`number, currency`）与骨架模式（skeleton，如 `::currency/EUR compact-short`）的 `number`、`date` 和 `time`
- 转义与引号处理规则（`'{'`, `''`）
- 某些实现中的富文本标签支持（`<b>…</b>`）

任何宣称与 ICU 1:1 完全兼容的库都必须将所有这些模块打包进去，因为在构建阶段根本无法预测你的字符串究竟会用到哪些特性。在工程实现上，这意味着必须打包：

1. **解析器**：将文本解析为 AST，并处理不规范括号的错误恢复。
2. **骨架（skeleton）解析器**：用于解析数字和日期的 `::` 语法，这本身就是一门小型微语言。
3. **格式化引擎**：遍历 AST 并将每个节点映射到 `Intl.PluralRules`、`Intl.NumberFormat` 和 `Intl.DateTimeFormat`。

第三部分的逻辑非常轻量，因为现代 JavaScript 已经将 CLDR 规则内建在 `Intl` API 中。前两个模块的存在完全只是为了读取文本语法。在 `react-intl` 和 `next-intl` 所依赖的行业参考实现 FormatJS `intl-messageformat` 中，这部分就占据了约 **10 KB 的压缩 JavaScript 代码**，在加载应用业务逻辑之前就已经推给了每位访问者。

绝大多数前端项目仅仅使用了其中的冰山一角：简单的 `{name}` 插值和少量 `plural` 语法块。但由于运行时解析字符串无法进行死代码消除（tree-shaking），项目不得不连带下载骨架、序数与偏移量等解析逻辑。

## next-intl 也遇到了相同的困境

这绝不仅是理论层面的空谈。最主流的 ICU 国际化库之一 `next-intl` 也得出了完全相同的结论。在其 4.8 版本（2026 年 1 月）中，该库引入了一个实验性的 `precompile` 选项。该选项在构建阶段就将 ICU 消息解析为精简的 AST，并用微型执行器替换掉了运行时解析器。官方数据显示，启用该选项后**成功缩减了约 9 KB 的压缩 JavaScript 体积**。

然而这种折中方案也暴露了该架构的本质瓶颈：在预编译模式下，`t.raw` 将无法工作，因为原始的 ICU 字符串在运行时已不复存在。一旦浏览器端不再解析字符串，你实际上分发的就已经不是纯粹的 ICU 了。你分发的是编译产物，而字符串语法仅仅沦为了一种书写工具。

这就引出了一个核心问题：如果浏览器本身从不读取这段字符串语法，开发者和翻译团队为什么还要费力去编写这种繁琐易错的文本格式呢？

## JavaScript 原生化方案的形态

JavaScript 已经在底层解决了国际化最复杂的难点。`Intl.PluralRules` 熟知波兰语拥有 4 种基数形式、英语拥有 4 种序数形式。`Intl.NumberFormat` 与 `Intl.DateTimeFormat` 可以原生处理货币、单位、紧凑计数以及多国历法。剩下的工作仅仅是依据条件选取分支并填入数值，只要把数据组织为结构化对象，几行代码即可完成。

这正是 Intlayer 所采用的核心架构。条件分支是强类型内容声明中的普通函数，每个语言只需声明自身语法真正需要的分支分类：

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      zh: plural({
        other: "{{count}} 条未读消息",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // 波兰语区域设置 → "5 nieprzeczytanych wiadomości"
```

相较于 ICU 的核心优势：

- **打包产物体积为零解析器负担。** 结构在传送到浏览器端时就已经是一个原生 JavaScript 对象。`plural` 通过浏览器自带的 `Intl.PluralRules` 快速查找目标键。
- **错误拦截在构建阶段。** 缺少分支或键名拼写错误会直接触发 TypeScript 静态类型报错，彻底杜绝线上运行时事故。
- **格式化逻辑与文案彻底解耦。** 数字、日期与货币直接使用封装了 `Intl` 的[格式化 Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md) 处理，免去了骨架文本解析器的引入。
- **未使用的特性不占用任何字节。** 如果项目中没有任何文案使用 `gender`，打包工具会通过 Tree-shaking 将其彻底剔除。

- [格式化 Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)

客观而言，该方案也存在一些权衡：它依赖构建步骤，内容声明体现为代码而非纯文本，同时某些深度绑定 ICU 生态的旧版 TMS 平台无法直接解析 TypeScript 声明文件。

## 何时仍应优先考虑 ICU

在以下场景下，ICU 仍然是更稳妥的选择：

- **翻译流水线完全基于 ICU 构建。** 团队依赖的 TMS 工具普遍支持 ICU 格式的导入导出，且翻译团队已深度适应这套语法规则。
- **跨平台共享同一份文案资产。** 如果单一翻译文案库需要同时供给 iOS 原生应用、Android 应用和 Web 前端消费，维持统一的国际化格式至关重要。
- **项目中已沉淀海量既有 ICU 文案。** 单纯为了架构优化而重写数以万计的存量文案往往不具备足够的投资回报比。

在面对最后一种情况时，你并不必在彻底重写与忍受沉重解析器之间二选一。Intlayer 提供了 [react-intl 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)，能够直接读取存量的 ICU 字符串（包括 `plural`、`select`、`selectordinal`、`#` 以及传统的 `number` / `date` / `time` 格式），帮助你以渐进式方式平滑重构，仅对未迁移的遗留条目保留 ICU 的加载开销。

- [react-intl 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)

## 总结

ICU MessageFormat 成功解决了一个历史难题：语法规则应归属于翻译人员，而不应分散在业务代码中的 `if (count === 1)` 条件判断里。在解析文本 DSL 毫无成本的平台上，它堪称典范。但在 Web 浏览器中，全量兼容意味着必须打包绝大部分项目根本用不到的庞大解析器，甚至促使 ICU 生态本身的类库也开始借助预编译手段自救。

JavaScript 已经通过 `Intl` 提供了健全的 CLDR 规则。现代国际化方案真正需要的只是清晰的条件分支结构，而这一结构作为强类型数据来表达无疑远比字符串更加轻巧高效。

## 拓展阅读

- [ICU Message Format：语法、复数与 select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)
- [Intlayer 中的复数内容处理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)
- [基于 select 的条件式内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/select.md)
- [i18n 国际化库综合性能评测](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [next-intl 已经过时了吗？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_next-intl_outdated.md)
