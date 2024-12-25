# Documentation: `t` 函数在 `react-intlayer` 中

`react-intlayer` 包中的 `t` 函数是您在 React 应用程序中进行内联国际化的基本工具。它允许您直接在组件中定义翻译，使得根据当前语言环境显示本地化内容变得简单。

---

## 概述

`t` 函数用于在您的组件中直接提供不同语言环境的翻译。通过传递一个包含每个支持语言环境翻译的对象，`t` 会根据您 React 应用程序中的当前语言环境上下文返回适当的翻译。

---

## 主要特性

- **内联翻译**：适合快速、内联文本，无需单独的内容声明。
- **自动语言环境选择**：自动返回与当前语言环境相对应的翻译。
- **TypeScript 支持**：与 TypeScript 一起使用时提供类型安全和自动补全。
- **易于集成**：可以无缝地在 React 组件中工作。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`：一个对象，其中键为语言环境代码（例如，`en`, `fr`, `es`），值为相应的翻译字符串。

### 返回

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

### 属性中的内联翻译

`t` 函数对于在 JSX 属性中进行内联翻译特别有用。当本地化 `alt`、`title`、`href` 或 `aria-label` 等属性时，您可以直接在属性中使用 `t`。

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

`t` 函数在与 TypeScript 一起使用时是类型安全的，确保所有必需的语言环境都已提供。

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

### 语言环境检测和上下文

在 `react-intlayer` 中，当前的语言环境通过 `IntlayerProvider` 管理。确保这个提供程序包裹了您的组件，并且正确传递了 `locale` 属性。

#### 示例：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件在这里 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件在这里 */}</IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 您的组件在这里 */}</IntlayerProvider>
);
```

---

## 常见错误及故障排除

### `t` 返回未定义或错误的翻译

- **原因**：当前语言环境没有正确设置，或当前语言环境的翻译缺失。
- **解决方案**：
  - 验证 `IntlayerProvider` 是否已正确设置并具有适当的 `locale`。
  - 确保您的翻译对象包含所有必要的语言环境。

### TypeScript 中缺失的翻译

- **原因**：翻译对象不满足所需的语言环境，导致 TypeScript 错误。
- **解决方案**：使用 `IConfigLocales` 类型来强制要求翻译的完整性。

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

1. **使用 `t` 简单内联翻译**：适合直接在您的组件中翻译小文本片段。
2. **优先使用 `useIntlayer` 处理结构化内容**：对于更复杂的翻译和内容重用，在声明文件中定义内容并使用 `useIntlayer`。
3. **一致的语言环境提供**：确保在整个应用程序中通过 `IntlayerProvider` 一致地提供您的语言环境。
4. **利用 TypeScript**：使用 TypeScript 类型来捕捉缺失的翻译并确保类型安全。

---

## 结论

`react-intlayer` 中的 `t` 函数是一个强大而便利的工具，用于管理您 React 应用程序中的内联翻译。通过有效整合它，您增强了应用程序的国际化能力，为全球用户提供更好的体验。

有关更详细的用法和高级功能，请参阅 [react-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**注意**：请确保正确设置 `IntlayerProvider`，以确保当前语言环境正确传递到您的组件中。这对于 `t` 函数返回正确的翻译至关重要。
