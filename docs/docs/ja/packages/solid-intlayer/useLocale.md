---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale フックのドキュメント | solid-intlayer
description: solid-intlayer パッケージの useLocale フックの使い方
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに対するドキュメントを統一
---

# useLocale フックのドキュメント

`useLocale` フックは、あなたの Solid アプリケーションにおける現在のロケールを管理するために使用します。現在のロケール（accessor として）、デフォルトロケール、利用可能なロケール、およびロケールを更新するための関数にアクセスできます。

## 使用例

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## 説明

このフックは、以下のプロパティを持つオブジェクトを返します：

1. **locale**: 現在のロケールを返す Solid のアクセサ（`() => string`）。
2. **defaultLocale**: `intlayer.config.ts` に定義されたデフォルトのロケール。
3. **availableLocales**: アプリケーションがサポートするすべてのロケールの配列。
4. **setLocale**: アプリケーションのロケールを更新する関数。有効な場合は永続化（cookies / local storage）も処理します。

## パラメータ

- **props**（オプション）:
  - **onLocaleChange**: ロケールが変更されるたびに呼び出されるコールバック関数。
  - **isCookieEnabled**: ロケールをcookieに永続化するかどうか。
