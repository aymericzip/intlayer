# Documentation: `getTranslationContent` 函数在 `intlayer`

## 描述：

`getTranslationContent` 函数从一组可定制的语言内容中获取对应特定语言环境的内容。如果指定的语言环境未找到，则默认返回项目中配置的默认语言环境的内容。

## 参数：

- `languageContent: CustomizableLanguageContent<Content>`

  - **描述**：一个包含各种语言环境翻译的对象。每个键代表一个语言环境，其值是相应的内容。
  - **类型**：`CustomizableLanguageContent<Content>`
    - `Content` 可以是任何类型，默认值为 `string`。

- `locale: Locales`

  - **描述**：要获取内容的语言环境。
  - **类型**：`Locales`

## 返回：

- **类型**：`Content`
- **描述**：对应于指定语言环境的内容。如果未找到该语言环境，则返回默认语言环境的内容。

## 示例用法：

### 基本用法：

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 输出: "Bonjour"
```

### 缺失的语言环境：

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello" (默认语言环境内容)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello" (默认语言环境内容)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 输出: "Hello" (默认语言环境内容)
```

### 使用自定义内容类型：

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

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

- **未找到语言环境：**
  - 当 `locale` 在 `languageContent` 中未找到时，函数返回默认语言环境的内容。
- **不完整的语言内容：**

  - 如果某个语言环境部分定义，函数不会合并内容。它严格地获取指定语言环境的值或回退到默认语言环境。

- **TypeScript 强制执行：**
  - 如果 `languageContent` 中的语言环境与项目配置不匹配，TypeScript 将强制要求定义所有必需的语言环境，确保内容的完整性和类型安全。
