---
createdAt: 2026-09-09
updatedAt: 2026-09-19
title: "Remix 3 i18n - 完整的应用多语言国际化翻译指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Remix 3 应用的权威指南。借助 AI 智能体完成翻译，并优化打包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Web 标准
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "使用 remix-intlayer 中间件和钩子"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 初始文档"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Remix 3 网站 | 国际化 (i18n)

本指南演示了如何将 **Intlayer** 集成到 **Remix 3** 应用中以实现无缝的国际化，涵盖基于语言的路由、类型安全的内容声明、服务端渲染的 JSX 组件以及对 Node.js、Bun、Deno 和 Cloudflare Workers 的跨运行时支持。

## 什么是 Remix 3？

**Remix 3** 代表了一次根本性的架构演进，转向**完全构建在 Web 标准之上、可组合且与运行时解耦的 Web 框架**。Remix 3 不再与特定的打包器或专有服务器 API 绑定，而是以单一职责的可组合包形式发布：

- **`remix/fetch-router`** (或 `remix/router`): 基于 Fetch API (`Request` 与 `Response`) 构建的轻量且符合规范的路由。
- **`remix/ui`**: JSX 组件模型 (`jsxImportSource: "remix/ui"`)。组件是一个接收 Handle 并返回渲染函数的设置函数，外观类似 React，但状态保存在纯 JavaScript 闭包中。
- **`remix/middleware/render`**: 为每个请求挂载 `context.render(<Page />)`，将 JSX 树以流式传输转换为 HTML `Response`。
- **`remix/node-fetch-server`**: Node.js 服务器适配器，原生支持 Bun、Deno 与边缘运行时。
- **`remix/cookie`**: 具备加密安全性的 Cookie 解析与序列化工具。

结合 **Intlayer** 和 **`remix-intlayer`** 软件包（包含语言环境中间件以及与 `react-intlayer` 相同的 `useIntlayer` / `useDictionary` / `useLocale` 钩子，绑定到 Remix 请求上下文），你将获得一个完整的国际化系统，提供编译时安全性、自动化 AI 翻译、零开销服务端渲染以及流畅的语言环境路由。

## 目录

<TOC/>

## 为什么选择 Intlayer 而不是其他方案？

与 `i18next` 等传统方案或自定义翻译加载器相比，Intlayer 提供了专为现代 Web 架构优化的集成化开发者体验：

<AccordionGroup>
<Accordion header="全面支持 Remix 3 和 Web 标准">

Intlayer 专为与 Web 标准（`Request`、`Response`、`Headers` 和 `URL`）无缝协作而构建。`remix-intlayer` 作为轻量级中间件插入 Remix 3 的 Fetch 路由器中，从 URL 路径、Cookie 或 `Accept-Language` 请求头中提取语言环境，并将其暴露给请求的其余部分、处理程序、视图和 `remix/ui` 组件，无需手动传递参数，也不会将你锁定在特定运行时。

</Accordion>
<Accordion header="类型安全的内容声明">

彻底告别零散的 JSON 键和运行时的缺失键崩溃。Intlayer 在所有声明的语言中强制执行 TypeScript 静态类型检查，如果缺少翻译或内容不合法，会在构建时立即发出警告。

</Accordion>
<Accordion header="服务端零打包体积开销">

Remix 3 在服务端渲染 JSX 组件并将 HTML 流式传输至客户端。仅会将对应请求语言解析后的纯文本写入输出流。除非组件被显式标记为 `clientEntry`，否则无需客户端注水包或笨重的翻译字典。

</Accordion>
<Accordion header="原生支持 AI 智能体与自动化">

Intlayer 将内容声明 (`.content.ts`) 与路由业务逻辑就近同构，大幅减少了大语言模型 (LLM) 所需的 Token 上下文。内置的 CLI 命令如 `intlayer fill` 和 `intlayer test` 允许您在 CI/CD 流水线中以自有 AI 服务商的原始成本实现自动化翻译。

</Accordion>
<Accordion header="可视化编辑器与 CMS 集成">

除了以代码为核心的工作流外，Intlayer 还提供了自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 和 [远程 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)，允许非技术编辑人员和翻译人员更新文案，无需重新部署代码。

</Accordion>
</AccordionGroup>

## 分步指南

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 模板"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看 [应用模板](https://github.com/aymericzip/intlayer-remix-3-template)。

<Steps>
<Step number={1} title="安装依赖">

使用你喜欢的包管理器安装 `intlayer`、`remix-intlayer` 和 `remix`（版本 3）：

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: 核心国际化引擎，负责配置管理、字典声明 (`t()`, `Dictionary`)、CLI 工具和运行时解释器。
- **`remix-intlayer`**：Remix 3 集成：解析每个请求语言环境的 `intlayer()` 路由器中间件，以及在下游任何位置读取它的 `useIntlayer`、`useDictionary` 和 `useLocale` 钩子。
- **`remix-intlayer`**：Remix 3 集成：解析每个请求语言环境的 `intlayer()` 路由器中间件，以及在下游任何位置读取它的 `useIntlayer`、`useDictionary` 和 `useLocale` 钩子。
- **`remix`**: 统一的 Remix 3 框架包，导出 `remix/router`、`remix/routes`、`remix/ui`、`remix/middleware/render` 以及 `remix/node-fetch-server`。

</Step>
<Step number={2} title="配置 Intlayer">

