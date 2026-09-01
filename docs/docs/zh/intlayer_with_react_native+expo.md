---
createdAt: 2025-06-18
updatedAt: 2026-08-30
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

内容共置**减少了大型语言模型 (LLM) 所需的上下文**。Intlayer 还附带了一套工具，例如用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加顺畅。

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
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
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

## 常见问题

<FAQ>

<Question title="国际化 React Native 或 Expo 应用有哪些不同的解决方案？">

- **`i18n-js` 搭配 `expo-localization`**：传统的历史组合，仅为无类型支持的纯消息对象。
- **`react-i18next`**：React 生态系统的通用标准，在运行时加载 JSON 命名空间。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时由 Metro 插件进行编译，全链路类型安全，提供 AI 翻译、可视化编辑器和 CMS。

在移动端，包体积的优势比在 Web 端更加显著，因为所有资源都会被打包进应用安装包中，而不是按页面请求动态加载。按组件编译内容可以确保未使用的语言和未使用的键完全不会进入应用包。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Question>

<Question title="i18n 会给我的应用安装包体积增加多少？">

远少于运行时目录方案，这一点在移动端比 Web 端更为关键，因为所有内容都直接打包进应用本身。Metro 插件将 `useIntlayer` 调用解析为组件使用的确切条目，因此未使用的键和未使用的语言永远不会打入二进制包。与常规替代方案相比，Intlayer 可将包体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

</Question>

<Question title="我可以从 i18n-js 或 react-i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [i18n-js 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18n-js.md) 或 [react-i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-i18next_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `react-i18next` 和 `react-intl` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 是否支持 Expo 和 Metro 打包器？">

支持。第 3 步添加了 Metro 插件，该插件负责编译您的 `.content.ts` 文件并在保存时重新生成类型，因此 Fast Refresh 会像检测其他源码更改一样实时捕获内容修改。它在 Expo Go 和开发构建版本中均可正常使用。

</Question>

<Question title="如何检测设备系统语言？">

从 `expo-localization` 中读取系统语言并作为初始语言环境传递给 Intlayer Provider，随后持久化用户的明确选择。当设备语言不在已声明的语言列表中时，Intlayer 会自动回退到您的默认语言环境，因此应用程序绝不会渲染空字符串。

</Question>

<Question title="如何在运行时更改应用语言？">

第 7 步对此进行了介绍。`useLocale` 公开活动语言环境、声明的语言环境以及设置函数，读取内容的组件会立即重新渲染，因此无需重启应用程序即可生效。

</Question>

<Question title="如何支持阿拉伯语或希伯来语等从右到左 (RTL) 的语言？">

使用 `getHTMLTextDir` 判断当前活动语言环境是否为 RTL，并通过 React Native 的 `I18nManager` 进行应用。需要注意的是，React Native 需要重新加载才能完整翻转 RTL 布局，因此大多数应用会在用户选择 RTL 语言时提示一次重启。

</Question>

<Question title="如何使用 AI 自动翻译应用？">

运行 `npx intlayer fill`，它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
