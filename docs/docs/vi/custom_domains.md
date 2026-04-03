---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Tên miền tùy chỉnh
description: Tìm hiểu cách cấu hình điều hướng ngôn ngữ dựa trên tên miền trong Intlayer để phục vụ các ngôn ngữ khác nhau từ các tên miền riêng biệt.
keywords:
  - Tên miền tùy chỉnh
  - Điều hướng theo tên miền
  - Điều hướng
  - Quốc tế hóa
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Thêm điều hướng ngôn ngữ dựa trên tên miền thông qua cấu hình routing.domains."
---

# Tên miền tùy chỉnh

Intlayer hỗ trợ điều hướng ngôn ngữ dựa trên tên miền, cho phép bạn phục vụ các ngôn ngữ cụ thể từ các tên miền riêng biệt. Ví dụ: khách truy cập từ Trung Quốc có thể được điều hướng đến `intlayer.zh` thay vì `intlayer.org/zh`.

## Cách thức hoạt động

Bản đồ `domains` trong `routing` liên kết mỗi ngôn ngữ với một tên miền. Intlayer sử dụng bản đồ này ở hai nơi:

1. **Tạo URL** (`getLocalizedUrl`): khi ngôn ngữ mục tiêu nằm trên một tên miền _khác_ với trang hiện tại, một URL tuyệt đối sẽ được trả về (ví dụ: `https://intlayer.zh/about`). Khi cả hai tên miền khớp nhau, một URL tương đối sẽ được trả về (ví dụ: `/fr/about`).
2. **Proxy máy chủ** (Next.js & Vite): Các yêu cầu đến sẽ được chuyển hướng hoặc ghi lại dựa trên tên miền mà chúng đến.

### Tên miền độc quyền vs Tên miền chung

Sự khác biệt chính là **tính độc quyền**:

- **Tên miền độc quyền** — Chỉ một ngôn ngữ ánh xạ tới tên miền đó (ví dụ: `zh → intlayer.zh`). Bản thân tên miền đó xác định ngôn ngữ, vì vậy không có tiền tố ngôn ngữ nào được thêm vào đường dẫn. `https://intlayer.zh/about` phục vụ nội dung tiếng Trung.
- **Tên miền chung** — Nhiều ngôn ngữ ánh xạ tới cùng một tên miền (ví dụ: cả `en` và `fr` đều ánh xạ tới `intlayer.org`). Điều hướng dựa trên tiền tố thông thường sẽ được áp dụng. `intlayer.org/fr/about` phục vụ nội dung tiếng Pháp.

## Cấu hình

```typescript fileName="intlayer.config.ts"
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
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Tên miền chung — en và fr sử dụng điều hướng tiền tố trên intlayer.org
      en: "intlayer.org",
      // Tên miền độc quyền — zh có tên miền riêng, không cần tiền tố /zh/
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Các ngôn ngữ không được liệt kê trong `domains` tiếp tục sử dụng điều hướng tiền tố tiêu chuẩn mà không có bất kỳ ghi đè tên miền nào.

## Tạo URL

`getLocalizedUrl` tự động tạo loại URL chính xác dựa trên ngữ cảnh cuộc gọi.

### Ngôn ngữ cùng tên miền (URL tương đối)

```ts
// Trang hiện tại: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about" (ngôn ngữ mặc định, không tiền tố)
```

### Ngôn ngữ khác tên miền (URL tuyệt đối)

```ts
// Trang hiện tại: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about" (tên miền độc quyền, không có tiền tố /zh/)
```

### Phục vụ từ chính tên miền của ngôn ngữ

```ts
// Trang hiện tại: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about" (đã ở đúng tên miền — URL tương đối)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about" (liên kết xuyên tên miền quay lại intlayer.org)
```

### Tự động phát hiện tên miền hiện tại

`currentDomain` là tùy chọn. Khi được bỏ qua, `getLocalizedUrl` sẽ giải quyết nó theo thứ tự này:

1. Tên miền của một URL đầu vào tuyệt đối (ví dụ: `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` trong môi trường trình duyệt.
3. Nếu không có cái nào khả dụng (SSR không có tùy chọn rõ ràng), một URL tương đối sẽ được trả về cho các ngôn ngữ cùng tên miền và không có URL tuyệt đối nào được tạo — đây là phương án dự phòng an toàn.

```ts
// Trình duyệt — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about" (tự động phát hiện từ window)

