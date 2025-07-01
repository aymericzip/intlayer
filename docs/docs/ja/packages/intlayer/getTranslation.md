---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation 関数ドキュメント | intlayer
description: intlayer パッケージの getTranslation 関数の使い方を説明します
keywords:
  - getTranslation
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `intlayer` の `getTranslationContent` 関数

## 説明

`getTranslationContent` 関数は、カスタマイズ可能な言語コンテンツのセットから特定のロケールに対応するコンテンツを取得します。指定されたロケールが見つからない場合は、プロジェクトで設定されたデフォルトのロケールのコンテンツを返します。

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
- **説明**: 指定されたロケールに対応するコンテンツです。ロケールが見つからない場合は、デフォルトのロケールのコンテンツが返されます。

## 使用例

### 基本的な使用例

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 出力: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 出力: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
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
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello" (デフォルトロケールの内容)
```

### カスタムコンテンツタイプの使用:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 出力: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 出力: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
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
  - `locale` が `languageContent` に見つからない場合、関数はデフォルトのロケールのコンテンツを返します。
- **不完全な言語コンテンツ:**
  - ロケールが部分的に定義されている場合、関数はコンテンツをマージしません。指定されたロケールの値を厳密に取得するか、デフォルトにフォールバックします。
- **TypeScriptの強制:**
  - `languageContent`内のロケールがプロジェクトの設定と一致しない場合、TypeScriptはすべての必須ロケールが定義されていることを強制し、コンテンツが完全かつ型安全であることを保証します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
