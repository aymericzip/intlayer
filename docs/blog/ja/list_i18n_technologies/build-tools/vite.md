---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: globインポート、チャンク分割、ビルド時メッセージ処理"
description: i18n において真に Vite 固有となる要素とは何か。import.meta.glob による遅延カタログ読み込み、ルート別分割が機能しにくい理由、HMR の落とし穴、ビルド時プラグインの仕組みを解説。
keywords:
  - vite i18n
  - import.meta.glob
  - vite コード分割
  - 翻訳の遅延読み込み
  - vite プラグイン i18n
  - rollup チャンク
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: フレームワークではなく Vite 固有の設計論

世の中に溢れる「Vite i18n」チュートリアルの大半は、たまたま Vite を使っているだけの React や Vue の解説です。本記事ではその下のレイヤー、つまりカタログがどのようにインポートされ、Rollup がそれをどうチャンク化し、なぜ自作した遅延読み込み（Lazy loading）が実際には遅延されていないのかに焦点を当てます。

## 目次

<TOC/>

## 静的インポートはデフォルトかつ同期的である

最も単純なセットアップは、モジュールの先頭ですべてのカタログを直接インポートすることです。

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

これにより、すべてのページのすべてのユーザー向けに、3言語分のカタログがエントリーチャンクに含まれてしまいます。2言語で合計100文字列程度なら問題ありませんが、10言語に達した時点でバンドルサイズにおける最大の無駄になります。

## `import.meta.glob` と設定ミスしやすいフラグ

Vite の glob インポート機能は、この問題の標準的な解決策です。

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

デフォルトで遅延読み込み（Lazy）になります。各エントリは動的インポートを返す関数となり、Rollup はファイルごとに個別のチャンクを出力します。ここで `{ eager: true }` を追加してしまうと、すべてのファイルが親モジュール内にインライン展開され、回避しようとしていた問題そのものを引き起こします。

```ts
// すべての言語がエントリーチャンクに入ってしまうため非推奨
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

注意すべきは、開発環境では Vite が各モジュールを個別配信するため、どちらの書き方でも軽快に動いてしまう点です。違いは `dist` フォルダにのみ現れます。`npx vite build && npx vite preview` でビルドし、エントリーチャンクに実際に何が含まれているかを確認してください。

## ルートごとの分割が期待通りに分割されない理由

多くの開発者が直面する落とし穴です。ページごとにカタログファイルを分割したとします。

```
locales/en/home.json
locales/en/checkout.json
```

しかし、2つのルートが両方とも `checkout.json` をインポートすると、Rollup はそれを共通チャンクに引き上げ、両方のページでダウンロードされるようにまとめます。Rollup のチャンク分割アルゴリズムはフォルダ名ではなくモジュールグラフに基づいて動作するため、複数のエントリポイントから参照されるモジュールは自動的に共有チャンクになります。3つ目のルートを追加しても変わらず、4つ目を追加すると予期せぬ別の分割が行われることもあります。

ルートごとのカタログ分割が成立するのは、インポートグラフが完全に独立している場合のみです。バンドルサイズが重要な場合は、推測ではなく可視化ツールで検証してください。

```bash
npx vite build && npx vite-bundle-visualizer
```

どうしても境界を強制したい場合は `build.rollupOptions.output.manualChunks` を使用して手動で制御できますが、保守コストがかかります。

## カタログは自動でホットリロード（HMR）されない

コンポーネントを編集すると Vite は瞬時に画面を書き換えます。しかし `locales/fr.json` を編集した場合、インポートの仕方によっては何も起こりません。動的インポートされた JSON にはネイティブな HMR 境界が存在しないため、モジュールグラフが依存関係を正しく無効化できないためです。

文言を編集するたびに開発サーバーを再起動しているエンジニアを見かけますが、これは回避可能です。解決策は i18n プラグイン側にあります。HMR の更新通知を受け取り、実行中のアプリに新しいメッセージを注入するハンドラーを備えている必要があります。ライブラリを選定する際は、その Vite プラグインが辞書ファイルの HMR を処理できるか確認してください。

## `define` はロケールをビルド時に焼き固めてしまう

ビルド時にデフォルトロケールを解決したくなる誘惑に駆られることがあります。

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` はビルド時に単純なテキスト置換を行います。ビルド時点で指定された値がそのままコードに埋め込まれるため、言語ごとに別々のビルドを実行することが前提となります。これは Angular の公式 i18n などで採用されている正当なアーキテクチャですが、1つのデプロイメントですべての言語を配信したい場合には適しません。

