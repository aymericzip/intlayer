---
createdAt: 2025-02-07
updatedAt: 2026-01-10
title: コンテンツファイル
description: コンテンツ宣言ファイルの拡張機能をカスタマイズする方法を学びます。このドキュメントに従って、プロジェクトで効率的に条件を実装しましょう。
keywords:
  - コンテンツファイル
  - ドキュメント
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: ICUおよびi18next形式のサポートを追加
  - version: 6.0.0
    date: 2025-09-20
    changes: フィールドのドキュメントを追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴を初期化
---

# コンテンツファイル

<iframe title="i18n、Markdown、JSON…すべてを管理するための一つのソリューション | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## コンテンツファイルとは何ですか？

Intlayerにおけるコンテンツファイルとは、辞書定義を含むファイルのことです。  
これらのファイルは、アプリケーションのテキストコンテンツ、翻訳、およびリソースを宣言します。  
コンテンツファイルはIntlayerによって処理され、辞書が生成されます。

辞書は、`useIntlayer`フックを使用してアプリケーションがインポートする最終的な結果となります。

### 主要な概念

#### 辞書

辞書とは、キーによって整理された構造化されたコンテンツの集合です。各辞書には以下が含まれます：

- **キー**：辞書の一意の識別子
- **コンテンツ**：実際のコンテンツ値（テキスト、数値、オブジェクトなど）
- **メタデータ**：タイトル、説明、タグなどの追加情報

#### コンテンツファイル

