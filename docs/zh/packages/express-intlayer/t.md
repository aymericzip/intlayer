# Documentation: `t` 函数 在 `express-intlayer`

`t` 函数在 `express-intlayer` 包中是提供本地化响应的核心工具。它通过根据用户的首选语言动态选择内容来简化国际化 (i18n)。

---

## 概述

`t` 函数用于定义和检索一组语言的翻译。它会根据客户端的请求设置（例如，`Accept-Language` 头）自动确定返回的适当语言。如果首选语言不可用，它会优雅地回退到您配置中指定的默认区域。

---

## 主要特性

- **动态本地化**：自动选择最适合客户端的翻译。
- **回退到默认区域**：如果客户端的首选语言不可用，则回退到默认区域，确保用户体验的连续性。
- **轻量且快速**：为高性能应用设计，确保最低的开销。
- **严格模式支持**：强制执行对声明的区域的严格遵守，以确保可靠的行为。

---

## 函数签名

```typescript
t(translations: Record<string, string>): string;
```

### 参数

- `translations`：一个对象，其中的键是区域代码（例如：`en`，`fr`，`es-MX`），而值是对应的翻译字符串。

### 返回

- 一个表示客户端首选语言内容的字符串。

---

## 加载国际化请求处理程序

为了确保 `express-intlayer` 提供的国际化功能正常工作，您 **必须** 在 Express 应用程序的开头加载国际化中间件。这将启用 `t` 函数并确保正确处理区域检测和翻译。

在您的应用程序中将 `app.use(intlayer())` 中间件放置在 **所有路由之前**，以确保所有路由都能享受国际化的好处：

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 定义在加载中间件后路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 定义在加载中间件后路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// 加载国际化请求处理程序
app.use(intlayer());

// 定义在加载中间件后路由
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### 为什么这是必需的

- **区域检测**：`intlayer` 中间件处理传入请求，以检测用户的首选区域，基于头部、Cookies 或其他配置方法。
- **翻译上下文**：设置 `t` 函数正确操作所需的上下文，确保翻译以正确的语言返回。
- **错误预防**：如果没有这个中间件，使用 `t` 函数将导致运行时错误，因为必要的区域信息将不可用。

---

## 使用示例

### 基本示例

以不同语言提供本地化内容：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**客户端请求：**

- 使用 `Accept-Language: fr` 的客户端将接收 `Bienvenue!`。
- 使用 `Accept-Language: es` 的客户端将接收 `¡Bienvenido!`。
- 使用 `Accept-Language: de` 的客户端将接收 `Welcome!`（默认区域）。

### 处理错误

以多种语言提供错误消息：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### 使用区域变体

指定区域特定变体的翻译：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## 高级主题

### 回退机制

如果首选区域不可用，`t` 函数将回退到配置中定义的默认区域：

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
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

例如：

- 如果 `defaultLocale` 为 `Locales.CHINESE` 且客户端请求 `Locales.DUTCH`，则返回的翻译将默认为 `Locales.CHINESE` 的值。
- 如果未定义 `defaultLocale`，则 `t` 函数将回退至 `Locales.ENGLISH` 的值。

---

### 严格模式强制执行

配置 `t` 函数以强制执行对声明的区域的严格遵守：

| 模式        | 行为                                               |
| ----------- | -------------------------------------------------- |
| `strict`    | 所有声明的区域必须提供翻译。缺失的区域将抛出错误。 |
| `inclusive` | 声明的区域必须有翻译。缺失的区域触发警告但被接受。 |
| `loose`     | 任何现有区域被接受，即使未声明。                   |

配置示例：

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 您现有的配置
  internationalization: {
    // ... 您现有的国际化配置
    strictMode: "strict", // 强制严格模式
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 您现有的配置
  internationalization: {
    // ... 您现有的国际化配置
    strictMode: "strict", // 强制严格模式
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 您现有的配置
  internationalization: {
    // ... 您现有的国际化配置
    strictMode: "strict", // 强制严格模式
  },
};

module.exports = config;
```

---

### TypeScript 集成

`t` 函数在与 TypeScript 一起使用时是类型安全的。定义一个类型安全的翻译对象：

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### 常见错误与疑难解答

| 问题           | 原因                               | 解决方案                                   |
| -------------- | ---------------------------------- | ------------------------------------------ |
| `t` 函数未工作 | 中间件未加载                       | 确保在路由之前添加 `app.use(intlayer())`。 |
| 缺失翻译错误   | 启用严格模式但未提供所有区域的翻译 | 提供所有必需的翻译。                       |

---

## 有效使用的提示

1. **集中管理翻译**：使用集中模块或 JSON 文件来管理翻译，以提高可维护性。
2. **验证翻译**：确保每个语言变体都有相应的翻译，以避免不必要地回退。
3. **与前端 i18n 结合**：与前端国际化同步，以实现应用内的无缝用户体验。
4. **性能基准测试**：在添加翻译时测试应用程序的响应时间，以确保影响最小。

---

## 结论

`t` 函数是后端国际化的强大工具。通过有效使用它，您可以为全球受众创建更具包容性和用户友好的应用程序。有关高级用法和详细配置选项，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。
