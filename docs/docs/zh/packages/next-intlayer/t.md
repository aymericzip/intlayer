---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 函数文档 | next-intlayer
description: 查看如何使用 next-intlayer 包中的 t 函数
keywords:
  - t
  - 翻译
  - Intlayer
  - next-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# 文档：`next-intlayer` 中的 `t` 函数

`next-intlayer` 包中的 `t` 函数是您 Next.js 应用程序中用于内联国际化的基础工具。它允许您直接在组件内定义翻译，使得根据当前语言环境显示本地化内容变得简单。

---

## 概述

`t` 函数用于直接在组件中为不同语言环境提供翻译。通过传入包含每个支持语言环境翻译的对象，`t` 会根据您 Next.js 应用中的当前语言环境上下文返回相应的翻译内容。

---

## 主要特性

- **内联翻译**：非常适合快速的内联文本，无需单独声明内容。
- **自动语言环境选择**：自动返回与当前语言环境对应的翻译内容。
- **TypeScript 支持**：在使用 TypeScript 时提供类型安全和自动补全功能。
- **轻松集成**：可无缝应用于 Next.js 的客户端和服务器组件中。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`：一个对象，键为语言环境代码（例如 `en`、`fr`、`es`），值为对应的翻译字符串。

### 返回值

- 返回一个字符串，表示当前语言环境的翻译内容。

---

## 使用示例

### 在客户端组件中使用 `t`

确保在客户端组件中使用 `t` 时，在组件文件顶部包含 `'use client';` 指令。

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### 在服务器组件中使用 `t`

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### 属性中的内联翻译

`t` 函数在 JSX 属性中的内联翻译特别有用。
在本地化如 `alt`、`title`、`href` 或 `aria-label` 等属性时，可以直接在属性内使用 `t`。

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 高级主题

### TypeScript 集成

当与 TypeScript 一起使用时，`t` 函数是类型安全的，确保提供所有必需的语言环境。

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
// 定义翻译内容
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
// 定义翻译内容
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测与上下文

在 `next-intlayer` 中，当前的语言环境通过上下文提供者管理：`IntlayerClientProvider` 和 `IntlayerServerProvider`。请确保这些提供者包裹你的组件，并且正确传递了 `locale` 属性。

#### 示例：

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 你的组件放这里 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 你的组件放这里 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 你的组件放这里 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 常见错误与故障排除

### `t` 返回未定义或错误的翻译

- **原因**：当前语言环境未正确设置，或当前语言环境的翻译缺失。
- **解决方案**：
  - 确认 `IntlayerClientProvider` 或 `IntlayerServerProvider` 已正确设置了相应的 `locale`。
  - 确保你的翻译对象包含所有必要的语言环境。

### TypeScript 中缺失翻译

- **原因**：翻译对象未满足所需的语言环境，导致 TypeScript 报错。
- **解决方案**：使用 `IConfigLocales` 类型来强制确保翻译的完整性。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误 [!code error]
};

const text = t(translations);
```

---

## 有效使用技巧

1. **使用 `t` 进行简单的内联翻译**：适合在组件中直接翻译小段文本。
2. **优先使用 `useIntlayer` 进行结构化内容管理**：对于更复杂的翻译和内容复用，请在声明文件中定义内容，并使用 `useIntlayer`。
3. **保持一致的语言环境提供**：确保通过适当的提供者在整个应用中一致地提供语言环境。
4. **利用 TypeScript**：使用 TypeScript 类型来捕获缺失的翻译并确保类型安全。

---

## 结论

`next-intlayer` 中的 `t` 函数是一个强大且便捷的工具，用于管理 Next.js 应用中的内联翻译。通过有效集成它，您可以增强应用的国际化能力，为全球用户提供更好的体验。

有关更详细的用法和高级功能，请参阅[next-intlayer文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

---

**注意**：请记得正确设置您的`IntlayerClientProvider`和`IntlayerServerProvider`，以确保当前语言环境正确传递给您的组件。这对于`t`函数返回正确的翻译至关重要。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
