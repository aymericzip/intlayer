---
createdAt: 2025-08-23
updatedAt: 2025-10-09
title: Tài liệu Hook useLocale | next-intlayer
description: Xem cách sử dụng hook useLocale cho gói next-intlayer
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Thêm tài liệu cho hook `useLocale` với tùy chọn `onLocaleChange`
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp Next.js: Tài liệu Hook `useLocale` cho `next-intlayer`

Phần này cung cấp tài liệu chi tiết về hook `useLocale` được thiết kế riêng cho các ứng dụng Next.js trong thư viện `next-intlayer`. Hook này được tạo ra để xử lý thay đổi ngôn ngữ và điều hướng một cách hiệu quả.

## Nhập `useLocale` trong Next.js

Để sử dụng hook `useLocale` trong ứng dụng Next.js của bạn, hãy nhập nó như sau:

```javascript
import { useLocale } from "next-intlayer"; // Dùng để quản lý ngôn ngữ và điều hướng trong Next.js
```

## Cách sử dụng

Dưới đây là cách triển khai hook `useLocale` trong một component Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Ngôn ngữ hiện tại: {locale}</h1>
      <p>Ngôn ngữ mặc định: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Ngôn ngữ hiện tại: {locale}</h1>
      <p>Ngôn ngữ mặc định: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Ngôn ngữ hiện tại: {locale}</h1>
      <p>Ngôn ngữ mặc định: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Tham số

Hook `useLocale` chấp nhận các tham số sau:

- **`onLocaleChange`**: Một chuỗi xác định cách URL sẽ được cập nhật khi ngôn ngữ thay đổi. Nó có thể là `"replace"`, `"push"` hoặc `"none"`.

  > Hãy lấy ví dụ:
  >
  > 1. Bạn đang ở `/fr/home`
  > 2. Bạn điều hướng đến `/fr/about`
  > 3. Bạn chuyển sang `/es/about`
  > 4. Bạn nhấn nút "quay lại" của trình duyệt
  >
  > Hành vi sẽ khác nhau dựa trên giá trị của `onLocaleChange`:
  >
  > - `undefined`: (mặc định) Chỉ cập nhật ngôn ngữ trong ngữ cảnh client, và đặt cookie, mà không thay đổi URL.
  >   -> Nút "quay lại" sẽ dẫn đến `/fr/home`
  > - `"replace"`: Thay thế URL hiện tại bằng URL đã được địa phương hóa mới, và đặt cookie.
  >   -> Nút "quay lại" sẽ dẫn đến `/es/home`
  > - `"push"`: Thêm URL đã được địa phương hóa mới vào lịch sử trình duyệt, và đặt cookie.
  >   -> Nút "quay lại" sẽ dẫn đến `/fr/about`
  > - `(locale) => void`: Đặt cookie và kích hoạt một hàm tùy chỉnh sẽ được gọi khi ngôn ngữ thay đổi.
  >
  >   Tùy chọn `undefined` là hành vi mặc định vì chúng tôi khuyến nghị sử dụng component `Link` để điều hướng đến ngôn ngữ mới.
  >   Ví dụ:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## Giá trị trả về

Khi bạn gọi hook `useLocale`, nó trả về một đối tượng chứa các thuộc tính sau:

- **`locale`**: Ngôn ngữ hiện tại được thiết lập trong React context.
- **`defaultLocale`**: Ngôn ngữ chính được định nghĩa trong cấu hình.
- **`availableLocales`**: Danh sách tất cả các ngôn ngữ có sẵn theo cấu hình.
- **`setLocale`**: Một hàm để thay đổi ngôn ngữ của ứng dụng và cập nhật URL tương ứng. Hàm này xử lý các quy tắc tiền tố, quyết định có thêm ngôn ngữ vào đường dẫn hay không dựa trên cấu hình. Sử dụng `useRouter` từ `next/navigation` cho các chức năng điều hướng như `push` và `refresh`.
- **`pathWithoutLocale`**: Một thuộc tính được tính toán trả về đường dẫn không có ngôn ngữ. Thuộc tính này hữu ích để so sánh các URL. Ví dụ, nếu ngôn ngữ hiện tại là `fr`, và URL là `fr/my_path`, thì đường dẫn không có ngôn ngữ là `/my_path`. Sử dụng `usePathname` từ `next/navigation` để lấy đường dẫn hiện tại.

## Kết luận

Hook `useLocale` từ `next-intlayer` là một công cụ quan trọng để quản lý ngôn ngữ trong các ứng dụng Next.js. Nó cung cấp một phương pháp tích hợp để điều chỉnh ứng dụng của bạn cho nhiều ngôn ngữ bằng cách xử lý lưu trữ ngôn ngữ, quản lý trạng thái và sửa đổi URL một cách liền mạch.