// Từ một URL tuyệt đối — tên miền được phát hiện tự động
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` với tên miền

`getMultilingualUrls` gọi `getLocalizedUrl` cho mọi ngôn ngữ, vì vậy nó tạo ra sự kết hợp giữa URL tương đối và tuyệt đối tùy thuộc vào tên miền của người gọi:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Các URL tuyệt đối này đã sẵn sàng để sử dụng trong các thẻ `<link rel="alternate" hreflang="...">` cho SEO.

## Hành vi Proxy

### Next.js

Phần mềm trung gian `intlayerProxy` tự động xử lý điều hướng tên miền. Thêm nó vào `middleware.ts` của bạn:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Chuyển hướng** — yêu cầu đến sai tên miền cho một tiền tố ngôn ngữ nhất định:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Ghi lại (Rewrite)** — yêu cầu đến tên miền độc quyền của ngôn ngữ mà không có tiền tố:

```
GET intlayer.zh/about
→ ghi lại thành /zh/about (chỉ điều hướng nội bộ Next.js, URL vẫn sạch sẽ)
```

### Vite

Plugin Vite `intlayerProxy` áp dụng logic tương tự trong quá trình phát triển:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Lưu ý**: trong quá trình phát triển cục bộ, bạn thường ở `localhost`, vì vậy các chuyển hướng xuyên tên miền sẽ trỏ đến các tên miền trực tiếp thay vì một cổng cục bộ khác. Sử dụng ghi đè tệp hosts (ví dụ: `127.0.0.1 intlayer.zh`) hoặc một proxy ngược nếu bạn cần kiểm tra điều hướng đa tên miền cục bộ.

## Trình chuyển đổi ngôn ngữ (Locale Switcher)

Hook `useLocale` từ `next-intlayer` tự động xử lý điều hướng nhận biết tên miền. Khi người dùng chuyển sang một ngôn ngữ trên một tên miền khác, hook thực hiện điều hướng toàn bộ trang (`window.location.href`) thay vì đẩy bộ định tuyến phía máy khách, vì bộ định tuyến Next.js không thể xuyên suốt các nguồn (origins).

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {localeEl.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Không cần cấu hình thêm — `useLocale` tự động phát hiện `window.location.hostname` bên trong và quyết định giữa `router.replace` (cùng tên miền) và `window.location.href` (khác tên miền).

## SEO: `hreflang` Liên kết thay thế

Điều hướng dựa trên tên miền thường được sử dụng cùng với `hreflang` để thông báo cho các công cụ tìm kiếm biết URL nào nên lập chỉ mục cho mỗi ngôn ngữ. Sử dụng `getMultilingualUrls` để tạo bộ URL thay thế đầy đủ:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // ví dụ: "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Điều này tạo ra:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Các tiện ích cốt lõi

| Tiện ích                                          | Mô tả                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Trả về URL tương đối hoặc tuyệt đối tùy thuộc vào việc ngôn ngữ mục tiêu có nằm trên tên miền hiện tại hay không. |
| `getMultilingualUrls(url, { currentDomain })`     | Trả về một bản đồ các URL được bản địa hóa theo khóa ngôn ngữ, kết hợp tương đối và tuyệt đối khi cần thiết.      |
| `getPrefix(locale, { domains })`                  | Trả về một tiền tố trống cho các ngôn ngữ thuộc tên miền độc quyền, tiền tố bình thường nếu ngược lại.            |
