---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Làm thế nào để tùy chỉnh danh sách ngôn ngữ?
description: Tìm hiểu cách tùy chỉnh danh sách ngôn ngữ.
keywords:
  - locales
  - danh sách
  - intlayer
  - cấu hình
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
  - danh sách
slugs:
  - frequent-questions
  - customized-locale-list
---

# Có thể chặn một loại ngôn ngữ, như tiếng Anh không? Tôi đang thêm tiếng Anh vào từ điển nhưng chưa muốn tiếng Anh xuất hiện trên trang web

Có, bạn có thể chặn một loại ngôn ngữ, như tiếng Anh, bằng cách sử dụng tùy chọn `availableLocales` trong cấu hình Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

hoặc

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Cấu hình này sẽ thay đổi kiểu của hàm `t()` của bạn chỉ bao gồm các locale có sẵn.

Tùy chọn availableLocales là tùy chọn, nếu bạn không cung cấp, tất cả các locale sẽ được sử dụng.

Hãy cẩn thận, tất cả các locale được bao gồm trong tùy chọn `availableLocales` nên được bao gồm trong tùy chọn `locales`.

Lưu ý rằng nếu bạn sử dụng hook `useLocale`, tùy chọn `availableLocales` sẽ được sử dụng để thiết lập quyền truy cập vào danh sách locale.

```ts
import { useLocale } from "react-intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
