# 文档: `t` 函数在 `next-intlayer` 中

`next-intlayer` 包中的 `t` 函数是在你的 Next.js 应用程序中实现内联国际化的基本工具。它允许你在组件内直接定义翻译，从而简单地根据当前语言环境显示本地化的内容。

---

## 概述

`t` 函数用于直接在你的组件中提供不同语言环境的翻译。通过传递一个包含每个支持语言环境翻译的对象，`t` 将根据你在 Next.js 应用程序中的当前语言环境上下文返回适当的翻译。

---

## 主要特点

- **内联翻译**: 适用于快速、内联文本，不需要单独的内容声明。
- **自动语言环境选择**: 自动返回与当前语言环境对应的翻译。
- **TypeScript 支持**: 在使用 TypeScript 时提供类型安全和自动补全。
- **易于集成**: 在 Next.js 的客户端和服务器组件中无缝工作。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`: 一个对象，其键是语言环境代码（例如，`en`、`fr`、`es`）和值是相应的翻译字符串。

### 返回值

- 一个表示当前语言环境翻译内容的字符串。

---

## 使用示例

### 在客户端组件中使用 `t`

确保在使用 `t` 在客户端组件时，在组件文件的顶部包含 `'use client';` 指令。

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### 在服务器组件中使用 `t`

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### 属性中的内联翻译

`t` 函数在 JSX 属性中的内联翻译中特别有用。
在本地化 `alt`、`title`、`href` 或 `aria-label` 等属性时，你可以在属性中直接使用 `t`。

```tsx
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

`t` 函数在与 TypeScript 一起使用时是类型安全的，确保提供了所有必需的语言环境。

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测和上下文

在 `next-intlayer` 中，当前语言环境通过上下文提供者管理：`IntlayerClientProvider` 和 `IntlayerServerProvider`。确保这些提供者包裹你的组件并正确传递 `locale` 属性。

#### 示例：

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 你的组件在这里 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 常见错误和故障排除

### `t` 返回未定义或不正确的翻译

- **原因**: 当前语言环境未正确设置，或当前语言环境的翻译缺失。
- **解决方案**:
  - 验证 `IntlayerClientProvider` 或 `IntlayerServerProvider` 是否与适当的 `locale` 正确设置。
  - 确保你的翻译对象包含所有必要的语言环境。

### TypeScript 中缺少翻译

- **原因**: 翻译对象未满足所需的语言环境，导致 TypeScript 错误。
- **解决方案**: 使用 `IConfigLocales` 类型来强制确保翻译的完整性。

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 缺少 'es' 会导致 TypeScript 错误
};

const text = t(translations);
```

---

## 有效使用提示

1. **使用 `t` 进行简单的内联翻译**: 适合直接在组件中翻译小段文本。
2. **更复杂内容使用 `useIntlayer`**: 对于更复杂的翻译和内容重用，在声明文件中定义内容并使用 `useIntlayer`。
3. **一致的语言环境提供**: 确保在整个应用程序中通过适当的提供者一致地提供语言环境。
4. **利用 TypeScript**: 使用 TypeScript 类型来捕获缺失的翻译并确保类型安全。

---

## 结论

`next-intlayer` 中的 `t` 函数是管理你 Next.js 应用程序中内联翻译的强大且方便的工具。通过有效集成，它增强了你应用程序的国际化能力，为全球用户提供更好的体验。

有关更详细的使用和高级功能，请参考 [next-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**注意**: 请记住正确设置你的 `IntlayerClientProvider` 和 `IntlayerServerProvider`，以确保当前语言环境正確传递给你的组件。这对 `t` 函数返回正确的翻译至关重要。
