---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths 函式文件 | intlayer
description: 了解如何使用 intlayer 套件中的 comparePaths 函式
keywords:
  - comparePaths
  - normalizePath
  - 活躍連結
  - 導覽
  - Intlayer
  - intlayer
  - 國際化
  - 文件
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "初始文件"
author: aymericzip
---

# 文件: `intlayer` 中的 `comparePaths` 函式

## 描述

`comparePaths` 函式在忽略語言設定（locale）區段、通訊協定/主機名稱、查詢字串、雜湊值和結尾斜線的情況下，比較兩個 URL 或路徑是否相等。這是判斷導覽連結是否指向目前頁面的推薦方法（例如，用於標示目前活動的連結），而無需撰寫自己（容易出錯）的正規化邏輯。

它在內部重複使用了 [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/packages/intlayer/getPathWithoutLocale.md) 來移除語言設定區段，因此它會遵循您配置的路由模式和語言設定。

該套件還匯出了底層的 [`normalizePath`](#normalizepath) 輔助函式，它會回傳用於比較的、與語言設定無關的正規路徑名稱。

**主要功能：**

- 與語言設定無關的比較（`/zh-TW/about` 與 `/about` 匹配）
- 適用於絕對 URL 和相對路徑
- 忽略查詢字串、雜湊值和結尾斜線
- 容許缺少前導斜線和空值（正規化為 `/`）
- 輕量級 — 建構在 `getPathWithoutLocale` 之上

---

## 函式簽名

```typescript
comparePaths(
  pathname: string,  // 必填
  href: string,      // 必填
  locales?: Locales[] // 選填
): boolean

normalizePath(
  inputUrl: string,   // 必填
  locales?: Locales[] // 選填
): string
```

---

## 參數

- `pathname: string`
  - **描述**: 要比較的第一個 URL 字串或路徑名稱（通常是目前路徑）。
  - **型別**: `string`
  - **必填**: 是

- `href: string`
  - **描述**: 要比較的第二個 URL 字串或路徑名稱（通常是導覽連結的 `href`）。
  - **型別**: `string`
  - **必填**: 是

- `locales: Locales[]`
  - **描述**: 支援的語言設定的選填陣列。預設為專案中設定的語言。
  - **型別**: `Locales[]`
  - **必填**: 否 (選填)

### 回傳值

- **型別**: `boolean`
- **描述**: 當兩個輸入都解析為相同的與語言設定無關的路徑時回傳 `true`，否則回傳 `false`。

---

## 範例用法

### 基本用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### 絕對和相對 URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### 標示活動的導覽連結

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` 回傳由 `comparePaths` 使用的、與語言設定無關的正規路徑名稱。它移除了語言設定區段、通訊協定/主機、查詢字串和雜湊，確保單個前導斜線，刪除任何結尾斜線（根目錄除外），對於空值則回退為 `/`。

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## 相關函式

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/packages/intlayer/getPathWithoutLocale.md): 從 URL 或路徑中刪除語言設定區段。
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/packages/intlayer/getPrefix.md): 取得給定語言設定的 URL 前綴。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/packages/intlayer/getLocalizedUrl.md): 為特定語言設定生成本地化 URL。

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
