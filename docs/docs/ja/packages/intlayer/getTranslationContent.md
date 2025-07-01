---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation 関数 - Intlayer JavaScript ドキュメント
description: Intlayer の getTranslation 関数のドキュメント。特定のロケールのローカライズされたコンテンツを取得し、デフォルトロケールにフォールバックします。
keywords:
  - getTranslation
  - intlayer
  - 関数
  - ローカリゼーション
  - i18n
  - JavaScript
  - 翻訳
  - ロケール
---

# ドキュメント: `intlayer` の `getTranslation` 関数

## 説明

`getTranslation` 関数は、カスタマイズ可能な言語コンテンツのセットから特定のロケールに対応するコンテンツを取得します。指定されたロケールが見つからない場合は、プロジェクトで設定されたデフォルトロケールのコンテンツを返します。

## パラメーター

- `languageContent: CustomizableLanguageContent<Content>`

  - **説明**: 複数のロケールの翻訳を含むオブジェクトです。各キーはロケールを表し、その値が対応するコンテンツです。
  - **型**: `CustomizableLanguageContent<Content>`
    - `Content` は任意の型で、デフォルトは `string` です。

- `locale: Locales`

  - **説明**: コンテンツを取得する対象のロケールです。
  - **型**: `Locales`

## 戻り値

- **型**: `Content`
- **説明**: 指定されたロケールに対応するコンテンツです。ロケールが見つからない場合は、デフォルトロケールのコンテンツが返されます。

## 使用例

### 基本的な使用法

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 出力: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 出力: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 出力: "Bonjour"
```

### ロケールが見つからない場合:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

### カスタムコンテンツタイプの使用例:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 出力: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 出力: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 出力: "Bonjour"
```

## エッジケース

- **ロケールが見つからない場合:**
  - `locale` が `languageContent` に存在しない場合、関数はデフォルトのロケールのコンテンツを返します。
- **不完全な言語コンテンツ:**
  - ロケールが部分的に定義されている場合、関数はコンテンツをマージしません。指定されたロケールの値を厳密に取得するか、デフォルトにフォールバックします。
- **TypeScriptの強制:**
- `languageContent` のロケールがプロジェクトの設定と一致しない場合、TypeScript はすべての必須ロケールが定義されていることを強制し、コンテンツが完全かつ型安全であることを保証します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
