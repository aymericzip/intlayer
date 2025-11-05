---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Tạo một component đa ngôn ngữ (thư viện i18n) trong React và Next.js
description: Tìm hiểu cách khai báo và lấy nội dung bản địa hóa để xây dựng một component React hoặc Next.js đa ngôn ngữ với Intlayer.
keywords:
  - i18n
  - component
  - react
  - đa ngôn ngữ
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Cách tạo một component đa ngôn ngữ (i18n) với Intlayer

Hướng dẫn này trình bày các bước tối thiểu để làm cho một component giao diện người dùng đa ngôn ngữ trong hai thiết lập phổ biến:

- React (Vite/SPA)
- Next.js (App Router)

Bạn sẽ bắt đầu bằng cách khai báo nội dung, sau đó lấy nội dung đó trong component của bạn.

## 1) Khai báo nội dung của bạn (dùng chung cho React và Next.js)

Tạo một file khai báo nội dung gần component của bạn. Điều này giữ cho các bản dịch gần với nơi chúng được sử dụng và cho phép an toàn kiểu dữ liệu.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON cũng được hỗ trợ nếu bạn thích dùng các file cấu hình.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Lấy nội dung của bạn

### Trường hợp A — Ứng dụng React (Vite/SPA)

Cách tiếp cận mặc định: sử dụng `useIntlayer` để lấy theo key. Điều này giữ cho các component gọn nhẹ và có kiểu dữ liệu.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Kết xuất phía máy chủ hoặc bên ngoài provider: sử dụng `react-intlayer/server` và truyền một `locale` rõ ràng khi cần.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Phương án thay thế: `useDictionary` có thể đọc toàn bộ đối tượng đã khai báo nếu bạn thích đặt cấu trúc tại nơi gọi.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Trường hợp B — Next.js (App Router)

Ưu tiên sử dụng server components để đảm bảo an toàn dữ liệu và hiệu năng. Sử dụng `useIntlayer` từ `next-intlayer/server` trong các file server, và `useIntlayer` từ `next-intlayer` trong các component phía client.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Mẹo: Để lấy metadata trang và SEO, bạn cũng có thể lấy nội dung bằng cách sử dụng `getIntlayer` và tạo URL đa ngôn ngữ thông qua `getMultilingualUrls`.

## Tại sao cách tiếp cận component của Intlayer là tốt nhất

- **Collocation**: Các khai báo nội dung nằm gần các component, giảm sự lệch pha và cải thiện việc tái sử dụng trong các hệ thống thiết kế.
- **Type safety**: Các khóa và cấu trúc được kiểu hóa chặt chẽ; các bản dịch thiếu sẽ được phát hiện trong thời gian build thay vì khi chạy ứng dụng.
- **Server-first**: Hoạt động nguyên bản trong các component phía server để tăng cường bảo mật và hiệu suất; các hook phía client vẫn giữ được tính tiện dụng.
- **Tree-shaking**: Chỉ nội dung được component sử dụng mới được đóng gói, giữ cho payload nhỏ trong các ứng dụng lớn.
- **DX & tooling**: Middleware tích hợp sẵn, trợ giúp SEO và tùy chọn Visual Editor/AI dịch thuật giúp đơn giản hóa công việc hàng ngày.

Xem các so sánh và mẫu trong bài tổng hợp tập trung vào Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Hướng dẫn và tài liệu liên quan

- Cài đặt React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- Bắt đầu với TanStack: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Cài đặt Next.js: https://intlayer.org/doc/environment/nextjs
- Tại sao chọn Intlayer thay vì next-intl hay next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Các trang này bao gồm thiết lập end-to-end, providers, routing và trợ giúp SEO.
