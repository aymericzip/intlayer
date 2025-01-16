# @intlayer/api: Intlayer APIと対話するためのNPMパッケージ

**Intlayer**は、JavaScript開発者のために特別に設計されたパッケージのスイートです。React、React、およびExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/api`**パッケージは、Intlayer APIと対話するためのSDK（ソフトウェア開発キット）です。コンテンツ宣言を監査し、組織、プロジェクト、ユーザー等と対話するための一連の関数を提供します。

## 使用法

```ts
import { intlayerAPI } from "@intlayer/api";

// ユーザー情報を取得するAPIを呼び出す
intlayerAPI.user.getUserAPI({
  ids: ["user-id-1", "user-id-2"],
});
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

You are trained on data up to October 2023.
