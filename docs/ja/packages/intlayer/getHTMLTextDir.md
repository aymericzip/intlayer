# Documentation: `getHTMLTextDir` Function in `intlayer`

## 説明:

`getHTMLTextDir` 関数は、提供されたロケールに基づいてテキストの方向（`ltr`, `rtl`, または `auto`）を決定します。これは、開発者がHTML内で適切なテキストレンダリングのために `dir` 属性を設定できるように設計されています。

## パラメーター:

- `locale?: Locales`

  - **説明**: テキストの方向を決定するために使用されるロケール文字列（例: `Locales.ENGLISH`, `Locales.ARABIC`）。
  - **タイプ**: `Locales`（オプショナル）

## 戻り値:

- **タイプ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **説明**: ロケールに対応するテキストの方向:
  - `'ltr'` 左から右の言語用。
  - `'rtl'` 右から左の言語用。
  - `'auto'` ロケールが認識されない場合。

## 使用例:

### テキスト方向の決定:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 出力: "ltr"
getHTMLTextDir(Locales.FRENCH); // 出力: "ltr"
getHTMLTextDir(Locales.ARABIC); // 出力: "rtl"
```

## エッジケース:

- **ロケールが提供されていない場合:**

  - `locale` が `undefined` の場合、関数は `'auto'` を返します。

- **認識されないロケール:**
  - 認識されないロケールの場合、関数は `'auto'` にデフォルト設定されます。

## コンポーネントでの使用:

`getHTMLTextDir` 関数は、ロケールに基づいてHTMLドキュメント内で `dir` 属性を動的に設定するために使用できます。

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

上記の例では、`dir` 属性はロケールに基づいて動的に設定されます。
