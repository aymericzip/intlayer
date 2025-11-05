---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Lỗi ESBuild
description: Tìm hiểu cách sửa lỗi ESBuild.
keywords:
  - esbuild
  - lỗi
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
---

# Lỗi ESBuild

Nếu bạn gặp lỗi ESBuild trong quá trình build, rất có thể plugin Intlayer chưa được cấu hình đúng cách.

ESBuild chịu trách nhiệm đọc các file khai báo nội dung (`.content.{ts,js,mjs,cjs,json}`) và tạo ra các từ điển tương ứng trong thư mục `.intlayer/dictionary`. Cũng như đọc file cấu hình (`intlayer.config.ts`).

Intlayer cung cấp các plugin để tích hợp với các bundler của bạn. Nó được thiết kế để alias các component chỉ chạy trên phía server.

Nếu bạn đang sử dụng một framework như Next.js (Webpack / Turbopack), Vite, hoặc React Native, Lynx, v.v. Intlayer cung cấp một plugin mà bạn có thể sử dụng để tích hợp Intlayer vào ứng dụng của mình. Vì vậy, hãy tham khảo tài liệu cụ thể của framework bạn đang dùng để tìm hiểu cách tích hợp plugin.
