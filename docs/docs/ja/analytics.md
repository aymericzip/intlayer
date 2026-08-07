---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Intlayer Analytics | コンテンツ露出の追跡とA/Bテストの実行
description: "@intlayer/analyticsがページ/ロケールビューとコンテンツ露出をどのように追跡するか、そしてそれを活用してIntlayerコンテンツでA/Bテストを実行する方法について説明します。"
keywords:
  - Analytics (アナリティクス)
  - A/B Testing (A/Bテスト)
  - Audience (オーディエンス)
  - Internationalization (国際化)
  - Documentation (ドキュメント)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics パッケージ、プロバイダ/ノードレベルのトラッキング、A/Bテスト、ダッシュボード"
author: aymericzip
---

# Intlayer Analytics ドキュメント

`@intlayer/analytics`はオプションのコンパニオンパッケージであり、**実際にどのコンテンツが訪問者に表示されたか**（どのページで、どのロケールで、翻訳されたコンテンツのどの特定の部分か）を把握できるようにします。これにより、オーディエンスを理解し、**コンテンツ上でA/Bテスト**を実行することができます。

## 目次

<TOC/>

---

## トラッキング対象

`@intlayer/analytics`は、3種類の匿名イベントをバッチ処理します：

| イベント           | どこでキャプチャされるか                                | 何がわかるか                                                                                                           |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | プロバイダレベル (`IntlayerProvider`)                   | 初回ロード、ルート変更、またはロケール切り替え時に、セッションがどのページとロケールを表示したか。                     |
| `content_exposure` | ノードレベル (`useIntlayer` / インタープリタプラグイン) | どの辞書キー（dictionary key）/ キーパスが実際に解決されて表示されたか。実験の一部である場合は、どの**バリアント**か。 |
| `conversion`       | `useConversion()`を呼び出す場所                         | 達成された目標（サインアップ、クリック、購入など）が、セッションに表示されたA/Bバリアントに紐付けられます。            |

イベントはメモリに収集され、**約20秒に1回のバッチリクエスト**として送信されます。キー入力やレンダリングごとに送信されることはないため、アナリティクスが初回レンダリング時間に影響を与えたり、インタラクションごとにリクエストを追加したりすることはありません。

## コンテンツA/Bテストをどのように強化するか

