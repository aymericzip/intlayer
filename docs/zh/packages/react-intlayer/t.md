# Documentation: `t` 函数在 `react-intlayer` 中

`t` 函数在 `react-intlayer` 包中是你在 React 应用程序中进行行内国际化的基本工具。它允许你在组件中直接定义翻译，使得根据当前语言环境简单显示本地化内容成为可能。

---

## 概述

`t` 函数用于在你的组件中为不同语言环境提供翻译。通过传递一个包含每个支持的语言环境翻译的对象，`t` 根据你的 React 应用程序中的当前语言环境上下文返回适当的翻译。

---

## 关键特性

- **行内翻译**：非常适合快速、行内文本，不需要单独的内容声明。
- **自动语言环境选择**：自动返回与当前语言环境相对应的翻译。
- **TypeScript 支持**：在与 TypeScript 一起使用时提供类型安全性和自动补全。
- **轻松集成**：可以无缝工作于 React 组件中。

---

## 函数签名

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 参数

- `translations`: 一个对象，其中键为语言环境代码（例如 `en`、`fr`、`es`），值为相应的翻译字符串。

### 返回值

- 一个表示当前语言环境的翻译内容的字符串。

---

## 使用示例

### 组件中 `t` 的基本用法

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "这是一个组件的示例",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### 属性中的行内翻译

`t` 函数特别适用于 JSX 属性中的行内翻译。当本地化诸如 `alt`、`title`、`href` 或 `aria-label` 的属性时，可以直接在属性中使用 `t`。

```tsx
<button
  aria-label={t({
    en: "提交",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "提交",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "一个美丽的风景",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 高级主题

### TypeScript 集成

`t` 函数在与 TypeScript 一起使用时是类型安全的，确保提供所有必需的语言环境。

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "欢迎",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 语言环境检测和上下文

在 `react-intlayer` 中，当前语言环境通过 `IntlayerProvider` 管理。确保这个提供者包裹你的组件并正确传递 `locale` 属性。

#### 示例：

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* 你的组件在这里 */}</IntlayerProvider>
);
```

---

## 常见错误及故障排除

### `t` 返回未定义或不正确的翻译

- **原因**：当前语言环境未正确设置，或者当前语言环境的翻译缺失。
- **解决方案**：
  - 验证 `IntlayerProvider` 是否正确设置，具有适当的 `locale`。
  - 确保你的翻译对象包含所有必要的语言环境。

### TypeScript 中缺失的翻译

- **原因**：翻译对象未满足所需的语言环境，导致 TypeScript 错误。
- **解决方案**：使用 `IConfigLocales` 类型来强制要求你的翻译完整。

```typescript
const translations: IConfigLocales<string> = {
  en: "文本",
  fr: "Texte",
  // es: 'Texto', // 缺失 'es' 将导致 TypeScript 错误
};

const text = t(translations);
```

---

## 有效使用的提示

1. **使用 `t` 进行简单的行内翻译**：非常适合在组件中直接翻译小段文本。
2. **更复杂的内容使用 `useIntlayer`**：对于更复杂的翻译和内容重用，在声明文件中定义内容并使用 `useIntlayer`。
3. **一致的语言环境提供**：确保通过 `IntlayerProvider` 在你的应用程序中一致地提供语言环境。
4. **借助 TypeScript**：使用 TypeScript 类型捕捉缺失的翻译并确保类型安全。

---

## 结论

`t` 函数在 `react-intlayer` 中是管理你的 React 应用程序中行内翻译的强大而方便的工具。通过有效集成它，你将增强你的应用程序的国际化能力，为全球用户提供更好的体验。

有关更详细的使用和高级功能，请参阅 [react-intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**注意**：请确保正确设置你的 `IntlayerProvider`，以确保当前语言环境正确传递给你的组件。这对于 `t` 函数返回正确的翻译至关重要。
