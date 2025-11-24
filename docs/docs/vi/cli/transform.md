---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Chuyển đổi Components
description: Tìm hiểu cách chuyển đổi các component hiện có để sử dụng Intlayer.
keywords:
  - Chuyển đổi
  - Components
  - Di cư
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Chuyển đổi components

```bash
npx intlayer transform
```

Lệnh này phân tích các file mã của bạn để hỗ trợ di cư các component hiện có sang sử dụng Intlayer. Nó hỗ trợ lựa chọn file tương tác hoặc chỉ định file cụ thể để chuyển đổi.

## Bí danh:

- `npx intlayer trans`

## Tham số:

**Tùy chọn chọn file:**

- **`-f, --file [files...]`**: Danh sách các file cụ thể để chuyển đổi. Nếu không được cung cấp, CLI sẽ quét các file phù hợp (`**/*.{tsx,jsx,vue,svelte,ts,js}`) và yêu cầu bạn chọn những file nào để chuyển đổi.

  > Ví dụ: `npx intlayer transform -f src/components/MyComponent.tsx`

**Tùy chọn đầu ra:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Thư mục để lưu các file khai báo nội dung được tạo ra.

  > Ví dụ: `npx intlayer transform -o src/content`

- **`--code-only`**: Chỉ chuyển đổi mã component (không ghi khai báo nội dung).

  > Ví dụ: `npx intlayer transform --code-only`

- **`--declaration-only`**: Chỉ tạo khai báo nội dung (không viết lại component).

  > Ví dụ: `npx intlayer transform --declaration-only`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--env`**: Chỉ định môi trường.
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh.
- **`--verbose`**: Bật ghi log chi tiết.

**Các plugin cần thiết:**

Lệnh transform hoạt động mà không cần plugin bổ sung trên các file TypeScript / JSX. Tuy nhiên, nó yêu cầu cài đặt các plugin sau cho các dự án Vue và Svelte:

- **`@intlayer/vue-transformer`**: Dành cho các file Vue.
- **`@intlayer/svelte-transformer`**: Dành cho các file Svelte.
