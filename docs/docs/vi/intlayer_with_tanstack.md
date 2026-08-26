---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng TanStack Start đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Định tuyến theo Locale
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "So sánh phân giải tĩnh, động và động có cache cho từ điển metadata trong hàm head của route"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Giới thiệu validatePrefix và thêm bước 14: Xử lý trang 404 với các tuyến đường được bản địa hóa."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Thêm bước 13: Lấy locale trong server actions của bạn (Tùy chọn)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Thêm bước 13: Thích ứng Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Sửa prefix mặc định bằng cách thêm hàm getPrefix useLocalizedNavigate, LocaleSwitcher và LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Cập nhật tài liệu"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Thêm cho Tanstack Start"
author: aymericzip
---

# Dịch trang web Tanstack Start của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

Hướng dẫn này trình bày cách tích hợp **Intlayer** để thực hiện quốc tế hóa liền mạch trong các dự án Tanstack Start với định tuyến nhận biết locale, hỗ trợ TypeScript và các thực hành phát triển hiện đại.

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `react-i18next` hay `use-intl`, hay `paraglide`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>

<Accordion header="Phạm vi bảo hiểm đầy đủ của TanStack Start">

Intlayer được tối ưu hóa hoàn toàn cho TanStack Start, cung cấp **định tuyến đa ngôn ngữ**, **quản lý cookie**, **tạo sơ đồ trang web**, **tải nội dung động** và tất cả các tính năng cần thiết để mở rộng nỗ lực quốc tế hóa (i18n) của bạn.

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

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Tanstack Start? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu Ứng dụng](https://github.com/aymericzip/intlayer-tanstack-start-template) trên GitHub.

<Steps>

<Step number={1} title="Tạo Dự Án">

Bắt đầu bằng cách tạo một dự án TanStack Start mới theo hướng dẫn [Bắt đầu dự án mới](https://tanstack.com/start/latest/docs/framework/react/quick-start) trên trang web TanStack Start.

</Step>

<Step number={2} title="Cài Đặt Các Gói Intlayer">

Cài đặt các gói cần thiết bằng trình quản lý gói bạn ưa thích:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>

<Step number={3} title="Cấu hình dự án của bạn">

Tạo một file cấu hình để cấu hình các ngôn ngữ cho ứng dụng của bạn:

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

> Thông qua file cấu hình này, bạn có thể thiết lập URL theo ngôn ngữ, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={4} title="Tích hợp Intlayer vào Cấu hình Vite của Bạn">

Thêm plugin intlayer vào cấu hình của bạn:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
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
    viteReact(),
  ],
});

export default config;
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hiệu suất.

</Step>

<Step number={5} title="Tạo Root Layout">

Cấu hình root layout của bạn để hỗ trợ quốc tế hóa bằng cách sử dụng `useParams` để phát hiện locale hiện tại và đặt các thuộc tính `lang` và `dir` trên thẻ `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="Tạo Layout Locale">

Tạo một layout xử lý tiền tố locale và thực hiện xác thực.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Xác thực tiền tố locale
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Ở đây, `{-$locale}` là một tham số route động được thay thế bằng locale hiện tại. Ký hiệu này làm cho slot trở nên tùy chọn, cho phép nó hoạt động với các chế độ định tuyến như `'prefix-no-default'` v.v.

> Lưu ý rằng slot này có thể gây ra vấn đề nếu bạn sử dụng nhiều segment động trong cùng một route (ví dụ: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Đối với chế độ `'prefix-all'`, bạn có thể muốn chuyển slot thành `$locale` thay thế.
> Đối với chế độ `'no-prefix'` hoặc `'search-params'`, bạn có thể xóa hoàn toàn slot.

</Step>

<Step number={7} title="Khai Báo Nội Dung Của Bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./app`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={8} title="Tạo các Component và Hook nhận biết Locale">

Tạo một component `LocalizedLink` để điều hướng nhận biết locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Component này có hai mục tiêu:

- Loại bỏ tiền tố `{-$locale}` không cần thiết khỏi URL.
- Tiêm tham số locale vào URL để đảm bảo người dùng được chuyển hướng trực tiếp đến route đã được địa phương hóa.

Sau đó, chúng ta có thể tạo một hook `useLocalizedNavigate` để điều hướng theo lập trình:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Sử dụng Intlayer trong các Trang của Bạn">

