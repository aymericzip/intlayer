---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "TranslocoからIntlayerへの移行"
description: "compatアダプターを使用してAngularアプリケーションをTranslocoからIntlayerに移行する方法を学びます。"
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Transloco から Intlayer への移行

Angular アプリケーションが現在 `@jsverse/transloco` を使用している場合、当社の compat アダプタを使用して Intlayer に移行できます。この移行により、既存のテンプレート構文を維持しながら、Intlayer の強力な辞書構造を活用できます。

## やること

プロジェクトで初期化コマンドを実行するだけです：

```bash
npx intlayer init
```

これにより、必要な `intlayer.config.ts` 設定が生成されます。その後、Transloco のインポートを `@intlayer/transloco` モジュールに置き換えるか、ビルド aliases に依存します。

## 内部動作

Translocoは、スコープと`TranslocoService`（`translate`、`selectTranslate`）を、構造的ディレクティブ（`*transloco="let t"`）とパイプ（`| transloco`）とともに使用します。

内部動作：

- **スコープ：** Intlayerの辞書キーに自然にマップされ、バンドルの最適化のための優れたプルーニング機能を提供します。
- **サービスとディレクティブ：** Intlayerの角度アダプターはプロバイダーをシームレスに置き換え、既存のテンプレートパイプとディレクティブがIntlayer辞書に対して文字列を解決できるようにします。
- **ビルド時パース：** TypeScriptアナライザーは`instant/get`呼び出しを認識し、フォールバックプルーニングはテンプレートの使用が静的に追跡可能でない場合でも正確性を保証します。
