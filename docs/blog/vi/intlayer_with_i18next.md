---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Cách tự động hóa bản dịch JSON i18next của bạn bằng Intlayer
description: Tự động hóa bản dịch JSON của bạn với Intlayer và i18next để nâng cao quốc tế hóa trong các ứng dụng JavaScript.
keywords:
  - Intlayer
  - i18next
  - Quốc tế hóa
  - i18n
  - Địa phương hóa
  - Dịch thuật
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Di cư
  - Tích hợp
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Thay đổi sang plugin syncJSON
---

# Cách tự động hóa bản dịch JSON i18next của bạn bằng Intlayer

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa mã nguồn mở sáng tạo, được thiết kế để khắc phục những hạn chế của các giải pháp i18n truyền thống. Nó cung cấp một cách tiếp cận hiện đại cho quản lý nội dung trong các ứng dụng JavaScript.

Xem so sánh cụ thể với i18next trong bài viết blog của chúng tôi [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

## Tại sao kết hợp Intlayer với i18next?

Trong khi Intlayer cung cấp một giải pháp i18n độc lập xuất sắc (xem hướng dẫn tích hợp với Next.js của chúng tôi [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)), bạn có thể muốn kết hợp nó với i18next vì một số lý do:

1. **Mã nguồn hiện có**: Bạn đã có một triển khai i18next ổn định và muốn dần dần chuyển sang trải nghiệm phát triển được cải thiện của Intlayer.
2. **Yêu cầu kế thừa**: Dự án của bạn cần tương thích với các plugin hoặc quy trình làm việc i18next hiện có.
3. **Đội ngũ quen thuộc**: Đội ngũ của bạn quen thuộc với i18next nhưng muốn quản lý nội dung tốt hơn.

**Vì vậy, Intlayer có thể được triển khai như một bộ chuyển đổi cho i18next để giúp tự động hóa việc dịch JSON của bạn trong CLI hoặc các pipeline CI/CD, kiểm thử bản dịch, và nhiều hơn nữa.**

Hướng dẫn này sẽ chỉ cho bạn cách tận dụng hệ thống khai báo nội dung vượt trội của Intlayer trong khi vẫn duy trì khả năng tương thích với i18next.

## Mục lục

<TOC/>

## Hướng dẫn từng bước để thiết lập Intlayer với i18next

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Mô tả các gói:**

- **intlayer**: Thư viện lõi để quản lý quốc tế hóa, khai báo nội dung và xây dựng
- **@intlayer/sync-json-plugin**: Plugin để xuất các khai báo nội dung của Intlayer sang định dạng JSON tương thích với i18next

### Bước 2: Triển khai plugin Intlayer để bao bọc JSON

Tạo một tệp cấu hình Intlayer để định nghĩa các locale được hỗ trợ:

**Nếu bạn cũng muốn xuất các từ điển JSON cho i18next**, hãy thêm plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` sẽ tự động bao bọc JSON. Nó sẽ đọc và ghi các tệp JSON mà không thay đổi cấu trúc nội dung.

Nếu bạn muốn cho phép JSON tồn tại cùng với các tệp khai báo nội dung intlayer (`.content` files), Intlayer sẽ tiến hành theo cách sau:

    1. tải cả tệp JSON và tệp khai báo nội dung và chuyển đổi chúng thành một từ điển intlayer.
    2. nếu có xung đột giữa JSON và các tệp khai báo nội dung, Intlayer sẽ tiến hành hợp nhất tất cả các từ điển đó. Tùy thuộc vào độ ưu tiên của các plugin, và của tệp khai báo nội dung (tất cả đều có thể cấu hình).

Nếu có thay đổi được thực hiện bằng cách sử dụng CLI để dịch JSON, hoặc sử dụng CMS, Intlayer sẽ cập nhật tệp JSON với các bản dịch mới.

## Cấu hình Git

Khuyến nghị bỏ qua các tệp Intlayer được tạo tự động:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

Các tệp này có thể được tạo lại trong quá trình xây dựng của bạn và không cần phải cam kết vào hệ thống quản lý phiên bản.

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển, hãy cài đặt **Tiện ích mở rộng Intlayer chính thức cho VS Code**:

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
