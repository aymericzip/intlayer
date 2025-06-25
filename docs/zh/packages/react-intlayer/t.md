---
docName: package__react-intlayer__t
url: /doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t函数文档 | react-intlayer
description: 查看如何使用react-intlayer包的t函数
keywords:
  - t
  - 翻译
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# 文档: `t` 函数在 `react-intlayer` 中的使用

`react-intlayer` 包中的 `t` 函数是一个用于在 React 应用中实现内联国际化的基础工具。它允许您直接在组件中定义翻译，从而根据当前语言环境轻松显示本地化内容。

---

## 概述

`t` 函数用于在组件中直接提供不同语言环境的翻译。通过传递一个包含每种支持语言环境翻译的对象，`t` 会根据 React 应用中的当前语言环境上下文返回相应的翻译。

---

## 主要特点

- **内联翻译**: 适用于不需要单独内容声明的快速内联文本。
- **自动语言环境选择**: 自动返回与当前语言环境对应的翻译。
- **TypeScript 支持**: 与 TypeScript 一起使用时提供类型安全和自动补全功能。
- **易于集成**: 可无缝地在 React 组件中使用。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`: 一个对象，其中键是语言环境代码（例如 `en`、`fr`、`es`），值是相应的翻译字符串。

### 返回值

- 一个字符串，表示当前语言环境的翻译内容。

---

## 使用示例

### 在组件中基本使用 `t`

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

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

### 在属性中使用内联翻译

`t` 函数特别适用于 JSX 属性中的内联翻译。当本地化 `alt`、`title`、`href` 或 `aria-label` 等属性时，可以直接在属性中使用 `t`。

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

与 TypeScript 一起使用时，`t` 函数是类型安全的，确保提供所有必需的语言环境。

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测与上下文

在 `react-intlayer` 中，当前语言环境通过 `IntlayerProvider` 管理。确保该提供程序包裹您的组件并正确传递 `locale` 属性。

#### 示例:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件 */}</IntlayerProvider>
);
```

---

## 常见错误与故障排除

### `t` 返回未定义或错误翻译

- **原因**: 当前语言环境未正确设置，或当前语言环境的翻译缺失。
- **解决方案**:
  - 验证 `IntlayerProvider` 是否正确设置并传递了适当的 `locale`。
  - 确保您的翻译对象包含所有必要的语言环境。

### TypeScript 中缺少翻译

- **原因**: 翻译对象未满足所需的语言环境，导致 TypeScript 错误。
- **解决方案**: 使用 `IConfigLocales` 类型来强制翻译的完整性。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误
};

const text = t(translations);
```

---

## 有效使用的提示

1. **使用 `t` 进行简单的内联翻译**: 适用于直接在组件中翻译小段文本。
2. **优先使用 `useIntlayer` 处理结构化内容**: 对于更复杂的翻译和内容重用，请在声明文件中定义内容并使用 `useIntlayer`。
3. **一致提供语言环境**: 确保通过 `IntlayerProvider` 在整个应用中一致提供语言环境。
4. **利用 TypeScript**: 使用 TypeScript 类型捕获缺失的翻译并确保类型安全。

---

## 结论

`react-intlayer` 中的 `t` 函数是一个强大且方便的工具，用于在 React 应用中管理内联翻译。通过有效集成它，可以增强应用的国际化能力，为全球用户提供更好的体验。

有关更详细的用法和高级功能，请参阅 [react-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

---

**注意**: 请确保正确设置 `IntlayerProvider`，以确保当前语言环境正确传递到组件中。这对于 `t` 函数返回正确的翻译至关重要。
