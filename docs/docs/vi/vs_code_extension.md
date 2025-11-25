---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Tiện ích mở rộng chính thức cho VS Code
description: Tìm hiểu cách sử dụng tiện ích mở rộng Intlayer trong VS Code để nâng cao quy trình phát triển của bạn. Dễ dàng điều hướng giữa các nội dung được bản địa hóa và quản lý từ điển của bạn một cách hiệu quả.
keywords:
  - Tiện ích mở rộng VS Code
  - Intlayer
  - Bản địa hóa
  - Công cụ phát triển
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Thêm ảnh gif demo
  - version: 6.1.0
    date: 2025-09-24
    changes: Thêm phần lựa chọn môi trường
  - version: 6.0.0
    date: 2025-09-22
    changes: Tab Intlayer / Lệnh Điền & Kiểm tra
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tiện ích mở rộng chính thức cho VS Code

## Tổng quan

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) là tiện ích mở rộng chính thức của Visual Studio Code dành cho **Intlayer**, được thiết kế để cải thiện trải nghiệm của nhà phát triển khi làm việc với nội dung được bản địa hóa trong các dự án của bạn.

![Tiện ích mở rộng Intlayer cho VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Liên kết tiện ích mở rộng: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Tính năng

![Trích xuất nội dung](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_extract_content.gif?raw=true)

- **Trích xuất Nội dung** – Trích xuất nội dung từ các thành phần React / Vue / Svelte của bạn

![Điền từ điển](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Điều hướng tức thì** – Nhảy nhanh đến tệp nội dung chính xác khi nhấp vào khóa `useIntlayer`.
- **Điền từ điển** – Điền từ điển với nội dung từ dự án của bạn.

![Liệt kê các lệnh](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Truy cập dễ dàng các lệnh Intlayer** – Xây dựng, đẩy, kéo, điền, kiểm tra từ điển nội dung một cách dễ dàng.

![Tạo tệp nội dung](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Trình tạo khai báo nội dung** – Tạo các tệp nội dung từ điển ở nhiều định dạng khác nhau (`.ts`, `.esm`, `.cjs`, `.json`).

![Kiểm tra từ điển](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Kiểm tra từ điển** – Kiểm tra từ điển để phát hiện các bản dịch còn thiếu.

![Xây dựng lại từ điển](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Giữ cho từ điển của bạn luôn cập nhật** – Giữ cho từ điển của bạn luôn cập nhật với nội dung mới nhất từ dự án của bạn.

![Tab Intlayer (Thanh hoạt động)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Tab Intlayer (Thanh hoạt động)** – Duyệt và tìm kiếm từ điển từ một tab bên chuyên dụng với thanh công cụ và các hành động ngữ cảnh (Xây dựng, Kéo, Đẩy, Điền, Làm mới, Kiểm tra, Tạo tệp).

## Sử dụng

### Điều hướng nhanh

1. Mở một dự án sử dụng **react-intlayer**.
2. Tìm một lời gọi đến `useIntlayer()`, ví dụ:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Nhấn Command và click** (`⌘+Click` trên macOS) hoặc **Ctrl+Click** (trên Windows/Linux) vào khóa (ví dụ, `"app"`).
4. VS Code sẽ tự động mở tệp từ điển tương ứng, ví dụ, `src/app.content.ts`.

### Tab Intlayer (Thanh hoạt động)

Sử dụng tab bên để duyệt và quản lý từ điển:

- Mở biểu tượng Intlayer trên Thanh hoạt động.
- Trong **Tìm kiếm**, nhập để lọc từ điển và các mục nhập theo thời gian thực.
- Trong **Dictionaries**, duyệt qua các môi trường, từ điển và tệp. Sử dụng thanh công cụ để Xây dựng, Kéo, Đẩy, Điền, Làm mới, Kiểm tra và Tạo tệp từ điển. Nhấp chuột phải để thực hiện các hành động ngữ cảnh (Kéo/Đẩy trên từ điển, Điền trên tệp). Tệp đang mở trong trình soạn thảo sẽ tự động được hiển thị trong cây khi có thể.

### Truy cập các lệnh

Bạn có thể truy cập các lệnh từ **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Xây dựng từ điển**
- **Đẩy từ điển**
- **Kéo từ điển**
- **Điền từ điển**
- **Kiểm tra từ điển**
- **Tạo tệp từ điển**

### Tải biến môi trường

Intlayer khuyến nghị lưu các khóa API AI của bạn, cũng như ID và bí mật client Intlayer trong các biến môi trường.

Phần mở rộng có thể tải các biến môi trường từ workspace của bạn để chạy các lệnh Intlayer với ngữ cảnh chính xác.

- **Thứ tự tải (theo ưu tiên)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Không phá hủy**: các giá trị `process.env` hiện có sẽ không bị ghi đè.
- **Phạm vi**: các tệp được giải quyết từ thư mục cơ sở đã cấu hình (mặc định là thư mục gốc của workspace).

#### Chọn môi trường đang hoạt động

- **Command Palette**: mở palette và chạy `Intlayer: Select Environment`, sau đó chọn môi trường (ví dụ: `development`, `staging`, `production`). Phần mở rộng sẽ cố gắng tải tệp đầu tiên có sẵn trong danh sách ưu tiên ở trên và hiển thị thông báo như “Loaded env from .env.<env>.local”.
- **Cài đặt**: vào `Settings → Extensions → Intlayer`, và thiết lập:
  - **Environment**: tên môi trường được sử dụng để giải quyết các tệp `.env.<env>*`.
  - (Tùy chọn) **Env File**: đường dẫn rõ ràng đến một tệp `.env`. Khi được cung cấp, nó sẽ ưu tiên hơn danh sách suy luận.

#### Monorepos và thư mục tùy chỉnh

Nếu các tệp `.env` của bạn nằm ngoài thư mục gốc của workspace, hãy đặt **Base Directory** trong `Settings → Extensions → Intlayer`. Bộ tải sẽ tìm các tệp `.env` tương đối với thư mục đó.
