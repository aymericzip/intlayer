---
createdAt: 2025-06-18
updatedAt: 2026-06-25
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "直接从 react-native-intlayer 导入 provider 和 hook；react-intlayer 不再需要作为直接依赖项"
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

# 翻译您的 Expo and React Native 应用 | 国际化（i18n）

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用"
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

## 目录

<TOC/>

## 为什么选择 Intlayer 而非其他方案？

与 `react-native-localize` 或 `i18next` 等主流方案相比，Intlayer 是一个集成了以下优化功能的解决方案：

<AccordionGroup>

<Accordion header="完整的 React Native 覆盖">

Intlayer 经过优化，可与 React Native 和 Expo 完美配合，提供**组件级内容作用域**、**TypeScript 支持**以及在移动应用中扩展国际化 (i18n) 所需的所有功能。

</Accordion>

<Accordion header="可维护性">

将应用内容限定作用域**有助于维护**大规模应用程序。您可以复制或删除单个功能文件夹，而无需承受审查整个内容代码库的心理负担。此外，Intlayer **具有完整的类型支持**，确保内容的准确性。

</Accordion>

<Accordion header="AI 代理">

内容共置**减少了大型语言模型 (LLM) 所需的上下文**。Intlayer 还附带了一套工具，例如用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

使用您选择的 LLM，以 AI 提供商的成本在 CI/CD 管道中自动进行翻译。Intlayer 还提供**编译器**来自动提取内容，以及[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台进行翻译**。

</Accordion>

<Accordion header="性能">

将大型 JSON 文件连接到组件可能会导致性能和响应性问题。Intlayer 在构建时优化内容加载。

</Accordion>

<Accordion header="非开发者扩展">

Intlayer 不仅仅是一个 i18n 解决方案，它还提供**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和**[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**，帮助您**实时**管理多语言内容，使翻译人员、文案人员和其他团队成员的协作更加无缝。内容可以本地和/或远程存储。

</Accordion>

<Accordion header="包体积">

无需将大型 JSON 文件加载到页面中，只需加载必要的内容。Intlayer 帮助**将包体积和视图大小减少多达 50%**。

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="安装依赖">

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-react-native-template)。

在您的 React Native 项目中，安装以下包：

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

### 套餐

- **intlayer**  
  用于配置、字典内容、类型生成和 CLI 命令的核心 i18n 工具包。

- **react-native-intlayer**  
  React Native 集成，提供您将用于获取和切换语言环境的上下文 provider 和 React hook、React Native polyfill，以及将 Intlayer 与 React Native 打包器集成的 Metro 插件。它重新导出 `react-intlayer` 的所有内容，因此在 React Native 应用中只需要这一个包。

---

</Step>

<Step number={2} title="创建 Intlayer 配置">

在您的项目根目录（或任何方便的位置）创建一个 **Intlayer 配置**文件。它可能如下所示：

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * 如果 Locales 类型不可用，请尝试在 tsconfig.json 中将 moduleResolution 设置为 "bundler"
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 添加您需要的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

在此配置中，您可以：

- 配置**支持的语言环境列表**。
- 设置**默认**语言环境。
- 以后，您可以添加更多高级选项（例如日志、自定义内容目录等）。
- 请参阅 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) 了解更多信息。

</Step>

<Step number={3} title="添加 Metro 插件">

Metro 是 React Native 的打包器。它是使用 `react-native init` 命令创建的 React Native 项目的默认打包器。要在 Metro 中使用 Intlayer，您需要将插件添加到 `metro.config.js` 文件中：

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> 注意：`configMetroIntlayer` 是一个 Promise 函数。如果您想同步使用它，请改用 `configMetroIntlayerSync`，或避免使用 IFFE（立即调用函数表达式）。
> 注意：`configMetroIntlayerSync` 不允许在服务器启动时构建 intlayer 字典

</Step>

<Step number={4} title="添加 Intlayer provider">

为了在您的应用程序中保持用户语言的同步，您需要使用来自 `react-native-intlayer` 的 `IntlayerProvider` 组件包裹您的根组件。

> 始终从 `react-native-intlayer` 导入。其 `IntlayerProvider` 包含 Intlayer 使用的 web API 的 polyfill，该包重新导出了 `react-intlayer` 中的所有 hook 和工具。

此外，您需要在 `index.js` 文件中添加 `intlayerPolyfill` 函数，以确保 Intlayer 能够正常工作。

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

<Step number={5} title="声明您的内容">

在项目中任意位置（通常在 `src/` 目录中）创建**内容声明**文件，使用 Intlayer 支持的任何扩展格式：

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
- 等等

> **Expo Router (web): 请将 `.content.*` 文件保留在 `app/` 目录之外。** Expo Router 会将 `app/` 内的每个 JavaScript/TypeScript 文件视为一个路由。在 web 上，它的路由发现会直接扫描文件系统，并且 **不** 遵循 Metro 的 `resolver.blockList`，因此同位置的 `*.content.ts` 会被注册为一个路由。像 `app/(tabs)/_layout.content.ts` 这样的文件甚至会被解析为布局（`.content` 部分被读取为平台后缀），这会与实际的 `_layout.tsx` 发生冲突并抛出错误：
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> 请将您的声明放置在 `app/` 之外的目录中（例如 `content/` 或 `src/content/`）。Intlayer 会发现项目中任意位置的 `.content.*` 文件，字典通过它们的 `key` 进行引用，因此不需要进行任何导入更改。在原生端这不是必需的（Metro 的 `blockList` 已经隐藏了它们），但使用非 `app/` 目录可确保这两个平台都能正常工作。

示例（带有 React Native TSX 节点的 TypeScript）：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * 我们"app"域的内容字典
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

> 有关内容声明的详细信息，请参阅 [Intlayer 内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)。

---

</Step>

<Step number={6} title="在组件中使用 Intlayer">

在子组件中使用 `useIntlayer` hook 获取本地化内容。

### 示例

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

> 当在基于字符串的属性中使用 `content.someKey`（例如按钮的 `title` 或 `Text` 组件的 `children`）时，**请调用 `content.someKey.value`** 来获取实际的字符串。

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换数千个组件。

---

</Step>

<Step number={7} title="更改应用程序语言环境" isOptional={true}>

要在组件内部切换语言环境，可以使用 `useLocale` hook 的 `setLocale` 方法：

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

这会触发所有使用 Intlayer 内容的组件重新渲染，现在显示新语言环境的翻译内容。

> 详情请参见 [`useLocale` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)。

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

Intlayer 主要针对 Web Intl API；在 React Native 上，你必须包含适当的 polyfill。

检查清单：

- 使用最新版本的 `intlayer` 和 `react-native-intlayer`。
- 启用 Intlayer polyfill。
- 如果你使用 `getLocaleName` 或其他基于 Intl-API 的工具，请提前导入这些 polyfill（例如在 `index.js` 或 `App.tsx` 中）：

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
