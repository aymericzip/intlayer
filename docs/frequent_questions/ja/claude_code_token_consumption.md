---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 4
title: 翻訳生成時のClaude Codeのトークン消費を抑える方法
description: Claude Codeでの翻訳がトークンを浪費する理由、Intlayerが代わりに実行する処理（翻訳済みキーの除外、JSONのチャンク化、Markdownのブロック単位翻訳）、およびclaude setup-tokenでClaudeのサブスクリプションを再利用する方法。
keywords:
  - claude code
  - tokens
  - トークン消費
  - setup-token
  - i18n
  - 国際化
  - 翻訳
  - fill
  - mcp
  - エージェント
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# 翻訳生成時のClaude Codeのトークン消費を抑える方法

## 問題の説明

Claude Code（またはその他のコーディングエージェント）にコンテンツの翻訳を依頼することは、最もコストのかかる方法です。実行するたびに、エージェントは以下の処理を行う必要があります。

- 既に翻訳済みのキーを含め、JSONやコンテンツファイル全体をコンテキストに読み込む。
- 関連ファイルを検索して、コンテンツの配置場所や構造を把握する。
- どのロケールが不足しており、生成すべきかを特定する。
- カスタム指示（「URLはこのように変換する」「ブランド名は英語のままにする」「親しみやすい表現を使う」など）を毎回再読込する。
- 変更されていない部分を含めて、ファイル全体を書き直す。

これらすべてがターンごとに再送信されるため、コストは「`コンテンツのサイズ × ロケール数 × ターン数`」で増加し、フォーマットやキーのずれを手動で検出して修正しなければならなくなります。

## Intlayerが代わりに行うこと

Intlayerの大きなメリットは、翻訳専用に構築されたパイプラインによって、エージェントの外部でこれらの作業を実行することです。

- **既存の翻訳をフィルタリング**してトークン使用量を制限します。JSON内の既に翻訳されているキーは除外され、不足しているキーのみがモデルに送信されます。
- **Markdownをブロック単位で翻訳します。** ドキュメントの場合、[`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-translate.md) および [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-review.md) は各ブロックをベースドキュメントと比較し、すでに翻訳されているブロックや変更のないブロックをスキップします。
- **JSONが大きすぎる場合はチャンクに分割**し、コンテキストウィンドウの最適な範囲を維持します。
- **JSONをフラット化して再構築**し、トークン消費を最適化します。
- **カスタムプロンプトを挿入**してブランドや表現に関するルール（`applicationContext`, `--custom-instructions`）を適用できるため、会話ごとに繰り返すことなく一度だけ記述すれば済みます。
- **構造を検証**して一貫性を担保し、キーのずれを防ぎながら、フォーマット（Markdown、HTML、挿入タグ、複数形など）を保持します。
- **リトライ管理**を実装し、出力が不正な場合に自動で再試行します。
- **リクエストをキューイングして並列化**し、ファイル、チャンク、ロケールをまたいで処理速度を向上させます。

これらの処理はエージェントのコンテキストを経由しません。基本原則として、エージェントには**何を**国際化するかを判断させ、定型的な反復作業はIntlayerに任せます。

## 解決策

### 1. 抽出を `intlayer extract` に任せる

エージェントに各コンポーネントを手動で書き直させる代わりに、[`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) コマンドを実行させます。ファイル全体をエージェントのコンテキストに読み込むことなく、ハードコードされた文字列をコンポーネントの隣にある `.content` ファイルへ移動します。

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. 翻訳を `intlayer fill` に任せる

