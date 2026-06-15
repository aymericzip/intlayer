---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: ファイル
description: file 関数を使用して外部ファイルをコンテンツ辞書に埋め込む方法を学びます。このドキュメントでは、Intlayerがファイルコンテンツを動的にリンクおよび管理する方法を説明します。
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

# ファイルコンテンツ / Intlayerでのファイル埋め込み

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

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

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

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

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
