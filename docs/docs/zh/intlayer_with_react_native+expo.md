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

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

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

> **Expo Router (web): 请将 `.content.*` 文件保留在 `app/` 目录之外。** Expo Router 会将 `app/` 内的每个 JavaScript/TypeScript 文件视为一个路由。在 web 上，它的路由发现会直接扫描文件系统，并且 **不** 遵循 Metro 的 `resolver.blockList`，因此同位置的 `*.content.ts` 会被注册为一个路由。像 `app/(tabs)/_layout.content.ts` 这样的文件甚至会被解析为布局（`.content` 部分被读取为平台后缀），这会与实际的 `_layout.tsx` 发生冲突并抛出错误：
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> 请将您的声明放置在 `app/` 之外的目录中（例如 `content/` 或 `src/content/`）。Intlayer 会发现项目中任意位置的 `.content.*` 文件，字典通过它们的 `key` 进行引用，因此不需要进行任何导入更改。在原生端这不是必需的（Metro 的 `blockList` 已经隐藏了它们），但使用非 `app/` 目录可确保这两个平台都能正常工作。

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

### 调试

React Native 的稳定性不如 React Web，因此要特别注意版本对齐。

Intlayer 主要针对 Web Intl API；在 React Native 上，你必须包含适当的 polyfills。

检查清单：

- 使用最新版本的 `intlayer`、`react-intlayer` 和 `react-native-intlayer`。
- 启用 Intlayer polyfill。
- 如果你使用 `getLocaleName` 或其他基于 Intl-API 的工具，请提前导入这些 polyfills（例如在 `index.js` 或 `App.tsx` 中）：

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

- 如果模块无法解析，请验证你的 Metro 配置（resolver 别名、asset 插件、`tsconfig` 路径）。

---
