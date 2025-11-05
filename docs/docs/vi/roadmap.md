---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Lộ trình phát triển
description: Khám phá lộ trình phát triển của Intlayer. Xem tất cả các tính năng mà Intlayer đã triển khai và dự định sẽ triển khai.
keywords:
  - Lộ trình phát triển
  - Intlayer
  - Quốc tế hóa
  - CMS
  - Hệ thống quản lý nội dung
  - Trình chỉnh sửa trực quan
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: Thêm hỗ trợ Preact và Nuxt, MCP Server, cập nhật CLI
  - version: 5.5.11
    date: 2025-06-29
    changes: Thêm các lệnh `docs`
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Intlayer: Tổng quan tính năng & Lộ trình phát triển

Intlayer là một giải pháp quản lý nội dung và quốc tế hóa được thiết kế để tối ưu hóa cách bạn khai báo, quản lý và cập nhật nội dung trên các ứng dụng của mình. Nó cung cấp các tính năng mạnh mẽ như khai báo nội dung tập trung hoặc phân tán, các tùy chọn quốc tế hóa đa dạng, hỗ trợ Markdown, kết xuất có điều kiện, tích hợp TypeScript/JavaScript/JSON, và nhiều hơn nữa. Dưới đây là tổng quan toàn diện về những gì Intlayer hiện đang cung cấp, cùng với các tính năng dự kiến trong lộ trình phát triển sắp tới.

---

## Mục lục

<TOC/>

---

## Các tính năng hiện tại

### 1. Khai báo nội dung

#### Tập trung hoặc phân tán

- **Tập trung**: Khai báo toàn bộ nội dung của bạn trong một tệp lớn duy nhất ở gốc ứng dụng, tương tự như i18next, để bạn có thể quản lý mọi thứ ở một nơi.
- **Phân tán**: Ngoài ra, bạn có thể chia nội dung thành các tệp riêng biệt ở cấp độ component hoặc tính năng để dễ dàng bảo trì hơn. Điều này giữ nội dung của bạn gần với mã liên quan (component, test, Storybook, v.v.). Việc loại bỏ một component cũng đảm bảo rằng bất kỳ nội dung liên quan nào cũng được xóa, tránh dữ liệu thừa làm lộn xộn codebase của bạn.

> Tài nguyên:
>
> - [Khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)

### 2. Quốc tế hóa

- Hỗ trợ **230 ngôn ngữ và vùng miền** (bao gồm các biến thể khu vực như tiếng Pháp (Pháp), tiếng Anh (Canada), tiếng Anh (Anh), tiếng Bồ Đào Nha (Bồ Đào Nha), v.v.).
- Dễ dàng quản lý bản dịch cho tất cả các vùng miền này từ một nơi.

> Tài nguyên:
>
> - [Quốc tế hóa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)

### 3. Hỗ trợ Markdown

- Khai báo nội dung bằng **Markdown**, cho phép bạn tự động định dạng văn bản với các đoạn văn, tiêu đề, liên kết và nhiều hơn nữa.
- Lý tưởng cho các bài đăng blog, bài viết, trang tài liệu hoặc bất kỳ trường hợp nào cần định dạng văn bản phong phú.

> Tài nguyên:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)

### 4. Hỗ trợ tệp bên ngoài

- Nhập nội dung từ các tệp bên ngoài dưới dạng văn bản, như TXT, HTML, JSON, YAML hoặc CSV.
- Sử dụng hàm `file` trong Intlayer để nhúng nội dung tệp bên ngoài vào từ điển, đảm bảo tích hợp liền mạch với Trình chỉnh sửa trực quan Intlayer và CMS.
- Hỗ trợ cập nhật nội dung động, nghĩa là khi tệp nguồn được chỉnh sửa, nội dung sẽ tự động cập nhật trong Intlayer.
- Cho phép quản lý nội dung đa ngôn ngữ bằng cách liên kết các tệp Markdown theo ngôn ngữ một cách động.

> Tài nguyên:
>
> - [Nhúng nội dung tệp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file.md)

### 5. Nội dung động & Lấy hàm

