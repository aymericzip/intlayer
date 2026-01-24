---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Cách dịch ứng dụng Tanstack Start của bạn – hướng dẫn i18n 2026
description: Tìm hiểu cách thêm quốc tế hóa (i18n) vào ứng dụng Tanstack Start của bạn bằng cách sử dụng Intlayer. Theo dõi hướng dẫn toàn diện này để làm cho ứng dụng của bạn đa ngôn ngữ với định tuyến nhận biết locale.
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
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 7.4.0
    date: 2025-12-11
    changes: Giới thiệu validatePrefix và thêm bước 14: Xử lý trang 404 với các tuyến đường được bản địa hóa.
  - version: 7.3.9
    date: 2025-12-05
    changes: Thêm bước 13: Lấy locale trong server actions của bạn (Tùy chọn)
  - version: 7.2.3
    date: 2025-11-18
    changes: Thêm bước 13: Thích ứng Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Sửa prefix mặc định bằng cách thêm hàm getPrefix useLocalizedNavigate, LocaleSwitcher và LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Cập nhật tài liệu
  - version: 5.8.1
    date: 2025-09-09
    changes: Thêm cho Tanstack Start
---

# Dịch trang web Tanstack Start của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

Hướng dẫn này trình bày cách tích hợp **Intlayer** để thực hiện quốc tế hóa liền mạch trong các dự án Tanstack Start với định tuyến nhận biết locale, hỗ trợ TypeScript và các thực hành phát triển hiện đại.

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng từ điển khai báo ở cấp thành phần.
- **Định vị động metadata**, các tuyến đường và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.
- **Kích hoạt định tuyến nhận biết locale** với hệ thống định tuyến dựa trên file của Tanstack Start.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Giải pháp i18n tốt nhất cho Tanstack Start? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu Ứng dụng](https://github.com/aymericzip/intlayer-tanstack-start-template) trên GitHub.

### Bước 1: Tạo Dự Án

Bắt đầu bằng cách tạo một dự án TanStack Start mới theo hướng dẫn [Bắt đầu dự án mới](https://tanstack.com/start/latest/docs/framework/react/quick-start) trên trang web TanStack Start.

### Bước 2: Cài Đặt Các Gói Intlayer

Cài đặt các gói cần thiết bằng trình quản lý gói bạn ưa thích:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/get_started.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 3: Cấu hình dự án của bạn

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

### Bước 4: Tích hợp Intlayer vào Cấu hình Vite của Bạn

Thêm plugin intlayer vào cấu hình của bạn:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hiệu suất.

### Bước 5: Tạo Root Layout

Cấu hình root layout của bạn để hỗ trợ quốc tế hóa bằng cách sử dụng `useMatches` để phát hiện locale hiện tại và đặt các thuộc tính `lang` và `dir` trên thẻ `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Thử tìm locale trong params của bất kỳ match đang hoạt động nào
  // Điều này giả định bạn sử dụng segment động "/{-$locale}" trong cây route của mình
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

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

### Bước 6: Tạo Layout Locale

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

### Bước 7: Khai Báo Nội Dung Của Bạn

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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./app`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/get_started.md).

### Bước 8: Tạo các Component và Hook nhận biết Locale

Tạo một component `LocalizedLink` để điều hướng nhận biết locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Tiện ích chính
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Các hàm trợ giúp
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

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
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

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

### Bước 9: Sử dụng Intlayer trong các Trang của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

#### Trang Chủ Đã Được Địa Phương Hóa

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
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

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md).

### Bước 10: Tạo một Thành phần Chuyển đổi Ngôn ngữ

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

### Bước 11: Quản lý Thuộc tính HTML

Như đã thấy trong Bước 5, bạn có thể quản lý các thuộc tính `lang` và `dir` của thẻ `html` bằng cách sử dụng `useMatches` trong component gốc của bạn. Điều này đảm bảo các thuộc tính được đặt đúng trên server và client.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Thử tìm locale trong params của bất kỳ match đang hoạt động nào
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Bước 12: Thêm middleware (Tùy chọn)

Bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server vào ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy nên được đặt trước server nếu bạn sử dụng Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Bước 13: Quốc tế hóa siêu dữ liệu của bạn (Tùy chọn)

Bạn cũng có thể sử dụng hook `getIntlayer` để truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Bước 14: Lấy locale trong server actions của bạn (Tùy chọn)

Bạn có thể muốn truy cập locale hiện tại từ bên trong server actions hoặc API endpoints của mình.
Bạn có thể làm điều này bằng cách sử dụng helper `getLocale` từ `intlayer`.

Đây là một ví dụ sử dụng server functions của TanStack Start:

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

  // Lấy một số nội dung bằng getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Bước 15: Quản lý trang không tìm thấy (Tùy chọn)

Khi người dùng truy cập một trang không tồn tại, bạn có thể hiển thị một trang không tìm thấy tùy chỉnh và tiền tố locale có thể ảnh hưởng đến cách trang không tìm thấy được kích hoạt.

#### Hiểu về xử lý 404 của TanStack Router với tiền tố locale

Trong TanStack Router, xử lý các trang 404 với các route đã được bản địa hóa yêu cầu một cách tiếp cận nhiều lớp:

1. **Route 404 chuyên dụng**: Một route cụ thể để hiển thị giao diện 404
2. **Xác thực cấp route**: Xác thực các tiền tố locale và chuyển hướng các tiền tố không hợp lệ đến 404
3. **Route catch-all**: Bắt tất cả các đường dẫn không khớp trong phân đoạn locale

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Điều này tạo một tuyến đường /[locale]/404 chuyên dụng
// Nó được sử dụng cả như một tuyến đường trực tiếp và được nhập như một thành phần trong các tệp khác
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Xuất riêng để có thể tái sử dụng trong notFoundComponent và các tuyến catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad chạy trước khi route được render (trên cả server và client)
  // Đây là nơi lý tưởng để xác thực tiền tố locale
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix kiểm tra xem locale có hợp lệ theo cấu hình intlayer của bạn không
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Tiền tố locale không hợp lệ - chuyển hướng đến trang 404 với tiền tố locale hợp lệ
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent được gọi khi một route con không tồn tại
  // ví dụ: /en/trang-khong-ton-tai kích hoạt điều này trong layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Tuyến đường $ (splat/catch-all) khớp với bất kỳ đường dẫn nào không khớp với các tuyến đường khác
// ví dụ: /en/mot/duong/dan/sau/long/khong-hop-le
// Điều này đảm bảo TẤT CẢ các đường dẫn không khớp trong một locale hiển thị trang 404
// Nếu không có điều này, các đường dẫn sâu không khớp có thể hiển thị trang trống hoặc lỗi
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Bước 16: Cấu hình TypeScript (Tùy chọn)

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động:

```json5 fileName="tsconfig.json"
{
  // ... các cấu hình hiện có của bạn
  include: [
    // ... các include hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

---

### Cấu hình Git

Khuyến nghị bạn nên bỏ qua các file được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào file `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

---

## Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---

## Tham khảo Tài liệu

- [Intlayer Tài liệu](https://intlayer.org)
- [Tanstack Start Tài liệu](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)
- [Khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/get_started.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
