---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Expo + React Native i18n - 完全な翻訳ガイド： React Native
description: バンドルサイズ、SEO、パフォーマンス、保守性のための最良のソリューション。2026年にExpo and React Native モバイルアプリを多言語化しましょう。LLM翻訳、Agent Skills & MCP。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴初期化"
---

# ExpoとReact Nativeアプリを翻訳する | 国際化（i18n）

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-react-native-template) を参照してください。

## 代替手段ではなく Interlayer を使用する理由

「react-native-localize」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**React Native を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**TypeScript サポート**、およびモバイル アプリの国際化 (i18n) のスケーリングに必要なすべての機能を提供することにより、React Native および Expo と完全に連携するように最適化されています。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[エージェント スキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

**バンドルサイズ**

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとビューのサイズを最大 50% 削減**するのに役立ちます。

## ステップ 1: 依存関係をインストールする

GitHub の [アプリケーション テンプレート](https://github.com/aymericzip/intlayer-react-native-template) を参照してください。

React Native プロジェクトから、次のパッケージをインストールします。

````bash packageManager="npm"
npm install intlayer 反応-intlayer
npm install --save-dev 反応ネイティブ-intlayer
npx 内部層初期化
「」

```bash packageManager="pnpm"
pnpm add intlayer 反応-intlayer
pnpm add --save-dev 反応ネイティブ-intlayer
pnpm 内部層初期化
「」

```bash packageManager="yarn"
糸 中間層を追加 反応内部層
糸追加 --save-dev 反応ネイティブ-内部層
糸の中間層の初期化
「」

```bash packageManager="bun"
bun add intlayer 反応-intlayer
バン追加 --dev 反応ネイティブ-intlayer
bun x 内部層の初期化
「」

### パッケージ

- **中間層**
  構成、辞書コンテンツ、タイプ生成、および CLI コマンド用のコア i18n ツールキット。

- **反応内部層**
  React Native でロケールの取得と切り替えに使用するコンテキスト プロバイダーと React フックを提供する React 統合。

- **反応ネイティブ内部層**
  Intlayer を React Native バンドラーと統合するための Metro プラグインを提供する React Native 統合。

---

## ステップ 1: 依存パッケージのインストール

React Native プロジェクトから、以下のパッケージをインストールしてください：

```bash packageManager="npm"
bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
````

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### パッケージ

- **intlayer**  
  設定、辞書コンテンツ、型生成、CLIコマンドのためのコアi18nツールキット。

- **react-intlayer**  
  React Nativeでロケールの取得や切り替えに使用するコンテキストプロバイダーとReactフックを提供するReact統合。

- **react-native-intlayer**  
  IntlayerをReact Nativeバンドラーと統合するためのMetroプラグインを提供するReact Native統合。

---

## ステップ 2: Intlayer設定ファイルの作成

プロジェクトのルート（または任意の便利な場所）に**Intlayer設定ファイル**を作成します。以下のような内容になるかもしれません：

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Locales型が利用できない場合は、tsconfig.jsonのmoduleResolutionを"bundler"に設定してみてください
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 必要な他のロケールを追加してください
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

この設定ファイル内で、以下のことができます：

- **サポートするロケールのリスト**を設定する。
- **デフォルト**のロケールを設定する。
- 後で、より高度なオプション（例：ログ、カスタムコンテンツディレクトリなど）を追加することも可能です。
- 詳細は[Intlayerの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## ステップ3: Metroプラグインを追加する

MetroはReact Native用のバンドラーです。`react-native init`コマンドで作成されたReact Nativeプロジェクトのデフォルトバンドラーです。IntlayerをMetroで使用するには、`metro.config.js`ファイルにプラグインを追加する必要があります。

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## ステップ4: Intlayerプロバイダーを追加する

アプリケーション全体でユーザーの言語を同期させるには、ルートコンポーネントを `react-intlayer-native` の `IntlayerProvider` コンポーネントでラップする必要があります。

> `react-intlayer` の代わりに `react-native-intlayer` のプロバイダーを使用してください。`react-native-intlayer` のエクスポートには Web API のポリフィルが含まれています。

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";


const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";


const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

## ステップ5: コンテンツを宣言する

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## ステップ5: コンテンツを宣言する

プロジェクト内の任意の場所（一般的には `src/` 内）に**コンテンツ宣言**ファイルを作成します。Intlayer がサポートする任意の拡張子形式を使用できます：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- その他

例（React Native 用の TSX ノードを含む TypeScript）：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * "app" ドメインのコンテンツ辞書
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> コンテンツ宣言の詳細については、[Intlayerのコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

---

## ステップ4: コンポーネントでIntlayerを使用する

子コンポーネントで`useIntlayer`フックを使用して、ローカライズされたコンテンツを取得します。

### 例

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> `content.someKey` を文字列ベースのプロパティ（例：ボタンの `title` や `Text` コンポーネントの `children`）で使用する場合は、実際の文字列を取得するために **`content.someKey.value` を呼び出してください**。

> アプリケーションが既に存在する場合は、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [抽出コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を組み合わせて、1 秒で何千ものコンポーネントを変換できます。

---

## （オプション）ステップ5：アプリのロケールを変更する

コンポーネント内からロケールを切り替えるには、`useLocale` フックの `setLocale` メソッドを使用できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

これにより、Intlayerのコンテンツを使用しているすべてのコンポーネントが再レンダリングされ、新しいロケールの翻訳が表示されます。

> 詳細は[`useLocale`のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)をご覧ください。

## TypeScriptの設定（TypeScriptを使用している場合）

Intlayerは、補完機能を向上させ、翻訳エラーを検出するために、隠しフォルダ（デフォルトは `.intlayer`）に型定義を生成します：

```json5
// tsconfig.json
{
  // ... 既存のTS設定
  "include": [
    "src", // ソースコード
    ".intlayer/types/**/*.ts", // <-- 自動生成された型定義を含める
    // ... 既に含めているその他のファイル
  ],
}
```

これにより、以下の機能が利用可能になります：

- 辞書キーの**オートコンプリート**。
- 存在しないキーにアクセスしたり型が不一致の場合に警告する**型チェック**。

---

## Git設定

Intlayerによって自動生成されたファイルをコミットしないように、`.gitignore`に以下を追加してください：

```bash
#  Intlayerによって生成されたファイルを無視
.intlayer
```

---

### VS Code拡張機能

Intlayerの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳が欠落している場合の**リアルタイムエラー検出**。
- 翻訳内容の**インラインプレビュー**。
- 翻訳の作成や更新を簡単に行うための**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

- **ビジュアルエディター**：翻訳を視覚的に管理するために、[Intlayerビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を使用してください。
- **CMS統合**: 辞書コンテンツを外部化し、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)から取得することも可能です。
- **CLIコマンド**: 翻訳の**抽出**や**欠落キーの確認**などのタスクには、[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)を活用してください。

**Intlayer**を通じて、完全なi18n機能を備えた**React Native**アプリの開発をお楽しみください！

---
