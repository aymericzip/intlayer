---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Khám phá cách sử dụng Intlayer CLI để quản lý trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - CLI
  - Giao diện Dòng Lệnh
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Thêm lệnh transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Thêm tùy chọn skipIfExists cho lệnh translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Thêm bí danh cho các tham số và lệnh CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Thêm tùy chọn build cho các lệnh
  - version: 6.1.2
    date: 2025-09-26
    changes: Thêm lệnh version
  - version: 6.1.0
    date: 2025-09-26
    changes: Đặt tùy chọn verbose mặc định là true khi sử dụng CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Thêm lệnh watch và tùy chọn with
  - version: 6.0.1
    date: 2025-09-23
    changes: Thêm lệnh editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Thêm lệnh content test và list
  - version: 5.5.11
    date: 2025-07-11
    changes: Cập nhật tài liệu tham số lệnh CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Intlayer CLI

---

## Mục Lục

<TOC/>

---

## Cài Đặt Gói

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
bunx intlayer init
```

```bash packageManager="yarn"
 yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Nếu gói `intlayer` đã được cài đặt, cli sẽ tự động được cài đặt. Bạn có thể bỏ qua bước này.

## Gói intlayer-cli

Gói `intlayer-cli` nhằm mục đích biên dịch các [khai báo intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) của bạn thành các từ điển.

Gói này sẽ biên dịch tất cả các file intlayer, như `src/**/*.content.{ts|js|mjs|cjs|json}`. [Xem cách khai báo các file Intlayer của bạn](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Để diễn giải các từ điển intlayer, bạn có thể sử dụng các trình thông dịch, chẳng hạn như [react-intlayer](https://www.npmjs.com/package/react-intlayer), hoặc [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Hỗ trợ Tệp Cấu hình

Intlayer chấp nhận nhiều định dạng tệp cấu hình:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Để xem cách cấu hình các ngôn ngữ có sẵn hoặc các tham số khác, hãy tham khảo [tài liệu cấu hình tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Chạy các lệnh intlayer

### Xác thực

- **[Đăng nhập](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/login.md)** - Xác thực với Intlayer CMS và lấy thông tin đăng nhập

### Các Lệnh Cơ Bản

- **[Xây dựng Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/build.md)** - Xây dựng từ điển của bạn từ các tệp khai báo nội dung
- **[Theo dõi Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/watch.md)** - Theo dõi các thay đổi và tự động xây dựng từ điển
- **[Kiểm tra Phiên bản CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/version.md)** - Kiểm tra phiên bản Intlayer CLI đã cài đặt

### Quản lý Từ điển

- **[Đẩy Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/push.md)** - Đẩy từ điển lên trình chỉnh sửa và CMS của Intlayer
- **[Kéo Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/pull.md)** - Kéo từ điển từ trình chỉnh sửa và CMS của Intlayer
- **[Điền Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md)** - Điền, kiểm tra và dịch từ điển bằng AI
- **[Kiểm tra Bản dịch Thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/test.md)** - Kiểm tra và xác định các bản dịch còn thiếu
- **[Liệt kê Tệp Khai báo Nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/list.md)** - Liệt kê tất cả các tệp khai báo nội dung trong dự án của bạn

### Quản lý Thành phần

- **[Chuyển đổi Thành phần](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/transform.md)** - Chuyển đổi các thành phần hiện có để sử dụng Intlayer

### Cấu hình

- **[Quản lý Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/configuration.md)** - Lấy và đẩy cấu hình Intlayer của bạn lên CMS

### Quản lý Tài liệu

- **[Dịch Tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate.md)** - Tự động dịch các tệp tài liệu bằng AI
- **[Xem lại Tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-review.md)** - Xem lại các tệp tài liệu để đảm bảo chất lượng và tính nhất quán

### Trình chỉnh sửa & Đồng bộ trực tiếp

- **[Lệnh Trình chỉnh sửa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/editor.md)** - Sử dụng các lệnh trình chỉnh sửa Intlayer
- **[Lệnh Đồng bộ Trực tiếp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/live.md)** - Sử dụng Đồng bộ Trực tiếp để phản ánh các thay đổi nội dung CMS trong thời gian chạy

### Công cụ Phát triển

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/sdk.md)** - Sử dụng Intlayer CLI SDK trong mã của bạn
- **[Lệnh Gỡ lỗi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/debug.md)** - Gỡ lỗi và khắc phục sự cố Intlayer CLI

## Sử dụng các lệnh intlayer trong `package.json` của bạn

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Lưu ý**: Bạn cũng có thể sử dụng các bí danh ngắn hơn:
>
> - `npx intlayer list` thay vì `npx intlayer content list`
> - `npx intlayer test` thay vì `npx intlayer content test`
