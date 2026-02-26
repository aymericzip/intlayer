---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - 如何翻译AdonisJS 应用 2026
description: 探索如何使您的 AdonisJS 后端多语言化。遵循文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - AdonisJS
  - JavaScript
  - 后端
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: 初始化历史
---

# 使用 Intlayer 翻译您的 AdonisJS 后端网站 | 国际化 (i18n)

`adonis-intlayer` 是一个专为 AdonisJS 应用程序设计的强大国际化 (i18n) 包，旨在通过根据客户端首选项提供本地化响应，使您的后端服务全球化。

### 实际用例

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解力并减少挫败感。这对于可能显示在前端组件（如 toast 或模态框）中的动态错误消息特别有用。

- **检索多语言内容**：对于从数据库中提取内容的应用程序，国际化确保您可以提供多种语言的内容。这对于电子商务网站或内容管理系统等需要以用户首选语言显示产品描述、文章和其他内容的平台至关重要。

- **发送多语言电子邮件**：无论是交易电子邮件、营销活动还是通知，以收件人的语言发送电子邮件都可以显著提高参与度和效率。

- **多语言推送通知**：对于移动应用程序，以用户首选语言发送推送通知可以增强互动和留存。这种个性化的触达可以使通知感觉更相关且更具操作性。

- **其他通信**：后端发出的任何形式的通信，如短信、系统警报或用户界面更新，都受益于使用用户的语言，确保清晰度并增强整体用户体验。

通过对后端进行国际化，您的应用程序不仅尊重文化差异，而且更好地符合全球市场需求，这是在全球范围内扩展服务的关键一步。

## 入门

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### 安装

要开始使用 `adonis-intlayer`，请使用 npm 安装该包：

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### 设置

在项目根目录创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### 声明内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      zh: "中文返回内容示例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      zh: "中文返回内容示例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      zh: "中文返回内容示例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "zh": "中文返回内容示例",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 只要您的内容声明包含在 `contentDir` 目录（默认为 `./src` 或 `./app`）中，就可以在应用程序的任何位置定义。并且符合内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### AdonisJS 应用程序设置

设置您的 AdonisJS 应用程序以使用 `adonis-intlayer`。

#### 注册中间件

首先，您需要在应用程序中注册 `intlayer` 中间件。

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### 定义路由

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    zh: "中文返回内容示例",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### 函数

`adonis-intlayer` 导出了几个函数来处理应用程序中的国际化：

- `t(content, locale?)`：基础翻译函数。
- `getIntlayer(key, locale?)`：通过键从字典中检索内容。
- `getDictionary(dictionary, locale?)`：从特定字典对象检索内容。
- `getLocale()`：从请求上下文中检索当前语言区域。

#### 在控制器中使用

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        zh: "来自控制器的你好",
      })
    );
  }
}
```

### 兼容性

`adonis-intlayer` 完全兼容：

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 用于 React 应用程序
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md) 用于 Next.js 应用程序
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md) 用于 Vite 应用程序

它还可以无缝地与跨各种环境（包括浏览器和 API 请求）的任何国际化解决方案配合使用。您可以自定义中间件通过标头或 cookie 检测语言区域：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置选项
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

默认情况下，`adonis-intlayer` 将解释 `Accept-Language` 标头以确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`adonis-intlayer` 利用 TypeScript 的强大功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被考虑到，从而降低丢失翻译的风险并提高可维护性。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保在 tsconfig.json 文件中包含自动生成的类型（默认为 ./types/intlayer.d.ts）。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 丢失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/zh/doc/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
