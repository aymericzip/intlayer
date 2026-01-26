---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Viết lại URL Tùy chỉnh
description: Tìm hiểu cách cấu hình và sử dụng viết lại URL tùy chỉnh trong Intlayer để định nghĩa các đường dẫn theo locale.
keywords:
  - Viết lại URL Tùy chỉnh
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Triển khai việc viết lại URL tập trung với bộ định dạng dành cho từng framework và hook useRewriteURL.
---

# Triển khai Viết lại URL Tùy chỉnh

Intlayer hỗ trợ viết lại URL tùy chỉnh, cho phép bạn định nghĩa các đường dẫn theo locale khác với cấu trúc chuẩn `/locale/path`. Điều này cho phép các URL như `/about` cho tiếng Anh và `/a-propos` cho tiếng Pháp trong khi vẫn giữ logic nội bộ ứng dụng ở dạng chuẩn.

## Cấu hình

Các rewrite tùy chỉnh được cấu hình trong phần `routing` của tệp `intlayer.config.ts` bằng cách sử dụng các bộ định dạng theo framework. Các bộ định dạng này cung cấp cú pháp chính xác cho router mà bạn lựa chọn.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (các cài đặt khác)
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack Router" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (cấu hình khác)
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue Router" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // Cấu hình khác...
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### Các formatter có sẵn

Intlayer cung cấp formatter cho tất cả các framework phổ biến:

- `nextjsRewrite`: Dành cho Next.js App Router. Hỗ trợ `[slug]`, `[...slug]` (1+), và `[[...slug]]` (0+).
- `svelteKitRewrite`: Dành cho SvelteKit. Hỗ trợ `[slug]`, `[...path]` (0+), và `[[optional]]` (0-1).
- `reactRouterRewrite`: Dành cho React Router. Hỗ trợ `:slug` và `*` (0+).
- `vueRouterRewrite`: Dành cho Vue Router 4. Hỗ trợ `:slug`, `:slug?` (0-1), `:slug*` (0+), và `:slug+` (1+).
- `solidRouterRewrite`: Dành cho Solid Router. Hỗ trợ `:slug` và `*slug` (0+).
- `tanstackRouterRewrite`: Dành cho TanStack Router. Hỗ trợ `$slug` và `*` (0+).
- `nuxtRewrite`: Dành cho Nuxt 3. Hỗ trợ `[slug]` và `[...slug]` (0+).
- `viteRewrite`: Bộ định dạng chung cho bất kỳ dự án dựa trên Vite nào. Chuẩn hóa cú pháp cho proxy của Vite.

### Mẫu nâng cao

Intlayer nội bộ chuẩn hóa những mẫu này thành một cú pháp thống nhất, cho phép khớp đường dẫn và tạo đường dẫn phức tạp:

- **Phân đoạn tùy chọn**: `[[optional]]` (SvelteKit) hoặc `:slug?` (Vue/React) được hỗ trợ.
- **Bắt tất cả (0 hoặc nhiều)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), hoặc `*` (React/TanStack) cho phép khớp nhiều phân đoạn.
- **Bắt tất cả bắt buộc (1 hoặc nhiều)**: `[...slug]` (Next.js) hoặc `:slug+` (Vue) đảm bảo ít nhất một phân đoạn tồn tại.

## Sửa URL ở phía khách (Client-Side): `useRewriteURL`

Để đảm bảo thanh địa chỉ của trình duyệt luôn phản ánh URL địa phương "đẹp", Intlayer cung cấp hook `useRewriteURL`. Hook này sẽ âm thầm cập nhật URL bằng `window.history.replaceState` khi người dùng truy cập vào một đường dẫn chính tắc.

### Sử dụng trong các framework

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Tự động chỉnh /fr/about thành /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Tự động sửa /fr/about thành /fr/a-propos

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## Tích hợp Router & Proxies

Proxy phía máy chủ của Intlayer (Vite & Next.js) tự động xử lý các rewrites tùy chỉnh để đảm bảo tính nhất quán về SEO.

1. **Rewrites nội bộ**: Khi một người dùng truy cập `/fr/a-propos`, proxy nội bộ sẽ ánh xạ nó tới `/fr/about` để framework của bạn khớp với route chính xác.
2. **Chuyển hướng có thẩm quyền**: Nếu một người dùng gõ thủ công `/fr/about`, proxy sẽ phát hành chuyển hướng 301/302 tới `/fr/a-propos`, đảm bảo các công cụ tìm kiếm chỉ lập chỉ mục một phiên bản của trang.

### Tích hợp Next.js

Việc tích hợp Next.js được xử lý hoàn toàn thông qua middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Tích hợp Vite

Đối với SolidJS, Vue và Svelte, plugin Vite `intlayerProxy` quản lý các rewrite trong quá trình phát triển.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Các tính năng chính

### 1. Viết lại đa ngữ cảnh

Mỗi formatter tạo ra một `RewriteObject` chứa các quy tắc chuyên biệt cho các bên tiêu thụ khác nhau:

- `url`: Tối ưu cho việc sinh URL phía client (loại bỏ các phân đoạn locale).
- `nextjs`: Giữ lại `[locale]` cho middleware của Next.js.
- `vite`: Giữ lại `:locale` cho proxy của Vite.

### 2. Chuẩn hóa mẫu tự động

Intlayer nội bộ chuẩn hóa tất cả các cú pháp mẫu (ví dụ: chuyển `[param]` thành `:param`) để việc khớp mẫu luôn nhất quán bất kể framework nguồn.

### 3. URL Chuẩn SEO

Bằng cách thực thi chuyển hướng từ các đường dẫn canonical sang các bí danh thân thiện (pretty aliases), Intlayer ngăn ngừa vấn đề nội dung trùng lặp và cải thiện khả năng được tìm thấy của trang.

## Tiện ích cốt lõi

- `getLocalizedUrl(url, locale)`: Tạo một URL đã được địa phương hóa tuân theo các quy tắc rewrite.
- `getCanonicalPath(path, locale)`: Giải quyết một URL đã được địa phương hóa trở lại đường dẫn canonical nội bộ của nó.
- `getRewritePath(pathname, locale)`: Phát hiện nếu một pathname cần được sửa thành bí danh địa phương hóa đẹp hơn.