> Hãy dùng **`useIntlayer`** theo mặc định: đây là cách được khuyến nghị để đọc nội dung bên trong component, và trình biên dịch sẽ phân giải nó về đúng locale đang được render. Chỉ dùng `getIntlayer` / `getIntlayerAsync` bên ngoài cây React: `head` của route, loader và server function.

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

#### Trang Chủ Được Bản Địa Hóa

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn có thể sử dụng giá trị của hàm, như:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Tạo Thành Phần Chuyển Đổi Ngôn Ngữ">

Tạo một thành phần để cho phép người dùng thay đổi ngôn ngữ:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Locale - ví dụ FR */}
              {localeEl}
            </span>
            <span>
              {/* Ngôn ngữ trong Locale của chính nó - ví dụ Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ Francés khi Locale hiện tại được đặt thành Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ trong tiếng Anh - ví dụ French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Quản Lý Thuộc Tính HTML">

Như đã thấy trong Bước 5, bạn có thể quản lý các thuộc tính `lang` và `dir` của thẻ `html` bằng cách sử dụng `useParams` trong thành phần gốc của mình. Điều này đảm bảo rằng các thuộc tính chính xác được đặt trên máy chủ và máy khách.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Thêm middleware">

Bạn cũng có thể sử dụng `intlayerProxy` để thêm định tuyến phía máy chủ vào ứng dụng của mình. Plugin này sẽ tự động phát hiện ngôn ngữ hiện tại dựa trên URL và đặt cookie ngôn ngữ thích hợp. Nếu không có ngôn ngữ nào được chỉ định, plugin sẽ xác định ngôn ngữ phù hợp nhất dựa trên tùy chọn ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được ngôn ngữ nào, nó sẽ chuyển hướng đến ngôn ngữ mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong production, bạn cần chuyển package `vite-intlayer` từ `devDependencies` sang `dependencies`.

> Kể từ Intlayer v9, `intlayerProxy()` được bao gồm trực tiếp trong plugin `intlayer()` và được bật theo mặc định thông qua tùy chọn `routing.enableProxy` (`true` theo mặc định). Đăng ký nó riêng như hình dưới đây giờ đây là tùy chọn: nó được giữ lại để tương thích ngược và cho các thiết lập cần kiểm soát thứ tự plugin. Đặt `routing.enableProxy: false` để từ chối. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Bản Địa Hóa Metadata của Bạn">

<Tabs>

<Tab label="Phân giải tĩnh" value="static">

`getIntlayer` phân giải đồng bộ dựa trên từ điển **đã hợp nhất**, từ điển chứa mọi ngôn ngữ được khai báo. `head` vẫn đồng bộ và không có gì bị chờ đợi, nhưng toàn bộ từ điển đa ngôn ngữ được kéo vào phần tuyến đường được gửi đến trình duyệt.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // Đường dẫn cho tuyến đường này

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Liên kết chính tắc: Trỏ đến trang được bản địa hóa hiện tại
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Thông báo cho Google về tất cả các phiên bản được bản địa hóa
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Cho người dùng ở các ngôn ngữ không phù hợp
        // Xác định ngôn ngữ dự phòng mặc định (thường là ngôn ngữ chính của bạn)
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

Tốt nhất cho các từ điển metadata nhỏ, một số ngôn ngữ, hoặc trong khi tạo mẫu.

</Tab>

<Tab label="Phân giải động" value="dynamic">

`getIntlayerAsync` (có sẵn từ **v9.4**) hoạt động như `getIntlayer`, nhưng plugin xây dựng chỉ nó đến phần theo ngôn ngữ trong `.intlayer/dynamic_dictionaries/` thay vì từ điển đã hợp nhất. Do đó, một trang chỉ vận chuyển ngôn ngữ nó kết xuất. Vì phần đó được tải theo yêu cầu, `head` trở thành `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // Đường dẫn cho tuyến đường này

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Liên kết chính tắc: Trỏ đến trang được bản địa hóa hiện tại
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Thông báo cho Google về tất cả các phiên bản được bản địa hóa
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Cho người dùng ở các ngôn ngữ không phù hợp
        // Xác định ngôn ngữ dự phòng mặc định (thường là ngôn ngữ chính của bạn)
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

> Nếu `head` đọc nhiều từ điển, hãy giải quyết chúng với `Promise.all`: chờ từng `getIntlayerAsync` trên dòng riêng của nó sẽ kết chuỗi các yêu cầu thay vì chạy chúng song song.

Sự cân bằng: nhập động được phân giải trong khi `head` chạy, trên đường dẫn quan trọng của kết xuất tài liệu. Trên một tuyến đường lạnh, điều này làm trễ head một vài mili giây và có thể làm giảm nhẹ **LCP**.

</Tab>

<Tab label="Phân giải động được lưu trong bộ nhớ cache" value="cached">

Giải quyết từ điển trong `loader` tuyến đường và đọc lại từ `loaderData` trong `head`. Loaders của các tuyến đường khớp chạy song song, và `staleTime: Infinity` cho TanStack Router biết rằng kết quả không bao giờ cũ, vì vậy phần theo ngôn ngữ được giải quyết một lần và được phục vụ từ bộ nhớ cache của router sau đó, để `head` đồng bộ.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Được giải quyết song song với các tuyến đường khớp khác, không ngoài đường dẫn quan trọng của head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Từ điển không bao giờ thay đổi cho một ngôn ngữ nhất định: giải quyết phần một lần
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Đường dẫn cho tuyến đường này

    return {
      links: [
        // Liên kết chính tắc: Trỏ đến trang được bản địa hóa hiện tại
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Thông báo cho Google về tất cả các phiên bản được bản địa hóa
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Cho người dùng ở các ngôn ngữ không phù hợp
        // Xác định ngôn ngữ dự phòng mặc định (thường là ngôn ngữ chính của bạn)
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

> `head` có thể được gọi trước khi loader hoàn thành, vì vậy `loaderData` được gõ là có thể `undefined`. Giữ tùy chọn chaining, hoặc trả về tiêu đề dự phòng.

Bạn giữ phần theo ngôn ngữ mà không phải trả giá của nó trên đường dẫn quan trọng của head. Giá là trải nghiệm nhà phát triển: nội dung phải được luồng rõ ràng từ loader đến `head` thông qua `loaderData`.

</Tab>

</Tabs>

### Tôi nên chọn độ phân giải nào?

|                      | Độ phân giải tĩnh     | Độ phân giải động          | Độ phân giải động được lưu cache       |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

---

</Step>

<Step number={13} title="Truy xuất locale trong các server actions của bạn">

Bạn có thể muốn truy cập locale hiện tại từ bên trong các server actions hoặc API endpoints của mình.
Bạn có thể thực hiện điều này bằng cách sử dụng helper `getLocale` từ `intlayer`.

Đây là một ví dụ sử dụng các server functions của TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Lấy cookie từ request (mặc định: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Lấy header từ request (mặc định: 'x-intlayer-locale')
    // Fallback sử dụng Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Truy xuất một số nội dung sử dụng getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Quản lý các trang không tìm thấy">

Khi một người dùng truy cập một trang không tồn tại, bạn có thể hiển thị một trang không tìm thấy tùy chỉnh và tiền tố locale có thể ảnh hưởng đến cách trang không tìm thấy được kích hoạt.

#### Trang Chủ Đã Được Địa Phương Hóa

> Nếu bạn muốn sử dụng nội dung của bạn trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn có thể sử dụng giá trị của hàm, như:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md).

</Step>

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Mã ngôn ngữ - ví dụ: FR */}
              {localeEl}
            </span>
            <span>
              {/* Ngôn ngữ theo mã ngôn ngữ của chính nó - ví dụ: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Ngôn ngữ theo mã ngôn ngữ hiện tại - ví dụ: Francés khi mã ngôn ngữ hiện tại là Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Để tìm hiểu thêm về hook `useLocale`, tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md).

</Step>

<Step number={11} title="Quản lý Thuộc tính HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Nếu một `head` đọc nhiều từ điển, hãy phân giải chúng bằng `Promise.all`; await từng `getIntlayerAsync` trên một dòng riêng sẽ khiến các yêu cầu nối đuôi nhau thay vì chạy song song.

Đánh đổi: import động được phân giải trong lúc `head` chạy, nằm trên đường găng của quá trình render tài liệu. Trên một route "nguội", điều này làm `head` trễ vài mili giây và có thể làm **LCP** kém đi đôi chút.

</Tab>

<Tab label="Phân giải động có cache" value="cached">

Hãy phân giải từ điển trong `loader` của route rồi đọc lại từ `loaderData` trong `head`. Loader của các route khớp chạy song song, và `staleTime: Infinity` cho TanStack Router biết kết quả không bao giờ cũ, nhờ đó chunk theo locale chỉ được phân giải một lần rồi phục vụ từ cache của router, giữ cho `head` đồng bộ.

```tsx fileName="src/routes/{-$locale}/index.tsx"
      return getCookie(name, cookieString);
    },
    // Lấy header từ request (mặc định: 'x-intlayer-locale')
    // Fallback sử dụng Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Lấy một số nội dung bằng getIntlayer()
  const content = getIntlayer("app", locale);

````

---

</Step>

<Step number={15} title="Quản lý trang không tìm thấy">

Khi người dùng truy cập một trang không tồn tại, bạn có thể hiển thị một trang không tìm thấy tùy chỉnh và tiền tố locale có thể ảnh hưởng đến cách trang không tìm thấy được kích hoạt.

#### Hiểu về xử lý 404 của TanStack Router với tiền tố locale

Trong TanStack Router, xử lý các trang 404 với các route đã được bản địa hóa yêu cầu một cách tiếp cận nhiều lớp:

1. **Route 404 chuyên dụng**: Một route cụ thể để hiển thị giao diện 404
2. **Xác thực cấp route**: Xác thực các tiền tố locale và chuyển hướng các tiền tố không hợp lệ đến 404
3. **Route catch-all**: Bắt tất cả các đường dẫn không khớp trong phân đoạn locale

```tsx fileName="src/routes/{-$locale}/404.tsx"

```

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"

```

</Step>

<Step number={1} title="Trích xuất nội dung các thành phần của bạn" isOptional={true}>

Nếu bạn có một cơ sở mã hiện có, việc chuyển đổi hàng nghìn tệp có thể tốn nhiều thời gian.

Để đơn giản hóa quy trình này, Intlayer đề xuất một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [trình trích xuất](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các thành phần của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` vào tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Xác định đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Lệnh trích xuất'>

Chạy trình trích xuất để chuyển đổi các thành phần và trích xuất nội dung

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

---

I'm ready to audit and translate the Vietnamese content. Please provide **BLOCK 3 of 4** in English (en) as the reference, followed by **BLOCK 3 of 4** in Vietnamese (vi) that needs to be reviewed and updated.

I will then:
1. Compare the Vietnamese version against the English source
2. Insert any missing content
3. Fix spelling, grammar, and Markdown errors
4. Keep code blocks in their original language with translated comments
5. Return the complete, updated Vietnamese file content between `` and `` markers

Waiting for your content blocks.---

bun run build # Or bun run dev
import { localeFlatMap } from "intlayer";
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

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

</Step>

<Step number={17} title="Cấu hình TypeScript">

Tôi sẵn sàng để kiểm tra và cập nhật bản dịch tiếng Việt. Tuy nhiên, tôi chưa nhận được nội dung cần kiểm tra.

Vui lòng cung cấp:

1. **BLOCK 4 of 4** - Nội dung hiện tại bằng tiếng Việt (vi) cần được kiểm tra
2. Nếu cần thiết, vui lòng cung cấp lại **BLOCK 4 of 4** - Nội dung tham chiếu bằng tiếng Anh (en)

Vui lòng gửi nội dung để tôi tiếp tục.---

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
{
  // ... những cấu hình hiện tại của bạn
  include: [
    // ... những include hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động tạo
  ],
}

### Cấu hình Git

Bạn nên bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
````

---

## VS Code Extension

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Extension này cung cấp:

- **Autocompletion** cho các khóa dịch.
- **Phát hiện lỗi real-time** cho các bản dịch bị thiếu.
- **Inline previews** của nội dung được dịch.
- **Quick actions** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng extension, hãy tham khảo [tài liệu Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Đi Xa Hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc ngoại hóa nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

## Tài liệu tham khảo

- [Tài liệu Intlayer](https://intlayer.org)
- [Tài liệu Tanstack Start](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
