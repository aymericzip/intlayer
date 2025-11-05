---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Tài liệu Intlayer - Hướng dẫn i18n hoàn chỉnh cho JavaScript
description: Tài liệu hoàn chỉnh cho Intlayer, thư viện quốc tế hóa hiện đại cho JavaScript, React, Next.js, Express và nhiều framework khác.
keywords:
  - intlayer
  - quốc tế hóa
  - i18n
  - JavaScript
  - React
  - Next.js
  - tài liệu
  - dịch thuật
  - đa ngôn ngữ
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu Intlayer

Chào mừng bạn đến với tài liệu chính thức của **Intlayer**! Ở đây, bạn sẽ tìm thấy mọi thứ cần thiết để tích hợp, cấu hình và làm chủ Intlayer cho tất cả các nhu cầu quốc tế hóa (i18n) của bạn, dù bạn đang làm việc với **Next.js**, **React**, **Vite**, **Express**, hay môi trường JavaScript khác.

Intlayer cung cấp một phương pháp linh hoạt và hiện đại để dịch ứng dụng của bạn. Tài liệu của chúng tôi sẽ hướng dẫn bạn từ việc cài đặt và thiết lập đến các tính năng nâng cao như **dịch thuật hỗ trợ AI**, định nghĩa **TypeScript**, và hỗ trợ **server component**, giúp bạn tạo ra trải nghiệm đa ngôn ngữ liền mạch.

---

## Bắt đầu

- **[Giới thiệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/introduction.md)**  
  Nhận tổng quan về cách Intlayer hoạt động, các tính năng cốt lõi của nó, và lý do tại sao nó là một bước đột phá cho i18n.

- **[Cách Intlayer Hoạt Động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/how_works_intlayer.md)**  
  Tìm hiểu sâu về thiết kế kiến trúc và cách Intlayer xử lý mọi thứ từ khai báo nội dung đến việc cung cấp bản dịch.

- **[Cấu Hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)**  
  Tùy chỉnh Intlayer để phù hợp với nhu cầu dự án của bạn. Khám phá các tùy chọn middleware, cấu trúc thư mục, và các thiết lập nâng cao.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)**  
  Quản lý nội dung và bản dịch bằng công cụ dòng lệnh của chúng tôi. Khám phá cách đẩy và kéo nội dung, tự động hóa bản dịch, và nhiều hơn nữa.

- **[Trình Soạn Thảo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)**  
  Đơn giản hóa việc cộng tác với những người không phải là nhà phát triển và tăng cường bản dịch của bạn với AI, trực tiếp trong CMS miễn phí và trực quan của chúng tôi.

---

## Các Khái Niệm Cốt Lõi

### Từ Điển

Tổ chức nội dung đa ngôn ngữ của bạn gần với mã nguồn để giữ mọi thứ nhất quán và dễ bảo trì.

- **[Bắt Đầu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)**  
  Tìm hiểu những kiến thức cơ bản về cách khai báo nội dung trong Intlayer.

- **[Bản Dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)**  
  Hiểu cách bản dịch được tạo ra, lưu trữ và sử dụng trong ứng dụng của bạn.

- **[Liệt Kê](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md)**  
  Quản lý dễ dàng các tập dữ liệu lặp lại hoặc cố định trên nhiều ngôn ngữ khác nhau.

- **[Điều Kiện](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/conditional.md)**  
  Tìm hiểu cách sử dụng logic điều kiện trong Intlayer để tạo nội dung động.

- **[Giới Tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md)**  
  Tìm hiểu cách sử dụng logic giới tính trong Intlayer để tạo nội dung động.

- **[Chèn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)**
  Khám phá cách chèn giá trị vào chuỗi bằng cách sử dụng các chỗ giữ chèn.

- **[Lấy Hàm](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md)**  
  Xem cách lấy nội dung động với logic tùy chỉnh để phù hợp với quy trình làm việc của dự án bạn.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)**  
  Tìm hiểu cách sử dụng Markdown trong Intlayer để tạo nội dung phong phú.

- **[Nhúng Tệp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file_embeddings.md)**  
  Khám phá cách nhúng các tệp bên ngoài trong Intlayer để sử dụng chúng trong trình soạn thảo nội dung.

- **[Lồng nhau](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/nesting.md)**  
  Hiểu cách lồng nội dung trong Intlayer để tạo các cấu trúc phức tạp.

---

## Môi trường & Tích hợp

Chúng tôi xây dựng Intlayer với sự linh hoạt trong tâm trí, cung cấp tích hợp liền mạch với các framework và công cụ xây dựng phổ biến:

- **[Intlayer với Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)**
- **[Intlayer với Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)**
- **[Intlayer với Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_14.md)**
- **[Intlayer với Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md)**
- **[Intlayer với React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)**
- **[Intlayer với Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)**
- **[Intlayer với React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_router_v7.md)**
- **[Intlayer với Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)**
- **[Intlayer với React Native và Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_native+expo.md)**
- **[Intlayer với Lynx và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_lynx+react.md)**
- **[Intlayer với Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+preact.md)**
- **[Intlayer với Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)**
- **[Intlayer với Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)**
- **[Intlayer với Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_express.md)**
- **[Intlayer với NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nestjs.md)**
- **[Intlayer với Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular.md)**

Mỗi hướng dẫn tích hợp bao gồm các thực hành tốt nhất để sử dụng các tính năng của Intlayer, như **render phía máy chủ (server-side rendering)**, **định tuyến động (dynamic routing)**, hoặc **render phía khách (client-side rendering)**, giúp bạn duy trì một ứng dụng nhanh, thân thiện với SEO và có khả năng mở rộng cao.

---

## Các gói

Thiết kế mô-đun của Intlayer cung cấp các gói chuyên biệt cho các môi trường và nhu cầu cụ thể:

### `intlayer`

Các hàm tiện ích cốt lõi để cấu hình và quản lý thiết lập i18n của bạn.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Tận dụng Intlayer trong các ứng dụng dựa trên **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/express-intlayer/t.md)**  
  Một trợ giúp dịch thuật tối giản, dễ sử dụng cho các route và view trên server của bạn.

### `react-intlayer`

Nâng cao các ứng dụng **React** của bạn với các hook mạnh mẽ:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Tích hợp liền mạch với **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md)**

---

## Tài nguyên bổ sung

- **[Blog: Intlayer và i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_i18next.md)**  
  Tìm hiểu cách Intlayer bổ sung và so sánh với thư viện phổ biến **i18next**.

- **[Hướng dẫn trực tiếp trên YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Xem một bản demo toàn diện và học cách tích hợp Intlayer theo thời gian thực.

---

## Đóng góp & Phản hồi

Chúng tôi đánh giá cao sức mạnh của phát triển mã nguồn mở và cộng đồng. Nếu bạn muốn đề xuất cải tiến, thêm hướng dẫn mới, hoặc sửa bất kỳ vấn đề nào trong tài liệu của chúng tôi, hãy thoải mái gửi Pull Request hoặc mở một issue trên [kho GitHub của chúng tôi](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Sẵn sàng dịch ứng dụng của bạn nhanh hơn và hiệu quả hơn?** Hãy khám phá tài liệu của chúng tôi để bắt đầu sử dụng Intlayer ngay hôm nay. Trải nghiệm một phương pháp quốc tế hóa mạnh mẽ, tinh gọn giúp giữ nội dung của bạn có tổ chức và đội ngũ của bạn làm việc hiệu quả hơn.
