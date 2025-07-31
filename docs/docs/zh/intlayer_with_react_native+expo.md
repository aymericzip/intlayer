---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: 翻译你的 React Native 和 Expo 网站（i18n）
description: 了解如何使你的 React Native 和 Expo 网站支持多语言。按照文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
---

# 使用 Intlayer 和 React Native 开始国际化（i18n）

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-react-native-template)。

## 什么是 Intlayer？

**Intlayer** 是一个**创新的开源国际化（i18n）库**，简化了现代应用中的多语言支持。它适用于多种 JavaScript/TypeScript 环境，**包括 React Native**（通过 `react-intlayer` 包）。

使用 Intlayer，你可以：

- **通过声明式字典在组件级别轻松管理翻译**。
- **通过自动生成的类型确保 TypeScript 支持**。
- **动态本地化**内容，包括**UI 字符串**（在 React Web 中，还可以本地化 HTML 元数据等）。
- **享受高级功能**，如动态语言环境检测和切换。

---

## 第一步：安装依赖

在你的 React Native 项目中，安装以下包：

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

### 包说明

- **intlayer**  
  核心的国际化工具包，用于配置、词典内容、类型生成和命令行工具。

- **react-intlayer**  
  React 集成，提供上下文提供者和 React 钩子，供你在 React Native 中获取和切换语言环境。

- **react-native-intlayer**  
  React Native 集成，提供 Metro 插件，用于将 Intlayer 集成到 React Native 打包工具中。

---

## 第二步：创建 Intlayer 配置文件

在你的项目根目录（或任何方便的位置），创建一个 **Intlayer 配置** 文件。它可能看起来像这样：

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * 如果 Locales 类型不可用，尝试在你的 tsconfig.json 中将 moduleResolution 设置为 "bundler"
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 添加你需要的其他语言环境
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
      // ... 添加你需要的其他语言环境
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
- 设置一个**默认**语言环境。
- 以后，您可以添加更高级的选项（例如，日志、自定义内容目录等）。
- 更多信息请参见[Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 第3步：添加 Metro 插件

Metro 是 React Native 的打包工具。它是通过 `react-native init` 命令创建的 React Native 项目的默认打包工具。要在 Metro 中使用 Intlayer，您需要将插件添加到您的 `metro.config.js` 文件中：

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## 第4步：添加 Intlayer 提供者

为了在整个应用程序中保持用户语言的同步，您需要使用 `react-intlayer` 中的 `IntlayerProvider` 组件包裹您的根组件。

此外，您还需要在 `index.js` 文件中添加 `intlayerPolyfill` 函数，以确保 Intlayer 能够正常工作。

````tsx fileName="app/_layout.tsx" codeFormat="typescript"
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
为了在您的应用程序中保持用户语言的同步，您需要使用来自 `react-intlayer` 的 `IntlayerProvider` 组件包裹您的根组件。

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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
````

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

## 第5步：声明您的内容

````

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

// 获取设备的语言环境
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
````

## 第5步：声明您的内容

在项目中的任意位置（通常在 `src/` 目录下）创建**内容声明**文件，使用 Intlayer 支持的任何扩展名格式：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- 等等。

示例（使用带有 React Native TSX 节点的 TypeScript）：

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
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> 有关内容声明的详细信息，请参阅 [Intlayer 内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

---

## 第4步：在组件中使用 Intlayer

在子组件中使用 `useIntlayer` 钩子以获取本地化内容。

### 示例

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
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
    flexDirection: "row", // 横向排列
    alignItems: "center", // 垂直居中对齐
    gap: 8, // 元素间距为8
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
    flexDirection: "row", // 水平排列
    alignItems: "center", // 垂直居中对齐
    gap: 8, // 元素间距为8
  },
});

module.exports = HomeScreen;
```

> 当在基于字符串的属性中使用 `content.someKey`（例如按钮的 `title` 或 `Text` 组件的 `children`）时，**请调用 `content.someKey.value`** 来获取实际的字符串。

---

## （可选）步骤 5：更改应用程序语言环境

要在组件内部切换语言环境，可以使用 `useLocale` 钩子的 `setLocale` 方法：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
    flexDirection: "row", // 容器内元素横向排列
    justifyContent: "center", // 水平居中对齐
    alignItems: "center", // 垂直居中对齐
    gap: 8, // 元素间距为8
  },
  button: {
    paddingVertical: 6, // 垂直内边距6
    paddingHorizontal: 12, // 水平内边距12
    borderRadius: 6, // 边角圆角半径6
    backgroundColor: "#ddd", // 背景颜色为浅灰色
  },
  text: {
    fontSize: 14, // 字体大小14
    fontWeight: "500", // 字体粗细500
    color: "#333", // 文字颜色深灰
  },
});
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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
    flexDirection: "row", // 容器内元素横向排列
    justifyContent: "center", // 水平居中对齐
    alignItems: "center", // 垂直居中对齐
    gap: 8, // 元素间距为8
  },
  button: {
    paddingVertical: 6, // 垂直内边距6
    paddingHorizontal: 12, // 水平内边距12
    borderRadius: 6, // 边角圆角半径6
    backgroundColor: "#ddd", // 背景颜色为浅灰色
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

这会触发所有使用 Intlayer 内容的组件重新渲染，现在显示新语言环境的翻译内容。

> 详情请参见 [`useLocale` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

## 配置 TypeScript（如果您使用 TypeScript）

Intlayer 会在一个隐藏文件夹中（默认是 `.intlayer`）生成类型定义，以提升自动补全功能并捕获翻译错误：

```json5
// tsconfig.json
{
  // ... 您现有的 TS 配置
  "include": [
    "src", // 您的源代码
    ".intlayer/types/**/*.ts", // <-- 确保包含自动生成的类型
    // ... 您已经包含的其他内容
  ],
}
```

这使得以下功能成为可能：

- **自动补全** 您的字典键。
- **类型检查**，如果访问不存在的键或类型不匹配，会发出警告。

---

## Git 配置

为了避免提交 Intlayer 自动生成的文件，请将以下内容添加到您的 `.gitignore` 文件中：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```

---

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

- **可视化编辑器**：使用[Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)来可视化管理翻译。
- **CMS 集成**：您还可以将词典内容外部化，并从 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 中获取。
- **CLI 命令**：探索 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)，用于执行诸如**提取翻译**或**检查缺失键**等任务。

享受通过 **Intlayer** 为您的 **React Native** 应用构建强大国际化支持的乐趣！

---

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
