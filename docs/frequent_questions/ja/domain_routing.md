---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ドメインベースのルーティングを設定する方法
description: ドメインベースのルーティングの設定方法を学びます。
keywords:
  - ドメイン
  - ルーティング
  - intlayer
  - 設定
  - ミドルウェア
  - react-router
  - vue-router
  - next.js
  - vite
  - フレームワーク
slugs:
  - doc
  - faq
  - domain-routing
---

# Intlayerで`/[locale]/`パスの代わりに**ドメインベースのルーティング**をどのように設定しますか？

## 簡単な回答

ドメインベースのルーティングはパスベースのルーティング（`example.com/[locale]/`）よりも簡単です。なぜなら、すべてのミドルウェアやルーティング設定を省略できるからです。各言語のドメインにアプリをデプロイし、ドメインごとに1つの環境変数を設定するだけです。

## ステップバイステップ

1. **ドメインごとに1回デプロイする**（`example.com`、`exemple.fr`、`ejemplo.es`、…）。
2. 各デプロイメントごとに、`LOCALE`（および通常のIntlayer環境変数）を、そのドメインが提供すべきロケールに設定します。
3. その変数を`intlayer.config.[ts|js]`の`defaultLocale`として参照します。

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 ドメインがロケールを決定します
  },
  // ... 他の設定
};

export default config;
```

以上です。**Next.js**、**Vite + React**、**Vite + Vue**などでも同様に動作します。

## すべてのドメインが**同じ**デプロイメントにアクセスする場合はどうすればよいですか？

すべてのドメインが同じアプリケーションバンドルを指している場合、実行時にホストを検出し、プロバイダーを通じてロケールを手動で渡す必要があります。

### Next.jsの場合

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // ホスト名からロケールを取得
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Vueの場合

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // ホスト名からロケールを取得する独自のロジックに置き換えてください
app.mount("#app");
```

`getLocaleFromHostname()` を独自のルックアップロジックに置き換えてください。

## ロケールスイッチャーの更新

ドメインベースのルーティングを使用している場合、言語を変更することは別のドメインに移動することを意味します：

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 対応するドメインにリダイレクト
}
```

## ドメインベースのルーティングの利点

1. **設定が簡単**: `intlayerMiddleware`、`generateStaticParams`、`react-router`、`vue-router` の設定が不要
2. **より良いSEO**: 各言語が独自のドメインを持つ
3. **よりクリーンなURL**: パスにロケールのプレフィックスがない
4. **メンテナンスが容易**: 各言語のデプロイが独立している
