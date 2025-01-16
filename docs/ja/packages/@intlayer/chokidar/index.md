# @intlayer/chokidar: NPM パッケージとして Intlayer 宣言ファイルを辞書にスキャンして構築する

**Intlayer** は、JavaScript 開発者のために特別に設計されたパッケージのスイートです。React、React、Express.js などのフレームワークと互換性があります。

**`@intlayer/chokidar`** パッケージは、[chokidar](https://github.com/paulmillr/chokidar) を使用して Intlayer 宣言ファイルを辞書にスキャンして構築し、[Intlayer 設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) に従います。

## 使用法

```ts
import { watch } from "@intlayer/chokidar";

// Intlayer 辞書を構築する
watch();

// または

// ウォッチモード
watch({ persistent: true });
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