Intlayer cung cấp nhiều phương pháp để chèn và quản lý nội dung động, đảm bảo tính linh hoạt và thích ứng trong việc phân phối nội dung. Điều này bao gồm các hàm để chèn nội dung động, kết xuất có điều kiện, liệt kê, lồng nhau và lấy hàm.

1. Chèn nội dung động

   Sử dụng hàm insert để định nghĩa nội dung với các chỗ giữ chỗ ({{name}}, {{age}}, v.v.).

   Cho phép nội dung dạng mẫu thích ứng dựa trên đầu vào của người dùng, phản hồi API hoặc các nguồn dữ liệu động khác.

   Hoạt động mượt mà với các cấu hình TypeScript, ESM, CommonJS và JSON.

   Dễ dàng tích hợp với React Intlayer và Next Intlayer bằng cách sử dụng useIntlayer.

2. Kết xuất có điều kiện

   Định nghĩa nội dung thích ứng dựa trên các điều kiện cụ thể của người dùng, chẳng hạn như ngôn ngữ hoặc trạng thái xác thực.

   Tùy chỉnh trải nghiệm cá nhân hóa mà không cần sao chép nội dung qua nhiều tệp.

3. Liệt kê & Số nhiều

   Sử dụng hàm enu để định nghĩa các biến thể nội dung dựa trên giá trị số, phạm vi hoặc khóa tùy chỉnh.

   Đảm bảo tự động chọn cụm từ chính xác dựa trên giá trị đã cho.

   Hỗ trợ các quy tắc sắp xếp, đảm bảo hành vi dự đoán được.

4. Lồng nội dung & Tham chiếu phụ nội dung

   Sử dụng hàm nest để tham chiếu và tái sử dụng nội dung từ từ điển khác, giảm thiểu sự trùng lặp.

   Hỗ trợ quản lý nội dung có cấu trúc và phân cấp để dễ bảo trì hơn.

5. Lấy nội dung qua hàm

   Intlayer cho phép khai báo nội dung dưới dạng hàm, hỗ trợ cả việc lấy nội dung đồng bộ và bất đồng bộ.

   Hàm đồng bộ: Nội dung được tạo động tại thời điểm build.

   Hàm bất đồng bộ: Lấy dữ liệu từ các nguồn bên ngoài (ví dụ: API, cơ sở dữ liệu) một cách động.

   Tích hợp: Hoạt động với TypeScript, ESM và CommonJS nhưng không được hỗ trợ trong các tệp JSON hoặc nội dung từ xa.

### 6. Định dạng khai báo nội dung

Intlayer hỗ trợ **TypeScript** (cũng như JavaScript) và **JSON** để khai báo nội dung.

- **TypeScript**:
  - Đảm bảo cấu trúc nội dung của bạn chính xác và không thiếu bản dịch nào.
  - Cung cấp các chế độ xác thực nghiêm ngặt hoặc linh hoạt hơn.
  - Cho phép lấy dữ liệu động từ biến, hàm hoặc API bên ngoài.

- **JSON**:
  - Giúp dễ dàng tích hợp với các công cụ bên ngoài (như trình chỉnh sửa trực quan) nhờ định dạng chuẩn hóa.

  > Tài nguyên:
  >
  > - [Định dạng khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)

### 7. Loại bỏ, tối ưu gói và nhập khẩu động

- Intlayer tích hợp các plugin `Babel` và `SWC` để tối ưu gói của bạn và cải thiện hiệu suất. Nó thay thế các import, cho phép chỉ nhập các từ điển được sử dụng vào gói.
- Bằng cách kích hoạt tùy chọn này, Intlayer cũng cho phép nhập khẩu động nội dung từ điển chỉ dành cho locale hiện tại.

