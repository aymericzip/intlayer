# @intlayer/chokidar: Intlayer宣言ファイルを辞書にスキャンして構築するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`@intlayer/chokidar`**パッケージは、[chokidar](https://github.com/paulmillr/chokidar)を使用して、[Intlayer設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)に従ってIntlayer宣言ファイルを辞書にスキャンして構築するために使用されます。

## 使用方法

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer辞書を構築する

watch({ persistent: true }); // 設定ファイルの変更を監視する
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
