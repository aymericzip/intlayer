# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

指定されたURLまたはパス名からロケールセグメントを削除します。これは、絶対URLと相対パス名の両方で機能します。

## Parameters:

- `inputUrl: string`

  - **Description**: 処理する完全なURL文字列またはパス名。
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: サポートされているロケールのオプション配列。プロジェクトで構成されたロケールがデフォルトとなります。
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: ロケールセグメントのないURL文字列またはパス名。

## Example Usage:

```typescript
import { getPathWithoutLocale } from "intlayer";

// ロケールセグメントがないパスを表示します
console.log(getPathWithoutLocale("/dashboard")); // 出力: "/dashboard"
// ロケールを持つパスを表示しますが、ロケールセグメントは削除されます
console.log(getPathWithoutLocale("/en/dashboard")); // 出力: "/dashboard"
// 他のロケールを表示しますが、ロケールセグメントは削除されます
console.log(getPathWithoutLocale("/fr/dashboard")); // 出力: "/dashboard"
// 完全なURLでロケールセグメントを削除します
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 出力: "https://example.com/dashboard"
```
