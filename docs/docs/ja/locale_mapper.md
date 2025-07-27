---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: ロケールマッパー
description: ロケールマッパーの動作方法を解説します。アプリケーションでロケールマッパーが使用する手順を確認しましょう。各パッケージの役割も説明します。
keywords:
  - ロケールマッパー
  - はじめに
  - Intlayer
  - アプリケーション
  - パッケージ
slugs:
  - doc
  - locale-mapper
---

# ロケールマッパー

ロケールマッパーは、Intlayerアプリケーションで国際化データを扱うための強力なユーティリティです。ロケール固有のデータを変換・整理するための3つの主要な関数、`localeMap`、`localeFlatMap`、`localeRecord`を提供します。

## ロケールマッパーの仕組み

ロケールマッパーは、ロケールに関する必要な情報をすべて含む`LocaleData`オブジェクトを操作します：

```typescript
type LocaleData = {
  locale: LocalesValues; // 現在のロケールコード（例：'en', 'fr'）
  defaultLocale: LocalesValues; // デフォルトのロケールコード
  isDefault: boolean; // これはデフォルトのロケールかどうか
  locales: LocalesValues[]; // 利用可能なすべてのロケールの配列
  urlPrefix: string; // このロケールのURLプレフィックス（例：'/fr' または ''）
};
```

マッパー関数は、設定内の各ロケールに対してこのデータを自動的に生成し、以下を考慮します：

- 設定されたロケールリスト
- デフォルトロケールの設定
- デフォルトロケールがURLにプレフィックスされるかどうか

## コア関数

### `localeMap`

マッパー関数を使って各ロケールを単一のオブジェクトに変換します。

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**例：ルートオブジェクトの作成**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// 結果:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

`localeMap`に似ていますが、マッパー関数がオブジェクトの配列を返し、それが単一の配列にフラット化されます。

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**例: ロケールごとに複数のルートを作成する**

```typescript
import { localeFlatMap } from "@intlayer/core";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// 結果:
// [
//   { path: '/', name: 'en', isDefault: true },
  { path: '/about', name: 'en-about', isDefault: true },
  { path: '/fr', name: 'fr', isDefault: false },
  { path: '/fr/about', name: 'fr-about', isDefault: false },
  { path: '/es', name: 'es', isDefault: false },
  { path: '/es/about', name: 'es-about', isDefault: false }
]
```

### `localeRecord`

各ロケールをキーとし、マッパー関数によって変換された値をマッピングするレコードオブジェクトを作成します。

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**例: 翻訳ファイルの読み込み**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// 結果:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## ロケールマッパーの設定

ロケールマッパーは自動的にあなたのIntlayer設定を使用しますが、パラメータを渡すことでデフォルト設定を上書きすることができます。

### デフォルト設定の使用

```typescript
import { localeMap } from "@intlayer/core";

// intlayer.config.tsの設定を使用
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### 設定の上書き

```typescript
import { localeMap } from "@intlayer/core";

// ロケールとデフォルトロケールを上書き
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // カスタムロケール
  "en", // カスタムデフォルトロケール
  true // URLにデフォルトロケールをプレフィックスする
);
```

## 高度な使用例

### ナビゲーションメニューの作成

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`, // 国旗のパス
}));
```

### サイトマップデータの生成

```typescript
import { localeFlatMap } from "@intlayer/core";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### 動的翻訳の読み込み

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`), // メッセージのインポート
  validation: import(`./locales/${locale}/validation.json`), // バリデーションメッセージのインポート
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // 右から左への言語かどうかの判定
  },
}));
```

## 設定との統合

Locale MapperはIntlayerの設定とシームレスに統合されます：

- **ロケール**: `configuration.internationalization.locales` を自動的に使用します
- **デフォルトロケール**: `configuration.internationalization.defaultLocale` を使用します
- **URLプレフィックス**: `configuration.middleware.prefixDefault` を尊重します

これにより、アプリケーション全体で一貫性が保たれ、設定の重複が削減されます。

## ドキュメント履歴

| バージョン | 日付       | 変更内容                             |
| ---------- | ---------- | ------------------------------------ |
| 5.7.2      | 2025-07-27 | ロケールマッパーのドキュメントを追加 |
