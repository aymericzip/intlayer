---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "从 react-intl（FormatJS）迁移到 Intlayer"
description: "分步将 React 应用从 react-intl 迁移到 Intlayer。借助 compat adapter @intlayer/react-intl，useIntl、FormattedMessage 和所有 Formatted* 组件照常工作。"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# 从 react-intl（FormatJS）迁移到 Intlayer

## 为什么从 react-intl 迁移到 Intlayer？

<AccordionGroup>
<Accordion header="Bundle 体积">

使用 react-intl 时，locale 的所有消息都会传给 `IntlProvider`，因此每个页面都携带整个目录。Intlayer 只发送每个页面用到的字典，可 **将 bundle 和页面体积减少多达 50%**。

</Accordion>
<Accordion header="可维护性">

消息 id 根据你的字典进行 **类型检查**：无效的 id 会在构建时失败。内容可以放在使用它的组件旁边。

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

1. **Compat adapter（推荐用于现有应用）**：安装 `@intlayer/react-intl`。它暴露与 `react-intl` 相同的 API（`IntlProvider`、`useIntl`、`FormattedMessage`、`FormattedNumber`、`FormattedDate`、`defineMessages`、`createIntl`…），并从 Intlayer 字典中提供消息。ICU MessageFormat、复数、select 和富文本标签照常工作。
2. **完整迁移**：逐步用 `useIntlayer` 和放在组件旁边的 `.content.ts` 文件替换 react-intl 调用。

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> 保留 `react-intl`：它提供 TypeScript 类型。

</Step>
<Step number={2} title="配置 Intlayer">

将 `syncJSON` 插件指向你现有的消息文件。react-intl 目录是由点分隔 id 组成的扁平映射：

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> 每个 id 的第一段（`home`）会成为一个 Intlayer 字典，因此每个页面只加载它用到的字典。Intlayer 写回翻译时，文件保持扁平结构。

</Step>
<Step number={3} title="添加 Vite 插件">

`reactIntlVitePlugin()` 会运行 Intlayer 构建，并将 `react-intl` 别名到 `@intlayer/react-intl`，无需修改源文件。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> 使用其他打包工具？将 import 重命名为 `@intlayer/react-intl`（见第 5 步），并为你的打包工具使用 Intlayer 插件，例如 Next.js 使用 `next-intlayer` 中的 `withIntlayer`。

</Step>
<Step number={4} title="不再向 IntlProvider 传递消息">

`IntlProvider` 仍可正常工作，但消息现在由 Intlayer 加载。请移除 `messages` prop 和目录的 import：

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> 如果仍传入 `messages`，它会被忽略，并在开发环境中输出警告。

</Step>
</Steps>

你的组件无需修改即可继续工作，并且 id 是类型化的：

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## 完整迁移

<Steps>
<Step number={5} title="显式重命名 import（可选）" isOptional={true}>

Vite 插件已经处理了别名。如需让依赖关系更明确：

| 之前                                            | 之后                                                      |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="将内容迁移到 .content.ts 文件" isOptional={true}>

新组件可以在现有 react-intl 调用旁使用原生 Intlayer 内容：

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

补全的翻译会写回你的 JSON 文件。AI 配置请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

</Step>
</Steps>

## 迁移后可以删除的内容

| 文件 / 模式                     | 不再需要的原因                                |
| ------------------------------- | --------------------------------------------- |
| `messages` prop 和目录加载      | 字典由 Intlayer 编译和加载。                  |
| `formatjs compile` 步骤         | Intlayer 直接从 JSON 文件解析 ICU 消息。      |
| `babel-plugin-formatjs` 生成 id | 使用显式的点分隔 id，使每个 id 对应一个字典。 |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl.md)
- [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)
- [在 Vite 和 React 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- [从 react-i18next 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-i18next_to_intlayer.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
