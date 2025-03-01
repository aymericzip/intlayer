# ドキュメント: `getConfiguration` 関数 in `intlayer`

## 説明

`getConfiguration` 関数は、環境変数を抽出することによって `intlayer` アプリケーションの全体の設定を取得します。この関数は、クライアント側とサーバー側の両方で同じ設定を使用する柔軟性を提供し、アプリケーション全体で一貫性を確保します。

---

## パラメータ

この関数はパラメータを受け取りません。その代わりに、環境変数を使用して設定を行います。

### 戻り値

- **型**: `IntlayerConfig`
- **説明**: `intlayer` の完全な設定を含むオブジェクト。この設定には以下のセクションが含まれます:

  - `internationalization`: ロケールおよびストリクトモードに関連する設定。
  - `middleware`: URLおよびクッキー管理に関連する設定。
  - `content`: コンテンツファイル、ディレクトリ、およびパターンに関連する設定。
  - `editor`: エディター固有の設定。

詳細については、[Intlayer 設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。

---

## 使用例

### 完全な設定を取得する

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 出力:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 出力:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// 出力:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` と `defaultLocale` を抽出する

設定の `internationalization` セクションには、`locales`（利用可能なロケール）や `defaultLocale`（フォールバック言語）などのロケール関連の設定が含まれています。

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

## 注意事項

- この関数を呼び出す前に、必要なすべての環境変数が正しく設定されていることを確認してください。不足している変数は初期化時にエラーを引き起こします。
- この関数はクライアント側とサーバー側の両方で使用できるため、統一された方法で設定を管理するための汎用的なツールです。

## アプリケーションでの使用

`getConfiguration` 関数は、`intlayer` アプリケーションの設定を初期化および管理するための重要なユーティリティです。ロケール、ミドルウェア、コンテンツディレクトリなどの設定にアクセスすることで、多言語対応およびコンテンツ駆動型アプリケーションにおける一貫性とスケーラビリティを確保します。
