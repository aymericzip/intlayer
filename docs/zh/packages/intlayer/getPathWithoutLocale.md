# 文档: `getPathWithoutLocale` 函数在 `intlayer`

## 描述:

如果存在，从给定的 URL 或路径名称中删除 locale 段。它适用于绝对 URL 和相对路径名称。

## 参数:

- `inputUrl: string`

  - **描述**: 要处理的完整 URL 字符串或路径名称。
  - **类型**: `string`

- `locales: Locales[]`
  - **描述**: 可选的支持 locale 数组。默认为项目中配置的 locale。
  - **类型**: `Locales[]`

## 返回:

- **类型**: `string`
- **描述**: 不带 locale 段的 URL 字符串或路径名称。

## 示例用法:

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/zh/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/zh/dashboard")); // 输出: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/zh/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/zh/dashboard")); // 输出: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/zh/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/zh/dashboard")); // 输出: "https://example.com/dashboard"
```
