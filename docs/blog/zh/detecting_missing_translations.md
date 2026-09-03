---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "如何在用户发现之前检测缺失的翻译"
description: 缺失的翻译通常会静默失败。为什么回退机制会掩盖问题，真正有效的四层检测机制，以及如何在遇到未翻译键时阻断构建。
keywords:
  - 查找缺失翻译
  - 缺失翻译键
  - i18n 审计
  - 未翻译字符串
  - 翻译覆盖率
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# 如何在用户发现之前检测缺失的翻译

缺失的翻译几乎从不抛出异常。根据你的配置，它要么向日本用户展示英文文本，要么在生产环境页面上直接打印 `checkout.summary.total`。这两种情况都能顺利发布，都能通过代码审查，并且最终都是由客户而不是你发现的。

## 目录

<TOC/>

## 无论你使用什么库，这套方案都适用

本文介绍的内容不局限于某一个特定技术栈。下面介绍的检测层在 i18next、react-i18next、next-intl、react-intl、vue-i18n、next-translate 或 Lingui 中均可同样工作，因为它们都以相同的方式解析键，并以相同的方式产生缺陷。

工具链同样具备很强的可移植性。如果你的翻译消息当前保存在 JSON 字典目录中，[Sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 可以直接将 Intlayer 接入这些文件，从而让你无需移动内容或修改导入路径即可使用审计、填充和测试命令：

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // 或针对 next-intl / react-intl 的 "icu"
    }),
  ],
};

export default config;
```

如果你希望同时保留运行时的 API，[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 可以在打包工具层对 `useTranslation`、`$t` 等进行别名替换。无论采用哪种方式，都可以将下文的命令视作这一思想的具体实践，而非强制要求。

## 为什么缺失的翻译往往隐蔽无形

所有 i18n 库都通过同一条链条解析键：查找当前激活的语言环境，回退到默认语言，如果依然找不到，就直接返回键名字符串。最后这一步正是问题的根源。系统中没有抛出错误，生产环境中没有警告，也没有任何测试失败，因为整个流水线中没有任何环节将缺失的键视为异常状态。

回退机制让情况变得更糟而不是更好。一个静默以英文渲染的页面，对于讲英语的开发者以及所有自动化检查来说都显得毫无破绽。这个 Bug 只有那些无法阅读最终结果的用户才能看到。

因此，核心问题不在于“如何在运行时处理缺失的翻译”。而在于“如何让包含缺失翻译的代码根本无法被合并”。

## 捕捉缺失翻译的四个层级

每个层级都能捕获其他层级无法发现的漏洞。你需要结合多个层级来构建防护。

| 层级            | 能够捕获                           | 会遗漏                             |
| :-------------- | :--------------------------------- | :--------------------------------- |
| 类型系统        | 根本不存在的键名                   | 键名存在但 `ja` 语言环境下的值为空 |
| 语法检查 (Lint) | 从未被提取供翻译的硬编码字符串     | 字典中遗漏的键                     |
| 覆盖率审计      | 每个已声明键在各语言环境中的覆盖率 | 从未被标记为可翻译的原始文本       |
| 渲染测试        | 能够解析但渲染结果不正确的键       | 未被测试用例覆盖的界面内容         |

绝大多数团队存在的盲区在第三行：他们知道自己的键名是有效的，但没有任何工具检查十八种语言是否真的都已填入内容。

## 层级 1：将键转化为类型，而非普通字符串

`t("checkout.summry.total")` 是一个可以正常通过编译的拼写错误。如果你的键是纯文本字符串，每次重命名都是生产风险，每次删除都会留下孤立的废弃键。

类型化的键将这种隐患转化为构建阶段的错误。`react-i18next` 通过声明合并（declaration merging）提供支持，`next-intl` 从消息结构推断类型，Lingui 从源码文本派生 ID，而 Intlayer 则直接从声明文件中生成严谨的类型。它们都行之有效；不同之处仅在于需要编写多少配置代码。

这一层是必要的，但并非万全之策。类型仅能约束默认字典的骨架，它无法证明韩语是否真的为该键配置了对应的翻译。

## 层级 2：通过 Lint 捕获从未变成键的原始字符串

最难找到的翻译往往是从未被外部化的文案。组件内部硬编码的文本对任何基于字典目录的审计工具都是不可见的，因为在工具看来，该字符串根本不存在。

Intlayer 的 ESLint 插件通过 `no-raw-text` 规则覆盖了这一问题，并搭配 `no-unused-content` 检查反向问题：已经声明但没有任何代码引用的死内容。

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` 可以防止字典目录无限膨胀。无用键虽然不会破坏代码执行，但会增加翻译供应商的账单。完整规则清单请见 [ESLint 插件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)。

