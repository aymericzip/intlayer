---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu Hook useLocale | react-intlayer
description: Xem cách sử dụng hook useLocale cho gói react-intlayer
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
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tích hợp React: Tài liệu Hook `useLocale`

Phần này cung cấp chi tiết toàn diện về hook `useLocale` từ thư viện `react-intlayer`, được thiết kế để xử lý quản lý locale trong các ứng dụng React.

## Nhập `useLocale` trong React

Để tích hợp hook `useLocale` vào ứng dụng React của bạn, hãy nhập nó từ gói tương ứng:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Sử dụng trong các component React để quản lý locale
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Sử dụng trong các component React để quản lý locale
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Sử dụng trong các component React để quản lý locale
```

## Tổng quan

Hook `useLocale` cung cấp cách đơn giản để truy cập và thao tác với các thiết lập locale trong các component React. Nó cho phép truy cập vào locale hiện tại, locale mặc định, tất cả các locale có sẵn, và các hàm để cập nhật thiết lập locale.

## Cách sử dụng

Dưới đây là cách bạn có thể sử dụng hook `useLocale` trong một component React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## Tham số và Giá trị trả về

Khi bạn gọi hook `useLocale`, nó trả về một đối tượng chứa các thuộc tính sau:

- **`locale`**: Ngôn ngữ hiện tại được thiết lập trong React context.
- **`defaultLocale`**: Ngôn ngữ chính được định nghĩa trong cấu hình.
- **`availableLocales`**: Danh sách tất cả các ngôn ngữ có sẵn được định nghĩa trong cấu hình.
- **`setLocale`**: Một hàm để cập nhật ngôn ngữ hiện tại trong context của ứng dụng.

## Ví dụ

Ví dụ này cho thấy một component sử dụng hook `useLocale` để hiển thị bộ chuyển đổi ngôn ngữ, cho phép người dùng thay đổi ngôn ngữ của ứng dụng một cách động:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Kết luận

Hook `useLocale` từ `react-intlayer` là một công cụ thiết yếu để quản lý các locale trong các ứng dụng React của bạn, cung cấp các chức năng cần thiết để điều chỉnh ứng dụng của bạn phù hợp với nhiều đối tượng người dùng quốc tế một cách hiệu quả.
