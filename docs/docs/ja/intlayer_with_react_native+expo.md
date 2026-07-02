---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Expo + React Nativeアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "プロバイダーとフックを react-native-intlayer から直接インポートするよう変更。react-intlayer は直接の依存関係として不要になった"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴初期化"
author: aymericzip
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

## 目次

<TOC/>

## 代替手段ではなく Intlayer を使用する理由

`react-native-localize` や `i18next` などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>

<Accordion header="React Native を完全にカバー">

Intlayer は、**コンポーネントレベルのコンテンツスコープ**、**TypeScript サポート**、およびモバイルアプリの国際化 (i18n) のスケーリングに必要なすべての機能を提供することにより、React Native および Expo と完全に連携するように最適化されています。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの**メンテナンスが容易になります**。コンテンツコードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI エージェント">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって**必要なコンテキストが削減**されます。Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**、および **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** などのツールスイートも付属しており、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

</Accordion>

<Accordion header="オートメーション">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化して翻訳します。Intlayer は、コンテンツ抽出を自動化する**コンパイラー**と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="非開発者によるスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供し、**リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチームメンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>

<Accordion header="バンドルサイズ">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。Intlayer は、**バンドルとビューのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="依存関係をインストールする">

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-react-native-template) を参照してください。

React Native プロジェクトから、次のパッケージをインストールします：

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### パッケージ

- **intlayer**  
  設定、辞書コンテンツ、型生成、CLI コマンドのためのコア i18n ツールキット。

- **react-native-intlayer**  
  ロケールの取得や切り替えに使用するコンテキストプロバイダーと React フック、React Native ポリフィル、および Intlayer を React Native バンドラーと統合するための Metro プラグインを提供する React Native 統合。`react-intlayer` からすべてを再エクスポートするため、React Native アプリではこの単一パッケージのみが必要です。

---

</Step>

<Step number={2} title="Intlayer設定ファイルの作成">

プロジェクトのルート（または任意の便利な場所）に **Intlayer 設定ファイル**を作成します。以下のような内容になるかもしれません：

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
- 詳細は [Intlayer の設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

</Step>

<Step number={3} title="Metro プラグインを追加する">

Metro は React Native 用のバンドラーです。`react-native init` コマンドで作成された React Native プロジェクトのデフォルトバンドラーです。Intlayer を Metro で使用するには、`metro.config.js` ファイルにプラグインを追加する必要があります。

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> 注：`configMetroIntlayer` は Promise 関数です。同期的に使用したい場合は `configMetroIntlayerSync` を使用するか、IFFE（即時実行関数式）を避けてください。
> 注：`configMetroIntlayerSync` はサーバー起動時に intlayer 辞書をビルドすることができません

</Step>

<Step number={4} title="Intlayer プロバイダーを追加する">

アプリケーション全体でユーザーの言語を同期させるには、ルートコンポーネントを `react-native-intlayer` の `IntlayerProvider` コンポーネントでラップする必要があります。

> 常に `react-native-intlayer` からインポートしてください。その `IntlayerProvider` には Intlayer が使用する Web API のポリフィルが含まれており、このパッケージは `react-intlayer` からすべてのフックとユーティリティを再エクスポートします。

また、Intlayer が正しく動作するように、`index.js` ファイルに `intlayerPolyfill` 関数を追加する必要があります。

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="コンテンツを宣言する">

プロジェクト内の任意の場所（一般的には `src/` 内）に**コンテンツ宣言**ファイルを作成します。Intlayer がサポートする任意の拡張子形式を使用できます：

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- その他

> **Expo Router (Web): `.content.*` ファイルは `app/` ディレクトリの外に配置してください。** Expo Router は `app/` 内のすべての JavaScript/TypeScript ファイルをルートとして扱います。Web では、ルート検出がファイルシステムを直接スキャンし、Metro の `resolver.blockList` を**考慮しない**ため、同じ場所に配置された `*.content.ts` がルートとして登録されてしまいます。`app/(tabs)/_layout.content.ts` のようなファイルはレイアウトとして解析され（`.content` 部分がプラットフォームの接尾辞として読み込まれます）、実際の `_layout.tsx` と競合して次のエラーがスローされます:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> 宣言は `app/` 以外のディレクトリ（例: `content/` や `src/content/`）に配置してください。Intlayer はプロジェクト内のどこにあっても `.content.*` ファイルを検出し、辞書はその `key` によって参照されるため、インポートの変更は不要です。ネイティブではこれは必須ではありませんが（Metro の `blockList` がすでにそれらを隠しているため）、`app/` 以外のディレクトリを使用することで両方のプラットフォームが機能し続けます。

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

> コンテンツ宣言の詳細については、[Intlayer のコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md) を参照してください。

---

</Step>

<Step number={6} title="コンポーネントで Intlayer を使用する">

子コンポーネントで `useIntlayer` フックを使用して、ローカライズされたコンテンツを取得します。

### 例

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
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

</Step>

<Step number={7} title="アプリのロケールを変更する" isOptional={true}>

コンポーネント内からロケールを切り替えるには、`useLocale` フックの `setLocale` メソッドを使用できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

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

これにより、Intlayer のコンテンツを使用しているすべてのコンポーネントが再レンダリングされ、新しいロケールの翻訳が表示されます。

> 詳細は [`useLocale` のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md) をご覧ください。

</Step>

</Steps>

## TypeScript の設定（TypeScript を使用している場合）

Intlayer は、補完機能を向上させ、翻訳エラーを検出するために、隠しフォルダ（デフォルトは `.intlayer`）に型定義を生成します：

```json5
// tsconfig.json
{
  // ... 既存の TS 設定
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

## Git 設定

Intlayer によって自動生成されたファイルをコミットしないように、`.gitignore` に以下を追加してください：

```bash
# Intlayer によって生成されたファイルを無視
.intlayer
```

---

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能**をインストールできます。

[VS Code マーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳が欠落している場合の**リアルタイムエラー検出**。
- 翻訳内容の**インラインプレビュー**。
- 翻訳の作成や更新を簡単に行うための**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

---

## さらに進む

- **ビジュアルエディター**：翻訳を視覚的に管理するために、[Intlayer ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を使用してください。
- **CMS 統合**: 辞書コンテンツを外部化し、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) から取得することも可能です。
- **CLI コマンド**: 翻訳の**抽出**や**欠落キーの確認**などのタスクには、[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) を活用してください。

**Intlayer** を通じて、完全な i18n 機能を備えた **React Native** アプリの開発をお楽しみください！

---

### Debug

React Native は React Web よりも安定性が低いため、バージョンの整合性に特に注意を払ってください。

Intlayer は主に Web Intl API を対象としており、React Native では適切な polyfill を含める必要があります。

チェックリスト:

- `intlayer` および `react-native-intlayer` の最新バージョンを使用してください。
- Intlayer polyfill を有効にしてください。
- `getLocaleName` または他の Intl-API ベースのユーティリティを使用する場合は、これらの polyfill を早期にインポートしてください（たとえば `index.js` または `App.tsx` で）:

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- モジュールの解決に失敗した場合は、Metro 設定（resolver aliases、asset plugins、`tsconfig` paths）を確認してください。

---
