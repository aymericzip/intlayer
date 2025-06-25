# IntlayerとReact Nativeでの国際化（i18n）の始め方

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-react-native-template)をGitHubで見る。

## Intlayerとは？

**Intlayer**は、現代のアプリケーションにおける多言語対応を簡素化する**革新的なオープンソースの国際化（i18n）ライブラリ**です。これは多くのJavaScript/TypeScript環境で動作し、**React Native**（`react-intlayer`パッケージを介して）も含まれます。

Intlayerを使用すると、以下が可能です：

- コンポーネントレベルで宣言的な辞書を使用して、**簡単に翻訳を管理**できます。
- 自動生成された型で**TypeScriptサポートを確保**できます。
- **UI文字列**を含むコンテンツを**動的にローカライズ**できます（React for webではHTMLメタデータなどもローカライズ可能）。
- 動的なロケール検出や切り替えなどの**高度な機能を活用**できます。

---

## ステップ1: 依存関係をインストールする

React Nativeプロジェクトから、以下のパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### パッケージ

- **intlayer**  
  設定、辞書コンテンツ、型生成、CLIコマンドのためのコアi18nツールキット。

- **react-intlayer**  
  React統合用で、React Nativeでロケールの取得や切り替えに使用するコンテキストプロバイダーとReactフックを提供します。

- **react-native-intlayer**  
  React Native統合用で、IntlayerをReact Nativeバンドラーと統合するためのMetroプラグインを提供します。

---

## ステップ2: Intlayerの設定を作成する

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
- **デフォルトのロケール**を設定します。
- 後で、より高度なオプション（例：ログ、カスタムコンテンツディレクトリなど）を追加できます。
- 詳細は[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

## ステップ3: Metroプラグインを追加する

MetroはReact Nativeのバンドラーです。`react-native init`コマンドで作成されたReact Nativeプロジェクトのデフォルトバンドラーです。MetroでIntlayerを使用するには、`metro.config.js`ファイルにプラグインを追加する必要があります：

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## ステップ4: Intlayerプロバイダーを追加する

アプリケーション全体でユーザーの言語を同期させるために、`react-intlayer`の`IntlayerProvider`コンポーネントでルートコンポーネントをラップする必要があります。

また、Intlayerが正しく動作するようにするために、`index.js`ファイルに`intlayerPolyfill`関数を追加する必要があります。

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
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

例（React Native用のTSXノードを使用したTypeScript）：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * "app"ドメイン用のコンテンツ辞書
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      ja: "ようこそ！",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      ja: "ようこそ！",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      ja: "ようこそ！",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",

        "ja": "ようこそ！",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> コンテンツ宣言の詳細については、[Intlayerのコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)をご覧ください。

---

## ステップ4: コンポーネントでIntlayerを使用する

`react-intlayer`から`IntlayerProvider`で**ルート**またはトップレベルのコンポーネントをラップします。その後、子コンポーネントで`useIntlayer`フックを使用してローカライズされたコンテンツを取得します。

### 例

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("react-intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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

module.exports = HomeScreen;
```

> 文字列ベースのプロップス（例: ボタンの`title`や`Text`コンポーネントの`children`）で`content.someKey`を使用する場合、実際の文字列を取得するには**`content.someKey.value`を呼び出してください**。

---

## （オプション）ステップ5: アプリのロケールを変更する

コンポーネント内からロケールを切り替えるには、`useLocale`フックの`setLocale`メソッドを使用します：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="フランス語に切り替え"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="フランス語に切り替え"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="フランス語に切り替え"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

これにより、Intlayerコンテンツを使用するすべてのコンポーネントが再レンダリングされ、新しいロケールの翻訳が表示されます。

> 詳細については、[`useLocale`ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)をご覧ください。

## TypeScriptの設定（TypeScriptを使用している場合）

Intlayerは、補完機能を向上させ、翻訳エラーを検出するために、隠しフォルダ（デフォルトでは`.intlayer`）に型定義を生成します：

```json5
// tsconfig.json
{
  // ... 既存のTS設定
  "include": [
    "src", // ソースコード
    ".intlayer/types/**/*.ts", // <-- 自動生成された型を含める
    // ... 既存の他の設定
  ],
}
```

これにより、以下の機能が有効になります：

- **辞書キーの補完機能**。
- 存在しないキーへのアクセスや型の不一致を警告する**型チェック**。

---

## Gitの設定

Intlayerによって自動生成されたファイルをコミットしないようにするには、以下を`.gitignore`に追加してください：

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```

---

## さらに進む

- **ビジュアルエディター**：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を使用して翻訳を視覚的に管理します。
- **CMS統合**：辞書コンテンツを外部化し、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)から取得することもできます。
- **CLIコマンド**：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を使用して、翻訳の抽出や不足しているキーの確認などのタスクを実行します。

**Intlayer**を活用して、**React Native**アプリを完全なi18n対応で構築してください！
