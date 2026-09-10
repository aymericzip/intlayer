---
createdAt: 2026-09-09
updatedAt: 2026-09-09
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
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 初始文档"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Remix 3 网站 | 国际化 (i18n)

本指南演示了如何将 **Intlayer** 集成到 **Remix 3** 应用中以实现无缝的国际化，涵盖基于语言的路由、类型安全的内容声明、安全的 HTML 模板以及对 Node.js、Bun、Deno 和 Cloudflare Workers 的跨运行时支持。

## 什么是 Remix 3？

**Remix 3** 代表了一次根本性的架构演进，转向**完全构建在 Web 标准之上、可组合且与运行时解耦的 Web 框架**。Remix 3 不再与特定的打包器或专有服务器 API 绑定，而是以单一职责的可组合包形式发布：

- **`remix/fetch-router`** (或 `remix/router`): 基于 Fetch API (`Request` 与 `Response`) 构建的轻量且符合规范的路由。
- **`remix/html-template`**: 具备自动 XSS 防护与片段组合能力的安全性 HTML 模板字符串。
- **`remix/response/html`**: 具有标准 HTTP 语义的 HTML 响应辅助函数。
- **`remix/node-fetch-server`**: Node.js 服务器适配器，原生支持 Bun、Deno 与边缘运行时。
- **`remix/cookie`**: 具备加密安全性的 Cookie 解析与序列化工具。

与 **Intlayer** 结合使用时，您将获得一个完整的国际化系统，提供编译期安全性、自动化 AI 翻译、零额外开销的服务端渲染以及无缝的语言路由。

## 目录

<TOC/>

## 为什么选择 Intlayer 而不是其他方案？

与 `i18next` 等传统方案或自定义翻译加载器相比，Intlayer 提供了专为现代 Web 架构优化的集成化开发者体验：

<AccordionGroup>
<Accordion header="全面支持 Remix 3 和 Web 标准">

Intlayer 原生适配 Web 标准（`Request`、`Response`、`Headers` 和 `URL`）。通过轻量级中间件，它能够无缝融入 Remix 3 的 Fetch 路由器，从 URL 路径、Cookie 或 `Accept-Language` 请求头中提取语言信息，而不会将您绑定在特定运行时上。

</Accordion>
<Accordion header="类型安全的内容声明">

彻底告别零散的 JSON 键和运行时的缺失键崩溃。Intlayer 在所有声明的语言中强制执行 TypeScript 静态类型检查，如果缺少翻译或内容不合法，会在构建时立即发出警告。

</Accordion>
<Accordion header="服务端零打包体积开销">

使用 Remix 3 的服务端渲染 HTML 模板 (`remix/html-template`) 时，仅会将对应请求语言解析后的纯文本写入输出流。除非显式需要，否则无需客户端注水包或笨重的翻译字典。

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

使用您喜欢的包管理器安装 `intlayer` 和 `remix` (第 3 版)：

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: 核心国际化引擎，负责配置管理、字典声明 (`t()`, `Dictionary`)、CLI 工具和运行时解释器。
- **`remix`**: 统一的 Remix 3 框架包，导出 `remix/router`、`remix/routes`、`remix/html-template` 以及 `remix/node-fetch-server`。

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
<Step number={5} title="实现 Intlayer 中间件">

Remix 3 通过 `createRouter({ middleware: [...] })` 提供了可组合的中间件管道。

创建一个 Intlayer 中间件，按以下优先级解析每个请求的目标语言：

1. 通过 Intlayer 的 `getLocaleFromPath` 解析 URL 路径前缀（如 `/zh` 或 `/fr`）。
2. 使用 Intlayer 的 `getLocale` 辅助函数，自动对 Cookie 存储 (`INTLAYER_LOCALE`)、自定义请求头 (`x-intlayer-locale`)、标准 `Accept-Language` 请求头以及配置的 `defaultLocale` 进行协商。

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * 用于从 Remix 3 RequestContext 中获取已解析语言的类型安全上下文键。
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Remix 3 的 Intlayer 中间件。
 *
 * 按照以下优先级解析请求语言：
 * 1. URL 路径前缀（例如 `/zh/...`），通过 `getLocaleFromPath` 获取
 * 2. 存储与请求头协商，通过 `getLocale` 获取（Cookie、自定义请求头、Accept-Language 协商、fallback 回退 defaultLocale）
 *
 * 将解析出的语言附加至 Remix 3 RequestContext。
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // 路径检测 (/zh/about -> "zh", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // 将解析出的语言附加至 Remix 3 请求上下文
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // 将解析出的语言附加至 Remix 3 请求上下文
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

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
<Step number={7} title="渲染本地化 HTML 模板">

Remix 3 使用 `remix/html-template` 进行安全且自动转义的 HTML 生成。创建视图函数，使用 `getIntlayer` 提取本地化字典，设置 `<html lang="..." dir="...">` 属性并展示语言切换器：

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="串联服务器应用">

在 `src/server.ts` 中连接路由器、中间件和路由操作：

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. 使用 Intlayer 中间件初始化路由器
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. 映射路由处理函数
router.map(routes, {
  actions: {
    // 默认语言路由
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // 本地化语言路由
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. 启动服务器
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

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

请确保您的 `tsconfig.json` 包含生成的 `.intlayer` 类型：

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## 结论

借助 Remix 3 与 Intlayer，您拥有了一个精简、完全类型安全且具备跨运行时可移植性的现代化技术栈，严格契合开放 Web 标准。无论构建简单的本地化营销页，还是部署在边缘网络的全球分布式服务，您的应用都能轻松从容扩展。
