# 使用 Intlayer 和 Next.js 的页面路由进行国际化（i18n）入门

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代网络应用程序中的多语言支持。Intlayer 与最新的 **Next.js** 框架无缝集成，包括其传统的 **页面路由**。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用声明性字典在组件级别。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动完成和错误检测能力。
- **受益于高级功能**，如动态区域设置检测和切换。

> 注意：Intlayer 与 Next.js 12、13、14 和 15 兼容。如果您使用 Next.js 应用程序路由，请参考 [应用程序路由指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_14.md)。对于 Next.js 15，请遵循此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 使用页面路由在 Next.js 应用中设置 Intlayer 的逐步指南

### 第 1 步：安装依赖

使用您喜欢的包管理器安装必要的包：

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### 第 2 步：配置您的项目

创建一个配置文件以定义您的应用程序支持的语言：

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在这里添加您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

有关可用配置选项的完整列表，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：将 Intlayer 集成到 Next.js 配置中

修改您的 Next.js 配置以纳入 Intlayer：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 您现有的 Next.js 配置
};

export default withIntlayer(nextConfig);
```

### 第 4 步：配置中间件以进行区域设置检测

设置中间件以自动检测和处理用户的首选语言：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### 第 5 步：定义动态区域设置路由

实现动态路由，以根据用户的区域设置提供本地化内容。

1. **创建特定地区的页面：**

   将您的主页面文件重命名以包含 `[locale]` 动态段。

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **更新 `_app.tsx` 以处理本地化：**

   修改您的 `_app.tsx` 以包含 Intlayer 提供程序。

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **设置 `getStaticPaths` 和 `getStaticProps`：**

   在您的 `[locale]/index.tsx` 中，定义处理不同语言的路径和属性。

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* 在此处编写您的内容 */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // 在这里添加您的语言

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### 第 6 步：声明您的内容

创建和管理您的内容字典以存储翻译。

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

有关声明内容的更多信息，请参考 [内容声明指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

### 第 7 步：在您的代码中使用内容

在您的应用程序中访问内容字典以显示翻译的内容。

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* 额外的组件 */}
    </div>
  );
};

// ... 其余代码，包括 getStaticPaths 和 getStaticProps

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 确保您有相应的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **注意：** 在 `string` 属性中使用翻译时（例如 `alt`、`title`、`href`、`aria-label`），按如下方式调用函数的值：

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### （可选）第 8 步：国际化您的元数据

要国际化元数据，例如页面标题和描述，请使用 `getStaticProps` 函数以及 Intlayer 的 `getTranslationContent` 函数。

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // 元数据可在头部或其他组件中根据需要使用
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 额外内容 */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... 其余代码包括 getStaticPaths
```

### （可选）第 9 步：更改内容的语言

要允许用户动态切换语言，请使用 `useLocale` 钩子提供的 `setLocale` 函数。

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>英语</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>法语</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>西班牙语</button>
      {/* 为其他语言添加更多按钮 */}
    </div>
  );
};

export default LanguageSwitcher;
```

### 配置 TypeScript

Intlayer 使用模块增强来增强 TypeScript 的功能，提供更好的类型安全和自动完成。

1. **确保 TypeScript 包含自动生成的类型：**

   更新您的 `tsconfig.json` 以包含自动生成的类型。

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // 您现有的 TypeScript 配置
     },
     "include": [
       "src",
       "types" // 包含自动生成的类型
     ]
   }
   ```

2. **TypeScript 优势示例：**

   ![自动完成示例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![翻译错误示例](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git 配置

为了保持您的代码库整洁并避免提交由 Intlayer 生成的文件，建议忽略由 Intlayer 创建的文件。

1. **更新 `.gitignore`：**

   在您的 `.gitignore` 文件中添加以下行：

   ```gitignore
   # 忽略 Intlayer 生成的文件
   .intlayer
   ```

## 其他资源

- **Intlayer 文档：** [GitHub 仓库](https://github.com/aymericzip/intlayer)
- **内容声明指南：** [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)
- **配置文档：** [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)

通过遵循此指南，您可以有效地将 Intlayer 集成到您的 Next.js 应用程序中，使用页面路由为您的网络项目提供强大且可扩展的国际化支持。
