# 文档: `getLocalizedUrl` 函数在 `intlayer` 中

## 描述:

`getLocalizedUrl` 函数通过将给定的 URL 前缀添加指定的语言环境来生成本地化的 URL。它处理绝对和相对 URL，确保根据配置应用正确的语言环境前缀。

---

## 参数:

- `url: string`

  - **描述**: 原始的 URL 字符串，需用语言环境前缀。
  - **类型**: `string`

- `currentLocale: Locales`

  - **描述**: 当前要本地化 URL 的语言环境。
  - **类型**: `Locales`

- `locales: Locales[]`

  - **描述**: 可选的支持语言环境数组。默认提供项目中配置的语言环境。
  - **类型**: `Locales[]`
  - **默认**: [`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

- `defaultLocale: Locales`

  - **描述**: 应用程序的默认语言环境。默认提供项目中配置的默认语言环境。
  - **类型**: `Locales`
  - **默认**: [`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

- `prefixDefault: boolean`
  - **描述**: 是否为默认语言环境加上 URL 前缀。默认提供项目中配置的值。
  - **类型**: `boolean`
  - **默认**: [`项目配置`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#middleware)

### 返回:

- **类型**: `string`
- **描述**: 指定语言环境的本地化 URL。

---

## 示例用法:

### 相对 URL:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 输出: "/fr/about" 对于法语语言环境
// 输出: "/about" 对于默认（英语）语言环境
```

### 绝对 URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 当前语言环境
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言环境
  Locales.ENGLISH, // 默认语言环境
  false // 是否为默认语言环境加前缀
); // 输出: "https://example.com/fr/about" 对于法语

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言环境
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言环境
  Locales.ENGLISH, // 默认语言环境
  false // 是否为默认语言环境加前缀
); // 输出: "https://example.com/about" 对于英语

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 当前语言环境
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言环境
  Locales.ENGLISH, // 默认语言环境
  true // 是否为默认语言环境加前缀
); // 输出: "https://example.com/en/about" 对于英语
```

### 不支持的语言环境:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 当前语言环境
  [Locales.ENGLISH, Locales.FRENCH], // 支持的语言环境
  Locales.ENGLISH // 默认语言环境
); // 输出: "/about" （对于不支持的语言环境没有前缀）
```

---

## 边缘案例:

- **无语言环境段:**

  - 如果 URL 不包含任何语言环境段，函数会安全地添加适当的语言环境前缀。

- **默认语言环境:**

  - 当 `prefixDefault` 为 `false` 时，函数不会为默认语言环境添加 URL 前缀。

- **不支持的语言环境:**
  - 对于在 `locales` 中未列出的语言环境，函数不会添加任何前缀。

---

## 在应用程序中的用法:

在多语言应用程序中，使用 `locales` 和 `defaultLocale` 配置国际化设置对于确保显示正确语言至关重要。以下是如何在应用程序设置中使用 `getLocalizedUrl` 的示例：

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// 支持的语言环境和默认语言环境的配置
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

上述配置确保应用程序识别 `ENGLISH`、`FRENCH` 和 `SPANISH` 为支持的语言，并使用 `ENGLISH` 作为后备语言。

使用此配置，`getLocalizedUrl` 函数可以根据用户的语言偏好动态生成本地化 URL：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 输出: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 输出: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 输出: "/about"
```

通过集成 `getLocalizedUrl`，开发人员可以在多语言中维护一致的 URL 结构，从而提升用户体验和SEO。
