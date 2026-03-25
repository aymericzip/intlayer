---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 如何在 2026 年翻译 Fastify 应用程序
description: 了解如何使您的 Fastify 后端实现多语言。按照文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Fastify
  - JavaScript
  - 后端
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "添加 init 命令"
  - version: 7.6.0
    date: 2025-12-31
    changes: "初始化历史记录"
---

# 使用 Intlayer 翻译您的 Fastify 后端网站 | 国际化 (i18n)

`fastify-intlayer` 是一个强大的 Fastify 应用程序国际化 (i18n) 插件，旨在通过根据客户端的偏好提供本地化响应，使您的后端服务在全球范围内可访问。

> 在 GitHub 上查看软件包实现：https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### 实际应用场景

- **以用户语言显示后端错误**：发生错误时，以用户的母语显示消息可以提高理解度并减少挫败感。这对于可能显示在前端组件（如 toast 或 modal）中的动态错误消息特别有用。
- **检索多语言内容**：对于从数据库提取内容的应用程序，国际化确保您可以提供多种语言的内容。这对于电子商务网站或内容管理系统等平台至关重要，这些平台需要以用户首选的语言显示产品描述、文章和其他内容。
- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人的语言发送电子邮件都可以显著提高参与度和有效性。
- **多语言推送通知**：对于移动应用程序，以用户首选的语言发送推送通知可以增强交互和留存。这种个性化的触感可以让通知感觉更具相关性和可操作性。
- **其他通信**：来自后端的任何形式的通信（如短信、系统警报或用户界面更新）都受益于使用用户的语言，从而确保清晰度并增强整体用户体验。

通过对后端进行国际化，您的应用程序不仅尊重文化差异，而且能更好地符合全球市场需求，使其成为在全球范围内扩展服务的关键步骤。

## 入门指南

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

在 GitHub 上查看 [应用程序模板](https://github.com/aymericzip/intlayer-fastify-template)。

### 安装

要开始使用 `fastify-intlayer`，请使用 npm 安装软件包：

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bun x intlayer init

```

### 设置

通过在项目根目录中创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### 声明内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de 内容 devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de 内容 devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de 内容 devuelto en español (España)",
      "es-MX": "Ejemplo de 内容 devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de 内容 devuelto en español (México)"
      }
    }
  }
}
```

> 只要包含在 `contentDir` 目录（默认为 `./src`）中，您的内容声明就可以在应用程序的任何位置定义。并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详情，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### Fastify 应用程序设置

设置您的 Fastify 应用程序以使用 `fastify-intlayer`：

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 加载国际化插件
await fastify.register(intlayer);

// 路由
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de 内容 devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 加载国际化插件
await fastify.register(intlayer);

// 路由
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de 内容 renvoyé en français",
    "es-ES": "Ejemplo de 内容 devuelto en español (España)",
    "es-MX": "Ejemplo de 内容 devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await 的服务器启动包装器
const start = async () => {
  try {
    // 加载国际化插件
    await fastify.register(intlayer);

    // 路由
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de 内容 renvoyé en français",
        "es-ES": "Ejemplo de 内容 devuelto en español (España)",
        "es-MX": "Ejemplo de 内容 devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### 兼容性

`fastify-intlayer` 与以下项完全兼容：

- 针对 React 应用程序的 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md)
- 针对 Next.js 应用程序的 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md)
- 针对 Vite 应用程序的 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md)

它还可以跨各种环境（包括浏览器和 API 请求）与任何国际化解决方案无缝协作。您可以自定义中间件通过 header 或 cookie 检测语言区域：

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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置选项
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置选项
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

默认情况下，`fastify-intlayer` 将解释 `Accept-Language` 标头以确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`fastify-intlayer` 利用 TypeScript 的强大功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被考虑到，从而降低丢失翻译的风险并提高可维护性。

确保在您的 `tsconfig.json` 文件中包含自动生成的类型（默认为 `./types/intlayer.d.ts`）。

```json5 fileName="tsconfig.json"
{
  // ... 您的现有 TypeScript 配置
  "include": [
    // ... 您的现有 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code Extension**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展包含：

- 翻译键的 **自动补全**。
- 针对缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详情，请参阅 [Intlayer VS Code Extension 文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下说明添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```
