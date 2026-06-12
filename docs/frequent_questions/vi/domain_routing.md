---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cách cấu hình định tuyến dựa trên tên miền?
description: Tìm hiểu cách cấu hình định tuyến dựa trên tên miền.
keywords:
  - domain
  - routing
  - intlayer
  - configuration
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
author: aymericzip
---

# Làm thế nào để cấu hình **định tuyến dựa trên tên miền** với Intlayer thay vì các đường dẫn `/[locale]/`?

## Trả lời ngắn gọn

Định tuyến dựa trên tên miền đơn giản hơn định tuyến dựa trên đường dẫn (`example.com/[locale]/`) vì bạn có thể bỏ qua toàn bộ cấu hình middleware và routing. Chỉ cần triển khai ứng dụng của bạn lên từng tên miền ngôn ngữ và đặt một biến môi trường cho mỗi tên miền.

## Các bước thực hiện

1. **Triển khai một lần cho mỗi tên miền** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Với mỗi lần triển khai, đặt `LOCALE` (và các biến môi trường Intlayer thông thường) thành ngôn ngữ mà tên miền đó sẽ phục vụ.
3. Tham chiếu biến đó dưới dạng `defaultLocale` trong file `intlayer.config.[ts|js]` của bạn.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 tên miền quyết định ngôn ngữ
  },
  // ... phần còn lại của cấu hình
};

export default config;
```

Chỉ vậy thôi, cách này hoạt động tương tự cho **Next.js**, **Vite + React**, **Vite + Vue**, v.v.

## Nếu mọi tên miền đều trỏ đến cùng một lần triển khai thì sao?

Nếu tất cả các tên miền đều trỏ đến cùng một bundle ứng dụng, bạn sẽ cần phát hiện host tại runtime và truyền ngôn ngữ thủ công thông qua provider.

### Dành cho Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 lấy ngôn ngữ từ hostname nếu không có locale truyền vào
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Dành cho Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 👈 cài đặt Intlayer với ngôn ngữ lấy từ hostname
app.mount("#app");
```

Thay thế `getLocaleFromHostname()` bằng logic tra cứu của riêng bạn.

## Cập nhật bộ chuyển đổi ngôn ngữ của bạn

Khi sử dụng định tuyến dựa trên tên miền, việc thay đổi ngôn ngữ đồng nghĩa với việc điều hướng sang một tên miền khác:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 👈 chuyển hướng đến tên miền tương ứng với ngôn ngữ mục tiêu
}
```

## Lợi ích của định tuyến dựa trên tên miền

1. **Cấu hình đơn giản hơn**: Không cần cấu hình `intlayerProxy`, `generateStaticParams`, `react-router`, hoặc `vue-router`
2. **SEO tốt hơn**: Mỗi ngôn ngữ có tên miền riêng
3. **URL sạch hơn**: Không có tiền tố ngôn ngữ trong đường dẫn
4. **Dễ bảo trì hơn**: Mỗi triển khai ngôn ngữ là độc lập
