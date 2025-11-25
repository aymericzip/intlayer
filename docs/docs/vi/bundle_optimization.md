---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Tối ưu Kích thước & Hiệu suất Gói i18n
description: Giảm kích thước gói ứng dụng bằng cách tối ưu hóa nội dung quốc tế hóa (i18n). Tìm hiểu cách tận dụng tree shaking và lazy loading cho từ điển với Intlayer.
keywords:
  - Tối ưu Gói
  - Tự động Hóa Nội dung
  - Nội dung Động
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Khởi tạo lịch sử
---

# Tối ưu Kích thước & Hiệu suất Gói i18n

Một trong những thách thức phổ biến nhất với các giải pháp i18n truyền thống dựa trên các tệp JSON là quản lý kích thước nội dung. Nếu các nhà phát triển không tách nội dung thành các namespace một cách thủ công, người dùng thường phải tải xuống bản dịch cho mọi trang và có thể cho mọi ngôn ngữ chỉ để xem một trang duy nhất.

Ví dụ, một ứng dụng có 10 trang được dịch sang 10 ngôn ngữ có thể khiến người dùng tải xuống nội dung của 100 trang, mặc dù họ chỉ cần **một** trang (trang hiện tại với ngôn ngữ hiện tại). Điều này dẫn đến lãng phí băng thông và thời gian tải chậm hơn.

> Để phát hiện điều này, bạn có thể sử dụng các công cụ phân tích gói như `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), hoặc `webpack-bundle-analyzer` (React CRA / Angular / v.v).

**Intlayer giải quyết vấn đề này thông qua tối ưu hóa thời gian build.** Nó phân tích mã của bạn để phát hiện các từ điển thực sự được sử dụng cho từng component và chỉ tái chèn nội dung cần thiết vào bundle của bạn.

## Mục lục

<TOC />

## Cách Hoạt Động

Intlayer sử dụng **phương pháp theo từng component**. Khác với các tệp JSON toàn cục, nội dung của bạn được định nghĩa kèm theo hoặc bên trong các component. Trong quá trình build, Intlayer:

1.  **Phân tích** mã của bạn để tìm các gọi `useIntlayer`.
2.  **Xây dựng** nội dung từ điển tương ứng.
3.  **Thay thế** gọi `useIntlayer` bằng mã đã được tối ưu dựa trên cấu hình của bạn.

Điều này đảm bảo rằng:

- Nếu một component không được import, nội dung của nó sẽ không được bao gồm trong bundle (Loại bỏ mã chết).
- Nếu một component được tải theo lazy-load, nội dung của nó cũng sẽ được tải theo lazy-load.

## Cài Đặt Theo Nền Tảng

### Next.js

Next.js yêu cầu plugin `@intlayer/swc` để xử lý việc chuyển đổi, vì Next.js sử dụng SWC cho quá trình build.

> Plugin này được cài đặt mặc định vì các plugin SWC vẫn đang trong giai đoạn thử nghiệm cho Next.js. Điều này có thể thay đổi trong tương lai.

### Vite

Vite sử dụng plugin `@intlayer/babel` được bao gồm như một phụ thuộc của `vite-intlayer`. Tối ưu hóa được bật mặc định.

### Webpack

Để kích hoạt tối ưu hóa bundle với Intlayer trên Webpack, bạn cần cài đặt và cấu hình plugin Babel (`@intlayer/babel`) hoặc SWC (`@intlayer/swc`) phù hợp.

### Expo / Lynx

Tối ưu hóa bundle **chưa khả dụng** cho nền tảng này. Hỗ trợ sẽ được thêm vào trong bản phát hành tương lai.

## Cấu Hình

Bạn có thể kiểm soát cách Intlayer tối ưu hóa bundle của bạn thông qua thuộc tính `build` trong file `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // hoặc 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Giữ tùy chọn mặc định cho `optimize` được khuyến nghị trong hầu hết các trường hợp.

> Xem tài liệu cấu hình để biết thêm chi tiết: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

### Tùy Chọn Build

Các tùy chọn sau có sẵn trong đối tượng cấu hình `build`:

