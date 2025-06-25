---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
keywords:
  - getLocaleName
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `getLocaleName` 関数 in `intlayer`

## 説明

`getLocaleName` 関数は、指定されたロケール (`targetLocale`) の名前を表示ロケール (`displayLocale`) でローカライズして返します。`targetLocale` が指定されていない場合、`displayLocale` 自身の言語での名前を返します。

## パラメータ

- `displayLocale: Locales`

  - **説明**: ターゲットロケールの名前を表示するロケール。
  - **型**: 有効なロケールを表す列挙型または文字列。

- `targetLocale?: Locales`
  - **説明**: ローカライズする名前の対象となるロケール。
  - **型**: 任意。有効なロケールを表す列挙型または文字列。

## 戻り値

- **型**: `string`
- **説明**: `displayLocale` でローカライズされた `targetLocale` の名前、または `targetLocale` が指定されていない場合は `displayLocale` 自身の名前。翻訳が見つからない場合は `"Unknown locale"` を返します。

## 使用例

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

## エッジケース

- **`targetLocale` が指定されていない場合:**
  - 関数はデフォルトで `displayLocale` 自身の名前を返します。
- **翻訳が見つからない場合:**
  - `localeNameTranslations` に `targetLocale` または特定の `displayLocale` のエントリがない場合、関数は `ownLocalesName` を使用するか、`"Unknown locale"` を返します。
