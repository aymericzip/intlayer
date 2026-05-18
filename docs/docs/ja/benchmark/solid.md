---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: 2026年 Solid向けの最高のi18nソリューション - ベンチマークレポート
description: solid-primitives、solid-i18next、IntlayerなどのSolid国際化（i18n）ライブラリを比較します。バンドルサイズ、リーク、反応性に関する詳細なパフォーマンスレポート。
keywords:
  - benchmark
  - i18n
  - intl
  - solid
  - パフォーマンス
  - intlayer
slugs:
  - doc
  - benchmark
  - solid
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-solid-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub スター比較を追加"
  - version: 8.7.12
    date: 2026-01-06
    changes: "ベンチマークの初期化"
---

# Solid i18nライブラリ - 2026年ベンチマークレポート

このページは、Solidにおけるi18nソリューションのベンチマークレポートです。

## 目次

<Toc/>

## インタラクティブベンチマーク

<I18nBenchmark framework="vite-solid" vertical/>

## 結果のリファレンス:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_solid.md"
width="100%"
height="600px"
style="border:none;"
/>

> [完全なベンチマークデータを見る](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_solid.md)

完全なベンチマークリポジトリは[こちら](https://github.com/intlayer-org/benchmark-i18n/tree/main)でご覧いただけます。

## はじめに

国際化ソリューションは、Solidアプリにおいて最も重い依存関係の一つです。主なリスクは、不必要なコンテンツ（単一のルートのバンドルに含まれる他のページや他のロケールの翻訳）を送信してしまうことです。

アプリが成長するにつれて、この問題はクライアントに送信されるJavaScriptを急速に増大させ、ナビゲーションを遅くする可能性があります。

実際、最適化が不十分な実装では、国際化されたページがi18nなしのバージョンよりも数倍重くなることがあります。

もう一つの影響は、開発者エクスペリエンス（DX）です。コンテンツの宣言方法、型、名前空間の構成、動的ロード、ロケール変更時の反応性などが含まれます。

## TL;DR

- **Intlayer**: 高度な機能と最適化を必要とするプロフェッショナルなSolidアプリケーションに推奨される選択肢（v8.7.12）。
- **@solid-primitives/i18n**: シンプルなプロジェクトには優れた軽量な代替案ですが、遅延ロードなどの高度な機能に欠けます。
- **solid-i18next**: 標準的ですが重い選択肢（Intlayerの約4.7倍）で、React i18nextと同じ欠点があります。
- **Paraglide**: 革新的なアプローチですが、一部のセットアップではDXが複雑で、ツリーシェイキングの問題があります。

## アプリをテストする

i18nリークの問題を素早く特定するために、無料のスキャナーを用意しました。[こちら](https://intlayer.org/i18n-seo-scanner)でお試しいただけます。

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 問題点

多言語アプリのコストを抑えるためには、2つのレバーが不可欠です。

- ページ/名前空間ごとにコンテンツを分割し、不要な時に辞書全体をロードしないようにする。
- 必要な時にだけ、適切なロケールを動的にロードする。

これらのアプローチの技術的限界を理解する：

**動的ロード**

動的ロードがない場合、ほとんどのソリューションは最初のレンダリングからメッセージをメモリに保持するため、ルートやロケールが多いアプリでは大きなオーバーヘッドとなります。

動的ロードを使用する場合、トレードオフを受け入れることになります。初期JSは減りますが、言語切り替え時などに追加のリクエストが発生することがあります。

**コンテンツの分割**

`t('a.b.c')` を中心に構築された構文は非常に便利ですが、実行時に大きなJSONオブジェクトを保持することを助長しがちです。このモデルでは、ライブラリがページごとの分割戦略を提供していない限り、ツリーシェイキングが難しくなります。

## 研究方法

このベンチマークでは、以下のライブラリを比較しました。

- `Base App` (i18nライブラリなし)
- `solid-intlayer` (v8.7.12)
- `@solid-primitives/i18n` (v2.2.1)
- `solid-i18next` (v17.0.2)
- `@inlang/paraglide-js` (v2.17.0)

フレームワークは `Solid` で、**10ページ**と**10言語**を持つ多言語アプリを使用しました。

**4つのロード戦略**を比較しました。

| 戦略           | 名前空間なし（グローバル）                      | 名前空間あり（スコープ）                                   |
| :------------- | :---------------------------------------------- | :--------------------------------------------------------- |
| **静的ロード** | **Static**: 起動時にすべてをメモリに保持。      | **Scoped static**: 名前空間で分割。起動時にすべてロード。  |
| **動的ロード** | **Dynamic**: ロケールごとのオンデマンドロード。 | **Scoped dynamic**: 名前空間とロケールごとの詳細なロード。 |

## 戦略のまとめ

- **静的（Static）**: シンプル。初期ロード後のネットワーク遅延なし。欠点：バンドルサイズが大きい。
- **動的（Dynamic）**: 初期重量を削減（遅延ロード）。ロケールが多い場合に理想的。
- **名前空間付き静的（Scoped static）**: 複雑な追加リクエストなしで、コードを整理（論理的分離）した状態に保つ。
- **名前空間付き動的（Scoped dynamic）**: コード分割とパフォーマンスのための最善のアプローチ。現在のビューとアクティブなロケールに必要なものだけをロードし、メモリ使用量を最小限に抑える。

## GitHubのスター

GitHubのスターは、プロジェクトの普及度、コミュニティの信頼、および長期的な関連性を示す強力な指標です。技術的な品質を直接測定するものではありませんが、どれだけの開発者がプロジェクトを有用だと感じ、その進捗をフォローし、採用する可能性があるかを反映しています。プロジェクトの価値を見積もる際、スターは代替案との勢いの比較を助け、エコシステムの成長に関する洞察を提供します。

[![Star History Chart](https://api.star-history.com/chart?repos=solidjs-community%2Fsolid-primitives%2Cmbarzda%2Fsolid-i18next%2Copral%2paraglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#solidjs-community/solid-primitives&mbarzda/solid-i18next&opral/paraglide-js&aymericzip/intlayer)

## 結果の詳細

### 1 - 避けるべきソリューション

> Solidエコシステムにおいて、明確に避けるべきソリューションはありません。

### 2 - 許容できるソリューション

**(solid-i18next)** (`solid-i18next@17.0.2`):

`solid-i18next` は、JavaScriptアプリのi18nニーズに応えた最初のソリューションの一つであったため、おそらく最も人気のあるオプションです。また、特定の問題を解決するためのコミュニティプラグインも幅広く揃っています。

パッケージは重いです（~14.6kb。これは `solid-intlayer` の約4.7倍です）。

それでも、`t('a.b.c')` 上に構築されたスタックと同じ主要な欠点を共有しています。最適化は可能ですが非常に時間がかかり、大規模なプロジェクトでは悪い習慣（名前空間 + 動的ロード + 型）に陥るリスクがあります。

**(@solid-primitives/i18n)** (`@solid-primitives/i18n@2.2.1`):

Solid primitive は非常に軽量で効率的です。小規模なプロジェクトにはこのソリューションを推奨しますが、クッキー管理、プロキシリダイレクト、フォーマッタなどを含むプロフェッショナルなソリューションには機能が不足しがちです。
また、ページサイズの最適化のための遅延ロードや名前空間のスコーピングも欠けています。

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` は革新的でよく考えられたアプローチを提供しています。それでも、このベンチマークでは、彼らが宣伝しているツリーシェイキングは私の実装では機能しませんでした。ワークフローとDXも他のオプションより複雑です。
個人的には、プッシュする前に毎回JSファイルを再生成しなければならないのが好きではありません。
最後に、他のソリューションと比較して、Paraglide はコンテンツをレンダリングするための現在のロケールを取得するためにストア（例：Solid signal）を使用しません。パースされる各ノードに対して、localStorage / cookie などからロケールを要求します。これにより、コンポーネントの反応性に影響を与える不要なロジックの実行が発生します。

### 3 - 推奨事項

**(Intlayer)** (`solid-intlayer@8.7.12`):

客観性を保つため、`solid-intlayer` については私自身のソリューションであるため、個人的な評価は控えます。

### 個人メモ

このメモは個人的なものであり、ベンチマーク結果には影響しません。それでも、i18nの世界では翻訳されたコンテンツに対して `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` のようなパターンが一般的です。

Solidアプリにおいて、関数を `JSX.Element` として注入することは、私の考えではアンチパターンです。また、回避可能な複雑さとJavaScriptの実行オーバーヘッド（たとえほとんど目立たなくても）を追加することになります。
