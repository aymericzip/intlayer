# 开始使用 Intlayer 和 Express 进行国际化 (i18n)

`express-intlayer` 是一个强大的国际化 (i18n) 中间件，适用于 Express 应用程序，旨在通过根据客户端偏好提供本地化响应，使您的后端服务具有全球可访问性。

## 为什么要对后端进行国际化？

对后端进行国际化对于有效地服务全球受众至关重要。它使您的应用程序能够以每个用户的首选语言传递内容和信息。这种能力增强了用户体验，并通过使其对来自不同语言背景的人们更具可达性和相关性，拓宽了您应用程序的覆盖范围。

### 实际使用案例

- **以用户的语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解度并减少挫败感。这对于在前端组件（如吐司或模态框）中显示的动态错误消息尤其有用。

- **检索多语言内容**：对于从数据库提取内容的应用程序，国际化确保您可以以多种语言提供这些内容。这对于需要以用户首选语言显示产品描述、文章和其他内容的电子商务网站或内容管理系统至关重要。

- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人的语言发送电子邮件可以显著提升参与度和有效性。

- **多语言推送通知**：对于移动应用程序，以用户首选语言发送推送通知可以增强互动和留存。这种个性化的触感可以使通知感觉更相关和可操作。

- **其他沟通**：来自后端的任何形式的沟通，例如 SMS 消息、系统警报或用户界面更新，都可以从用户的语言中受益，确保清晰度并增强整体用户体验。

通过对后端进行国际化，您的应用程序不仅尊重文化差异，还更好地与全球市场需求对接，这使其成为在全球范围内扩展服务的关键步骤。

## 开始

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

### 设置

通过在项目根目录中创建 `intlayer.config.ts`，配置国际化设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

### Express 应用程序设置

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
app.listen(3000, () => console.log(`正在监听端口 3000`));
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
app.listen(3000, () => console.log(`正在监听端口 3000`));
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
app.listen(3000, () => console.log(`正在监听端口 3000`));
```

### 兼容性

`express-intlayer` 与以下内容完全兼容：

- `react-intlayer` 适用于 React 应用程序
- `next-intlayer` 适用于 Next.js 应用程序

它还可以无缝与各种环境中的任何国际化解决方案一起工作，包括浏览器和 API 请求。您可以自定义中间件以通过标头或 cookie 检测区域：

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

默认情况下，`express-intlayer` 将解析 `Accept-Language` 标头，以确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 由 TypeScript 驱动

`express-intlayer` 利用 TypeScript 的强大功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被彻底考虑，降低了遗漏翻译的风险，并提高了可维护性。

> 确保生成的类型（默认在 ./types/intlayer.d.ts）包含在您的 tsconfig.json 文件中。
