# next-i18next VS next-intl VS Intlayer | Next.js 国际化 (i18n)

下面是 **三个流行库** 进行 Next.js 应用国际化 (i18n) 的简要比较：**next-intl**、**next-i18next** 和 **Intlayer**。

本文档强调关键标准：

1. **架构**（将翻译与其组件保持紧密）
2. **TypeScript 支持**
3. **缺失翻译的管理**
4. **服务器组件支持**
5. **增强的路由和中间件** 适用于 Next.js
6. **设置的简单性**

该指南还提供了对 **Intlayer** 的 **深入了解**，展示了它为什么可以成为一个强大的选择——特别是对于 Next.js 13+，包括 **App Router** 和 **服务器组件**。

---

## 各库概述

### 1. next-intl

**主要焦点**：快速简便的设置，采用轻量级的本地化方式。

- **架构**：鼓励将翻译放在单一文件夹中（例如，`locales/`），但也允许多种策略。不严格执行“每个组件一个翻译”的架构。
- **TypeScript 支持**：基础的 TypeScript 集成。存在一些类型定义，但并不以从翻译文件自动生成 TypeScript 定义为主要方向。
- **缺失翻译**：基本的回退机制。默认情况下，回退到一个键或默认语言字符串。没有强大的开箱即用的工具来进行高级缺失翻译检查。
- **服务器组件支持**：通常与 Next.js 13+ 一起工作，但对于深层服务器端使用（例如，复杂动态路由的服务器组件），模式不够专用。
- **路由和中间件**：中间件支持是可能的，但有限。通常依赖于 Next.js 的 `Middleware` 进行语言检测，或手动配置以重写语言路径。
- **设置简单性**：非常简单。需要最少的样板代码。

**使用时机**：当你想要一种更简单的方法或熟悉以更传统的方式管理你的翻译（如一个包含语言 JSON 文件的文件夹）时。

---

### 2. next-i18next

**主要焦点**：使用 `i18next` 背后的成熟解决方案，广泛应用于 Next.js 项目。

- **架构**：通常将翻译组织在 `public/locales` 文件夹中。并不是专门设计为将翻译“靠近”每个组件，尽管你可以手动采用不同的结构。
- **TypeScript 支持**：合理的 TypeScript 覆盖，但需要自定义配置以进行类型化翻译和类型化钩子。
- **缺失翻译**：i18next 提供插值/回退机制。然而，缺失翻译检测通常需要额外设置或第三方插件。
- **服务器组件支持**：已记录基本用法与 Next.js 13 兼容，但高级用法（例如，深度集成服务器组件、动态路由生成）可能比较麻烦。
- **路由和中间件**：在语言子路径的重写中严重依赖于 Next.js 的 `Middleware`。对于更复杂的设置，你可能需要深入了解高级 i18next 配置。
- **设置简单性**：对于习惯 i18next 的人来说是熟悉的方式。然而，在需要高级 i18n 特性时（命名空间、多种回退语言等）可能会增加更多样板代码。

**使用时机**：当你已经致力于 `i18next` 生态系统或有现有 i18next 基础的翻译时。

---

### 3. Intlayer

**主要焦点**：一个现代的开源 i18n 库，专门为 Next.js **App Router**（12, 13, 14 和 15）量身定制，内置支持 **服务器组件** 和 **Turbopack**。

#### 主要优点

1. **架构**

   - 鼓励将 **翻译紧密放置于组件旁边**。每个页面或组件可以拥有自己的 `.content.ts`（或 JSON）文件——无须在巨大的翻译文件夹中翻找。
   - 这使得你的代码更加 **模块化和可维护**，特别是在大型代码库中。

2. **TypeScript 支持**

   - **自动生成的类型定义**：一旦你定义了内容，Intlayer 将生成可以支持自动完成并捕捉翻译错误的类型。
   - 最小化运行时错误，比如缺失键，并直接在你的 IDE 中提供高级 **自动完成**。

3. **缺失翻译的管理**

   - 在构建期间，Intlayer 可以 **检测缺失的翻译键** 并抛出警告或错误。
   - 这确保你永远不会在多语言之间意外发布缺失文本。

4. **针对服务器组件的优化**

   - 完全支持 Next.js 的 **App Router** 和新的 **服务器组件** 范式。
   - 提供专门的提供者（`IntlayerServerProvider`、`IntlayerClientProvider`）以 **隔离服务器上下文**（处理 Next.js 13+ 时至关重要）。

