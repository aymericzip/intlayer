---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: TanStack Start（React）でのIntlayerの使い始め
description: Intlayerを使ってTanStack Startアプリにi18nを追加する-コンポーネントレベルの辞書、ローカライズされたURL、SEOに適したメタデータ。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# IntlayerとTanStack Start（React）で始める国際化（i18n）

## Intlayerとは？

**Intlayer**はReactアプリ向けのオープンソースのi18nツールキットです。以下を提供します：

- **TypeScriptの安全性を備えたコンポーネントローカル辞書**。
- **動的なメタデータとルート**（SEO対応）。
- **ランタイムでのロケール切り替え**（ロケール検出・保持のためのヘルパー付き）。
- **Viteプラグイン**（ビルド時の変換と開発者体験向上のため）。

このガイドでは、**TanStack Start**プロジェクト（内部でViteを使用し、ルーティング/SSRにTanStack Routerを使っている）にIntlayerを組み込む方法を説明します。

---

## ステップ1：依存関係のインストール

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**：コア（設定、辞書、CLI/変換）。
- **react-intlayer**：React用の`<IntlayerProvider>`とフック。
- **vite-intlayer**：Viteプラグイン、加えてロケール検出/リダイレクト用のオプションミドルウェア（開発環境とSSR/プレビューで動作。プロダクションSSRでは`dependencies`に移動）。

---

## ステップ2：Intlayerの設定

プロジェクトのルートに `intlayer.config.ts` を作成します：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // contentDir、contentFileExtensions、middlewareオプションなども調整可能です。
};

export default config;
```

CommonJS/ESMのバリアントは、`cjs`/`mjs`を好む場合でも元のドキュメントと同じです。

> 完全な設定リファレンスは、Intlayerの設定ドキュメントをご覧ください。

---

## ステップ3：Viteプラグイン（およびオプションのミドルウェア）を追加

**TanStack StartはViteを使用しているため**、`vite.config.ts` にIntlayerのプラグインを追加します：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // ロケール検出、クッキー、リダイレクトのためにオプションだが推奨：
    intlayerMiddlewarePlugin(),
  ],
});
```

> SSRをデプロイする場合は、`vite-intlayer`を`dependencies`に移動して、ミドルウェアが本番環境で動作するようにしてください。

---

## ステップ4：コンテンツを宣言する

辞書ファイルは`./src`以下の任意の場所に配置します（デフォルトは`contentDir`）。例：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Vite ロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ja: "React ロゴ",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      ja: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      ja: (
        <>
          <code>src/routes/index.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
      ja: "ロゴをクリックして詳細を学ぶ",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS バリアントは、元のドキュメントと同様に動作します。

> TSX コンテンツですか？セットアップで必要な場合は `import React from "react"` を忘れないでください。

---

## ステップ 5: TanStack Start を Intlayer でラップする

TanStack Start では、**ルートルート** がプロバイダーを設定する適切な場所です。

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // トップレベルで辞書を使用する例：
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">ホーム</RouterLink>
        <RouterLink to="/about">アバウト</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

次に、ページでコンテンツを使用します：

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> 文字列属性（`alt`、`title`、`aria-label`など）には `.value` が必要です：
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## （オプション）ステップ6：ロケール切り替え（クライアント）

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## （オプション）ステップ7：ローカライズされたルーティング（SEOに優しいURL）

TanStack Startには**2つの優れたパターン**があります。どちらかを選んでください。

動的セグメントフォルダ `src/routes/$locale/` を作成し、URLを `/:locale/...` にします。`$locale` レイアウト内で `params.locale` を検証し、`<IntlayerProvider locale=...>` を設定し、`<Outlet />` をレンダリングします。この方法はシンプルですが、残りのルートは `$locale` の下にマウントされ、デフォルトのロケールにプレフィックスを付けたくない場合は、プレフィックスなしの別のツリーが必要になります。

---

## （オプション）ステップ8：ロケール切り替え時にURLを更新する

パターンA（ベースパス）では、ロケールを切り替えると**異なるベースパスへナビゲートする**ことを意味します：

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // 履歴を保持
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## （任意）ステップ9: `<html lang>` と `dir` の設定（TanStack Start Document）

TanStack Start はカスタマイズ可能な **Document**（ルートHTMLシェル）を提供します。アクセシビリティやSEOのために `lang` と `dir` を設定しましょう：

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* サーバーでロケールを計算する場合はDocumentに渡してください。そうでなければクライアント側でハイドレーション後に修正されます */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

クライアント側での修正のために、小さなフックを保持することもできます:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## （オプション）ステップ10：ローカライズされたLinkコンポーネント

TanStack Routerは`<Link/>`を提供していますが、内部URLに自動でプレフィックスを付けるプレーンな`<a>`タグが必要な場合：

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> パターンA（basepath）を使用している場合、TanStackの`<Link to="/about" />`はすでに`basepath`を介して`/fr/about`に解決されるため、カスタムリンクはオプションです。

---

## TypeScript

Intlayerの生成された型を含めてください：

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Intlayerの生成されたアーティファクトを無視してください：

```gitignore
.intlayer
```

---

## VS Code 拡張機能

- **Intlayer VS Code 拡張機能** → オートコンプリート、エラー表示、インラインプレビュー、クイックアクション。
  マーケットプレイス: `intlayer.intlayer-vs-code-extension`

---

## さらに進む

- ビジュアルエディター
- CMSモード
- エッジでのロケール検出 / アダプター

---

## ドキュメント履歴

| バージョン | 日付       | 変更内容                    |
| ---------- | ---------- | --------------------------- |
| 1.0.0      | 2025-08-11 | TanStack Start の適応を追加 |
