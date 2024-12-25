# Documentation: `getLocaleName` 関数 in `intlayer`

## 説明:

`getLocaleName` 関数は、指定されたロケール (`targetLocale`) のローカライズされた名前を表示ロケール (`displayLocale`) で返します。`targetLocale` が指定されていない場合は、`displayLocale` の名前をその言語で返します。

## パラメータ:

- `displayLocale: Locales`

  - **説明**: ターゲットロケールの名前が表示されるロケール。
  - **タイプ**: 有効なロケールを表す列挙型または文字列。

- `targetLocale?: Locales`
  - **説明**: 名前がローカライズされるロケール。
  - **タイプ**: オプション。 有効なロケールを表す列挙型または文字列。

## 戻り値:

- **タイプ**: `string`
- **説明**: `displayLocale` での `targetLocale` のローカライズされた名前、または `targetLocale` が指定されていない場合は `displayLocale` 自身の名前を返します。翻訳が見つからない場合は、 `"Unknown locale"` を返します。

## 使用例:

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 出力: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 出力: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 出力: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 出力: "English"

getLocaleName(Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 出力: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 出力: "French"

getLocaleName(Locales.CHINESE); // 出力: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 出力: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 出力: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 出力: "Chinese"

getLocaleName("unknown-locale"); // 出力: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 出力: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 出力: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 出力: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 出力: "English"

getLocaleName(Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 出力: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 出力: "French"

getLocaleName(Locales.CHINESE); // 出力: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 出力: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 出力: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 出力: "Chinese"

getLocaleName("unknown-locale"); // 出力: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // 出力: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 出力: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 出力: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 出力: "English"

getLocaleName(Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 出力: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 出力: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 出力: "French"

getLocaleName(Locales.CHINESE); // 出力: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 出力: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 出力: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 出力: "Chinese"

getLocaleName("unknown-locale"); // 出力: "Unknown locale"
```

## エッジケース:

- **`targetLocale` が指定されていない場合:**
  - 関数は `displayLocale` 自身の名前を返すことをデフォルトとします。
- **翻訳が欠落している場合:**
  - `localeNameTranslations` に `targetLocale` または特定の `displayLocale` のエントリが含まれていない場合、関数は `ownLocalesName` にフォールバックするか、 `"Unknown locale"` を返します。
