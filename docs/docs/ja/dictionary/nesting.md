---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "ネスト：辞書間でコンテンツを再利用"
description: "Intlayer の nest() ノードで辞書から別の辞書を参照し、翻訳を重複させずに共通コンテンツを再利用します。"
keywords:
  - Nesting
  - コンテンツの再利用
  - 文書
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
author: aymericzip
---

# ネスト / サブコンテンツ参照

## ネストの仕組み

Intlayerでは、`nest`関数を使用して、別の辞書からコンテンツを参照および再利用することでネストを実現します。コンテンツを重複させる代わりに、キーを使用して既存のコンテンツモジュールを指すことができます。

## ネストの設定

Intlayerプロジェクトでネストを設定するには、まず再利用したい基本コンテンツを定義します。次に、別のコンテンツモジュールで`nest`関数を使用してそのコンテンツをインポートします。

### ベースディクショナリ

別のディクショナリにネストするベースディクショナリの例を以下に示します：

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

### Nestを使用した参照

次に、`nest`関数を使用して上記のコンテンツを参照する別のコンテンツモジュールを作成します。コンテンツ全体または特定のネストされた値を参照できます:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // 辞書全体を参照します:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // 特定のネストされた値を参照します:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
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

2番目のパラメーターとして、そのコンテンツ内のネストされた値へのパスを指定できます。パスが指定されない場合、参照された辞書のコンテンツ全体が返されます。

## ネストの設定

<Tabs group="framework">
  <Tab label="React" value="react">

React コンポーネントでネストされたコンテンツを使用するには、`react-intlayer` パッケージの `useIntlayer` フックを利用します。このフックは指定されたキーに基づいてコンテンツを取得します。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Next.js のクライアントコンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Vue コンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte コンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。ストアは `$` で参照します。 以下は使用例です：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact コンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJS コンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular コンポーネントでネストされたコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` でネストされたコンテンツを使用するには、`useIntlayer` を経由して取得します。以下は使用例です：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## 追加リソース

設定や使用方法の詳細については、以下のリソースを参照してください:

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、さまざまな環境やフレームワークでのIntlayerのセットアップと使用方法についてさらに詳しく説明しています。
