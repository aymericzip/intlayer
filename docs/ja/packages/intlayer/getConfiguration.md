# Documentation: `getConfiguration` Function in `intlayer`

## 説明:

`getConfiguration` 関数は、環境変数を抽出することで `intlayer` アプリケーションの全設定を取得します。この関数は、クライアント側とサーバー側の両方で同じ設定を使用できる柔軟性を提供し、アプリケーション全体での一貫性を確保します。

---

## パラメータ:

この関数はパラメータを取らず、代わりに環境変数を設定に使用します。

### 戻り値:

- **タイプ**: `IntlayerConfig`
- **説明**: `intlayer` の完全な設定を含むオブジェクト。設定には以下のセクションが含まれます:

  - `internationalization`: ロケールと厳密モードに関連する設定。
  - `middleware`: URL とクッキー管理に関連する設定。
  - `content`: コンテンツファイル、ディレクトリ、およびパターンに関連する設定。
  - `editor`: エディタ固有の設定。

詳細については [Intlayer 設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。

---

## 使用例:

### 完全な設定の取得:

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

### `availableLocales` と `defaultLocale` の抽出:

設定の `internationalization` セクションは、利用可能なロケールとしての `locales` とフォールバック言語としての `defaultLocale` など、ロケール関連の設定を提供します。

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力の例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力の例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力の例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力の例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力の例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力の例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

## 注意事項:

- この関数を呼び出す前に、必要な環境変数がすべて正しく設定されていることを確認してください。欠落している変数は初期化中にエラーを引き起こします。
- この関数はクライアント側とサーバー側の両方で使用でき、設定を統一的に管理するための versatile なツールです。

## アプリケーションでの使用:

`getConfiguration` 関数は、`intlayer` アプリケーションの設定を初期化および管理するための重要なユーティリティです。ロケール、ミドルウェア、コンテンツディレクトリの設定へのアクセスを提供することにより、マルチリンガルやコンテンツ駆動型アプリケーション全体での一貫性とスケーラビリティを保証します。
