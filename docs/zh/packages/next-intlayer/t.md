# 文档: `t` 函数在 `next-intlayer` 中的使用

`next-intlayer` 包中的 `t` 函数是一个在 Next.js 应用中进行内联国际化的基本工具。它允许您直接在组件中定义翻译，从而根据当前语言环境轻松显示本地化内容。

---

## 概述

`t` 函数用于在组件中直接为不同的语言环境提供翻译。通过传递一个包含每个支持语言环境翻译的对象，`t` 会根据 Next.js 应用中的当前语言环境上下文返回相应的翻译。

---

## 主要功能

- **内联翻译**: 适用于不需要单独内容声明的快速内联文本。
- **自动语言环境选择**: 自动返回与当前语言环境对应的翻译。
- **TypeScript 支持**: 与 TypeScript 一起使用时提供类型安全和自动补全。
- **易于集成**: 在 Next.js 的客户端和服务端组件中无缝工作。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`: 一个对象，其中键是语言环境代码（例如 `en`、`fr`、`es`），值是相应的翻译字符串。

### 返回值

- 表示当前语言环境翻译内容的字符串。

---

## 使用示例

### 在客户端组件中使用 `t`

在客户端组件中使用 `t` 时，请确保在组件文件顶部包含 `'use client';` 指令。

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
      zh: "这是客户端组件示例的内容",
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
      zh: "这是客户端组件示例的内容",
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
      es: "Este es el contenido d un ejemplo de componente cliente",
      zh: "这是客户端组件示例的内容",
    })}
  </p>
);
```

### 在服务端组件中使用 `t`

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      zh: "这是服务端组件示例的内容",
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
      zh: "这是服务端组件示例的内容",
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
      zh: "这是服务端组件示例的内容",
    })}
  </p>
);
```

### 在属性中使用内联翻译

`t` 函数特别适用于 JSX 属性中的内联翻译。
在本地化 `alt`、`title`、`href` 或 `aria-label` 等属性时，可以直接在属性中使用 `t`。

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    zh: "提交",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    zh: "提交",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      zh: "一幅美丽的风景",
    })}
  />
</button>
```

---

## 高级主题

### TypeScript 集成

在与 TypeScript 一起使用时，`t` 函数是类型安全的，确保提供所有必需的语言环境。

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  zh: "欢迎",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  zh: "欢迎",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  zh: "欢迎",
};

const greeting = t(translations);
```

### 语言环境检测和上下文

在 `next-intlayer` 中，当前语言环境通过上下文提供者管理：`IntlayerClientProvider` 和 `IntlayerServerProvider`。确保这些提供者包裹您的组件并正确传递 `locale` 属性。

#### 示例:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 您的组件 */}
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
      {/* 您的组件 */}
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
      {/* 您的组件 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 常见错误和故障排除

### `t` 返回未定义或错误的翻译

- **原因**: 当前语言环境未正确设置，或当前语言环境的翻译缺失。
- **解决方案**:
  - 验证 `IntlayerClientProvider` 或 `IntlayerServerProvider` 是否正确设置了适当的 `locale`。
  - 确保您的翻译对象包含所有必要的语言环境。

### TypeScript 中缺少翻译

- **原因**: 翻译对象未满足所需的语言环境，导致 TypeScript 错误。
- **解决方案**: 使用 `IConfigLocales` 类型来强制翻译的完整性。

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

## 有效使用的提示

1. **使用 `t` 进行简单的内联翻译**: 适用于直接在组件中翻译小段文本。
2. **优先使用 `useIntlayer` 处理结构化内容**: 对于更复杂的翻译和内容重用，请在声明文件中定义内容并使用 `useIntlayer`。
3. **一致提供语言环境**: 确保通过适当的提供者在整个应用中一致提供语言环境。
4. **利用 TypeScript**: 使用 TypeScript 类型捕获缺失的翻译并确保类型安全。

---

## 结论

`next-intlayer` 中的 `t` 函数是管理 Next.js 应用中内联翻译的强大且方便的工具。通过有效集成它，您可以增强应用的国际化能力，为全球用户提供更好的体验。

有关更详细的用法和高级功能，请参阅 [next-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

---

**注意**: 请确保正确设置 `IntlayerClientProvider` 和 `IntlayerServerProvider`，以确保当前语言环境正确传递到您的组件中。这对于 `t` 函数返回正确的翻译至关重要。
