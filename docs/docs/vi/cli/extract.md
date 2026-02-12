---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Trích xuất chuỗi
description: Tìm hiểu cách trích xuất chuỗi từ các component của bạn vào một tệp .content nằm gần component.
keywords:
  - Trích xuất
  - Components
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Trích xuất chuỗi

```bash
npx intlayer extract
```

Lệnh này phân tích các tệp mã của bạn để trích xuất chuỗi từ các component vào một tệp .content nằm gần component. Nó hỗ trợ việc chọn tệp tương tác hoặc chỉ định tệp cụ thể để trích xuất.

## Bí danh:

- `npx intlayer ext`

## Tham số:

**Tùy chọn chọn tệp:**

- **`-f, --file [files...]`**: Danh sách các tệp cụ thể để trích xuất. Nếu không được cung cấp, CLI sẽ quét các tệp khớp (`**/*.{tsx,jsx,vue,svelte,ts,js}`) và nhắc bạn chọn những tệp sẽ trích xuất.

  > Ví dụ: `npx intlayer extract -f src/components/MyComponent.tsx`

**Tùy chọn đầu ra:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Thư mục để lưu các tệp khai báo nội dung được tạo.

  > Ví dụ: `npx intlayer extract -o src/content`

- **`--code-only`**: Chỉ trích xuất mã component (không ghi khai báo nội dung).

  > Ví dụ: `npx intlayer extract --code-only`

- **`--declaration-only`**: Chỉ tạo khai báo nội dung (không ghi lại component).

  > Ví dụ: `npx intlayer extract --declaration-only`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc của dự án.
- **`--env`**: Chỉ định môi trường.
- **`--env-file`**: Cung cấp tệp môi trường tùy chỉnh.
- **`--verbose`**: Bật ghi nhật ký chi tiết.

**Các plugin bắt buộc:**

Lệnh extract hoạt động mà không cần plugin bổ sung đối với các tệp TypeScript / JSX. Tuy nhiên, nó yêu cầu các plugin sau phải được cài đặt cho các dự án Vue và Svelte:

- **`@intlayer/vue-transformer`**: Cho các tệp Vue.
- **`@intlayer/svelte-transformer`**: Cho các tệp Svelte.
