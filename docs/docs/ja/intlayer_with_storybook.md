---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: StorybookでIntlayerをセットアップする方法
description: IntlayerとStorybookを使用して、デザインシステムを多言語化する方法を学びます — コンテンツ宣言のコンパイル、ロケールスイッチャーの追加、および任意の言語でのコンポーネントのプレビュー。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: Init doc
---

# StorybookでIntlayerを使用する

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、現代的なウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的でオープンソースな国際化（i18n）ライブラリです。**コンポーネントレベル**で動作し、各コンポーネントが自らのコンテンツ宣言を所有するため、翻訳を使用するコードと同じ場所に配置できます。

Intlayerを使用すると、以下のことが可能になります：

- **宣言的な翻訳管理**: コンポーネントごとのコンテンツファイルを使用します。
- **完全なTypeScriptサポート**: 自動生成された型とIDEのオートコンプリート。
- **ランタイムでのロケール切り替え**: ページのリロードなし。
- **自動翻訳**: 組み込みのAIプロバイダー統合。

---

## なぜStorybookでIntlayerを使用するのか？

Storybookは、UIコンポーネントを分離して開発およびドキュメント化するための業界標準ツールです。これをIntlayerと組み合わせることで、以下のメリットが得られます：

- **すべてのロケールをプレビュー**: Storybookのツールバースイッチャーを使用して、キャンバス内で直接確認できます。
- **翻訳の欠落を防止**: 本番環境に到達する前にエラーを発見できます。
- **多言語コンポーネントのドキュメント化**: ハードコードされた文字列ではなく、実際のタイプセーフなコンテンツでドキュメント化できます。

---

## ステップバイステップのセットアップ

<Tabs>
<Tab value="Vite Setup">

### ステップ 1: 依存関係のインストール

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| パッケージ       | 役割                                                           |
| ---------------- | -------------------------------------------------------------- |
| `intlayer`       | コア — 設定、コンテンツのコンパイル、CLI                       |
| `react-intlayer` | Reactバインディング — `IntlayerProvider`, `useIntlayer` フック |
| `vite-intlayer`  | Viteプラグイン — コンテンツ宣言ファイルの監視とコンパイル      |

---

### ステップ 2: Intlayer設定の作成

プロジェクトのルート（またはデザインシステムパッケージ内）に `intlayer.config.ts` を作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 必要に応じてロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // *.content.ts ファイルが配置されている場所
  },
};

export default config;
```

> オプションの全リストについては、[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

---

### ステップ 3: StorybookにViteプラグインを追加する

Storybookの `viteFinal` フックを使用して、内部のVite設定を拡張できます。そこで `intlayer()` プラグインをインポートして追加します：

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …その他のアドオン
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

`intlayer()` プラグインは `*.content.ts` ファイルを監視し、Storybookの開発中に変更があれば自動的に辞書を再構築します。

---

### ステップ 4: `IntlayerProvider` デコレーターとロケールツールバーの追加

Storybookの `preview` ファイルは、すべてのストーリーを `IntlayerProvider` でラップし、ツールバーにロケールスイッチャーを表示するのに最適な場所です：

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // すべてのストーリーをIntlayerProvider内でラップ
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Storybookツールバーにロケールスイッチャーを表示
  globalTypes: {
    locale: {
      description: "アクティブなロケール",
      defaultValue: "en",
      toolbar: {
        title: "ロケール",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> `locale` の値は `intlayer.config.ts` で宣言されたロケールと一致する必要があります。

</Tab>
<Tab value="Webpack Setup">

### ステップ 1: 依存関係のインストール

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### ステップ 2: Intlayer設定の作成

プロジェクトのルートに `intlayer.config.ts` を作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### ステップ 3: StorybookのWebpackを設定する

WebpackベースのStorybookセットアップ（例: `@storybook/react-webpack5`）の場合、`webpackFinal` を介してwebpack設定を拡張し、Intlayerエイリアスとローダーを追加します：

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### ステップ 4: `IntlayerProvider` デコレーターとロケールツールバーの追加

Viteセットアップと同様に、デコレーターとグローバルロケール型を `.storybook/preview.tsx` に追加します：

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "アクティブなロケール",
      defaultValue: "en",
      toolbar: {
        title: "ロケール",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## コンテンツの宣言

各コンポーネントの隣に `*.content.ts` ファイルを作成します。Intlayerはコンパイル中に自動的にこれを検出します。

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> その他のコンテンツ宣言形式や機能については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

---

## コンポーネントでの `useIntlayer` の使用

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      コピー
    </button>
  );
};
```

`useIntlayer` は、最も近い `IntlayerProvider` から提供される現在のロケールのコンパイル済み辞書を返します。Storybookのツールバーでロケールを切り替えると、更新された翻訳でストーリーが自動的に再レンダリングされます。

---

## 国際化されたコンポーネントのストーリー作成

`IntlayerProvider` デコレーターを配置すると、ストーリーは以前とまったく同じように動作します。ロケールツールバーはキャンバス全体の有効なロケールを制御します：

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** デフォルトのストーリー — ツールバーでロケールを切り替えて翻訳をプレビューします。 */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** コードブロック内にボタンを表示する一般的なユースケース。 */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> 各ストーリーはツールバーから `locale` グローバルを継承するため、ストーリーコードを変更することなく、すべてのロケールを確認できます。

---

## ストーリー内での翻訳のテスト

Storybookの `play` 関数を使用して、特定のロケールに対して正しい翻訳テキストがレンダリングされていることを確認します：

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // ボタンに空でないアクセシブルな名前があることを確認
    await expect(button).toHaveAccessibleName();
    // ボタンが無効になっていないことを確認
    await expect(button).not.toBeDisabled();
    // キーボードのアクセシビリティを確認
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## その他のリソース

- [Intlayer 設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [Storybook ドキュメント](https://storybook.js.org/docs)
