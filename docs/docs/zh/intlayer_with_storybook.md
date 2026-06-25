---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Storybook 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
author: aymericzip
---

# 在 Storybook 中使用 Intlayer

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“storybook-react-i18next”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的故事书报道**

Intlayer 经过优化，可与 Storybook 完美配合，提供**多语言故事装饰器**、**区域设置切换**以及在整个设计系统中扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

---

## 为什么要结合 Storybook 使用 Intlayer？

Storybook 是开发和记录 UI 组件的行业标准工具。通过将它与 Intlayer 结合使用，您可以：

- **直接在 Storybook 画布中预览每种语言**：使用工具栏切换器。
- **提前捕获缺失的翻译**：在进入生产环境之前修正问题。
- **记录多语言组件**：使用真实的、类型安全的内容，而不是硬编码的字符串。

---

### 第三步：将 Vite 插件添加到 Storybook

Storybook 的 `viteFinal` 钩子允许您扩展内部的 Vite 配置。在此处导入并添加 `intlayer()` 插件：

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …其他插件
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

`intlayer()` 插件会监听您的 `*.content.ts` 文件，并在 Storybook 开发过程中文件发生变化时自动重新构建字典。

---

## 声明内容

在每个组件旁边创建一个 `*.content.ts` 文件。Intlayer 会在编译期间自动识别它。

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> 有关更多内容声明格式和功能，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

---

## 在组件中使用 `useIntlayer`

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      复制
    </button>
  );
};
```

`useIntlayer` 会返回由最近的 `IntlayerProvider` 提供的当前语言的编译后的字典。在 Storybook 工具栏中切换语言会自动重新渲染对应的 story 并更新翻译。

---

## 为国际化组件编写 Story

在配置好 `IntlayerProvider` 装饰器之后，您的 story 工作方式与以前完全相同。语言工具栏控制整个画布的当前语言：

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** 默认 Story - 在工具栏中切换语言来预览翻译。 */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** 在代码块内渲染该按钮，这是一个常见的现实用例。 */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> 每个 story 都会从工具栏继承 `locale` 全局变量，因此您可以在不更改任何 story 代码的情况下验证每种语言。

---

## 在 Story 中测试翻译

使用 Storybook 的 `play` 函数来断言在指定语言下是否渲染了正确的翻译文本：

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // 验证按钮是否具有非空的无障碍名称
    await expect(button).toHaveAccessibleName();
    // 验证按钮未被禁用
    await expect(button).not.toBeDisabled();
    // 验证键盘可访问性
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## 其他资源

- [Intlayer 配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [Intlayer 命令行界面文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [Storybook 文档](https://storybook.js.org/docs)