> Tài nguyên:
>
> - [Cấu hình Build](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Tích hợp với Frameworks & Môi trường

### 1. Next.js

#### a. Thành phần Server và Client

- Cung cấp **phương pháp quản lý nội dung thống nhất** cho cả thành phần server và client.
- Cung cấp một context tích hợp sẵn cho các thành phần server, giúp đơn giản hóa việc triển khai so với các giải pháp khác.

#### b. Metadata, Sitemaps và robots.txt

- Lấy và chèn nội dung động để tạo metadata, sitemap hoặc các file `robots.txt`.

#### c. Middleware

- Thêm middleware để **chuyển hướng người dùng** đến nội dung dựa trên ngôn ngữ ưu tiên của họ.

#### d. Tương thích Turbopack và Webpack

- Hoàn toàn tương thích với Turbopack mới của Next.js cũng như Webpack truyền thống.

> Tài nguyên:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

### 2. Vite

- Tương tự như Next.js, bạn có thể tích hợp Intlayer với Vite và sử dụng **middleware** để chuyển hướng người dùng đến nội dung dựa trên ngôn ngữ ưu tiên của họ.

> Tài nguyên:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)

### 3. Express

- Quản lý nội dung và quốc tế hóa các dịch vụ backend xây dựng trên Express.
- Cá nhân hóa email, thông báo lỗi, thông báo đẩy và nhiều hơn nữa với văn bản được địa phương hóa.

> Tài nguyên:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_express.md)

### 4. React Native

- Tích hợp Intlayer với React Native để quản lý nội dung và quốc tế hóa các ứng dụng di động của bạn.
- Hỗ trợ cả hai nền tảng iOS và Android.

> Tài nguyên:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_native.md)

### 5. Lynx

- Tích hợp Intlayer với Lynx để quản lý nội dung và quốc tế hóa các ứng dụng di động của bạn.
- Hỗ trợ cả hai nền tảng iOS và Android.

> Tài nguyên:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_lynx.md)

### 6. Vue

- Tích hợp Intlayer với Vue để quản lý nội dung và quốc tế hóa các ứng dụng Vite / Vue.js của bạn.

> Tài nguyên:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vue.md)

### 7. Nuxt

- Tích hợp Intlayer với Nuxt để quản lý nội dung và quốc tế hóa các ứng dụng Nuxt / Vue.js của bạn.
- Hỗ trợ cả thành phần server và client.
- Tích hợp routing và middleware để chuyển hướng người dùng đến nội dung dựa trên ngôn ngữ ưu tiên của họ.

> Tài nguyên:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)

### 8. Preact

- Tích hợp Intlayer với Preact để quản lý nội dung và quốc tế hóa các ứng dụng Preact của bạn.

> Tài nguyên:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_preact.md)

---

## Trình chỉnh sửa trực quan và CMS

### 1. Trình chỉnh sửa trực quan cục bộ

- Một **trình chỉnh sửa trực quan miễn phí, cục bộ** cho phép bạn chỉnh sửa nội dung ứng dụng bằng cách chọn trực tiếp các phần tử trên trang.
- Tích hợp các tính năng AI để hỗ trợ:
  - Tạo hoặc sửa bản dịch
  - Kiểm tra cú pháp và chính tả
  - Gợi ý cải tiến
- Có thể được lưu trữ cục bộ hoặc triển khai trên máy chủ từ xa.

> Tài nguyên:
>
> - [Trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)

### 2. Intlayer CMS (Từ xa)

- Một giải pháp **CMS được lưu trữ** cho phép bạn quản lý nội dung ứng dụng trực tuyến mà không cần can thiệp vào codebase của bạn.
- Cung cấp các tính năng hỗ trợ AI để khai báo nội dung, quản lý bản dịch và sửa lỗi cú pháp hoặc chính tả.
- Tương tác với nội dung của bạn thông qua giao diện ứng dụng trực tiếp.

> Tài nguyên:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

---

## Tiện ích mở rộng IDE

- Các tiện ích mở rộng cho các IDE chính để cung cấp một **giao diện đồ họa** cho việc quản lý bản dịch cục bộ và từ xa.
- Các tính năng có thể bao gồm tự động tạo các tệp khai báo nội dung cho các thành phần, tích hợp trực tiếp với Intlayer CMS và xác thực theo thời gian thực.

---

## MCP Server

- Một **máy chủ MCP** cho phép bạn quản lý nội dung và bản dịch của mình bằng công cụ tích hợp trong IDE của bạn.

