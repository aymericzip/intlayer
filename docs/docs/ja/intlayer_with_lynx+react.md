---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: Lynx and React mobile appアプリを翻訳する方法 – i18nガイド 2025
description: LynxとReactを使用してPage Routerを利用したウェブサイトを多言語化する方法を見つけましょう。国際化（i18n）して翻訳するためにドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴開始
---

# IntlayerでLynx and React mobile appを翻訳する | 国際化（i18n）

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-lynx-template)をGitHubで見る。

## Intlayerとは？

**Intlayer**は、モダンアプリケーションにおける多言語対応を簡素化する**革新的なオープンソースの国際化（i18n）ライブラリ**です。これは多くのJavaScript/TypeScript環境で動作し、**Lynx**（`react-intlayer`パッケージを介して）も含まれます。

Intlayerを使用すると、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**できます。
- **自動生成された型でTypeScriptサポートを確保**できます。
- **UI文字列を含むコンテンツを動的にローカライズ**できます（React for webではHTMLメタデータなどもローカライズ可能）。
- **動的なロケール検出や切り替え**などの高度な機能を利用できます。

---

## ステップ1: 依存関係をインストールする

Lynxプロジェクトから、以下のパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
```

### パッケージ

- **intlayer**  
  設定、辞書コンテンツ、型生成、CLIコマンドのためのコアi18nツールキット。

- **react-intlayer**  
  Lynxでロケールの取得と切り替えに使用するコンテキストプロバイダーとReactフックを提供するReact統合。

- **lynx-intlayer**  
  IntlayerをLynxバンドラーと統合するためのプラグインを提供するLynx統合。

---

## ステップ2: Intlayer設定を作成する

プロジェクトのルート（または便利な場所）に**Intlayer設定**ファイルを作成します。以下のようになります：

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 必要な他のロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 必要な他のロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

この設定内で以下を行うことができます：

- **サポートするロケールのリスト**を設定します。
- **デフォルトロケール**を設定します。
- 後で、より高度なオプション（例：ログ、カスタムコンテンツディレクトリなど）を追加することができます。
- 詳細は[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

## ステップ3: LynxバンドラーにIntlayerプラグインを追加する

LynxでIntlayerを使用するには、`lynx.config.ts`ファイルにプラグインを追加する必要があります：

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 他のプラグイン
    pluginIntlayerLynx(),
  ],
});
```

## ステップ4: Intlayerプロバイダーを追加する

アプリケーション全体でユーザーの言語を同期させるには、`react-intlayer`の`IntlayerProvider`コンポーネントでルートコンポーネントをラップする必要があります。

また、Intlayerが正しく動作するようにするために、`intlayerPolyfill`関数ファイルを追加する必要があります。

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## ステップ5: コンテンツを宣言する

プロジェクト内の任意の場所（通常は`src/`内）に**コンテンツ宣言**ファイルを作成します。Intlayerがサポートする任意の拡張形式を使用できます：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- など

例：

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ja: "ロゴをタップして楽しんでください！",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ja: "編集",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ja: "更新を確認してください！",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ja: "Lynx上で",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ja: "ロゴをタップして楽しんでください！",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ja: "編集",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ja: "更新を確認してください！",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ja: "Lynx上で",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ja: "ロゴをタップして楽しんでください！",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ja: "編集",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ja: "更新を確認してください！",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "ja": "Lynx上で",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ja": "ロゴをタップして楽しんでください！",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "ja": "編集",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "ja": "更新を見るには！",
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> コンテンツ宣言の詳細については、[Intlayerのコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

---

## ステップ4: コンポーネントでIntlayerを使用する

子コンポーネントで`useIntlayer`フックを使用してローカライズされたコンテンツを取得します。

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    // 背景のみ
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> 文字列ベースのプロパティ（例: ボタンの`title`や`Text`コンポーネントの`children`）で`content.someKey`を使用する場合、**`content.someKey.value`を呼び出して実際の文字列を取得してください**。

---

## （オプション）ステップ5: アプリのロケールを変更する

コンポーネント内からロケールを切り替えるには、`useLocale`フックの`setLocale`メソッドを使用します。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

これにより、Intlayerコンテンツを使用するすべてのコンポーネントが再レンダリングされ、新しいロケールの翻訳が表示されます。

> 詳細については、[`useLocale`ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

## TypeScriptの設定（TypeScriptを使用している場合）

Intlayerは、自動補完を改善し翻訳エラーを検出するために、隠しフォルダ（デフォルトは`.intlayer`）に型定義を生成します。

```json5
// tsconfig.json
{
  // ... 既存のTS設定
  "include": [
    "src", // ソースコード
    ".intlayer/types/**/*.ts", // <-- 自動生成された型を含める
    // ... 既に含めている他のもの
  ],
}
```

これにより、以下の機能が有効になります：

- **辞書キーの自動補完**。
- 存在しないキーにアクセスしたり型が不一致の場合に警告する**型チェック**。

---

## Gitの設定

Intlayerによって自動生成されたファイルをコミットしないようにするには、以下を`.gitignore`に追加します。

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```

---

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**自動補完**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳内容の**インラインプレビュー**。
- 翻訳の作成や更新を簡単に行う**クイックアクション**。
  拡張機能の使い方の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

- **ビジュアルエディター**: [Intlayerビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を使用して翻訳を視覚的に管理します。
- **CMS統合**: 辞書コンテンツを[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)から外部化して取得することもできます。
- **CLIコマンド**: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を使用して、**翻訳の抽出**や**欠落キーの確認**などのタスクを実行します。

---
