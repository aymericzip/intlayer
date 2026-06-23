---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook ドキュメント | angular-intlayer
description: angular-intlayer パッケージでの usePathname フックの使用方法について
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname ユーティリティの追加"
  - version: 8.2.0
    date: 2026-06-22
    changes: "履歴の初期化"
author: aymericzip
---

# Angular 統合: `usePathname` Hook ドキュメント

`usePathname` フックは、ロケールセグメントが削除された現在のブラウザのパス名を、Angular の `Signal<string>` として返します。これは、ロケールのプレフィックスを手動で削除することなく、例えばどのナビゲーション項目がアクティブであるかを判別するなど、ロケールを意識したナビゲーションを構築する際に役立ちます。

## Angular での `usePathname` のインポート

```typescript
import { usePathname } from "angular-intlayer";
```

## 概要

`usePathname` は `window.location.pathname` を読み取り、`getPathWithoutLocale` を使用してロケールのプレフィックスを削除し、ブラウザが `popstate` イベント（戻る/進むナビゲーション）を発生させるたびにシグナルを更新します。コンポーネントが破棄された際に自動的にイベントリスナーをクリーンアップするため、Angular の `DestroyRef` を使用しています。

## 使用方法

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## 戻り値

| タイプ           | 説明                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| `Signal<string>` | ロケールプレフィックスを含まない現在のパス名を保持する Angular シグナル。 |

## 動作

- **ロケールの削除**: 先頭のロケールセグメントを削除します（例: `/ja/dashboard` → `/dashboard`）。
- **リアクティブ**: `popstate` イベント（ブラウザの戻る / 進む操作）時に自動で更新されます。
- **SSR セーフ**: `window` が利用できない場合は `""` を返します。
- **クリーンアップ**: ホストコンポーネントが破棄されると、`DestroyRef.onDestroy` を介して `popstate` リスナーが削除されます。

## 例

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "ダッシュボード" },
    { href: "/settings", label: "設定" },
  ];

  readonly pathname = usePathname();
}
```

## 関連情報

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/angular-intlayer/exports.md) — 現在のロケール + ロケールスイッチャー
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) — このフックで内部的に使用されているユーティリティ
