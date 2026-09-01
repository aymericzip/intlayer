---
createdAt: 2026-07-08
updatedAt: 2026-08-22
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
  - version: 9.3.3
    date: 2026-08-22
    changes: "`@intlayer/analytics` がインストールされている場合、アナリティクスをデフォルトで有効化"
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

`@intlayer/analytics` は各フレームワークパッケージ（`react-intlayer`、`next-intlayer`、`vue-intlayer` など）の**オプショナル依存関係**であるため、ほとんどのプロジェクトにはすでに含まれています。オプショナル依存関係をスキップする構成（`npm install --no-optional` など）の場合は、明示的にインストールしてください:

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

アナリティクスを有効にするにはパッケージをインストールするだけで十分です。`analytics.enabled` のデフォルトは `true` で、パッケージがプロジェクト内に見つからない場合は `@intlayer/config` が `false` に解決します。インストールしない場合、すべての統合ポイントはNo-Op（何もしない処理）として解決されます — 以下の[未インストール時のゼロコスト](#未インストール時のゼロコスト)を参照してください。

## 設定

アナリティクスは設定なしで動作します。**デフォルトで有効**であり、送信先とプロジェクトキーには**既存の `editor` 設定ブロックをそのまま再利用**します。

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

### ブラウザからAPIを呼び出す

同じトークンが認証不要の小さなクライアントを支えているため、静的サイトやSPAはサーバーなし、サーバーアクションなし、バンドル内のシークレットなしで、実行時にCMSコンテンツを読み取ることができます:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

これは `editor.clientId` から自身を認証します。トークンの交換、キャッシュ、更新はすべて内部で処理されます。スコープはアクセスできる範囲を制限します：公開された辞書コンテンツとアナリティクスの取り込みのみです。それ以外の操作（辞書のプッシュ、プロジェクトの読み取り、AIクレジットの消費）には本物の認証情報、つまりサーバーまたはサインイン済みユーザーが必要です。

### オプトアウトする

任意の `analytics` ブロックで収集を調整、または停止できます:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // デフォルト: true — 統合全体をバンドルから除外します
    flushInterval: 20_000, // 2 回のバッチ送信の間隔（ミリ秒）
    sampleRate: 1, // 記録するセッションの割合。0（なし）から 1（すべて）
  },
};

export default config;
```

`@intlayer/analytics` をアンインストールすることは `enabled: false` と同じ効果があります。全フィールドの一覧は[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## 使用方法

### 自動プロバイダレベルのトラッキング

コードの変更は必要ありません。`@intlayer/analytics`がインストールされ、`editor.clientId`が設定されると、`IntlayerProvider`は自動的に以下を実行します：

- マウント時にアナリティクスクライアントを初期化します。
- 初回ロード時に`page_view`を記録します。
- ロケールが変更されるたびに`page_view`を記録します。
- 約20秒間のフラッシュ（送信）ループを開始し、アンマウント時またはタブを閉じた時に残りのイベントを送信します（`navigator.sendBeacon`経由、`fetch(..., { keepalive: true })`にフォールバック）。

エントリーポイントはフレームワークごとに異なりますが、いずれの場合もIntlayerのセットアップにすでに使用しているものと同じであるため、追加で行うことは何もありません:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider`は内部でアナリティクスプロバイダをマウントします。

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer`はReactの`IntlayerProvider`を再エクスポートしているため、アナリティクスも同じ方法で組み込まれます。

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `intlayer`プラグインは、ルートコンポーネントのライフサイクルにアナリティクスのフックを登録します。

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Nuxtの場合、`nuxt-intlayer`がプラグインを代わりにインストールするため、特に何もする必要はありません。

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()`は、Intlayerをセットアップするコンポーネントからアナリティクスを開始します。

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider`は内部でアナリティクスプロバイダをマウントします。

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider`はアナリティクスプロバイダを遅延（lazy）マウントするため、そのチャンクはクリティカルパスの外にとどまります。

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()`にはすでに`provideIntlayerAnalytics()`が含まれています。

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > プロバイダを個別に管理する場合のみ、`provideIntlayerAnalytics()`を単独で使用してください。

  </Tab>
</Tabs>

### 自動ノードレベルのトラッキング

`useIntlayer`が表示用のコンテンツを解決するたびに、インタープリタは正確な`dictionaryKey` + キーパス + ロケールに対して`content_exposure`イベントを報告します。これについてもコードの変更は必要ありません。送信ウィンドウ内で同じノードが繰り返し表示された場合は、`count`付きの単一のイベントとしてまとめられるため、50回再レンダリングされるリストが50のイベントを送信することはありません。

### A/Bテストのコンバージョントラッキング

`useConversion()`を使用して、セッションが表示されたバリアントに目標を紐付けます：

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

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

    > `useConversion`はクライアントフックです。コンポーネントに`"use client"`を指定してください。

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        はじめる
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      はじめる
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">はじめる</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### クライアント側でのバリアント解決

`useExperiment()`はセッションをバリアントに割り当て、コンバージョン率の分母となる露出（exposure）を記録します。割り当てが確定する前に訪問者がコントロールのちらつきを見ないよう、バリアントに依存するサブツリーは`isAssigned`でゲートしてください：

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant`は単純な文字列です。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant`は単純な文字列です。割り当てはブラウザ内で行われるため、コンポーネントはクライアントコンポーネントである必要があります。

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant`と`isAssigned`は`Ref`です。

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant`と`isAssigned`はストアです。`$`プレフィックスを付けて読み取ってください。

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant`は単純な文字列です。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant`と`isAssigned`は`Accessor`です。値を読み取るには呼び出してください。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant`と`isAssigned`は`Signal`です。値を読み取るには呼び出してください。

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Weights はオプションです — スプリットを調整するために、バリアントごとに 1 つ渡します。例えば、`useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])` のようにします。

