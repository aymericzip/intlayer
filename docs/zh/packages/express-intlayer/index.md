# express-intlayer: 将 Express.js 应用程序国际化 (i18n) 的 JavaScript 包

**Intlayer** 是专为 JavaScript 开发人员设计的一套软件包。它兼容 React、Next.js 和 Express.js 等框架。

**`express-intlayer` 包** 允许您对您的 Express.js 应用程序进行国际化。它提供了一个中间件来检测用户的首选语言，并返回适合该用户的字典。

## 为什么要国际化您的后端？

国际化您的后端对于有效地为全球观众提供服务至关重要。它允许您的应用程序以每个用户的首选语言提供内容和消息。此功能提高了用户体验，并通过使应用程序更易于访问和与不同语言背景的人们更相关，扩大了您的应用程序的覆盖面。

### 实用用例

- **以用户的语言显示后端错误**：当发生错误时，以用户的母语显示消息可以改善理解并减少挫败感。这对于可能在前端组件（如 toast 或模态框）中显示的动态错误消息特别有用。

- **检索多语言内容**：对于从数据库提取内容的应用程序，国际化确保您可以以多种语言提供此内容。这对于需要以用户首选语言显示产品描述、文章和其他内容的电子商务网站或内容管理系统至关重要。

- **发送多语言电子邮件**：无论是交易电子邮件、营销活动还是通知，以收件人的语言发送电子邮件可以显著提高互动性和有效性。

- **多语言推送通知**：对于移动应用程序，以用户首选语言发送推送通知可以增强互动性和留存率。这种个性化的方式可以使通知感觉更相关和可操作。

- **其他通信**：从后端发出的任何形式的通信，例如 SMS 消息、系统警报或用户界面更新，都能受益于用户的语言，从而确保清晰性并增强整体用户体验。

通过国际化后端，您的应用程序不仅尊重文化差异，还更好地与全球市场需求保持一致，从而成为将您的服务扩展到全球的关键步骤。

## 为什么要集成 Intlayer？

- **类型安全环境**：利用 TypeScript 确保您的所有内容定义都是精准和无误的。

## 安装

使用您偏好的包管理器安装必要的软件包：

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

Intlayer 提供了一个配置文件来设置您的项目。将该文件放置在项目的根目录中。

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

> 有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用示例

设置您的 Express 应用程序以使用 `express-intlayer`：

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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/index.md) 用于 React 应用程序
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/index.md) 用于 Next.js 应用程序
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/vite-intlayer/index.md) 用于 Vite 应用程序

它也可以与各种环境中的任何国际化解决方案无缝协作，包括浏览器和 API 请求。您可以自定义中间件以通过标头或 cookies 检测语言：

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

根据默认设置，`express-intlayer` 将解读 `Accept-Language` 标头以确定客户端首选语言。

## `express-intlayer` 包提供的功能

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/express-intlayer/t.md)
