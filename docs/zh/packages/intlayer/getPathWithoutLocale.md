# 文档: `getPathWithoutLocale` 函数在 `intlayer`

## 描述

从给定的 URL 或路径名中移除语言环境段（如果存在）。它适用于绝对 URL 和相对路径名。

## 参数

- `inputUrl: string`

  - **描述**: 要处理的完整 URL 字符串或路径名。
  - **类型**: `string`

- `locales: Locales[]`
  - **描述**: 可选的支持语言环境数组。默认为项目中配置的语言环境。
  - **类型**: `Locales[]`

## 返回值

- **类型**: `string`
- **描述**: 没有语言环境段的 URL 字符串或路径名。

## 示例用法

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