コンテンツファイルの例：

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "こんにちは世界", // "Hello World"の日本語訳
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 環境変数NODE_ENVの値
      },
    },
    multilingualContent: t({
      ja: "日本語のコンテンツ",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# マークダウンの例"),

    /*
     * `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
     */
    jsxContent: <h1>私のタイトル</h1>,
  },
} satisfies Dictionary<Content>; // [オプション] Dictionary はジェネリックで、辞書のフォーマットを強化できます
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ja: "日本語のコンテンツ",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# Markdownの例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>My title</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ja: "日本語のコンテンツ",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# マークダウンの例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>My title</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "車はありません",
        "1": "車が1台",
        "<-1": "マイナス1台未満の車",
        "-1": "マイナス1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "検証が有効です",
        "false": "検証が無効です",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "こんにちは {{name}}！",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# マークダウンの例",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["マイタイトル"],
      },
    },
  },
}
```

#### コンテンツノード

コンテンツノードは辞書コンテンツの構成要素です。以下のようなものがあります：

- **プリミティブ値**：文字列、数値、真偽値、null、undefined
- **型付きノード**：翻訳、条件、マークダウンなどの特殊なコンテンツタイプ
- **関数**：実行時に評価可能な動的コンテンツ [関数フェッチについてはこちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)
- **ネストされたコンテンツ**：他の辞書への参照

#### コンテンツタイプ

Intlayerは型付きノードを通じて様々なコンテンツタイプをサポートしています：

- **翻訳コンテンツ**: ロケール固有の値を持つ多言語テキスト [翻訳コンテンツを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation_content.md)
- **条件コンテンツ**: ブール式に基づく条件付きコンテンツ [条件コンテンツを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/condition_content.md)
- **列挙コンテンツ**: 列挙値に基づいて変化するコンテンツ [列挙コンテンツを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration_content.md)
- **挿入コンテンツ**: 他のコンテンツに挿入可能なコンテンツ [挿入コンテンツを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion_content.md)
- **Markdown Content**: Markdown形式のリッチテキストコンテンツ [Markdown Contentを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown_content.md)
- **Nested Content**: 他の辞書への参照 [Nested Contentを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nested_content.md)
- **Gender Content**: 性別に応じて変わるコンテンツ [Gender Contentを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender_content.md)
- **File Content**: 外部ファイルへの参照 [File Contentを参照](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file_content.md)

## 辞書の構造

Intlayerの辞書は`Dictionary`型で定義され、その動作を制御するいくつかのプロパティを含みます。

### 必須プロパティ

#### `key` (string)

辞書の識別子です。同じキーを持つ複数の辞書がある場合、Intlayerは自動的にそれらをマージします。

> ケバブケースの命名規則を使用してください（例: `"about-page-meta"`）。

#### Content (string | number | boolean | object | array | function)

`content`プロパティは実際の辞書データを含み、以下をサポートします：

- **プリミティブ値**：文字列、数値、ブール値、null、undefined
- **型付きノード**：Intlayerのヘルパー関数を使った特殊なコンテンツタイプ
- **ネストされたオブジェクト**：複雑なデータ構造
- **配列**：コンテンツのコレクション
- **関数**：動的なコンテンツ評価

### 任意プロパティ

#### `title` (string)

辞書を識別するための人間に読みやすいタイトルで、エディターやCMSシステムでの識別に役立ちます。特に大量の辞書を管理する場合やコンテンツ管理インターフェースで作業する際に有用です。

**例:**

```typescript
{
  key: "about-page-meta",
  title: "About Page Metadata",
  content: { /* ... */ }
}
```

#### `description` (string)

辞書の目的、使用ガイドライン、および特別な注意事項を説明する詳細な説明です。この説明はAIによる翻訳生成のコンテキストとしても使用され、翻訳の品質と一貫性を維持するために重要です。

**例:**

```typescript
{
  key: "about-page-meta",
  description: [
    "This dictionary manages the metadata of the About Page",
    "SEOのベストプラクティスを考慮してください：",
    "- タイトルは50〜60文字の間であるべきです",
    "- 説明は150〜160文字の間であるべきです",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

辞書を分類および整理するための文字列配列です。タグは追加のコンテキストを提供し、エディターやCMSシステムでのフィルタリング、検索、整理に使用できます。

**例：**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

辞書コンテンツに使用するフォーマッターを指定します。これにより、異なるメッセージフォーマット構文を使用できます。

- `'intlayer'`: デフォルトのIntlayerフォーマッター。
- `'icu'`: ICUメッセージフォーマットを使用します。
- `'i18next'`: i18nextメッセージフォーマットを使用します。

**例：**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

辞書をロケールごとの辞書に変換し、content内で宣言された各フィールドが自動的に翻訳ノードに変換されます。このプロパティが設定されている場合：

- 辞書は単一ロケールの辞書として扱われます
- 各フィールドは特定のロケールの翻訳ノードになります
- このプロパティを使用する場合、コンテンツ内で翻訳ノード（`t()`）を使用してはいけません
- 指定がない場合、辞書は多言語辞書として扱われます

> 詳細は [Intlayerにおけるロケール別コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md) を参照してください。

**例:**

```json
// ロケール別辞書
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // これは 'en' の翻訳ノードになります
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

外部ソースから辞書の内容を自動的に埋めるための指示です。これは `intlayer.config.ts` でグローバルに、または辞書ごとに設定できます。複数のフォーマットをサポートしています：

- **`true`**：すべてのロケールで自動埋めを有効にする
- **`string`**：単一ファイルへのパス、または変数を含むテンプレート
- **`object`**：ロケールごとのファイルパス

**例：**

```json
// すべてのロケールで有効化
{
  "autoFill": true
}
// 単一ファイル
{
  "autoFill": "./translations/aboutPage.content.json"
}
// 変数を含むテンプレート
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// ロケールごとの詳細設定
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**利用可能な変数:**

- `{{locale}}` – ロケールコード（例: `fr`, `es`）
- `{{fileName}}` – ファイル名（例: `example`）
- `{{key}}` – 辞書キー（例: `example`）

> 詳細は[Auto-Fill Configuration in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)を参照してください。

##### `priority` (number)

辞書の優先順位を示します。複数の辞書が同じキーを持つ場合、最も高い優先順位の辞書が他を上書きします。これはコンテンツの階層管理や上書きに役立ちます。

**例:**

```typescript
// ベース辞書
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// 上書き辞書
{
  key: "welcome-message",
  priority: 10,
  content: { message: "プレミアムサービスへようこそ！" }
}
// これはベースの辞書を上書きします
```

### CMSプロパティ

##### `version` (string)

リモート辞書のバージョン識別子。どのバージョンの辞書が現在使用されているかを追跡するのに役立ちます。特にリモートコンテンツ管理システムを使用する場合に有用です。

##### `live` (boolean)

リモート辞書の場合、辞書を実行時にライブで取得するかどうかを示します。有効にすると：

- `intlayer.config.ts`で`importMode`を"live"に設定する必要があります
- ライブサーバーが稼働している必要があります
- ライブ同期APIを使用して実行時に辞書が取得されます
- ライブで取得に失敗した場合は動的値にフォールバックします
- ライブでない場合は、最適なパフォーマンスのためにビルド時に辞書が変換されます

### システムプロパティ（自動生成）

これらのプロパティはIntlayerによって自動的に生成され、手動での変更は推奨されません。

##### `$schema` (string)

辞書構造の検証に使用されるJSONスキーマ。辞書の整合性を保証するためにIntlayerによって自動的に追加されます。

##### `id` (string)

リモート辞書の場合、リモートサーバー上の辞書の一意識別子です。リモートコンテンツの取得および管理に使用されます。

##### `localId` (LocalDictionaryId)

ローカル辞書の一意識別子。辞書がローカルかリモートか、その場所を判別するためにIntlayerによって自動生成されます。

##### `localIds` (LocalDictionaryId[])

マージされた辞書の場合、この配列にはマージされたすべての辞書のIDが含まれます。マージされたコンテンツの出所を追跡するのに役立ちます。

##### `filePath` (string)

ローカル辞書のファイルパスで、どの `.content` ファイルから辞書が生成されたかを示します。デバッグやソースの追跡に役立ちます。

##### `versions` (string[])

リモート辞書の場合、この配列には辞書の利用可能なすべてのバージョンが含まれます。どのバージョンが使用可能かを追跡するのに役立ちます。

##### `autoFilled` (true)

辞書が外部ソースから自動的に補完されたかどうかを示します。競合が発生した場合、ベース辞書が自動補完された辞書より優先されます。

##### `location` ('distant' | 'locale')

辞書の場所を示します：

- `'locale'`: ローカル辞書（コンテンツファイルから）
- `'distant'`: リモート辞書（外部ソースから）

## コンテンツノードタイプ

Intlayerは、基本的なプリミティブ値を拡張するいくつかの専門的なコンテンツノードタイプを提供します。

### 翻訳コンテンツ (`t`)

ロケールごとに異なる多言語コンテンツ：

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### 条件コンテンツ (`cond`)

ブール条件に基づいて変化するコンテンツ：

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### 列挙コンテンツ (`enu`)

列挙された値に基づいて変化するコンテンツ：

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Your request is pending", // あなたのリクエストは保留中です
  approved: "Your request has been approved", // あなたのリクエストは承認されました
  rejected: "Your request has been rejected", // あなたのリクエストは拒否されました
});
```

### 挿入コンテンツ (`insert`)

他のコンテンツに挿入できるコンテンツ：

```typescript
import { insert } from "intlayer";