## 层级 3：审计各语言环境的覆盖率

这是直接回答核心问题的一层。Intlayer 将其作为一条 CLI 命令提供：

```bash packageManager="npm"
npx intlayer content test
```

它会读取配置的语言环境及声明的字典，详细报告哪些文件的哪些键缺少了哪些语言环境。

在将其接入自动化流程前需注意：**该 CLI 会输出检查报告，但退出状态码始终为 0。** 如果直接将其放入流水线中寄希望于它阻断构建，你只会得到一个正常通过的构建以及一段没人会看的大段文本输出。要真正进行拦截，请使用下文介绍的编程式 API。

## 层级 4：在测试套件中通过断言进行验证

`listMissingTranslations()` 会以结构化数据的形式返回相同的审计结果，非常适合用作构建拦截门禁。

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("没有缺失必需的语言环境", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

接口会返回三个关键字段：

- `missingTranslations`：按键名细分，指明缺少哪些语言环境及所在的文件。这是测试失败时应当打印的内容。
- `missingLocales`：跨所有键汇总后缺失的所有语言集合。
- `missingRequiredLocales`：仅限制在配置中的 `requiredLocales` 范围内（若未配置则等同于全部语言）。

## `requiredLocales` 是让门禁可持续运行的关键

支持十八种语言并不意味着上线前所有十八种语言都必须 100% 完成。大多数团队都会划分核心阻塞语言与渐进补充语言。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

如果没有设置 `requiredLocales`，所有声明的语言都会成为强制要求，只要最后一种语言尚未完成，构建就会一直处于红灯状态。这通常会导致团队最终彻底禁用该检查。

## 发现已经流入生产环境的缺失

上述层级能够防止新问题的产生。对于已经发布的线上应用，有两种非常有效的排查策略。

**伪本地化（Pseudolocalization）。** 启用一个将每个字符都进行特殊转换的伪语言环境，例如将 `Checkout` 变成 `[!!! Ĉĥéçķöũţ !!!]`。页面渲染后，任何依然显示为正常英语的内容都毫无疑问是硬编码文案。因为它测试的是最终渲染结果，能在十分钟内发现字典审计永远无法看到的问题。

**爬取自己的网站。** 如果你提供按语言划分的 URL，可以抓取每个语言环境的典型页面，并在 HTML 中检索默认语言的文本。如果在 `/ja/` 页面中检索到了 "Add to cart"，这要么是翻译遗漏，要么是未预期的语言回退。

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## 填补空白

确定缺失的内容后，可以使用 `intlayer fill` 自动补全空条目，而 `autoFill` 选项可以在声明内容时直接生成各语言环境的文件。详见 [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)。

我们必须清醒地认识到：机器自动填充只是把一个**看得见的漏洞**变成了**看不见的漏洞**。键名填上了内容，审计变绿通过了，但文案还没有任何人审阅过。可以用它来解救紧急上线，但对于任何涉及付费、法律条款或转化决策的核心文案，必须安排人工复核。

## 常见错误

- **将回退机制视作安全保护。** 它只是兜底渲染手段，不是保险锁。静默显示的英文页面本身就是一个 Bug。
- **依赖 CLI 输出来拦截 CI。** `intlayer content test` 退出码为 0，务必在单元测试中进行断言。
- **强制要求所有语言都齐全。** 只要发生一次阻塞紧急发布，该检查就会被团队彻底移除。
- **只查字典目录从不检查渲染画面。** 硬编码字符串在字典中是绝对不可见的。
- **测试中仅验证默认语言。** 唯一绝不可能缺失的语言就是默认语言。
- **以机器自动填充作为流程终点。** 审计变绿但文案质量毫无保障。

## 深入阅读

- [测试你的内容：CLI 审计、编程式 API 与 UI 断言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)
- [ESLint 插件规则（包括 `no-raw-text` 与 `no-unused-content`）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)
- [autoFill：自动生成各语言环境的声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)
- [配置参考：`locales`、`requiredLocales`、`defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [跨框架性能基准报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md)
- [国际化到底涵盖哪些内容](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/what_is_internationalization.md)
- [组件级 i18n 与集中式 i18n 的架构对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)