| Thuộc tính            | Kiểu                            | Mặc định                        | Mô tả                                                                                                                                                                                                                                      |
| :-------------------- | :------------------------------ | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | Điều khiển việc có bật tối ưu hóa build hay không. Nếu là `true`, Intlayer sẽ thay thế các cuộc gọi từ điển bằng các inject được tối ưu hóa. Nếu là `false`, tối ưu hóa sẽ bị tắt. Lý tưởng nên đặt là `true` trong môi trường production. |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | Xác định cách các từ điển được tải (xem chi tiết bên dưới).                                                                                                                                                                                |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Các mẫu glob xác định các tệp mà Intlayer sẽ quét để tối ưu hóa. Sử dụng để loại trừ các tệp không liên quan và tăng tốc quá trình build.                                                                                                  |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | Điều khiển định dạng đầu ra của các từ điển đã build.                                                                                                                                                                                      |

## Chế độ Import

Cài đặt `importMode` quyết định cách nội dung từ điển được inject vào component của bạn.

### 1. Chế độ Static (`mặc định`)

Ở chế độ tĩnh, Intlayer thay thế `useIntlayer` bằng `useDictionary` và chèn từ điển trực tiếp vào gói JavaScript.

- **Ưu điểm:** Kết xuất tức thì (đồng bộ), không có yêu cầu mạng bổ sung trong quá trình hydration.
- **Nhược điểm:** Gói bao gồm bản dịch cho **tất cả** các ngôn ngữ có sẵn cho thành phần cụ thể đó.
- **Phù hợp cho:** Ứng dụng một trang (SPA).

**Ví dụ mã đã chuyển đổi:**

```tsx
// Mã của bạn
const content = useIntlayer("my-key");

// Mã tối ưu (Tĩnh)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Chế độ động

Ở chế độ động, Intlayer thay thế `useIntlayer` bằng `useDictionaryAsync`. Cách này sử dụng `import()` (cơ chế giống Suspense) để tải lười JSON cụ thể cho locale hiện tại.

- **Ưu điểm:** **Tree shaking ở cấp độ locale.** Người dùng xem phiên bản tiếng Anh sẽ _chỉ_ tải từ điển tiếng Anh. Từ điển tiếng Pháp sẽ không bao giờ được tải.
- **Nhược điểm:** Kích hoạt một yêu cầu mạng (tải tài nguyên) cho mỗi thành phần trong quá trình hydration.
- **Phù hợp cho:** Các khối văn bản lớn, bài viết hoặc ứng dụng hỗ trợ nhiều ngôn ngữ mà kích thước gói là yếu tố quan trọng.

**Ví dụ mã đã chuyển đổi:**

```tsx
// Mã của bạn
const content = useIntlayer("my-key");

// Mã tối ưu (Động)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Khi sử dụng `importMode: 'dynamic'`, nếu bạn có 100 thành phần sử dụng `useIntlayer` trên một trang, trình duyệt sẽ cố gắng thực hiện 100 lần tải riêng biệt. Để tránh hiện tượng "thác nước" của các yêu cầu này, hãy gom nội dung vào ít file `.content` hơn (ví dụ: một từ điển cho mỗi phần trang) thay vì một file cho mỗi thành phần atom.

> Hiện tại, `importMode: 'dynamic'` chưa được hỗ trợ đầy đủ cho Vue và Svelte. Khuyến nghị sử dụng `importMode: 'static'` cho các framework này cho đến khi có cập nhật tiếp theo.

### 3. Chế độ Live

Hoạt động tương tự như chế độ Dynamic nhưng cố gắng lấy từ điển từ Intlayer Live Sync API trước. Nếu cuộc gọi API thất bại hoặc nội dung không được đánh dấu để cập nhật trực tiếp, nó sẽ chuyển sang import động.

> Xem tài liệu CMS để biết thêm chi tiết: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

## Tóm tắt: Static vs Dynamic

| Tính năng                       | Chế độ Static                                    | Chế độ Dynamic                         |
| :------------------------------ | :----------------------------------------------- | :------------------------------------- |
| **Kích thước gói JS**           | Lớn hơn (bao gồm tất cả ngôn ngữ cho thành phần) | Nhỏ nhất (chỉ mã, không có nội dung)   |
| **Tải ban đầu**                 | Ngay lập tức (Nội dung có trong gói)             | Trễ nhẹ (Tải JSON)                     |
| **Yêu cầu mạng**                | Không có yêu cầu bổ sung                         | 1 yêu cầu cho mỗi từ điển              |
| **Tree Shaking**                | Cấp độ thành phần                                | Cấp độ thành phần + cấp độ ngôn ngữ    |
| **Trường hợp sử dụng tốt nhất** | Thành phần UI, Ứng dụng nhỏ                      | Trang có nhiều văn bản, Nhiều ngôn ngữ |
