# 文档: `t` 函数在 `express-intlayer` 中

`express-intlayer` 包中的 `t` 函数是为您的 Express 应用程序提供本地化响应的核心工具。它通过根据用户的首选语言动态选择内容来简化国际化（i18n）。

---

## 概述

`t` 函数用于定义和检索给定语言集的翻译。它会根据客户端的请求设置（例如，`Accept-Language` 头）自动确定返回的适当语言。如果所选语言不可用，它会优雅地回退到您配置中指定的默认区域设置。

---

## 主要特性

- **动态本地化**: 自动选择客户端最合适的翻译。
- **回退到默认区域设置**: 如果客户端首选语言不可用，则回退到默认区域设置，确保用户体验的连续性。
- **轻量且快速**: 为高性能应用程序设计，确保最小的开销。
- **严格模式支持**: 强制遵守声明的区域设置，以确保可靠的行为。

---

## 函数签名

```typescript
t(translations: Record<string, string>): string;
```

### 参数

- `translations`: 一个对象，其中键为区域代码（例如，`en`，`fr`，`es-MX`），值为相应的翻译字符串。

### 返回

- 一个字符串，表示客户端首选语言的内容。

---

## 加载国际化请求处理程序

为了确保 `express-intlayer` 提供的国际化功能能够正确工作，您 **必须** 在您的 Express 应用程序开始时加载国际化中间件。这将启用 `t` 函数并确保正确处理区域设置检测和翻译。

### 必需的中间件设置

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 加载国际化请求处理程序
app.use(intlayer());
```

### 在应用程序中的位置

将 `app.use(intlayer())` 中间件放在 **所有路由之前**，以确保所有路由都受益于国际化：

```typescript
app.use(intlayer());

// 在加载中间件后定义您的路由
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

- **区域设置检测**: `intlayer` 中间件处理传入请求，以根据头、cookie 或其他配置的方法检测用户的首选区域设置。
- **翻译上下文**: 设置必要的上下文，以便 `t` 函数可以正确操作，确保以正确的语言返回翻译。
- **错误预防**: 如果没有该中间件，使用 `t` 函数会导致运行时错误，因为所需的区域设置信息将不可用。

---

## 使用示例

### 基本示例

提供不同语言的本地化内容：

```typescript
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

**客户端请求:**

- 一个客户端带有 `Accept-Language: fr` 将接收到 `Bienvenue!`。
- 一个客户端带有 `Accept-Language: es` 将接收到 `¡Bienvenido!`。
- 一个客户端带有 `Accept-Language: de` 将接收到 `Welcome!`（默认区域设置）。

### 处理错误

以多种语言提供错误消息：

```typescript
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

为特定区域的变体指定翻译：

```typescript
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

如果首选区域不可用，`t` 函数将回退到配置中定义的默认区域设置：

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

例如：

- 如果 `defaultLocale` 是 `Locales.CHINESE`，而客户端请求 `Locales.DUTCH`，则返回的翻译将默认使用 `Locales.CHINESE` 的值。
- 如果未定义 `defaultLocale`，则 `t` 函数将回退到 `Locales.ENGLISH` 的值。

---

### 严格模式强制

配置 `t` 函数以强制严格遵守声明的区域设置：

| 模式            | 行为                                                         |
| --------------- | ------------------------------------------------------------ |
| `strict`        | 所有声明的区域设置必须提供翻译。缺失的区域设置将抛出错误。   |
| `required_only` | 声明的区域设置必须有翻译。缺失的区域设置触发警告，但被接受。 |
| `loose`         | 接受任何现有的区域设置，即使未声明。                         |

配置示例：

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // 强制严格模式
  },
};
```

---

### TypeScript 集成

在 TypeScript 中使用时，`t` 函数是类型安全的。定义一个类型安全的翻译对象：

```typescript
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

---

### 常见错误与故障排除

| 问题             | 原因                             | 解决方案                                   |
| ---------------- | -------------------------------- | ------------------------------------------ |
| `t` 函数无法工作 | 中间件未加载                     | 确保在路由之前添加 `app.use(intlayer())`。 |
| 缺少翻译错误     | 启用了严格模式但没有所有区域设置 | 提供所有必需的翻译。                       |

---

## 有效使用的提示

1. **集中保存翻译**: 使用集中模块或 JSON 文件来管理翻译，以提高可维护性。
2. **验证翻译**: 确保每个语言变体都有相应的翻译，以防止不必要的回退。
3. **与前端 i18n 结合使用**: 与前端国际化同步，以确保在应用程序中无缝用户体验。
4. **基准性能**: 在添加翻译时测试应用程序的响应时间，以确保影响最小。

---

## 结论

`t` 函数是后端国际化的强大工具。通过有效使用它，您可以为全球受众创建一个更具包容性和用户友好的应用程序。有关高级用法和详细配置选项，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。
