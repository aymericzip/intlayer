---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: intlayerMiddleware ドキュメント | next-intlayer
description: next-intlayer パッケージの intlayerMiddleware 関数の使用方法を参照してください
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: intlayerMiddleware を intlayerProxy に名称変更
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayerProxy (intlayerMiddleware) ドキュメント

`intlayerProxy`（`nextjs < 16` では `intlayerMiddleware`）関数は、ロケールに基づくルーティングとリダイレクトを処理する Next.js のミドルウェアです。ユーザーの優先ロケールを自動的に検出し、必要に応じて適切なローカライズされたパスへリダイレクトします。

## 使用方法

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## 説明

このミドルウェアは次の処理を行います：

1. **ロケール検出**: URLパス、Cookie、および `Accept-Language` ヘッダーを確認してユーザーのロケールを判定します。
2. **リダイレクト**: URLにロケールプレフィックスが含まれておらず、設定でプレフィックスが必要な場合（またはユーザーの設定に基づいて）、ローカライズされたURLへリダイレクトします。
3. **Cookie管理**: 検出したロケールを将来のリクエストのためにCookieに保存できます。

## パラメータ

この関数は、直接使用する場合は標準の Next.js の `NextRequest` を引数に取ります。上記のようにエクスポートして使用することもできます。

## 設定

ミドルウェアを設定するには、`intlayer.config.ts` ファイルで `routing` オプションを設定できます。詳細については、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。
