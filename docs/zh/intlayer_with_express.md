# 获取开始国际化 (i18n) 使用 Intlayer 和 Express

`express-intlayer` 是一个强大的国际化 (i18n) 中间件，用于 Express 应用程序，旨在通过根据客户端的偏好提供本地化响应，使您的后端服务全球可用。

## 为什么要国际化您的后端？

国际化您的后端对于有效服务全球受众至关重要。它允许您的应用程序以每个用户的偏好语言传递内容和消息。这种能力提高了用户体验，并通过使其对来自不同语言背景的人们更可访问和相关，从而扩大了应用程序的覆盖范围。

### 实用案例

- **以用户语言显示后端错误**：当发生错误时，以用户母语显示消息可以提高理解度，并减少挫败感。这对于可能显示在像点通知或模态这样的前端组件中的动态错误消息尤其有用。

- **检索多语言内容**：对于从数据库中提取内容的应用程序，国际化确保您可以以多种语言提供这些内容。这对于需要以用户偏好语言显示产品描述、文章和其他内容的平台，如电子商务网站或内容管理系统至关重要。

- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人语言发送电子邮件都可以显著提高参与度和有效性。

- **多语言推送通知**：对于移动应用程序，以用户偏好语言发送推送通知可以增强互动和留存。这种个性化的方式可以使通知感觉更相关和可操作。

- **其他通信**：来自后端的任何形式的通信，如 SMS 消息、系统警报或用户界面更新，从用户的语言中受益，确保清晰度并提升整体用户体验。

通过对后端进行国际化，您的应用程序不仅尊重文化差异，还更好地与全球市场需求对接，这使其成为扩大您服务全球范围内的关键步骤。

## 开始使用

### 安装

要开始使用 `express-intlayer`，请使用 npm 安装该软件包：

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### 设置

通过在项目根目录创建 `intlayer.config.ts` 来配置国际化设置：

```typescript
// intlayer.config.ts
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

### Express 应用程序设置

设置您的 Express 应用程序以使用 `express-intlayer`：

```typescript
// src/index.ts
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

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// 启动服务器
app.listen(3000, () => {
  console.info(`Listening on port 3000`);
});
```

### 兼容性

`express-intlayer` 完全兼容：

- `react-intlayer` 用于 React 应用程序
- `next-intlayer` 用于 Next.js 应用程序

它还与各种环境中的任何国际化解决方案无缝工作，包括浏览器和 API 请求。您可以自定义中间件以通过标头或 cookie 检测区域：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // 其他配置选项
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

默认情况下，`express-intlayer` 将解释 `Accept-Language` 标头以确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/concept/configuration.md)。

## 驱动程序 TypeScript

`express-intlayer` 利用 TypeScript 的强大能力来增强国际化过程。TypeScript 的静态类型确保每个翻译键都有所考虑，减少缺少翻译的风险并提高可维护性。

> 确保生成的类型（默认位于 ./types/intlayer.d.ts）包括在您的 tsconfig.json 文件中。
