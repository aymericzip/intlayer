---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: 如何翻译您的Nest backend应用 – i18n指南 2025
description: 了解如何使你的 vite 后端支持多语言。按照文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - NestJS
  - JavaScript
  - 后端
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: 初始文档
---

# 使用Intlayer翻译您的Nest backend | 国际化(i18n)

`express-intlayer` 是一个功能强大的国际化（i18n）中间件，适用于 Express 应用程序，旨在通过根据客户端的偏好提供本地化响应，使您的后端服务能够面向全球用户。由于 NestJS 构建在 Express 之上，您可以将 `express-intlayer` 无缝集成到您的 NestJS 应用中，有效处理多语言内容。

## 为什么要对后端进行国际化？

对后端进行国际化对于有效服务全球用户至关重要。它允许您的应用程序以每个用户偏好的语言提供内容和消息。这种能力提升了用户体验，并通过使应用程序对不同语言背景的人更易访问和相关，扩大了应用的影响范围。

### 实际应用场景

- **以用户语言显示后端错误**：当发生错误时，以用户的母语显示消息可以提高理解度并减少挫败感。这对于可能在前端组件如提示框或模态框中显示的动态错误消息尤其有用。

- **检索多语言内容**：对于从数据库获取内容的应用程序，国际化确保您可以以多种语言提供这些内容。这对于需要以用户偏好语言显示产品描述、文章及其他内容的电商平台或内容管理系统至关重要。

- **发送多语言电子邮件**：无论是事务性电子邮件、营销活动还是通知，以收件人语言发送邮件都能显著提高参与度和效果。

- **多语言推送通知**：对于移动应用程序，以用户偏好的语言发送推送通知可以增强互动和用户留存。这种个性化的触达使通知更具相关性和可操作性。

- **其他通信**：来自后端的任何形式的通信，如短信、系统警报或用户界面更新，使用用户的语言都有助于确保清晰度并提升整体用户体验。

通过对后端进行国际化，您的应用不仅尊重文化差异，还能更好地符合全球市场需求，这使其成为扩展您的服务到全球的关键步骤。

## 入门指南

### 创建一个新的 NestJS 项目

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

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

### 配置 tsconfig.json

为了在 TypeScript 中使用 Intlayer，请确保您的 `tsconfig.json` 已设置为支持 ES 模块。您可以通过将 `module` 和 `moduleResolution` 选项设置为 `nodenext` 来实现此目的。

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... 其他选项
  },
}
```

### 设置

通过在项目根目录创建 `intlayer.config.ts` 来配置国际化设置：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### 声明您的内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./src`），并且文件扩展名符合内容声明的格式（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](/doc/concept/content)。

### Express 中间件设置

将 `express-intlayer` 中间件集成到您的 NestJS 应用程序中以处理国际化：

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // 应用于所有路由
  }
}
```

### 在您的服务或控制器中使用翻译

您现在可以使用 `getIntlayer` 函数在服务或控制器中访问翻译：

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### 兼容性

`express-intlayer` 完全兼容：

- 适用于 React 应用的 [`react-intlayer`](/doc/packages/react-intlayer)
- 适用于 Next.js 应用的 [`next-intlayer`](/doc/packages/next-intlayer)
- 适用于 Vite 应用的 [`vite-intlayer`](/doc/packages/vite-intlayer)

它还可以无缝配合各种环境中的任何国际化解决方案，包括浏览器和 API 请求。您可以自定义中间件，通过请求头或 Cookie 来检测语言环境：

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

默认情况下，`express-intlayer` 会解析 `Accept-Language` 头来确定客户端的首选语言。

> 有关配置和高级主题的更多信息，请访问我们的[文档](/doc/concept/configuration)。

### 配置 TypeScript

`express-intlayer` 利用 TypeScript 强大的功能来增强国际化过程。TypeScript 的静态类型确保每个翻译键都被考虑到，减少了缺失翻译的风险，并提升了可维护性。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保自动生成的类型（默认位于 ./types/intlayer.d.ts）已包含在你的 tsconfig.json 文件中。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  include: [
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

要做到这一点，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
