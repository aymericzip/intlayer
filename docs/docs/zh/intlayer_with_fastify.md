---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: 如何翻译你的 Fastify 后端 — 国际化 (i18n) 指南 2026
description: 了解如何使你的 Fastify 后端实现多语言。按照文档对其进行国际化 (i18n) 并翻译。
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
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: 添加 init 命令
  - version: 7.6.0
    date: 2025-12-31
    changes: 初始化历史
---

# 使用 Intlayer 翻译你的 Fastify 后端网站 | 国际化 (i18n)

`fastify-intlayer` 是一个功能强大的 Fastify 应用国际化 (i18n) 插件，旨在通过根据客户端偏好提供本地化响应，使你的后端服务可在全球范围内访问。

### 实用用例

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息能提高理解并减少挫败感。这对于可能在前端组件（如 toast 或模态窗口）中显示的动态错误消息尤其有用。

`fastify-intlayer` 是一个强大的 Fastify 应用国际化 (i18n) 插件，旨在根据客户端的偏好提供本地化响应，使你的后端服务在全球范围内可访问。

### 实用场景

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解并减少挫折感。这对那些可能在前端组件（例如 toasts 或 modals）中显示的动态错误消息尤其有用。
- **检索多语言内容**：对于从数据库拉取内容的应用，国际化可确保你以多种语言提供这些内容。这对于需要以用户首选语言显示产品描述、文章和其他内容的平台（如电子商务网站或内容管理系统）至关重要。
- **发送多语言电子邮件**：无论是事务性邮件、营销活动还是通知，以收件人语言发送邮件都能显著提高参与度和效果。
- **多语言推送通知**：对于移动应用，在用户偏好的语言中发送推送通知可以提升互动和用户留存。这样的个性化处理会让通知显得更相关且更容易促使用户采取行动。
- **其他通讯**：来自后端的任何形式的通信，例如短信、系统告警或用户界面更新，在用户语言中呈现都能提升清晰度并增强整体用户体验。

通过对后端进行国际化，您的应用不仅尊重文化差异，而且更符合全球市场需求，这是一项将服务扩展到全球的重要步骤。

## 入门

### 安装

要开始使用 `fastify-intlayer`，请使用 npm 安装该包：

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
bunx intlayer init

```

### 设置

通过在项目根目录创建一个 `intlayer.config.ts` 来配置国际化设置：

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

/** @type {import('intlayer').IntlayerConfig} */ // 类型注释：Intlayer 配置
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

/** @type {import('intlayer').IntlayerConfig} */ // 类型注释：Intlayer 配置
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

### 声明您的内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      zh: "返回内容示例（英语）",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */ // 类型注解：import('intlayer').Dictionary
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      zh: "示例：返回的内容（中文）",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */ // 类型注解：import('intlayer').Dictionary
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      zh: "示例：返回的内容（中文）",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
        "zh": "返回内容示例（英语）",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 一旦内容声明文件被包含到 `contentDir` 目录（默认 `./src`）中，你可以在应用的任何位置定义它们。并且文件扩展名应匹配内容声明文件扩展名（默认 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### Fastify 应用设置

配置你的 Fastify 应用以使用 `fastify-intlayer`：

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
    zh: "返回的内容示例（中文）",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
    zh: "示例：以中文返回的内容",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

// 启动服务器的 async/await 包装器
const start = async () => {
  try {
    // 加载国际化插件
    await fastify.register(intlayer);

    // 路由
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        zh: "示例：以英文/法文/西班牙文返回的内容（参见各语言对应条目）",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

`fastify-intlayer` 完全兼容：

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md)>) 用于 React 应用
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md)>) 用于 Next.js 应用
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md)>) 适用于 Vite 应用程序

它还可与各种环境中的任何国际化解决方案无缝配合，包括浏览器和 API 请求。您可以自定义中间件，通过请求头或 Cookie 检测 locale：

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

默认情况下，`fastify-intlayer` 会解析 `Accept-Language` 头以确定客户端的首选语言。

> 欲了解有关配置和高级主题的更多信息，请访问我们的[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`fastify-intlayer` 利用 TypeScript 强大的能力来增强国际化流程。TypeScript 的静态类型确保每个翻译键都被涵盖，降低遗漏翻译的风险并提高可维护性。

确保自动生成的类型（默认位于 ./types/intlayer.d.ts）已包含在你的 tsconfig.json 文件中。

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

为提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code Extension**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- **自动完成（Autocompletion）** 翻译键。
- **实时错误检测**，用于发现缺失的翻译。
- **内联预览** 已翻译的内容。
- **快速操作**，便于快速创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code Extension 文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件，这样可以避免将它们提交到 Git 仓库。

为此，您可以将以下指令添加到 `.gitignore` 文件：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
