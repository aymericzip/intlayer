# 文档：`getLocaleLang` 函数在 `intlayer`

## 描述：

`getLocaleLang` 函数从区域字符串中提取语言代码。它支持带有或不带有国家代码的区域。如果未提供区域，它默认返回空字符串。

## 参数：

- `locale?: Locales`

  - **描述**：要从中提取语言代码的区域字符串（例如，`Locales.ENGLISH_UNITED_STATES`，`Locales.FRENCH_CANADA`）。
  - **类型**：`Locales`（可选）

## 返回值：

- **类型**：`string`
- **描述**：从区域中提取的语言代码。如果未提供区域，则返回空字符串 (`''`)。

## 示例用法：

### 提取语言代码：

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

// 获取英语（美国）的语言代码
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
// 获取英语的语言代码
getLocaleLang(Locales.ENGLISH); // 输出: "en"
// 获取法语（加拿大）的语言代码
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
// 获取法语的语言代码
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

// 获取英语（美国）的语言代码
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
// 获取英语的语言代码
getLocaleLang(Locales.ENGLISH); // 输出: "en"
// 获取法语（加拿大）的语言代码
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
// 获取法语的语言代码
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

// 获取英语（美国）的语言代码
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 输出: "en"
// 获取英语的语言代码
getLocaleLang(Locales.ENGLISH); // 输出: "en"
// 获取法语（加拿大）的语言代码
getLocaleLang(Locales.FRENCH_CANADA); // 输出: "fr"
// 获取法语的语言代码
getLocaleLang(Locales.FRENCH); // 输出: "fr"
```

## 边缘案例：

- **未提供区域**：

  - 当 `locale` 为 `undefined` 时，函数返回空字符串。

- **格式不正确的区域字符串**：
  - 如果 `locale` 不遵循 `language-country` 格式（例如，`Locales.ENGLISH-US`），则函数安全地返回 `'-'` 前的部分，或者如果没有 `'-'` 则返回整个字符串。
