---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: 選択ベースのコンテンツ
description: Intlayerで選択ベースのコンテンツを使用して、任意の文字列値に基づいて動的にコンテンツを表示する方法を学びます。このドキュメントに従って、プロジェクト内でスイッチのようなコンテンツを効率的に実装しましょう。
keywords:
  - 選択ベースのコンテンツ
  - Select Content
  - スイッチコンテンツ
  - ICU select
  - 動的レンダリング
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "選択ベースのコンテンツを導入"
author: aymericzip
---

# 選択ベースのコンテンツ (Select) / Intlayer

## Select の仕組み

Intlayerでは、選択ベースのコンテンツは `select` 関数によって実現され、任意の文字列値を対応するコンテンツにマッピングします。これはICUメッセージの `{value, select, …}` や、アプリケーションコードにおける `switch` 文に相当します。

ステータス、プラン、プラットフォーム、ロールなど、判別子が自由形式の文字列である場合に `select` を使用します。他の判別子については、Intlayerは専用のノードを提供しています：

| 判別子            | ノード     |
| ----------------- | ---------- |
| 数量              | `enu()`    |
| ブール値 (真偽値) | `cond()`   |
| 性別              | `gender()` |
| その他の文字列    | `select()` |

## 選択ベースのコンテンツの設定

Intlayerプロジェクトで選択ベースのコンテンツを設定するには、選択の定義を含むコンテンツモジュールを作成します。以下は様々なフォーマットでの例です。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // オプション
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // オプション
      },
    },
  },
}
```

> `fallback` が宣言されていない場合、提供された値がどの宣言されたケースとも一致しないときは、最後に宣言されたキーがフォールバックとして採用されます。これは `cond()` や `gender()` と同じ契約です。

### 型の安全性

受け入れられる引数は、宣言されたケースから推論されます：

- `fallback` なしの場合、宣言されたケースのみが受け入れられます：タイポは型エラーになります。
- `fallback` がある場合、任意の文字列が受け入れられます（フォールバックが一致しない値をカバーします）。一方で、宣言されたケースは引き続きオートコンプリートを提供します。

## なぜプレーンなオブジェクトではないのか？

プレーンなオブジェクトを宣言し、それを実行時の値でインデックスアクセスしたくなるかもしれません：

```tsx
// ❌ これを行わないでください
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Intlayerコンパイラは、使用されていないコンテンツを削除し、残りのキーを縮小するためにソースコードを分析します。動的な計算プロパティアクセス (`obj[expr]`) は静的に解決できないため、そのブランチ全体が不透明 (opaque) としてマークされ、バンドルに残り、キーも縮小されません。

`select()` を使用すると、ケースの解決はプロパティアクセスとしてではなく、関数呼び出しの内部で行われます。コンパイラはそれを単一の静的フィールドアクセスとして認識し、`enu()`、`cond()`、または `gender()` と全く同じようにノードを最適化します：

```tsx
// ✅ これを行ってください
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## 選択ベースのコンテンツの使用

<Tabs group="framework">
  <Tab label="React" value="react">

Reactコンポーネント内で選択ベースのコンテンツを利用するには、`react-intlayer` パッケージから `useIntlayer` フックをインポートして使用します。このフックは指定されたキーのコンテンツを取得し、値を渡すことで適切な出力を選択できるようにします。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 出力: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* 出力: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* 出力: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Next.jsのクライアントコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Vueコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelteコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。ストアは `$` を使用してアクセスします。以下は例です：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preactコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJSコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angularコンポーネント内で選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` を使用して選択ベースのコンテンツを利用するには、`useIntlayer` フックを通じて取得します。以下は例です：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// 初期レンダリング
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Select を他のノードと組み合わせる

各ケースには完全なコンテンツノードが含まれるため、`select` は `t()`、`insert()`、`md()` などと組み合わせて構成できます：

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          ja: "{{name}} が下書きを保存しました",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          ja: "{{name}} が投稿を公開しました",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          ja: "{{name}} が投稿を更新しました",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // 出力: Alice が下書きを保存しました
```

## ICU `select` からの移行

ICU の `select` 引数を使用するメッセージは、`select` ノードとしてインポートされます：

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

は以下のようになります：

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

ICU の `other` ケースは、Intlayer において全てを捕捉する（catch-all）ケースの正規名である `fallback` に名前変更されます。第2引数には ICU 変数名が記録され、エクスポート時にメッセージが完全に同じ ICU 文字列に戻るようになっています。

> ちなみに、ケースが性別の値（`male` / `female` / `other`）である ICU `select` は、代わりに [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md) ノードとしてインポートされます。

## 追加リソース

設定と使用に関するより詳細な情報については、以下のリソースを参照してください：

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [Intlayer React ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)
- [Intlayer Next.js ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)

これらのリソースは、様々な環境やフレームワークでの Intlayer の設定と使用についてさらに詳しく説明しています。