Intlayerでは、すでにコンテンツの[バリアント (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)を宣言できます（例：`control`と`black_friday`バリアントを持つ`hero-banner`辞書など）。`@intlayer/analytics`は、そのサイクルを完結させます：

1. `getVariant(experimentKey, variants)`は、各匿名セッションを決定論的にバリアントに割り当てます。これはセッションIDと実験キーの純粋関数であるため、割り当ては**セッション全体で安定**しており、初回レンダリング前の**サーバーラウンドトリップを必要としません**（ちらつきやレイアウトのずれが発生しません）。
2. すべての`content_exposure`イベントには、表示された`variant`が含まれます。
3. `useConversion()`を使用すると、そのバリアントに目標（例：`"cta_click"`）を紐付けることができます。
4. ダッシュボードの実験結果エンドポイントでは、統計的有意性（Z検定）を含むバリアントごとのコンバージョン率を比較します。

## インストール

`@intlayer/analytics`は**ピア（peer）、オプション**の依存関係です。フレームワークパッケージによって自動的にインストールされることはありません。`intlayer`と一緒に追加してください：

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

インストールしない場合、すべての統合ポイントはNo-Op（何もしない処理）として解決されます — 以下の[未インストール時のゼロコスト](#未インストール時のゼロコスト)を参照してください。

## 設定

Analyticsは**既存の`editor`設定ブロックを再利用**します。入力する個別の`analytics`設定スキーマはありません：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // アナリティクスデータ収集エンドポイントとしても使用されます
    clientId: "your-client-id", // アナリティクスプロジェクトキーとしても使用されます
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — アナリティクスイベントが送信されるベースURL（`POST {backendURL}/api/analytics/events`）。
- `editor.clientId` — 収集されたすべてのイベントに紐付けられる公開プロジェクトキー。これは**有効化スイッチ**としても機能します：`clientId`が設定されるまで、アナリティクスは完全に無効化されます（後述のようにツリーシェイキングで削除されます）。

Intlayerをセルフホスト（self-host）している場合、`editor.backendURL`を共有しているため、アナリティクスは自動的にご自身のインスタンスを指します。

## フレームワークのサポート

Analyticsは`react-intlayer`からの共有`IntlayerProvider`に組み込まれているため、そのプロバイダが使用されている場所であればどこでも今日から利用できます：

| フレームワーク                                           | ステータス                                                                                           |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ 利用可能                                                                                          |
| Next.js (`next-intlayer`)                                | ✅ 利用可能 (`react-intlayer` 経由)                                                                  |
| React Native / Expo (`react-native-intlayer`)            | ✅ 利用可能 (`react-intlayer` 経由)                                                                  |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 計画中 — 同一クライアント、`@intlayer/editor`の展開パターンに従うプロバイダレベルのバインディング |

## 使用方法

### 自動プロバイダレベルのトラッキング

コードの変更は必要ありません。`@intlayer/analytics`がインストールされ、`editor.clientId`が設定されると、`IntlayerProvider`は自動的に以下を実行します：

- マウント時にアナリティクスクライアントを初期化します。
- 初回ロード時に`page_view`を記録します。
- ロケールが変更されるたびに`page_view`を記録します。
- 約20秒間のフラッシュ（送信）ループを開始し、アンマウント時またはタブを閉じた時に残りのイベントを送信します（`navigator.sendBeacon`経由、`fetch(..., { keepalive: true })`にフォールバック）。

### 自動ノードレベルのトラッキング

`useIntlayer`が表示用のコンテンツを解決するたびに、インタープリタは正確な`dictionaryKey` + キーパス + ロケールに対して`content_exposure`イベントを報告します。これについてもコードの変更は必要ありません。送信ウィンドウ内で同じノードが繰り返し表示された場合は、`count`付きの単一のイベントとしてまとめられるため、50回再レンダリングされるリストが50のイベントを送信することはありません。

### A/Bテストのコンバージョントラッキング

`useConversion()`を使用して、セッションが表示されたバリアントに目標を紐付けます：

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      はじめる
    </button>
  );
};
```

### クライアント側でのバリアント解決

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## プライバシーとパフォーマンス

- **設計上の匿名性**: セッションは回転するIDによって識別されます。バックエンドはそのIDの**SHA-256ハッシュ**のみを保存し、生のIDやIPアドレスは決して保存しません。
- **大まかな位置情報**: CDNのジオロケーションヘッダー（`cf-ipcountry`、`x-vercel-ip-country`など）から派生した国コードのみであり、IPが読み取られたり保存されたりすることはありません。
- **デフォルトで検索パラメータを除外するURL**: そのため、クエリ文字列（query strings）がキャプチャされることはありません。
- **サンプリング**: `sampleRate`を使用すると、トラフィックの多いアプリでコンテンツ露出イベントの一部のみを保持できます。
- **バッチ処理**: 約20秒ごと（`flushInterval`）、またはバッファがいっぱいになった場合（`maxBufferSize`）はそれより早く、1回のリクエストを送信します。イベントごとにリクエストを送信することはありません。

### 未インストール時のゼロコスト

`@intlayer/analytics`は、`@intlayer/editor`とまったく同じオプション依存関係パターンに従っています：

- 各統合ポイントは、**`try/catch`でラップされた動的`import()`**を介してパッケージをロードします。`@intlayer/analytics`をインストールしないアプリでは、バンドルサイズやランタイムコストが発生することはなく、エラーが表示されることもありません。
- コンパイル時の環境変数（`INTLAYER_ANALYTICS_ENABLED`）は、`editor.clientId`が設定されていない場合に`@intlayer/config`によって自動的に`'false'`に設定されます。これにより、バンドラーが統合全体を**デッドコードとして削除（dead-code-eliminate）**できるようになります。
- Intlayerエディタ/CMSプレビューのiframe内ではアナリティクスが無効になっているため、エディタセッションが実際のトラフィックとしてカウントされることはありません。

## ダッシュボード：アナリティクスページ

プロジェクトがイベントを収集すると、[Intlayerダッシュボード](https://app.intlayer.org/analytics)の**Analytics**ページ（プロジェクトを選択するとサイドバーに表示されます）に以下が表示されます：

- **アクティブユーザー** — 選択したローリングウィンドウ（7日 / 30日 / 90日）内のユニーク訪問者数。
- **今日のユーザー** および **過去7日間のユーザー**。
- 選択したウィンドウ内の**ページビュー**。
- 日次ユニーク訪問者の**推移グラフ**。
- オーディエンスをロケールおよび国別にランク付けする**ロケール**および**ロケーション**の詳細タブ。

## バックエンドAPIリファレンス

すべての読み取りエンドポイントには認証が必要です。データの取り込み（ingestion）は公開されており、ボディの`clientId`によって属性付けされます。

| メソッド | エンドポイント                              | 説明                                                                     |
| -------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `POST`   | `/api/analytics/events`                     | イベントのバッチを取り込む（公開、ボディの`clientId`に紐付けられる）。   |
| `GET`    | `/api/analytics/overview`                   | 認証されたプロジェクトのページ/ロケールの合計。                          |
| `GET`    | `/api/analytics/audience?days=30`           | ユニーク訪問者、ページビュー、日次系列、ロケール + 国の詳細。            |
| `GET`    | `/api/analytics/content-stats`              | コンテンツごとの露出合計（辞書キー / キーパス / ロケールでグループ化）。 |
| `GET`    | `/api/analytics/experiments/:experimentKey` | A/B実験のバリアントごとのコンバージョン率と統計的有意性。                |

[CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用して、これらをプログラムで呼び出すこともできます：

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## 便利なリンク

- [ダイナミック辞書 - コレクションとバリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- [Intlayer ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)