エージェントに直接翻訳させないでください。[`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md) コマンドは上記のパイプラインを適用し、不足しているキーのみを送信してチャンク化し、ロケールを並列処理して結果をコンテンツファイルに書き戻します。

```bash
npx intlayer fill
```

実行範囲を絞り込むための便利なフラグがあります。

- `--git-diff`（または `--uncommitted`）: 現在のブランチで変更された辞書のみを処理します。
- `--file` または `--keys`: 特定のコンテンツファイルを対象にします。
- `--output-locales fr es`: 今すぐ必要なロケールのみに限定します。
- `--skip-metadata`: タイトル、説明、タグの生成をスキップします。
- `--data-serialization toon`: よりコンパクトなペイロードをモデルに送信します（トークン数が削減されますが、出力の再現性がわずかに低下する場合があります）。

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Markdownを `doc translate` と `doc review` で翻訳する

エージェントに `.md` ファイルの翻訳を依頼すると、変更のたびに全ロケール分のドキュメント全体を貼り付けることになります。対照的に、[`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-translate.md) および [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-review.md) コマンドはブロック単位で動作します。

翻訳先ファイルがまだ存在しない場合は `doc translate` を使用します。Markdownをチャンク化し、並列で翻訳して対象ファイルを生成します。

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

翻訳先ファイルが既に存在する場合は `doc review` を使用します。ベースドキュメントと各ブロックを比較し、翻訳済みまたは変更のないブロックをスキップして、差分のあるブロックのみを送信します。

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

どちらのコマンドもルールを一度指定するだけでよく、プロンプトごとに繰り返す必要はありません。

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

IntlayerからのAI呼び出しを発生させずにエージェントをワークフローに参加させたい場合、`doc review` の以下の2つのモードが役立ちます。

- `--mode report`: 対応が必要なブロックを行番号と共に出力し、エージェントが該当ブロックのみを編集できるようにします。
- `--mode synthesis`: どのドキュメントが最新で、どれに編集対象ブロックが残っているかのみを出力します。

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. エージェントにMCPサーバー経由でCLIを呼び出させる

[Intlayer MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)を利用すると、エージェントは最新のドキュメントを参照し、会話内で独自に処理を再実装する代わりに `intlayer fill` や `intlayer doc review` を直接実行します。

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

`npx intlayer init skills` で [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md) を導入すると、エージェントがIntlayerのAPIを推測したり、タスクごとにドキュメントを読み直したりする無駄も防げます。

### 5. `claude setup-token` でClaudeのサブスクリプションを再利用する

対話型のClaude Codeセッション内でi18nのセットアップを実行すると、会話履歴全体がコンテキストに保持され続けます。負荷の大きい処理は、短時間のヘッドレスセッションに切り替えて実行しましょう。

お使いのClaudeサブスクリプションから長期トークンを発行します。

```bash
claude setup-token
```

これを `CLAUDE_CODE_OAUTH_TOKEN` として保存し（`.env` ファイルまたはCIのシークレット環境変数）、Intlayerコマンドを実行するワンショットセッションで再利用します。

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

このセッションは指定したプロンプトとコマンド出力のみを保持し、過去の全会話履歴を持ち越しません。同じトークンは [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) でも動作し、Pull Requestごとに `intlayer fill` を実行できます。

> `claude setup-token` で発行されるトークンはClaude Code専用の認証トークンです。`ai.apiKey` のAnthropic APIキーとしては使用できません。翻訳処理自体には、[Intlayerアカウント](https://app.intlayer.org)（無料枠あり）または [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#ai-configuration) で設定したプロバイダーのAPIキーが使用されます。

## まとめ

| タスク                 | 担当者                   | エージェントコンテキスト内のトークン |
| ---------------------- | ------------------------ | ------------------------------------ |
| ローカライズ対象の決定 | Claude Code              | 少量                                 |
| 文字列の抽出           | `intlayer extract`       | なし                                 |
| コンテンツの翻訳       | `intlayer fill`          | なし                                 |
| ドキュメントの翻訳     | `intlayer doc translate` | なし                                 |
| ドキュメントの更新     | `intlayer doc review`    | なし                                 |
| コマンドの実行         | ヘッドレスClaude Code    | プロンプト + コマンド出力            |
