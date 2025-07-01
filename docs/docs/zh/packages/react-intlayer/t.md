---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 函数文档 | react-intlayer
description: 查看如何使用 react-intlayer 包中的 t 函数
keywords:
  - t
  - 翻译
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
---

# 文档：`react-intlayer` 中的 `t` 函数

`react-intlayer` 包中的 `t` 函数是您 React 应用程序中用于内联国际化的基础工具。它允许您直接在组件中定义翻译，使得根据当前语言环境显示本地化内容变得简单。

---

## 概述

`t` 函数用于在组件中直接提供不同语言环境的翻译。通过传递包含每个支持语言环境翻译的对象，`t` 会根据 React 应用中的当前语言环境上下文返回相应的翻译内容。

---

## 主要特性

- **内联翻译**：适用于快速的内联文本，无需单独声明内容。
- **自动语言环境选择**：自动返回与当前语言环境对应的翻译内容。
- **TypeScript 支持**：在使用 TypeScript 时提供类型安全和自动补全功能。
- **轻松集成**：可无缝集成于 React 组件中。

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

### 组件中 `t` 的基本用法

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react.intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

// 组件示例
const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### 属性中的内联翻译

`t` 函数在 JSX 属性中的内联翻译特别有用。当本地化诸如 `alt`、`title`、`href` 或 `aria-label` 等属性时，可以直接在属性中使用 `t`。

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
      en: "一处美丽的风景",
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
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "欢迎",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "欢迎",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
// 定义翻译内容，键为语言代码，值为对应的翻译字符串
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测与上下文

在 `react-intlayer` 中，当前语言环境通过 `IntlayerProvider` 进行管理。请确保该提供者包裹了你的组件，并且正确传递了 `locale` 属性。

#### 示例：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 你的组件放这里 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 你的组件放这里 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 你的组件放这里 */}</IntlayerProvider>
);
```

---

## 常见错误与故障排除

### `t` 返回未定义或错误的翻译

- **原因**：当前语言环境未正确设置，或者当前语言环境的翻译缺失。
- **解决方案**：
  - 确认 `IntlayerProvider` 已正确设置并传入了合适的 `locale`。
  - 确保你的翻译对象包含所有必要的语言环境。

### TypeScript 中缺失翻译

- **原因**：翻译对象未满足所需的语言环境，导致 TypeScript 报错。
- **解决方案**：使用 `IConfigLocales` 类型来强制确保翻译的完整性。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 报错
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 报错
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 报错
};

const text = t(translations);
```

---

## 有效使用技巧

1. **使用 `t` 进行简单的内联翻译**：适合在组件中直接翻译小段文本。
2. **更复杂内容优先使用 `useIntlayer`**：对于更复杂的翻译和内容复用，建议在声明文件中定义内容，并使用 `useIntlayer`。
3. **一致的语言环境提供**：确保通过 `IntlayerProvider` 在整个应用中一致地提供语言环境。
4. **利用 TypeScript**：使用 TypeScript 类型来捕获缺失的翻译并确保类型安全。

---

## 结论

`react-intlayer` 中的 `t` 函数是一个强大且方便的工具，用于管理 React 应用中的内联翻译。通过有效集成它，您可以增强应用的国际化能力，为全球用户提供更好的体验。

有关更详细的用法和高级功能，请参阅 [react-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

---

**注意**：请记得正确设置您的 `IntlayerProvider`，以确保当前语言环境能够正确传递给您的组件。这对于 `t` 函数返回正确的翻译至关重要。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史记录
