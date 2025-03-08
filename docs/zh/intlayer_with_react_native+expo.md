# 开始使用 Intlayer 和 React Native 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个**创新的开源国际化 (i18n) 库**，简化了现代应用程序中的多语言支持。它适用于许多 JavaScript/TypeScript 环境，**包括 React Native**（通过 `react-intlayer` 包）。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用组件级别的声明式字典。
- **确保 TypeScript 支持**，通过自动生成的类型。
- **动态本地化**内容，包括 **UI 字符串**（在 Web 的 React 中，它还可以本地化 HTML 元数据等）。
- **受益于高级功能**，如动态语言检测和切换。

> **重要提示**：在 React Native 中，您不会更改 `<html lang="...">` 或依赖 Vite 插件。相反，您将集成 `react-intlayer` API，可选地与 [`I18nManager`](https://reactnative.dev/docs/i18nmanager) 协调以支持 RTL，并且如果您使用 React Navigation，还需要调整路由器以反映语言更改。

---

## 第一步：安装依赖项

在您的 React Native 项目中，安装以下包：

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### 包说明

- **intlayer**  
  核心 i18n 工具包，用于配置、字典内容、类型生成和 CLI 命令。

- **react-intlayer**  
  React 集成，提供上下文提供者和 React 钩子，您将在 React Native 中使用它们来获取和切换语言。

- **react-native-intlayer**  
  React Native 集成，提供 Metro 插件，用于将 Intlayer 与 React Native 打包器集成。

---

## 第二步：创建 Intlayer 配置

在您的项目根目录（或任何方便的位置）创建一个 **Intlayer 配置**文件。它可能如下所示：

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 添加您需要的其他语言
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
      // ... 添加您需要的其他语言
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

在此配置中，您可以：

- 配置您的**支持语言列表**。
- 设置一个**默认**语言。
- 以后，您可以添加更高级的选项（例如日志、自定义内容目录等）。
- 查看 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 了解更多信息。

## 第三步：添加 Metro 插件

Metro 是 React Native 的打包器。它是通过 `react-native init` 命令创建的 React Native 项目的默认打包器。要在 Metro 中使用 Intlayer，您需要将插件添加到您的 `metro.config.js` 文件中：

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## 第四步：添加 Intlayer 提供者

为了在您的应用程序中同步用户语言，您需要使用 `react-intlayer` 中的 `IntlayerProvider` 组件包装您的根组件。

将您的**根**或顶级组件用 `react-intlayer` 中的 `IntlayerProvider` 包装。

此外，您需要在 `index.js` 文件中添加 `intlayerPolyfill` 函数，以确保 Intlayer 能够正常工作。

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
    <IntlayerProviderContent locale={getDeviceLocale()}>
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
    <IntlayerProviderContent locale={getDeviceLocale()}>
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
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## 第五步：声明您的内容

在项目中的任何位置创建**内容声明**文件（通常在 `src/` 中），使用 Intlayer 支持的任何扩展格式：

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
- 等等。

示例（使用 TSX 节点的 TypeScript，适用于 React Native）：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * 我们的 "app" 域的内容字典
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      zh: "欢迎！",
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
      zh: "欢迎！",
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
      zh: "欢迎！",
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

        "zh": "欢迎！",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> 有关内容声明的详细信息，请参阅 [Intlayer 的内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

---

## 第 4 步：在组件中使用 Intlayer

使用 `react-intlayer` 的 `IntlayerProvider` 包裹您的 **根** 或顶级组件。然后，在子组件中使用 `useIntlayer` 钩子获取本地化内容。

### 示例

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

> 当在字符串属性（例如按钮的 `title` 或 `Text` 组件的 `children`）中使用 `content.someKey` 时，**调用 `content.someKey.value`** 来获取实际的字符串。

---

## （可选）第 5 步：更改应用程序语言环境

要在组件中切换语言环境，可以使用 `useLocale` 钩子的 `setLocale` 方法：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="切换到法语"
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
      title="切换到法语"
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
      title="切换到法语"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

这将触发所有使用 Intlayer 内容的组件重新渲染，并显示新语言环境的翻译。

> 有关更多详细信息，请参阅 [`useLocale` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

## 配置 TypeScript（如果您使用 TypeScript）

Intlayer 会在一个隐藏文件夹中生成类型定义（默认是 `.intlayer`），以改进自动补全并捕获翻译错误：

```json5
// tsconfig.json
{
  // ... 您现有的 TS 配置
  "include": [
    "src", // 您的源代码
    ".intlayer", // <-- 确保包含自动生成的类型
    // ... 其他您已经包含的内容
  ],
}
```

这使得以下功能成为可能：

- **自动补全** 您的字典键。
- **类型检查**，当访问不存在的键或类型不匹配时发出警告。

---

## Git 配置

为了避免提交由 Intlayer 自动生成的文件，请将以下内容添加到 `.gitignore` 中：

```plaintext
# 忽略由 Intlayer 生成的文件
.intlayer
```

---

## 深入了解

- **可视化编辑器**：使用 [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 以可视化方式管理翻译。
- **CMS 集成**：您还可以将字典内容外部化并从 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 中获取。
- **CLI 命令**：探索 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 以执行诸如 **提取翻译** 或 **检查缺失键** 的任务。

享受使用 **Intlayer** 构建完全支持国际化的 **React Native** 应用程序吧！