在项目根目录下创建 `intlayer.config.ts`，声明支持的语言及国际化设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 更多配置项说明请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>
<Step number={3} title="声明多语言内容">

在 `.content.ts` 文件中声明本地化内容：

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      zh: "欢迎使用 Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      zh: "基于 Web 标准构建并具备原生多语言支持的组合式应用。",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      zh: "切换语言：",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer 还支持 JSON、YAML 和 CommonJS 声明格式。请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>
<Step number={4} title="构建 Intlayer 字典">

编译字典声明以生成 TypeScript 类型与运行时定义：

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

此操作会将内容编译至 `.intlayer` 产物目录中，提供完整的 TypeScript 自动补全和快速字典查询。

</Step>
<Step number={5} title="添加 Intlayer 中间件">

Remix 3 通过 `createRouter({ middleware: [...] })` 提供可组合的中间件管道。

`remix-intlayer` 提供了 `intlayer()` 中间件。对于每个传入请求，它使用以下内容解析语言环境：

1. 除 `no-prefix` 之外的所有路由模式下的 URL：路径前缀（例如 `/zh` 或 `/en`）或 `?locale=` 查询参数。
2. 客户端持久化的语言环境：存储 Cookie（`INTLAYER_LOCALE`）或自定义标头（`x-intlayer-locale`）。
3. 标准 `Accept-Language` 协商，回退到配置的 `defaultLocale`。

结果作为 `context.intlayer`（或 `context.get(Intlayer)`）存储在 Remix 请求上下文中，包含 `locale`、`defaultLocale` 和 `availableLocales`。中间件随后在绑定到该上下文的 `AsyncLocalStorage` 作用域内运行请求的其余部分，使得该包的钩子无需传递参数即可读取语言环境，无论是在路由处理程序、视图还是 `remix/ui` 组件中：

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// 中间件下游的任何位置
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` 或 `useIntlayer("faq", { item: 2 })` 可在单次调用中覆盖请求语言环境，而 `useDictionary(homeContent)` 读取导入的字典而不是键。在请求之外，钩子会回退到默认语言环境。

> 中间件还会在服务器启动时准备 Intlayer 字典，因此即使缺少 `intlayer build` 也不会导致注册表为空。

</Step>
<Step number={6} title="定义类型安全路由">

使用 `remix/routes` 中的 `route()` 定义应用路由：

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // 默认语言路由
  home: "/",

  // 带有动态 :locale 片段的本地化路由
  localizedHome: "/:locale",
});
```

使用 `route()` 可在整个应用中提供类型安全的 URL 生成支持：

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "zh" }); // "/zh"
```

</Step>
<Step number={7} title="使用 JSX 渲染本地化页面">

Remix 3 使用来自 `remix/ui` 的 JSX 组件渲染 UI。组件是一个接收 `Handle` 并返回**渲染函数**的**设置函数**。设置函数每个实例仅执行一次，渲染函数在每次更新时执行，并通过 `handle.props` 读取属性。

从一个共享的 `Document` 外壳开始，它根据中间件解析的语言环境设置 `<html lang="..." dir="...">` 属性：

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

然后创建主页。它使用 `useIntlayer` 读取本地化字典并渲染语言切换器：

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX 不是 React：`class` 原样书写（也接受 `className`），并且通过 `handle.update()` 显式触发重新渲染。插值会自动转义。Intlayer 钩子是读取请求作用域的普通函数，因此可以从 setup 函数或 render 函数中调用。

</Step>
<Step number={8} title="串联路由器与服务器">

在 Intlayer 中间件旁添加来自 `remix/middleware/render` 的 `render()` 中间件。它会在每个请求上挂载 `context.render(node, init)`，将 JSX 树流式转换为 HTML `Response`（在最前添加 `<!DOCTYPE html>` 并设置 `Content-Type` 请求头）：

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` 接受可选的 `ResponseInit` 作为第二个参数，例如 `context.render(<NotFoundPage />, { status: 404 })`。解析后的语言环境仍可作为 `context.intlayer.locale` 从处理程序访问，例如用于构建 `Response.json` 响应体。

最后，通过标准 `fetch` 处理函数暴露路由器。同一个路由器可无缝运行在 Node.js、Bun、Deno 及 Cloudflare Workers 上：

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="审计并自动填充翻译">

Intlayer 提供 CLI 工具来审计缺失的翻译并借助 AI 自动补充：

```bash packageManager="npm"
# 审计缺失翻译
npx intlayer test

# 使用 AI 填充缺失翻译
npx intlayer fill
```

```bash packageManager="pnpm"
# 审计缺失翻译
pnpm dlx intlayer test

# 使用 AI 填充缺失翻译
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# 审计缺失翻译
yarn dlx intlayer test

# 使用 AI 填充缺失翻译
yarn dlx intlayer fill
```

```bash packageManager="bun"
# 审计缺失翻译
bun x intlayer test

# 使用 AI 填充缺失翻译
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript 配置

将 JSX 指向 `remix/ui` 运行时，并确保您的 `tsconfig.json` 包含生成的 `.intlayer` 类型：

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` 使得 `<HomePage />` 会被解析为 Remix 的 `createElement` 而非 React 的。

## 结论

借助 Remix 3 与 Intlayer，您拥有了一个精简、完全类型安全且具备跨运行时可移植性的现代化技术栈，严格契合开放 Web 标准。无论构建简单的本地化营销页，还是部署在边缘网络的全球分布式服务，您的应用都能轻松从容扩展。
