---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 如何翻译您的Express backend应用 – i18n指南 2025
description: 了解如何使您的 vite 后端实现多语言。请遵循文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Express
  - JavaScript
  - 后端
slugs:
  - doc
  - environment
  - express
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 使用Intlayer翻译您的Express backend | 国际化(i18n)

`express-intlayer` 是一个强大的国际化 (i18n) 中间件，适用于 Express 应用程序，旨在通过根据客户端的偏好提供本地化响应，使您的后端服务能够全球化访问。

## 为什么要国际化您的后端？

国际化您的后端对于有效服务全球受众至关重要。它使您的应用程序能够以每个用户的首选语言提供内容和消息。这种能力提升了用户体验，并通过使应用程序更易于访问和更贴近不同语言背景的用户，扩大了应用程序的影响范围。

### 实际使用场景

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解力并减少挫败感。这对于可能在前端组件（如弹出消息或模态框）中显示的动态错误消息尤为有用。

- **检索多语言内容**：对于从数据库中提取内容的应用程序，国际化确保您可以以多种语言提供这些内容。这对于需要以用户首选语言显示产品描述、文章和其他内容的平台（如电子商务网站或内容管理系统）至关重要。
- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人的语言发送电子邮件可以显著提高参与度和效果。

- **多语言推送通知**：对于移动应用程序，以用户首选语言发送推送通知可以增强互动性和用户留存率。这种个性化处理可以使通知更具相关性和可操作性。

- **其他通信**：来自后端的任何形式的通信，例如短信消息、系统警报或用户界面更新，都因使用用户的语言而受益，从而确保清晰度并提升整体用户体验。
  通过国际化后端，您的应用程序不仅尊重文化差异，还能更好地符合全球市场需求，这使其成为扩展全球服务的关键步骤。

## 入门

### 安装

要开始使用 `express-intlayer`，请使用 npm 安装该包：

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### 配置

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

### 声明您的内容

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
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
      zh: "返回内容示例",
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

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      zh: "返回内容示例",
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
        "en": "Example of returned content in English",
        "zh": "返回内容示例",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> 您可以在应用程序中的任何位置定义内容声明，只要它们包含在 `contentDir` 目录中（默认是 `./src`），并且文件扩展名符合内容声明格式（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### Express 应用程序设置

设置您的 Express 应用程序以使用 `express-intlayer`：

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 启动服务器
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      zh: "返回内容的示例（中文）",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 启动服务器
app.listen(3000, () => console.log(`监听端口 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// 启动服务器
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 兼容性

`express-intlayer` 完全兼容：

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 用于 React 应用
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md) 用于 Next.js 应用
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md) 用于 Vite 应用
  它还可以无缝地与各种环境中的任何国际化解决方案协同工作，包括浏览器和 API 请求。您可以自定义中间件，通过请求头或 Cookie 来检测语言环境：

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

默认情况下，`express-intlayer` 会解析 `Accept-Language` 头来确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 配置 TypeScript

`express-intlayer` 利用 TypeScript 强大的功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被考虑到，减少遗漏翻译的风险并提升可维护性。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件，这样可以避免将它们提交到您的 Git 仓库中。

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/zh/vs-code-extension)。

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下内容添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
