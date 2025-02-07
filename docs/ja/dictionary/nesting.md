# ネスト / サブコンテンツの参照

## ネストの仕組み

Intlayer では、`nest` 関数を使用して、他のディクショナリからコンテンツを参照および再利用できます。コンテンツを重複させる代わりに、そのキーで既存のコンテンツモジュールを指すことができます。

## ネストのセットアップ方法

Intlayer プロジェクトでネストをセットアップするには、最初に再利用したいベースコンテンツを定義します。その後、別のコンテンツモジュール内で `nest` 関数を使用してそのコンテンツをインポートします。

### ベースディクショナリ

以下は、ネストされたコンテンツを含むベースディクショナリの例です:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### `nest`による参照

次に、先ほどのコンテンツを参照するために `nest` 関数を使用する別のコンテンツモジュールを作成します。全体のコンテンツまたは特定のネストされた値を参照できます:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // ディクショナリ全体を参照:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // 特定のネストされた値を参照:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

第二引数として、そのコンテンツ内のネストされた値へのパスを指定できます。パスが指定されていない場合は、参照されたディクショナリ全体のコンテンツが返されます。

## React Intlayerでのネストの使用

React コンポーネントでネストされたコンテンツを使用するには、`react-intlayer`パッケージの`useIntlayer`フックを活用します。このフックは、指定されたキーに基づいて正しいコンテンツを取得します。以下は使用例です:

```tsx fileName="/{{locale}}/**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        フルネストされた内容: {JSON.stringify(fullNestedContent)}
        {/* 出力: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        一部ネストされた値: {partialNestedContent}
        {/* 出力: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="/{{locale}}/**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        フルネストされた内容: {JSON.stringify(fullNestedContent)}
        {/* 出力: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        一部ネストされた値: {partialNestedContent}
        {/* 出力: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="/{{locale}}/**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        フルネストされた内容: {JSON.stringify(fullNestedContent)}
        {/* 出力: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        一部ネストされた値: {partialNestedContent}
        {/* 出力: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## 追加リソース

設定や使用方法に関する詳細情報は、以下のリソースを参照してください:

- [Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [React Intlayerドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayerドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerの設定と使用方法についてさらに詳しく説明します。
