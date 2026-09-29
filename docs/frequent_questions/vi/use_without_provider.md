---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "Tôi có thể dùng Intlayer mà không cần provider toàn cục không?"
description: "Đọc nội dung Intlayer mà không mount provider, cách locale được resolve trên server và trong trình duyệt, và khác biệt hiệu năng so với provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - hiệu năng
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Tôi có thể dùng Intlayer mà không cần provider toàn cục không?

Có. `getIntlayer` và `getDictionary` là các hàm thông thường không cần provider nào, và `useIntlayer` cũng hoạt động bên ngoài provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Không truyền locale
```

## Locale nào được sử dụng?

Locale được truyền rõ ràng luôn được ưu tiên. Nếu không, locale được resolve theo thứ tự sau:

1. **Locale của request hiện tại**, trên server, khi một tích hợp Intlayer xử lý request đó: các middleware của `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` và `astro-intlayer`, hoặc `IntlayerProvider` trong React Server Components.
2. **Locale được lưu trong trình duyệt** (cookie, `localStorage`, `sessionStorage`), locale mà bộ chuyển ngôn ngữ của bạn lưu lại.
3. **`defaultLocale`** trong cấu hình của bạn.

Mỗi request được resolve từ cookies và headers của chính nó, và được giữ trong một phạm vi riêng của request đó. Những người dùng đồng thời với các locale khác nhau không bao giờ dùng chung locale.

Cách resolve tương tự áp dụng cho `getDictionary`, cho các lời gọi được [tối ưu hóa build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) viết lại, và cho `useIntlayer` và `useDictionaryDynamic` được render bên ngoài provider.

- [tối ưu hóa build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)

### Server Components của Next.js

Trên Next.js, locale của request chỉ đọc được bất đồng bộ, qua `headers()` và `cookies()`. Hãy dùng [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md), hàm này chờ locale giống cách `getLocale()` từ `next-intlayer/server` làm:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale của request

  return { title };
};
```

Việc đọc headers chuyển route sang rendering động. Khi `IntlayerProvider` đã cung cấp locale, headers không được đọc và route vẫn tĩnh.

## Hiệu năng: có hoặc không có provider

Nội dung là như nhau. Khác biệt nằm ở tính reactive và chi phí render.

|                     | Có provider                                         | Không có provider                                                                                                            |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Đổi locale          | Component được render lại tại chỗ, không cần reload | Không có gì được render lại; locale mới xuất hiện ở lời gọi tiếp theo (điều hướng, reload)                                   |
| Chi phí một lần đọc | Đọc context và đăng ký theo dõi locale              | Một lời gọi hàm được memoize, cùng object cho cùng `key + locale`                                                            |
| Chi phí một lần đổi | Render lại mọi consumer                             | Không có                                                                                                                     |
| Render ở server     | Server và trình duyệt render cùng một locale        | Ngoài tích hợp request, server render `defaultLocale` còn trình duyệt render locale đã lưu: có thể xảy ra hydration mismatch |
| Bundle              | Code của provider                                   | Khoảng 100 byte (gzip) để đọc locale đã lưu, được cache đến lần đổi tiếp theo                                                |

Giữ provider cho các ứng dụng tương tác đổi locale tại chỗ hoặc render ở server. Bỏ provider cho backend, script, trang tĩnh có locale lấy từ URL (hãy truyền nó rõ ràng), hoặc code chỉ đọc nội dung một lần.

Xem [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md) để biết thêm chi tiết.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md)
