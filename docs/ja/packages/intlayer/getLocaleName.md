# Documentation: `getLocaleName` 関数 in `intlayer`

## 説明:

`getLocaleName` 関数は、表示ロケール (`displayLocale`) における指定されたロケール (`targetLocale`) のローカライズされた名前を返します。`targetLocale` が指定されていない場合は、`displayLocale` の自国語での名前を返します。

## パラメータ:

- `displayLocale: Locales`

  - **説明**: ターゲットロケールの名前が表示されるロケール。
  - **タイプ**: 有効なロケールを表す列挙型または文字列。

- `targetLocale?: Locales`
  - **説明**: ローカライズされる名前のロケール。
  - **タイプ**: オプショナル。 有効なロケールを表す列挙型または文字列。

## 戻り値:

- **タイプ**: `string`
- **説明**: `displayLocale` における `targetLocale` のローカライズされた名前、または `targetLocale` が指定されていない場合は `displayLocale` 自身の名前を返します。翻訳が見つからない場合は、 `"Unknown locale"` を返します。

## 使用例:

```typescript
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

## エッジケース:

- **`targetLocale` が提供されていない場合:**
  - 関数は `displayLocale` 自身の名前を返すデフォルトになります。
- **翻訳が欠落している場合:**
  - `localeNameTranslations` に `targetLocale` または特定の `displayLocale` のエントリが含まれていない場合、関数は `ownLocalesName` にフォールバックするか、 `"Unknown locale"` を返します。
