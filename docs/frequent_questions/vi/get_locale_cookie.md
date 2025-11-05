---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cách lấy locale từ cookie / headers?
description: Tìm hiểu cách lấy locale từ cookie / headers.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Cách lấy locale từ cookie / headers

## Sử dụng Hooks (Khuyến nghị)

Đối với hầu hết các trường hợp sử dụng, nên lấy locale hiện tại bằng hook `useLocale` vì nó được tự động giải quyết. Điều này hoạt động tương tự như composable `useLocale` trong Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// hoặc import { useLocale } từ "vue-intlayer";

// Sử dụng phía client
const { locale } = useLocale();
```

Đối với các server component, bạn có thể import từ:

```tsx
import { useLocale } từ "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Cũng có một hook `useLocaleCookie` chỉ giải quyết giá trị cookie.

## Cấu hình Cookie thủ công

Bạn có thể khai báo tên cookie tùy chỉnh như sau

```ts
import { type IntlayerConfig } từ "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // mặc định là 'intlayer-locale'
  },
};

export default config;
```

cách lấy lại giá trị như sau

### Phía client

```ts
// Sử dụng tên cookie mặc định
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Sử dụng tên cookie tùy chỉnh
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Phía server (Next.js)

```ts
import { cookies } from "next/headers";

// Sử dụng tên cookie mặc định
const locale = cookies().get("intlayer-locale")?.value;

// Sử dụng tên cookie tùy chỉnh
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Nếu locale chưa được thiết lập

Locale chỉ được thiết lập dưới dạng cookie khi người dùng chọn rõ ràng locale. Mặc định, đối với khách truy cập mới, locale được suy diễn từ các trường header.

Bạn có thể phát hiện locale ưu tiên của người dùng từ các header của yêu cầu. Dưới đây là ví dụ về cách xử lý điều này:

```ts
/**
 * Phát hiện locale từ các header của yêu cầu
 *
 * Header accept-language là header quan trọng nhất để phát hiện locale.
 * Nó chứa danh sách các mã ngôn ngữ kèm theo giá trị chất lượng (q-value) cho biết
 * các ngôn ngữ ưu tiên của người dùng theo thứ tự ưu tiên.
 *
 * Ví dụ: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US là ngôn ngữ chính (q=1.0 được ngầm định)
 * - en là lựa chọn thứ hai (q=0.9)
 * - fr là lựa chọn thứ ba (q=0.8)
 * - es là lựa chọn thứ tư (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Ví dụ về các header negotiator mà trình duyệt thường gửi
 * Những header này giúp xác định ngôn ngữ ưu tiên của người dùng
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Ví dụ sử dụng:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
