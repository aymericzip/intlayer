# ドキュメント: `getTranslationContent` 関数 in `intlayer`

## 説明

`getTranslationContent` 関数は、カスタマイズ可能な言語コンテンツのセットから特定のロケールに対応するコンテンツを取得します。指定されたロケールが見つからない場合、プロジェクトで設定されたデフォルトロケールのコンテンツを返します。

## パラメータ

- `languageContent: CustomizableLanguageContent<Content>`

  - **説明**: 様々なロケールの翻訳を含むオブジェクト。各キーはロケールを表し、その値は対応するコンテンツです。
  - **型**: `CustomizableLanguageContent<Content>`
    - `Content` は任意の型であり、デフォルトは `string` です。

- `locale: Locales`

  - **説明**: コンテンツを取得するロケール。
  - **型**: `Locales`

## 戻り値

- **型**: `Content`
- **説明**: 指定されたロケールに対応するコンテンツ。ロケールが見つからない場合、デフォルトロケールのコンテンツを返します。

## 使用例

### 基本的な使用法

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

console.log(content); // 出力: "Hello" (デフォルトロケールのコンテンツ)
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

console.log(content); // 出力: "Hello" (デフォルトロケールのコンテンツ)
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

console.log(content); // 出力: "Hello" (デフォルトロケールのコンテンツ)
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
  - `locale` が `languageContent` に見つからない場合、関数はデフォルトロケールのコンテンツを返します。
- **不完全な言語コンテンツ:**
  - ロケールが部分的に定義されている場合、関数はコンテンツをマージしません。指定されたロケールの値を厳密に取得するか、デフォルトにフォールバックします。
- **TypeScript の強制:**
  - `languageContent` のロケールがプロジェクト設定と一致しない場合、TypeScript は必要なすべてのロケールが定義されていることを強制し、コンテンツが完全で型安全であることを保証します。
