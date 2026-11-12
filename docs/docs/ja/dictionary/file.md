---
createdAt: 2025-03-13
updatedAt: 2026-10-08
priority: 8
title: "ファイルコンテンツ：外部ファイルを埋め込む"
description: "file() 関数で Markdown やテキストなどの外部ファイルを Intlayer の辞書に埋め込み、元ファイルと同期させます。"
keywords:
  - ファイル
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerでのファイルコンテンツ / ファイルの埋め込み

Intlayerでは、`file`関数により外部ファイルのコンテンツを辞書に埋め込むことができます。このアプローチにより、Intlayerがソースファイルを認識し、Intlayer Visual EditorおよびCMSとのシームレスな統合が可能になります。

## ファイル埋め込みの仕組み

Intlayerでは、`file` 関数を使用して外部ファイルの内容を辞書に埋め込むことができます。この方法により、Intlayerはソースファイルを認識し、IntlayerビジュアルエディターやCMSとのシームレスな統合を可能にします。直接的な `import`、`require`、または `fs` によるファイル読み込み方法とは異なり、`file` を使用するとファイルが辞書に関連付けられ、ファイルが編集されるとIntlayerがコンテンツを動的に追跡および更新できるようになります。

## ファイルコンテンツの設定

Intlayerプロジェクトにファイルコンテンツを埋め込むには、コンテンツモジュール内で `file` 関数を使用します。以下に異なる実装例を示します。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## React Intlayerでのファイルコンテンツの使用

<Tabs group="framework">
  <Tab label="React" value="react">

React コンポーネントで埋め込みファイルコンテンツを使用するには、`react-intlayer` パッケージの `useIntlayer` フックをインポートして使用します。これにより指定されたキーのコンテンツを取得し、動的に表示できます。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Next.js のクライアントコンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Vue コンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte コンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。ストアは `$` で参照します。 以下は使用例です：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact コンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJS コンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular コンポーネントで埋め込みファイルコンテンツを使用するには、`useIntlayer` フック経由で取得します。 以下は使用例です：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` で埋め込みファイルコンテンツを使用するには、`useIntlayer` を経由して取得します。以下は使用例です：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## 多言語対応Markdownの例

多言語対応の編集可能なMarkdownファイルをサポートするために、`file`を`t()`および`md()`と組み合わせて使用し、Markdownコンテンツファイルの異なる言語バージョンを定義できます。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

この設定により、ユーザーの言語設定に基づいてコンテンツを動的に取得することが可能になります。IntlayerのビジュアルエディターやCMSで使用される場合、システムはコンテンツが指定されたMarkdownファイルから来ていることを認識し、それらが編集可能なままであることを保証します。

## Intlayerがファイルコンテンツを処理する方法

`file`関数はNode.jsの`fs`モジュールに基づいており、指定されたファイルの内容を読み取り、辞書に挿入します。IntlayerのビジュアルエディターやCMSと組み合わせて使用される場合、Intlayerは辞書とファイルの関係を追跡できます。これによりIntlayerは以下を可能にします：

- コンテンツが特定のファイルから来ていることを認識する。
- リンクされたファイルが編集されたときに辞書のコンテンツを自動的に更新する。
- ファイルと辞書の同期を確保し、コンテンツの整合性を維持します。

## 追加リソース

Intlayerでのファイル埋め込みの設定および使用方法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)
- [Markdown コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)
- ファイルと辞書の同期を確保し、コンテンツの整合性を保持します。

## 追加リソース

Intlayerでのファイル埋め込みの設定および使用方法の詳細については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [React Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Next Intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)
- [Markdown コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)
- [翻訳コンテンツ ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)

これらのリソースは、ファイル埋め込み、コンテンツ管理、およびIntlayerのさまざまなフレームワークとの統合に関するさらなる洞察を提供します。
