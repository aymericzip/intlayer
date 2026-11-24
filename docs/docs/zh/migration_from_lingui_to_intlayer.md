---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "从 Lingui 迁移到 Intlayer"
description: "分步将 React 应用从 Lingui 迁移到 Intlayer。借助 compat adapter @intlayer/lingui，Lingui 宏、useLingui 和 <Trans> 照常工作。"
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# 从 Lingui 迁移到 Intlayer

## 为什么从 Lingui 迁移到 Intlayer？

<AccordionGroup>
<Accordion header="Bundle 体积">

Lingui 为每个 locale 加载一个包含应用全部消息的编译后目录。Intlayer 按字典拆分内容，只发送每个页面用到的部分，可 **将 bundle 和页面体积减少多达 50%**。

</Accordion>
<Accordion header="可维护性">

Intlayer 字典 **完全类型化**，并且可以放在使用它们的组件旁边。无需记住 `extract` / `compile` 步骤：字典由打包工具插件构建。

</Accordion>
<Accordion header="AI 智能体">

与组件放在一起的内容 **减少了 LLM 所需的上下文**。Intlayer 提供用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**。

</Accordion>
<Accordion header="自动化">

在 CI/CD 流水线中使用你选择的 LLM 翻译缺失的消息，或通过 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 在后台完成翻译。

</Accordion>
<Accordion header="与非开发人员协作扩展">

Intlayer 提供可自托管的 **[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 和 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，让译者和文案人员实时编辑内容。

</Accordion>
</AccordionGroup>

> 想了解这些库的由来，请阅读 [JavaScript i18n 的历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)。

## 迁移策略

1. **Compat adapter（推荐用于现有应用）**：安装 `@intlayer/lingui`。它暴露与 `@lingui/core` 和 `@lingui/react` 相同的 API（`i18n`、`setupI18n`、`I18nProvider`、`useLingui`、`Trans`），并从 Intlayer 字典中提供消息。你的宏（`` t`…` ``、`<Trans>`、`msg`、`plural`）的编译方式与之前完全相同。
2. **完整迁移**：逐步用 `useIntlayer` 和放在组件旁边的 `.content.ts` 文件替换 Lingui 调用。

## 目录

<TOC/>

## 快速迁移

<Steps>
<Step number={1} title="安装依赖">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 标志是可选的。如果你是 AI 智能体，请使用 `intlayer-cli init`。

该命令会检测你的环境并安装所需的 package，例如：

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> 保留 `@lingui/core`、`@lingui/react` 和宏插件（`@lingui/babel-plugin-lingui-macro` 或 `@lingui/swc-plugin`）。宏仍会运行，Lingui 的 package 提供 TypeScript 类型。

</Step>
<Step number={2} title="配置 Intlayer">

Intlayer 将你的 Lingui 目录作为唯一可信来源读取。使用 Lingui 默认结构（`src/locales/{locale}/messages.po`）时，将 `syncPO` 插件指向这些文件：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="使用 JSON 目录">

使用 `@lingui/format-json` 时，请以 ICU 格式使用 `syncJSON`：

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> 请使用显式的消息 id（`t({ id: "hero.title", message: "Welcome" })` 或 `<Trans id="hero.title">`）。由源文本生成的 id 不会在目录中解析。

</Step>
<Step number={3} title="替换 Lingui 的 Vite 插件">

将 `@lingui/vite-plugin` 替换为 `@intlayer/lingui/plugin`。绑定名仍为 `lingui()`：它会运行 Intlayer 构建，并将 `@lingui/core` 和 `@lingui/react` 别名到 `@intlayer/lingui`，无需修改源文件。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> 将宏插件保留在 React 插件中（Babel 或 `@lingui/swc-plugin`），以便宏在 Intlayer 解析之前被编译为 `i18n._()` 调用。

</Step>
</Steps>

你的组件无需修改即可继续工作：

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

切换 locale 仍通过 `i18n.activate(locale)` 完成，它会更新每个 `useLingui()` 使用方。

## 完整迁移

<Steps>
<Step number={4} title="移除运行时目录加载" isOptional={true}>

消息现在来自构建时编译的 Intlayer 字典。`i18n.load()` / `i18n.loadAndActivate()` 调用仅作为 fallback，并在开发环境中输出警告。请将其替换为 `i18n.activate(locale)`，并去掉 `lingui compile` 步骤。保留 `lingui extract` 用于收集新的消息 id。

</Step>
<Step number={5} title="显式重命名 import（可选）" isOptional={true}>

Vite 插件已经处理了别名。如需让依赖关系更明确：

| 之前                                               | 之后                                                  |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="将内容迁移到 .content.ts 文件" isOptional={true}>

新组件可以在现有 Lingui 调用旁使用原生 Intlayer 内容：

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="启用 AI 翻译" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

补全的翻译会写回你的 Lingui 目录。AI 配置请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>
</Steps>

## 迁移后可以删除的内容

| 文件 / 模式                            | 不再需要的原因                                        |
| -------------------------------------- | ----------------------------------------------------- |
| `i18n.load()` / 目录的动态 import      | 字典由 Intlayer 编译和加载。                          |
| `lingui compile` 和编译后的 `.js` 目录 | Intlayer 直接从你的目录构建字典。                     |
| `@lingui/vite-plugin`                  | 已由 `@intlayer/lingui/plugin` 中的 `lingui()` 取代。 |

## 配置 TypeScript

在 `tsconfig.json` 中包含生成的类型：

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git 配置

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md)
- [sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)
- [在 Vite 和 React 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
