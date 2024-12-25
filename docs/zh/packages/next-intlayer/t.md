# Documentation: `t` 函数 在 `next-intlayer`

`t` 函数在 `next-intlayer` 包中是您 Next.js 应用程序中的一个基础工具，用于在线国际化。它允许您直接在组件中定义翻译，从而简单地根据当前语言环境显示本地化内容。

---

## 概述

`t` 函数用于在您的组件中直接提供不同语言环境的翻译。通过传递一个包含每种支持的语言环境翻译的对象，`t` 会根据您 Next.js 应用程序中的当前语言环境上下文返回适当的翻译。

---

## 主要特点

- **内联翻译**：适合快速、内联文本，不需要单独的内容声明。
- **自动选择语言环境**：自动返回与当前语言环境相对应的翻译。
- **TypeScript 支持**：在使用 TypeScript 时提供类型安全和自动完成。
- **易于集成**：在 Next.js 的客户端和服务器组件中无缝工作。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`: 一个对象，其中键是语言环境代码（例如，`en`、`fr`、`es`），值是相应的翻译字符串。

### 返回值

- 一个表示当前语言环境翻译内容的字符串。

---

## 使用示例

### 在客户端组件中使用 `t`

在使用客户端组件中的 `t` 时，请确保在组件文件的顶部包含 `'use client';` 指令。

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
      es: "Este es el contenido d un ejemplo de componente cliente",
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

`t` 函数在 JSX 属性中的内联翻译中特别有用。
当本地化属性如 `alt`、`title`、`href` 或 `aria-label` 时，您可以直接在属性中使用 `t`。

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

`t` 函数在使用 TypeScript 时是类型安全的，确保提供所有必需的语言环境。

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测与上下文

在 `next-intlayer` 中，当前语言环境通过上下文提供者管理：`IntlayerClientProvider` 和 `IntlayerServerProvider`。确保这些提供者包装了您的组件，并正确传递了 `locale` 属性。

#### 示例：

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 这里是您的组件 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 这里是您的组件 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 这里是您的组件 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 常见错误与故障排除

### `t` 返回未定义或错误的翻译

- **原因**：当前语言环境没有正确设置，或者当前语言环境的翻译缺失。
- **解决方案**：
  - 确保 `IntlayerClientProvider` 或 `IntlayerServerProvider` 正确设置，并且具有适当的 `locale`。
  - 确保您的翻译对象包含所有必要的语言环境。

### TypeScript 中缺少翻译

- **原因**：翻译对象未满足要求的语言环境，导致 TypeScript 错误。
- **解决方案**：使用 `IConfigLocales` 类型来确保翻译的完整性。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 将导致 TypeScript 错误 [！代码错误]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 将导致 TypeScript 错误 [！代码错误]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 将导致 TypeScript 错误 [！代码错误]
};

const text = t(translations);
```

---

## 使用有效的技巧

1. **使用 `t` 进行简单的内联翻译**：适合在组件中直接翻译小块文本。
2. **在结构化内容中优先使用 `useIntlayer`**：对于更复杂的翻译和内容重用，在声明文件中定义内容并使用 `useIntlayer`。
3. **一致的语言环境提供**：确保在整个应用程序中通过适当的提供者一致地提供语言环境。
4. **利用 TypeScript**：使用 TypeScript 类型捕捉缺失的翻译并确保类型安全。

---

## 结论

`t` 函数在 `next-intlayer` 中是一个强大且方便的工具，用于管理您 Next.js 应用程序中的内联翻译。通过有效地集成它，您增强了应用程序的国际化能力，为全球用户提供了更好的体验。

有关更详细的用法和高级功能，请参阅 [next-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**注意**：请确保正确设置 `IntlayerClientProvider` 和 `IntlayerServerProvider`，以确保当前语言环境正确传递到您的组件。这对于 `t` 函数返回正确翻译至关重要。
