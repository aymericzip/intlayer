# Documentation: `getTranslation` 関数 in `intlayer`

## Description

`getTranslation` 関数は、カスタマイズ可能な言語コンテンツのセットから特定のロケールに対応するコンテンツを取得します。指定されたロケールが見つからない場合、プロジェクトで設定されたデフォルトロケールのコンテンツが返されます。

## Parameters

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: 様々なロケールの翻訳を含むオブジェクトです。各キーはロケールを表し、その値は対応するコンテンツです。
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` は任意の型で、デフォルトは `string` です。

- `locale: Locales`

  - **Description**: コンテンツを取得するためのロケールです。
  - **Type**: `Locales`

## Returns

- **Type**: `Content`
- **Description**: 指定されたロケールに対応するコンテンツです。ロケールが見つからない場合は、デフォルトロケールのコンテンツが返されます。

## Example Usage

### Basic Usage

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

### Missing Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 出力: "Hello"（デフォルトロケールのコンテンツ）
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

console.log(content); // 出力: "Hello"（デフォルトロケールのコンテンツ）
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

console.log(content); // 出力: "Hello"（デフォルトロケールのコンテンツ）
```

### Using Custom Content Types:

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

## Edge Cases

- **Locale Not Found:**
  - `languageContent` に `locale` が見つからない場合、関数はデフォルトロケールのコンテンツを返します。
- **Incomplete Language Content:**

  - ロケールが部分的に定義されている場合、関数はコンテンツをマージしません。指定されたロケールの値を厳密に取得するか、デフォルトにフォールバックします。

- **TypeScript Enforcement:**
  - `languageContent` のロケールがプロジェクトの設定と一致しない場合、TypeScript は必要なすべてのロケールが定義されていることを強制し、コンテンツが完全で型安全であることを保証します。