insertionContent: insert("This text can be inserted anywhere"); // このテキストはどこにでも挿入できます
```

### ネストコンテンツ (`nest`)

他の辞書への参照：

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page"); // "about-page" への参照
```

### マークダウンコンテンツ (`md`)

Markdown形式のリッチテキストコンテンツ：

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Welcome\n\nこれは**太字**のテキストで、[リンク](https://example.com)が含まれています"
);
```

### ジェンダーコンテンツ (`gender`)

ジェンダーに基づいて変化するコンテンツ:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "彼は開発者です",
  female: "彼女は開発者です",
  other: "彼らは開発者です",
});
```

### ファイルコンテンツ (`file`)

外部ファイルへの参照:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## コンテンツファイルの作成

### 基本的なコンテンツファイル構造

コンテンツファイルは `Dictionary` 型を満たすデフォルトオブジェクトをエクスポートします:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Welcome Page Content",
  description:
    "ヒーローセクションと機能を含むメインのウェルカムページのコンテンツ",
  tags: ["ページ", "ウェルカム", "ホームページ"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          ja: "使いやすい",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          ja: "すべてのスキルレベルに対応した直感的なインターフェース",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON コンテンツファイル

JSON形式でコンテンツファイルを作成することもできます：

```json
{
  "key": "welcome-page",
  "title": "ウェルカムページのコンテンツ",
  "description": "メインのウェルカムページのコンテンツ",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### ロケール別コンテンツファイル

ロケール別の辞書を作成する場合は、`locale` プロパティを指定します:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## コンテンツファイルの拡張子

Intlayerでは、コンテンツ宣言ファイルの拡張子をカスタマイズすることができます。このカスタマイズにより、大規模プロジェクトの管理が柔軟になり、他のモジュールとの競合を回避するのに役立ちます。

### デフォルトの拡張子

デフォルトでは、Intlayerは以下の拡張子を持つすべてのファイルをコンテンツ宣言用に監視します：

- `.content.json`
- `.content.json5`
- `.content.jsonc`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

これらのデフォルト拡張子はほとんどのアプリケーションに適しています。しかし、特定のニーズがある場合は、カスタム拡張子を定義してビルドプロセスを効率化し、他のコンポーネントとの競合リスクを減らすことができます。

> Intlayerがコンテンツ宣言ファイルを識別するために使用するファイル拡張子をカスタマイズするには、Intlayerの設定ファイルで指定できます。この方法は、ウォッチプロセスの範囲を制限してビルドパフォーマンスを向上させる大規模プロジェクトに特に有効です。

## 高度な概念

### 辞書のマージ

複数の辞書が同じキーを持つ場合、Intlayerは自動的にそれらをマージします。マージの挙動は以下のいくつかの要因に依存します：

- **優先度**: `priority` の値が高い辞書が低い辞書を上書きする
- **自動入力 vs ベース**: ベース辞書は自動入力された辞書を上書きします
- **場所**: ローカル辞書はリモート辞書を上書きします（優先度が同じ場合）

### 型安全性

Intlayerはコンテンツファイルに対して完全なTypeScriptサポートを提供します：

```typescript
// コンテンツの型を定義
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// 辞書で使用する
export default {
  key: "welcome-page",
  content: {
    // TypeScriptがオートコンプリートと型チェックを提供します
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### ノードの入れ子構造

問題なく関数を他の関数に入れ子にすることができます。

例：

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          ja: "複数のアイテムが見つかりました",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ja: "有効なデータがありません",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // 挨拶の翻訳
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe", // 名前
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "ja": "アイテムが見つかりませんでした",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ja": "1つのアイテムが見つかりました",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ja": "複数のアイテムが見つかりました",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### ベストプラクティス

1. **命名規則**:
   - 辞書のキーにはケバブケース（`"about-page-meta"`）を使用する
   - 関連するコンテンツは同じキーのプレフィックスの下にグループ化する

2. **コンテンツの整理**:
   - 関連するコンテンツは同じ辞書内にまとめておく
   - 複雑なコンテンツ構造はネストされたオブジェクトで整理する
   - カテゴリ分けにはタグを活用する
   - `autoFill` を使って不足している翻訳を自動的に補完する

3. **パフォーマンス**:
   - 監視対象ファイルの範囲を制限するためにコンテンツ設定を調整する
   - リアルタイムの更新が必要な場合（例：A/Bテストなど）にのみライブ辞書を使用する
   - ビルド時に辞書を最適化するために、ビルド変換プラグイン（`@intlayer/swc` または `@intlayer/babel`）が有効になっていることを確認する
