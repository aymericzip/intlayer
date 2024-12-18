# Documentation: `getTranslationContent` 函数在 `intlayer`

## 描述：

`getTranslationContent` 函数从一组可定制的语言内容中检索特定区域的内容。如果找不到指定的区域，它将默认返回项目中配置的默认区域的内容。

## 参数：

- `languageContent: CustomizableLanguageContent<Content>`

  - **描述**：一个包含各种区域翻译的对象。每个键代表一个区域，其值是相应的内容。
  - **类型**：`CustomizableLanguageContent<Content>`
    - `Content` 可以是任何类型，默认类型为 `string`。

- `locale: Locales`

  - **描述**：要检索内容的区域。
  - **类型**：`Locales`

## 返回：

- **类型**：`Content`
- **描述**：对应于指定区域的内容。如果未找到该区域，则返回默认区域的内容。

## 示例用法：

### 基本用法：

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

### 缺失区域：

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello" (默认区域内容)
```

### 使用自定义内容类型：

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 输出: "Bonjour"
```

## 边缘情况：

- **未找到区域：**
  - 当 `locale` 在 `languageContent` 中未找到时，函数返回默认区域的内容。
- **不完整的语言内容：**

  - 如果某个区域部分定义，函数不会合并内容。它严格检索指定区域的值，或回退到默认值。

- **TypeScript 强制执行：**
  - 如果 `languageContent` 中的区域与项目配置不匹配，TypeScript 将强制要求定义所有必需的区域，确保内容完整且类型安全。
