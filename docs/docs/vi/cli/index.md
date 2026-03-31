---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Tất cả các lệnh CLI của Intlayer cho trang web đa ngôn ngữ của bạn
description: Tìm hiểu cách sử dụng Intlayer CLI để quản lý trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - CLI
  - Giao diện dòng lệnh
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Thêm nội dung lệnh standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Thêm nội dung lệnh CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Thêm nội dung lệnh liệt kê dự án"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm nội dung lệnh khởi tạo"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Thêm nội dung lệnh trích xuất"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Thêm tùy chọn skipIfExists vào lệnh translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Thêm bí danh cho các đối số và lệnh CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Thêm tùy chọn xây dựng vào các lệnh"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Thêm nội dung lệnh phiên bản"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Đặt tùy chọn verbose mặc định là true qua CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Thêm lệnh theo dõi và tùy chọn with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Thêm nội dung lệnh chỉnh sửa"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Thêm lệnh kiểm tra và liệt kê nội dung"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Cập nhật tài liệu tham số cho lệnh CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Intlayer CLI - Tất cả các lệnh CLI của Intlayer cho trang web đa ngôn ngữ của bạn

---

## Mục lục

<TOC/>

---

## Cài đặt gói

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Nếu gói `intlayer` đã được cài đặt, CLI sẽ tự động được cài đặt. Bạn có thể bỏ qua bước này.

## Gói intlayer-cli

Gói `intlayer-cli` được thiết kế để chuyển đổi các [khai báo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) của bạn vào các từ điển.

Gói này chuyển đổi tất cả các tệp Intlayer, chẳng hạn như `src/**/*.content.{ts|js|mjs|cjs|json}`. [Xem cách khai báo các tệp khai báo Intlayer của bạn](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Để diễn giải các từ điển Intlayer, bạn có thể sử dụng các trình diễn giải như [react-intlayer](https://www.npmjs.com/package/react-intlayer) hoặc [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Hỗ trợ tệp cấu hình

Intlayer chấp nhận nhiều định dạng tệp cấu hình khác nhau:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Để tìm hiểu cách cấu hình các ngôn ngữ có sẵn hoặc các tham số khác, hãy xem [tài liệu cấu hình tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Thực hiện các lệnh Intlayer

### Xác thực

- **[Đăng nhập](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/login.md)** - Xác thực với Intlayer CMS và nhận thông tin xác thực truy cập

### Các lệnh cốt lõi

- **[Xây dựng từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/build.md)** - Xây dựng từ điển của bạn từ các tệp khai báo nội dung
- **[Theo dõi từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/watch.md)** - Theo dõi các thay đổi và tự động xây dựng lại từ điển
- **[Tạo gói đóng gói độc lập](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/standalone.md)** - Tạo một bản đóng gói JavaScript độc lập chứa Intlayer và các gói được chỉ định
- **[Kiểm tra phiên bản CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/version.md)** - Kiểm tra phiên bản Intlayer CLI đã cài đặt
- **[Liệt kê dự án](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/list_projects.md)** - Liệt kê tất cả các dự án Intlayer trong một thư mục hoặc kho lưu trữ git

### Quản lý từ điển

- **[Đẩy từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/push.md)** - Đẩy các từ điển lên Trình chỉnh sửa Intlayer và CMS
- **[Kéo từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/pull.md)** - Kéo các từ điển từ Trình chỉnh sửa Intlayer và CMS
- **[Điền từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md)** - Điền, kiểm tra và dịch các từ điển bằng AI
- **[Kiểm tra bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/test.md)** - Kiểm tra và xác định các bản dịch còn thiếu
- **[Liệt kê tệp khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/list.md)** - Liệt kê tất cả các tệp khai báo nội dung trong dự án của bạn

### Quản lý thành phần

- **[Trích xuất chuỗi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md)** - Trích xuất chuỗi từ các thành phần vào tệp .content nằm gần thành phần đó

### Cấu hình

- **[Khởi tạo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/init.md)** - Thiết lập Intlayer trong dự án của bạn với cấu hình tự động
- **[Quản lý cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/configuration.md)** - Nhận cấu hình Intlayer của bạn và đẩy lên CMS

### Quản lý tài liệu

- **[Dịch tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate.md)** - Tự động dịch các tệp tài liệu bằng AI
- **[Đánh giá tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-review.md)** - Đánh giá tệp tài liệu để đảm bảo chất lượng và tính nhất quán

### Trình chỉnh sửa và Đồng bộ trực tiếp (Live Sync)

- **[Các lệnh trình chỉnh sửa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/editor.md)** - Sử dụng các lệnh của Trình chỉnh sửa Intlayer
- **[Các lệnh đồng bộ trực tiếp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/live.md)** - Sử dụng Live Sync để áp dụng các thay đổi nội dung từ CMS trong thời gian thực

### CI/CD và Tự động hóa

- **[Lệnh CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md)** - Thực hiện các lệnh Intlayer với thông tin xác thực được tự động đưa vào cho các luồng CI/CD

### Công cụ dành cho nhà phát triển

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/sdk.md)** - Sử dụng Intlayer CLI SDK trong mã của riêng bạn
- **[Lệnh gỡ lỗi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/debug.md)** - Gỡ lỗi và giải quyết các vấn đề với Intlayer CLI

## Sử dụng các lệnh Intlayer trong tệp `package.json` của bạn

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Lưu ý**: Bạn cũng có thể sử dụng các bí danh ngắn hơn:
>
> - `npx intlayer list`: thay cho `npx intlayer content list`
> - `npx intlayer test`: thay cho `npx intlayer content test`
> - `npx intlayer projects-list` hoặc `npx intlayer pl`: thay cho `npx intlayer projects list`
