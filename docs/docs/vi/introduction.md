---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Giới thiệu
description: Tìm hiểu cách Intlayer hoạt động. Xem các bước mà Intlayer sử dụng trong ứng dụng của bạn. Xem các gói khác nhau làm gì.
keywords:
  - Giới thiệu
  - Bắt đầu
  - Intlayer
  - Ứng dụng
  - Gói
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu Intlayer

Chào mừng bạn đến với tài liệu chính thức của Intlayer! Ở đây, bạn sẽ tìm thấy mọi thứ cần thiết để tích hợp, cấu hình và làm chủ Intlayer cho tất cả các nhu cầu quốc tế hóa (i18n) của bạn, dù bạn đang làm việc với Next.js, React, Vite, Express hay môi trường JavaScript khác.

## Giới thiệu

### Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa được thiết kế đặc biệt cho các nhà phát triển JavaScript. Nó cho phép khai báo nội dung của bạn ở mọi nơi trong mã nguồn. Nó chuyển đổi khai báo nội dung đa ngôn ngữ thành các từ điển có cấu trúc để dễ dàng tích hợp vào mã của bạn. Sử dụng TypeScript, **Intlayer** giúp phát triển của bạn mạnh mẽ và hiệu quả hơn.

Intlayer cũng cung cấp một trình chỉnh sửa trực quan tùy chọn cho phép bạn dễ dàng chỉnh sửa và quản lý nội dung của mình. Trình chỉnh sửa này đặc biệt hữu ích cho các nhà phát triển thích giao diện trực quan để quản lý nội dung, hoặc cho các nhóm tạo nội dung mà không cần phải lo lắng về mã.

### Ví dụ sử dụng

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World", // Xin chào Thế giới
      es: "Hola Mundo", // Xin chào Thế giới
      fr: "Bonjour le monde", // Xin chào Thế giới
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World", // Xin chào Thế giới
      es: "Hola Mundo", // Xin chào Thế giới
      fr: "Bonjour le monde", // Xin chào Thế giới
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World", // Xin chào Thế giới
      es: "Hola Mundo", // Xin chào Thế giới
      fr: "Bonjour le monde", // Xin chào Thế giới
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Tính Năng Chính

Intlayer cung cấp nhiều tính năng được thiết kế phù hợp để đáp ứng nhu cầu phát triển web hiện đại. Dưới đây là các tính năng chính, kèm theo các liên kết đến tài liệu chi tiết cho từng tính năng:

- **Hỗ trợ Quốc tế hóa**: Nâng cao khả năng tiếp cận toàn cầu của ứng dụng với hỗ trợ quốc tế hóa tích hợp sẵn.
- **Trình Soạn Thảo Trực Quan**: Cải thiện quy trình phát triển của bạn với các plugin trình soạn thảo được thiết kế dành riêng cho Intlayer. Xem hướng dẫn tại [Hướng Dẫn Trình Soạn Thảo Trực Quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).
- **Tùy Biến Cấu Hình**: Tùy chỉnh thiết lập của bạn với các tùy chọn cấu hình phong phú được trình bày chi tiết trong [Hướng Dẫn Cấu Hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).
- **Công Cụ CLI Nâng Cao**: Quản lý dự án hiệu quả bằng giao diện dòng lệnh của Intlayer. Khám phá các khả năng trong [Tài Liệu Công Cụ CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

## Các Khái Niệm Cốt Lõi

### Từ Điển

Tổ chức nội dung đa ngôn ngữ gần với mã nguồn của bạn để giữ mọi thứ nhất quán và dễ bảo trì.

- **[Bắt Đầu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)**  
  Tìm hiểu những kiến thức cơ bản về cách khai báo nội dung trong Intlayer.

- **[Dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)**  
  Hiểu cách các bản dịch được tạo ra, lưu trữ và sử dụng trong ứng dụng của bạn.

- **[Liệt kê](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md)**  
  Quản lý dễ dàng các tập dữ liệu lặp lại hoặc cố định trên nhiều ngôn ngữ khác nhau.

- **[Điều kiện](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/conditional.md)**  
  Tìm hiểu cách sử dụng logic điều kiện trong Intlayer để tạo nội dung động.

- **[Chèn giá trị](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)**  
  Khám phá cách chèn giá trị vào chuỗi bằng các chỗ giữ chèn giá trị.

- **[Lấy dữ liệu bằng hàm](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md)**  
  Xem cách lấy nội dung động với logic tùy chỉnh để phù hợp với quy trình làm việc của dự án bạn.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)**  
  Tìm hiểu cách sử dụng Markdown trong Intlayer để tạo nội dung phong phú.

- **[Nhúng tệp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file_embeddings.md)**  
  Khám phá cách nhúng các tệp bên ngoài vào Intlayer để sử dụng trong trình soạn thảo nội dung.

- **[Lồng nhau](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/nesting.md)**  
  Hiểu cách lồng nội dung trong Intlayer để tạo các cấu trúc phức tạp.

### Môi trường & Tích hợp

Chúng tôi xây dựng Intlayer với sự linh hoạt trong tâm trí, cung cấp tích hợp liền mạch với các framework và công cụ xây dựng phổ biến:

- **[Intlayer với Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)**
- **[Intlayer với Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)**
- **[Intlayer với Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_14.md)**
- **[Intlayer với Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md)**
- **[Intlayer với React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)**
- **[Intlayer với Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)**
- **[Intlayer với React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_router_v7.md)**
- **[Intlayer với Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)**
- **[Intlayer với React Native và Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_native+expo.md)**
- **[Intlayer với Lynx và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_lynx+react.md)**
- **[Intlayer với Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+preact.md)**
- **[Intlayer với Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)**
- **[Intlayer với Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)**
- **[Intlayer với Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_express.md)**
- **[Intlayer với NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nestjs.md)**
- **[Intlayer với Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular.md)**

Mỗi hướng dẫn tích hợp bao gồm các thực tiễn tốt nhất để sử dụng các tính năng của Intlayer, như **render phía máy chủ (server-side rendering)**, **định tuyến động (dynamic routing)**, hoặc **render phía khách (client-side rendering)**, giúp bạn duy trì một ứng dụng nhanh, thân thiện với SEO và có khả năng mở rộng cao.

## Đóng góp & Phản hồi

Chúng tôi đánh giá cao sức mạnh của phát triển mã nguồn mở và cộng đồng. Nếu bạn muốn đề xuất cải tiến, thêm hướng dẫn mới, hoặc sửa bất kỳ vấn đề nào trong tài liệu của chúng tôi, hãy thoải mái gửi Pull Request hoặc mở một issue trên [kho GitHub của chúng tôi](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Sẵn sàng để dịch ứng dụng của bạn nhanh hơn và hiệu quả hơn?** Hãy khám phá tài liệu của chúng tôi để bắt đầu sử dụng Intlayer ngay hôm nay. Trải nghiệm một phương pháp quốc tế hóa mạnh mẽ, tinh gọn giúp giữ cho nội dung của bạn được tổ chức tốt và đội ngũ của bạn làm việc hiệu quả hơn.

---
