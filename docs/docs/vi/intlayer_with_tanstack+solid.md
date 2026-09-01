---
createdAt: 2025-03-25
updatedAt: 2026-08-25
title: "TanStack Start + Solid i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng TanStack Start + Solid đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Đa ngôn ngữ
  - Tài liệu
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Điều hướng theo ngôn ngữ
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "So sánh phân giải tĩnh, động và động có cache cho từ điển metadata trong hàm head của route"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Đã thêm cho Tanstack Start Solid.js"
author: aymericzip
---

# Dịch website Tanstack Start + Solid.js của bạn bằng Intlayer | Đa ngôn ngữ (i18n)

## Mục lục

<TOC/>

Hướng dẫn này trình bày cách tích hợp **Intlayer** để đa ngôn ngữ hóa một cách liền mạch trong các dự án Tanstack Start với Solid.js, điều hướng theo ngôn ngữ (locale-aware routing), hỗ trợ TypeScript và các phương pháp phát triển hiện đại.

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `react-i18next` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Phạm vi bảo hiểm đầy đủ của TanStack Start">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với TanStack Start và Solid bằng cách cung cấp **định tuyến đa ngôn ngữ**, **sơ đồ trang web** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

</Accordion>

<Accordion header="Mở rộng quy mô không có nhà phát triển">

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

---

## Hướng dẫn từng bước thiết lập Intlayer trong ứng dụng Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Tanstack Start? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách đa ngôn ngữ hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) trên GitHub.

<Steps>

<Step number={1} title="Tạo dự án">

