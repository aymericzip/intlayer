---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | Đưa nội dung của bạn ra ngoài vào Intlayer CMS
description: Đưa nội dung của bạn ra ngoài vào Intlayer CMS để ủy quyền quản lý nội dung cho nhóm của bạn.
keywords:
  - CMS
  - Trình chỉnh sửa trực quan
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Chuyển phần 'Đồng bộ trực tiếp' sang trang riêng (live-sync.md), chỉ giữ lại phần giới thiệu ngắn gọn và liên kết ở đây"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Thêm tài liệu đồng bộ trực tiếp"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Thay thế trường `hotReload` bằng `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tài liệu Hệ thống Quản lý Nội dung (CMS) Intlayer

<iframe title="Trình chỉnh sửa trực quan + CMS cho Ứng dụng Web của bạn: Giải thích về Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS là một ứng dụng cho phép bạn đưa nội dung của dự án Intlayer ra ngoài.

Để làm được điều đó, Intlayer giới thiệu khái niệm 'từ điển từ xa'.

![Giao diện Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Mục lục

<TOC/>

---

## Hiểu về từ điển từ xa

Intlayer phân biệt giữa 'từ điển cục bộ' và 'từ điển từ xa'.

- 'Từ điển cục bộ' là từ điển được khai báo trong dự án Intlayer của bạn. Ví dụ như file khai báo của một nút bấm, hoặc thanh điều hướng của bạn. Việc đưa nội dung ra ngoài không có ý nghĩa trong trường hợp này vì nội dung này không được dự kiến thay đổi thường xuyên.

- 'Từ điển từ xa' là từ điển được quản lý thông qua Intlayer CMS. Điều này có thể hữu ích để cho phép nhóm của bạn quản lý nội dung trực tiếp trên trang web của bạn, đồng thời nhằm sử dụng các tính năng thử nghiệm A/B và tối ưu hóa SEO tự động.

## Trình chỉnh sửa trực quan và CMS

[Trình chỉnh sửa Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) là một công cụ cho phép bạn quản lý nội dung trong trình chỉnh sửa trực quan dành cho các từ điển cục bộ. Khi có sự thay đổi, nội dung sẽ được thay thế trong code-base. Điều này có nghĩa là ứng dụng sẽ được xây dựng lại và trang sẽ được tải lại để hiển thị nội dung mới.

Ngược lại, Intlayer CMS là một công cụ cho phép bạn quản lý nội dung trong trình chỉnh sửa trực quan dành cho các từ điển từ xa. Khi có sự thay đổi, nội dung sẽ **không** ảnh hưởng đến code-base của bạn. Và trang web sẽ tự động hiển thị nội dung đã thay đổi.

## Tích hợp

Để biết thêm chi tiết về cách cài đặt gói, xem phần liên quan bên dưới:

### Tích hợp với Next.js

Để tích hợp với Next.js, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md).

### Tích hợp với Create React App

Để tích hợp với Create React App, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md).

### Tích hợp với Vite + React

Để tích hợp với Vite + React, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md).

## Cấu hình

Chạy lệnh sau để đăng nhập vào Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Điều này sẽ mở trình duyệt mặc định của bạn để hoàn tất quá trình xác thực và nhận thông tin đăng nhập cần thiết (Client ID và Client Secret) để sử dụng các dịch vụ Intlayer.

Trong file cấu hình Intlayer của bạn, bạn có thể tùy chỉnh các thiết lập CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bắt buộc
     *
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan sẽ hướng tới.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Bắt buộc
     *
     * Client ID và client secret là bắt buộc để kích hoạt trình chỉnh sửa.
     * Chúng cho phép xác định người dùng đang chỉnh sửa nội dung.
     * Có thể lấy được bằng cách tạo một client mới trong Bảng điều khiển Intlayer - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của CMS.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của backend.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Nếu bạn chưa có client ID và client secret, bạn có thể lấy chúng bằng cách tạo một client mới trong [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Để xem tất cả các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Sử dụng CMS

### Đẩy cấu hình của bạn

Để cấu hình Intlayer CMS, bạn có thể sử dụng các lệnh của [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/vi/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Nếu bạn sử dụng biến môi trường trong tệp cấu hình `intlayer.config.ts`, bạn có thể chỉ định môi trường mong muốn bằng cách sử dụng đối số `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Lệnh này sẽ tải cấu hình của bạn lên Intlayer CMS.

### Đẩy một từ điển

Để chuyển đổi các từ điển locale của bạn thành một từ điển từ xa, bạn có thể sử dụng các lệnh của [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/vi/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Nếu bạn sử dụng biến môi trường trong tệp cấu hình `intlayer.config.ts`, bạn có thể chỉ định môi trường mong muốn bằng cách sử dụng đối số `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Lệnh này sẽ tải các từ điển nội dung ban đầu của bạn lên, giúp chúng có thể được lấy và chỉnh sửa bất đồng bộ thông qua nền tảng Intlayer.

### Chỉnh sửa từ điển

Sau đó, bạn sẽ có thể xem và quản lý từ điển của mình trong [Intlayer CMS](https://app.intlayer.org/content).

## Đồng bộ trực tiếp (Live sync)

Live Sync cho phép ứng dụng của bạn phản ánh các thay đổi nội dung CMS trong thời gian chạy. Không cần xây dựng lại hoặc triển khai lại. Khi được bật, các cập nhật sẽ được truyền đến máy chủ Live Sync để làm mới các từ điển mà ứng dụng của bạn đang đọc.

Để xem hướng dẫn thiết lập đầy đủ (kích hoạt, khởi động máy chủ Live Sync, quy trình phát triển cục bộ và các giới hạn), xem [tài liệu Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/live-sync.md).

## Gỡ lỗi

Nếu bạn gặp bất kỳ vấn đề nào với CMS, hãy kiểm tra các điều sau:

- Ứng dụng đang chạy.

- Cấu hình [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) được thiết lập chính xác trong file cấu hình Intlayer của bạn.
  - Các trường bắt buộc:
    - URL ứng dụng phải khớp với URL bạn đã thiết lập trong cấu hình editor (`applicationURL`).
    - URL CMS

- Đảm bảo rằng cấu hình dự án đã được đẩy lên Intlayer CMS.

- Trình chỉnh sửa trực quan sử dụng iframe để hiển thị trang web của bạn. Đảm bảo rằng Chính sách Bảo mật Nội dung (CSP) của trang web cho phép URL CMS làm `frame-ancestors` (mặc định là 'https://intlayer.org'). Kiểm tra bảng điều khiển của editor để phát hiện lỗi.