子は、一致する辞書の[Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)を読みます：

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> **子コンポーネント**でバリアントを読み込むことが、React の外でも機能する理由です。Vue、Svelte、Solid、Angular では、`useIntlayer` に渡されるセレクタはコンポーネントがセットアップされるときにキャプチャされるため、読み込みはバリアントが既知の後にのみマウントされるコンポーネント内で発生する必要があります。

実験が単一の辞書ではなくページ全体をカバーする場合は、variant をプロバイダーにホイストしてください — [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md#ambient-variant) を参照してください。以下のすべての `useIntlayer` は、呼び出しサイトの変更なしでそれに対して解決されます。

コンポーネント外で生の割り当てが必要な場合は、クライアントに直接アクセスしてください：

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` は割り当てるだけで、exposure を記録しません。`useExperiment()` を使用することをお勧めします。そうしないと、コンバージョン率の分母がありません。

## プライバシーとパフォーマンス

- **設計上の匿名性**: セッションは回転するIDによって識別されます。バックエンドはそのIDの**SHA-256ハッシュ**のみを保存し、生のIDやIPアドレスは決して保存しません。
- **大まかな位置情報**: CDNのジオロケーションヘッダー（`cf-ipcountry`、`x-vercel-ip-country`など）から派生した国コードのみであり、IPが読み取られたり保存されたりすることはありません。
- **デフォルトで検索パラメータを除外するURL**: そのため、クエリ文字列（query strings）がキャプチャされることはありません。
- **サンプリング**: `sampleRate`を使用すると、トラフィックの多いアプリでコンテンツ露出イベントの一部のみを保持できます。
- **バッチ処理**: 約20秒ごと（`flushInterval`）、またはバッファがいっぱいになった場合（`maxBufferSize`）はそれより早く、1回のリクエストを送信します。イベントごとにリクエストを送信することはありません。

### 未インストール時のゼロコスト

`@intlayer/analytics`は、`@intlayer/editor`とまったく同じオプション依存関係パターンに従っています：

- 各統合ポイントは、**`try/catch`でラップされた動的`import()`**を介してパッケージをロードします。`@intlayer/analytics`をインストールしないアプリでは、バンドルサイズやランタイムコストが発生することはなく、エラーが表示されることもありません。
- コンパイル時の環境変数（`INTLAYER_ANALYTICS_ENABLED`）は、パッケージがインストールされていない場合、`analytics.enabled` が `false` の場合、または `editor.clientId` が設定されていない場合に、`@intlayer/config` によって自動的に `'false'` に設定されます。これにより、バンドラーが統合全体を**デッドコードとして削除（dead-code-eliminate）**できるようになります。
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

> **サーバーサイドのみ。** `createIntlayerCMS()` は `clientId` + `clientSecret` で認証され、シークレットはブラウザで利用できません。このスニペットがそこで実行されると、認証されていないリクエストが発行されます。ルートハンドラー、サーバーアクション、またはスクリプトに保つようにしてください。

## 便利なリンク

- [ダイナミック辞書 - コレクションとバリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- [Intlayer ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)
