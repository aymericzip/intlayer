---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "从 svelte-i18n 迁移到 Intlayer"
description: "分步将 Svelte 或 SvelteKit 应用从 svelte-i18n 迁移到 Intlayer。借助 compat adapter @intlayer/svelte-i18n，$_、$date 和 $number store 照常工作。"
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# 从 svelte-i18n 迁移到 Intlayer

## 为什么从 svelte-i18n 迁移到 Intlayer？

<AccordionGroup>
<Accordion header="Bundle 体积">

svelte-i18n 在启动时注册完整的 locale 文件。Intlayer 只发送每个页面用到的字典，可 **将 bundle 和页面体积减少多达 50%**。

</Accordion>
<Accordion header="可维护性">

键根据你的字典进行 **类型检查**：无效的键会在构建时失败。内容可以放在使用它的组件旁边。

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

1. **Compat adapter（推荐用于现有应用）**：安装 `@intlayer/svelte-i18n`。它暴露与 `svelte-i18n` 相同的 API（`init`、`locale`、`$_` / `$t`、`$json`、`$date`、`$time`、`$number`、`getLocaleFromNavigator`…），并从 Intlayer 字典中提供消息。ICU MessageFormat 照常工作。
2. **完整迁移**：逐步用 `svelte-intlayer` 中的 `useIntlayer` 和放在组件旁边的 `.content.ts` 文件替换 svelte-i18n store。

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> 保留 `svelte-i18n`：它提供 TypeScript 类型。

</Step>
<Step number={2} title="配置 Intlayer">

将 `syncJSON` 插件指向你现有的消息文件。每个 namespace 一个文件（`src/locales/en/home.json`）时，每个文件都会成为一个字典：

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` 解析为 `home` 字典的 `title` 字段。如果你每个 locale 使用一个文件（`src/locales/en.json`）并带有嵌套 namespace，请改用 `source: ({ locale }) => \`./src/locales/${locale}.json\``：每个顶层键都会成为一个字典。

</Step>
<Step number={3} title="添加 Vite 插件">

`svelteI18nVitePlugin()` 会运行 Intlayer 构建，并将 `svelte-i18n` 别名到 `@intlayer/svelte-i18n`，无需修改源文件。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> 对于 SvelteKit，请在同一个 `plugins` 数组中将 `svelteI18nVitePlugin()` 添加到 `sveltekit()` 之后。

</Step>
<Step number={4} title="简化 i18n 配置">

保留 `init()`，但移除 `register()` 和 `addMessages()`：消息来自 Intlayer 字典。

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

你的组件无需修改即可继续工作：

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

设置 `$locale = 'fr'` 会同时切换 svelte-i18n store 和 `useIntlayer` 的语言。

## 完整迁移

<Steps>
<Step number={5} title="显式重命名 import（可选）" isOptional={true}>

Vite 插件已经处理了别名。如需让依赖关系更明确：

| 之前                                         | 之后                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="将内容迁移到 .content.ts 文件" isOptional={true}>

新组件可以在现有 svelte-i18n 调用旁使用原生 Intlayer 内容：

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| 文件 / 模式                         | 不再需要的原因               |
| ----------------------------------- | ---------------------------- |
| `register()` / `addMessages()` 调用 | 字典由 Intlayer 编译和加载。 |
| 渲染前的 `waitLocale()`             | 设置 locale 后即可使用消息。 |

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

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/svelte-i18n.md)
- [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)
- [在 Vite 和 Svelte 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md)
- [在 SvelteKit 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_svelte_kit.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
