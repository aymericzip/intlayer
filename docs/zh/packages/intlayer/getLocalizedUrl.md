# Documentation: `getLocalizedUrl` 函数在 `intlayer`

## 描述：

`getLocalizedUrl` 函数通过在给定的 URL 前加上指定的本地化前缀来生成本地化的 URL。它处理绝对和相对 URL，确保根据配置应用正确的语言前缀。

---

## 参数：

- `url: string`

  - **描述**：原始 URL 字符串，前面加上语言。
  - **类型**：`string`

- `currentLocale: Locales`

  - **描述**：当前进行 URL 本地化的语言。
  - **类型**：`Locales`

- `locales: Locales[]`

  - **描述**：可选的支持语言数组。默认情况下，提供项目中配置的语言。
  - **类型**：`Locales[]`
  - **默认**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

- `defaultLocale: Locales`

  - **描述**：应用程序的默认语言。默认情况下，提供项目中配置的默认语言。
  - **类型**：`Locales`
  - **默认**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

- `prefixDefault: boolean`
  - **描述**：是否为默认语言添加前缀。默认情况下，提供项目中配置的值。
  - **类型**：`boolean`
  - **默认**：[`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

### 返回：

- **类型**：`string`
- **描述**：指定语言的本地化 URL。

---

## 示例用法：

### 相对 URL：

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出："/fr/about" 对于法语
// 输出："/about" 对于默认（英语）语言
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出："/fr/about" 对于法语
// 输出："/about" 对于默认（英语）语言
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出："/fr/about" 对于法语
// 输出："/about" 对于默认（英语）语言
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出："/fr/about" 对于法语
// 输出："/about" 对于默认（英语）语言
```

### 绝对 URL：

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH, // 默认语言
  false // 前缀默认语言
); // 输出："https://example.com/fr/about" 对于法语

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH, // 默认语言
  false // 前缀默认语言
); // 输出："https://example.com/about" 对于英语

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH, // 默认语言
  true // 前缀默认语言
); // 输出："https://example.com/en/about" 对于英语
```

### 不支持的语言：

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 当前语言
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言
  Locales.ENGLISH // 默认语言
); // 输出："/about"（未应用前缀）
```

---

## 边缘案例：

- **没有语言段：**

  - 如果 URL 不包含任何语言段，函数会安全地添加适当的语言前缀。

- **默认语言：**

  - 当 `prefixDefault` 为 `false` 时，函数不会为默认语言添加前缀。

- **不支持的语言：**
  - 对于 `locales` 中未列出的语言，函数不会添加任何前缀。

---

## 应用中的用法：

在多语言应用中，配置国际化设置与 `locales` 和 `defaultLocale` 是确保正确显示语言的关键。以下是 `getLocalizedUrl` 如何在应用设置中使用的示例：

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// 支持的语言和默认语言的配置
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

上述配置确保应用识别 `ENGLISH`、`FRENCH` 和 `SPANISH` 为支持的语言，并使用 `ENGLISH` 作为备用语言。

使用此配置，`getLocalizedUrl` 函数可以根据用户的语言偏好动态生成本地化的 URL：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 输出："/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 输出："/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 输出："/about"
```

通过集成 `getLocalizedUrl`，开发人员可以在多种语言之间维护一致的 URL 结构，从而提升用户体验和 SEO。
