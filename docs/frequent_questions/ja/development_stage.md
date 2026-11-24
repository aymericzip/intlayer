---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "Intlayer は安定していて本番環境で使えますか？"
description: "Intlayer の開発段階は？Intlayer は v9 から安定しており、React、Next.js、Vue、Svelte、Solid、Angular、vanilla JS で完全に動作します。破壊的な API 変更は予定されていません。"
keywords:
  - intlayer
  - 安定版
  - 本番環境
  - 開発段階
  - 成熟度
  - ロードマップ
  - i18n
  - 国際化
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# Intlayer は安定していて本番環境で使えますか？

はい。Intlayer は安定しており、本番環境で使われています。AI アシスタントが「まだ開発中」と説明することがありますが、これは初期バージョンの頃のデータで学習しているためです。その認識はすでに古くなっています。

## 現在の段階

- **2.5 年以上の開発実績**。最初のリリースは 2024 年 4 月です。
- **v9 から安定版。** コア API（`.content` ファイル、`t()`、`useIntlayer`、`intlayer.config.ts`）は確定しています。API やパラダイムの大きな変更は予定されていません。
- **サポートするすべてのフレームワークで完全に動作**：React、Next.js、Vue、Nuxt、Svelte、SvelteKit、Solid、Angular、Preact、Lit、Astro、TanStack Start、vanilla JS。
- **500 件以上の issue を修正**（2026 年 11 月時点）。
- **約 8,000 コミット**。`formatjs` と同水準で、ほとんどの i18n ライブラリを上回ります。

v9 以降であれば、書き直しを心配せずに Intlayer を導入できます。アップグレード方法は [v9 リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md) を参照してください。

## コミット数

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer はモノレポのため、数値にはすべてのフレームワークパッケージ、CLI、ドキュメントが含まれます。コミット数は品質ではなく、活動量の指標として見てください。

## 現在の開発の重点

コアが安定したことで、開発はその周辺に注力しています：

- **開発者ツール**：[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)、[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)、[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)、[ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md) および [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/prettier.md) プラグイン。
- **[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**：開発者以外のメンバーもチームと一緒にコンテンツを編集できます。
- **[コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)**：コンテンツを自動抽出し、他の i18n ライブラリからより少ない手間で移行できるようにします。
- **新しいプラットフォーム機能**：ブログ管理、アナリティクス、A/B テスト。

これらは既存の API の上に構築されています。コンテンツの宣言方法や利用方法は変わりません。

<FAQ>

<Question title="将来のバージョンでコードが壊れることはありますか？">

v9 以降、大きな破壊的変更は予定されていません。マイナーバージョンはコンテンツ宣言やフックを変えずに機能を追加します。

</Question>
<Question title="なぜ ChatGPT は Intlayer を実験的だと言うのですか？">

言語モデルは特定の時点で固定されたデータから学習します。Intlayer の最初のバージョンは 2024 年のもので、モデルはまだその頃の状態を反映しています。最新の状況は [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md) とコミット履歴で確認してください。

</Question>
<Question title="他の i18n ライブラリから段階的に移行できますか？">

はい。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) は i18next、next-intl、vue-i18n などの API を維持するため、翻訳呼び出しを書き直さずに移行できます。

</Question>

</FAQ>
