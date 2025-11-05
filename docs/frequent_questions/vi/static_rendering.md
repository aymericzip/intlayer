---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Kết xuất Tĩnh và Động với i18n trong Next.js
description: Tìm hiểu cách sử dụng kết xuất tĩnh và động với i18n trong Next.js.
keywords:
  - tĩnh
  - động
  - kết xuất
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - cấu hình
slugs:
  - frequent-questions
  - static-rendering
---

# Kết xuất Tĩnh và Động với i18n trong Next.js

## Vấn đề với **next-intl**

- **Chuyện gì xảy ra?**
  Khi bạn sử dụng `useTranslations`, `getTranslations`, hoặc bất kỳ helper nào của next-intl _bên trong một Server Component_ trên một ứng dụng có định tuyến i18n (`/en/…`, `/fr/…`), Next.js sẽ đánh dấu toàn bộ route đó là **động**. ([Next Intl][1])

- **Tại sao?**
  next-intl tra cứu locale hiện tại từ một header chỉ dành cho request (`x-next-intl-locale`) thông qua `headers()`. Vì `headers()` là một **API động**, bất kỳ component nào sử dụng nó sẽ mất đi khả năng tối ưu tĩnh. ([Next Intl][1], [Next.js][2])

- **Giải pháp chính thức (boilerplate)**
  1. Xuất `generateStaticParams` với tất cả các locale được hỗ trợ.
  2. Gọi `setRequestLocale(locale)` trong **mọi** layout/trang _trước khi_ bạn gọi `useTranslations`. ([Next Intl][1])
     Điều này loại bỏ sự phụ thuộc vào header, nhưng bạn sẽ có thêm mã để duy trì và một API không ổn định trong môi trường production.

## Cách **intlayer** tránh được vấn đề này

**Lựa chọn thiết kế**

1. **Chỉ dùng tham số route** – Locale lấy từ đoạn URL `[locale]` mà Next.js đã truyền sẵn cho mỗi trang.
2. **Gói biên dịch thời gian biên dịch** – Các bản dịch được nhập dưới dạng các module ES thông thường, vì vậy chúng được tree-shaken và nhúng vào thời gian biên dịch.
3. **Không dùng API động** – `useT()` đọc từ React context, không phải từ `headers()` hay `cookies()`.
4. **Không cần cấu hình thêm** – Khi các trang của bạn nằm dưới `app/[locale]/`, Next.js tự động prerender một file HTML cho mỗi locale.
