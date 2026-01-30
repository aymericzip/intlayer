---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t 関数ドキュメント | adonis-intlayer
description: adonis-intlayer パッケージでの t 関数の使用方法を確認してください
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメント
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 初期ドキュメント
---

# ドキュメント: `adonis-intlayer` の `t` 関数

`adonis-intlayer` パッケージの `t` 関数は、AdonisJS アプリケーションでローカライズされたレスポンスを提供するためのコアユーティリティです。ユーザーの優先言語に基づいてコンテンツを動的に選択することで、国際化（i18n）を簡素化します。

---

## 概要

`t` 関数は、特定の言語セットの翻訳を定義および取得するために使用されます。クライアントのリクエスト設定（`Accept-Language` ヘッダーなど）に基づいて、返すべき適切な言語を自動的に決定します。優先言語が利用できない場合は、構成で指定されたデフォルトのロケールに適切にフォールバックします。

---

## 主な機能

- **動的なローカライズ**: クライアントに最も適切な翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの優先言語が利用できない場合、デフォルトのロケールにフォールバックし、ユーザー体験の継続性を確保します。
- **非同期コンテキスト**: Async Local Storage を使用して、AdonisJS のリクエストライフサイクル内でシームレスに動作します。
- **TypeScript サポート**: 翻訳の型安全性を強制します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, any>): any;
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`、`fr`、`es`）で、値が対応する翻訳コンテンツであるオブジェクト。

### 戻り値

- クライアントの優先言語を表すコンテンツ。

---

## ミドルウェアのロード

`t` 関数が正しく動作するようにするには、AdonisJS アプリケーションに `intlayer` ミドルウェアを登録する**必要があります**。

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## 使用例

### 基本的な例

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### コントローラーでの使用

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## 高度なトピック

### フォールバックメカニズム

優先ロケールが利用できない場合、`t` 関数は `intlayer.config.ts` で定義されたデフォルトロケールにフォールバックします。

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript 統合

`t` 関数は、定義された辞書と一緒に使用する場合に型安全です。詳細については、[TypeScript ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。
