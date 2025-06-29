---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | express-intlayer
description: 查看如何使用 express-intlayer 软件包
keywords:
  - Intlayer
  - express-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: 用于国际化 (i18n) Express.js 应用的 JavaScript 包

**Intlayer** 是专为 JavaScript 开发者设计的一套工具包。它兼容 React、Next.js 和 Express.js 等框架。

**`express-intlayer` 包** 允许您对 Express.js 应用进行国际化。它提供了一个中间件，用于检测用户的首选语言，并返回适合用户的字典。

## 为什么要对后端进行国际化？

对后端进行国际化对于有效服务全球用户至关重要。它使您的应用能够以每个用户的首选语言提供内容和消息。这种能力提升了用户体验，并通过使应用更易于访问和更具相关性，扩大了应用的覆盖范围。

### 实际使用场景

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解力并减少挫败感。这对于可能在前端组件（如弹出框或模态框）中显示的动态错误消息尤其有用。

- **检索多语言内容**：对于从数据库中提取内容的应用，国际化确保您可以以多种语言提供这些内容。这对于需要以用户首选语言显示产品描述、文章和其他内容的平台（如电子商务网站或内容管理系统）至关重要。

- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人的语言发送电子邮件可以显著提高参与度和效果。

- **多语言推送通知**：对于移动应用，以用户首选语言发送推送通知可以增强互动性和用户留存率。这种个性化的触摸可以使通知更具相关性和可操作性。

- **其他通信**：后端的任何形式的通信（如短信消息、系统警报或用户界面更新）都受益于使用用户的语言，从而确保清晰性并提升整体用户体验。

通过对后端进行国际化，您的应用不仅尊重文化差异，还更好地符合全球市场需求，使其成为扩展服务全球化的重要一步。

## 为什么要集成 Intlayer？

- **类型安全环境**：利用 TypeScript 确保所有内容定义精确无误。

## 安装

使用您喜欢的包管理器安装必要的包：

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### 配置 Intlayer

Intlayer 提供了一个配置文件来设置您的项目。将此文件放置在项目的根目录中。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用示例

设置您的 Express 应用以使用 `express-intlayer`：

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// 启动服务器
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// 启动服务器
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// 启动服务器
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 兼容性

`express-intlayer` 完全兼容：

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 用于 React 应用
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md) 用于 Next.js 应用
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md) 用于 Vite 应用

它还可以无缝地与各种环境（包括浏览器和 API 请求）的任何国际化解决方案一起使用。您可以自定义中间件通过头信息或 Cookie 检测语言环境：

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

默认情况下，`express-intlayer` 将解释 `Accept-Language` 头以确定客户端的首选语言。

## `express-intlayer` 包提供的功能

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-GB/packages/express-intlayer/t.md)