リクエストごとに変化する動的な値は `define` に含めず、実行時に解決してください。

## メッセージのパースをビルド時に移管する

このエコシステムで成熟したツールは、例外なく「ブラウザ内でメッセージをパースしない」というアプローチに移行しています。

| プラグイン                   | ビルド時に前処理される内容                                              |
| :--------------------------- | :---------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | vue-i18n メッセージを描画関数にコンパイル（ランタイム専用バンドル配信） |
| Lingui (マクロ + プラグイン) | カタログを抽出・コンパイルし、マクロをメッセージIDに置換                |
| Paraglide (inlang)           | 各メッセージを Tree-shaking 可能な独立した関数にコンパイル              |
| `vite-intlayer`              | コンポーネント単位の辞書を構築し、未使用フィールドのパージと短縮化      |

得られる利点は2つあります。クライアント側のランタイムから重いメッセージコンパイラを排除できる点と、未使用の翻訳キーを静的に削除できる点です。一方のコストとして、開発サーバーと CI の両方にプラグインの導入が必要になり、Vite を介さない素の `tsc` やテストランナーを実行する際に追加の設定が必要になります。

vue-i18n は前者の好例です。`@intlify/unplugin-vue-i18n` がないと、ブラウザ側で `new Function` を呼び出すコンパイラを配信することになり、バンドル増だけでなく CSP（コンテンツセキュリティポリシー）の制限にも抵触します。

## SSR: モジュール変数でロケールを保持しない

SSR（フレームワークまたは `vite-plugin-ssr` 経由）を導入する場合の鉄則は、「現在のロケールを保持するモジュールレベルの変数は、そのサーバープロセス上の全リクエスト間で共有されてしまう」ということです。

```ts
// ブラウザ内なら安全。サーバー上ではリクエスト間での重大なデータ漏洩につながる
export let currentLocale = "en";
```

2人のユーザーが同時にアクセスするとレースコンディションが発生し、一方が他方の言語でレンダリングされてしまいます。ローカル開発時は同時に1リクエストしか発生しないため発覚しません。ロケールは必ずリクエストごとに解決し、コンテキストやフレームワークのリクエストローカルストレージを介して明示的に渡してください。

## Intlayer の Vite プラグイン

Intlayer は辞書のビルド、開発時のファイル監視、最適化パイプラインを統合した単一のプラグインを提供します。

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

インポートの自動書き換え、未使用文言のパージ、キーの最小化（minify）が最初から有効になっています。主要なオプションは `intlayer.config.ts` で管理します。

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // どのコンポーネントからも読まれていない文言フィールドを削除
    minify: true, // コンテンツキーを短いエイリアスに短縮
  },
};

export default config;
```

翻訳コンテンツが巨大な単一言語ファイルではなく各コンポーネント単位で宣言されているため、パージ処理は正確なモジュールグラフを参照して安全にコードを刈り取ることができます。トレードオフは前述の通り、コードをコンパイルするあらゆる環境（CI やテスト実行環境を含む）でプラグインが必要になる点です。詳細は [バンドル最適化ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) を確認してください。

## よくある失敗

- **遅延読み込みを意図した glob に `{ eager: true }` を付ける。** ローカルでは動きますが、本番で全言語が一括配信されます。
- **フォルダ構造がそのままチャンクになると誤認する。** Rollup はディレクトリではなくインポート関係を追跡します。ビルド結果を検証してください。
- **文言の修正を確認するために毎回開発サーバーを再起動する。** プラグイン側の HMR ハンドラーの欠落が原因です。
- **`define` に言語情報を設定する。** 言語ごとに独立したビルドを行う構成を自ら強いることになります。
- **SSR 環境でモジュールスコープにロケールを保持する。** 同時リクエスト時に言語が入れ替わる事故につながります。
- **開発サーバー上でパフォーマンスを計測する。** バンドルされていないモジュールの挙動は本番バンドルの参考になりません。

## さらに学ぶ

- [バンドル最適化: パージ、縮小化、そしてブラウザに届く成果物の内訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)
- [主要フレームワーク間のベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [Vite + React 環境への Intlayer の導入手順](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- [i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)
- [React i18n: Provider パターンの仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: 仕組みと運用上の注意点](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/vue.md)
- [コンポーネント指向 vs 集中管理型i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
