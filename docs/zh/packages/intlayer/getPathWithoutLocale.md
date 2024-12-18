# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

从给定的 URL 或路径中删除语言环境部分（如果存在）。它适用于绝对 URL 和相对路径。

## Parameters:

- `inputUrl: string`

  - **Description**: 要处理的完整 URL 字符串或路径。
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: 可选的支持语言环境数组。默认为项目中配置的语言环境。
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: 不带语言环境部分的 URL 字符串或路径。

## Example Usage:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/zh/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/zh/dashboard")); // 输出: "https://example.com/dashboard"
```
