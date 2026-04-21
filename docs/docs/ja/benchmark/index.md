---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: i18nライブラリのベンチマーク
description: パフォーマンスとバンドルサイズの観点から、Intlayerが他のi18nライブラリとどのように比較されるかをご覧ください。
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "ベンチマーク初期化"
---

# Benchmark Bloom — レポート

Benchmark Bloomは、複数のReactフレームワークとロード戦略にわたって、i18n（国際化）ライブラリが実環境に与える影響を測定するパフォーマンスベンチマークスイートです。

各フレームワークの詳細なレポートと技術ドキュメントは以下からご覧いただけます。

- [**Next.js ベンチマークレポート**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)
- [**TanStack Start ベンチマークレポート**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)

---

## 現在の結果

ライブ比較と要約データについては、[**インタラクティブベンチマークダッシュボード**](https://intlayer.org/benchmark)をご覧ください。
| `scoped-dynamic` | 高い（リークほぼゼロ） | 高い |

`static`から`scoped-dynamic`に移行すると、通常、未使用のコンテンツが60〜90%削減されますが、大幅な設定作業が必要になります。Intlayerのようなライブラリは、このscoped-dynamicパターンを自動化するため、開発者はボイラープレートなしで効率性を得ることができます。

### リーク値の読み方

ページのリークが**35%**であるということは、そのページでダウンロードされたJavaScriptの35%に、他のページの文字列（このページではユーザーが見ることができないコンテンツ）が含まれていることを意味します。400 KBのページでは、これは約140 KBの回避可能なデータに相当します。

ロケールのリークが**10%**であるということは、バンドルの10%に、現在のユーザーが使用していない言語の翻訳が含まれていることを意味します。

### 反応性 vs レンダリング時間

- **E2E反応性**: ネットワーク、フレームワークのオーバーヘッド、DOM更新を含むユーザー体験全体を測定します。
- **React Profiler時間**: Reactツリーの再レンダリングコストを分離して測定します。

ライブラリによっては、Profiler時間は短くても、ロケールの切り替えにネットワークリクエスト（新しいロケールファイルの取得）が含まれる場合、E2E時間が長くなることがあります。逆に、アップデートを効率的にバッチ処理していれば、Profiler時間は長くても動作が速く感じられるライブラリもあります。
