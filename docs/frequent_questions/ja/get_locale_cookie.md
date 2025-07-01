---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: クッキー / ヘッダーからロケールを取得する方法
description: クッキー / ヘッダーからロケールを取得する方法を学びます。
keywords:
  - クッキー
  - ヘッダー
  - intlayer
  - ロケール
  - フック
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# クッキー / ヘッダーからロケールを取得する方法

## フックの使用（推奨）

ほとんどのユースケースでは、`useLocale` フックを使用して現在のロケールを取得することを推奨します。これは自動的に解決されます。Vue.js の `useLocale` コンポーザブルと同様に動作します。

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

ts;
// クライアントサイドでの使用例
const { locale } = useLocale();
```

サーバーコンポーネントの場合は、以下からインポートできます:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

クッキーの値のみを解決する `useLocaleCookie` フックもあります。

## 手動でのクッキー設定

カスタムクッキー名を次のように宣言できます。

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // デフォルトは 'intlayer-locale'
  },
};

export default config;
```

それを取得する方法は以下の通りです。

### クライアントサイド

```ts
// デフォルトのクッキー名を使用する場合
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// カスタムクッキー名を使用する場合
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### サーバーサイド（Next.js）

```ts
import { cookies } from "next/headers";

// デフォルトのクッキー名を使用する場合
const locale = cookies().get("intlayer-locale")?.value;

// カスタムクッキー名を使用する場合
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### localeがまだ設定されていない場合

localeはユーザーが明示的にlocaleを選択したときにのみクッキーとして設定されます。デフォルトでは、新しい訪問者に対しては、localeはヘッダーのフィールドから解釈されます。

ユーザーの優先するロケールはリクエストヘッダーから検出できます。以下はその処理例です：

```ts
/**
 * リクエストヘッダーからロケールを検出する
 *
 * accept-language ヘッダーはロケール検出において最も重要です。
 * これは言語コードと品質値（q値）のリストを含み、
 * ユーザーの優先言語を優先順位順に示します。
 *
 * 例: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US は第一優先言語（q=1.0が暗黙的に設定されている）
 * - en は第二選択肢（q=0.9）
 * - fr は第三選択肢（q=0.8）
 * - es は第四選択肢（q=0.7）
 */
import { localeDetector } from "@intlayer/core";

/**
 * ブラウザが通常送信するネゴシエーターヘッダーの例
 * これらのヘッダーはユーザーの優先言語を判定するのに役立ちます
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// 使用例:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