Đầu tiên, tạo một dự án TanStack Start mới theo hướng dẫn [Bắt đầu dự án mới](https://tanstack.com/start/latest/docs/framework/solid/quick-start) trên trang web TanStack Start.

</Step>

<Step number={2} title="Cài đặt các gói Intlayer">

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

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

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ đa ngôn ngữ để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển đổi mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **solid-intlayer**
  Gói tích hợp Intlayer vào ứng dụng Solid. Nó cung cấp các context provider và hook cho đa ngôn ngữ trong Solid.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>

<Step number={3} title="Cấu hình dự án của bạn">

Tạo tệp cấu hình để thiết lập các ngôn ngữ trong ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Thông qua tệp cấu hình này, bạn có thể cấu hình các URL đa ngôn ngữ, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt log của Intlayer trong console, v.v. Để biết danh sách đầy đủ các tham số khả dụng, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={4} title="Tích hợp Intlayer vào cấu hình Vite">

Thêm plugin intlayer vào cấu hình của bạn:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để giảm chi phí hiệu năng.

</Step>

<Step number={5} title="Tạo Root Layout">

Cấu hình layout gốc của bạn để hỗ trợ đa ngôn ngữ bằng cách sử dụng `useParams` để phát hiện ngôn ngữ hiện tại và thiết lập các thuộc tính `lang` và `dir` trên thẻ `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Tạo Locale Layout">

Tạo một layout để xử lý tiền tố ngôn ngữ và thực hiện kiểm tra tính hợp lệ. Layout này sẽ đảm bảo chỉ các ngôn ngữ hợp lệ mới được xử lý.

> Bước này là tùy chọn nếu bạn không cần kiểm tra tiền tố ngôn ngữ ở cấp độ route.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Kiểm tra tiền tố ngôn ngữ
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Ở đây, `{-$locale}` là một tham số route động được thay thế bằng ngôn ngữ hiện tại. Ký hiệu này làm cho slot trở thành tùy chọn, cho phép nó hoạt động với các chế độ điều hướng như `'prefix-no-default'`, v.v.

> Hãy lưu ý rằng slot này có thể gây ra sự cố nếu bạn sử dụng nhiều phần động trong cùng một route (ví dụ: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Đối với chế độ `'prefix-all'`, bạn có thể thích chuyển slot thành `$locale`.
> Đối với chế độ `'no-prefix'` hoặc `'search-params'`, bạn có thể xóa hoàn toàn slot này.

</Step>

<Step number={7} title="Khai báo nội dung của bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng, miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./app`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={8} title="Sử dụng các Component và Hook theo ngôn ngữ">

Tạo một component `LocalizedLink` để điều hướng theo ngôn ngữ:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Component này phục vụ hai mục đích:

- Xóa tiền tố `{-$locale}` không cần thiết khỏi URL.
- Chèn tham số ngôn ngữ vào URL để đảm bảo người dùng được chuyển hướng trực tiếp đến route đã được bản địa hóa.

Sau đó, chúng ta có thể tạo một hook `useLocalizedNavigate` để điều hướng bằng lập trình:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Sử dụng Intlayer trong các trang của bạn">

> Hãy dùng **`useIntlayer`** theo mặc định: đây là cách được khuyến nghị để đọc nội dung bên trong component, và trình biên dịch sẽ phân giải nó về đúng locale đang được render. Chỉ dùng `getIntlayer` / `getIntlayerAsync` bên ngoài cây Solid: `head` của route, loader và server function.

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

#### Trang chủ đa ngôn ngữ

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.
>
> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Tạo Component Chuyển đổi Ngôn ngữ">

Tạo một component để cho phép người dùng thay đổi ngôn ngữ:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Trong các tệp Solid, `locale` từ `useLocale` là một **signal accessor**. Sử dụng `locale()` (với dấu ngoặc đơn) để đọc giá trị hiện tại của nó một cách phản ứng.
>
> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Quản lý các thuộc tính HTML">

Như đã thấy ở Bước 5, bạn có thể quản lý các thuộc tính `lang` và `dir` của thẻ `html` bằng cách sử dụng `useParams` trong component gốc của mình. Điều này đảm bảo rằng các thuộc tính chính xác được thiết lập trên cả server và client.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>

<Step number={12} title="Thêm Middleware">

Bạn cũng có thể sử dụng `intlayerProxy` để thêm điều hướng phía server cho ứng dụng của mình. Plugin này sẽ tự động phát hiện ngôn ngữ hiện tại dựa trên URL và thiết lập cookie ngôn ngữ phù hợp. Nếu không có ngôn ngữ nào được chỉ định, plugin sẽ xác định ngôn ngữ phù hợp nhất dựa trên tùy chọn ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được ngôn ngữ nào, nó sẽ chuyển hướng về ngôn ngữ mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

> Kể từ Intlayer v9, `intlayerProxy()` được đóng gói trực tiếp vào plugin `intlayer()` và được bật theo mặc định thông qua tùy chọn `routing.enableProxy` (`true` theo mặc định). Đăng ký riêng như hình dưới đây giờ đây là tùy chọn; nó được giữ lại để tương thích ngược và cho các thiết lập cần kiểm soát thứ tự plugin. Đặt `routing.enableProxy: false` để từ chối. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

</Step>

<Step number={13} title="Đa ngôn ngữ hóa Metadata của bạn">

<Tabs>

<Tab label="Phân giải tĩnh" value="static">

`getIntlayer` phân giải đồng bộ trên từ điển **đã gộp**, tức từ điển chứa mọi locale đã khai báo. `head` vẫn đồng bộ và không phải await gì cả, nhưng toàn bộ từ điển đa ngữ bị kéo vào chunk của route gửi tới trình duyệt.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Phù hợp nhất với từ điển metadata nhỏ, ít locale, hoặc khi đang làm nguyên mẫu.

</Tab>

<Tab label="Phân giải động" value="dynamic">

`getIntlayerAsync` (có sẵn từ **v9.4**) hoạt động giống `getIntlayer`, nhưng plugin build trỏ nó tới chunk theo từng locale trong `.intlayer/dynamic_dictionaries/` thay vì từ điển đã gộp. Nhờ vậy một trang chỉ gửi đúng locale mà nó render. Vì chunk đó được nạp theo yêu cầu, `head` trở thành `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Nếu một `head` đọc nhiều từ điển, hãy phân giải chúng bằng `Promise.all`; await từng `getIntlayerAsync` trên một dòng riêng sẽ khiến các yêu cầu nối đuôi nhau thay vì chạy song song.

Đánh đổi: import động được phân giải trong lúc `head` chạy, nằm trên đường găng của quá trình render tài liệu. Trên một route "nguội", điều này làm `head` trễ vài mili giây và có thể làm **LCP** kém đi đôi chút.

</Tab>

<Tab label="Phân giải động có cache" value="cached">

Hãy phân giải từ điển trong `loader` của route rồi đọc lại từ `loaderData` trong `head`. Loader của các route khớp chạy song song, và `staleTime: Infinity` cho TanStack Router biết kết quả không bao giờ cũ, nhờ đó chunk theo locale chỉ được phân giải một lần rồi phục vụ từ cache của router, giữ cho `head` đồng bộ.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` có thể được gọi trước khi loader hoàn tất, nên `loaderData` được định kiểu là có thể `undefined`. Hãy giữ optional chaining, hoặc trả về một tiêu đề dự phòng.

Bạn giữ được chunk theo locale mà không phải trả giá trên đường găng của `head`. Cái giá là trải nghiệm phát triển: nội dung phải được truyền tường minh từ loader sang `head` qua `loaderData`.

</Tab>

</Tabs>

### Nên chọn cách phân giải nào?

|                        | Phân giải tĩnh             | Phân giải động              | Phân giải động có cache                   |
| ---------------------- | -------------------------- | --------------------------- | ----------------------------------------- |
| API                    | `getIntlayer`              | `getIntlayerAsync` (v9.4+)  | `getIntlayerAsync` trong `loader` (v9.4+) |
| Chữ ký của `head`      | đồng bộ                    | `async`                     | đồng bộ, đọc `loaderData`                 |
| Locale được gửi đi     | mọi locale đã khai báo     | chỉ locale được yêu cầu     | chỉ locale được yêu cầu                   |
| Điều hướng phía client | không có gì phải phân giải | chạy lại mỗi lần khớp route | phục vụ từ cache của router               |
| Trải nghiệm phát triển | đơn giản nhất              | một lệnh `await`            | nội dung truyền qua `loaderData`          |

</Step>

<Step number={14} title="Lấy ngôn ngữ trong các server action của bạn">

Bạn có thể muốn truy cập ngôn ngữ hiện tại từ bên trong các server action hoặc API endpoint của mình.
Bạn có thể làm điều này bằng cách sử dụng helper `getLocale` từ `intlayer`.

Dưới đây là một ví dụ sử dụng các hàm server của TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Lấy cookie từ request (mặc định: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Lấy header từ request (mặc định: 'x-intlayer-locale')
    // Dự phòng bằng cách thương lượng Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Lấy một số nội dung bằng getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={15} title="Quản lý các trang không tìm thấy (404)" isOptional={true}>

Khi một người dùng truy cập vào một trang không tồn tại, bạn có thể hiển thị một trang không tìm thấy tùy chỉnh và tiền tố ngôn ngữ có thể ảnh hưởng đến cách trang không tìm thấy được kích hoạt.

#### Hiểu về cách xử lý 404 của TanStack Router với tiền tố ngôn ngữ

Trong TanStack Router, việc xử lý các trang 404 với các route đa ngôn ngữ yêu cầu một cách tiếp cận nhiều lớp:

1. **Route 404 chuyên dụng**: Một route cụ thể để hiển thị giao diện 404
2. **Kiểm tra cấp độ route**: Kiểm tra tính hợp lệ của tiền tố ngôn ngữ và chuyển hướng các tiền tố không hợp lệ đến trang 404
3. **Catch-all route**: Bắt bất kỳ đường dẫn nào không khớp bên trong phần ngôn ngữ

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Việc này tạo ra một route /[locale]/404 chuyên dụng
// Nó được sử dụng như một route trực tiếp và được import như một component trong các tệp khác
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Được export riêng biệt để có thể tái sử dụng trong notFoundComponent và các catch-all route
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad chạy trước khi route render (cả ở server và client)
  // Đây là nơi lý tưởng để kiểm tra tiền tố ngôn ngữ
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix kiểm tra xem ngôn ngữ có hợp lệ theo cấu hình intlayer của bạn không
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Tiền tố ngôn ngữ không hợp lệ - chuyển hướng đến trang 404 với tiền tố ngôn ngữ hợp lệ
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent được gọi khi một route con không tồn tại
  // ví dụ: /en/trang-khong-ton-tai sẽ kích hoạt điều này bên trong layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Route $ (splat/catch-all) khớp với bất kỳ đường dẫn nào không khớp với các route khác
// ví dụ: /en/some/deeply/nested/invalid/path
// Việc này đảm bảo TẤT CẢ các đường dẫn không khớp bên trong một ngôn ngữ đều hiển thị trang 404
// Nếu không có điều này, các đường dẫn sâu không khớp có thể hiển thị trang trắng hoặc lỗi
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="Trích xuất nội dung từ các component của bạn" isOptional={true}>

Nếu bạn có một codebase hiện tại, việc chuyển đổi hàng nghìn tệp có thể tốn nhiều thời gian.

Để giảm bớt quá trình này, Intlayer đề xuất một [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các component và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` trong tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Phần cấu hình còn lại của bạn
  compiler: {
    /**
     * Cho biết compiler có được bật hay không.
     */
    enabled: true,

    /**
     * Định nghĩa đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết các component có nên được lưu sau khi được chuyển đổi hay không.
     *
     * - Nếu `true`, compiler sẽ ghi đè tệp component trên đĩa. Do đó, quá trình chuyển đổi sẽ là vĩnh viễn và compiler sẽ bỏ qua chuyển đổi cho quá trình tiếp theo. Bằng cách này, compiler có thể chuyển đổi ứng dụng và sau đó nó có thể được gỡ bỏ.
     *
     * - Nếu `false`, compiler sẽ chỉ chèn lệnh gọi hàm `useIntlayer()` vào code trong output build, giữ nguyên codebase gốc. Quá trình chuyển đổi sẽ chỉ được thực hiện trong bộ nhớ.
     */
    saveComponents: false,

    /**
     * Tiền tố phím từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Lệnh extract'>

Chạy extractor để chuyển đổi các component và trích xuất nội dung

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Hoặc pnpm run dev
```

```bash packageManager="yarn"
yarn build # Hoặc yarn dev
```

```bash packageManager="bun"
bun run build # Hoặc bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Pre-render & Generate Sitemap">

Intlayer đi kèm với một trình tạo sitemap tích hợp để giúp bạn tạo sitemap cho ứng dụng của mình một cách dễ dàng. Nó xử lý các tuyến đường được bản địa hóa và thêm siêu dữ liệu cần thiết cho các công cụ tìm kiếm.

> Bản đồ trang web được tạo bởi Intlayer hỗ trợ không gian tên `xhtml:link` (Hreflang XML Extensions). Khác với các trình tạo bản đồ trang web mặc định chỉ liệt kê các URL thô, Intlayer tự động tạo các liên kết lưỡng chiều cần thiết giữa tất cả các phiên bản ngôn ngữ của một trang (ví dụ: `/about`, `/about?lang=fr` và `/about?lang=es`). Điều này đảm bảo các công cụ tìm kiếm lập chỉ mục chính xác và cung cấp phiên bản ngôn ngữ phù hợp cho đúng đối tượng.

Để sử dụng nó, trước tiên bạn cần cấu hình `vite.config.ts` của mình để kích hoạt pre-rendering cho các route được địa phương hóa của bạn và vô hiệu hóa việc tạo sitemap mặc định của TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... các import khác

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... các plugin khác
    tanstackStart({
      // ... cấu hình khác
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Sau đó, tạo một route `src/routes/sitemap[.]xml.ts` sử dụng hàm `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="Cấu hình TypeScript">

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và giúp codebase của bạn mạnh mẽ hơn.

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tạo tự động:

```json5 fileName="tsconfig.json"
{
  // ... các thiết lập hiện tại của bạn
  include: [
    // ... các include hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu dữ liệu được tạo tự động
  ],
}
```

</Step>

</Steps>

### Cấu hình Git

Khuyên bạn nên bỏ qua các tệp do Intlayer tạo ra. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để thực hiện việc này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---

## Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các phím bản dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước bản dịch** nội dung ngay trong code (inline).
- **Các tác vụ nhanh** để tạo và cập nhật các bản dịch một cách dễ dàng.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Đi xa hơn

Để tìm hiểu sâu hơn, bạn có thể triển khai [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc bên ngoài hóa nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

## Các tài liệu tham khảo

- [Tài liệu Intlayer](https://intlayer.org)
- [Tài liệu Tanstack Start](https://tanstack.com/start/latest)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useLocale.md)
- [Khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng TanStack Start và Solid?">

TanStack Start không có lớp i18n riêng:

- **`@solid-primitives/i18n`**: từ điển đơn giản với hỗ trợ SSR hạn chế.
- **`Intlayer`**: hỗ trợ SSR và SSG, signal của Solid, tối ưu hóa build time, dịch thuật AI và visual editor.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle TanStack Start của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng, và [từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ @solid-primitives/i18n hoặc i18next mà không cần viết lại component không?">

Phần lớn là có. Làm theo [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công.

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build: quét mã nguồn trên mỗi thay đổi, tạo từ điển và đồng bộ hóa với HMR.

Hai giới hạn đáng lưu ý trước khi bạn bật compiler. Nó hoạt động bằng phân tích tĩnh, do đó các chuỗi chỉ tồn tại khi runtime, chẳng hạn như mã lỗi API hoặc các trường CMS, nằm ngoài phạm vi tiếp cận. Và nó phải phân biệt văn bản hiển thị cho người dùng với logic ứng dụng như `className="active"` hoặc mã trạng thái, điều này cần một vài chú thích trong một codebase lớn. [Lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) tránh cả hai điều này bằng cách giữ bạn luôn kiểm soát.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Intlayer có cung cấp hỗ trợ server side rendering và SSG không?">

Có. Nội dung được giải quyết trong quá trình SSR, và bước 16 bao gồm việc tạo các tài liệu tĩnh cho mỗi ngôn ngữ.

</Question>

<Question title="Việc chuyển đổi ngôn ngữ có làm re-render toàn bộ ứng dụng không?">

Không. Signal của Solid chỉ cập nhật các DOM node văn bản thay đổi mà không re-render toàn bộ cây component.

</Question>

<Question title="Làm cách nào để thêm thẻ hreflang và sitemap được bản địa hóa?">

Sử dụng hàm `generateSitemap` trong tuyến đường `src/routes/sitemap[.]xml.ts`, tạo namespace `xhtml:link` cho mỗi ngôn ngữ.

</Question>

<Question title="Làm cách nào để xử lý các trang 404 trên các tuyến đường được bản địa hóa?">

Bước 14 giải thích điều này. `validatePrefix` xác thực locale trong URL, trả về 404 cho các ngôn ngữ không xác định.

</Question>

<Question title="Tôi có bắt buộc phải đưa locale vào URL không?">

Không. Tham số `routing.mode` hỗ trợ `"prefix-no-default"` (mặc định), `"prefix-all"`, `"no-prefix"`, và `"search-params"`.

</Question>

<Question title="Làm cách nào để tạo bộ chuyển đổi ngôn ngữ giữ nguyên tuyến đường hiện tại?">

Bước 9 minh họa component. `useLocale` cung cấp ngôn ngữ đang hoạt động và hàm setter để duy trì đường dẫn khi chuyển đổi.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. Lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn sử dụng provider và API key của riêng bạn, và `--git-diff` giới hạn thao tác ở các tệp đã thay đổi. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
