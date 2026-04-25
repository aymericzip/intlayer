---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: i18n Tanstack Start - Cách dịch ứng dụng Tanstack Start sử dụng Solid.js vào năm 2026
description: Tìm hiểu cách thêm đa ngôn ngữ (i18n) vào ứng dụng Tanstack Start của bạn bằng Intlayer và Solid.js. Làm theo hướng dẫn toàn diện này để tạo ứng dụng đa ngôn ngữ với điều hướng theo ngôn ngữ.
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
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Đã thêm cho Tanstack Start Solid.js"
---

# Dịch website Tanstack Start + Solid.js của bạn bằng Intlayer | Đa ngôn ngữ (i18n)

## Mục lục

<TOC/>

Hướng dẫn này trình bày cách tích hợp **Intlayer** để đa ngôn ngữ hóa một cách liền mạch trong các dự án Tanstack Start với Solid.js, điều hướng theo ngôn ngữ (locale-aware routing), hỗ trợ TypeScript và các phương pháp phát triển hiện đại.

## Intlayer là gì?

**Intlayer** là một thư viện đa ngôn ngữ (i18n) sáng tạo, mã nguồn mở được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng** bằng các từ điển khai báo ở cấp độ component.
- **Bản địa hóa metadata, route và nội dung một cách linh hoạt**.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu dữ liệu được tạo tự động, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Hưởng lợi từ các tính năng nâng cao**, chẳng hạn như tự động phát hiện và chuyển đổi ngôn ngữ.
- **Kích hoạt điều hướng theo ngôn ngữ** với hệ thống điều hướng dựa trên tệp tin của Tanstack Start.

---

## Hướng dẫn từng bước thiết lập Intlayer trong ứng dụng Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Giải pháp i18n tốt nhất cho Tanstack Start? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách đa ngôn ngữ hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) trên GitHub.

### Bước 1: Tạo dự án

Đầu tiên, tạo một dự án TanStack Start mới theo hướng dẫn [Bắt đầu dự án mới](https://tanstack.com/start/latest/docs/framework/solid/quick-start) trên trang web TanStack Start.

### Bước 2: Cài đặt các gói Intlayer

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ đa ngôn ngữ để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển đổi mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **solid-intlayer**
  Gói tích hợp Intlayer vào ứng dụng Solid. Nó cung cấp các context provider và hook cho đa ngôn ngữ trong Solid.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 3: Cấu hình dự án của bạn

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

### Bước 4: Tích hợp Intlayer vào cấu hình Vite

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để giảm chi phí hiệu năng.

### Bước 5: Tạo Root Layout

Cấu hình layout gốc của bạn để hỗ trợ đa ngôn ngữ bằng cách sử dụng `useParams` để phát hiện ngôn ngữ hiện tại và thiết lập các thuộc tính `lang` và `dir` trên thẻ `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
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

### Bước 6: Tạo Locale Layout (Tùy chọn)

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

### Bước 7: Khai báo nội dung của bạn

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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng, miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./app`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 8: Sử dụng các Component và Hook theo ngôn ngữ

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

### Bước 9: Sử dụng Intlayer trong các trang của bạn

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
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> Trong Solid, `useIntlayer` trả về một hàm **accessor** (ví dụ: `content()`). Bạn phải gọi hàm này để truy cập nội dung phản ứng.
>
> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useIntlayer.md).

### Bước 10: Tạo Component Chuyển đổi Ngôn ngữ

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

### Bước 11: Quản lý các thuộc tính HTML

Như đã thấy ở Bước 5, bạn có thể quản lý các thuộc tính `lang` và `dir` của thẻ `html` bằng cách sử dụng `useParams` trong component gốc của mình. Điều này đảm bảo rằng các thuộc tính chính xác được thiết lập trên cả server và client.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Bước 12: Thêm Middleware (Tùy chọn)

Bạn cũng có thể sử dụng `intlayerProxy` để thêm điều hướng phía server cho ứng dụng của mình. Plugin này sẽ tự động phát hiện ngôn ngữ hiện tại dựa trên URL và thiết lập cookie ngôn ngữ phù hợp. Nếu không có ngôn ngữ nào được chỉ định, plugin sẽ xác định ngôn ngữ phù hợp nhất dựa trên tùy chọn ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được ngôn ngữ nào, nó sẽ chuyển hướng về ngôn ngữ mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy phải được đặt trước server nếu bạn sử dụng Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Bước 13: Đa ngôn ngữ hóa Metadata của bạn (Tùy chọn)

Bạn cũng có thể sử dụng hàm `getIntlayer` để truy cập các từ điển nội dung của mình trong hàm load `head` cho metadata theo ngôn ngữ:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
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

---

### Bước 14: Lấy ngôn ngữ trong các server action của bạn (Tùy chọn)

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

---

### Bước 15: Quản lý các trang không tìm thấy (404) (Tùy chọn)

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

### (Tùy chọn) Bước 16: Trích xuất nội dung từ các component của bạn

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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

---

### Bước 17: Cấu hình TypeScript (Tùy chọn)

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

---

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