5. **增强的路由和中间件**

   - 包含一款专用的 [**`intlayerMiddleware`**](#) 用于 **自动语言检测**（通过 cookies 或浏览器头）和高级路由生成。
   - 动态处理本地化路径（例如，`/en-US/about` 与 `/fr/about`），配置最小化。
   - 提供助手方法如 `getMultilingualUrls` 用于生成替代语言链接（非常适合 **SEO**）。

6. **简化的设置**
   - 一个配置文件（`intlayer.config.ts`）来定义你的语言、默认语言和集成偏好。
   - 一个包装插件 `withIntlayer(nextConfig)` 可以 **注入** 所有环境变量和内容监视器。
   - **没有大型回退配置**——该系统旨在“正常工作”，减少摩擦。

> **底线**：Intlayer 是一个现代化的解决方案，旨在 **推动最佳实践**：从 **将翻译紧邻** 其每个 React 组件，到提供 **强大的 TS 支持** 和 **简便的服务器端** 使用，同时 **大幅减少样板代码**。

---

## 并排特性比较

| **特性**                             | **next-intl**                            | **next-i18next**                               | **Intlayer**                                   |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **将翻译靠近组件**                   | 部分 - 通常一个语言文件夹               | 非默认 - 通常 `public/locales`                 | **是 - 推荐且简单**                           |
| **TypeScript 自动生成**               | 基本 TS 定义                           | 基本 TS 支持                                   | **是 - 高级开箱即用**                          |
| **缺失翻译检测**                     | 主要是回退字符串                        | 主要是回退字符串                              | **是 - 构建时检查**                            |
| **服务器组件支持**                   | 有效但不专用                          | 支持但可能冗长                               | **完全支持专用提供者**                        |
| **路由和中间件**                     | 手动集成与 Next 中间件                | 通过重写配置提供                             | **专用 i18n 中间件 + 高级钩子**               |
| **设置复杂性**                       | 简单，最小配置                         | 传统，对于高级用法可能冗长                   | **一个配置文件 & 插件**                       |

---

## 为什么选择 Intlayer？

对于迁移到或建立在 **Next.js App Router**（版本 13、14 或 15）与 **服务器组件** 之上的团队，Intlayer 提供：

1. **精简的架构**

   - 每个路由或组件都持有自己的翻译。这促进了清晰性和可维护性。

2. **强大的 TypeScript 集成**

   - 你获得编译器级别的安全性，避免“拼写错误”或缺失的翻译键。

3. **真实的缺失翻译警报**

   - 如果你忘记了某个键或语言翻译，你将在构建时收到警告（而不是发布不完整的 UI）。

4. **内置高级路由**

   - 自动语言检测、动态路由生成和简单的本地化 URL 管理均包含在内。
   - 标准的 `intlayerMiddleware` 不需要深入自定义重写。

5. **一站式设置**

   - 最少的样板代码：只需定义你的 `intlayer.config.ts`，用 `withIntlayer` 包装 `next.config`，并添加官方中间件。
   - 清晰、直接的用法，适用于 **服务器** 和 **客户端** 组件，通过 `IntlayerServerProvider` 和 `IntlayerClientProvider` 实现。

6. **SEO 友好**
   - 内置的助手（`getMultilingualUrls`、`hrefLang` 属性等）使得生成符合 SEO 的页面和网站地图变得简单。

---

## 示例：Intlayer 的实际应用

以下是一个 _非常_ 简明的代码片段，展示了如何在 Next.js 15 项目中利用 Intlayer。有关详细信息和代码示例，请 [查看完整的 Intlayer 指南](#)。

<details>
<summary>逐步示例</summary>

1. **安装和配置**

   ```bash
   npm install intlayer next-intlayer
   ```

   ```ts
   // intlayer.config.ts
   import { Locales, type IntlayerConfig } from "intlayer";

   const config: IntlayerConfig = {
     internationalization: {
       locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
       defaultLocale: Locales.ENGLISH,
     },
   };
   export default config;
   ```

2. **使用插件**

   ```ts
   // next.config.mjs
   import { withIntlayer } from "next-intlayer/server";

   /** @type {import('next').NextConfig} */
   const nextConfig = {};

   export default withIntlayer(nextConfig);
   ```

3. **添加中间件**

   ```ts
   // src/middleware.ts
   export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

   export const config = {
     matcher:
       "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
   };
   ```

4. **创建本地化布局**

   ```tsx
   // src/app/[locale]/layout.tsx
   import { getHTMLTextDir } from "intlayer";
   import { NextLayoutIntlayer } from "next-intlayer";

   const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
     const { locale } = params;
     return (
       <html lang={locale} dir={getHTMLTextDir(locale)}>
         <body>{children}</body>
       </html>
     );
   };

   export { generateStaticParams } from "next-intlayer";
   export default LocaleLayout;
   ```

5. **声明并使用内容**

   ```tsx
   // src/app/[locale]/page.content.ts
   import { t } from "intlayer";

   export default {
     key: "page",
     content: {
       getStarted: {
         main: t({
           en: "Get started by editing",
           fr: "Commencez par éditer",
           es: "Comience por editar",
         }),
         pageLink: "src/app/page.tsx",
       },
     },
   };
   ```

   ```tsx
   // src/app/[locale]/page.tsx
   import { IntlayerServerProvider } from "next-intlayer/server";
   import { IntlayerClientProvider, useIntlayer } from "next-intlayer";

   const PageContent = () => {
     const { content } = useIntlayer("page");
     return (
       <>
         <p>{content.getStarted.main}</p>
         <code>{content.getStarted.pageLink}</code>
       </>
     );
   };

   export default function Page({ params }) {
     return (
       <IntlayerServerProvider locale={params.locale}>
         <IntlayerClientProvider locale={params.locale}>
           <PageContent />
         </IntlayerClientProvider>
       </IntlayerServerProvider>
     );
   }
   ```

   </details>

---

## 结论

每个解决方案—**next-intl**、**next-i18next** 和 **Intlayer**—在多语言 Next.js 项目中都证明了其有效性。然而，**Intlayer** 更进一步，通过：

- **强烈鼓励组件级翻译架构**
- 与 **Next.js 13+ 和服务器组件** 无缝集成
- 提供 **强大的 TypeScript** 自动生成以确保更安全的代码
- 在构建时处理 **缺失翻译**
- 提供一个 **简化的单一配置** 方法和增强的路由与中间件

如果你想要符合 **现代** i18n 特性的解决方案，并且针对 Next.js App Router 寻找 **完全类型化** 的体验，无需手动调整回退逻辑、路由重写或复杂的构建步骤，**Intlayer** 是一个引人注目的选择。它不仅缩短了你的设置时间，还确保了团队对翻译的更可维护、可扩展的方法。