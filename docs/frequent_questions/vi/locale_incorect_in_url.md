---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Lấy Sai Locale Từ URL
description: Tìm hiểu cách khắc phục lỗi lấy sai locale từ URL.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Lấy Sai Locale Từ URL

## Mô Tả Vấn Đề

Khi cố gắng truy cập tham số locale từ URL, bạn có thể gặp phải vấn đề giá trị locale bị sai:

```js
const { locale } = await params;
console.log(locale); // trả về "about" thay vì locale mong đợi
```

## Giải Pháp

### 1. Kiểm Tra Cấu Trúc Thư Mục

Đảm bảo đường dẫn app router của Next.js của bạn theo cấu trúc sau:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Kiểm Tra Cấu Hình Middleware

Vấn đề thường xảy ra khi middleware không tồn tại hoặc không được kích hoạt. File middleware nên được đặt tại:

```bash
src/middleware.ts
```

Middleware này chịu trách nhiệm viết lại các route khi `prefixDefault` được đặt là `false`. Ví dụ, nó sẽ viết lại `/en/about` thành `/about`.

### 3. Mẫu URL Dựa Trên Cấu Hình

#### Cấu Hình Mặc Định (`prefixDefault: false`, `noPrefix: false`)

- Tiếng Anh: `/about`
- Tiếng Pháp: `/fr/about`
- Tiếng Tây Ban Nha: `/es/about`

#### Với `prefixDefault: true`

- Tiếng Anh: `/en/about`
- Tiếng Pháp: `/fr/about`
- Tiếng Tây Ban Nha: `/es/about`

#### Với `noPrefix: true`

- Tiếng Anh: `/about`
- Tiếng Pháp: `/about`
- Tiếng Tây Ban Nha: `/about`

Để biết thêm chi tiết về các tùy chọn cấu hình này, hãy xem [Tài liệu Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).
