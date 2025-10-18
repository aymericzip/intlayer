---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: 测试您的内容
description: 了解如何使用 Intlayer 测试您的内容。
keywords:
  - 测试
  - Intlayer
  - 国际化
  - CMS
  - 内容管理系统
  - 可视化编辑器
slugs:
  - doc
  - testing
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: 引入测试功能
---

# 测试您的内容

本指南展示了如何自动验证您的字典是否完整，在发布前捕获缺失的翻译，并测试您应用中的本地化 UI。

---

## 您可以测试的内容

- **缺失的翻译**：如果任何字典缺少必需的语言环境，则使 CI 失败。
- **本地化 UI 渲染**：使用特定的语言环境提供者渲染组件，并断言可见的文本/属性。
- **构建时审计**：通过 CLI 在本地运行快速审计。

---

## 快速开始：通过 CLI 审计

从您的项目根目录运行审计：

```bash
npx intlayer content test
```

有用的参数：

- `--env-file [路径]`：从文件加载环境变量。
- `-e, --env [名称]`：选择环境配置。
- `--base-dir [路径]`：设置应用的基础目录以进行解析。
- `--verbose`：显示详细日志。
- `--prefix [标签]`：为日志行添加前缀。

注意：CLI 会打印详细报告，但在失败时不会以非零状态退出。对于 CI 门控，请添加下面的单元测试，断言没有缺失的必需语言环境。

---

## 编程测试（Vitest/Jest）

使用 Intlayer CLI API 断言您的必需语言环境没有缺失的翻译。

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("翻译", () => {
  it("没有缺失的必需语言环境", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // 当测试在本地或CI中失败时，这很有帮助
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest 等效代码：

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("没有缺失的必需语言环境", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

工作原理：

- Intlayer 读取您的配置（locales、requiredLocales）和声明的字典，然后报告：
  - `missingTranslations`：按键，缺失了哪些语言及其对应的文件。
  - `missingLocales`：所有缺失语言的合集。
  - `missingRequiredLocales`：限制为 `requiredLocales` 的子集（如果未设置 `requiredLocales`，则为所有语言）。

---

## 测试本地化 UI（React / Next.js）

在 Intlayer 提供者下渲染组件，并断言可见内容。

React 示例（Testing Library）：

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("预期的英文标题")).toBeInTheDocument();
});
```

Next.js（App Router）示例：使用框架包装器：

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("渲染法语本地化标题", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(screen.getByRole("heading", { name: "预期标题" })).toBeInTheDocument();
});
```

提示：

- 当你需要属性的原始字符串值（例如 `aria-label`）时，可以访问 React 中 `useIntlayer` 返回的 `.value` 字段。
- 将字典与组件放在一起，便于单元测试和清理。

---

## 持续集成

添加一个测试，当缺少必需的翻译时使构建失败。

`package.json`：

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions 示例：

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

可选：在测试的同时运行 CLI 审计以获得人类可读的摘要：

```bash
npx intlayer content test --verbose
```

---

## 故障排除

- 确保您的 Intlayer 配置定义了 `locales` 和（可选的）`requiredLocales`。
- 如果您的应用使用动态或远程字典，请在字典可用的环境中运行测试。
- 对于混合的 monorepos，使用 `--base-dir` 指定 CLI 指向正确的应用根目录。

---