---

## Intlayer CLI

- **Dịch và tạo tệp**: Thực hiện kiểm tra trên các tệp nội dung của bạn để tạo các bản dịch còn thiếu và xem xét các điểm không nhất quán.
- **Tương tác từ xa**: Đẩy nội dung cục bộ của bạn lên CMS từ xa hoặc kéo nội dung từ xa để tích hợp vào ứng dụng cục bộ của bạn.
- **Dịch và xem xét tài liệu**: Dịch và xem xét tài liệu / tệp của bạn, v.v.

> Tài nguyên:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md)

---

## Môi trường

- Sử dụng **biến môi trường** để cấu hình Intlayer khác nhau giữa môi trường sản xuất, thử nghiệm và cục bộ.
- Định nghĩa trình chỉnh sửa trực quan hoặc dự án CMS từ xa nào sẽ được nhắm tới tùy thuộc vào môi trường của bạn.

---

## Cập nhật nội dung nóng

- Khi sử dụng từ điển từ xa và Intlayer CMS, bạn có thể **cập nhật nội dung ứng dụng của mình ngay lập tức**, mà không cần phải triển khai lại.

> Tài nguyên:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

---

## Tính năng sắp ra mắt

### 1. Kiểm thử A/B & Cá nhân hóa

- **Kiểm thử đa biến**: Kiểm thử các phiên bản khác nhau của một nội dung nhất định để xem phiên bản nào hoạt động tốt nhất (ví dụ: tỷ lệ nhấp cao hơn).
- **Cá nhân hóa dựa trên dữ liệu**: Hiển thị nội dung khác nhau dựa trên đặc điểm người dùng (giới tính, tuổi, vị trí, v.v.), hoặc các mẫu hành vi khác.
- **Lặp tự động**: Cho phép AI tự động kiểm thử nhiều phiên bản và chọn ra phiên bản hiệu quả nhất hoặc đề xuất các lựa chọn để quản trị viên phê duyệt.

### 2. Phiên bản hóa

- Khôi phục các phiên bản trước của nội dung với **phiên bản hóa nội dung**.
- Theo dõi các thay đổi theo thời gian và hoàn nguyên về trạng thái trước đó nếu cần.

### 3. Dịch tự động

- Đối với người dùng CMS từ xa, **tạo bản dịch chỉ với một cú nhấp chuột** cho bất kỳ ngôn ngữ được hỗ trợ nào.
- Hệ thống sẽ tạo bản dịch trong nền và sau đó yêu cầu bạn xác nhận hoặc chỉnh sửa.

### 4. Cải tiến SEO

- Công cụ để **phân tích từ khóa**, ý định tìm kiếm của người dùng và các xu hướng mới nổi.
- Gợi ý nội dung cải tiến để xếp hạng tốt hơn, và theo dõi hiệu suất lâu dài.

### 5. Tương thích với nhiều Framework hơn

- Đang nỗ lực hỗ trợ **Solid, Svelte, Angular**, và nhiều hơn nữa.
- Mục tiêu làm cho Intlayer tương thích với **bất kỳ ứng dụng nào chạy trên JavaScript**.

---

## Kết luận

Intlayer hướng tới trở thành giải pháp tổng thể cho quản lý nội dung và quốc tế hóa. Nó tập trung vào sự linh hoạt (tập trung hoặc phân phối các tệp), hỗ trợ đa ngôn ngữ rộng rãi, tích hợp dễ dàng với các framework và bundler hiện đại, cùng các tính năng mạnh mẽ dựa trên AI. Khi các khả năng mới như thử nghiệm A/B, quản lý phiên bản và dịch tự động trở nên khả dụng, Intlayer sẽ tiếp tục đơn giản hóa quy trình làm việc với nội dung và nâng cao trải nghiệm người dùng trên nhiều nền tảng khác nhau.

Hãy theo dõi các phiên bản sắp tới, và đừng ngần ngại khám phá các tính năng hiện có để xem Intlayer có thể giúp bạn tập trung và tối ưu hóa quy trình quản lý nội dung như thế nào ngay hôm nay!

---
