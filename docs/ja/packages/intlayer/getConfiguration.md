# Documentation: `getConfiguration` Function in `intlayer`

## Description:

`getConfiguration`関数は、環境変数を抽出することによって、`intlayer`アプリケーションの全体の設定を取得します。この関数は、クライアントとサーバーの両方で同じ設定を使用する柔軟性を提供し、アプリケーション全体での一貫性を確保します。

---

## Parameters:

この関数は、パラメータを受け取りません。代わりに、設定のために環境変数を使用します。

### Returns:

- **Type**: `IntlayerConfig`
- **Description**: `intlayer`の完全な設定を含むオブジェクト。設定には以下のセクションが含まれます：

  - `internationalization`: ロケールおよび厳格モードに関連する設定。
  - `middleware`: URLおよびクッキー管理に関連する設定。
  - `content`: コンテンツファイル、ディレクトリ、およびパターンに関連する設定。
  - `editor`: エディター特有の設定。

詳細は[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)をご覧ください。

---

## Example Usage:

### Full Configurationの取得:

```typescript
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

### `availableLocales` と `defaultLocale` の抽出:

設定の`internationalization`セクションは、`locales`（利用可能なロケール）や`defaultLocale`（フォールバック言語）などのロケール関連の設定を提供します。

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

## Notes:

- この関数を呼び出す前に、必要な全ての環境変数が正しく設定されていることを確認してください。変数が不足していると、初期化中にエラーが発生します。
- この関数はクライアントおよびサーバー側の両方で使用できるため、統一された方法で設定を管理するのに便利なツールです。

## Applicationsでの使用:

`getConfiguration`関数は、`intlayer`アプリケーションの設定を初期化し、管理するための基盤ユーティリティです。ロケール、ミドルウェア、コンテンツディレクトリなどの設定へのアクセスを提供することで、多言語およびコンテンツ駆動アプリケーション全体での一貫性とスケーラビリティを確保します。
