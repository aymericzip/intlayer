---
createdAt: 2026-03-20
updatedAt: 2026-10-08
priority: 6
title: "Storybook i18n - 翻译你的应用的完整指南"
description: "在 Storybook 中配置 Intlayer：多语言故事装饰器和语言切换，使用与应用相同的类型化内容。"
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

## 为什么选择 Intlayer 而不是其他方案？

与“storybook-react-i18next”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

<AccordionGroup>
<Accordion header="完整的 Storybook 覆盖">

Intlayer 经过优化，可与 Storybook 完美配合，提供**多语言故事装饰器**、**区域设置切换**以及在整个设计系统中扩展国际化 (i18n) 所需的所有功能。

</Accordion>
<Accordion header="打包体积 (Bundle Size)">

您无需在页面中加载庞大的 JSON 文件，而是只加载所需的内容。Intlayer 可以帮助 **将您的打包产物和页面体积减少多达 50%**。

</Accordion>
<Accordion header="可维护性">

将应用程序内容与组件就近维护在相应作用域内，**极大提升了大体量应用的可维护性**。您可以直接复制或删除单个功能目录，而无需承担检查整个全局内容代码库的认知负担。此外，Intlayer 提供 **完整的 TypeScript 类型支持**，确保内容的准确性与安全性。

</Accordion>
<Accordion header="AI Agent 支持">

内容就近组织 (Co-location) **显著减少了大型语言模型 (LLM) 所需的上下文**。Intlayer 还配备了一套完整工具链，例如用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，让 AI 智能体的开发体验 (DX) 更加流畅丝滑。

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)
- [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)

</Accordion>
<Accordion header="自动化">

在 CI/CD 流水线中，使用您自选的 LLM（直接基于您自有的 AI 提供商 API 计费）实现自动化翻译。Intlayer 还提供了可自动提取内容的 **编译器**，并配备了 [Web 平台 / CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 以便在后台管理系统中执行翻译。

- [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

</Accordion>
<Accordion header="性能表现 (Performance)">

将大型 JSON 文件全局挂载到各个组件容易导致渲染性能下降与响应迟滞。Intlayer 会在构建阶段自动优化内容加载。

</Accordion>
<Accordion header="赋能非技术人员协同扩展 (Scaling with non-dev)">

Intlayer 不仅仅是一个简单的 i18n 解决方案。它还提供了 **支持自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 以及 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**。借此，您可以 **实时** 管理多语言内容，让译者、文案及团队其他成员实现无缝协作。内容可存储在本地和/或远程服务器上。

- [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## 为什么要结合 Storybook 使用 Intlayer？

Storybook 是开发和记录 UI 组件的行业标准工具。通过将它与 Intlayer 结合使用，您可以：

- **直接在 Storybook 画布中预览每种语言**：使用工具栏切换器。
- **提前捕获缺失的翻译**：在进入生产环境之前修正问题。
- **记录多语言组件**：使用真实的、类型安全的内容，而不是硬编码的字符串。

## 逐步设置

<Tabs>
<Tab value="Vite Setup">

<Steps>
<Step number={1} title="安装依赖">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Package          | 作用                                                |
| ---------------- | --------------------------------------------------- |
| `intlayer`       | 核心 - 配置、内容编译、CLI                          |
| `react-intlayer` | React 绑定 - `IntlayerProvider`、`useIntlayer` hook |
| `vite-intlayer`  | Vite 插件 - 监视和编译内容声明文件                  |

</Step>
<Step number={2} title="创建 Intlayer 配置">

在项目的根目录（或在你的设计系统包内）创建 `intlayer.config.ts`：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 根据需要添加更多语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // 你的 *.content.ts 文件所在位置
  },
};

export default config;
```

> 有关完整的选项列表，请参阅[配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

</Step>
<Step number={3} title="将 Vite 插件添加到 Storybook">

Storybook 的 `viteFinal` hook 可让你扩展内部 Vite 配置。在那里导入并添加 `intlayer()` 插件：

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
      plugins: [
        intlayer({
          proxy: {
            ignore: (req) => req.url?.startsWith("/api"),
          },
        }),
      ],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

`intlayer()` 插件会监视你的 `*.content.ts` 文件，并在 Storybook 开发过程中任何更改时自动重建字典。

</Step>
<Step number={4} title="添加 `IntlayerProvider` 装饰器和语言工具栏">

Storybook 的 `preview` 文件是用 `IntlayerProvider` 包装每个故事并在工具栏中公开语言切换器的合适位置：

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // 用 IntlayerProvider 包装每个故事
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // 在 Storybook 工具栏中公开语言切换器
  globalTypes: {
    locale: {
      description: "活跃的语言",
      defaultValue: "en",
      toolbar: {
        title: "语言",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> `locale` 值必须与 `intlayer.config.ts` 中声明的语言匹配。

</Step>
</Steps>
</Tab>
<Tab value="Webpack Setup">
<Steps>
<Step number={1} title="安装依赖">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

</Step>
<Step number={2} title="创建 Intlayer 配置">

在项目的根目录创建 `intlayer.config.ts`：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

</Step>
<Step number={3} title="配置 Storybook 的 Webpack">

对于基于 Webpack 的 Storybook 设置（例如 `@storybook/react-webpack5`），通过 `webpackFinal` 扩展 webpack 配置以添加 Intlayer 别名和加载器：

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

</Step>
<Step number={4} title="添加 `IntlayerProvider` 装饰器和语言工具栏">

与 Vite 设置相同 - 在 `.storybook/preview.tsx` 中添加装饰器和全局语言类型：

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "活跃的语言",
      defaultValue: "en",
      toolbar: {
        title: "语言",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Step>
</Steps>
</Tab>
</Tabs>

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

- [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)

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

## 其他资源

- [Intlayer 配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [Intlayer 命令行界面文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [Storybook 文档](https://storybook.js.org/docs)
