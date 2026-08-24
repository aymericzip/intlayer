---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - 完整指南翻译你的应用"
description: "不再使用 i18next。2026 年构建多语言 (i18n) Elysia 应用的指南。使用 AI 代理翻译并优化 bundle 大小、SEO 和性能。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Elysia 后端网站 | 国际化 (i18n)

`elysia-intlayer` 是一个强大的国际化 (i18n) 插件，为 Elysia 应用程序设计，旨在通过根据客户端偏好提供本地化响应，使您的后端服务全球可访问。

> 在 GitHub 上查看包实现：https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### 实际应用场景

- **用用户语言显示后端错误**：当发生错误时，用用户的母语显示消息可以提高理解度并减少沮丧感。这对于可能在前端组件（如 toast 或模态框）中显示的动态错误消息特别有用。
- **检索多语言内容**：对于从数据库中提取内容的应用程序，国际化可确保您能够以多种语言提供此内容。这对于需要以用户偏好的语言显示产品描述、文章和其他内容的电子商务网站或内容管理系统等平台至关重要。
- **发送多语言电子邮件**：无论是交易电子邮件、营销活动还是通知，用收件人的语言发送电子邮件可以显著增加参与度和有效性。
- **多语言推送通知**：对于移动应用程序，用用户偏好的语言发送推送通知可以增强交互和保留。这种个人化的接触可以使通知感觉更相关和可操作。
- **其他通信**：来自后端的任何形式的通信（如短信消息、系统警报或用户界面更新）都受益于使用用户的语言，确保清晰性并增强整体用户体验。

通过国际化后端，您的应用程序不仅尊重文化差异，而且更好地与全球市场需求相结合，这是在全球范围内扩展服务的关键步骤。

## 快速开始

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

在 GitHub 上查看[应用模板](https://github.com/aymericzip/intlayer-elysia-template)。

### 安装

要开始使用 `elysia-intlayer`，请使用 npm 安装该包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### 设置

通过在项目根目录创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 声明您的内容

创建和管理您的内容声明以存储翻译：

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      zh: "在中文中返回的内容示例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "zh": "在中文中返回的内容示例",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`）。并与内容声明文件扩展名匹配（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详情，请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### Elysia 应用设置

设置您的 Elysia 应用以使用 `elysia-intlayer`：

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // 加载国际化插件
  .use(intlayer())
  // 路由
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

该插件还会将一个 `intlayer` 对象注入到路由上下文中。当您需要显式依赖而不是使用独立帮助函数时，优先使用它：

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // 用于此请求的语言环境，通过 `Accept-Language` 协商或从存储中读取
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> 路由上下文暴露 `locale`、`defaultLocale`、`locale_storage`（客户端显式设置的语言环境）、`locale_detected`（从请求头协商的语言环境）、`t`、`getIntlayer` 和 `getDictionary`。

### 兼容性

`elysia-intlayer` 完全兼容：

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md)>) 用于 React 应用
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md)>) 用于 Next.js 应用
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md)>) 用于 Vite 应用

它也能与各种环境中的任何国际化解决方案无缝协作，包括浏览器和 API 请求。你可以自定义中间件以通过请求头或 cookie 检测语言环境：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置选项
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

默认情况下，`elysia-intlayer` 将解释 `Accept-Language` 请求头来确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`elysia-intlayer` 利用 TypeScript 的强大功能来增强国际化流程。TypeScript 的静态类型确保每个翻译键都被考虑到，降低了缺失翻译的风险，并提高了可维护性。

确保自动生成的类型（默认位于 ./types/intlayer.d.ts）包含在你的 tsconfig.json 文件中。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### VS Code 扩展

为了改进您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **自动完成**翻译键。
- **实时错误检测**缺失的翻译。
- **内联预览**翻译内容。
- **快速操作**轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参考 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到 Git 仓库。

为此，你可以在 `.gitignore` 文件中添加以下说明：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
