# Documentation: `getLocaleLang` Function in `intlayer`

## Description:

`getLocaleLang` 函数从区域字符串中提取语言代码。它支持有或没有国家代码的区域。如果没有提供区域，它默认为返回一个空字符串。

## Parameters:

- `locale?: Locales`

  - **Description**: 区域字符串（例如，`Locales.ENGLISH_UNITED_STATES`，`Locales.FRENCH_CANADA`），从中提取语言代码。
  - **Type**: `Locales`（可选）

## Returns:

- **Type**: `string`
- **Description**: 从区域中提取的语言代码。如果没有提供区域，它返回一个空字符串（`''`）。

## Example Usage:

### Extracting Language Codes:

```typescript
import { getLocaleLang, Locales } from "intlayer";

// 输出: "en"
getLocaleLang(Locales.ENGLISH_UNITED_STATES);
// 输出: "en"
getLocaleLang(Locales.ENGLISH);
// 输出: "fr"
getLocaleLang(Locales.FRENCH_CANADA);
// 输出: "fr"
getLocaleLang(Locales.FRENCH);
```

## Edge Cases:

- **No Locale Provided:**

  - 当 `locale` 为 `undefined` 时，函数返回一个空字符串。

- **Malformed Locale Strings:**
  - 如果 `locale` 不遵循 `language-country` 格式（例如，`Locales.ENGLISH-US`），函数安全地返回 `'-'` 前面的部分，或者如果没有 `'-'`，则返回整个字符串。
