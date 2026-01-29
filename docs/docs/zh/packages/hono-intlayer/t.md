---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 函数文档 | hono-intlayer
description: 了解如何为 hono-intlayer 包使用 t 函数
keywords:
  - t
  - 翻译
  - Intlayer
  - 国际化
  - 文档
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# 文档：`hono-intlayer` 中的 `t` 函数

`hono-intlayer` 包中的 `t` 函数是为您在 Hono 应用程序中提供本地化响应的核心工具。它通过根据用户的首选语言动态选择内容来简化国际化 (i18n)。

---

## 概述

`t` 函数用于定义和检索一组给定语言的翻译。它根据客户端的请求设置（如 `Accept-Language` 标头）自动确定要返回的适当语言。如果首选语言不可用，它会优雅地回退到配置中指定的默认语言。

---

## 核心特性

- **动态本地化**：自动为客户端选择最合适的翻译。
- **回退到默认语言**：如果客户端的首选语言不可用，则回退到默认语言，确保用户体验的连续性。
- **轻量且快速**：专为高性能应用程序设计，确保最小的开销。
- **严格模式支持**：强制严格遵守声明的语言，以获得可靠的行为。

---

## 函数签名

```typescript
t(translations: Record<string, string>): string;
```

### 参数

- `translations`：一个对象，其中的键是语言代码（例如 `en`、`fr`、`zh`），值是相应的翻译字符串。

### 返回值

- 一个表示客户端首选语言内容的字符串。

---

## 加载国际化请求处理器

为了确保 `hono-intlayer` 提供的国际化功能正常工作，您**必须**在 Hono 应用程序的开头加载国际化中间件。这会启用 `t` 函数并确保正确处理语言检测和翻译。

将 `app.use("*", intlayer())` 中间件放置在应用程序的**任何路由之前**，以确保所有路由都受益于国际化：

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 加载国际化请求处理器
app.use("*", intlayer());

// 在加载中间件后定义路由
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      zh: "你好，世界！",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 加载国际化请求处理器
app.use("*", intlayer());

// 在加载中间件后定义路由
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      zh: "你好，世界！",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// 加载国际化请求处理器
app.use("*", intlayer());

// 在加载中间件后定义路由
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      zh: "你好，世界！",
    })
  );
});
```

### 为什么这是必需的

- **语言检测**：`intlayer` 中间件处理传入请求，根据标头、cookie 或其他配置方法检测用户的首选语言。
- **翻译上下文**：设置 `t` 函数正常运行所需的上下文，确保以正确的语言返回翻译。
- **防止错误**：如果没有此中间件，使用 `t` 函数将导致运行时错误，因为必要的语言信息将不可用。

---

## 使用示例

### 基础示例

提供不同语言的本地化内容：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      zh: "欢迎！",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      zh: "欢迎！",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      zh: "欢迎！",
    })
  );
});
```

**客户端请求：**

- `Accept-Language: fr` 的客户端将收到 `Bienvenue!`。
- `Accept-Language: zh` 的客户端将收到 `欢迎！`。
- `Accept-Language: de` 的客户端将收到 `Welcome!`（默认语言）。

### 处理错误

提供多种语言的错误消息：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      zh: "发生意外错误。",
    }),
    500
  );
});
```

---

### 使用语言变体

为特定语言变体指定翻译：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      zh: "你好！",
      "zh-CN": "你好！",
      "zh-TW": "你好！",
    })
  );
});
```

---

## 进阶主题

### 回退机制

如果首选语言不可用，`t` 函数将回退到配置中定义的默认语言：

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### 严格模式强制执行

配置 `t` 函数以强制严格遵守声明的语言：

| 模式        | 行为                                                 |
| ----------- | ---------------------------------------------------- |
| `strict`    | 所有声明的语言必须提供翻译。缺失语言将抛出错误。     |
| `inclusive` | 声明的语言必须有翻译。缺失语言会触发警告但会被接受。 |
| `loose`     | 接受任何现有的语言，即使未声明。                     |

---

### TypeScript 集成

使用 TypeScript 时，`t` 函数是类型安全的。定义一个类型安全的翻译对象：

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  zh: "早上好！",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### 常见错误与排查

| 问题             | 原因                                       | 解决方案                                          |
| ---------------- | ------------------------------------------ | ------------------------------------------------- |
| `t` 函数不起作用 | 未加载中间件                               | 确保在路由之前添加了 `app.use("*", intlayer())`。 |
| 缺失翻译错误     | 在未提供所有语言翻译的情况下启用了严格模式 | 提供所有必需的翻译。                              |

---

## 结论

`t` 函数是后端国际化的强大工具。通过有效地使用它，您可以为全球受众创建一个更具包容性和用户友好的应用程序。有关进阶用法和详细配置选项，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)。
