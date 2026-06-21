---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Expo + React Native 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
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
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# 翻译您的 Expo and React Native 应用 | 国际化(i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-react-native-template)。

## 为什么选择 Inlayer 而不是替代品？

与“react-native-localize”或“i18next”等主要解决方案相比，Intlayer 是一个具有集成优化的解决方案，例如：

**完整的 React Native 覆盖**

Intlayer 经过优化，可与 React Native 和 Expo 完美配合，提供**组件级内容范围**、**TypeScript 支持**以及移动应用中扩展国际化 (i18n) 所需的所有功能。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和视图大小减少多达 50%**。

## 第 1 步：安装依赖项

请参阅 GitHub 上的[应用程序模板](https://github.com/aymericzip/intlayer-react-native-template)。

从您的 React Native 项目中，安装以下软件包：

```bash packageManager =“npm”
npm install intlayer React-intlayer
npm install --save-dev react-native-intlayer
npx 层初始化
```

```bash packageManager="pnpm"
pnpm 添加 intlayer 反应 inlayer
pnpm add --save-dev react-native-intlayer
pnpm 内层初始化
```

```bash packageManager =“纱线”
纱线添加内层反应内层
纱线添加--save-dev反应-native-intlayer
纱线内层初始化
```

```bash packageManager =“bun”
面包添加内层反应内层
Bun 添加 --dev React-Native-intlayer
面包x内层初始化
```

### 套餐

- **内层**  
  用于配置、字典内容、类型生成和 CLI 命令的核心 i18n 工具包。

- **反应内层**  
  React 集成提供了上下文提供程序和 React 挂钩，您将在 React Native 中使用它们来获取和切换语言环境。

- **react-native-intlayer**  
  React Native 集成提供了 Metro 插件，用于将 Intlayer 与 React Native 捆绑器集成。

---

## 第一步：安装依赖

在你的 React Native 项目中，安装以下包：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> 该命令将检测您的环境并安装所需的软件包。例如：

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

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

为了在您的应用程序中保持用户语言的同步，您需要使用来自 `react-intlayer-native` 的 `IntlayerProvider` 组件包裹您的根组件。

> 请确保使用来自 `react-native-intlayer` 而不是 `react-intlayer` 的提供者。来自 `react-native-intlayer` 的导出包含了 web API 的 polyfills。

````tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";


const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
为了在您的应用程序中保持用户语言的同步，您需要使用来自 `react-intlayer` 的 `IntlayerProvider` 组件包裹您的根组件。

此外，您需要在 `index.js` 文件中添加 `intlayerPolyfill` 函数，以确保 Intlayer 能够正常工作。

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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
````

## 第5步：声明您的内容

````

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");


// 获取设备的语言环境
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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> 有关内容声明的详细信息，请参阅 [Intlayer 内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

---

## 第4步：在组件中使用 Intlayer

在子组件中使用 `useIntlayer` 钩子以获取本地化内容。

### 示例

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
    flexDirection: "row", // 横向排列
    alignItems: "center", // 垂直居中对齐
    gap: 8, // 元素间距为8
  },
});

export default HomeScreen;
```

> 当在基于字符串的属性中使用 `content.someKey`（例如按钮的 `title` 或 `Text` 组件的 `children`）时，**请调用 `content.someKey.value`** 来获取实际的字符串。

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换成干个组件。

---

<Steps>

<Step number={1} title="更改应用程序语言环境" isOptional={true}>

要在组件内部切换语言环境，可以使用 `useLocale` 钩子的 `setLocale` 方法：

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

这会触发所有使用 Intlayer 内容的组件重新渲染，现在显示新语言环境的翻译内容。

> 详情请参见 [`useLocale` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

</Step>

</Steps>

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

```bash
#  忽略 Intlayer 生成的文件
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
- **CLI 命令**：探索 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)，用于执行诸如**提取翻译**或**检查缺失键**等任务。

享受通过 **Intlayer** 为您的 **React Native** 应用构建强大国际化支持的乐趣！

---
