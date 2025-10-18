---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 函数文档 | express-intlayer
description: 了解如何使用 express-intlayer 包中的 t 函数
keywords:
  - t
  - 翻译
  - Intlayer
  - 国际化
  - 文档
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 文档：`express-intlayer` 中的 `t` 函数

`express-intlayer` 包中的 `t` 函数是为您的 Express 应用提供本地化响应的核心工具。它通过根据用户的首选语言动态选择内容，简化了国际化（i18n）过程。

---

## 概述

`t` 函数用于定义和获取一组语言的翻译内容。它会根据客户端的请求设置（例如 `Accept-Language` 头）自动确定返回的合适语言。如果首选语言不可用，它会优雅地回退到您配置中指定的默认语言环境。

---

## 主要特性

- **动态本地化**：自动为客户端选择最合适的翻译内容。
- **回退到默认语言环境**：如果客户端首选语言不可用，则回退到默认语言环境，确保用户体验的连续性。
- **轻量且快速**：为高性能应用设计，确保最小的开销。
- **严格模式支持**：强制严格遵守声明的语言环境，保证行为可靠。

---

## 函数签名

```typescript
t(translations: Record<string, string>): string;
```

### 参数

- `translations`：一个对象，键为语言环境代码（例如 `en`、`fr`、`es-MX`），值为对应的翻译字符串。

### 返回值

- 返回一个字符串，表示客户端首选语言的内容。

---

## 加载国际化请求处理器

为了确保 `express-intlayer` 提供的国际化功能能够正确工作，您**必须**在 Express 应用程序的开头加载国际化中间件。这将启用 `t` 函数，并确保正确处理语言环境的检测和翻译。

请将 `app.use(intlayer())` 中间件放置在应用程序的**所有路由之前**，以确保所有路由都能受益于国际化：

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 加载国际化请求处理器
app.use(intlayer());

// 在加载中间件后定义路由
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

// 在加载中间件后定义路由
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

/// 在加载中间件后定义您的路由
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

### 为什么需要这样做

- **语言环境检测**：`intlayer` 中间件处理传入请求，根据请求头、Cookie 或其他配置的方法检测用户偏好的语言环境。
- **翻译上下文**：为 `t` 函数设置必要的上下文，确保返回正确语言的翻译内容。
- **防止错误**：如果没有此中间件，使用 `t` 函数将导致运行时错误，因为缺少必要的语言环境信息。

---

## 使用示例

### 基本示例

提供不同语言的本地化内容：

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

- 带有 `Accept-Language: fr` 的客户端将收到 `Bienvenue!`。
- 一个带有 `Accept-Language: es` 的客户端将收到 `¡Bienvenido!`。
- 一个带有 `Accept-Language: de` 的客户端将收到 `Welcome!`（默认语言）。

### 处理错误

提供多语言的错误信息：

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
      en: "发生了意外错误。",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### 使用区域变体

为特定区域的变体指定翻译：

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

如果首选语言不可用，`t` 函数将回退到配置中定义的默认语言：

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

- 如果 `defaultLocale` 是 `Locales.CHINESE`，而客户端请求的是 `Locales.DUTCH`，则返回的翻译将默认使用 `Locales.CHINESE` 的值。
- 如果未定义 `defaultLocale`，则 `t` 函数将回退到使用 `Locales.ENGLISH` 的值。

---

### 严格模式强制执行

配置 `t` 函数以强制严格遵守声明的语言环境：

| 模式        | 行为                                                           |
| ----------- | -------------------------------------------------------------- |
| `strict`    | 所有声明的语言环境必须提供翻译。缺少的语言环境将抛出错误。     |
| `inclusive` | 声明的语言必须有对应的翻译。缺失的语言会触发警告，但仍被接受。 |
| `loose`     | 接受任何存在的语言，即使未声明。                               |

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
    // ... 你现有的国际化配置
    strictMode: "strict", // 强制启用严格模式
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 你现有的配置
  internationalization: {
    // ... 你现有的国际化配置
    strictMode: "strict", // 强制启用严格模式
  },
};

module.exports = config;
```

---

### TypeScript 集成

当与 TypeScript 一起使用时，`t` 函数是类型安全的。定义一个类型安全的翻译对象：

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
// 定义类型安全的翻译内容
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
// 定义类型安全的翻译内容
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

### 常见错误与故障排除

| 问题             | 原因                             | 解决方案                                   |
| ---------------- | -------------------------------- | ------------------------------------------ |
| `t` 函数无法工作 | 中间件未加载                     | 确保在路由之前添加 `app.use(intlayer())`。 |
| 缺少翻译错误     | 严格模式启用但未提供所有语言版本 | 提供所有必需的翻译。                       |

---

## 有效使用技巧

1. **集中管理翻译**：使用集中式模块或 JSON 文件来管理翻译，以提高可维护性。
2. **验证翻译**：确保每种语言变体都有对应的翻译，避免不必要的回退。
3. **与前端国际化结合**：与前端国际化同步，确保整个应用的用户体验无缝衔接。
4. **性能基准测试**：在添加翻译时测试应用的响应时间，确保影响最小化。

---

## 结论

`t` 函数是后端国际化的强大工具。通过有效地使用它，您可以为全球用户创建一个更加包容和用户友好的应用程序。有关高级用法和详细配置选项，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。
