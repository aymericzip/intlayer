---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: コンテンツのテスト
description: Intlayerを使ったコンテンツのテスト方法を紹介します。
keywords:
  - テスト
  - Intlayer
  - 国際化
  - CMS
  - コンテンツ管理システム
  - ビジュアルエディタ
slugs:
  - doc
  - testing
---

# コンテンツのテスト

このガイドでは、辞書が完全であることを自動的に検証し、出荷前に翻訳漏れを検出し、アプリ内のローカライズされたUIをテストする方法を説明します。

---

## テストできること

- **翻訳漏れ**: 必須のロケールが辞書に欠けている場合、CIを失敗させます。
- **ローカライズされたUIのレンダリング**: 特定のロケールプロバイダーでコンポーネントをレンダリングし、表示されるテキストや属性を検証します。
- **ビルド時の監査**: CLIを使ってローカルで簡単な監査を実行します。

---

## クイックスタート: CLIによる監査

プロジェクトのルートから監査を実行します:

```bash
npx intlayer content test
```

便利なフラグ:

- `--env-file [path]`: ファイルから環境変数を読み込みます。
- `-e, --env [name]`: 環境プロファイルを選択します。
- `--base-dir [path]`: 解決のためのアプリのベースディレクトリを設定します。
- `--verbose`: 詳細なログを表示します。
- `--prefix [label]`: ログ行にプレフィックスを付けます。

注意: CLIは詳細なレポートを出力しますが、失敗時に非ゼロで終了しません。CIのゲーティングには、必須ロケールの欠落がゼロであることをアサートするユニットテスト（以下）を追加してください。

---

## プログラムによるテスト (Vitest/Jest)

Intlayer CLI APIを使って、必須ロケールの翻訳漏れがないことをアサートします。

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("必須のロケールが欠落していないこと", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // テストがローカルまたはCIで失敗したときに役立ちます
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jestの同等コード:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("必須のロケールが欠落していないこと", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

動作の仕組み：

- Intlayerは設定（locales、requiredLocales）と宣言された辞書を読み込み、以下を報告します：
  - `missingTranslations`：キーごとに、どのロケールが欠落しているか、どのファイルからかを示します。
  - `missingLocales`：欠落しているすべてのロケールの集合。
  - `missingRequiredLocales`：`requiredLocales`に限定された部分集合（`requiredLocales`が設定されていない場合はすべてのロケール）。

---

## ローカライズされたUIのテスト（React / Next.js）

Intlayerプロバイダーの下でコンポーネントをレンダリングし、表示されている内容を検証します。

Reactの例（Testing Library）：

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("期待される英語のタイトル")).toBeInTheDocument();
});
```

Next.js（App Router）例：フレームワークのラッパーを使用します：

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("フランス語でローカライズされた見出しをレンダリングする", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "期待されるタイトル" })
  ).toBeInTheDocument();
});
```

ヒント：

- 属性の生の文字列値（例：`aria-label`）が必要な場合は、Reactの`useIntlayer`から返される`.value`フィールドにアクセスしてください。
- コンポーネントと辞書を同じ場所に配置しておくことで、ユニットテストやクリーンアップが容易になります。

---

## 継続的インテグレーション

必要な翻訳が欠落している場合にビルドを失敗させるテストを追加します。

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions の例:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

オプション: テストと並行して、人間が読みやすい要約を得るために CLI 監査を実行します:

```bash
npx intlayer content test --verbose
```

---

## トラブルシューティング

- Intlayerの設定で`locales`および（オプションで）`requiredLocales`が定義されていることを確認してください。
- アプリが動的またはリモートの辞書を使用している場合は、辞書が利用可能な環境でテストを実行してください。
- 混在するモノレポの場合は、CLIに正しいアプリケーションルートを指示するために`--base-dir`を使用してください。

---

## ドキュメント履歴

| バージョン | 日付       | 変更内容   |
| ---------- | ---------- | ---------- |
| 6.0.0      | 2025-09-20 | テスト導入 |
