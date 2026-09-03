---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "如何测试翻译而不写出脆弱的测试"
description: 在多语言（i18n）应用中什么值得测试，什么不值得测试。基于 Provider 的渲染测试、伪本地化、RTL 与复数覆盖率，以及快照测试的陷阱。
keywords:
  - 测试翻译
  - i18n 测试
  - testing library i18n
  - 伪本地化
  - 语言环境 provider 测试
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# 如何测试翻译而不写出脆弱的测试

大多数 i18n 测试套件都会以两种方式之一崩溃。要么它们断言字面文案，导致每次文案修改都会破坏五十个测试，团队最终将其全部删除。要么它们完全在默认语言环境中渲染，对其他十七种语言没有提供任何保证。两种情况最终都会导致同一个结果，一个无人信任的测试套件。

## 目录

<TOC/>

## 模式与库无关

以下每个模式都适用于任何 i18n 技术栈。将 Provider 替换为 `I18nextProvider`、`NextIntlClientProvider` 或 `IntlProvider`，测试代码保持完全一致，因为它们断言的是渲染输出，而不是特定的库 API。

覆盖率工具也同样可以迁移：通过将 [Sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 指向现有字典目录，或使用 [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 别名化当前的导入，覆盖率断言可以直接针对你现有的 JSON 文件运行。

## 明确你到底在测试什么

翻译质量不是一个可以通过代码断言来验证的事物。没有任何断言能告诉你德语是否地道，试图这样做只会让你的测试套件充斥着硬编码的字符串。

真正值得机械化测试的内容如下：

| 值得测试                             | 不值得测试                   |
| :----------------------------------- | :--------------------------- |
| 每个必需的语言环境都有值             | 文案用词是否优美             |
| 正确的语言环境传递到了组件中         | 每个标签的精确字面文本       |
| 复数能针对每个类别正确解析           | 翻译人员是否尽职尽责         |
| RTL 语言正确设置了方向和镜像布局     | 每种语言中的每一个具体字符串 |
| 格式化的日期和数字正确遵循了语言环境 | `Intl` 底层内部实现的正确性  |

覆盖率检查应该归入单个数据驱动的测试中，而不是分散在组件测试里。这部分内容在 [如何检测缺失的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md) 中有详细介绍；本文主要关注其余部分。

## 在 Provider 下渲染并按角色（Role）断言

核心模式是将组件挂载到语言环境 Provider 内，并通过 role 或 test id 进行查询，而不是通过文案查询。

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("以法语渲染结算摘要标题", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

查询 `getByRole("heading")` 能够经受住文案变更的考验。而 `getByText("Récapitulatif")` 则做不到。仅当字符串本身就是要测试的对象时，才使用字面量，这种情况十分罕见。

对于 `aria-label` 等属性，你需要原始字符串而不是可渲染节点。在 React 中，`useIntlayer` 返回的条目为此暴露了 `.value` 字段。

## 跨语言环境进行参数化测试

一个运行在所有语言环境上的测试逻辑，远比为每种语言单独写测试更有价值。

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("语言环境 %s", (locale) => {
  it("渲染时不会回退到原始 key", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // 如果渲染出了 key，说明查找失败。
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("设置了正确的文本方向", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

第一个断言是非常廉价且通用的收益：如果查找失败并且你的库直接渲染了 key，DOM 中就会出现类似 `cart.summary.title` 的内容。这可以在不列出任何字符串的情况下捕获一整类错误。

## 伪本地化发现目录无法检测到的问题

添加一个能够转换每个字符串的伪语言环境，例如将 `Checkout` 转换为 `[!!! Çĥéçķöũţ !!!]`。然后使用该语言环境渲染页面。

任何依然显示为纯英文的内容都是硬编码在代码中的。任何基于字典目录的审计都无法发现这一点，因为在工具看来该字符串根本不存在。方括号还有第二个作用：它们将文本拉长约 30%，可以在德语上线之前提前暴露布局破损问题。

这适合作为视觉测试或端到端测试运行，而不是单元测试，因为这类错误是肉眼直观可见的。

## 复数需要按类别测试，而不是按语言测试

复数相关的错误往往难以察觉，因为英语只有两种形式，大多数开发者也只验证这两种。波兰语有四种，阿拉伯语有六种。

```ts fileName="plural.test.ts"
// 阿拉伯语涵盖 zero, one, two, few, many, other。
describe.each([0, 1, 2, 3, 11, 100])("数量 %i", (count) => {
  it("在阿拉伯语中生成非空字符串", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

针对最复杂的语言选择能命中每个 CLDR 类别的数值，而不是处处只测试 1 和 2。`Intl.PluralRules` 可以告诉你一个数字属于哪个类别，从而让你推导测试样本而不是靠猜测。有关类别的更多信息见 [ICU 消息格式文章](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)。

## 快照（Snapshot）的陷阱

快照和多语言是一对糟糕的组合。本地化组件的快照会记录其中的每一个字符串：当翻译人员修复葡萄牙语中的拼写错误时，绿色的测试套件就会变红，而且修改发生在没有审查者能看懂的文件中。几次之后，大家就会在不阅读 diff 的情况下直接运行 `-u`，快照也就失去了所有意义。

如果你想使用快照，请仅在单一语言环境下执行，并将其视为结构检查而非内容检查。所有与特定语言相关的内容都应放在显式断言中。

## 测试协商逻辑，而不仅仅是渲染

生产环境中最常见的 i18n 错误不是缺失字符串。而是选错了语言环境：URL 标明 `/fr/`，客户端却读取 `navigator.language`，两者产生冲突。

将解析顺序作为纯函数直接测试，独立于任何组件：

```ts fileName="locale-resolution.test.ts"
it("优先使用 URL 而不是存储的偏好设置", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("当 URL 没有前缀时回退到请求头", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

这是大多数代码库中缺失的、最具价值的单一 i18n 测试，而且它完全不需要 DOM。

## 测试职责划分

- **Unit**：语言协商、格式化器、复数类别。快速，无 DOM。
- **Component**：每个语言环境一次基于 Provider 的渲染，断言角色和原始 key 的缺失。
- **Coverage**：单次数据驱动测试，断言没有缺失必需的语言环境。
- **Visual / E2E**：伪本地化检查和 RTL 页面测试，因为这些缺陷属于视觉问题。

在每次 commit 的流水线中保留前三项。最后一项在夜间构建中运行成本较低，而在每次 push 时运行成本较高。

## 常见错误

- **在所有地方断言精确文案。** 会确保测试套件在几个月内被彻底删除。
- **对多语言组件进行快照测试。** 翻译人员破坏构建，审查者盲目合入更新。
- **只测试默认语言。** 这是唯一不可能缺失的语言环境。
- **复数只测试 1 和 2。** 遗漏了英语所没有的所有类别。
- **完全 Mock 掉 i18n 库。** 这样你只是在测试 Mock 对象是否返回了字符串。
- **从不测试协商逻辑。** 最常见的真实故障，且最容易进行测试。

## 深入阅读

- [测试你的内容：CLI 审计、编程式 API 与 UI 断言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)
- [ESLint 插件：捕获硬编码字符串与未使用内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)
- [格式化器与语言实用工具（包括 `getHTMLTextDir`）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)
- [跨框架基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [react-i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-i18next.md)
- [如何检测缺失的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)
- [ICU 消息格式：复数、select 与骨架](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)
