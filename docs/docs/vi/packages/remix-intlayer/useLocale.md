---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Hook useLocale | remix-intlayer
description: Xem cách sử dụng hook useLocale trong các ứng dụng Remix 3 để lấy locale của yêu cầu hiện tại, locale mặc định và danh sách các locale có sẵn.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - quốc tế hóa
  - tài liệu
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu hook useLocale"
author: aymericzip
---

# Tài liệu Hook useLocale

Hook `useLocale` từ `remix-intlayer` cung cấp quyền truy cập vào locale của yêu cầu HTTP hiện đang được xử lý, cùng với locale mặc định và các locale có sẵn được định cấu hình trong dự án.

## Cách sử dụng

Trong một thành phần Remix (ví dụ bộ chuyển đổi ngôn ngữ):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

Trong một route handler:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Giá trị trả về

Hook trả về một đối tượng thuộc loại `UseLocaleResult`:

| Thuộc tính         | Loại                | Mô tả                                                                            |
| ------------------ | ------------------- | -------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Locale đã được giải quyết cho yêu cầu hiện tại.                                  |
| `defaultLocale`    | `DeclaredLocales`   | Locale dự phòng mặc định được định cấu hình trong `intlayer.config.ts`.          |
| `availableLocales` | `DeclaredLocales[]` | Mảng gồm tất cả các locale có sẵn được định cấu hình trong `intlayer.config.ts`. |

## Mô tả

1. **Phân giải theo phạm vi yêu cầu**: Trong một yêu cầu đang hoạt động được xử lý bởi middleware `intlayer()`, `useLocale` đọc locale đã được phân giải từ bộ lưu trữ yêu cầu.
2. **Dự phòng an toàn (Fallback)**: Nếu được gọi bên ngoài context yêu cầu (chẳng hạn như trong quá trình khởi tạo script hoặc bộ kiểm thử), nó sẽ mặc định chuyển về `defaultLocale` đã định cấu hình.

## Tài liệu liên quan

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useDictionary.md)
