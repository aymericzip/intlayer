# Documentation: `getLocaleLang`関数 in `intlayer`

## 説明:

`getLocaleLang`関数は、ロケール文字列から言語コードを抽出します。国コードの有無にかかわらずロケールをサポートしています。ロケールが提供されていない場合、デフォルトで空の文字列を返します。

## パラメータ:

- `locale?: Locales`

  - **説明**: 言語コードが抽出されるロケール文字列（例: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`）。
  - **タイプ**: `Locales`（オプショナル）

## 戻り値:

- **タイプ**: `string`
- **説明**: ロケールから抽出された言語コード。ロケールが提供されていない場合、空の文字列 (`''`) を返します。

## 使用例:

### 言語コードの抽出:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 出力: "en"
getLocaleLang(Locales.ENGLISH); // 出力: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 出力: "fr"
getLocaleLang(Locales.FRENCH); // 出力: "fr"
```

## エッジケース:

- **ロケールが提供されていない場合:**

  - `locale`が`undefined`のとき、関数は空の文字列を返します。

- **不正なロケール文字列:**
  - `locale`が`language-country`形式（例: `Locales.ENGLISH-US`）に従っていない場合、関数は安全に`'-'`の前の部分または`'-'`が存在しない場合は全体の文字列を返します。
